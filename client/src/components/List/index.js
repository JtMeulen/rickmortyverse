import React, { useEffect } from 'react';

import styles from './styles.module.css';

const List = ({ characters }) => {
  return characters.map((char) => {
    return <div>{char.name}</div>
  })
}

export default List;
