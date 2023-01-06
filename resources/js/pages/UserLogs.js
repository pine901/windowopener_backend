import { useEffect } from 'react';
import { Button, Card, Table, Space, Tooltip } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/UserLogs/actions';

function UserLogs() {
  const dispatch = useDispatch();
  const { userLogs } = useSelector((state) => state.userLogsReducer);

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date & Time',
      dataIndex: 'created_at',
      render: (created_at) =>
        moment(created_at).format('YYYY-MM-DD h:m:s'),
      key: 'created_at',
    },
    {
      title: 'Email',
      dataIndex: 'user',
      render: (user) => user.email,
      key: 'user',
    },
    {
      title: 'IP Address',
      dataIndex: 'ip',
      key: 'ip',
    },
  ];

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_USERLOGS,
    });
  }, []);

  return (
    <Card title="User Logs">
      <Table
        columns={columns}
        rowKey="id"
        dataSource={userLogs}
        loading={userLogs ? false : true}
      />
    </Card>
  );
}

export default UserLogs;
