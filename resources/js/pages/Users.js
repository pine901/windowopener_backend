import { useEffect, useState, useRef } from 'react';
import { Input, Button, Card, Table, Space, Tooltip } from 'antd';
import {
  DeleteFilled,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons/lib/icons';
import Highlighter from 'react-highlight-words';
import UserModal from '../components/UserModal';
import { useDispatch, useSelector } from 'react-redux';
import actions from '../redux/User/actions';

function Users() {
  const dispatch = useDispatch();
  const [isUserModalVisible, setIsUserModalVisible] = useState(false);
  const { users } = useSelector((state) => state.userReducer);

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

  const addNewUser = (obj) => {
    setIsUserModalVisible(false);
    dispatch({
      type: actions.ADD_NEW_USER,
      payload: obj,
    });
  };

  const deleteUser = (id) => {
    dispatch({
      type: actions.DELETE_USER,
      payload: id,
    });
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

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      filters: [
        {
          text: 'admin',
          value: 'admin',
        },
        {
          text: 'customer',
          value: 'customer',
        },
      ],
      onFilter: (value, record) => record.role.startsWith(value),
      filterSearch: true,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => (
        <Space size="middle">
          <Tooltip title="Trash">
            <Button
              type="primary"
              danger
              shape="circle"
              onClick={() => deleteUser(record.id)}
              icon={<DeleteFilled />}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch({
      type: actions.GET_ALL_USERS,
    });
  }, []);

  return (
    <Card
      title="All Users"
      extra={
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => setIsUserModalVisible(true)}
        >
                    Add New User
        </Button>
      }
    >
      <UserModal
        isModalVisible={isUserModalVisible}
        handleOk={() => setIsUserModalVisible(false)}
        handleCancel={() => setIsUserModalVisible(false)}
        onSubmit={addNewUser}
      />
      <Table columns={columns} rowKey="id" dataSource={users}/>
    </Card>
  );
}

export default Users;
