import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

let socket;

const Chat = () => {
  const backendUrl = 'https://chat-app-server-nine-blond.vercel.app';
  const [user, setUser] = useState('');
  const [room, setRoom] = useState('');
  const [text, setText] = useState('');
  const [message, setMessage] = useState([]);

  useEffect(() => {
    const url = window.location.search;
    const searchParams = new URLSearchParams(url);
    const name = searchParams.get('name');
    const roomName = searchParams.get('room');

    setUser(name);
    setRoom(roomName);

    socket = io(backendUrl);
    socket.emit('addItem', { name, room: roomName }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      socket.disconnect();
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessage((prevMsg) => [...prevMsg, message]);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (text.trim()) {
      socket.emit('sendMsg', text, () => {
        setText('');
      });
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-xl mx-auto border border-gray-300 rounded-lg shadow-md">
      <div className="bg-blue-500 text-white p-4 rounded-t-lg text-center">
        <h2 className="text-lg font-bold">Room: {room}</h2>
        <p className="text-sm">Logged in as: {user}</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 bg-gray-100">
        {message.map((msg, index) => (
          <div key={index} className="mb-2 p-2 bg-white rounded shadow">
            <strong className="text-blue-500">{msg.user}</strong>: {msg.text}
          </div>
        ))}
      </div>
      <form className="flex items-center p-4 bg-white border-t border-gray-300" onSubmit={sendMessage}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
