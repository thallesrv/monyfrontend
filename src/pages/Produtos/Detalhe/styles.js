import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const SubTitle = styled.div`
  margin-top: 30px;
  font-size: 15px;
  color: #66818d;
  font-weight: bold;

  svg {
    position: absolute;
    margin-top: -5px;
    margin-left: 10px;
    cursor: pointer;
  }
`;

export const ContainerAll = styled.div`
  max-width: 1300px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;

  form {

    label {
      display: block;
      color: rgba(0, 0, 0, 0.4);
      font-weight: bold;
      text-transform: uppercase;
      font-size: 10px;]
      text-align:left;
    }
  }

  aside {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-gap: 15px;
    margin-bottom: 10px;
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

  button {
    background: #f39c12;
    border: 0;
    border-radius: 4px;
    width: 100%;
    max-height: 60px;
    padding: 10px;
    color: #fff;
    font-weight: bold;
    margin-top:2px;
    font-size: 16px;
    transition: background 0.4s;

    &:hover {
      background: ${darken(0.1, '#f39c12')};
    }
  }
`;

export const BoxOrange = styled.div`
  padding: 10px;
  border-radius: 8px;
  background: #f39c12;
  background: linear-gradient(
    138deg,
    rgba(243, 156, 18, 1) 0%,
    rgba(255, 186, 77, 1) 100%
  );
  box-shadow: 7px 8px 20px -8px rgba(0, 0, 0, 0.5);

  h5 {
    font-size: 12px;
    color: #ffedd1;
    font-weight: 200;
    text-transform: uppercase;
  }

  h2 {
    font-size: 14px;
    color: #fff;
    font-weight: bold;
  }
`;

export const CardInformation = styled.div`
  min-height: 100%;
  padding: 0px;
  border-radius: 8px;
  background: rgb(243, 156, 18);
  background: linear-gradient(
    138deg,
    rgba(0, 212, 255, 1) 0%,
    rgba(142, 68, 173, 1) 50%,
    rgba(243, 156, 18, 1) 100%
  );
  margin-right: 8px;
  box-shadow: 9px 10px 30px -10px rgba(0, 0, 0, 0.81);
`;

export const CardInformationHeader = styled.div`
  padding-top: 10px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h2 {
    font-size: 15px;
    color: #fff;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export const CardInformationContent = styled.div`
  padding: 5px 5px 0px 5px;
  text-align: center;
  display: flex;
  justify-content: space-between;

  .col {
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    padding-left: 0px;
  }

  .col:last-child {
    border-right: none;
  }

  h3 {
    font-size: 20px;
    color: #fff;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

    span {
      font-size: 16px;
    }
  }

  h4 {
    display: inline;
    font-size: 16px;
    color: #fff;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);

    span {
      display: block;
      font-size: 9px;
    }
  }

  article {
    justify-content: space-between;
    align-items: center;
    text-align: center;

    h4 {
      border-radius: 10px;
      padding: 9px;
      font-size: 14px;
      color: rgba(255, 255, 255, 0.7);
      font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
        'Lucida Sans', Arial, sans-serif;
      font-weight: bold;
      text-transform: uppercase;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
      text-align: center;
      align-items: center;

      span {
        color: rgba(255, 255, 255, 0.9);
        display: block;
        font-size: 9px;
      }
    }
  }

  span {
    color: #fff;
    font-size: 14px;
    font-weight: bold;

    svg {
      margin-top: -4px;
    }
  }
`;

export const Card = styled.div`
  width: ${props => props.width}px;
  height: 100%;
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
    font-size: 12px;
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
    margin-top: 20px;
    display: block;

    span {
      display: block;
      text-align: left;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.5);
      strong {
        color: rgba(0, 0, 0, 0.8);
        font-weight: bold;
      }
    }
  }

  div {
    span {
      font-size: 10px;
      color: #f39c12;
    }
  }
