import { all, call, put, takeLatest } from 'redux-saga/effects'
import actions from '../User/actions';
import { postRequest, getCustomRequest, getRequest, deleteRequest } from '../../config/axiosClient'
import { message } from 'antd';

function* addUser(action) {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => postRequest('user', action.payload));
        yield put({ type: actions.ADD_USER_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.ADD_USER_FAILURE });
        if (error.response.status === 401) {
            message.error(error.response.data.message);
        } else {
            message.error('Something Went Wrong');
        }
    }
}

function* fetchAllUsers() {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => getRequest('users'));
        yield put({ type: actions.GET_ALL_USERS_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.GET_ALL_USERS_FAILURE });
    }
}

function* deleteUser(action) {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => deleteRequest('user/' + action.payload));
        yield put({ type: actions.DELETE_USER_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.DELETE_USER_FAILURE });
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.GET_ALL_USERS, fetchAllUsers)]);
    yield all([takeLatest(actions.ADD_NEW_USER, addUser)]);
    yield all([takeLatest(actions.DELETE_USER, deleteUser)]);
}
