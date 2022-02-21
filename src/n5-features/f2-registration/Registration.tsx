import React from 'react'
import registration from './Registration.module.css'
import {TAppState} from '../../n2-bll/store'
import {registrationThunk} from './registration_reducer'
import {useDispatch, useSelector} from 'react-redux'
import {Field, Form, Formik} from 'formik'
import SuperInputTextEmail from './components/SuperInputTextEmail'
import SuperInputTextPassword from './components/SuperInputTextPassword'
import SuperButton from '../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {Redirect} from "react-router-dom";
import {PATH} from "../../n1-app/a2-routes/Routes";
import ErrorMessage from "../../n4-common/components/с3-ErrorMessage/ErrorMessage";
import {Preloader} from '../../n4-common/components/c2-Preloader/Preloader'

type FormikErrorType = {
    email?: string
    password1?: string
    password2?: string

}

const Registration = React.memo(() => {

    const error = useSelector<TAppState>(state => state.registration.error)
    const isRegistrationFetching = useSelector<TAppState>(state => state.registration.isFetching)
    const isFetching = useSelector<TAppState, boolean>(state => state.app.isFetching)

    const dispatch = useDispatch()


    if (isRegistrationFetching) {
        return <Redirect to={PATH.LOGIN}/>
    }


    return (
        <div className={registration.container}>
            {isFetching && <Preloader left={'40%'} top={'40%'} size={'100px'}/>}
            <div className={registration.block}>
                <div className={registration.text}>
                    <h2 className={registration.title}>It-incubator</h2>
                    <h3>Sign Up</h3>
                </div>
                <div className={registration.form}>
                    <Formik
                        initialValues={
                            {
                                email: '',
                                password1: '',
                                password2: '',
                                error: ''
                            }
                        }
                        validate={(values) => {
                            const errors: FormikErrorType = {}
                            if (!values.email) {
                                errors.email = 'email is required'
                            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                                errors.email = 'Invalid email address'
                            }
                            if (!values.password1 ) {
                                errors.password1 = 'password is Required'
                            }else if (values.password1.length < 7) {
                                errors.password1 = 'password must be more than 7 character'
                            } else if (!values.password2 ) {
                                errors.password2 = 'password is Required'
                            } else if (values.password1 !== values.password2) {
                                errors.password2 = 'password mismatch'
                            }
                            return errors
                        }}

                        onSubmit={(values, {setSubmitting}) => {
                            if (values.email !== '' && values.password1 !== '' && values.password2 !== '') {
                                if (values.password1 === values.password2) {
                                    dispatch(registrationThunk(values.email, values.password1));
                                    setTimeout( () => {
                                        setSubmitting(false)}, 500)
                                }
                            }

                        }}>
                        {({isSubmitting, errors, touched}) => (

                            <Form noValidate>

                                <div className={registration.inputs}>
                                    <div>
                                        <Field name="email"
                                               error={error}
                                               component={SuperInputTextEmail}
                                        />
                                        {touched.email && errors.email ?
                                            <ErrorMessage register={true}>{errors.email}</ErrorMessage> : null}
                                    </div>
                                    <div>
                                        <Field name="password1"
                                               component={SuperInputTextPassword}
                                               error={error}
                                        />
                                        {touched.password1 && errors.password1 ?
                                            <ErrorMessage register={true}>{errors.password1}</ErrorMessage> : null}
                                    </div>
                                    <div>
                                        <Field name="password2"
                                               component={SuperInputTextPassword}
                                               error={error}
                                        />
                                        {touched.password2 && errors.password2 ?
                                            <ErrorMessage register={true}>{errors.password2}</ErrorMessage> : null}
                                    </div>
                                </div>
                                <div className={registration.buttons}>
                                    <SuperButton type={'reset'} registrationCancel={true} disabled={isSubmitting}>
                                        <span className={registration.cancel}>Cancel</span>
                                    </SuperButton>
                                    <SuperButton type={'submit'} registrationRegister={true} disabled={isSubmitting}>
                                        <span className={registration.register}>Register</span>
                                    </SuperButton>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    )
})

export default Registration