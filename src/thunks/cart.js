import {fetchAllOrders, fetchDeleteOrder} from "../api/cartApi"
import {DELETEORDER, SETISFETCHING, SETALLORDERS} from "../store/actionTypes"

export const getAllOrders = () => async(dispatch) => {
    const {data} = await fetchAllOrders()
    dispatch({type: SETALLORDERS, payload: data.orders})
}

export const deleteOrder = (id) => async(dispatch) => {
    dispatch({type: SETISFETCHING, payload: true})
    const {data, status} = await fetchDeleteOrder(id)
    if(status === 200) {
        dispatch({type: DELETEORDER, payload: id})
        dispatch({type: SETISFETCHING, payload: false})
        return data.message
    }
}