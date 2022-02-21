import {TAppState} from '../store'


export const selectIsFetching = (state: TAppState) => state.app.isFetching