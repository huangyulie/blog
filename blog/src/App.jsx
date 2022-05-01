import {Routes,Route} from 'react-router-dom';
import Login from './pages/login/login';
import Admin from './pages/admin/admin';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Admin/>}/>
      </Routes>
    </div>
  );
}

export default App;
