import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from 'collections-mui'
import {Navigate} from 'react-router-dom'
import {Pack} from './Pack/Pack'
import {useAppDispatch, useAppSelector} from 'utils'
import {setParamsSortPack} from 'reducers/Packs-reducer'
import {selectPacks, selectPacksSort} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'
import t from 'common/Styles/Table.module.css'
import s from './Packs-table.module.css'
import {memo} from 'react'


export const PacksTable = memo (() => {
    const packs = useAppSelector(selectPacks)
    const sort = useAppSelector(selectPacksSort)

    const dispatch = useAppDispatch()

    const sortUpdate = (sortParams: string) => {
        return sort === `1${sortParams}` ? dispatch(setParamsSortPack(`0${sortParams}`))
            : dispatch(setParamsSortPack(`1${sortParams}`))
    }

    const redirectToCards = () => {
        return <Navigate to={PATH.CARDS}/>
    }

    return (
        <TableContainer className={t.tableContainer} component={Paper}>
                <Table aria-label="simple table">
                <TableHead>
                    <TableRow onClick={redirectToCards} >
                        <TableCell align='center'>Cover</TableCell>
                        <TableCell align='center'
                                   className={!sort.includes('0name') ? s.withoutSort :
                                       sort === '0name' ? s.sortUp : s.sortDown}
                                   onClick={() => sortUpdate('name')}>Name
                        </TableCell>
                        <TableCell align='center'
                                   className={!sort.includes('0cardsCount') ? s.withoutSort :
                                       sort === '0cardsCount' ? s.sortUp : s.sortDown}
                                   onClick={() => sortUpdate('cardsCount')}>Cards
                        </TableCell>
                        <TableCell align='center'
                                   className={!sort.includes('updated') ? s.withoutSort :
                                       sort === '0updated' ? s.sortUp : s.sortDown}
                                   onClick={() => sortUpdate('updated')}>Last updated(g)
                        </TableCell>
                        <TableCell align='center'
                                   className={!sort.includes('0user_name') ? s.withoutSort :
                                       sort === '0user_name' ? s.sortUp : s.sortDown}
                                   onClick={() => sortUpdate('user_name')}>Created by
                        </TableCell>
                        <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {packs.map(pack => (
                        <Pack
                            key={pack._id}
                            pack={pack}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}
)
