import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import 'assets/css/material-dashboard-react.css';
import indexRoutes from 'routes/index.jsx';
import { UserProvider } from './usercontext'; // Import the UserProvider
import AppB from 'appb.js';
import App from './containers/App/App';
import Login from './views/Login/Login';

const hist = createBrowserHistory();

const MainApp = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <UserProvider> {/* Wrap your MainApp component with the UserProvider */}
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((route, key) => (
            <Route
              path={route.path}
              render={(props) =>
                route.path === '/login' ? (
                  <Login {...props} setLoggedIn={setLoggedIn} />
                ) : isLoggedIn ? (
                  <App {...props} />
                ) : (
                  <Login {...props} setLoggedIn={setLoggedIn} />
                )
              }
              key={key}
            />
          ))}
        </Switch>
      </Router>
    </UserProvider>
  );
};

ReactDOM.render(<MainApp />, document.getElementById('root'));
