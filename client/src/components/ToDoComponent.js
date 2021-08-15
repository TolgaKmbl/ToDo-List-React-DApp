import React, { useContext } from 'react'
import { TodoContext } from '../App.js'

import "../App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function ToDoComponent() {
    const { taskCount, todoTask, toggleTask, createTask } = useContext(TodoContext);

    let textInput = React.createRef();

    return (    
        <>            
            <div className="card md-3" id="todo-card">                
                <div className="card-body">
                    <h5 className="card-title">You have tasks to do! </h5>
                    <div>
                        <form onSubmit={(event) => {
                            event.preventDefault();
                            createTask(textInput.current.value);
                            textInput.current.value = ''; }}>
                            <input
                            id="newTask"
                            ref={textInput}
                            type="text"
                            className="form-control"
                            placeholder="Add a new task..."
                            required />
                            <input className="btn btn-warning" type="submit" hidden={true} />
                        </form>
                        <ul id="taskList" className="list-unstyled">
                            { todoTask.map( (task, key) => {
                            return(
                            <div className={ task.completed ? 'taskTemplate complete text-center' : 'taskTemplate text-center' } key={key}>
                                <label>
                                <input
                                type="checkbox"                                            
                                defaultChecked={task.completed}  
                                name={task.id}  
                                onClick={(event) => {                        
                                    toggleTask(event.target.name)}}/>                         
                                <span className="content ml-2 ">{task.content}</span>
                                </label>
                            </div>  
                            )
                        })}
                        </ul>
                    </div>
                </div>
            </div>  
        </>      
    )
}

export default ToDoComponent
