import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";

import { loggedIn, loggedOut } from '../../store/user-actions';

import styles from './styles.module.css';

const AuthView = (props) => {
  const history = useHistory();
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = () => {
    // TODO add more validation. Perhaps double password checker
    return username.length > 6 && password.length > 6;
  }

  const handleError = () => {
    // TODO: Set actual error message
    setError(true);
    setLoading(false);
    setPassword('');
  }

  const handleSuccess = (user) => {
    props.loggedIn(user);
    history.push("/");
  }

  const handleAuth = () => {
    if(!isFormValid()) {
      return setError(true);
    };

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
    // TODO: Styling and code structure improvement
    props.authenticated ? <p className={styles.clickableText} onClick={handleLogout}>Click to logout first!</p> : (
      <div className={styles.container}>
        <h1>{isLogin ? 'Login' : 'Register'}</h1>
        <p onClick={() => setIsLogin(!isLogin)} className={styles.clickableText}>
          {isLogin ? 'No account? Click here to register' : 'Click here to login'}
        </p>

        {/* TODO remove autofill */}
        <input type="text" onChange={e => setUsername(e.target.value)} value={username} />
        <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
        <button onClick={handleAuth} disabled={!isFormValid() || loading}>
          {isLogin ? 'Login' : 'Register'}
        </button>
  
        {error && <p>An error has occured</p>}
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
