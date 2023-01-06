import { all, call, put, takeLatest } from 'redux-saga/effects'
import actions from '../Authenticate/actions';
import { postRequest, getCustomRequest, getRequest, deleteRequest } from '../../config/axiosClient'
import { message, notification } from 'antd';

function* login(action) {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => postRequest('login', action.payload));
        yield put({ type: actions.LOGIN_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.LOGIN_FAILURE });
        if (error.response.status === 401) {
            message.error(error.response.data.message);
        }else {
            message.error('Something Went Wrong');
        }
    }
}

function* register(action) {
    try {
        const response = yield call(() => postRequest('register', action.payload));
        yield put({ type: actions.REGISTER_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.REGISTER_FAILURE });
        if (error.response.status === 422) {
            notification.warning({
                duration: 8,
                message: error.response.data.message,
                description: <ul>{Object.keys(error.response.data.errors).map((e) => <li>{error.response.data.errors[e][0]}</li>)}</ul>
            });
        } else {
            message.error('Something Went Wrong');
        }
    }
}

function* getAuthUser() {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => getRequest('auth/user'));
        yield put({ type: actions.GET_AUTH_USER_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.GET_AUTH_USER_FAILURE });
    }
}

function* logout() {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        yield call(() => deleteRequest('logout'));
        yield put({ type: actions.LOGOUT_SUCCESS });
    } catch (e) {
        yield put({ type: actions.LOGOUT_FAILURE });
    }
}

function* deleteAccount() {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => getRequest('account/close'));
        yield put({ type: actions.DELETE_ACCOUNT_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.DELETE_ACCOUNT_FAILURE });
    }
}

function* updateProfile(action) {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => postRequest('account/update', action.payload));
        yield put({ type: actions.UPDATE_PROFILE_SUCCESS, payload: response.data });
    } catch (error) {
        yield put({ type: actions.UPDATE_PROFILE_FAILURE });
    }
}

function* changePassword(action) {
    try {
        yield call(() => getCustomRequest('sanctum/csrf-cookie'));
        const response = yield call(() => postRequest('account/change-password', action.payload));
        yield put({ type: actions.CHANGE_PASSWORD_SUCCESS, payload: response.data });        
    } catch (error) {
        if(error.response.status === 403){
            yield put({ type: actions.CHANGE_PASSWORD_ACCESS_FAILURE });
        }else{
            yield put({ type: actions.CHANGE_PASSWORD_FAILURE });
        }
    }
}

export default function* rootSaga() {
    yield all([takeLatest(actions.LOGIN, login)]);
    yield all([takeLatest(actions.GET_AUTH_USER, getAuthUser)]);
    yield all([takeLatest(actions.LOGOUT, logout)]);
    yield all([takeLatest(actions.REGISTER, register)]);
    yield all([takeLatest(actions.DELETE_ACCOUNT, deleteAccount)]);
    yield all([takeLatest(actions.UPDATE_PROFILE, updateProfile)]);
    yield all([takeLatest(actions.CHANGE_PASSWORD, changePassword)]);
}
