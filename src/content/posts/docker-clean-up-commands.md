---
title: 一些实用的 Docker 清理命令
subtitle: 整理了一下最近用到的 docker 镜像清理的命令
author: 黄药师
date: 2018-05-05T00:00:00.000Z
tags:
  - Notes
  - Docker
  - docker-compose
  - linux
  - macos
  - command
lang: zh
draft: false
description: 整理了一下最近用到的 docker 镜像清理的命令
---

工欲善其事必先利其器，docker 镜像太多会占用很多磁盘空间，垃圾回收一下是必须的工作。

---


杀死所有正在运行的容器

```powershell
$ docker kill $(docker ps -a -q)
```
删除所有已经停止的容器

```powershell
$ docker rm $(docker ps -a -q)
```

删除所有未打 dangling[^dangling] 标签的镜像

```powershell
$ docker rmi $(docker images -q -f dangling=true)
```

删除所有镜像

```powershell
$ docker rmi $(docker images -q)
```

删除所有未运行 Docker 容器

```powershell
$ docker rm $(docker ps -a -q)
```

删除所有未打 tag 的镜像

```powershell
$ docker rmi $(docker images -q | awk '/^<none>/ { print $3 }')
```

根据格式删除所有镜像

```powershell
$ docker rm $(docker ps -qf status=exited)
```
为这些命令创建别名

```powershell
# ~/.bash_aliases

# 杀死所有正在运行的容器.
alias dockerkill='docker kill $(docker ps -a -q)'

# 删除所有已经停止的容器.
alias dockercleanc='docker rm $(docker ps -a -q)'

# 删除所有未打标签的镜像.
alias dockercleani='docker rmi $(docker images -q -f dangling=true)'

# 删除所有已经停止的容器和未打标签的镜像.
alias dockerclean='dockercleanc || true && dockercleani'
```


[^dangling]: **Dangling Images**: Docker images consist of multiple layers. Dangling images, are layers that have no relationship to any tagged images. They no longer serve a purpose and consume disk space.  
