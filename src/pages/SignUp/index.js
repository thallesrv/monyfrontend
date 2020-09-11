import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import { signUpRequest } from './../../store/modules/auth/actions';

import logo from './../../assets/logo.png';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatorio'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatorio'),
  password: Yup.string()
    .min(6, 'Minimo 6 caracteres')
    .required('Senha é obrigatoria!'),
});

export default function SignUp() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ name, email, password }) {
    dispatch(signUpRequest(name, email, password));
  }

  function componentDidMount() {
    document.title = 'Barber Web';
  }

  return (
    <>
      <img src={logo} alt="LOGO" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nome Completo"></Input>
        <Input name="email" type="email" placeholder="Seu email"></Input>
        <Input
          name="password"
          type="password"
          placeholder="Sua senha secreta"
        ></Input>
        <button type="submit">
          {loading ? 'Carregando ...' : 'Criar conta'}
        </button>
        <Link to="/">Já tenho login</Link>
      </Form>
    </>
  );
}
