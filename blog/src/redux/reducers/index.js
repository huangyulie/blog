import {combineReducers} from 'redux'
import loginReducer from './login_reducer'
import menuReducer from './menu_reducer'

export default combineReducers({
    userInfo:loginReducer,
    menuInfo:menuReducer,
});