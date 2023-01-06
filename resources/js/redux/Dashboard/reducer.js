import actions from '../Dashboard/actions';

const initialState = {
  logs: [],
  user: 0,
  device: 0,
  loader: false,
}

function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_DASHBOARD_DATA:
      return { ...state, loader: true }
    case actions.GET_DASHBOARD_DATA_SUCCESS:
      return {
        ...state,
        logs: action.payload.data.logs,
        user: action.payload.data.user,
        device: action.payload.data.device,
        loader: false,
      }
    case actions.GET_DASHBOARD_DATA_FAILURE:
      return { ...state, loader: false }
    default:
      return state
  }
}

export default Reducer;
