import {authApi} from "./index"

export const fetchOrder = (data) => authApi.post('api/cart', data)
export const fetchAllOrders = () => authApi.get('api/cart')
export const fetchDeleteOrder = (id) => authApi.delete(`api/cart/${id}`)