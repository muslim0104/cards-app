import {Button} from 'collections-mui'
import {ModalAddNewCard} from 'common'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import {PostCardType} from 'api/Packs-cards-api'
import {addNewCards} from 'reducers/Cards-reducer'
import {memo} from 'react'


export const ButtonAddCard = memo(() => {
        const status = useAppSelector(selectAppStatus)

        const {isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal} = useModal()
        const dispatch = useAppDispatch()

        const addCard = (postModel: PostCardType) => {
            dispatch(addNewCards(postModel))
        }

        return (
            <div>
                <Button onClick={openAddModal}
                        variant={'contained'}
                        style={{width: '200px', borderRadius: '90px'}}
                        disabled={status === 'loading'}>
                    Add New Card
                </Button>
                <ModalAddNewCard
                    title='Add new card'
                    open={isAddModalOpen}
                    toggleOpenMode={closeAddModal}
                    addItem={addCard}
                />
            </div>
        )
    }
)