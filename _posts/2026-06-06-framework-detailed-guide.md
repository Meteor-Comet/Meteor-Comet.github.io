---
layout: post
title: "框架详解"
subtitle: "BoTech 工业自动化软件框架开发手册与核心架构指南"
date: 2026-06-06 10:00:00 +0800
author: "Comet"
catalog: true
header-style: text
tags:
  - C#
  - 工业控制
  - 软件框架
  - BoTech
  - 架构设计
---

# BoTech 工业自动化软件框架开发手册与核心架构指南

本手册旨在为开发人员提供关于 BoTech 工业自动化控制软件框架的深度总结。内容涵盖硬件参数配置映射、C# 枚举手动同步 SOP、后台 XML 数据字典架构、自动化工站流程开发 SOP、状态控制逻辑，以及全部常用 API 函数的详细参数、返回值与代码示例。

---

## 目录

1. [软件框架设计概述](#1-软件框架设计概述)
2. [UI 界面参数配置映射与数据库架构](#2-ui-界面参数配置映射与数据库架构)
   - [2.1 硬件参数与系统参数的 Excel 配置 (开发第一步)](#21-硬件参数与系统参数的-excel-配置-开发第一步)
   - [2.2 C# 枚举 (EnumName.cs) 绑定关系与手动同步 SOP](#22-c-枚举-enumnamecs-绑定关系与手动同步-sop)
   - [2.3 Excel 参数配置与 XML 数据库转换映射规则](#23-excel-参数配置与-xml-数据库转换映射规则)
   - [2.4 UI 界面参数标签页 (TabPage) 绑定关系](#24-ui-界面参数标签页-tabpage-绑定关系)
   - [2.5 HMI UI 诊断监控与 I/O 硬件的交互联系](#25-hmi-ui-诊断监控与-io-硬件的交互联系)
   - [2.6 输入限制与合法性校验逻辑](#26-输入限制与合法性校验逻辑)
   - [2.7 功能使能复选框在业务代码中的跳步与屏蔽机制](#27-功能使能复选框在业务代码中的跳步与屏蔽机制)
3. [自动化流程开发 SOP](#3-自动化流程开发-sop)
   - [3.1 继承关系与生命周期函数](#31-继承关系与生命周期函数)
   - [3.2 自动运行状态机开发模板](#32-自动运行状态机开发模板)
   - [3.3 步序控制与更新机制 (SetStep)](#33-步序控制与更新机制-setstep)
   - [3.4 超时计时器重置与防虚警防呆逻辑](#34-超时计时器重置与防虚警防呆逻辑)
4. [框架常用 API 函数参考手册](#4-框架常用-api-函数参考手册)
   - [4.1 运动控制类 (Motion Control)](#41-运动控制类-motion-control)
   - [4.2 系统、超时与日志 (System/Utility/Logs)](#42-系统超时与日志-systemutilitylogs)
   - [4.3 文件读写 (File Operations)](#43-文件读写-file-operations)
   - [4.4 网口与串口通讯 (Communications)](#44-网口与串口通讯-communications)
   - [4.5 软交互信号量与干涉区防撞 (Synchronization & Concurrency)](#45-软交互信号量与干涉区防撞-synchronization--concurrency)
5. [机械臂基类开发最佳实践](#5-机械臂基类开发最佳实践)
   - [5.1 线程安全的安全移动方法设计 (SafeMoveTo)](#51-线程安全的安全移动方法设计-safemoveto)

---

## 1. 软件框架设计概述

BoTech 框架是一款基于多线程并发、状态机流控制和点位/参数示教的模块化工业控制系统。其核心架构由以下三层构成：

1. **界面层 (Form/UI)**：提供以主界面、手动调试界面、参数配置页面和示教界面为核心的 HMI。
2. **逻辑控制层 (Tasks)**：每个独立的物理机构或工位继承自 `mWorkShare` 基类，在独立的线程中以状态机形式运行。各工站通过高内聚、低耦合的设计实现协作。
3. **硬件抽象与辅助层 (Assist/DLLs)**：封装运动控制卡（如固高卡等）、数字 I/O 读写、TCP/IP/串口网络通讯、数据库读写、文件存储、日志追踪以及多工站防撞干涉区管理。

---

## 2. UI 界面参数配置映射与数据库架构

在搭建新项目或导入新硬件方案时，**参数配置是绝对的第一步工作**。此时设备刚完成物理接线，尚未编写业务逻辑，必须先通过 Excel 写入所有硬件元数据，并在 C# 源码中同步对应的枚举字段，以此构建整个工控软件的数据字典与软硬件映射通道。

### 2.1 硬件参数与系统参数的 Excel 配置 (开发第一步)

开发人员需要在 `D:\BZ-Parameter\RBF\ParXlsx\` 目录下配置以下五个核心 Excel 表格。这些表格定义了整台设备的卡、轴、I/O 以及系统规格。

#### 2.1.1 控制卡配置 (`CardPar.xlsx`)
定义系统中所安装的物理运动控制卡（如固高 GTS 卡等）及扩展板卡的型号与物理地址。
* **主要列定义**：
  * **编号**：逻辑 ID（从 0 开始自增），用于软件内存数组分配。
  * **卡号**：物理板卡上拨码开关设定的物理卡号（对应驱动中的 Card ID）。
  * **卡名称**：如 `DECAT` (固高主卡)、`GENEX` 等。
  * **供应商**：板卡制造厂商，如 `固高` 等。
  * **起始序号** 与 **数量**：该板卡控制的总轴数或 I/O 引脚的起始逻辑地址。
  * **主卡**：布尔值（True/False），设定为主卡后，软件系统启动时将作为主控卡加载。
  * **参数路径**：控制卡底层核心配置文件的相对路径（如 `+GTS_Config/gtn_core1.cfg`）。系统初始化时，驱动会自动读取该 CFG 文件进行底层初始化。

#### 2.1.2 伺服轴配置 (`AxisPar.xlsx`)
将 C# 中的逻辑轴映射到控制卡的物理通道上，并进行脉冲当量和加减速规划。
* **主要列定义**：
  * **编号**：轴逻辑 ID。**必须与 C# 源码 `EnumName.cs` 中 `mAxis` 枚举的声明顺序完全保持一致**。
  * **名称**：轴中文名（如 `左X`）。
  * **卡号** / **轴号**：该轴接在 `CardPar.xlsx` 中配置的哪张板卡（卡号）以及哪一个物理轴通道（轴号，通常为 1~8）。
  * **脉冲当量计算参数**（`每圈脉冲`、`减速比`、`导程(mm/°)`）：
    用于进行物理单位与脉冲数的自动转换。转换公式为：
    $$\text{脉冲比例 (Pulse Ratio)} = \frac{\text{每圈脉冲} \times \text{减速比}}{\text{导程}}$$
    *例如：伺服电机每圈脉冲为 10000，直连无减速比，丝杠导程为 10mm，则脉冲比例为 $10000 \times 1 / 10 = 1000\text{ Pulse/mm}$。当代码调用 `MotionAbsMove(轴X, 50, -1)` 移动 50mm 时，底层驱动会自动发送 $50 \times 1000 = 50000$ 个脉冲，实现对开发者的物理单位黑盒化。*
  * **速度规划参数**（`加速度`、`减速度`、`回零速度(mm/s)`）：
    定义轴在执行运动指令时的默认加减速斜率以及回零寻找 Index 信号时的物理速度，保证轴在起停时的平稳度。

#### 2.1.3 数字 I/O 映射配置 (`Input.xlsx` 与 `Output.xlsx`)
配置物理传感器（光电开关、安全门、磁簧开关）和物理输出动作（电磁阀、继电器、指示灯）。
* **输入/输出列定义**：
  * **编号**：逻辑 ID（从 0 开始自增），必须与 C# `EnumName.cs` 中的 `InNo` 和 `OutNo` 枚举排序完全一致。
  * **名称Cn** / **名称En**：在中英文界面上显示的信号名称。
  * **模块编号** / **序号**：指明该 I/O 信号压接在第几张板卡（模块编号）以及哪一个物理引脚（引脚序号，如 Pin 0~15）上。
  * **初始状态**：系统复位上电时控制卡输出的默认电平（通常为 0）。
  * **原点序号** / **动点序号**（`Output.xlsx` 独有）：仅针对双控气缸，用于绑定对应的缩回和伸出物理限位信号（`InNo`）。
    *当调用气缸动作 API `mDoDiWaitDone` 时，软件框架根据此映射自动等待对应的传感器信号，如果超时则自动判断为动作未到位报错。*

#### 2.1.4 系统参数配置 (`SysPar.xlsx`)
设定整台设备的物理规模限制，用于系统启动时的内存初始化和边界保护。
* **主要参数项**：
  * **卡数量**：系统中控制卡及模块的总数。
  * **轴数量**：设备拥有的轴总数。
  * **输入点数量** / **输出点数量**：数字量 I/O 的最大物理数量规格限制。
  * **设置参数数量**：参数列表 `mParList` 的最大容量上限（如 280 个）。
  * **急停编号**：急停按钮所接的 `InNo` 输入引脚索引，系统底层急停监控线程将根据此引脚进行高频读取，一旦触发立即拉停所有轴。

#### 2.1.5 全局参数表 (`ParList.xlsx`)
包含用于微调和控制的所有非硬件参数（如微调补偿量、速度、使能复选框开关等）。
* 索引 0~99、150~179 映射为浮点数/字符串形式的用户参数，对应 `UserPar` 枚举。
* 索引 100~131 映射为功能使能复选框（布尔开关），对应 `FuncChk` 枚举。

---

### 2.2 C# 枚举 (`EnumName.cs`) 绑定关系与手动同步 SOP

在 C# 流程开发中，我们绝不能使用裸的物理通道号（如 0, 1, 2）或硬编码变量，而是使用 `EnumName.cs` 里的枚举。

> [!IMPORTANT]
> **关于自动“枚举生成”的澄清与同步规范**：
> 1. **没有“一键枚举生成”按钮**：当前 BoTech 框架中，**设置页面没有任何一键“枚举生成”的自动化机制**。每次对 Excel 配置表（`Input.xlsx`, `Output.xlsx`, `AxisPar.xlsx`, `ParList.xlsx`）做出新增、删除或顺序调整时，**必须由开发人员手动修改 C# 源码中的 `EnumName.cs`**。
> 2. **索引严格一致性**：C# 源码中的枚举值在底层执行时会直接强转为 `short` 索引（如 `(short)InNo.流线1到位信号`），以去 XML 数据库解析对应的卡号和物理通道。因此，**C# 中的枚举项顺序必须与 Excel 中的“编号”顺序保持 100% 绝对一致**。如果出现偏离，编译器不会报错，但在自动运行时将直接控制或读取错误的物理引脚，极易引发机械撞击事故！

#### 2.2.1 详细映射对应关系

Excel 与 `EnumName.cs` 内枚举项的精确映射如下：

| Excel 配置表 | 映射 C# 枚举 | 声明规则与示例 |
| :--- | :--- | :--- |
| **`Input.xlsx`** | `InNo` | 按照 `Input.xlsx` 编号 0、1、2 顺序依次声明。<br>如 `急停信号 = 0`，首个成员必须是它。 |
| **`Output.xlsx`** | `OutNo` | 按照 `Output.xlsx` 编号 0、1、2 顺序依次声明。<br>如 `五色灯红色 = 0`。 |
| **`AxisPar.xlsx`** | `mAxis` | 逻辑轴配置。由于底层运动卡通道绑定，首项显式指定为 1：<br>`右X = 1`, `右Y`, `右Z` 等。 |
| **`ParList.xlsx` (100~131)** | `FuncChk` | 仅映射 Excel 索引 100~131 处的布尔复选框开关。首项显式声明：<br>`Enable_Security_ = 100`。 |
| **`ParList.xlsx` (0~99, 150+)** | `UserPar` | 映射所有常规数值参数。首项显式声明：<br>`扫码失败次数 = 0`；并在 150 后显式声明：<br>`Machine_runMode = 150`。 |

#### 2.2.2 硬件配置与枚举修改的手动同步 SOP 流程

在需要添加或修改系统参数时，请务必执行以下规范流程：

```
[步骤1: 修改 Excel] 在 D:\BZ-Parameter\RBF\ParXlsx 修改对应的配置文件 (如 Input.xlsx)
       │
       ▼
[步骤2: 修改 C# 枚举] 打开 C# 项目，修改 AncillaryProject/ParName/ParName/EnumName.cs 对应枚举项
       │
       ▼
[步骤3: 编译类库] 在 VS 中编译 ParName 项目，生成最新的 ParName.dll，并重新编译主程序以更新项目引用
       │
       ▼
[步骤4: 软件自动建库] 启动 BoTech 主程序，在 HMI “参数设置”中点击 “AutoSetup” 按钮
       │
       ▼
[步骤5: 生成/更新 XML] 系统读取 Excel 元数据并写入 ParInput/ParOutput/ParMachine/ParData/SysPar.xml
       │
       ▼
[步骤6: 重启软件生效] 关闭并重新启动软件，底层 DLL 读取新的 XML 数据，此时软硬件完全对应生效！
```

---

### 2.3 Excel 参数配置与 XML 数据库转换映射规则

参数定义的元数据源头位于 Excel 文件，而运行库在运行时会以 XML 文件作为直接持久化数据库（保证无 Office 环境下也能读写）。

#### 2.3.1 Excel 参数模板列定义 (`ParList.xlsx`)

| 列号 | 字段名称 | 对应 XML 元素 | 作用说明 |
| :--- | :--- | :--- | :--- |
| **A** | `Index` / `ParNo` | 节点索引 | 参数在全局数组 `mParList` 中的唯一整型索引 |
| **B** | `NameCh` | `<RemarkCn>` | 在界面 PropertyGrid 显示的中文参数名称 |
| **C** | `NameEn` | `<RemarkEn>` | 界面切换至英文版时显示的英文参数名称 |
| **D** | `Category` | `<Category>` | 属性分组名称，PropertyGrid 会依此折叠分类 |
| **E** | `LimitUp` | `<LimitUp>` | 参数输入的上限值（浮点数） |
| **F** | `LimitDown` | `<LimitDown>` | 参数输入的下限值（浮点数） |
| **G** | `Unit` | `<Unit>` | 参数物理单位（如 mm, ms, pcs） |
| **H-K**| `ChkRemark` 等 | `<ChkRemarkCn>` 等 | 用于定义复选框的中文名、英文名及复选框分组类别 `B` |

#### 2.3.2 自动同步生成逻辑 (`AutoSetup`)
当在参数维护页面执行“AutoSetup”（自动建库）时，框架会读取 `ParList.xlsx`，并将每行数据转换为 `ParData.xml` 中的结构。如果 XML 中已有数据，则会无损重写元数据，并保持原有参数的当前值（`<Data>`）不变。

```xml
<!-- ParData.xml 单个参数节点结构示例 -->
<mNewPar>
  <RemarkCn>右轴取料X补偿</RemarkCn>
  <RemarkEn>Right Axis Pick X Offset</RemarkEn>
  <Category>右机械手参数</Category>
  <LimitUp>5</LimitUp>
  <LimitDown>-5</LimitDown>
  <Unit>mm</Unit>
  <Data>0.125</Data>      <!-- 当前浮点值，代码通过 Data 或 GetParValue 获取 -->
  <DataInt>0</DataInt>    <!-- 整型值 -->
  <DataStr />             <!-- 字符串值 -->
  <CheckSts>false</CheckSts> <!-- 复选框状态，仅在 100+ 索引使能参数中生效 -->
  <ChkRemarkCn>备用使能</ChkRemarkCn>
</mNewPar>
```

---

### 2.4 UI 界面参数标签页 (TabPage) 绑定关系

参数配置窗口 `Frm_Par` 包含多个 TabPage，它们展示和修改底层同一个全局参数数据源 `mFunction.mParList`：

```text
  【数据源头】
  Excel 模板 (ParList.xlsx等) 
         │
         │ AutoSetup 自动建库同步
         ▼
  【持久化数据库】
  XML 配置文件 (ParData.xml等)
         ▲
         │ 系统启动读取 / 运行时保存
         ▼
  【内存数据源】
  全局参数数组 (mFunction.mParList等)
         │
         ├─────── 映射 0-49, 150-179 ───────► TabPage 1: PropertyGrid 属性网格
         │
         ├─────── 映射 0-55 ────────────────► TabPage 2: TextBox 文本框组
         │
         └─────── 映射 100-131 ─────────────► TabPage 4: Checkbox 使能页
```

#### 2.4.1 TabPage 1: 属性网格配置 (PropertyGrid)
* **绑定控件**：由两个 `Zcm.PropertyParS` 构成：
  * `propertyParS2`：`StartIndex = 0`，`ParNumber = 50`。绑定内存数组 `mParList` 的 **0~49 号参数**。
  * `propertyParS1`：`StartIndex = 150`，`ParNumber = 30`。绑定内存数组 `mParList` 的 **150~179 号参数**。
* **特性**：该控件提供类似于 PropertyGrid 的界面，自动读取 XML 里的参数分类（Category）将参数折叠展示，并提供中文描述（RemarkCn）、单位（Unit）及当前数值（Data）。
* **权限保护**：受系统登录机制保护。在未插入读卡器或未通过 `Frm_Login` 进行管理员/工程师登录时，`Panel_ParList.Enabled` 设为 `false`，防止未授权修改。

#### 2.4.2 TabPage 2: 文本框组参数配置
* **绑定控件**：由 7 个 `Zcm.UserParS` 控件构成（`userParS1` 到 `userParS7`），每个控件内部包含 8 个 TextBox 和对应的描述 Label。
* **映射索引**：
  * `userParS1` (0~7), `userParS2` (8~15), `userParS3` (16~23), `userParS4` (24~31), `userParS5` (32~39), `userParS6` (40~47), `userParS7` (48~55)。
  * 覆盖 **0~55 号参数**，与 TabPage 1 的前 56 个参数完全对应，但展现形式为 TextBox。

#### 2.4.3 TabPage 4: Check Tab (功能使能复选框页)
* **绑定控件**：由 4 个 `Zcm.UserChk` 控件构成（`userChk1` 到 `userChk4`），每个控件包含 8 个 CheckBox 复选框。
* **映射索引**：
  * `userChk1` (100~107), `userChk2` (108~115), `userChk3` (116~123), `userChk4` (124~131)。
  * 代表布尔开关，在程序中通过 `mParList[Index].CheckSts` 读取状态（`true`/`false`），对应 `FuncChk` 枚举。

---

### 2.5 HMI UI 诊断监控与 I/O 硬件 of 交互联系

配置完毕的 I/O 映射在软件 UI 界面上有极佳的关联性：
1. **监控界面动态渲染**：
   当进入软件“IO监控”页面时，系统会读取 `ParInput.xml` 和 `ParOutput.xml`。如果有项的 `Name` 不为空，UI 会动态绘制出一个按钮或圆形指示灯。这免去了在界面上手动添加控件的工作。
2. **点动控制 (DO 手动调试)**：
   在“手动调试”或“IO监控”界面点击某个输出按钮时，系统会截获该按钮绑定的 `OutNo` 逻辑编号。在手动模式下，系统执行 `WriteDo(编号, 1)`（底层硬件操作是在配置卡号和序号对应的引脚输出高电平），且按钮变绿。
3. **输入反馈 (DI 实时点亮)**：
   系统会在后台开启一个 10ms 级别的扫描线程，高频读取 `ParInput.xml` 里配置的所有卡号和引脚状态。一旦传感器触发（引脚变高电平），UI 监控上对应的指示灯会点亮成绿色；离开后熄灭。这为电气调试和故障排查提供了极其便捷的可视化支持。

---

### 2.6 输入限制与合法性校验逻辑

在参数页面输入新数值时，UI 控件（如 PropertyGrid 或 TextBox）会自动拦截非法输入：
1. **类型校验**：仅允许输入与参数类型兼容的数值字符，输入字母会自动过滤或恢复旧值。
2. **上下限拦截**：当输入的值 $V > LimitUp$ 或 $V < LimitDown$ 时，界面会弹出警告对话框，或直接在失去焦点时将数值限制在边界值，拒绝写入 XML，保证设备动作的绝对安全。即：**系统会在输入时硬性进行拦截校验，完全禁止且无法输入超过设定的上下限范围的数值。**

---

### 2.7 功能使能复选框在业务代码中的跳步与屏蔽机制

在 Check Tab 中配置的布尔开关（`FuncChk`）直接参与 `Tasks` 中的时序控制。典型的屏蔽策略如下：

#### 2.7.1 扫码功能屏蔽 (`Enable_scanning_code` 索引 102)
在入料扫码站中，若未勾选此功能，则不触发扫码指令，程序自动跳过等待结果状态。
```csharp
case (int)步序.等到位信号:
    if (mGlobal.ReadDi_Bool(InNo.流线1到位信号))
    {
        if (mParList[(int)FuncChk.Enable_scanning_code].CheckSts)
        {
            SetStep(ref StaInfo, (int)步序.电机停扫码, true); // 正常走扫码流程
        }
        else
        {
            AddLog("扫码使能关闭，跳过扫码，直接进入放行准备", LogsType.Auto, 20, true);
            SetStep(ref StaInfo, (int)步序.关光源, true); // 跳步
        }
    }
    break;
```

#### 2.7.2 机械手关闭屏蔽 (`Block_leftRobot` 索引 116 / `Block_rightRobot` 索引 117)
在机械手基类的 `AutoRun()` 起始位置进行拦截。若被屏蔽，则将所有输出复位，当检测到工作启动交互信号后，立刻返回工作完成标志，既不发生任何物理运动，也不阻塞流水线生产。
```csharp
public override void AutoRun()
{
    if (是否屏蔽) // 从 Block_leftRobot 或 Block_rightRobot 的 CheckSts 获取
    {
        // 1. 安全复位所有物理 DO 输出
        mGlobal.mDoReset(CCD光源触发信号);
        mGlobal.mDoReset(电批吸真空信号);
        mGlobal.mDoReset(电批破真空信号);
        mGlobal.mDoReset(电批启动信号);

        // 2. 检测到握手信号时，直接模拟完成，不执行动作
        if (GetTasksInteraction(启动触发标志, false) == true)
        {
            AddLog("机械手已屏蔽，跳过拧紧流程，直接发送完成标志", LogsType.Auto, StaInfo.StepIdx, true);
            SetTasksInteractionTrue(完成标志); // 提前置位工作完成
        }
        SetStep(ref StaInfo, (int)步序.等待启动信号, false);
        return;
    }
    // ... 正常流程 ...
}
```

#### 2.7.3 相机跳步逻辑 (`Enable_CCD` 索引 104 - 启用相机功能)
用于屏蔽视觉定位，直接以零偏差移至打螺丝点。
```csharp
case (int)步序.等待启动信号:
    if (GetTasksInteraction(启动触发标志, false) == true)
    {
        if (是否启用相机) // 由 Enable_CCD 启用相机复选框控制
        {
            SetStep(ref StaInfo, (int)步序.移至拍照位置, true);
        }
        else
        {
            AddLog("相机功能被关闭，跳过拍照，直接使用0偏差移至工作点", LogsType.Auto, 12, true);
            纠偏X = 0 + 补偿X;
            纠偏Y = 0 + 补偿Y;
            纠偏R = 补偿R;
            SetStep(ref StaInfo, (int)步序.移动至电批工作点, true); // 直接去执行拧螺丝
        }
    }
    break;
```

---

## 3. 自动化流程开发 SOP

所有工站控制类必须遵循本节定义的生命周期函数与状态机规范进行开发。

```
[系统装载] --> Initialize() 注册绑定 -> [复位就绪] --> Homing() 机械初始化 -> Ready() 状态检查 
                                                                             |
[循环执行] <--------------------------------- State = RUNNING <---------------+
   |
   +--> AutoRun() 状态机流控制 (StepIdx) -> SetStep() 转换状态 -> 出现异常 --> State = ALARM
```

### 3.1 继承关系与生命周期函数

每个独立工站必须继承自 `mWorkShare`。框架在启动及运行过程中，会依次调用以下生命周期函数：

1. **`Initialize()` (初始化阶段)**：
   * 在程序启动装载参数后执行一次。
   * **职责**：设置 `TaskID`、向工作管理器 `WkManager` 注册当前工站、绑定关联的流水线段、绑定 HMI 状态显示控件、指定涉及的控制轴与关键 I/O 输出映射。
2. **`Homing()` (复位阶段)**：
   * 在用户点击 UI “Reset” 时，系统创建新线程并发调用所有工站的 `Homing` 方法。
   * **职责**：关闭当前工站关联的临时 DO（如真空、气缸触发），设置气缸指示灯及电批安全回缩，检查轴状态是否满足安全位置，最终将 `StaHomeOK` 标志设为 `true`。
3. **`Ready()` (运行前检查)**：
   * 当用户在复位完成后点击 “Start” 启动自动运行时执行。
   * **职责**：确认没有急停或报警，确认轴已回零 OK，并最终返回 `true`，系统才会将状态机置为 `RUNNING`。
4. **`AutoRun()` (循环运行阶段)**：
   * **核心执行体**。当 `State == State.RUNNING` 时，后台调度引擎在后台线程中以无延迟的高频 `while(true)` 循环调用此方法。
   * **职责**：通过状态机选择结构，判定物理信号与网络指令，驱动硬件动作并流转步序。

---

### 3.2 自动运行状态机开发模板

一个标准的工站逻辑开发结构如下所示：

```csharp
using CoreFunction;
using System;
using System.Threading;
using static CoreFunction.mFunction;
using static ParName.EnumName;

namespace BoTech
{
    public class Task01_DemoStation : mWorkShare
    {
        // 1. 定义工站独立的步骤枚举
        private enum 步序 : int
        {
            启动电机 = 10,
            等到位信号 = 20,
            气缸动作等待 = 30,
            做交互工作 = 40,
            放行退出 = 50,
            异常 = 9000,
        }

        private static Task01_DemoStation mInstance;
        public static Task01_DemoStation Instance => mInstance ?? (mInstance = new Task01_DemoStation());

        public override void Initialize()
        {
            TaskID = 99; // 唯一ID
            WkManager.BindStation(TaskID, "DemoStation", this);
            this.BindConv(1, null); // 绑定流水线1
            this.BindStationRun(Frm_Task.Instance.stationRun00); // 绑定界面指示块
            this.SetOutputMaps(new ValueType[] { OutNo.流线1阻挡气缸 }); // 绑定需要监控的输出
            
            _Logs = new LogsHelper.cLogs(TaskName, TaskID);
            base.Initialize();
        }

        public override void Homing()
        {
            base.Homing();
            // 复位物理信号
            mGlobal.mDoSet(OutNo.流线1阻挡气缸);
            StaHomeOK = true;
        }

        public override void AutoRun()
        {
            // 2. 状态机 Step 选择器
            switch (StaInfo.StepIdx)
            {
                case (int)步序.启动电机:
                    // 系统停止或急停时，重置输出，退回等待运行状态
                    if (mFunction.IsSysStop || State == mFunction.State.STOPED)
                    {
                        mGlobal.mDoReset(OutNo.流线1_扫码滚筒电机M0);
                        State = State.WAITRUN;
                        SetStep(ref StaInfo, 0, true);
                        break;
                    }
                    mGlobal.mDoSet(OutNo.流线1_扫码滚筒电机M0);
                    AddLog("启动电机，等待物料", LogsType.Auto, (int)步序.启动电机, true);
                    SetStep(ref StaInfo, (int)步序.等到位信号, true);
                    break;

                case (int)步序.等到位信号:
                    if (mGlobal.ReadDi_Bool(InNo.流线1到位信号))
                    {
                        mGlobal.mDoReset(OutNo.流线1_扫码滚筒电机M0);
                        SetStep(ref StaInfo, (int)步序.气缸动作等待, true);
                    }
                    break;

                case (int)步序.气缸动作等待:
                    // 3. 阻塞式动作到位黄金 API
                    mDoDiWaitDone(OutNo.流线1阻挡气缸, 0, InNo.流线1阻挡缩回信号, 1, 10, 3000, true);
                    SetStep(ref StaInfo, (int)步序.做交互工作, true);
                    break;

                case (int)步序.做交互工作:
                    // 重置超时起始时间
                    mFunction.ConveyorData[MainConvId].StartTime = mFunction.GetTickCount();
                    SetTasksInteractionTrue(TasksInteraction.料盘已经准备好_标志);
                    
                    // 等待软握手
                    if (WaitTaskInteractionTrue(TasksInteraction.右轴螺丝工作完成_标志, 5000, true, true))
                    {
                        SetStep(ref StaInfo, (int)步序.放行退出, true);
                    }
                    else
                    {
                        SetStep(ref StaInfo, (int)步序.异常, true); // 超时去异常
                    }
                    break;

                case (int)步序.放行退出:
                    mGlobal.mDoSet(OutNo.流线1阻挡气缸);
                    SetStep(ref StaInfo, (int)步序.启动电机, true);
                    break;

                case (int)步序.异常:
                    AddLog("工站异常发生！", LogsType.ErrorCode, 9000, true);
                    mGlobal.mDoReset(OutNo.流线1_扫码滚筒电机M0);
                    SetStep(ref StaInfo, 0, true);
                    State = State.ALARM; // 抛出系统报警，红灯亮起，蜂鸣器鸣叫
                    break;
            }
        }
    }
}
```

---

### 3.3 步序控制与更新机制 (`SetStep`)

* **方法原型**：`protected void SetStep(ref StationInfo StaInfo, int NextStepIdx, bool IsLog = true)`
* **机制**：
  * 该方法接收当前工站的 `StaInfo` 引用，将其内部的 `StepIdx` 重置为 `NextStepIdx`。
  * `IsLog` 如果为 `true`，系统会自动将跳转步序记录到日志流中。
  * **必须注意**：`SetStep` 改变步序后，线程会等下一次 `AutoRun` 循环触发才进入对应 Case，因此如果有在当前 tick 必须立刻退出的语句，需在其后紧跟 `break;` 或 `return;`。

---

### 3.4 超时计时器重置与防虚警防呆逻辑

许多误报警都是由于工位等待过程中的耗时与动作时间重叠造成的。
* **错误模式**：载具一流入工站就设定了 `ConveyorData[MainConvId].StartTime`，随后进行侧夹、侧推等一系列动作，等真正打螺丝或扫码开始时，计时器已累积了十几秒，极易在随后的阻塞等待中触发超时（例如扫码设定的 3 秒或螺丝打孔设定的 60 秒限制）。
* **标准重构规范**：在进入容易发生长延时的步骤（如发送 Socket 扫码指令、发送机械手启动信号）的**前一刻**，显式重置计时起点：
  ```csharp
  mFunction.ConveyorData[MainConvId].StartTime = mFunction.GetTickCount();
  ```
  这样可以确保超时判定时间（如 `OverTime`）纯粹计算该硬件动作本身的响应时间，彻底消除由于物流积压或辅助夹具动作缓慢引起的虚警。

---

## 4. 框架常用 API 函数参考手册

### 4.1 运动控制类 (Motion Control)

#### 4.1.1 `MotionGetDi`
* **功能**：读取控制卡指定的数字输入（DI）通道电平状态。
* **原型**：`protected bool MotionGetDi(int DiIndex)`
* **参数**：`DiIndex`：控制卡输入通道的全局索引。
* **返回值**：当该通道有电平输入时返回 `true`，无电平输入时返回 `false`。

#### 4.1.2 `MotionGetDo`
* **功能**：读取当前输出（DO）通道的硬件置位状态。
* **原型**：`protected bool MotionGetDo(int DoIndex)`
* **参数**：`DoIndex`：全局 DO 输出索引。
* **返回值**：已输出置位时返回 `true`，复位状态返回 `false`。

#### 4.1.3 `MotionSetDo`
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

#### 4.1.4 `MotionAbsMove` / `MotionRelMove`
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

#### 4.1.5 `MotionWaitMoveDone`
* **功能**：阻塞当前线程，等待指定的一个或多个轴到达目标坐标或运动静止，直到超时。
* **原型**：
  * `protected bool MotionWaitMoveDone(int AxisId, int timeout = -1)`
  * `protected bool MotionWaitMoveDone(int[] AxisId, double[] targetpos, int timeout = -1)`
* **参数**：
  * `AxisId`：等待的轴号。
  * `targetpos`：目标坐标对比数组（若不传入此参数，则判定轴停止运行即完成）。
  * `timeout`：最大等待毫秒数，`-1` 为无限等待。
* **返回值**：到达或静止返回 `true`；超时返回 `false`。

#### 4.1.6 `MotionAbsMoveAndDone` / `MotionRelMoveAndDone`
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

#### 4.1.7 `MotionWaitDi` / `MotionWaitDo`
* **功能**：阻塞线程并等待特定的输入（DI）或输出（DO）状态转为设定状态。
* **原型**：`protected bool MotionWaitDi(int diId, bool isOn, int timeout = -1, bool TimeoutToBeContinue = false)`
* **参数**：
  * `diId`：待检测的 I/O 全局索引。
  * `isOn`：期待的目标状态（`true`/`false`）。
  * `timeout`：等待超时时间（ms）。
  * `TimeoutToBeContinue`：**关键参数**。
    * 设为 `false` 时：若超时，系统将**弹出带有“重试(Retry)”和“取消(Cancel)”的对话框**。用户点击重试会再次等待，点击取消则返回 `false` 触发报警。
    * 设为 `true` 时：若超时，程序**不弹窗，直接返回 `false` 并执行下一行代码**，交由程序员在代码中做流转决策。

#### 4.1.8 `MotionGoHomeAndDone`
* **功能**：驱动指定轴回零，并阻塞等待直至回零成功或超时。
* **原型**：`protected bool MotionGoHomeAndDone(int AxisId, int timeout = -1)`
* **返回值**：回零成功返回 `true`，超时或报错返回 `false`。

#### 4.1.9 `mDoDiWaitDone`
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

### 4.2 系统、超时与日志 (System/Utility/Logs)

#### 4.2.1 `mFunction.GetTickCount()`
* **功能**：获取高精度系统计时器当前的 Tick 数值（自系统启动以来的毫秒数，常用于精确超时和节拍测算）。
* **原型**：`public static long GetTickCount()`
* **返回值**：`long` 类型的毫秒时间戳。

#### 4.2.2 `mFunction.OverTime`
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

#### 4.2.3 `mFunction.Sleep`
* **功能**：让当前工作线程进入休眠状态，以释放 CPU 资源。
* **原型**：`public static bool Sleep(int DT)`
* **参数**：`DT`：挂起的毫秒数。

#### 4.2.4 `AddLog`
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

#### 4.2.5 `AddAlarmCenter` / `AddTipCentert`
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

### 4.3 文件读写 (File Operations)

#### 4.3.1 INI 配置文件读写
* **原型**：
  * `public static void SetIniS(string SectionName, string KeyWord, string ValStr, string FileName)`
  * `public static void SetIniN(string SectionName, string KeyWord, double ValInt, string FileName)`
  * `public static string GetIniS(string SectionName, string KeyWord, string DefString, string FileName)`
* **说明**：向路径 `FileName` 写入或读取标准 `[Section]` 下的键值。读取时，若键不存在则返回默认值 `DefString`。

#### 4.3.2 XML 数据读写
* **原型**：
  * `public static void ReadXml<T>(string XmlFileName, ref T ReadData)`
  * `public static void WriteXml<T>(string XmlFileName, ref T WriteData)`
  * `public static void Read2DXml<T>(string XmlFileName, ref T[,] mDataTmp)`
* **说明**：利用 XML 序列化器对指定对象 `ReadData`/`WriteData`（可以是简单结构体、包含属性的参数数组或二维数组）进行快速保存和加载。

#### 4.3.3 CSV 与 TXT 文件写入
* **原型**：
  * `public void WriteCsvFile(string FilePathName, string Savedata)`
  * `public void WriteDattxt(string Filename, string WriteData)`
  * `public string ReadDattxt(string Filename)`
* **说明**：用于配置 PDCA 记录、生产报表及标定数据的快捷文件写入。`WriteCsvFile` 会自动创建目录并以追加方式（Append）写入一行 CSV 格式字符串。

---

### 4.4 网口与串口通讯 (Communications)

#### 4.4.1 Socket 客户端发送数据
* **方法**：`TcpIP[Index].SendData(string DataStr)`
* **参数**：`Index`：网口映射编号；`DataStr`：发送给服务器的字符串。
* **返回值**：成功送入发送缓冲区则返回 `true`。

#### 4.4.2 检查是否收到新数据与读取缓冲区
在后台通讯接收回调线程收到数据后，会将标志置位。工站直接通过以下 API 进行检查：
* **`TcpInfo[Index].Received`**：当网络连接中有未读取数据时，返回 `true`。
* **`TcpInfo[Index].Data`**：读取缓冲区内完整的网口数据，读取后框架会自动清空缓冲区并复位 `Received` 为 `false`。
* **`TcpInfo[Index].Open`**：检查网口连接状态是否正常建立（连接成功为 `true`）。

#### 4.4.3 TCP 双向应答最佳实践示例
```csharp
// 重新开始计算扫码等待时间，防止因为流入和到位夹紧动作导致耗时，进而引发扫码超时错误
mFunction.ConveyorData[MainConvId].StartTime = mFunction.GetTickCount(); 

AddLog("Demo工站：向相机发送 ReadCode 指令", LogsType.Auto, 30, true);
// SocketDataSend 会封装并执行 SendData
bool isSent = TcpIp_Communication.SocketDataSend(TCPIP_Port.扫描, "ReadCode");
if (isSent)
{
    SetStep(ref StaInfo, (int)步序.等扫码结果, true);
}
else
{
    SetStep(ref StaInfo, (int)步序.异常, true);
}

// 随后在 Step 等扫码结果 中检测接收：
case (int)步序.等扫码结果:
    if (TcpInfo[TCPIP_Port.扫描].Received)
    {
        string resp = TcpInfo[TCPIP_Port.扫描].Data; // 读取数据（自动清空接收区）
        AddLog($"收到相机回复: {resp}", LogsType.CCD, StaInfo.StepIdx, true);
        if (resp.StartsWith("ReadCode,OK"))
        {
            SetStep(ref StaInfo, (int)步序.放行退出, true);
        }
        else
        {
            SetStep(ref StaInfo, (int)步序.异常, true);
        }
    }
    else if (mFunction.OverTime(mFunction.ConveyorData[MainConvId].StartTime, 3000))
    {
        AddLog("等待相机扫码数据超时！", LogsType.CCD, StaInfo.StepIdx, true);
        SetStep(ref StaInfo, (int)步序.异常, true);
    }
    break;
```

---

### 4.5 软交互信号量与干涉区防撞 (Synchronization & Concurrency)

#### 4.5.1 干涉区互斥锁 (Interference Zone)
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
      
      // 2. 申请成功后，安全移动至电批下压工作点
      bool arWork = SafeMoveTo(示教电批执行位置, 电批点位索引, 0.0, 纠偏X, 纠偏Y, 纠偏R, 15000);
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
      if (SafeMoveTo(示教待机位置, 待机点位索引, 0.0, 0.0, 0.0, 0.0, 15000))
      {
          ExitInterferenceZone(InterferenceZone.Assembly_Interference_Zone1);
          SetTasksInteractionTrue(完成标志);
          SetStep(ref StaInfo, (int)步序.移至取料位置, true);
      }
      break;
  ```

#### 4.5.2 工站间软交互信号量 (TasksInteraction)
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

---

## 5. 机械臂基类开发最佳实践

在多轴模组（如 X/Y/Z 三轴直角坐标机械臂）开发中，若在运行状态下频繁调用 `pMove.WaitDone()` 或 `mDoDi` 进行手动轮询，容易产生以下问题：
1. 工站内由于气缸动作、相机响应和轴动作互相穿插，会导致流程代码冗长、嵌套复杂。
2. 缺乏安全防呆：如果在 X/Y 轴大行程移动时 Z 轴未处于安全高度，极易引发机械碰撞。

### 5.1 线程安全的安全移动方法设计 (`SafeMoveTo`)

在 `Task_机械轴基类` 中，封装了专为三轴机械手设计的 `SafeMoveTo` 方法，能够确保 XY 动作在大行程定位时 Z 轴处于安全高度之上：

```csharp
protected bool SafeMoveTo(ValueType stationId, int pointIdx, double safeZ = 0.0, double offsetX = 0.0, double offsetY = 0.0, double offsetR = 0.0, int timeout = 15000)
{
    try
    {
        // 1. 从本地数据库获取目标点位坐标信息
        PosInfo targetPos = GetPosInfo(stationId, pointIdx);
        double targetX = targetPos.X + offsetX;
        double targetY = targetPos.Y + offsetY;

        AddLog($"[SafeMove] XY轴定位目标: X={targetX:F3}, Y={targetY:F3}", LogsType.Auto, StaInfo.StepIdx, false);

        // 2. 先安全抬起 Z 轴到 safeZ (例如 0.0)
        if (!MotionAbsMoveAndDone(轴Z, safeZ, -1, timeout))
        {
            AddLog("Z轴上升至安全高度超时！", LogsType.Auto, StaInfo.StepIdx, true);
            return false;
        }

        // 3. 异步并发移动 X, Y 轴，大幅缩短移动用时
        MotionAbsMove(轴X, targetX, -1);
        MotionAbsMove(轴Y, targetY, -1);

        // 4. 同步阻塞等待 X, Y 轴均到达目标坐标
        bool xyDone = MotionWaitMoveDone(new int[] { 轴X, 轴Y }, new double[] { targetX, targetY }, timeout);
        if (!xyDone)
        {
            AddLog("XY轴平移移动超时！", LogsType.Auto, StaInfo.StepIdx, true);
            return false;
        }

        // 5. 确保 XY 轴就位后，Z 轴下降至目标执行高度
        if (!MotionAbsMoveAndDone(轴Z, targetPos.Z, -1, timeout))
        {
            AddLog("Z轴下降至目标坐标超时！", LogsType.Auto, StaInfo.StepIdx, true);
            return false;
        }

        AddLog("[SafeMove] 已平稳到达目标点位", LogsType.Auto, StaInfo.StepIdx, false);
        return true;
    }
    catch (Exception ex)
    {
        AddLog($"[SafeMove] 捕获异常: {ex.Message}", LogsType.Auto, StaInfo.StepIdx, true);
        return false;
    }
}
```
通过调用 `SafeMoveTo`，可以将原本需要 5~6 个步骤的轴控制时序合并为单一步骤调用，极大简化了自动流程的开发，提升了代码的健壮性。
