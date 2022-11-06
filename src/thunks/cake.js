import {createCake, deleteCake, getAllCakes, getCake} from "../api/cakeApi"
import {SETISFETCHING, SETCAKE, SETCAKES, SETTOTALPAGES} from "../store/actionTypes"
import Swall from "sweetalert2"
import Swal from "sweetalert2";

export const getCakes = (type, sortBy, page)=> async(dispatch)=> {
    dispatch({type: SETISFETCHING, payload: true})
    const {data} = await getAllCakes(type, sortBy, page)
    dispatch({type: SETCAKES, payload: data.cakes})

    let totalPages = Math.ceil(data.count/4)
    if(totalPages < 1) totalPages = 1

    dispatch({type: SETTOTALPAGES, payload: totalPages})
    dispatch({type: SETISFETCHING, payload: false})
}

export const getCakeThunk = (id) => async(dispatch) => {
    const {data} = await getCake(id)
    dispatch({type: SETCAKE, payload: data})
}

export const createCakeThunk = (formData) => async() => {
    try{
        const {data} = await createCake(formData)
        Swall.fire({
            title: 'Поздравляем!',
            text: data.message,
            icon: 'success',
            timer: 4000
        })
    }catch (e) {
        Swal.fire({
            title: 'Ошибка',
            text: e.message,
            icon: 'error',
            timer: 4000
        })
    }
}

export const deleteCakeThunk = (id) => async(dispatch) => {
    dispatch({type: SETISFETCHING, payload: true})

    const {data} = await deleteCake(id)

    Swall.fire({
        title: 'Поздравляем!',
        text: data.message,
        icon: 'success',
        timer: 4000
    })

    dispatch({type: SETISFETCHING, payload: false})
}