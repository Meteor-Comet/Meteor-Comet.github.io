---
layout: post
title: "VPN节点搭建完整教程"
subtitle: "从VPS购买到Netflix解锁"
date: 2024-08-01 12:00:00
author: "Comet"
catalog: true
tags:
    - VPN
    - VPS
    - X-UI
    - Netflix解锁
---

## 目录

1. [购买并初始化VPS](#vps-purchase)
2. [连接服务器并进行基准测试](#server-connection)
3. [安装X-UI面板](#install-xui)
4. [创建节点](#create-node)
5. [客户端连接与基础测试](#client-test)
6. [配置WARP分流，解锁Netflix](#warp-config)
7. [总结](#summary)

## VPN节点搭建完整教程

### 第一步：购买并初始化你的VPS

以CloudCone (CC)的$15/年特价VPS为例：

- **选择配置**：2核CPU, 2GB内存, 120GB SSD
- **选择系统**：Ubuntu 22.04（兼容性最好的主流选择）
- **完成支付**：支持支付宝、PayPal、信用卡等，CC需要先充值到账户余额
- **获取信息**：创建成功后，获取服务器IP地址、用户名（通常是root）和初始密码

**VPS推荐**：
- 10美元VPS：`https://hello.cloudcone.com/`
- 住宅IP VPS：`https://ipraft.com/server/purchase`

### 第二步：连接服务器并进行基准测试

- 使用SSH客户端（如Termius, Xshell, Putty）连接服务器
- 运行综合性测试脚本，了解CPU、内存、硬盘性能及流媒体解锁能力：

```bash
curl -L https://gitlab.com/spiritysdx/za/-/raw/main/ecs.sh -o ecs.sh && chmod +x ecs.sh && bash ecs.sh
```

### 第三步：使用一键脚本安装X-UI面板

使用“甬哥”一键脚本安装图形化X-UI面板：

```bash
bash <(wget -qO- https://raw.githubusercontent.com/yonggekkk/x-ui-yg/main/install.sh)
```

安装过程中：
- 选择1安装X-UI
- 选择1关闭防火墙（新手推荐）
- 设置面板登录名、密码和端口以及根路径

### 第四步：在X-UI中创建你的第一个节点

- 通过`你的IP:你设置的端口`访问X-UI网页后台
- 进入“节点列表”，点击“添加节点”
- 协议配置：选择VMess协议，传输协议选择ws (WebSocket)，其他保持默认
- 点击添加，然后复制生成的分享链接

### 第五步：客户端连接与基础测试

- 将分享链接导入客户端（如v2rayN, Clash等）
- 连接后进行测速，尝试访问Google, YouTube等网站
- 注意：此时访问Netflix可能只能观看自制剧，这是原生IP被限制

### 第六步：【进阶技巧】配置WARP分流，解锁Netflix

利用Cloudflare WARP为VPS“套上”更纯净的IP，只让Netflix流量走这个IP：

1. **安装WARP SOCKS5代理**：
   - 重新运行甬哥脚本
   - 选择11进入Cloudflare WARP相关功能
   - 选择3安装WARP SOCKS5代理，然后选择2 (IPv4)完成安装

2. **配置X-UI出站分流**：
   - 回到X-UI面板，进入“面板设置”->“Xray相关设置”->“出站设置”
   - 在routing的rules数组中添加以下规则：

   ```json
   { "type": "field", "outboundTag": "xray-socks5-warp-v4", "domain": ["geosite:netflix"] }
   ```

3. **保存并重启**：保存配置并重启X-UI面板

### 总结

自建节点看似复杂，但借助强大的一键脚本，整个过程可以变得非常简单。通过基础的节点搭建和进阶的WARP分流，你不仅可以拥有一个稳定、私密的专属网络通道，还能享受到无限制的流媒体服务。