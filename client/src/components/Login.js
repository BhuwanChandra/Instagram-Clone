import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import M from 'materialize-css';
import { UserContext } from '../App';
import Loading from "./Partials/Loading";

function Login() {
  const history = useHistory();
  const { dispatch } = useContext(UserContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const PostData = () => {
    if (!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
      M.toast({ html: "Invalid Email", classes: '#e53935 red darken-1' });
      return;
    }
    setLoading(true);
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
        // console.log(data);
        setLoading(false);
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
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>{loading ?
      <Loading /> :
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
          <div style={{marginBottom: '2rem'}}>
            <Link style={{float: 'right',margin: 0}} to="/reset">forgot password?</Link>
          </div>
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
    }
    </>
  );
}

export default Login;
