---
layout: post
title: "Google Antigravity 代理使用"
subtitle: "Gemini 3 IDE登录与使用问题完整解决方案"
date: 2025-11-28 10:00:00 +0800
author:     "Comet"
categories: AI Antigravity Gemini 工具
header-style: text
tags:
    - Antigravity
    - Gemini
    - AI
    - 工具
    - 代理
    - 问题记录
---

# Google Antigravity 代理指南

## 前言

谷歌的Gemini 3 发布了，很强大。而且这次他们还发布了IDE - Antigravity。但对于中国用户来说，又遇到了老生常谈的问题，登录不上，使用不了。本文介绍我个人解决 Google Antigravity 无法登录以及其他问题的经验。

![Antigravity IDE 界面](/img/in-post/antigravity-preview.svg)

## 常见问题

从我个人使用过程来看，主要是下面几个地方会卡住：

1. **登录谷歌账号的时候**，显示成功但返回不了 Antigravity，软件上无法点击下一步。
2. **成功登录之后**，软件上显示 "Setting up your account"，一直转圈。
3. **模型加载阶段**，一直卡在 "Loading models"，模型加载不出来。
4. **使用过程中**，本来用着好好的，提示账号 is not eligible。

## 解决方案一：代理模式调整

这些问题的核心问题还是在于代理。以下是我亲测有效的解决办法：

### 1. 登录授权卡住问题

**问题描述**：刚打开 Antigravity，根据提示一步步设置，然后要求登录 Google 账号的时候，就显示已经成功授权，点击返回 Antigravity，但是就是没反应。

**解决办法**：打开你代理客户端的 **TUN 模式（虚拟网卡）**，然后选择**非香港节点**。我当时使用大哥云的新加坡节点通过了这步。

**重要提示**：这一步其实也没有要求你账号的区域，我香港地区的账号一样通过了授权。

### 2. 账号设置转圈问题

**问题描述**：通过授权返回 Antigravity 时，就一直在 "Setting up your account" 这里转圈。我转了一个多小时还是没成。

**解决办法**：切换节点或者机场。我直接睡觉了，今天上午换了龙猫云的新加坡节点就过去了。

**社区经验**：我在 Linux Do 上看到有人说他今天早上重新登录，香港节点垃圾节点+香港的地区账号+规则代理也通过了。所以可能也是运气问题。

### 3. 账号资格问题

这一步你可能会遇到两个报错：

#### 报错一：地区限制
```
Your current account is not eligible for Antigravity, because it is not
currently available in your location.
```

**解决办法**：账号资格这块，就去改账号地区或者重新去注册一个美国区的Google账号。

