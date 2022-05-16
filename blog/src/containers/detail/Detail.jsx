import React,{useEffect,useState} from 'react'
import {useNavigate,useLocation} from 'react-router-dom'
import {Button,Card, List } from 'antd'
import { reqCateid } from '../../api';
import {LeftOutlined} from '@ant-design/icons'
import 'md-editor-rt/lib/style.css';
import Item from 'antd/lib/list/Item';
import './detail.css';
import {connect} from 'react-redux'

function Detail(props) {
    let [idName,setIdname] = useState(); 
    let [isLoading,setIsLoading] = useState(true);
    let b = useNavigate();
    let c = useLocation();
    // 存储当前列表的状态
    let [blog,setBlog] = useState({
      name:'',
      desc:'',
      time:'',
      people:'',
      detail:'',
    });

    useEffect(()=>{
      data();
    },[blog,idName])//eslint-disable-line
    
    const data = async()=>{
      let {pathname} = c;
      pathname = pathname.split('/');
      pathname = pathname[pathname.length-1].split('=');
      let {blogInfo} = props;
      // 存储在状态里获取
      let a = blogInfo.find((obj)=>{
        return obj._id === pathname[pathname.length-1];
      })
      setBlog(a);
      let b = await reqCateid({id:blog.categoryId})
      setIdname(b.name);
      setIsLoading(false);
      // let a = await reqId({id:pathname[pathname.length-1]});
    }

    
  return (
    <div>
        <Card title={
          <div className="top">
              <Button onClick={()=>{b(-1)}}><LeftOutlined />返回</Button>
              <span style={{fontSize:'20px',marginLeft:'20px'}}>博客详情</span>
          </div>
        } >
           <List loading = {isLoading}>
              <Item className='item'>
                  <span className='itemspan'>博客名称:</span>
                  <span className='itemdiv'>{blog.name}</span>
              </Item>
              <Item>
                  <span className='itemspan'>博客描述:</span>
                  <span className='itemdiv'>{blog.desc}</span>
              </Item>
              <Item>
                  <span className='itemspan'>博客时间:</span>
                  <span className='itemdiv'>{blog.time}</span>
              </Item>
              <Item>
                  <span className='itemspan'>博客创造者:</span>
                  <span className='itemdiv'>{blog.people}</span>
              </Item>
              <Item>
                  <span className='itemspan'>博客封面:</span>
                  <span className='itemdiv'>
                      <img src={blog.imgs}  alt="无封面"/>
                  </span>
              </Item>
              <Item>
                  <span className='itemspan'>博客分类:</span>
                  <span className='itemdiv'>{idName}</span>
              </Item>
              <Item>
                  <span className='itemspan'>博客详情:</span>
                  <div id='md-editor-rt-preview' dangerouslySetInnerHTML={{__html:blog.detail}} className='md-preview default-theme'></div>
              </Item>
          </List>
        </Card>
        
    </div>
  )
}

export default connect(
  state=>{return {blogInfo:state.blogInfo}},
  {

  }
)(Detail);