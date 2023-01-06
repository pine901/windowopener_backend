import { all, call, put, takeLatest } from 'redux-saga/effects'
import actions from '../DeviceLogs/actions';
import { getCustomRequest, postRequest } from '../../config/axiosClient'

function* fetchAllDeviceLogs(action) {
  try {
    yield call(() => getCustomRequest('sanctum/csrf-cookie'));
    const response = yield call(() => postRequest('device-logs', action.payload));
    yield put({ type: actions.GET_ALL_DEVICELOGS_SUCCESS, payload: response.data });
  } catch (error) {
    yield put({ type: actions.GET_ALL_DEVICELOGS_FAILURE });
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actions.GET_ALL_DEVICELOGS, fetchAllDeviceLogs)]);
}
