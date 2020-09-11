import styled from 'styled-components';

export const Container = styled.div `
  background: #2D4059;
  padding: 0 30px;
  z-index: 999;
`;

export const Content = styled.div `
  height: 65px;
  text-align: center;
  display: flex;
  justify-content: space-between;

  nav {
    right: 0%;
    margin-left: -25px;
    background: #2D4059;
    display: flex;

    ul {
      display: flex;
      justify-content: center;
      margin-left: 30px;
      li {
        height: 100%;
        padding: 20px;
        padding-left: 10px;
        background: rgba(0, 0, 0, 0.01);
        color: #888;
        display: flex;
        transition: 0.5s all;
        border-right: 1px solid rgba(0, 0, 0, 0.02);
        align-items: center;
        text-align: center;

        &:hover {
          transition: 0.5s all;
          background: rgba(0, 0, 0, 0.06);
        }

        h3 {
          font-size: 12px;
          padding-left: 5px;
          padding-top: 4px;

          a {
            color: #888;
          }
        }
      }
    }

    a {
      width: 100%;
      padding: 5px;
      margin-right: 0px;
      img {
        width: 103px;
        padding-right: 25px;
        padding-top: 16px;
      }
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div `
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      font-family:'Roboto';
      font-size:14px;
      font-weight:400;
      color: #fff;
    }

    a {
      float:left;
      font-size: 10px;
      font-family:'Roboto';
      font-weight:800;
      color: #59759A;
    }
  }

  img {
    height: 35px;
    border-radius: 50%;
    margin-right:5px;
  }
`;
