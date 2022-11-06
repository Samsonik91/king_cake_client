import {
    SELECTTYPE,
    SETCAKE,
    SETCAKES,
    SETISFETCHING,
    SETPAGE,
    SETSORTBY,
    SETTOTALPAGES
} from "./actionTypes"

const initialState = {
    cakes: null,
    cake: null,
    page: 1,
    sortBy: null,
    selectedType: null,
    totalPages: 1,
    isFetching: false
}

const cakeReducer = (state=initialState, action) => {
    switch (action.type){
        case SETCAKES:
            return {...state, cakes: action.payload}

        case SETCAKE:
            return {...state, cake: action.payload}

        case SETPAGE:
            return {...state, page: action.payload}

        case SETTOTALPAGES:
            return {...state, totalPages: action.payload}

        case SELECTTYPE:
            return {...state, selectedType: action.payload}

        case SETSORTBY:
            return {...state, sortBy: action.payload}

        case SETISFETCHING:
            return {...state, isFetching: action.payload}

        default:
            return state
    }
}

export default cakeReducer