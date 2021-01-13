import React from 'react';
import { NavLink } from 'react-router-dom';
import { useHistory } from "react-router-dom";

import styles from './styles.module.css';

const Navbar = () => {
  const history = useHistory();

  const goBack = () => {
    history.goBack();
  }

  return (
    <div className={styles.container}>
      <div>
        <span className={styles.link} onClick={goBack}>{'< Back'}</span>
        <span className={styles.title}>Rick & Mortyverse</span>
      </div>
      <div>
        <NavLink 
          to="/favorites" 
          exact
          className={styles.link} 
          activeClassName={styles.active}
        >
          Favorites
        </NavLink>
        <NavLink 
          to="/" 
          exact
          className={styles.link} 
          activeClassName={styles.active}
        >
          All Characters
        </NavLink>
      </div>
    </div>
  )
}

export default Navbar;
