import { createStore, combineReducers, applyMiddleware } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

const reducer = combineReducers({
  notification: notificationReducer,
  blogs: blogsReducer,
  users: userReducer
})

const store = createStore(reducer,
  composeWithDevTools(applyMiddleware(thunk)))

export default store