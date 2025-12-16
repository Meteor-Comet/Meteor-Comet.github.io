---
layout: post
title:  "C# WinForm 入门 - 2025"
date:   2025-12-15 10:00:00 +0800
categories: C# WinForm Windows
---

# C# WinForm 入门 - 2025

## 前言

Windows 窗体 (WinForm) 是用于构建 Windows 桌面应用程序的图形用户界面框架。本教程将带您从零开始学习 WinForm 开发，掌握创建桌面应用程序的核心技能。

![WinForm 应用程序示例](/img/in-post/winform-tutorial-image.svg)

## 1. 环境准备

### 1.1 安装 Visual Studio

1. 下载并安装 Visual Studio 2022 或更新版本
2. 确保选择了 ".NET 桌面开发" 工作负载

### 1.2 创建 WinForm 项目

```
1. 打开 Visual Studio
2. 点击 "创建新项目"
3. 搜索并选择 "Windows 窗体应用 (.NET Framework)" 或 "Windows 窗体应用"
4. 命名项目并选择保存位置
5. 选择 .NET Framework 版本或 .NET 版本
6. 点击 "创建"
```

![Visual Studio 环境准备](/img/in-post/winform-env-setup.svg)

## 2. WinForm 控件属性详解

### 2.1 属性的基本概念

属性是 WinForm 控件的特征和配置选项，用于定义控件的外观、行为和数据。在 WinForm 中，每个控件都有一系列内置属性，可以通过属性窗口进行可视化设置，也可以通过代码进行访问和修改。

```csharp
// 通过代码设置按钮属性
button1.Text = "点击我";
button1.Size = new Size(100, 40);
button1.BackColor = Color.Blue;
```

### 2.2 常用属性分类

#### 2.2.1 外观相关属性

| 属性名 | 描述 | 示例值 |
|-------|------|-------|
| Text | 控件显示的文本内容 | "确定" |
| Size | 控件的尺寸（宽度和高度） | new Size(100, 40) |
| Location | 控件在容器中的位置坐标 | new Point(50, 50) |
| BackColor | 控件的背景颜色 | Color.White |
| ForeColor | 控件的前景颜色（通常是文本颜色） | Color.Black |
| Font | 控件文本的字体 | new Font("微软雅黑", 12) |
| Enabled | 控件是否可用 | true/false |
| Visible | 控件是否可见 | true/false |

#### 2.2.2 行为相关属性

| 属性名 | 描述 | 示例值 |
|-------|------|-------|
| Name | 控件的唯一标识符 | "btnSubmit" |
| Tag | 存储与控件关联的自定义数据 | 任意对象 |
| Cursor | 鼠标悬停在控件上时的光标样式 | Cursors.Hand |
| Dock | 控件如何停靠在其父容器中 | DockStyle.Fill |
| Anchor | 控件如何锚定在其父容器中 | AnchorStyles.Top |
| TabIndex | 控件在 Tab 键顺序中的索引 | 0, 1, 2... |
| TabStop | 控件是否可以通过 Tab 键获取焦点 | true/false |

### 2.3 属性设置方法

```csharp
// 基本属性设置
textBox1.Text = "Hello WinForm";
textBox1.ReadOnly = true;

// 颜色属性设置
button1.BackColor = Color.FromArgb(255, 0, 0);
button1.ForeColor = Color.White;

// 字体属性设置
label1.Font = new Font("宋体", 12, FontStyle.Bold | FontStyle.Italic);

// 布局属性设置
panel1.Dock = DockStyle.Left;
button1.Anchor = AnchorStyles.Top | AnchorStyles.Right;
```

## 3. WinForm 项目文件结构

创建 WinForm 项目后，我们会看到以下文件结构。了解这些文件的作用对于 WinForm 开发至关重要。

![WinForm 项目文件结构](/img/in-post/winform-project-structure.svg)

### 3.1 核心项目文件

| 文件/文件夹 | 扩展名 | 描述 |
|------------|-------|------|
| 项目名称.csproj | .csproj | 项目配置文件，包含引用、构建设置等 |
| Program.cs | .cs | 程序入口点，包含 Main 方法 |
| Form1.cs | .cs | 主窗体的代码文件 |
| Form1.Designer.cs | .Designer.cs | 主窗体的设计器代码文件，自动生成的设计代码 |
| Form1.resx | .resx | 主窗体的资源文件，存储图片、字符串等资源 |
| App.config | .config | 应用程序配置文件 |
| Properties 文件夹 | - | 包含 AssemblyInfo.cs、Settings.settings 等项目属性文件 |

### 3.2 项目文件详解

#### 3.2.1 Program.cs - 程序入口点

```csharp
namespace WinFormApp
{
    internal static class Program
    {
        /// <summary>
        /// 应用程序的主入口点。
        /// </summary>
        [STAThread]
        static void Main()
        {
            // 启用 Visual Styles
            Application.EnableVisualStyles();
            Application.SetCompatibleTextRenderingDefault(false);
            // 运行主窗体
            Application.Run(new Form1());
        }
    }
}
```

#### 3.2.2 Form1.cs - 窗体代码文件

```csharp
namespace WinFormApp
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            // 初始化代码
        }
        
        // 事件处理程序和其他自定义方法
    }
}
```

#### 3.2.3 Form1.Designer.cs - 设计器代码文件

```csharp
namespace WinFormApp
{
    partial class Form1
    {
        /// <summary>
        /// 必需的设计器变量。
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// 清理所有正在使用的资源。
        /// </summary>
        /// <param name="disposing">如果应释放托管资源，为 true；否则为 false。</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows 窗体设计器生成的代码

        /// <summary>
        /// 设计器支持所需的方法 - 不要使用代码编辑器修改
        /// 此方法的内容。
        /// </summary>
        private void InitializeComponent()
        {
            // 控件初始化代码
            // 布局设置
            // 事件绑定
            // ...
        }

        #endregion
    }
}
```

### 3.3 partial 关键字的作用

WinForm 项目中广泛使用 `partial` 关键字，它的主要作用是：

1. **分离设计代码和业务逻辑**：自动生成的设计器代码和手写的业务逻辑代码可以分开管理
2. **避免设计器覆盖代码**：当在设计器中修改界面时，只会影响 .Designer.cs 文件，不会影响 .cs 文件中的业务逻辑
3. **改善代码组织**：可以将相关但职责不同的代码分到不同文件中

### 3.4 创建多窗体项目

在实际开发中，通常需要多个窗体。添加新窗体的方法：

```
1. 在解决方案资源管理器中右键点击项目
2. 选择 "添加" -> "Windows 窗体"
3. 命名窗体并点击 "添加"
```

添加后会生成三个文件：NewForm.cs、NewForm.Designer.cs 和 NewForm.resx

### 3.5 窗体间的跳转

```csharp
// 从 Form1 打开 NewForm
private void btnOpenNewForm_Click(object sender, EventArgs e)
{
    // 方式 1: 非模式窗体 (两个窗体可以同时交互)
    NewForm newForm = new NewForm();
    newForm.Show();
    
    // 方式 2: 模式窗体 (必须关闭新窗体才能返回原窗体)
    // NewForm newForm = new NewForm();
    // newForm.ShowDialog();
}
```

### 3.6 项目文件组织最佳实践

1. **按功能分组**：将相关的窗体和类放在同一个文件夹中
2. **分层设计**：将数据访问、业务逻辑、界面分离
3. **资源管理**：所有图片、图标等资源统一放在资源文件中管理
4. **命名规范**：使用清晰的命名约定，如 FormMain、FormLogin 等

## 4. WinForm 基础控件详解

### 4.1 常用控件介绍与详细说明

在 WinForm 中，有丰富的内置控件可以使用。下图展示了常用控件在界面上的呈现效果：

![WinForm 应用程序示例](/img/in-post/winform-tutorial-image.svg)

### 4.2 控件详细列表与说明

| 控件名称 | 用途 | 主要属性 | 常用事件 | 核心方法 |
|---------|------|--------|----------|----------|
| Button | 按钮控件 | Text, Enabled, Visible, Size, BackColor | Click, MouseEnter, MouseLeave | PerformClick(), Focus() |
| Label | 文本标签 | Text, Font, ForeColor, BackColor, AutoSize | TextChanged | Focus() |
| TextBox | 文本输入框 | Text, MaxLength, ReadOnly, PasswordChar, Multiline | TextChanged, KeyPress, Enter, Leave, Validating, Validated | Clear(), Focus(), SelectAll() |
| CheckBox | 复选框 | Checked, CheckState, Text, AutoCheck, Appearance | CheckedChanged, CheckStateChanged, Click | CheckedChanged, PerformClick() |
| RadioButton | 单选按钮 | Checked, Text, AutoCheck, Appearance, TabStop | CheckedChanged, Click | PerformClick(), Focus() |
| ComboBox | 下拉选择框 | Items, SelectedIndex, SelectedItem, Text, DropDownStyle, AutoCompleteSource | SelectedIndexChanged, DropDown, DropDownClosed, SelectedValueChanged | Items.Add(), Items.Clear(), SelectedIndex, SelectedItem |
| ListBox | 列表框 | Items, SelectedIndex, SelectedItems, SelectionMode, MultiColumn | SelectedIndexChanged, SelectedValueChanged | Items.Add(), Items.Clear(), ClearSelected(), SetSelected() |
| DataGridView | 数据表格 | DataSource, Columns, Rows, SelectionMode, AutoGenerateColumns | CellClick, CellContentClick, CellValueChanged, SelectionChanged, RowValidating | Refresh(), Update(), Clear(), AutoResizeColumns() |
| PictureBox | 图片显示 | Image, SizeMode, BackColor, InitialImage | Click, DoubleClick | Load(), SizeMode, Refresh() |
| DateTimePicker | 日期时间选择器 | Value, Format, ShowUpDown, MinDate, MaxDate | ValueChanged, CloseUp, DropDown | Focus(), ResetText(), Show() |
| ProgressBar | 进度条 | Value, Minimum, Maximum, Step, Style | ValueChanged | Increment(), PerformStep(), Reset() |
| ToolStrip | 工具栏 | Items, Dock, GripStyle, GripMargin | ItemClicked, MouseDown | Items.Add(), Refresh(), Show() |
| StatusStrip | 状态栏 | Items, Dock, SizingGrip | ItemClicked | Items.Add(), Refresh() |
| Panel | 面板容器 | BackColor, AutoScroll, Dock, AutoSize | Paint, Resize | Controls.Add(), Refresh(), Focus() |
| GroupBox | 分组容器 | Text, BackColor, AutoSize | Enter, Leave | Controls.Add(), Refresh() |
| TabControl | 选项卡控件 | TabPages, SelectedIndex, SelectedTab, Dock | SelectedIndexChanged, Selected | TabPages.Add(), SelectTab() |
| MenuStrip | 菜单控件 | Items, Dock, MdiWindowListItem | ItemClicked, MenuActivate | Items.Add(), Show() |
| ContextMenuStrip | 上下文菜单 | Items, ShowCheckMargin, ShowImageMargin | Opening, Closed | Items.Add(), Show() |
| SplitContainer | 分割容器 | Orientation, Panel1, Panel2, FixedPanel, Dock | SplitterMoving, SplitterMoved | Refresh(), Focus() |
| ListView | 列表视图 | Items, View, CheckBoxes, GridLines | ItemActivate, SelectedIndexChanged | Items.Add(), Clear(), Sort() |
| TreeView | 树状视图 | Nodes, PathSeparator, CheckBoxes | AfterSelect, BeforeExpand, AfterExpand, AfterCollapse | Nodes.Add(), ExpandAll(), CollapseAll() |

## 5. WinForm 容器控件详解

### 5.1 容器控件概述

容器控件是WinForm应用程序中用于组织和管理其他控件的特殊控件。它们可以包含多个子控件，并提供布局、分组和管理功能。合理使用容器控件可以使界面结构清晰，提高代码的可维护性。

### 5.2 主要容器控件详细属性列表

#### Panel 控件

| 属性名称 | 说明 | 默认值 |
|---------|------|--------|
| AutoScroll | 是否自动显示滚动条 | false |
| AutoScrollMargin | 自动滚动边距 | (0, 0) |
| AutoScrollMinSize | 自动滚动最小尺寸 | (0, 0) |
| BackColor | 背景颜色 | Control |
| BackgroundImage | 背景图像 | null |
| BackgroundImageLayout | 背景图像布局方式 | Tile |
| BorderStyle | 边框样式 | None |
| Dock | 停靠方式 | None |
| Enabled | 是否启用 | true |
| Margin | 外边距 | (3, 3, 3, 3) |
| Padding | 内边距 | (0, 0, 0, 0) |
| Size | 控件大小 | (100, 50) |
| Visible | 是否可见 | true |

#### GroupBox 控件

| 属性名称 | 说明 | 默认值 |
|---------|------|--------|
| AutoSize | 是否自动调整大小以适应内容 | false |
| AutoSizeMode | 自动调整大小的模式 | GrowOnly |
| BackColor | 背景颜色 | Control |
| BackgroundImage | 背景图像 | null |
| BackgroundImageLayout | 背景图像布局方式 | Tile |
| BorderStyle | 边框样式 | FixedSingle |
| Dock | 停靠方式 | None |
| Enabled | 是否启用 | true |
| ForeColor | 前景颜色（标题文字颜色） | ControlText |
| Margin | 外边距 | (3, 3, 3, 3) |
| Padding | 内边距 | (10, 13, 10, 10) |
| Size | 控件大小 | (200, 100) |
| Text | 组框标题文本 | "groupBox1" |
| Visible | 是否可见 | true |

