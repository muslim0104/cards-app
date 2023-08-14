import {Button} from 'collections-mui'
import {ModalAddPack} from 'common'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import {addNewPack} from 'reducers/Packs-reducer'
import {memo} from 'react'
import s from './Button-add-pack.module.css'


export const ButtonAddPack = memo (() => {
    const status = useAppSelector(selectAppStatus)

    const {isOpen: isAddModalOpen, openModal: openAddModal, closeModal: closeAddModal} = useModal()

    const dispatch = useAppDispatch()

    const addNewPackCard = (name: string, deckCover: string) => {
        dispatch(addNewPack({name, deckCover}))
    }

    return (
        <div className={s.buttonAddPack}>
            <Button
                variant={'contained'}
                className={s.buttonAddPack}
                disabled={status === 'loading'}
                onClick={openAddModal}>
                Add new pack
            </Button>
            <ModalAddPack
                title={'Add new pack'}
                open={isAddModalOpen}
                toggleOpenMode={closeAddModal}
                addItem={addNewPackCard}
            />
        </div>
    )
}
)