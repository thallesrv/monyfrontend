import styled from 'styled-components';
import { darken } from 'polished';
import { device } from '../../styles/device';

export const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr;
  grid-template-rows: 100vh;
  grid-template-areas: 'a m';
`;

export const Aside = styled.div`
  background-color: #F6F6F6;
  grid-area: a;
  padding:20px;
`;

export const MainContent = styled.div`
  background-color: #FBFBFB;
  grid-area: m;
  padding:10px;
`;

export const SearchBox = styled.div `
  color: #8A8A8A;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 400;

  input{
    width:100%;
    height:50px;
    background-color: #E4E4E4;
    border:0;
    padding:15px;
    border-radius: 5px;
  }

`;

export const NewChat = styled.button `
  margin-top: 20px;
  color: #F8AEAF;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 800;
  width:100%;
  height:40px;
  background-color: #EA5455;
  border:0;
  padding:10px;
  border-radius: 50px;
  transition: 0.7s all;

  :hover{
    color: #fff;
    transition: 0.7s all;
  }
`;

export const Conversations = styled.div `
  ul {
    display: grid;
    grid-template-columns: 1fr;
    margin-top: 15px;
    margin-bottom: 10px;
  }
`;

export const Conversation = styled.div `
  background: ${props => (props.active == true ? '#FBFBFB' : '#F6F6F6')};
  width: calc(100% + 40px);
  height: 80px;
  border-bottom: 2px solid #D3D3D3;
  margin-left: -20px;
  padding:15px;
  cursor:pointer;
  position:relative;
  display:flex;

  :first-child{
    border-top: 2px solid #D3D3D3;
  }

  
  img {
    display:flex;
    justify-content:center;
    height: 45px;
    border-radius: 50%;
    margin-right:10px;  
  }

  div{
    margin-top:5px;

    h3{
      font-family:'Roboto';
      font-size:15px;
      font-weight:800;
      color: ${props => (props.active == true ? '#EA5455' : '#141E2C')};
    }
    p{
      font-size: 13px;
      font-family:'Roboto';
      font-weight:400;
      color: #6E6E6E;
    }
  }

  small{
    position:absolute;
    top:25px;
    right:8px;
    font-size: 12px;
    font-family:'Roboto';
    font-weight:bold;
    color: #ccc;
  }
  
`;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const ChatLog = styled.div`
height: 80%;
overflow: auto;
overflow-x: hidden;

::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.2);
	background-color: #f7f7f7;
}

::-webkit-scrollbar
{
	width: 6px;
	background-color: #f7f7f7;
}

::-webkit-scrollbar-thumb
{
	background-color: #d4d4d4;
}
`;

export const ChatInputArea = styled.div`
  color: #8A8A8A;
  font-family: 'Roboto';
  font-size: 14px;
  font-weight: 400;
  position: fixed;
  bottom: 5;
  width:70%;


  input{
    width:100%;
    height:50px;
    background-color: #fff;
    border: 1px solid #E4E4E4;
    padding:15px;
    border-radius: 5px;
  }
`;

export const ChatMessage = styled.div`
  color: #000;
  clear: both;
  line-height: 18px;
  font-size: 15px;
  padding: 8px;
  position: relative;
  margin: 5px 10px;
  max-width: 85%;
  word-wrap: break-word;


  float: ${props => (props.direction == true ? 'right' : 'left')};
  background: ${props => (props.direction == true ? '#F6FAFF' : '#fff')};
  border-radius: 0px 5px 5px 5px;


  div {
      font-size: 13px;
      font-family:'Roboto';
      font-weight:400;
      color: #666666;
  }

  span{
    display: inline-block;
    float: right;
    padding: 0 0 0 7px;
    position: relative;
    bottom: -4px;
    

    time{
      font-family:'Roboto';
      font-weight:800;
      font-size:9px;
      color: #85A7D3;
      display: inline-block;
    }
  }


  b{
    position: absolute;
    left: 38%;
    top: -10;
    font-size: 11px;
    background-color: #EA5455;
    border-radius: 10px;
    padding: 5px;
    color: #fa8e8f;
    margin-bottom:5px;
  }
`;

