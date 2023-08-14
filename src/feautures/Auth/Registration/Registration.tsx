import {useState, MouseEvent, memo} from 'react'
import {
    FormControl, FormGroup, FormLabel, Input, InputLabel, InputAdornment, IconButton, Visibility,
    VisibilityOff, Button
} from 'collections-mui'
import {useFormik} from 'formik'
import {Navigate, NavLink} from 'react-router-dom'
import {registration} from 'reducers/Auth-reducer'
import {useAppDispatch, useAppSelector, validate} from 'utils'
import f from 'common/Styles/Forms.module.css'
import {RegistrationType} from 'api/Auth-api'
import {selectAppStatus, selectAuthIsRegistered} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'
import styleForms from 'common/Styles/Forms.module.css'


interface State {
    password: string;
    showPassword: boolean;
    showConfirmPassword: boolean;
    confirmPassword: string
}


export const Registration = memo (() => {
    const isRegistered = useAppSelector(selectAuthIsRegistered)
    const status = useAppSelector(selectAppStatus)

    const dispatch = useAppDispatch()

    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
        showConfirmPassword: false,
        confirmPassword: ''
    })

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    }
    const handleClickShowConfirmPassword = () => {
        setValues({...values, showConfirmPassword: !values.showConfirmPassword});
    }
    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate: validate,
        onSubmit: (values: RegistrationType) => {
            dispatch(registration(values))
            formik.resetForm()
        },
    })

    if (isRegistered) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={f.block}>
            <div className={f.container}>
                <div className={f.form}>
                    <h2 className={f.title}>Sign Up</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <FormGroup>
                            <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                                <InputLabel style={{paddingLeft: '6px'}}>Email</InputLabel>
                                <Input
                                    {...formik.getFieldProps('email')}
                                />
                                {formik.touched.email && formik.errors.email ?
                                    <div style={{color: 'red'}}>{formik.errors.email}</div> : null}
                            </FormControl>
                            <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                                <InputLabel style={{paddingLeft: '6px'}}>Password</InputLabel>
                                <Input
                                    type={values.showPassword ? 'text' : 'password'}
                                    {...formik.getFieldProps('password')}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {formik.touched.password && formik.errors.password ?
                                    <div style={{color: 'red'}}>{formik.errors.password}</div> : null}
                            </FormControl>
                            <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                                <InputLabel style={{paddingLeft: '6px'}}>Confirm password</InputLabel>
                                <Input
                                    type={values.showConfirmPassword ? 'text' : 'password'}
                                    {...formik.getFieldProps('confirmPassword')}
                                    endAdornment={
                                        <InputAdornment position='end'>
                                            <IconButton
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                            >
                                                {values.showConfirmPassword ? <Visibility/> : <VisibilityOff/>}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ?
                                    <div style={{color: 'red'}}>{formik.errors.confirmPassword}</div> : null}
                            </FormControl>
                            <div className={styleForms.buttonBlock}>
                                <Button style={{width: '100%', borderRadius: '90px'}}
                                        type={'submit'}
                                        variant={'contained'}
                                        disabled={status === 'loading'}>
                                    Sing Up
                                </Button>
                            </div>
                            <FormLabel>
                                <p className={f.text}>Already have an account?</p>
                                <div className={f.navLinkBlock}>
                                    <NavLink className={f.navLink} to={PATH.LOGIN}>Sign In</NavLink>
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