import styled, { css, keyframes } from 'styled-components'
import {darken} from 'polished';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const ButtonLogin = styled.button`
  background: #BF292A;
  border: 0;
  border-radius: 4px;
  height: 53px;
  width:90%;
  padding: 10px;
  font-family: 'Roboto';
  font-weight: 500;
  color: #fff;
  margin: 10px 0 20px;
  font-size: 16px;
  transition: background 0.4s;
  -webkit-box-shadow: 2px 9px 9px -1px rgba(0,0,0,0.2);
  -moz-box-shadow: 2px 9px 9px -1px rgba(0,0,0,0.2);
  box-shadow: 2px 9px 9px -1px rgba(0,0,0,0.2);

  &:hover {
    background: ${darken(0.15, '#BF292A')};
  }

`;

export const Container = styled.div`
    height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;

    form {
      display: flex;
      flex-direction: column;
      margin-top: 150px;
      margin-left: 50px;
    }
  
    input {
      background: rgba(255, 255, 255);
      border: 0;
      border-radius: 6px;
      height: 63px;
      padding: 15px;
      width:90%;
      color: #26364B;
      font-family: 'Roboto';
      font-size: 16px;
      font-weight: 500;
      margin: 0 0 10px;
      -webkit-box-shadow: 2px 9px 9px -1px rgba(0,0,0,0.2);
      -moz-box-shadow: 2px 9px 9px -1px rgba(0,0,0,0.2);
      box-shadow: 2px 9px 9px -1px rgba(0,0,0,0.2);
    }

    input::placeholder {
      color: #26364B;
      opacity: 1;
    }
  
    span {
      color: #e74c3c;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      transition: 0.3s;
    }

    a {
      color: #fff;
      margin-top: 5px;
      font-size: 14px;
      font-family: 'Roboto';
      font-weight: 300;
      opacity: 0.6;
      transition: 0.2s;
  
      &:hover {
        opacity: 1;
      }
    }
`;

export const LogoContainer = styled.div`
  height: 100%;
  background-color: #2D4059;
  padding:25px;
  justify-content: center;

  img{
    margin-left:50px;
    margin-top: 220px;
  }
`;

export const LoginContainer = styled.div`
  background-color: #EA5455;
  height: 100%;
  padding:25px;
`;

interface WindowActionsProps {
  position: 'left' | 'right'
  shouldShowIconsOnHover?: boolean
}

export const WindowActions = styled.div<WindowActionsProps>`
  position: absolute;
  top: -10;
  height: 100%;
  ${props =>
    props.position === 'left'
      ? css`
          left: 16px;
        `
      : css`
          right: 0px;
        `};
  ${props =>
    props.shouldShowIconsOnHover &&
    css`
      &:hover svg {
        display: block;
      }
    `}
`

export const DefaultActionButton = styled.button`
  margin: 10px 0 20px;
  transition: background 0.4s;
  background: transparent;
  -webkit-app-region: no-drag;
  border: 0;
  border-shadow:0;
  padding:10px;
  font-size:20px;

  color: #fff;
  & + button {
    margin-left: 12px;
  }
  &:hover svg {
    color: #fff;
  }
  &:active {
    opacity: 0.6;
  }
  &:focus {
    outline: 0;
  }

  &:hover {
    background: ${darken(0.001, '#BF292A')};
  }

  `