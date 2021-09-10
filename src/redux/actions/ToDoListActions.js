import Axios from "axios"
import { GET_TASK_LIST } from "../types/ToDoListType"

export const getTaskListApiAction = () => {
    return dispatch => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
        promise.then((result) => {
            // console.log(result)
            dispatch({
                type: GET_TASK_LIST,
                taskList: result.data
            })


        })
        promise.catch((error) => {
            console.log(error.response.data)
        })
    }
}

export const addTaskApiAction = (taskName) => {
    return dispatch => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
            method: 'POST',
            data: { taskName: taskName }
        })
        promise.then((result) => {
            // console.log(result)
            alert(result.statusText)
            dispatch(getTaskListApiAction())
        })
        promise.catch((error) => {
            console.log(error.response.data)
        })
    }
}
export const removeTaskApiAction= (taskName) =>{
    return dispatch =>{
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(result => {
            alert(result.data);
            dispatch(getTaskListApiAction())
        })
        promise.catch(err => {
            alert(err.response.data);

        })
    }
}
export const checkTaskApiAction= (taskName) =>{
    return dispatch => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            alert(result.data)
            dispatch(getTaskListApiAction())
        })
        promise.catch(err => {
            alert(err.response.data)
        })
    }
}
export const rejectTaskApiAction = (taskName) =>{
    return dispatch =>{
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            alert(result.data)
            dispatch(getTaskListApiAction())
        })
        promise.catch(err => {
            alert(err.response.data)
        })
    }
}