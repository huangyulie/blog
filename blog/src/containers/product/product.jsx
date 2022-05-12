import React,{useEffect, useState} from 'react'
import { Button, Card, Select, Input,Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {reqBlog} from '../../api/index'

const { Option } = Select;
export default function Product() {
  let [list,setList] = useState();
  let [total,setTotal] = useState();
  let [isLoading,setIsLoading] = useState(true);
  let [current,setCurrent] = useState(1);
  // 刚开始渲染的
  useEffect(()=>{  
      data();
  },[])

  const data = async(a=1)=>{
    let pagedata = await reqBlog({page:a,pagesize:4});
    let {status,data} = pagedata;
    if(status===1){
      let {pageNum,total,list} = data;
      setIsLoading(false);
      setList(list);
      setTotal(total);
      setCurrent(pageNum);
      }
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
      dataIndex: 'opera',
      key: 'opera',
      align:'center',
      width:'10%',
      render:()=>{
        return(
          <div>
              <Button type='link'>详情</Button>
              <br />
              <Button type='link'>修改</Button>
          </div>
        )
      }
    },
  ];
// 
  console.log(current);
  return (
    <div>
      <Card
        title={
          <div>
            <Select defaultValue="name">
              <Option value="name">按名称搜索</Option>
              <Option value="desc">按描述搜索</Option>
            </Select>
            <Input allowClear style={{ margin: "0px 25px", width: '20%' }} placeholder="请输入搜索关键字"></Input>
            <Button type="primary">搜索</Button>
            <span style={{float:"right",marginRight:'100px'}}>共计<b>{total}</b>篇博客</span>
          </div>
        }
        extra={<Button><PlusOutlined />添加博客</Button>}
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
