import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="my-card">
      <div className="card auth-card input-field">
        <h2 className="brand-logo">Instagram</h2>
        <input type="text" placeholder="email" />
        <input type="password" placeholder="password" />
        <button class="btn #42a5f5 blue lighten-1" type="submit" name="action">
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
