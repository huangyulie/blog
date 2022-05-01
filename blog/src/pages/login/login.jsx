import React from 'react'
import './css/login.css'
import logo from './img/logo.png'
import Form from './component/NormalLoginForm'

export default function login() {
  return (
    <div className='login'>
        <header>
            <img src={logo} alt="logo" title='logo'/>
            <h1>HYL的一般系统</h1>
        </header>
        <section>
            <h1>登录</h1>
            <Form/>
        </section>
    </div>
  )
}
