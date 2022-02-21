import {TBaseThunk} from '../../n2-bll/store'
import {passwordAPI} from '../../n3-api/password_api'
import {setIsFetching} from '../../n1-app/a1-app/app_reducer'
import {thunkErrorHandler} from '../../n4-common/helpers/thunk-error'

//* ============================================================= Initial state =====================================>>
const initState = {
    restorationEmail: '',
    isRestoreSuccess: false,
    isSetNewPasswordSuccess: false
}

export const passwordReducer = (state: TState = initState, action: TPasswordReducerActions): TState => {
    switch (action.type) {
        case 'passwordReducer/SET_RESTORE_SUCCESS':
            return {...state, isRestoreSuccess: action.isRestoreSuccess}
        case 'passwordReducer/SET_RESTORATION_EMAIL':
            return {...state, restorationEmail: action.restorationEmail}
        case 'passwordReducer/SET_NEW_PASSWORD_SUCCESS':
            return {...state, isSetNewPasswordSuccess: action.isSetNewPasswordSuccess}
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const _setIsRestoreSuccess = (isRestoreSuccess: boolean) =>
    ({type: 'passwordReducer/SET_RESTORE_SUCCESS', isRestoreSuccess} as const)
export const _setIsSetNewPasswordSuccess = (isSetNewPasswordSuccess: boolean) =>
    ({type: 'passwordReducer/SET_NEW_PASSWORD_SUCCESS', isSetNewPasswordSuccess} as const)
export const _setRestorationEmail = (restorationEmail: string) =>
    ({type: 'passwordReducer/SET_RESTORATION_EMAIL', restorationEmail} as const)

//* =============================================================== Thunk creators ==================================>>
export const restorePassword = (email: string): TThunk => dispatch => {
    dispatch(setIsFetching(true))
    passwordAPI.restorePassword(email)
        .then(() => {
            dispatch(_setIsRestoreSuccess(true))
            dispatch(setIsFetching(false))
            dispatch(_setRestorationEmail(email))
        })
        .catch(error => {
            thunkErrorHandler(error, dispatch)
        })
}
export const setNewPassword = (password: string, token: string): TThunk => dispatch => {
    dispatch(setIsFetching(true))
    passwordAPI.setNewPassword({password, resetPasswordToken: token})
        .then(()=> {
            dispatch(_setIsRestoreSuccess(false))
            dispatch(setIsFetching(false))
            dispatch(_setIsSetNewPasswordSuccess(true))
        })
        .catch(error => {
            thunkErrorHandler(error, dispatch)
        })
}

//* =============================================================== Types ===========================================>>
export type TState = typeof initState

export type TPasswordReducerActions = ReturnType<typeof _setIsRestoreSuccess>
    | ReturnType<typeof setIsFetching>
    | ReturnType<typeof _setRestorationEmail>
    | ReturnType<typeof _setIsSetNewPasswordSuccess>


type TThunk = TBaseThunk<TPasswordReducerActions>
