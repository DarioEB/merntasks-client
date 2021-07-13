import {
    TASKS_PROJECT,
    ADD_TASK,
    VALIDATED_TASK,
    DELETE_TASK,
    CURRENT_TASK,
    UPDATE_TASK,
    CLEAN_TASK
} from '../../types';
// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case TASKS_PROJECT:
            return {
                ...state,
                tasksProject: action.payload
            }
        case ADD_TASK:
            return {
                ...state,
                tasksProject: [action.payload, ...state.tasksProject],
                errorTask: false
            }
        case VALIDATED_TASK:
            return {
                ...state,
                errorTask: true
            }
        case DELETE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.filter( task => task._id !== action.payload )
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasksProject: state.tasksProject.map( task => task._id === action.payload._id ? action.payload : task)
            }
        case CURRENT_TASK:
            return {
                ...state,
                selectTask: action.payload
            }
        case CLEAN_TASK:
            return {
                ...state,
                selectTask: null
            }
        default:
            return state;
    }
}