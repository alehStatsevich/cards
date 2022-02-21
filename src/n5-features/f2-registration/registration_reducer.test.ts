import {authRegisterAction, registrationReducer} from "./registration_reducer";

export let startState: any

beforeEach(() => {
    startState = {
        email: '',
        password: '',
        completed: false
    }
})

test('password and email should be correct added', () => {
    // data
    const endState = registrationReducer(startState, authRegisterAction('1@mail.ru', '123123'))

    // action

    // expectation
    expect(startState.completed).toBe(false)
    expect(endState.email).toBe('1@mail.ru')
    expect(endState.password).toBe('123123')
})
