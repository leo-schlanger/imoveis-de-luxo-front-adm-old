/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  secondary_phone: string;
  avatar_url: string;
  responsible: string;
  description: string;
  creci: string;
  status: 'new' | 'active' | 'inactive';
  type: 'adm' | 'advertiser' | 'user';
  plan: {
    name: string;
    description: string;
    quantity_properties: number;
    quantity_photos: number;
    quantity_videos: number;
    value: number;
  };
  plan_status: boolean;
  address: {
    country: string;
    state: string;
    postal_code: string;
    neighborhood: string;
    sub_neighborhood: string | undefined;
    address: string;
    number: string | undefined;
    complement: string | undefined;
    description: string | undefined;
  };
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: User): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@ImoveisDeLuxoAdm:token');
    const user = localStorage.getItem('@ImoveisDeLuxoAdm:user');

    if (token && user) {
      api.defaults.headers.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.type !== 'adm') {
      throw new Error('Usuário não autorizado');
    }

    localStorage.setItem('@ImoveisDeLuxoAdm:token', token);
    localStorage.setItem('@ImoveisDeLuxoAdm:user', JSON.stringify(user));

    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@ImoveisDeLuxoAdm:token');
    localStorage.removeItem('@ImoveisDeLuxoAdm:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: User) => {
      localStorage.setItem('@ImoveisDeLuxoAdm:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [setData, data.token],
  );

  return (
    <AuthContext.Provider
      value={{
        token: data.token,
        user: data.user,
        signIn,
        signOut,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
