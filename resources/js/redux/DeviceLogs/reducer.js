import actions from '../DeviceLogs/actions';

const initialState = {
    deviceLogs: [],
    loader: false
}

function Reducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_ALL_DEVICELOGS:
            return { ...state, loader: true }
        case actions.GET_ALL_DEVICELOGS_SUCCESS:
            return {
                ...state,
                deviceLogs: action.payload.data,
                loader: false
            }
        case actions.GET_ALL_DEVICELOGS_FAILURE:
            return { ...state, loader: false }
        default:
            return state
    }
}

export default Reducer;
