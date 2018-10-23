import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunk from 'redux-thunk'
import reducers from './rootReducer'

export default function configureStore() {
  const middlewares = [thunk]

  const { logger } = require('redux-logger')
  middlewares.push(logger)

  return createStore(combineReducers({
    ...reducers
  }), applyMiddleware(...middlewares))
}
