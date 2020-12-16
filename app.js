// 引入express框架
const express = require('express');
// 引入数据库处理模块
const mongoose = require('mongoose');
// 引入路径处理模块
const path = require('path');
// 引入session模块
var session = require('express-session');
// 处理文件上传
const formidableMiddleware = require('express-formidable');
//mongoose.set('useFindAndModify', false);
// web服务器
const app = express();
// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));
// session配置
app.use(session({
    secret: 'secret key',
    resave: false, //添加 resave 选项
    saveUninitialized: false, //添加 saveUninitialized 选项,如果为false，退出登录客户端也就不会给你保存一个默认的初始化session
    //设置cookie的过期时间，不设置的话，cookie是关闭浏览器即消失，我们希望下次登录cookie还在
    cookie: {
        //最大毫秒数，从你登录后，一直到你设置的毫秒数后cookie消失
        maxAge: 24 * 60 * 60 * 60
    }
}))
// 处理post参数
app.use(formidableMiddleware({
	// 文件上传目录
	uploadDir: path.join(__dirname, 'public', 'uploads'),
	// 最大上传文件为2M
	maxFileSize: 2 * 1024 * 1024,
	// 保留文件扩展名
	keepExtensions: true
}));

// 数据库连接
mongoose.connect('mongodb://localhost:27017/alibaixiu', { useNewUrlParser: true, useCreateIndex: true})
	.then(() => console.log('数据库连接成功'))
	.catch(() => console.log('数据库连接失败'));

// 路由
require('./routes')(app);
// 返回系统监听
app.listen(3000, () => console.log('服务器启动成功'));
