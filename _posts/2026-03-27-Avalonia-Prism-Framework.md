---
layout: post
title:  "Avalonia与Prism框架整合指南"
subtitle: "基于Prism.DryIoc.Avalonia的跨平台企业级应用实战"
date:   2026-03-27 10:00:00 +0800
author:     "Comet"
categories: C# Avalonia Prism
header-style: text
tags:
    - C#
    - Avalonia
    - Prism
    - MVVM
    - 跨平台开发
    - 学习日志
---

# Avalonia 与 Prism 框架整合开发全解

## 目录

- [1. 框架简介与项目准备](#1-框架简介与项目准备)
- [2. 初始化 Prism Application](#2-初始化-prism-application)
- [3. 约定与 ViewModelLocator](#3-约定与-viewmodellocator)
- [4. 区域管理器 (RegionManager) 与视图注入](#4-区域管理器-regionmanager-与视图注入)
- [5. 导航系统核心 (Navigation)](#5-导航系统核心-navigation)
- [6. 对话框服务 (DialogService)](#6-对话框服务-dialogservice)
- [7. 事件聚合器 (EventAggregator)](#7-事件聚合器-eventaggregator)
- [8. 模块化应用开发](#8-模块化应用开发)

在跨平台桌面应用开发领域，**Avalonia UI** 无疑是 C# 开发者的新星。它的 XAML 语法与 WPF 极其相似，并且支持 Windows、Linux、macOS 甚至 WebAssembly。而结合 **Prism.DryIoc.Avalonia**，我们可以将 WPF 中成熟的架构模式（如模块化、依赖注入、Region 导航、事件聚合器）无缝迁移到跨平台应用中，打造真正的企业级跨平台客户端。

本文将详细介绍如何在 Avalonia 中由零开始使用 Prism 框架。

---

## 1. 框架简介与项目准备

### 1.1 什么是 Prism.DryIoc.Avalonia？
官方的 Prism 框架主要维护 WPF、UWP 和 Xamarin/MAUI 版本。对于 Avalonia 的支持，是由社区（目前主要是开源项目 `Prism.Avalonia`）维护的分支。它完全保留了核心 Prism 的 API 习惯结构。这里推荐搭配轻量且高性能的 **DryIoc** 依赖注入容器。

### 1.2 创建项目与引入 NuGet 包
首先创建一个标准的 Avalonia 应用程序：
```bash
dotnet new avalonia.app -n MyAvaloniaPrismApp
```
随后，为项目安装 `Prism.DryIoc.Avalonia` 包（请注意勾选包含预发布版本，或查找最新的稳定包）：
```xml
<!-- 在 .csproj 中 -->
<ItemGroup>
    <PackageReference Include="Prism.DryIoc.Avalonia" Version="8.1.97.11072" /> <!-- 版本号以实际为准 -->
</ItemGroup>
```

---

## 2. 初始化 Prism Application

在常规的 Avalonia App 中，入口点位于 `App.axaml` 和 `App.axaml.cs`。引入 Prism 后，我们需要修改应用基类并接管启动流程。

### 2.1 修改 `App.axaml`
将缺省的 `<Application>` 根节点替换为 `<prism:PrismApplication>`：

```xml
<prism:PrismApplication xmlns="https://github.com/avaloniaui"
                        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
                        xmlns:local="using:MyAvaloniaPrismApp"
                        xmlns:prism="http://prismlibrary.com/"
                        x:Class="MyAvaloniaPrismApp.App">
    
    <!-- 全局样式和应用资源配置 -->
    <Application.Styles>
        <FluentTheme />
        <!-- 可引入其他控件库样式如 Semi.Avalonia 等 -->
    </Application.Styles>
    
</prism:PrismApplication>
```

### 2.2 修改 `App.axaml.cs`
让类继承 `PrismApplication`，此时不再需要重写原生的 `OnFrameworkInitializationCompleted`，而是重写 Prism 专属的生命周期点：

```csharp
using Avalonia;
using Avalonia.Markup.Xaml;
using Prism.DryIoc;
using Prism.Ioc;
using MyAvaloniaPrismApp.Views;

namespace MyAvaloniaPrismApp
{
    public partial class App : PrismApplication
    {
        public override void Initialize()
        {
            AvaloniaXamlLoader.Load(this);
            base.Initialize(); // 很重要，确保底层初始化
        }

        // 1. 创建应用程序的主窗口/Shell
        protected override AvaloniaObject CreateShell()
        {
            // 通过容器解析主窗口，这意味着 MainWindow 的依赖也可以被自动注入！
            return Container.Resolve<MainWindow>();
        }

        // 2. 注册容器服务、页面路由及弹窗等
        protected override void RegisterTypes(IContainerRegistry containerRegistry)
        {
            // 注册普通服务
            // containerRegistry.RegisterSingleton<IMyService, MyService>();

            // 注册导航所需的页面
            containerRegistry.RegisterForNavigation<ViewA>("InitialView");
            containerRegistry.RegisterForNavigation<ViewB>();
        }
    }
}
```

---

## 3. 约定与 ViewModelLocator

Prism in Avalonia 完全遵循经典的“约定优于配置”。
*   视图必须存放在 `Views` 命名空间下。
*   视图模型必须存在 `ViewModels` 命名空间下。
*   匹配规则：`MainView` (View) => `MainViewModel` (ViewModel)。

在 Avalonia 的 XAML 中开启自动装配：

```xml
<Window xmlns="https://github.com/avaloniaui"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:prism="http://prismlibrary.com/"
        x:Class="MyAvaloniaPrismApp.Views.MainWindow"
        prism:ViewModelLocator.AutoWireViewModel="True"
        Title="Prism in Avalonia">
    
    <TextBlock Text="{Binding Title}" HorizontalAlignment="Center" VerticalAlignment="Center"/>
</Window>
```
只要开启了 `AutoWireViewModel="True"`，Prism 就会利用反射将 `MainWindowViewModel` 注入到当前 `Window.DataContext` 中。

*提示：Avalonia 现在也极力推荐编译期绑定 (`x:DataType`)。你可以混用它们来获得代码提示：*
```xml
<Window ...
        xmlns:vm="using:MyAvaloniaPrismApp.ViewModels"
        x:DataType="vm:MainWindowViewModel">
```

---

## 4. 区域管理器 (RegionManager) 与视图注入

RegionManager 是 Prism 对用户界面进行解耦的神器。
在 Avalonia 里，一般我们使用 `ContentControl`、`TransitioningContentControl` 或 `ItemsControl` 作为 Region 的载体。

### 4.1 在界面中划分区域
在 `MainWindow.axaml` 中，通过附加属性划定一个命名区域：

```xml
<Window ...>
    <DockPanel>
        <!-- 侧边菜单也可以是 Region -->
        <StackPanel DockPanel.Dock="Left" Width="200" Background="#f0f0f0" />
        
        <!-- 主工作区域 -->
        <ContentControl prism:RegionManager.RegionName="MainRegion" />
    </DockPanel>
</Window>
```

### 4.2 通过代码向区域推入视图 (View Injection)
如果只是作为静态组件初始挂载，可以通过 `RegisterViewWithRegion`：

```csharp
public class MainWindowViewModel : BindableBase
{
    private readonly IRegionManager _regionManager;

    public MainWindowViewModel(IRegionManager regionManager)
    {
        _regionManager = regionManager;
        
        // 当主窗口初始化时，默认向 MainRegion 塞入名为 InitialView 的视图
        _regionManager.RegisterViewWithRegion("MainRegion", typeof(ViewA));
    }
}
```

---

## 5. 导航系统核心 (Navigation)

使用 Avalonia Prism 时，Navigation 是最常用的在不同功能页面间切换的手段。

### 5.1 发起导航
使用刚才注入的 `_regionManager`：

```csharp
// 基础无参导航：推入 ViewB
_regionManager.RequestNavigate("MainRegion", "ViewB");

// 带参数导航：
var paras = new NavigationParameters
{
    { "UserId", 888 },
    { "UserName", "Comet" }
};
_regionManager.RequestNavigate("MainRegion", "ViewB", paras);
```

### 5.2 接收方实现 INavigationAware（感知生命周期）

要让目标页面能拿到参数或控制生命周期，它的 ViewModel 应实现 `INavigationAware`：

```csharp
using Prism.Regions;

public class ViewBViewModel : BindableBase, INavigationAware
{
    private string _welcomeMessage;
    public string WelcomeMessage
    {
        get { return _welcomeMessage; }
        set { SetProperty(ref _welcomeMessage, value); }
    }

    // 1. 导航发生（进入该页前触发），用于接收参数
    public void OnNavigatedTo(NavigationContext navigationContext)
    {
        if (navigationContext.Parameters.ContainsKey("UserName"))
        {
            var user = navigationContext.Parameters.GetValue<string>("UserName");
            WelcomeMessage = $"欢迎你进入Avalonia跨时代, {user}!";
        }
    }

    // 2. 判断导航实例重用。返回 true，下次跳过来不再 New 实例；返回 false 总是创建新视图
    public bool IsNavigationTarget(NavigationContext navigationContext) => true;

    // 3. 页面被跳走（离开当前页时触发），可用于保存中间状态
    public void OnNavigatedFrom(NavigationContext navigationContext) 
    { 
    }
}
```

### 5.3 导航日志记录与返回拦截
Avalonia 版本的 Prism 同样支持：
*   **`IRegionNavigationJournal`**：可以通过上下文获取 `navigationContext.NavigationService.Journal`，利用 `GoBack()` 等实现类似浏览器的后退逻辑。
*   **`IConfirmNavigationRequest`**：继承该接口可以对离开页面的请求弹窗拦截（比如：提示未保存的内容）。该流程与 WPF 完全一致。

---

## 6. 对话框服务 (DialogService)

在 Avalonia 这种纯跨平台场景下，依赖原生的 MessageBox 非常不可靠甚至不存在（如 Linux 纯命令行或缺少依赖），因此，使用 Prism 内部自建窗体、视图体系的 `DialogService` 至关重要。

### 6.1 注册对话框视图
需要新建一个用户控件（UserControl）作为对话框内容界面：
```csharp
protected override void RegisterTypes(IContainerRegistry containerRegistry)
{
    // 注册自定义对话框，并起别名
    containerRegistry.RegisterDialog<CustomAlertView, CustomAlertViewModel>("CustomAlert");
}
```

### 6.2 对话框 ViewModel (`IDialogAware`)
该 ViewModel 必须实现 `IDialogAware`，以获取传递进来的参数结构并接管自己的关闭请求：

```csharp
using Prism.Services.Dialogs;

public class CustomAlertViewModel : BindableBase, IDialogAware
{
    public string Title => "跨平台警告框";
    public event Action<IDialogResult> RequestClose;

    public void OnDialogOpened(IDialogParameters parameters)
    {
        // 接收提示文本等
    }

    public bool CanCloseDialog() => true;

    public void OnDialogClosed() { }

    // 前台绑定的按钮命令
    public void CloseDialog()
    {
        RequestClose?.Invoke(new DialogResult(ButtonResult.OK));
    }
}
```

### 6.3 呼叫弹层
```csharp
private readonly IDialogService _dialogService;

// ...
_dialogService.ShowDialog("CustomAlert", new DialogParameters { { "Message", "出错啦" } }, r =>
{
    if (r.Result == ButtonResult.OK)
    {
        // 用户点击了确认
    }
});
```

---

## 7. 事件聚合器 (EventAggregator)

和传统的 WPF 开发一致，当面临：
1. ViewModel 到 ViewModel 的无直接关联通信。
2. 跨模块发送消息。

你需要用到事件总线。

**定义专属事件契约**：
```csharp
using Prism.Events;
public class LoggedInEvent : PubSubEvent<UserContext> { }
```

**被动订阅端（接收者）**：
```csharp
public class MainViewModel
{
    public MainViewModel(IEventAggregator eventAggregator)
    {
        eventAggregator.GetEvent<LoggedInEvent>().Subscribe(payload => 
        {
            // 当有人发送了登入消息时执行
            UpdateUserUI(payload);
        });
    }
}
```

**主动广播端（发送者）**：
```csharp
public class LoginViewModel
{
    private readonly IEventAggregator _eventAggregator;
    
    public LoginViewModel(IEventAggregator eventAggregator)
    {
        _eventAggregator = eventAggregator;
    }

    public void DoLogin()
    {
        var context = new UserContext { Name = "Comet" };
        _eventAggregator.GetEvent<LoggedInEvent>().Publish(context);
    }
}
```

---

## 8. 模块化应用开发

Avalonia 项目依然能发挥 Prism 极具威力的 Module 优势，将复杂大应用拆分成多个程序集（如：`SalesModule.dll`，`InventoryModule.dll`）。

1. 在外部新建 Avalonia 类库，引入 `Prism.Avalonia`。
2. 创建实现 `IModule` 的启动类：

```csharp
using Prism.Ioc;
using Prism.Modularity;
using Prism.Regions;

public class SalesModule : IModule
{
    public void RegisterTypes(IContainerRegistry containerRegistry)
    {
        // 注册专属于销售模块的路由和页面
        containerRegistry.RegisterForNavigation<SalesDashboardView>();
    }

    public void OnInitialized(IContainerProvider containerProvider)
    {
        // 如果想在加载时就在主导航栏加一个按钮入口：
        var regionManager = containerProvider.Resolve<IRegionManager>();
        regionManager.RegisterViewWithRegion("SidebarRegion", typeof(SalesSidebarButtonView));
    }
}
```

3. 在主程序 `App.axaml.cs` 中挂载该模块：
```csharp
protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
{
    moduleCatalog.AddModule<SalesModule>();
    // 或者基于文件夹扫描的机制
}
```

---

## 总结

将 **Prism 结合 Avalonia** 堪称 .NET 跨平台客户端极具威权的最佳实践。你不再需要摒弃常年来在 WPF 中积累的心智框架，只需要把熟悉的 `Prism.DryIoc` 迁移到 `Prism.DryIoc.Avalonia`，语法几乎1比1复刻。无论是针对苹果 macOS、各种 Linux 发行版，还是熟悉的 Windows 桌面环境，这套依赖注入+路由的架构都表现出了极强的稳定性和高度解耦性能。
