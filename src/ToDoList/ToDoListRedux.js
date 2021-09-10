import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTaskApiAction, checkTaskApiAction, getTaskListApiAction, rejectTaskApiAction, removeTaskApiAction } from '../redux/actions/ToDoListActions'
export default function ToDoListRedux(props) {
    const dispatch = useDispatch()
    const { taskList } = useSelector(state => state.ToDoListReducer)
    const [state, setState] = useState({
        value: {
            taskName: ''
        },
        error: {
            taskName: ''
        }
    })

        

    const renderTaskToDo = () => {
        return taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={() =>{
                        dispatch(removeTaskApiAction(item.taskName))
                    }}>
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" onClick={() => {dispatch(checkTaskApiAction(item.taskName))}} >
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    const renderTaskToDoDone = () => {
        return taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={() => {dispatch(removeTaskApiAction(item.taskName))}} >
                        <i className="fa fa-trash-alt"  />
                    </button>
                    <button className="complete" onClick={() =>{dispatch(rejectTaskApiAction(item.taskName))}}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }
    const handleChange = (e) => {
        // console.log(e.target.value)
        let { value, name } = e.target;
        let newValue = { ...state.value }
        let newError = { ...state.error }
        newValue = { ...newValue, [name]: value }
        if (value.trim() === '') {
            newError[name] = name + " invalid!!"
        } else {
            newError[name] = ''
        }


        setState({
            ...state,
            value: newValue,
            error: newError
        })
    }
    useEffect(() => {
        dispatch(getTaskListApiAction())
    }, [])
    const addTask = (e) =>{
        e.preventDefault();
        dispatch(addTaskApiAction(state.value.taskName))
    } 
    return (
       
            <div>
                <form onSubmit={(e) => {addTask(e)}}>
                    <div className="card">
                        <div className="card__header">
                            <img src={'./bg.png'} />
                        </div>
                        {/* <h2>hello!</h2> */}
                        <div className="card__body">
                            <div className="card__content">
                                <div className="card__title">
                                    <h2>My Tasks</h2>
                                    <p>September 9,2020</p>
                                </div>
                                <div className="card__add">
                                    <input id="newTask" name="taskName" onChange={handleChange} type="text" placeholder="Enter an activity..." />


                                    <button type="submit" id="addItem">
                                        <i className="fa fa-plus" />
                                    </button>

                                </div>
                                <p className="text text-danger">{state.error.taskName}</p>
                                <div className="card__todo">
                                    {/* Uncompleted tasks */}
                                    <ul className="todo" id="todo">
                                        {renderTaskToDo()}
                                    </ul>
                                    {/* Completed tasks */}
                                    <ul className="todo" id="completed">
                                        {renderTaskToDoDone()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        
    )
}
