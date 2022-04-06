import axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react'
import {io} from 'socket.io-client'
import { Context } from '../../context/AuthContext';
import './message.css'
import MessageDisplay from './MessageDisplay'

function Message({messageDisplay, conversation}) {
  const [singleMgs, setSingleMgs] = useState([])
  const {user} = useContext(Context)
  const [text, setText] = useState('')
  const [arrivalMessage, setArrivalMessage] = useState(null)
  const socketRef = useRef()
  const idToSend = conversation?._id

  const mgstoDisplay = conversation?.members?.find(f=> f !== user._id)

  useEffect(()=>{
    setSingleMgs(messageDisplay);
  },[messageDisplay])

  useEffect(()=>{
    socketRef.current = io("ws://localhost:9000")
    socketRef.current.on("getMessage", (data) =>{
      //console.log('data',data);
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        recieverId: data.recieverId,
        receiverSocketId: data.receiverSocketId
      })
    })
  },[])

  //const senderid = singleMgs?.find(s => s.senderId === arrivalMessage?.sender)

  useEffect(()=>{
    //console.log(senderid === arrivalMessage?.sender, senderid, arrivalMessage?.sender);
    arrivalMessage && arrivalMessage.recieverId === user._id && mgstoDisplay === arrivalMessage?.sender &&
    setSingleMgs([...singleMgs, arrivalMessage])
    // eslint-disable-next-line react-hooks/exhaustive-deps
},[arrivalMessage])


  const logOut = ()=>{
    localStorage.clear();
    //dispatch({type: "LOGOUT"})
    
  }

  const reciever = conversation.members?.find(m=> m !== user._id)

  const sendMessage = async ()=>{
    const messageToSend = {
      conversationId: idToSend,
      senderId: user._id,
      text: text
    }
    socketRef.current.emit("sendMessage",{
      senderId: user._id,
      recieverId: reciever,
      text:text
    })
    await axios.post("/message", messageToSend)
    setSingleMgs([...singleMgs, messageToSend])
  }


  return (
    <div className='message'>
      <div className="messageContainer">
        <div className="username"> <div className='name'>Name</div>
        <a  href ="/login" style={{ color:'inherit', textDecoration:'inherit'}}><div onClick={logOut}>Logout</div></a>
       </div>
        <div className="messagefield">
         {singleMgs &&
           singleMgs.map((smgs, index)=>{
             return(
              <div key={index} className='textmessage'>
                <MessageDisplay singlemgs = {smgs} user={user}/>
              </div>
              )
           })
         }
        </div>
        <div className="inputfield">
          <textarea className="textarea"  rows="4" cols="80" onChange={(e)=>setText(e.target.value)} ></textarea>
          <button className='button' onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  )
}

export default Message