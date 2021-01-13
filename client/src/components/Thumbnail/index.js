import React from 'react';
import { useHistory } from "react-router-dom";

import FavoriteButton from '../FavoriteButton';
import styles from './styles.module.css';

const Thumbnail = (props) => {
  const history = useHistory();
  const char = props.char;
  
  const navigateToDetails = () => {
    history.push('/character/' + char.id);
  }

  return (
    <div className={styles.container} onClick={navigateToDetails}>
      <div className={styles.imgContainer}>
        {/* TODO: small loading img here */}
        <img src={char.image} />
        <div><FavoriteButton id={char.id} /></div>
      </div>
      <span>{char.name}</span> 
      <span>{char.gender} - {char.species} - {char.status}</span>
      <span>{char.origin.name}</span>
    </div>
  )
}

export default Thumbnail;
