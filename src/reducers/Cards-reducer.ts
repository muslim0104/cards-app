import {appActions} from './App-reducer'
import {AppThunkType, InferActionsTypes} from 'store/Store'
import {
    CardLearnType,
    packsCardsApi,
    CardType,
    GetCardsParamsType,
    GetCardsResponseType,
    PostCardType,
    UpdateCardType,
} from 'api/Packs-cards-api'
import {AxiosError} from 'axios'
import {error} from 'utils'


export const initialState = {
    cards: [] as CardType[],
    packUserId: '',
    packDeckCover: '',
    cardsTotalCount: 0,
    shots: 0,
    grade: 0,
    packName: '',
    cardAnswer: '',
    cardQuestion: '',
    page: 1,
    pageCount: 5,
}


export const cardsReducer = (state: CardsReducerStateType = initialState, action: CardsActionType):
    CardsReducerStateType => {
    switch (action.type) {
        case 'CARDS/SET-SEARCH-FOR-QUESTION':
        case 'CARDS/SET-CARDS-PAGE':
        case 'CARDS/SET-CARDS-PAGE-COUNT':
        case 'CARDS/SET-CARDS-TOTAL-COUNT':
        case 'CARDS/SET-PACK-NAME':
        case 'CARDS/SET-PACK-DECK-COVER':
            return {...state, ...action.payload}
        case 'CARDS/SET-CARDS':
            return {...state, ...action.data}
        case 'CARDS/SET-EMPTY-ARRAY-CARDS':
            return {...state, cards:[]}
        default:
            return state
    }
}


//actions
export const cardsActions = {
    setCards: (data: GetCardsResponseType) => ({type: 'CARDS/SET-CARDS', data} as const),
    setQuestionForSearch: (cardQuestion: string) => ({type: 'CARDS/SET-SEARCH-FOR-QUESTION', payload: {cardQuestion}} as const),
    setCardsPage: (page: number) => ({type: 'CARDS/SET-CARDS-PAGE', payload: {page}} as const),
    setPackName: (packName: string) => ({type: 'CARDS/SET-PACK-NAME',payload: {packName}} as const),
    setCardsPageCount: (pageCount: number) => ({type: 'CARDS/SET-CARDS-PAGE-COUNT', payload: {pageCount}} as const),
    setCardsTotalCount: (cardsTotalCount: number) => ({
        type: 'CARDS/SET-CARDS-TOTAL-COUNT',
        payload: {cardsTotalCount}
    } as const),
    setPackDeckCover: (packDeckCover: string) => ({type: 'CARDS/SET-PACK-DECK-COVER', payload: {packDeckCover}} as const),
    setEmptyArrayCards: () => ({type:'CARDS/SET-EMPTY-ARRAY-CARDS'} as const)
}


//thunks
export const getCards = (data: GetCardsParamsType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await packsCardsApi.getCards(data)
        dispatch(cardsActions.setCards(res.data))
        dispatch(cardsActions.setCardsPageCount(res.data.pageCount))
        dispatch(cardsActions.setCardsTotalCount(res.data.cardsTotalCount))
        dispatch(cardsActions.setCardsPage(res.data.page))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const deleteCards = (_id: string): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await packsCardsApi.deleteCards(_id)
        dispatch(getCards({cardsPack_id: res.data.deletedCard.cardsPack_id}))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const addNewCards = (postModel: PostCardType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await packsCardsApi.addNewCards(postModel)
        dispatch(getCards({cardsPack_id: res.data.newCard.cardsPack_id}))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const updateCards = (putModel: UpdateCardType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await packsCardsApi.updateCards({...putModel})
        dispatch(getCards({cardsPack_id: res.data.updatedCard.cardsPack_id}))
        dispatch(appActions.setAppStatus('succeeded'))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}

export const updateGradeCard = (putModelGrade: CardLearnType): AppThunkType => async (dispatch) => {
    dispatch(appActions.setAppStatus('loading'))
    try {
        const res = await packsCardsApi.updateGradeCard(putModelGrade)
        dispatch(getCards({cardsPack_id: res.data.updatedGrade.cardsPack_id}))
        dispatch(appActions.setAppStatus("succeeded"))
    } catch (e) {
        const err = e as Error | AxiosError<{ successError: null | string }>
        error(err, dispatch)
    } finally {
        dispatch(appActions.setAppStatus('idle'))
    }
}


//types
type CardsReducerStateType = typeof initialState
export type CardsActionType = InferActionsTypes<typeof cardsActions>

