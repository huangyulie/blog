import axios from "axios";
import { message } from "antd";
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'
import store from '../redux/store';
import {createDeleteUserInfo} from '../redux/actions/login_action'

const instance = axios.create({
    timeout: 4000
});
//请求拦截器
instance.interceptors.request.use(function(config){
    //进度条开始
    Nprogress.start();
    //从redux中获取之前保存的状态
    const {token} = store.getState().userInfo;
    if(token){
        config.headers.Pub = token;
    }
    return config;
},function (error){
    return Promise.reject(error);
})
//响应拦截器
instance.interceptors.response.use(function(res){
    Nprogress.done();
    return res.data;
},function(error){
    //进度条结束
    Nprogress.done();
    if(error.response.status === 401){
        message.error('身份校验失败,请重新登录',2);
        store.dispatch(createDeleteUserInfo());
    }else{
        message.error(error.message,2);
    }
    return new Promise(()=>{});
});

export default instance;