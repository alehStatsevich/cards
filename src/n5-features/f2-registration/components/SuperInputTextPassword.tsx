import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, KeyboardEvent, useState} from 'react'
import s from './SuperInputTextEmail.module.css'
// import eye from "../../../../../../friday/src/img/eye.svg";
// import eyeOff from "../../../../../../friday/src/img/eyeOff.svg";


// тип пропсов обычного инпута
type DefaultInputPropsType = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

// здесь мы говорим что у нашего инпута будут такие же пропсы как у обычного инпута
// (чтоб не писать value: string, onChange: ...; они уже все описаны в DefaultInputPropsType)
type SuperInputTextPropsType = DefaultInputPropsType & { // и + ещё пропсы которых нет в стандартном инпуте
    onChangeText?: (value: string) => void
    onEnter?: () => void
    error?: string
    form: {
        touched: {
            email: string
            password: string
            massage: string
        }
        errors: {
            email: string
            password: string
            massage: string
        }
    }
        field: any
    /**
     * class name to stylize error message
     */
    spanClassName?: string
}



const SuperInputTextEmail: React.FC<SuperInputTextPropsType> = (
    {
        type, // достаём и игнорируем чтоб нельзя было задать другой тип инпута
        onChange, onChangeText,
        onKeyPress, onEnter,
        error,
        className, spanClassName,
        field, form: {touched, errors},
        ...restProps// все остальные пропсы попадут в объект restProps
    }
) => {
    const [show, setShow] = useState(false)

    const handleShowPassword = () => {setShow(!show)}
    const onChangeCallback = (e: ChangeEvent<HTMLInputElement>) => {
        onChange // если есть пропс onChange
        && onChange(e) // то передать ему е (поскольку onChange не обязателен)

        onChangeText && onChangeText(e.currentTarget.value)
    }
    const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>) => {
        onKeyPress && onKeyPress(e)

        onEnter // если есть пропс onEnter
        && e.key === 'Enter' // и если нажата кнопка Enter
        && onEnter() // то вызвать его
    }

    const finalSpanClassName = `${error ? s.error : ''} ${spanClassName ? spanClassName : ''}`
    const finalInputClassName = `${s.superInput} ${error ? s.errorInput : ''} ${className}` // need to fix with (?:) and s.superInput

    return (
        <div className={s.block}>
            <span className={s.placeholder}>Password</span>
            <input
                type={show ? 'text' : 'password'}
                onChange={onChangeCallback}
                onKeyPress={onKeyPressCallback}
                className={finalInputClassName}
                {...field} {...touched} {...errors}
                {...restProps} // отдаём инпуту остальные пропсы если они есть (value например там внутри)
            />
            {/*<img className={s.eye} src={show ? eye : eyeOff} alt="eye" onClick={handleShowPassword}/>*/}
            {error && <span className={finalSpanClassName}>{error}</span>}
        </div>
    )
}

export default SuperInputTextEmail
