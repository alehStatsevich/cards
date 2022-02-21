import React from 'react'
import s from '../ItemsTable.module.css'
import {Rating} from '../../../../n4-common/components/c4-Rating/Rating'
import SuperButton from '../../../../n4-common/components/Elements/e1-SuperButton/SuperButton'
import {TCardUpdateData} from '../../../../n3-api/cards_api'

type TCardProps = {
    cardId: string
    question: string
    shownDeleteModal: (shownDeleteModal: boolean) => void
    shownUpdateModal: (shownUpdateModal: boolean) => void
    setCardId: (activeCardId: string) => void
    answer: string
    setQuestion: (question: string) => void
    setAnswer: (answer: string) => void
    updatedAt: string
    grade: number
    isUsersPack: boolean
    isFetching: boolean
}

export const Card: React.FC<TCardProps> = (props) => {
    const {
        answer, cardId,
        question, updatedAt,
        grade, isUsersPack,
        isFetching, shownDeleteModal,shownUpdateModal,
        setCardId,
        setQuestion,
        setAnswer
    } = props

    // hardcode data for edit card testing
    const editedCard: TCardUpdateData = {
        _id: cardId,
        question: 'Card is successfully updated? :)',
        answer: 'yeahs! The card is! |=^_^=|',
        grade: 2
    }

    const deleteCard = () => {
        shownDeleteModal(true)
        setCardId(cardId)
    }

    const updateCard = () => {
        setQuestion(question)
        setAnswer(answer)
        shownUpdateModal(true)
        setCardId(cardId)
    }

    return (
        <div className={s.card}>
            <div className={s.qaSections}>{question}</div>
            <div className={s.qaSections}>{answer}</div>
            <div className={`${s.cardInfo} ${isUsersPack && s.cardInfoWithActions}`}>
                <div>{updatedAt.slice(0, 16)}</div>
                <Rating rating={grade}/>
                {isUsersPack && <div>
                    <SuperButton className={s.actionsBtn} disabled={isFetching}
                                 onClick={updateCard}>Edit</SuperButton>
                    <SuperButton className={s.actionsBtn} disabled={isFetching} red
                                 onClick={deleteCard}>Delete</SuperButton>
                </div>}
            </div>
        </div>
    )
}



