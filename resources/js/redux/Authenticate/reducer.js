import actions from '../Authenticate/actions';

const initialState = {
    isAuthenticated: false,
    loader: false,
    email: null,
    name: null,
    role: null,
    validateUserLoader: true,
    logOutLoader: false,
    wrongOldPassword: false,
}

function Reducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_AUTH_USER:
            return { ...state, validateUserLoader: true }
        case actions.GET_AUTH_USER_SUCCESS:
            return {
                ...state,
                validateUserLoader: false,
                isAuthenticated: !!action.payload.data.email,
                email: action.payload.data.email,
                name: action.payload.data.name,
                role: action.payload.data.role,
            }
        case actions.GET_AUTH_USER_FAILURE:
            return {
                ...state,
                isAuthenticated: false,
                validateUserLoader: false,
                email: null,
                name: null,
                role: null
            }
        case actions.LOGIN:
            return { ...state, loader: true }
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                isAuthenticated: !!action.payload.data.email,
                loader: false,
                wrongOldPassword: false,
                email: action.payload.data.email,
                name: action.payload.data.name,
                role: action.payload.data.role,
            }
        case actions.LOGIN_FAILURE:
            return { ...state, isAuthenticated: false, loader: false }
        case actions.LOGOUT:
            return { ...state, logOutLoader: true }
        case actions.LOGOUT_SUCCESS:
            return { ...state, isAuthenticated: false, logOutLoader: false }
        case actions.LOGOUT_FAILURE:
            return { ...state, isAuthenticated: false, logOutLoader: false }
        case actions.REGISTER:
            return { ...state, registerLoader: true }
        case actions.REGISTER_SUCCESS:
            return {
                ...state,
                isAuthenticated: !!action.payload.data.email,
                registerLoader: false,
                email: action.payload.data.email,
                name: action.payload.data.name,
                role: action.payload.data.role,
            }
        case actions.REGISTER_FAILURE:
            return { ...state, isAuthenticated: false, registerLoader: false }
        case actions.UPDATE_PROFILE:
            return { ...state }
        case actions.UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                name: action.payload.data.name,
            }
        case actions.UPDATE_PROFILE_FAILURE:
            return { ...state }
        case actions.DELETE_ACCOUNT:
            return { ...state, logOutLoader: true }
        case actions.DELETE_ACCOUNT_SUCCESS:
            return { ...state, isAuthenticated: false, logOutLoader: false }
        case actions.DELETE_ACCOUNT_FAILURE:
            return { ...state, isAuthenticated: false, logOutLoader: false }
        case actions.CHANGE_PASSWORD:
            return { ...state, logOutLoader: true }
        case actions.CHANGE_PASSWORD_SUCCESS:
            return { ...state, isAuthenticated: false, logOutLoader: false }
        case actions.CHANGE_PASSWORD_ACCESS_FAILURE:
            return { ...state, wrongOldPassword: true }
        case actions.CHANGE_PASSWORD_FAILURE:
            return { ...state }
        default:
            return state
    }
}

export default Reducer;
