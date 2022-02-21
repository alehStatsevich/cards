import axios from 'axios'

const BaseURLs = {
    local: 'http://localhost:7542/2.0/',
    release: 'https://neko-back.herokuapp.com/2.0/'
}

export const instance = axios.create({
    baseURL: BaseURLs.release,
    withCredentials: true,
})