import React, {HTMLAttributes} from 'react'
import s from './MessageError.module.css'

type RegisterType = {
    register?: boolean
}
type DefaultPropsType = HTMLAttributes<HTMLDivElement> & RegisterType

const ErrorMessage: React.FC<DefaultPropsType> =
    React.memo(({

                    className,
        register,
                    ...restProps// все остальные пропсы попадут в объект restProps, там же будет children
                }) => {

        const finalClassName = `${className ? className : ''} ${register ? s.register : s.box__message } `;
        return <div className={finalClassName} {...restProps}/>
    })

export default ErrorMessage