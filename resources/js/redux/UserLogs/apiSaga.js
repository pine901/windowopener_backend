import { all, call, put, takeLatest } from 'redux-saga/effects'
import actions from '../UserLogs/actions';
import { getCustomRequest, getRequest } from '../../config/axiosClient'

function* fetchAllUserLogs() {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => getRequest('user-logs'));
        yield put({ type: actions.GET_ALL_USERLOGS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.GET_ALL_USERLOGS_FAILURE });
    }
}
export default function* rootSaga() {
    yield all([takeLatest(actions.GET_ALL_USERLOGS, fetchAllUserLogs)]);
}
