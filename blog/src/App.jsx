import {Routes,Route,Navigate} from 'react-router-dom';
import Login from './containers/login/login';
import Admin from './containers/admin/admin';
//引入样式
import './App.css'

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/admin' element={<Admin/>}/>
        <Route path="/" element={<Navigate to="/login"/>}/>
      </Routes>
    </div>
  );
}

export default App;
