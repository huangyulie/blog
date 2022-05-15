import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import {Button,Card,Input} from 'antd'
import {LeftOutlined} from '@ant-design/icons'
import './Addblog.css'
const {TextArea} = Input;

export default function Addblog() {
    let b = useNavigate();
  const demo = (e)=>{
    setHtml(e.target.value)
    console.log('12312321');
  }

  const [html,setHtml] = useState()

  return (
    <div>
    
        <Card title={
          <div>
              <Button onClick={()=>{b(-1)}}><LeftOutlined/>点击返回</Button>
              <span className='spanid'>添加博客</span>
          </div>
        } >
          <div>
            <TextArea rows={4} onChange={demo} value={html}/>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </div>
        </Card>
    </div>
  )
}
