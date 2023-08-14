import {forwardRef, SyntheticEvent} from 'react'
import {Snackbar,MuiAlert, AlertProps} from 'collections-mui'
import {appActions} from 'reducers/App-reducer'
import {useAppDispatch, useAppSelector} from 'utils'
import {selectAppError} from 'store/Selectors'


const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})


export const ErrorSnackbar = () => {
    const error = useAppSelector(selectAppError)

    const dispatch = useAppDispatch()

    const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickAway') {
            return
        }
        dispatch(appActions.setAppError(null))
    }

    return (
        <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity='error'>
                {error}
            </Alert>
        </Snackbar>
    )
}