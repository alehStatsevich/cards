import React, {ButtonHTMLAttributes, DetailedHTMLProps, MouseEvent} from 'react';
import s from './Modal.module.css'

type DefaultModalPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type ModalPropsType = DefaultModalPropsType & {
    isOpen: boolean
    close: () => void
    children?: React.ReactNode
    title?: string
    modalBackGround?: 'pinkFulfilled' | 'greyTransparent'
    closeBtn?: boolean
}

const Modal: React.FC<ModalPropsType> = (
    {   close,
        isOpen,
        modalBackGround= 'greyTransparent',
        title,
        children,
        className,
        closeBtn,
        ...restProps// все остальные пропсы попадут в объект restProps, там же будет children

    }

) => {

    const defaultStyle = `${s.title__wrapper} ${!closeBtn ? s.center : null}`
    return (<>
            {isOpen &&
            <div className={`${s.wrapper} ${modalBackGround === 'pinkFulfilled' ? s.pink : ''}`} onClick={close}>
                <div className={s.form__block} onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
                    <div className={defaultStyle}>
                        <h4 className={s.title}>{title}</h4>
                        {closeBtn && <button className={s.button} onClick={close}>
                            <span className={s.button__line + ' ' + s.button__line_first}/>
                            <span className={s.button__line + ' ' + s.button__line_second}/>
                        </button>
                        }
                    </div>
                    {children}
                </div>
            </div>
            }
        </>
    );
};

export default Modal;
