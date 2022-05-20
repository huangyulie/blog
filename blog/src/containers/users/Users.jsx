import React, { useEffect, useState, useRef } from 'react'
import { Card, Button, Table, Modal, Form, Input, Select, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import {reqDeleteUser, reqUserlist, reqRolelist, reqUploaduser, reqAddUser, reqSearchuser } from '../../api/index';
import dayjs from 'dayjs'
const { Option } = Select;

export default function Users() {
  const [userList, setUserlist] = useState([]);
  const [roleList, setRolelist] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [user, setUser] = useState({});
  const [isModalVisiblecheck, setIsModalVisiblecheck] = useState(false);
  const [userId, setUserid] = useState();
  const [itemId, setItemid] = useState();
  let formRef = useRef();

  useEffect(() => {
    data();
  }, []);
  // 
  useEffect(() => {
    h();
  }, [user]);//eslint-disable-line

  const h = async () => {
    try {
      await formRef.current.setFieldsValue(
        {
          username: user.username,
          email: user.email,
          phone: user.phone,
          role: user.role
        });

    } catch (err) {
      message.warning('稍等一下');
      return new Promise(() => { });
    }
  }

  const showModalcheck = async (item) => {
    let data = await reqSearchuser(item);
    setUserid(data._id);
    setUser(data);
    setIsModalVisiblecheck(true);
  };

  const handleOkcheck = async () => {
    try {
      let data = await formRef.current.validateFields();
      let res = await reqUploaduser({ id: userId, data: data });
      console.log(res);
      setIsModalVisiblecheck(false);
      formRef.current.resetFields();
      message.success('添加成功');
      let data1 = await reqUserlist();
      setUserlist(data1.reverse());
    } catch (err) {
      message.error('提交失败');
      return new Promise(() => { });
    }
  };

  const handleCancelcheck = () => {
    setIsModalVisiblecheck(false);
  };
  // 
  //删除
  const [isModalVisibledelete, setIsModalVisibledelete] = useState(false);

  const handleOkdelete = async () => {
    try {
      console.log(itemId);
      let data = await reqDeleteUser({id:itemId});
      console.log(data);
      message.success('删除成功');
      let data1 = await reqUserlist();
      setUserlist(data1.reverse());
      setIsModalVisibledelete(false);
    } catch (err) {
      message.warning("删除失败");
      return new Promise(() => { });
    }
  };

  const handleCanceldelete = () => {
    setIsModalVisibledelete(false);
  };
  const deleteModal = (item) => {
    setIsModalVisibledelete(true);
    setItemid(item._id)
  }
  // 

  const data = async () => {
    let data = await reqUserlist();
    let res = await reqRolelist();
    setRolelist(res);
    setUserlist(data.reverse());
    setIsloading(false);
  }

  const dataSource = userList;

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '注册时间',
      dataIndex: 'create_time',
      key: 'create_time',
      render: (item) => {
        return dayjs(item).format('YYYY年MM月DD日HH:mm:ss');
      }
    },
    {
      title: '所属角色',
      dataIndex: 'role',
      key: 'role',
    },
    {
      align: 'center',
      title: '操作',
      key: 'opra',
      render: (item) => {
        return (
          <div>
            <Button type='link' onClick={() => showModalcheck(item)}>修改</Button>
            <Button type='link' onClick={() => deleteModal(item)}>删除</Button>
          </div>
        )
      }
    }
  ];
  // 
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      let data = await formRef.current.validateFields();
      let res = await reqAddUser(data);
      console.log(res);
      setIsModalVisible(false);
      formRef.current.resetFields();
      message.success('添加成功');
      let data1 = await reqUserlist();
      setUserlist(data1.reverse());
    } catch (err) {
      message.error('提交失败');
      return new Promise(() => { });
    }
  };

  const handleCancel = () => {
    formRef.current.resetFields();
    setIsModalVisible(false);
  };
  // 
  //
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  //

  return (
    <div>
      <Card title={
        <div>
          <Button onClick={showModal}><PlusOutlined />添加用户</Button>
        </div>
      }>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          rowKey={'_id'}
          pagination={{ pageSize: 5, showQuickJumper: true }}
          loading={isLoading}
        />
      </Card>
      <Modal
        title="添加用户"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form
          ref={formRef}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="电话"
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入电话',
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="角色"
            name="role"
            rules={[
              {
                required: true,
                message: '请选择角色',
              },
            ]}
          >
            <Select placeholder="请选择角色">
              <Option>请选择角色</Option>
              {
                roleList.map((obj) => {
                  return (
                    <Option key={obj._id} value={obj.name}>{obj.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="修改用户"
        visible={isModalVisiblecheck}
        onOk={handleOkcheck}
        onCancel={handleCancelcheck}
        okText="确认"
        cancelText="取消"
      >
        <Form
          ref={formRef}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: '请输入用户名',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: '请输入密码',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: '请输入邮箱',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="电话"
            name="phone"
            rules={[
              {
                required: true,
                message: '请输入电话',
              },
            ]}
          >
            <Input />
          </Form.Item>


          <Form.Item
            label="角色"
            name="role"
            rules={[
              {
                required: true,
                message: '请选择角色',
              },
            ]}
          >
            <Select placeholder="请选择角色">
              <Option>请选择角色</Option>
              {
                roleList.map((obj) => {
                  return (
                    <Option key={obj._id} value={obj.name}>{obj.name}</Option>
                  )
                })
              }
            </Select>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="删除用户"
        visible={isModalVisibledelete}
        onOk={handleOkdelete}
        onCancel={handleCanceldelete}
        okText="确认"
        cancelText="取消"
      >
        <div>你确认删除该用户吗?</div>
      </Modal>
    </div>
  )
}
