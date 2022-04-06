import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import {io} from 'socket.io-client'
import { Context } from '../../context/AuthContext';

function Oldfriendlist({c, userid}) {
    const socketRef = useRef()
    const [friend, setFriend] = useState({})
    const [onlineUser, setOnlineUser] = useState()
    const {user} = useContext(Context)


    useEffect(()=>{
        socketRef.current = io("ws://localhost:9000")
        socketRef.current.emit('sendUserData',{
          user
        })// eslint-disable-next-line react-hooks/exhaustive-deps
      },[])

    useEffect( ()=>{
        const frnd = c.members.find(m=> m!==userid)
        //console.log(frnd, "fdfd");
        const getUser = async ()=>{
            const getFriendinfo = await axios.get('/auth/'+frnd)
            //console.log("fdata",getFriendinfo.data);
            setFriend(getFriendinfo.data)
        }
        getUser()

        socketRef.current.on("userList", userList =>{
            //console.log('add',userList);
            setOnlineUser(userList)
          })
          socketRef.current.on("filteredUsers", filterList=>{
            //console.log('dis',datalist);
            setOnlineUser(filterList)
          })
    },[userid,c])

   

  return (
    <div className="conversationContainer">
        <div className="namepic">
            <div className={onlineUser?.some((ou) => ou.uid === friend._id ) ? "onlineUser" : 'pic'}>{friend?.profilePic}</div>
            <div className="friendsname">{friend?.name}</div>
        </div>
        
    </div>
  )
}

export default Oldfriendlist