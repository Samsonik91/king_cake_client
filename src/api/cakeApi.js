import {Api, authApi} from "./index"

export const getAllCakes = (type, sortBy, page) => Api.get(`api/cake`, {params: {type, sortBy, page}})
export const getCake = (id) => Api.get(`api/cake/${id}`)
export const createCake = (data) => authApi.post('api/cake/create', data)
export const updateCake = (data) => authApi.post('api/cake/update', data)
export const deleteCake = (id) => authApi.delete(`api/cake/${id}`)