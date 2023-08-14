import {CardType} from 'api/Packs-cards-api'
import {TableRow, TableCell, Rating} from 'collections-mui'
import {useAppSelector} from 'utils'
import {ButtonEditCard, ButtonDeleteCard} from 'common'
import {selectProfileUser_id} from 'store/Selectors'
import s from './Card.module.css'
import {FC, memo} from 'react'


type CardPropsType = {
    card: CardType
}


export const Card: FC<CardPropsType> = memo(({card}) => {
    const user_id = useAppSelector(selectProfileUser_id)

    const isMyCard = user_id === card.user_id

    return (
        <TableRow key={card._id}>
            <TableCell align='center' className={s.questionAnswerColumn}>
                {card.questionImg
                    ?
                    <img src={card.questionImg} alt={'question image'}/>
                    :
                    card.question
                }
            </TableCell>
            <TableCell align='center' className={s.questionAnswerColumn}>
                {card.answerImg
                    ?
                    <img src={card.answerImg} alt={'answer image'}/>
                    :
                    card.answer
                }
            </TableCell>
            <TableCell align='center'> {card.updated?.split('').splice(0, 10)}</TableCell>
            <TableCell align='center'>
                <Rating name='only'
                        value={card.grade}
                        precision={0.1}
                        readOnly/>
            </TableCell>
            {isMyCard &&
                <TableCell align='center'>
                    <>
                        <ButtonEditCard card={card}/>
                        <ButtonDeleteCard card={card}/>
                    </>
                </TableCell>
            }
        </TableRow>
    )
}
)