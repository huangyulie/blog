import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button, Card, Form, Input, message, Select } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { reqCategory, reqId, reqUploadBlog } from '../../api/index';
import { connect } from 'react-redux';
import Md from '../addblog/textarea';
import Uploadimg from '../addblog/upload'
import '../addblog/Addblog.css'
import dayjs from 'dayjs'
const { Option } = Select;

function Addblog() {
  let [category, setCategory] = useState([]);
  let [detail, setDetail] = useState();
  let [blog, setBlog] = useState();
  let [html,setHtml] = useState();
  let [isLoading, setIsLoading] = useState(true);
  let b = useNavigate();
  let c = useLocation();
  let myRef = useRef();
  let { pathname } = c;
  pathname = pathname.split('/');
  pathname = pathname[pathname.length - 1].split('=');
  pathname = pathname[pathname.length - 1];

  const onFinish = async (values) => {
    let img = myRef.current.getImgArr();
    values.imgs = `/img/${img[0]}`;
    values.detail = detail;
    values.html = html;
    let value = {
      data: values,
      id: pathname
    }
    let a = await reqUploadBlog(value);
    if (a.status === 1) {
      message.success('修改成功');
      b(-1);
    }
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    message.warning('请检查输入是否合法！！!');
  };

  const onHtmlChanged = (h) => {
    setDetail(h);
  }

  useEffect(() => {
    data();
  }, [isLoading]);//eslint-disable-line


  const data = async () => {
    let req = await reqCategory();
    let { data } = req;
    let a = await reqId({ id: pathname });
    setBlog(a);
    setHtml(a.html);
    setCategory([...data]);
    setIsLoading(false);
    if (myRef.current) {
      if (blog) {
        myRef.current.getImg(a.imgs.substring(5, blog.length));
      }
    } else {
      message.success('稍等');
    }
  }

  const modelValue = (text)=>{
    setHtml(text);
  }
  return (
    <div>
      <Card title={
        <div>
          <Button onClick={() => { b(-1) }}><LeftOutlined />点击返回</Button>
          <span className='spanid'>修改博客</span>
        </div>
      }
        loading={isLoading}
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
              time: dayjs(+new Date()).format('YYYY-MM-DD'),
              name: blog ? blog.name : '服务器卡了',
              desc: blog ? blog.desc : '服务器卡了',
              categoryId: blog ? blog.categoryId : '服务器卡了'
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
              <Input placeholder='请输入博客名称' />
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
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              label="博客创造者"
              name="people"
            >
              <Input disabled={true} />
            </Form.Item>

            <Form.Item
              label="博客封面"
              name="imgs"
            >
              <Uploadimg ref={myRef} />
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
              <Select placeholder="请选择你的分类" >
                <Option value="">请选择分类</Option>
                {
                  category.map((obj) => {
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
              <Md onHtmlChanged={onHtmlChanged} modelValue={modelValue} md={html}/>
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