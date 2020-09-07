import React, { useCallback } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import { useHistory } from 'react-router-dom';
import Header from '../../components/Header';
import { CREATE_USER } from '../../graphql/resolvers/users';
import {
  UserStatus,
  UserType,
  UserStatusDescription,
  UserTypeDescription,
} from '../../graphql/entities/user';
import { schemaCreateUsers } from '../../utils/yupValidations';

import './styles.css';

interface ICreateUserData {
  name: string;
  responsible: string;
  creci: string;
  email: string;
  phone: string;
  secondary_phone: string;
  status: UserStatus;
  type: UserType;
  password: string;
}

const userTypes = ['ADM', 'ADVERTISER', 'USER'] as const;

const userStatus = ['NEW', 'ACTIVE', 'INACTIVE'] as const;

const CreateUsers: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<ICreateUserData>({
    resolver: yupResolver(schemaCreateUsers),
  });
  const [createUser, { error }] = useMutation(CREATE_USER);
  const history = useHistory();

  const onSubmit = useCallback(
    async (data: ICreateUserData): Promise<void> => {
      // eslint-disable-next-line no-console
      console.log({ data });
      try {
        await createUser({
          variables:  {
            ...data,
          },
        });

        history.goBack();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log({ error });
      }
    },
    [createUser, error, history],
  );

  return (
    <div className="create-user-container">
      <Header />
      <div>
        <form onSubmit={handleSubmit(onSubmit)} className="create-user-form">
          <input name="name" placeholder="nome" ref={register} />
          <p>{errors.name?.message}</p>
          <input name="responsible" placeholder="responsavel" ref={register} />
          <p>{errors.responsible?.message}</p>
          <input ref={register} name="creci" placeholder="creci" />
          <p>{errors.creci?.message}</p>
          <input ref={register} name="email" placeholder="Email" />
          <p>{errors.email?.message}</p>
          <input ref={register} name="phone" placeholder="telefone" />
          <p>{errors.phone?.message}</p>
          <input ref={register} name="secondary_phone" placeholder="telefone" />
          <p>{errors.secondary_phone?.message}</p>
          <input
            ref={register}
            name="password"
            placeholder="senha"
            type="password"
          />
          <select name="status" ref={register}>
            {userStatus.map((item) => {
              return (
                <option key={item} value={item}>
                  {UserStatusDescription[item]}
                </option>
              );
            })}
          </select>
          <select name="type" ref={register}>
            {userTypes.map((item) => {
              return (
                <option key={item} value={item}>
                  {UserTypeDescription[item]}
                </option>
              );
            })}
          </select>
          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
};

export default CreateUsers;
