import { all } from 'redux-saga/effects';
import authenticateSaga from './Authenticate/apiSaga';
import userSaga from './User/apiSaga';
import deviceSaga from './Device/apiSaga';
import deviceLogsSaga from './deviceLogs/apiSaga';
import userLogsSaga from './UserLogs/apiSaga';
import dashboardSaga from './Dashboard/apiSaga';

// Here you can include all the saga which you write for components
export default function* rootSaga(){
  yield all([
    authenticateSaga(),
    userSaga(),
    deviceSaga(),
    userLogsSaga(),
    deviceLogsSaga(),
    dashboardSaga(),
  ]);
}
