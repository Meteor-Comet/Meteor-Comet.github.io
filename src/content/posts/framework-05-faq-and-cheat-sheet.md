---
title: 框架详解 (五)：辅助模块、疑难 FAQ 与 API 速查表
published: 2026-06-06
description: 涵盖 ZCM968SOP 控件、程序启动初始化流程、机械臂基类开发、核心 API 常见技巧、防呆设计与完整速查表。
image: /images/framework-detailed-guide.jpg
category: C#
tags:
  - 工业控制
  - 架构设计
draft: false
series: "BoTech 工业自动化框架开发实战"
seriesOrder: 5
---

> [!IMPORTANT]
> **免责声明**：本文章内容仅用于个人学习、技术交流与笔记归档使用。

<details open class="in-post-toc-card border border-neutral-200/80 dark:border-neutral-700/80 rounded-xl p-4 my-4 bg-neutral-50/50 dark:bg-neutral-800/30">
<summary class="font-bold text-base cursor-pointer select-none text-neutral-800 dark:text-neutral-200 flex items-center justify-between outline-none">
📑 本篇目录（点击收起 / 展开）
</summary>

<div class="max-h-72 overflow-y-auto mt-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 hide-scrollbar">

## 目录

- [7. ZCM968SOP 控件与方法说明](#7-zcm968sop-控件与方法说明)
  - [控件说明书下载](#控件说明书下载)
- [8. Setup_Load.cs 程序启动初始化](#8-setup_loadcs-程序启动初始化)
  - [执行流程](#执行流程)
  - [初始化顺序重要性](#初始化顺序重要性)
- [9. 机械臂基类开发最佳实践](#9-机械臂基类开发最佳实践)
  - [9.1 框架底层原生运动控制 API 详解](#91-框架底层原生运动控制-api-详解)
- [10. 辅助类 API](#10-辅助类-api)
  - [10.1 Zcm.Dialog — 对话框类](#101-zcmdialog--对话框类)
  - [10.2 Zcm.DoAndDi — IO 操作类](#102-zcmdoanddi--io-操作类)
  - [10.3 Zcm.LanguageHelper — 语言切换](#103-zcmlanguagehelper--语言切换)
- [11. 核心 API 常见技巧与 FAQ](#11-核心-api-常见技巧与-faq)
  - [11.1 TasksInteraction 跨线程通信详解](#111-tasksinteraction-跨线程通信详解)
  - [11.2 MainConvId 详解](#112-mainconvid-详解)
  - [11.3 TipsDialogForm 弹框详解](#113-tipsdialogform-弹框详解)
  - [11.4 扫码/视觉复选框使能检查防呆设计](#114-扫码视觉复选框使能检查防呆设计)
  - [11.5 核心 API 快速导航表](#115-核心-api-快速导航表)
- [12. API 速查表](#12-api-速查表)
  - [Motion & mFunction](#motion--mfunction)
  - [MotionDll](#motiondll)
  - [TaskBase IMotion](#taskbase-imotion)
  - [WkManager](#wkmanager)
  - [WorkShare 子对象](#workshare-子对象)
  - [GTMultiAxialMotion 多轴直线插补与协同 API](#gtmultiaxialmotion)


</div>
</details>


## 7. ZCM968SOP 控件与方法说明

> 本章内容来自 ZCM968SOP 原文，详细说明各 UI 控件的配置与使用方法。
> 完整控件截图与参数说明请查阅以下官方 PDF 说明书：

### 控件说明书下载

| 文档名称 | 说明 | 操作 |
|----------|------|------|
| **ZCM968SOP (英文版)** | ZCM968 控件全套使用说明（英文，最新版） | <a href="/docs/framework/ZCM968SOP_En.pdf" target="_blank" rel="noopener noreferrer">📖 在线阅读</a> |
| **Zcm2018 SOP** | Zcm2018 系列控件说明书（含中文界面截图） | <a href="/docs/framework/Zcm2018_SOP.pdf" target="_blank" rel="noopener noreferrer">📖 在线阅读</a> |
| **XSation SOP** | XSation 工站框架控件说明书 | <a href="/docs/framework/XSation_SOP.pdf" target="_blank" rel="noopener noreferrer">📖 在线阅读</a> |

> **提示**：点击「在线阅读」可直接在浏览器中打开 PDF，支持全文搜索。如需下载，在 PDF 查看器中右键另存即可。

---

## 8. Setup_Load.cs 程序启动初始化

`Setup_Load` 是程序启动时的初始化入口，由 `Frm_Main.Main_Load()` 调用。

### 执行流程

```
me_Initial()
├─ 1. 基础状态设置
├─ 2. 加载所有参数 (GetPar)
├─ 3. 初始化 TCP/RS232 通讯
├─ 4. 加载工站 (5 个 Task 初始化)
├─ 5. 加载传送带 (3 条流水线)
├─ 6. 初始化运动控制卡
├─ 7. 绑定 Machine 对象 (事件、IO、灯)
├─ 8. 加载生产数据库
├─ 9. 初始化报警中心
├─ 10. 提升定时器精度
├─ 11. 加载 CCD 相机
└─ 12. 加载数据中心
```

### 初始化顺序重要性

```
参数加载 → 通讯初始化 → 工站初始化 → 传送带初始化 → 运动卡初始化 → Machine 绑定
```

**注意：** Machine 对象的绑定必须在所有 Task 初始化完成之后执行。

---

---

## 9. 机械臂基类开发最佳实践

在多轴模组（如 X/Y/Z 三轴直角坐标机械臂）开发中，框架底层的 `Zcm.Moving` 类（即工站中的 `pMove` 对象）提供了完整的运动控制 API。在开发机械轴任务时，应当根据不同的使用场景（如：常规点位对位、离线对位、带纠偏偏置对位等）灵活选择使用。

### 9.1 框架底层原生运动控制 API 详解

在框架底层的 `Zcm.Moving` 类（即工站中的 `pMove` 对象）中，提供了若干套底层的阻塞或非阻塞运动控制 API。

#### 9.1.1 原生阻塞型运动 API (`WaitDone`)
`WaitDone` 系列方法会同步阻塞当前工站线程，直到轴运动就位或检测到运动超时报警。

1. **多轴示教点联动（带 Z 轴安全高度）**
   ```csharp
   public bool WaitDone(
       int StationNum, 
       int PointNum, 
       bool MultiAxisSync, 
       double ZLiftHeight, 
       int PosDelayTime, 
       int MaxWaitTime, 
       double LowSpeedApproachDist = 0.0, 
       double LowSpeedApproachSpeed = 0.0, 
       double LowSpeedLiftDist = 0.0, 
       double LowSpeedLiftSpeed = 0.0
   )
   ```
   * **使用场景**：从当前位置安全移动至另一个示教点（例如：从取料位置移动至拍照位置）。
   * **运行逻辑**：
     1. 若 `MultiAxisSync` 为 `true`，且 `ZLiftHeight`（安全抬升高度）设置合理（如 0.0），Z 轴会首先快速上升至 `ZLiftHeight`；
     2. X, Y 等平面轴联动，同步移至目标示教点的 XY 坐标；
     3. 待 XY 轴完全就位后，Z 轴再次下降至该示教点的目标 Z 轴坐标就位。
   * **优点**：单行调用，自带防碰撞和 Z 轴优先抬高逻辑。
   * **局限**：不支持实时坐标偏置参数（如相机纠偏的 OffsetX/OffsetY）。

2. **逻辑单轴绝对运动**
   ```csharp
   public bool WaitDone(ValueType AxisNum, double TargetPos, double Speed, int PosDelayTime, int MaxWaitTime)
   ```
   * **使用场景**：在知道某个单轴目标坐标时单独移动该轴（例如：Z 轴单独回零后的安全抬升）。
   * **运行逻辑**：控制 `AxisNum` 指定的轴以 `Speed`（通常传 -1 使用参数配置速度）移动至 `TargetPos`，并最多等待 `MaxWaitTime` 毫秒就位。

#### 9.1.2 原生非阻塞型运动 API (`StaXYMove` 系列)
如果您需要在示教点的基础坐标上增加相机的对位偏置，且希望自行控制多轴联动的时序，可以使用 `StaXYMove` 等控制 API。
* **双轴平移异步偏置运动**：
  `public bool StaXYMove(ValueType StaID, ValueType PosIndex, double Vel, double OffsetX, double OffsetY)`
* **三轴联移异步偏置运动**：
  `public bool StaXYRMove(ValueType StaID, ValueType PosIndex, double Vel, double OffsetX, double OffsetY, double OffsetR)`
  > [!NOTE]
  > 这些方法仅负责异步下发 XY(R) 轴的定位指令并叠加偏置，并不会自动执行 Z 轴防撞抬起，也不会同步阻塞等待轴到位。

---

---

## 10. 辅助类 API

本节收录不属于核心运动/工站框架，但在开发中常用的辅助类。

### 10.1 Zcm.Dialog — 对话框类

Zcm.Dialog 提供了阻塞弹窗的实现方法。

#### ReturnData

功能：根据弹窗的按钮点击后 OKStep 或 NGStep 的值会赋给此属性。

#### DialogShow()

重载 A（双按钮）：

```csharp
public bool DialogShow(string MsgStr, string ContinuBtnLabel, string StopBtnLabel,
    int OKStep, int NGStep, int 输出编号 = -1, int 输出时间 = -1)
```
功能：弹窗并阻塞进程。返回值：点击继续按钮 true，点击停止按钮返回 false。

重载 B（单按钮）：

```csharp
public bool DialogShow(string MsgStr, string OKBtnLabel, int OKStep,
    int 输出编号 = -1, int 输出时间 = -1)
```
功能：弹窗并阻塞进程。返回值：点击继续按钮 true。

---

### 10.2 Zcm.DoAndDi — IO 操作类

Zcm.DoAndDi 提供了操作 IO 的各种方法（`mDoDi` 实例）。

#### WaitDi()

重载 A：

```csharp
public bool WaitDi(ValueType 输入编号, ValueType 需求状态, int 延时时间 = 0, int 超时时间 = 3000)
```
功能：阻塞并等待输入状态变成需求状态。返回值：在超时时间内被置为需求状态则返回 true，反之则返回 false。

重载 B（带弹窗重试）：

```csharp
public bool WaitDi(ValueType 输入编号, ValueType 需求状态, int 延时时间, int 超时时间, bool 弹窗提示重试 = false)
```

#### WaitDone()

重载 A（输出+等待输入）：

```csharp
public bool WaitDone(ValueType 输出编号, ValueType 输出状态, ValueType 输入编号, ValueType 输入状态,
    int 延时时间, int 超时时间, bool 弹窗提示重试 = false)
```

重载 B（仅等待输入）：

```csharp
public bool WaitDone(ValueType 输入编号, ValueType 需求状态, int 延时时间, int 超时时间, bool 弹窗提示重试 = false)
```

---

### 10.3 Zcm.LanguageHelper — 语言切换

Zcm.LanguageHelper 提供了切换语言的方法。

#### SetLanguage()

```csharp
public static bool SetLanguage(string language, object form)
```
功能：设置系统语言选择。返回值：设置成功返回 true，失败则返回 false。

---

---

## 11. 核心 API 常见技巧与 FAQ

### 11.1 TasksInteraction 跨线程通信详解

#### 底层原理

`TasksInteraction` 的本质是一个**全局线程安全寄存器表**，由 `SystemMgr` 单例管理：

```
SystemMgr（全局单例，内存中）
    │
    ├─ 寄存器[0] → bool?  组装允许机械手_标志
    ├─ 寄存器[1] → bool?  右轴螺丝工作完成_标志
    ├─ 寄存器[2] → bool?  左轴螺丝工作完成_标志
    └─ ...
```

每个寄存器可以存三个值：
- `null` — 从未设置过
- `true` — 被设为 true
- `false` — 被设为 false

枚举值通过 `Convert.ToInt32(id)` 转为 int，直接作为寄存器数组的物理索引。

---

### 11.2 MainConvId 详解

`MainConvId` 是基类 `WorkShare` 的属性，在 `Initialize()` 中通过 `BindConv()` 设置：

```csharp
public override void Initialize()
{
    this.BindConv(1, null);  // MainConvId = 1
    // ...
}
```

| 工位 | BindConv | MainConvId |
|------|----------|------------|
| Task01 | `BindConv(1, null)` | 1 |
| Task02 | `BindConv(2, null)` | 2 |
| Task03 | `BindConv(3, null)` | 3 |

使用 `MainConvId` 而不是写死数字，保证代码通用：

```csharp
// ✅ 通用写法
mFunction.ConveyorData[MainConvId].StartTime

// ❌ 写死数字
mFunction.ConveyorData[1].StartTime
```

---

### 11.3 TipsDialogForm 弹框详解

```csharp
AlarmCenter.XAlarmRecord.Instance.TipsDiglogForm(
    int taskId, string taskName, string message,
    string changeWithoutTran, bool isWaitOne,
    string btnOKText, string btnCancelText
)
```

| # | 参数 | 类型 | 说明 |
|---|------|------|------|
| 1 | `taskId` | int | 工位ID（用于日志） |
| 2 | `taskName` | string | 工位名称（用于日志） |
| 3 | `message` | string | 弹框消息 |
| 4 | `changeWithoutTran` | string | 不翻译的变量（多语言用，通常 `""`） |
| 5 | `isWaitOne` | bool | 是否阻塞等待用户点击 |
| 6 | `btnOKText` | string | 确定按钮文字 |
| 7 | `btnCancelText` | string | 取消按钮文字（可选） |

返回 `AlarmCenter.mDialogResult.OK` 或 `AlarmCenter.mDialogResult.Cancel`。

```csharp
if (AlarmCenter.XAlarmRecord.Instance.TipsDiglogForm(
    (int)this.TaskID, this.TaskName,
    "是否重试？", "", true, "Yes", "No") == AlarmCenter.mDialogResult.OK)
{
    // 用户点了 Yes
}
```

---

### 11.4 扫码/视觉复选框使能检查防呆设计

在 `AutoRun` 状态机处理扫码或相机对位前，必须通过 `mGlobal.FuncCheck(FuncChk.xxx)` 对功能使能复选框进行防御性检查：

```csharp
case (int)步序.检查使能并扫码:
    if (mGlobal.FuncCheck(FuncChk.启用扫码) && !mGlobal.FlowLineMode)
    {
        SetStep(ref StaInfo, (int)步序.触发扫码, true);
    }
    else
    {
        AddLog("扫码功能被禁用或处于过料模式，跳过扫码", LogsType.Barcode, StaInfo.StepIdx, true);
        SetStep(ref StaInfo, (int)步序.关光源放行, true); // 防呆跳步
    }
    break;
```

在实际流水线到位判定中，通常需要在两个场景下进行使能检查：
```csharp
// 场景一：Step10 处理"产品已在位"（设备复位或重启场景）
if (mGlobal.ReadDi_Bool(InNo.流线1到位信号))
{
    if (mGlobal.FuncCheck(FuncChk.启用扫码)) { SetStep(ref StaInfo, (int)步序.电机停扫码, true); }
    else { SetStep(ref StaInfo, (int)步序.关光源放行, true); }
}

// 场景二：Step20 处理"产品刚到达"（正常流动流程）
if (mDoDi.WaitDi(InNo.流线1到位信号, 1))
{
    if (mGlobal.FuncCheck(FuncChk.启用扫码)) { SetStep(ref StaInfo, (int)步序.电机停扫码, true); }
    else { SetStep(ref StaInfo, (int)步序.关光源放行, true); }
}
```
> [!NOTE]
> **设计考量**：Step10 用于处理热启动时治具已在工位上的断点续跑，Step20 用于处理正常流水线移交。两个阶段均进行使能判断，确保无论何种工况均不会发生死锁或漏动作。

---

### 11.5 核心 API 快速导航表

为避免篇幅冗余，常见核心 API 的详细原理与最佳实践代码分布在以下对应章节中：

| 核心 API / 技术主题 | 详细原理与代码示例导航链接 |
| :--- | :--- |
| **`TasksInteraction` 跨线程协同握手** | 详见 **[3.5.3 TasksInteraction 软交互信号量状态详解与使用指南](/posts/framework-02-motion-and-workshare-api/#353-tasksinteraction-软交互信号量状态详解与使用指南)** |
| **`mSend.WaitDone` TCP/串口网络收发** | 详见 **[3.4.3 TCP 双向应答最佳实践示例](/posts/framework-02-motion-and-workshare-api/#343-tcp-双向应答最佳实践示例最推荐模式)** 与 **[6.7.4 工业级 CCD 视觉扫码与拍照通信标准开发 SOP](/posts/framework-04-task-sop-and-concurrency/#674-工业级-ccd-视觉扫码scan与拍照photo通信标准开发-sop)** |
| **`mDoDi.WaitDone` 气缸/IO动作等待** | 详见 **[4.6 mDoDi / mDoDiS — 数字 IO 等待与简化版](/posts/framework-02-motion-and-workshare-api/#46-mdodi--mdodis--数字-io-等待与简化版)** |
| **`mFunction.OverTime` 非阻塞超时判定** | 详见 **[3.2.2 mFunction.OverTime 超时处理](/posts/framework-02-motion-and-workshare-api/#322-mfunctionovertime)** 与 **[6.4 超时计时器重置与防虚警防呆逻辑](/posts/framework-04-task-sop-and-concurrency/#64-超时计时器重置与防虚警防呆逻辑)** |
| **流水线死锁排查与拓扑配置** | 详见 **[5.11 传送带死锁排查 SOP 与三大致命根因剖析](/posts/framework-03-conveyor-system/#511-传送带死锁排查-sop-与三大致命根因剖析)** |
| **机械轴屏蔽模式 (`是否屏蔽`)** | 详见 **[2.7.2 机械手关闭屏蔽机制](/posts/framework-01-architecture-and-hardware/#272-机械手关闭屏蔽-屏蔽左轴--屏蔽右轴)** |
| **系统 5 大运行模式与脱机仿真** | 详见 **[2.9 系统 5 大运行模式与多层控制原理](/posts/framework-01-architecture-and-hardware/#29-系统-5-大运行模式与多层控制原理)** 与 **[6.8 脱机空跑（虚拟仿真）实现 SOP](/posts/framework-04-task-sop-and-concurrency/#68-脱机空跑虚拟仿真实现-sop)** |

---

---

## 12. API 速查表

以下为常用 API 的快速索引，详细参数请参阅对应章节。

### Motion & mFunction

| 方法 | 说明 |
|------|------|
| `GetTickCount()` | 获取当前时间戳 |
| `OverTime(start, timeout)` | 超时判断 |
| `Sleep(DT)` | 延时（手动模式用） |
| `ReadXml(path, ref data)` | 读取 XML |
| `WriteXml(path, ref data)` | 写入 XML |
| `ReadPosData(path, ref data)` | 读取点位 |
| `CreatePath(path)` | 创建文件夹 |
| `IsFileExist(path)` | 判断文件存在 |
| `TcpLoad(count, start)` | 加载 TCP |
| `SetSpeedRatio(ratio)` | 设置速度比例 |

### MotionDll

| 方法 | 说明 |
|------|------|
| `ReadDi(index)` | 读取输入 |
| `ReadDo(index)` | 读取输出 |
| `DoSet(index)` | 置位输出 |
| `DoReset(index)` | 复位输出 |
| `WriteDo(index, value)` | 写入输出 |
| `AxisStop(id, option)` | 轴停止 |
| `mAxisOn(id)` / `mAxisOff(id)` | 使能开/关 |
| `ZSPD(id)` | 运动到位 |
| `SetStep(ref sta, step, time)` | 步序控制 |

### TaskBase IMotion

| 方法 | 说明 |
|------|------|
| `MotionAbsMove(...)` | 绝对运动 |
| `MotionRelMove(...)` | 相对运动 |
| `MotionAbsMoveAndDone(...)` | 绝对运动并等待 |
| `MotionWaitMoveDone(...)` | 等待运动完成 |
| `MotionGoHome(...)` | 回零 |
| `MotionWaitDi(...)` | 等待输入 |
| `MotionZSPD(id)` | 运动到位 |

### WkManager

| 方法 | 说明 |
|------|------|
| `BindStation(id, name, obj)` | 绑定工站 |
| `Start(mode, freq)` | 全部启动 |
| `Stop()` / `Pause()` / `Resume()` | 停止/暂停/恢复 |
| `Reset(mode)` | 全部复位 |
| `FindTaskById(id)` | 查找工站 |
| `TaskStart(id, mode)` | 单站启动 |
| `ConvSet(start, step, count)` | 流水线设置 |

### WorkShare 子对象

| 对象 | 常用方法 | 说明 |
|------|---------|------|
| `mHome` | `GoHome`, `GoHomeAndDone` | 回零 |
| `pMove` | `AbsMove`, `WaitDone`, `Stop` | 单轴运动 |
| `mMove` | `AbsMove`, `AbsMoveAndDone` | 多轴运动 |
| `mDoDi` | `WaitDone`, `WaitDi` | IO 等待 |
| `mSend` | `WaitDone`, `GetData` | 通讯收发 |

### GTMultiAxialMotion

| 方法 | 说明 |
|------|------|
| `AxisPoints(axisId, points[], encMm)` | 轴点位插补包装类 |
| `Line2D(axis1, axis2, speed)` | 二维直线插补 |
| `Line3D(axis1, axis2, axis3, speed)` | 三维直线插补 |
| `Line4D(axis1, axis2, axis3, axis4, speed)` | 四维直线插补 |
| `FollowAxisSetup(...)` | Follow 模式轨迹跟随设置 |
| `GearAxisSetup(...)` | 电子齿轮比例协同设置 |
| `SlaveStop(slaveAxisId)` | 停止从轴跟随运动 |

---
