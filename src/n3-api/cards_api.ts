import {instance} from './api'
import {TCardType} from '../n5-features/f6-cards/cards_reducer'


export const cardsAPI = {
    getCards(cardsParams: TGetCardParams) {
        return instance.get<TGetCardsResponseData>('cards/card', {params: {...cardsParams}}).then(res => res.data)
    },
    createCard(cardData: TCardData) {
        return instance.post('cards/card', {card: {...cardData}}).then(res => res.data)
    },
    deleteCard(id: string) {
        return instance.delete('cards/card', {params: {id}}).then(res => res.data)
    },
    updateCard(cardData: TCardUpdateData) {
        return instance.put('cards/card', {card: {...cardData}}).then(res => res.data)
    },
    updateGrade(grade: number, card_id: string) {
        return instance.put<TUpdateGradeResponseType>('cards/grade', {grade, card_id})
    }
}

export type TGetCardsResponseData = {
    cards: TCardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}
export type TUpdateGradeResponseType = {
    _id: string
    cardsPack_id: string
    card_id: string
    user_id: string
    grade: number
    shots: number
}

export type TGetCardParams = {
    cardsPack_id: string
    cardAnswer?: string
    cardQuestion?: string
    min?: string
    max?: string
    sortCards?: string
    page?: string
    pageCount?: string
}

export type TCardData = TCommonCardDataUpdateCardData & {
    cardsPack_id: string
}
export type TCardUpdateData =TCommonCardDataUpdateCardData & {
    _id: string
}
type TCommonCardDataUpdateCardData = {
    question?: string
    answer?: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}