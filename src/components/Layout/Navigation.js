import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import classes from './Navigation.module.css';

import AuthContext from '../../store/AuthContext';

const Navigation = () => {

  const authCxt = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        <li>
          <NavLink activeClassName={classes.active} to="/" exact>Home</NavLink>
        </li>
        {!authCxt.isLoggedIn &&
          <li>
            <NavLink activeClassName={classes.active} to="/login">Login</NavLink>
          </li>
        }
        {!authCxt.isLoggedIn &&
          <li>
            <NavLink activeClassName={classes.active} to="/signup">Signup</NavLink>
          </li>
        }
        {authCxt.isLoggedIn &&
          <li>
            <NavLink activeClassName={classes.active} to="/profile">Profile</NavLink>
          </li>
        }
        {authCxt.isLoggedIn &&
          <li>
            <button onClick={authCxt.logout}>Logout</button>
          </li>
        }
      </ul>
    </nav>
  );
};

export default Navigation;
