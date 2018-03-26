---
layout:     post
title:      "[初闻道]在mac上安装docker，及docker-compose"
subtitle:   "初闻道系列是为了给新人用的"
date:       2018-03-25 00:31:30
author:     "黄药师"
tags:
    - Docker
    - Mac
    - docker-compose
    - rails
    - Notes
---

本文主要解决在mac上安装docker[-compose]，以及启动一个nginx实例。

---

## Requirement
### 系统要求
[Docker for Mac](https://docs.docker.com/docker-for-mac/) 要求系统最低为 macOS 10.10.3 Yosemite。如果系统不满足需求，可以安装 [Docker Toolbox](https://docs.docker.com/toolbox/overview/)。
### 提前安装好
- zsh
- homebrew
- sublime text or vim

## 安装

### 使用 Homebrew 安装
macOS 我们可以使用 Homebrew 来安装 Docker：
```powershell
$ brew cask install docker

==> Creating Caskroom at /usr/local/Caskroom
==> We'll set permissions properly so we won't need sudo in the future
Password:          # 输入 macOS 密码
==> Satisfying dependencies
==> Downloading https://download.docker.com/mac/stable/21090/Docker.dmg
######################################################################## 100.0%
==> Verifying checksum for Cask docker
==> Installing Cask docker
==> Moving App 'Docker.app' to '/Applications/Docker.app'.
&#x1f37a;  docker was successfully installed!
```
在载入 Docker app 后，点击 Next，可能会询问你的 macOS 登陆密码，你输入即可。之后会弹出一个 Docker 运行的提示窗口，状态栏上也有有个小鲸鱼的图标（![](https://ws2.sinaimg.cn/large/006tKfTcgy1fpnqyej3taj300u00lwec.jpg)）。

----

###手动下载安装
如果需要手动下载，请点击以下链接下载 [Stable](https://download.docker.com/mac/stable/Docker.dmg) 或 [Edge](https://download.docker.com/mac/edge/Docker.dmg) 版本的 Docker for Mac。
双击下载的 .dmg 文件，然后将鲸鱼图标拖拽到 Application 文件夹即可。
![](https://ws2.sinaimg.cn/large/006tKfTcly1fpnr1f9lylj30jg09wt9g.jpg)
从应用中找到 Docker 图标并点击运行， 或者呼出Alfred输入`docker`回车。可能会询问 macOS 的登陆密码，输入即可。

![](https://ws2.sinaimg.cn/large/006tKfTcly1fpnr1xt92bj30xw09s0wi.jpg)

点击状态栏的图标可以得到操作菜单。
![](https://ws1.sinaimg.cn/large/006tKfTcgy1fpnr4oaj5mj30fa0iudk7.jpg)

第一次点击图标，可能会看到这个安装成功的界面，点击 "Got it!" 可以关闭这个窗口。
![](https://ws2.sinaimg.cn/large/006tKfTcgy1fpnr5m8oxfj308o0kmt9y.jpg)

启动终端后，通过命令可以检查安装后的 Docker 版本。
```powershell
$ docker --version
Docker version 17.12.0-ce, build c97c6d6
$ docker-compose --version
docker-compose version 1.18.0, build 8dd22a9
$ docker-machine --version
docker-machine version 0.13.0, build 9ba6da9
```
> Docker for Mac 和 Docker Toolbox 已经包含了 Compose 了, 所以 Mac 用户不用单独安装Compose了。

如果 docker version、docker info 都正常的话，可以尝试运行一个 [Nginx 服务器](https://store.docker.com/images/nginx/)：

```powershell
$ docker run -d -p 80:80 --name webserver nginx
```
> 参数的含义和用法参考网上的文档

服务运行后，可以访问 http://localhost，如果看到了 "Welcome to nginx!"，就说明 Docker for Mac 安装成功了。
![](https://ws3.sinaimg.cn/large/006tKfTcgy1fpnrjws8loj312q0ki421.jpg)

要停止 Nginx 服务器并删除执行下面的命令：
```powershell
$ docker stop webserver
$ docker rm webserver
```

> 有些用户会觉得国内网络拉取docker镜像速度很慢，可能需要配置加速服务器。网上有人分享自己的加速地址，可以参考配置一下。