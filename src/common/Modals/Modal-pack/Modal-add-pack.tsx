import {ChangeEvent, useState} from 'react'
import {TextField} from 'collections-mui'
import {MainBlockModal, ButtonBlockModal, InputFile} from 'common'
import {LENGTH} from 'constants/Length-card-packs-constants'


type ModalAddPackPropsType = {
    title: string
    open: boolean
    toggleOpenMode: (value: boolean) => void
    addItem: (name: string, deckCover: string) => void
}


export const ModalAddPack = (props: ModalAddPackPropsType) => {
    const [name, setText] = useState('')
    const [deckCover, setDeckCover] = useState('')

    const validateNamePack = name.length >= LENGTH.MAX_LENGTH_PACK
    const textForValidateError = validateNamePack ? 'The pack name must contain no more than 50 characters' : ''

    const onCloseModalHandler = () => {
        props.toggleOpenMode(false)
        setText('')
    }

    const saveButtonHandler = () => {
        if (name.length < LENGTH.MAX_LENGTH_PACK) {
            props.addItem(name, deckCover)
            props.toggleOpenMode(false)
            setText('')
            setDeckCover('')
        }
    }

    const textFieldChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.currentTarget.value)
    }

    return (
        <div>
            <MainBlockModal title={props.title}
                            open={props.open}
                            toggleOpenMode={props.toggleOpenMode}
                            onCloseModal={onCloseModalHandler}>
                <InputFile img={deckCover}
                           saveImg={setDeckCover}
                           title={'Upload pack cover'}
                           name={'packCoverImage'}/>
                <TextField value={name}
                           onChange={textFieldChangeHandler}
                           autoFocus
                           style={{width: '100%'}}
                           label='Name pack'
                           variant='standard'
                           helperText={textForValidateError}
                           error={validateNamePack}/>
                <ButtonBlockModal onCloseModalHandler={onCloseModalHandler}
                                  actionModalHandler={saveButtonHandler}
                                  buttonTitleModal={'Save'}/>
            </MainBlockModal>
        </div>
    )
}
