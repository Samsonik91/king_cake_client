import axios from 'axios'

const isProd = (process.env.NODE_ENV === 'production')
const URL = isProd ? "https://cake.herokuapp.com/" : "http://localhost:5000"

const Api = axios.create({
    baseURL: URL
})

const authApi = axios.create({
    baseURL: URL
})

const authInterceptor = config => {
    config.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('token'))}`
    return config
}

authApi.interceptors.request.use(authInterceptor)

export {Api, authApi}
