import {Button, FormControl, FormGroup, FormLabel, Input, InputLabel} from 'collections-mui'
import {useFormik} from 'formik'
import {Navigate, NavLink} from 'react-router-dom'
import {recoveryPassword} from 'reducers/Auth-reducer'
import {useAppDispatch, useAppSelector, validate} from 'utils'
import f from 'common/Styles/Forms.module.css'
import {selectAppStatus, selectAuthIsLoggedIn, selectAuthRecoveryPassword} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'
import styleForms from 'common/Styles/Forms.module.css'
import {memo} from 'react'


export const RecoveryPassword = memo (() => {
    const status = useAppSelector(selectAppStatus)
    const recoveryPasswordAuth = useAppSelector(selectAuthRecoveryPassword)
    const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validate: validate,
        onSubmit: values => {
            if (values.email) {
                dispatch(recoveryPassword(values.email))
            }
        },
    })

    if (recoveryPasswordAuth) {
        return <Navigate to={PATH.CHECK_EMAIL}/>
    }

    if (isLoggedIn) {
        return <Navigate to={PATH.PROFILE}/>
    }

    return (
        <div className={f.block}>
            <div className={f.container}>
                <div className={f.form}>
                    <h2 className={f.title}>Forgot your password?</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <FormControl sx={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                                <InputLabel style={{paddingLeft: '6px'}}>Email</InputLabel>
                                <Input
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ?
                                    <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            </FormControl>
                            <FormLabel>
                                <p className={f.text}>Enter your email address and we will send
                                    you further instructions </p>
                            </FormLabel>
                            <div className={styleForms.buttonBlock}>
                                <Button style={{width: '100%', borderRadius: '90px'}}
                                        type={'submit'}
                                        variant={'contained'}
                                        disabled={status === 'loading'}>
                                    Send Instructions
                                </Button>
                            </div>
                            <FormLabel>
                                <p className={f.text}>Did you remember your password?</p>
                                <div className={f.navLinkBlock}>
                                    <NavLink className={f.navLink} to={PATH.LOGIN}>Try logging in</NavLink>
                                </div>
                            </FormLabel>
                        </FormGroup>
                    </form>
                </div>
            </div>
        </div>
    )
}
)
