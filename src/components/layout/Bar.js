import React, { useEffect, useContext } from 'react';

import authContext from '../../context/authentication/authContext';
const Bar = () => {

    const authsContext = useContext(authContext);
    const { authenticatedUser, user, signOff } = authsContext;

    useEffect( () => {
        authenticatedUser();
        // eslint-disable-next-line
    }, []);

    return(
        <header className="app-header">
            {user ? 
            <p className="nombre-usuario">Hola <span>{user.username}</span></p>
            : null}
            
        
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={() => signOff() }
                >Cerrar Sesión</button>
            </nav>
        </header>
    );
}

export default Bar;