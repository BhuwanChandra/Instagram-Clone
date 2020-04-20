import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import { UserContext } from '../App';

function Login() {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const PostData = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Invalid Email", classes: '#e53935 red darken-1' });
      return;
    }
    fetch("/signin", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        if (data.error)
          M.toast({ html: data.error, classes: '#e53935 red darken-1' })
        else{
          localStorage.setItem("jwt", data.token);
          localStorage.setItem("user", JSON.stringify(data.user))
          dispatch({type: "USER", payload: data.user});
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push('/')
        }
      })
      .catch(err => console.log(err));
  };
  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <input
          value={email}
          type="email"
          placeholder="email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          value={password}
          type="password"
          placeholder="password"
          onChange={e => setPassword(e.target.value)}
        />
        <button
          className="btn #42a5f5 blue darken-1"
          type="submit"
          name="action"
          onClick={PostData}
        >
          Login
        </button>
        <h6>
          Don't have an account?
          <Link to="/signup"> signup</Link>
        </h6>
      </div>
    </div>
  );
}

export default Login;
