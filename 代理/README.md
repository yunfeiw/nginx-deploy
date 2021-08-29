## 代理

配置 server 中的 proxy_pass

```
server {
    listen       8088;
    server_name  localhost;

location /{
    root   html/dist;
    index  index.html index.html;
    try_files $uri $uri/ /index.html;
}

location /api2{
    # rewrite  ^/api2/(.*)$ /$1 breal;
    rewrite "^/api2/(.*)$" /$1 break;
    proxy_pass https://www.cn;
}
location /api3{
    # rewrite  ^/api3/(.*)$ /$1 breal;
    rewrite "^/api3/(.*)$" /$1 break;
    proxy_pass https://www.baidu.com;
}

```

详细配置可查看 `nginx.conf`
