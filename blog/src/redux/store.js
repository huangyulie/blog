//核心的store仓库
//1.引入createStore，用于创建最核心的store对象
import {createStore,applyMiddleware} from 'redux'
//2.引入reducer
import reducers from './reducers'
//3.引入thunk，处理异步
import thunk from 'redux-thunk'
//4.引入开发者工具react-devtools-extension
import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(reducers,composeWithDevTools(applyMiddleware(thunk)));