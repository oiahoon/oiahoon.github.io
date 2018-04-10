---
layout:     post
title:      "解决MacOS升级后出现xcrun: error"
subtitle:   "解决MacOS升级后出现xcrun: error: invalid active developer path, missing xcrun的问题"
author:     "黄药师"
date:       2018-04-10
tags:
    - Notes
    - Mac
    - xcrun
    - error
---

本文解决MacOS升级后出现xcrun: error: invalid active developer path, missing xcrun的问题。

---

今天升级macOS High Sierra，终端里使用git的时候，弹出一行莫名其妙的错误：

```powershell
xcrun: error: invalid active developer path (/Library/Developer/CommandLineTools), missing xcrun at: /Library/Developer/CommandLineTools/usr/bin/xcrun

```

解决方法，重装xcode command line：

```powershell
$ xcode-select --install
```

如果没有解决问题，执行以下命令

```powershell
$ sudo xcode-select -switch /
```