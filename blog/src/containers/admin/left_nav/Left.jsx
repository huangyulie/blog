import React, { useEffect } from 'react';
import { Menu } from 'antd';
import {
    BankOutlined,
    MailOutlined,
    UserOutlined,
    TeamOutlined,
    InsertRowBelowOutlined,
    LineChartOutlined,
    PieChartOutlined,
    BarChartOutlined
} from '@ant-design/icons';
import logo from '../../../static/img/true.png'
import './css/left.css'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux';
import { createSaveTitleAction } from '../../../redux/actions/meue_action';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}



const Left = (props) => {
    console.log(props.menus);
    // const item = [];
    // let { menus = ['home','user','role','product','charts'] } = props;
    let { menus = ['home','user','role','product','charts'] } = props;
    let items = [];
    menus.map((obj) => {
        if (obj === 'home') {
            items.push(getItem('首页', 'home', <BankOutlined />));
        } else if (obj === 'user') {
            items.push(getItem('用户管理', 'user', <UserOutlined />));
        } else if (obj === 'role') {
            items.push(getItem('角色管理', 'role', <TeamOutlined />));
        } else if (obj === 'product') {
            items.push(getItem('博客', 'product', <MailOutlined />, [
                getItem('分类管理', 'product/category'),
                getItem('博客管理', 'product/product'),
            ]))
        } else if (obj === 'charts') {
            items.push(getItem('图形图表', 'charts', <InsertRowBelowOutlined />, [
                getItem('柱状图', 'charts/bar', <BarChartOutlined />),
                getItem('折线图', 'charts/line', <LineChartOutlined />),
                getItem('饼图', 'charts/pie', <PieChartOutlined />),
            ]))
        }
    })

    if (menus.indexOf('product/product') !== -1 && menus.indexOf('product/category') == -1) {
        items.push(getItem('博客', 'product', <MailOutlined />, [
            getItem('博客管理', 'product/product'),
        ]))
    } else if (menus.indexOf('product/product') === -1 && menus.indexOf('product/category') !== -1) {
        items.push(getItem('博客', 'product', <MailOutlined />, [
            getItem('分类管理', 'product/category'),
        ]))
    }

    if (menus.indexOf('charts/bar') !== -1 && menus.indexOf('charts/line') === -1 && menus.indexOf('charts/pie') === -1) {
        items.push(getItem('图形图表', 'charts', <InsertRowBelowOutlined />, [
            getItem('柱状图', 'charts/bar', <BarChartOutlined />),
        ]))
    } else if (menus.indexOf('charts/bar') === -1 && menus.indexOf('charts/line') !== -1 && menus.indexOf('charts/pie') === -1) {
        items.push(getItem('图形图表', 'charts', <InsertRowBelowOutlined />, [
            getItem('折线图', 'charts/line', <LineChartOutlined />),
        ]))
    } else if (menus.indexOf('charts/bar') === -1 && menus.indexOf('charts/line') === -1 && menus.indexOf('charts/pie') !== -1) {
        items.push(getItem('图形图表', 'charts', <InsertRowBelowOutlined />, [
            getItem('饼图', 'charts/pie', <PieChartOutlined />),
        ]))
    } else if (menus.indexOf('charts/bar') !== -1 && menus.indexOf('charts/line') !== -1 && menus.indexOf('charts/pie') === -1) {
        items.push(getItem('图形图表', 'charts', <InsertRowBelowOutlined />, [
            getItem('柱状图', 'charts/bar', <BarChartOutlined />),
            getItem('折线图', 'charts/line', <LineChartOutlined />),
        ]))
    } else if (menus.indexOf('charts/bar') !== -1 && menus.indexOf('charts/line') === -1 && menus.indexOf('charts/pie') !== -1) {
        items.push(getItem('图形图表', 'charts', <InsertRowBelowOutlined />, [
            getItem('柱状图', 'charts/bar', <BarChartOutlined />),
            getItem('饼图', 'charts/pie', <PieChartOutlined />),
        ]))
    } else if (menus.indexOf('charts/bar') === -1 && menus.indexOf('charts/line') !== -1 && menus.indexOf('charts/pie') !== -1) {
        items.push(getItem('图形图表', 'charts', <InsertRowBelowOutlined />, [
            getItem('折线图', 'charts/line', <LineChartOutlined />),
            getItem('饼图', 'charts/pie', <PieChartOutlined />),
        ]))
    }


    // const items = [
    //     getItem('首页', 'home', <BankOutlined />),
    //     getItem('博客', 'product', <MailOutlined />, [
    //         getItem('分类管理', 'product/category'),
    //         getItem('博客管理', 'product/product'),
    //     ]),
    //     getItem('用户管理', 'user', <UserOutlined />),
    //     getItem('角色管理', 'role', <TeamOutlined />),
    //     getItem('图形图表', 'charts', <InsertRowBelowOutlined />, [
    //         getItem('柱状图', 'charts/bar',<BarChartOutlined />),
    //         getItem('折线图', 'charts/line',<LineChartOutlined />),
    //         getItem('饼图', 'charts/pie',<PieChartOutlined />),
    //     ]),
    // ];

    const navigate = useNavigate();

    useEffect(() => {
        navigate('home');
    }, []);//eslint-disable-line
    let p = { ...props };
    const Demo = (props) => {
        navigate(props.keyPath[0]);
        p.menuInfo(props.domEvent.target.innerHTML);
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

export default connect(
    state => { return state.userInfo.user.roleAll },
    { menuInfo: createSaveTitleAction },
)
    (Left)