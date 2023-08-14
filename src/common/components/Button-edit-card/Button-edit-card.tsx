import {Button, EditIcon} from 'collections-mui'
import {ModalEditCard} from 'common'
import {useAppDispatch, useAppSelector, useModal} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import {updateCards} from 'reducers/Cards-reducer'
import {CardType} from 'api/Packs-cards-api'
import {FC, memo} from 'react'


type ButtonEditCardPropsType = {
    card: CardType
}


export const ButtonEditCard: FC<ButtonEditCardPropsType> = memo (({card}) => {
    const status = useAppSelector(selectAppStatus)

    const {isOpen: isEditModalOpen, openModal, closeModal} = useModal()

    const dispatch = useAppDispatch()

    const editCard =  (question: string, answer: string, questionImg: string, answerImg: string) => {
        dispatch(updateCards({card: {_id: card._id, question, answer, questionImg, answerImg}}))
    }

    return (
        <>
            <Button onClick={openModal}
                    disabled={status === 'loading'}>
                <EditIcon/>
            </Button>
            <ModalEditCard
                title={'Edit Card'}
                open={isEditModalOpen}
                toggleOpenMode={closeModal}
                editItem={editCard}
                previousQuestion={card.question}
                previousAnswer={card.answer}
                previousQuestionImg={card.questionImg}
                previousAnswerImg={card.answerImg}
                questionType={card.type}
            />
        </>
    )
}
)