import { all, call, put, takeLatest } from 'redux-saga/effects'
import actions from '../Dashboard/actions';
import { getCustomRequest, getRequest } from '../../config/axiosClient'

function* fetchAllDashboard() {
  try {
    yield call(() => getCustomRequest('sanctum/csrf-cookie'));
    const response = yield call(() => getRequest('dashboard'));
    yield put({ type: actions.GET_DASHBOARD_DATA_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: actions.GET_DASHBOARD_DATA_FAILURE });
  }
}
export default function* rootSaga() {
  yield all([takeLatest(actions.GET_DASHBOARD_DATA, fetchAllDashboard)]);
}
