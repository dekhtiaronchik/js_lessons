import React from "react";
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div>
      <form>
        <p>Fill in the form below to register new account.</p>
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
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
