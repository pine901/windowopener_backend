import authenticateReducer from './Authenticate/reducer';
import userReducer from './User/reducer';
import deviceReducer from './Device/reducer';
import deviceLogsReducer from './DeviceLogs/reducer';
import userLogsReducer from './UserLogs/reducer';
import dashboardReducer from './Dashboard/reducer';

//Include all the reducer to combine and provide to configure store.
export default {
  authenticateReducer,
  userReducer,
  deviceReducer,
  deviceLogsReducer,
  userLogsReducer,
  dashboardReducer,
}
