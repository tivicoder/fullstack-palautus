import { createStore } from 'redux'
import reducer from './reducers/notificationReducer'

const store = createStore(reducer)

export default store