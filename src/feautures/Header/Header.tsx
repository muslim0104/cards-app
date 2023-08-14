import {useState, MouseEvent, memo} from 'react'
import {NavLink} from 'react-router-dom'
import s from "./Header.module.css"
import {useAppDispatch, useAppSelector} from 'utils'
import {Avatar, Button, Popover, AccountBoxIcon, LogoutIcon} from 'collections-mui'
import defaultAvatar from 'assets/Icon/student.png'
import styleIcon from 'common/components/Cards-menu/Cards-menu.module.css'
import styleMenu from 'common/components/Cards-menu/Cards-menu.module.css'
import {logOut} from 'reducers/Auth-reducer'
import {selectAuthIsLoggedIn, selectProfileAvatar, selectProfileName} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'
import f from 'common/Styles/Forms.module.css'


export const Header = memo(() => {
        const avatar = useAppSelector(selectProfileAvatar)
        const name = useAppSelector(selectProfileName)
        const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

        const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

        const dispatch = useAppDispatch()
        const open = Boolean(anchorEl)
        const id = open ? 'simple-popover' : undefined

        const buttonClickHandler = (event: MouseEvent<HTMLButtonElement>) => {
            setAnchorEl(event.currentTarget)
        }

        const popoverCloseHandler = () => {
            setAnchorEl(null)
        }

        const logOutHandler = () => {
            dispatch(logOut())
        }

        return (
            <div className={s.header}>
                <div className={`${f.container} ${s.container}`}>
                    <header className={s.headerWrapper}>
                        <div className={s.userInfo}>
                            {isLoggedIn &&
                                <>
                                    <a className={s.userName}>{name}</a>
                                    <Popover id={id}
                                             anchorEl={anchorEl}
                                             open={open}
                                             onClose={popoverCloseHandler}
                                             anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}>
                                        <div className={styleMenu.menu}>
                                            <NavLink to={PATH.PROFILE} style={{textDecoration: 'none'}}>
                                                <Button>
                                                    <div className={styleIcon.icon}>
                                                        <AccountBoxIcon sx={{marginRight: '5px'}}/> Profile
                                                    </div>
                                                </Button>
                                            </NavLink>
                                            <Button onClick={logOutHandler}>
                                                <div className={styleIcon.icon}>
                                                    <LogoutIcon sx={{marginRight: '5px'}}/> log Out
                                                </div>
                                            </Button>
                                        </div>
                                    </Popover>
                                </>
                            }
                            <Button onClick={buttonClickHandler} disabled={!isLoggedIn}>
                                {!isLoggedIn
                                    ? <Avatar src={defaultAvatar}
                                              alt={'User Name'}
                                              sx={{width: 50, height: 50}}/>
                                    : <Avatar src={avatar ? avatar : defaultAvatar}
                                              alt={'User Name'}
                                              sx={{width: 50, height: 50}}/>
                                }
                            </Button>
                        </div>
                    </header>
                </div>
            </div>
        )
    }
)