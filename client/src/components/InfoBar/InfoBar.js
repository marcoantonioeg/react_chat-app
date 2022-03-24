import React from 'react'
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'
import './InfoBar.css'
const InfoBar = ({room}) => (

    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img className='outlineIcon' src={onlineIcon} alt='online'/>
            <h3 className='h3room'>{room}</h3>
        </div>
        <div className='rightInnerContainer'>
            <a href='/'>
            <img src={closeIcon} alt='cerrar'/>

            </a>
        </div>
    </div>
  
)

export default InfoBar