#### TabControl 控件

| 属性名称 | 说明 | 默认值 |
|---------|------|--------|
| Alignment | 选项卡对齐方式 | Top |
| Appearance | 选项卡外观样式 | Normal |
| AutoScroll | 是否自动显示滚动条 | false |
| BackColor | 背景颜色 | Control |
| BorderStyle | 边框样式 | Fixed3D |
| Dock | 停靠方式 | None |
| Enabled | 是否启用 | true |
| HotTrack | 是否启用热跟踪 | false |
| ImageList | 选项卡图标列表 | null |
| ItemSize | 选项卡项大小 | (24, 22) |
| Margin | 外边距 | (3, 3, 3, 3) |
| Multiline | 是否允许多行选项卡 | false |
| Padding | 内边距 | (3, 3, 3, 3) |
| RowCount | 选项卡行数 | 1 |
| SelectedIndex | 当前选中的选项卡索引 | 0 |
| SelectedTab | 当前选中的选项卡 | tabPage1 |
| ShowToolTips | 是否显示工具提示 | false |
| Size | 控件大小 | (400, 200) |
| SizeMode | 选项卡大小模式 | Normal |
| TabCount | 选项卡数量 | 1 |
| TabPages | 选项卡页集合 | TabPageCollection |
| Text | 控件文本 | "tabControl1" |
| Visible | 是否可见 | true |

#### SplitContainer 控件

| 属性名称 | 说明 | 默认值 |
|---------|------|--------|
| BackColor | 背景颜色 | Control |
| BorderStyle | 边框样式 | None |
| Dock | 停靠方式 | None |
| Enabled | 是否启用 | true |
| FixedPanel | 固定的面板 | None |
| IsSplitterFixed | 是否固定分割器位置 | false |
| Margin | 外边距 | (3, 3, 3, 3) |
| Orientation | 分割方向（水平/垂直） | Vertical |
| Panel1 | 第一个面板 | SplitterPanel |
| Panel2 | 第二个面板 | SplitterPanel |
| SplitterDistance | 分割器位置距离 | 50% |
| SplitterIncrement | 分割器移动增量 | 1 |
| SplitterWidth | 分割器宽度 | 4 |
| Size | 控件大小 | (200, 100) |
| Visible | 是否可见 | true |

#### FlowLayoutPanel 控件

| 属性名称 | 说明 | 默认值 |
|---------|------|--------|
| AutoScroll | 是否自动显示滚动条 | false |
| BackColor | 背景颜色 | Control |
| FlowDirection | 控件流动方向 | LeftToRight |
| BorderStyle | 边框样式 | None |
| Dock | 停靠方式 | None |
| Enabled | 是否启用 | true |
| Margin | 外边距 | (3, 3, 3, 3) |
| Padding | 内边距 | (0, 0, 0, 0) |
| Size | 控件大小 | (200, 100) |
| WrapContents | 是否自动换行 | true |
| Visible | 是否可见 | true |

#### TableLayoutPanel 控件

| 属性名称 | 说明 | 默认值 |
|---------|------|--------|
| AutoScroll | 是否自动显示滚动条 | false |
| AutoSize | 是否自动调整大小 | false |
| AutoSizeMode | 自动调整大小模式 | GrowOnly |
| BackColor | 背景颜色 | Control |
| BorderStyle | 边框样式 | None |
| ColumnCount | 列数 | 2 |
| ColumnStyles | 列样式集合 | TableLayoutColumnStyleCollection |
| Dock | 停靠方式 | None |
| Enabled | 是否启用 | true |
| GrowStyle | 增长样式 | AddRows |
| Margin | 外边距 | (3, 3, 3, 3) |
| Padding | 内边距 | (0, 0, 0, 0) |
| RowCount | 行数 | 2 |
| RowStyles | 行样式集合 | TableLayoutRowStyleCollection |
| Size | 控件大小 | (200, 100) |
| Visible | 是否可见 | true |

### 5.3 容器控件核心方法详解

### 5.4 容器控件使用示例代码

#### 5.4.1 Panel 控件使用示例

```csharp
// 创建并设置Panel属性
Panel panel1 = new Panel();
panel1.Dock = DockStyle.Left;                  // 设置停靠方式为左侧
panel1.Size = new Size(200, this.ClientSize.Height);  // 设置大小
panel1.BackColor = Color.LightGray;            // 设置背景色
panel1.AutoScroll = true;                      // 启用自动滚动
panel1.Padding = new Padding(10);              // 设置内边距
this.Controls.Add(panel1);                     // 添加到窗体

// 向Panel添加控件
Button btn1 = new Button();
btn1.Text = "按钮1";
btn1.Location = new Point(20, 20);
btn1.Size = new Size(150, 30);
btn1.Click += (sender, e) => {
    MessageBox.Show("Panel中的按钮1被点击！");
};
panel1.Controls.Add(btn1);

// 添加多个按钮并使用循环设置位置
for (int i = 2; i <= 5; i++) {
    Button btn = new Button();
    btn.Text = $"按钮{i}";
    btn.Location = new Point(20, 20 + (i-1) * 40);
    btn.Size = new Size(150, 30);
    int buttonIndex = i;
    btn.Click += (sender, e) => {
        MessageBox.Show($"Panel中的按钮{buttonIndex}被点击！");
    };
    panel1.Controls.Add(btn);
}

// 使用SuspendLayout和ResumeLayout优化性能
panel1.SuspendLayout();
// 批量添加控件的代码
panel1.ResumeLayout(true);

// 滚动到指定控件
panel1.ScrollControlIntoView(btn1);
```

#### 5.4.2 GroupBox 控件使用示例

```csharp
// 创建并设置GroupBox属性
GroupBox groupBox1 = new GroupBox();
groupBox1.Text = "用户设置";
groupBox1.Location = new Point(220, 20);
groupBox1.Size = new Size(300, 180);
this.Controls.Add(groupBox1);

// 向GroupBox添加控件
Label label1 = new Label();
label1.Text = "用户名:";
label1.Location = new Point(20, 30);
label1.AutoSize = true;
groupBox1.Controls.Add(label1);

TextBox textBox1 = new TextBox();
textBox1.Location = new Point(80, 27);
textBox1.Size = new Size(200, 21);
groupBox1.Controls.Add(textBox1);

// 添加单选按钮组
RadioButton radioButton1 = new RadioButton();
radioButton1.Text = "管理员";
radioButton1.Location = new Point(20, 60);
radioButton1.Checked = true;
groupBox1.Controls.Add(radioButton1);

RadioButton radioButton2 = new RadioButton();
radioButton2.Text = "普通用户";
radioButton2.Location = new Point(100, 60);
groupBox1.Controls.Add(radioButton2);

// 添加复选框
CheckBox checkBox1 = new CheckBox();
checkBox1.Text = "记住密码";
checkBox1.Location = new Point(20, 90);
groupBox1.Controls.Add(checkBox1);

CheckBox checkBox2 = new CheckBox();
checkBox2.Text = "自动登录";
checkBox2.Location = new Point(20, 115);
groupBox1.Controls.Add(checkBox2);

// 添加按钮
Button btnSubmit = new Button();
btnSubmit.Text = "保存设置";
btnSubmit.Location = new Point(100, 140);
btnSubmit.Click += (sender, e) => {
    string message = $"用户名: {textBox1.Text}\n" +
                    $"角色: {(radioButton1.Checked ? "管理员" : "普通用户")}\n" +
                    $"记住密码: {checkBox1.Checked}\n" +
                    $"自动登录: {checkBox2.Checked}";
    MessageBox.Show(message, "用户设置");
};
groupBox1.Controls.Add(btnSubmit);
```

#### 5.4.3 TabControl 控件使用示例

```csharp
// 创建并设置TabControl属性
TabControl tabControl1 = new TabControl();
tabControl1.Dock = DockStyle.Fill;
tabControl1.Alignment = TabAlignment.Top;
tabControl1.Appearance = TabAppearance.Normal;
tabControl1.Multiline = false;
this.Controls.Add(tabControl1);

// 创建选项卡页1
TabPage tabPage1 = new TabPage("基本信息");
// 向tabPage1添加控件
Label labelName = new Label();
labelName.Text = "姓名:";
labelName.Location = new Point(20, 30);
labelName.AutoSize = true;
tabPage1.Controls.Add(labelName);

TextBox textBoxName = new TextBox();
textBoxName.Location = new Point(80, 27);
textBoxName.Size = new Size(200, 21);
tabPage1.Controls.Add(textBoxName);

tabControl1.TabPages.Add(tabPage1);

// 创建选项卡页2
TabPage tabPage2 = new TabPage("详细设置");
// 向tabPage2添加控件
Label labelAddress = new Label();
labelAddress.Text = "地址:";
labelAddress.Location = new Point(20, 30);
labelAddress.AutoSize = true;
tabPage2.Controls.Add(labelAddress);

TextBox textBoxAddress = new TextBox();
textBoxAddress.Location = new Point(80, 27);
textBoxAddress.Size = new Size(200, 21);
tabPage2.Controls.Add(textBoxAddress);

tabControl1.TabPages.Add(tabPage2);

// 代码动态添加选项卡
Button btnAddTab = new Button();
btnAddTab.Text = "添加选项卡";
btnAddTab.Location = new Point(300, 10);
this.Controls.Add(btnAddTab);

int tabCount = 3;
btnAddTab.Click += (sender, e) => {
    TabPage newTab = new TabPage($"选项卡{tabCount}");
    
    // 添加一个标签到新选项卡
    Label label = new Label();
    label.Text = $"这是动态添加的选项卡{tabCount}";
    label.Location = new Point(20, 30);
    label.AutoSize = true;
    newTab.Controls.Add(label);
    
    tabControl1.TabPages.Add(newTab);
    tabControl1.SelectedTab = newTab; // 选中新添加的选项卡
    tabCount++;
};

// 事件处理 - 选项卡切换时
TabPage previousTab = tabControl1.SelectedTab;
tabControl1.SelectedIndexChanged += (sender, e) => {
    if (previousTab != null) {
        Console.WriteLine($"离开选项卡: {previousTab.Text}");
    }
    previousTab = tabControl1.SelectedTab;
    Console.WriteLine($"进入选项卡: {previousTab.Text}");
};
```

#### 5.4.4 SplitContainer 控件使用示例

```csharp
// 创建并设置SplitContainer属性
SplitContainer splitContainer1 = new SplitContainer();
splitContainer1.Dock = DockStyle.Fill;
splitContainer1.Orientation = Orientation.Vertical; // 垂直分割
splitContainer1.SplitterDistance = 250;          // 设置分割位置
splitContainer1.SplitterWidth = 5;               // 设置分割器宽度
splitContainer1.FixedPanel = FixedPanel.Panel1;  // 固定左侧面板
this.Controls.Add(splitContainer1);

// 左侧面板添加TreeView
TreeView treeView1 = new TreeView();
treeView1.Dock = DockStyle.Fill;
splitContainer1.Panel1.Controls.Add(treeView1);

// 添加树节点
TreeNode rootNode = new TreeNode("文件系统");
TreeNode folder1 = new TreeNode("文档");
TreeNode folder2 = new TreeNode("图片");
TreeNode folder3 = new TreeNode("视频");

rootNode.Nodes.AddRange(new TreeNode[] { folder1, folder2, folder3 });
treeView1.Nodes.Add(rootNode);
rootNode.Expand();

// 右侧面板添加内容区域
Panel contentPanel = new Panel();
contentPanel.Dock = DockStyle.Fill;
contentPanel.BackColor = Color.White;
splitContainer1.Panel2.Controls.Add(contentPanel);

// 添加一个标签显示选中的树节点
Label labelContent = new Label();
labelContent.Text = "选择左侧节点查看内容";
labelContent.Location = new Point(20, 20);
labelContent.AutoSize = true;
labelContent.Font = new Font("Microsoft Sans Serif", 12);
contentPanel.Controls.Add(labelContent);

// 树节点选择事件
TreeViewEventHandler treeView1_AfterSelect = (sender, e) => {
    labelContent.Text = $"已选择: {e.Node.FullPath}";
    // 可以根据选中的节点动态加载不同的内容到右侧面板
};
treeView1.AfterSelect += treeView1_AfterSelect;

// 分割器移动事件
splitContainer1.SplitterMoving += (sender, e) => {
    // 限制分割器移动范围
    if (e.SplitX < 150) e.SplitX = 150;
    if (e.SplitX > this.ClientSize.Width - 200) e.SplitX = this.ClientSize.Width - 200;
};
```

#### 5.4.5 FlowLayoutPanel 控件使用示例

