import React, { createContext, useEffect, useReducer, useContext} from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import { reducer, InitialState } from './reducers/userReducer';
import Navbar from './components/Partials/Navbar';
import Home from './components/Home';
import Signup from './components/Signup';
import Login from './components/Login';
import Profile from './components/Profile';
import UserProfile from './components/UserProfile';
import CreatePost from './components/CreatePost';
import Explore from './components/Explore';
import EditProfile from './components/EditProfile';
import Reset from './components/Reset';
import NewPassword from './components/NewPassword';

export const UserContext = createContext();

const Routing = () => {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if(user){
      dispatch({type: "USER", payload: user});
      fetch("/user", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("jwt")
        }
      })
        .then(res => res.json())
        .then(res => {
          dispatch({type: "USER", payload: res});
        })
        .catch(err => console.log(err));
    }
    else{
      if(!history.location.pathname.startsWith('/reset'))
      history.push('/login');
    }
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
      <Route exact path="/profile/edit">
        <EditProfile />
      </Route>
      <Route path="/profile/:userId">
        <UserProfile />
      </Route>
      <Route path="/create">
        <CreatePost />
      </Route>
      <Route path="/explore">
        <Explore />
      </Route>
      <Route exact path="/reset">
        <Reset />
      </Route>
      <Route path="/reset/:token">
        <NewPassword />
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
