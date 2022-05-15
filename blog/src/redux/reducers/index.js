import {combineReducers} from 'redux'
import loginReducer from './login_reducer'
import menuReducer from './menu_reducer'
import blogReducer from './blog_reducer'

export default combineReducers({
    userInfo:loginReducer,
    menuInfo:menuReducer,
    blogInfo:blogReducer
});