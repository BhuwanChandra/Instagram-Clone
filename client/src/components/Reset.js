import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import M from "materialize-css";
import Loading from "./Partials/Loading";

function Reset() {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const PostData = () => {
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      M.toast({ html: "Invalid Email", classes: "#e53935 red darken-1" });
      return;
    }
    setLoading(true);
    fetch("/reset-password", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email
      })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.error)
          M.toast({ html: data.error, classes: "#e53935 red darken-1" });
        else {
          M.toast({ html: data.message, classes: "#43a047 green darken-1" });
          history.push("/login");
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="my-card">
          <div className="card auth-card input-field">
            <h2 className="brand-logo">Instagram</h2>
            <input
              value={email}
              type="email"
              placeholder="enter your email"
              onChange={e => setEmail(e.target.value)}
            /><br/>
            <button
              className="btn #42a5f5 blue darken-1"
              type="submit"
              name="action"
              onClick={PostData}
            >
              Reset Password
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Reset;
