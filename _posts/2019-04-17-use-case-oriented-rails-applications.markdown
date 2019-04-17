---
layout:     post
title:      "为什么我们需要use_cases"
subtitle:   "面向use_case的rails项目"
author:     "黄药师"
date: 2019-04-17
tags:
    - Notes
    - use case
    - rails
    - ruby
    - cleancode
---

我一直以为，在写rails的时候使用**use_case**是一种很常见的意识。但是我发现还是有一部分人从来没用过或者没听说过**use_case**，出于让自己也更仔细的思考这种用法的目的，记录一下。

---

事情的起因是因为一次**code review**, 我很庆幸我们团队内部的**code review**做的一直都不错，大家都很认真的给彼此的代码做认真的检查，并且都能从中学到很多东西。
我封装了一个use_case，并且在model的callback里面去调用了这个use_case。这个做法遭到了给我做code review同事的质疑，然后我才知道原来还有部分道友还不知道use_case的用法。
当然我也并不是说我这样的做法就是最好的，但是这种既不属于model，也很难成为一个公用lib class的，并且单一职责，逻辑简单的玩意儿，随着项目的成长随时可能改变的东西，封装为一个use_case绝对是一个不错的选择。

试想我们有一个表单，需要给用户发验证码，并且在用户输入验证码以后比对验证码，才能允许用户正常提交。假设这个方法叫做`send_code`，我们创建一个发验证码的module叫做`Postman`。

我们的发验证码的controller长这样:
```ruby
class AuthController < ApplicationController
  def create
    auth_code = AuthCode.create(sms_params)
    if svc.success?
      render json: { sid: auth_code.sid }
    else
      render json: { status: 500 }, status: 500
    end
  end

  private
  def sms_params
    params.require(:verification).permit(:phone_number, :code)
  end
end

```
model长这样:
```ruby
class AuthCode < ActiveRecord::Base
  before_create :generate_code
  after_create :send_code

  def send_code
    Postman.new(phone_number, verify_code).perform
  end

  private
  def generate_code
    self.verify_code = rand.to_s[2..5].to_s
  end
end
```
这样我的controller只用关心验证码的创建就好，发不发/怎么发都是model的事儿，`AuthCode`记录创建好以后会通过callback去发送，这里的`Postman`就是我们前面提到的一个**use_case**：
```ruby
class Postman
  include UseCase

  def initialize(phone_number, message)
    @phone_number = phone_number
    @message      = message
  end

  def perform
    SMS::Client.new.messages.create(
      to: @phone_number,
      body: @message
    )
  end
end

```

而`UseCase`可以理解为一个接口定义，描述了所有use_case都需要遵循的规则，便于维护和自描述：
```ruby
module UseCase
  extend ActiveSupport::Concern
  include ActiveModel::Validations
  # extented class should contains these methods
  module ClassMethods
    # The perform method of a UseCase should always return itself
    def perform(*args)
      new(*args).tap(&:perform)
    end
  end

  # implement all the steps required to complete this use case
  def perform
    raise NotImplementedError
  end

  # inside of perform, add errors if the use case did not succeed
  def success?
    errors.none?
  end
end

```

这里有几点需要注意的:
- 每个use_case只有一个public的实例方法 (`perform`)
- 每个use_case只有一个职责，也就是只做一件事(发短信)
- 因为上一条，所以测试也很容易写
- 有一个Gem叫做[`caze`](https://github.com/magnetis/caze)可以让use_case的调用更优雅一些，不必像我这样显式的调用:
```ruby
Postman.new(phone_number, verify_code).perform
```
具体可以看看`caze`的文档。

顺便发一下代码的结构:
```
├── app
│   ├── controllers
│   │   ├── application_controller.rb
│   │   ├── auth_controller.rb
│   │   └── users
│   ├── models
│   │   ├── user.rb
│   │   └── auth_code.rb
│   ├── use_cases
│   │   ├── postman.rb
│   │   └── use_case.rb
```

这样一来，我们就：
## 把程序有什么
> models 比如**user**, **auth_code** 等等不怎么变化很稳定的东西。

## 和程序做什么
> **业务逻辑** 和 **use cases** 会随着项目的成长不停改变。

## 分开了。

## 那问题来了， 我们什么时候需要 use_case 呢？
> 当你需要管理resources，你就必须用rails的方式，也就是面向resource的方式去做，model啦，presenter啦，抽象类啦，都是很方便且有道理的。
> 但是，当你的业务里面有一个很特殊的功能，它不属于你的主营业务逻辑，且职责单一，随时可以变化甚至移除，那么你就可以考虑使用**use_case**，就像上面的代码那样。

# 总结
一万个程序员眼里有一万种**最佳实践**，use_case不是所有的场景都适用。但是当你有这样的思维以后，对于如何组织你的use_case，如何保持代码结构整洁肯定是有一定帮助的。

# Referreces
- [Architecture the Lost Years by Robert Martin](https://medium.com/magnetis-backstage/clean-architecture-on-rails-e5e82e8cd326)
- [Clean architecture on rails by Fabiano Beselga](https://www.youtube.com/watch?v=WpkDN78P884)
- [caze gem](https://github.com/magnetis/caze)
- [use case examples](http://www.gatherspace.com/use-case-examples/)