import React,{useEffect} from 'react';
import { Menu } from 'antd';
import {
    BankOutlined,
    MailOutlined,
    UserOutlined,
    TeamOutlined,
    InsertRowBelowOutlined,
} from '@ant-design/icons';
import logo from '../../../static/img/true.png'
import './css/left.css'
import {useNavigate} from 'react-router-dom'

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}

const items = [
    getItem('首页', 'home', <BankOutlined />),
    getItem('博客', 'product', <MailOutlined />, [
        getItem('分类管理', 'product/category'),
        getItem('博客管理', 'product/product'),
    ]),
    getItem('用户管理', 'user', <UserOutlined />),
    getItem('角色管理', 'role', <TeamOutlined />),
    getItem('图形图表', 'charts', <InsertRowBelowOutlined />, [
        getItem('bar管理', 'charts/bar'),
        getItem('line管理', 'charts/line'),
        getItem('pie管理', 'charts/pie'),
    ]),
];




const Left = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      navigate('home');
    },[]);//eslint-disable-line

    const Demo = (props)=>{
        navigate(props.keyPath[0]);
    }
    return (
        <div>
            <header className='left-header'>
                <img src={logo} alt="logo" />
                <h1>Miroku后台管理</h1>
            </header>
            <Menu
                defaultSelectedKeys={['home']}
                defaultOpenKeys={['product']}
                mode="inline"
                theme="dark"
                items={items}
                onClick={Demo}
            />
        </div>
    );
};

export default Left;