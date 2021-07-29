import {combineReducers} from 'redux'
import registerReducer from './registerReducer'

export const rootReducer = combineReducers({
  register:registerReducer
})
