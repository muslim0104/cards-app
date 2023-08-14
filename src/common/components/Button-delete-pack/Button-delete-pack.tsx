import {Button} from 'collections-mui'
import {ModalDeletePack} from 'common'
import {useAppSelector, useModal} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import {FC, memo, ReactNode} from 'react'


type ButtonDeletePackPropsType = {
    deleteItem: () => void
    children?: ReactNode
    name: string
    _id?: string
}


export const ButtonDeletePack: FC<ButtonDeletePackPropsType> = memo (({name, _id, children, deleteItem}) => {
    const status = useAppSelector(selectAppStatus)

    const {isOpen: isDeleteModalOpen, openModal: openDeleteModal, closeModal: closeDeleteModal} = useModal()

    return (
        <>
            <Button onClick={openDeleteModal}
                    disabled={status === 'loading'}>
                {children}
            </Button>
            <ModalDeletePack
                title={'Delete Pack'}
                open={isDeleteModalOpen}
                name={name}
                toggleOpenMode={closeDeleteModal}
                deleteItem={deleteItem}/>
        </>
    )
}
)