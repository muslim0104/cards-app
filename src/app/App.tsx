import {useEffect} from 'react'
import './App.css'
import {appActions, isInitialized} from 'reducers/App-reducer'
import {CircularProgress, LinearProgress} from 'collections-mui'
import {useAppDispatch, useAppSelector, loadState} from 'utils'
import {PagesRoutes} from './Routes/Routes'
import {ErrorSnackbar} from 'common'
import {Header} from 'feautures/Header/Header'
import {packsActions} from 'reducers/Packs-reducer'
import {selectAppStatus, selectAuthIsLoggedIn, selectIsInitializedApp} from 'store/Selectors'
import { useGetDecksQuery } from 'api/cards-api'
import { addLogin } from 'reducers/Auth-reducer'
import {profileActions} from "../reducers/Profile-reducer";



export const App = () => {
    const status = useAppSelector(selectAppStatus)
    const isInitializedApp = useAppSelector(selectIsInitializedApp)
      const {data}=useGetDecksQuery()
       console.log(data)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(isInitialized()).then(res=>{
            dispatch(addLogin())

        })
        dispatch(packsActions.setTypePackCards({statusPackCards:loadState() as 'all' | 'my'}))
    }, [])

    if (!isInitializedApp) {
        return (
            <div style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
                <CircularProgress/>
            </div>
        )
    }
    return (
        <div className='app-wrapper'>
            <Header/>
            <ErrorSnackbar/>
            {status === 'loading' ? <LinearProgress color={'primary'}/> : <div style={{height: '5px'}}/>}
            <PagesRoutes/>
        </div>
    )
}