import React, { useState } from 'react';
import call from '../service';
import { setCookie } from '../auth';

function Login() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  // On Login- API is called with username and Password
  function login() {
    call('post', '/api/login', data).then((result) => {
      console.log(result.data.token);
      setCookie(result.data.token);
      window.location = "/users";
    }).catch((e) => {
      setError('Username Or Password is Wrong !!');
    })
  }

  // Handlers to store changes into a State
  function handleChange(event) {
      setData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <div className="container">
      <div className="row">
        <div align="center" className="col-lg-12">
          <form className="form-signin col-md-4 col-md-offset-4 bg-light border rounded p-4 mt-4">
            <img className="mb-4" src="/docs/4.4/assets/brand/bootstrap-solid.svg" alt="" width="72" height="72" />
            <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
            <label htmlFor="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" name="email" className="form-control" placeholder="Email address" required autoFocus onChange={handleChange} /><br/>
            <label htmlFor="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required onChange={handleChange} /><br />
            <p className="text-danger">{ error }</p>
            <div className="checkbox mb-3">
              <div className="authfy-heading">
                <p>Don’t have an account? Sign Up </p>
              </div>
            </div>
            <button className="btn btn-lg btn-primary btn-block" type="button" onClick={login}>Sign in</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
