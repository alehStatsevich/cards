import {instance} from './api'


export const loginAPI = {
    login(data: LoginUser) {
        return instance.post<LoginResponse>('auth/login', data)
    },
    auth() {
        return instance.post<LoginResponse>('auth/me', {})
    },
    logout() {
        return instance.delete<LoginResponse>('auth/me', {})
    },
    changeData(userData: UserData) {
        return instance.put('auth/me', userData)
    },
    registration(email: string, password: string) {
        return instance.post<RegistrationType>('auth/register', {email, password})
    }
}


interface LoginUser {
    email: string
    password: string
    rememberMe?: boolean
}

export interface UserData {
    name?: string
    avatar?: string
}

export interface LoginResponse {
    _id: string
    email: string
    name: string
    avatar: string
    publicCardPacksCount: number
    created: Date
    updated: Date
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    token: string
    error: string
}

type RegistrationType = {
    addedUser: {}
    error?: string,
}


