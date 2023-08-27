import {combineReducers, legacy_createStore, applyMiddleware} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk'
import {CardsActionType, cardsReducer} from 'reducers/Cards-reducer'
import {AuthActionType, authReducer} from 'reducers/Auth-reducer'
import {ProfileActionType, profileReducer} from 'reducers/Profile-reducer'
import {PacksActionType, packsReducer} from 'reducers/Packs-reducer'
import {AppActionType, appReducer} from 'reducers/App-reducer'
import {configureStore} from "@reduxjs/toolkit";
import {baseApi} from "../api/cards-api";
import {setupListeners} from "@reduxjs/toolkit/query";


const rootReducer = combineReducers({
    [baseApi.reducerPath]:baseApi.reducer,
    auth: authReducer,
    app: appReducer,
    profile: profileReducer,
    packs: packsReducer,
    cards: cardsReducer,
})
//
// export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))



export const store = configureStore({
    reducer: rootReducer,
    // Добавляем middleware для использования дополнительных функций rtk-query, таких как кэширование, инвалидация и pooling.
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
});

// Метод setupListeners, подключает слушатели событий фокуса (refetchOnFocus) и повторного подключения (refetchOnReconnect ), чтобы автоматически перезагружать данные при возвращении на страницу или восстановлении подключения
setupListeners(store.dispatch)


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
export type AppDispatch=typeof  store.dispatch


// @ts-ignore
window.store = store