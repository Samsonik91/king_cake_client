import {Api, authApi} from "./index"

export const fetchTypes = () => Api.get('/api/type')
export const createNewType = (name) => authApi.post('/api/type/create', name)