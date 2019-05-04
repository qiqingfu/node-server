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

### sql注入原理及防范 
原理: 用户在访问前端应用时,在可以输入的地方提交参数里插入一些恶意参数传输到服务器,导致直接进入数据库执行sql语句。
```javascript
{
	"username": "lisi'; -- ",
	"password": 1234324324
}
``` 
数据库执行的查询语句为: `select username,realname from users where username='lisi'; -- ' and password='1234324324'` 

现在不需要密码,也可以登陆成功了,更可怕的是执行删除表的sql语句,所以这点一定要注意防范。

防范: mysql.escape()方法,讲用户输入的内容进行结构化,内部进行转义操作 

### xss脚本攻击 
XSS是一种在web应用中的计算机安全漏洞，它允许恶意web用户将代码植入到提供给其它用户使用的页面中。 
通俗的理解就是,我如果在一个社交平台上,我创建一个帖子,在帖子内容中我插入攻击代码 `<script>alert(document.cookie)</script>`, 那么这些内容会被插入到数据库中。当别人在浏览器看到我的帖子是就会打印出它本地存储的cookie,我可以将其他用户的cookie发送到我的服务器进行盗取。  

防范: 对用户输入的内容进行`转义`。node.js中可以使用 `xss`库来进行转义。
