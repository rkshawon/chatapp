import React, { useContext, useState } from 'react'
import { Context } from '../context/AuthContext'
import './home.css'
import Message from './message/Message'
import Oldconversation from './oldconversation/Oldconversation'

function Home() {
  const {user} = useContext(Context)
  const [message, setMessage] = useState()
  const [conversation, setConversation] = useState([])

  const getMessageAndC = (mgs)=>{
    //console.log(mgs)
    setMessage(mgs)
  }
  const Con = (c)=>{
    //console.log(c);
    setConversation(c)
  }
  
  return (
    user ?
    <div className='home'>
      <Oldconversation getMgsfromOdlconversation= {getMessageAndC} Con = {Con}/>
      <Message messageDisplay = {message} conversation = {conversation}/>
    </div>: <div>User is not Loged in</div>
  )
}

export default Home