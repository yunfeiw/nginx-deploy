## vue-deploy

### 项目vuev1/vuev2:

* cd vuev* ;

* npm install ;

* npm run build ; (@1)

注意：
 @1：打包时注意对应的资源加载路径（vue.config.js中)publicPath;该值对应服务路径。

____
### 配置nginx （此配置可直接使用）

打开文件 nginx-1.12.2/conf/nginx.config

```
    http {
    include       mime.types;
    default_type  application/octet-stream;


    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    # (@服务1)
    server {
        listen       80;
        server_name  localhost;


        location /{
            root   html;
            index  index.html index.htm;
        }
        location /yunfei1 {
            alias  html/v1;
            index  index.html index.htm;
            try_files $uri $uri/ /yunfei1/index.html;
        }
        location /yunfei2 {
            alias  html/v2;
            index  index.html index.htm;
            try_files $uri $uri/ /yunfei2/index.html;
        }

        error_page  404              /404.html;

     
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }


    }
    # (@服务2)
    server {
        listen       8099;
        server_name  localhost;

        location /{
            root   html;
            index  index.html index.htm;
        }
        
        error_page  404              /404.html;
        
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

    }
```

配置文件nginx.conf部署了两个服务

* 服务1：http://localhost:80

    服务1下以路径为区分，部署了 <font color="red">vuev1</font>与<font color="red">vuev2</font>
* 服务2：http://localhost:8099

___

## 注意点

1. 打包时，资源加载路径需与nginx配置文件的 "location" 匹配值相同，否则加载资源失败。（部署于不同serve下则无关紧要）。

2. vue的router使用history模式时，刷新界面会跳转至nginx的404界面，原因是该url在服务端不匹配导致的，将 try_files 始终指向index.html即可。

3. vue的router使用hash模式时，在不更改nginx配置情况下，直接将项目置于html文件夹下，以访问静态资源方式访问也可使用（有点low）。
