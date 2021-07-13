import React, { Fragment, useState, useContext} from 'react';

import projectContext from '../../context/projects/projectContext';

const NewProject = () => {

    // Obtenemos el state del formulario
    const projectsContext = useContext( projectContext );
    const { newProject, errorForm, addProject, showError, showForm } = projectsContext; // Obtener el valor del state del context

    //  State para Proyecto
    const [ project, saveProject ] = useState({
        name: ''
    });

    const {name} = project; // Destructurings

    const onChangeProject = e => { // Contenido del input
        saveProject({
            ...project,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitProject = e => { // Submit del formulario del proyecto
        e.preventDefault();

        // Validar el Proyecto
        if( name === '' ) {
            showError();
            return;
        }

        // Agregar al state
        addProject(project);

        // Reiniciar el formulario
        saveProject({
            name: ''
        })
    }

    const onClickForm = () => {
        showForm();
    }

    return(
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={ onClickForm }
            >Nuevo Proyecto</button>

            {
                newProject 
                ?
                    (
                        <form
                            className="formulario-nuevo-proyecto"
                            onSubmit={onSubmitProject}
                        >
                            <input 
                                type="text"
                                className="input-text"
                                placeholder="Nombre Proyecto"
                                name="name"
                                value={name}
                                onChange={onChangeProject}
                            />

                            <input 
                                type="submit"
                                className="btn btn-primario btn-block"
                                value="Agregar Proyecto"
                            />

                        </form>
                    ) 
                :   null
            }

            { 
                errorForm 
                ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p>
                : null
            }
        </Fragment>
    );
}

export default NewProject;