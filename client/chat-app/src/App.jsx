import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Chat from './pages/chat.js/chat'
import Login from './pages/login/login'

function App() {

  return (
  <>
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </Router>
  </>
)}

export default App
