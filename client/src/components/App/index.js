import React, { useEffect } from 'react';

const App = () => {
  const register = (e) => {
    e.preventDefault();
    const formValues = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    fetch('/api/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        console.log('Success:', data);
      }
    })
    .catch((err) => console.error(err));
  }

  const login = (e) => {
    e.preventDefault();
    const formValues = {
      username: e.target.username.value,
      password: e.target.password.value
    }

    fetch('/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        console.log('Success:', data);
      }
    })
    .catch((err) => console.error(err));
  }

  const logout = () => {
    fetch('/api/user/logout', {
      method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
      if(data.error) {
        console.log(data.error)
      } else {
        console.log('Success:', data);
      }
    })
    .catch((err) => console.error(err));
  }

  return (
    <>
      <form name="register" onSubmit={register}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" />
      </form>
      <form name="login" onSubmit={login}>
        <input type="text" name="username" />
        <input type="password" name="password" />
        <input type="submit" />
      </form>
      <button onClick={() => fetch('/api/user')}>get user</button>
      <button onClick={() => logout()}>logout</button>
    </>
  )
}

export default App;
