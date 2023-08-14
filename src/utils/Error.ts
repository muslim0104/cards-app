import axios, {AxiosError} from 'axios'
import {Dispatch} from 'redux'
import {appActions, SetAppErrorActionType, SetAppStatusActionType} from 'reducers/App-reducer'


export const error = (err: Error | AxiosError<{ successError: null | string }>, dispatch: Dispatch<SetAppErrorActionType
    | SetAppStatusActionType>) => {

    if (axios.isAxiosError(err)) {
        const error = err.response?.data ? err.response.data.error : err.message
        dispatch(appActions.setAppError(error))
    } else {
        dispatch(appActions.setAppError(`Native error ${err.message}`))
    }
    dispatch(appActions.setAppStatus('failed'))
}

