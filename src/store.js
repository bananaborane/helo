import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './ducks/reducer';


const rootReducer = combineReducers({
    reducer: reducer
})



export default createStore(rootReducer, composeWithDevTools(applyMiddleware(promiseMiddleware)));





