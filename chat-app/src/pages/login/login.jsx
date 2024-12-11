import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [user, setUser] = useState("")
  const [room, setRoom] = useState("")    


  const validation = (e) => {
      e.preventDefault();
      if (user.length < 1) {
          alert("Please enter a username");
          return;
      }
      if (room.length < 1) {
          alert("Please enter a room name");
          return;
      }
      window.location.href = `/chat?name=${user}&room=${room}`
      
  }

  return (<>
      <div className='flex justify-center items-center h-screen bg-gradient-to-r from-[#2BC0E4] to-[#EAECC6]'>
    <div className='bg-gray-200 p-4 rounded-lg shadow-xl w-[400px] h-[400px]'>
      <h1 className='text-2xl font-bold mb-4 text-center'>Login</h1>
      <form>
        <div className='mb-4'>
          <label htmlFor='username' className='block text-gray-700 font-bold mb-2'>Username</label>
          <input type='text' id='username' className='border border-gray-800 rounded-lg px-3 py-2 w-full '
            autoComplete='off' onChange={(e) => setUser(e.target.value)} />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 font-bold mb-2'>Room</label>
            <input type='text' id='password' className='border border-gray-800 rounded-lg px-3
            py-2 w-full' onChange={(e) => setRoom(e.target.value)}/>
        </div>
        <div className='flex justify-between'>
        <button type='reset' className=' text-slat-900 underline font-bold
            py-2 px-4 rounded-lg  mt-5'>Reset</button>
        <Link onClick={validation}>
            <button type='submit' className='bg-blue-500 text-white font-bold
            py-2 px-4 rounded-lg  mt-5'>Login</button>
        </Link>
        </div>
      </form>
    </div>
  </div>
  
  
  </>
  )
}

export default Login