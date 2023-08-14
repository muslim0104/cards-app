import {MainBlockModal, ButtonBlockModal} from 'common'


type ModalDeleteCardPropsType = {
    title: string
    open: boolean
    question: string
    questionImg: string
    toggleOpenMode: (value: boolean) => void
    deleteItem: () => void
}


export const ModalDeleteCard = (props: ModalDeleteCardPropsType) => {
    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
    }

    const deleteCardButtonHandler = () => {
        props.deleteItem()
        props.toggleOpenMode(false)
    }

    return (
        <div>

            <MainBlockModal title={props.title}
                            open={props.open}
                            toggleOpenMode={props.toggleOpenMode}
                            onCloseModal={onCloseModalHandler}>
                {props.questionImg
                    ? <div>
                        <p>Do you really want to remove ?</p>
                        <img src={props.questionImg} alt={'question image'}
                             style={{maxWidth: '150px', display: 'block', margin: '0 auto'}}/>
                    </div>
                    : <p>Do you really want to remove: <b style={{wordBreak: 'break-all'}}>{props.question}</b>?</p>
                }
                <ButtonBlockModal onCloseModalHandler={onCloseModalHandler}
                                  actionModalHandler={deleteCardButtonHandler}
                                  buttonTitleModal={'Delete'}/>
            </MainBlockModal>
        </div>
    )
}
