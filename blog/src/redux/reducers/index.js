import {combineReducers} from 'redux'
import loginReducer from './login_reducer'

export default combineReducers({
    userInfo:loginReducer
});