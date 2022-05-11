import React,{useState,useEffect,useRef} from 'react'
import { Card,Button,Table,Modal,Form, Input, message} from 'antd';
import {PlusOutlined,DropboxOutlined} from '@ant-design/icons';
import { reqCategory,reqAddCategory } from '../../api';

export default function Category() {
  // 芜湖

  let [category,setCategory] = useState([]);
  let ref = useRef(null);
  let formRef = useRef(null);
  let [isLoading,setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  let [opra,setOpra] = useState(false);


  useEffect(()=>{
    const test = async()=>{
      ref.current = await reqCategory();
      setIsLoading(false);
      let {data} = ref.current;
      data = data.reverse();
      setCategory(data);
    }
    test();
  },[])//eslint-disable-line

  const showAddModal = () => {
    setOpra('添加分类');
    setIsModalVisible(true);
  };
  const showChangeModal = (text) => {
    console.log(text);
    setOpra('修改分类');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // 检验
    formRef.current.validateFields()
    .then(async(data)=>{
      if(opra==='添加分类'){
        let add = await reqAddCategory(data);
        if(add==='该分类已存在'){
          message.error('该分类已存在');
          return;
        }else{
          message.success('添加成功');
          ref.current = [...category];
          ref.current.unshift(add);
          setCategory(ref.current);
          formRef.current.resetFields();
          setIsModalVisible(false);
        }
      }else{
        console.log('123123');
      }
      // formRef.current.resetFields();
      // setIsModalVisible(false);
    })
    .catch((err)=>{
      message.warning('表单输入有误,请重新输入');
      return new Promise(()=>{});
    })
  };

  const handleCancel = () => {
    formRef.current.resetFields();
    setIsModalVisible(false);
  };

  // 表格
  const dataSource = category;
  
  const columns = [
    {
      title: '类别',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '操作',
      dataIndex: 'name',
      key: 'opra',
      render:(text)=>{return <Button type='link' onClick={()=>{showChangeModal(text)}}>修改分类</Button>},
      width:'25%',
      align:'center',
    },
  ];
  // 
  return (
    <div>
      <Card extra={<Button onClick={showAddModal} type='primary'><PlusOutlined />添加</Button>} >
        <Table
         bordered={true}
          dataSource={dataSource} 
          columns={columns} 
          rowKey={'_id'}
          pagination={{pageSize:5}}
          loading={isLoading}
          />
      </Card>
      <Modal
        title={opra}
        visible={isModalVisible} 
        okText="确定"
        cancelText="取消"
        onOk={handleOk} 
        onCancel={handleCancel}>
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
            <Input prefix={<DropboxOutlined className="site-form-item-icon" />} placeholder="名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
    )
}
