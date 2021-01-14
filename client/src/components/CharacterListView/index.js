import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

import Loader from '../Loader';
import Pagination from '../Pagination';
import List from '../List';

const CharacterListView = (props) => {
  const history = useHistory();
  const [characters, setCharacters] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  useEffect(() => {
    setCharacters([]);
    fetch(`/api/characters?page=${props.currentPage}`)
      .then(res => res.json())
      .then(data => {
        if(!data.authenticated) {
          history.push('/auth');
        } else {
          setPageCount(data.pages);
          setCharacters(data.characters);
        }
      })
  }, [props.currentPage])

  return (
    <div>
      <Pagination pages={pageCount} />
      {characters.length ? <List characters={characters} /> : <Loader />}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { currentPage: state.app.page }
};

export default connect(mapStateToProps)(CharacterListView);
