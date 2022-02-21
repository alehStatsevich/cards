import {TBaseThunk} from '../../n2-bll/store'
import {cardsAPI, TCardData, TCardUpdateData, TGetCardParams, TGetCardsResponseData} from '../../n3-api/cards_api'
import {setIsFetching} from '../../n1-app/a1-app/app_reducer'
import {thunkErrorHandler} from '../../n4-common/helpers/thunk-error'
import {thunkRequestHelper} from '../../n4-common/helpers/thunkRequestHelper'
import {Dispatch} from "redux";

//* =============================================================== Initial state ===================================>>
const initState = {
    packName: '',
    cardsPack_id: '',
    cardAnswer: undefined as string | undefined,
    cardQuestion: undefined as string | undefined,
    sortCards: undefined as string | undefined,
    cards: [] as TCardType[],
    cardsTotalCount: 0,
    minGrade: 0,
    maxGrade: 0,
    packUserId: '',
    page: 1,
    pageCount: 5,
    token: '',
    tokenDeathTime: 0,
}

export const cardsReducer = (state: TState = initState, action: TCardsReducerActions): TState => {
    switch (action.type) {
        case 'cardsReducer/SET_CARDS_STATE':
        case 'cardsReducer/SET_GET_REQUEST_PARAMS':
        case 'cardsReducer/SET_PACK_NAME':
            return {...state, ...action.payload}
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setCardsState = (payload: TGetCardsResponseData) =>
    ({type: 'cardsReducer/SET_CARDS_STATE', payload} as const)
export const setGetRequestParams = (payload: TSetRequestParams) =>
    ({type: 'cardsReducer/SET_GET_REQUEST_PARAMS', payload} as const)
export const setPackName = (payload: { packName: string }) =>
    ({type: 'cardsReducer/SET_PACK_NAME', payload} as const)


//* =============================================================== Thunk creators ==================================>>
export const getCards = (pageCount?: string ): TThunk => (dispatch,
                                       getState) => {
    dispatch(setIsFetching(true))
    const cards = getState().cards
    const newCardParams: TGetCardParams = {
        cardsPack_id: cards.cardsPack_id,
        pageCount: pageCount ? pageCount : cards.pageCount.toString(),
        cardQuestion: cards.cardQuestion,
        cardAnswer: cards.cardAnswer,
        sortCards: cards.sortCards,
        page: cards.page.toString(),
    }
    cardsAPI.getCards(newCardParams)
        .then(data => {
            dispatch(_setCardsState(data))
            dispatch(setIsFetching(false))
        })
        .catch(error => {
            thunkErrorHandler(error, dispatch)
        })
}
export const gradeCardUpdateThunk = (id: string, grade: number) => {
    return (dispatch: Dispatch) => {
        cardsAPI.updateGrade(grade, id)
            .then()
            .catch(error => {
                thunkErrorHandler(error, dispatch)
            })
    }

}


const cardsThunkRequestHelper = thunkRequestHelper(getCards)
export const createCard = (cardData: TCardData): TThunk => dispatch => {
    cardsThunkRequestHelper(cardsAPI.createCard, dispatch, cardData)
}
export const deleteCard = (cardId: string): TThunk => dispatch => {
    cardsThunkRequestHelper(cardsAPI.deleteCard, dispatch, cardId)
}
export const updateCard = (cardData: TCardUpdateData): TThunk => dispatch => {
    cardsThunkRequestHelper(cardsAPI.updateCard, dispatch, cardData)
}


//* =============================================================== Types ===========================================>>
type TState = typeof initState

export type TCardsReducerActions = ReturnType<typeof _setCardsState>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof setGetRequestParams>
    | ReturnType<typeof setPackName>

type TThunk = TBaseThunk<TCardsReducerActions>

export type TCardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}

export type TSetRequestParams = {
    cardsPack_id?: string
    cardAnswer?: string
    cardQuestion?: string
    sortCards?: string
    page?: number
    pageCount?: number
}