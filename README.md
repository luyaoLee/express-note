# express-note
[线上预览](http://47.91.156.35:9981)

## 使用方法
```
# 克隆仓库
git clone git@github.com:luyaoLee/express-note.git
# cd 到仓库目录后安装依赖
npm i
# 启动本地服务器，打开 http://localhost:3000
npm start
# 当然你也可以在./bin/www文件里修改端口
```
## 用到的技术栈
**前端：**
- HTML、CSS3、JavaScript
- Less
- npm
- webpack
- JS组件
- 发布订阅模式
- 前后端联调

**后端：**
- express + ejs模板
- sequelize + sqlite3数据库
- passport + passport-github + session
- pm2
- linux命令

## 目录结构
```
│  .gitignore
│  app.js
│  package.json
│  process.json
│  README.md
│  
├─bin
│      www
│      
├─database
│      database.sqlite
│      
├─model
│      noteModel.js
│      
├─public
│  ├─css
│  │      index.css
│  │      
│  ├─img
│  │      background.jpg
│  │      favicon.ico
│  │      
│  └─js
│          index.bundle.js
│          
├─routes
│      api.js
│      auth.js
│      index.js
│      
├─src
│  │  postcss.config.js
│  │  webpack.config.js
│  │  
│  ├─img
│  │      background.jpg
│  │      stick.png
│  │      stick1.png
│  │      stick2.png
│  │      stick3.png
│  │      
│  ├─js
│  │  ├─app
│  │  │      index.js
│  │  │      
│  │  ├─lib
│  │  │      jquery-2.0.3.min.js
│  │  │      
│  │  └─mod
│  │          event.js
│  │          note-manager.js
│  │          note.js
│  │          toast.js
│  │          waterfall.js
│  │          
│  └─less
│          index.less
│          note.less
│          toast.less
│          
└─views
        error.ejs
        index.ejs
```
## 其它
- 功能还需完善，增加便签的样式、增加QQ、微信登录等
