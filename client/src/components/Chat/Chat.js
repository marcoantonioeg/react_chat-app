import React, {useEffect, useState} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import InfoBar from '../InfoBar/InfoBar';
import './Chat.css';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
//socket
let socket;
const Chat = ({location}) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  //state para obtener todos los mensajes y almacenarlos en un arrray
  const [messages, setMessages] = useState([]);
  //state para un mensaje en especifico
  const [message, setMessage] = useState('');

  const ENDPOINT = 'localhost:5000';
  useEffect(()=>{
    const {name, room} = queryString.parse(location.search);
    socket = io(ENDPOINT)
    setName(name);
    setRoom(room);
    console.log(name, room);
    console.log(location.search);
    console.log(socket);
    //emiter para saber que se unió a la sala
    socket.emit('join', {name, room}, (error)=>{
      if(error){
        alert(error);
      }
    });
    /*
    return()=>{
      socket.emit('disconnect');
      socket.off();
    }*/
  }, [ENDPOINT, location.search]);
  //hook para escuchar a los mensajes
  useEffect(()=>{
    socket.on('message', message=>{
      //push los mensajes al array de messages
      //agrega los mensajes de admin o de los usuarios al array de mensajes
      setMessages(messages=>[...messages, message]);
    });
    
  }, [messages]);
  //funccion para mandar mensajes
  const sendMessage = (event)=>{
    event.preventDefault();
    if(message){
      socket.emit('sendMessage', message, ()=>setMessage(''));
    }
  }
  console.log(message, messages);
  return (
    <div className='outerContainer'>
      <div className='container'>
        <InfoBar room={room}/>
        <Messages messages={messages} name={name}/>
        <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
      </div>
    </div>
  )
}

export default Chat