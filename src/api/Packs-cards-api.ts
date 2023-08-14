import {AxiosResponse} from 'axios'
import {instance} from './Instance'


//api
export const packsCardsApi = {
    getCardsPack(params?:PacksGetParamsTypeNotNeeded){
        return instance.get<PacksGetParamsTypeNotNeeded, AxiosResponse<GetPacksResponseType>>(`cards/pack`, {params})
    },
    addNewPacks(data: PostPacksType) {
        return instance.post<PostPacksType, AxiosResponse<AddNewPackTypeResponseType>>(`cards/pack`, {cardsPack: data})
    },
    deletePacks(packID: string) {
        return instance.delete<DeletePackResponseType>(`cards/pack?id=${packID}`)
    },
    updatePacks(params: UpdatePacksType) {
        return instance.put<UpdatePacksType, AxiosResponse<UpdatePackResponseType>>(`cards/pack`, params)
    },
    getCards(params: GetCardsParamsType) {
        return instance.get<GetCardsResponseType>(`cards/card`, {params})
    },
    deleteCards(cardID: string) {
        return instance.delete<string, AxiosResponse<DeleteCardRespondType>>(`cards/card`, {params: {id: cardID}})
    },
    addNewCards(postModel: PostCardType) {
        return instance.post <PostCardType, AxiosResponse<PostCardResponseType>>(`cards/card`, postModel)
    },
    updateCards(putModel: UpdateCardType) {
        return instance.put <UpdateCardType, AxiosResponse<UpdatedCardResponseType>>(`cards/card`, putModel)
    },
    updateGradeCard(putModelGrade: CardLearnType) {
        return instance.put<ResponseCardsLearnType>('cards/grade', putModelGrade)
    }
}


//types
export type GetPacksResponseType = {
    cardPacks: PackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
    sortPacks:string
}

export type PackType = {
    _id: string
    user_id?: string
    name: string
    cardsCount?: number
    created?: string
    updated?: string
    grade?: number
    more_id?: string
    path?: string
    private?: boolean
    rating?: number
    shots?: number
    type?: string
    user_name?: string
    __v?: number
    deckCover: string
}

export type PacksGetParamsType = {
    page?: number
    pageCount?: number
    min?: number
    max?: number
    user_id?: string
    packName?: string
    sortPacks?:string
}

export type PacksGetParamsTypeNotNeeded = Partial<PacksGetParamsType>

export type PostPacksType = {
    name?: string
    deckCover?: string
    private?: boolean
}

type AddNewPackTypeResponseType = {
    newCardsPack: PackType
    token: string
    tokenDeathTime: number
}
export type DeletePackResponseType = {
    deletedCardsPack: PackType
    token: string
    tokenDeathTime: number
}

export type UpdatePackResponseType = {
    updatedCardsPack: PackType
    token: string
    tokenDeathTime: number
}

export type UpdatePacksType = {
    cardsPack: {
        _id?: string
        name?: string
        deckCover?: string
    }
}

export type GetCardsParamsType = {
    packName?: string
    cardAnswer?: string
    cardQuestion?: string
    cardsPack_id?: string
    sortCards?: number
    page?: number
    pageCount?: number
}

export type GetCardsResponseType = {
    cards: CardType[]
    packUserId: string
    packName: string
    packPrivate: boolean
    packDeckCover: string
    packCreated: string
    packUpdated: string
    page: number
    pageCount: number
    cardsTotalCount: number
    minGrade: number
    maxGrade: number
    token: string
    tokenDeathTime: number
}

export type CardType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    answerImg: string
    questionImg: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
}

type DeleteCardRespondType = {
    deletedCard: CardType
    token: string
    tokenDeathTime: number
}

export type PostCardType = {
    card: {
        cardsPack_id: string
        question?: string
        answer?: string
        grade?: number
        shots?: number
        answerImg?: string
        questionImg?: string
        questionVideo?: string
        answerVideo?: string
    }
}

type PostCardResponseType = {
    newCard: NewCardPostType
    token: string
    tokenDeathTime: number
}

export type NewCardPostType = {
    _id: string
    cardsPack_id: string
    user_id: string
    answer: string
    question: string
    grade: number
    shots: number
    comments: string
    type: string
    rating: number
    more_id: string
    created: string
    updated: string
    __v: number
    answerImg: string
    answerVideo: string
    questionImg: string
    questionVideo: string
}

export type UpdateCardType = {
    card: {
        _id: string
        answer?: string
        answerImg?: string
        questionImg?: string
        question?: string
        grade?: number
        comments?: string
        rating?: number
    }
}

type UpdatedCardResponseType = {
    updatedCard: NewCardPostType
    token: string
    tokenDeathTime: number
}

export type CardLearnType = {
    shots: number
    grade: number
    card_id: string
}

export type ResponseCardsLearnType = {
    updatedGrade: UpdatedGradeCartType
    token: string
    tokenDeathTime: number
}

export type UpdatedGradeCartType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
    more_id: string
    created: string
    updated: string
    __v: number
}