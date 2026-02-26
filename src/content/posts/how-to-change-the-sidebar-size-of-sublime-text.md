---
title: 修改SublimeText侧边栏的字体大小
subtitle: Sublime Text 3 how to change the font size of the file sidebar?
author: 黄药师
date: 2018-04-17T00:00:00.000Z
tags:
  - Notes
  - Sublime Text
  - Mac
lang: zh
draft: false
description: Sublime Text 3 how to change the font size of the file sidebar?
---

使用ST3的过程中，想对ST做一些个性化调整，比如sidebar里文件列表的字体大小。

---

写代码的时候我可以接受字体小一点，但是sidebar涉及鼠标点击事件，字体太小容易点错。  
所以尝试修改sidebar的字体，其实类推这里可以做很多个性化定制：

1. 打开Sublime Text 的 **Preferences(个人偏好)** -> **浏览插件(Browse Packages)**
![Browse Packages](https://ws3.sinaimg.cn/large/006tKfTcgy1fqhbg3sbt4j30qq0iyn39.jpg)
2. 打开 `User` 目录
3. 创建一个新文件 `Default.sublime-theme`，如果你没有使用默认主题而是自己的主题的话，比如我是 **itg.flat.dark.sublime-theme** 那文件名就是 `itg.flat.dark.sublime-theme`， 写入
```
[
    {
        "class": "sidebar_label",
        "color": [0, 0, 0],
        "font.bold": false,
        "font.size": 12
    }
]
```
实测你可以去掉 color 那一行，或者自己修改成自己喜欢的颜色。  
保存及时生效，如果没生效肯定是文件名错了。  
![](https://ws3.sinaimg.cn/large/006tKfTcgy1fqhbnibm3tj31760xegqy.jpg)

还有很多参数可以配置，可以参考一下：[Default.sublime-theme](https://gist.github.com/oiahoon/6b6a0a715ccb8f0f9c40ef9e6fb9d6db)  
我只列出一部分：
```
[
    {
        "class": "label_control",
        "color": [255, 255, 255],
        "shadow_color": [24, 24, 24],
        "shadow_offset": [0, -1]
    },
    {
        "class": "button_control",
        "content_margin": [6, 5, 6, 6],
        "min_size": [75, 0],
        "layer0.texture": "Theme - Default/full_button.png",
        "layer0.opacity": 1.0,
        "layer0.inner_margin": [6, 6],
        "layer1.texture": "Theme - Default/full_button_indented.png",
        "layer1.opacity": 0.0,
        "layer1.inner_margin": [6, 6],
        "layer2.texture": "Theme - Default/blue_highlight.png",
        "layer2.opacity": { "target": 0.0, "speed": 1.33, "interpolation": "smoothstep" },
        "layer2.inner_margin": [6, 6]
    }
]
```
