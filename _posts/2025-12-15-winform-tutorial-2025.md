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
