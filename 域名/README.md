# 域名

* 如何配置二级、三级域名
* 二级、三级域名如何分发至指定IP或不同端口服务

### 域名解析

1. 打开服务器控制台 
2. 域名
3. 解析
4. 添加记录 【记录类型：A --> 主机记录 --> 记录值：IP】

### 分发至不同服务

>方案1:
    域名的记录值指向的是，服务器IP（默认80端口）;我们配置nginx服务以80端口为核心，依据server_name（域名）的不同代理分发至不同的服务

    
    server {
        listen       80;         #监听的端口
        server_name  app1.yunfei.ltd;    #监听的URL
        location / {
           proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://123.56.245.88:8089;
        }
    }
    server {
        listen       80;         #监听的端口
        server_name  app2.yunfei.ltd;    #监听的URL
        location / {
           proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_pass http://123.56.245.88:8089;
        }
    }
    

>方案2
    添加记录时 【记录类型：配置隐性URL】，记录值则为指向的服务；有缺陷，因为该模式，在刷新界面时候重定向初始配置的URL,而非操作时的URL