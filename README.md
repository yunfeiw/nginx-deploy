# linux-nginx

### 安装

- 前提，保证服务器系统中安装 <font color="red">gcc、pcre-devel、zlib-devel、openssl-devel</font>

  1. 安装命令 yum -y install gcc pcre-devel zlib-devel openssl openssl-devel

  2. 检查是否安装 yum list installed | grep "gcc"

- [nginx 下载](http://nginx.org/en/download.html) （推荐下载 tar.gz）

- 下载完成后上传至服务器

  1. rz 上传至路径（ <font color="yellow">/usr/local/nginx</font>）

  2. 解压到当前目录 tar -zxvf nginx-xx-xx-xx.tar.gz

- 配置

  1. ./configure --prefix=/usr/local/nginx

- make

  1. make
  2. make install

#### 错误信息：

```
    nginx: [alert] could not open error log file: open() "/usr/local/nginx/logs/error.log" failed (2: No such file or directory)
    2016/09/13 19:08:56 [emerg] 6996#0: open() "/usr/local/nginx/logs/access.log" failed (2: No such file or directory)
```

    原因分析：nginx/目录下没有logs文件夹

    解决方法：

```
    mkdir logs
    chmod 700 logs
```

    make时发生错误：

```

    src/os/unix/ngx_user.c: In function ‘ngx_libc_crypt’:
    src/os/unix/ngx_user.c:36:7: error: ‘struct crypt_data’ has no member named ‘current_salt’
    cd.current_salt[0] = ~salt[0];
    ^
    make[1]: *** [objs/Makefile:774: objs/src/os/unix/ngx_user.o] Error 1

```

    原因分析：这里提示我们struct crypt_data’没有名为‘current_salt’的成员：cd.current_salt[0] = ~salt[0]；

    解决方法：

```
    打开 src/os/unix/ngx_user.c
    /* cd.current_salt[0] = ~salt[0]；*/ 注释掉
```

    make install时错误

```
    igned int (*)(struct <匿名> *)’} to ‘void (*)(ngx_http_script_engine_t *)’ {或称 ‘void (*)(struct <匿名> *)’} [-Werror=cast-function-type]
         code->code = (ngx_http_script_code_pt)
                      ^
    src/http/ngx_http_script.c: 在函数‘ngx_http_script_add_full_name_code’中:
    src/http/ngx_http_script.c:1296:18: 错误：cast between incompatible function types from ‘size_t (*)(ngx_http_script_engine_t *)’ {或称 ‘long unsigned int (*)(struct <匿名> *)’} to ‘void (*)(ngx_http_script_engine_t *)’ {或称 ‘void (*)(struct <匿名> *)’} [-Werror=cast-function-type]
         code->code = (ngx_http_script_code_pt) ngx_http_script_full_name_len_code;
                      ^
    cc1：所有的警告都被当作是错误
    make[1]: *** [objs/Makefile:893：objs/src/http/ngx_http_script.o] 错误 1
    make[1]: 离开目录“/usr/download/nginx-1.14.1”
    make: *** [Makefile:8：build] 错误 2
```

    解决办法：打开  vim objs/Makefile  把 -Werrori删掉   （-Werror，它要求GCC将所有的警告当成错误进行处理）

### 配置 ssl

将申请的 ssl 证书上传至服务器[文件地址，存放在/opt/sslCertificate/]

执行命令

```
[root@ ~]# ll /opt/sslCertificate/

total 8
-rw-r--r-- 1 root root 3733 Dec 20 21:25 1_www.benpaodehenji.com_bundle.crt
-rw-r--r-- 1 root root 1704 Dec 20 21:25 2_www.benpaodehenji.com.key

```

### nginx 支持 https

配置的代理是 https 协议时

```
location /api/ {
    proxy_pass https://www.baidu.com;
}
```

执行此命令时

```
nginx -t
```

发生错误，原因是此时的 nginx 是不支持 `https`协议的（ssl)

```
nginx: [emerg] https protocol requires SSL support in /usr/local/nginx/conf/nginx.conf:50 nginx: configuration file /usr/local/nginx/conf/nginx.conf test failed
```

#### 解决

1. ` cd /usr/local/nginx/nginx-1.13.12`,此路径是你的 nginx 安装目录

2. 执行命令

```
./configure --prefix=/usr/local/nginx --with-http_ssl_module
```

--prefix=/usr/local/nginx/nginx-1.13.12，prefix 对应的路径是 nginx 安装的路径

3. 停止 nginx 然后在执行 `make` 进行重新编译

```
make -f objs/Makefile
	make[1]: Entering directory `/usr/local/nginx/nginx-1.13.7'
	cc -c -pipe  -O -W -Wall -Wpointer-arith -Wno-unused-parameter -Werror -g  -I src/core -I src/event -I src/event/modules -I src/os/unix -I objs \
		-o objs/src/core/nginx.o \
	... 省略
	-ldl -lpthread -lcrypt -lpcre -lssl -lcrypto -ldl -lz \
	-Wl,-E
	sed -e "s|%%PREFIX%%|/usr/local/nginx|" \
		-e "s|%%PID_PATH%%|/usr/local/nginx/logs/nginx.pid|" \
		-e "s|%%CONF_PATH%%|/usr/local/nginx/conf/nginx.conf|" \
		-e "s|%%ERROR_LOG_PATH%%|/usr/local/nginx/logs/error.log|" \
		< man/nginx.8 > objs/nginx.8
	make[1]: Leaving directory `/usr/local/nginx/nginx-1.13.7'
```

4. 备份一下原来的 nginx

```
cp ./sbin/nginx ./sbin/nginx_bak
```

5. 将编译的 nginx 拷贝覆盖原来的 nginx

```
cp ./objs/nginx ./sbin/nginx
```

6. ok 了，测试下

```
nginx -t
```
