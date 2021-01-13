import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import List from '../List';

const FavoritesView = () => {
  const history = useHistory();
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('/api/favorites')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(!data.authenticated) {
          // props.loggedOut();
          history.push('/auth');
        } else {
          setCharacters(data.characters);
        }
      })
  }, [])

  return characters.length ? <List characters={characters} /> : <p>loading</p>;
}

export default FavoritesView;
