import {AxiosError} from 'axios'
import {error} from 'utils'
import {AppThunkType, InferActionsTypes} from 'store/Store'
import {packsCardsApi, PackType, PostPacksType, UpdatePacksType} from 'api/Packs-cards-api'
import {appActions} from './App-reducer'


const initialState = {
    cardPacks: [] as PackType[],
    cardPacksTotalCount: 0,
    statusPackCards: 'all' as 'all' | 'my',
    minCardsCount: 0,
    maxCardsCount: 0,
    params: {
        page: 1,
        pageCount: 5,
        min: 0,
        max: 110,
        packName: '',
        sortPacks: ''
    }
}


//reducers
export const packsReducer = (state: PackReducerStateType = initialState, action: PacksActionType): PackReducerStateType => {
    switch (action.type) {
        case 'PACKS/SET-PACKS':
        case 'PACKS/SET-CARD-PACKS-TOTAL-COUNT':
        case 'PACKS/FETCH-MIN-MAX-CARDS-COUNT':
        case 'PACKS/SET-TYPE-PACK-CARDS':
            return {...state, ...action.payload}
        case 'PACKS/SET-MIN-MAX-SEARCH-CARD':
        case 'PACKS/SORT-PACKS':
        case 'PACKS/SET-CARD-PACKS-PAGE':
        case 'PACKS/SET-CARD-PACKS-PAGE-COUNT':
        case 'PACKS/SET-SEARCH-FOR-PACK-NAME':
            return {...state, params: {...state.params, ...action.payload}}
        case 'PACKS/CLEAR-FILTERS':
            return {
                ...state, minCardsCount: 0, maxCardsCount: 110, statusPackCards: 'all',
                params: {...state.params, packName: '', sortPacks: '', page: 1, pageCount: 5}
            }
        default:
            return state
    }
}


//actions
export const packsActions = {
    setPacks: (cardPacks: PackType[]) => ({type: 'PACKS/SET-PACKS', payload: {cardPacks}}) as const,
    setCardPacksTotalCount: (value: number) =>
        ({type: 'PACKS/SET-CARD-PACKS-TOTAL-COUNT', payload: {cardPacksTotalCount: value}}) as const,
    setMinMaxSearchCard: (min: number, max: number) => ({
        type: 'PACKS/SET-MIN-MAX-SEARCH-CARD', payload: {min, max}
    } as const),
    setMinMaxCardCount: (minCardsCount: number, maxCardsCount: number) =>
        ({type: 'PACKS/FETCH-MIN-MAX-CARDS-COUNT', payload: {minCardsCount, maxCardsCount}} as const),
    setCardPacksPage: (page: number) => ({type: 'PACKS/SET-CARD-PACKS-PAGE', payload: {page}} as const),
    setCardPacksPageCount: (pageCount: number) =>
        ({type: 'PACKS/SET-CARD-PACKS-PAGE-COUNT', payload: {pageCount}} as const),
    sortPacks: (sortPacks: string) => ({type: 'PACKS/SORT-PACKS', payload: {sortPacks}} as const),
    setPackNameForSearch: (packName: string) => ({type: 'PACKS/SET-SEARCH-FOR-PACK-NAME', payload: {packName}} as const),
    setTypePackCards: (statusPackCards: 'my' | 'all') =>
        ({type: 'PACKS/SET-TYPE-PACK-CARDS', payload: {statusPackCards}} as const),
    clearFilters: () => ({type: 'PACKS/CLEAR-FILTERS'} as const)
}


//thunks
export const getPacks = (): AppThunkType => async (dispatch, getState) => {
    const {statusPackCards, params} = getState().packs
    const userId = getState().profile.infoUser._id
    const user_id = statusPackCards === 'my' ? userId : ''
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await packsCardsApi.getCardsPack({user_id, ...params})
        dispatch(packsActions.setCardPacksTotalCount(res.data.cardPacksTotalCount))
        dispatch(packsActions.setPacks(res.data.cardPacks))
        dispatch(packsActions.setMinMaxCardCount(res.data.minCardsCount, res.data.maxCardsCount))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const deletePack = (packID: string): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        await packsCardsApi.deletePacks(packID)
        dispatch(getPacks())
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const addNewPack = (data: PostPacksType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        await packsCardsApi.addNewPacks({...data})
        dispatch(getPacks())
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const updatePack = (params: UpdatePacksType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        await packsCardsApi.updatePacks({...params})
        dispatch(getPacks())
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const setParamsSortPack = (sortParams: string): AppThunkType => dispatch => {
    dispatch(packsActions.sortPacks(sortParams))
    dispatch(getPacks())
}


//types
type PackReducerStateType = typeof initialState
export type PacksActionType = InferActionsTypes<typeof packsActions>

