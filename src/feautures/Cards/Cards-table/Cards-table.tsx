import {TableContainer, Paper, TableHead, TableRow, TableCell, TableBody, Table} from 'collections-mui'
import {useAppSelector} from 'utils'
import {Card} from './Card/Card'
import {selectCards, selectCardsPackUserId, selectProfileUser_id} from 'store/Selectors'
import t from 'common/Styles/Table.module.css'
import {memo} from 'react'

import { useParams } from 'react-router-dom'


export const CardsTable = memo(() => {
    const cards = useAppSelector(selectCards)
    const user_id = useAppSelector(selectProfileUser_id)
    const cardsPackUserId = useAppSelector(selectCardsPackUserId)
    const {packId}=useParams()



    const isMyPack = user_id === cardsPackUserId

    return (
        <div>
            <TableContainer className={t.tableContainer} component={Paper}>
                <Table sx={{minWidth: 700}} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell align='center'>Question</TableCell>
                            <TableCell align='center'>Answer</TableCell>
                            <TableCell align='center'>Last updated</TableCell>
                            <TableCell align='center'>Grade</TableCell>
                            {isMyPack && <TableCell align='center'>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {cards.map(card => (
                            <Card
                                key={card._id}
                                card={card}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
)
