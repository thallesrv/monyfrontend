import styled from 'styled-components';
import {
  darken
} from 'polished';

export const CustomTooltipDiv = styled.div `
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;

  div {
    padding: 10px;
    color: #fff;
  }
`;

export const SubTitle = styled.div `
  margin-top: 30px;
  font-size: 15px;
  color: #66818d;
  font-weight: bold;
`;

export const Container = styled.div `
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
`;

export const BoxOrange = styled.div `
  width: 325px;
  min-height: 110px;
  padding: 25px;
  border-radius: 8px;
  background: #f39c12;
  background: linear-gradient(
    138deg,
    rgba(243, 156, 18, 1) 0%,
    rgba(255, 186, 77, 1) 100%
  );
  margin-right: 8px;
  box-shadow: 9px 10px 30px -10px rgba(0, 0, 0, 0.81);

  h5 {
    font-size: 12px;
    color: #ffedd1;
    font-weight: 200;
    text-transform: uppercase;
  }

  h2 {
    font-size: 28px;
    color: #fff;
    font-weight: bold;
  }
`;

export const CardInformation = styled.div `
  width: 1000px;
  min-height: 110px;
  margin-top: 30px;
  padding: 0px;
  border-radius: 8px;
  background: rgb(243, 156, 18);
  background: linear-gradient(
    138deg,
    rgba(243, 156, 18, 1) 0%,
    rgba(0, 212, 255, 1) 100%
  );
  margin-right: 8px;
  box-shadow: 9px 10px 30px -10px rgba(0, 0, 0, 0.81);
`;

export const CardInformationHeader = styled.div `
  padding-top: 15px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h2 {
    font-size: 25px;
    color: #fff;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

export const CardInformationContent = styled.div `
  padding: 20px;
  padding-top: 20px;
  text-align: center;

  h3 {
    font-size: 35px;
    color: #fff;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande',
      'Lucida Sans', Arial, sans-serif;
    font-weight: bold;
    text-transform: uppercase;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  }

  span {
    color: #fff;
    font-size: 9px;
  }

  section {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    text-align: center;
    margin-bottom: 40px;
  }
`;

export const Card = styled.div `
  width: ${props => props.width}px;
  height: 100%;
  min-height: 200px;
  margin-top: 30px;
  border-radius: 8px;
  background: #fff;
  margin-right: 8px;
  box-shadow: 9px 10px 30px -10px rgba(0, 0, 0, 0.81);
`;

export const CardHeader = styled.div `
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

export const CardFooter = styled.div `
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

export const CardContent = styled.div `
  padding: 5px;
`;

export const BoxDark = styled.div `
  width: 300px;
  min-height: 110px;
  padding: 15px;
  padding-bottom: 8px;
  border-radius: 8px;
  background-image: linear-gradient(#0f1416, #29383f);
  margin-right: 8px;
  box-shadow: 9px 10px 30px -10px rgba(0, 0, 0, 0.81);

  h5 {
    font-size: 12px;
    color: rgba(0, 212, 255, 1);
    font-weight: 200;
    text-transform: uppercase;
    margin-bottom: 4px;
  }

  h3 {
    font-size: 28px;
    color: #ffff;
    font-weight: bold;
    text-transform: uppercase;
    margin-bottom: 10px;

    span {
      font-size: 11px;
    }
  }

  h2 {
    font-size: 13px;
    color: #fff;
    font-weight: bold;

    span {
      font-size: 9px;
    }
  }
`;

export const Percentage = styled.text `
  color: ${props => (props.isNegative == true ? '#E74C3C' : '#2ecc71')};
  font-size: 15px;
  padding-left: 12px;
`;

export const PercentageBoxDark = styled.text `
  color: ${props => (props.isNegative == true ? '#E74C3C' : '#2ecc71')};
  font-size: 10px;
  padding-left: 5px;
`;

export const ListAssets = styled.div `
  ul {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 15px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
`;

export const Day = styled.div `
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

export const Graphs = styled.div `
  display: flex;
  margin-top: 10px;
  width: 1300px;

  div {
    margin-right: 15px;
  }
`;

export const BoxFilterChartLine = styled.div `
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
