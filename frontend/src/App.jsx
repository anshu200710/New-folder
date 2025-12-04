import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/to-do-app-pages/Login'
import Home from './pages/to-do-app-pages/Home'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks" element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
