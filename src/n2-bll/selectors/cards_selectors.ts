import {TAppState} from '../store'


export const selectCardsPack_id = (state: TAppState) => state.cards.cardsPack_id
export const selectCards = (state: TAppState) => state.cards.cards
export const selectPackUserId = (state: TAppState) => state.cards.packUserId
export const selectCurrentPage = (state: TAppState) => state.cards.page
export const selectPageCount = (state: TAppState) => state.cards.pageCount
export const selectCardsTotalCount = (state: TAppState) => state.cards.cardsTotalCount
export const selectCardQuestion = (state: TAppState) => state.cards.cardQuestion
export const selectSortParam = (state: TAppState) => state.cards.sortCards
export const selectPackName = (state: TAppState) => state.cards.packName