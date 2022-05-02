import { Form, Input, Button, Checkbox } from 'antd';
import { LockOutlined,AliwangwangOutlined } from '@ant-design/icons';

const NormalLoginForm = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {required: true,message: '请输入你的用户名'},
          {min:4,message:'用户名是4~12位'},
          {max:12,message:'用户名是4~12位'},
          {pattern:/^\w+$/,message:'用户名由数字,字母,下划线必须由组成'}
        ]}
      >
        <Input prefix={<AliwangwangOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {required: true,message: '请输入你的密码'},
          {min:6,message:'密码是6~20位'},
          {max:20,message:'用户名是6~20位'},
          {pattern:/^\w+$/,message:'密码由数字,字母,下划线必须由组成'}
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>记住我</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="/#">
          忘记密码
        </a>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NormalLoginForm;