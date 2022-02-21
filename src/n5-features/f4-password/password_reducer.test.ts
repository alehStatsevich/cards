import {
    _setIsRestoreSuccess,
    _setIsSetNewPasswordSuccess,
    _setRestorationEmail,
    passwordReducer,
    TState
} from './password_reducer'

let startState: TState

beforeEach(() => {
    startState = {
        restorationEmail: '',
        isRestoreSuccess: false,
        isSetNewPasswordSuccess: false
    }
})

test('restoration email should be settled', () => {
    // data
    const email = 'example@mail.net'

    // action
    const endState = passwordReducer(startState, _setRestorationEmail(email))

    // expectation
    expect(startState.restorationEmail).toBe('')
    expect(endState.restorationEmail).toBe(email)
})

test('isRestoreSuccess should changes', () => {
    // data
    const isRestoreSuccess = true

    // action
    const endState = passwordReducer(startState, _setIsRestoreSuccess(isRestoreSuccess))

    // expectation
    expect(startState.isRestoreSuccess).toBeFalsy()
    expect(endState.isRestoreSuccess).toBeTruthy()
})

test('isSetNewPasswordSuccess should changes', () => {
    // data
    const isSetNewPasswordSuccess = true

    // action
    const endState = passwordReducer(startState, _setIsSetNewPasswordSuccess(isSetNewPasswordSuccess))

    // expectation
    expect(startState.isSetNewPasswordSuccess).toBeFalsy()
    expect(endState.isSetNewPasswordSuccess).toBeTruthy()
})

