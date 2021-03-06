import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Join.css';

export default function SignIn() {
  //setter states
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className='joinOuterContainer'>
      <div className='joinInnerContainer'>
        <h1 className='heading'>Bienvenido a Chat-App</h1>
        <div>
          <input placeholder='Nombre' className='joinInput' type="text" onChange={(event)=>setName(event.target.value)}/>
        </div>
        <div>
          <input placeholder='Sala' className='joinInput mt-20' type="text" onChange={(event)=>setRoom(event.target.value)}/>
        </div>
        {/*Link lee los datos ingresos que son el nombre y la sala*/}
        <Link onClick={event => (!name || !room) ? event.preventDefault(): null} to={`/chat?name=${name}&room=${room}`}>
          <button className='button mt-20' type='submit'>Entrar</button>
        </Link>
      </div>
    </div>
  )
}

