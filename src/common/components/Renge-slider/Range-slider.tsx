import {memo, useEffect, useState} from 'react'
import {Slider, Box} from 'collections-mui'
import {useAppDispatch, useAppSelector} from 'utils/Hooks'
import {selectAppStatus, selectPacksMax, selectPacksMaxCardsCount, selectPacksMin, selectPacksMinCardsCount}
    from 'store/Selectors'
import {packsActions} from 'reducers/Packs-reducer'
import s from 'common/components/Renge-slider/Range-slider.module.css'
import styleForms from 'common/Styles/Forms.module.css'


export const RangeSlider = memo (() => {
    const minCardsCount = useAppSelector(selectPacksMinCardsCount)
    const maxCardsCount = useAppSelector(selectPacksMaxCardsCount)
    const min = useAppSelector(selectPacksMin)
    const max = useAppSelector(selectPacksMax)
    const status = useAppSelector(selectAppStatus)

    const [value, setValue] = useState<number[]>([min ? min : minCardsCount, max ? max : maxCardsCount])

    const dispatch = useAppDispatch()

    useEffect(() => {
        setValue([minCardsCount, maxCardsCount])
    }, [minCardsCount, maxCardsCount])

    useEffect(() => {
        setValue([min!, max!])
    }, [min, max])

    const minDistance = 1

    const handleChange = (event: Event, newValue: number | number[], activeThumb: number) => {
        if (!Array.isArray(newValue)) {
            return
        }
        if (activeThumb === 0) {
            setValue([Math.min(newValue[0], value[1] - minDistance), value[1]])
        } else {
            setValue([value[0], Math.max(newValue[1], value[0] + minDistance)])
        }
    }

    const setMinMaxHandler = () => {
        dispatch(packsActions.setMinMaxSearchCard(value[0], value[1]))
    }

    return (
        <div className={s.rangeSlider}>
            <div className={`${styleForms.filterTitle} ${s.filterTitle}`}>Number of cards</div>
            <Box className={s.boxRangeSlider}>
                <Slider color={'primary'}
                        value={value}
                        valueLabelDisplay='on'
                        disabled={status === 'loading'}
                        disableSwap
                        min={minCardsCount}
                        max={maxCardsCount}
                        onChange={handleChange}
                        onMouseUp={setMinMaxHandler}/>
            </Box>
        </div>
    )
}
)