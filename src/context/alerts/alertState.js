import React, { useReducer } from 'react';
import alertReducer from './alertReducer';
import alertContext from './alertContext';
import {
    SHOW_ALERT,
    HIDDEN_ALERT
} from '../../types';

const AlertState = props => {
    const initialState = {
        alert: null
    }

    const [ state, dispatch ] = useReducer(alertReducer, initialState);

    // Funciones
    const showAlert = (msg, category) => {
        dispatch({
            type: SHOW_ALERT,
            payload: {
                msg,
                category
            }
        });

        setTimeout(() => {
            dispatch({
                type: HIDDEN_ALERT
            })
        }, 5000);
    }

    return (
        <alertContext.Provider
            value={{
                alert: state.alert,
                showAlert
            }}
        >
            {props.children}
        </alertContext.Provider>
    )
}

export default AlertState;