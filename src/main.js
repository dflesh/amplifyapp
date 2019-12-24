import axios from "axios"
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./navBar";
import ReactModal from "react-modal";


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            taskID: [],
            tasks: [],
            user_id: localStorage.getItem('user_id'),
            isLoggedIn: localStorage.getItem('cks_token') !== null,
            showCreateModal: false,
            showEditModal: false,
            newTask: '',
            isActive: [],
            editTask: '',
            editID: ''
        }
    }

    handleOpenCreateModal = (event) => {
        this.setState({showCreateModal: true});
    };

    handleCloseCreateModal = (event) => {
        this.setState({showCreateModal: false});
    };

    handleCloseEditModal = (event) => {
        this.setState({showEditModal: false});
    };

    handleOpenEditModal = (index) => {
        this.setState({showEditModal: true, editTask: this.state.tasks[index], editID: this.state.taskID[index]});
    };

    getToDos() {
        let res;
        const logged_user = {
            id : localStorage.getItem('user_id'),
            token : localStorage.getItem('cks_token')
        };

        axios.post("https://todoslisttest.herokuapp.com/home", logged_user)
            .then(response => {res = response})
            .then(() => {
                let i = 0;

                let tasks = [];
                let taskID = [];
                let isActive = [];
                for (i in res.data.data){
                    if (res.data.data.hasOwnProperty(i)){
                        tasks[i] = res.data.data[i].mission;
                        taskID[i] = res.data.data[i].taskid;
                        isActive[i] = res.data.data[i].active;
                    }
                }
                this.setState({tasks: tasks, taskID: taskID, isActive: isActive})
            });
    }

    componentDidMount() {
        this.getToDos()
    }

    CreateTask = () => {
        const data = {
            task: this.state.newTask,
            user_id: this.state.user_id
        };
        axios.post("https://todoslisttest.herokuapp.com/create", data);
        this.setState({newTask: ''});
        this.handleCloseCreateModal();
        this.getToDos()
    };

    DeleteTask = (index) => {
        const id = {
            id: index
        };
        axios.post("https://todoslisttest.herokuapp.com/delete", id);

        this.getToDos()
    };

    EditTask = () => {
      const data = {
          id: this.state.editID,
          task: this.state.editTask
      };
      axios.post("https://todoslisttest.herokuapp.com/edit", data);
        this.getToDos();
        this.handleCloseEditModal()
    };

    DoneTask = (index) => {
        const id = {
            id: index
        };
        axios.post("https://todoslisttest.herokuapp.com/done", id);
        this.getToDos();

    };

    handleNewTaskChange = (event) => {
        this.setState({newTask: event.target.value});
    };

    handleEditTaskChange = (event) => {
        this.setState({editTask: event.target.value})
    };

    render() {

        let taskID = this.state.taskID;

        return(
            <div>
                <NavBar/>
                <div className='container'>
                    {this.state.isLoggedIn ?
                        <div>
                                <button className='btn btn-success' type='button' onClick={this.handleOpenCreateModal}>Create task</button>
                                        <ReactModal style={customStyles} isOpen={this.state.showCreateModal} contentLabel="Minimal Modal Example">
                                            <div>
                                                <textarea className="form-control"
                                                          aria-label="With textarea" onChange={this.handleNewTaskChange}>{this.state.newTask}</textarea>
                                            </div>
                                            <div className='modal-footer'>
                                            <button className='btn btn-danger' type='button' onClick={this.handleCloseCreateModal}>Close Modal</button>
                                                <button className='btn btn-success' type='button' onClick={this.CreateTask}>Create task</button></div>
                                        </ReactModal>
                        <table className="table table-light">
                    <thead>
                        <th scope='col' width='75%'>Task</th>
                        <th scope='col'>Action</th>
                    </thead>
                    <tbody>
                    {this.state.tasks.map(function(row, index){
                        return <tr key={index}>
                            {!this.state.isActive[index] ? <td><s>{row}</s></td> : <td>{row}</td>}
                            <td>
                                <button className='btn btn-danger'
                                        type='button'
                                        onClick={() => this.DeleteTask(taskID[index])}>
                                    Delete </button>
                                <button className='btn btn-warning'
                                    type='button'
                                    onClick={() => {this.handleOpenEditModal(index)}}>
                                    Edit</button>
                                <button className='btn btn-success'
                                        type='button'
                                        onClick={() => this.DoneTask(taskID[index])}>Done</button>
                            </td>
                        </tr>
                    }, this)
                    }
                    </tbody>
                </table>
                            <ReactModal style={customStyles} isOpen={this.state.showEditModal} contentLabel="Minimal Modal Example">
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">Task</span>
                                    </div>
                                    <div>
                                        <textarea className="form-control" aria-label="With textarea" onChange={this.handleEditTaskChange}>
                                            {this.state.editTask}
                                        </textarea>
                                    </div>
                                </div>
                                <div className='modal-footer'>
                                    <button className='btn btn-danger' type='button' onClick={this.handleCloseEditModal}>Close Modal</button>
                                    <button className='btn btn-success' type='button' onClick={this.EditTask}>Edit task</button>
                                </div>
                            </ReactModal>
                        </div>
                    :
                        <h1 className='text-danger'>Welcome to ToDoList website! Please create account or login to continue</h1>}
                </div>
            </div>
        )
    }
}

export default Main