import {TableCell, Button, SchoolIcon, TableRow, EditIcon, DeleteOutlineIcon} from 'collections-mui'
import {useNavigate} from 'react-router-dom'
import {PackType} from 'api/Packs-cards-api'
import {useAppDispatch, useAppSelector} from 'utils'
import defaultCover from 'assets/Icon/ques.png'
import {cardsActions, getCards} from 'reducers/Cards-reducer'
import {selectAppStatus, selectCardsPage, selectProfileUser_id} from 'store/Selectors'
import {FC, memo, useCallback} from 'react'
import s from './Pack.module.css'
import {PATH} from 'constants/Routing-constants'
import {ButtonDeletePack, ButtonEditPack} from 'common'
import {deletePack} from 'reducers/Packs-reducer'


type PackPropsType = {
    pack: PackType
}


export const Pack: FC<PackPropsType> = memo (({pack}) => {
    const user_id = useAppSelector(selectProfileUser_id)
    const status = useAppSelector(selectAppStatus)
    const page = useAppSelector(selectCardsPage)

    const isMyPack = user_id === pack.user_id

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const onClickLearnHandler = () => {
        dispatch(getCards({packName: pack.name, cardsPack_id: pack._id, page}))
        navigate(`${PATH.LEARN}/${pack._id}`)
    }

    const deletePackCards = useCallback( () => {
        dispatch(deletePack(pack._id))
    }, [pack._id])

    const openCard = () => {
        dispatch(cardsActions.setQuestionForSearch(''))
        dispatch(cardsActions.setPackName(pack.name))
        dispatch(cardsActions.setPackDeckCover(pack.deckCover))
        dispatch(cardsActions.setEmptyArrayCards())
        navigate(`${PATH.CARDS}/${pack._id}`)
    }

    return (
        <TableRow key={pack._id}>
            <TableCell align='center' className={s.deckCoverColumn}>
                <img style={{width: '40px', height: '40px', borderRadius:'50%'}}
                     src={pack.deckCover ? pack.deckCover : defaultCover}
                     alt='img'/>
            </TableCell>
            <TableCell align='center' onClick={openCard} className={s.nameColumn}>{pack.name}</TableCell>
            <TableCell align='center'>{pack.cardsCount}</TableCell>
            <TableCell align='center'>{pack.updated?.split('').splice(0, 10)}</TableCell>
            <TableCell align='center'>{pack.user_name}</TableCell>
            <TableCell align='center'>
                {isMyPack &&
                    <>
                        <ButtonEditPack name={pack.name}
                                        deckCover={pack.deckCover}
                                        _id={pack._id}>
                            <EditIcon/>
                        </ButtonEditPack>
                        <ButtonDeletePack name={pack.name}
                                          deleteItem={deletePackCards}
                                          _id={pack._id}>
                            <DeleteOutlineIcon/>
                        </ButtonDeletePack>
                    </>
                }
                <>
                    <Button
                        onClick={onClickLearnHandler}
                        disabled={status === 'loading' || pack.cardsCount === 0}>
                        <SchoolIcon/>
                    </Button>
                </>
            </TableCell>
        </TableRow>
    )
}
)