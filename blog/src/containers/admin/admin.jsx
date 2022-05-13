import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import { Route, Routes, useNavigate} from 'react-router-dom'
import {createDeleteUserInfo} from '../../redux/actions/login_action'
import {Layout} from 'antd'
import Header from './header/header';
import Left from './left_nav/Left';
import './css/admin.css'
import Home from '../../components/home/home';
import Category from '../category/category';
import Product from '../product/product';
import User from '../users/Users';
import Role from '../roles/roles';
import Line from '../line/line';
import Bar from '../bar/bar';
import Pie from '../pie/pie'
import Detail from '../detail/Detail'
import Update from '../update/Update';
import Addblog from '../addblog/Addblog'

function Admin(props) {

  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }
  const {isLogin} = props.userInfo;
  const {  Footer, Sider, Content } = Layout;
  if(isLogin === true){
    return (
      <Layout className='layout'>
        {/* 左侧导航 */}
        <Sider className='sider'>
           < Left/>
        </Sider>
        <Layout>
          <Header className='header'>Header</Header>
          <Content className='content'>
              <Routes>
                  <Route path='home' element={<Home />} />
                  <Route path='product/category' element={<Category />} />
                  <Route path='product/product' element={<Product />} />
                  <Route path='product/product/addblog' element={<Addblog />}/>
                  <Route path='product/product/detail/:id' element={<Detail />}/>
                  <Route path='product/product/update/:id' element={<Update />} />
                  <Route path='user' element={<User />} />
                  <Route path='role' element={<Role />} />
                  <Route path='charts/bar' element={<Bar />} />
                  <Route path='charts/line' element={<Line />} />
                  <Route path='charts/pie' element={<Pie />} />
              </Routes>
          </Content>
          <Footer className='footer'>弥勒博客后台管理系统1.0</Footer>
        </Layout>
    </Layout>
    )
  }else{
    return <Redirect to="/login" />
  }
  
}

export default connect(
  state => {return {userInfo:state.userInfo}},
  {deleteUserInfo:createDeleteUserInfo}
)(Admin);