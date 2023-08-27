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
import {useForm} from "react-hook-form";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledTextField} from "../../../common/components/ControlledTextField";


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
        const emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

    const [values, setValues] = useState<State>({
        password: '',
        showPassword: false,
        showConfirmPassword: false,
        confirmPassword: ''
    })
    const schema=z.object({
        email:z.string().nonempty('Email is required!').regex(emailRegex,'Email not valid'),
        password:z.string().nonempty('Password is required!').min(8,'Password has to be at least 8 characters long'),
        confirmPassword:z.string().nonempty('Is required')
    })
    type FormType=z.infer<typeof schema>



    const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }
     const {register,handleSubmit,formState:{errors},control}=useForm<FormType>({
         resolver:zodResolver(schema)
     })



    const onSubmit=(data:RegistrationType)=>{
        dispatch(registration(data))
    }

    if (isRegistered) {
        return <Navigate to={PATH.LOGIN}/>
    }

    return (
        <div className={f.block}>
            <div className={f.container}>
                <div className={f.form}>
                    <h2 className={f.title}>Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormGroup>
                            <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                               <ControlledTextField  name={'email'} control={control} label={'Email'}/>


                            </FormControl>
                            <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>


                                <ControlledTextField  name={'password'} control={control} label={'Password'} isPassword={true} />



                            </FormControl>
                            <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>

                                <ControlledTextField name={'confirmPassword'}  control={control} label={'Confirm password'} isPassword={true}/>



                            </FormControl>
                            {values.confirmPassword.length!==values.password.length ? <div>Пароли не сопадают</div> : null}
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