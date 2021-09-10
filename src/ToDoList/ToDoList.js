import React, { Component } from 'react'
import './Todolist.css'
import Axios from 'axios'

export default class Todolist extends Component {
// Tao Tien ne
    state = {
        taskList: [],
        value: {
            taskName: ''
        },
        error: {
            taskName: ''
        }
    }

    getTaskList = () => {
        let promise = Axios({
            url: 'http://svcy.myclass.vn/api/ToDoList/GetAllTask',
            method: 'GET'
        })
        promise.then((result) => {
            console.log(result)
            this.setState({
                taskList: result.data
            })
        })
        promise.catch((error) => {
            console.log(error.response.data)
        })
    }
    componentDidMount() {
        this.getTaskList()
    }

    renderTaskToDo = () => {
        return this.state.taskList.filter(item => !item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={()=>this.delTask(item.taskName)}>
                        <i className="fa fa-trash-alt"  />
                    </button>
                    <button className="complete" onClick={() =>this.checkTask(item.taskName)} >
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    renderTaskToDoDone = () => {
        return this.state.taskList.filter(item => item.status).map((item, index) => {
            return <li key={index}>
                <span>{item.taskName}</span>
                <div className="buttons">
                    <button className="remove" onClick={()=>this.delTask(item.taskName)} >
                        <i className="fa fa-trash-alt" />
                    </button>
                    <button className="complete" onClick={() =>this.rejectTask(item.taskName)}>
                        <i className="far fa-check-circle" />
                        <i className="fas fa-check-circle" />
                    </button>
                </div>
            </li>
        })
    }

    handleChange = (e) => {
        // console.log(e.target.value)
        let { value, name } = e.target;
        let newValue = { ...this.state.value }
        let newError = { ...this.state.error }
        newValue = { ...newValue, [name]: value }
        if (value.trim() === '') {
            newError[name] = name + " invalid!!"
        } else {
            newError[name] = ''
        }


        this.setState({
            ...this.state,
            value: newValue,
            error: newError
        })
    }

    addTask = (e) => {
        e.preventDefault();
        if (this.state.error.taskName === '') {
            let promise = Axios({
                url: 'http://svcy.myclass.vn/api/ToDoList/AddTask',
                method: 'POST',
                data: { taskName: this.state.value.taskName }
            })
            promise.then((result) => {
                console.log(result)
                alert(result.statusText)
                this.getTaskList()
            })
            promise.catch((error) => {
                console.log(error.response.data)
            })
        }

    }
    delTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
            method: 'DELETE'
        })
        promise.then(result => {
            alert(result.data);
            this.getTaskList();
        })
        promise.catch(err => {
            alert(err.response.data);

        })
    }
    checkTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            alert(result.data)
            this.getTaskList()
        })
        promise.catch(err => {
            alert(err.response.data)
        })
    }
    rejectTask = (taskName) => {
        let promise = Axios({
            url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
            method: 'PUT'
        })
        promise.then(result => {
            alert(result.data)
            this.getTaskList()
        })
        promise.catch(err => {
            alert(err.response.data)
        })
    }
    render() {
        return (
            <div>
                <form onSubmit={(e) => { this.addTask(e) }}>
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
                                    <input id="newTask" name="taskName" onChange={this.handleChange} type="text" placeholder="Enter an activity..." />


                                    <button type="submit" id="addItem">
                                        <i className="fa fa-plus" />
                                    </button>

                                </div>
                                <p className="text text-danger">{this.state.error.taskName}</p>
                                <div className="card__todo">
                                    {/* Uncompleted tasks */}
                                    <ul className="todo" id="todo">
                                        {this.renderTaskToDo()}
                                    </ul>
                                    {/* Completed tasks */}
                                    <ul className="todo" id="completed">
                                        {this.renderTaskToDoDone()}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}
