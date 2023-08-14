import {memo, useCallback, useEffect} from 'react'
import {Navigate} from 'react-router-dom'
import {PacksTable} from './Packs-table/Packs-table'
import {useAppDispatch, useAppSelector} from 'utils'
import {Search, PaginationBar, RangeSlider, MyAllPanel, ClearFilters, ButtonAddPack} from 'common'
import {getPacks, packsActions} from 'reducers/Packs-reducer'
import {PATH} from 'constants/Routing-constants'
import {
    selectAppStatus,
    selectAuthIsLoggedIn, selectPackNameForSearch, selectPacks,
    selectPacksCardPacksTotalCount,
    selectPacksMax,
    selectPacksMin,
    selectPacksPage,
    selectPacksPageCount,
    selectPacksStatusPackCards
} from 'store/Selectors'
import f from 'common/Styles/Forms.module.css'
import t from 'common/Styles/Table.module.css'


export const Packs = memo(() => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
    const status = useAppSelector(selectAppStatus)
    const page = useAppSelector(selectPacksPage)
    const packs = useAppSelector(selectPacks)
    const pageCount = useAppSelector(selectPacksPageCount)
    const cardPacksTotalCount = useAppSelector(selectPacksCardPacksTotalCount)
    const statusPackCards = useAppSelector(selectPacksStatusPackCards)
    const packName = useAppSelector(selectPackNameForSearch)
    const min = useAppSelector(selectPacksMin)
    const max = useAppSelector(selectPacksMax)

    const dispatch = useAppDispatch()

    const notFoundPack = !cardPacksTotalCount && packName
    const textForNotFoundPack = 'Sorry, there are no such packs.'

    const PacksPaginationPages = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        dispatch(getPacks())
    }, [dispatch, statusPackCards, min, max, pageCount, page, packName])

    const packsPageCountHandler = useCallback((value: string) => {
        dispatch(packsActions.setCardPacksPageCount(+value))
    }, [])

    const packsHandleChangePage = useCallback((page: number) => {
        dispatch(packsActions.setCardPacksPage(page))
    }, [])

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={t.block}>
            <div className={t.container}>
                <div className={t.backToPackList}>
                    <div className={f.title}>Pack list</div>
                    <ButtonAddPack/>
                </div>
                <>
                    <div className={t.filterContainer}>
                        <Search valueSearch={packName}/>
                        <MyAllPanel/>
                        <RangeSlider/>
                        <ClearFilters/>
                    </div>
                    <PacksTable/>
                    {notFoundPack && status !== 'loading' &&
                        <div className={t.infoText}>{textForNotFoundPack}</div>
                    }
                    {!!packs.length &&
                        <>
                            <PaginationBar paginationPages={PacksPaginationPages}
                                           pageCount={pageCount}
                                           page={page}
                                           pageCountHandler={packsPageCountHandler}
                                           handleChangePage={packsHandleChangePage}/>
                        </>
                    }
                </>
            </div>
        </div>
    )
}
)

