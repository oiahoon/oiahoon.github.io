---
title: 自行搭建ELK相关事宜
subtitle: 公司需要搭建ELK系统的可以参考一下。
author: 黄药师
date: 2018-04-19T00:00:00.000Z
tags:
  - Notes
  - ELK
  - Elasticsearch
  - Kibana
  - Logstash
  - mongodb
  - slow query
lang: zh
draft: false
description: 公司需要搭建ELK系统的可以参考一下。
---

本文主要介绍自己搭建一套ELK的大概流程，和遇到的一些问题。

---

## INSTALLATION

### 1. 安装
[Downloads](https://www.elastic.co/downloads)，[Documents](https://www.elastic.co/guide/en/logstash/current/index.html)
注意 logstash需要 Java8 。并且不支持Java 9.
```powershell
java -version
```

### 2. 拆分config文件
```powershell
$ mkdir profiles
$ touch profiles/request.config profiles/db.log.config
$ # test configs
$ bin/logstash --config.test_and_exit -f profiles/
$ # start logstash
$ bin/logstash -f profiles/
```
讲不同的日志过滤器拆分到各自的文件去，方便维护。注意通过**type**或者字段区分grok的条件。

### 3. Visualize 数据可视化
> 待添加
> 

### 4. Metricbeat 
> 待添加
> 

### 5. Packetbeat
> 待添加
> 

### 6. Heartbeat
> 待添加
> 

## ISSUES:

### 1. mongodb `sytem.profile` 读取方式取舍

一开始考虑用 `logstash-input-mongo` 的方式来读取 **system.profile**
```powershell
# /etc/logstash/conf.d/00-mongodbinput.conf
input {
    mongodb {
     uri => 'mongodb://dds-xxxx.mongodb.rds.aliyuncs.com:3007/POCDB'
     placeholder_db_dir => '/var/local/logstash-mongodb/'
     collection => 'system.profile'
     batch_size => 500
     generateId => true
     }
}
```
结果发现这个插件有个过滤条件会把包含`system`的结果过滤掉，囧。via. [logstash-input-mongodb/issues/8](https://github.com/phutchins/logstash-input-mongodb/issues/8)

然后考虑通过 [plugin-inputs-file](https://www.elastic.co/guide/en/logstash/6.2/plugins-inputs-file.html) 读取日志文件的方式，结果发现阿里云不给直接读取文件。

最后选择了用 [logstash-input-exec](https://www.elastic.co/guide/en/logstash/6.2/plugins-inputs-exec.html)，通过命令行去获得slow query 的记录。

```powershell
input {
    exec {
        command => "mongo -u readonly -p '5437a&b$2UmO' dds-xxxx.mongodb.rds.aliyuncs.com:3007/database_production --eval 'db.system.profile.find({ts : {$gt: new Date(ISODate().getTime() - 1000*60), $lt: new Date()}})' | tail -n +3"
        interval => 60
        type => "db.serverStatus"
        add_field => { "dbserver" => "mongodb_log" }
    }
}
```
解释一下，每60秒 (`interval`) 执行一次，获取60秒之前 (`new Date(ISODate().getTime() - 1000*60`) 到现在的慢查询日志，添加一个字段`dbserver`值为`mongodb_log`，方便在 elacticsearch 那边做数据聚合。

### 2. prok、filter 问题
```powershell

filter {
  # 通过字段来选择filter
  if [dbserver] == "mongodb_log" {
    # 按行拆分为一条一条的
    split {
      field => "message"
    }

    grok {
      # 不含关键词的日志都丢弃
      match => ["message", "database_production"]
      tag_on_failure => ["drop_lines"]
      add_tag => ["db.log"]
    }
    grok {
      # logstash 本身用来做 input 的查询丢弃
      match => ["message", "\.system\.profile"]
      add_tag => ["drop_lines"]
    }
    grok {
      match => ["message", "%{MONGO_QUERY:mongo_query}"]
      add_tag => ["mongo_query"]
    }

    grok {
      match => ["message", "\"ts\"%{SPACE}\:%{SPACE}ISODate\(\"%{DATA:happened_at}\"\),"]
      add_tag => ["mongo_query"]
    }

    grok {
      match => ["message", "\"millis\"%{SPACE}\:%{SPACE}%{NUMBER:spendtime:int},"]
      add_tag => ["mongo_query"]
    }

    grok {
      match => ["message", "\"client\"%{SPACE}\:%{SPACE}\"%{DATA:client_ip}\""]
      add_tag => ["mongo_query"]
    }

    if "mongo_query" in [tags] {
      mutate {
        remove_tag => ["_grokparsefailure"]
      }
    }
    # 丢掉 grok 失败的结果
    if  "_grokparsefailure" in [tags] {
      drop { }
    }
    # 丢弃选择丢弃的内容
    if "drop_lines" in [tags] {
      drop { }
    }
    # 把查询语句丢掉，因为里面有敏感信息
    mutate {
      remove_field => ["command"]
    }
  }
}

```

### 3. logstash server cannot connect to mongo

```powershell
$ mongo dds-xxxx.mongodb.rds.aliyuncs.com:3007 --authenticationDatabase admin -u root -p
MongoDB shell version: 2.6.10
Enter password:
connecting to: dds-xxxx.mongodb.rds.aliyuncs.com:3007/test
2018-04-17T11:39:48.902+0800 DBClientCursor::init call() failed
2018-04-17T11:39:48.903+0800 Error: DBClientBase::findN: transport error: dds-xxxx.mongodb.rds.aliyuncs.com:3007 ns: admin.$cmd query: { whatsmyuri: 1 } at src/mongo/shell/mongo.js:148
exception: connect failed
```
以为是vpc 到ecs的 classicLink 没有配置的问题，后来老大说是mongodb的白名单。加了白名单以后，又出现了认证失败的问题：
```powershell
$ mongo --host dds-xxxx.mongodb.rds.aliyuncs.com:3007 --authenticationDatabase admin -u readonly -p
MongoDB shell version: 2.6.10
Enter password:
connecting to: dds-xxxx.mongodb.rds.aliyuncs.com:3007/test
2018-04-17T13:23:52.299+0800 Error: 18 { ok: 0.0, errmsg: "auth failed", code: 18, codeName: "AuthenticationFailed" } at src/mongo/shell/db.js:1287
exception: login failed
```
排除密码错误以后，推测是 mongo shell 的版本太低，阿里云的mongodb是3.+的

```powershell
$ mongo --version
MongoDB shell version: 2.6.10
```

我们是 ubuntu 16 所以卸载以后重新安装最新版，
> The important thing is: use `mongodb-org-tools` instead of `mongodb-clients`

```powershell
$ sudo apt-get remove mongodb-clients
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
$ echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
$ sudo apt-get update
$ sudo apt-get install mongodb-org-tools
$ sudo apt-get install mongodb-org-shell=3.2.19
```

依然认证失败

```powershell
$ mongo --host dds-xxxx.mongodb.rds.aliyuncs.com:3007 --authenticationDatabase admin -u readonly -p
MongoDB shell version: 3.2.19
Enter password:
connecting to: dds-xxxx.mongodb.rds.aliyuncs.com:3007/test
2018-04-17T13:47:26.365+0800 E QUERY    [thread1] Error: Authentication failed. :
DB.prototype._authOrThrow@src/mongo/shell/db.js:1441:20
@(auth):6:1
@(auth):1:2

exception: login failed
```
用 **root** 用户登录没问题 **readonly**账号还是认证失败，考虑是不是 readonly 账号没有权限，via.
[StackoverFlow - MongoDB 3.2 authentication failed
](https://stackoverflow.com/questions/37372684/mongodb-3-2-authentication-failed)[MongoDB云数据库常见问题诊断](https://yq.aliyun.com/articles/53771)

最后发现是数据库名字不对。o(╯□╰)o
