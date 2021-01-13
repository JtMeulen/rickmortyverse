import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { switchPage } from '../../store/app-actions';

import styles from './styles.module.css';

const Pagination = (props) => {
  const handlePageClick = (page) => {
    props.switchPage(page);
  }

  return (
    <div>
      {[...Array(props.pages).keys()].map((i, idx) => {
        const pagenum = idx + 1;
        return <span key={pagenum} onClick={() => handlePageClick(pagenum)}>{pagenum}</span>
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
