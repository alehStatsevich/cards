import {loginReducer, setIsAuth} from './login_reducer';


export let startState: any

beforeEach(() => {
    startState = {
        _id: null,
        email: null,
        name: null,
        avatar: null,
        publicCardPacksCount: null,
        isAuth: false
    }
})

test('isAuth should be true', () => {
    const data = true

    const endState = loginReducer(startState, setIsAuth(data))
    // expectation
    expect(endState.isAuth).toBe(true)
})



