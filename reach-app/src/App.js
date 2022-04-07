
import './App.css';

import { Route, Routes } from 'react-router-dom';
import React, {useState} from 'react';
import HomePage from './pages/HomePage';
import ChatHome from './pages/ChatHome'
import LandingPage from './pages/LandingPage'




function App() {

  return (
    <div className="App">
      <Route path="/" component={LandingPage} exact/>
      <Route path="/home" component={HomePage} exact/>
      <Route path="/chats" component={ChatHome} />
    </div>
  );
}

export default App;
