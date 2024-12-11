import React, { useEffect, useState } from 'react';
import { Router } from 'react-router-dom';
import io from 'socket.io-client';

let socket;
const Chat = () => {
   const backendUrl = 'http://localhost:8000'
   const [user, setUser] = useState("");
   const [room, setRoom] = useState("");
   const [text, setText] = useState("");
   const [message, setMessage] = useState([]);


    useEffect(() => {
      const url = window.location.search;
      const searchParams = new URLSearchParams(url);
      const name = searchParams.get('name');
      const roomName = searchParams.get('room');

      setUser(name);
      setRoom(roomName);

      console.log(name, roomName)
      socket = io(backendUrl)
      socket.emit('addItem', {name : name,room :  roomName}, (error) => {
        if(error) {
          alert(error)
        }
      })

      return () => {
        socket.disconnect();
        socket.off()
      }
    }, [])

    useEffect(() => {
      socket.on('message', (message) => {
        setMessage(prevMsg => [...prevMsg, message])
        
      })
    }, [])

  const sendMessage = (e) => {
      socket.emit('sendMsg', text, () => {
        setText('')
      })
  }


  return (
    <div>
      <ul>
        {
          message.map((msg, index) => {
            return <li key={index}>{JSON.stringify(msg)}</li>
          })
        }
      </ul>

      <input type="text" value={text} 
        onKeyDown={(e) => e.key === 'Enter' ? sendMessage(e) : null}
      onChange={(e) => setText(e.target.value)} />
      

    </div>
  )
}

export default Chat