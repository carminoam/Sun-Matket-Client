import { cartReducer } from './cart-state';
import { combineReducers, createStore } from "redux";

import { authReducer } from "./auth-state";
import { productsReducer } from "./products-state";

// Creating reducers object from all our reducers: 
const reducers = combineReducers({ 
    productsState: productsReducer,
    cartState: cartReducer, 
    authState: authReducer
 });

// The most important Redux object: 
const store = createStore(reducers);


export default store;
