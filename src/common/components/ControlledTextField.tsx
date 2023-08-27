import React, {useState} from 'react';
import {FieldValues, useController, UseControllerProps} from "react-hook-form";
import {IconButton, InputAdornment, TextField, TextFieldProps} from "@mui/material";
import useFormControl from "@mui/material/FormControl/useFormControl";
import {boolean} from "zod";
import {Visibility, VisibilityOff} from "@mui/icons-material";




type Props<T extends  FieldValues>= Omit<UseControllerProps<T>, 'rules'
    | 'defaultValues'> & Omit<TextFieldProps, 'onChange' | 'value'> & Prop

type Prop ={
    isPassword?:boolean
}
export  const ControlledTextField = <T extends FieldValues>({ name, control, label, isPassword, ...restProps }: Props<T>) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name: name,
        control,
    });

    return (
        <>
            {!isPassword ? (
                <TextField value={value} onChange={onChange} label={label} {...restProps} />
            ) : (
                <TextField
                    value={value}
                    onChange={onChange}
                    label={label}
                    {...restProps}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleTogglePassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            )}

            <div style={{ color: 'red' }}>{error?.message}</div>
        </>
    );
};
