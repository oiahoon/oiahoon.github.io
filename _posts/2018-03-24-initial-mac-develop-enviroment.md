---
layout:     post
title:      "[初闻道]搭建mac开发环境"
subtitle:   "初闻道系列之一，磨刀不误砍柴工。"
author:     "黄药师"
date:       2018-03-24
tags:
    - Notes
    - Mac
    - Sublime Text
    - iterm2
    - homebrew
    - zsh
    - oh-my-zsh
    - rbenv
    - postman
    - Alfred
---
拿到一台mac以后怎么初始化开发环境.  
本文主要以rails为例子，介绍拿到新的rmbp以后如何迅速搭建开发环境，并推荐一些基础软件。

---

## 确定安装了xcode开发工具
一般来讲默认都是安装好的
> ```powershell
> $ xcode-select --version
> xcode-select version 2349.
>```

## 安装iterm2
> http://iterm2.com
> ![Alt text](/uploads/1522039731957.png)
> 下载安装就行，打开以后保留在dock里面，方便以后快速打开.  
> 这是主力开发工具之一


## 安装homebrew
> https://brew.sh
> ![Alt text](/uploads/1522039842393.png)
> 打开iterm2, 粘贴以下命令回车，根据提示继续操作就行
> ```powershell
> $ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
> ```
> 中间可能会需要授权，输入mac的登录密码就可以了。  
> 安装时间根据网络情况可能会比较长，半个小时左右吧，慢慢等。  
> 等homebrew装完以后就方便多了，很多软件都可以用brew来安装. 
> 相关命令可以查阅网站文档
> ![Alt text](/uploads/1522039638512.png)

## 安装zsh，oh-my-zsh
> 用brew安装文档是很方便的  
> install ZSH via [wiki](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH#macos)
> http://github.com/robbyrussell/oh-my-zsh
> 
> ```powershell
> $ brew install zsh zsh-completions
> $ zsh --version
> zsh 5.4.2 (x86_64-apple-darwin17.3.0)
> ```
> 安装oh-my-zsh的话可能需要先安装**wget** 或者 **curl**
> ```powershell
> $ brew install wget
> $ sh -c "$(wget https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
> ```
> 安装完 oh-my-zsh 以后，拷贝一个 zsh的配置过来
> ```powershell
> $ cp ~/.oh-my-zsh/templates/zshrc.zsh-template ~/.zshrc
> ```

## 配置zshrc，oh-my-zsh
第一个就是换成自己喜欢的theme，用起来顺手顺眼.  
[Themes](https://github.com/robbyrussell/oh-my-zsh#themes)
我喜欢的是 agnoster 这个theme，所以先修改配置
![Alt text](/uploads/1522041444038.png)
然后根据提示去安装字体，via [fonts-powerline](https://github.com/powerline/fonts)
```powershell
git clone https://github.com/powerline/fonts.git --depth=1
cd fonts
./install.sh
cd ..
rm -rf fonts
```
然后打开iterm的偏好设置，修改默认字体
![Alt text](/uploads/1522042214924.png)
不喜欢iterm配色还可以去下载一堆回来慢慢试.  
[iTerm Themes](http://iterm2colorschemes.com/)


## 安装sublime text 或者 vim
> http://www.sublimetext.com/3
>![Alt text](/uploads/1522039693029.png)
> 我个人的习惯是给sublime text设置一个命令行启动
> ```powershell
> $ ln -f -s /Applications/Sublime\ Text.app/Contents/SharedSupport/bin/subl /usr/local/bin/subl
> ```
> 记得在~/.zshrc 里面加上PATH 或者去掉该行注释
> ![Alt text](/uploads/1522047294708.png)
> 这样的好处是可以从命令行快速的用sublime打开文件
> ```powershell
> $ subl ~/.zshrc
> ```
> sublime text 有一堆的插件，这个在另外的笔记里面去介绍。

## 安装 rbenv
> 开发rails的话目前推荐用 rbenv管理本地的ruby版本， via . [rbenv](https://github.com/rbenv/rbenv)
> ```powershell
> $ brew install rbenv
> $ brew install ruby-build
> ```

## 配置github的ssh key
> 目的是为了本地命令行不用每次都输入GitHub的账号密码  
> https://github.com/settings/keys  
> https://help.github.com/articles/connecting-to-github-with-ssh/

```powershell
# 生成 ssh key
# 一路回车，除非有特别需求，可以看看上面的链接文档
$ ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
# 拷贝 ssh keys
$ pbcopy < ~/.ssh/id_rsa.pub
```
粘贴到GitHub的账户设置里面
[SSH keys / Add new](https://github.com/settings/ssh/new)
![Alt text](/uploads/1522051389139.png)

## 额外的工具推荐
1. thefuck
> 一款自动纠正上一条打错的命令
> https://github.com/nvbn/thefuck

2. autojump
> 具备学习功能的快速跳转路径的命令行工具
> https://github.com/wting/autojump

3. Alfred
> 一款mac上的快捷神器，不仅可以快速打开app
> 还可以自制或者下载一些高效的workflow

4. dash
> 开发不可缺少的，本地化文档

5. postman
> api开发推荐神器
> 模拟和管理各种request
> 还可以自动化生成api文档

6. chrome
> 也算是必须安装的浏览器吧
