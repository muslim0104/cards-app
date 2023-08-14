import {authApi} from 'api/Auth-api'
import {authActions} from './Auth-reducer'
import {AxiosError} from 'axios'
import {error} from 'utils'
import {profileActions} from './Profile-reducer'
import {AppThunkType, InferActionsTypes} from 'store/Store'


const initialState = {
    status: 'none' as AppStatusType,
    successError: null as null | string,
    isInitialized: false,
}


//reducers
export const appReducer = (state: AppStateType = initialState, action: AppActionType): AppStateType => {
    switch (action.type) {
        case 'APP/SET-APP-ERROR':
        case 'APP/SET-APP-STATUS':
        case 'APP/IS-INITIALIZED':
            return {...state, ...action.payload}
        default :
            return state
    }
}


//actions
export const appActions = {
    isInitialized: (isInitialized: boolean) => ({type: 'APP/IS-INITIALIZED', payload: {isInitialized}} as const),
    setAppError: (successError: null | string) => ({type: 'APP/SET-APP-ERROR',  payload: {successError}} as const),
    setAppStatus: (status: AppStatusType) => ({type: 'APP/SET-APP-STATUS',  payload: {status}} as const)
}


//thunks
export const isInitialized = (): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await authApi.me()
        dispatch(authActions.addLogin(true))
        dispatch(appActions.isInitialized(true))
        dispatch(profileActions.setInfoUser(res.data))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        dispatch(appActions.isInitialized(true))
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}


//types
type AppStatusType = | 'idle' | 'loading' | 'succeeded' | 'failed' | 'none'
type AppStateType = typeof initialState
export type AppActionType = InferActionsTypes<typeof appActions>
export type SetAppErrorActionType = ReturnType<typeof appActions.setAppError>
export type SetAppStatusActionType = ReturnType<typeof appActions.setAppStatus>