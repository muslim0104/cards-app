import {ChangeEvent, memo, useState} from 'react'
import s from './Profile.module.css'
import {AddAPhoto, Logout, BorderColor, Button, Icon, IconButton, Avatar, Badge, TextField} from 'collections-mui'
import {updateProfileTC} from 'reducers/Profile-reducer'
import {Navigate} from 'react-router-dom'
import {logOut} from 'reducers/Auth-reducer'
import {appActions} from 'reducers/App-reducer'
import {useAppDispatch, useAppSelector, convertFileToBase64} from 'utils'
import {BackToPackList} from 'common'
import f from 'common/Styles/Forms.module.css'
import defaultAvatar from 'assets/Icon/default-avatar.jpg'
import {selectAuthIsLoggedIn, selectProfileAvatar, selectProfileEmail, selectProfileName} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'


export const Profile = memo(() => {
        const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
        const email = useAppSelector(selectProfileEmail)
        const avatar = useAppSelector(selectProfileAvatar)
        const name = useAppSelector(selectProfileName)
        const [userName, setUserName] = useState<string>(name)
        const [editNameMod, setEditNameMod] = useState<boolean>(false)

        const dispatch = useAppDispatch()

        const logOutHandler = () => {
            dispatch(logOut())
        }

        const updateUserHandler = () => {
            dispatch(updateProfileTC({name:userName,avatar}))
            setEditNameMod(false)
        }

        const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
            setUserName(event.currentTarget.value)
        }

        const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
            if (e.target.files && e.target.files.length) {
                const file = e.target.files[0]
                if (file.size < 102400) {
                    convertFileToBase64(file, (file64: string) => {
                        dispatch(updateProfileTC({name:userName, avatar:file64}))
                    })
                } else {
                    dispatch(appActions.setAppError('File too large'))
                }
            }
        }

        if (!isLoggedIn) {
            return <Navigate to={PATH.LOGIN}/>
        }

        return (
            <div className={f.block}>
                <div className={`${f.container} ${s.container}`}>
                    <BackToPackList/>
                    <div className={`${f.form} ${s.form}`}>
                        <h2 className={f.title}>Personal information</h2>
                        <Badge className={s.profileBadge}
                               overlap='circular'
                               anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                               badgeContent={
                                   <label htmlFor='avatar'>
                                       <input type={'file'} id='avatar' style={{display: 'none'}}
                                              accept={'.jpg, .jpeg, .png, img'} multiple onChange={uploadHandler}
                                       />
                                       <IconButton component='span'>
                                           <Icon
                                               style={{
                                                   width: 35, height: 35, border: '1px solid white', borderRadius: 20,
                                                   backgroundColor: 'gray', display: 'flex', alignItems: 'center',
                                                   opacity: 0.7, cursor: 'pointer'
                                               }}>
                                               <AddAPhoto style={{color: 'white', width: '100%'}}/>
                                           </Icon>
                                       </IconButton>
                                   </label>
                               }
                        >
                            <Avatar alt={'avatar'} src={avatar === '' ? defaultAvatar : avatar}/>
                        </Badge>
                        {editNameMod
                            ?
                            <div className={s.profileSpan}>
                                <TextField value={userName}
                                           onChange={inputChangeHandler}
                                           variant='standard'
                                           autoFocus
                                           label='NickName'/>
                                <Button onClick={updateUserHandler}
                                        size='small'
                                        variant='contained'
                                        style={{width: 70, borderRadius: 20}}>
                                    Save
                                </Button>
                            </div>
                            :
                            <div onClick={() => setEditNameMod(true)} className={s.userName}>
                                {userName}
                                <BorderColor className={s.borderColor}/>
                            </div>
                        }
                        <div className={`${f.text} ${s.text}`}>{email}</div>
                        <div className={f.buttonBlock}>
                            <Button onClick={logOutHandler}
                                    variant='outlined'
                                    style={{width: '100%', borderRadius: 20}}
                                    startIcon={<Logout/>}>
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
)
