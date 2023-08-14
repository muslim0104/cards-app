import {Button} from 'collections-mui'
import {ModalEditPack} from 'common'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {FC, memo, ReactNode} from 'react'
import {selectAppStatus} from 'store/Selectors'
import {getCards} from 'reducers/Cards-reducer'
import {packsCardsApi} from 'api/Packs-cards-api'


type ButtonEditPackPropsType = {
    children?: ReactNode
    name: string
    deckCover: string
    _id?: string
}


export const ButtonEditPack: FC<ButtonEditPackPropsType> = memo (({name, deckCover, _id, children}) => {
    const status = useAppSelector(selectAppStatus)

    const {isOpen: isEditModalOpen, openModal, closeModal} = useModal()

    const dispatch = useAppDispatch()

    const editPackCards = async (name: string, deckCover: string) => {
        if (_id) {
            await packsCardsApi.updatePacks({cardsPack: {_id, name, deckCover}})
            dispatch(getCards({cardsPack_id: _id}))
        }
    }

    return (
        <>
            <Button onClick={openModal}
                    disabled={status === 'loading'}>
                {children}
            </Button>
            <ModalEditPack
                title={'Edit Pack'}
                itemTitle={name}
                open={isEditModalOpen}
                toggleOpenMode={closeModal}
                editItem={editPackCards}
                img={deckCover}/>
        </>
    )
}
)