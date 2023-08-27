import {authApi, InfoUserType, UserType} from 'api/Auth-api'
import {InferActionsTypes} from 'store/Store'
import {isInitialized} from './App-reducer'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";


const initialState = {
    user: {} as UserType,
    infoUser: {} as InfoUserType
}


export const updateProfileTC=createAsyncThunk('updateProfileTC',async (params:Partial<{name:string,avatar:string}>)=>{
    const res=await authApi.updateProfile(params.name,params.avatar)
    return {
        user:res.data.updatedUser

    }

})
const slice=createSlice({
    name:'profile',
    initialState,
    reducers:{
        setInfoUser(state,action:PayloadAction<InfoUserType>){
            state.infoUser={...action.payload}
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(updateProfileTC.fulfilled,(state,action)=> {
            state.infoUser=action.payload.user
            state.user=action.payload.user
        })
        builder.addCase(isInitialized.fulfilled,(state,action)=>{

        })
    }
})
export  const profileReducer=slice.reducer
//reducers
// export const profileReducer = (state: initialStateType = initialState, action: ProfileActionType): initialStateType => {
//     switch (action.type) {
//         case 'PROFILE/UPDATE-PROFILE':
//         case 'PROFILE/SET-INFO-USER':
//             return {...state, infoUser: {...action.payload}}
//         default:
//             return state
//     }
// }
//
//
// //actions

export const profileActions=slice.actions
// export const profileActions = {
//     updateProfile : (user: UserType) => ({type: 'PROFILE/UPDATE-PROFILE', payload: {...user}} as const),
//     setInfoUser : (infoUser: InfoUserType) => ({type: 'PROFILE/SET-INFO-USER', payload: {...infoUser}} as const)
// }
// //
//
// //thunks
// export const updateProfileTC = (name: string, avatar?: string): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const res = await authApi.updateProfile(name, avatar)
//         dispatch(appActions.setAppStatus('succeeded'))
//         dispatch(profileActions.setInfoUser(res.data.updatedUser))
//         dispatch(profileActions.updateProfile(res.data.updatedUser))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     } finally {
//         dispatch(appActions.setAppStatus('idle'))
//     }
// }
//

//types
type initialStateType = typeof initialState
export type ProfileActionType = InferActionsTypes<typeof profileActions>

