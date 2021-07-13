import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';

import {
    SUCCESSFUL_REGISTRATION,
    FAILED_REGISTRATION,
    GET_USER,
    SUCCESSFUL_LOGIN,
    FAILED_LOGIN,
    SIGN_OFF
} from '../../types';

import axiosClient from '../../config/axios';
import tokenAuth   from '../../config/tokenAuth';

const AuthState = props => {

    const initialState = {
        token: localStorage.getItem('token'),
        authenticate: null,
        user: null,
        message: null,
        loading: true
    }

    const [ state, dispatch ] = useReducer(authReducer, initialState);

    // Funciones
    const registerUser = async data => {
        try {
            const response = await axiosClient.post('/api/users', data);
            console.log(response);
            dispatch({
                type: SUCCESSFUL_REGISTRATION,
                payload: response.data
            });

            // Obtener el usuario
            authenticatedUser();
        } catch (error) {
            // console.log(error.response.data.msg);
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: FAILED_REGISTRATION,
                payload: alert
            })
        }
    }

    // Retorna el usuario autenticado
    const authenticatedUser = async () => {
        const token = localStorage.getItem('token');
        if(token) {
            // TODO: Función para enviar el token por headers
            tokenAuth(token);
        }

        try {
            const response = await axiosClient.get('/api/auth');
            dispatch({
                type: GET_USER,
                payload: response.data.user
            })
        } catch (error) {
            console.log(error);
            dispatch({
                type: FAILED_LOGIN
            })
        }
    }

    // Cuando el usuario inicia sesión
    const signIn = async data => {
        try {
            const response = await axiosClient.post('/api/auth', data);
            dispatch({
                type: SUCCESSFUL_LOGIN,
                payload: response.data
            });

            // Obtener el usuario autenticado
            authenticatedUser();
        } catch (error){
            const alert = {
                msg: error.response.data.msg,
                category: 'alerta-error'
            }
            dispatch({
                type: FAILED_LOGIN,
                payload: alert
            })
        }
    }

    // Cierra la sesión del usuario
    const signOff = () => {
        dispatch({
            type: SIGN_OFF
        })
    }

    return(
        <authContext.Provider
            value={{
                token: state.token,
                authenticate: state.authenticate,
                user: state.user,
                message: state.message,
                loading: state.loading,
                registerUser,
                signIn,
                authenticatedUser,
                signOff
            }}
        >
            {props.children}          
        </authContext.Provider>
    );
}

export default AuthState;