import React, { Fragment, useContext } from 'react';

import Task from './Task';

import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

// Paquetes de react-transition-group
const TasksList = () => {

    const projectsContext = useContext(projectContext);
    const { project, deleteProject } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { tasksProject } = tasksContext;

    
    // Si no hay proyecto seleccionado
    if(!project) return(<h2>Selecciona un proyecto</h2>);

    // Destructuring
    const [currentProject] = project; 
    

    // Elimina un proyecto
    const onClickDeleteProject = () => {
        deleteProject( currentProject._id );  
    }

    
    return(
        <Fragment>
            <h2>Proyecto: {currentProject.name}</h2>
            <ul className="listado-tareas">
                { (tasksProject.length === 0 )
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : 
                    tasksProject.map( task => (
                        (task) ? 
                            <Task 
                                key={task._id}
                                task={task}
                            />
                        :  null
                        
                    ))
                }

                
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickDeleteProject}
            >Eliminar Proyecto &times;</button> 
        </Fragment>
    );
}

export default TasksList;