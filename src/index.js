import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import counterReducer from './store/reducers/counter';
import resultReducer from './store/reducers/result';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({
    ctr: counterReducer, 
    res: resultReducer
});

const logger = (store) => {
    return next => {
        return action => {
            //Here is where we can do something
            console.log('[Middleware] Dispatching', action);
            //You can make changes to the action if you want here
            //Executing next will pass the action along to the reducers
            const result = next(action);
            //We could do something with the result if we want
            console.log('[Middleware] next state', store.getState());
            //Always return the result
            return result;
        }
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