```csharp
// 创建并设置FlowLayoutPanel属性
FlowLayoutPanel flowLayoutPanel1 = new FlowLayoutPanel();
flowLayoutPanel1.Dock = DockStyle.Fill;
flowLayoutPanel1.FlowDirection = FlowDirection.LeftToRight;
flowLayoutPanel1.WrapContents = true;
flowLayoutPanel1.AutoScroll = true;
flowLayoutPanel1.Padding = new Padding(10);
flowLayoutPanel1.Margin = new Padding(0);
flowLayoutPanel1.BackColor = Color.White;
this.Controls.Add(flowLayoutPanel1);

// 添加多个按钮，自动排列
for (int i = 1; i <= 20; i++) {
    Button btn = new Button();
    btn.Text = $"按钮{i}";
    btn.Size = new Size(100, 40);
    btn.Margin = new Padding(5);
    int buttonIndex = i;
    btn.Click += (sender, e) => {
        MessageBox.Show($"按钮{buttonIndex}被点击！");
    };
    flowLayoutPanel1.Controls.Add(btn);
}

// 设置特定控件的流中断
flowLayoutPanel1.SetFlowBreak(flowLayoutPanel1.Controls[3], true); // 在第4个控件后换行

// 切换流动方向的按钮
Button btnChangeFlow = new Button();
btnChangeFlow.Text = "切换流动方向";
btnChangeFlow.Location = new Point(10, 10);
btnChangeFlow.Size = new Size(150, 30);
this.Controls.Add(btnChangeFlow);

btnChangeFlow.BringToFront(); // 确保按钮在最上层

FlowDirection[] flowDirections = {
    FlowDirection.LeftToRight,
    FlowDirection.TopDown,
    FlowDirection.RightToLeft,
    FlowDirection.BottomUp
};
int flowIndex = 0;

btnChangeFlow.Click += (sender, e) => {
    flowIndex = (flowIndex + 1) % flowDirections.Length;
    flowLayoutPanel1.FlowDirection = flowDirections[flowIndex];
    btnChangeFlow.Text = $"当前方向: {flowLayoutPanel1.FlowDirection}";
};
```

#### 5.4.6 TableLayoutPanel 控件使用示例

```csharp
// 创建并设置TableLayoutPanel属性
TableLayoutPanel tableLayoutPanel1 = new TableLayoutPanel();
tableLayoutPanel1.Dock = DockStyle.Fill;
tableLayoutPanel1.ColumnCount = 3;
tableLayoutPanel1.RowCount = 4;
tableLayoutPanel1.AutoScroll = true;
this.Controls.Add(tableLayoutPanel1);

// 设置列样式
ColumnStyle cs1 = new ColumnStyle(SizeType.Absolute, 100);
ColumnStyle cs2 = new ColumnStyle(SizeType.Percent, 50);
ColumnStyle cs3 = new ColumnStyle(SizeType.Percent, 50);
tableLayoutPanel1.ColumnStyles.AddRange(new ColumnStyle[] { cs1, cs2, cs3 });

// 设置行样式
for (int i = 0; i < tableLayoutPanel1.RowCount; i++) {
    RowStyle rs = new RowStyle(SizeType.Absolute, 50);
    tableLayoutPanel1.RowStyles.Add(rs);
}

// 向表格单元格添加控件
// 第一行
Label label1 = new Label();
label1.Text = "用户名:";
label1.Anchor = AnchorStyles.Left | AnchorStyles.Center;
tableLayoutPanel1.Controls.Add(label1, 0, 0);

TextBox textBox1 = new TextBox();
textBox1.Dock = DockStyle.Fill;
tableLayoutPanel1.Controls.Add(textBox1, 1, 0);
tableLayoutPanel1.SetColumnSpan(textBox1, 2); // 跨2列

// 第二行
Label label2 = new Label();
label2.Text = "密码:";
label2.Anchor = AnchorStyles.Left | AnchorStyles.Center;
tableLayoutPanel1.Controls.Add(label2, 0, 1);

TextBox textBox2 = new TextBox();
textBox2.Dock = DockStyle.Fill;
textBox2.PasswordChar = '*';
tableLayoutPanel1.Controls.Add(textBox2, 1, 1);
tableLayoutPanel1.SetColumnSpan(textBox2, 2);

// 第三行 - 按钮组
CheckBox checkBox1 = new CheckBox();
checkBox1.Text = "记住我";
checkBox1.Anchor = AnchorStyles.Left | AnchorStyles.Center;
tableLayoutPanel1.Controls.Add(checkBox1, 1, 2);

Button btnLogin = new Button();
btnLogin.Text = "登录";
btnLogin.Dock = DockStyle.Fill;
tableLayoutPanel1.Controls.Add(btnLogin, 2, 2);

// 第四行 - 错误消息标签
Label labelError = new Label();
labelError.Text = "";
labelError.ForeColor = Color.Red;
labelError.Anchor = AnchorStyles.Left | AnchorStyles.Center;
tableLayoutPanel1.Controls.Add(labelError, 0, 3);
tableLayoutPanel1.SetColumnSpan(labelError, 3); // 跨3列

// 登录按钮点击事件
btnLogin.Click += (sender, e) => {
    if (string.IsNullOrEmpty(textBox1.Text) || string.IsNullOrEmpty(textBox2.Text)) {
        labelError.Text = "请输入用户名和密码";
    } else {
        labelError.Text = "";
        MessageBox.Show($"用户名: {textBox1.Text}\n密码长度: {textBox2.Text.Length}字符");
    }
};
```

#### 5.4.7 容器控件嵌套使用示例

```csharp
// ... 嵌套使用示例代码保持不变 ...
```

### 5.5 容器控件事件处理详解

#### 5.5.1 Panel 控件事件处理示例

```csharp
// 创建并添加Panel控件
Panel panel1 = new Panel();
panel1.Dock = DockStyle.Left;
panel1.Size = new Size(200, this.ClientSize.Height);
panel1.BackColor = Color.LightGray;
panel1.Padding = new Padding(10);
this.Controls.Add(panel1);

// 1. 控件添加事件
panel1.ControlAdded += (sender, e) => {
    Console.WriteLine($"控件已添加到Panel: {e.Control.GetType().Name}");
};

// 2. 控件移除事件
panel1.ControlRemoved += (sender, e) => {
    Console.WriteLine($"控件已从Panel移除: {e.Control.GetType().Name}");
};

// 3. 滚动事件
panel1.Scroll += (sender, e) => {
    Console.WriteLine($"Panel滚动位置: X={panel1.AutoScrollPosition.X}, Y={panel1.AutoScrollPosition.Y}");
};

// 4. 点击事件 (示例：用于面板上的右键菜单)
ContextMenuStrip contextMenuStrip1 = new ContextMenuStrip();
ToolStripMenuItem menuAddButton = new ToolStripMenuItem("添加按钮");
ToolStripMenuItem menuClear = new ToolStripMenuItem("清空面板");
contextMenuStrip1.Items.AddRange(new ToolStripItem[] { menuAddButton, menuClear });
panel1.ContextMenuStrip = contextMenuStrip1;

int buttonCount = 1;
menuAddButton.Click += (sender, e) => {
    Button newButton = new Button();
    newButton.Text = $"动态按钮{buttonCount}";
    newButton.Location = new Point(20, buttonCount * 35);
    newButton.Size = new Size(150, 30);
    panel1.Controls.Add(newButton);
    buttonCount++;
};

menuClear.Click += (sender, e) => {
    panel1.Controls.Clear();
    buttonCount = 1;
};

// 5. 布局变化事件
panel1.Layout += (sender, e) => {
    Console.WriteLine("Panel布局已更新");
};

// 6. 鼠标事件
panel1.MouseDown += (sender, e) => {
    if (e.Button == MouseButtons.Left) {
        Console.WriteLine($"在Panel上左键点击: X={e.X}, Y={e.Y}");
    }
};

panel1.MouseMove += (sender, e) => {
    // 更新状态栏或其他实时反馈
};
```

#### 5.5.2 GroupBox 控件事件处理示例

```csharp
// 创建并添加GroupBox控件
GroupBox groupBox1 = new GroupBox();
groupBox1.Text = "用户设置";
groupBox1.Location = new Point(20, 20);
groupBox1.Size = new Size(300, 200);
this.Controls.Add(groupBox1);

// 添加一些控件到GroupBox
CheckBox checkBox1 = new CheckBox();
checkBox1.Text = "选项1";
checkBox1.Location = new Point(20, 30);
groupBox1.Controls.Add(checkBox1);

RadioButton radioButton1 = new RadioButton();
radioButton1.Text = "单选1";
radioButton1.Location = new Point(20, 60);
groupBox1.Controls.Add(radioButton1);

Button btnToggle = new Button();
btnToggle.Text = "切换启用状态";
btnToggle.Location = new Point(20, 100);
this.Controls.Add(btnToggle);

// 1. 绘制事件 (自定义绘制GroupBox边框)
groupBox1.Paint += (sender, e) => {
    // 获取GroupBox的工作区域
    Rectangle clientRect = groupBox1.ClientRectangle;
    Rectangle borderRect = clientRect;
    borderRect.Y = groupBox1.Font.Height / 2;
    borderRect.Height -= groupBox1.Font.Height / 2;
    
    // 绘制边框
    ControlPaint.DrawBorder(e.Graphics, borderRect, 
        Color.Blue, 1, ButtonBorderStyle.Solid,
        Color.Blue, 1, ButtonBorderStyle.Solid,
        Color.Blue, 1, ButtonBorderStyle.Solid,
        Color.Blue, 1, ButtonBorderStyle.Solid);
    
    // 绘制标题
    StringFormat format = new StringFormat();
    format.Alignment = StringAlignment.Near;
    format.LineAlignment = StringAlignment.Center;
    
    // 在标题区域绘制背景以覆盖边框
    Rectangle titleRect = new Rectangle(
        borderRect.X + 10, clientRect.Y, 
        TextRenderer.MeasureText(groupBox1.Text, groupBox1.Font).Width + 10, 
        groupBox1.Font.Height);
    e.Graphics.FillRectangle(new SolidBrush(groupBox1.BackColor), titleRect);
    
    // 绘制标题文本
    e.Graphics.DrawString(groupBox1.Text, groupBox1.Font, 
        new SolidBrush(groupBox1.ForeColor), titleRect, format);
    
    // 取消默认绘制
    e.Handled = true;
};

// 2. 启用状态变化事件
groupBox1.EnabledChanged += (sender, e) => {
    string status = groupBox1.Enabled ? "已启用" : "已禁用";
    Console.WriteLine($"GroupBox状态: {status}");
};

// 3. 内容变化事件 (模拟监控子控件变化)
EventHandler childControlChanged = (sender, e) => {
    Console.WriteLine($"GroupBox内容已更新: {(sender as Control).Text} 状态改变");
};

checkBox1.CheckedChanged += childControlChanged;
radioButton1.CheckedChanged += childControlChanged;

// 4. 切换启用状态按钮
btnToggle.Click += (sender, e) => {
    groupBox1.Enabled = !groupBox1.Enabled;
};
```

#### 5.5.3 TabControl 控件事件处理示例

```csharp
// 创建并添加TabControl控件
TabControl tabControl1 = new TabControl();
tabControl1.Dock = DockStyle.Fill;
tabControl1.Alignment = TabAlignment.Top;
this.Controls.Add(tabControl1);

// 添加几个选项卡
TabPage tabPage1 = new TabPage("页面1");
TabPage tabPage2 = new TabPage("页面2");
TabPage tabPage3 = new TabPage("页面3");
tabControl1.TabPages.AddRange(new TabPage[] { tabPage1, tabPage2, tabPage3 });

// 1. 选择索引变化事件 (最重要的事件)
tabControl1.SelectedIndexChanged += (sender, e) => {
    Console.WriteLine($"当前选中的选项卡: {tabControl1.SelectedTab.Text}");
    
    // 可以在这里执行页面切换时的初始化逻辑
    InitializeTabPageContent(tabControl1.SelectedTab);
};

// 2. 选择索引变化前事件 (可以取消选项卡切换)
tabControl1.Selecting += (sender, e) => {
    // 示例：检查是否允许切换页面
    if (e.TabPageIndex == 2 && tabControl1.SelectedIndex == 0) {
        DialogResult result = MessageBox.Show(
            "是否要跳转到页面3？", "确认切换", 
            MessageBoxButtons.YesNo, MessageBoxIcon.Question);
            
        if (result == DialogResult.No) {
            e.Cancel = true; // 取消选项卡切换
            Console.WriteLine("选项卡切换已取消");
        }
    }
};

// 3. 选择索引变化后事件
tabControl1.Selected += (sender, e) => {
    Console.WriteLine($"已切换到选项卡: {e.TabPage.Text}");
};

// 4. 绘制事件 (自定义绘制选项卡)
tabControl1.DrawMode = TabDrawMode.OwnerDrawFixed;
tabControl1.DrawItem += (sender, e) => {
    // 绘制选项卡背景
    SolidBrush brush;
    if (e.Index == tabControl1.SelectedIndex) {
        brush = new SolidBrush(Color.LightBlue); // 选中状态
    } else {
        brush = new SolidBrush(tabControl1.BackColor); // 未选中状态
    }
    e.Graphics.FillRectangle(brush, e.Bounds);
    
    // 添加关闭按钮（X）
    Rectangle closeButton = new Rectangle(
        e.Bounds.Right - 15, e.Bounds.Top + 3, 12, 12);
    e.Graphics.FillRectangle(Brushes.Red, closeButton);
    e.Graphics.DrawString("x", new Font("Arial", 8, FontStyle.Bold), 
        Brushes.White, closeButton);
    
    // 绘制选项卡文本
    StringFormat format = new StringFormat();
    format.Alignment = StringAlignment.Center;
    format.LineAlignment = StringAlignment.Center;
    
    Rectangle textRect = e.Bounds;
    textRect.Width -= 15; // 留出关闭按钮空间
    e.Graphics.DrawString(tabControl1.TabPages[e.Index].Text, 
        e.Font, Brushes.Black, textRect, format);
    
    brush.Dispose();
};

// 5. 鼠标点击事件 (处理关闭按钮点击)
tabControl1.MouseClick += (sender, e) => {
    // 检查是否点击了关闭按钮
    for (int i = 0; i < tabControl1.TabCount; i++) {
        Rectangle tabRect = tabControl1.GetTabRect(i);
        Rectangle closeButtonRect = new Rectangle(
            tabRect.Right - 15, tabRect.Top + 3, 12, 12);
            
        if (closeButtonRect.Contains(e.Location)) {
            if (tabControl1.TabPages.Count > 1) {
                tabControl1.TabPages.RemoveAt(i);
                Console.WriteLine("选项卡已关闭");
            } else {
                MessageBox.Show("不能关闭最后一个选项卡");
            }
            break;
        }
    }
};

// 辅助方法：初始化选项卡内容
private void InitializeTabPageContent(TabPage tabPage) {
    // 检查页面是否已经初始化
    if (tabPage.Controls.Count == 0) {
        Label label = new Label();
        label.Text = $"这是{tabPage.Text}的内容区域";
        label.Location = new Point(20, 20);
        label.AutoSize = true;
        tabPage.Controls.Add(label);
        
        Button button = new Button();
        button.Text = "在" + tabPage.Text + "中点击";
        button.Location = new Point(20, 50);
        button.Click += (sender, e) => {
            MessageBox.Show($"您在{tabPage.Text}中点击了按钮！");
        };
        tabPage.Controls.Add(button);
    }
}
```

