import {memo} from 'react'
import {MenuItem, Pagination, Select, SelectChangeEvent} from 'collections-mui'
import {useAppSelector} from 'utils'
import {selectAppStatus} from 'store/Selectors'
import s from './Pagination-bar.module.css'


type PaginatorPropsType = {
    paginationPages: number
    pageCount: number
    page: number
    pageCountHandler: (value: string) => void
    handleChangePage: (page: number) => void
}


export const PaginationBar = memo((props: PaginatorPropsType) => {
        const status = useAppSelector(selectAppStatus)

        const optionSelect = [1, 2, 3, 4, 5]

        const pageCountHandler = (e: SelectChangeEvent) => {
            props.pageCountHandler(e.target.value as string)
        }

        const handleChangePage = (event: unknown, page: number) => {
            props.handleChangePage(page)
        }

        return (
            <div className={s.paginationBar}>
                <Pagination color='primary'
                            shape='rounded'
                            page={props.page}
                            size={'small'}
                            onChange={handleChangePage}
                            count={props.paginationPages}
                            disabled={status === 'loading'}
                />
                <div className={s.select}>
                    <span>Show</span>
                    <Select size={'small'}
                            autoWidth={true}
                            disabled={status === 'loading'}
                            value={props.pageCount.toString()}
                            onChange={pageCountHandler}>
                        {optionSelect.map((option, index) => (
                            <MenuItem key={index}
                                      value={option}
                            >
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                    <span>Cards per page</span>
                </div>
            </div>
        )
    }
)