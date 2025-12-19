# Node.js 与 Express

## Node.js 简介

Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行时环境。

## Express 框架

Express 是 Node.js 最流行的 Web 应用框架。

### 安装

```bash
npm install express
```

### 基本使用

```javascript
const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

## 路由

Express 提供了强大的路由功能，可以轻松处理不同的 HTTP 请求。

## 中间件

中间件函数可以访问请求对象、响应对象和应用程序的请求-响应周期中的下一个中间件函数。

