import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';

function Signup() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const PostData = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      M.toast({ html: "Invalid Email", classes: '#e53935 red darken-1' });
      return;
    }
    fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if(data.error)
          M.toast({ html: data.error, classes: '#e53935 red darken-1'})
        else{
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push('/login')
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <input
          value={name}
          type="text"
          placeholder="name"
          onChange={e => setName(e.target.value)}
        />
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
          SignUp
        </button>
        <h6>
          Already have an account?
          <Link to="/login">
            login
          </Link>
        </h6>
      </div>
    </div>
  );
}

export default Signup;
