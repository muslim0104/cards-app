import {ChangeEvent, useState} from 'react'
import {ButtonBlockModal, MainBlockModal, InputFile} from 'common'
import {TextField} from 'collections-mui'
import {LENGTH} from 'constants/Length-card-packs-constants'


type ModalEditPackPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    editItem: (name: string, deckCover: string) => void
    itemTitle: string
    img: string
}


export const ModalEditPack = (props: ModalEditPackPropsType) => {
    const [name, setName] = useState(props.itemTitle)
    const [deckCover, setDeckCover] = useState(props.img)

    const validateNamePack = name.length >= LENGTH.MAX_LENGTH_PACK
    const textForValidateError = validateNamePack ? 'The pack name must contain no more than 50 characters' : ''

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
    }

    const textFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    const editPackButtonHandler = () => {
        if (name.length < LENGTH.MAX_LENGTH_PACK) {
            props.editItem(name, deckCover)
            props.toggleOpenMode(false)
        }
    }

    return (
        <div>
            <MainBlockModal
                title={props.title}
                open={props.open}
                toggleOpenMode={props.toggleOpenMode}
                onCloseModal={onCloseModalHandler}
            >
                <InputFile
                    img={deckCover}
                    saveImg={setDeckCover}
                    title={'Change pack cover'}
                    name={'editPackCoverImage'}
                />
                <TextField
                    value={name}
                    onChange={textFieldChangeHandler}
                    autoFocus
                    label='Edit pack'
                    variant='standard'
                    style={{width: '100%'}}
                    helperText={textForValidateError}
                    error={validateNamePack}
                />
                <ButtonBlockModal
                    onCloseModalHandler={onCloseModalHandler}
                    actionModalHandler={editPackButtonHandler}
                    buttonTitleModal={'Save'}
                />
            </MainBlockModal>
        </div>
    )
}
