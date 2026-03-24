---
layout: post
title:  "WPF Prism框架学习笔记"
subtitle: "深入理解与实战Prism这一强大的WPF MVVM框架"
date:   2026-03-23 10:00:00 +0800
author:     "Comet"
categories: C# WPF Prism
header-style: text
tags:
    - C#
    - WPF
    - Prism
    - MVVM
    - 桌面开发
    - 学习日志
---

# 主要内容：WPF Prism框架

## 目录

- [1. Prism框架概念与核心内容](#1-prism框架概念与核心内容)
- [2. Prism框架使用步骤与模板](#2-prism框架使用步骤与模板)
- [3. Prism的绑定、命令与视图模型定位器](#3-prism的绑定命令与视图模型定位器)
- [4. 区域管理器 (RegionManager) 与视图注入](#4-区域管理器-regionmanager-与视图注入)
- [5. 导航功能（跳转、传参、日志、守卫）](#5-导航功能跳转传参日志守卫)
- [6. 事件聚合器 (EventAggregator)](#6-事件聚合器-eventaggregator)
- [7. 对话框服务 (DialogService)](#7-对话框服务-dialogservice)
- [8. 模块化开发 (Modularity)](#8-模块化开发-modularity)

---

## 1. Prism框架概念与核心内容

### 1.1 Prism框架概念
Prism 是一个用于在 WPF (Windows Presentation Foundation)、UWP 和 Xamarin.Forms 中构建松散耦合、可维护和可测试的 XAML 应用程序的框架。在WPF开发中，Prism 是最成熟、功能最强大的 MVVM 框架之一，它不仅提供了 MVVM 的基础功能（如数据绑定、命令），还提供了模块化开发、区域（Region）UI合成、动态导航等高级特性，非常适合开发大型的企业级桌面应用。

### 1.2 Prism核心内容
Prism 的核心内容包括以下几个方面：
*   **MVVM 支持**：实现了 `BindableBase`、`DelegateCommand` 以及属性注入等常规 MVVM 所需的基础类库。
*   **ViewModelLocator**：视图模型定位器，能够根据约定自动将 View 绑定到对应的 ViewModel 上，极大地简化了代码隐藏（Code-Behind）的处理。
*   **模块化 (Modularity)**：Prism 支持将复杂的应用程序划分为多个独立的模块（Modules），各个模块有自己的 View、ViewModel、Services 等，能够独立开发、测试，在运行时动态加载。
*   **UI 合成与区域 (Region)**：使用 `RegionManager` 将主界面划分为多个独立的区域，实现了 UI 元素的低耦合，通过视图注入（View Injection）功能可以动态装载不同的页面或者控件。
*   **依赖注入与控制反转 (IOC)**：Prism 高度依赖依赖注入容器（如 DryIoc、Unity 等）。容器负责所有的对象的生命周期管理以及依赖关系的自动解析。
*   **导航 (Navigation)**：Prism 提供了强大的基于 Region 的导航机制，支持导航传参、导航日志记录以及导航确认（守卫拦截）。
*   **事件聚合器 (EventAggregator)**：用于在松散耦合的组件之间进行通信。
*   **对话框服务 (DialogService)**：提供了一种在 ViewModel 中以解耦方式显示对话框的机制。

### 1.3 Prism和其它MVVM框架对比
*   **Prism vs CommunityToolkit.Mvvm (原 MVVM Light)**：
    *   **CommunityToolkit.Mvvm**：轻量级，性能极高（使用了源生成器等新技术），侧重于基础的 MVVM 基础设施（ViewModel基类、Messenger、Command）。如果不涉及复杂的UI动态组装和模块加载，CommunityToolkit.Mvvm 是首选。
    *   **Prism**：重型框架，功能大而全。它不仅提供 MVVM 基础，更核心的是其 UI 合成、基于区域的导航、模块化架构。适合极其复杂的企业级大型系统（例如：ERP界面、拥有诸多独立插件的系统）。
*   **Prism vs Caliburn.Micro**：两者都支持高级视图模型绑定和窗口管理，但 Prism 在模块加载和 Region 管理上更加规范、严谨和成熟。

---

## 2. Prism框架使用步骤与模板

### A. 使用Prism的两种方式
1.  **通过普通的WPF模板改写（不推荐生产使用）**
    *   新建标准 WPF 应用。
    *   通过 NuGet 引入 `Prism.DryIoc`（或 Prism.Unity）。
    *   修改 `App.xaml`，将应用的根节点换成基于 Prism 的 `PrismApplication` 并且在 C# 代码中重写 `CreateShell()` 和 `RegisterTypes()` 方法。
    *   *一般在学习和研究底层逻辑时才使用此方式。*

2.  **Prism Template Pack 项目模板 (推荐方式)**
    *   这是一个 Visual Studio 的扩展插件（安装 “Prism Template Pack”）。
    *   安装之后，在新建项目时可以直接选择 `Prism Blank App (WPF)` 项目模板创建 Prism 项目，这会自动为你配置好依赖注入容器和 App 壳基础代码。

### B. Prism框架的约定命名规则
Prism 的核心理念之一是**约定优于配置** (Convention over Configuration)。

1.  **视图 (View) 必须放到 `Views` 文件夹中**。
2.  **视图模型 (ViewModel) 必须放到 `ViewModels` 文件夹中**。
3.  **命名映射约定**：如果 View 叫做 `MainWindow`，那么它的 ViewModel 必须叫做 `MainWindowViewModel`。如果 View 是 `StudentView`，则 ViewModel 叫做 `StudentViewModel`。

遵守这个约定，Prism 自带的 **ViewModelLocator** 才会自动帮你去对应的文件夹中找对应的 ViewModel 并赋值给 View 的 `DataContext`。

---

## 3. Prism的绑定、命令与视图模型定位器

### 3.1 属性绑定 (`BindableBase`)
要让属性支持双向绑定，ViewModel 需要继承 `BindableBase` 基类，并使用 `SetProperty` 方法。

```csharp
public class MainWindowViewModel : BindableBase
{
    private string _title = "Prism Application";
    public string Title
    {
        get { return _title; }
        set { SetProperty(ref _title, value); }
    }
}
```

### 3.2 命令注入 (`DelegateCommand`)
使用 `DelegateCommand` 替代原生的 `ICommand`，大大简化了命令的编写。也可以使用异步命令。

```csharp
public class MainWindowViewModel : BindableBase
{
    public DelegateCommand ClickCommand { get; private set; }
    public DelegateCommand<string> PassParamCommand { get; private set; }

    public MainWindowViewModel()
    {
        ClickCommand = new DelegateCommand(ExecuteClick, CanExecuteClick);
        PassParamCommand = new DelegateCommand<string>(ExecutePassParam);
    }

    private void ExecuteClick()
    {
        // 按钮点击执行的方法
    }

    private bool CanExecuteClick()
    {
        // 可以根据条件返回 True 或 False，用以控制按钮是否可用
        return true; 
    }

    private void ExecutePassParam(string param)
    {
        // 带参数的命令执行
    }
}
```

### 3.3 ViewModelLocator 视图模型定位器
视图模型定位器是 Prism 用于“自动查找 View 的 DataContext” 的机制。
只要你遵循了上文提到的 [Views+ViewModels 命名约定]，在 XAML 中，只需注入下面的附加属性，Prism 就会利用反射自动装配：

```xaml
<Window x:Class="MyPrismApp.Views.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:prism="http://prismlibrary.com/"
        prism:ViewModelLocator.AutoWireViewModel="True"> 
    <!-- 开启自动装配：AutoWireViewModel="True" -->
</Window>
```

#### 覆盖约定的 `ViewModelLocationProvider`
如果你的项目没法按约定命名，可以通过 `ViewModelLocationProvider` 在代码中手动注册对应关系（推荐在 `App.xaml.cs` 里的重写中配置）：

```csharp
protected override void ConfigureViewModelLocator()
{
    base.ConfigureViewModelLocator();
    ViewModelLocationProvider.Register<MainWindow, CustomMainWindowViewModel>();
}
```

---

## 4. 区域管理器 (RegionManager) 与视图注入

### C. 区域和导航的核心
`RegionManager` 是 Prism 处理复杂界面的核心所在，它提供了一种高度低耦合的方式来组装 UI：将界面切分成多个“占位符”（区域），然后把具体的用户控件（Views）动态注入到这些占位符中。

#### 4.1 如何定义区域？
在 XAML 文件的容器控件上设置附加属性 `prism:RegionManager.RegionName`。

```xaml
<Window x:Class="MyPrismApp.Views.MainWindow" ... >
    <Grid>
        <!-- 这里定义了一个名为 "ContentRegion" 的区域 -->
        <ContentControl prism:RegionManager.RegionName="ContentRegion" />
    </Grid>
</Window>
```
**注意（区域适配器提醒）**：并不是所有的控件都能当成区域！默认情况下，只有 `ContentControl`、`ItemsControl`（如 ListBox） 和 `Selector` （如 TabControl）可以直接通过 RegionName 当作区域。如果你想把其他的容器（如 `StackPanel` 或 `Window` 自身）当做区域，必须自定义继承并实现 **RegionAdapterBase** 区域适配器，然后将其注册到容器里。

#### 4.2 View Injection (视图注入) 
在后台代码或 ViewModel 中，能够通过 IOC 容器拿到 `IRegionManager`，它可以对页面进行灵活管理：包括向区域添加页面、命名区域和执行导航。

**如何向区域中动态添加页面？**

```csharp
// 在 ViewModel 的构造函数中通过 IOC 注入 IRegionManager
public MainWindowViewModel(IRegionManager regionManager)
{
    _regionManager = regionManager;
    AddViewToRegion();
}

private readonly IRegionManager _regionManager;

private void AddViewToRegion()
{
    // 向名单为 'ContentRegion' 的区域中直接注册/添加一个视图(UserControl)
    // 注意：RegisterViewWithRegion 主要用于初始静态加载，使用导航往往更灵活
    _regionManager.RegisterViewWithRegion("ContentRegion", typeof(ViewA));
}
```

---

## 5. 导航功能（跳转、传参、日志、守卫）

除了基础的视图装载，Prism 在区域内引入了一套极其完整的导航机制，让你像开发 Web/APP 路由一样开发 WPF。

### 5.1 如何执行导航？

> **核心 API：** `regionManager.Regions["RegionName"].RequestNavigate("View名")` 
或快捷方式：`regionManager.RequestNavigate("RegionName", "View名")`

```csharp
private void NavigateToViewA()
{
    // 将名为 "ViewA" 的页面导航推入 "ContentRegion" 区域。
    // ViewA 是一个用户控件，并且必须在 IOC 容器里提前注册为支持导航的对象！
    _regionManager.RequestNavigate("ContentRegion", "ViewA");
}
```

**必须把页面添加到 IOC 中（容器注册）！**
在 `App.xaml.cs` 中重写的 `RegisterTypes` 里，通知容器该页面可用于导航：
```csharp
protected override void RegisterTypes(IContainerRegistry containerRegistry)
{
    // 将 ViewA 和 ViewB 注册为导航使用的页面。如果不给别名，默认名字就是 ViewA
    containerRegistry.RegisterForNavigation<ViewA>();
    // 可以指定别名导航
    containerRegistry.RegisterForNavigation<ViewB>("MyCustomViewB"); 
}
```

### 5.2 导航传参 `NavigationParameters` & `INavigationAware` 接口

`INavigationAware` 是导航感知接口，它包含三个方法：
*   `OnNavigatedTo`：**导航目标已达到（进入页面时）触发**。接收参数和页面初始化。
*   `IsNavigationTarget`：**是否重用当前实例**。返回 True 则复用当前缓存实例； False 则每次跳转重新创建。
*   `OnNavigatedFrom`：**离开当前页面时触发**。

**发起导航与传参：**
```csharp
var parameters = new NavigationParameters();
parameters.Add("id", 1001);
parameters.Add("name", "张三");

// 进行带参数的跳转！
_regionManager.RequestNavigate("ContentRegion", "ViewB", parameters);
```

**接收方 ViewModel 实现接口：**
```csharp
public class ViewBViewModel : BindableBase, INavigationAware
{
    public void OnNavigatedTo(NavigationContext navigationContext)
    {
        // 接收强类型参数
        var id = navigationContext.Parameters.GetValue<int>("id");
        var name = navigationContext.Parameters.GetValue<string>("name");
    }

    public bool IsNavigationTarget(NavigationContext navigationContext)
    {
        return true; // 表示保持该页面缓存实例，不重复创建
    }

    public void OnNavigatedFrom(NavigationContext navigationContext)
    {
        // 离开页面时可以保存暂存数据
    }
}
```

### 5.3 导航守卫（确认机制） `IConfirmNavigationRequest`
如果用户在这个页面填了一半的表单忘了保存，不小心点了跳走怎么办？你需要拦截离开请求。
让 ViewModel 继承自 `IConfirmNavigationRequest`（它自带了 `INavigationAware` 的三个方法）：

```csharp
public class FormViewModel : BindableBase, IConfirmNavigationRequest
{
    // ... INavigationAware的三个方法省略 ...

    public void ConfirmNavigationRequest(NavigationContext navigationContext, Action<bool> continuationCallback)
    {
        bool result = MessageBox.Show("您的内容还未保存，确定要离开吗？", "提示", MessageBoxButton.YesNo) == MessageBoxResult.Yes;
        // 回调告诉 Prism 框架，是继续导航 (true)，还是立即终止并留在当前页 (false)
        continuationCallback(result); 
    }
}
```

### 5.4 导航日志/历史记录 `IRegionNavigationJournal`
Prism 会在这个区域内自动记录你去过的页面，类似浏览器的历史记录（能前进、后退）。我们可以在上下文 `NavigationContext` 中拿到它。

```csharp
public class ViewBViewModel : BindableBase, INavigationAware
{
    private IRegionNavigationJournal _journal;

    // 前进和后退按钮命令
    public DelegateCommand GoBackCommand { get; set; }
    public DelegateCommand GoForwardCommand { get; set; }

    public ViewBViewModel()
    {
        GoBackCommand = new DelegateCommand(() => _journal.GoBack(), () => _journal.CanGoBack);
        GoForwardCommand = new DelegateCommand(() => _journal.GoForward(), () => _journal.CanGoForward);
    }

    public void OnNavigatedTo(NavigationContext navigationContext)
    {
        // 任何被推入的页面的上下文中，都顺带装着导航日志服务对象！
        _journal = navigationContext.NavigationService.Journal;
        
        GoBackCommand.RaiseCanExecuteChanged();
        GoForwardCommand.RaiseCanExecuteChanged();
    }
    // ...
}
```
*日常日志操作主要 API*：
*   `CanGoBack` / `CanGoForward`：判断是否有前一页/后一页历史
*   `GoBack()` / `GoForward()`：执行回到上页或前往下页的功能
*   `Clear()`：清除该区域内的所有跳转历史记录（通常在登录成功进入主页时使用！）。

---

## 6. 事件聚合器 (EventAggregator)

事件聚合器是**多模块、强解耦场景下的消息总线神器**。
有些视图完全不相互认识，甚至跨越了不能互相引用的不同模块类库。想要相互发消息（例如在“导航栏模块”发一个用户注销消息，在“主工作区模块”要清空数据），只能通过 `IEventAggregator` 进行全局广播。

### 6.1 定义事件载体
我们需要声明一个继承自 `PubSubEvent<参数类型>` 的事件类：

```csharp
// 这是一个传递字符串的消息，你也可以传递自定义实体类
public class MessageSentEvent : PubSubEvent<string> { }
```

### 6.2 订阅事件（接收方）
在接收方的 ViewModel 中直接注入 `IEventAggregator`：

```csharp
public class TargetViewModel
{
    public TargetViewModel(IEventAggregator eventAggregator)
    {
        // 订阅该事件。只要有人发 MessageSentEvent 消息，就执行 OnMessageReceived
        eventAggregator.GetEvent<MessageSentEvent>().Subscribe(OnMessageReceived);
        
        // 更高级：允许你设置运行在 UI 线程，以及通过 filter 过滤特定条件的消息
        // eventAggregator.GetEvent<MessageSentEvent>().Subscribe(OnMessageReceived, ThreadOption.UIThread, false, msg => msg.Contains("Error"));
    }

    private void OnMessageReceived(string message)
    {
        // 处理收到的消息
    }
}
```

### 6.3 发布事件（发送方）
发送方的 ViewModel 同样通过依赖注入拿到 `IEventAggregator`：

```csharp
public class SourceViewModel
{
    private readonly IEventAggregator _eventAggregator;

    public SourceViewModel(IEventAggregator eventAggregator)
    {
        _eventAggregator = eventAggregator;
    }

    private void SendMessage()
    {
        // 向全局广播这条消息！全世界订阅这个事件的人都能收到
        _eventAggregator.GetEvent<MessageSentEvent>().Publish("Hello from Source!");
    }
}
```

---

## 7. 对话框服务 (DialogService)

在标准的 MVVM 模式中，如果在 ViewModel 中直接调用 `MessageBox.Show()` 会破坏解耦（因为引入了 UI 相关的命名空间），且无法进行单元测试。
Prism 提供了 `IDialogService` 以解决这个问题。通过它可以按显示标准弹窗或者自定义的浮层（比如专门做的一个确认框 View）。

### 7.1 创建和注册对话框 View 和 ViewModel
*像注册普通页面一样，只不过专门有个 RegisterDialog API。*

1.  新建 `AlertDialog`(View) 和 `AlertDialogViewModel` (必须实现 `IDialogAware` 接口)。
2.  在 `App.xaml.cs` 中注册它：

```csharp
protected override void RegisterTypes(IContainerRegistry containerRegistry)
{
    containerRegistry.RegisterDialog<AlertDialog, AlertDialogViewModel>();
}
```

### 7.2 在 ViewModel 中实现 `IDialogAware` 
这是提供给弹层对话框专用的接口。

```csharp
public class AlertDialogViewModel : BindableBase, IDialogAware
{
    // 实现 IDialogAware 接口属性
    public string Title => "系统提示";
    public event Action<IDialogResult> RequestClose; // 用它主动关闭弹窗

    public void OnDialogOpened(IDialogParameters parameters)
    {
        // 弹层开启时执行，并能强类型接参数
        var message = parameters.GetValue<string>("message");
    }

    public bool CanCloseDialog() => true;

    public void OnDialogClosed() { }

    private void CloseDialogFunc()
    {
        // 通过传递返回结果来结束自己！可以带上 OK 或 Cancel 以及返回值参数
        var result = new DialogResult(ButtonResult.OK);
        RequestClose?.Invoke(result);
    }
}
```

### 7.3 调用/弹出对话框
在需要弹窗的普通 ViewModel 中注入 `IDialogService` 即可。

```csharp
public class MainViewModel
{
    private readonly IDialogService _dialogService;
    
    public MainViewModel(IDialogService dialogService)
    {
        _dialogService = dialogService;
    }

    private void ShowAlert()
    {
        var parameters = new DialogParameters();
        parameters.Add("message", "这是一条警告弹窗！");

        // 调用刚才注册的 AlertDialog。并等待它的回调结果
        _dialogService.ShowDialog("AlertDialog", parameters, result =>
        {
            if (result.Result == ButtonResult.OK)
            {
                // 用户在弹窗里点击了确认！
            }
        });
    }
}
```

---

## 8. 模块化开发 (Modularity)

模块化是大型 WPF 应用使用 Prism 最为核心的原因之一。Prism 允许我们将独立开发的业务放到不同的类库（类项目）中（例如：仓储模块类库、人员模块类库），并在主程序启动时去加载扫描它们。

### 8.1 定义一个模块 (Module)
新建一个 WPF 类库，引用 Prism，并编写一个实现了 `IModule` 的入口类：

```csharp
public class InventoryModule : IModule
{
    // 步骤1：向容器注册该模块专有的服务、页面路由
    public void RegisterTypes(IContainerRegistry containerRegistry)
    {
        containerRegistry.RegisterForNavigation<InventoryView>();
        containerRegistry.RegisterSingleton<IInventoryService, InventoryService>();
    }

    // 步骤2：执行模块初始化相关逻辑（比如去给主页面的导航菜单注册一个侧边栏按钮）
    public void OnInitialized(IContainerProvider containerProvider)
    {
        var regionManager = containerProvider.Resolve<IRegionManager>();
        regionManager.RegisterViewWithRegion("MenuRegion", typeof(InventoryMenuBtnView));
    }
}
```

### 8.2 在宿主程序配置加载哪些模块 (ModuleCatalog)
在 `App.xaml.cs` 中：

```csharp
protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
{
    // 方法一：代码通过引用直接注册
    moduleCatalog.AddModule<InventoryModule>();
    
    // 方法二：目录扫描注册。主程序甚至不需要引用这个雷库，直接把编译出来的dll丢进 Modules 文件夹即可！(高度解耦、支持热插拔插件)
    // base.ConfigureModuleCatalog(moduleCatalog);
}

// 针对目录扫描（DirectoryModuleCatalog）：
protected override IModuleCatalog CreateModuleCatalog()
{
    return new DirectoryModuleCatalog() { ModulePath = @".\Modules" };
}
```

### 最终总结
Prism 的这套大闭环架构：利用 `RegionManager` 将整个应用进行解耦拆块区域化，借助 `Modularity` 将业务逻辑物理分拆成不同的 dll，再通过 `View Injection` 、支持带参数和拦截器的 **Navigation机制**、能打破所有防线的 **EventAggregator 消息系统** 以及解耦友善的 **DialogService** 在各个模块之间互通有无。掌握这些，即可架构出现代最完善的大型桌面客户端。
