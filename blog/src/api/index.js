import axios from "./MyAxios"
import { BASE_URL } from "../config";

//登录接口的api
export const reqLogin =  (values)=>{
    const { username, password } = values;
    return axios.post(`${BASE_URL}/login`, {
      username,
      password
    })
}
