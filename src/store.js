import { createStore, applyMiddleware, combineReducers } from 'redux';
import reduxPromiseMiddleware from 'redux-promise-middleware';
import reducer from './ducks/reducer';

const reducers = combineReducers({
    tasks: reducer
})

export default createStore(
    reducers, 
    applyMiddleware(reduxPromiseMiddleware())
);