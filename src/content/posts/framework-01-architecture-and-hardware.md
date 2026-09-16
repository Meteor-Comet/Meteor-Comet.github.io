---
title: 框架详解 (一)：架构设计与硬件参数配置
published: 2026-06-06
description: 深入剖析 BoTech 工业自动化框架的三层软件架构、Excel 参数配置、Enum 映射同步、5 大运行模式与底层 IO 驱动原理。
image: /images/framework-detailed-guide.jpg
category: C#
tags:
  - 工业控制
  - 架构设计
draft: false
series: "BoTech 工业自动化框架开发实战"
seriesOrder: 1
---

> [!IMPORTANT]
> **免责声明**：本文章内容仅用于个人学习、技术交流与笔记归档使用。

<details open class="in-post-toc-card border border-neutral-200/80 dark:border-neutral-700/80 rounded-xl p-4 my-4 bg-neutral-50/50 dark:bg-neutral-800/30">
<summary class="font-bold text-base cursor-pointer select-none text-neutral-800 dark:text-neutral-200 flex items-center justify-between outline-none">
📑 本篇目录（点击收起 / 展开）
</summary>

<div class="max-h-72 overflow-y-auto mt-3 pt-2 border-t border-neutral-200/60 dark:border-neutral-700/60 hide-scrollbar">

## 目录

