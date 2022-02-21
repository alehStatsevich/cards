import {ThunkDispatch} from 'redux-thunk'
import {TAppState} from '../../n2-bll/store'
import {TLoginReducerActions} from '../../n5-features/f1-login/login_reducer'
import {setIsFetching} from '../../n1-app/a1-app/app_reducer'
import {thunkErrorHandler} from './thunk-error'


export const thunkRequestHelper = (thunkToGetRequest: Function) => (apiMethod: (data?: any) => Promise<any>,
                                                                    dispatch: ThunkDispatch<TAppState, any, TLoginReducerActions>,
                                                                    data?: any) => {
    dispatch(setIsFetching(true))
    apiMethod(data)
        .then(() => {
            dispatch(setIsFetching(false))
            dispatch(thunkToGetRequest())
        })
        .catch(error => {
            thunkErrorHandler(error, dispatch)
        })
}