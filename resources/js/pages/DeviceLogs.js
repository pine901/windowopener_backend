import { useEffect, useState } from 'react';
import { Input, Card, Table, DatePicker, Space, Button } from 'antd';
import moment from 'moment';
import { FilterOutlined } from '@ant-design/icons/lib/icons';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/DeviceLogs/actions';

const { RangePicker } = DatePicker;

function DeviceLogs() {
  const dispatch = useDispatch();
  const { deviceLogs } = useSelector((state) => state.deviceLogsReducer);
  const [filterData, setFilterData] = useState({
    alias: '',
    id: '',
    from: '',
    to: '',
  });

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

  const onFilter = () => {
    dispatch({
      type: actions.GET_ALL_DEVICELOGS,
      payload: filterData,
    });
  };

  const onChangeDatePicker = (range) => {
    if(range){
      const [start, end] = range;
      setFilterData({...filterData, from: start ? start.format('YYYY-MM-DD') : '', to: end ? end.format('YYYY-MM-DD') : ''});
    } else {
      setFilterData({...filterData, from: '', to:''});
    }
  }

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_DEVICELOGS,
      payload: filterData,
    });
  }, []);

  return (
    <Card title="Device Logs">
      <Space className="mb-2">
            Device Alias: <Input type="text" value={filterData.alias} onChange={(evt) => setFilterData({...filterData, alias: evt.target.value})}/>
            Device ID: <Input type="text" value={filterData.id} onChange={(evt) => setFilterData({...filterData, id: evt.target.value})}/>
            Date Range: <RangePicker onChange={onChangeDatePicker}/>
        <Button type="primary" icon={<FilterOutlined />} onClick={onFilter}>
            Filter
        </Button>
      </Space>
      <Table columns={columns} rowKey="id" dataSource={deviceLogs}/>
    </Card>
  );
}

export default DeviceLogs;
