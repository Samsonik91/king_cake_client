import {DELETEORDER, SETISFETCHING, SETALLORDERS, SETCARTCOUNT} from "./actionTypes"

const initialState = {
    orders: [],
    cartCount: 0,
    isFetching: false
}

const cartReducer = (state=initialState, action) => {
    switch(action.type){
        case SETALLORDERS:
            return {...state, orders: action.payload}

        case DELETEORDER:
            return {...state, orders: state.orders.filter(o=> o.id !== action.payload)}

        case SETISFETCHING:
            return {...state, isFetching: action.payload}

        case SETCARTCOUNT:
            return {...state, cartCount: action.payload}

        default:
            return state
    }
}

export default cartReducer