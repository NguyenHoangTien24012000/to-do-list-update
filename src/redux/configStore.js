import {applyMiddleware, combineReducers,  createStore} from 'redux'
import ToDoListReducer from './reducers/ToDoListReducer'
import reduxThunk from 'redux-thunk'
const rootReducer = combineReducers({
    ToDoListReducer
})
const store = createStore(rootReducer, applyMiddleware(reduxThunk))
export default store