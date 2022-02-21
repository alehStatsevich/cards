//* =============================================================== Initial state ===================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {loginAPI} from '../../n3-api/loginAPI'
import {setIsFetching} from '../../n1-app/a1-app/app_reducer'
import {thunkErrorHandler} from '../../n4-common/helpers/thunk-error'

const initState = {
    email: '',
    password: '',
    error: '',
    isFetching: false,
}


export const registrationReducer = (state: TState = initState, action: TRegistrationReducerActions): TState => {
    switch (action.type) {
        case 'registrationReducer/AUTH-REGISTER':
            return {
                ...state,
                email: action.email,
                password: action.password,
                error: action.message as string,
            }
        case 'registrationReducer/IS-FETCHING':
            return {...state, isFetching: action.isFetching}
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const authRegisterAction = (email: string, password: string, message?: string,) =>
    ({type: 'registrationReducer/AUTH-REGISTER', email, password, message} as const)

export const setIsFetchingRegisterAction = (isFetching: boolean) =>
    ({type: 'registrationReducer/IS-FETCHING', isFetching} as const)

//* =============================================================== Thunk creators ==================================>>
export const registrationThunk = (email: string, password: string): TThunk => {
    return (dispatch) => {
        dispatch(setIsFetching(true))
        loginAPI.registration(email, password)
            .then(() => {
                dispatch(authRegisterAction(email, password))
                dispatch(setIsFetching(false))
                dispatch(setIsFetchingRegisterAction(true))
            })
            .catch(error => {
                const message = error.response.data.error
                dispatch(authRegisterAction(email, password, message))
                thunkErrorHandler(error, dispatch)
            })
    }
}


//* =============================================================== Types ===========================================>>
type TState = initStateType

type initStateType = typeof initState

export type TRegistrationReducerActions =
    AuthRegisterActionType
    | SetIsFetchingRegisterActionType | ReturnType<typeof setIsFetching>

type AuthRegisterActionType = ReturnType<typeof authRegisterAction>
type SetIsFetchingRegisterActionType = ReturnType<typeof setIsFetchingRegisterAction>


type TThunk = TBaseThunk<TRegistrationReducerActions>