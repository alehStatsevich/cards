import {TCardType} from '../cards_reducer'
import React from 'react'
import s from './ItemsTable.module.css'
import {SortArrow} from '../../../n4-common/components/c8-SortArrow/SortArrow'
import {Card} from './Card/Card'

type TItemsTableProps = {
    items: TCardType[]
    isUsersPack: boolean
    isFetching: boolean
    sortCallback: (param: string) => void
    shownDeleteModal: (shownDeleteModal: boolean) => void
    shownUpdateModal: (shownDeleteModal: boolean) => void
    setCardId: (activeCardId: string) => void
    setQuestion: (question: string) => void
    setAnswer: (answer: string) => void

}

export const ItemsTable: React.FC<TItemsTableProps> = (props) => {
    const {items, isUsersPack,
        isFetching, sortCallback,
        shownDeleteModal, shownUpdateModal,
        setCardId,setQuestion,setAnswer } = props

    return (
        <div className={s.table}>
            <div className={s.card}>
                <div>Question</div>
                <div>Answer</div>
                <div className={`${s.cardInfo} ${isUsersPack && s.cardInfoWithActions}`}>
                    <div>
                        <span>Last Updated</span>
                        <SortArrow onClick={sortCallback} sortValue={'updated'} isFetching={isFetching}/>
                    </div>
                    <div className={s.gradeTitle}>
                        <span>Grade</span>
                        <SortArrow onClick={sortCallback} sortValue={'grade'} isFetching={isFetching}/>
                    </div>
                    {isUsersPack && <div className={s.gradeTitle}>Actions</div>}
                </div>
            </div>
            {items.map(item => <Card
                                     shownDeleteModal={shownDeleteModal}
                                     shownUpdateModal={shownUpdateModal}
                                     setCardId={setCardId}
                                     key={item._id}
                                     cardId={item._id}
                                     question={item.question}
                                     answer={item.answer}
                                     grade={item.grade}
                                     updatedAt={item.updated}
                                     isUsersPack={isUsersPack}
                                     isFetching={isFetching}
                                     setQuestion={setQuestion}
                                     setAnswer={setAnswer}
             />)}

        </div>
    )
}