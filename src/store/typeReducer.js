import {SETTYPES} from "./actionTypes"

const initialState = {
    types: null
}

const typeReducer = (state=initialState, action) => {
    switch (action.type){
        case SETTYPES:
            return {...state, types: action.payload}

        default:
            return state
    }
}

export default typeReducer