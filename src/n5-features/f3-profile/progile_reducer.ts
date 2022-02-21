//* ============================================================= Initial state =====================================>>
import {TBaseThunk} from '../../n2-bll/store'
import {loginAPI, UserData} from '../../n3-api/loginAPI'
import {setIsFetching} from '../../n1-app/a1-app/app_reducer'
import {thunkErrorHandler} from '../../n4-common/helpers/thunk-error'

const initState = {
    _id: '',
    email: null,
    name: '',
    avatar: '',
    publicCardPacksCount: null,
}

export const profileReducer = (state: UserDataType = initState, action: TProfileReducerActions): UserDataType => {
    switch (action.type) {
        case 'profileReducer/SET_USER_DATA':
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

//* =============================================================== Action creators =================================>>
export const setUserData = (data: UserDataType) => ({type: 'profileReducer/SET_USER_DATA', data} as const)

//* =============================================================== Thunk creators ==================================>>

export const changeUserData = (userData: UserData):TThunk => dispatch => {
    dispatch(setIsFetching(true))
    loginAPI.changeData(userData)
        .then(res => {
                dispatch(setUserData(res.data.updatedUser))
                dispatch(setIsFetching(false))
        }).catch(error => {
            thunkErrorHandler(error, dispatch)
    })
}

//* =============================================================== Types ===========================================>>

export type TProfileReducerActions =
    ReturnType<typeof setUserData> |
    ReturnType<typeof setIsFetching>

type TThunk = TBaseThunk<TProfileReducerActions>

export type UserDataType = {
    _id: string,
    email: null | string,
    name:  string,
    avatar: string,
    publicCardPacksCount: null | number,
}
