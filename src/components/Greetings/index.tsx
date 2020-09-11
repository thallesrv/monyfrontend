import React, { useCallback, useMemo, memo } from 'react'
import { FiX, FiMinus, FiMaximize2, FiSquare } from 'react-icons/fi';

import { remote } from 'electron';
import os from 'os';
import { Link } from 'react-router-dom';
import logo from './../../assets/logo.png';
import { Container, LogoContainer, LoginContainer, DefaultActionButton,WindowActions, ButtonLogin } from './styles';
import { Form, Input } from '@rocketseat/unform';

const Greetings: React.FC = () => {
  const handleCloseWindow = useCallback(() => {
    const window = remote.getCurrentWindow()

    window.close()
  }, [])
  return (
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
        <Form>
          <Input name="email" placeholder="USUARIO"></Input>
          <Input
            name="password"
            type="password"
            placeholder="SENHA"
          ></Input>

          <ButtonLogin type="submit">LOGAR</ButtonLogin>

          <a href="/register">Esqueceu sua senha?</a>
        </Form>
      </LoginContainer>
    </Container>
  )
}

export default Greetings
