## pm2

pm2是一个进程管理工具（管理node)进程，并查看node进程的状态，支持性能监控、进程守护、负载均衡等功能。
官方地址 [pm2][https://pm2.keymetrics.io/docs/usage/pm2-doc-single-page/]
### 安装

win10/mac/linux

npm install -g pm2

### 命令

* 启动进程: pm2 start bin/xxx.js 或 pm2 start xxx.js

* 重命名进程/应用： pm2 start xxx.js --name yunfei

* 添加进程/应用watch: pm2 start bin/xxx --watch

* 结束进程/应用：pm2 stop xxx

* 结束所有进程/应用 pm2 stop all

* 删除进程/应用 pm2 delete xxx

* 删除所有进程/应用 pm2 delete all

* 列出所有进程/应用 pm2 list || pm2 ls

* 查看摸个进程/应用具体情况 pm2 describe xxx

* 
