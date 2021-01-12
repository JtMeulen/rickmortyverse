import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import App from './components/App';
import combinedReducers from './store/combinedReducers';
import './root-styles.css';

const store = createStore(combinedReducers, composeWithDevTools());

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>
, document.getElementById('root'));
