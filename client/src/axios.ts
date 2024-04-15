import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:5000',
})

/**
 * This code right here sets up an interceptor to modify request configurations by adding an authorization header.
    Retreat from a local storage, which allows us to attach authentication tokens to outgoing requests.
 */
instance.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')

    return config
})

export default instance;