#### 5.5.4 SplitContainer 控件事件处理示例

```csharp
// 创建并添加SplitContainer控件
SplitContainer splitContainer1 = new SplitContainer();
splitContainer1.Dock = DockStyle.Fill;
splitContainer1.Orientation = Orientation.Vertical;
splitContainer1.SplitterDistance = 200;
this.Controls.Add(splitContainer1);

// 为面板添加一些基本控件
ListBox listBox1 = new ListBox();
listBox1.Dock = DockStyle.Fill;
listBox1.Items.AddRange(new object[] { "项目1", "项目2", "项目3", "项目4", "项目5" });
splitContainer1.Panel1.Controls.Add(listBox1);

Label labelContent = new Label();
labelContent.Text = "选择左侧项目查看详情";
labelContent.Dock = DockStyle.Fill;
labelContent.TextAlign = ContentAlignment.MiddleCenter;
splitContainer1.Panel2.Controls.Add(labelContent);

// 1. 分割器移动开始事件
splitContainer1.SplitterMoving += (sender, e) => {
    // 限制分割器移动范围
    if (e.SplitX < 150) e.SplitX = 150;
    if (e.SplitX > this.ClientSize.Width - 200) e.SplitX = this.ClientSize.Width - 200;
    
    Console.WriteLine($"分割器移动中: X={e.SplitX}");
};

// 2. 分割器移动结束事件
splitContainer1.SplitterMoved += (sender, e) => {
    Console.WriteLine($"分割器移动完成: 旧位置={e.OldX}, 新位置={e.SplitX}");
};

// 3. 面板展开/折叠事件
Button btnTogglePanel = new Button();
btnTogglePanel.Text = "切换左侧面板";
btnTogglePanel.Location = new Point(10, 10);
this.Controls.Add(btnTogglePanel);
btnTogglePanel.BringToFront();

bool panelCollapsed = false;
int originalSplitterDistance = splitContainer1.SplitterDistance;

btnTogglePanel.Click += (sender, e) => {
    if (panelCollapsed) {
        // 展开面板
        splitContainer1.Panel1Collapsed = false;
        splitContainer1.SplitterDistance = originalSplitterDistance;
        btnTogglePanel.Text = "切换左侧面板";
    } else {
        // 折叠面板
        originalSplitterDistance = splitContainer1.SplitterDistance;
        splitContainer1.Panel1Collapsed = true;
        btnTogglePanel.Text = "展开左侧面板";
    }
    panelCollapsed = !panelCollapsed;
};

// 监听面板折叠状态变化
splitContainer1.Panel1CollapsedChanged += (sender, e) => {
    string status = splitContainer1.Panel1Collapsed ? "已折叠" : "已展开";
    Console.WriteLine($"左侧面板: {status}");
};

// 4. 控件选择变化联动
listBox1.SelectedIndexChanged += (sender, e) => {
    if (listBox1.SelectedIndex != -1) {
        labelContent.Text = $"您选择了: {listBox1.SelectedItem}\n\n这是项目的详细信息区域";
    }
};

// 5. 调整大小时的布局事件
splitContainer1.Resize += (sender, e) => {
    Console.WriteLine($"SplitContainer大小已调整: {splitContainer1.Size}");
    
    // 动态调整分割器位置以保持比例
    if (!panelCollapsed) {
        int newSplitterDistance = (int)(splitContainer1.Width * 0.3); // 保持30%的比例
        if (Math.Abs(splitContainer1.SplitterDistance - newSplitterDistance) > 10) {
            splitContainer1.SplitterDistance = newSplitterDistance;
        }
    }
};

// 6. 设置鼠标悬停在分割器上的光标
splitContainer1.Cursor = Cursors.VSplit;
```

#### 5.5.5 FlowLayoutPanel 控件事件处理示例

```csharp
// 创建并添加FlowLayoutPanel控件
FlowLayoutPanel flowLayoutPanel1 = new FlowLayoutPanel();
flowLayoutPanel1.Dock = DockStyle.Fill;
flowLayoutPanel1.FlowDirection = FlowDirection.LeftToRight;
flowLayoutPanel1.WrapContents = true;
flowLayoutPanel1.AutoScroll = true;
flowLayoutPanel1.Padding = new Padding(10);
this.Controls.Add(flowLayoutPanel1);

// 添加一些按钮用于测试
Button btnAddControl = new Button();
btnAddControl.Text = "添加控件";
btnAddControl.Location = new Point(10, 10);
this.Controls.Add(btnAddControl);
btnAddControl.BringToFront();

Button btnChangeFlow = new Button();
btnChangeFlow.Text = "改变流向";
btnChangeFlow.Location = new Point(110, 10);
this.Controls.Add(btnChangeFlow);
btnChangeFlow.BringToFront();

// 1. 控件添加事件
flowLayoutPanel1.ControlAdded += (sender, e) => {
    Console.WriteLine($"控件已添加: {e.Control.GetType().Name}, 文本: {e.Control.Text}");
};

// 2. 布局完成事件
flowLayoutPanel1.Layout += (sender, e) => {
    Console.WriteLine("FlowLayoutPanel布局已完成更新");
};

// 3. 滚动事件
flowLayoutPanel1.Scroll += (sender, e) => {
    Console.WriteLine($"FlowLayoutPanel滚动位置: {flowLayoutPanel1.AutoScrollPosition}");
};

// 4. 添加控件按钮点击事件
Random random = new Random();
string[] controlTypes = { "按钮", "文本框", "复选框", "单选按钮", "标签" };
int controlCount = 1;

btnAddControl.Click += (sender, e) => {
    string type = controlTypes[random.Next(controlTypes.Length)];
    Control newControl = null;
    
    switch (type) {
        case "按钮":
            Button btn = new Button();
            btn.Text = $"按钮{controlCount}";
            btn.Size = new Size(80, 30);
            btn.Click += (s, args) => {
                MessageBox.Show($"您点击了{btn.Text}！");
            };
            newControl = btn;
            break;
            
        case "文本框":
            TextBox txt = new TextBox();
            txt.Text = $"文本框{controlCount}";
            txt.Size = new Size(100, 20);
            newControl = txt;
            break;
            
        case "复选框":
            CheckBox chk = new CheckBox();
            chk.Text = $"复选框{controlCount}";
            chk.Size = new Size(100, 20);
            chk.CheckedChanged += (s, args) => {
                Console.WriteLine($"复选框{controlCount}状态: {(chk.Checked ? "已选中" : "未选中")}");
            };
            newControl = chk;
            break;
            
        case "单选按钮":
            RadioButton rdo = new RadioButton();
            rdo.Text = $"单选{controlCount}";
            rdo.Size = new Size(100, 20);
            newControl = rdo;
            break;
            
        case "标签":
            Label lbl = new Label();
            lbl.Text = $"标签{controlCount}";
            lbl.Size = new Size(80, 20);
            newControl = lbl;
            break;
    }
    
    if (newControl != null) {
        newControl.Margin = new Padding(5);
        flowLayoutPanel1.Controls.Add(newControl);
        controlCount++;
    }
};

// 5. 改变流向按钮点击事件
FlowDirection[] flowDirections = {
    FlowDirection.LeftToRight,
    FlowDirection.TopDown,
    FlowDirection.RightToLeft,
    FlowDirection.BottomUp
};
int flowIndex = 0;

btnChangeFlow.Click += (sender, e) => {
    flowIndex = (flowIndex + 1) % flowDirections.Length;
    flowLayoutPanel1.FlowDirection = flowDirections[flowIndex];
    Console.WriteLine($"FlowDirection已更改为: {flowDirections[flowIndex]}");
    
    // 记录当前选中的控件
    Control selectedControl = null;
    foreach (Control control in flowLayoutPanel1.Controls) {
        if (control.Focused) {
            selectedControl = control;
            break;
        }
    }
    
    // 重新应用布局
    flowLayoutPanel1.PerformLayout();
    
    // 恢复焦点（如果有的话）
    if (selectedControl != null) {
        selectedControl.Focus();
    }
};
```

#### 5.5.6 TableLayoutPanel 控件事件处理示例

```csharp
// 创建并添加TableLayoutPanel控件
TableLayoutPanel tableLayoutPanel1 = new TableLayoutPanel();
tableLayoutPanel1.Dock = DockStyle.Fill;
tableLayoutPanel1.ColumnCount = 2;
tableLayoutPanel1.RowCount = 3;
tableLayoutPanel1.Padding = new Padding(10);
this.Controls.Add(tableLayoutPanel1);

// 设置列和行样式
tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 100));
tableLayoutPanel1.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));

for (int i = 0; i < 3; i++) {
    tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Absolute, 40));
}

// 添加一些基本控件
Label label1 = new Label();
label1.Text = "用户名:";
label1.Anchor = AnchorStyles.Left | AnchorStyles.Center;
tableLayoutPanel1.Controls.Add(label1, 0, 0);

TextBox textBox1 = new TextBox();
textBox1.Dock = DockStyle.Fill;
tableLayoutPanel1.Controls.Add(textBox1, 1, 0);

Label label2 = new Label();
label2.Text = "密码:";
label2.Anchor = AnchorStyles.Left | AnchorStyles.Center;
tableLayoutPanel1.Controls.Add(label2, 0, 1);

TextBox textBox2 = new TextBox();
textBox2.Dock = DockStyle.Fill;
textBox2.PasswordChar = '*';
tableLayoutPanel1.Controls.Add(textBox2, 1, 1);

Button btnLogin = new Button();
btnLogin.Text = "登录";
btnLogin.Dock = DockStyle.Fill;
btnLogin.Anchor = AnchorStyles.Right;
btnLogin.Size = new Size(80, 30);
tableLayoutPanel1.SetColumnSpan(btnLogin, 2);
tableLayoutPanel1.SetRow(btnLogin, 2);
tableLayoutPanel1.SetColumn(btnLogin, 1);
tableLayoutPanel1.Controls.Add(btnLogin);

// 添加一个添加行的按钮
Button btnAddRow = new Button();
btnAddRow.Text = "添加行";
btnAddRow.Location = new Point(10, 10);
this.Controls.Add(btnAddRow);
btnAddRow.BringToFront();

// 1. 单元格布局事件
tableLayoutPanel1.CellPaint += (sender, e) => {
    // 绘制单元格边框
    Pen pen = new Pen(Color.LightGray, 1);
    e.Graphics.DrawRectangle(pen, e.CellBounds.X, e.CellBounds.Y, 
        e.CellBounds.Width - 1, e.CellBounds.Height - 1);
    
    // 为特定单元格绘制背景色
    if (e.Column == 0 && e.Row < 2) {
        SolidBrush brush = new SolidBrush(Color.AliceBlue);
        e.Graphics.FillRectangle(brush, e.CellBounds.X, e.CellBounds.Y, 
            e.CellBounds.Width - 1, e.CellBounds.Height - 1);
        brush.Dispose();
    }
    
    pen.Dispose();
};

// 2. 布局变化事件
tableLayoutPanel1.Layout += (sender, e) => {
    Console.WriteLine($"TableLayoutPanel布局已更新: 列数={tableLayoutPanel1.ColumnCount}, 行数={tableLayoutPanel1.RowCount}");
};

// 3. 添加行按钮点击事件
int rowCounter = 1;
btnAddRow.Click += (sender, e) => {
    // 增加行数
    tableLayoutPanel1.RowCount++;
    tableLayoutPanel1.RowStyles.Add(new RowStyle(SizeType.Absolute, 40));
    
    // 将登录按钮下移
    tableLayoutPanel1.SetRow(btnLogin, tableLayoutPanel1.RowCount - 1);
    
    // 在新行添加控件
    Label newLabel = new Label();
    newLabel.Text = $"字段{rowCounter}:";
    newLabel.Anchor = AnchorStyles.Left | AnchorStyles.Center;
    tableLayoutPanel1.Controls.Add(newLabel, 0, tableLayoutPanel1.RowCount - 2);
    
    TextBox newTextBox = new TextBox();
    newTextBox.Dock = DockStyle.Fill;
    newTextBox.Text = $"默认值{rowCounter}";
    tableLayoutPanel1.Controls.Add(newTextBox, 1, tableLayoutPanel1.RowCount - 2);
    
    rowCounter++;
};

// 4. 单元格合并和跨列/跨行设置
tableLayoutPanel1.ControlAdded += (sender, e) => {
    Console.WriteLine($"控件已添加到单元格: {e.Control.GetType().Name}");
};

// 5. 单元格获取焦点事件处理
textBox1.Enter += (sender, e) => {
    // 高亮显示当前编辑的行
    Console.WriteLine("用户名输入框获得焦点");
};

textBox2.Enter += (sender, e) => {
    Console.WriteLine("密码输入框获得焦点");
};

// 6. 登录按钮点击事件
btnLogin.Click += (sender, e) => {
    if (string.IsNullOrEmpty(textBox1.Text)) {
        MessageBox.Show("请输入用户名", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
        textBox1.Focus();
        return;
    }
    
    if (string.IsNullOrEmpty(textBox2.Text)) {
        MessageBox.Show("请输入密码", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
        textBox2.Focus();
        return;
    }
    
    MessageBox.Show($"用户名: {textBox1.Text}\n密码长度: {textBox2.Text.Length}字符", 
        "登录信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
};
```

