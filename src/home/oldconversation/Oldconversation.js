import { Context } from '../../context/AuthContext';
import './oldconversation.css'
import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import {io} from 'socket.io-client'
import Oldfriendlist from './Oldfriendlist';


function Oldconversation({getMgsfromOdlconversation, Con}) {
  const [conversation, setConversation] = useState([])
  const [chat, setChat] = useState()
  const [newUser, setNewUser] = useState()
  const {user} = useContext(Context)
  const socketRef = useRef()

  useEffect(()=>{
    socketRef.current = io("ws://localhost:9000")
    socketRef.current.emit('sendUserData',{
      user
    })
    socketRef.current.emit("newUser", {
      newUser: false
    })
    socketRef.current.on("newuser",(newuser)=>{
      console.log(newuser);
      setNewUser(newuser)
    })


    const getallUsers = async ()=>{
      const getalluser = await axios.get("/allusers")
      const owninfo = await axios.get("/allusers/"+user._id)
      //console.log(owninfo.data.firstTime);
      //setAllUsers(getalluser.data)
      getalluser.data.map( async u =>{
        const startConversation = {
          senderId: user._id,
          receiverId: u._id
        }
        owninfo.data.firstTime && user._id !== u._id && await axios.post("/conversation", startConversation)
      })
      await axios.put("/allusers/"+user?._id)
    }
    getallUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  //console.log(allusers?.[0]._id);

  useEffect(()=>{
    socketRef.current.emit("sendId",user?._id)
    socketRef.current.on("getUsers", users=>{
      //console.log(users);
    })
  },[user])

  useEffect(()=>{
    let now = new Date().getTime()
    const getConversation = async ()=>{

    if(new Date().getTime() - now > 2000){
      clearInterval(getConversation);
      return
    }
     const res = await axios.get('/conversation/'+user?._id)
     console.log("caaling");
     setConversation(res.data)
   }
   setInterval(getConversation, 500)
  },[user?._id])

  useEffect(()=>{
    //let now = new Date().getTime()
    const getConversation = async ()=>{

    // if(new Date().getTime() - now > 5000){
    //   clearInterval(getConversation);
    //   return
    // }
     const res = await axios.get('/conversation/'+user?._id)
     console.log("caaling",  newUser);
     setConversation(res.data)
   }
   setTimeout(getConversation, 1000)
  },[newUser])

  useEffect(()=>{
    const getMessage = async ()=>{
      const mgs = await axios.get("/message/"+chat?._id)
      //console.log(chat?._id, mgs.data);
      getMgsfromOdlconversation(mgs.data)
    }
    getMessage()
    //console.log("conversation ",conversation);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[chat])

  return (
    <div className='oldconversation'>Oldconversation
      
        {conversation.map((c, index)=>{
         return(
         <div key={index} onClick={()=>{setChat(c); Con(c) }}>
            <Oldfriendlist c={c} userid = {user._id}/>
          </div>
         )
        })}
      </div> 
  )
}

export default Oldconversation