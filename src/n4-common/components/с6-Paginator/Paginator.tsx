import React, {useState} from 'react'
import s from './Paginator.module.css'


type TPaginatorProps = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    portionSize?: number
    disabled?: boolean
    onPageNumberClick: (pageNumber: number) => void
}

export function Paginator(props: TPaginatorProps) {
    const {totalItemsCount, pageSize, currentPage, onPageNumberClick, portionSize = 5, disabled = false} = props
    const [portionNumber, setPortionNumber] = useState(1)

    const pagesCount = Math.ceil(totalItemsCount / pageSize)
    let pages: number[] = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    const portionCount = Math.ceil(pagesCount / portionSize)
    const leftPortionNumber = (portionNumber - 1) * portionSize
    const rightPortionNumber = portionNumber * portionSize

    const onSpanClick = (p: number) => {
        if (!disabled) onPageNumberClick(p)
    }

    return (
        <div className={s.paginator}>
            <button onClick={() => setPortionNumber(portionNumber - 1)}
                    disabled={!(portionNumber - 1)}
                    className={s.btn}>
            </button>
            <div className={s.paginatorNumbers}>
                {!(portionNumber - 1) || <span className={s.page} onClick={() => setPortionNumber(1)}>1 ...</span>}
                {pages.filter(p => p > leftPortionNumber && p <= rightPortionNumber)
                    .map(p => <span key={p}
                                    className={currentPage === p ? s.page + ' ' + s.currentPage : s.page}
                                    onClick={() => onSpanClick(p)}
                    >{p}</span>)}
                {portionNumber >= portionCount || <span className={`${s.page} ${s.lastPage}`}
                                                        onClick={() => setPortionNumber(portionCount)}>... {pagesCount}</span>}
            </div>
            <button onClick={() => setPortionNumber(portionNumber + 1)}
                    disabled={portionNumber >= portionCount}
                    className={s.btn}>
            </button>
        </div>
    )
}