#### 5.5.7 容器控件事件冒泡与事件委托示例

```csharp
// 此示例演示如何在容器控件中实现事件冒泡和事件委托

// 创建主容器
Panel mainPanel = new Panel();
mainPanel.Dock = DockStyle.Fill;
mainPanel.BackColor = Color.White;
this.Controls.Add(mainPanel);

// 添加一个状态标签显示事件信息
Label statusLabel = new Label();
statusLabel.Text = "准备就绪";
statusLabel.Dock = DockStyle.Bottom;
statusLabel.Height = 25;
statusLabel.TextAlign = ContentAlignment.MiddleLeft;
statusLabel.Padding = new Padding(10, 0, 0, 0);
statusLabel.BackColor = Color.LightGray;
this.Controls.Add(statusLabel);

// 创建嵌套的GroupBox
GroupBox groupBox1 = new GroupBox();
groupBox1.Text = "用户操作区域";
groupBox1.Location = new Point(20, 20);
groupBox1.Size = new Size(300, 150);
mainPanel.Controls.Add(groupBox1);

// 添加按钮到GroupBox
Button btnAction1 = new Button();
btnAction1.Text = "操作1";
btnAction1.Location = new Point(20, 30);
groupBox1.Controls.Add(btnAction1);

Button btnAction2 = new Button();
btnAction2.Text = "操作2";
btnAction2.Location = new Point(120, 30);
groupBox1.Controls.Add(btnAction2);

// 1. 定义自定义事件委托和事件
public delegate void ContainerActionEventHandler(object sender, ContainerActionEventArgs e);

public class ContainerActionEventArgs : EventArgs {
    public string ActionName { get; set; }
    public string SourceControl { get; set; }
    public string ContainerPath { get; set; }
    public DateTime Timestamp { get; set; }
    
    public ContainerActionEventArgs(string actionName, string sourceControl, string containerPath) {
        ActionName = actionName;
        SourceControl = sourceControl;
        ContainerPath = containerPath;
        Timestamp = DateTime.Now;
    }
}

// 2. 创建一个事件处理器方法
private void HandleContainerAction(object sender, ContainerActionEventArgs e) {
    string message = $"[{e.Timestamp.ToString("HH:mm:ss.fff")}] " +
                    $"动作: {e.ActionName}\n" +
                    $"来源控件: {e.SourceControl}\n" +
                    $"容器路径: {e.ContainerPath}";
                    
    Console.WriteLine(message);
    statusLabel.Text = $"最后操作: {e.ActionName} (来自 {e.SourceControl})";
}

// 3. 为按钮添加事件处理
btnAction1.Click += (sender, e) => {
    Button btn = (Button)sender;
    // 创建事件参数，包含完整的容器路径信息
    ContainerActionEventArgs args = new ContainerActionEventArgs(
        "点击按钮", 
        btn.Text, 
        $"Form1\mainPanel\groupBox1\{btn.Name}"
    );
    
    // 调用事件处理方法
    HandleContainerAction(sender, args);
};

btnAction2.Click += (sender, e) => {
    Button btn = (Button)sender;
    ContainerActionEventArgs args = new ContainerActionEventArgs(
        "点击按钮", 
        btn.Text, 
        $"Form1\mainPanel\groupBox1\{btn.Name}"
    );
    
    HandleContainerAction(sender, args);
};

// 4. 容器级别的事件监听 (事件冒泡示例)
groupBox1.Click += (sender, e) => {
    // 仅当直接点击GroupBox背景时触发
    if (sender == groupBox1) {
        ContainerActionEventArgs args = new ContainerActionEventArgs(
            "点击容器", 
            "GroupBox背景", 
            "Form1\mainPanel\groupBox1"
        );
        HandleContainerAction(sender, args);
    }
};

mainPanel.Click += (sender, e) => {
    // 仅当直接点击Panel背景时触发
    if (sender == mainPanel) {
        ContainerActionEventArgs args = new ContainerActionEventArgs(
            "点击容器", 
            "Panel背景", 
            "Form1\mainPanel"
        );
        HandleContainerAction(sender, args);
    }
};

// 5. 实现焦点跟踪
this.GotFocus += (sender, e) => {
    statusLabel.Text = "应用程序获得焦点";
};

this.LostFocus += (sender, e) => {
    statusLabel.Text = "应用程序失去焦点";
};

// 6. 添加一个重置按钮
Button btnReset = new Button();
btnReset.Text = "重置状态";
btnReset.Location = new Point(20, 200);
mainPanel.Controls.Add(btnReset);

btnReset.Click += (sender, e) => {
    statusLabel.Text = "准备就绪";
    Console.WriteLine("状态已重置");
};
```

### 5.6 容器控件高级应用技巧

#### 5.6.1 容器控件的动态加载与卸载

```csharp
// 此示例演示如何动态加载和卸载容器控件中的内容

// 创建主容器面板
Panel containerPanel = new Panel();
containerPanel.Dock = DockStyle.Fill;
containerPanel.BackColor = Color.White;
this.Controls.Add(containerPanel);

// 添加导航按钮组
FlowLayoutPanel navPanel = new FlowLayoutPanel();
navPanel.Dock = DockStyle.Top;
navPanel.FlowDirection = FlowDirection.LeftToRight;
navPanel.Padding = new Padding(10);
this.Controls.Add(navPanel);

// 创建导航按钮
string[] views = { "用户管理", "数据统计", "系统设置", "帮助文档" };
Button[] navButtons = new Button[views.Length];

for (int i = 0; i < views.Length; i++) {
    navButtons[i] = new Button();
    navButtons[i].Text = views[i];
    navButtons[i].Size = new Size(100, 30);
    navButtons[i].Margin = new Padding(5);
    int viewIndex = i;
    
    navButtons[i].Click += (sender, e) => {
        // 切换视图
        LoadView(viewIndex);
        
        // 更新按钮状态
        foreach (Button btn in navButtons) {
            btn.BackColor = SystemColors.Control;
            btn.Font = new Font(btn.Font, FontStyle.Regular);
        }
        
        ((Button)sender).BackColor = Color.LightBlue;
        ((Button)sender).Font = new Font(((Button)sender).Font, FontStyle.Bold);
    };
    
    navPanel.Controls.Add(navButtons[i]);
}

// 设置初始选中状态
navButtons[0].BackColor = Color.LightBlue;
navButtons[0].Font = new Font(navButtons[0].Font, FontStyle.Bold);

// 加载初始视图
LoadView(0);

// 视图加载方法
private void LoadView(int viewIndex) {
    // 卸载当前视图内容
    UnloadCurrentView();
    
    // 根据视图索引加载不同内容
    switch (viewIndex) {
        case 0: // 用户管理视图
            LoadUserManagementView();
            break;
        case 1: // 数据统计视图
            LoadStatisticsView();
            break;
        case 2: // 系统设置视图
            LoadSettingsView();
            break;
        case 3: // 帮助文档视图
            LoadHelpView();
            break;
    }
    
    Console.WriteLine($"已加载视图: {views[viewIndex]}");
}

// 卸载当前视图
private void UnloadCurrentView() {
    // 释放资源
    foreach (Control control in containerPanel.Controls) {
        // 移除事件监听器
        control.Dispose();
    }
    
    containerPanel.Controls.Clear();
}

// 示例：加载用户管理视图
private void LoadUserManagementView() {
    // 创建用户列表视图
    ListView listView = new ListView();
    listView.Dock = DockStyle.Fill;
    listView.View = View.Details;
    listView.FullRowSelect = true;
    
    // 添加列
    listView.Columns.Add("用户ID", 80);
    listView.Columns.Add("用户名", 120);
    listView.Columns.Add("角色", 100);
    listView.Columns.Add("创建日期", 120);
    listView.Columns.Add("状态", 80);
    
    // 添加示例数据
    string[][] userData = {
        new string[] { "001", "管理员", "超级管理员", "2025-01-01", "启用" },
        new string[] { "002", "张三", "普通用户", "2025-02-15", "启用" },
        new string[] { "003", "李四", "普通用户", "2025-03-20", "禁用" }
    };
    
    foreach (string[] user in userData) {
        ListViewItem item = new ListViewItem(user[0]);
        for (int i = 1; i < user.Length; i++) {
            item.SubItems.Add(user[i]);
        }
        listView.Items.Add(item);
    }
    
    containerPanel.Controls.Add(listView);
    
    // 添加操作按钮面板
    Panel actionPanel = new Panel();
    actionPanel.Dock = DockStyle.Bottom;
    actionPanel.Height = 40;
    actionPanel.Padding = new Padding(10);
    containerPanel.Controls.Add(actionPanel);
    
    Button btnAddUser = new Button();
    btnAddUser.Text = "添加用户";
    btnAddUser.Size = new Size(80, 30);
    btnAddUser.Location = new Point(0, 5);
    actionPanel.Controls.Add(btnAddUser);
    
    btnAddUser.Click += (sender, e) => {
        MessageBox.Show("添加用户功能");
    };
}

// 其他视图加载方法（简化版本）
private void LoadStatisticsView() {
    Label label = new Label();
    label.Text = "数据统计视图 - 这里将显示图表和统计信息";
    label.Dock = DockStyle.Fill;
    label.TextAlign = ContentAlignment.MiddleCenter;
    label.Font = new Font("Microsoft Sans Serif", 12);
    containerPanel.Controls.Add(label);
}

private void LoadSettingsView() {
    Label label = new Label();
    label.Text = "系统设置视图 - 这里将显示系统配置选项";
    label.Dock = DockStyle.Fill;
    label.TextAlign = ContentAlignment.MiddleCenter;
    label.Font = new Font("Microsoft Sans Serif", 12);
    containerPanel.Controls.Add(label);
}

private void LoadHelpView() {
    Label label = new Label();
    label.Text = "帮助文档视图 - 这里将显示使用说明和帮助信息";
    label.Dock = DockStyle.Fill;
    label.TextAlign = ContentAlignment.MiddleCenter;
    label.Font = new Font("Microsoft Sans Serif", 12);
    containerPanel.Controls.Add(label);
}
```

#### 5.6.2 容器控件的自定义样式与主题

