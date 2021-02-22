[toc]

# expressStudy

这是本人学习express的一个仓库，默认启动在3000端口

```
npm install  //安装依赖
npm run dev  //启动项目
```

### 目录结构

- bin
  - www  入口文件
- config
  - config.js  配置文件
- middleware 中间件文件夹
- public 静态文件文件夹
- routes 路由文件夹
- utils 
  - auth.js  token工具文件
  - db.js  封装的数据库工具文件
- views 模板文件夹
- app.js express实例文件
- package.json 依赖管理文件

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

### 获取用户信息

- 接口地址

  ```
  /api/users/getUserInfo
  ```

- 入参无，需在请求头携带token

- 出参

  ```
  {
      "code": 200,
      "data": {
          "username": "admin",
          "id": 4,
          "role_id": 1,
          "role_name": "admin",
          "iat": 1613806589,
          "exp": 1613808389
      },
      "message": "获取用户信息成功"
  }
  ```

### 修改用户权限

- 接口地址

  ```
  /api/role/setUserRole
  ```

- 入参

  | 字段    | 类型   | 说明           | 必传 |
  | ------- | ------ | -------------- | ---- |
  | user_id | number | 用户id         | true |
  | role_id | number | 修改后的角色id | true |

- 出参

  ```
  {
      "code": 200,
      "message": "修改成功"
  }
  ```

### 获取员工列表

- 接口地址

  ```
  /api/personnel/getPersonnels
  ```

- 入参

  | 字段     | 类型   | 说明         | 必传 |
  | -------- | ------ | ------------ | ---- |
  | pageNum  | number | 当前页       | true |
  | pageSize | number | 每页数据条数 | true |

  

- 出参

  ```
  {
      "code": 200,
      "data": [
          {
              "personnel_id": 6,
              "personnel_name": "上官翠花",
              "create_time": "2021-02-22T01:10:42.000Z",
              "job_id": 1,
              "job_name": "web前端"
          }
      ],
      "page": {
          "pageNum": "2",
          "pageSize": "5",
        "total": 6
      },
      "message": "查询成功"
  }
  ```
  
  