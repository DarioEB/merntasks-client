import {
    SUCCESSFUL_REGISTRATION,
    FAILED_REGISTRATION,
    GET_USER,
    SUCCESSFUL_LOGIN,
    FAILED_LOGIN,
    SIGN_OFF
} from '../../types';
// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case SUCCESSFUL_REGISTRATION:
        case SUCCESSFUL_LOGIN:
            localStorage.setItem('token', action.payload.token)
            
            return {
                ...state,
                authenticate: true,
                message: null,
                loading: false
            }
        case SIGN_OFF:
        case FAILED_LOGIN:
        case FAILED_REGISTRATION:
            localStorage.removeItem('token'); 
            return {
                ...state,
                token: null,
                user: null,
                authenticate: false,
                message: action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                authenticate: true,
                user: action.payload,
                loading: false
                
            }
        default:
            return state;
    }
}