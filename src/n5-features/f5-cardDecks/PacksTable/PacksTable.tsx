import {Pack} from '../../../n3-api/card-decks_api'
import React from 'react'
import s from './PacksTable.module.css'
import {SortArrow} from '../../../n4-common/components/c8-SortArrow/SortArrow'
import PackItem from './PackItem/PackItem'

type TPacksTableProps = {
    isFetching: boolean
    decks: Pack[]
    sortCallback: (param: string) => void
}
export const PacksTable: React.FC<TPacksTableProps> = ({isFetching, decks, sortCallback}) => {
    return (
        <div className={s.table}>
            <div className={s.table__header}>
                <div className={s.table__item}>
                    Name
                    <SortArrow sortValue={'name'} onClick={sortCallback} isFetching={isFetching}/>
                </div>
                <div className={s.table__item}>
                    Cards
                    <SortArrow sortValue={'cardsCount'} onClick={sortCallback} isFetching={isFetching}/>
                </div>
                <div className={s.table__item}>
                    <div className={s.table__item_wrapper}>
                        Last Updated
                        <SortArrow sortValue={'updated'} onClick={sortCallback} isFetching={isFetching}/>
                    </div>

                </div>
                <div className={s.table__item}>
                    Created by
                    <SortArrow sortValue={'user_name'} onClick={sortCallback} isFetching={isFetching}/>
                </div>
                <div className={s.table__item}>
                    Actions
                </div>
            </div>
            {decks.map((item, i) =>
                <PackItem key={i} name={item.name}
                          cardsCount={item.cardsCount}
                          updated={item.updated}
                          user_name={item.user_name}
                          id={item._id}
                          userId={item.user_id}
                />)}
        </div>
    )
}