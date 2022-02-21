import {TAppState} from '../store'


export const selectIsRestoreSuccess = (state: TAppState) => state.password.isRestoreSuccess
export const selectRestorationEmail = (state: TAppState) => state.password.restorationEmail
export const selectIsSetNewPasswordSuccess = (state: TAppState) => state.password.isSetNewPasswordSuccess