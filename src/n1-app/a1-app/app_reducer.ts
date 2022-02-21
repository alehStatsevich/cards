//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {authThunk} from '../../n5-features/f1-login/login_reducer'

const initState = {
    isFetching: false,
    error: null as ErrorMessageType,
    isInitialized: false,
}

export const appReducer = (state: TState = initState, action: TAppReducerActions): TState => {
    switch (action.type) {
        case 'passwordReducer/SET_IS_FETCHING':
            return {...state, isFetching: action.isFetching}
        case 'passwordReducer/SET_IS_INITIALIZED':
            return {...state, isInitialized: action.isInitialized}
        case 'appReducer/SET_ERROR':
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
/**
 * Preloader is already created in src/n4-common/c2-Preloader/Preloader.tsx !!
 */
export const setIsFetching = (isFetching: boolean) =>
    ({type: 'passwordReducer/SET_IS_FETCHING', isFetching} as const)
export const setIsInitialized = (isInitialized: boolean) =>
    ({type: 'passwordReducer/SET_IS_INITIALIZED', isInitialized} as const)
export const _setAppError = (error: string | null) => ({type: 'appReducer/SET_ERROR', error} as const)

//* =============================================================== Thunk creators ==================================>>

export const setAppError = (error: string | null): TThunk => dispatch => {
    dispatch(_setAppError(error))
    setTimeout(() => {
        dispatch(_setAppError(null))
    }, 4000)
}


export const initializeApp = (): TThunk => dispatch => {
    dispatch(setIsFetching(true))
    dispatch(authThunk())
}

//* =============================================================== Types ===========================================>>

export type TState = typeof initState
export type ErrorMessageType = string | null
export type TAppReducerActions = ReturnType<typeof setIsFetching>
    | ReturnType<typeof _setAppError>
    | ReturnType<typeof setIsInitialized>

type TThunk = TBaseThunk<TAppReducerActions>