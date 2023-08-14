import {Navigate, Route, Routes} from 'react-router-dom'
import {Login} from 'feautures/Auth/Login/Login'
import {Registration} from 'feautures/Auth/Registration/Registration'
import {Profile} from 'feautures/Profile/Profile'
import {CheckEmail} from 'feautures/Auth/Check-email/Check-email'
import {RecoveryPassword} from 'feautures/Auth/Recovery-password/Recovery-password'
import {NewPassword} from 'feautures/Auth/New-password/New-password'
import {Error404} from 'feautures/Error-404/Error-404'
import {Packs} from 'feautures/Packs/Packs'
import {Cards} from 'feautures/Cards/Cards'
import {Learn} from 'feautures/Learn/Learn'
import {Home} from 'feautures/Home/Home'
import {PATH} from 'constants/Routing-constants'


export const PagesRoutes = () => {
    return (
        <Routes>
            <Route path={PATH.HOME} element={<Home/>}/>
            <Route path={PATH.LOGIN} element={<Login/>}/>
            <Route path={PATH.REGISTRATION} element={<Registration/>}/>
            <Route path={PATH.PROFILE} element={<Profile/>}/>
            <Route path={PATH.CHECK_EMAIL} element={<CheckEmail/>}/>
            <Route path={PATH.RECOVERY_PASSWORD} element={<RecoveryPassword/>}/>
            <Route path={`${PATH.NEW_PASSWORD}/:token`} element={<NewPassword/>}/>
            <Route path={PATH.ERROR404} element={<Error404/>}/>
            <Route path={PATH.PACKS} element={<Packs/>}/>
            <Route path={`${PATH.CARDS}/:packId`} element={<Cards/>}/>
            <Route path={`${PATH.LEARN}/:packId`} element={<Learn/>}/>
            <Route path={'*'} element={<Navigate to={PATH.ERROR404}/>}/>
        </Routes>
    )
}