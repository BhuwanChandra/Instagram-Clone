import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import CreatePost from './components/CreatePost';
import { BrowserRouter, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Route exact path="/" >
        <Home />
      </Route>
      <Route path="/signup" >
        <Signup />
      </Route>
      <Route path="/login" >
        <Login />
      </Route>
      <Route path="/profile" >
        <Profile />
      </Route>
      <Route path="/create" >
        <CreatePost />
      </Route>
    </BrowserRouter>
  );
}

export default App;
