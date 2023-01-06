import { useEffect, useState, useRef } from 'react';
import { Input, Button, Card, Table, Space, Tooltip } from 'antd';
import { DeleteFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons/lib/icons';
import Highlighter from 'react-highlight-words';
import DeviceModal from '../components/DeviceModal';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/Device/actions';

function Devices() {
  const dispatch = useDispatch();
  const [isDeviceModalVisible, setIsDeviceModalVisible] = useState(false);
  const { devices } = useSelector((state) => state.deviceReducer);

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, dataIndex)
          }
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys, confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
                        Search
          </Button>
          <Button
            onClick={() =>
              clearFilters && handleReset(clearFilters)
            }
            size="small"
            style={{
              width: 90,
            }}
          >
                        Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
                        Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1890ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      (searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      )),
  });

  const addNewDevice = (obj) => {
    setIsDeviceModalVisible(false);
    dispatch({
      type: actions.ADD_NEW_DEVICE,
      payload: obj,
    });
  }

  const deleteDevice = (id) => {
    dispatch({
      type: actions.DELETE_DEVICE,
      payload: id,
    });
  }

  const columns = [
    {
      title: 'Alias',
      dataIndex: 'alias',
      key: 'alias',
      ...getColumnSearchProps('alias'),
    },
    {
      title: 'DeviceID',
      dataIndex: 'device_address',
      key: 'device_address',
      ...getColumnSearchProps('device_address'),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type) => (type === 1 ? 'opener' : 'other'),
      filters: [
        {
          text: 'opener',
          value: 'opener',
        },
        {
          text: 'other',
          value: 'other',
        },
      ],
      onFilter: (value, record) => (record.type === 1 ? 'opener' : 'other').startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
      ...getColumnSearchProps('location'),
    },
    {
      title: 'IsAuto',
      dataIndex: 'is_auto',
      key: 'is_auto',
      filters: [
        {
          text: 'Yes',
          value: 'Yes',
        },
        {
          text: 'No',
          value: 'No',
        },
      ],
      onFilter: (value, record) => record.is_auto.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Low Temperature',
      dataIndex: 'low_temperature',
      key: 'low_temperature',
    },
    {
      title: 'High Temperature',
      dataIndex: 'high_temperature',
      key: 'high_temperature',
    },
    {
      title: 'Creator',
      dataIndex: 'creator',
      key: 'creator',
      ...getColumnSearchProps('creator'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: 'Connected',
          value: 'Connected',
        },
        {
          text: 'Disconnected',
          value: 'Disconnected',
        },
      ],
      onFilter: (value, record) => record.status.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Trash">
            <Button type="primary" danger shape="circle" onClick={() => deleteDevice(record.id)} icon={<DeleteFilled />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_DEVICES,
    });
  }, []);

  return (
    <Card title="All Devices" extra={<Button type="primary" icon={<PlusOutlined />} onClick={() => setIsDeviceModalVisible(true)}>Add New Device</Button>}>
      <DeviceModal
        isModalVisible={isDeviceModalVisible}
        handleOk={() => setIsDeviceModalVisible(false)}
        handleCancel={() => setIsDeviceModalVisible(false)}
        onSubmit={addNewDevice}
      />
      <Table columns={columns} rowKey="id" dataSource={devices} />
    </Card>
  );
}

export default Devices;
