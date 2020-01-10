import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, HashRouter} from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createMemoryHistory } from 'history';

import Loadable from 'react-loadable';

import App from './src/components/app'
import tasks from './src/reducers'
import data from './src/helpers'


let preloadedState = window.__INITIAL_DATA__
// delete window.__INITIAL_DATA__

const store = createStore(
    tasks, preloadedState,
    applyMiddleware(thunk)
)
const history = createMemoryHistory();

window.onload = () => {
    Loadable.preloadReady().then(() => {
        ReactDOM.hydrate(
            <Provider store={store} >
                <BrowserRouter history={history}>
                    <App />
                </BrowserRouter>
            </Provider>,
        document.getElementById('root'));
    });
};