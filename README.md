# 维凯管理系统

> 维凯网络管理系统

## 技术栈

- Axios @0.x
- Element-UI @1.x
- Vue @2.x
- Vue-Router @2.x
- Vuex @2.x
- Mockjs @1.x
- ES6
- SCSS

## 项目地址

> git@code.aliyun.com:weknet-frontend/riskcontrol-admin.git

## 目录结构

```bash
├── /build/          # 项目构建(webpack)相关代码
├── /config/         # 项目开发环境配置
├── /src/            # 源码目录
│ ├── /assets/       # 组件静态资源
│ ├── /components/   # vue公共组件
│ ├── /mock/         # mock数据接口
│ ├── /pages/        # vue路由组件(页面维度)
│ ├── /router/       # vue-router路由
│ ├── /store/        # vuex状态管理
│ ├── App.vue        # 页面入口文件
│ └── main.js        # 程序入口文件
├── /static/         # 非组件静态资源
├── .babelrc         # ES6语法编译配置
├── .editorconfig    # 定义代码格式
├── .eslintignore    # ES6规范忽略文件
├── .eslintrc.js     # ES6语法规范配置
├── .gitignore       # git忽略文件
├── index.html       # 入口页面
├── package.json     # 项目基本信息
└── README.md        # 项目说明
```

## 安装构建

```bash
# 安装依赖
yarn
# 或
npm install

# 启用热加载到 localhost:8090
npm start

# 构建测试目录
npm run dev

# 构建预发布目录
npm run test

# 构建最小生产目录
npm run build
```

## 开发管理

```bash
https://rdc.aliyun.com/    #(项目管理)
https://code.aliyun.com/   #(代码管理)
https://www.eolinker.com/  #(技术文档)
```
