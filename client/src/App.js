import React, { createContext, useEffect, useReducer, useContext} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';
import { reducer, InitialState } from './reducers/userReducer';


export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const {state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type: "USER", payload: user});
    }
    else
      history.push('/login');
  }, []);
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/signup">
        <Signup />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route exact path="/profile">
        <Profile />
      </Route>
      <Route path="/profile/:userId">
        <UserProfile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
    </Switch>
  );
}

function App() {
  const [state, dispatch] = useReducer(reducer, InitialState);
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <Navbar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
