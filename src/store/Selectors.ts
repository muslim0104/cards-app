import {RootReducerType} from './Store'


//selectorsApp
export const selectAppStatus = (state: RootReducerType) => state.app.status
export const selectAppError = (state: RootReducerType) => state.app.successError
export const selectIsInitializedApp = (state: RootReducerType) => state.app.isInitialized


//selectorsAuth
export const selectAuthIsLoggedIn = (state: RootReducerType) => state.auth.isLoggedIn
export const selectAuthIsRegistered = (state: RootReducerType) => state.auth.isRegistered
export const selectAuthRecoveryPassword = (state: RootReducerType) => state.auth.recoveryPassword


//selectorsCards
export const selectCardsPage = (state: RootReducerType) => state.cards.page
export const selectCardsPageCount = (state: RootReducerType) => state.cards.pageCount
export const selectCardsPackName = (state: RootReducerType) => state.cards.packName
export const selectCards = (state: RootReducerType) => state.cards.cards
export const selectCardsTotalCount = (state: RootReducerType) => state.cards.cardsTotalCount
export const selectCardsPackUserId = (state: RootReducerType) => state.cards.packUserId
export const selectCardsPackDeckCover = (state: RootReducerType) => state.cards.packDeckCover
export const selectCardsCardQuestion = (state: RootReducerType) => state.cards.cardQuestion


//selectorsPacks
export const selectPacksMin = (state: RootReducerType) => state.packs.params.min
export const selectPacksMax = (state: RootReducerType) => state.packs.params.max
export const selectPacksMinCardsCount = (state: RootReducerType) => state.packs.minCardsCount
export const selectPacksMaxCardsCount = (state: RootReducerType) => state.packs.maxCardsCount
export const selectPacks = (state: RootReducerType) => state.packs.cardPacks
export const selectPacksSort = (state: RootReducerType) => state.packs.params.sortPacks
export const selectPacksPage = (state: RootReducerType) => state.packs.params.page
export const selectPacksPageCount = (state: RootReducerType) => state.packs.params.pageCount
export const selectPacksCardPacksTotalCount = (state: RootReducerType) => state.packs.cardPacksTotalCount
export const selectPacksStatusPackCards = (state: RootReducerType) => state.packs.statusPackCards
export const selectPackNameForSearch = (state: RootReducerType) => state.packs.params.packName


//selectorsProfile
export const selectProfileEmail = (state: RootReducerType) => state.profile.infoUser.email
export const selectProfileAvatar = (state: RootReducerType) => state.profile.infoUser.avatar
export const selectProfileName = (state: RootReducerType) => state.profile.infoUser.name
export const selectProfileUser_id = (state: RootReducerType) => state.profile.infoUser._id
export const selectProfileInfoUser = (state: RootReducerType) => state.profile.infoUser