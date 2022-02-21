import React, {useEffect, useState} from 'react'
import {NavLink, Redirect} from 'react-router-dom'
import style from './Login.module.css'
import {PATH} from '../../n1-app/a2-routes/Routes'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {useFormik} from 'formik'
import SuperCheckbox from '../../n4-common/components/Elements/e2-SuperCheckboxe/SuperCheckbox'
import {loginThunk} from './login_reducer'
import {useDispatch, useSelector} from 'react-redux'
import {TAppState} from '../../n2-bll/store'
import ErrorMessage from '../../n4-common/components/с3-ErrorMessage/ErrorMessage'
// import eye from '../../../../../friday/src/img/eye.svg'
// import eyeOff from '../../../../../friday/src/img/eyeOff.svg'
import {setIsFetchingRegisterAction} from "../f2-registration/registration_reducer";
import {_setIsSetNewPasswordSuccess} from '../f4-password/password_reducer';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}

export const Login = React.memo(() => {
    const [show, setShow] = useState(false)
    const isAuth = useSelector<TAppState>(state => state.login.isAuth)
    const isFetching = useSelector<TAppState>(state => state.app.isFetching)
    const dispatch = useDispatch()

useEffect( () => {
    dispatch(setIsFetchingRegisterAction(false))
    dispatch(_setIsSetNewPasswordSuccess(false))
}, [dispatch])

    const formik = useFormik({
        initialValues: {
            email: 'tsfoe@mail.ru',
            password: 'Fp666777',
            rememberMe: false,
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'email is required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'password is Required'
            } else if (values.password.length < 7) {
                errors.password = 'password must be more than 7 character'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(loginThunk(values))
            formik.resetForm()
        },
    })

    const handleShowPassword = () => {
        setShow(!show)
    }

    // if isAuth true redirect to profile page
    if (isAuth) {
        return <Redirect to={PATH.PROFILE}/>
    }

    return (
        <div className={style.container}>
            <div className={style.form__block}>
                <h3 className={style.from__block_title}>It-incubator</h3>
                <p className={style.form__block_text}>Sign In</p>
                <div className={style.form__block_content}>
                    <form
                        noValidate
                        onSubmit={formik.handleSubmit}
                        className={style.form__style}
                    >
                        <label>Email</label>
                        <div className={style.form__style_input_box}
                             style={{width: '100%', position: 'relative', textAlign: 'center'}}>
                            <input
                                autoComplete="email"
                                className={style.form__style_input}
                                type="email"
                                {...formik.getFieldProps('email')}
                            />

                            {formik.touched.email && formik.errors.email ?
                                <ErrorMessage>{formik.errors.email}</ErrorMessage> : null}
                        </div>
                        <label>Password</label>
                        <div className={style.form__style_input_box}
                             style={{width: '100%', position: 'relative', textAlign: 'center'}}>
                            <input
                                autoComplete="current-password"
                                type={!show ? 'password' : 'text'}
                                placeholder="*********"
                                className={style.form__style_input}
                                {...formik.getFieldProps('password')}
                            />
                            {/*<img className={style.input__eye} src={show ? eye : eyeOff} alt="eye"*/}
                            {/*     onClick={handleShowPassword}/>*/}
                            {formik.touched.password && formik.errors.password ?
                                <ErrorMessage>{formik.errors.password}</ErrorMessage> : null}

                        </div>
                        <SuperCheckbox
                            {...formik.getFieldProps('rememberMe')}
                        >Remember me
                        </SuperCheckbox>
                        <div className={style.button__group}>
                            <NavLink to={PATH.RESTORE_PASSWORD} className={`${style.form__link} ${style.forgot}`}>Forgot
                                Password?</NavLink>
                            <SuperButton className={style.btn} type="submit" name="form_login_submit"
                                         disabled={!!isFetching}>Login</SuperButton>
                            <p className={style.form__text}>Don’t have an account?</p>
                            <NavLink to={PATH.REGISTRATION} className={`${style.form__link} ${style.signUp}`}>Sign
                                Up</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
})