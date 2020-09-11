import styled from 'styled-components';

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

export const ButtonSort = styled.button `
  background: none;
  border: none;
  font-size: 0px;
  color: rgba(0, 0, 0, 0.2);
`;

export const Produtos = styled.div `
  width: ${props => props.width}px;
  margin-top: 30px;

  table {
    border-spacing: 1;
    border-collapse: collapse;
    background: white;
    border-radius: 6px;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    position: relative;

    * {
      position: relative;
    }

    td,
    th {
      padding-left: 8px;
    }

    thead tr {
      height: 60px;
      background: linear-gradient(
        138deg,
        rgba(243, 156, 18, 1) 0%,
        rgba(255, 186, 77, 1) 100%
      );
      font-size: 12px;
      color: rgba(0, 0, 0, 0.6);
    }

    tbody tr {
      height: 48px;
      border-bottom: 1px solid #e3f1d5;
      background: rgba(0, 0, 0, 0.02);
      color: rgba(0, 0, 0, 0.6);
      font-size: 12px;

      &:last-child {
        border: 0;
      }
    }

    td,
    th {
      text-align: left;
      &.l {
        text-align: right;
      }
      &.c {
        text-align: center;
      }
      &.r {
        text-align: center;
      }
    }
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

export const Graphs = styled.div `
  display: flex;
  margin-top: 10px;
  width: 1300px;

  div {
    margin-right: 15px;
  }
`;

export const Percentage = styled.text `
  color: ${props => (props.isNegative === true ? '#E74C3C' : '#2ecc71')};
  font-size: 12px;
  font-weight: bold;
  padding-left: 12px;
`;


export const CustomTooltipDiv = styled.div `
  background: rgba(0, 0, 0, 0.8);
  border-radius: 5px;

  div {
    padding: 10px;
    color: #fff;
  }
`;
