# SPGL
node商品管理后台

## 开发人员
WuTong , ZhangMinFang

## 演示地址
SPGL.xxlxxlxx.com

## 目录结构组织
```
│  app.js       //app
│  package-lock.json
│  package.json
│  readme.md
│  _config.yml
│
├─bin
│      www      //项目启动文件
│
├─my_modules    //自定义模块
│  │  login_dl.js
│  │  mongodb_gnj.js
│  │
│  ├─index
│  │      index_chaxu.js
│  │      index_dd.js
│  │      index_gl.js
│  │      index_glsj.js
│  │      index_qbdd.js
│  │      index_sp.js
│  │      index_splbscsp.js
│  │      index_splbsj.js
│  │      index_splbsjsp.js
│  │      index_splbxjsp.js
│  │      index_tjsp.js
│  │
│  └─user
│          user_bjyh.js
│          user_gr.js
│          user_mmxg.js
│          user_qb.js
│          user_scyh.js
│          user_syyh.js
│          user_tjss.js
│          user_xjyh.js
│          user_yhmxg.js
│          user_yxxg.js
│
├─public        //静态资源文件
│  ├─bootstrap-3.3.7-dist
│  │  ├─css
│  │  │      bootstrap-theme.css
│  │  │      bootstrap-theme.css.map
│  │  │      bootstrap-theme.min.css
│  │  │      bootstrap-theme.min.css.map
│  │  │      bootstrap.css
│  │  │      bootstrap.css.map
│  │  │      bootstrap.min.css
│  │  │      bootstrap.min.css.map
│  │  │
│  │  ├─fonts
│  │  │      glyphicons-halflings-regular.eot
│  │  │      glyphicons-halflings-regular.svg
│  │  │      glyphicons-halflings-regular.ttf
│  │  │      glyphicons-halflings-regular.woff
│  │  │      glyphicons-halflings-regular.woff2
│  │  │
│  │  └─js
│  │          bootstrap.js
│  │          bootstrap.min.js
│  │          npm.js
│  │
│  ├─Chart
│  │      Chart.min.js
│  │
│  ├─images     //网站页面图片
│  │
│  ├─javascript         //页面js文件
│  │      common.js
│  │      jquery.js
│  │      ym_index.js
│  │      ym_login.js
│  │      ym_user.js
│  │
│  ├─spt        //商品图片文件夹
│  │
│  └─stylesheets        //样式文件
│          index.css
│          login.css
│          reset.css
│          style.css
│          user.css
│
├─routes        //路由文件
│      index.js
│      login.js
│      user.js
│
└─views         //页面文件
        error.ejs
        index.ejs
        login.ejs
        user.ejs
```
