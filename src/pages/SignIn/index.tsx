import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import logoImg from '../../assets/images/logo.svg';
import { schemaSignIn } from '../../utils/yupValidations';
import { useAuth } from '../../hooks/auth';

import './styles.css';

interface IFormInput {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schemaSignIn),
  });
  const { signIn } = useAuth();

  const onSubmit = useCallback(
    async (data: IFormInput): Promise<void> => {
      try {
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log({ err });
      }
    },
    [signIn],
  );

  return (
    <div id="sign-in-container">
      <img src={logoImg} alt="Imóveis de Luxo" />
      <form onSubmit={handleSubmit(onSubmit)} className="sign-in-form">
        <input name="email" type="text" placeholder="E-mail" ref={register} />
        <p>{errors.email?.message}</p>
        <input
          name="password"
          type="password"
          placeholder="Senha"
          ref={register}
        />
        <p>{errors.password?.message}</p>
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default SignIn;
