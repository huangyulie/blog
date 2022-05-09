import { Modal,Button } from 'antd'
import React,{useState,useEffect,useRef}  from 'react'
import './css/header.css'
import { FullscreenOutlined,FullscreenExitOutlined,ExclamationCircleOutlined } from '@ant-design/icons'
import screenfull from 'screenfull';
import {connect} from 'react-redux'
import {createDeleteUserInfo} from '../../../redux/actions/login_action';
import dayjs from 'dayjs';
import { reqWheater } from '../../../api';
import W from './img/00.png';


function Header(props) {
  let [isFull,setIsfull] = useState(false);
  let [date,setDate] = useState(dayjs().format('YYYY年MM月DD日 HH:mm:ss A'));
  let {username} = props.userInfo.user;
  let [Whether,setWhether] = useState({
    temp:'未显示',
    text:'未查询到'
  });

  


  let ref = useRef(null);
  useEffect(()=>{
    setInterval(() => {
      setDate(dayjs().format('YYYY年MM月DD日 HH:mm:ss A'));
    }, 1000);
    const data = async()=>{
      ref.current =  await reqWheater();
      setWhether(ref.current.now);
    }
    data();
  },[]);

  

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
          柱状图
        </div>
        <div className="header-bottom-right">
          {date}
          <img src={W} alt="天气图标" />
          {Whether.text} 温度:{Whether.temp}°
        </div>
      </div>
    </header>
    
  )
}

export default connect(
  state => {return {userInfo:state.userInfo}},
  {deleteUserInfo:createDeleteUserInfo}
)
(Header)
