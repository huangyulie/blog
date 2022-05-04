import {SAVE_USER_INFO,DELETE_USER_INFO} from '../action_type'
let user =JSON.parse(localStorage.getItem(('user')));
let token = localStorage.getItem('token');
let isLogin = user && token ?true:false;

let init = {
    user:user||'',
    token:token||'',
    isLogin:isLogin
}

export default function test(pre=init,action){
    const {type,data} = action;
    switch (type){
        case SAVE_USER_INFO:
            return {user:data.user,token:data.token,isLogin:true};
        case DELETE_USER_INFO:
            return {user:'',token:'',isLogin:false};
        default:
            return pre;
    }
}