`;

export const CardContent = styled.div`
  padding: 5px;
  text-align: center;
  justify-content: space-between;

  h3 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 0px;
    color: rgba(0, 0, 0, 0.7);
  }

  span {
    color: rgba(0, 0, 0, 0.6);
    font-size: 12px;
  }

  div {
    strong {
      color: rgba(0, 0, 0, 0.8);
      font-weight: bold;
      font-size: 11px;
    }

    p {
      text-align: left;
      font-size: 12px;
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;

export const BoxDark = styled.div`
  padding: 10px;
  border-radius: 8px;
  background: #f39c12;
  background-image: linear-gradient(#0f1416, #29383f);
  box-shadow: 7px 8px 20px -8px rgba(0, 0, 0, 0.5);

  h5 {
    font-size: 12px;
    color: #f39c12;
    font-weight: 200;
    text-transform: uppercase;
  }

  h2 {
    font-size: 14px;
    color: rgba(255, 255, 255, 0.95);
    font-weight: bold;
  }
`;

export const Percentage = styled.text`
  color: ${props => (props.isNegative == true ? '#E74C3C' : '#2ecc71')};
  font-size: 15px;
  padding-left: 12px;
`;

export const PercentageInfo = styled.text`
  color: ${props => (props.isNegative == true ? '#E74C3C' : '#2ecc71')};
  font-size: 14px;
  padding: 8px;
  margin-left: 5px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
`;

export const PercentageBoxDark = styled.text`
  color: ${props => (props.isNegative == true ? '#E74C3C' : '#2ecc71')};
  font-size: 11px;
  padding-left: 5px;
  display: block;
`;

export const ListAssets = styled.div`
  ul {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 15px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
`;

export const Day = styled.div`
  padding: 10px;
  border-radius: 4px;
  background: #fff;
  width: 180px;
  height: 100%;
  box-shadow: 9px 10px 30px -10px rgba(0, 0, 0, 0.3);

  header {
    align-items: left;

    img {
      float: left;
    }

    strong {
      padding-left: 5px;
      font-size: 14px;
      color: #707070;
    }

    span {
      display: block;
      font-size: 9px;
      text-transform: uppercase;
      font-weight: bold;
      color: #b6b6b6;
    }
  }

  strong {
    display: block;
    color: #4d4d4d;
    font-size: 20px;
    margin-top: 6px;
  }

  span {
    color: #999;
    font-size: 12px;
  }

  footer {
    margin-top: 8px;
    flex-direction: column;
    align-items: left;

    strong {
      font-size: 14px;
      color: #4e4e4e;
      margin-top: -3px;
    }

    span {
      font-size: 9px;
      font-weight: bold;
      color: #b6b6b6;
    }
  }
`;

export const Graphs = styled.div`
  display: flex;
  margin-top: 10px;
  width: 100%;

  div {
    margin-right: 15px;
  }
`;

export const BoxFilterChartLine = styled.div`
  padding: 6px;
  border-radius: 4px;
  background: #fff;
  width: 100%;
  height: 30px;
  margin-top: -25px;
  display: flex;

  h2 {
    font-size: 16px;
  }

  ul {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 5px;

    li {
      background: #444;
      padding: 4px;
      border-radius: 5px;
      color: #fff;
      font-size: 11px;
      transition: 0.5s all;

      &:hover {
        background: linear-gradient(
          to bottom,
          rgba(255, 196, 46, 1) 0%,
          rgba(243, 156, 18, 1) 100%
        );
        transition: 0.5s all;
      }
    }
  }
`;

export const CustomTooltipDiv = styled.div`
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;
  color: #fff;

  div {
    padding: 10px;
    color: #fff;

    strong {
      color: #f39c12;
      font-size: 14px;
      font-weight: bold;
    }

    p {
      font-size: 14px;
      font-weight: bold;
      color: #fff;
    }
  }
`;

export const Notas = styled.div`
  width: ${props => props.width}px;
  height: 100%;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.5);
  box-shadow: 9px 10px 30px -10px rgba(0, 0, 0, 0.81);
  border-collapse: collapse;
  overflow: hidden;
  color: #fff;
  text-align: left;

  table {
    width: 100%;
  }

  th,
  td {
    padding: 1em;
  }
`;

export const NotasItems = styled.div`
  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0 5px;
  }

  tr td:first-child {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  tr td:last-child {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  tr {
    border-collapse: collapse;
    border-radius: 1em;
    overflow: hidden;
    background: #fff;
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
    font-weight: bold;
  }

  th,
  td {
    padding: 1em;
  }
`;

export const FormCard = styled.div`
  form {
    width: 1000px;
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

  input,
  select {
    background: rgba(0, 0, 0, 0.1);
    border: 0;
    border-radius: 4px;
    width: 100%;
    max-height: 44px;
    padding: 15px;
    color: #555;
    margin: 0 0 10px;
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
`;

export const BadgeCategoria = styled.div`
  padding: 5px;
  color: ${props => lighten(0.2, props.color)};
  border-radius: 10px;
  text-align: center;
  font-weight: 600;
  background: linear-gradient(
    ${props => darken(0.1, props.color)},
    ${props => props.color}
  );
  box-shadow: 7px 8px 20px -8px rgba(0, 0, 0, 0.5);
`;

export const News = styled.div`
  width: ${props => props.width}px;
  height: 100%;
  border-radius: 10px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 9px 10px 30px -10px rgba(0, 0, 0, 0.81);
  border-collapse: collapse;
  overflow: hidden;
  text-align: left;
  padding: 15px;
  margin-top: 10px;

  color: rgba(0, 0, 0, 0.7);
  font-size: 12px;
  font-weight: bold;

  span {
    float: right;
    color: rgba(0, 0, 0, 0.3);
    font-size: 10px;
    font-weight: bold;
  }

  strong {
    a {
      text-decoration: none;
      font-size: 10px;
      color: #f39c12;
    }
  }
`;
