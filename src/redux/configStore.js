import {combineReducers,  createStore} from 'redux'
import ToDoListReducer from './reducers/ToDoListReducer'

const rootReducer = combineReducers({
    ToDoListReducer
})
const store = createStore(rootReducer)
export default store