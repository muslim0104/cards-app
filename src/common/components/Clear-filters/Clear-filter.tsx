import {Button, FilterAltOffIcon} from 'collections-mui'
import {packsActions} from 'reducers/Packs-reducer'
import {useAppDispatch, useAppSelector} from 'utils'
import {selectAppStatus, selectPacksMaxCardsCount} from 'store/Selectors'
import {memo} from 'react'
import s from './Clear-filter.module.css'


export const ClearFilters = memo (() => {
    const maxCardsCount = useAppSelector(selectPacksMaxCardsCount)
    const status = useAppSelector(selectAppStatus)

    const dispatch = useAppDispatch()

    const resetFilterHandler = () => {
        dispatch(packsActions.clearFilters({}))
        dispatch(packsActions.setMinMaxSearchCard({value1:0, value2:maxCardsCount}))
    }

    return (
    <Button color={'inherit'}
            className={s.clearFilter}
            onClick={resetFilterHandler}
            disabled={status === 'loading'}>
        <FilterAltOffIcon/>
    </Button>
)
}
)