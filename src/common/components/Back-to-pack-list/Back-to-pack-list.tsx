import {NavLink} from 'react-router-dom'
import s from './Back-to-pack-list.module.css'
import {ArrowBackIcon} from 'collections-mui'
import {PATH} from 'constants/Routing-constants'


export const BackToPackList = () => {

    return (
        <div className={s.backToPackList}>
            <NavLink to={PATH.PACKS} className={s.navLink}>
                <ArrowBackIcon fontSize={'small'}/>
                Back to Packs List
            </NavLink>
        </div>
    )
}
