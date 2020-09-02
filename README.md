# linux-nginx

### 安装

* 前提，保证服务器系统中安装 <font color="red">gcc、pcre-devel、zlib-devel、openssl-devel</font>

    1. 安装命令  yum -y install gcc pcre-devel zlib-devel openssl openssl-devel
    
    2. 检查是否安装 yum list installed | grep "gcc"

* [nginx下载](http://nginx.org/en/download.html) （推荐下载tar.gz）

* 下载完成后上传至服务器
    1. rz 上传至路径（ <font color="yellow">/usr/local/nginx</font>）

    2. 解压到当前目录 tar -zxvf nginx-xx-xx-xx.tar.gz

* 配置
    1. ./configure --prefix=/usr/local/nginx

* make
    1. make 
    2. make install

* 错误信息：

    nginx: [alert] could not open error log file: open() "/usr/local/nginx/logs/error.log" failed (2: No such file or directory)
    2016/09/13 19:08:56 [emerg] 6996#0: open() "/usr/local/nginx/logs/access.log" failed (2: No such file or directory)

    原因分析：nginx/目录下没有logs文件夹

    解决方法：

    mkdir logs
    chmod 700 logs
---
    make时发生错误：
    src/os/unix/ngx_user.c: In function ‘ngx_libc_crypt’:
    src/os/unix/ngx_user.c:36:7: error: ‘struct crypt_data’ has no member named ‘current_salt’
    cd.current_salt[0] = ~salt[0];
    ^
    make[1]: *** [objs/Makefile:774: objs/src/os/unix/ngx_user.o] Error 1

    原因分析：这里提示我们struct crypt_data’没有名为‘current_salt’的成员：cd.current_salt[0] = ~salt[0]；

    解决方法：
    打开 src/os/unix/ngx_user.c
    /* cd.current_salt[0] = ~salt[0]；*/ 注释掉


---
    make install时错误
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

    解决办法：打开  vim objs/Makefile  把 -Werrori删掉   （-Werror，它要求GCC将所有的警告当成错误进行处理）