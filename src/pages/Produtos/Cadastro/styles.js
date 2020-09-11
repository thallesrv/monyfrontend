import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;

  aside {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 15px;
    margin-bottom: 10px;
  }

  form {
    display: flex;
    flex-direction: column;
    flex-grow: 1;

    label {
      display: block;
      color: rgba(0, 0, 0, 0.4);
      font-weight: bold;
      text-transform: uppercase;
      font-size: 10px;
    }
  }

  input {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    width: 100%;
    max-height: 44px;
    padding: 15px;
    color: #555;
    margin: 0 0 10px;
  }

  span {
    color: #e74c3c;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
    transition: 0.3s;
  }

  button {
    background: #f39c12;
    border: 0;
    border-radius: 4px;
    max-height: 40px;
    padding: 10px;
    color: #fff;
    font-weight: bold;
    margin: 0 0 10px;
    font-size: 12px;
    transition: background 0.4s;

    &:hover {
      background: ${darken(0.1, '#f39c12')};
    }
  }

  a {
    color: #fff;
    margin-top: 5px;
    font-size: 14px;
    opacity: 0.6;
    transition: 0.2s;

    &:hover {
      opacity: 1;
    }
  }
`;

export const Card = styled.div`
  width: ${props => props.width}px;
  height: 100%;
  min-height: 200px;
  margin-top: 30px;
  border-radius: 8px;
  background: #fff;
  margin-right: 8px;
  box-shadow: 9px 10px 30px -10px rgba(0, 0, 0, 0.81);
`;

export const CardHeader = styled.div`
  padding-top: 15px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h2 {
    font-size: 14px;
    color: #555;
    font-weight: 600;
    text-transform: uppercase;
  }

  div {
    margin-top: -5px;

    span {
      font-size: 10px;
      color: #3498db;
    }
  }
`;

export const CardFooter = styled.div`
  padding-bottom: 5px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  div {
    span {
      font-size: 10px;
      color: #f39c12;
    }
  }
`;

export const CardContent = styled.div`
  padding: 20px;
`;
