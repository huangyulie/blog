import React from 'react'
import {useNavigate} from 'react-router-dom'
import {Button} from 'antd'

export default function Update() {
  let b = useNavigate();
  return (
    <div>
        dsadas
        <Button onClick={()=>{b(-1)}}>点击回退</Button>
    </div>
  )
}
