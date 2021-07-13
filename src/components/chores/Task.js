import React, { useContext } from 'react';
import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const Task = ({task}) => {

    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { deleteTask, getTasks, saveCurrentTask, updateTask } = tasksContext;

    // Array Destructuring
    const [currentProject] = project;


    const taskToDelete = id => {
        deleteTask(id, currentProject._id);
        getTasks(currentProject._id);
    }

    // función que modificar el estado de las tareas
    const modifyTaskStatus = task => {
        if(task.condition) {
            task.condition = false;
        } else {
            task.condition = true;
        }
        updateTask(task);
    }

    // Agregar un tarea actual cuando el usuario desea editarla
    const selectTask = task => {
        saveCurrentTask(task);
    }

    return(
        <li className="tarea sombra">
            <p>{task.name}</p>

            <div className="estado">
                { task.condition
                ? 
                    (
                        <button
                            type="button"
                            className="completo"
                            onClick={() => modifyTaskStatus(task)}
                        >Completo</button>
                    )
                :
                    (
                        <button
                            type="button"
                            className="incompleto"
                            onClick={() => modifyTaskStatus(task)}
                        >Incompleto</button>
                    )
                }
            </div>
            
            <div className="acciones">
                    <button
                        type="button"
                        className="btn btn-primario"
                        onClick={ () => selectTask(task) }
                    >Editar</button>
                    <button
                        type="button"
                        className="btn btn-secundario"
                        onClick = { () => taskToDelete(task._id) }
                    >Eliminar</button>
                </div>
        </li>
    );
}

export default Task;