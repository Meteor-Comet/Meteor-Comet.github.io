// 打开单个文件
private void btnOpenFile_Click(object sender, EventArgs e)
{
    using (OpenFileDialog openFileDialog = new OpenFileDialog())
    {
        // 设置对话框属性
        openFileDialog.Title = "选择文件";
        openFileDialog.Filter = "文本文件(*.txt)|*.txt|Word文档(*.docx)|*.docx|Excel文件(*.xlsx)|*.xlsx|所有文件(*.*)|*.*";
        openFileDialog.FilterIndex = 1;
        openFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
        openFileDialog.RestoreDirectory = true;
        openFileDialog.CheckFileExists = true;
        openFileDialog.CheckPathExists = true;
        
        // 显示对话框
        if (openFileDialog.ShowDialog() == DialogResult.OK)
        {
            // 获取选中的文件路径
            string filePath = openFileDialog.FileName;
            
            try
            {
                // 读取文件内容
                string fileContent = File.ReadAllText(filePath);
                richTextBox1.Text = fileContent;
                
                // 更新状态
                statusLabel.Text = $"已打开文件: {Path.GetFileName(filePath)}";
            }
            catch (Exception ex)
            {
                MessageBox.Show($"读取文件时发生错误: {ex.Message}", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}

// 打开多个文件
private void btnOpenMultipleFiles_Click(object sender, EventArgs e)
{
    using (OpenFileDialog openFileDialog = new OpenFileDialog())
    {
        openFileDialog.Title = "选择多个文件";
        openFileDialog.Filter = "文本文件(*.txt)|*.txt|所有文件(*.*)|*.*";
        openFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
        openFileDialog.Multiselect = true; // 允许选择多个文件
        
        if (openFileDialog.ShowDialog() == DialogResult.OK)
        {
            listBoxFiles.Items.Clear();
            
            // 获取所有选中的文件
            foreach (string fileName in openFileDialog.FileNames)
            {
                listBoxFiles.Items.Add(fileName);
            }
            
            statusLabel.Text = $"已选择 {openFileDialog.FileNames.Length} 个文件";
        }
    }
}

// 保存文件
private void btnSaveFile_Click(object sender, EventArgs e)
{
    using (SaveFileDialog saveFileDialog = new SaveFileDialog())
    {
        // 设置对话框属性
        saveFileDialog.Title = "保存文件";
        saveFileDialog.FileName = "document.txt";
        saveFileDialog.Filter = "文本文件(*.txt)|*.txt|Word文档(*.docx)|*.docx|所有文件(*.*)|*.*";
        saveFileDialog.FilterIndex = 1;
        saveFileDialog.InitialDirectory = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);
        saveFileDialog.DefaultExt = "txt";
        saveFileDialog.OverwritePrompt = true;
        
        // 显示对话框
        if (saveFileDialog.ShowDialog() == DialogResult.OK)
        {
            try
            {
                // 保存内容到文件
                File.WriteAllText(saveFileDialog.FileName, richTextBox1.Text);
                
                // 更新状态
                statusLabel.Text = $"文件已保存: {Path.GetFileName(saveFileDialog.FileName)}";
                _lastSavedFilePath = saveFileDialog.FileName; // 记录最后保存的文件路径
            }
            catch (Exception ex)
            {
                MessageBox.Show($"保存文件时发生错误: {ex.Message}", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }
    }
}

// 另存为
private void btnSaveAsFile_Click(object sender, EventArgs e)
{
    // 实现与保存相同的逻辑，但不使用_lastSavedFilePath
    btnSaveFile_Click(sender, e);
}

// 浏览文件夹
private void btnBrowseFolder_Click(object sender, EventArgs e)
{
    using (FolderBrowserDialog folderBrowserDialog = new FolderBrowserDialog())
    {
        // 设置对话框属性
        folderBrowserDialog.Description = "请选择一个文件夹";
        folderBrowserDialog.RootFolder = Environment.SpecialFolder.MyComputer;
        folderBrowserDialog.SelectedPath = textBoxFolderPath.Text; // 使用当前文本框中的路径作为默认选择
        folderBrowserDialog.ShowNewFolderButton = true;
        
        // 显示对话框
        if (folderBrowserDialog.ShowDialog() == DialogResult.OK)
        {
            // 更新文件夹路径
            textBoxFolderPath.Text = folderBrowserDialog.SelectedPath;
            
            // 显示文件夹内容
            DisplayFolderContents(folderBrowserDialog.SelectedPath);
        }
    }
}

// 显示文件夹内容
private void DisplayFolderContents(string folderPath)
{
    listBoxFolderContents.Items.Clear();
    
    try
    {
        // 显示子文件夹
        string[] subdirectories = Directory.GetDirectories(folderPath);
        foreach (string dir in subdirectories)
        {
            listBoxFolderContents.Items.Add($"[文件夹] {Path.GetFileName(dir)}");
        }
        
        // 显示文件
        string[] files = Directory.GetFiles(folderPath);
        foreach (string file in files)
        {
            FileInfo fileInfo = new FileInfo(file);
            listBoxFolderContents.Items.Add($"[文件] {Path.GetFileName(file)} ({fileInfo.Length / 1024} KB)");
        }
        
        statusLabel.Text = $"显示文件夹: {folderPath}";
    }
    catch (Exception ex)
    {
        MessageBox.Show($"获取文件夹内容时发生错误: {ex.Message}", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
    }
}

// 复制文件夹路径到剪贴板
private void btnCopyPath_Click(object sender, EventArgs e)
{
    if (!string.IsNullOrEmpty(textBoxFolderPath.Text))
    {
        Clipboard.SetText(textBoxFolderPath.Text);
        statusLabel.Text = "文件夹路径已复制到剪贴板";
    }
}

// 初始化进度条
private void InitializeProgressBar()
{
    progressBar1.Minimum = 0;
    progressBar1.Maximum = 100;
    progressBar1.Value = 0;
    progressBar1.Step = 1;
    progressBar1.Style = ProgressBarStyle.Blocks;
    
    // 可选：设置为连续滚动模式（适用于无法确定具体进度的情况）
    // progressBar1.Style = ProgressBarStyle.Marquee;
    // progressBar1.MarqueeAnimationSpeed = 30; // 设置滚动速度
}

// 使用后台线程更新进度条
private void btnStartTask_Click(object sender, EventArgs e)
{
    btnStartTask.Enabled = false;
    progressBar1.Value = 0;
    
    // 创建后台任务
    Task.Run(() => {
        try
        {
            // 模拟耗时操作
            for (int i = 0; i <= 100; i++)
            {
                // 更新进度条的值
                UpdateProgressBar(i);
                
                // 模拟任务耗时
                Thread.Sleep(50);
            }
            
            // 任务完成后更新UI
            this.Invoke((MethodInvoker)delegate {
                btnStartTask.Enabled = true;
                MessageBox.Show("任务已完成！", "信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
            });
        }
        catch (Exception ex)
        {
            this.Invoke((MethodInvoker)delegate {
                btnStartTask.Enabled = true;
                MessageBox.Show($"任务执行出错: {ex.Message}", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
            });
        }
    });
}

// 安全更新进度条（跨线程）
private void UpdateProgressBar(int value)
{
    if (progressBar1.InvokeRequired)
    {
        progressBar1.Invoke(new Action<int>(UpdateProgressBar), value);
    }
    else
    {
        progressBar1.Value = value;
        labelProgress.Text = $"进度: {value}%";
    }
}

// 使用计时器和PerformStep更新进度
private void btnTimerProgress_Click(object sender, EventArgs e)
{
    btnTimerProgress.Enabled = false;
    progressBar1.Value = 0;
    timerProgress.Enabled = true;
}

// 计时器的Tick事件处理
private void timerProgress_Tick(object sender, EventArgs e)
{
    // 每次Tick增加一步
    progressBar1.PerformStep();
    labelProgress.Text = $"进度: {progressBar1.Value}%";
    
    // 检查是否完成
    if (progressBar1.Value >= progressBar1.Maximum)
    {
        timerProgress.Enabled = false;
        btnTimerProgress.Enabled = true;
        MessageBox.Show("进度已完成！", "信息", MessageBoxButtons.OK, MessageBoxIcon.Information);
    }
}

// 取消任务
private void btnCancelTask_Click(object sender, EventArgs e)
{
    timerProgress.Enabled = false;
    btnStartTask.Enabled = true;
    btnTimerProgress.Enabled = true;
    progressBar1.Value = 0;
    labelProgress.Text = "进度: 0%";
}

// 初始化滑动条
private void InitializeTrackBar()
{
    trackBar1.Minimum = 0;
    trackBar1.Maximum = 100;
    trackBar1.Value = 50;
    trackBar1.SmallChange = 1;
    trackBar1.LargeChange = 10;
    trackBar1.TickFrequency = 10;
    trackBar1.TickStyle = TickStyle.Both;
    trackBar1.Orientation = Orientation.Horizontal;
    
    // 绑定事件
    trackBar1.ValueChanged += new EventHandler(trackBar1_ValueChanged);
    trackBar1.Scroll += new EventHandler(trackBar1_Scroll);
    
    // 初始更新标签
    labelTrackBarValue.Text = $"当前值: {trackBar1.Value}";
}

// ValueChanged事件处理
private void trackBar1_ValueChanged(object sender, EventArgs e)
{
    TrackBar trackBar = sender as TrackBar;
    labelTrackBarValue.Text = $"当前值: {trackBar.Value}";
    
    // 可以根据值执行其他操作，例如调整音量、亮度等
    AdjustVisualElement(trackBar.Value);
}

// Scroll事件处理
private void trackBar1_Scroll(object sender, EventArgs e)
{
    // 当用户拖动滑块时可以进行实时预览
    // 这里可以添加实时预览的逻辑
}

// 根据滑动条值调整视觉元素（示例：调整颜色）
private void AdjustVisualElement(int value)
{
    // 将值映射到颜色分量 (0-100 到 0-255)
    int colorValue = (int)(255 * (value / 100.0));
    
    // 创建颜色（从蓝色渐变到红色）
    panelColorSample.BackColor = Color.FromArgb(255 - colorValue, colorValue, 0);
    
    // 更新颜色信息
    labelColorInfo.Text = $"RGB: ({255 - colorValue}, {colorValue}, 0)";
}

// 使用滑动条控制字体大小
private void trackBarFontSize_ValueChanged(object sender, EventArgs e)
{
    TrackBar trackBar = sender as TrackBar;
    int fontSize = trackBar.Value;
    
    // 应用新字体大小
    labelPreview.Font = new Font(labelPreview.Font.FontFamily, fontSize, labelPreview.Font.Style);
    labelFontSize.Text = $"字体大小: {fontSize}px";
}

// 预设值按钮
private void btnPresetLow_Click(object sender, EventArgs e)
{
    trackBar1.Value = 20;
}

private void btnPresetMedium_Click(object sender, EventArgs e)
{
    trackBar1.Value = 50;
}

private void btnPresetHigh_Click(object sender, EventArgs e)
{
    trackBar1.Value = 80;
}

// 初始化选项卡控件
private void InitializeTabControl()
{
    // 创建选项卡页面
    TabPage tabPage1 = new TabPage("基本信息");
    TabPage tabPage2 = new TabPage("详细设置");
    TabPage tabPage3 = new TabPage("数据预览");
    
    // 设置选项卡控件属性
    tabControl1.TabPages.Add(tabPage1);
    tabControl1.TabPages.Add(tabPage2);
    tabControl1.TabPages.Add(tabPage3);
    tabControl1.Alignment = TabAlignment.Top;
    tabControl1.Appearance = TabAppearance.Normal;
    tabControl1.Multiline = false;
    tabControl1.SelectedIndex = 0;
    
    // 为每个选项卡页面添加控件
    AddControlsToTabPage1(tabPage1);
    AddControlsToTabPage2(tabPage2);
    AddControlsToTabPage3(tabPage3);
    
    // 绑定事件
    tabControl1.SelectedIndexChanged += new EventHandler(tabControl1_SelectedIndexChanged);
    tabControl1.Selecting += new TabControlCancelEventHandler(tabControl1_Selecting);
}

// 为基本信息页面添加控件
private void AddControlsToTabPage1(TabPage tabPage)
{
    tabPage.BackColor = SystemColors.Control;
    
    // 创建标签和文本框
    Label labelName = new Label();
    labelName.Text = "姓名:";
    labelName.Location = new Point(10, 20);
    labelName.Size = new Size(60, 20);
    
    TextBox textBoxName = new TextBox();
    textBoxName.Name = "textBoxName";
    textBoxName.Location = new Point(80, 20);
    textBoxName.Size = new Size(200, 20);
    
    Label labelAge = new Label();
    labelAge.Text = "年龄:";
    labelAge.Location = new Point(10, 50);
    labelAge.Size = new Size(60, 20);
    
    TextBox textBoxAge = new TextBox();
    textBoxAge.Name = "textBoxAge";
    textBoxAge.Location = new Point(80, 50);
    textBoxAge.Size = new Size(200, 20);
    
    // 添加控件到选项卡页面
    tabPage.Controls.Add(labelName);
    tabPage.Controls.Add(textBoxName);
    tabPage.Controls.Add(labelAge);
    tabPage.Controls.Add(textBoxAge);
}

// 为详细设置页面添加控件
private void AddControlsToTabPage2(TabPage tabPage)
{
    tabPage.BackColor = SystemColors.Control;
    
    // 创建复选框
    CheckBox checkBoxOption1 = new CheckBox();
    checkBoxOption1.Text = "启用选项1";
    checkBoxOption1.Location = new Point(10, 20);
    checkBoxOption1.Size = new Size(150, 20);
    
    CheckBox checkBoxOption2 = new CheckBox();
    checkBoxOption2.Text = "启用选项2";
    checkBoxOption2.Location = new Point(10, 50);
    checkBoxOption2.Size = new Size(150, 20);
    
    // 创建单选按钮组
    GroupBox groupBoxOptions = new GroupBox();
    groupBoxOptions.Text = "选择模式";
    groupBoxOptions.Location = new Point(10, 80);
    groupBoxOptions.Size = new Size(200, 100);
    
    RadioButton radioButtonMode1 = new RadioButton();
    radioButtonMode1.Text = "模式1";
    radioButtonMode1.Location = new Point(10, 20);
    radioButtonMode1.Size = new Size(150, 20);
    
    RadioButton radioButtonMode2 = new RadioButton();
    radioButtonMode2.Text = "模式2";
    radioButtonMode2.Location = new Point(10, 45);
    radioButtonMode2.Size = new Size(150, 20);
    
    // 添加单选按钮到组框
    groupBoxOptions.Controls.Add(radioButtonMode1);
    groupBoxOptions.Controls.Add(radioButtonMode2);
    
    // 添加控件到选项卡页面
    tabPage.Controls.Add(checkBoxOption1);
    tabPage.Controls.Add(checkBoxOption2);
    tabPage.Controls.Add(groupBoxOptions);
}

// 为数据预览页面添加控件
private void AddControlsToTabPage3(TabPage tabPage)
{
    tabPage.BackColor = SystemColors.Control;
    
    // 创建ListBox
    ListBox listBoxPreview = new ListBox();
    listBoxPreview.Name = "listBoxPreview";
    listBoxPreview.Location = new Point(10, 20);
    listBoxPreview.Size = new Size(300, 200);
    
    // 添加示例数据
    listBoxPreview.Items.Add("示例项目 1");
    listBoxPreview.Items.Add("示例项目 2");
    listBoxPreview.Items.Add("示例项目 3");
    
    // 添加控件到选项卡页面
    tabPage.Controls.Add(listBoxPreview);
}

// 选项卡切换事件处理
private void tabControl1_SelectedIndexChanged(object sender, EventArgs e)
{
    TabControl tabControl = sender as TabControl;
    string tabName = tabControl.SelectedTab.Text;
    
    // 当切换到某个选项卡时执行相应操作
    switch (tabName)
    {
        case "基本信息":
            // 可以在这里加载基本信息
            break;
        case "详细设置":
            // 可以在这里加载详细设置
            break;
        case "数据预览":
            // 可以在这里刷新预览数据
            RefreshPreviewData();
            break;
    }
    
    // 更新状态栏信息
    toolStripStatusLabel.Text = $"当前页面: {tabName}";
}

// 选项卡切换前的处理
private void tabControl1_Selecting(object sender, TabControlCancelEventArgs e)
{
    // 可以在这里执行页面切换前的验证或保存操作
    // 例如，如果当前页面数据未保存，可以提示用户
    
    // 如果需要，可以取消选项卡切换
    // e.Cancel = true; // 取消切换
}

// 刷新预览数据
private void RefreshPreviewData()
{
    // 获取预览页面的ListBox
    TabPage tabPagePreview = tabControl1.TabPages["数据预览"];
    ListBox listBoxPreview = (ListBox)tabPagePreview.Controls["listBoxPreview"];
    
    if (listBoxPreview != null)
    {
        // 可以在这里刷新数据
        // 示例：添加当前时间戳到列表
        listBoxPreview.Items.Add($"数据更新于: {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
    }
}

// 动态添加选项卡
private void btnAddTabPage_Click(object sender, EventArgs e)
{
    // 创建新选项卡
    int tabIndex = tabControl1.TabCount + 1;
    TabPage newTabPage = new TabPage($"新页面 {tabIndex}");
    
    // 添加关闭按钮
    Button btnClose = new Button();
    btnClose.Text = "关闭此页面";
    btnClose.Location = new Point(10, 10);
    btnClose.Tag = newTabPage; // 存储对TabPage的引用
    btnClose.Click += new EventHandler(btnCloseTabPage_Click);
    
    // 添加关闭按钮到新页面
    newTabPage.Controls.Add(btnClose);
    
    // 添加到选项卡控件
    tabControl1.TabPages.Add(newTabPage);
    
    // 选中新添加的选项卡
    tabControl1.SelectedTab = newTabPage;
}

// 关闭选项卡页面
private void btnCloseTabPage_Click(object sender, EventArgs e)
{
    Button btn = sender as Button;
    TabPage tabPage = (TabPage)btn.Tag;
    
    if (tabPage != null && tabControl1.TabPages.Contains(tabPage))
    {
        // 确认关闭
        if (MessageBox.Show($"确定要关闭 '{tabPage.Text}' 页面吗？", "确认", 
                           MessageBoxButtons.YesNo, MessageBoxIcon.Question) == DialogResult.Yes)
        {
            tabControl1.TabPages.Remove(tabPage);
        }
    }
}

// 创建并初始化分组框
private void CreateGroupBox()
{
    // 创建分组框
    GroupBox groupBoxOptions = new GroupBox();
    groupBoxOptions.Text = "操作选项";
    groupBoxOptions.Location = new Point(10, 10);
    groupBoxOptions.Size = new Size(250, 150);
    groupBoxOptions.BackColor = SystemColors.Control;
    
    // 创建分组框内的控件
    CheckBox checkBoxOption1 = new CheckBox();
    checkBoxOption1.Text = "选项 1";
    checkBoxOption1.Location = new Point(15, 25);
    checkBoxOption1.Size = new Size(100, 20);
    
    CheckBox checkBoxOption2 = new CheckBox();
    checkBoxOption2.Text = "选项 2";
    checkBoxOption2.Location = new Point(15, 50);
    checkBoxOption2.Size = new Size(100, 20);
    
    CheckBox checkBoxOption3 = new CheckBox();
    checkBoxOption3.Text = "选项 3";
    checkBoxOption3.Location = new Point(15, 75);
    checkBoxOption3.Size = new Size(100, 20);
    
    // 添加控件到分组框
    groupBoxOptions.Controls.Add(checkBoxOption1);
    groupBoxOptions.Controls.Add(checkBoxOption2);
    groupBoxOptions.Controls.Add(checkBoxOption3);
    
    // 添加分组框到表单
    this.Controls.Add(groupBoxOptions);
}

// 创建单选按钮组
private void CreateRadioButtonGroup()
{
    // 创建分组框容纳单选按钮
    GroupBox groupBoxPayment = new GroupBox();
    groupBoxPayment.Text = "支付方式";
    groupBoxPayment.Location = new Point(10, 10);
    groupBoxPayment.Size = new Size(200, 120);
    
    // 创建单选按钮
    RadioButton radioButtonCash = new RadioButton();
    radioButtonCash.Text = "现金支付";
    radioButtonCash.Location = new Point(15, 25);
    radioButtonCash.Size = new Size(150, 20);
    radioButtonCash.Checked = true; // 默认选中
    radioButtonCash.CheckedChanged += new EventHandler(radioButtonPayment_CheckedChanged);
    
    RadioButton radioButtonCreditCard = new RadioButton();
    radioButtonCreditCard.Text = "信用卡";
    radioButtonCreditCard.Location = new Point(15, 50);
    radioButtonCreditCard.Size = new Size(150, 20);
    radioButtonCreditCard.CheckedChanged += new EventHandler(radioButtonPayment_CheckedChanged);
    
    RadioButton radioButtonOnline = new RadioButton();
    radioButtonOnline.Text = "在线支付";
    radioButtonOnline.Location = new Point(15, 75);
    radioButtonOnline.Size = new Size(150, 20);
    radioButtonOnline.CheckedChanged += new EventHandler(radioButtonPayment_CheckedChanged);
    
    // 添加单选按钮到分组框
    groupBoxPayment.Controls.Add(radioButtonCash);
    groupBoxPayment.Controls.Add(radioButtonCreditCard);
    groupBoxPayment.Controls.Add(radioButtonOnline);
    
    // 添加分组框到表单
    this.Controls.Add(groupBoxPayment);
}

// 单选按钮状态改变事件
private void radioButtonPayment_CheckedChanged(object sender, EventArgs e)
{
    RadioButton radioButton = sender as RadioButton;
    
    // 只处理被选中的单选按钮
    if (radioButton.Checked)
    {
        labelSelectedPayment.Text = $"已选择: {radioButton.Text}";
        
        // 根据选择执行不同操作
        EnablePaymentFields(radioButton.Text);
    }
}

// 根据选择启用相应的支付字段
private void EnablePaymentFields(string paymentMethod)
{
    // 重置所有字段状态
    panelCreditCard.Enabled = false;
    panelOnlinePayment.Enabled = false;
    labelCashInstructions.Visible = false;
    
    // 根据选择启用对应字段
    switch (paymentMethod)
    {
        case "现金支付":
            labelCashInstructions.Visible = true;
            break;
        case "信用卡":
            panelCreditCard.Enabled = true;
            break;
        case "在线支付":
            panelOnlinePayment.Enabled = true;
            break;
    }
}

// 创建复选框
private void CreateCheckBoxes()
{
    // 创建普通复选框
    CheckBox checkBoxOption1 = new CheckBox();
    checkBoxOption1.Text = "选项 1";
    checkBoxOption1.Location = new Point(10, 10);
    checkBoxOption1.Size = new Size(120, 20);
    checkBoxOption1.CheckedChanged += new EventHandler(checkBox_OptionChanged);
    
    // 创建三态复选框
    CheckBox checkBoxGroup = new CheckBox();
    checkBoxGroup.Text = "全选";
    checkBoxGroup.Location = new Point(10, 40);
    checkBoxGroup.Size = new Size(120, 20);
    checkBoxGroup.ThreeState = true;
    checkBoxGroup.CheckStateChanged += new EventHandler(checkBoxGroup_CheckStateChanged);
    
    // 创建子选项复选框
    CheckBox checkBoxChild1 = new CheckBox();
    checkBoxChild1.Text = "子选项 1";
    checkBoxChild1.Location = new Point(30, 70);
    checkBoxChild1.Size = new Size(100, 20);
    checkBoxChild1.Tag = checkBoxGroup; // 引用父复选框
    checkBoxChild1.CheckedChanged += new EventHandler(checkBoxChild_CheckedChanged);
    
    CheckBox checkBoxChild2 = new CheckBox();
    checkBoxChild2.Text = "子选项 2";
    checkBoxChild2.Location = new Point(30, 95);
    checkBoxChild2.Size = new Size(100, 20);
    checkBoxChild2.Tag = checkBoxGroup;
    checkBoxChild2.CheckedChanged += new EventHandler(checkBoxChild_CheckedChanged);
    
    CheckBox checkBoxChild3 = new CheckBox();
    checkBoxChild3.Text = "子选项 3";
    checkBoxChild3.Location = new Point(30, 120);
    checkBoxChild3.Size = new Size(100, 20);
    checkBoxChild3.Tag = checkBoxGroup;
    checkBoxChild3.CheckedChanged += new EventHandler(checkBoxChild_CheckedChanged);
    
    // 添加所有复选框到表单
    this.Controls.Add(checkBoxOption1);
    this.Controls.Add(checkBoxGroup);
    this.Controls.Add(checkBoxChild1);
    this.Controls.Add(checkBoxChild2);
    this.Controls.Add(checkBoxChild3);
}

// 普通复选框状态改变事件
private void checkBox_OptionChanged(object sender, EventArgs e)
{
    CheckBox checkBox = sender as CheckBox;
    labelStatus.Text = $"{checkBox.Text} 已{(checkBox.Checked ? "选中" : "取消选中")}";
}

// 父复选框状态改变事件（全选/取消全选）
private void checkBoxGroup_CheckStateChanged(object sender, EventArgs e)
{
    CheckBox checkBoxGroup = sender as CheckBox;
    
    // 查找所有子复选框
    foreach (Control control in this.Controls)
    {
        CheckBox childCheckBox = control as CheckBox;
        if (childCheckBox != null && childCheckBox.Tag == checkBoxGroup && childCheckBox != checkBoxGroup)
        {
            // 禁用事件以避免循环触发
            childCheckBox.CheckedChanged -= checkBoxChild_CheckedChanged;
            
            // 设置子复选框状态
            if (checkBoxGroup.CheckState == CheckState.Checked)
                childCheckBox.Checked = true;
            else if (checkBoxGroup.CheckState == CheckState.Unchecked)
                childCheckBox.Checked = false;
            
            // 重新启用事件
            childCheckBox.CheckedChanged += checkBoxChild_CheckedChanged;
        }
    }
}

// 子复选框状态改变事件
private void checkBoxChild_CheckedChanged(object sender, EventArgs e)
{
    CheckBox childCheckBox = sender as CheckBox;
    CheckBox parentCheckBox = childCheckBox.Tag as CheckBox;
    
    if (parentCheckBox != null)
    {
        // 禁用事件以避免循环触发
        parentCheckBox.CheckStateChanged -= checkBoxGroup_CheckStateChanged;
        
        // 计算选中的子复选框数量
        int totalChildren = 0;
        int checkedChildren = 0;
        
        foreach (Control control in this.Controls)
        {
            CheckBox checkBox = control as CheckBox;
            if (checkBox != null && checkBox.Tag == parentCheckBox && checkBox != parentCheckBox)
            {
                totalChildren++;
                if (checkBox.Checked)
                    checkedChildren++;
            }
        }
        
        // 更新父复选框状态
        if (checkedChildren == 0)
            parentCheckBox.CheckState = CheckState.Unchecked;
        else if (checkedChildren == totalChildren)
            parentCheckBox.CheckState = CheckState.Checked;
        else
            parentCheckBox.CheckState = CheckState.Indeterminate;
        
        // 重新启用事件
        parentCheckBox.CheckStateChanged += checkBoxGroup_CheckStateChanged;
    }
}

// 导出数据到Excel
private void btnExportToExcel_Click(object sender, EventArgs e)
{
    if (dataGridView1.Rows.Count <= 1) // 只包含空行
    {
        MessageBox.Show("没有数据可导出", "提示", MessageBoxButtons.OK, MessageBoxIcon.Information);
        return;
    }
    
    SaveFileDialog saveFileDialog = new SaveFileDialog();
    saveFileDialog.Filter = "Excel文件(*.csv)|*.csv|文本文件(*.txt)|*.txt";
    saveFileDialog.FileName = $"数据导出_{DateTime.Now:yyyyMMdd_HHmmss}.csv";
    
    if (saveFileDialog.ShowDialog() == DialogResult.OK)
    {
        try
        {
            StringBuilder sb = new StringBuilder();
            
            // 添加列标题
            for (int i = 0; i < dataGridView1.Columns.Count; i++)
            {
                if (!dataGridView1.Columns[i].Visible || dataGridView1.Columns[i] is DataGridViewButtonColumn)
                    continue;
                    
                sb.Append(dataGridView1.Columns[i].HeaderText);
                if (i < dataGridView1.Columns.Count - 1)
                    sb.Append(",");
            }
            sb.AppendLine();
            
            // 添加数据行
            foreach (DataGridViewRow row in dataGridView1.Rows)
            {
                if (row.IsNewRow) continue;
                
                for (int i = 0; i < dataGridView1.Columns.Count; i++)
                {
                    if (!dataGridView1.Columns[i].Visible || dataGridView1.Columns[i] is DataGridViewButtonColumn)
                        continue;
                        
                    string cellValue = row.Cells[i].Value?.ToString() ?? "";
                    // 处理包含逗号的文本
                    if (cellValue.Contains(","))
                        cellValue = $"\"{cellValue}\"";
                        
                    sb.Append(cellValue);
                    if (i < dataGridView1.Columns.Count - 1)
                        sb.Append(",");
                }
                sb.AppendLine();
            }
            
            // 保存到文件
            File.WriteAllText(saveFileDialog.FileName, sb.ToString(), Encoding.UTF8);
            
            MessageBox.Show($"数据已成功导出到: {saveFileDialog.FileName}", "导出成功", MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
        catch (Exception ex)
        {
            MessageBox.Show($"导出数据时发生错误: {ex.Message}", "错误", MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
}

// 刷新预览数据
private void RefreshPreviewData()
{
    // 获取预览页面的ListBox
    TabPage tabPagePreview = tabControl1.TabPages["数据预览"];
    ListBox listBoxPreview = (ListBox)tabPagePreview.Controls["listBoxPreview"];
    
    if (listBoxPreview != null)
    {
        // 可以在这里刷新数据
        // 示例：添加当前时间戳到列表
        listBoxPreview.Items.Add($"数据更新于: {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
    }
}

// 复制文件夹路径到剪贴板
private void btnCopyPath_Click(object sender, EventArgs e)
{
    if (!string.IsNullOrEmpty(textBoxFolderPath.Text))
    {
        Clipboard.SetText(textBoxFolderPath.Text);
        statusLabel.Text = "文件夹路径已复制到剪贴板";
    }
}

## 结语

本教程介绍了 C# WinForm 开发的核心概念和实践技巧。通过学习这些内容，您可以开始构建功能完整、交互友好的 Windows 桌面应用程序。WinForm although 是较传统的技术，但在企业桌面应用开发中仍然有着广泛的应用场景。

---

## 参考资源

- [Microsoft Docs - Windows Forms](https://docs.microsoft.com/zh-cn/dotnet/desktop/winforms/)
- [C# 编程指南](https://docs.microsoft.com/zh-cn/dotnet/csharp/programming-guide/)
- [.NET Framework API 文档](https://docs.microsoft.com/zh-cn/dotnet/api/)


### 17.1.3 ToolStripMenuItem 菜单项

ToolStripMenuItem 是用于创建下拉菜单和子菜单的核心控件，它继承自 ToolStripDropDownItem，可以包含子菜单项和其他工具条项。

#### 17.1.3.1 主要属性

| 属性名 | 说明 | 默认值 |
|-------|------|-------|
| Text | 菜单项显示的文本 | "" |
| Image | 菜单项显示的图像 | null |
| Checked | 菜单项是否被选中 | false |
| CheckOnClick | 是否在点击时自动切换选中状态 | false |
| CheckState | 菜单项的选中状态（Unchecked, Checked, Indeterminate） | Unchecked |
| Enabled | 菜单项是否可用 | true |
| Visible | 菜单项是否可见 | true |
| ShortcutKeys | 菜单项的快捷键 | None |
| ShowShortcutKeys | 是否显示快捷键文本 | true |
| DropDownItems | 子菜单项集合 | ToolStripItemCollection |
| HasDropDownItems | 是否包含子菜单项 | false |
| DropDownArrowDirection | 下拉箭头的方向 | Down |
| ToolTipText | 鼠标悬停时显示的提示文本 | "" |
| ImageScaling | 图像缩放模式 | SizeToFit |
| TextImageRelation | 文本和图像的相对位置关系 | Overlay |
| Alignment | 菜单项在工具条上的对齐方式 | MiddleLeft |
| AutoToolTip | 是否自动生成工具提示 | true |
| DisplayStyle | 显示样式（Text, Image, ImageAndText, None） | ImageAndText |
| Font | 菜单项文本的字体 | SystemFonts.DefaultFont |
| ForeColor | 文本颜色 | SystemColors.ControlText |
| BackColor | 背景颜色 | SystemColors.Control |
| RightToLeft | 文本是否从右到左显示 | Inherit |
| Tag | 与菜单项关联的自定义数据对象 | null |

#### 17.1.3.2 核心方法

| 方法名 | 说明 | 参数 | 返回值 |
|-------|------|------|-------|
| DropDownItems.Add | 向下拉菜单添加子项 | item: ToolStripItem 或文本、图像、事件处理程序 | ToolStripItem |
| DropDownItems.AddRange | 批量添加子项 | items: ToolStripItem[] | void |
| DropDownItems.Clear | 清除所有子项 | 无 | void |
| DropDownItems.Remove | 移除指定子项 | item: ToolStripItem | void |
| DropDownItems.RemoveAt | 移除指定索引的子项 | index: int | void |
| DropDownItems.Contains | 检查是否包含指定子项 | item: ToolStripItem | bool |
| DropDownItems.IndexOf | 获取指定子项的索引 | item: ToolStripItem | int |
| ShowDropDown | 显示下拉菜单 | 无 | void |
| HideDropDown | 隐藏下拉菜单 | 无 | void |
| PerformClick | 模拟菜单项被点击 | 无 | void |
| CreateDefaultDropDown | 创建默认的下拉菜单 | 无 | ToolStripDropDownMenu |
| ResetImage | 重置图像为默认值 | 无 | void |
| ResetText | 重置文本为默认值 | 无 | void |
| SuspendLayout | 暂停布局更新以提高性能 | 无 | void |
| ResumeLayout | 恢复布局更新 | 无 | void |

#### 17.1.3.3 核心事件

| 事件名 | 说明 | 事件参数 |
|-------|------|----------|
| Click | 菜单项被点击时触发 | EventArgs |
| CheckedChanged | Checked属性值改变时触发 | EventArgs |
| DropDownOpening | 下拉菜单即将打开时触发 | CancelEventArgs |
| DropDownOpened | 下拉菜单已打开时触发 | EventArgs |
| DropDownClosed | 下拉菜单已关闭时触发 | EventArgs |
| MouseEnter | 鼠标进入菜单项时触发 | EventArgs |
| MouseLeave | 鼠标离开菜单项时触发 | EventArgs |
| TextChanged | 文本改变时触发 | EventArgs |
| EnabledChanged | 启用状态改变时触发 | EventArgs |
| VisibleChanged | 可见状态改变时触发 | EventArgs |

#### 17.1.3.4 使用示例

```csharp
// 创建主菜单项
ToolStripMenuItem fileMenu = new ToolStripMenuItem("文件(&F)");

// 添加子菜单项
ToolStripMenuItem newItem = new ToolStripMenuItem("新建(&N)", null, NewFile_Click);
newItem.ShortcutKeys = Keys.Control | Keys.N;
fileMenu.DropDownItems.Add(newItem);

// 添加带图标的菜单项
ToolStripMenuItem openItem = new ToolStripMenuItem();
openItem.Text = "打开(&O)";
openItem.Image = Properties.Resources.OpenIcon; // 假设有一个OpenIcon资源
openItem.Click += OpenFile_Click;
openItem.ShortcutKeys = Keys.Control | Keys.O;
fileMenu.DropDownItems.Add(openItem);

// 添加带复选框的菜单项
ToolStripMenuItem viewItem = new ToolStripMenuItem("视图(&V)");
ToolStripMenuItem statusBarItem = new ToolStripMenuItem("状态栏(&S)");
statusBarItem.CheckOnClick = true;
statusBarItem.Checked = true;
statusBarItem.CheckedChanged += StatusBarCheckedChanged;
viewItem.DropDownItems.Add(statusBarItem);

// 添加分隔线
fileMenu.DropDownItems.Add(new ToolStripSeparator());

// 添加退出菜单项
ToolStripMenuItem exitItem = new ToolStripMenuItem("退出(&X)");
exitItem.Click += ExitApplication;
fileMenu.DropDownItems.Add(exitItem);

// 事件处理程序示例
private void NewFile_Click(object sender, EventArgs e)
{
    // 实现新建文件逻辑
    MessageBox.Show("新建文件功能");
}

private void StatusBarCheckedChanged(object sender, EventArgs e)
{
    ToolStripMenuItem menuItem = sender as ToolStripMenuItem;
    if (menuItem != null)
    {
        statusStrip1.Visible = menuItem.Checked;
    }
}
```


#### 17.1.3.5 菜单项集合操作

ToolStripMenuItem的DropDownItems集合提供了强大的菜单管理功能，可以实现菜单项的动态添加、删除、查找和排序等操作。

```csharp
// 菜单项集合操作示例
private void ManageMenuItems()
{
    // 创建主菜单项
    ToolStripMenuItem parentMenu = new ToolStripMenuItem("工具");
    
    // 添加菜单项的不同方法
    // 方法1：直接添加ToolStripMenuItem对象
    ToolStripMenuItem item1 = new ToolStripMenuItem("选项1");
    parentMenu.DropDownItems.Add(item1);
    
    // 方法2：使用字符串、图像和事件处理程序
    parentMenu.DropDownItems.Add("选项2", null, MenuItem_Click);
    
    // 方法3：批量添加多个菜单项
    ToolStripMenuItem[] items = new ToolStripMenuItem[]
    {
        new ToolStripMenuItem("选项3"),
        new ToolStripMenuItem("选项4")
    };
    parentMenu.DropDownItems.AddRange(items);
    
    // 在特定位置插入菜单项
    parentMenu.DropDownItems.Insert(1, new ToolStripSeparator()); // 在索引1处插入分隔线
    
    // 查找菜单项
    ToolStripMenuItem foundItem = null;
    foreach (ToolStripItem item in parentMenu.DropDownItems)
    {
        if (item is ToolStripMenuItem && item.Text == "选项2")
        {
            foundItem = item as ToolStripMenuItem;
            break;
        }
    }
    
    // 修改找到的菜单项
    if (foundItem != null)
    {
        foundItem.Enabled = false;
        foundItem.ToolTipText = "此选项暂时不可用";
    }
    
    // 移除菜单项
    parentMenu.DropDownItems.RemoveAt(3); // 移除索引3的菜单项
    
    // 遍历并处理所有菜单项
    for (int i = 0; i < parentMenu.DropDownItems.Count; i++)
    {
        ToolStripItem item = parentMenu.DropDownItems[i];
        // 跳过分隔线
        if (item is ToolStripSeparator) continue;
        
        ToolStripMenuItem menuItem = item as ToolStripMenuItem;
        if (menuItem != null)
        {
            Console.WriteLine($"菜单项 {i}: {menuItem.Text}");
        }
    }
}

private void MenuItem_Click(object sender, EventArgs e)
{
    ToolStripMenuItem menuItem = sender as ToolStripMenuItem;
    if (menuItem != null)
    {
        MessageBox.Show($"您点击了: {menuItem.Text}");
    }
}
```

#### 17.1.3.6 递归添加菜单示例

递归方法可以轻松处理嵌套的多层级菜单结构，特别适合从配置文件、数据库或其他数据源动态构建菜单系统。

```csharp
// 菜单数据模型
public class MenuItemData
{
    public string Text { get; set; }
    public string ToolTip { get; set; }
    public bool IsSeparator { get; set; } = false;
    public bool IsChecked { get; set; } = false;
    public bool CheckOnClick { get; set; } = false;
    public EventHandler ClickHandler { get; set; } = null;
    public List<MenuItemData> SubItems { get; set; } = new List<MenuItemData>();
}

// 递归创建菜单的方法
private void CreateRecursiveMenu()
{
    // 准备菜单数据
    List<MenuItemData> menuData = GetMenuData();
    
    // 创建主菜单集合
    List<ToolStripMenuItem> mainMenuItems = new List<ToolStripMenuItem>();
    
    // 递归处理每个顶层菜单
    foreach (var menuItemData in menuData)
    {
        ToolStripMenuItem menuItem = CreateMenuItemRecursively(menuItemData);
        mainMenuItems.Add(menuItem);
    }
    
    // 将创建的菜单项添加到MenuStrip
    foreach (var menuItem in mainMenuItems)
    {
        menuStrip1.Items.Add(menuItem);
    }
}

// 递归创建单个菜单项
private ToolStripMenuItem CreateMenuItemRecursively(MenuItemData data)
{
    // 处理分隔线情况
    if (data.IsSeparator)
    {
        return null; // 在调用方处理分隔线
    }
    
    // 创建菜单项
    ToolStripMenuItem menuItem = new ToolStripMenuItem(data.Text);
    
    // 设置属性
    if (!string.IsNullOrEmpty(data.ToolTip))
    {
        menuItem.ToolTipText = data.ToolTip;
    }
    
    menuItem.Checked = data.IsChecked;
    menuItem.CheckOnClick = data.CheckOnClick;
    
    // 添加点击事件处理
    if (data.ClickHandler != null)
    {
        menuItem.Click += data.ClickHandler;
    }
    else
    {
        // 默认事件处理程序
        menuItem.Click += DefaultMenuClickHandler;
    }
    
    // 递归处理子菜单项
    foreach (var subItemData in data.SubItems)
    {
        if (subItemData.IsSeparator)
        {
            // 添加分隔线
            menuItem.DropDownItems.Add(new ToolStripSeparator());
        }
        else
        {
            // 递归创建子菜单项
            ToolStripMenuItem subMenuItem = CreateMenuItemRecursively(subItemData);
            if (subMenuItem != null)
            {
                menuItem.DropDownItems.Add(subMenuItem);
            }
        }
    }
    
    return menuItem;
}

// 生成示例菜单数据
private List<MenuItemData> GetMenuData()
{
    List<MenuItemData> menuItems = new List<MenuItemData>()
    {
        new MenuItemData
        {
            Text = "文件(&F)",
            SubItems = new List<MenuItemData>()
            {
                new MenuItemData { Text = "新建(&N)", ToolTip = "创建新文件" },
                new MenuItemData { Text = "打开(&O)", ToolTip = "打开文件" },
                new MenuItemData { IsSeparator = true },
                new MenuItemData { Text = "保存(&S)", ToolTip = "保存文件" },
                new MenuItemData { Text = "另存为(&A)", ToolTip = "另存为新文件" },
                new MenuItemData { IsSeparator = true },
                new MenuItemData { Text = "退出(&X)", ToolTip = "退出应用程序" }
            }
        },
        new MenuItemData
        {
            Text = "编辑(&E)",
            SubItems = new List<MenuItemData>()
            {
                new MenuItemData { Text = "撤销(&U)", ToolTip = "撤销上一步操作" },
                new MenuItemData { Text = "重做(&R)", ToolTip = "重做操作" },
                new MenuItemData { IsSeparator = true },
                new MenuItemData { Text = "剪切(&T)", ToolTip = "剪切选中内容" },
                new MenuItemData { Text = "复制(&C)", ToolTip = "复制选中内容" },
                new MenuItemData { Text = "粘贴(&P)", ToolTip = "粘贴内容" },
                new MenuItemData { Text = "删除(&D)", ToolTip = "删除选中内容" }
            }
        },
        new MenuItemData
        {
            Text = "视图(&V)",
            SubItems = new List<MenuItemData>()
            {
                new MenuItemData { Text = "工具栏", IsChecked = true, CheckOnClick = true },
                new MenuItemData { Text = "状态栏", IsChecked = true, CheckOnClick = true },
                new MenuItemData { IsSeparator = true },
                new MenuItemData
                {
                    Text = "字体大小",
                    SubItems = new List<MenuItemData>()
                    {
                        new MenuItemData { Text = "小(10pt)" },
                        new MenuItemData { Text = "中(12pt)" },
                        new MenuItemData { Text = "大(14pt)" }
                    }
                }
            }
        }
    };
    
    return menuItems;
}

// 默认菜单点击处理程序
private void DefaultMenuClickHandler(object sender, EventArgs e)
{
    ToolStripMenuItem menuItem = sender as ToolStripMenuItem;
    if (menuItem != null)
    {
        MessageBox.Show($"您点击了菜单项: {menuItem.Text}", "菜单点击", 
            MessageBoxButtons.OK, MessageBoxIcon.Information);
    }
}
```

#### 17.1.3.7 菜单状态管理和联动

在复杂应用中，经常需要根据应用程序状态动态更新菜单的启用/禁用状态，或者实现菜单项之间的联动关系。

```csharp
// 菜单状态管理示例
private void UpdateMenuStates(bool hasOpenDocument)
{
    // 遍历菜单并更新状态
    foreach (ToolStripItem item in menuStrip1.Items)
    {
        if (item is ToolStripMenuItem menuItem)
        {
            UpdateMenuItemStateRecursively(menuItem, hasOpenDocument);
        }
    }
}

// 递归更新菜单项状态
private void UpdateMenuItemStateRecursively(ToolStripMenuItem menuItem, bool hasOpenDocument)
{
    // 根据菜单项文本更新状态
    switch (menuItem.Text)
    {
        case "保存(&S)":
        case "另存为(&A)":
            menuItem.Enabled = hasOpenDocument;
            break;
        case "撤销(&U)":
            // 检查是否有可撤销的操作
            menuItem.Enabled = hasOpenDocument && CanUndo();
            break;
        // 可以添加更多菜单项的状态逻辑
    }
    
    // 递归处理子菜单项
    foreach (ToolStripItem subItem in menuItem.DropDownItems)
    {
        if (subItem is ToolStripMenuItem subMenuItem)
        {
            UpdateMenuItemStateRecursively(subMenuItem, hasOpenDocument);
        }
    }
}

// 检查是否可以撤销操作
private bool CanUndo()
{
    // 实际应用中，这里会检查撤销栈是否为空
    return true; // 示例返回
}

// 菜单项联动示例（单选组）
private void SetupRadioMenuGroup()
{
    // 获取字体大小子菜单项
    ToolStripMenuItem viewMenu = FindMenuItemByName(menuStrip1.Items, "视图(&V)");
    if (viewMenu != null)
    {
        ToolStripMenuItem fontSizeMenu = FindMenuItemByName(viewMenu.DropDownItems, "字体大小");
        if (fontSizeMenu != null)
        {
            // 为所有子菜单项添加相同的点击处理程序
            foreach (ToolStripItem item in fontSizeMenu.DropDownItems)
            {
                if (item is ToolStripMenuItem menuItem)
                {
                    menuItem.Click += FontSizeMenuItem_Click;
                    menuItem.CheckOnClick = false; // 禁用自动选中
                }
            }
        }
    }
}

// 字体大小菜单项点击处理
private void FontSizeMenuItem_Click(object sender, EventArgs e)
{
    ToolStripMenuItem clickedItem = sender as ToolStripMenuItem;
    if (clickedItem != null && clickedItem.OwnerItem is ToolStripMenuItem parentMenu)
    {
        // 取消所有同级菜单项的选中状态
        foreach (ToolStripItem item in parentMenu.DropDownItems)
        {
            if (item is ToolStripMenuItem menuItem)
            {
                menuItem.Checked = (menuItem == clickedItem);
            }
        }
        
        // 应用字体大小更改
        ApplyFontSize(clickedItem.Text);
    }
}

// 应用字体大小
private void ApplyFontSize(string sizeText)
{
    // 提取字体大小值并应用
    // 示例实现
    int fontSize = 12; // 默认大小
    
    if (sizeText.Contains("10pt")) fontSize = 10;
    else if (sizeText.Contains("14pt")) fontSize = 14;
    
    // 应用字体大小到文本控件
    // richTextBox1.Font = new Font(richTextBox1.Font.FontFamily, fontSize, richTextBox1.Font.Style);
    
    MessageBox.Show($"字体大小已设置为: {fontSize}pt", "字体设置", 
        MessageBoxButtons.OK, MessageBoxIcon.Information);
}

// 根据名称查找菜单项
private ToolStripMenuItem FindMenuItemByName(ToolStripItemCollection items, string text)
{
    foreach (ToolStripItem item in items)
    {
        if (item is ToolStripMenuItem menuItem && menuItem.Text == text)
        {
            return menuItem;
        }
    }
    return null;
}
```

通过这些高级技术，您可以构建复杂、动态且用户友好的菜单系统，满足各种WinForm应用程序的需求。递归方法特别适合处理深层嵌套的菜单结构，而状态管理则确保菜单始终反映应用程序的当前状态。
