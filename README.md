# nginx-deploy

nginx 项目部署 WEB 服务

nginx 的简单命令

- nginx -s stop 快速停止服务

- nginx -s reload 配置文件改动，需重新载入

- nginx -s quit 正常停止服务

- start nginx 启动

值得注意的是在 window 系统下，适当增加 .\nginx 来启动，否则不识别此命令

例如 .\nginx -s stop

---

### 防火墙配置

- firewall-cmd --query-port=8090/tcp 查看端口

- firewall-cmd --permanent --add-port=8092/tcp 新增端口

- netstat -ntpl    查看端口

- firewall-cmd --reload 重新加载防火墙策略
### 分支

- <font color="green">vue</font> 分支对应部署 vue 项目

- <font color="green">react</font> 分支对应部署 react 项目

- <font color="green">problem</font> 分支记录部署时的问题

- <font color="green">linux-nginx</font> 分支对应 nginx 的部署
