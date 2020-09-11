import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import { ImSearch } from 'react-icons/im';
import { parseISO, formatRelative } from 'date-fns';
import InputEmoji from 'react-input-emoji';
import io from 'socket.io-client';
import pt from 'date-fns/locale/pt';


import { 
  Container,
  Aside, 
  MainContent, 
  SearchBox, 
  NewChat, 
  Conversations, 
  Conversation, 
  ChatConversation,
  Chat,
  ChatContainer,
  ChatLog,
  ChatInputArea,
  ChatMessage
} 
from "./styles";

import NewConversation from '../../components/NewConversation';

import api from './../../services/api';


//const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function Dashboard() {
  const MessageContainer = useRef();
  const profile = useSelector(state => state.user.profile);
  const [messages, setMessages] = useState([]);
  const [chatActive, setChatActive] = useState(0);
  const [conversations, setConversations] = useState([]);
  const [conversationsFiltered, setConversationsFiltered] = useState([]);
  const [users, setUsers] = useState([]);
  const textInput = React.useRef();

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
    loadUsers();
  };

  const handleClose = (value) => {
    setOpen(false);
    if(value !=null )
      console.log(conversations);
      console.log(value);
      if(typeof conversations.find(x => x.to_user === value) !== 'undefined'){
        setChatActive(value);
      }else{
        openChatConversation(value);
      }

  };



  async function openChatConversation(value){
    const response = await api.get('/findUser/'+value);
    setChatActive(value);

    const newConversation = {
      "datainclusao": new Date().toISOString(),
      "name": response.data.name,
      "texto": "", 
      "to_user": response.data.id
    }

    setConversations([...conversations, newConversation]);

  }

  function handleChange({ target }) {
    if(target.value != ''){
      setConversationsFiltered(conversations.filter((a) => !a.name.toLowerCase().indexOf(target.value.toLowerCase())))
    }else{
      setConversationsFiltered(conversations);
    }
  }

  
  async function loadUsers() {
    const response = await api.get('/findAllUsers');

    setUsers(response.data);
  }

  async function loadAllConversations() {
    const response = await api.get('/getAllConversations');

    setConversations(response.data);
    setConversationsFiltered(response.data);
  }

  async function loadMessagesChat(userId) {
    const response = await api.get('/getMessagesFromUser/'+userId);

    setMessages(response.data);

    MessageContainer.current.scroll(100000,1000000);
  }

  async function handleOnEnter(text) {
    const socket = io('http://localhost:3000');

    const message = await api.post('/messages', {
        text: text,
        to_user : chatActive,
        datainclusao: new Date()
    });


    setMessages([...messages, message.data[0] ]);
    socket.emit('sendMessage', message);

    textInput.current.value = "";

    MessageContainer.current.scroll(100000,1000000);
  }

  function handleChat(chatId){
    setChatActive(chatId);
    loadMessagesChat(chatId);
  }
  

  useEffect(() => {
    loadAllConversations();
  }, [messages]);

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on("sendMessage", data => {
      console.log(data);
    });
  }, []);


  return (
    <Container>
      <Aside>
        <SearchBox>
          <Input
            name="busca"
            type="text"
            onChange={(a) => handleChange(a)}
            placeholder="Buscar conversa ..."
          ></Input>
        </SearchBox>
        <NewChat onClick={handleClickOpen}>NOVA CONVERSA</NewChat>
        <NewConversation selectedValue={selectedValue} open={open} onClose={handleClose} users={users} />
        <Conversations>
          <ul>
            {conversationsFiltered.map(a => (
              <Conversation active={chatActive == a.to_user} unread={false} onClick={() => handleChat(a.to_user)}>
                  <img src={'https://api.adorable.io/avatars/50/abott@adorable.png'} alt={a.name}/>
                  <div>
                    <h3>{a.name.length > 25 ? a.name.substring(0,25) + " .." : a.name}</h3>
                    <p>{a.texto.length > 35 ? a.texto.substring(0,35) + " .." : a.texto}</p>
                  </div>
                  <small>
                  {new Date(a.datainclusao).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </small>
              </Conversation>
            ))}
          </ul>
        </Conversations>
      </Aside>
      <MainContent>
        <ChatContainer>
          <ChatLog ref={MessageContainer}>
            {messages.map((item,i) => (
              <ChatMessage direction={item.fromUser.id == profile.id ? true : false} key={i}>
                <div>
                    {item.text}
                </div>
                <span>
                  <time>{new Date(item.datainclusao).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</time>
                </span>
            </ChatMessage>
            ))}
          </ChatLog>
          <ChatInputArea>
            <InputEmoji
              name="busca"
              type="text"
              fontFamily="Roboto"
              placeholder="Digite sua mensagem ..."
              ref={textInput}
              onEnter={handleOnEnter}
            ></InputEmoji>
          </ChatInputArea>
        </ChatContainer>
      </MainContent>
    </Container>
  );
}
