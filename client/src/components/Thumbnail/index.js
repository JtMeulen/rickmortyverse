import React from 'react';
import { useHistory } from "react-router-dom";

import placeholder from '../../assets/img_placeholder.jpeg';
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
        <img src={placeholder} className={styles.characterImg} alt={'Placeholder'}/>
        <img src={char.image} className={styles.characterImg} alt={char.name} />
        <div>
          <FavoriteButton id={char.id} notClickable />
        </div>
      </div>
      <span>{char.name}</span> 
      <span>{char.gender} - {char.species} - {char.status}</span>
      <span>{char.origin.name}</span>
    </div>
  )
}

export default Thumbnail;
