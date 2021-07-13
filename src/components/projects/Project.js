import React, { useContext } from 'react';
// Importamos el context para poder utilizarlo
import projectContext from '../../context/projects/projectContext';
// Importamos el context de tareas
import taskContext from '../../context/tasks/taskContext';

const Project = ({project}) => {

    const projectsContext = useContext(projectContext);
    const { currentProject } = projectsContext;

    // Obtener la función del context de tarea
    const tasksContext = useContext(taskContext);
    const { getTasks } = tasksContext;

    // Función para agregar el proyecto actual
    const selectProject = id => {
        currentProject(id); // Fijar el proyecto actual

        getTasks(id); // Filtra la tarea con el id del proyecto correspondiente
    }
    return(
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={() => selectProject(project._id) }
            >{project.name}</button>
        </li>
    );
}

export default Project;