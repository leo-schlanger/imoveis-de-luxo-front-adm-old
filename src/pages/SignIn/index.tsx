import React, { useCallback } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';

import logoImg from '../../assets/images/logo.svg';
import { useAuth } from '../../hooks/auth';

import './styles.css';

interface IFormInput {
  email: string;
  password: string;
}

const schema = Yup.object().shape({
  email: Yup.string()
    .required('E-mail obrigatório')
    .email('Digite um e-mail válido'),
  password: Yup.string().min(6, 'No mínimo 6 dígitos'),
});

const SignIn: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<IFormInput>({
    resolver: yupResolver(schema),
  });
  const { signIn } = useAuth();

  const onSubmit = useCallback(
    async (data: IFormInput): Promise<void> => {
      try {
        console.log(data);
        await signIn({
          email: data.email,
          password: data.password,
        });
        // eslint-disable-next-line no-empty
      } catch (err) {}
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
