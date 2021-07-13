import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import alertContext from '../../context/alerts/alertContext';
import authContext from '../../context/authentication/authContext';

const Login = (props) => {

    // Extraer los valores de alerta context
    const alertsContext = useContext(alertContext);
    const { alert, showAlert } = alertsContext;
 
    // Valores del context de autenticación
    const authsContext = useContext(authContext);
    const { message, authenticate, signIn } = authsContext;

    // En caso de que el usuario o password no existan
    useEffect( () => {
        if(authenticate) {
            props.history.push('/projects');
        }
        if(message) {
            showAlert(message.msg, message.category);
        }
        
    }, [message, authenticate, showAlert, props.history] );
 
    // state para iniciar sesión
    const [ user, saveUser ] = useState({
        email: '',
        password: ''
    });

    // Extraer de usuario 
    const { email,  password } = user;

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
        if(email.trim() === '' || password.trim() === '') {
            showAlert('Todos los campos son obligatorios', 'alerta-error');
        }

        // Pasarlo al action
        signIn({ email, password })
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
                <h1>Iniciar Sesión</h1>

                <form
                    onSubmit={ onSubmit }
                >
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
                        <label htmlFor="Password">Contraseña</label>
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
                        <input 
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Iniciar Sesión"
                        />
                    </div>
                </form>

                <Link to={'/new-account'} className="enlace-cuenta">
                    Obtener Cuenta
                </Link> 
            </div>
        </div>
    );
}

export default Login;