- [1. 软件框架设计概述](#1-软件框架设计概述)
- [2. 硬件参数与系统配置](#2-硬件参数与系统配置)
  - [2.1 硬件参数与系统参数的 Excel 配置 (开发第一步)](#21-硬件参数与系统参数的-excel-配置-开发第一步)
  - [2.2 C# 枚举 (EnumName.cs) 绑定关系与手动同步 SOP](#22-c-枚举-enumnamecs-绑定关系与手动同步-sop)
  - [2.3 Excel 参数配置与 XML 数据库转换映射规则](#23-excel-参数配置与-xml-数据库转换映射规则)
  - [2.4 UI 界面参数标签页 (TabPage) 绑定关系](#24-ui-界面参数标签页-tabpage-绑定关系)
  - [2.5 HMI UI 诊断监控与 I/O 硬件的交互联系](#25-hmi-ui-诊断监控与-io-硬件的交互联系)
  - [2.6 输入限制与合法性校验逻辑](#26-输入限制与合法性校验逻辑)
  - [2.7 功能使能复选框在业务代码中的跳步与屏蔽机制](#27-功能使能复选框在业务代码中的跳步与屏蔽机制)
  - [2.8 控制板卡 I/O 读取物理结构与底层 P/Invoke 驱动](#28-控制板卡-io-读取物理结构与底层-pinvoke-驱动)
  - [2.9 系统 5 大运行模式与多层控制原理](#29-系统-5-大运行模式与多层控制原理)

</div>
</details>


## 1. 软件框架设计概述

BoTech 框架是一款基于多线程并发、状态机流控制和点位/参数示教的模块化工业控制系统。其核心架构由以下三层构成：

1. **界面层 (Form/UI)**：提供以主界面、手动调试界面、参数配置页面和示教界面为核心的 HMI。
2. **逻辑控制层 (Tasks)**：每个独立的物理机构或工位继承自 `mWorkShare` 基类，在独立的线程中以状态机形式运行。各工站通过高内聚、低耦合的设计实现协作。
3. **硬件抽象与辅助层 (Assist/DLLs)**：封装运动控制卡（如固高卡等）、数字 I/O 读写、TCP/IP/串口网络通讯、数据库读写、文件存储、日志追踪以及多工站防撞干涉区管理。

---

---

## 2. 硬件参数与系统配置

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
  * **卡号** / **轴号**：该轴接在 `CardPar.xlsx` 中配置的哪张板卡（卡号）以及哪一个物理轴通道（轴号，通常为 1至8）。
  * **脉冲当量计算参数**（`每圈脉冲`、`减速比`、`导程(mm/°)`）:
    用于进行物理单位与脉冲数的自动转换。转换公式为:
    $$\text{Pulse Ratio} = \frac{\text{每圈脉冲} \times \text{减速比}}{\text{导程}}$$
    示例：伺服电机每圈脉冲为 10000，直连无减速比，丝杠导程为 10 mm，则脉冲比例为 1000 Pulse/mm。当代码调用 `MotionAbsMove(轴X, 50, -1)` 移动 50 mm 时，底层驱动会自动发送 50000 脉冲，实现对开发者的物理单位黑盒化。
  * **速度规划参数**（`加速度`、`减速度`、`回零速度(mm/s)`）：
    定义轴在执行运动指令时的默认加减速斜率以及回零寻找 Index 信号时的物理速度，保证轴在起停时的平稳度。

#### 2.1.3 数字 I/O 映射配置 (`Input.xlsx` 与 `Output.xlsx`)
配置物理传感器（光电开关、安全门、磁簧开关）和物理输出动作（电磁阀、继电器、指示灯）。
* **输入/输出列定义**：
  * **编号**：逻辑 ID（从 0 开始自增），必须与 C# `EnumName.cs` 中的 `InNo` 和 `OutNo` 枚举排序完全一致。
  * **名称Cn** / **名称En**：在中英文界面上显示的信号名称。
  * **模块编号** / **序号**：指明该 I/O 信号压接在第几张板卡（模块编号）以及哪一个物理引脚（引脚序号，如 Pin 0至15）上。
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
* 索引 0至99、150至179 映射为浮点数/字符串形式的用户参数，对应 `UserPar` 枚举。
* 索引 100至131 映射为功能使能复选框（布尔开关），对应 `FuncChk` 枚举。

---

### 2.2 C# 枚举 (`EnumName.cs`) 绑定关系与手动同步 SOP

在 C# 流程开发中，我们绝不能使用裸的物理通道号（如 0, 1, 2）或硬编码变量，而是使用 `EnumName.cs` 里的枚举。

C# 源码中的枚举项顺序必须与 Excel 中的“编号”顺序保持 100% 绝对一致（在底层执行时会直接强转为 `short` 索引以去 XML 数据库解析对应的卡号和物理通道）。如果出现偏离，编译器不会报错，但在自动运行时将直接控制或读取错误的物理引脚，极易引发机械撞击事故！

#### 2.2.1 详细映射对应关系

Excel 与 `EnumName.cs` 内枚举项的精确映射如下：

| Excel 配置表 | 映射 C# 枚举 | 声明规则与示例 |
| :--- | :--- | :--- |
| **`Input.xlsx`** | `InNo` | 按照 `Input.xlsx` 编号 0、1、2 顺序依次声明。<br>如 `急停信号 = 0`，首个成员必须是它。 |
| **`Output.xlsx`** | `OutNo` | 按照 `Output.xlsx` 编号 0、1、2 顺序依次声明。<br>如 `五色灯红色 = 0`。 |
| **`AxisPar.xlsx`** | `mAxis` | 逻辑轴配置。由于底层运动卡通道绑定，首项显式指定为 1：<br>`右X = 1`, `右Y`, `右Z` 等。 |
| **`ParList.xlsx` (100至131)** | `FuncChk` | 仅映射 Excel 索引 100至131 处的布尔复选框开关。首项显式声明：<br>`Enable_Security_ = 100`。 |
| **`ParList.xlsx` (0至99, 150+)** | `UserPar` | 映射所有常规数值参数。首项显式声明：<br>`扫码失败次数 = 0`；并在 150 后显式声明：<br>`Machine_runMode = 150`。 |

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
[步骤4: 生成/更新 XML] 系统读取 Excel 元数据并写入 ParInput/ParOutput/ParMachine/ParData/SysPar.xml
       │
       ▼
[步骤5: 重启软件生效] 关闭并重新启动软件，底层 DLL 读取新的 XML 数据，此时软硬件完全对应生效！
```
#### 2.2.3 多种参数获取方式

框架提供了 **三类** 常用的全局参数读取方式，适用于不同的开发场景。

##### 1. 泛型获取 `GetParValue<T>`
```csharp
// 读取整数参数
int maxRetry = mFunction.GetParValue<int>(UserPar.扫码失败次数);
// 读取字符串参数
string mode = mFunction.GetParValue<string>(UserPar.Machine_runMode);
// 读取浮点参数
double speed = mFunction.GetParValue<double>(UserPar.RobotSpeed);
// 读取 Bool 参数（功能开关）
bool safety = mFunction.GetParValue<bool>(FuncChk.Enable_Security_);
```
* **适用场景**：一次性读取，类型安全，由框架自动完成类型转换。
* **特性**：编译期间检查返回类型，防止类型错误。

##### 2. 快捷读取 `mGlobal` 包装属性
```csharp
double robotSpeed = mGlobal.ParDbl(UserPar.RobotSpeed);
int delayMs = mGlobal.ParInt(UserPar.电批吸料稳定延时);
string modeStr = mGlobal.ParStr(UserPar.Machine_runMode);
bool enableScan = mGlobal.FuncCheck(FuncChk.启用扫码);  // Bool 快捷读取
```
* **适用场景**：直接访问全局数组 `mParList`，效率最高。
* **最佳实践**：适合在自动运行循环（AutoRun）或高频轮询的实时控制参数中调用。

##### 3. 直接访问全局数组 `mParList[]`
```csharp
// 读取数值
double speed = mParList[(short)UserPar.RobotSpeed].DataDbl;
// 读取 Bool 状态
bool enabled = mParList[(short)FuncChk.Enable_Security_].CheckSts;
// 读取上下限信息（用于 UI 限制）
double up = mParList[(short)UserPar.RobotSpeed].LimitUp;
double down = mParList[(short)UserPar.RobotSpeed].LimitDown;
```
* **适用场景**：仅在需要访问元数据（如上下限 `LimitUp`/`LimitDown`、物理单位 `Unit`、中文备注 `Remark` 等）的场景下使用。

---

##### 4. Bool 类型参数（FuncChk）读取详解

`FuncChk` 枚举定义了所有功能开关（复选框），对应 Excel 配置表中的"功能使能"列。读取 Bool 参数有三种方式：

* **方式1：`mGlobal.FuncCheck`（推荐，最简洁）**
  ```csharp
  // 源码：return mParList[(short)func].CheckSts;
  bool enableScan = mGlobal.FuncCheck(FuncChk.启用扫码);
  bool enableCCD = mGlobal.FuncCheck(FuncChk.启用CCD);
  bool enablePDCA = mGlobal.FuncCheck(FuncChk.启用_PDCA);
  bool blockLeft = mGlobal.FuncCheck(FuncChk.屏蔽左轴);
  ```

* **方式2：`mFunction.GetParValue<bool>`（泛型，类型安全）**
  ```csharp
  bool enableScan = mFunction.GetParValue<bool>(FuncChk.启用扫码);
  bool blockLeft = mFunction.GetParValue<bool>(FuncChk.屏蔽左轴);
  ```

* **方式3：`mParList[].CheckSts`（直接数组访问，最快）**
  ```csharp
  // 带安全检查的写法（推荐用于属性初始化器或字段声明中）
  protected override bool 是否屏蔽 =>
      mParList != null
      && mParList.Length > (int)FuncChk.屏蔽右轴
      && mParList[(int)FuncChk.屏蔽右轴].CheckSts;

  // 不带安全检查的写法（用于方法内部，确保 mParList 已初始化）
  bool enableScan = mParList[(int)FuncChk.启用扫码].CheckSts;
  ```

---

> [!WARNING]
> **参数类型不匹配导致的读取残留值漏洞 (Data vs DataInt)**
>
> 在 Excel (如 `UserPar.xlsx`) 中定义参数时，列 `Category` 如果被指定为 `D` (即 Double 浮点型)，则用户配置的参数值会存储在 XML 数据库 of `<Data>` 节点中。此时，`<DataInt>` 节点在 XML 中不会更新，而是保留其默认的初始/残留值 (例如 `333` 或 `200` 等)。
>
> 如果在 C# 代码中错误地使用 `mFunction.GetParValue<int>(UserPar.某参数)` 去读取该参数，系统会因为泛型类型是 `int` 而直接返回 `<DataInt>` 中的残留默认值，而不是经过正确四舍五入或截断的 `<Data>` 值。这会导致读取出来的参数与界面设置完全不符（例如设置了 10 却获取到 7，或者设置了 5 却获取到 333）。
>
> **正确做法**：
> * **如果 Excel 中参数类型是 `D` (Double)**：必须使用 `(int)mFunction.GetParValue<double>(UserPar.某参数)` 先读取为 double，然后再强转为 int。
> * **如果 Excel 中参数类型是 `I` (Int)**：可以直接使用 `mFunction.GetParValue<int>(UserPar.某参数)`。
> * 在编写代码前，必须仔细核对 Excel 配置文件中参数的类型定义（`Category` 或 `<ChkCategory>` 的值）。

##### 5. `mParList` 内存数据结构

`mParList[index]` 的每个元素包含以下核心字段：

| 字段 | 类型 | 说明 |
| :--- | :--- | :--- |
| `DataDbl` | double | 数值参数值 |
| `DataInt` | int | 整数参数值 |
| `DataStr` | string | 字符串参数值 |
| `CheckSts` | bool | 功能开关状态（对应 FuncChk） |
| `LimitUp` | double | 参数上限 |
| `LimitDown` | double | 参数下限 |
| `Unit` | string | 单位 |
| `Remark` | string | 备注 |

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
  * `propertyParS2`：`StartIndex = 0`，`ParNumber = 50`。绑定内存数组 `mParList` 的 **0至49 号参数**。
  * `propertyParS1`：`StartIndex = 150`，`ParNumber = 30`。绑定内存数组 `mParList` 的 **150至179 号参数**。
* **特性**：该控件提供类似于 PropertyGrid 的界面，自动读取 XML 里的参数分类（Category）将参数折叠展示，并提供中文描述（RemarkCn）、单位（Unit）及当前数值（Data）。
* **权限保护**：受系统登录机制保护。在未插入读卡器或未通过 `Frm_Login` 进行管理员/工程师登录时，`Panel_ParList.Enabled` 设为 `false`，防止未授权修改。

#### 2.4.2 TabPage 2: 文本框组参数配置
* **绑定控件**：由 7 个 `Zcm.UserParS` 控件构成（`userParS1` 到 `userParS7`），每个控件内部包含 8 个 TextBox 和对应的描述 Label。
* **映射索引**：
  * `userParS1` (0至7), `userParS2` (8至15), `userParS3` (16至23), `userParS4` (24至31), `userParS5` (32至39), `userParS6` (40至47), `userParS7` (48至55)。
  * 覆盖 **0至55 号参数**，与 TabPage 1 的前 56 个参数完全对应，但展现形式为 TextBox。

#### 2.4.3 TabPage 4: Check Tab (功能使能复选框页)
* **绑定控件**：由 4 个 `Zcm.UserChk` 控件构成（`userChk1` 到 `userChk4`），每个控件包含 8 个 CheckBox 复选框。
* **映射索引**：
  * `userChk1` (100至107), `userChk2` (108至115), `userChk3` (116至123), `userChk4` (124至131)。
  * 代表布尔开关，在程序中通过 `mParList[Index].CheckSts` 读取状态（`true`/`false`），对应 `FuncChk` 枚举。

---

### 2.5 HMI UI 诊断监控与 I/O 硬件的交互联系

配置完毕的 I/O 映射在软件 UI 界面上有极佳的关联性：
1. **监控界面动态渲染**：
   当进入软件“IO监控”页面时，系统会读取 `ParInput.xml` 和 `ParOutput.xml`。如果有项的 `Name` 不为空，UI 会动态绘制出一个按钮或圆形指示灯。这免去了在界面上手动添加控件的工作。
2. **点动控制 (DO 手动调试)**：
   在“手动调试”或“IO监控”界面点击某个输出按钮时，系统会截获该按钮绑定的 `OutNo` 逻辑编号。在手动模式下，系统执行 `WriteDo(编号, 1)`（底层硬件操作是在配置卡号和序号对应的引脚输出高电平），且按钮变绿。
3. **输入反馈 (DI 实时点亮)**：
   系统会在后台开启一个 10ms 级别的扫描线程，高频读取 `ParInput.xml` 里配置的所有卡号 and 引脚状态。一旦传感器触发（引脚变高电平），UI 监控上对应的指示灯会点亮成绿色；离开后熄灭。这为电气调试和故障排查提供了极其便捷的可视化支持。

---

### 2.6 输入限制与合法性校验逻辑

在参数页面输入新数值时，UI 控件（如 PropertyGrid 或 TextBox）会自动拦截非法输入：
1. **类型校验**：仅允许输入与参数类型兼容的数值字符，输入字母会自动过滤或恢复旧值。
2. **上下限拦截**：当输入的值 $V > LimitUp$ 或 $V < LimitDown$ 时，界面会弹出警告对话框，或直接在失去焦点时将数值限制在边界值，拒绝写入 XML，保证设备动作的绝对安全。即：**系统会在输入时硬性进行拦截校验，完全禁止且无法输入超过设定的上下限范围的数值。**

---

### 2.7 功能使能复选框在业务代码中的跳步与屏蔽机制

在 Check Tab 中配置的布尔开关（`FuncChk`）直接参与 `Tasks` 中的时序控制。典型的屏蔽策略如下：

#### 2.7.1 扫码功能屏蔽 (`启用扫码` 索引 100)
在入料扫码站中，若未勾选此功能，则不触发扫码指令，程序自动跳过等待结果状态。
```csharp
case (int)步序.等到位信号:
    if (mGlobal.ReadDi_Bool(InNo.流线1到位信号))
    {
        if (mGlobal.FuncCheck(FuncChk.启用扫码)) // 或 mParList[(int)FuncChk.启用扫码].CheckSts
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

#### 2.7.2 机械手关闭屏蔽 (`屏蔽左轴` / `屏蔽右轴`)
在机械手基类的 `AutoRun()` 起始位置进行拦截。若被屏蔽（如 `mGlobal.FuncCheck(FuncChk.屏蔽左轴)`），则将所有输出复位，当检测到工作启动交互信号后，立刻返回工作完成标志，既不发生任何物理运动，也不阻塞流水线生产。
```csharp
public override void AutoRun()
{
    if (是否屏蔽) // 从 mGlobal.FuncCheck(FuncChk.屏蔽左轴) 或 FuncChk.屏蔽右轴 获取
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

#### 2.7.3 相机跳步逻辑 (`启用左轴相机` / `启用右轴相机` - 启用相机功能)
用于屏蔽视觉定位，直接以零偏差移至打螺丝点。
```csharp
case (int)步序.等待启动信号:
    if (GetTasksInteraction(启动触发标志, false) == true)
    {
        if (是否启用相机) // 由 mGlobal.FuncCheck(FuncChk.启用左轴相机) 状态控制
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

### 2.8 控制板卡 I/O 读取物理结构与底层 P/Invoke 驱动

在工业自动化控制中，I/O（数字量输入 DI / 数字量输出 DO）是软件感知物理世界传感器与驱动电磁阀的核心通道。BoTech 框架在物理硬件、板卡驱动到 C# 逻辑层实现了 5 层分层映射架构。

```
 [ 1. 现场传感器 ]     磁簧开关 / 光电开关 (DC 24V 信号)
        │
        ▼ 24V 强电线路
 [ 2. 端子板接线排 ]   端子板螺丝接线位 (Breakout Terminal Board)
        │
        ▼ 24V 电流流过内部 LED
 [ 3. 光耦隔离芯片 ]   ★ 核心防线：光电转换，2500V 物理高压隔离 (Optocoupler)
        │
        ▼ 转换输出 3.3V / 5V 弱电信号
 [ 4. RC 滤波防抖 ]    电容电阻滤波，去除机械触点抖动与电磁杂波
        │
        ▼ 3.3V 电平输入
 [ 5. 板载 FPGA 芯片 ] 引脚电平改变 ──► 输入寄存器 Bit 位从 0 翻转为 1 (Flip-Flop)
        │
        ▼ PCIe 金手指总线传输 (MMIO 内存映射)
 [ 6. 工控机内存 ]     工控机 RAM 物理地址 ──► CPU 驱动 (gtn.sys) ──► C# 读取
```

#### 2.8.1 I/O 读写 5 层架构拆解

1. **第 1 层：C# 逻辑代码层**
   开发人员在工站中无需关心引脚接在哪个物理端子排上，直接使用强类型枚举调用：
   * **读取输入 (DI)**：`mGlobal.ReadDi_Bool(InNo.流线1到位信号)`
   * **写入输出 (DO)**：`mGlobal.mDoSet(OutNo.流线1阻挡气缸)`（高电平/伸出）、`mGlobal.mDoReset(...)`（低电平/缩回）

2. **第 2 层：软硬件映射转换层 (`ParInput.xml` / `ParOutput.xml`)**
   系统在启动时读取 XML 配置文件到 `mFunction.m_Input[]` 内存结构中。每一个逻辑索引对应唯一的物理卡号、引脚号及常开/常闭极性：
   ```xml
   <!-- ParInput.xml 映射节点结构示例 -->
   <mInput>
     <Index>74</Index>          <!-- 对应 InNo.流线1到位信号 = 74 -->
     <CardNum>1</CardNum>        <!-- 映射到第 1 张控制卡/扩展板卡 -->
     <PinNum>8</PinNum>          <!-- 板卡上的物理 Pin 8 引脚 -->
     <IsInverse>0</IsInverse>    <!-- 取反标志：0=常开(NO)，1=常闭(NC) -->
     <RemarkCn>流线1到位信号</RemarkCn>
   </mInput>
   ```

3. **第 3 层：C# P/Invoke 跨语言驱动调用**
   控制卡厂商（如固高 GTS/GTN）提供用 C/C++ 编写的原生驱动动态库 `gtn.dll`。C# 通过 P/Invoke (`[DllImport]`) 特性引入底层函数，将托管调用传递给非托管 C++ 库：
   ```csharp
   public static class GenFunction
   {
       // 引入厂商原生 DLL API
       [DllImport("gtn.dll", EntryPoint = "GTN_GetDiPin", CallingConvention = CallingConvention.StdCall)]
       public static extern short GTN_GetDiPin(short cardNum, short pinNum, out int pValue);

       [DllImport("gtn.dll", EntryPoint = "GTN_SetDoBit", CallingConvention = CallingConvention.StdCall)]
       public static extern short GTN_SetDoBit(short cardNum, short doType, short pinNum, short value);
   }
   ```

4. **第 4 层：`MotionDll` API 逻辑取反与仿真断路**
   `MotionDll.ReadDi()` 接收到逻辑索引后，查表获取物理卡号和引脚，调用厂商 `GTN_GetDiPin` 读取硬件寄存器状态，并结合 `IsInverse` 进行软逻辑翻转：
   ```csharp
   public static int ReadDi(short index)
   {
       if (VirtualMode) return 1; // 脱机仿真拦截：直接返回 1
       var io = m_Input[index];
       GenFunction.GTN_GetDiPin((short)io.CardNum, (short)io.PinNum, out int rawBit);
       return (io.IsInverse == 1) ? (rawBit == 0 ? 1 : 0) : rawBit;
   }
   ```

5. **第 5 层：硬件物理与电路层（光耦隔离防烧毁）**
   * **24V 电气隔离防护**：板卡内部设计有光耦隔离芯片（如 PC817）。工业现场传感器（24V）触发时电流流过光耦内部 LED 发光，内部光敏三极管受光导通输出 3.3V 弱电信号。**光电转换实现了 2500V 物理电气隔离**，彻底防止现场强电、静电烧毁控制卡及电脑主板。
   * **RC 滤波防抖**：通过电阻电容滤波电路平滑滤除机械开关触点闭合瞬间产生的几十微秒抖动毛刺。
   * **FPGA 引脚锁存**：稳定电平接入板载 FPGA/DSP 芯片的 GPIO 引脚，内部 D 触发器将状态锁存在输入寄存器 Bit 位中。
   * **PCIe 总线映射**：板卡 PCIe 接口通过 MMIO (Memory-Mapped I/O) 将 FPGA 寄存器直接映射到工控机物理 RAM 中，供 CPU 驱动读写。

---

### 2.9 系统 5 大运行模式与多层控制原理

在实际生产与调试中，整机运行模式由 XML 参数 `UserPar.Machine_runMode` 持久化控制，并通过 `mGlobal` 提供高层判定。

#### 2.9.1 5 大运行模式定义

| 模式名称 | `Machine_runMode` 对应值 | 物理板卡/轴 | 传送带/气缸 | 物理物料/传感器 | 相机扫码/MES上报 |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **1. 真实生产模式** | `"ProductionMode"` | ✅ 真实运行 | ✅ 真实运行 | ✅ 真实产品 | ✅ 严格校验与上报 |
| **2. 脱机仿真模式** | `"OffLine_VirtualRun"` | ❌ 虚拟仿真 | ❌ 虚拟仿真 | ❌ 无物料 | ❌ 自动跳过 |
| **3. 无料演示模式** | `"DryRunMode"` | ✅ 真实运行 | ✅ 真实运行 | ❌ 软件模拟信号 | ❌ 屏蔽校验 |
| **4. 带载具空跑模式** | `"VirtualRunWithCarrier"` | ✅ 真实运行 | ✅ 真实载具循环 | ❌ 仅有载具无工件 | ❌ 屏蔽校验 |
| **5. 直通过料模式** | `"FlowLineMode"` | ❌ 机械轴不动作 | ✅ 电机转动/气缸缩回 | ✅/❌ 仅物理穿过 | ❌ 不作停留与加工 |

#### 2.9.2 模式的三层配合控制原理

框架并非单纯依赖某一处代码，而是通过 **3 个层次** 的配合实现模式控制：

1. **业务状态机层 (Task 级 `if` 拦截)**
   工站 Task 在 `AutoRun()` 中通过 `if (mGlobal.xxx)` 进行条件判断，控制步序跳转或模拟注入假条码（例如空跑模式下生成 `VIRTUAL_SN_8888` 传入 `ConveyorData`）。

2. **硬件抽象层 (`MotionDll` 底层 API 断路)**
   当系统设置为脱机模式时，`Setup_Load.cs` 会将 `MotionDll.VirtualMode` 设为 `true`。底层所有的 `MotionAbsMoveAndDone`、`ZSPD` 到位检测和 `ReadDi` 内部第一行均为：
   ```csharp
   if (MotionDll.VirtualMode) return true;
   ```
   无需上层 Task 编写繁琐的条件判断，底层 API 自动瞬间返回 `true`，防止无硬件时超时死锁。

3. **传送带框架层 (`nConveyor` / `A0.Conveyors.cs` 旁路)**
   在 `FlowLineMode` 模式下，传送带框架直接跳过工站业务处理（`CustStatus == "WAITING_FOR_ASSEMBLY"`），滚筒电机保持旋转，阻挡气缸不上升，载具直接快速穿过。

#### 2.9.3 载具数据模型与状态流动 (`ConveyorData`)

内存中 `mFunction.ConveyorData[lineId]` 为每个工位段维护着载具状态：
* **`ProdPres`**：载具存在状态（`"HAS"` / `"无"`）。
* **`CustStatus`**：工站间握手状态（`"WAITING_FOR_ASSEMBLY"` $\rightarrow$ `"WORKING"` $\rightarrow$ `"ASSEMBLY_COMPLETED"` $\rightarrow$ `""`）。
* **跨站传递 `Data_Change`**：载具移动时，`A0.Conveyors.cs` 自动将前站的条码与测试数据复制给后站的 `ConveyorData[NextID]`，确保数据流与物理载具同步流转。

---

---
