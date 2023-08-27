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
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createAppAsyncThunk} from "../utils/Create-app-async-thunk";


export const getCards = createAppAsyncThunk('getCards', async (data: GetCardsParamsType, thunkAPI) => {
    const res = await packsCardsApi.getCards({...data})
    return res.data
})

export const  deleteCards = createAppAsyncThunk('deleteCards', async (id: string, thunkAPI) => {
    const res = await packsCardsApi.deleteCards(id)
    thunkAPI.dispatch(getCards({cardsPack_id:res.data.deletedCard.cardsPack_id}))
    return res.data
})
export const addNewCards=createAppAsyncThunk('addNewCards',async (data:PostCardType,thunkAPI)=>{
    const res=await packsCardsApi.addNewCards(data)
    thunkAPI.dispatch(getCards({cardsPack_id:res.data.newCard.cardsPack_id}))
    return  res.data
})
export  const  updateCards=createAppAsyncThunk('updateCards',async (data:UpdateCardType,thunkAPI)=>{
    const  res=await packsCardsApi.updateCards({...data})
    thunkAPI.dispatch(getCards({cardsPack_id:res.data.updatedCard.cardsPack_id}))
})
export  const  updateGradeCard=createAppAsyncThunk('updateGradeCard',async (data:CardLearnType,thunkAPI)=>{
    const  res=await packsCardsApi.updateGradeCard({...data})
    thunkAPI.dispatch(getCards({cardsPack_id:res.data.updatedGrade.cardsPack_id}))
})



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

const slice = createSlice({
    name: 'cards',
    initialState,
    reducers: {
        setCardsPage(state,action:PayloadAction<{page:number}>){
            state.page=action.payload.page
        },
        setCardsPageCount(state,action:PayloadAction<{pageCount:number}>){
            state.page=action.payload.pageCount
        },
        setPackName(state,action:PayloadAction<{value:string}>){
            state.packName=action.payload.value
        },
        setQuestionForSearch(state,action:PayloadAction<{cardQuestion:string}>){
            state.cardQuestion=action.payload.cardQuestion
        },
        setPackDeckCover(state,action:PayloadAction<{value:string}>){
            state.packDeckCover=action.payload.value
        },
        setEmptyArrayCards(state){
            state.cards=[]
        }





    },
    extraReducers: (builder) => {
    builder
        .addCase(getCards.fulfilled,(state,action)=>{
            // state={...action.payload}
            return {...state,...action.payload}
            // state.pageCount=action.payload.pageCount
            // state.page=action.payload.page
            // state.cardsTotalCount=action.payload.cardsTotalCount
        })
    }
})


// export const cardsReducer = (state: CardsReducerStateType = initialState, action: CardsActionType):
//     CardsReducerStateType => {
//     switch (action.type) {
//         case 'CARDS/SET-SEARCH-FOR-QUESTION':
//         case 'CARDS/SET-CARDS-PAGE':
//         case 'CARDS/SET-CARDS-PAGE-COUNT':
//         case 'CARDS/SET-CARDS-TOTAL-COUNT':
//         case 'CARDS/SET-PACK-NAME':
//         case 'CARDS/SET-PACK-DECK-COVER':
//             return {...state, ...action.payload}
//         case 'CARDS/SET-CARDS':
//             return {...state, ...action.data}
//         case 'CARDS/SET-EMPTY-ARRAY-CARDS':
//             return {...state, cards: []}
//         default:
//             return state
//     }
// }


export const cardsReducer=slice.reducer

//actions
export const cardsActions = slice.actions

//     {
//     setCards: (data: GetCardsResponseType) => ({type: 'CARDS/SET-CARDS', data} as const),
//     setQuestionForSearch: (cardQuestion: string) => ({
//         type: 'CARDS/SET-SEARCH-FOR-QUESTION',
//         payload: {cardQuestion}
//     } as const),
//     setCardsPage: (page: number) => ({type: 'CARDS/SET-CARDS-PAGE', payload: {page}} as const),
//     setPackName: (packName: string) => ({type: 'CARDS/SET-PACK-NAME', payload: {packName}} as const),
//     setCardsPageCount: (pageCount: number) => ({type: 'CARDS/SET-CARDS-PAGE-COUNT', payload: {pageCount}} as const),
//     setCardsTotalCount: (cardsTotalCount: number) => ({
//         type: 'CARDS/SET-CARDS-TOTAL-COUNT',
//         payload: {cardsTotalCount}
//     } as const),
//     setPackDeckCover: (packDeckCover: string) => ({
//         type: 'CARDS/SET-PACK-DECK-COVER',
//         payload: {packDeckCover}
//     } as const),
//     setEmptyArrayCards: () => ({type: 'CARDS/SET-EMPTY-ARRAY-CARDS'} as const)
// }


//thunks
// export const getCards1 = (data: GetCardsParamsType): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const res = await packsCardsApi.getCards(data)
//         dispatch(cardsActions.setCards(res.data))
//         dispatch(cardsActions.setCardsPageCount(res.data.pageCount))
//         dispatch(cardsActions.setCardsTotalCount(res.data.cardsTotalCount))
//         dispatch(cardsActions.setCardsPage(res.data.page))
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     } finally {
//         dispatch(appActions.setAppStatus('idle'))
//     }
// }
//
// export const deleteCards1 = (_id: string): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const res = await packsCardsApi.deleteCards(_id)
//         dispatch(getCards({cardsPack_id: res.data.deletedCard.cardsPack_id}))
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     } finally {
//         dispatch(appActions.setAppStatus('idle'))
//     }
// }
//
// export const addNewCards1 = (postModel: PostCardType): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const res = await packsCardsApi.addNewCards(postModel)
//         dispatch(getCards({cardsPack_id: res.data.newCard.cardsPack_id}))
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     } finally {
//         dispatch(appActions.setAppStatus('idle'))
//     }
// }
//
// export const updateCards = (putModel: UpdateCardType): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const res = await packsCardsApi.updateCards({...putModel})
//         dispatch(getCards({cardsPack_id: res.data.updatedCard.cardsPack_id}))
//         dispatch(appActions.setAppStatus('succeeded'))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     } finally {
//         dispatch(appActions.setAppStatus('idle'))
//     }
// }
//
// export const updateGradeCard = (putModelGrade: CardLearnType): AppThunkType => async (dispatch) => {
//     dispatch(appActions.setAppStatus('loading'))
//     try {
//         const res = await packsCardsApi.updateGradeCard(putModelGrade)
//         dispatch(getCards({cardsPack_id: res.data.updatedGrade.cardsPack_id}))
//         dispatch(appActions.setAppStatus("succeeded"))
//     } catch (e) {
//         const err = e as Error | AxiosError<{ successError: null | string }>
//         error(err, dispatch)
//     } finally {
//         dispatch(appActions.setAppStatus('idle'))
//     }
// }


//types
type CardsReducerStateType = typeof initialState
export type CardsActionType = InferActionsTypes<typeof cardsActions>

