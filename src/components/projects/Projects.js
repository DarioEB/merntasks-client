import React, { useContext, useEffect } from 'react';

import Sidebar from '../layout/Sidebar';
import Bar from '../layout/Bar';
import TaskForm from '../chores/TaskForm';
import TasksList from '../chores/TasksList';

// Context de autenticación
import authContext from '../../context/authentication/authContext';
const Projects = () => {
    // Extraer la información de autenticación
    const authsContext = useContext(authContext);
    const { authenticatedUser } = authsContext;

    useEffect( () => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);

    return(
        <div className="contenedor-app">
            <Sidebar 

            />

            <div className="seccion-principal">
                <Bar />

                <main>
                    <TaskForm />
                    <div className="contenedor-tareas">
                        <TasksList />
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Projects;