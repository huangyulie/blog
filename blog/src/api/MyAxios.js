import axios from "axios";
import { message } from "antd";
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css'

const instance = axios.create({
    timeout: 4000
});
//请求拦截器
instance.interceptors.request.use(function(config){
    Nprogress.start();
    return config;
},function (error){
    return Promise.reject(error);
})
//响应拦截器
instance.interceptors.response.use(function(res){
    Nprogress.done();
    return res.data;
},function(error){
    Nprogress.done();
    message.error(error.message,2);
    return new Promise(()=>{});
});

export default instance;