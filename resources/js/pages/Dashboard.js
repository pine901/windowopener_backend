import { useEffect } from 'react';
import { Card, Row, Col, Table } from 'antd';
import {
  UsergroupAddOutlined,
  WindowsOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/Dashboard/actions';

const { Meta } = Card;

function Dashboard() {
  const dispatch = useDispatch();
  const { logs, user, device } = useSelector((state) => state.dashboardReducer);

  console.log(logs, user, device)

  useEffect(() => {
    dispatch({
      type: actions.GET_DASHBOARD_DATA,
    });
  }, []);

  const columns = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Device Alias',
      dataIndex: 'alias',
      key: 'device_alias',
    },
    {
      title: 'DeviceID',
      dataIndex: 'device_address',
      key: 'device_address',
    },
    {
      title: 'Status',
      dataIndex: 'status_label',
      key: 'status_label',
    },
  ];
  return (
    <Card title = "Dashboard" bordered = { false } >
      <Row gutter={10}>
        <Col span={3}>
          <Card>
            <Meta
              avatar={<UsergroupAddOutlined />}
              title={user}
              description="Registered Users"
            />
          </Card>
        </Col>
        <Col span={3}>
          <Card>
            <Meta
              avatar={<WindowsOutlined />}
              title={device}
              description="Registered Devices"
            />
          </Card>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col span={24}>
          <Card title="Recent Device Logs">
            <Table columns={columns} rowKey="id" dataSource={logs}/>
          </Card>
        </Col>
      </Row>
    </Card>
  );
}

export default Dashboard;
