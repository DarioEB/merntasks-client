import React, { useReducer } from 'react';
import taskContext from './taskContext';
import TaskReducer from './taskReducer';


import { 
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATED_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types'

import axiosClient from '../../config/axios';

const TaskState = props => {
    // States iniciales
    const initialState = {
        tasksProject: [],
        errorTask: false,
        selectTask: null
    }

    // Crear el dispatch y state
    const [state, dispatch] = useReducer(TaskReducer, initialState);

    // Funciones

    // Obtener las tareas de un proyecto
    const getTasks = async project => {

        try {
            const result = await axiosClient.get('/api/tasks', { params : { project }});
            
            dispatch({
                type: TASKS_PROJECT,
                payload: result.data.tasks
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Agregar una tarea al proyecto seleccionado
    const addTask = async task => {
        try {
            const result = await axiosClient.post('/api/tasks', task);

            dispatch({
                type: ADD_TASK,
                payload: result.data.tasks
            })
        } catch (error) {

        }
    }

    const validatedTask = () => {
        dispatch({
            type: VALIDATED_TASK
        })
    }

    // Eliminar tarea por ID
    const deleteTask = async (id, project) => {
        try {
            await axiosClient.delete(`/api/tasks/${id}`, {params: { project }});
            dispatch({
                type: DELETE_TASK,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    // Edita o modifica una tarea
    const updateTask = async task => {
        try {
            const result = await axiosClient.put(`/api/tasks/${task._id}`, task);
            
            dispatch({
                type: UPDATE_TASK,
                payload: result.data.task
            })
        } catch ( error ) {
            console.log(error);
        }
    }

    // Extrae una tarea para edición
    const saveCurrentTask = task => {
        dispatch({
            type: CURRENT_TASK,
            payload: task
        })   
    }

    

    // Eliminar la tarea selecciona
    const cleanTask = () => {
        dispatch({
            type: CLEAN_TASK
        })
    }

    return (
        <taskContext.Provider
            value={{
                tasksProject: state.tasksProject,
                errorTask: state.errorTask,
                selectTask: state.selectTask,
                getTasks,
                addTask,
                validatedTask,
                deleteTask,
                saveCurrentTask,
                updateTask,
                cleanTask
            }}
        >
            {props.children}
        </taskContext.Provider>
    )

}

export default TaskState;