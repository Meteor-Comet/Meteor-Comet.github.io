---
title: 框架详解 (二)：核心运动控制与 WorkShare 子对象 API
published: 2026-06-06
description: 详解单轴/多轴运动到位、气缸一体化动作等待、Socket 网络通讯、跨工站 MRE 双向握手及多轴直线插补 API。
image: /images/framework-detailed-guide.jpg
category: C#
tags:
  - 工业控制
  - 架构设计
draft: false
series: "BoTech 工业自动化框架开发实战"
seriesOrder: 2
---

> [!IMPORTANT]
> **免责声明**：本文章内容仅用于个人学习、技术交流与笔记归档使用。

<details open class="in-post-toc-card border border-neutral-200/80 dark:border-neutral-700/80 rounded-xl p-4 my-4 bg-neutral-50/50 dark:bg-neutral-800/30">
<summary class="font-bold text-base cursor-pointer select-none text-neutral-800 dark:text-neutral-200 flex items-center justify-between outline-none">
📑 本篇目录（点击收起 / 展开）
</summary>

<div class="max-h-72 overflow-y-auto mt-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 hide-scrollbar">

## 目录

- [3. 核心与运动控制 API](#3-核心与运动控制-api)
  - [3.1 运动控制类 (Motion Control)](#31-运动控制类-motion-control)
  - [3.2 系统、超时与日志 (System/Utility/Logs)](#32-系统超时与日志-systemutilitylogs)
  - [3.3 文件读写 (File Operations)](#33-文件读写-file-operations)
  - [3.4 网口与串口通讯 (Communications)](#34-网口与串口通讯-communications)
  - [3.5 软交互信号量与干涉区防撞 (Synchronization & Concurrency)](#35-软交互信号量与干涉区防撞-synchronization--concurrency)
    - [3.5.4 跨工站 ManualResetEvent 双向握手模式](#354-跨工站-manualresetevent-双向握手模式)
  - [3.6 mFunction 核心工具类与系统状态变量说明](#36-mfunction-核心工具类与系统状态变量说明)
- [4. WorkShare 子对象 API](#4-workshare-子对象-api)
  - [4.1 mHome — 单轴回零](#41-mhome--单轴回零)
  - [4.2 dHome — 多轴同时回零](#42-dhome--多轴同时回零)
  - [4.3 pMove — 位置运动](#43-pmove--位置运动)
  - [4.4 sMove — 单轴运动（非阻塞）](#44-smove--单轴运动非阻塞)
  - [4.5 mMove — 多轴运动（非阻塞）](#45-mmove--多轴运动非阻塞)
  - [4.6 mDoDi / mDoDiS — 数字 IO 等待与简化版](#46-mdodi--mdodis--数字-io-等待与简化版)
  - [4.7 mSend — TCP 发送等待](#47-msend--tcp-发送等待)
  - [4.8 mPulseOut — 脉冲输出](#48-mpulseout--脉冲输出)
  - [4.9 MotionDll 底层 API](#49-motiondll-底层-api)
  - [4.10 mFunction.State 系统状态枚举](#410-mfunctionstate-系统状态枚举)
  - [4.11 WorkShare 辅助方法](#411-workshare-辅助方法)
  - [4.12 GTMultiAxialMotion 多轴直线插补与协同 API](#412-gtmultiaxialmotion-多轴直线插补与协同-api)

</div>
</details>


## 3. 核心与运动控制 API

### 3.1 运动控制类 (Motion Control)

#### 3.1.1 `MotionGetDi`
* **功能**：读取控制卡指定的数字输入（DI）通道电平状态。
* **原型**：`protected bool MotionGetDi(int DiIndex)`
* **参数**：`DiIndex`：控制卡输入通道的全局索引。
* **返回值**：当该通道有电平输入时返回 `true`，无电平输入时返回 `false`。

#### 3.1.2 `MotionGetDo`
* **功能**：读取当前输出（DO）通道的硬件置位状态。
* **原型**：`protected bool MotionGetDo(int DoIndex)`
* **参数**：`DoIndex`：全局 DO 输出索引。
* **返回值**：已输出置位时返回 `true`，复位状态返回 `false`。

#### 3.1.3 `MotionSetDo`
* **功能**：写入一个或多个输出通道状态。
* **原型**：
  * `protected void MotionSetDo(int DoIndex, bool sts)`
  * `protected void MotionSetDo(int[] DoIndex, bool sts)`
* **参数**：`DoIndex`：单个通道索引或通道索引数组；`sts`：目标电平状态（`true` 或 `false`）。
* **代码示例**：
  ```csharp
  MotionSetDo((int)OutNo.蜂鸣器, true); // 开启蜂鸣
  MotionSetDo(new int[] { (int)OutNo.五色灯红色, (int)OutNo.五色灯绿色 }, false); // 并发关闭红绿灯
  ```

#### 3.1.4 `MotionAbsMove` / `MotionRelMove`
* **功能**：驱动单轴或多轴以绝对坐标或相对位移开始运动。该方法是**非阻塞的**，启动指令下发后立即返回。
* **原型**：
  * `protected bool MotionAbsMove(int AxisID, double Position, double Vel)`
  * `protected bool MotionAbsMove(int[] AxisID, double[] Position, double[] Vel)`
  * `protected bool MotionRelMove(int AxisID, double Dist, double Vel)`
* **参数**：
  * `AxisID`：目标轴号（单个或数组）。
  * `Position` / `Dist`：目标绝对坐标（mm）或移动距离（mm）。
  * `Vel`：运动速度（mm/s），输入 `-1` 则采用系统配置的默认运行速度。
* **返回值**：指令发送成功返回 `true`，驱动报错返回 `false`。

#### 3.1.5 `MotionWaitMoveDone`
* **功能**：阻塞当前线程，等待指定的一个或多个轴到达目标坐标或运动静止，直到超时。
* **原型**：
  * `protected bool MotionWaitMoveDone(int AxisId, int timeout = -1)`
  * `protected bool MotionWaitMoveDone(int[] AxisId, double[] targetpos, int timeout = -1)`
* **参数**：
  * `AxisId`：等待的轴号。
  * `targetpos`：目标坐标对比数组（若不传入此参数，则判定轴停止运行即完成）。
  * `timeout`：最大等待毫秒数，`-1` 为无限等待。
* **返回值**：到达或静止返回 `true`；超时返回 `false`。

#### 3.1.6 `MotionAbsMoveAndDone` / `MotionRelMoveAndDone`
* **功能**：单轴或多轴运动并阻塞等待其到位，是 `MotionAbsMove` 与 `MotionWaitMoveDone` 的高度封装。
* **原型**：`protected bool MotionAbsMoveAndDone(int AxisID, double Position, double Vel, int timeout = -1)`
* **返回值**：在超时范围内成功运动并到位返回 `true`，任意轴超时或失败返回 `false`。
* **代码示例**：
  ```csharp
  // 抬升 Z 轴至 0.0 安全高度，设定 5000ms 超时
  if (!MotionAbsMoveAndDone((short)mAxis.左Z, 0.0, -1, 5000))
  {
      AddLog("Z轴安全抬升失败，紧急停机！", LogsType.ErrorCode, StaInfo.StepIdx, true);
      SetStep(ref StaInfo, (int)步序.异常, true);
  }
  ```

#### 3.1.7 `MotionWaitDi` / `MotionWaitDo`
* **功能**：阻塞线程并等待特定的输入（DI）或输出（DO）状态转为设定状态。
* **原型**：`protected bool MotionWaitDi(int diId, bool isOn, int timeout = -1, bool TimeoutToBeContinue = false)`
* **参数**：
  * `diId`：待检测的 I/O 全局索引。
  * `isOn`：期待的目标状态（`true`/`false`）。
  * `timeout`：等待超时时间（ms）。
  * `TimeoutToBeContinue`：**关键参数**。
    * 设为 `false` 时：若超时，系统将**弹出带有“重试(Retry)”和“取消(Cancel)”的对话框**。用户点击重试会再次等待，点击取消则返回 `false` 触发报警。
    * 设为 `true` 时：若超时，程序**不弹窗，直接返回 `false` 并执行下一行代码**，交由程序员在代码中做流转决策。

#### 3.1.8 `MotionGoHomeAndDone`
* **功能**：驱动指定轴回零，并阻塞等待直至回零成功或超时。
* **原型**：`protected bool MotionGoHomeAndDone(int AxisId, int timeout = -1)`
* **返回值**：回零成功返回 `true`，超时或报错返回 `false`。

#### 3.1.9 `mDoDiWaitDone`
* **功能**：框架中最常用的**气缸一体化动作等待方法**，将“写输出”与“等反馈”合并。
* **原型**：
  * `public void mDoDiWaitDone(OutNo OutNum, short state, InNo InNum, short state1, short DelayTime, short Timeout, bool Pop_up_message = false)`
  * `public void mDoDiWaitDone(InNo InNum, short state1, short DelayTime, short Timeout, bool Pop_up_message = false)`
* **参数**：
  * `OutNum`：要驱动的电磁阀 DO。
  * `state`：电磁阀输出电平（`1` 伸出，`0` 缩回）。
  * `InNum`：气缸到位磁簧开关 DI。
  * `state1`：期待的磁簧开关状态（`1` 触发到位，`0` 离开到位）。
  * `DelayTime`：到位后的额外稳定延时（ms）。
  * `Timeout`：最大等待时间（ms）。
  * `Pop_up_message`：若为 `true`，超时后会在界面弹出“Retry/Cancel”重试对话框；若为 `false` 且超时，则直接抛出异常终止程序。
* **代码示例**：
  ```csharp
  // 将流线1阻挡气缸复位为 0，并同步等待阻挡缩回信号变为 1。如果超过 3000ms 未到位，弹窗提示用户
  mDoDiWaitDone(OutNo.流线1阻挡气缸, 0, InNo.流线1阻挡缩回信号, 1, 10, 3000, true);
  ```

---

### 3.2 系统、超时与日志 (System/Utility/Logs)

#### 3.2.1 `mFunction.GetTickCount()`
* **功能**：获取高精度系统计时器当前的 Tick 数值（自系统启动以来的毫秒数，常用于精确超时和节拍测算）。
* **原型**：`public static long GetTickCount()`
* **返回值**：`long` 类型的毫秒时间戳。

#### 3.2.2 `mFunction.OverTime`
* **功能**：判定给定时间戳是否已超出限定时长。
* **原型**：`public static bool OverTime(long StartTime, int SleepTime)`
* **参数**：`StartTime`：起始 Tick 值；`SleepTime`：限定的超时时间（ms）。
* **返回值**：已超时返回 `true`，未超时返回 `false`。
* **代码示例**：
  ```csharp
  long myTimer = mFunction.GetTickCount();
  // ... 执行某操作 ...
  if (mFunction.OverTime(myTimer, 5000))
  {
      // 耗时超过 5 秒，进行超时处理
  }
  ```

#### 3.2.3 `mFunction.Sleep`
* **功能**：让当前工作线程进入休眠状态，以释放 CPU 资源。
* **原型**：`public static bool Sleep(int DT)`
* **参数**：`DT`：挂起的毫秒数。

#### 3.2.4 `AddLog`
* **功能**：在日志系统中记录事件。支持写入本地硬盘、显示在运行界面的动态日志窗口。
* **原型**：`public string AddLog(string MsgStr, LogsType model = LogsType.Logs, int StepNo = 0, bool dn_UI_Show = false, Color _color = default(Color))`
* **参数**：
  * `MsgStr`：日志记录的内容字符串。
  * `model`：日志类别枚举（`LogsType`），如 `LogsType.Auto`（自动流程日志）、`LogsType.CCD`（相机通讯）、`LogsType.Barcode`（扫码枪数据）、`LogsType.Home`（回零复位日志）等。
  * `StepNo`：当前状态机步骤，便于在日志中定位逻辑步骤。
  * `dn_UI_Show`：为 `true` 时，该条日志会同步推送到主画面的日志 ListBox，使用户直观可见。
  * `_color`：指定该行在主界面显示的文本颜色。
* **返回值**：格式化后的完整日志行字符串。
* **代码示例**：
  ```csharp
  AddLog("螺丝站：两轴已全部启动，清除触发信号", LogsType.Auto, StaInfo.StepIdx, true, Color.ForestGreen);
  ```

#### 3.2.5 `AddAlarmCenter` / `AddTipCentert`
* **功能**：中断运行并在主界面中心弹出一个阻塞的交互窗口。
* **原型**：
  * `public AlarmCenter.mDialogResult AddAlarmCenter(string MsgStr, bool isWaitOne = true, string btnOKText = "Continue", string btnCancelText = "Cancel", string btnIgnoreText = "", bool isBuzzer = true)`
  * `public AlarmCenter.mDialogResult AddTipCentert(string MsgStr, string changeWithoutTran = "", bool isWaitOne = true, string btnOKText = "Continue", string btnCancelText = "Cancel", bool isBuzzer = false)`
* **参数说明**：
  * `MsgStr`：弹窗内展示的异常报警信息。
  * `isWaitOne`：为 `true` 时将彻底阻塞当前工站线程，直至用户做出按钮点击反馈。
  * `btnOKText` / `btnCancelText`：两个响应按钮的自定义文言（通常为 Continue 与 Cancel）。
  * `isBuzzer`：是否同步亮红灯并启动物理蜂鸣器。
* **返回值**：`AlarmCenter.mDialogResult.OK` (对应 Continue) 或 `AlarmCenter.mDialogResult.Cancel` (对应 Cancel)。

---

### 3.3 文件读写 (File Operations)

#### 3.3.1 INI 配置文件读写
* **原型**：
  * `public static void SetIniS(string SectionName, string KeyWord, string ValStr, string FileName)`
  * `public static void SetIniN(string SectionName, string KeyWord, double ValInt, string FileName)`
  * `public static string GetIniS(string SectionName, string KeyWord, string DefString, string FileName)`
* **说明**：向路径 `FileName` 写入或读取标准 `[Section]` 下的键值。读取时，若键不存在则返回默认值 `DefString`。

#### 3.3.2 XML 数据读写
* **原型**：
  * `public static void ReadXml<T>(string XmlFileName, ref T ReadData)`
  * `public static void WriteXml<T>(string XmlFileName, ref T WriteData)`
  * `public static void Read2DXml<T>(string XmlFileName, ref T[,] mDataTmp)`
* **说明**：利用 XML 序列化器对指定对象 `ReadData`/`WriteData`（可以是简单结构体、包含属性的参数数组或二维数组）进行快速保存和加载。

#### 3.3.3 CSV 与 TXT 文件写入
* **原型**：
  * `public void WriteCsvFile(string FilePathName, string Savedata)`
  * `public void WriteDattxt(string Filename, string WriteData)`
  * `public string ReadDattxt(string Filename)`
* **说明**：用于配置 PDCA 记录、生产报表及标定数据的快捷文件写入。`WriteCsvFile` 会自动创建目录并以追加方式（Append）写入一行 CSV 格式字符串。

---

### 3.4 网口与串口通讯 (Communications)

BoTech 框架底层集成了基于以太网套接字 (Socket Client) 的网络通讯组件，用于与相机 (CCD)、扫码枪 (Scanner)、RFID 读写器及其他外部智能设备进行双向网络报文交互。

#### 3.4.1 Socket 客户端发送数据
* **方法**：`TcpIP[Index].SendData(string DataStr)`
* **参数**：
  * `Index`：网口的逻辑映射编号（对应 `TCPIP_Port` 枚举）。
  * `DataStr`：需要发送给服务器的字符串报文。
* **返回值**：若成功送入发送缓冲区则返回 `true`，否则返回 `false`。

#### 3.4.2 检查是否收到新数据与读取机制
在后台套接字接收线程收到数据后，会将标志置位。工站可以通过以下 API 进行检查与消费：
* **`TcpInfo[Index].Received`**：只读布尔值。当网络物理链路收到新报文且未被读取时返回 `true`。
* **`TcpInfo[Index].Data`**：读取并清空缓冲区内完整的网口数据。
  > [!IMPORTANT]
  > **毁灭性读取机制**：
  > 读取 `TcpInfo[Index].Data` 属性会触发其 Getter，该操作在将接收数据字符串返回的同时，会**立即清空底层接收缓冲区并将 `Received` 标志原子复位为 `false`**。
  > 因此，同一循环中**不可重复读取该属性**（第二次读取将获得空字符串 `""`）。如果需要多次使用接收到的数据，必须在首次读取时用局部变量锁存（如 `string resp = TcpInfo[Index].Data;`）。
* **`TcpInfo[Index].Open`**：检查网口连接状态（连接建立为 `true`，断开为 `false`）。

#### 3.4.3 TCP 双向应答最佳实践示例（最推荐模式）

在 `AutoRun` 状态机中，与外部设备（如相机、扫码枪等）进行双向通信时，**最推荐且最优雅的最佳开发模式是使用工站内部的 `mSend.WaitDone` 实例方法**。

由于每个工站（如扫码站、贴标站）在 `mWorkShare` 内部都独立拥有自己的 `mSend` 实例，这种方式能够实现完美的接收缓存物理隔离，完全不需要担心并发读取错乱的问题。

##### 最佳推荐模式代码示例：
```csharp
case (int)步序.触发扫码:
    AddLog("开始触发扫码枪...", LogsType.Barcode, StaInfo.StepIdx, true);
    
    // 使用 mSend.WaitDone 一步完成发送、接收等待、超时判定与自动弹框
    bool ok = mSend.WaitDone(
        (int)TCPIP_Port.扫描,  // 端口逻辑映射
        1,                    // 发送类型：1 = 字符串，0 = 字节
        "ReadCode",           // 下发的指令
        0,                    // 接收类型：0 = 字节，1 = 字符串
        "",                   // 前缀匹配限制（为空表示匹配接收任何响应）
        5000,                 // 等待超时时间（5000ms）
        true,                 // 超时后是否弹出“重试/取消”对话框
        true                  // 是否在日志窗实时显示通信过程
    );

    if (ok)
    {
        // 成功后，通过 mSend.GetData 直接安全获取接收到的扫码数据，绝无并发冲突
        string barcode = mSend.GetData;
        AddLog($"扫码成功: {barcode}", LogsType.Barcode, StaInfo.StepIdx, true);
        
        SetStep(ref StaInfo, (int)步序.处理数据, true);
    }
    else
    {
        AddLog("扫码失败或超时！", LogsType.Barcode, StaInfo.StepIdx, true);
        SetStep(ref StaInfo, (int)步序.异常, true);
    }
    break;
```

---

##### 传统手动轮询模式（替代方案）：
如果未使用 `mSend` 实例，而是依赖全局的 `TcpInfo` 轮询和 `SocketDataSend` 手动分两步来实现，代码如下：
```csharp
case (int)步序.发送拍照指令:
    // 重新记录起点时间，避免累加之前动作的时间导致超时错误
    mFunction.ConveyorData[MainConvId].StartTime = mFunction.GetTickCount(); 
    AddLog("右机械轴：向相机发送拍照指令", LogsType.CCD, StaInfo.StepIdx, true);
    
    // 发送报文
    if (TcpIp_Communication.SocketDataSend(TCPIP_Port.右CCD, "RScrew"))
    {
        SetStep(ref StaInfo, (int)步序.等相机数据, true);
    }
    else
    {
        SetStep(ref StaInfo, (int)步序.异常, true);
    }
    break;

case (int)步序.等相机数据:
    // 1. 判断是否收到回复
    if (mFunction.TcpInfo[(short)TCPIP_Port.右CCD].Received)
    {
        // 2. 局部变量读取并锁存，同时复位 Received 标志并清除接收区
        string resp = mFunction.TcpInfo[(short)TCPIP_Port.右CCD].Data;
        AddLog($"收到相机回复: {resp}", LogsType.CCD, StaInfo.StepIdx, true);
        
        // 3. 解析相机纠偏数据
        if (resp.StartsWith("OK"))
        {
            // 解析并赋值纠偏 X, Y, R
            SetStep(ref StaInfo, (int)步序.平移对位, true);
        }
        else
        {
            SetStep(ref StaInfo, (int)步序.异常, true);
        }
    }
    // 4. 超时监控（3秒）
    else if (mFunction.OverTime(mFunction.ConveyorData[MainConvId].StartTime, 3000))
    {
        AddLog("等待相机数据超时！", LogsType.CCD, StaInfo.StepIdx, true);
        SetStep(ref StaInfo, (int)步序.异常, true);
    }
    break;
```

#### 3.4.4 框架内网口通信的两种实现方式（对比）

在 BoTech 软件框架中，接收以太网报文有两种经典开发模式，开发者应根据并发场景进行合理选型。

##### 方式一：直接在 AutoRun 状态机中轮询接收（直接访问模式）
* **工作原理**：
  直接在工站的 `AutoRun()` 状态机步序中，使用 `if (mFunction.TcpInfo[Index].Received)` 轮询底层网络接收缓冲区。当判定为 `true` 后，直接读取 `string resp = mFunction.TcpInfo[Index].Data` 获取响应。
* **典型代码**：
  ```csharp
  if (mFunction.TcpInfo[(short)TCPIP_Port.扫描].Received)
  {
      string resp = mFunction.TcpInfo[(short)TCPIP_Port.扫描].Data; // 毁灭性读取
      // 处理扫码数据
  }
  ```
* **适用场景**：
  **单端口单工站独占**场景。例如，扫码枪网口只与 `Task01_入料扫码站` 发生交互，无其他工站线程介入读取该端口。
* **优缺点**：
  * **优点**：简单直接，逻辑高度内聚，无需在其他网络配置文件中注册转发。
  * **缺点**：由于 `.Data` 的毁灭性读取特性，如果有两个并发线程（如主站和辅轴）同时轮询 `TcpInfo[Index].Received`，一旦数据到达，其中一个线程读取了 `.Data`，另一个线程就会读取到空字符串 `""`，从而导致数据丢失或逻辑失效。

##### 方式二：基于全局事件路由与静态/实例字段（回调分发模式，推荐）
* **工作原理**：
  网络底层接收事件与工站时序线程解耦。在系统初始化时，框架通过 `mFunction.TcpIP[i].mDataRec += mTcpData;` 注册全局接收事件回调。
  当任意网口收到数据时，回调线程立即进入辅助类 `2.TcpIp.cs`（通常称为 `TcpIpcs` 文件）的 `mTcpData(short Index)` 方法：
  在回调中，读取数据、置位 `Received = false`，然后根据端口索引直接将数据**路由并推送**给目标工站的成员属性中。
* **回调路由代码 (`2.TcpIp.cs`)**：
  ```csharp
  public static void mTcpData(short Index)
  {
      if (TcpInfo[Index].Received) 
      {
          string data = mFunction.TcpInfo[Index].Data; // 拦截并读取数据，重置缓冲区
          TcpInfo[Index].Received = false; 

          // 根据网口逻辑端口 Index 进行数据分发
          switch (Index)
          {
              case 1: // 扫码枪端口
                  Task01_入料扫码站.接收的数据 = data;
                  break;
              case 2: // 右轴CCD端口
                  Task04_右机械轴.Instance.相机接收数据 = data;
                  Task04_右机械轴.Instance.有新数据 = true;
                  break;
              case 3: // 左轴CCD端口
                  Task05_左机械轴.Instance.相机接收数据 = data;
                  Task05_左机械轴.Instance.有新数据 = true;
                  break;
          }
      }
  }
  ```
* **工位状态机消费代码 (`Task01_入料扫码站.cs`)**：
  ```csharp
  case (int)步序.等扫码结果:
      if (!string.IsNullOrEmpty(接收的数据))
      {
          string resp = 接收的数据; // 消费分发过来的数据
          接收的数据 = "";           // 立即清空，防止下个循环重复读取
          AddLog($"扫码成功: {resp}", LogsType.Barcode, StaInfo.StepIdx, true);
          // 处理业务...
      }
      break;
  ```
* **适用场景**：
  存在多轴/多线程并发交互、一包数据多处监听，或在后台需要对报文进行统一的断包、心跳过滤、CRC校验的复杂通讯场景。
* **优缺点**：
  * **优点**：网口 I/O 线程与状态机时序线程彻底解耦；多线程并发读取工站成员属性安全无冲突；利于底层统一维护。
  * **缺点**：开发人员需同时修改 `2.TcpIp.cs` 路由分发器和对应的工位类成员，稍微增加了代码维护点。

| 对比维度 | 方式一：直接在 AutoRun 轮询 | 方式二：在 2.TcpIp.cs 回调分发 |
| :--- | :--- | :--- |
| **调用位置** | 工站的 `AutoRun()` 状态机内 | `2.TcpIp.cs` 静态方法 `mTcpData` 路由推送 |
| **线程归属** | 工站自身的时序线程 | Socket 异步监听后台接收线程 |
| **数据读取方式** | 主动拉取：直接调用 `TcpInfo[Index].Data` | 被动分发：由回调写入工位静态字段 `接收的数据` |
| **并发安全性** | **极低**。多线程并发读取会导致缓冲区清空，产生竞争丢失。 | **极高**。数据固化为静态属性，可供多线程安全读取。 |
| **代码耦合度** | 高。网络交互时序紧密耦合在自动步骤中。 | 低。网络接收与时序解耦，通信异常不阻塞主流程。 |
| **最佳实践** | 扫码枪单向请求、流程线性的简单工位。 | 左右双轴并发纠偏对位、多相机协作的复杂工位。 |

---

### 3.5 软交互信号量与干涉区防撞 (Synchronization & Concurrency)

#### 3.5.1 干涉区互斥锁 (Interference Zone)
多台机械轴或机构的活动范围在物理上存在交叠时，为了防止碰撞，必须在进入该交叠空域前申请干涉锁。
* **`EnterInterferenceZone(InterferenceZone id, int ThreadId = 0)`**
  * **机制**：阻塞申请。如果当前干涉区 `id` 已经被其他工站线程占用，此方法将挂起当前工站线程，直到占用者退出。
* **`ExitInterferenceZone(InterferenceZone id, int threadId = 0)`**
  * **机制**：释放对干涉区 `id` 的占用，允许其他处于等待队列中的工站线程进入。
* **代码示例**：
  ```csharp
  case (int)步序.移动至电批工作点:
      // 1. 申请进入组装干涉区 1
      EnterInterferenceZone(InterferenceZone.Assembly_Interference_Zone1);
      
      // 2. 申请成功后，移动至电批下压工作点
      bool arWork = pMove.WaitDone((int)StaInfo.StaId, 电批点位索引, true, 0.0, 10, 15000);
      if (arWork)
      {
          SetStep(ref StaInfo, (int)步序.启动拧紧, true);
      }
      else
      {
          // 移动失败必须在退出前释放干涉区，防止死锁
          ExitInterferenceZone(InterferenceZone.Assembly_Interference_Zone1);
          SetStep(ref StaInfo, (int)步序.异常, true);
      }
      break;

  case (int)步序.安全返回:
      // 3. 抬起 Z 轴，机械臂完全退出干涉空域后，释放占用
      if (pMove.WaitDone((int)StaInfo.StaId, 待机点位索引, true, 0.0, 10, 15000))
      {
          ExitInterferenceZone(InterferenceZone.Assembly_Interference_Zone1);
          SetTasksInteractionTrue(完成标志);
          SetStep(ref StaInfo, (int)步序.移至取料位置, true);
      }
      break;
  ```

#### 3.5.2 工站间软交互信号量 (TasksInteraction)
用于工站线程之间的软握手和事件同步，避免因线程竞争导致的逻辑混乱。
* **`SetTasksInteractionTrue(Enum id)`**：将指定的交互信号置为 `true`。
* **`SetTasksInteractionFalse(Enum id)`**：将指定的交互信号置为 `false`。
* **`GetTasksInteraction(Enum id, bool isAutoClear = false)`**：
  * 读取交互信号的当前布尔值。
  * **参数 `isAutoClear`**：如果为 `true`，会在成功读取到 `true` 状态之后，**自动将该交互信号复位为 `false`**。这极大简化了手动清除的工作，能有效避免残留信号导致的多轮空跑。
* **`WaitTaskInteractionTrue(Enum id, int nTimeOut = -1, bool bTimeOutShowDialog = true, bool isAutoClear = false)`**：
  * 阻塞当前线程，等待指定交互信号变为 `true`。
  * **参数 `bTimeOutShowDialog`**：超时是否弹窗重试。
  * **参数 `isAutoClear`**：为 `true` 时，等待成功后自动复位该标志。
* **`WaitAllTaskInteractionTrue(Enum[] ids, int nTimeOut = -1, bool bTimeOutShowDialog = true, bool isAutoClear = false)`**：
  * 阻塞等待数组内**所有的**交互信号均变为 `true` 时才返回。

#### 3.5.3 TasksInteraction 软交互信号量状态详解与使用指南

`TasksInteraction` 是 BoTech 框架中实现跨线程、跨任务（Task）数据同步与多轴协同握手的核心软信号量。

##### 1. 底层存储与工作原理
* **定义位置**：所有交互信号均声明于 `4.Assist/6.mEnum.cs` 的 `public enum TasksInteraction` 枚举中。
* **寄存器机制**：系统启动后，内存中开辟了一段 `bool?`（Nullable Boolean）类型的寄存器数组。当执行 `SetTasksInteractionTrue(id)` 或 `GetTasksInteraction(id)` 时，框架使用 `Convert.ToInt32(id)` 对枚举值进行整型强转，直接作为寄存器数组的物理索引，保证了在高频多线程轮询下的无锁高性能访问。
* **框架级变动日志**：为了便于流程死锁排查，每当调用 `SetTasksInteractionTrue` 或 `SetTasksInteractionFalse` 使得信号值变更时，底层会**自动调用 `AddLog`** 输出带时间戳的变动日志，高亮显示在主界面的“运行日志”窗口中（例如：“*线程交互变量: 组装允许机械手_标志, set value is true*”）。

##### 2. 交互 API 的参数细节与核心防呆规范
在 `mWorkShare` 业务逻辑开发中，应严格遵守以下 API 调用规则：
1. **`GetTasksInteraction(Enum id, bool isAutoClear)`**
   * 用于自动运行主流程中的非阻塞条件判定。
   * **`isAutoClear = true` 的重要性**：当读取信号状态为 `true` 且该方法返回 `true` 时，系统在同一个原子操作内将该交互寄存器**复位为 `false`**。这能有效阻断信号的持续粘连，防止状态机在进入下一次循环时被残留信号误触发，从而发生“连续空跑”的严重工艺事故。
2. **`WaitTaskInteractionTrue(Enum id, int nTimeOut, bool bTimeOutShowDialog, bool isAutoClear)`**
   * 用于辅轴或机械手线程的同步阻塞等待。
   * **`bTimeOutShowDialog` 选型**：
     * 若设为 `true`（默认），当等待超时后，前台 UI 会弹出一个带有“重试/取消”的强交互对话框。线程将挂起等待人工干预，非常适合于安全要求高的物理对位阶段。
     * 若设为 `false`，超时后不弹窗，直接向调用者返回 `false`。状态机可以捕获该返回值并跳转至 `步序.异常` 进行气缸自动缩回及故障停机逻辑。

##### 3. 经典业务场景：多轴主从协同握手设计（打螺丝站时序分析）
以 `Task02_螺丝站`（主工站）与 `Task04_右机械轴` / `Task05_左机械轴`（辅轴任务）为例，标准的多轴协同握手流程如下：

* **第一阶段：主站复位与就位**
  系统启动或复位（`Homing`）时，主工站必须主动将所有握手信号初始化为 `false`，清空一切历史状态：
  ```csharp
  SetTasksInteractionFalse(TasksInteraction.组装允许机械手_标志);
  SetTasksInteractionFalse(TasksInteraction.右轴螺丝工作完成_标志);
  SetTasksInteractionFalse(TasksInteraction.左轴螺丝工作完成_标志);
  ```
* **第二阶段：主站异步广播与防二次触发**
  当产品定位夹紧后，主工站进入 `做螺丝工作` 步序。它首先以 **`isAutoClear = true`** 消费清除历史残留信号，然后广播 `true` 信号启动左右双轴：
  ```csharp
  GetTasksInteraction(TasksInteraction.右轴螺丝工作完成_标志, true); // 清空历史残留
  GetTasksInteraction(TasksInteraction.左轴螺丝工作完成_标志, true);
  SetTasksInteractionTrue(TasksInteraction.组装允许机械手_标志);  // 广播启动信号
  ```
  **防二次触发锁**：一旦检测到左、右轴均已读取信号并脱离了等待状态（例如 StepIdx >= 20），主工站必须**立即**执行：
  ```csharp
  SetTasksInteractionFalse(TasksInteraction.组装允许机械手_标志); // 清除启动信号
  ```
  如果不及时清除该启动信号，那么当左、右轴执行完毕并返回到等待原点时，检测到该启动信号依然为 `true`，会再次被错误启动，造成二次拧紧的事故。
* **第三阶段：辅轴独立动作与完成置位**
  左、右机械轴在各自的 `AutoRun()` 步骤中，轮询检查 `启动触发标志`（即绑定的 `组装允许机械手_标志`）：
  ```csharp
  if (GetTasksInteraction(启动触发标志, false) == true)
  {
      SetStep(ref StaInfo, (int)步序.前往拍照对位, true); // 触发启动
  }
  ```
  轴动作完成后，各自退出物理干涉区并回到避让高度，然后将自己的完成标志置为 `true`：
  ```csharp
  SetTasksInteractionTrue(完成标志); // 左轴置位左标志，右轴置位右标志
  ```
* **第四阶段：主站双轴汇合确认**
  主工站在 `AutoRun` 中使用非阻塞轮询等待两轴的完成标志，并增加 90 秒最大工作时限保护：
  ```csharp
  if (GetTasksInteraction(TasksInteraction.右轴螺丝工作完成_标志, false) == true &&
      GetTasksInteraction(TasksInteraction.左轴螺丝工作完成_标志, false) == true)
  {
      // 双方均已完成，使用 isAutoClear = true 消费并清除两个完成标志
      GetTasksInteraction(TasksInteraction.右轴螺丝工作完成_标志, true);
      GetTasksInteraction(TasksInteraction.左轴螺丝工作完成_标志, true);
      SetStep(ref StaInfo, (int)步序.等工位3空闲, true); // 进入放行判断
  }
  else if (mFunction.OverTime(mFunction.ConveyorData[MainConvId].StartTime, 90000))
  {
      AddLog("主站等待双轴螺丝工作超时异常！", LogsType.Auto, StaInfo.StepIdx, true);
      SetStep(ref StaInfo, (int)步序.异常, true);
  }
  ```

##### 4. 典型交互信号与业务用途说明

| 交互信号枚举值 | 触发源 (置为 true) | 消费源 (判定并置为 false) | 业务协同物理目的 |
| :--- | :--- | :--- | :--- |
| **`组装允许机械手_标志`** | 组装螺丝主工站（载具到位夹紧） | 左机械轴、右机械轴 | 广播启动信号，通知左右两个打螺丝轴同步脱离等待步序，前往吸取螺丝并拧紧。 |
| **`右轴螺丝工作完成_标志`** | 右机械轴（拧紧完毕且回退安全原点） | 组装螺丝主工站 | 反馈右轴动作结束。主工站轮询此标志，确信右轴已完全退出工作干涉区。 |
| **`左轴螺丝工作完成_标志`** | 左机械轴（拧紧完毕且回退安全原点） | 组装螺丝主工站 | 反馈左轴动作结束。主工站轮询此标志，确信左轴已完全退出工作干涉区。 |

#### 3.5.4 跨工站 ManualResetEvent 双向握手模式

> [!TIP]
> 与 `TasksInteraction` 的轮询式布尔标志不同，`ManualResetEvent`（MRE）是操作系统级线程信号量，调用 `WaitOne()` 会将工站线程**直接挂起休眠**，CPU 占用率降为 0。这使其特别适合「工站 A 完成后通知工站 B」这类需要对方阻塞等待的精准点对点场景。

在标准螺丝机项目（如 **SPK-17**）中，`Task06_工作位` 与 `Task01_锁螺丝1` / `Task02_锁螺丝2` 三个工站之间，完全通过 **双向跨工站 `ManualResetEvent`** 进行协同握手，没有使用任何 `TasksInteraction` 软标志位。

##### 1. 握手架构：三个工站的双向信号链

```
流线框架(AutoConv)              Task06_工作位                Task01_锁螺丝1    Task02_锁螺丝2
     │                              │                            │                 │
     │  自定状态="等待装配"           │                            │                 │
     │  Task06.Mre.Set() ──────────→│ ① Mre.WaitOne()
     │                              │   Mre.Reset()
     │                              │   顶升气缸 → 载具夹紧
     │                              │
     │                              │ Task01.Mre.Set() ─────────→│ ② Mre.WaitOne()
     │                              │ Task02.Mre.Set() ──────────│─────────────────→ Mre.WaitOne()
     │                              │                            │ 拍照→取螺丝→锁紧  │ 拍照→取螺丝→锁紧
     │                              │ ③ WaitScrew1.WaitOne()    │                 │
     │                              │                            │ WaitScrew1.Set()→│
     │                              │   WaitScrew2.WaitOne()     │                 │ WaitScrew2.Set()→
     │                              │   收集扭矩数据
     │                              │   自定状态="装配完成"
     │←─────────────────────────────│
     │  自动放行载具流出
```

##### 2. 三个关键代码节点

**① 流线框架 → Task06：载具到位唤醒**

Task06 在 `流程开始` 步序中先检查 `自定状态`，再执行 `Mre.WaitOne()` 挂起等待流线框架唤醒：

```csharp
// Task06_工作位.cs — 流程开始步序
case (int)WorkStep.流程开始:
    if (mFunction.流水线[(int)LineId.工作流线].自定状态 == "等待装配")
    {
        Mre.WaitOne();   // 挂起，等流线框架发 Set() 信号
        Mre.Reset();     // 醒来后立即复位，防止信号残留
        SetStep((int)WorkStep.载具顶升上升);
    }
    break;
```

**② Task06 → Task01/02：并发启动双电批**

载具夹紧定位后，Task06 在 `通知开始锁螺丝` 步序中同时 `Set()` 两台电批的 `Mre`，令它们**真正并发**运行，互不阻塞：

```csharp
// Task06_工作位.cs — 通知开始锁螺丝步序
case (int)WorkStep.通知开始锁螺丝:
    Task01_锁螺丝1.Instance.Mre.Set();  // 唤醒左电批线程
    Task02_锁螺丝2.Instance.Mre.Set();  // 唤醒右电批线程（两者立即并发）
    SetStep((int)WorkStep.等待锁螺丝完成);
    break;
```

Task01/02 在 `等待物料到位` 步序中各自挂起等待：

```csharp
// TaskBase_锁螺丝.cs — 等待物料到位步序
case (int)WorkStep.等待物料到位:
    if (isWork == false && ScrewIndex == 0)
    {
        Mre.WaitOne();   // 等 Task06 的 Set() 信号
        Mre.Reset();
    }
    isWork = true;
    SetStep((int)WorkStep.去拍螺丝孔);
    break;
```

**③ Task01/02 → Task06：完成回调通知**

Task01/02 完成全部锁螺丝后，分别 `Set()` Task06 上对应的 `ManualResetEvent` 字段：

```csharp
// TaskBase_锁螺丝.cs — 通知锁螺丝完成步序
case (int)WorkStep.通知锁螺丝完成:
    if (task_Id == (int)Task_ID.Task01_锁螺丝1)
        Task06_工作位.Instance.WaitScrew1.Set();  // Task01 完成 → 通知 Task06
    else
        Task06_工作位.Instance.WaitScrew2.Set();  // Task02 完成 → 通知 Task06
    isWork = false;
    SetStep((int)WorkStep.流程开始);
    break;
```

Task06 在 `等待锁螺丝完成` 步序中**顺序阻塞**等待两台电批全部汇报完成：

```csharp
// Task06_工作位.cs — 等待锁螺丝完成步序
// Task06 字段定义：
public ManualResetEvent WaitScrew1 = new ManualResetEvent(false);
public ManualResetEvent WaitScrew2 = new ManualResetEvent(false);

case (int)WorkStep.等待锁螺丝完成:
    WaitScrew1.WaitOne();   // 阻塞直到 Task01 Set()
    WaitScrew1.Reset();
    WaitScrew2.WaitOne();   // 阻塞直到 Task02 Set()
    WaitScrew2.Reset();
    // 两台电批全部完成，开始收集扭矩数据
    Task01_锁螺丝1.Instance.GetScrewTourqeData();
    Task02_锁螺丝2.Instance.GetScrewTourqeData();
    SetStep((int)WorkStep.CT计算);
    break;
```

##### 3. 与 TasksInteraction 的对比

| 对比维度 | `TasksInteraction`（软标志轮询） | 跨工站 `ManualResetEvent` 双向握手 |
| :--- | :--- | :--- |
| **线程挂起** | ❌ 轮询循环，CPU 持续占用 | ✅ `WaitOne()` 真正挂起，CPU 占用为 0 |
| **实时性** | 受框架扫描周期影响（通常 10ms） | ✅ `Set()` 后对方线程立即唤醒，无延迟 |
| **代码耦合** | 较松散，通过全局枚举间接通信 | 直接引用对方 `Instance` 字段 |
| **适用场景** | 一对多广播、带轮询超时判定的复杂状态机 | 精准点对点、并发启动后汇合等待 |
| **调试可见性** | 框架自动 `AddLog` 打印状态变更 | 需自行在 `Set()`/`WaitOne()` 处添加日志 |

---

### 3.6 mFunction 核心工具类与系统状态变量说明

`mFunction` 是整个 BoTech 软件框架的系统枢纽与静态公共工具类，它统一管理着系统运行状态、参数配置、网络套接字以及底层轴数据结构。在开发工站控制类和辅助逻辑时，它是最常调用的底层类。

##### 1. 核心全局状态属性

* **`mFunction.SysState`**：
  * **数据类型**：`mFunction.State` 枚举。
  * **作用**：表示整机系统的当前运行状态。包含：
    * `State.RUNNING`：自动运行中。
    * `State.STOPED`：系统已停止。
    * `State.ALARM`：当前存在系统报警，三色灯红灯亮，蜂鸣器叫。
    * `State.WAITRESET`：等待复位。
  * **控制逻辑**：
    在工位自动循环线程中，必须在步序开始处实时判断系统是否停止或进入报警。例如：
    ```csharp
    if ((mFunction.IsSysStop || State == mFunction.State.STOPED) && mFunction.ConveyorData[MainConvId].StepIdx == 0)
    {
        State = mFunction.State.WAITRUN;
        SetStep(ref StaInfo, 0, true);
        break;
    }
    ```
    一旦 `SysState` 变为 `State.ALARM`，三色灯红灯会闪烁，蜂鸣器会鸣叫，软件框架后台监控线程会接管所有运动轴发出急停（Stop）指令。

* **`mFunction.LanguageState`**：
  * **作用**：系统当前设定的显示语言。如 `LanguageSet.CHN` (中文)、`LanguageSet.ENG` (英文)。在日志输出和提示对话框中，可依此判定加载对应的文字。

* **`mFunction.ConveyorData`**：
  * **数据类型**：`Conveyor` 数组（容量通常为 25 段）。
  * **作用**：流水线状态数组。每一段流线都对应一个数据结构，保存着该流水线段的状态信息，包含：
    * `MotorRun`：滚筒电机工作状态（是否正在运行）。
    * `ProdPres`：产品存在物理传感器信号。
    * `StepIdx` / `SubStepIdx`：段内部步骤索引。
    * `CustStatus`：工站自定义状态属性（如 `"工作中"`、`"处理中"`、`""`）。
  * **绑定机制**：工站在 `Initialize()` 时，调用 `this.BindConv(short ConvID, short[] StateConvIds)`。框架会将工站的 `MainConvId` 设为绑定的流线段 ID，将 `StateConvIds` 设为依赖的关联流线 ID 数组。工位在运行时会监听 `ConveyorData[MainConvId]` 的数据来唤醒本站流程。

* **`mFunction.TcpInfo` / `mFunction.TcpIP`**：
  * **作用**：全局网口连接及缓冲数组。`TcpInfo[Index]` 存储接收缓冲区与状态，`TcpIP[Index]` 存储 Socket Client 通信实例。

* **`mFunction.AxisIndex`**：
  * **作用**：保存着由 `AxisPar.xlsx` 配置表中读入的各个轴的轴号、所属卡号、每圈脉冲数、导程及减速比等基本元数据。

##### 2. 常用全局工具方法 API

* **`mFunction.GetParValue<T>(Enum id)`**：
  * **功能**：类型安全地读取指定参数的值。
  * **类型支持**：`double`（浮点数参数）、`int`（整型参数）、`string`（字符类型，如工作模式）、`bool`（复选框参数）。
  * **代码示例**：
    ```csharp
    // 读取扫码失败次数参数
    int maxRetry = mFunction.GetParValue<int>(UserPar.扫码失败次数);
    // 判断是否在虚拟仿真运行模式下
    if (mFunction.GetParValue<string>(UserPar.Machine_runMode) == "OffLine_VirtualRun") { ... }
    ```

  > [!TIP]
  > **延时参数化与拍率优化最佳实践**：
  > 为了便于在设备调试阶段微调气缸响应、光源稳定及动作时间，本框架将常用的硬编码 `Thread.Sleep` 延时全部抽象为 `UserPar` 并在 Excel 中配置，以便在线修改：
  > * **`扫码光源稳定延时`** (`UserPar.扫码光源稳定延时` / 默认 `500ms`，上限 `2000ms`, 下限 `0ms`)
  > * **`CCD光源稳定延时`** (`UserPar.CCD光源稳定延时` / 默认 `1000ms`，上限 `3000ms`, 下限 `0ms`)
  > * **`电批吸料稳定延时`** (`UserPar.电批吸料稳定延时` / 默认 `200ms`，上限 `1000ms`, 下限 `50ms`)
  > 通过上述延时参数的上下限管控（例如：电批吸料稳定延时限制最低 `50ms` 以保证吸附稳定），既保证了机构响应拍率，又实现了防呆保护。

* **`mFunction.GetTickCount()`**：
  * **功能**：获取高精度自系统启动以来的毫秒时间戳（Tick 数值），主要用于超时计算。

* **`mFunction.OverTime(long StartTime, int SleepTime)`**：
  * **功能**：判定从指定的 `StartTime` 刻度开始，耗时是否已经超过了 `SleepTime`（毫秒）。
  * **注意要点**：在自动状态机（AutoRun）的多线程高频循环（Tick）中，**严禁使用 `Thread.Sleep` 进行硬等待**。因为 `Thread.Sleep` 会挂起当前的工位时序线程，导致系统对急停、光幕遮挡等防呆信号的响应产生延迟。必须使用 `GetTickCount` 记录起点，并在后续步序中用 `OverTime` 进行非阻塞时间跨度判断：
    ```csharp
    case (int)步序.等待气缸伸出:
        if (mGlobal.ReadDi_Bool(InNo.气缸伸出限位))
        {
            SetStep(ref StaInfo, (int)步序.下一动作, true);
        }
        else if (mFunction.OverTime(mFunction.ConveyorData[MainConvId].StartTime, 3000))
        {
            AddLog("气缸伸出超时！", LogsType.Alarm, StaInfo.StepIdx, true);
            SetStep(ref StaInfo, (int)步序.异常, true);
        }
        break;
    ```

* **`mFunction.ReadXml<T>(string XmlFileName, ref T ReadData)`**：
  * **功能**：从指定磁盘路径读取并反序列化 XML 文件至泛型对象中，用于加载持久化的非易失数据字典。

* **`mFunction.WriteXml<T>(string XmlFileName, ref T WriteData)`**：
  * **功能**：将泛型对象序列化并写入指定硬盘路径的 XML 文件。

---
---

## 4. WorkShare 子对象 API

WorkShare 基类包含多个子对象，每个子对象提供一组专用 API。这些是工位开发中最常用的方法，全部来源于 DLL 说明书。

### 4.1 mHome — 单轴回零

**类型：** `ZHome`
**用途：** 控制单个轴的回零操作

#### WaitDone

```csharp
mHome.WaitDone(short axisId)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `axisId` | short | 轴编号（对应 `mAxis` 枚举） |

**阻塞方法**，执行后线程会等待轴回零完成。

**使用示例：**

```csharp
mHome.WaitDone(mAxis.右Z);
if (mHome.RunSts)
{
    AddLog("右Z轴回零OK", LogsType.Home);
}
else
{
    AddLog("右Z轴回零失败", LogsType.Home);
}
```

#### RunSts

```csharp
bool mHome.RunSts
```

回零结果。`true` = 回零成功，`false` = 回零失败。在 `WaitDone` 返回后读取。

---

### 4.2 dHome — 多轴同时回零

**类型：** `DHome`
**用途：** 控制多个轴同时回零

#### WaitDone

```csharp
dHome.WaitDone(short[] axisIds, double[] speeds)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `axisIds` | short[] | 轴编号数组 |
| `speeds` | double[] | 各轴回零速度，-1 表示使用默认速度 |

**阻塞方法**，所有轴回零完成后返回。

**使用示例：**

```csharp
dHome.WaitDone(
    new short[] { (short)mAxis.右X, (short)mAxis.右Y },
    new double[] { -1, -1 }
);
if (dHome.RunSts)
{
    AddLog("右XY轴回零OK", LogsType.Home);
}
```

#### RunSts

```csharp
bool dHome.RunSts
```

回零结果。`true` = 全部成功，`false` = 有失败。

---

### 4.3 pMove — 位置运动

**类型：** `Moving`
**用途：** 控制轴移动到指定位置（支持点位移动和直接坐标移动）

#### WaitDone（10参数完整版 — 多轴示教点联动）

```csharp
pMove.WaitDone(
    int StationNum,                 // 工位编号
    int PointNum,                   // 点位编号
    bool MultiAxisSync,             // 是否多轴联动
    double ZLiftHeight,             // Z轴安全高度(mm)
    int PosDelayTime,               // 到位延时(ms)
    int MaxWaitTime,                // 超时(ms)
    double LowSpeedApproachDist,    // 低速趋近距离(mm)
    double LowSpeedApproachSpeed,   // 低速趋近速度(mm/s)
    double LowSpeedLiftDist,        // 低速抬升距离(mm)
    double LowSpeedLiftSpeed        // 低速抬升速度(mm/s)
)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `StationNum` | int | 工站编号（对应 `mTeachN` 枚举） |
| `PointNum` | int | 点位编号（对应 `ePx` 枚举） |
| `MultiAxisSync` | bool | `true`=多轴联动（Z先升→XY移动→Z降），`false`=单轴独立移动 |
| `ZLiftHeight` | double | Z轴安全抬升高度（mm），仅 `MultiAxisSync=true` 时生效 |
| `PosDelayTime` | int | 到位后延时（ms） |
| `MaxWaitTime` | int | 最大等待时间（ms） |
| `LowSpeedApproachDist` | double | 低速趋近距离（mm），到达目标前最后一段距离降速 |
| `LowSpeedApproachSpeed` | double | 低速趋近速度（mm/s） |
| `LowSpeedLiftDist` | double | 低速抬升距离（mm） |
| `LowSpeedLiftSpeed` | double | 低速抬升速度（mm/s） |

**运行逻辑（MultiAxisSync=true 时）：**
1. Z 轴先上升至 `ZLiftHeight`（安全高度）
2. X、Y 轴联动移至目标点位
3. XY 到位后，Z 轴下降至目标 Z 坐标

**使用示例：**

```csharp
// 多轴联动，Z轴先升到0mm，到位延时10ms，超时15秒
pMove.WaitDone(
    (int)mTeachN.Sta_右待机位置,
    (int)ePx.P0_待机位置,
    true,            // 多轴联动
    0.0,             // Z轴安全高度
    10,              // 到位延时10ms
    15000,           // 超时15秒
    0.0, 0.0, 0.0, 0.0  // 低速趋近参数（0=不使用）
);

// 单轴独立移动（MultiAxisSync=false）
pMove.WaitDone(
    (int)mTeachN.Sta_右待机位置,
    (int)ePx.P0_待机位置,
    false,           // 不联动
    0.0, 10, 15000,
    0.0, 0.0, 0.0, 0.0
);
```

#### WaitDone（5参数版 — 单轴绝对运动）

```csharp
pMove.WaitDone(
    ValueType AxisNum,      // 轴编号
    double TargetPos,       // 目标位置(mm)
    double Speed,           // 速度(mm/s)，-1=使用参数配置速度
    int PosDelayTime,       // 到位延时(ms)
    int MaxWaitTime         // 超时(ms)
)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `AxisNum` | ValueType | 轴编号 |
| `TargetPos` | double | 目标位置（mm） |
| `Speed` | double | 速度（mm/s），**-1=使用参数配置速度** |
| `PosDelayTime` | int | 到位延时（ms） |
| `MaxWaitTime` | int | 最大等待时间（ms） |

**使用示例：**

```csharp
// Z轴移动到等待位，使用默认速度，超时60秒
pMove.WaitDone(上料Z轴, 上料Z_P0等待位.Z, -1, 10, 60000);

// X轴移动到工作位
pMove.WaitDone(搬运X轴, 搬运X_P2工作位.X, -1, 10, 60000);
```

#### Pause

```csharp
bool pMove.Pause
```

暂停标志。设为 `true` 暂停运动，`false` 恢复。在 `Homing()` 中通常设为 `false`：

```csharp
this.pMove.Pause = false;
```

---

### 4.4 sMove — 单轴运动（非阻塞）

**类型：** `OneAxis`
**用途：** 单轴运动控制（发送指令，不等待到位）

#### 常用方法

```csharp
// 绝对位置移动（发送指令，不阻塞）
sMove.AbsMove(short axisIndex, double position, double speed)

// 停止
sMove.Stop(short axisIndex)
```

---

### 4.5 mMove — 多轴运动（非阻塞）

**类型：** `MutiAxis`
**用途：** 多轴联动控制（发送指令，不等待到位）

#### 常用方法

```csharp
// 多轴同时移动（发送指令，不阻塞）
mMove.AbsMove(short[] axisIndexes, double[] positions, double[] speeds)
```

---

### 4.6 mDoDi / mDoDiS — 数字 IO 等待与简化版

**类型：** `DoAndDi` / `DoAndDiS`  
**用途：** 控制输出点（如电磁阀气缸）置位/复位，并同步阻塞等待输入点（如到位传感器）达到预期电平。`mDoDiS` 是 `mDoDi` 的简化版包装类，接口与功能完全兼容。

#### WaitDone（设置输出 + 等待输入）— 7参数版

```csharp
mDoDi.WaitDone(
    ValueType OutNum,       // 输出点序号
    short nState,           // 输出点目标状态：1=ON, 0=OFF
    ValueType InNum,        // 输入点序号
    short nState1,          // 输入点目标状态：1=ON, 0=OFF
    short DelayTime,        // 到位后延时(ms)
    short TimeOut,          // 超时(ms)，-1=无限等待
    bool Pop_up_message     // 超时是否弹框
)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `OutNum` | ValueType | 输出端口号（`OutNo` 枚举） |
| `nState` | short | 输出目标状态：**1=ON, 0=OFF** |
| `InNum` | ValueType | 输入端口号（`InNo` 枚举） |
| `nState1` | short | 输入目标状态：**1=ON, 0=OFF** |
| `DelayTime` | short | 到位后延时（ms） |
| `TimeOut` | short | 超时（ms），**-1=无限等待** |
| `Pop_up_message` | bool | 超时是否弹框提示 |

**使用示例：**

```csharp
// 设置气缸伸出（输出ON），等待伸出信号（输入ON）
mDoDi.WaitDone(
    OutNo.流线2阻挡气缸, 1,        // 输出：气缸伸出
    InNo.流线2阻挡伸出信号, 1,      // 等待：伸出信号亮
    10, 3000, true                  // 延时10ms，超时3秒，超时弹框
);

// 设置气缸缩回（输出OFF），等待缩回信号（输入ON）
mDoDi.WaitDone(
    OutNo.流线2阻挡气缸, 0,        // 输出：气缸缩回
    InNo.流线2阻挡缩回信号, 1,      // 等待：缩回信号亮
    10, 3000, true                  // 延时10ms，超时3秒，超时弹框
);
```

#### WaitDone（仅等待输入）— 5参数版

```csharp
mDoDi.WaitDone(
    ValueType InNum,        // 输入点序号
    short nState1,          // 目标状态：1=ON, 0=OFF
    short DelayTime,        // 到位后延时(ms)
    short TimeOut,          // 超时(ms)
    bool Pop_up_message     // 超时是否弹框
)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `InNum` | ValueType | 输入端口号（`InNo` 枚举） |
| `nState1` | short | 目标状态：**1=ON, 0=OFF** |
| `DelayTime` | short | 到位后延时（ms） |
| `TimeOut` | short | 超时（ms），**-1=无限等待** |
| `Pop_up_message` | bool | 超时是否弹框提示 |

**使用示例：**

```csharp
// 等待安全门关闭（输入ON）
mDoDi.WaitDone(InNo.前安全门, 1, 0, 5000, true);
```

#### WaitDi（简易等待输入）

```csharp
bool mDoDi.WaitDi(
    ValueType InNum,        // 输入点序号
    ValueType nState,       // 目标状态：1=ON, 0=OFF
    int DelayTime = 0,      // 到位后延时(ms)
    int TimeOut = 3000      // 超时(ms)
)
```

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `InNum` | ValueType | 必填 | 输入端口号（`InNo` 枚举） |
| `nState` | ValueType | 必填 | 目标状态：**1=ON, 0=OFF** |
| `DelayTime` | int | 0 | 到位后延时（ms） |
| `TimeOut` | int | 3000 | 超时（ms） |

返回值：`bool`，在超时时间内达到目标状态返回 `true`，超时返回 `false`。

**使用示例：**

```csharp
// 等待到位信号亮，超时3秒
if (mDoDi.WaitDi(InNo.流线1到位信号, 1, 0, 3000))
{
    // 到位成功
}
```

#### mAction

```csharp
event Action<string, string> mDoDi.mAction
```

错误回调事件。当 `WaitDone` 超时时触发。在 `Initialize()` 中注册：
```csharp
mDoDi.mAction += Err;
```

---

### 4.7 mSend — TCP 发送等待

**类型：** `DataSend`
**用途：** 发送 TCP/串口数据并等待响应（阻塞方法）

#### WaitDone

```csharp
mSend.WaitDone(
    int mPortIndex,         // 端口号
    int sendType,           // 发送类型
    string SendData,        // 发送数据
    int recvType,           // 接收类型
    string recvStr,         // 匹配字符串
    int nTimeOut,           // 超时(ms)
    bool bTimeOutShowDialog,// 超时是否弹框
    bool nShowLog           // 是否显示日志
)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `mPortIndex` | int | 端口号（对应 `TCPIP_Port` 枚举或串口编号） |
| `sendType` | int | **发送类型：0=字节发送, 1=字符串发送** |
| `SendData` | string | 发送的数据内容 |
| `recvType` | int | **接收类型：0=字节接收, 1=字符串接收** |
| `recvStr` | string | 匹配字符串（空字符串 `""`=接收任意响应，推荐用于返回OK/NG场景） |
| `nTimeOut` | int | 超时（ms），**-1=无限等待** |
| `bTimeOutShowDialog` | bool | 超时是否弹框提示 |
| `nShowLog` | bool | 是否在界面显示日志 |

**使用示例：**

```csharp
// 发送字符串指令，等待字符串响应（被检查数据置空以接收任意有效格式，推荐）
mSend.WaitDone(
    (int)TCPIP_Port.上CCD1, // 端口
    1,                       // sendType: 1=字符串发送
    "SCAN\r\n",              // 发送数据
    0,                       // recvType: 0=默认
    "",                      // 被检查字符串（传空字符串 ""，防止因相机未返回指令头导致超时误判）
    5000,                    // 超时5秒
    true,                    // 超时弹框
    true                     // 记录日志
);

// 发送拍照指令，等待响应
mSend.WaitDone(
    (int)TCPIP_Port.上CCD1, 1, "PHOTO\r\n", 0, "", 5000, true, true
);
```

#### mAction

```csharp
event Action<string, string> mSend.mAction
```

错误回调事件。在 `Initialize()` 中注册：

```csharp
mSend.mAction += Err;
```

---

### 4.8 mPulseOut — 脉冲输出

**类型：** `PulseOut`
**用途：** 输出指定时长的脉冲信号（阻塞方法）

#### Send

```csharp
mPulseOut.Send(
    ValueType index,    // 输出端口号
    int nValue,         // 输出状态：1=ON, 0=OFF
    int nDelayTime      // 脉冲持续时间(ms)
)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `index` | ValueType | 输出端口号（`OutNo` 枚举） |
| `nValue` | int | 输出状态：**1=ON, 0=OFF** |
| `nDelayTime` | int | 脉冲持续时间（ms） |

**使用示例：**

```csharp
// 输出100ms的ON脉冲
mPulseOut.Send(OutNo.蜂鸣器, 1, 100);
```

---

### 4.9 MotionDll 底层 API

**命名空间：** `MotionFunction`
**类：** `static class MotionDll`

#### IO 操作

| 方法 | 签名 | 说明 |
|------|------|------|
| `ReadDi` | `int ReadDi(short Index)` | 读取数字输入（返回 0 或 1） |
| `ReadDiT` | `bool ReadDiT(short Index)` | 读取 DI，信号存在时返回 true |
| `ReadDiF` | `bool ReadDiF(short Index)` | 读取 DI，信号不存在时返回 true |
| `ReadDo` | `int ReadDo(short Index)` | 读取数字输出状态 |
| `WriteDo` | `bool WriteDo(short Index, short Value)` | 写入数字输出 |
| `DoSet` | `bool DoSet(ValueType Index)` | 设置输出 ON |
| `DoReset` | `bool DoReset(ValueType Index)` | 设置输出 OFF |
| `WriteDoPls` | `void WriteDoPls(ValueType Index, short Value, int WaitTime)` | 输出脉冲信号 |

#### 轴操作

| 方法 | 签名 | 说明 |
|------|------|------|
| `AxisStop` | `bool AxisStop(short AxisID, short Option)` | 停止轴。Option: 0=平滑, 1=急停 |
| `mAxisOn` | `bool mAxisOn(short AxisID)` | 轴使能开 |
| `mAxisOff` | `bool mAxisOff(short AxisID)` | 轴使能关 |
| `ZSPD` | `bool ZSPD(short AxisID)` | 检查轴是否到位（零速/静止） |
| `AbsMove` | `bool AbsMove(short AxisID, double Pos, double Speed)` | 绝对运动（底层） |
| `Jog` | `bool Jog(short AxisID, double Speed)` | 点动 |
| `SetAcc` | `void SetAcc(short AxisID, double Acc, double Dec)` | 设置加减速（m/s），-1=系统默认 |
| `CardLoad` | `int CardLoad(int, short)` | 卡初始化 |
| `GetCardPar` | `void GetCardPar(...)` | 传递卡参数 |
| `GetAxisPar` | `void GetAxisPar(...)` | 传递轴参数 |

#### 工站级运动（阻塞）

```csharp
// 绝对移动并等待到位（工站级）
MotionDll.MotionAbsMoveAndDone(short axisIndex, double position, double speed, int timeout)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `axisIndex` | short | 轴编号 |
| `position` | double | 目标位置（mm） |
| `speed` | double | 速度（mm/s），-1=使用配置速度 |
| `timeout` | int | 超时（ms） |

**使用示例：**

```csharp
// Z轴移动到安全高度
bool ok = MotionDll.MotionAbsMoveAndDone(轴Z, 0.0, -1, 5000);
if (!ok) { /* 超时处理 */ }
```

#### 工站级运动（非阻塞）

```csharp
// 绝对移动（不等待到位）
MotionDll.MotionAbsMove(short axisIndex, double position, double speed)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `axisIndex` | short | 轴编号 |
| `position` | double | 目标位置（mm） |
| `speed` | double | 速度（mm/s），-1=使用配置速度 |

#### 多轴到位等待

```csharp
// 等待多个轴同时到位
bool MotionWaitMoveDone(int[] axisIndexes, double[] targetPositions, int timeout)
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `axisIndexes` | int[] | 轴编号数组 |
| `targetPositions` | double[] | 目标位置数组（mm） |
| `timeout` | int | 超时（ms） |

**使用示例：**

```csharp
// 先异步发送XY移动指令
MotionDll.MotionAbsMove(轴X, targetX, -1);
MotionDll.MotionAbsMove(轴Y, targetY, -1);
// 再同步等待XY都到位
bool ok = MotionDll.MotionWaitMoveDone(new int[]{轴X, 轴Y}, new double[]{targetX, targetY}, 15000);
```

#### 到位检测

| 方法 | 签名 | 说明 |
|------|------|------|
| `ZSPD` | `bool ZSPD(ValueType AxisID)` | 轴到位检查 |
| `ZSPD` | `bool ZSPD(short CardNum, short Axis, double InPosDist)` | 带误差范围的到位检查 |
| `SatZSPD` | `bool SatZSPD(short StationID)` | 工站所有轴到位检查 |

#### 编码器

| 方法 | 签名 | 说明 |
|------|------|------|
| `GetEncMm` | `double GetEncMm(int axisIndex)` | 获取编码器位置（mm） |

#### 配置

| 方法 | 签名 | 说明 |
|------|------|------|
| `SetSpeedRatio` | `void SetSpeedRatio(double Ratio, bool AllSpeedDn = false)` | 设置全局速度比例（0-1） |
| `VirtualMode` | bool | 离线调试模式（true 时到位检查直接返回 true） |
| `mGEN` | mGEN | Googol EtherCAT 卡接口 |
| `mGTN` | nGTN | Googol GTN 卡接口 |

---

### 4.10 mFunction.State 系统状态枚举

```csharp
public enum State
{
    NONE,           // 无状态
    WAITRESET,      // 等待复位
    RESETTING,      // 复位中
    WAITRUN,        // 等待运行
    RUNNING,        // 运行中
    PAUSE,          // 暂停
    STOPED,         // 停止
    ALARM,          // 报警
    MANUAL,         // 手动模式
}
```

---

### 4.11 WorkShare 辅助方法

#### SetDoBit / ResetDoBit

```csharp
void SetDoBit(ValueType Index)    // 设置输出ON（暂停时阻塞）
void ResetDoBit(ValueType Index)  // 设置输出OFF（暂停时阻塞）
```

与 `mGlobal.mDoSet`/`mDoReset` 的区别：**这两个方法在系统暂停时会阻塞**，直到暂停恢复后才执行。适用于需要暂停安全保护的场景。

#### GetPosInfo

```csharp
mFunction.PosInfo GetPosInfo(ValueType StaId, ValueType PosIndex)
```

获取系统点位数据。`StaId` = 工站编号，`PosIndex` = 点位编号。

#### GetPosData

```csharp
double[] GetPosData(ValueType StaId, ValueType PosIndex)
```

获取系统点位数据（返回 double 数组）。

---

> 💡 **常用底层方法线程安全与暂停保护说明**

| API 方法 | 说明 | 线程安全 / 暂停自动保护 |
| :--- | :--- | :---: |
| `SetDoBit(index)` / `ResetDoBit(index)` | 设置输出（系统暂停时自动阻塞挂起） | ✅ |
| `WaitAllTaskInteractionTrue(ids, timeout, ...)` | 等待所有标志为 true | ✅ |
| `WaitAnyTaskInteractionTrue(ids, timeout, ...)` | 等待任一标志为 true | ✅ |
| `MotionDll.ReadDi(index)` | 读取数字输入 | ❌ (底层直接读硬件) |
| `MotionDll.DoSet(index)` | 设置输出 ON | ❌ (不响应系统暂停) |
| `MotionDll.DoReset(index)` | 设置输出 OFF | ❌ (不响应系统暂停) |
| `MotionDll.AbsMove(axis, pos, speed)` | 绝对移动 | ❌ (无安全边界检查) |
| `MotionDll.StopMove(axis, speed)` | 停止轴 | ❌ |
| `MotionDll.ZSPD(axisId)` | 到位检查 | ❌ |
| `MotionDll.GetEncMm(axisIndex)` | 读取编码器位置 | ❌ |

---

### 4.12 GTMultiAxialMotion 多轴直线插补与协同 API

在点胶、焊接、轨迹涂胶或双轴多轴同步联动等工业应用场景中，针对轨迹精度要求较高的多轴动作，BoTech 框架在 `4.Assist/8.GTMultiAxialMotion.cs` 中提供了高层封装类 `GTMultiAxialMotion`。它在底层基于固高 (Googol) 控制卡的坐标系映照 (`GTN_SetCrdMapBase`) 与插补指令 (`GTN_LnXY` / `GTN_LnXYZ` / `GTN_LnXYZA`) 实现了多维空间的直线插补与主从轴跟随功能。

#### 4.12.1 AxisPoints 轴点位封装结构

在调用直线插补与轨迹运动方法前，需要先为参与插补的每一个物理/逻辑轴实例化 `AxisPoints` 对象。

* **构造函数原型**：
  ```csharp
  public AxisPoints(int axisId, double[] points, double encMm)
  ```
* **核心属性说明**：
  * **`AxisId`**：参与插补的轴编号（如强转 `(int)mAxis.右X`）。
  * **`Points`**：该轴要依次经过的目标轨迹坐标数组 `double[]`。
  * **`CurEncMm`**：当前编码器物理位置（单位 mm，一般传入 `MotionDll.GetEncMm(axisId)`）。
  * **`PPM`** (Pulses Per Millimeter)：根据 `AxisIndex` 自动换算的**每毫米脉冲数**。
    $$\text{PPM} = \frac{\text{每圈脉冲数} \times \text{齿轮比}}{\text{导程}}$$
  * **`CurrentPulse`**：高频获取的轴硬件实时脉冲计数值。

#### 4.12.2 多维直线插补 API

##### 1. 二维平面直线插补 (`Line2D`)
* **原型**：`public static bool Line2D(AxisPoints axis1, AxisPoints axis2, double speed)`
* **说明**：传入基础轴 `axis1`（其轴号须小于 `axis2`）和目标轴 `axis2`，底层自动配置坐标系映射并按 `speed` 速度合成二维平面直线运动。

##### 2. 三维空间直线插补 (`Line3D`)
* **原型**：`public static bool Line3D(AxisPoints axis1, AxisPoints axis2, AxisPoints axis3, double speed)`
* **说明**：控制 3 个轴在 XYZ 三维空间内沿指定多段点位进行高精度的合成直线运动。

##### 3. 四维多轴直线插补 (`Line4D`)
* **原型**：`public static bool Line4D(AxisPoints axis1, AxisPoints axis2, AxisPoints axis3, AxisPoints axis4, double speed)`
* **说明**：控制 4 个轴同步执行空间四维直线插补轨迹。

##### 代码调用示例：
```csharp
// 1. 构造 X 轴与 Y 轴的多段插补轨迹点位数组
double[] xPath = new double[] { 100.0, 150.0, 200.0 };
double[] yPath = new double[] { 50.0,  120.0, 180.0 };

// 2. 实例化 AxisPoints 包装对象（获取当前编码器反馈值）
AxisPoints pX = new AxisPoints((int)mAxis.右X, xPath, MotionDll.GetEncMm((int)mAxis.右X));
AxisPoints pY = new AxisPoints((int)mAxis.右Y, yPath, MotionDll.GetEncMm((int)mAxis.右Y));

// 3. 启动二维直线插补运动，插补合成速度设定为 80.0 mm/s
bool isSuccess = GTMultiAxialMotion.Line2D(pX, pY, 80.0);
if (isSuccess)
{
    AddLog("二维直线插补轨迹运行完成！", LogsType.Auto, StaInfo.StepIdx, true);
}
else
{
    AddLog("直线插补报错或被中断！", LogsType.ErrorCode, StaInfo.StepIdx, true);
}
```

#### 4.12.3 主从轴跟随与电子齿轮协同 API

##### 1. Follow 模式轨迹跟随 (`FollowAxisSetup`)
* **原型**：`public static bool FollowAxisSetup(int axisidMaster, double masterSegmentStart, double masterSegmentEnd, int axisidSlave, double slaveSegmentStart, double slaveSegmentEnd)`
* **说明**：配置从轴 `axisidSlave` 跟随主轴 `axisidMaster` 进行轨迹 Follow 模式跟随，在给定起止区间内建立运动同步。

##### 2. 电子齿轮比例协同 (`GearAxisSetup`)
* **原型**：`public static bool GearAxisSetup(int axisidMaster, double masterSegmentStart, double masterSegmentEnd, int axisidSlave, double slaveSegmentStart, double slaveSegmentEnd)`
* **说明**：通过主轴与从轴的位移差值自动计算电子齿轮比，使从轴在双向/正向运动中保持比例联动。

##### 3. 停止从轴跟随 (`SlaveStop`)
* **原型**：`public static bool SlaveStop(int axisidSlave)`
* **说明**：安全终止并切断从轴的 Follow/Gear 跟随状态。

---

---
