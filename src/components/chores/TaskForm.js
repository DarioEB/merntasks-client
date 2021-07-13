import React, {useContext, useState, useEffect} from 'react';

import projectContext from '../../context/projects/projectContext';
import taskContext from '../../context/tasks/taskContext';

const TaskForm = () => {

    const projectsContext = useContext(projectContext);
    const { project } = projectsContext;

    const tasksContext = useContext(taskContext);
    const { errorTask, selectTask, validatedTask, addTask, getTasks, updateTask, cleanTask } = tasksContext;

    // Effect que detecta si hay una tarea seleccionada
    useEffect( () => {
        if(selectTask !== null) {
            saveTask(selectTask);
        } else {
            saveTask({
                name: ''
            })
        }
    }, [selectTask])

    // State del formulario
    const [ task, saveTask ] = useState({
        name: ''
    })

    // Extraer los valores del formulario
    const { name } = task;

    if(!project) return null;

    const [currentProject] = project;

    // Leer los valores
    const handleChangeTask = e => {
        saveTask({
            ...task,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitTask = e => {
        e.preventDefault();

        // Pasar la validación
        if( name.trim() === '') {
            validatedTask(); 
            return;
        }  

        // Si es edicion o si nueva tarea
        if(selectTask === null) {
            // Tarea nueva
            // Agregar la nueva tarea
            task.project = currentProject._id;
            addTask(task);
        } else {
            // Actualizar tarea existente
            updateTask(task);

            // Eliminar tarea seleccionada
            cleanTask();
        }

        // Obtener y filtrar las tareas del proyecto
        getTasks(currentProject._id);

        // Reiniciar el form
        saveTask({
            name: ''
        })
    }

    return(
        <div className="formulario">
            <form
                onSubmit={onSubmitTask}
            >
                <div className="contenedor-input">
                    <input 
                        type="text"
                        className="input-text"
                        placeholder="Nombre Tarea..."
                        name="name"
                        value={name}
                        onChange={handleChangeTask}
                    />
                </div>

                <div className="contenedor-input">
                    <input 
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={ selectTask ? 'Editar Tarea' : 'Agregar Tarea'}
                    />
                </div>
            </form>
            { errorTask ? <p className="mensaje error">El nombre de la tarea es obligatorio</p> : null }
        </div>
    );
}

export default TaskForm;