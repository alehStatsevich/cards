import {TAppState, TBaseThunk} from '../../n2-bll/store'
import {cardDecksAPI, CardsParams, Pack} from '../../n3-api/card-decks_api'
import {setIsFetching} from '../../n1-app/a1-app/app_reducer'
import {thunkErrorHandler} from '../../n4-common/helpers/thunk-error'
import {thunkRequestHelper} from '../../n4-common/helpers/thunkRequestHelper'

//* =============================================================== Initial state ===================================>>
const initState: DecksStateType = {
    cardPacks: [],
    cardPacksTotalCount: 0,
    minCardsCount: 0,
    maxCardsCount: 103,
    page: 0,
    pageCount: 10,
    token: '',
    tokenDeathTime: 0,
    sortPacks: '',
    packName: '',
    minParam: 0,
    maxParam: 100,
    user_id: ''
}

export const cardDecksReducer = (state: DecksStateType = initState, action: TCardDecksReducerActions): DecksStateType => {
    switch (action.type) {
        case 'cardDecksReducer/SET_CARD_DECKS':
        case 'cardDecksReducer/UPDATE_VALUES':
        case 'cardDecksReducer/SET_MIN_MAX_SEARCH_PARAMS':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setCardDecksAction = (payload: SetValuesType) => ({
    type: 'cardDecksReducer/SET_CARD_DECKS',
    payload
} as const)
export const _updateValues = (payload: SetValuesType) => ({
    type: 'cardDecksReducer/UPDATE_VALUES',
    payload
} as const)
export const setMinMaxCardsSearchParams = (payload: { minParam: number, maxParam: number }) => ({
    type: 'cardDecksReducer/SET_MIN_MAX_SEARCH_PARAMS',
    payload
} as const)

//* =============================================================== Thunk creators ==================================>>
export const getCardDecksThunk = (params: CardsParams = {}): TThunk => (dispatch,
                                                                        getState: () => TAppState) => {
    dispatch(setIsFetching(true))
    const cardDecks = getState().cardDecks
    const cardsParamsModel: CardsParams = {
        packName: cardDecks.packName,
        min: cardDecks.minParam,
        max: cardDecks.maxParam,
        sortPacks: cardDecks.sortPacks,
        page: cardDecks.page,
        pageCount: cardDecks.pageCount,
        user_id: cardDecks.user_id,
        ...params
    }
    cardDecksAPI.getCards(cardsParamsModel)
        .then(res => {
            dispatch(_setCardDecksAction(res.data))
            dispatch(setIsFetching(false))
        }).catch(error => {
        thunkErrorHandler(error, dispatch)
    })
}
const cardDecksRequestHelper = thunkRequestHelper(getCardDecksThunk)
export const createDeckThunk = (name: string): TThunk => dispatch => {
    cardDecksRequestHelper(cardDecksAPI.postCards, dispatch, {name})
}
export const removeDeckThunk = (id: string): TThunk => dispatch => {
    cardDecksRequestHelper(cardDecksAPI.removeCards, dispatch, id)
}

export const updateValueThunk = (_id: string, name: string): TThunk => dispatch => {
    cardDecksRequestHelper(cardDecksAPI.updateCards, dispatch, {_id, name})
}

//* =============================================================== Types ===========================================>>

export type DecksStateType = {
    packName: string
    cardPacks: Array<Pack>
    page: number,
    pageCount: number,
    cardPacksTotalCount: number,
    minCardsCount: number,
    maxCardsCount: number,
    sortPacks: string,
    token: string,
    tokenDeathTime: number,
    minParam: number,
    maxParam: number,
    user_id: string
}
export type SetValuesType = {
    minCardsCount?: number,
    maxCardsCount?: number,
    sortPacks?: string,
    page?: number,
    pageCount?: number,
    packName?: string,
    user_id?: string
}
export type TCardDecksReducerActions =
    ReturnType<typeof _setCardDecksAction> |
    ReturnType<typeof _updateValues> |
    ReturnType<typeof setIsFetching> |
    ReturnType<typeof setMinMaxCardsSearchParams>

type TThunk = TBaseThunk<TCardDecksReducerActions>