import actions from '../User/actions';

const initialState = {
    users: [],
    loader: false
}

function Reducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_ALL_USERS:
            return { ...state, loader: true }
        case actions.GET_ALL_USERS_SUCCESS:
            return {
                ...state,
                users: action.payload.data,
                loader: false
            }
        case actions.GET_ALL_USERS_FAILURE:
            return { ...state, loader: false }
        case actions.ADD_NEW_USER:
            return { ...state, loader: true }
        case actions.ADD_USER_SUCCESS:
            return {
                ...state,
                users: [...state.users, action.payload.data],
                loader: false
            }
        case actions.ADD_USER_FAILURE:
            return { ...state, loader: false }
        case actions.DELETE_USER:
            return { ...state, loader:true }
        case actions.DELETE_USER_SUCCESS:
            return {
                users: [...state.users.filter((user) => user.id !== action.payload.data)],
                loader: false
            }
        case actions.DELETE_USER_FAILURE:
            return { ...state, loader: false }
        default:
            return state
    }
}

export default Reducer;
