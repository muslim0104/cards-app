import {ReactNode} from 'react'
import s from './Main-block-modal.module.css'
import {CloseIcon, Modal} from 'collections-mui'


type MainBlockModalType = {
    children?: ReactNode
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    onCloseModal: () => void
}


export const MainBlockModal = (props: MainBlockModalType) => {
    return (
        <div>
            <Modal open={props.open} onClose={props.onCloseModal}>
                <div className={s.modalBlock}>
                    <div className={s.modalContainer}>
                        <div className={s.modalTitle}>{props.title}</div>
                        <CloseIcon fontSize={'medium'}
                                   style={{cursor: 'pointer'}}
                                   onClick={props.onCloseModal}/>
                    </div>
                    <div className={s.children}>
                        {props.children}
                    </div>
                </div>
            </Modal>
        </div>
    )
}
