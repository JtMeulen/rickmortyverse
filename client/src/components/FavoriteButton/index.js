import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { setFavorites } from '../../store/user-actions';
import heart from '../../assets/heart.svg';
import heartEmpty from '../../assets/heart_empty.svg';
import styles from './styles.module.css';

const FavoriteButton = (props) => {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(props.favorites.includes(props.id))
  }, [props.favorites])

  const handleClick = () => {
    if(props.notClickable) {
      return;
    }

    fetch(`/api/favorites/${isFavorite ? 'delete' : 'add'}`, {
      method: isFavorite ? 'DELETE' : 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: props.id }),
    })
    .then(res => res.json())
    .then(data => {
      props.setFavorites(data.favorites);
    })
    .catch(err => console.error(err));
  }

  return <img className={styles.heart} src={isFavorite ? heart : heartEmpty} onClick={handleClick}/>
}

const mapStateToProps = (state) => {
  return { favorites: state.user.favorites }
};

const mapDispatchToProps = dispatch => {
  return {
    setFavorites: (favorites) => dispatch(setFavorites(favorites))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteButton);
