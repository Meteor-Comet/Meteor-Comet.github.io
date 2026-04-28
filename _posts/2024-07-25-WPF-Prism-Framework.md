---
layout: post
title:  "WPF Prism框架学习笔记"
subtitle: "深入理解与实战Prism这一强大的WPF MVVM框架"
date:   2024-07-25 10:00:00 +0800
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
- [2. Prism框架启动与 App.xaml.cs 核心注册详解](#2-prism框架启动与-appxamlcs-核心注册详解)
- [3. Prism的命名约定、定位器与基础 MVVM](#3-prism的命名约定定位器与基础-mvvm)
- [4. 区域管理器 (RegionManager) 与区域适配器](#4-区域管理器-regionmanager-与区域适配器)
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

## 2. Prism框架启动与 App.xaml.cs 核心注册详解

在 Prism 框架体系中，`App.xaml` 和 `App.xaml.cs` 是整个应用程序的核心入口，负责接管原生 WPF 的启动流程，并初始化依赖注入容器（IOC）。掌握这一部分是 Prism 进阶的关键一步。

### 2.1 改造原生的 App.xaml
要使用 Prism，必须剥夺 WPF 原生的启动权。我们需要将根节点 `Application` 替换为 `prism:PrismApplication`，并**严格删除 `StartupUri="MainWindow.xaml"` 属性**，因为主窗体的创建将由 Prism 的依赖注入容器接管。

```xaml
<prism:PrismApplication x:Class="MyPrismApp.App"
             xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
             xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
             xmlns:prism="http://prismlibrary.com/">
    <Application.Resources>
        <!-- 全局样式和资源字典在此处引入 -->
    </Application.Resources>
</prism:PrismApplication>
```

### 2.2 App.xaml.cs 核心引导程序：CreateShell 与 RegisterTypes
修改 `App.xaml.cs` 使其继承自 `PrismApplication`。此时你必须实现两个抽象方法：`CreateShell`（创建主窗体）和 `RegisterTypes`（依赖注入与服务大管家）。

```csharp
using Prism.Ioc;
using Prism.Unity; // 核心：使用的是基于 Unity 或 DryIoc 的 Prism 容器引擎版本
using System.Windows;
using MyPrismApp.Views;
using MyPrismApp.Services;

namespace MyPrismApp
{
    public partial class App : PrismApplication
    {
        /// <summary>
        /// 1. 指定应用程序的启动主窗体 (Shell)
        /// </summary>
        protected override Window CreateShell()
        {
            // 绝对不能用 new MainWindow()！
            // 必须通过 IOC 容器解析，这样 MainWindow 及其 ViewModel 构造函数里的依赖才会被自动注入。
            return Container.Resolve<MainWindow>();
        }

        /// <summary>
        /// 2. 核心注册方法：在此处统一注册所有业务服务、导航页面和弹窗。
        /// 这是 Prism 实现强解耦的核心，也是各模块互通的基础。
        /// </summary>
        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            // ==============================================
            // A. 注册基础业务服务 (依赖注入 Service)
            // ==============================================
            
            // 瞬态 (Transient)：每次被请求时，都会创建一个全新的实例
            containerRegistry.Register<ILogService, LogService>();
            
            // 单例 (Singleton)：全局唯一的实例，整个程序生命周期共享一个对象
            containerRegistry.RegisterSingleton<IUserService, UserService>();
            
            // 实例注册：将程序启动时已经实例化的一个现成对象，注册为单例直接托管给容器
            // var localConfig = new ConfigLoader().Load();
            // containerRegistry.RegisterInstance<IConfig>(localConfig);

            // ==============================================
            // B. 注册基于 Region 路由的导航页面 (Navigation)
            // ==============================================
            
            // 注意：只有在这里注册过的 View，才能在 RequestNavigate 导航时被识别。
            // 默认路由别名为视图类名，例如下面注册后，路由地址就是 "ViewA"
            containerRegistry.RegisterForNavigation<ViewA>();
            
            // 进阶：显式指定 ViewModel，并起一个方便好记的路由别名 "StudentPage"
            containerRegistry.RegisterForNavigation<StudentView, StudentViewModel>("StudentPage");

            // ==============================================
            // C. 注册对话框弹窗视图 (Dialog)
            // ==============================================
            
            // 专供 IDialogService 调用的独立弹窗页面，也必须提前注册
            containerRegistry.RegisterDialog<AlertDialog, AlertDialogViewModel>();
            containerRegistry.RegisterDialog<ConfirmDialog>("ConfirmWindow");
        }
        
        /// <summary>
        /// 3. (可选) 注册/覆盖区域适配器
        /// </summary>
        protected override void ConfigureRegionAdapterMappings(RegionAdapterMappings regionAdapterMappings)
        {
            base.ConfigureRegionAdapterMappings(regionAdapterMappings);
            // 注册针对特定控件 (如 StackPanel) 的自定义区域适配器
            // regionAdapterMappings.RegisterMapping(typeof(StackPanel), Container.Resolve<StackPanelRegionAdapter>());
        }

        /// <summary>
        /// 4. (可选) 配置模块化目录 (详情见第8章)
        /// </summary>
        protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
        {
            base.ConfigureModuleCatalog(moduleCatalog);
            // moduleCatalog.AddModule<SomeModule>();
        }
    }
}
```

通过这一套流程，Prism 彻底接管了应用程序的生命周期、窗口创建机制以及内部服务的装配。

### 2.3 进阶实战：在主窗体弹出前阻塞显示登录窗体

在企业级应用开发中，最常见的需求是：**程序启动时先弹出登录框，如果登录成功才显示主界面，失败则直接退出程序。**
理解 `PrismApplication` 内部的启动顺序非常关键，它的调用链路为：`Initialize()` -> `CreateShell()` -> `InitializeShell()` -> `OnInitialized()`。
既然在 `CreateShell` 阶段主窗体已经被实例化，如果在主窗体正式呈现给用户之前进行拦截，最佳的重写位置是 **`InitializeShell()`** 方法。

**完整实现示例：**

```csharp
public partial class App : PrismApplication
{
    // ... 前文的 CreateShell 和 RegisterTypes 代码保持不变 ...

    /// <summary>
    /// 拦截壳窗体的初始化过程，执行前置的条件弹窗逻辑（如：登录验证）
    /// </summary>
    protected override void InitializeShell(Window shell)
    {
        // 此时 CreateShell() 已经执行，但主窗体 shell 还没有被真正 Show() 出来。
        // 我们利用 IOC 容器解析出一个纯净的登录窗体（前提是 LoginWindow 必须已被注册或能够被容器解析）
        var loginWindow = Container.Resolve<LoginWindow>();
        
        // 使用 ShowDialog() 阻塞当前启动线程，等待用户的登录操作
        bool? loginResult = loginWindow.ShowDialog();

        if (loginResult == true)
        {
            // 登录成功！调用基类方法。
            // 基类底层的默认实现为：Application.Current.MainWindow = shell; shell.Show();
            base.InitializeShell(shell); 
        }
        else
        {
            // 登录失败或用户主动点击了关闭，直接终结整个应用程序
            Application.Current.Shutdown();
        }
    }
    
    /// <summary>
    /// 在容器初始化完毕、且主窗体 Shell 显示之后触发。
    /// 常用来做初始化完成后的首次默认路由跳转。
    /// </summary>
    protected override void OnInitialized()
    {
        base.OnInitialized();
        
        // 例如：登录成功显示主界面后，默认往主窗体的 ContentRegion 推入后台首页仪表盘
        // Container.Resolve<IRegionManager>().RequestNavigate("ContentRegion", "DashboardView");
    }
}
```

这是一种在 Prism 中的标准拦截方案。它既保证了登录窗体（`LoginWindow`）能够充分享受 Prism 的 IOC 依赖注入功能，又在架构上保证了未认证用户无法接触到主窗体及任何核心服务资源。

---

## 3. Prism的命名约定、定位器与基础 MVVM

### 3.1 约定优于配置 (Convention over Configuration)
Prism 通过一套强有力的命名约定，自动消灭了传统 WPF 中需要手动绑定 `DataContext` 的繁琐代码：
1. **文件夹约定**：视图文件必须存放在 `Views` 文件夹中，视图模型必须存放在 `ViewModels` 文件夹中。
2. **命名映射约定**：后缀映射。如果 View 命名为 `MainWindow`，其 ViewModel 必须命名为 `MainWindowViewModel`。如果 View 叫 `StudentView`，则对应 `StudentViewModel`。

### 3.2 视图模型定位器 (ViewModelLocator)
当遵循了上述约定后，只需要在 XAML 根节点中挂载一行附加属性，Prism 便会利用反射机制，自动在 IOC 容器中实例化 ViewModel 并挂载到视图的 `DataContext` 上：

```xaml
<Window x:Class="MyPrismApp.Views.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:prism="http://prismlibrary.com/"
        prism:ViewModelLocator.AutoWireViewModel="True"> 
    <!-- 开启自动装配：AutoWireViewModel="True" -->
</Window>
```

**如何覆盖默认约定？**
如果在老旧项目中无法遵循文件夹和命名规范，可以在 `App.xaml.cs` 中重写 `ConfigureViewModelLocator` 进行手动配置：

```csharp
protected override void ConfigureViewModelLocator()
{
    base.ConfigureViewModelLocator();
    // 强制声明：遇到 MainWindow 视图时，无论它在哪，都给它强制挂载 CustomMainWindowViewModel
    ViewModelLocationProvider.Register<MainWindow, CustomMainWindowViewModel>();
}
```

### 3.3 属性绑定 (`BindableBase`)
要让属性支持双向 UI 刷新通知，ViewModel 必须继承 `BindableBase` 基类，并使用 `SetProperty` 方法以触发底层的 `INotifyPropertyChanged`。

```csharp
public class MainWindowViewModel : BindableBase
{
    private string _title = "Prism Application";
    public string Title
    {
        get => _title;
        set => SetProperty(ref _title, value); 
    }
}
```

### 3.4 命令注入 (`DelegateCommand`)
Prism 的 `DelegateCommand` 替代了原生臃肿的 `ICommand`，大大简化了命令交互的编写，并支持响应属性变化。

```csharp
public class MainWindowViewModel : BindableBase
{
    public DelegateCommand ClickCommand { get; private set; }
    public DelegateCommand<string> PassParamCommand { get; private set; }

    public MainWindowViewModel()
    {
        ClickCommand = new DelegateCommand(ExecuteClick, CanExecuteClick);
        // ObservesProperty 的高级应用：当 Title 属性变化时，自动重新评估该按钮是否允许被点击！
        ClickCommand.ObservesProperty(() => Title); 
        
        PassParamCommand = new DelegateCommand<string>(ExecutePassParam);
    }

    private void ExecuteClick() { /* 按钮点击执行的方法 */ }
    
    private bool CanExecuteClick() => !string.IsNullOrEmpty(Title);
    
    private void ExecutePassParam(string param) { /* 带参数的命令执行 */ }
}
```

---

## 4. 区域管理器 (RegionManager) 与区域适配器

### 4.1 区域 (Region) 概念
`RegionManager` 是 Prism 处理复杂界面组装的核心。它允许我们将主窗体挖出若干个“占位坑位”（即区域 Region），然后在运行时将具体的 UI 用户控件（Views）动态注入到这些坑位中。这种“搭积木”的设计实现了界面极度低耦合。

### 4.2 如何定义区域？
在 XAML 文件的容器控件上设置附加属性 `prism:RegionManager.RegionName` 即可开辟坑位：

```xaml
<Window x:Class="MyPrismApp.Views.MainWindow" ... >
    <Grid>
        <!-- 定义了顶部导航区 -->
        <ContentControl prism:RegionManager.RegionName="HeaderRegion" Height="60"/>
        
        <!-- 定义了主体内容展示区 -->
        <ContentControl prism:RegionManager.RegionName="MainContentRegion" />
    </Grid>
</Window>
```

### 4.3 区域适配器 (RegionAdapter)
**注意**：并不是所有的 UI 控件都支持通过 `RegionName` 标签作为区域使用。
默认情况下，Prism 引擎只认识三种支持做区域的控件：
1. `ContentControl` (用来装载单页)
2. `ItemsControl` (用来装载多页，如 ListBox)
3. `Selector` (如 TabControl)

如果你的美工设计了一个流式布局 `WrapPanel`，你想把四个独立的看板部件注入进去，若直接写 `prism:RegionManager.RegionName="DashRegion"` **程序会直接抛出异常崩溃**。
此时必须手写区域适配器来教会 Prism 如何往里面塞内容：

```csharp
// 1. 继承 RegionAdapterBase 并指定目标控件类型为 StackPanel 或 WrapPanel
public class StackPanelRegionAdapter : RegionAdapterBase<StackPanel>
{
    public StackPanelRegionAdapter(IRegionBehaviorFactory regionBehaviorFactory) 
        : base(regionBehaviorFactory) { }

    // 核心逻辑：定义当有新视图注入该区域时，目标控件应该如何把视图接纳进来
    protected override void Adapt(IRegion region, StackPanel regionTarget)
    {
        // 监控区域内部视图集合的变化
        region.Views.CollectionChanged += (s, e) =>
        {
            if (e.Action == System.Collections.Specialized.NotifyCollectionChangedAction.Add)
            {
                // 当有新视图通过导航或 RegisterViewWithRegion 注入时，将其添加为子元素
                foreach (FrameworkElement element in e.NewItems)
                    regionTarget.Children.Add(element);
            }
        };
    }

    protected override IRegion CreateRegion() => new AllActiveRegion();
}
```
写完后，**必须回到 `App.xaml.cs` 中的 `ConfigureRegionAdapterMappings` 方法里将其注册**（见本文 2.2 节代码），至此，你才能安全地在 `StackPanel` 上使用 `RegionName`。

### 4.4 视图注入 (View Injection) 
在 ViewModel 中，能够通过 IOC 容器拿到 `IRegionManager`，它管理着所有的区域坑位。

**如何向区域中静态注册页面？**

```csharp
public MainWindowViewModel(IRegionManager regionManager)
{
    _regionManager = regionManager;
    // 一启动，就向名单为 'HeaderRegion' 的区域中注入 HeaderView 实例
    // 注意：RegisterViewWithRegion 主要用于启动时的固定框架静态加载。对于功能切换，使用后续的【导航】功能。
    _regionManager.RegisterViewWithRegion("HeaderRegion", typeof(HeaderView));
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

事件聚合器是**多模块、强解耦场景下的消息总线机制**。
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
Prism 的这套大闭环架构：利用 `RegionManager` 将整个应用进行解耦拆块区域化，借助 `Modularity` 将业务逻辑物理分拆成不同的 dll，再通过 `View Injection` 、支持带参数和拦截器的 **Navigation机制**、实现跨模块通信的 **EventAggregator 消息系统** 以及解耦友善的 **DialogService** 在各个模块之间互通有无。掌握这些，即可架构出现代完善的大型桌面客户端。
