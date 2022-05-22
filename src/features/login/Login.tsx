import React from 'react'
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Grid,
    TextField
} from "@material-ui/core";
import {useFormik} from "formik";

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = () => {

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {

            const errors: FormikErrorType = {};

            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (!values.password) {
                errors.password = 'Password required!!!';
            } else if (values.password.length < 3) {
                errors.password = 'Password should be more 3 symbols!!!';
            }

            return errors;
        },
        onSubmit: values => {
            alert(JSON.stringify(values));
            formik.resetForm()
        },
    })


    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>

                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <form onSubmit={formik.handleSubmit}>
                    <FormGroup>

                        <TextField

                            label="Email"
                            margin="normal"
                            {...formik.getFieldProps('email')}
                            // name= "email"
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            // onBlur={formik.handleBlur}
                        />
                        {formik.touched.email &&
                            formik.errors.email &&
                            <div style={{color: "red"}}>{formik.errors.email}</div>
                        }
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"
                            {...formik.getFieldProps('password')}
                            // name= "password"
                            // onChange={formik.handleChange}
                            // value={formik.values.password}
                            // onBlur={formik.handleBlur}
                        />
                        {formik.touched.password &&
                            formik.errors.password &&
                            <div style={{color: "red"}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={
                                <Checkbox
                                    {...formik.getFieldProps('rememberMe')}
                                    // name= "rememberMe"
                                    // onChange={formik.handleChange}
                                    // checked={formik.values.rememberMe}
                                    // onBlur={formik.handleBlur}
                                />
                            }/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
            </form>
        </FormControl>


    </Grid>
</Grid>
}
