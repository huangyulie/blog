# 后台接口文档

## 服务器ip地址端口号:

localhost:4000

## 1.公共请求参数（登录接口不需要）

每个接口都需要的Header参数值

|   参数名称    |  类型  | 是否必选 |    描述     |
| :-----------: | :----: | :------: | :---------: |
| Anthorization | String |    Y     | 登录的token |

## 2.登录

地址:localhost:4000/login

方式:post

参数类型:

| 参数名称 |  类型  | 是否必选 |  描述  |
| :------: | :----: | :------: | :----: |
| username | String |    Y     | 用户名 |
| password | String |    Y     |  密码  |

## 3.获取博客列表的
地址:localhost:4000/admin/blog

方式:GET

参数类型:

