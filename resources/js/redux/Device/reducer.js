import actions from '../Device/actions';

const initialState = {
    devices: [],
    loader: false
}

function Reducer(state = initialState, action) {
    switch (action.type) {
        case actions.GET_ALL_DEVICES:
            return { ...state, loader: true }
        case actions.GET_ALL_DEVICES_SUCCESS:
            return {
                ...state,
                devices: action.payload.data,
                loader: false
            }
        case actions.GET_ALL_DEVICES_FAILURE:
            return { ...state, loader: false }
        case actions.ADD_NEW_DEVICE:
            return { ...state, loader: true }
        case actions.ADD_DEVICE_SUCCESS:
            return {
                ...state,
                devices: [...state.devices, action.payload.data],
                loader: false
            }
        case actions.ADD_DEVICE_FAILURE:
            return { ...state, loader: false }
        case actions.DELETE_DEVICE:
            return { ...state, loader:true }
        case actions.DELETE_DEVICE_SUCCESS:
            return {
                ...state,
                devices: state.devices.filter((device) => device.id === action.payload.data),
                loader: false
            }
        case actions.DELETE_DEVICE_FAILURE:
            return { ...state, loader: false }
        default:
            return state
    }
}

export default Reducer;
