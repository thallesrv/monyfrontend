import styled from 'styled-components';

import {
  darken
} from 'polished';

export const Container = styled.div `
  max-width: 600px;
  margin: 50px auto;

  form{
    display:flex;
    flex-direction: column;
    margin-top: 30px;

    hr{

    }

    input{
    background: rgba(255,255,255);
    border: 0;
    border-radius: 4px;
    max-height: 44px;
    padding: 15px;
    color:#555;
    margin: 0 0 10px;
  }

  span{
      color: #e74c3c;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      transition: 0.3s;
  }

  button{
    background: #f1c40f;
    border: 0;
    border-radius: 4px;
    max-height: 40px;
    padding: 10px;
    color: ${darken(0.25,'#f1c40f')};
    font-weight: bold;
    margin: 0 0 10px;
    font-size: 16px;
    transition: background 0.4s;

    &:hover{
      background: ${darken(0.15,'#f1c40f')};
    }
  }

  a{
    color: #fff;
    margin-top: 5px;
    font-size:14px;
    opacity: 0.6;
    transition: 0.2s;

    &:hover{
      opacity:1;
    }
  }
}

button{
    background: #131c24;
    width:100%;
    border: 0;
    border-radius: 4px;
    max-height: 40px;
    padding: 10px;
    color: #fff;
    font-weight: bold;
    margin: 0 0 10px;
    font-size: 16px;
    transition: background 0.4s;

    &:hover{
      background: ${darken(0.15,'#131c24')};
    }
`;
