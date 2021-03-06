import { Modal,Button, message } from 'antd'
import React,{useState,useEffect,useRef}  from 'react'
import './css/header.css'
import { FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import screenfull from 'screenfull';
import {connect} from 'react-redux'
import {createDeleteUserInfo} from '../../../redux/actions/login_action';
import dayjs from 'dayjs';
import { reqWheater } from '../../../api';
import W from './img/00.png';
import {useLocation} from 'react-router-dom';


function Header(props) {
  let [isFull,setIsfull] = useState(false);
  let [date,setDate] = useState(dayjs().format('YYYY年MM月DD日 HH:mm:ss A'));
  let {username} = props.userInfo.user;
  let menu = props.menuInfo;
  let [Whether,setWhether] = useState({
    temp:null,
    text:null
  });

  let location = useLocation();
  
  let ref = useRef(null);
  useEffect(()=>{
    setInterval(() => {
      setDate(dayjs().format('YYYY年MM月DD日 HH:mm:ss A'));
    }, 1000);
    const data = async()=>{
      try{
        ref.current =  await reqWheater();
         setWhether(ref.current.now);
      }catch(err){
        message.error('天气查询接口失效');
      }
    }
    data();
  },[location]);

  

  // 切换全屏
  const fullScreen = ()=>{
    setIsfull(!isFull);
    screenfull.toggle();
  }



  const { confirm } = Modal;
  const logout = ()=>{
    confirm({
      icon: <ExclamationCircleOutlined />,
      title:'退出功能',
      content: '你确定退出吗?',
      cancelText:'取消',
      okText:'确认',
      onOk() {
         props.deleteUserInfo();
      },
      onCancel() {
        return false;
      },
    });
  }


  return (
    <header className='header'>
      <div className="header-top">
        <Button size='small'>
           {isFull?<FullscreenExitOutlined onClick={fullScreen}/>:<FullscreenOutlined  onClick={fullScreen}/>}
        </Button>
        <span className='user'>欢迎,{username}</span>
        <Button type='link' onClick={logout}>退出登录</Button>
      </div>
      <div className="header-bottom">
        <div className='header-bottom-left'>
          {menu?menu:'首页'}
        </div>
        <div className="header-bottom-right">
          {date}
          <img src={W} alt="天气图标" />
          {Whether.text==null?'未查询到':Whether.text} 温度:{Whether.temp==null?'未查询到':Whether.temp}°
        </div>
      </div>
    </header>
    
  )
}

export default connect(
  state => {return {
    userInfo:state.userInfo,
    menuInfo:state.menuInfo
  }},
  {deleteUserInfo:createDeleteUserInfo}
)
(Header)
