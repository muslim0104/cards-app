import {appActions, isInitialized} from './App-reducer'
import {error} from 'utils'
import {AxiosError} from 'axios'
import {authApi, ForgotType, LoginType, NewPasswordType, RegistrationType} from 'api/Auth-api'
import {profileActions} from './Profile-reducer'
import {AppThunkType, InferActionsTypes} from 'store/Store'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    isLoggedIn: false,
    isRegistered: false,
    recoveryPassword: '',
    newPassport: ''
}

export const login = createAsyncThunk('login', async (data: LoginType, thunkAPI) => {
    const res = await authApi.login(data)
    thunkAPI.dispatch(profileActions.setInfoUser({...res.data}))
    return {
        isLoggedIn: true,
    }
})
export const registration = createAsyncThunk('registration', async (value: RegistrationType, thunkAPI) => {
    const res = await authApi.registration(value)
    return {
        isRegistered: true

    }
})

export const recoveryPassword = createAsyncThunk('recoveryPassword', async (email: string) => {
    const data: ForgotType = {
        email: email, message: `<div style="background-color: lime; padding: 15px">
password recovery link:
<a href='http://localhost:3000/Cards#/new-password/$token$'>link</a>
</div>`
    }
    await authApi.recoveryPassword(data)
    return {
        email
    }
})

export const logOut = createAsyncThunk('logOut', async () => {
    await authApi.logOut()
    return {
        isLoggedIn: false
    }
})
export const setNewPassWord = createAsyncThunk('setNewPassWord', async (params: { token: string, password: string }) => {
    const data: NewPasswordType = {password: params.password, resetPasswordToken: params.token}
    await authApi.setNewPassword(data)


})


const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setNewPassword(state, action: PayloadAction<{ newPassport: string }>) {
            state.newPassport = action.payload.newPassport
        },

        addLogin(state) {
           state.isLoggedIn=true
        },
        registration(isRegistered){

        }
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
        })
        builder.addCase(registration.fulfilled, (state, action) => {
            state.isRegistered = action.payload.isRegistered
        })
        builder.addCase(recoveryPassword.fulfilled, (state, action) => {
            state.recoveryPassword = action.payload.email
        })
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            // false
        })

    }
})
export const {addLogin} = slice.actions

export const authReducer = slice.reducer

//reducers
// export const authReducer = (state: InitialStateType = initialState, action: AuthActionType): InitialStateType => {
//     switch (action.type) {
//         case 'AUTH/SET-LOGIN':
//         case 'AUTH/DATA-REGISTRATION':
//         case 'AUTH/SET-NEW-PASSWORD':
//         case 'AUTH/RECOVERY-PASSWORD':
//             return {...state, ...action.payload}
//         default:
//             return state
//     }
// }
//
//
// // actions
export const authActions = {
    addLogin: (isLoggedIn: boolean) => ({type: 'AUTH/SET-LOGIN', payload: {isLoggedIn}} as const),
    registration: (isRegistered: boolean) => ({type: 'AUTH/DATA-REGISTRATION', payload: {isRegistered}} as const),
    recoveryPassword: (email: string) => ({
        type: 'AUTH/RECOVERY-PASSWORD',
        payload: {recoveryPassword: email}
    } as const),
    setNewPassword: (newPassport: string) => ({type: 'AUTH/SET-NEW-PASSWORD', payload: {newPassport}} as const)
}
//
//
// //thunks
// export const loginT = (data: LoginType): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const res = await authApi.login(data)
//         dispatch(authActions.addLogin(true))
//         dispatch(profileActions.setInfoUser(res.data))
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     }
// }
//
// export const logout = (): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         await authApi.logOut()
//         dispatch(authActions.addLogin(false))
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     }
// }
//
// export const registratioN = (value: RegistrationType): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         await authApi.registration(value)
//         dispatch(authActions.registration(true))
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     }
// }
//
// export const RecoveryPassword = (email: string): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const data: ForgotType = {
//             email: email, message: `<div style="background-color: lime; padding: 15px">
// password recovery link:
// <a href='http://localhost:3000/Cards#/new-password/$token$'>link</a>
// </div>`
//         }
//         await authApi.recoveryPassword(data)
//         dispatch(authActions.recoveryPassword(email))
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     }
// }
//
// export const setNewPassword = (password: string, token: string): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const data: NewPasswordType = {password: password, resetPasswordToken: token}
//         await authApi.setNewPassword(data)
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     }
// }
//

//types
type InitialStateType = typeof initialState
export type AuthActionType = InferActionsTypes<typeof authActions>
