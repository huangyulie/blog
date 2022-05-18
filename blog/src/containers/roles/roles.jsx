import React, { useRef, useEffect, useState } from 'react'
import { Card, Button, Table, Modal, Form, Input, message } from 'antd'
import { PlusOutlined, DropboxOutlined } from '@ant-design/icons'
import { reqAddrole, reqRolelist, reqRolepower } from '../../api/index';
import { connect } from 'react-redux';
import Tree from './Tree';
import { triggerFocus } from 'antd/lib/input/Input';

function Roles(props) {
  let [list, setList] = useState();
  let [id, setId] = useState();
  let [menu, setMenu] = useState();
  let [showMenu, setShowmenu] = useState([]);
  let [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    data();
  }, [])

  const data = async () => {
    let data = await reqRolelist();
    setIsloading(false);
    setList(data.reverse());
  }

  let formRef = useRef(null);
  const [visible, setVisible] = React.useState(false);
  const dataSource = list;

  const columns = [
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '授权时间',
      dataIndex: 'useTime',
      key: 'useTime',
    },
    {
      title: '授权人',
      dataIndex: 'people',
      key: 'people'
    },
    {
      title: '操作',
      // dataIndex: 'opra',
      key: 'opra',
      align: 'center',
      render: (item) => {
        return (<Button onClick={() => { showModaltree(item) }} type='link'>设置权限</Button>)
      }
    }
  ];

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = async () => {
    try {
      let data = await formRef.current.validateFields();
      let { name } = data;
      let res = await reqAddrole({
        name: name,
      });
      if (res.status === 1) {
        let data1 = await reqRolelist();
        setList(data1.reverse());
        message.success('添加成功');
        setVisible(false);
      } else {
        message.warning('存在该分类');
      }

    }
    catch (err) {
      message.warning('表单输入有误,请重新输入');
      return new Promise(() => { });
    }
    formRef.current.resetFields();
  };

  const handleCancel = () => {
    setVisible(false);
    formRef.current.resetFields();
  };

  // 树形菜单
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModaltree = (item) => {
    setId(item._id);
    setShowmenu([...item.menus]);
    setIsModalVisible(true);
  };

  const getMenu = (arr) => {
    setMenu([...arr])
  }

  const handleOktree = async () => {
    let name = props.user.username;
    let data = await reqRolepower({
      id, name, menu
    });
    console.log(data);
    let data1 = await reqRolelist();
    setList(data1.reverse());
    message.success('设置成功');
    setIsModalVisible(false);
  };

  const handleCanceltree = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Card title={
        <div><Button onClick={showModal}><PlusOutlined />添加角色</Button></div>
      } >
        <Table
          loading={isLoading}
          bordered dataSource={dataSource} columns={columns} rowKey={'_id'} pagination={{ pageSize: 5, showQuickJumper: true }} />
      </Card>
      <Modal
        title="添加角色"
        visible={visible}
        onOk={handleOk}
        okText="确认"
        cancelText="取消"
        onCancel={handleCancel}
      >
        <Form
          ref={formRef}
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: '输入不能为空!!!',
              },
            ]}
          >
            <Input prefix={<DropboxOutlined className="site-form-item-icon" />} placeholder={'名称'} />
          </Form.Item>
        </Form>
      </Modal>
      {/* 属性惨淡 */}
      <Modal
        title="设置权限"
        visible={isModalVisible}
        onOk={handleOktree}
        onCancel={handleCanceltree}
        cancelText="取消"
        okText="确认"
      >
        <Tree getMenu={getMenu} showMenu={showMenu}/>
      </Modal>
      {/* 结束 */}
    </div>
  )
}

export default connect(
  state => { return state.userInfo },
)(Roles)
