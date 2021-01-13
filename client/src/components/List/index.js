import React from 'react';

import Thumbnail from '../Thumbnail';
import styles from './styles.module.css';

const List = ({ characters }) => {
  return (
    <div className={styles.container}> 
      {characters.map((char) => {
        return <Thumbnail char={char} key={char.id} />
      })}
    </div>
  )
}

export default List;
