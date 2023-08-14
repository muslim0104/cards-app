import {memo, useCallback, useEffect} from 'react'
import {Button} from 'collections-mui'
import {Navigate, useNavigate, useParams} from 'react-router-dom'
import {CardsTable} from './Cards-table/Cards-table'
import {useAppDispatch, useAppSelector} from 'utils'
import defaultCover from 'assets/Icon/ques.png'
import {Search, BackToPackList, PaginationBar, ButtonAddCard, CardsMenu} from 'common'
import {cardsActions, getCards} from 'reducers/Cards-reducer'
import {
    selectAppStatus, selectAuthIsLoggedIn,
    selectCards,
    selectCardsCardQuestion,
    selectCardsPackDeckCover,
    selectCardsPackName,
    selectCardsPackUserId,
    selectCardsPage,
    selectCardsPageCount,
    selectCardsTotalCount, selectProfileUser_id,
} from 'store/Selectors'
import t from 'common/Styles/Table.module.css'
import s from './Cards.module.css'
import {PATH} from 'constants/Routing-constants'


export const Cards = memo(() => {
        const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
        const page = useAppSelector(selectCardsPage)
        const pageCount = useAppSelector(selectCardsPageCount)
        const cardsTotalCount = useAppSelector(selectCardsTotalCount)
        const status = useAppSelector(selectAppStatus)
        const user_id = useAppSelector(selectProfileUser_id)
        const cardsPackUserId = useAppSelector(selectCardsPackUserId)
        const cards = useAppSelector(selectCards)
        const packDeckCover = useAppSelector(selectCardsPackDeckCover)
        const packName = useAppSelector(selectCardsPackName)
        const cardQuestion = useAppSelector(selectCardsCardQuestion)

        const navigate = useNavigate()
        const {packId} = useParams<'packId'>()
        const dispatch = useAppDispatch()

        const isMyPack = user_id === cardsPackUserId
        const isEmptyPack = !cardsTotalCount && !cardQuestion
        const notFoundCards = !cardsTotalCount && cardQuestion
        const extraText = isMyPack ? ' Click add new card to fill this pack.' : ''
        const textForEmptyPack = `This pack is empty.${extraText}`
        const textForNotFoundCards = `Sorry, there are no such cards.${extraText}`

        const cardsPaginationPages = Math.ceil(cardsTotalCount / pageCount)

        useEffect(() => {
            dispatch(getCards({cardsPack_id: packId ? packId : '', page, pageCount, cardQuestion}))
        }, [dispatch, packId, page, pageCount, cardQuestion])

        const setUtilsHandler = useCallback(() => {
            navigate(`${PATH.LEARN}/${packId}`)
        },[packId])

        const cardsPageCountHandler = useCallback((value: string) => {
            dispatch(cardsActions.setCardsPageCount(+value))
        }, [])

        const cardsHandleChangePage = useCallback((page: number) => {
            dispatch(cardsActions.setCardsPage(page))
        }, [])

        if (!isLoggedIn) {
            return <Navigate to={PATH.LOGIN}/>
        }

        return (
            <div className={t.tableBlock}>
                <div className={t.container}>
                    <div className={`${t.backToPackList} ${s.backToPackList}`}>
                        <BackToPackList/>
                        {isMyPack && <ButtonAddCard/>}
                    </div>
                    <div className={t.titlePack}>Pack name: ''{packName}''</div>
                    <div className={t.packDeckCover}>
                        <img style={{width: '130px', height: '130px'}}
                             src={packDeckCover ? packDeckCover : defaultCover}
                             alt='img'/>
                        {isMyPack && <CardsMenu/>}
                    </div>
                    <>
                        {!isEmptyPack &&
                            <div className={s.filterContainer}>
                                    <Search valueSearch={cardQuestion}/>
                                    <Button variant={'contained'}
                                            style={{width: '200px', borderRadius: '90px'}}
                                            onClick={setUtilsHandler} disabled={status === 'loading' || !cardsTotalCount}>
                                        Learn to pack
                                    </Button>
                            </div>
                        }
                        <CardsTable/>
                        {status !== 'loading' &&
                            <div className={t.infoText}>
                                {isEmptyPack && textForEmptyPack}
                                {notFoundCards && textForNotFoundCards}
                            </div>
                        }
                        {!!cards.length && status !== 'loading' &&
                            <PaginationBar paginationPages={cardsPaginationPages}
                                           pageCount={pageCount}
                                           page={page}
                                           pageCountHandler={cardsPageCountHandler}
                                           handleChangePage={cardsHandleChangePage}/>
                        }
                    </>
                </div>
            </div>
        )
    }
)
