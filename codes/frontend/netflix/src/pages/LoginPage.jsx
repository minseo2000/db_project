import React from 'react';
import './login-page.css';
function LoginPage() {
  return (
    <div id="login-page">
      <img id="logo" src="/Netflix_Logo_PMS.png" alt="" />
      <div id="login-form">
        <h1>Sign in</h1>
        <form>
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign in</button>
          <p>New to Netflix? <a href="#">Sign up now.</a></p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;