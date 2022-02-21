import React, {useState} from 'react'
import s from './SortArrow.module.css'

type TSortArrowProps = {
    sortValue: any
    isFetching: boolean
    onClick: (payload?: any) => void
}

export const SortArrow: React.FC<TSortArrowProps> = ({sortValue, onClick, isFetching}) => {
    const [arrowDirection, setArrowDirection] = useState(1)

    const onClickHandler = () => {
        if(!isFetching) {
            arrowDirection === 0 ? setArrowDirection(1) : setArrowDirection(0)
            onClick(`${arrowDirection}${sortValue}`)
        }
    }

    return (
        <>
            {arrowDirection === 0 ?
                <span className={s.ratingArrow} onClick={onClickHandler}>
                                        &uArr;</span> :
                <span className={s.ratingArrow} onClick={onClickHandler}>
                                        &dArr;</span>}
        </>

    )
}