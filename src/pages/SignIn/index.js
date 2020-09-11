import React, { useCallback, useMemo, memo } from 'react'
import { FiX, FiMinus, FiMaximize2, FiSquare } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { remote } from 'electron';

import logo from './../../assets/logo.png';

import { signInRequest } from './../../store/modules/auth/actions';
import { Container, LogoContainer, LoginContainer, DefaultActionButton,WindowActions, ButtonLogin } from './styles';

const schema = Yup.object().shape({
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatorio'),
  password: Yup.string().required('Senha é obrigatoria!'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.close()
  }, [])

  return (
    <>
      <Container>
      <LogoContainer>
        <img src={logo}></img>
      </LogoContainer>
      <LoginContainer>
        <WindowActions position="right">
            <DefaultActionButton onClick={handleCloseWindow}>
              <FiX />
            </DefaultActionButton>
        </WindowActions>
        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="email" placeholder="USUARIO"></Input>
          <Input
            name="password"
            type="password"
            placeholder="SENHA"
          ></Input>

          <ButtonLogin type="submit">{loading ? 'CARREGANDO ...' : 'LOGAR'}</ButtonLogin>

          <Link to="/register">Esqueceu sua senha?</Link>
        </Form>
      </LoginContainer>
    </Container>
    </>
  );
}
