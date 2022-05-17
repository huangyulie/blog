import React,{useEffect, useState,useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Card, Form, Input ,message,Select} from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import {reqCategory,reqCommitBlog} from '../../api/index';
import { connect } from 'react-redux';
import Md from './textarea';
import Uploadimg from './upload'
import './Addblog.css'
import dayjs from 'dayjs'
const {Option} = Select; 

function Addblog() {
  let [category,setCategory] = useState([]);
  let [detail,setDetail] = useState();
  let b = useNavigate();
  let myRef = useRef();
  let [html,setHtml] = useState();
  const onFinish = async(values) => {
    let img = myRef.current.getImgArr();
    values.imgs = img[0];
    values.detail = detail;
    values.html = html;
    let a = await reqCommitBlog(values);
    if(a.status === 1){
      message.success('提交成功');
      b(-1);
    }
    console.log('Success:', values);

  };

  const onFinishFailed = (errorInfo) => {
    message.warning('请检查输入是否合法！！!');
  };

  const onHtmlChanged = (h)=>{
    setDetail(h);
  }

  const modelValue = (text)=>{
    setHtml(text);
  }

  useEffect(()=>{
    data();
  },[]);//eslint-disable-line

  const data = async()=>{
    let req = await reqCategory();
    let {data} = req;
    setCategory([...data]);
  }

  return (
    <div>
      <Card title={
        <div>
          <Button onClick={() => { b(-1) }}><LeftOutlined />点击返回</Button>
          <span className='spanid'>添加博客</span>
        </div>
      } 
      >
        <div>
          <Form
            name="basic"
            labelCol={{
              span: 2,
            }}
            wrapperCol={{
              span: 22,
            }}
            initialValues={{
              people: 'Miroku',
              time:dayjs(+new Date()).format('YYYY-MM-DD')
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="博客名称"
              name="name"
              rules={[
                {
                  required: true,
                  message: '请输入博客名称',
                }
              ]}
            >
              <Input placeholder='请输入博客名称'/>
            </Form.Item>

            <Form.Item
              label="博客描述"
              name="desc"
              rules={[
                {
                  required: true,
                  message: '请输入你的博客描述',
                },
              ]}
            >
              <Input placeholder='请输入博客描述'/>
            </Form.Item>

            <Form.Item
              label="博客时间"
              name="time"
            >
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item
              label="博客创造者"
              name="people"
            >
              <Input disabled={true}/>
            </Form.Item>

            <Form.Item
              label="博客封面"
              name="imgs"
            >
              <Uploadimg ref={myRef}/>
            </Form.Item>

            <Form.Item
              label="博客分类"
              name="categoryId"
              rules={[
                {
                  required: true,
                  message: '请输入你的博客描述',
                },
              ]}
            >
              <Select placeholder="请选择你的分类">
                 <Option value="">请选择分类</Option>
                 {/* <Option value="001">das</Option>
                 <Option value="002">cfasd</Option>
                 <Option value="003">大数</Option>
                 <Option value="004">二七万达</Option> */}
                 {
                   category.map((obj)=>{
                     return (<Option key={obj._id} value={obj._id}>{obj.name}</Option>)
                   })
                 }
              </Select>
            </Form.Item>
            {/* 博客详情 */}
            <Form.Item
              label="博客详情"
              name="detail"
            >
              <Md onHtmlChanged={onHtmlChanged} modelValue={modelValue} />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 2,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                提交添加
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  )
}

export default connect(

)(Addblog);