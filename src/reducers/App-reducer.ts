import {authApi} from 'api/Auth-api'
import {InferActionsTypes} from 'store/Store'
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {profileActions} from "./Profile-reducer";


const initialState = {
    status: 'none' as AppStatusType,
    successError: null as null | string,
    isInitialized: false,
}


export const isInitialized=createAsyncThunk('isInitialized',async (_,thunkAPI)=>{
  try {
      const res = await authApi.me()
      thunkAPI.dispatch(profileActions.setInfoUser({...res.data}))
      return {value:true}
  }
  catch (e) {
      thunkAPI.rejectWithValue(null)
  }
  finally {
      return  {
          value:true

      }
  }
})

//reducers


const slice=createSlice({
    name:'app',
    initialState,
    reducers:{
        setAppError(state,action:PayloadAction<{error:string | null}>){
            state.successError=action.payload.error
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(isInitialized.fulfilled,(state,action)=>{
            state.isInitialized=action.payload.value
        })
            .addMatcher(
                (action) => {

                    return action.type.endsWith('/pending')
                },
                // 2 параметр - reducer
                (state, action) => {
                    state.status = 'idle'

                }
            )
            .addMatcher(
                (action) => {

                    return action.type.endsWith('/fulfilled')
                },
                // 2 параметр - reducer
                (state, action) => {
                    state.status = 'none'

                }
            )

            .addMatcher(
                (action) => {

                    return action.type.endsWith('/rejected')
                },
                // 2 параметр - reducer
                (state, action) => {
                    // if (action.payload) {
                    //     state.successError = action.payload.messages[0]
                    // } else {
                    //     state.successError = action.error.message ? action.error.message : 'Some error occurred'
                    // }
                    state.status = 'failed'



                }
            )
    },
})
export  const appReducer=slice.reducer

// }


//actions
export const appActions =

    {
    isInitialized: (isInitialized: boolean) => ({type: 'APP/IS-INITIALIZED', payload: {isInitialized}} as const),
    setAppError: (successError: null | string) => ({type: 'APP/SET-APP-ERROR',  payload: {successError}} as const),
    setAppStatus: (status: AppStatusType) => ({type: 'APP/SET-APP-STATUS',  payload: {status}} as const)

}


//thunks
// export const isInitialized = (): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const res = await authApi.me()
//         dispatch(authActions.addLogin(true))
//         dispatch(appActions.isInitialized(true))
//         dispatch(profileActions.setInfoUser(res.data))
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         dispatch(appActions.isInitialized(true))
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     } finally {
//         dispatch(appActions.setAppStatus('idle'))
//     }
// }



//types
type AppStatusType = | 'idle' | 'loading' | 'succeeded' | 'failed' | 'none'
type AppStateType = typeof initialState
export type AppActionType = InferActionsTypes<typeof appActions>
export type SetAppErrorActionType = ReturnType<typeof appActions.setAppError>
export type SetAppStatusActionType = ReturnType<typeof appActions.setAppStatus>