---
title: 新电脑开箱必看：Windows 10/11 系统优化、软件隔离与 C 盘减肥全攻略
published: 2023-12-23
updated: 2026-07-25
description: 涵盖新机初始化设置、OptimizerDuck 系统优化工具实战指南、软件与 AppData/Chrome 零风险 C 盘数据迁移（mklink /J 目录联接）全过程
image: /images/new-pc-todo-2023.jpg
category: 学习记录
tags:
  - 系统设置
  - 效率工具
  - C盘清理
draft: false
---

# 新电脑开箱必看：Windows 10/11 系统优化、软件隔离与 C 盘减肥全攻略

无论是刚购买的新电脑还是重新安装的 Windows 10/11 系统，系统默认设置往往包含了大量后台遥测、预装流氓软件以及将所有数据强制保存在 C 盘的策略。

本文整理了一套系统初始化与瘦身清单，涵盖基础设置、**OptimizerDuck** 开源系统调优工具的使用，以及利用 `mklink /J` 目录联接零风险迁移 Chrome/AppData 数据的实战方法。

---

## 1. 新设备基础设置与用户目录重定向

### 1.1 个人文件夹路径重定向（桌面/文档/下载）
Windows 默认将“桌面”、“文档”、“下载”等文件夹放置在 `C:\Users\用户名\` 下，随时间推移会导致 C 盘迅速爆满。

**推荐修改方法（无需改注册表）**：
1. 打开“此电脑”，右键点击 **“下载”** 文件夹 ➔ 选择 **“属性”**。
2. 切换到 **“位置”** 选项卡，点击 **“移动...”** 按钮。
3. 将路径修改为 D 盘对应位置（如 `D:\Downloads`），点击应用。
4. 系统会提示“是否将原位置的所有文件移动到新位置”，选择 **“是”**。
5. 同理对 **“桌面”** (`D:\Desktop`) 和 **“文档”** (`D:\Documents`) 进行相同重定向。

---

## 2. 系统瘦身与隐私优化神器：OptimizerDuck 实战指南

针对 Windows 10/11 繁杂的后台服务、遥测追踪与自带预装软件，推荐使用开源便携工具 **OptimizerDuck**（如 `optimizerDuck-Windows-x64-2.24.2.exe`）进行一键清理。

### 2.1 什么是 OptimizerDuck？
OptimizerDuck（项目托管于 GitHub）是一款完全免费、开源且绿色的 Windows 系统优化与隐私保护工具。它不需要安装，单个 `.exe` 文件即可运行，旨在替代繁琐的注册表与组策略修改。

### 2.2 核心功能与优化推荐

1. **隐私与遥测（Telemetry）关闭**：
   - 禁用 Windows 诊断数据回传、Cortana 语音助手、Edge 后台追踪及广告 ID，防止后台暗刷网速与 CPU 占用。
2. **预装软件安全卸载（Debloat）**：
   - 一键安全卸载微软自带的非必要 UWP 应用（如 Xbox 组组件、Solitaire 游戏、OneDrive 等）。
3. **系统性能调优（Performance Tweaks）**：
   - 开启系统“卓越性能”电源计划。
   - 禁用无用的系统日志记录与崩溃转储。
   - 优化游戏模式响应延迟与磁盘输入输出。
4. **启动项与服务管理**：
   - 在可视化界面中管理开机自启项及第三方后台服务，防止软件静默自启。

### 2.3 使用步骤与注意事项
1. **右键以管理员身份运行** `optimizerDuck-Windows-x64-2.24.2.exe`。
2. 首次使用建议先点击内置的 **“创建系统还原点 (Create Restore Point)”** 选项，防止误操作。
3. 在 **“General (通用)”** 与 **“Windows 10/11”** 标签页中勾选所需的优化项。
4. 点击 **“Apply (应用)”**，完成后重启电脑使系统设置生效。

---

## 3. C 盘防爆满核心策略：Chrome 及应用数据符号链接迁移

### 3.1 为什么不要直接修改注册表的 ProfileImagePath？
部分网帖推荐修改注册表中的 `ProfileImagePath` 或 `Shell Folders` 来迁移整个 AppData 文件夹。这种方法在 Windows 10/11 大版本更新或新建用户账号时，极易导致系统崩溃、登录死循环或应用权限失效。

最安全、零风险的替代方案是使用 NTFS 系统的 **目录联接（Directory Junction / mklink /J）**。

### 3.2 目录联接（mklink /J）工作原理
`mklink /J` 可以为指定文件夹在 C 盘创建一个透明的“快捷指针”，对任何软件和系统而言，读取 `C:\Path` 依然完全正常，但数据实际在后台被透明重定向读写到了 `D:\Path`，完全不占用 C 盘空间。

### 3.3 实战案例：迁移 Google Chrome 数据与缓存到 D 盘

Google Chrome 的用户配置、插件与缓存默认堆积在 `C:\Users\用户名\AppData\Local\Google\Chrome` 中，空间可达几 GB 至几十 GB。

#### 迁移步骤：

1. **彻底关闭 Chrome**：
   确保任务管理器中无 `chrome.exe` 进程残留。

2. **移动数据文件夹**：
   - 打开 `C:\Users\用户名\AppData\Local\Google`
   - 将其中的 **`Chrome`** 文件夹直接剪切（Ctrl+X），粘贴到 D 盘目录（如 `D:\Google\Chrome`）。

3. **创建 Junction 联接**：
   按 `Win + S` 搜索 **CMD**，右键选择 **“以管理员身份运行”**，执行以下命令：
   ```cmd
   mklink /J "C:\Users\用户名\AppData\Local\Google\Chrome" "D:\Google\Chrome"
   ```

4. **验证状态**：
   控制台提示 `为 C:\Users\...\Chrome <<===>> D:\Google\Chrome 创建的联接` 即可。此时 C 盘目录下会生成一个带有快捷方式图标的文件夹，实际空间全部在 D 盘。

### 3.4 通用单软件迁移公式
此方法适用于任何将大量缓存保存在 AppData 的软件（如微信数据、JetBrains 缓存、VS Code 扩展等）：

```cmd
:: 1. 关闭对应软件
:: 2. 剪切 C:\Users\用户名\AppData\Local\软件名 到 D:\SoftwareData\软件名
:: 3. 以管理员身份运行 CMD 执行：
mklink /J "C:\Users\用户名\AppData\Local\软件名" "D:\SoftwareData\软件名"
```

### 3.5 进阶方案：一劳永逸整体迁移整套 AppData / 用户数据目录

如果觉得单款软件依次迁移太繁琐，想**一次性把所有软件的配置文件、微信/QQ聊天记录、软件插件与缓存全部搬离 C 盘**，可以通过整体迁移 AppData 目录来实现。

#### 为什么不推荐直接改注册表 ProfileImagePath？
直接在注册表中把 `C:\Users\用户名` 全盘改到 D 盘，容易在 Windows 10/11 进行大版本更新（如 22H2 升 23H2）或新建用户时导致登录死循环或权限丢失。

#### 最稳妥的整套 AppData 零风险迁移步骤：

1. **新建备用管理员账号（避免文件被当前登录账号锁定）**：
   - 打开“设置” ➔ “账户” ➔ “其他用户”，新建一个临时本地管理员账号（如 `AdminTemp`）并登录该账号。

2. **移动整套 AppData 的三个核心子文件夹**：
   - 打开 `C:\Users\您的原用户名\AppData\` 目录（需勾选显示隐藏文件）。
   - 在 D 盘创建目标目录，如 `D:\UserData\AppData\`。
   - 将原账号下的 **`Local`**、**`Roaming`**、**`LocalLow`** 三个文件夹直接剪切（Ctrl+X）粘贴到 `D:\UserData\AppData\` 目录下。

3. **创建整套 AppData 目录联接**：
   - 以管理员身份运行 CMD，依次执行以下命令：
     ```cmd
     mklink /J "C:\Users\您的原用户名\AppData\Local" "D:\UserData\AppData\Local"
     mklink /J "C:\Users\您的原用户名\AppData\Roaming" "D:\UserData\AppData\Roaming"
     mklink /J "C:\Users\您的原用户名\AppData\LocalLow" "D:\UserData\AppData\LocalLow"
     ```

4. **切回原主账号**：
   - 注销临时账号，重新登录您的原主账号。此时 C 盘将瞬间释放 20GB ~ 100GB+ 空间，且后续安装的所有软件配置与缓存都会透明写入 D 盘！

---

## 4. 常见问题与总结

- **问：如果将来想恢复 C 盘默认状态怎么办？**  
  答：只需直接删除 C 盘下的这个软链接文件夹（不会删除 D 盘的真实数据），然后把 D 盘数据剪切回 C 盘即可。
- **问：重装系统后 D 盘的数据还在吗？**  
  答：在。重装完系统后，只需在新系统里重新执行一次 `mklink /J` 命令，即可秒级恢复之前的所有软件数据与配置！