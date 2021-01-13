import React, { useEffect } from 'react';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { loggedIn } from '../../store/user-actions';

import CharacterView from '../CharacterView';
import CharacterListView from '../CharacterListView';
import FavoritesView from '../FavoritesView';
import AuthView from '../AuthView';
import NotFoundView from '../NotFoundView';
import Navbar from '../Navbar';

const App = (props) => {
  const history = useHistory();

  // make initial auth query to see if user is logged in and set this in redux store
  useEffect(() => {
    fetch('/api/user')
      .then(res => res.json())
      .then(data => handleAuth(data))
      .catch((err) => console.error(err))
  }, []);

  const handleAuth = (data) => {
    if(data.auth) {
      props.loggedIn(data.username);
    } else {
      history && history.push('/auth');
    }
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/" exact render={(props) => <CharacterListView {...props} />} />
        <Route path="/character/:id" exact render={(props) => <CharacterView {...props} />} />
        <Route path="/favorites" exact render={(props) => <FavoritesView {...props} />} />
        <Route path="/auth" exact render={(props) => <AuthView {...props} />} />

        {/* Catch all other routes and render 404 */}
        <Route path="/" render={(props) => <NotFoundView {...props} />} />
      </Switch>
    </BrowserRouter>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    loggedIn: (username) => dispatch(loggedIn(username))
  }
}

export default connect(null, mapDispatchToProps)(App);
