import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Component/Login';
import { urlWeather } from './endpoint';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Home from './Component/Home';

  function App() {
 
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
