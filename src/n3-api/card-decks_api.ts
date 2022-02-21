import {instance} from "./api";



export const cardDecksAPI = {
    getCards(cardsParams: CardsParams) {
        return instance.get<CardDecks>('cards/pack', {params: {...cardsParams}})
    },
    postCards(cardsPack: CreateCardsType ) {
        return instance.post<CardDecks>('cards/pack', {cardsPack: {...cardsPack}})
    },
    removeCards(id: string) {
        return instance.delete('cards/pack', {params: {id}})
    },
    updateCards(cardsPack: UpdateCardType ) {
        return instance.put('cards/pack',{cardsPack: {...cardsPack}})
    }
}

type UpdateCardType = {
    _id: string
    name?: string
}

type CreateCardsType = {
    name?: string
    path?: string
    grade?: number
    shots?: number
    rating?: number
    deckCover?: string
    private?: boolean
    type?: string
}

export type Pack = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    _v: number
}

export type CardDecks = {
    cardPacks: Array<Pack>
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    sortPacks: string,
    token: string,
    tokenDeathTime: number
}

export interface CardsParams {
    packName?: string
    min?: number
    max?: number
    sortPacks?: string
    page?: number
    pageCount?: number
    user_id?: string
}
