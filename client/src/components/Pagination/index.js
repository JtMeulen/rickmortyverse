import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { switchPage } from '../../store/app-actions';

import styles from './styles.module.css';

const Pagination = (props) => {
  const handlePageClick = (page) => {
    props.switchPage(page);
  }

  const getRange = () => {
    let start = props.currentPage - 2;
    let end = props.currentPage + 2;

    if(start < 1) {
      start = 1;
      end = 5;
    } else if (end > props.pages) {
      start = props.pages - 5;
      end = props.pages;
    }
    return Array(end - start + 1).fill().map((_, idx) => start + idx)
  }

  return (
    <div className={styles.container}>
      {getRange().map((i, idx) => {
        const pagenum = i;
        const active = props.currentPage === pagenum;
        return (
          <div 
            key={pagenum}
            className={styles.button}
            style={{ background: active ? 'yellowgreen' : 'white'}}
            onClick={() => handlePageClick(pagenum)}
          >
            {pagenum}
          </div>
        )
      })}
    </div>
  )
}

const mapStateToProps = (state) => {
  return { currentPage: state.app.page }
};

const mapDispatchToProps = dispatch => {
  return {
    switchPage: (page) => dispatch(switchPage(page))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
