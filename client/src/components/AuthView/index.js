import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { loggedIn, loggedOut } from '../../store/user-actions';
import Loader from '../Loader';

import styles from './styles.module.css';

const AuthView = (props) => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const isFormValid = () => {
    // Minimum length of both username and password need to be 6 chars
    // When registering new account, have password and repeatPassword match
    const inputLength = username.length > 6 && password.length > 6;
    const passwordMatch = repeatPassword === password;   

    return isLogin ? inputLength : inputLength && passwordMatch;
  }

  const handleError = () => {
    setError('Please try again');
    setLoading(false);
    setPassword('');
  }

  const handleFormToggle = () => {
    setPassword('');
    setRepeatPassword('');
    setIsLogin(!isLogin);
  }

  const handleSuccess = (user) => {
    props.loggedIn(user);
    history.push("/");
  }

  const handleAuth = () => {
    if(!isFormValid()) {
      return setError('Your input values are incorrect');
    };

    setError('');
    setLoading(true);

    const authtype = isLogin ? 'login' : 'register';
    fetch(`/api/user/${authtype}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(data => handleSuccess(data))
    .catch(() => handleError());
  }

  const handleLogout = () => {
    fetch('/api/user/logout')
      .then(() => props.loggedOut())
      .catch(() => handleError());
  }

  return (
    props.authenticated ? <p className={styles.clickableText} onClick={handleLogout}>Click here to logout!</p> : (
      <div className={styles.container}>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <p onClick={handleFormToggle} className={styles.clickableText}>
          {isLogin ? 'No account? Click here to register' : 'Click here to login'}
        </p>

        <input 
          type="text" 
          onChange={e => setUsername(e.target.value)}
          placeholder={'Username (6 chars minimum)'}
          value={username} 
        />
        <input 
          type="password" 
          onChange={e => setPassword(e.target.value)}
          placeholder={'Password (6 chars minimum)'} 
          value={password} 
        />
        {!isLogin && (
          <input 
            type="password" 
            onChange={e => setRepeatPassword(e.target.value)} 
            placeholder={'Repeat password'} 
            value={repeatPassword} 
          />
        )}

        <button onClick={handleAuth} disabled={!isFormValid() || loading}>
          {isLogin ? 'Login' : 'Register'}
        </button>

        {loading && <Loader />}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    )
  )
}

const mapStateToProps = (state) => {
  return { authenticated: state.user.auth }
};

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: (user) => dispatch(loggedIn(user)),
    loggedOut: () => dispatch(loggedOut())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthView);
