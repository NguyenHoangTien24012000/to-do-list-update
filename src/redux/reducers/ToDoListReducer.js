import { GET_TASK_LIST } from "../types/ToDoListType"

const initialState = {
    taskList: []
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_TASK_LIST :{
            return {...state, taskList : action.taskList}
        }
    

    default:
        return state
    }
}
