import {Button} from 'collections-mui'
import s from './Button-block-modal.module.css'


type ButtonBlockModalPropsType = {
    onCloseModalHandler: () => void
    actionModalHandler: () => void
    buttonTitleModal: string
}


export const ButtonBlockModal = (props: ButtonBlockModalPropsType) => {
    return (
        <div className={s.buttonModalBlock}>
            <Button onClick={props.onCloseModalHandler}
                    variant={'outlined'}
                    className={s.buttonModal}
            >
                Cancel
            </Button>
            <Button onClick={props.actionModalHandler}
                    variant={'contained'}
                    className={s.buttonModal}
            >
                {props.buttonTitleModal}
            </Button>
        </div>
    )
}
