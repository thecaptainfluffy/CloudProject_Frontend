import React from 'react';
import ReactDOM from 'react-dom';
import FantasyHouse from './FantasyHouse';
import './index.css';
import Store from './store';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';

//Website index page. This is the original page where all global settings will be installed.

ReactDOM.render(
    <Provider store={Store}>
    <FantasyHouse />
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
