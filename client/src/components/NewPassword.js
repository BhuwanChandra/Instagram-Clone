import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import M from 'materialize-css';
import Loading from "./Partials/Loading";

function NewPassword() {
  const history = useHistory();
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { token } = useParams();
   console.log(token);
    
  const PostData = () => {
    if(password !== confPassword){
        M.toast({ html: "confirm password doesn't match", classes: '#e53935 red darken-1' })
        return null;
    }
    setLoading(true);
    fetch("/new-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        password,
        token
      })
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        setLoading(false);
        if (data.error)
          M.toast({ html: data.error, classes: '#e53935 red darken-1' })
        else{
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push('/login')
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
            value={password}
            type="password"
            placeholder="enter new password"
            onChange={e => setPassword(e.target.value)}
          />
          <input
            value={confPassword}
            type="password"
            placeholder="confirm new password"
            onChange={e => setConfPassword(e.target.value)}
          />
          <button
            className="btn #42a5f5 blue darken-1"
            type="submit"
            name="action"
            onClick={PostData}
          >
            Set Password
          </button>
        </div>
      </div>
    }
    </>
  );
}

export default NewPassword;
