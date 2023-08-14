import {combineReducers, legacy_createStore, applyMiddleware} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {CardsActionType, cardsReducer} from 'reducers/Cards-reducer'
import {AuthActionType, authReducer} from 'reducers/Auth-reducer'
import {ProfileActionType, profileReducer} from 'reducers/Profile-reducer'
import {PacksActionType, packsReducer} from 'reducers/Packs-reducer'
import {AppActionType, appReducer} from 'reducers/App-reducer'


const rootReducer = combineReducers({
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))


//type
export type RootReducerType = ReturnType<typeof rootReducer>
export type AppActionsType = AppActionType
    | AuthActionType
    | CardsActionType
    | PacksActionType
    | ProfileActionType
export type AppDispatchType = ThunkDispatch<RootReducerType, unknown, AppActionsType>
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, AppActionsType>
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never


// @ts-ignore
window.store = store