import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import Loader from '../Loader';
import List from '../List';

const FavoritesView = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch('/api/favorites')
      .then(res => res.json())
      .then(data => {
        if(!data.authenticated) {
          history.push('/auth');
        } else {
          setCharacters(data.characters);
          setLoading(false);
        }
      })
      .catch((err) => console.error(err))
  }, [])

  return loading ? <Loader /> : (
    characters.length 
      ? <List characters={characters} />
      : <p style={{ textAlign: 'center' }}>You don't have any favorites yet!</p>
  );
}

export default FavoritesView;
