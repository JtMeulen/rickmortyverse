import React from 'react';
import notFoundImg from '../../assets/404.jpg';
import styles from './styles.module.css';

const NotFoundView = () => {
  return (
    <div className={styles.container}>
      <img src={notFoundImg} className={styles.img} alt={'404 - Not Found'}/>
    </div>
  )
}

export default NotFoundView;
