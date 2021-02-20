[toc]

# expressStudy

这是本人学习express的一个仓库，默认启动在3000端口

```
npm install  //安装依赖
npm run dev  //启动项目
```



### 状态码规范

状态码|含义
-|-
200|请求成功
400|请求参数错误
401|未登录
402|其他错误
500|服务器错误

## 接口文档

### 注册接口

- 接口地址

  ```
  /api/users/register
  ```

- 入参

  | 字段     | 参数类型 | 说明   | 必传 |
  | -------- | -------- | ------ | ---- |
  | username | string   | 用户名 | true |
  | password | string   | 密码   | true |

- 出参

  ```
  {
      "code": 200,
      "message": "注册成功"
  }
  ```

### 登录接口

- 接口地址

  ```
  /api/users/login
  ```

- 入参

  | 字段     | 参数类型 | 说明   | 必传 |
  | -------- | -------- | ------ | ---- |
  | username | string   | 用户名 | true |
  | password | string   | 密码   | true |

- 出参

  ```
  {
      "code": 200,
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJzIiwiaWQiOjQsImlhdCI6MTYxMzc4ODI5OSwiZXhwIjoxNjEzNzkwMDk5fQ.7-QFXLJgJrkvBloWAPG40W1-NE_jcTGeIHD0onyO6Dc",
      "message": "登录成功"
  }
  ```

  