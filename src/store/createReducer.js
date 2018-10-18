export default function createReducer(initialState, handlers) {
  return function reducer(state = initialState, { type, payload }) {
    const handler = handlers[type]
    if (!handler) {
      return state
    }
    return handler(state, payload)
  }
}
