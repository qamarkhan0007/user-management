import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Login from './components/login';
import EmployeeList from './components/user/users';
import { getCookie } from './auth';

function App() {

  // Get Token from Cookie
  const token = getCookie();

  // Private Routes that can be accessible on if token is valid
  const PrivateRoute = ({ component: Component, ...props }) => {
    return (
      <Route
        {...props}
        render={innerProps =>
        !!token ? <Component {...innerProps} /> : <Redirect to="/" />
        }
      />
    );
  };

  // Main Routes
  return (
    <Router>
      <Route path="/" exact component={Login} />
      <PrivateRoute path="/users" exact component={EmployeeList} />
    </Router>
  );
}

export default App;