```csharp
// 此示例演示如何为容器控件创建自定义样式和主题系统

// 创建主面板
Panel mainPanel = new Panel();
mainPanel.Dock = DockStyle.Fill;
mainPanel.Padding = new Padding(20);
this.Controls.Add(mainPanel);

// 创建主题切换按钮
FlowLayoutPanel themePanel = new FlowLayoutPanel();
themePanel.Dock = DockStyle.Bottom;
themePanel.FlowDirection = FlowDirection.RightToLeft;
themePanel.Padding = new Padding(10);
this.Controls.Add(themePanel);

Button btnLightTheme = new Button();
btnLightTheme.Text = "浅色主题";
btnLightTheme.Size = new Size(100, 30);
btnLightTheme.Margin = new Padding(5);
themePanel.Controls.Add(btnLightTheme);

Button btnDarkTheme = new Button();
btnDarkTheme.Text = "深色主题";
btnDarkTheme.Size = new Size(100, 30);
btnDarkTheme.Margin = new Padding(5);
themePanel.Controls.Add(btnDarkTheme);

Button btnBlueTheme = new Button();
btnBlueTheme.Text = "蓝色主题";
btnBlueTheme.Size = new Size(100, 30);
btnBlueTheme.Margin = new Padding(5);
themePanel.Controls.Add(btnBlueTheme);

// 定义主题类
public class Theme {
    public Color FormBackColor { get; set; }
    public Color PanelBackColor { get; set; }
    public Color GroupBoxBackColor { get; set; }
    public Color GroupBoxForeColor { get; set; }
    public Color ButtonBackColor { get; set; }
    public Color ButtonForeColor { get; set; }
    public Color LabelForeColor { get; set; }
    public Color TextBoxBackColor { get; set; }
    public Color TextBoxForeColor { get; set; }
    public string Name { get; set; }
    
    public Theme(string name) {
        Name = name;
    }
}

// 创建主题实例
Theme lightTheme = new Theme("浅色主题") {
    FormBackColor = Color.White,
    PanelBackColor = Color.WhiteSmoke,
    GroupBoxBackColor = Color.White,
    GroupBoxForeColor = Color.Black,
    ButtonBackColor = SystemColors.Control,
    ButtonForeColor = Color.Black,
    LabelForeColor = Color.Black,
    TextBoxBackColor = Color.White,
    TextBoxForeColor = Color.Black
};

Theme darkTheme = new Theme("深色主题") {
    FormBackColor = Color.FromArgb(30, 30, 30),
    PanelBackColor = Color.FromArgb(40, 40, 40),
    GroupBoxBackColor = Color.FromArgb(40, 40, 40),
    GroupBoxForeColor = Color.White,
    ButtonBackColor = Color.FromArgb(60, 60, 60),
    ButtonForeColor = Color.White,
    LabelForeColor = Color.White,
    TextBoxBackColor = Color.FromArgb(50, 50, 50),
    TextBoxForeColor = Color.White
};

Theme blueTheme = new Theme("蓝色主题") {
    FormBackColor = Color.LightSteelBlue,
    PanelBackColor = Color.White,
    GroupBoxBackColor = Color.AliceBlue,
    GroupBoxForeColor = Color.Navy,
    ButtonBackColor = Color.DodgerBlue,
    ButtonForeColor = Color.White,
    LabelForeColor = Color.Navy,
    TextBoxBackColor = Color.White,
    TextBoxForeColor = Color.Black
};

// 应用主题方法
private void ApplyTheme(Theme theme) {
    // 应用到窗体
    this.BackColor = theme.FormBackColor;
    
    // 递归应用到所有控件
    ApplyThemeToControls(this.Controls, theme);
    
    Console.WriteLine($"已应用主题: {theme.Name}");
}

// 递归应用主题到控件集合
private void ApplyThemeToControls(Control.ControlCollection controls, Theme theme) {
    foreach (Control control in controls) {
        // 根据控件类型应用不同样式
        if (control is Panel) {
            control.BackColor = theme.PanelBackColor;
        }
        else if (control is GroupBox) {
            control.BackColor = theme.GroupBoxBackColor;
            control.ForeColor = theme.GroupBoxForeColor;
        }
        else if (control is Button) {
            Button btn = (Button)control;
            btn.BackColor = theme.ButtonBackColor;
            btn.ForeColor = theme.ButtonForeColor;
            btn.FlatStyle = FlatStyle.Flat;
        }
        else if (control is Label) {
            control.ForeColor = theme.LabelForeColor;
        }
        else if (control is TextBox) {
            TextBox txt = (TextBox)control;
            txt.BackColor = theme.TextBoxBackColor;
            txt.ForeColor = theme.TextBoxForeColor;
            txt.BorderStyle = BorderStyle.FixedSingle;
        }
        
        // 递归处理子控件
        if (control.Controls.Count > 0) {
            ApplyThemeToControls(control.Controls, theme);
        }
    }
}

// 添加一些示例控件进行测试
GroupBox sampleGroup = new GroupBox();
sampleGroup.Text = "示例控制面板";
sampleGroup.Dock = DockStyle.Fill;
sampleGroup.Padding = new Padding(20);
mainPanel.Controls.Add(sampleGroup);

// 添加内部控件
TableLayoutPanel table = new TableLayoutPanel();
table.Dock = DockStyle.Fill;
table.ColumnCount = 2;
table.RowCount = 3;
table.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 100));
table.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));

for (int i = 0; i < 3; i++) {
    table.RowStyles.Add(new RowStyle(SizeType.Absolute, 40));
}

sampleGroup.Controls.Add(table);

// 添加标签和文本框
Label label1 = new Label();
label1.Text = "用户名:";
label1.Anchor = AnchorStyles.Left | AnchorStyles.Center;
table.Controls.Add(label1, 0, 0);

TextBox textBox1 = new TextBox();
textBox1.Dock = DockStyle.Fill;
table.Controls.Add(textBox1, 1, 0);

Label label2 = new Label();
label2.Text = "密码:";
label2.Anchor = AnchorStyles.Left | AnchorStyles.Center;
table.Controls.Add(label2, 0, 1);

TextBox textBox2 = new TextBox();
textBox2.Dock = DockStyle.Fill;
textBox2.PasswordChar = '*';
table.Controls.Add(textBox2, 1, 1);

// 添加按钮
Button btnSubmit = new Button();
btnSubmit.Text = "提交";
btnSubmit.Dock = DockStyle.Fill;
table.SetColumnSpan(btnSubmit, 2);
table.Controls.Add(btnSubmit, 0, 2);

// 主题按钮事件处理
btnLightTheme.Click += (sender, e) => ApplyTheme(lightTheme);
btnDarkTheme.Click += (sender, e) => ApplyTheme(darkTheme);
btnBlueTheme.Click += (sender, e) => ApplyTheme(blueTheme);

// 初始应用浅色主题
ApplyTheme(lightTheme);
```

#### 5.4.7 容器控件嵌套使用示例

```csharp
// 创建一个容器嵌套层次结构
// 1. 主分割容器
SplitContainer mainSplit = new SplitContainer();
mainSplit.Dock = DockStyle.Fill;
mainSplit.Orientation = Orientation.Horizontal;
mainSplit.SplitterDistance = 250;
this.Controls.Add(mainSplit);

// 2. 上半部分使用TableLayoutPanel
TableLayoutPanel topPanel = new TableLayoutPanel();
topPanel.Dock = DockStyle.Fill;
topPanel.ColumnCount = 2;
topPanel.RowCount = 2;
topPanel.Padding = new Padding(10);
topPanel.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 100));
topPanel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
for (int i = 0; i < 2; i++) {
    topPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 40));
}
mainSplit.Panel1.Controls.Add(topPanel);

// 3. 下半部分使用TabControl
TabControl bottomTabControl = new TabControl();
bottomTabControl.Dock = DockStyle.Fill;
mainSplit.Panel2.Controls.Add(bottomTabControl);

// 添加选项卡
TabPage tabPage1 = new TabPage("详细信息");
bottomTabControl.TabPages.Add(tabPage1);

// 在选项卡中添加GroupBox
GroupBox groupBox = new GroupBox();
groupBox.Text = "个人信息";
groupBox.Dock = DockStyle.Fill;
tabPage1.Controls.Add(groupBox);

// 在GroupBox中添加FlowLayoutPanel
FlowLayoutPanel flowPanel = new FlowLayoutPanel();
flowPanel.Dock = DockStyle.Fill;
flowPanel.FlowDirection = FlowDirection.TopDown;
flowPanel.WrapContents = false;
flowPanel.AutoScroll = true;
groupBox.Controls.Add(flowPanel);

// 向TableLayoutPanel添加控件
Label label1 = new Label();
label1.Text = "姓名:";
label1.Anchor = AnchorStyles.Left | AnchorStyles.Center;
topPanel.Controls.Add(label1, 0, 0);

TextBox textBox1 = new TextBox();
textBox1.Dock = DockStyle.Fill;
topPanel.Controls.Add(textBox1, 1, 0);

Label label2 = new Label();
label2.Text = "邮箱:";
label2.Anchor = AnchorStyles.Left | AnchorStyles.Center;
topPanel.Controls.Add(label2, 0, 1);

TextBox textBox2 = new TextBox();
textBox2.Dock = DockStyle.Fill;
topPanel.Controls.Add(textBox2, 1, 1);

// 向FlowLayoutPanel添加控件
for (int i = 1; i <= 5; i++) {
    Label label = new Label();
    label.Text = $"标签{i}:";
    label.AutoSize = true;
    flowPanel.Controls.Add(label);
    
    TextBox textBox = new TextBox();
    textBox.Width = 200;
    flowPanel.Controls.Add(textBox);
}
```

#### 5.3 容器控件核心方法详解

#### Panel 控件核心方法

| 方法名称 | 说明 | 参数 | 返回值 |
|---------|------|------|--------|
| Controls.Add() | 向面板添加子控件 | Control: 要添加的控件 | void |
| Controls.Remove() | 从面板移除子控件 | Control: 要移除的控件 | void |
| Controls.Clear() | 清除所有子控件 | 无 | void |
| Focus() | 使面板获取焦点 | 无 | bool |
| Refresh() | 强制重新绘制面板 | 无 | void |
| SuspendLayout() | 暂停布局逻辑 | 无 | void |
| ResumeLayout() | 恢复布局逻辑 | bool: 是否立即执行布局 | void |
| ScrollControlIntoView() | 滚动使指定控件可见 | Control: 要滚动到视图的控件 | void |

#### GroupBox 控件核心方法

| 方法名称 | 说明 | 参数 | 返回值 |
|---------|------|------|--------|
| Controls.Add() | 向组框添加子控件 | Control: 要添加的控件 | void |
| Controls.Remove() | 从组框移除子控件 | Control: 要移除的控件 | void |
| Controls.Clear() | 清除所有子控件 | 无 | void |
| Focus() | 使组框获取焦点 | 无 | bool |
| Refresh() | 强制重新绘制组框 | 无 | void |
| SuspendLayout() | 暂停布局逻辑 | 无 | void |
| ResumeLayout() | 恢复布局逻辑 | bool: 是否立即执行布局 | void |
| PerformLayout() | 强制执行布局逻辑 | 无 | void |

#### TabControl 控件核心方法

| 方法名称 | 说明 | 参数 | 返回值 |
|---------|------|------|--------|
| TabPages.Add() | 添加选项卡页 | string: 选项卡文本 或 TabPage: 选项卡对象 | TabPage |
| TabPages.Remove() | 移除选项卡页 | TabPage: 要移除的选项卡 | void |
| TabPages.Clear() | 清除所有选项卡页 | 无 | void |
| SelectTab() | 选择指定选项卡 | int: 索引 或 string: 名称 或 TabPage: 选项卡 | void |
| GetTabRect() | 获取选项卡的矩形区域 | int: 选项卡索引 | Rectangle |
| Refresh() | 强制重新绘制控件 | 无 | void |
| SuspendLayout() | 暂停布局逻辑 | 无 | void |
| ResumeLayout() | 恢复布局逻辑 | bool: 是否立即执行布局 | void |
| PerformLayout() | 强制执行布局逻辑 | 无 | void |

#### SplitContainer 控件核心方法

| 方法名称 | 说明 | 参数 | 返回值 |
|---------|------|------|--------|
| Focus() | 使分割容器获取焦点 | 无 | bool |
| Refresh() | 强制重新绘制控件 | 无 | void |
| SuspendLayout() | 暂停布局逻辑 | 无 | void |
| ResumeLayout() | 恢复布局逻辑 | bool: 是否立即执行布局 | void |
| PerformLayout() | 强制执行布局逻辑 | 无 | void |
| ResetText() | 将Text属性重置为默认值 | 无 | void |
| CreateControl() | 强制创建控件及其子控件 | bool: 是否为子控件调用CreateControl | void |
| PointToClient() | 将屏幕坐标转换为客户端坐标 | Point: 屏幕坐标点 | Point |
| PointToScreen() | 将客户端坐标转换为屏幕坐标 | Point: 客户端坐标点 | Point |

#### FlowLayoutPanel 控件核心方法

| 方法名称 | 说明 | 参数 | 返回值 |
|---------|------|------|--------|
| Controls.Add() | 向流布局面板添加子控件 | Control: 要添加的控件 | void |
| Controls.Remove() | 从流布局面板移除子控件 | Control: 要移除的控件 | void |
| Controls.Clear() | 清除所有子控件 | 无 | void |
| Focus() | 使流布局面板获取焦点 | 无 | bool |
| Refresh() | 强制重新绘制控件 | 无 | void |
| SuspendLayout() | 暂停布局逻辑 | 无 | void |
| ResumeLayout() | 恢复布局逻辑 | bool: 是否立即执行布局 | void |
| PerformLayout() | 强制执行布局逻辑 | 无 | void |
| GetFlowBreak() | 获取控件的流中断设置 | Control: 要检查的控件 | bool |
| SetFlowBreak() | 设置控件的流中断 | Control: 控件<br>bool: 是否中断流 | void |

#### TableLayoutPanel 控件核心方法

