import {useState, MouseEvent, memo} from 'react'
import {useAppSelector} from 'utils'
import s from './Cards-menu.module.css'
import {Button, Popover, EditIcon, SchoolIcon, DeleteOutlineIcon, MoreVertIcon} from 'collections-mui'
import {ButtonEditPack, ButtonDeletePack} from 'common'
import {useNavigate, useParams} from 'react-router-dom'
import {packsCardsApi} from 'api/Packs-cards-api'
import {
    selectCardsPackDeckCover,
    selectCardsPackName,
    selectCardsTotalCount
} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'


export const CardsMenu = memo (() => {
    const packName = useAppSelector(selectCardsPackName)
    const packDeckCover = useAppSelector(selectCardsPackDeckCover)
    const cardsTotalCount = useAppSelector(selectCardsTotalCount)

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
    const open = Boolean(anchorEl)
    const id = open ? 'simple-popover' : undefined

    const {packId} = useParams<'packId'>()
    const navigate = useNavigate()

    const buttonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const popoverCloseHandler = () => {
        setAnchorEl(null)
    }

    const deletePack = async () => {
        if (packId) {
            await packsCardsApi.deletePacks(packId)
            navigate(`${PATH.PACKS}`)
        }
    }

    const learnButtonCloseHandler = () => {
        navigate(`${PATH.LEARN}/${packId}`)
    }

    return (
        <div>
            <button className={s.menuButton} onClick={buttonClickHandler}>
                <MoreVertIcon className={s.moreVertIcon}/>
            </button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={popoverCloseHandler}
                anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
            >
                <div className={s.menu}>
                    <Button onClick={learnButtonCloseHandler}
                            disabled={!cardsTotalCount}>
                        <div className={s.icon}>
                            <SchoolIcon sx={{marginRight: '5px'}}/> Learn
                        </div>
                    </Button>
                    <ButtonEditPack name={packName}
                                    deckCover={packDeckCover}
                                    _id={packId}>
                        <div className={s.icon}>
                            <EditIcon sx={{marginRight: '5px'}}/> Edit
                        </div>
                    </ButtonEditPack>
                    <ButtonDeletePack name={packName}
                                      deleteItem={deletePack}
                                      _id={packId}>
                        <div className={s.icon}>
                            <DeleteOutlineIcon sx={{marginRight: '5px'}}/> Delete
                        </div>
                    </ButtonDeletePack>
                </div>
            </Popover>
        </div>
    )
}
)