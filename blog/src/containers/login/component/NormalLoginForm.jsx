import { Form, Input, Button, message } from 'antd';
import { LockOutlined, AliwangwangOutlined } from '@ant-design/icons';
import { reqLogin} from '../../../api';


const NormalLoginForm = (props) => {
  const onFinish = async(values) => {
    let res = await reqLogin(values);
    let {status,msg} = res;
    if(status){
      message.warning(msg)
    }else{
      let {person} = res;
      message.success(msg);
      props.props('/admin');
      props.save({user:person.users,token:person.token,isLogin:true});
    }
  };
  const onFinishFailed = () => {
    message.error('填写有错误,请重新填写');
  }

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="username"
        rules={[
          { required: true, message: '请输入你的用户名' },
          { min: 4, message: '用户名是4~12位' },
          { max: 12, message: '用户名是4~12位' },
          { pattern: /^\w+$/, message: '用户名由数字,字母,下划线必须由组成' }
        ]}
        hasFeedback
      >
        <Input prefix={<AliwangwangOutlined className="site-form-item-icon" />} placeholder="用户名/手机号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: '请输入你的密码' },
          { min: 6, message: '密码是6~20位' },
          { max: 20, message: '用户名是6~20位' },
          { pattern: /^\w+$/, message: '密码由数字,字母,下划线必须由组成' }
        ]}
        hasFeedback
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="密码"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;