| 方法名称 | 说明 | 参数 | 返回值 |
|---------|------|------|--------|
| Controls.Add() | 向表格布局面板添加子控件 | Control: 要添加的控件 | void |
| Controls.Add() | 向指定单元格添加子控件 | Control: 控件<br>int: 行<br>int: 列 | void |
| Controls.Remove() | 从面板移除子控件 | Control: 要移除的控件 | void |
| Controls.Clear() | 清除所有子控件 | 无 | void |
| GetColumn() | 获取控件所在的列 | Control: 要检查的控件 | int |
| SetColumn() | 设置控件所在的列 | Control: 控件<br>int: 列索引 | void |
| GetRow() | 获取控件所在的行 | Control: 要检查的控件 | int |
| SetRow() | 设置控件所在的行 | Control: 控件<br>int: 行索引 | void |
| GetColumnSpan() | 获取控件跨的列数 | Control: 要检查的控件 | int |
| SetColumnSpan() | 设置控件跨的列数 | Control: 控件<br>int: 列跨度 | void |
| GetRowSpan() | 获取控件跨的行数 | Control: 要检查的控件 | int |
| SetRowSpan() | 设置控件跨的行数 | Control: 控件<br>int: 行跨度 | void |
| GetCellPosition() | 获取控件的单元格位置 | Control: 要检查的控件 | TableLayoutPanelCellPosition |
| SetCellPosition() | 设置控件的单元格位置 | Control: 控件<br>TableLayoutPanelCellPosition: 位置 | void |
| Refresh() | 强制重新绘制控件 | 无 | void |
| SuspendLayout() | 暂停布局逻辑 | 无 | void |
| ResumeLayout() | 恢复布局逻辑 | bool: 是否立即执行布局 | void |
| PerformLayout() | 强制执行布局逻辑 | 无 | void |


### 4.3 基础控件详细示例代码

#### 4.3.1 Button 控件示例

```csharp
// 按钮基本属性设置
button1.Text = "提交";
button1.Enabled = true;
button1.Size = new Size(100, 40);
button1.BackColor = Color.FromArgb(255, 128, 0);  // 使用RGB颜色
button1.Font = new Font("微软雅黑", 12, FontStyle.Bold);

// 按钮事件注册 (三种方式)
// 方式1：设计器中自动生成
this.button1.Click += new System.EventHandler(this.button1_Click);

// 方式2：传统方法绑定
button1.Click += Button1_Click;

// 方式3：Lambda表达式绑定
button1.MouseEnter += (s, ev) => { button1.BackColor = Color.LightBlue; };
button1.MouseLeave += (s, ev) => { button1.BackColor = Color.FromArgb(255, 128, 0); };

// 按钮点击事件处理方法
private void button1_Click(object sender, EventArgs e)
{
    // 获取事件源对象 (可以转换为具体控件类型)
    Button clickedButton = sender as Button;
    
    // 执行操作
    if (clickedButton != null)
    {
        // 使用MessageBox显示消息
        DialogResult result = MessageBox.Show(
            "确定要执行此操作吗？", 
            "操作确认", 
            MessageBoxButtons.YesNo, 
            MessageBoxIcon.Question);
            
        // 根据用户选择执行不同操作
        if (result == DialogResult.Yes)
        {
            // 执行确认后的操作
            clickedButton.Text = "已确认";
            clickedButton.Enabled = false;  // 禁用按钮防止重复点击
            
            // 延迟执行后续操作
            Timer timer = new Timer();
            timer.Interval = 2000;  // 2秒后执行
            timer.Tick += (s, ev) => {
                clickedButton.Text = "提交";
                clickedButton.Enabled = true;
                timer.Dispose();  // 释放定时器资源
            };
            timer.Start();
        }
    }
}
```

#### 4.3.2 TextBox 控件示例

```csharp
// 文本框基本属性设置
textBox1.Text = "默认文本";
textBox1.MaxLength = 50;  // 限制最大输入长度
textBox1.Multiline = true;  // 多行文本框
textBox1.ScrollBars = ScrollBars.Vertical;  // 启用垂直滚动条
textBox1.AcceptsReturn = true;  // 允许回车换行
textBox1.WordWrap = true;  // 自动换行
textBox1.ReadOnly = false;  // 可编辑

// 密码框设置
textBox2.PasswordChar = '*';  // 设置密码字符
textBox2.UseSystemPasswordChar = true;  // 使用系统默认密码字符

// 事件处理
textBox1.TextChanged += TextBox1_TextChanged;
textBox1.KeyPress += TextBox1_KeyPress;
textBox1.Validating += TextBox1_Validating;
textBox1.Validated += TextBox1_Validated;

// 文本变化事件
private void TextBox1_TextChanged(object sender, EventArgs e)
{
    // 实时显示字符数
    label1.Text = $"字符数: {textBox1.Text.Length}/{textBox1.MaxLength}";
    
    // 根据文本内容启用/禁用按钮
    button1.Enabled = textBox1.Text.Length > 0;
}

// 按键处理事件
private void TextBox1_KeyPress(object sender, KeyPressEventArgs e)
{
    // 只允许输入数字和退格键
    if (!char.IsDigit(e.KeyChar) && e.KeyChar != (char)Keys.Back)
    {
        e.Handled = true;  // 取消输入
        System.Media.SystemSounds.Beep.Play();  // 发出提示音
    }
}

// 输入验证事件 (Validating)
private void TextBox1_Validating(object sender, CancelEventArgs e)
{
    TextBox tb = sender as TextBox;
    if (tb != null && string.IsNullOrEmpty(tb.Text))
    {
        // 显示错误提示
        errorProvider1.SetError(tb, "此字段不能为空");
        e.Cancel = true;  // 取消焦点切换
    }
    else
    {
        errorProvider1.SetError(tb, "");  // 清除错误提示
    }
}

// 验证通过事件 (Validated)
private void TextBox1_Validated(object sender, EventArgs e)
{
    // 验证通过后执行操作
    TextBox tb = sender as TextBox;
    if (tb != null)
    {
        // 可以在这里执行数据处理或UI更新
        label1.Text = $"已验证: {tb.Text}";
    }
}
```

#### 4.3.3 CheckBox 和 RadioButton 控件示例

```csharp
// 复选框设置
checkBox1.Text = "接受用户协议";
checkBox1.Checked = false;
checkBox1.AutoCheck = true;  // 允许自动切换状态
checkBox1.CheckAlign = ContentAlignment.MiddleRight;  // 文本对齐方式
checkBox1.ThreeState = true;  // 启用三态复选框 (Checked/Unchecked/Indeterminate)

// 单选按钮设置
radioButton1.Text = "选项1";
radioButton2.Text = "选项2";
radioButton3.Text = "选项3";

// 单选按钮分组 (放在同一个容器中自动分组)
panel1.Controls.Add(radioButton1);
panel1.Controls.Add(radioButton2);
panel1.Controls.Add(radioButton3);

// 事件处理
checkBox1.CheckedChanged += CheckBox1_CheckedChanged;
radioButton1.CheckedChanged += RadioButtons_CheckedChanged;
radioButton2.CheckedChanged += RadioButtons_CheckedChanged;
radioButton3.CheckedChanged += RadioButtons_CheckedChanged;

// 复选框状态变化事件
private void CheckBox1_CheckedChanged(object sender, EventArgs e)
{
    CheckBox cb = sender as CheckBox;
    if (cb != null)
    {
        switch (cb.CheckState)
        {
            case CheckState.Checked:
                label1.Text = "已选中";
                button1.Enabled = true;
                break;
            case CheckState.Unchecked:
                label1.Text = "未选中";
                button1.Enabled = false;
                break;
            case CheckState.Indeterminate:
                label1.Text = "不确定状态";
                button1.Enabled = false;
                break;
        }
    }
}

// 单选按钮状态变化事件
private void RadioButtons_CheckedChanged(object sender, EventArgs e)
{
    RadioButton rb = sender as RadioButton;
    if (rb != null && rb.Checked)  // 只处理被选中的单选按钮
    {
        switch (rb.Name)
        {
            case "radioButton1":
                label2.Text = "已选择: " + rb.Text;
                // 根据选择应用不同的UI设置
                this.BackColor = Color.LightBlue;
                break;
            case "radioButton2":
                label2.Text = "已选择: " + rb.Text;
                this.BackColor = Color.LightGreen;
                break;
            case "radioButton3":
                label2.Text = "已选择: " + rb.Text;
                this.BackColor = Color.LightYellow;
                break;
        }
    }
}
```

#### 4.3.4 ComboBox 控件示例

```csharp
// 下拉框设置
comboBox1.DropDownStyle = ComboBoxStyle.DropDownList;  // 只能选择，不能输入
comboBox1.FormattingEnabled = true;  // 启用格式化
comboBox1.MaxDropDownItems = 8;  // 最大显示项数
comboBox1.IntegralHeight = false;  // 允许非整数高度

// 添加数据项 (多种方式)
// 方式1: 直接添加字符串
comboBox1.Items.Add("选项1");
comboBox1.Items.Add("选项2");
comboBox1.Items.Add("选项3");

// 方式2: 添加自定义对象
comboBox1.Items.Add(new { ID = 1, Name = "选项A" });
comboBox1.DisplayMember = "Name";  // 显示字段
comboBox1.ValueMember = "ID";  // 值字段

// 方式3: 批量添加
string[] items = { "红色", "蓝色", "绿色", "黄色", "紫色" };
comboBox1.Items.AddRange(items);

// 设置默认选择
comboBox1.SelectedIndex = 0;  // 根据索引选择
// comboBox1.SelectedItem = "选项2";  // 根据项选择

// 自动完成设置 (当DropDownStyle为DropDown时)
comboBox2.AutoCompleteSource = AutoCompleteSource.ListItems;
comboBox2.AutoCompleteMode = AutoCompleteMode.SuggestAppend;

// 事件处理
comboBox1.SelectedIndexChanged += ComboBox1_SelectedIndexChanged;
comboBox1.DropDown += ComboBox1_DropDown;
comboBox1.DropDownClosed += ComboBox1_DropDownClosed;

// 选择变化事件
private void ComboBox1_SelectedIndexChanged(object sender, EventArgs e)
{
    ComboBox cb = sender as ComboBox;
    if (cb != null && cb.SelectedIndex >= 0)
    {
        // 获取选中项的不同方式
        label1.Text = $"选中索引: {cb.SelectedIndex}";
        label2.Text = $"选中项: {cb.SelectedItem}";
        
        // 如果设置了DisplayMember和ValueMember
        if (!string.IsNullOrEmpty(cb.DisplayMember) && !string.IsNullOrEmpty(cb.ValueMember))
        {
            label3.Text = $"选中值: {cb.SelectedValue}";
        }
    }
}

// 下拉展开事件
private void ComboBox1_DropDown(object sender, EventArgs e)
{
    ComboBox cb = sender as ComboBox;
    if (cb != null)
    {
        // 在下拉前更新数据源
        // 例如：从数据库刷新最新数据
        // UpdateComboBoxData(cb);
    }
}

// 下拉关闭事件
private void ComboBox1_DropDownClosed(object sender, EventArgs e)
{
    ComboBox cb = sender as ComboBox;
    if (cb != null)
    {
        // 可以在这里处理下拉框关闭后的逻辑
        label1.Text = "下拉框已关闭";
    }
}
```

#### 4.3.5 DataGridView 控件示例

