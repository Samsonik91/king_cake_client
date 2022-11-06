import {Api} from "./index"

export const registration = (data) => Api.post('api/user/registration', data)
export const login = (data) => Api.post('api/user/login', data)