---
title: 工业控制核心：S7.Net 深度指南与固高、雷赛运动控制卡全景实战
published: 2024-10-20
description: Siemens PLC 通信协议解析与多轴运动控制底层 API、参数配置及应用场景全解
image: /images/industrial-control-s7net-motion-cards.jpg
category: C#
tags:
  - 工业控制
  - 运动控制
draft: false
---

# 工业控制核心：S7.Net 与固高/雷赛运动控制卡全景实战

在现代上位机开发（无论是老牌的 WinForm 还是现代化的 WPF）中，工控软件工程师往往需要面对两大类核心硬件：**PLC（可编程逻辑控制器，主要管逻辑与低速IO）** 与 **运动控制卡（主要管伺服电机的高速、高精度位移）**。

本文将摒弃空洞的理论，直接切入核心：为你全景展现如何通过 C# 与 西门子 PLC（借助 S7netplus）、固高科技 (Googol) 控制卡、雷赛智能 (Leadshine) 控制卡进行深度通讯与控制。每一段代码、每一个 API 我们都会掰开揉碎地讲解其参数含义与使用流程。

---


## 目录

  - [上位机与西门子 PLC 通信架构](#上位机与西门子-plc-通信架构)
- [1. S7netplus (S7.Net) 深度实战指南](#1-s7netplus-s7net-深度实战指南)
  - [1.1 核心连接 API 与参数解析](#11-核心连接-api-与参数解析)
  - [1.2 数据读写流与内存切片映射](#12-数据读写流与内存切片映射)
- [2. 固高科技 (Googol) 运动控制卡实战](#2-固高科技-googol-运动控制卡实战)
  - [2.1 核心初始化与伺服上电流程](#21-核心初始化与伺服上电流程)
  - [2.2 Jog 模式 (点动：用于手动调试面板)](#22-jog-模式-点动用于手动调试面板)
  - [2.3 Trap 模式 (点位定位：最常用的绝对/相对运动)](#23-trap-模式-点位定位最常用的绝对相对运动)
  - [2.4 PT 模式 (Position-Time 位置-时间模式)](#24-pt-模式-position-time-位置-时间模式)
  - [2.5 多轴插补模式 (Interpolation / Crd)](#25-多轴插补模式-interpolation--crd)
- [3. 雷赛智能 (Leadshine) 运动控制卡实战](#3-雷赛智能-leadshine-运动控制卡实战)
  - [3.1 核心初始化与引脚配置](#31-核心初始化与引脚配置)
  - [3.2 P-Move 绝对定位与完美 S 曲线柔化](#32-p-move-绝对定位与完美-s-曲线柔化)
  - [3.3 高阶应用：Position Compare (硬件飞拍比较输出)](#33-高阶应用position-compare-硬件飞拍比较输出)
- [4. 雷赛 vs 固高：插补运动核心差异与选型决策](#4-雷赛-vs-固高插补运动核心差异与选型决策)
  - [4.1 架构层面的根本差异](#41-架构层面的根本差异)
  - [4.2 插补运动的核心差异详解](#42-插补运动的核心差异详解)
  - [4.3 选型决策：什么场景用雷赛，什么场景用固高](#43-选型决策什么场景用雷赛什么场景用固高)
  - [4.4 混合使用的工程实践](#44-混合使用的工程实践)
- [5. 总结：写给 C# 上位机开发者的"血泪箴言"与最容易踩的坑](#5-总结写给-c-上位机开发者的血泪箴言与最容易踩的坑)


### 上位机与西门子 PLC 通信架构

```mermaid
graph TD
    subgraph 上位机 C# Application
        UI[WPF / WinForms 界面的数据展示] --> Driver[S7NetPlus 驱动组件]
        Driver --> Thread[后台周期轮询线程 (10~50ms)]
    end
    subgraph 工业网络
        Thread -->|S7 Protocol over TCP/IP (Port 102)| Switch[工业以太网交换机]
    end
    subgraph 现场 PLC 控制器
        Switch --> S71200[Siemens S7-1200 / S7-1500 PLC]
        S71200 --> DB[数据块 DB1 / M块 / I/O]
    end
```

## 1. S7netplus (S7.Net) 深度实战指南

**S7netplus** 是开源的 C# 西门子通讯库。相比昂贵的 Kepware 或庞大的 PROFINET 官方库，它直接通过 TCP 建立 S7 协议的 Socket 连接，极其轻量。

### 1.1 核心连接 API 与参数解析

在 WinForm 或 WPF 启动时，我们决不能在 UI 主线程（比如 `Form_Load`）里直接去连接 PLC，因为 Socket 连接可能面临网络不通而导致长达几秒的阻塞（超时），这会让整个界面白屏假死。

**【API 详解】**
*   `new Plc(CpuType cpu, string ip, short rack, short slot)`: 构造函数。
    *   `cpu`: 目标型号枚举（`S71200`, `S71500`, `S7300`, `S7200Smart`等）。
    *   `ip`: 设备的局域网 IPv4 地址。
    *   `rack`: 机架号。绝大多数单背板系统填 `0`。
    *   `slot`: 插槽号。S7-1200/1500 的 CPU 通常在槽 `1`，S7-300 在槽 `2`。
*   `plc.OpenAsync()`: 异步打开连接。这不会阻塞主线程。

**【WPF / WinForm 异步连接场景示例】**

```csharp
using S7.Net;
using System.Threading.Tasks;
using System.Windows; // WPF 示例

public partial class MainWindow : Window
{
    private Plc _siemensPlc;

    public MainWindow()
    {
        InitializeComponent();
        // 绑定窗口加载事件
        this.Loaded += MainWindow_Loaded; 
    }

    private async void MainWindow_Loaded(object sender, RoutedEventArgs e)
    {
        // UI 显示提示语
        lblStatus.Text = "正在连接设备...";
        
        // 初始化对象
        _siemensPlc = new Plc(CpuType.S71200, "192.168.0.10", 0, 1);

        try
        {
            // 使用 await 异步等待连接，避免界面假死
            await _siemensPlc.OpenAsync();
            
            if(_siemensPlc.IsConnected)
            {
                lblStatus.Text = "PLC 连接成功！";
                lblStatus.Foreground = System.Windows.Media.Brushes.Green;
                
                // 连接成功后，开启后台轮询数据的任务
                StartPollingData();
            }
        }
        catch (Exception ex)
        {
            lblStatus.Text = "连接失败，请检查网线！";
            lblStatus.Foreground = System.Windows.Media.Brushes.Red;
        }
    }
}
```

> **🔥 避坑指南 (博图配置)**：针对 1200/1500，必须在博图中勾选 **“允许从远程伙伴使用 PUT/GET 通信访问”**，且要访问的 DB 块必须**取消勾选“优化的块访问”**。

### 1.2 数据读写流与内存切片映射

S7.Net 支持绝对地址寻址，语法规则类似于 `DB1.DBX0.1`, `MD20`, `Q0.0`。
然而，在实际上位机应用中（如 SCADA 看板），我们需要实时刷新几十上百个数据。千万**不要使用**多次 `plc.Read("DB1...")`，因为每一次调用都会触发一次 TCP 握手和 S7 报文收发，极易造成网络风暴。

**正确使用流程（大块读取 + 内存切片）**：

**【API 详解】**
*   `ReadBytes(DataType dataType, int db, int startByteAdr, int count)`: 一次性读取整块字节流。
    *   `dataType`: 数据区枚举。常用 `DataType.DataBlock` (DB块), `DataType.Memory` (M区)。
    *   `db`: DB块编号。读 DB10 就填 10（如果是非DB区此参数填0）。
    *   `startByteAdr`: 起始字节偏移量。
    *   `count`: 要读取的总字节数。

**【WPF 实时数据轮询场景示例】**

```csharp
using S7.Net;
using S7.Net.Types; // 需要用到辅助转换类

// 开启一个后台死循环任务，用于监控产线数据
private void StartPollingData()
{
    Task.Run(async () =>
    {
        while (true)
        {
            try
            {
                // 一次性读取 DB10 中，从偏移量 0 开始的 100 字节数据
                byte[] buffer = _siemensPlc.ReadBytes(DataType.DataBlock, 10, 0, 100);

                // --- 开始在 C# 内存中高速解析 ---
                
                // 1. 解析 Bool (位): 假设需求是读取 DB10.DBX0.2 (系统启动信号)
                // SelectBit(2) 表示取第一个字节 (buffer[0]) 的第 2 个比特位
                bool isSystemRunning = buffer[0].SelectBit(2); 

                // 2. 解析 Int16 (短整型): 假设需求是读取 DB10.DBW2 (气缸压力值)
                // Skip(2).Take(2) 截取从字节 2 开始的连续 2 个字节
                // FromByteArray 负责处理西门子（大端）与 Windows（小端）的字节序翻转
                short airPressure = Int.FromByteArray(buffer.Skip(2).Take(2).ToArray());

                // 3. 解析 Float/Real (单精度浮点数): 假设需求读取 DB10.DBD4 (熔炉温度)
                // 截取连续 4 个字节，转换为浮点数
                float temperature = Real.FromByteArray(buffer.Skip(4).Take(4).ToArray());

                // --- 切换回 UI 线程刷新界面 ---
                Application.Current.Dispatcher.Invoke(() => 
                {
                    chkRunning.IsChecked = isSystemRunning;
                    txtPressure.Text = airPressure.ToString() + " Mpa";
                    txtTemp.Text = temperature.ToString("F2") + " ℃";
                });
            }
            catch(Exception)
            {
                // 通讯中断处理，可在此重连
            }

            // 严禁无限光速轮询，必须休眠，保护网卡与 CPU
            await Task.Delay(100); 
        }
    });
}
```

---

## 2. 固高科技 (Googol) 运动控制卡实战

固高控制卡是国内运控领域的元老，动态链接库通常为 `gts.dll`。它的 API 风格非常偏向底层和 C 语言（全是返回 `short` 类型的错误码，0 代表成功，非 0 代表故障）。

### 2.1 核心初始化与伺服上电流程

固高卡强依赖于外部配置文件（`.cfg`）。机电工程师在装配好机器后，会用固高提供的 MCT2008 辅助软件，把电机的极性、脉冲当量、限位传感器等配置好，并导出一个 `.cfg` 文件供 C# 上位机调用。

**【API 详解】**
*   `GT_Open(short channel, short param)`: 打开板卡底层驱动。channel 常填 0（指控第一张卡）。
*   `GT_Reset()`: 给板卡的 DSP 芯片发一个复位信号，清空内部一切残留的运行状态。
*   `GT_LoadConfig(string pFile)`: 将配置好的 cfg 文件刷入板卡内部寄存器。
*   `GT_ClrSts(short axis, short count)`: 清除指定轴上的错误状态（比如刚才碰到了急停、或者掉电报警）。
*   `GT_AxisOn(short axis)`: 给驱动器发送 Servo On（伺服使能）信号。驱动器听到后就会抱死电机轴，不允许手掰。

**【WinForm 窗口加载初始化场景示例】**

```csharp
using gts;

private void FormMain_Load(object sender, EventArgs e)
{
    // 1. 尝试打开板卡，如果返回不是 0，说明驱动没装好或板卡没插稳
    short rtn = mc.GT_Open(0, 1);
    if (rtn != 0) 
    {
        MessageBox.Show("PCIe总线未检测到固高控制卡！错误码：" + rtn);
        return;
    }

    // 2. 深度复位
    mc.GT_Reset();

    // 3. 加载存放在程序根目录的机器配置文件
    rtn = mc.GT_LoadConfig("MachineConfig.cfg");
    if(rtn != 0)
    {
        MessageBox.Show("配置文件加载失败，请确认 MachineConfig.cfg 是否存在！");
        return;
    }

    // 4. 假设我们的设备是一个三轴系统 (X=1, Y=2, Z=3)
    // 我们需要循环清除每个轴的报警，并开启使能
    for (short axis = 1; axis <= 3; axis++)
    {
        mc.GT_ClrSts(1, axis); // 清除轴状态
        mc.GT_AxisOn(axis);    // 伺服通电，听到“哒”的一声继电器响，电机锁死
    }

    MessageBox.Show("机台底层伺服初始化完成，等待运动指令。");
}
```

### 2.2 Jog 模式 (点动：用于手动调试面板)

**场景描述**：在调试阶段，工人需要按住界面上的“X+”按钮，电机就开始转；松开按钮，电机就停。这叫做 Jog 模式。

**【API 详解】**
*   `GT_PrfJog(short axis)`: 告知板卡，这个轴接下来的运动属于 Jog 模式。
*   `GT_SetJogPrm(short axis, ref TJogPrm prm)`: 配置点动的加速度和减速度。
*   `GT_SetVel(short axis, double vel)`: 设置点动的方向与速度（正数为正转，负数为反转）。
*   `GT_Update(int mask)`: 【极度重要】固高卡的大多数设置指令只是放在缓冲区，必须调用 Update 发送掩码，才会真正起跑！掩码采用位运算：轴1是 `1<<0`(1)，轴2是 `1<<1`(2)，轴3是 `1<<2`(4)。

**【WPF 键盘点动与安全失焦防护场景示例】**

> **🔥 避坑指南 (极度危险的 MouseDown 陷阱)**：
> 很多新手喜欢用鼠标的 `MouseDown` 和 `MouseUp` 来做 Jog。但如果在鼠标按下期间，**窗口被其他软件覆盖、弹出了弹窗导致焦点丢失，或者鼠标拖到窗体外松开，MouseUp 事件将永远不会触发**，机器轴会像脱缰的野马一样直接撞向机械硬限位！
> 工业级标准做法是：使用 `PreviewKeyDown` / `PreviewKeyUp`（原生支持物理按键操作）配合窗口或按钮的 `LostFocus` 事件，一旦失去焦点必须强制发送停轴指令。

```csharp
// 键盘/鼠标【按下】事件 (开始正向转动)
private void btnXPositive_PreviewKeyDown(object sender, KeyEventArgs e)
{
    // 拦截长按键盘时产生的连续重复触发信号
    if (e.IsRepeat) return; 

    short axisX = 1; // 假设 X 轴映射在物理轴 1
    
    // 1. 设定为点动模式
    mc.GT_PrfJog(axisX);
    
    // 2. 配置点动参数
    mc.TJogPrm jogPrm;
    mc.GT_GetJogPrm(axisX, out jogPrm);
    // 【TJogPrm 结构体参数详解】
    // acc (double): 加速度，单位通常为 pulse/ms^2 (脉冲每平方毫秒)
    // dec (double): 减速度，单位为 pulse/ms^2
    // smooth (double): 平滑系数(0~1)，用于在加减速拐点做 S 型曲线平滑，值越大越平滑但跟随滞后越长
    jogPrm.acc = 0.5; 
    jogPrm.dec = 0.5; 
    jogPrm.smooth = 0.5; // 可选的平滑过渡
    mc.GT_SetJogPrm(axisX, ref jogPrm);

    // 3. 设定恒定速度 (假设 100 脉冲/毫秒，正数代表正向跑)
    mc.GT_SetVel(axisX, 100);

    // 4. 触发物理运行！(1 << (1-1) 即 1)
    mc.GT_Update(1 << (axisX - 1)); 
}

// 键盘【抬起】事件 (要求平滑停止)
private void btnXPositive_PreviewKeyUp(object sender, KeyEventArgs e)
{
    StopJogAxis(1);
}

// 【保命核心】控件或窗口失去焦点时，无条件强制刹车！
private void btnXPositive_LostFocus(object sender, RoutedEventArgs e)
{
    StopJogAxis(1); // 哪怕没有触发 KeyUp，失焦也立刻停机
}

// 独立的平滑停止函数
private void StopJogAxis(short axis)
{
    // 在 Jog 模式下，将目标速度设为 0 并 Update，电机就会根据设定的 dec (减速度) 完美平滑刹车
    mc.GT_SetVel(axis, 0);
    mc.GT_Update(1 << (axis - 1));
}
```

### 2.3 Trap 模式 (点位定位：最常用的绝对/相对运动)

**场景描述**：这是工控中最核心的模式。机台要从当前工位“走到”绝对坐标 50000 的位置，要求起步有加速，中途匀速，快到终点时自动减速刹车（呈现梯形速度曲线）。

**【API 与参数详解】**
*   `GT_PrfTrap(short axis)`: 设定轴为梯形点位模式。
*   `GT_SetTrapPrm(short axis, ref TTrapPrm prm)`: 配置梯形曲线的核心参数。
    *   **【TTrapPrm 结构体详解】**:
        *   `acc` (double): 加速度 (pulse/ms^2)，决定起步有多猛。
        *   `dec` (double): 减速度 (pulse/ms^2)，决定刹车有多急。
        *   `smoothTime` (short): 平滑时间 (ms)。极其重要！如果不设置，电机会在加速瞬间产生极其刺耳的“嘎噔”异响。设为 10~50ms 可在加减速拐点形成 S 曲线，大幅度保护机械寿命。
        *   `velStart` (double): 起步初速，通常设为 0 以防刚性冲击。
*   `GT_SetPos(short axis, int pos)`: 设定目标位置的绝对刻度（或者相对刻度，取决于底层配置）。
*   `GT_SetVel(short axis, double vel)`: 设定此段路程的最高巡航速度。

**【梯形点位移动场景示例】**

```csharp
public void MoveToAbsolutePosition(short axis, int targetPos)
{
    // 1. 设置该轴为梯形点位定位模式
    mc.GT_PrfTrap(axis);

    // 2. 灌入梯形结构体参数
    mc.TTrapPrm trapPrm;
    mc.GT_GetTrapPrm(axis, out trapPrm); // 先获取底层默认参数
    trapPrm.acc = 1.0;          // 设定加速度
    trapPrm.dec = 1.0;          // 设定减速度
    trapPrm.smoothTime = 25;    // 设定 25ms 的 S 型平滑过度，让起步如丝般顺滑
    mc.GT_SetTrapPrm(axis, ref trapPrm);

    // 3. 压入终点坐标与速度
    mc.GT_SetPos(axis, targetPos);
    mc.GT_SetVel(axis, 50.0); // 巡航速度设定为 50 pulse/ms

    // 4. 呼叫底层起跑
    mc.GT_Update(1 << (axis - 1));
}
```

### 2.4 PT 模式 (Position-Time 位置-时间模式)

**场景描述**：当传统的 Trap 模式无法满足需求（例如：你需要让电机的位移曲线呈现出一种极为变态的非线性自定义波形，或者用于电子凸轮追剪、飞锯），你可以使用 PT 模式。它允许你直接向板卡发送一连串的 `(位置增量, 耗时)` 数据对，板卡会在底层严格按照你的时间表无缝切过这些点。

**【API 与参数详解】**
*   `GT_PrfPt(short axis, short mode)`: 设置为 PT 模式。
*   `GT_PtSpace(short axis, out short pSpace)`: 查询底层 PT 缓冲区的剩余空间。因为 FIFO 通常很小（只能容纳 32 组点），长路径必须边跑边塞。
*   `GT_PtData(short axis, double pos, short time, short type)`: 压入数据点。
    *   `pos` (double): 在这段时间内要求电机走的**位移增量**（脉冲数）。
    *   `time` (short): 走完这段位移必须花费的**绝对时间**（毫秒）。
    *   `type` (short): 线型规划枚举。`PT_MODE_STATIC` (普通匀速) 或 `PT_MODE_DYNAMIC`。
*   `GT_PtStart(int mask, int option)`: 启动指定轴的 PT 引擎开始消耗队列。

**【PT 模式自定义正弦波震动曲线示例】**

```csharp
public void StartCustomPtCurve(short axis)
{
    // 1. 清空底层缓冲并设置为 PT 模式 (mode 1 指静态模式)
    mc.GT_PtClear(axis);
    mc.GT_PrfPt(axis, 1);

    // 2. 压入自定义数据
    // 假设我们要模拟一段正弦波振动，自行计算出每次 10ms 需要走的增量 posDelta
    for(int i = 0; i < 50; i++)
    {
        short space;
        mc.GT_PtSpace(axis, out space); // 查询剩余空间
        
        if (space > 0) // 确保板卡 FIFO 还没塞满
        {
            // 通过数学公式计算位移：一个周期波的增量
            double posDelta = Math.Sin(i * 0.1) * 100; 
            
            // 压入指令：强制驱动器花费恰好 10ms 走完 posDelta 的距离
            mc.GT_PtData(axis, posDelta, 10, mc.PT_MODE_STATIC);
        }
    }

    // 3. 开始严格按时间序列执行
    mc.GT_PtStart(1 << (axis - 1), 0);
}
```

### 2.5 多轴插补模式 (Interpolation / Crd)

**场景描述**：自动点胶机，需要控制胶枪在 XY 平面上走一个完美的矩形或圆弧路径。此时单独控制 X 和 Y 是没用的（跑出来是锯齿），必须让固高底层 DSP 芯片将两轴联动（插补）。

**【API 详解】**
*   `GT_SetCrdPrm(short crd, ref TCrdPrm prm)`: 初始化坐标系。告诉板卡，几号坐标系由哪几个轴构成。
*   `GT_CrdClear(short crd, short fifo)`: 清空插补 FIFO 缓冲队列。
*   `GT_LnXY(short crd, int x, int y, double synVel, double synAcc, double velEnd, short fifo)`: 将一段 XY 直线推入缓冲队列。
    *   `x, y`: 直线终点的绝对脉冲坐标。
    *   `synVel`: 这一段直线的巡航合成速度。
    *   `velEnd`: 终点速度。如果填 0，代表走到这会停；如果填非 0，代表直接滑过这个点连接下一段线（前瞻）。
*   `GT_CrdStart(short mask, short option)`: 一键启动坐标系的插补引擎。

**【插补点胶作业场景示例】**

```csharp
public void StartDispensingSquare()
{
    // 1. 构建一个二维坐标系配置
    mc.TCrdPrm crdPrm = new mc.TCrdPrm();
    crdPrm.dimension = 2;            // 我们需要联动两个轴 (X,Y)
    crdPrm.profile[0] = 1;           // 该坐标系的 X 绑定到物理轴 1
    crdPrm.profile[1] = 2;           // 该坐标系的 Y 绑定到物理轴 2
    
    // 初始化 1 号坐标系
    mc.GT_SetCrdPrm(1, ref crdPrm); 
    
    // 启动前必须清空 1 号坐标系的 0 号 FIFO 数据缓冲区
    mc.GT_CrdClear(1, 0);

    // 2. 依次推入矩形的四条边
    // 参数含义：坐标系1, X点, Y点, 合成速度100, 加速度1, 终点速度(50代表不停车滑过拐角), FIFO区号0
    
    // 走线段1: 到达 (10000, 0)
    mc.GT_LnXY(1, 10000, 0, 100, 1, 50, 0); 
    
    // 走线段2: 到达 (10000, 10000)
    mc.GT_LnXY(1, 10000, 10000, 100, 1, 50, 0); 
    
    // 走线段3: 到达 (0, 10000)
    mc.GT_LnXY(1, 0, 10000, 100, 1, 50, 0); 
    
    // 走线段4: 闭合回到起点 (0, 0)，此时要求停车，故终点速度给 0
    mc.GT_LnXY(1, 0, 0, 100, 1, 0, 0); 

    // 3. 所有路径下发完毕，呼叫底层的 DSP 插补引擎起跑！（掩码位1代表坐标系1）
    mc.GT_CrdStart(1, 0); 
}
```

---

## 3. 雷赛智能 (Leadshine) 运动控制卡实战

雷赛在 3C 消费电子制造装备（如贴片机、视觉分拣分板机）领域占有率极高，底层通信库通常为 `LTDMC.dll`。它的 API 以 `dmc_` 开头，比起固高，它的功能分类更加直白。

### 3.1 核心初始化与引脚配置

雷赛的架构与固高不同，可以直接通过 API 强行设定很多硬件信号，而不过分依赖于外部配置文件。

**【API 详解】**
*   `dmc_board_init()`: 扫描电脑的插槽并初始化所有雷赛控制卡，返回检测到的可用卡数量。
*   `dmc_write_sevon_pin(ushort CardNo, ushort NodeId, ushort on_off)`: 强行拉高/拉低 Servo 针脚的电平。1 为使能（电机抱死）。
*   `dmc_set_pulse_outmode(ushort CardNo, ushort NodeId, ushort outmode)`: 设置输出脉冲的电气模式。大多数市面驱动器采用 `1`，即 `脉冲(Pulse) + 方向(Dir)` 的单端输出方式。

**【WinForm/WPF 极简初始化】**

```csharp
using csLTDMC; // 引用雷赛官方 C# 封装类

public void InitLeadshineCard()
{
    // 1. 初始化引擎，这步如果没插卡会卡住一小会，所以返回 <=0 代表失败
    short cardCount = LTDMC.dmc_board_init();
    if(cardCount <= 0) 
    {
        MessageBox.Show("未检测到任何雷赛控制卡在位！");
        return;
    }

    ushort cardNo = 0; // 板卡标识序号（第一张卡是 0）
    
    // 假设卡上接了 4 个电机轴 (索引 0~3)
    for (ushort axis = 0; axis < 4; axis++)
    {
        // 2. 发送 Servo 使能信号，1 表示强电吸合
        LTDMC.dmc_write_sevon_pin(cardNo, axis, 1); 
        
        // 3. 设置输出模式：1 代表“脉冲+方向”模式
        LTDMC.dmc_set_pulse_outmode(cardNo, axis, 1);
    }
}
```

### 3.2 P-Move 绝对定位与完美 S 曲线柔化

在大多数定长工位间移动时，我们需要机器既跑得快，起步刹车又要稳（防止机器猛然颤抖导致零件掉落）。雷赛通过两组 API 分解了速度曲线。

**【API 详解】**
*   `dmc_set_profile(CardNo, axis, Min_Vel, Max_Vel, Tacc, Tdec)`: 设定梯形主心骨。起步速度、巡航最大速度、加速耗时、减速耗时。
*   `dmc_set_s_profile(CardNo, axis, s_mode, s_time)`: **灵魂配置！** 在起步、加速到顶、减速、刹车的四个拐点处，增加 S 形的弧形过渡柔化时间。
*   `dmc_pmove(CardNo, axis, Dist, posi_mode)`: 触发运动指令。
    *   `Dist`: 目标脉冲数值。
    *   `posi_mode`: `1` 代表绝对坐标（走到刻度10000），`0` 代表相对坐标（在当前基础上再往前走10000）。

**【移动至组装工位场景示例】**

```csharp
public void MoveToAssembleStation(ushort axis, int targetPulsePos)
{
    ushort card = 0;

    // 1. 配置梯形速度主骨架
    double startVel = 500;   // 刚起步瞬间的速度 (pulse/s)
    double maxVel = 50000;   // 允许飚到的最高速度 (pulse/s)
    double timeAcc = 0.2;    // 用 0.2 秒从 500 飚到 50000
    double timeDec = 0.2;    // 刹车时间
    LTDMC.dmc_set_profile(card, axis, startVel, maxVel, timeAcc, timeDec);

    // 2. 叠加 S 曲线柔化 (消除机械“点头”抖动)
    // s_mode 填 0 (时间模式)，0.05 代表 S 段柔化耗时占用 0.05 秒
    LTDMC.dmc_set_s_profile(card, axis, 0, 0.05); 

    // 3. 触发指令！参数 1 代表绝对运动，目标绝对位置为 targetPulsePos
    LTDMC.dmc_pmove(card, axis, targetPulsePos, 1); 

    // 4. 等待运动结束 (如果是基于 Task 的后台作业，在此处阻塞等待即可)
    // dmc_check_done 返回 1 代表轴彻底停稳了，返回 0 代表正在跑
    while(LTDMC.dmc_check_done(card, axis) == 0)
    {
        Thread.Sleep(10); // 【铁律】这里必须休眠释放 CPU 时间片，否则程序卡死
    }
    
    // 抵达工位后，触发后续的吹气阀、气缸等动作...
}
```

### 3.3 高阶应用：Position Compare (硬件飞拍比较输出)

**场景描述**：在极速运行的 SMT 贴片流水线或 CCD 视觉检测站中，如果通过 C# 代码不断询问板卡“你到目标点了吗？”，一旦确认到了再调用相机拍照 API，这中间经过了 USB、Windows 线程调度，至少会产生 10 毫秒的误差。在 2m/s 的运动下，10毫秒意味着相机拍出来的画面完全错位并发虚。

雷赛的杀手锏是 **Position Compare (飞拍比较)**：你提前把坐标写入板卡的 DSP 芯片。当高速直线电机掠过该坐标点时，DSP 芯片会在内部产生一个纳秒级的硬中断，瞬间导通板卡外部的特定引脚发出一道电流脉冲给相机。**整个过程零软件延迟，上位机只管事后去取照片**。

**【API 详解】**
*   `dmc_compare_clear_points(CardNo, cmp)`: 清空某个比较通道内部的点位阵列。
*   `dmc_compare_add_point(CardNo, cmp, pos, dir, action, actpos)`: 将坐标推入比较器。
    *   `pos`: 要触发相机的坐标刻度。
    *   `dir`: 运动方向（0为正向碰触触发）。
    *   `action`: 1 为发出有效电平。
*   `dmc_compare_start(CardNo, cmp)`: 使能该比较通道，开始监听飞速转动的编码器值。

**【飞拍检测线视觉触发示例】**

```csharp
public void SetupFlyCameraTrigger(ushort axis)
{
    ushort card = 0;
    ushort cmpChannel = 0; // 假定使用 0 号比较通道连接了相机

    // 1. 清空历史触发点
    LTDMC.dmc_compare_clear_points(card, cmpChannel);

    // 2. 设置比较参数配置: 绑定当前 axis，选择使用“规划位置”进行比较
    LTDMC.dmc_compare_set_config(card, cmpChannel, 1, axis, 0, 0);

    // 3. 我们在长条形流水线上，需要在 X 坐标为 10000, 20000, 30000 的地方进行高速无感抓拍
    int[] triggerPositions = new int[] { 10000, 20000, 30000 };
    
    foreach(var pos in triggerPositions)
    {
        // 向 DSP 压入触发点。
        // 参数含义: 卡号, 通道号, 触发位置pos, 方向(0=正向有效), 动作(1=输出有效脉冲), 动作保持时间(无视填0)
        LTDMC.dmc_compare_add_point(card, cmpChannel, pos, 0, 1, 0);
    }

    // 4. 激活监听
    LTDMC.dmc_compare_start(card, cmpChannel);

    // 设置完后，上位机只管让电机狂飙跑过这段路程，硬件板卡在路过时会自动电击相机触发快门
    LTDMC.dmc_pmove(card, axis, 50000, 1); 
}
```

---

## 4. 雷赛 vs 固高：插补运动核心差异与选型决策

在实际项目选型阶段，"用雷赛还是固高"是工控软件工程师最常面临的决策。两者虽然都能完成运动控制，但在**底层插补架构、API 设计哲学、以及最终适配的应用场景**上存在本质差异。

### 4.1 架构层面的根本差异

| 对比维度 | 固高 (Googol) | 雷赛 (Leadshine) |
|---|---|---|
| **底层芯片** | 自研高性能 DSP (数字信号处理器)，板载独立运算 | ARM + FPGA 混合架构，偏向工业成熟方案 |
| **插补引擎** | 板载独立坐标系引擎，支持**缓冲区连续插补** (BufLine/BufArc)，段间速度可连续不停顿 | 默认每段插补结束会**减速到零**，需额外开启"前瞻"或"连续插补"模式才能实现段间不停 |
| **配置方式** | 强依赖外部 `.cfg` 配置文件（由 MCT2008 工具导出），机电参数与代码解耦 | 可通过纯 API 在代码中直接配置所有硬件参数，不强制依赖外部文件 |
| **API 风格** | 偏 C 语言底层风格，返回 `short` 错误码，函数名以 `GT_` 开头 | 更加直白的功能命名，函数名以 `dmc_` 开头，参数语义更易读 |
| **多轴同步触发** | `GT_Update(mask)` 位掩码**一次触发多轴**，硬件级严格同步，时间差为零 | 多轴分别调用 `dmc_pmove`，存在**微秒级循环时间差**，非硬件级同步 |
| **生态定位** | 偏科研、高精度、复杂轨迹场景（激光切割、精密加工中心） | 偏 3C 电子制造、视觉分拣、贴片机等高通量产线场景 |

### 4.2 插补运动的核心差异详解

#### 固高的插补优势：缓冲区连续路径

固高的坐标系引擎允许你将**整段复杂路径一次性压入 FIFO 缓冲区**，底层 DSP 会自动执行前瞻计算，在直线段与直线段、直线段与圆弧段之间实现**速度连续过渡**，不需要在每个拐点减速到零再重新加速。

```csharp
// 固高：连续路径插补 —— 段间速度不归零
mc.GT_CrdClear(1, 0);

// velEnd 填非零值 → 告诉 DSP "不要在这个点停车，直接滑过去"
mc.GT_LnXY(1, 10000, 0,     100, 1, 50, 0);  // 第一段终点速度 50，不停
mc.GT_LnXY(1, 10000, 10000, 100, 1, 50, 0);  // 第二段终点速度 50，不停
mc.GT_LnXY(1, 0,     10000, 100, 1, 50, 0);  // 第三段终点速度 50，不停
mc.GT_LnXY(1, 0,     0,     100, 1, 0,  0);  // 最后一段终点速度 0，停车

mc.GT_CrdStart(1, 0); // 一键起跑，四段路径一气呵成
```

**效果**：胶枪走出的矩形路径拐角处**不会出现断胶或积胶**，因为速度从未归零。

#### 雷赛的插补特点：逐段触发 + 前瞻模式

雷赛的默认插补行为是**每段结束后减速到零**，适合"走一段、停一下、做个动作、再走下一段"的工序。如果需要连续路径，必须显式开启连续插补模式：

```csharp
// 雷赛：需要额外配置才能实现连续插补
ushort card = 0;

// 设置插补坐标系 (将轴 0 和轴 1 绑定为 XY 二维坐标系)
LTDMC.dmc_set_vector_profile_unit(card, 0, 500, 50000, 0.2, 0.2, 0);

// 默认模式：每段结束减速到零
LTDMC.dmc_line_unit(card, 0, new int[]{10000, 0}, 2, 0, 1);    // 走完就停
LTDMC.dmc_line_unit(card, 0, new int[]{10000, 10000}, 2, 0, 1); // 再起步再停

// 如果要实现连续不停，需要开启"连续插补"模式：
// dmc_conti_open_list → 压入路径 → dmc_conti_close_list → dmc_conti_start
LTDMC.dmc_conti_open_list(card, 0, 0);
LTDMC.dmc_conti_line_unit(card, 0, 0, new int[]{10000, 0}, 2, 0, 50000, 0);
LTDMC.dmc_conti_line_unit(card, 0, 0, new int[]{10000, 10000}, 2, 0, 50000, 0);
LTDMC.dmc_conti_close_list(card, 0);
LTDMC.dmc_conti_start(card, 0);
```

### 4.3 选型决策：什么场景用雷赛，什么场景用固高

#### 选择固高 (Googol) 的典型场景

| 场景 | 原因 |
|---|---|
| **激光切割 / 激光焊接** | 激光束必须沿复杂轮廓连续移动，任何速度归零都会导致过烧或断焊 |
| **精密数控加工中心 (CNC)** | 需要 3 轴甚至 5 轴联动的复杂空间曲面插补，对轨迹精度有极致要求 |
| **点胶/涂胶自动化** | 连续胶线不允许断点，固高的缓冲区连续插补天然匹配 |
| **科研级高精度运动平台** | 板载 DSP 的实时运算能力远优于 ARM，适合需要自定义复杂运动曲线的场景 |
| **多轴严格同步需求** | `GT_Update(mask)` 实现硬件级零时差多轴同步，适合龙门双驱等对称结构 |

#### 选择雷赛 (Leadshine) 的典型场景

| 场景 | 原因 |
|---|---|
| **SMT 贴片机 / 视觉分拣机** | "走→停→拍照→贴片→走"的离散工序，天然匹配雷赛逐段触发的模式 |
| **AOI / CCD 视觉检测线** | 雷赛的 Position Compare（飞拍比较）硬件飞拍功能是杀手锏，纳秒级触发精度 |
| **高通量产线 (3C 电子)** | 雷赛性价比极高，API 学习曲线平缓，适合快速交付的产线项目 |
| **分板机 / 焊锡机** | 工位间是"点到点"定位运动，不需要复杂连续轨迹，用雷赛的 pmove + S 曲线即可完美胜任 |
| **快速原型验证 / 小型设备** | 纯 API 配置无需额外工具，代码即配置，适合小团队敏捷开发 |

### 4.4 混合使用的工程实践

在大型产线中，**固高和雷赛混合使用**并不罕见。典型方案是：

- **固高负责核心加工工位**：如激光头的 XY 联动插补、涂胶臂的三维轨迹
- **雷赛负责物料搬运工位**：如传送带点位定位、视觉飞拍触发、分拣机械臂的离散搬运

两者通过上位机的统一状态机调度，共享同一个 C# 进程的不同线程池。上位机充当"总指挥"，根据当前工序阶段分别下发指令给不同的板卡。

```
+-------------------------------------+
|          C# 上位机 (总控)            |
|    +----------+  +----------+       |
|    | 固高线程  |  | 雷赛线程  |       |
|    | GT_xxx() |  | dmc_xxx()|       |
|    +----+-----+  +----+-----+       |
|         |PCIe         |PCIe         |
+---------+-------------+-------------+
          |             |
   +------+----+  +-----+-----+
   | 固高板卡  |  | 雷赛板卡  |
   | (激光XY) |  | (搬运+飞拍)|
   +----------+  +-----------+
```

---

## 5. 总结：写给 C# 上位机开发者的"血泪箴言"与最容易踩的坑

无论你是去跟西门子网线打交道，还是在机箱里去插固高和雷赛的 PCIe 板卡，在这条路上踩过的坑总结起来必须全文背诵：

1. **绝对隔离 UI 线程与硬件总线通讯**
   坚决禁止在 WPF/WinForm 的 `Button_Click` 里直接撰写 `plc.Write()` 或阻塞等待的 `while(dmc_check_done(..) == 0)`。
   所有硬件交涉必须通过 `Command` 将意图投递到后端的独立 `Task` 或状态机线程池中执行。主线程一旦卡死，工控机在车间看起来就跟“死机”了一样，极为凶险。

2. **警惕致命的死循环轮询陷阱**
   在读取 PLC 或者板卡底层状态（如 `dmc_check_done`）时，**必须加上 `Thread.Sleep(5)` 或 `await Task.Delay(5)`**。
   如果你不加休眠进行极速空转，它会以每秒千万次的频率向底层驱动或网卡发起访问，瞬间导致 PCIe 总线阻塞、通讯超时、CPU 单核满载甚至操作系统蓝屏宕机。

3. **多轴同步、插补机制的底层差异与急停逻辑**
   * **多轴同步**：雷赛多轴分别调 `dmc_pmove` 存在循环时间差（几十微秒），如果要严格同步建议用固高的 `GT_Update(mask)` 位掩码一次触发多轴。
   * **插补运动**：等待完成必须判断所有参与轴，不能只判断一个轴。固高插补的核心优势是 BufLine/BufArc 缓冲区模式，先把整段路径压入 FIFO 再统一触发，段间速度连续不停顿；雷赛默认每段结束会减速到零，要实现连续需要开启"前瞻"或"连续插补"模式。
   * **急停逻辑**：急停逻辑必须同时取消 `CancellationToken` 和调底层停止函数，两者缺一不可。

4. **软件只是辅助，安全硬急停才是最后底线**
   软件写得再精妙，也防不了现场网线被老鼠咬断、车间遭遇瞬间强电磁干扰、或者 Windows 突然后台更新弹窗卡死。
   作为上位机开发，你永远只能把电脑当作“大脑指挥中枢”。你必须强烈要求电气硬件工程师在电柜外面串联一个绝对独立的**“大红色蘑菇头物理急停按键”**，用来在发生撞机前，瞬间用物理开关切断所有驱动器的 220V 供电回路。**人身安全，重于一切！**