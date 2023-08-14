import s from './Check-email.module.css'
import envelope from 'assets/Icon/envelope.jpg'
import {useNavigate} from 'react-router-dom'
import {useAppSelector} from 'utils'
import f from 'common/Styles/Forms.module.css'
import {selectAppStatus, selectAuthRecoveryPassword} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'
import {Button} from 'collections-mui'
import {memo} from 'react'


export const CheckEmail = memo (() => {
    const recoveryPassword = useAppSelector(selectAuthRecoveryPassword)
    const status = useAppSelector(selectAppStatus)

    const navigate = useNavigate()

    const onClickButtonHandler = () => {
        navigate(PATH.LOGIN)
    }

    return (
        <div className={f.block}>
            <div className={f.container}>
                <div className={f.form}>
                    <h2 className={f.title}>Check Email</h2>
                    <div className={s.icon}>
                        <img src={envelope} alt='envelope' className={s.img}/>
                    </div>
                    <div className={f.text}>
                        <p>We’ve sent an Email with instructions to </p>
                        <p style={{color: 'red'}}>{recoveryPassword}</p>
                    </div>
                    <div className={f.buttonBlock}>
                        <Button onClick={onClickButtonHandler}
                                style={{width: '100%', borderRadius: '90px'}}
                                type={'submit'}
                                variant={'contained'}
                                disabled={status === 'loading'}>
                            Back to login
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
)