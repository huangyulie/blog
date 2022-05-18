import React, { useRef, useEffect, useState } from 'react'
import { Card, Button, Table, Modal, Form, Input, message } from 'antd'
import { PlusOutlined, DropboxOutlined } from '@ant-design/icons'
import { reqAddrole, reqRolelist } from '../../api/index';
import { connect } from 'react-redux';

function Roles(props) {
  let [list, setList] = useState();

  useEffect(() => {
    data();
  }, [])

  const data = async () => {
    let data = await reqRolelist();
    setList(data.reverse());
    console.log(data);
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
      dataIndex: 'opra',
      key: 'opra',
      align: 'center',
      render: () => {
        return (<Button type='link'>设置权限</Button>)
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
      // let people = props.user.username
      let res = await reqAddrole({
        name: name,
      });
      if (res.status === 1) {
        let data1 = await reqRolelist();
        setList(data1.reverse());
        console.log(res);
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
    console.log('Clicked cancel button');
    setVisible(false);
    formRef.current.resetFields();
  };

  return (
    <div>
      <Card title={
        <div><Button onClick={showModal}><PlusOutlined />添加角色</Button></div>
      } >
        <Table bordered dataSource={dataSource} columns={columns} rowKey={'_id'} pagination={{ pageSize: 5, showQuickJumper: true }} />
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
    </div>
  )
}

export default connect(
  state => { return state.userInfo },
)(Roles)
