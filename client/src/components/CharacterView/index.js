import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";

import styles from './styles.module.css';

const CharacterView = (props) => {
  const history = useHistory();
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/characters/' + props.match.params.id)
      .then(res => res.json())
      .then(data => {
        if(!data.authenticated) {
          // props.loggedOut();
          history.push('/auth');
        } else {
          console.log(data.character);
          setData(data.character);
        }
      })
  }, [])

  return (
    <div className={styles.container}>
      {!data ? 'loading' : (
        <>
          <img src={data.image} />
          <div className={styles.description}>
            <p>Name: {data.name}</p>
            <p>Gender: {data.gender}</p>
            <p>Species: {data.species}</p>
            <p>Status: {data.status}</p>
            <p>Location: {data.location.name}</p>
            <p>Origin: {data.origin.name}</p>
          </div>
          <ul className={styles.episodes}>
            <p>Episodes</p>
            {data.episode.map(ep => {
              return <li key={ep}>{ep.replace("https://rickandmortyapi.com/api/episode/", "")}</li>
            })}
          </ul>
        </>
      )}
    </div>
  )
}

export default CharacterView;
