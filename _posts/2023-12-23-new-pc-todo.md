---
title: "新电脑必做事项清单"
date: 2023-12-23
categories: [生活, 效率]
tags: [新电脑, 系统设置, 提效]
author: Comet
---

## 新电脑必做事项

1. **修改默认保存路径**
   - 将文档、图片、下载等文件夹的默认保存路径从C盘修改为其他盘（如D盘或E盘），避免系统盘空间不足。
   - 操作方法：右键"文档"等文件夹 → 属性 → 位置 → 移动。

2. **安装常用软件**
   - 浏览器、输入法、办公软件、开发工具等。

3. **配置系统更新与驱动**
   - 检查Windows更新，安装最新补丁。
   - 安装显卡、主板等硬件驱动。

4. **设置还原点和备份**
   - 创建系统还原点，方便后续恢复。
   - 配置重要数据自动备份到云端或移动硬盘。

5. **调整电源与性能设置**
   - 根据使用需求设置高性能或节能模式。

6. **个性化桌面与快捷方式**
   - 设置桌面壁纸、任务栏、开始菜单等。
   - 创建常用软件快捷方式。

7. **安全与隐私设置**
   - 配置防火墙、杀毒软件。
   - 检查隐私权限，关闭不必要的数据收集。

> 以上操作可大幅提升新电脑的使用体验和数据安全性。

## Win10更改AppData默认存储路径方法

Win10电脑的AppData文件夹用于存放软件的配置文件和临时文件，默认在C盘。随着使用时间增长，AppData会占用大量C盘空间。你可以通过以下方法将其迁移到其他盘：

### 一、修改Windows用户账户文件夹路径
1. 打开注册表编辑器（Win+R 输入 `regedit`）。
2. 定位到：
   `计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList\S-1-5-21-...`
   - 路径最后一段（S-1-5-21-...）通常是最长的那一项。
   - 在右侧找到 `ProfileImagePath` 字段，修改为你想要的新用户目录路径。
3. 修改后，用户目录（含AppData）会整体迁移，无需单独修改AppData路径。

### 二、单独更改AppData的默认存储路径
1. 打开注册表编辑器（Win+R 输入 `regedit`）。
2. 建议先在"文件"菜单中使用"导出"功能备份注册表。
3. 定位到：
   `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\Shell Folders`
4. 在右侧找到 `AppData`，将其路径修改为自定义位置（如D:\AppData）。
5. 将原AppData目录下的所有数据复制到新位置。
6. 重启电脑即可生效（部分数据可能无法复制，但一般不会影响正常使用）。

### 三、可选：更改ProgramData默认路径
- 注册表地址：
  `计算机\HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\ProfileList`

> 修改注册表有风险，操作前请务必备份，谨慎操作。

---

**参考与版权声明：**
本文部分内容参考自 CSDN 博主 justlpf 的原创文章，遵循 CC 4.0 BY-SA 版权协议。
原文链接：https://blog.csdn.net/justlpf/article/details/128200123 