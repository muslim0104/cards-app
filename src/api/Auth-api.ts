import {AxiosResponse} from 'axios'
import {instance} from './Instance'


//api
export const authApi = {
    me() {
        return instance.post<ResponseType>('auth/me')
    },
    registration(data: RegistrationType) {
        return instance.post<RegistrationType, AxiosResponse<ResponseRegistrationType>>('auth/register', data)
    },
    login(data: LoginType) {
        return instance.post<LoginType, AxiosResponse<LogInResponseType>>('auth/login', data)
    },
    logOut() {
        return instance.delete<{ info: string, error: string }>('auth/me')
    },
    updateProfile(name?: string, avatar?: string) {
        return instance.put<{ name: string; avatar: string }, AxiosResponse<UpdateProfileResponseType>>('auth/me', {
            name,
            avatar
        })
    },
    recoveryPassword(data: ForgotType) {
        return instance.post<ForgotType, AxiosResponse<ResponseForgotType>>('auth/forgot', data)
    },
    setNewPassword(token: NewPasswordType) {
        return instance.post<NewPasswordType, AxiosResponse<ResponseNewPasswordType>>('auth/set-new-password', token)
    }
}


//types
export type RegistrationType = {
    email: string
    password: string
}

export type ResponseRegistrationType = {
    addedUser: any
    error?: string
}

export type ResponseType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}

export type UserType = ResponseType

export type InfoUserType = {
    _id: string,
    name: string,
    email: string,
    avatar: string,
}

export type LogInResponseType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar: string
}

export type ForgotType = {
    email: string
    message: string
}

type ResponseForgotType = {
    info: string
    error: string
}

export type NewPasswordType = {
    password: string
    resetPasswordToken: string
}

type ResponseNewPasswordType = {
    info: string
    error: string
}

export type LoginType = {
    email: string
    password: string
    rememberMe: boolean
}

export type UpdateProfileResponseType = {
    updatedUser: ResponseType
}