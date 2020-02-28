import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import rootReducer from './reducers/rootReducer';

// Combining thunk and redux devtools 
const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const enhancers = compose(
    applyMiddleware(thunk),
    reduxDevTools || compose
);

// Passing into store creation. Store is now configured with thunk and redux devtools.
const store = createStore(
    rootReducer, enhancers
)
const rootElement = document.getElementById('root')

ReactDOM.render(
    <Provider store={store}>
        <Router >
            <App />
        </Router>
    </Provider>,
    rootElement
)