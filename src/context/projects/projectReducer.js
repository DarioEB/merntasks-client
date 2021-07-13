import { 
    PROJECT_FORM, 
    GET_PROJECTS, 
    ADD_PROJECT,
    VALIDATED_FORM,
    CURRENT_PROJECT,
    DELETE_PROJECT,
    PROJECT_ERROR
} from "../../types";
// eslint-disable-next-line
export default (state, action) => {
    switch(action.type) {
        case PROJECT_FORM:
            return {
                ...state,
                newProject: true
            }
        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }
        case ADD_PROJECT:
            return {
                ...state,
                projects: [...state.projects, action.payload ],
                newProject: false,
                errorForm: false
            }
        case VALIDATED_FORM:
            return {
                ...state,
                errorForm: true
            }
        case CURRENT_PROJECT:
            return {
                ...state,
                project: state.projects.filter(project => project._id === action.payload )
            }
        case DELETE_PROJECT:
            return {
                ...state,
                projects: state.projects.filter( project => project._id !== action.payload ),
                project: null
            }
        case PROJECT_ERROR:
            return {
                ...state,
                message: action.payload

            }
        default: 
            return state;
    }
}