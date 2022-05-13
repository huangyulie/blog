import React from 'react'
import {useLocation,useNavigate} from 'react-router-dom'
import {Button} from 'antd'

export default function Addblog() {
    let b = useNavigate();
    let a = useLocation();
    
    console.log(a);
  return (
    <div>
        dsadas
        <Button onClick={()=>{b(-1)}}>点击回退</Button>
    </div>
  )
}
