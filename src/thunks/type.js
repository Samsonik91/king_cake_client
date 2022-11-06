import {SETTYPES} from "../store/actionTypes"
import {createNewType, fetchTypes} from "../api/typeApi"
import Swall from "sweetalert2"

export const getTypes = () => async(dispatch) => {
    const {data} = await fetchTypes()
    dispatch({type: SETTYPES, payload: data})
}

export const createType = (name) => async(dispatch) => {
    const {data} = await createNewType(name)
    dispatch({type: SETTYPES, payload: data.types})
    Swall.fire({
        title: 'Поздравляем!',
        text: data.message,
        icon: 'success',
        timer: 4000
    })
}