import {memo, MouseEvent, useState} from 'react'
import {Button, FormControl, FormGroup} from 'collections-mui'
import {useNavigate, useParams} from 'react-router-dom'

import {useAppDispatch, useAppSelector} from 'utils'
import f from 'common/Styles/Forms.module.css'
import styleForms from 'common/Styles/Forms.module.css'
import {NewPasswordType} from 'api/Auth-api'
import {PATH} from 'constants/Routing-constants'
import {selectAppStatus} from 'store/Selectors'
import {setNewPassWord} from "../../../reducers/Auth-reducer";
import {useForm} from "react-hook-form";

import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {ControlledTextField} from "../../../common/components/ControlledTextField";


interface State {
    password: string;
    showPassword: boolean
}


export const NewPassword = memo(() => {
        type FormType = z.infer<typeof schema>

        const schema = z.object({
            password: z.string().nonempty('Required').min(8, 'Password has to be at least 8 characters long'),
            resetPasswordToken: z.string()
        })
        const {token} = useParams<{ token: string }>()
        const {register, formState: {errors}, handleSubmit, control} = useForm<FormType>({
            resolver: zodResolver(schema)
        })

        const status = useAppSelector(selectAppStatus)


        const dispatch = useAppDispatch()
        const navigate = useNavigate()

        const [values, setValues] = useState<State>({
            password: '',
            showPassword: false
        })

        const handleClickShowNewPassword = () => {
            setValues({...values, showPassword: !values.showPassword})
        }

        const handleMouseDownNewPassword = (event: MouseEvent<HTMLButtonElement>) => {
            event.preventDefault()
        }

        // const formik = useFormik({
        //     initialValues: {
        //         password: '',
        //         resetPasswordToken: ''
        //     },
        //     validate: validate,
        //     onSubmit: (values: NewPasswordType) => {
        //         dispatch(setNewPassWord({password:values.password, token:token || ''}))
        //         navigate(PATH.LOGIN)
        //     },
        // })
        //
        const onSubmit = (data: NewPasswordType) => {
            dispatch(setNewPassWord({password: data.password, token: token || ''}))
            navigate(PATH.LOGIN)
        }


        return (
            <div className={f.block}>
                <div className={f.container}>
                    <div className={f.form}>
                        <h2 className={f.title}>Create new password</h2>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormGroup>
                                <FormControl style={{padding: '0% 5% 5% 5%'}} variant='outlined'>
                                    <ControlledTextField name={'password'} label={'Password'} control={control}/>


                                    {/*<Input*/}
                                    {/*    type={values.showPassword ? 'text' : 'password'}*/}
                                    {/*    {...register('password',{*/}
                                    {/*        required:'Password is required!',*/}
                                    {/*        minLength: {value: 3, message: 'Password has to be at least 3 characters long'}*/}
                                    {/*    })}*/}
                                    {/*    endAdornment={*/}
                                    {/*        <InputAdornment position='end'>*/}
                                    {/*            <IconButton*/}
                                    {/*                onClick={handleClickShowNewPassword}*/}
                                    {/*                onMouseDown={handleMouseDownNewPassword}*/}
                                    {/*            >*/}
                                    {/*                {values.showPassword ? <Visibility/> : <VisibilityOff/>}*/}
                                    {/*            </IconButton>*/}
                                    {/*        </InputAdornment>*/}
                                    {/*    }*/}
                                    {/*/>*/}


                                </FormControl>
                                <div className={f.text}>Create new password and we will
                                    send you further instructions to email
                                </div>
                                <div className={styleForms.buttonBlock}>
                                    <Button style={{width: '100%', borderRadius: '90px'}}
                                            type={'submit'}
                                            variant={'contained'}
                                            disabled={status === 'loading'}>
                                        Create new password
                                    </Button>
                                </div>
                            </FormGroup>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
)