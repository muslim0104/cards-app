import {MainBlockModal, ButtonBlockModal} from 'common'


type ModalDeletePackPropsType = {
    title: string
    open: boolean
    name: string
    toggleOpenMode: (value: boolean) => void
    deleteItem: () => void
}


export const ModalDeletePack = (props: ModalDeletePackPropsType) => {

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
    }

    const deletePackButtonHandler = () => {
        props.deleteItem()
        props.toggleOpenMode(false)
    }

    return (
        <div>
            <MainBlockModal
                title={props.title}
                open={props.open}
                toggleOpenMode={props.toggleOpenMode}
                onCloseModal={onCloseModalHandler}
            >
                <div>
                    <p>Do you really want to remove: <b style={{wordBreak: 'break-all'}}>{props.name}</b>?</p>
                    <p> All packs will be deleted.</p>
                </div>
                <ButtonBlockModal
                    onCloseModalHandler={onCloseModalHandler}
                    actionModalHandler={deletePackButtonHandler}
                    buttonTitleModal={'Delete'}
                />
            </MainBlockModal>
        </div>
    )
}



