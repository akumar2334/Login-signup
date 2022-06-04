import React, { useState } from 'react'
import './css/main.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './component/Login';
import Signup from './component/Signup';
import Home from './component/Home';
function App() {
  return (
    <div className="App">
      <div className='mainApp'>
        <Routes>
          <Route index exact path="/" element={<Login />} />
          <Route index exact path="/signup" element={<Signup />} />
          <Route index exact path="/home" element={<Home />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
