import {useAppSelector} from 'utils'
import {Navigate} from 'react-router-dom'
import {selectAuthIsLoggedIn} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'


export const Home = () => {
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return  <Navigate to={PATH.PACKS}/>
}