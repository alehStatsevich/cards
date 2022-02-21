import {setAppError, setIsFetching} from '../../n1-app/a1-app/app_reducer'
import {ThunkDispatch} from 'redux-thunk'
import {TAppActions, TAppState} from '../../n2-bll/store'


export const thunkErrorHandler = (error: any, dispatch: ThunkDispatch<TAppState, any, TAppActions>) => {
    dispatch(setAppError(error.response.data.error))
    dispatch(setIsFetching(false))
}