import {createStore, combineReducers, applyMiddleware} from "redux"
import thunk from 'redux-thunk'
import cakeReducer from "./cakeReducer"
import typeReducer from "./typeReducer"
import cartReducer from "./cartReducer"

const reducers = combineReducers({
    cake: cakeReducer,
    type: typeReducer,
    cart: cartReducer
})

const Store = createStore(reducers, applyMiddleware(thunk))

export default Store
