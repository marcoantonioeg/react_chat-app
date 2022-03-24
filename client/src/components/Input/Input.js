import React from 'react'
import  './Input.css'
const Input = ({message, setMessage, sendMessage}) => {
  return (
<form className='form'>
    <input className='input' 
    type="text" 
    placeholder='Escribe un mensaje'
    value={message} 
    onChange={({ target: { value } }) => setMessage(value)} 
    onKeyPress={event => event.key === 'Enter' ? sendMessage(event): null}
    />
    <button className='sendButton' onClick={event=>sendMessage(event)}>
        Enviar
    </button>
</form>
  )
}

export default Input