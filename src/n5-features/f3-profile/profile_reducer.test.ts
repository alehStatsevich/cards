export let startState: any

beforeEach(() => {
    startState = {}
})

test('some test name here', () => {
    // data
    let newData = 10

    // action
    startState.newValue = newData

    // expectation
    expect(startState.newValue).toBe(10)
})
