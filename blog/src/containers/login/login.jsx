import React,{useEffect} from 'react'
import './css/login.css'
import logo from './img/logo.png'
import Form from './component/NormalLoginForm'
import { connect } from 'react-redux'
import {createSaveUserinfoAction} from '../../redux/actions/login_action'
import {useNavigate} from 'react-router-dom';

function Login(props) {
  let navigate = useNavigate();
  // console.log(props);

  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }

  let {isLogin} = props;
  if(isLogin){
      return <Redirect to='/admin' />
  }else{
    return (
      <div className='login'>
          <header>
              <img src={logo} alt="logo" title='logo'/>
              <h1>HYL的一般系统</h1>
          </header>
          <section>
              <h1>登录</h1>
              <Form props = {navigate} save = {props.saveUserinfo}/>
          </section>
      </div>
    )
  }
}

export default connect(
  state => {return {isLogin:state.userInfo.isLogin}},
  {
    saveUserinfo:createSaveUserinfoAction,
  }
)(Login);
