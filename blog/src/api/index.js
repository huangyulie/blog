import axios from "./MyAxios"
import { BASE_URL } from "../config";
// import jsonp from 'jsonp';

//登录接口的api
export const reqLogin =  (values)=>{
    const { username, password } = values;
    return axios.post(`${BASE_URL}/login`, {
      username,
      password
    })
}

//博客列表
//登录接口的api
export const reqList =  ()=>{
  return axios.get(`${BASE_URL}/admin/index/list`);
}

//查询天气的接口
export const reqWheater = ()=>{
  return axios.get(`https://devapi.qweather.com/v7/weather/now?location=101110101&key=7e0c9cf9291f4c2490d868fadeb69088`);
  // jsonp('https://wis.qq.com/weather/common?source=pc&weather_type=observe%7Cforecast_1h%7Cforecast_24h%7Cindex%7Calarm%7Climit%7Ctips%7Crise&province=%E9%99%95%E8%A5%BF%E7%9C%81&city=%E8%A5%BF%E5%AE%89%E5%B8%82',(err,data)=>{
  //   console.log(data);
  // })
}

// 查询博客分类的api
export const reqCategory = ()=>{
  return axios.get(`${BASE_URL}/admin/manger/category/list`);
}
// 添加
export const reqAddCategory = (values)=>{
  let {name} = values;
  return axios.post(`${BASE_URL}/admin/manger/category/addList`,{
      name
  })
}

// 修改
export const reqChangegory = (values)=>{
  let {name,prename} = values;
  return axios.post(`${BASE_URL}/admin/manger/category/changeList`,{
    name,
    prename
  })
}

export const reqBlog = (values)=>{
  let {page,pagesize} = values;
  return axios.get(`${BASE_URL}/admin/blog/list`,{params:{
    page,
    pagesize
  }})
}

export const reqSearchBlog = (values)=>{
  let {page,pagesize,name,value} = values;
  return axios.get(`${BASE_URL}/admin/blog/search`,{params:{
    page,
    pagesize,
    name,
    value,
  }})
}