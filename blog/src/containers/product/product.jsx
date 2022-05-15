import React,{useEffect, useState} from 'react'
import { Button, Card, Select, Input,Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqBlog,reqSearchBlog} from '../../api/index'
import {useNavigate} from 'react-router-dom'
import {connect} from 'react-redux';
import {createSaveBlogAction} from '../../redux/actions/blog_action'

const { Option } = Select;


function Product(props) {
  let [list,setList] = useState();
  let [total,setTotal] = useState();//total总共的东西
  let [isLoading,setIsLoading] = useState(true);
  let [current,setCurrent] = useState(1);
  let [keyWord,setKeyword] = useState();//关键字
  let [keyCategory,setKeycategory] = useState('name');
  let [isSearch,setIsSearch] = useState(false);
  // 刚开始渲染的
  useEffect(()=>{  
      data();
  },[])//eslint-disable-line

  const data = async(a=1)=>{
    let pagedata;
    if(isSearch === false){
      pagedata = await reqBlog({page:a,pagesize:5});
    }else{
      pagedata = await reqSearchBlog({page:a,pagesize:5,value:keyWord,name:keyCategory});
    }
    let {status,data} = pagedata;
    if(status===1){
      let {pageNum,total} = data;
      setIsLoading(false);
      setList(data.list);
      setTotal(total);
      setCurrent(pageNum);
      }
      props.saveBlog(data.list);
  }

  const search = async()=>{
    setIsSearch(true) 
    data();
  }
// 
  const dataSource = list;

  const columns = [
    {
      title: '博客名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '博客描述',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      align:'center',
      width:'10%'
    },
    {
      title: '创作人',
      dataIndex: 'people',
      key: 'people',
      align:'center',
      width:'10%'
    },
    {
      title: '操作',
      key: 'opera',
      align:'center',
      width:'10%',
      render:(item)=>{
        return(
          <div>
              <Button type='link' onClick={()=>{jump1(item)}}>详情</Button>
              <br />
              <Button type='link' onClick={()=>{jump2(item)}}>修改</Button>
          </div>
        )
      }
    },
  ];
// 
  const demo = (event)=>{
    setKeyword(event.target.value)
  }
  const demo1 = (value)=>{
    setKeycategory(value);
  }
  const navigate = useNavigate();
  let jump1 = (item)=>{
    navigate(`detail/id=${item._id}`);
  }
  let jump2 = (item)=>{
    navigate(`update/id=${item._id}`);
  }
  let addblog = ()=>{
    navigate(`addblog`);
  }
  return (
    <div>
      <Card
        title={
          <div>
            <Select defaultValue="name" onChange={demo1}>
              <Option value="name">按名称搜索</Option>
              <Option value="desc">按描述搜索</Option>
            </Select>
            <Input onChange={demo} allowClear style={{ margin: "0px 25px", width: '20%' }} placeholder="请输入搜索关键字"></Input>
            <Button type="primary" onClick={search}>搜索</Button>
            <span style={{float:"right",marginRight:'100px'}}>共计<b>{total}</b>篇博客</span>
          </div>
        }
        extra={<Button onClick={addblog}><PlusOutlined />添加博客</Button>}
      >
        <Table
          loading={isLoading}
          dataSource={dataSource} 
          columns={columns} 
          bordered
          pagination={
            {
              pageSize:5,
              showQuickJumper:true,
              total,
              current:current,
              onChange:data,
            }
          }
          rowKey={"_id"}
        />
      </Card>
    </div>
  )
}

export default connect(
      state=>{return {}},
      {
        saveBlog:createSaveBlogAction,
      }
)(Product);