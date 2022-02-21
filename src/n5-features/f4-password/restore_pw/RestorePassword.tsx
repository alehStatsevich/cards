import React from 'react'
import SuperInputText from '../../../n4-common/components/Elements/e3-SuperInputText/SuperInputText'
import SuperButton from '../../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {NavLink} from 'react-router-dom'
import {PATH} from '../../../n1-app/a2-routes/Routes'
import s from './RestorePassword.module.css'
import {FormikErrors, useFormik} from 'formik'
import {useDispatch, useSelector} from 'react-redux'
import {restorePassword} from '../password_reducer'
import {selectIsRestoreSuccess, selectRestorationEmail} from '../../../n2-bll/selectors/password_selectors'
import {CheckEmail} from '../check-email/CheckEmail'
import {Preloader} from '../../../n4-common/components/c2-Preloader/Preloader'
import {selectIsFetching} from '../../../n2-bll/selectors/app_selectors'
import ErrorMessage from '../../../n4-common/components/с3-ErrorMessage/ErrorMessage'


export const RestorePassword = () => {
    const dispatch = useDispatch()
    const isRestoreSuccess = useSelector(selectIsRestoreSuccess)
    const isFetching = useSelector(selectIsFetching)
    const restorationEmail = useSelector(selectRestorationEmail)

    //* =========================================================================== Formik validate =================>>
    type TFormikErrors = {
        email?: string
    }
    const validate = (values: TFormikValues) => {
        const errors: FormikErrors<TFormikErrors> = {}

        if (!values.email) {
            errors.email = 'This field is required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }

        return errors
    }
//* =========================================================================== Formik =============================>>
    type TFormikValues = {
        email: string
    }
    const formik = useFormik<TFormikValues>({
        initialValues: {
            email: '',
        },
        validate,
        onSubmit: values => {
            console.log(values)
            dispatch(restorePassword(values.email))
        }
    })

    // if request for restore successful then show chek your email page
    if (isRestoreSuccess) return <CheckEmail restorationEmail = {restorationEmail}/>

    return (
        <div className={s.container}>
            <div className={s.restoreContainer}>
                {isFetching && <Preloader left={'40%'} top={'40%'} size={'100px'}/>}
                <div className={s.header}>
                    <h2>It-incubator</h2>
                    <h3>Forgot your password?</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className={s.inputBlock}>
                        <SuperInputText placeholder={'Email'}
                                       style={{width: '80%', opacity: '0.7'}}
                                       {...formik.getFieldProps('email')}/>
                        {formik.touched.email && formik.errors.email ?
                            <ErrorMessage style={{top: '50px'}}>{formik.errors.email}</ErrorMessage> : null}
                    </div>
                    <span className={s.instructions}>
                        Enter your email address and we will sent you further instructions
                    </span>
                    <SuperButton style={{width: '65%', marginTop: '80px'}} type={'submit'} disabled={isFetching}>
                        Send instructions
                    </SuperButton>
                </form>
                <div>
                    <p className={s.instructions} style={{marginTop: '25px'}}>
                        Did you remember your password?
                    </p>
                    <NavLink to={PATH.LOGIN}>Try logging in</NavLink>
                </div>
            </div>
        </div>
    )
}