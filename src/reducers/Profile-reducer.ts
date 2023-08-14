import {AxiosError} from 'axios'
import {error} from 'utils'
import {authApi, UserType, InfoUserType} from 'api/Auth-api'
import {AppThunkType, InferActionsTypes} from 'store/Store'
import {appActions} from './App-reducer'


const initialState = {
    user: {} as UserType,
    infoUser: {} as InfoUserType
}


//reducers
export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
    switch (action.type) {
        case 'PROFILE/UPDATE-PROFILE':
        case 'PROFILE/SET-INFO-USER':
            return {...state, infoUser: {...action.payload}}
        default:
            return state
    }
}


//actions
export const profileActions = {
    updateProfile : (user: UserType) => ({type: 'PROFILE/UPDATE-PROFILE', payload: {...user}} as const),
    setInfoUser : (infoUser: InfoUserType) => ({type: 'PROFILE/SET-INFO-USER', payload: {...infoUser}} as const)
}


//thunks
export const updateProfileTC = (name: string, avatar?: string): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await authApi.updateProfile(name, avatar)
        dispatch(appActions.setAppStatus('succeeded'))
        dispatch(profileActions.setInfoUser(res.data.updatedUser))
        dispatch(profileActions.updateProfile(res.data.updatedUser))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}


//types
type initialStateType = typeof initialState
export type ProfileActionType = InferActionsTypes<typeof profileActions>

