#### node-server

### 为什么route和controller分开 
遵循单一职责原则, route主要处理路由方面的工作,无需关心数据的是怎么来的,只关心路由。controller主要处理数据相关的工作,接受指定的参数,返回特定的内容,无需关系外部的路由是怎么工作的。


## cookie和session 

- ### cookie: 
    - HTTP是无状态的,需要cookie记录用户的状态,携带在请求头中发送给服务器 
    - 有大小限制5kb,不同浏览器限制各不相同,每次HTTP请求都会携带,会造成服务器压力
    - 不安全,容易被伪造cookie恶意攻击其他用户数据,还容易暴漏用户隐私,如手机号、邮箱等

- #### 解决: 
    - 使用httpOnly禁止浏览器通过js代码修改cookie,避免伪造cookie 
    - 使用 session, 在服务器端保存用户重要信息,客户端的cookie类似只保存一个身份证号,发送到服务器。服务器根据这个身份证号来验证来者何方神圣


- ### session 
  - 主要用途是在 server端保存用户信息
  - 安全且不受大小限制
  - 根据客户端发来的身份证号,来找到这个用户的信息 


具体代码在 `src/app.js`

### 日志拆分
```shell
    #!/bin/sh
    cd /Users/wmmqy/my-file/some-vue-demo/Node.js开发博客项目/node-server/log
    cp access.log $(date +%Y-%m-%d).access.log
    echo "" > access.log
``` 

### 定时执行 crontab 
```
crontab -e
* 0 * * * sh /shell脚本的路径
```

