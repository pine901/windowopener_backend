import { all, call, put, takeLatest } from 'redux-saga/effects'
import actions from '../Device/actions';
import { postRequest, getCustomRequest, getRequest, deleteRequest } from '../../config/axiosClient'
import { message } from 'antd';

function* addDevice(action) {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => postRequest('device', action.payload));
        yield put({ type: actions.ADD_DEVICE_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.ADD_DEVICE_FAILURE });
        if (error.response.status === 401) {
            message.error(error.response.data.message);
        } else {
            message.error('Something Went Wrong');
        }
    }
}

function* fetchAllDevices() {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => getRequest('devices'));
        yield put({ type: actions.GET_ALL_DEVICES_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.GET_ALL_DEVICES_FAILURE });
    }
}

function* deleteDevice(action) {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => deleteRequest('device/' + action.payload));
        yield put({ type: actions.DELETE_DEVICE_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.DELETE_DEVICE_FAILURE });
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GET_ALL_DEVICES, fetchAllDevices)]);
    yield all([takeLatest(actions.ADD_NEW_DEVICE, addDevice)]);
    yield all([takeLatest(actions.DELETE_DEVICE, deleteDevice)]);
}
