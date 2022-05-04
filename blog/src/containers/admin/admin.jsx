import React,{useEffect} from 'react'
import {connect} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {createDeleteUserInfo} from '../../redux/actions/login_action'

function Admin(props) {

  function Redirect({ to }) {
    let navigate = useNavigate();
    useEffect(() => {
      navigate(to);
    });
    return null;
  }

  const logout = ()=>{
    props.deleteUserInfo();
  }

  // console.log(props);
  const {user,isLogin} = props.userInfo;
  if(isLogin === true){
    return (
      <div>
        <div>admin+{user.username}</div>
        <button onClick={logout}>退出</button>
      </div>
    )
  }else{
    return <Redirect to="/login" />
  }
  
}

export default connect(
  state => {return {userInfo:state.userInfo}},
  {deleteUserInfo:createDeleteUserInfo}
)(Admin);