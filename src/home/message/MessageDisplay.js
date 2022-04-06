import React from 'react'
import './messagedisplay.css'

function MessageDisplay({singlemgs, user}) {

  return (
   <>
      <div className={singlemgs.senderId !== user._id ? "texttime" : "texttimemine"}>
        <div className={singlemgs.senderId !== user._id ? "text" : "textmine"}>{singlemgs.text}</div>
        <div className="time ">10.50pm</div>
      </div>
      
   </>

  )
}

export default MessageDisplay