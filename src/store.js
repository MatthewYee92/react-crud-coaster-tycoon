import { applyMiddleware, combineReducers, createStore } from 'redux'
import parks from './reducers/parks'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export default () => createStore(
  combineReducers({ parks }),
  applyMiddleware(thunk, logger)
)