```csharp
// 数据表格设置
dataGridView1.AutoGenerateColumns = false;  // 不自动生成列

// 添加自定义列
dataGridView1.Columns.Add(new DataGridViewTextBoxColumn
{
    HeaderText = "ID",
    DataPropertyName = "ID",  // 绑定数据源的字段名
    Width = 50,
    ReadOnly = true  // 只读
});

dataGridView1.Columns.Add(new DataGridViewTextBoxColumn
{
    HeaderText = "名称",
    DataPropertyName = "Name",
    Width = 150
});

dataGridView1.Columns.Add(new DataGridViewComboBoxColumn
{
    HeaderText = "类别",
    DataPropertyName = "Category",
    Width = 100,
    DataSource = new string[] { "产品", "服务", "其他" }
});

dataGridView1.Columns.Add(new DataGridViewCheckBoxColumn
{
    HeaderText = "激活",
    DataPropertyName = "IsActive",
    Width = 60,
    TrueValue = true,
    FalseValue = false
});

// 添加操作列
DataGridViewButtonColumn buttonColumn = new DataGridViewButtonColumn
{
    HeaderText = "操作",
    Name = "ActionColumn",
    Text = "编辑",
    UseColumnTextForButtonValue = true,
    Width = 80
};
dataGridView1.Columns.Add(buttonColumn);

// 其他表格属性设置
dataGridView1.AllowUserToAddRows = false;  // 不允许用户添加行
dataGridView1.AllowUserToDeleteRows = false;  // 不允许用户删除行
dataGridView1.RowHeadersVisible = true;  // 显示行标题
dataGridView1.SelectionMode = DataGridViewSelectionMode.FullRowSelect;  // 整行选择
dataGridView1.MultiSelect = false;  // 不允许多选
dataGridView1.AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill;  // 自动填充列宽

// 事件处理
dataGridView1.CellClick += DataGridView1_CellClick;
dataGridView1.CellContentClick += DataGridView1_CellContentClick;
dataGridView1.CellValueChanged += DataGridView1_CellValueChanged;
dataGridView1.RowValidating += DataGridView1_RowValidating;

// 单元格点击事件
private void DataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
{
    // 处理操作列点击
    if (e.ColumnIndex == dataGridView1.Columns["ActionColumn"].Index && e.RowIndex >= 0)
    {
        // 获取当前行数据
        DataGridViewRow row = dataGridView1.Rows[e.RowIndex];
        int id = Convert.ToInt32(row.Cells["ID"].Value);
        string name = row.Cells["Name"].Value.ToString();
        
        // 打开编辑窗口或执行其他操作
        MessageBox.Show($"编辑项目: ID={id}, Name={name}");
    }
}

// 单元格内容点击事件
private void DataGridView1_CellContentClick(object sender, DataGridViewCellEventArgs e)
{
    // 处理复选框等内容点击
    // ...
}

// 单元格值变化事件
private void DataGridView1_CellValueChanged(object sender, DataGridViewCellEventArgs e)
{
    if (e.RowIndex >= 0 && e.ColumnIndex >= 0)
    {
        DataGridViewCell cell = dataGridView1.Rows[e.RowIndex].Cells[e.ColumnIndex];
        string columnName = dataGridView1.Columns[e.ColumnIndex].Name;
        
        // 处理值变化，例如保存到数据库
        // SaveCellValue(e.RowIndex, columnName, cell.Value);
    }
}

// 行验证事件
private void DataGridView1_RowValidating(object sender, DataGridViewCellCancelEventArgs e)
{
    DataGridViewRow row = dataGridView1.Rows[e.RowIndex];
    
    // 验证数据
    if (row.Cells["Name"].Value == null || string.IsNullOrWhiteSpace(row.Cells["Name"].Value.ToString()))
    {
        dataGridView1.Rows[e.RowIndex].ErrorText = "名称不能为空";
        e.Cancel = true;  // 取消行切换
    }
    else
    {
        dataGridView1.Rows[e.RowIndex].ErrorText = "";
    }
}

// 设置数据源的示例
private void LoadData()
{
    // 示例数据
    var data = new List<object>
    {
        new { ID = 1, Name = "产品A", Category = "产品", IsActive = true },
        new { ID = 2, Name = "服务B", Category = "服务", IsActive = false },
        new { ID = 3, Name = "产品C", Category = "产品", IsActive = true }
    };
    
    // 绑定数据源
    dataGridView1.DataSource = data;
}
```
```

## 5. 表单设计与布局

![WinForm 表单设计与布局技术](/img/in-post/winform-layout-design.svg)

### 5.1 布局管理器

- **FlowLayoutPanel**: 流式布局面板
- **TableLayoutPanel**: 表格布局面板  
- **SplitContainer**: 分割容器
- **GroupBox**: 分组框
- **TabControl**: 选项卡控件

### 5.2 布局示例

```csharp
// 使用 TableLayoutPanel 进行布局
private void InitializeLayout()
{
    // 创建表格布局面板
    TableLayoutPanel tableLayoutPanel = new TableLayoutPanel
    {
        Dock = DockStyle.Fill,
        ColumnCount = 2,
        RowCount = 3,
        AutoSize = true
    };
    
    // 设置列样式
    tableLayoutPanel.ColumnStyles.Add(new ColumnStyle(SizeType.Absolute, 100));
    tableLayoutPanel.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100));
    
    // 设置行样式
    for (int i = 0; i < 3; i++)
    {
        tableLayoutPanel.RowStyles.Add(new RowStyle(SizeType.Absolute, 30));
    }
    
    // 添加控件到表格
    tableLayoutPanel.Controls.Add(new Label() { Text = "用户名:" }, 0, 0);
    tableLayoutPanel.Controls.Add(new TextBox() { Dock = DockStyle.Fill }, 1, 0);
    
    tableLayoutPanel.Controls.Add(new Label() { Text = "密码:" }, 0, 1);
    tableLayoutPanel.Controls.Add(new TextBox() { Dock = DockStyle.Fill, PasswordChar = '*' }, 1, 1);
    
    Button btnLogin = new Button() { Text = "登录", Dock = DockStyle.Fill };
    btnLogin.Click += BtnLogin_Click;
    tableLayoutPanel.SetColumnSpan(btnLogin, 2);
    tableLayoutPanel.Controls.Add(btnLogin, 0, 2);
    
    this.Controls.Add(tableLayoutPanel);
}
```

## 6. 事件处理

### 6.1 事件模型

![WinForm 事件处理机制详解](/img/in-post/winform-event-handling.svg)

WinForm 使用基于委托的事件模型。主要事件处理方法包括：

```csharp
// 方法 1: 通过设计器添加事件处理程序

// 方法 2: 手动注册事件处理程序
button1.Click += Button1_Click;

// 方法 3: 使用匿名方法
button1.Click += delegate(object sender, EventArgs e)
{
    MessageBox.Show("按钮被点击了！");
};

// 方法 4: 使用 Lambda 表达式
button1.Click += (s, e) =>
{
    MessageBox.Show("按钮被点击了！");
};
```

### 6.2 常见事件

- **Load**: 窗体加载时触发
- **Click**: 鼠标点击时触发
- **MouseMove**: 鼠标移动时触发
- **KeyPress**: 键盘按键时触发
- **TextChanged**: 文本改变时触发
- **SelectedIndexChanged**: 选择项改变时触发

## 7. 数据绑定

### 7.1 简单数据绑定

![WinForm 数据绑定详解](/img/in-post/winform-data-binding.svg)

```csharp
// 绑定 TextBox 到字符串属性
personBindingSource.DataSource = currentPerson;
txtName.DataBindings.Add("Text", personBindingSource, "Name");
txtAge.DataBindings.Add("Text", personBindingSource, "Age");
```

### 7.2 DataGridView 数据绑定

```csharp
// 准备数据源
List<Person> persons = new List<Person>
{
    new Person { Name = "张三", Age = 25, Email = "zhangsan@example.com" },
    new Person { Name = "李四", Age = 30, Email = "lisi@example.com" },
    new Person { Name = "王五", Age = 22, Email = "wangwu@example.com" }
};

// 绑定到 DataGridView
dataGridView1.DataSource = persons;

// 自定义列显示
dataGridView1.Columns["Email"].Visible = false;
dataGridView1.Columns["Name"].HeaderText = "姓名";
dataGridView1.Columns["Age"].HeaderText = "年龄";
```

## 8. 文件操作

![WinForm 高级主题综合指南](/img/in-post/winform-advanced-topics.svg)

### 8.1 文件对话框

```csharp
// 打开文件对话框
private void btnOpenFile_Click(object sender, EventArgs e)
{
    OpenFileDialog openFileDialog = new OpenFileDialog
    {
        Title = "选择文件",
        Filter = "文本文件 (*.txt)|*.txt|所有文件 (*.*)|*.*",
        InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
        Multiselect = false
    };
    
    if (openFileDialog.ShowDialog() == DialogResult.OK)
    {
        // 读取选中的文件
        string filePath = openFileDialog.FileName;
        try
        {
            string content = File.ReadAllText(filePath, Encoding.UTF8);
            txtContent.Text = content;
        }
        catch (Exception ex)
        {
            MessageBox.Show("读取文件失败: " + ex.Message, "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}
```

### 8.2 保存文件

```csharp
// 保存文件对话框
private void btnSaveFile_Click(object sender, EventArgs e)
{
    SaveFileDialog saveFileDialog = new SaveFileDialog
    {
        Title = "保存文件",
        Filter = "文本文件 (*.txt)|*.txt|所有文件 (*.*)|*.*",
        InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.Desktop),
        DefaultExt = "txt"
    };
    
    if (saveFileDialog.ShowDialog() == DialogResult.OK)
    {
        string filePath = saveFileDialog.FileName;
        try
        {
            File.WriteAllText(filePath, txtContent.Text, Encoding.UTF8);
            MessageBox.Show("文件保存成功！", "提示", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
        catch (Exception ex)
        {
            MessageBox.Show("保存文件失败: " + ex.Message, "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}
```

## 9. 多线程编程

### 9.1 跨线程访问控件

```csharp
// 使用 Invoke 安全地跨线程访问控件
private void UpdateProgress(int value)
{
    if (progressBar1.InvokeRequired)
    {
        progressBar1.Invoke(new Action<int>(UpdateProgress), value);
    }
    else
    {
        progressBar1.Value = value;
        lblProgress.Text = $"进度: {value}%";
    }
}

// 后台工作线程
private void btnStartTask_Click(object sender, EventArgs e)
{
    btnStartTask.Enabled = false;
    progressBar1.Value = 0;
    
    // 创建并启动后台线程
    Thread thread = new Thread(new ThreadStart(DoWork))
    {
        IsBackground = true
    };
    thread.Start();
}

private void DoWork()
{
    for (int i = 0; i <= 100; i++)
    {
        // 模拟工作
        Thread.Sleep(100);
        // 更新进度
        UpdateProgress(i);
    }
    
    // 完成后启用按钮
    this.Invoke(new Action(() =>
    {
        btnStartTask.Enabled = true;
        MessageBox.Show("任务完成！", "提示", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }));
}
```

### 9.2 使用 BackgroundWorker

```csharp
// 使用 BackgroundWorker 简化多线程操作
private void btnStartBackgroundWorker_Click(object sender, EventArgs e)
{
    backgroundWorker1.RunWorkerAsync();
    btnStartBackgroundWorker.Enabled = false;
}

// 后台工作线程
private void backgroundWorker1_DoWork(object sender, DoWorkEventArgs e)
{
    BackgroundWorker worker = sender as BackgroundWorker;
    
    for (int i = 0; i <= 100; i++)
    {
        // 检查是否取消
        if (worker.CancellationPending)
        {
            e.Cancel = true;
            break;
        }
        
        // 模拟工作
        Thread.Sleep(100);
        
        // 报告进度
        worker.ReportProgress(i);
    }
}

// 进度更新事件
private void backgroundWorker1_ProgressChanged(object sender, ProgressChangedEventArgs e)
{
    progressBar2.Value = e.ProgressPercentage;
    lblProgress2.Text = $"进度: {e.ProgressPercentage}%";
}

// 完成事件
private void backgroundWorker1_RunWorkerCompleted(object sender, RunWorkerCompletedEventArgs e)
{
    btnStartBackgroundWorker.Enabled = true;
    
    if (e.Cancelled)
    {
        MessageBox.Show("任务已取消", "提示", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }
    else if (e.Error != null)
    {
        MessageBox.Show("任务出错: " + e.Error.Message, "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
    }
    else
    {
        MessageBox.Show("任务完成！", "提示", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }
}
```

## 10. WinForm 应用程序部署

### 10.1 创建安装程序

1. 在 Visual Studio 中右键点击解决方案
2. 选择 "添加" > "新建项目"
3. 搜索并选择 "Visual Studio Installer"
4. 选择 "Setup Project"
5. 配置安装程序属性和文件

### 10.2 发布 ClickOnce 应用程序

```
1. 在 Visual Studio 中右键点击项目
2. 选择 "属性"
3. 选择 "发布" 选项卡
4. 配置发布位置、安装模式和更新策略
5. 点击 "发布向导" 开始发布过程
```

## 11. 最佳实践

### 11.1 代码组织

- 使用命名空间合理组织代码
- 遵循 C# 命名约定
- 使用三层架构分离业务逻辑和界面

### 11.2 性能优化

- 避免在 UI 线程执行耗时操作
- 使用延迟加载技术
- 合理使用缓存机制
- 关闭不需要的事件处理程序

### 11.3 用户体验设计

- 提供操作反馈
- 添加快捷键支持
- 使用适当的图标和颜色
- 实现表单验证和错误提示

## 12. 高级功能

### 12.1 自定义控件

```csharp
// 简单的自定义按钮控件
public class CustomButton : Button
{
    public CustomButton()
    {
        this.FlatStyle = FlatStyle.Flat;
        this.FlatAppearance.BorderSize = 0;
        this.Size = new Size(100, 40);
        this.BackColor = Color.FromArgb(64, 64, 64);
        this.ForeColor = Color.White;
        this.Font = new Font("微软雅黑", 10, FontStyle.Regular);
    }
    
    protected override void OnMouseEnter(EventArgs e)
    {
        base.OnMouseEnter(e);
        this.BackColor = Color.FromArgb(96, 96, 96);
    }
    
    protected override void OnMouseLeave(EventArgs e)
    {
        base.OnMouseLeave(e);
        this.BackColor = Color.FromArgb(64, 64, 64);
    }
    
    protected override void OnMouseDown(MouseEventArgs mevent)
    {
        base.OnMouseDown(mevent);
        this.BackColor = Color.FromArgb(48, 48, 48);
    }
    
    protected override void OnMouseUp(MouseEventArgs mevent)
    {
        base.OnMouseUp(mevent);
        this.BackColor = Color.FromArgb(96, 96, 96);
    }
}
```

### 12.2 主题与皮肤

- 使用第三方皮肤控件库
- 实现自定义主题管理器
- 支持动态换肤功能

## 结语

本教程介绍了 C# WinForm 开发的核心概念和实践技巧。通过学习这些内容，您可以开始构建功能完整、交互友好的 Windows 桌面应用程序。WinForm 虽然是较传统的技术，但在企业桌面应用开发中仍然有着广泛的应用场景。

---

## 参考资源

- [Microsoft Docs - Windows Forms](https://docs.microsoft.com/zh-cn/dotnet/desktop/winforms/)
- [C# 编程指南](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/)
- [.NET Framework API 文档](https://docs.microsoft.com/zh-cn/dotnet/api/)
