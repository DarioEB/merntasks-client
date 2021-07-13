import React, { useContext, useEffect } from 'react';

import Project from './Project';
import projectContext from '../../context/projects/projectContext';

// Paquetes extraido de react-transition-
import alertContext from '../../context/alerts/alertContext';
const ProjectList = () => {

    // Extrae los proyectos del Context ( state inicial )
    const projectsContext = useContext(projectContext);
    const { projects, getProjects, message } = projectsContext;

    const alertsContext = useContext(alertContext);
    const { alert, showAlert } = alertsContext;

    // obtener proyectos cuando carga el componente
    useEffect( () => {
        if(message) {
            // Si hay un error recibe el state de mensaje
            showAlert(message.msg, message.category);
        }
        getProjects();
        // eslint-disable-next-line
    }, [message, showAlert])
    
    // Revisar el array del proyecto contiene elementos
    if(projects.length === 0) return <p> No hay proyectos, comienza creando uno</p>;


    return(
        <ul className="listado-proyectos">
            {alert 
            ? (
                <div className={`alerta ${alert.category}`}>{alert.msg}</div>
            )
            :null}

                {projects.map( project => (
                    (project)
                    ?
                        <Project 
                            key={project._id}
                            project={project}
                        />
                    : null
                    
                ))}
            
        </ul>
        
    );
}

export default ProjectList;