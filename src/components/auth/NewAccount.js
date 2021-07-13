import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/authentication/authContext';
const NewAccount = (props) => {

    // Extraer los valores de alerta context
    const alertsContext = useContext(alertContext);
    const { alert, showAlert } = alertsContext;

    // Valores del context de autenticación
    const authsContext = useContext(authContext);
    const { message, authenticate, registerUser } = authsContext;

    // En case de que el usuario se haya autenticado o registrado o sea un registro no valido
    useEffect(() => {
        if(authenticate) {
            props.history.push('/projects');
        }
        if(message) {
            showAlert(message.msg, message.category);
        }
        
    }, [message, authenticate, showAlert, props.history])

    // state para iniciar sesión
    const [ user, saveUser ] = useState({
        username: '',
        email: '',
        password: '',
        confirm: ''
    });

    // Extraer de usuario 
    const { username, email,  password, confirm } = user;

    const onChange = e => {
        saveUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    // Cuando el usuario quiere iniciar sesion
    const onSubmit = e => {
        e.preventDefault();

        // Validar que no haya campos vacios
        if(username.trim() === '' || 
            email.trim() === '' || 
            password.trim() === '' || 
            confirm.trim() === ''
        ) {
            showAlert('Todos los campos son obligatorio', 'alerta-error');
            return;
        }

        // Password minimo de 6 caracteres
        if(password.length < 6 ) {
            showAlert('La contraseña debe ser de al menos 6 caracteres', 'alerta-error');
            return;
        }

        // Los 2 password son iguales    
        if(password !== confirm) {
            showAlert('Las contraseñas no son coinciden', 'alerta-error');
            return;
        }

        // Pasarlo al action
        registerUser({
            username,
            email,
            password
        })
    }

    return(
        <div className="form-usuario">
            { alert 
            ? 
            ( 
                <div className={`alerta ${alert.category}`}>
                    {alert.msg}
                </div>
            ) 
            : null}
            <div className="contenedor-form sombra-dark">
                <h1>Obtener una Cuenta</h1>

                <form
                    onSubmit={ onSubmit }
                >
                    <div className="campo-form">
                        <label htmlFor="username">Nombre de Usuario</label>
                        <input 
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Tu nombre de usuario"
                            onChange={ onChange }
                            value={username}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Tu Email"
                            onChange={ onChange }
                            value={email}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="password">Contraseña</label>
                        <input 
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu Contraseña"
                            onChange={ onChange }
                            value={password}
                        />
                    </div>

                    <div className="campo-form">
                        <label htmlFor="confirm">Confirmar Contraseña</label>
                        <input 
                            type="password"
                            id="confirm"
                            name="confirm"
                            placeholder="Repite tu contraseña"
                            onChange={ onChange }
                            value={confirm}
                        />
                    </div>

                    <div className="campo-form">
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Registrarme"
                        />
                    </div>
                </form>

                <Link to={'/login'} className="enlace-cuenta">
                    Volver a Iniciar Sesión
                </Link> 
            </div>
        </div>
    );
}

export default NewAccount;