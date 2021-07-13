// Definimos los states que va a tener y la funciones con dispath
import React, { useReducer } from 'react';

import projectContext from './projectContext';
import projectReducer from './projectReducer';

// Importamos los types
import { 
    PROJECT_FORM, 
    GET_PROJECTS, 
    ADD_PROJECT,
    VALIDATED_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from '../../types';

// // Importamos uuid - asignador de ID
// import uuid from 'uuid/dist/v4';
// import { uuid } from 'uuidv4';

import axiosClient from '../../config/axios';

const ProjectState = props => {


    const initialState = {
        projects: [],
        newProject: false,
        errorForm: false,
        project: null,
        message: null
    }

    // Dispatch oara ejecutar las acciones
    const [state, dispatch] = useReducer(projectReducer, initialState);

    // Series de funciones para el CRUD
    const showForm = () => {
        dispatch({
            type: PROJECT_FORM
        })
    }

    // Obtener los proyectos
    const getProjects = async () => {
        try {
            const result = await axiosClient.get('/api/projects');
            
            dispatch({
                type: GET_PROJECTS,
                payload: result.data.projects // El payload siempre se asigna el valor que obtener por paramentro de la función
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    // Agregar nuevo proyecto
    const addProject = async project => {
        try {
            const result = await axiosClient.post('/api/projects', project);
            console.log(result);
            
            // Insertar el proyecto en el state

            dispatch({
                type: ADD_PROJECT,
                payload: result.data
            })
        } catch (error){
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })
        }
    }

    // Valida el formulario por errores
    const showError = () => {
        dispatch({
            type: VALIDATED_FORM
        })
    }

    // Selecciona el proyecto que el usuario dió click
    const currentProject = idProject => {
        dispatch({
            type: CURRENT_PROJECT,
            payload: idProject
        })
    }

    // Eliminar un proyecto
    const deleteProject = async idProject => {
        try {
            await axiosClient.delete(`/api/projects/${idProject}`);
            dispatch({
                type: DELETE_PROJECT,
                payload: idProject
            })
        } catch (error) {
            const alert = {
                msg: 'Hubo un error',
                category: 'alerta-error'
            }
            dispatch({
                type: PROJECT_ERROR,
                payload: alert
            })

        }
    }

    return (
        <projectContext.Provider
            value={{
                projects: state.projects,
                newProject: state.newProject,
                errorForm: state.errorForm,
                project: state.project,
                message: state.message,
                showForm,
                getProjects,
                addProject,
                showError,
                currentProject,
                deleteProject
            }}
        >
            {props.children}
        </projectContext.Provider>
    )
}

export default ProjectState;