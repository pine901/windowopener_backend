import actions from '../UserLogs/actions';

const initialState = {
    userLogs: [],
    loader: false
}

function Reducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_ALL_USERLOGS:
            return { ...state, loader: true }
        case actions.GET_ALL_USERLOGS_SUCCESS:
            return {
                ...state,
                userLogs: action.payload.data,
                loader: false
            }
        case actions.GET_ALL_USERLOGS_FAILURE:
            return { ...state, loader: false }
        default:
            return state
    }
}

export default Reducer;
