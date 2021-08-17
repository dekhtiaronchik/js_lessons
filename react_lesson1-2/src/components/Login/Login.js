import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <form>
        <p>Fill in the form below to login to your account.</p>
        <div>
          <input placeholder="Email" name="email" type="email" />
        </div>
        <div>
          <input placeholder="Password" name="password" type="password" />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <hr />
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
