import {useState, MouseEvent, memo} from 'react'
import {
    Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Input, InputLabel, InputAdornment,
    IconButton, Visibility, VisibilityOff, Button
} from 'collections-mui'
import {Navigate, NavLink} from 'react-router-dom'
import {useFormik} from 'formik'
import {login} from 'reducers/Auth-reducer'
import {useAppDispatch, useAppSelector, validate} from 'utils'
import f from 'common/Styles/Forms.module.css'
import s from './Login.module.css'
import {LoginType} from 'api/Auth-api'
import {selectAppStatus, selectAuthIsLoggedIn} from 'store/Selectors'
import {PATH} from 'constants/Routing-constants'
import styleForms from 'common/Styles/Forms.module.css'
import {useController, useForm} from "react-hook-form";
import {TextField} from "@mui/material";
import {ControlledCheckbox} from "../../../common/components/ControllledCheckBox";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledTextField} from "../../../common/components/ControlledTextField";


interface State {
    password: string;
    showPassword: boolean;

}


export const Login = memo(() => {
        const isLoggedIn = useAppSelector(selectAuthIsLoggedIn)
        const status = useAppSelector(selectAppStatus)
        const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/
        const schema = z.object({
            email: z.string().nonempty('Email is required').regex(emailRegex, 'Email not valid'),
            password: z.string().nonempty('Password is required').min(8, 'Password has to be at least 8 characters long')
        })
        type Form = z.infer<typeof schema>

    const dispatch = useAppDispatch()

        const [values, setValues] = useState<State>({
            password: '',
            showPassword: false,
        })
        const {control, handleSubmit, register, formState: {errors}} = useForm<Form & LoginType>({
            resolver:zodResolver(schema)
        })


        const {
            field: {value, onChange},
        } = useController({
            name: 'rememberMe',
            control,
            defaultValue: false,
        })

        const onSubmit = (data: LoginType) => {
            dispatch(login(data))
        }

        const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
        }


        if (isLoggedIn) {
            return <Navigate to={PATH.PROFILE}/>
        }

        return (
            <div className={f.block}>
                <div className={f.container}>
                    <div className={f.form}>
                        <h2 className={f.title}>Sign in</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>

                                    <ControlledTextField name={'email'} control={control} label={'Email'}/>



                                    <div style={{color: 'red'}}>{errors.email?.message}</div>
                                </FormControl>
                                <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>

                                    <ControlledTextField name={'password'} control={control} label={'Password'} isPassword={true}/>




                                    <div style={{color: 'red'}}>{errors.password?.message}</div>
                                </FormControl>
                                <FormControlLabel
                                    className={s.formControlLabel}
                                    label={'Remember me'}
                                    control={<Checkbox onChange={onChange} checked={value}/>}

                                />


                                <div className={s.forgotBlock}>
                                    <NavLink className={s.textForgot} to={PATH.RECOVERY_PASSWORD}>Forgot Password?</NavLink>
                                </div>
                                <div className={styleForms.buttonBlock}>
                                    <Button style={{width: '100%', borderRadius: '90px'}}
                                            type={'submit'}
                                            variant={'contained'}
                                            disabled={status === 'loading'}>
                                        Sign In
                                    </Button>
                                </div>
                                <FormLabel>
                                    <p className={f.text}>Already have an account?</p>
                                    <div className={f.navLinkBlock}>
                                        <NavLink className={f.navLink} to={PATH.REGISTRATION}>Sign up</NavLink>
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
