import React from 'react'
import s from '../restore_pw/RestorePassword.module.css'
import {EmailImg} from '../../../assets/img/password/email_svg'

type TProps = {
    restorationEmail: string
}

export const CheckEmail: React.FC<TProps> = ({restorationEmail}) => {
    return (
        <div className={s.container}>
            <div className={s.restoreContainer}>
                <div className={s.header}>
                    <h2>Mr.Developer</h2>
                    <EmailImg/>
                    <h3>Check Email</h3>
                </div>
                <span className={s.instructions}>
                        We’ve sent an Email with instructions to <b>{restorationEmail}</b>
                    </span>
            </div>
        </div>
    )
}