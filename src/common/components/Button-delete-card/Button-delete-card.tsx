import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import {deleteCards} from 'reducers/Cards-reducer'
import {Button, DeleteOutlineIcon} from 'collections-mui'
import {ModalDeleteCard} from 'common'
import {CardType} from 'api/Packs-cards-api'
import {FC, memo} from 'react'


type ButtonDeleteCardPropsType = {
    card: CardType
}
export const ButtonDeleteCard: FC<ButtonDeleteCardPropsType> = memo (({card}) => {
    const status = useAppSelector(selectAppStatus)

    const {isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal} = useModal()
    const dispatch = useAppDispatch()

    const deleteCard = () => {
        dispatch(deleteCards(card._id))
    }

    return (
        <>
            <Button onClick={openDeleteModal}
                    disabled={status === 'loading'}>
                <DeleteOutlineIcon/>
            </Button>
            <ModalDeleteCard
                title={'Delete Card'}
                open={isDeleteModalOpen}
                toggleOpenMode={closeDeleteModal}
                deleteItem={deleteCard}
                question={card.question}
                questionImg={card.questionImg}

            />
        </>
    )
}
)