**更改地区步骤**：
1. 查看地区：[https://policies.google.com/terms](https://policies.google.com/terms)
2. 切换地区：[https://policies.google.com/country-association-form](https://policies.google.com/country-association-form)

**注意**：不过也有很多人被卡在修改这步了，被拒了。

**重要发现**：但是我分别用一个免费账号和Pro账号做了试验，如果你的账号本身有 Gemini Pro 的话，好像就不会遇到报错。

> P.S. 之前白嫖的一年 Gemini Pro 物超所值的感觉啊。

#### 报错二：账号不符合要求
```
Your current account is not eligible for Antigravity. Try signing in with another personal Google account.
```

**解决办法**：先去下个工具：[Antigravity-Manager](https://github.com/lbjlaq/Antigravity-Manager)

登录你的账号，然后按照工具中的提示操作。

## 解决方案二：使用 Proxifier

补充一个方法，这几天在网上看到的。除了直接开 TUN 模式之外，还可以使用 Proxifier，这是一个代理客户端。搭配梯子使用，它能让 Antigravity 也乖乖得走代理。

### 下载并激活 Proxifier

1. **下载安装 Proxifier**：访问官网下载并安装

2. **软件激活**：这个软件可以试用，我在网上找到了别人逆向出来的Proxifier激活码。（源：Github）

| 版本 | 激活码 |
|-----|-------|
| Windows安装版 | CLOT5-J3GYK-VGPYE-BDPMN-WKWMU |
| Windows便携版 | NY8VX-Z2NH2-TFXWY-IL5YC-GARRM |
| Mac | 57J8Z-D2QD5-A37WU-LEG4E-43WYH |

### 配置代理服务器

1. 点击菜单 **Profile > Proxy Servers**
2. 填写配置信息：
   - **Address**：填写 `127.0.0.1`
   - **Port**：填写你自己的端口，Clash一般默认是 `7890`
   - **Protocol**：协议选 `Socks 5`
3. 完成后点击 **OK** 回到主界面

### 给 Antigravity 设置规则

1. 点击 **Profile > Proxification Rules**
2. 点击 **Add** 添加规则：
   - **Name**：随便填，比如 "Antigravity"
   - **Applications**：填 `antigravity.exe; language_server_windows_x64.exe` 或者你点 Browse 自己选取
   - **Target host** 和 **Target ports**：不用填
   - **Action**：选择 `Proxy SOCKS5 127.0.0.1`
3. 点击 **OK** 保存

然后梯子就继续选择系统代理就行了。

## 总结

总结一下，使用 Google Antigravity 的时候：

1. **确保你开启了TUN模式**。至于规则还是全局无所谓。或者搭配使用 Proxifier。
2. **使用非香港节点**。建议多尝试一些节点。
3. **最好是有 Gemini Pro**，我觉得遇到的玄学问题会少一些，而且有 Pro的话，你的免费配额也会更多一些。

## 常见问题排查清单

| 问题 | 可能原因 | 解决方案 |
|-----|---------|---------|
| 登录后无法返回 Antigravity | 代理不支持 OAuth 回调 | 开启 TUN 模式 |
| Setting up your account 一直转圈 | 节点速度太慢或被限制 | 更换节点 |
| Loading models 卡住 | 网络连接不稳定 | 检查代理连接 |
| 提示账号不可用 | 账号地区限制 | 更改账号地区或使用新账号 |

## 快速开始：3步搞定

如果你不想看那么多细节，可以直接按以下步骤操作：

1. **确保代理开启 TUN 模式**，选择新加坡或美国节点
2. **打开 Antigravity**，正常登录 Google 账号
3. **耐心等待**，如果某个步骤卡住超过 10 分钟，尝试重启软件或更换节点

## TUN 模式配置指南

### Clash 开启 TUN 模式

如果你使用的是 Clash 作为代理客户端，按以下步骤开启 TUN 模式：

1. 打开 Clash 配置界面
2. 找到 "TUN" 或 "虚拟网卡" 设置
3. 开启 "Enable TUN Device" 或类似选项
4. 重启 Clash 使设置生效

**注意**：开启 TUN 模式可能需要管理员权限。

### 其他代理客户端

- **Clash for Windows**：设置 > 系统 > 开启 "TUN 模式"
- **ClashX Pro**（Mac）：菜单栏 > TUN > 开启
- **V2RayN**：需要额外配置，建议参考官方文档

## 常见问题补充

### 模型加载失败怎么办？

如果一直卡在 "Loading models"：

1. 首先检查你的网络连接是否稳定
2. 尝试更换节点（有时候当前节点被限速了）
3. 确保你的代理连接是持续的，没有断开
4. 如果是第一次使用，模型需要下载，需要等待较长时间

### 为什么建议使用 Gemini Pro？

1. **减少报错**：有 Pro 的账号遇到资格问题的概率更低
2. **更多配额**：Pro 账号的免费使用额度更多
3. **优先访问**：可能有更好的服务器资源

### 如何检查我的账号是否有 Gemini Pro？

1. 访问 [Gemini 官网](https://gemini.google.com/)
2. 登录你的 Google 账号
3. 查看是否有 "Gemini Pro" 或类似标识

## 附录：推荐节点配置

根据社区反馈，以下配置成功率较高：

| 提供商 | 推荐节点 | 测试结果 |
|-------|---------|---------|
| 大哥云 | 新加坡 | ✅ 成功 |
| 龙猫云 | 新加坡 | ✅ 成功 |
| 其他机场 | 美国西部 | ⚠️ 部分成功 |
| 其他机场 | 美国东部 | ⚠️ 部分成功 |
| 其他机场 | 日本 | ❌ 失败率较高 |
| 其他机场 | 韩国 | ❌ 失败率较高 |

## 注意事项

1. **不要频繁更换账号**：Google 可能会检测到异常行为
2. **保持代理稳定**：避免在使用过程中频繁切换节点
3. **耐心等待**：首次设置可能需要较长时间，不要轻易放弃
4. **备份重要数据**：在尝试各种方法前，确保你的数据安全
5. **尊重用户协议**：合理使用 Antigravity，遵守 Google 的服务条款

祝大家都能顺利使用 Antigravity！有问题欢迎在评论区交流。

## 参考资料

- [Antigravity-Manager GitHub](https://github.com/lbjlaq/Antigravity-Manager)
- [Google 地区设置](https://policies.google.com/country-association-form)
- [Proxifier 官网](https://www.proxifier.com/)
- [Linux Do 社区讨论](https://linux.do/)