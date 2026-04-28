---
layout: post
title:  "Avalonia全景指南：ReactiveUI精讲与Prism企业级架构深度扩展"
subtitle: "从属性绑定到模块化注入：一万字超长干货解析Avalonia生态核心API与所有应用场景"
date:   2026-03-27 10:00:00 +0800
author:     "Comet"
categories: C# Avalonia ReactiveUI Prism
header-style: text
tags:
    - C#
    - Avalonia
    - ReactiveUI
    - Prism
    - MVVM
    - 跨平台开发
    - 架构设计
---

# Avalonia 全景指南：ReactiveUI精讲与Prism企业级架构深度扩展

本文将提供一份超越官方基础文档的“万字级长文”实战解析。
我们将把跨平台明星框架 **Avalonia UI** 的核心驱动引擎分为两部分进行极致拆解：
第一部分，深入剖析 Avalonia 官方首推的响应式 MVVM 框架 **ReactiveUI** 的所有核心 API 及在复杂前端场景中的应用；
第二部分，探讨面对几百个复杂页面与外部插件系统的大型商业应用时，如何引入 **Prism (Prism.DryIoc.Avalonia)** 作为扩展底座，完成视图路由、依赖注入、跨窗口弹层以及拓展模块化 (Modularity) 机制。

---

## 目录

- [一、 为什么 Avalonia 官方原生拥抱 ReactiveUI？](#一-为什么-avalonia-官方原生拥抱-reactiveui)
- [二、 ReactiveUI 核心实战：从属性到命令的全景 API](#二-reactiveui-核心实战从属性到命令的全景-api)
  - [2.1 响应式对象基石：ReactiveObject 与底层机制](#21-响应式对象基石reactiveobject-与底层机制)
  - [2.2 ReactiveCommand 异步命令深度剖析](#22-reactivecommand-异步命令深度剖析)
  - [2.3 ObservableAsPropertyHelper (OAPH)：只读派生属性的推荐方案](#23-observableaspropertyhelper-oaph只读派生属性的推荐方案)
  - [2.4 神级监听与数据流转变幻：WhenAnyValue 核心原理](#24-神级监听与数据流转变幻whenanyvalue-核心原理)
  - [2.5 ReactiveUI 结合 DynamicData 进行巨量集合管理](#25-reactiveui-结合-dynamicdata-进行巨量集合管理)
- [三、 进阶扩展：Avalonia 与 Prism 框架的微核架构搭建](#三-进阶扩展avalonia-与-prism-框架的微核架构搭建)
  - [3.1 Prism in Avalonia：定位与核心价值](#31-prism-in-avalonia定位与核心价值)
  - [3.2 启动接管与依赖注入底座 (DryIoc) API](#32-启动接管与依赖注入底座-dryioc-api)
  - [3.3 区域管理器 (RegionManager) 深度讲解](#33-区域管理器-regionmanager-深度讲解)
  - [3.4 路由系统 (Navigation) 的全场景使用机制](#34-路由系统-navigation-的全场景使用机制)
  - [3.5 绝对解耦的弹层服务 (DialogService)](#35-绝对解耦的弹层服务-dialogservice)
  - [3.6 事件聚合器 (EventAggregator) 的极致运用](#36-事件聚合器-eventaggregator-的极致运用)
  - [3.7 进阶架构解耦：模块化应用树 (Modularity)](#37-进阶架构解耦模块化应用树-modularity)
- [四、 总结：从轻量跨平台到重工业巨构的进阶法则](#四-总结从轻量跨平台到重工业巨构的进阶法则)

---

## 一、 为什么 Avalonia 官方原生拥抱 ReactiveUI？

传统 WPF 或旧版 UWP 开发者习惯了手写无尽的 `INotifyPropertyChanged`，并在命令里穿插 `CanExecute` 的判断，然后在后台 Task 任务中与 `Dispatcher.Invoke` 搏斗。
当你面对类似“如何实现打字时如果停顿0.5秒才发网络请求”、“如何监控5个独立输入框的数据决定提交按钮的可用性”、“如何在后台任务报错时拦截处理界面，并且在加载时按钮转圈禁用”等需求时，你会发现传统 MVVM 写出的代码像一座包含大量 `if/else` 的屎山。

**ReactiveUI 解决的痛点：**
它是基于 **函数响应式编程 (FRP)** 和 Rx.NET 的大成之作。
1. **统一数据流 (Everything is a Stream)**：用户的点击操作、计时器、属性的变化事件，全都可以被抽象为 `IObservable<T>` 热流。
2. **Avalonia 的底层契合**：Avalonia 的依赖属性与附加属性本身就暴露了 `GetObservable` 和 `Bind` API，完美呼应 ReactiveUI，让你在 View 和 ViewModel 层中实现 100% 连贯的流式开发。

---

## 二、 ReactiveUI 核心实战：从属性到命令的全景 API

想要打通 Avalonia 的任督二脉，必须掌握 ReactiveUI 最核心的四大板块。请先引入 `Avalonia.ReactiveUI` NuGet 库。

### 2.1 响应式对象基石：ReactiveObject 与底层机制

它是替代 `INotifyPropertyChanged` 的绝对核心。所有的 ViewModel 都必须继承它。

#### A. 经典写法 API: `RaiseAndSetIfChanged`
这个方法不仅帮我们抛出了通知，它内部还做了一次 `EqualityComparer<T>.Default.Equals`。如果新赋的值和旧值一致，它会直接掐断赋值和通知，天然节省内存并避免死循环更新：

```csharp
using ReactiveUI;

public class UserViewModel : ReactiveObject
{
    private string _userName;
    public string UserName
    {
        get => _userName;
        // API: bool RaiseAndSetIfChanged<TObj, TRet>(ref TRet backingField, TRet newValue)
        // 只有值改变才会返回 True，并对外广播 [PropertyChanged] 信号
        set => this.RaiseAndSetIfChanged(ref _userName, value);
    }
}
```

#### B. 现代写法：结合 Source Generators `[Reactive]` 宏特性
如果在极为庞大的表单页面，手写几十个 private backing field 是要命的。ReactiveUI 推荐安装基于源生成器的附加包 `ReactiveUI.Fody` 构建代码织入。
引用后，所有的属性只需要一行代码：

```csharp
public class UserViewModel : ReactiveObject
{
    // 在编译时，Fody 会全自动将其转化为带 RaiseAndSetIfChanged 的完整形态！
    [Reactive] public string UserName { get; set; }
    [Reactive] public int Age { get; set; }
    [Reactive] public bool IsVip { get; set; }
}
```

### 2.2 ReactiveCommand 异步命令深度剖析

`ReactiveCommand` 是对传统 `ICommand` 的降维打击。它将命令彻底分解为了两个层面：“何时能执行”、“执行内部流状态监控”。

#### A. ReactiveCommand 的创建 API 体系
它不能直接 `new` 出来，所有命令通过 `ReactiveCommand.CreateXXX` 静态工厂构建：

*   **`Create(Action execute, IObservable<bool> canExecute)`**：创建没有参数也没有返回值的同步动作。
*   **`CreateFromTask(Func<Task> execute, IObservable<bool> canExecute)`**：专治各种异步 Web API 请求！它不仅帮你把异常吃掉发给特定流，它还会在执行 Task 时，“锁死” 这个命令，让前台按钮自动 Disable（防重复点击），等 Task 结束后重新解开！
*   **`CreateFromObservable`**：针对高级玩家，直接抛出/接收 Rx 数据流。

**全场景使用范例：带条件的复杂登陆命令**
```csharp
public class LoginViewModel : ReactiveObject
{
    // 第一个参数是输入(TParam)，第二个参数是该任务完成的返回值(TResult)
    public ReactiveCommand<Unit, bool> LoginCmd { get; }

    [Reactive] public string Account { get; set; }
    [Reactive] public string Password { get; set; }

    public LoginViewModel()
    {
        // 构建 IObservable<bool> 控制流，后面章节详细解释 WhenAnyValue
        var isInputValid = this.WhenAnyValue(
            vm => vm.Account,
            vm => vm.Password,
            (acc, pwd) => !string.IsNullOrEmpty(acc) && pwd?.Length >= 6);

        // 绑定流，如果 input 不 valid，命令不可用；并且点击时进入防抖等待
        LoginCmd = ReactiveCommand.CreateFromTask<Unit, bool>(async _ =>
        {
            await Task.Delay(2000); // 假装请求 API 网络阻塞
            return Account == "admin" && Password == "123456";
        }, isInputValid);

        // 高级 API 1: 执行状态监控，实时更新给 UI 比如“大马猴加载圈”！
        LoginCmd.IsExecuting.Subscribe(isRunning => 
        {
            Console.WriteLine(isRunning ? "网络请求中，按钮已自动禁用..." : "请求结束！");
        });

        // 高级 API 2: 接管错误流（防止 Task 崩溃炸掉整个应用）
        LoginCmd.ThrownExceptions.Subscribe(ex => 
        {
            Console.WriteLine($"糟糕，崩溃了被我拦截了: {ex.Message}");
        });
    }
}
```

### 2.3 ObservableAsPropertyHelper (OAPH)：只读派生属性的推荐方案

传统 MVVM 让人痛苦的场景：`FirstName` 和 `LastName`，你要一个只读的前台属性 `FullName`。在以往，你必须分别监听 FirstName 和 LastName，手写 `PropertyChanged("FullName")`，逻辑丑陋。

ReactiveUI 提供了 **OAPH：基于流派生只读属性** 的核心方法：`ToProperty()`。

```csharp
public class ProfileViewModel : ReactiveObject
{
    [Reactive] public string FirstName { get; set; }
    [Reactive] public string LastName { get; set; }

    // OAPH 专门用来包装只读依赖属性
    private readonly ObservableAsPropertyHelper<string> _fullNameOaph;
    public string FullName => _fullNameOaph.Value;

    public ProfileViewModel()
    {
        // 将两者的流合并后，直接转为依赖属性挂载到 FullName 上
        // 只要源头属性发生任何变故，这个流会自动往下奔涌刷新！
        _fullNameOaph = this.WhenAnyValue(
                x => x.FirstName, 
                x => x.LastName, 
                (first, last) => $"{first} {last}")
            .ToProperty(this, x => x.FullName);
    }
}
```

### 2.4 神级监听与数据流转变幻：WhenAnyValue 核心原理

`WhenAnyValue` 是你在业务逻辑层面写得最多、最依赖的核心 API。它的作用是：**把类实例普通属性的值变化，包装成为一条源源不断的 Rx 观察流水线**。

并且由于它返回的类型是原生的 `IObservable<T>`，所以你可以大胆且随意地使用 System.Reactive 自带的所有 LINQ 高级操作符！

**超全链路高频查询场景实战（包括过滤、防抖、安全处理截断）：**
```csharp
public SearchViewModel()
{
    this.WhenAnyValue(x => x.SearchKeyword)
        // 1. 数据清洗：如果输入是 null 或纯空格，直接剪断这条水流，不往下走了
        .Where(keyword => !string.IsNullOrWhiteSpace(keyword)) 
        
        // 2. 高频防抖：当用户正在疯狂按键盘键盘时暂停，等停止键入半秒(500ms)后才释放水流
        .Throttle(TimeSpan.FromMilliseconds(500)) 
        
        // 3. 值去重：如果拦截后的词，跟上一次查的词完全一样（可能是复制粘贴或撤销），滤除不搜！
        .DistinctUntilChanged() 
        
        // 4. 调用 API 并转化为结果流。使用 SelectMany 把异步任务展平压入主线！
        .SelectMany(async term => await ApiService.SearchAsync(term))
        
        // 5. 跨线程转接：极其重要！！上面的网络请求处于后台线程，直接赋值前端必崩。
        // 用 ObserveOn 把后续的流处理强行拉回到 Avalonia 的 UI 主线程。
        .ObserveOn(RxApp.MainThreadScheduler) 
        
        // 6. 水流终点端：执行最终动作或者赋值
        .Subscribe(searchResults => 
        {
            this.ResultList = searchResults;
        });
}
```

### 2.5 ReactiveUI 结合 DynamicData 进行巨量集合管理

在 Avalonia 原生中依然保留了 `ObservableCollection`，但它是一个极其危险和低效率的集合组件（你对它排序、批量新增一万条数据时，它会不断散发 `CollectionChanged` 甚至直接让渲染引擎瘫痪）。
ReactiveUI 极度推崇搭配 **`DynamicData`** 库处理海量数据容器交互。

**核心原理：**使用底层集合（SourceList 或 SourceCache）存数据，通过 Connect() 取条数据流，进行 Sort/Filter ，最后 Bind() 进一份 UI 专用给前端看！

```csharp
using DynamicData;
using DynamicData.Binding; // 包含 Bind() 

public class DataViewModel : ReactiveObject
{
    // 系统内部的线程安全底层库
    private readonly SourceList<UserEntity> _usersSource = new SourceList<UserEntity>();

    // 给 Avalonia 绑定的 UI 展示列表！完全只读。
    private readonly ReadOnlyObservableCollection<UserEntity> _usersView;
    public ReadOnlyObservableCollection<UserEntity> UsersView => _usersView;

    public DataViewModel()
    {
        // 将底层核心连接成管道流，处理后抛给 UI
        var subscription = _usersSource.Connect()
            // 在这层管道做条件筛选
            .Filter(user => user.Age >= 18)
            // 在管道里按 Name 进行排序
            .Sort(SortExpressionComparer<UserEntity>.Ascending(u => u.Name))
            // 确保同步给前端这一刻必须回到 UI 线程！
            .ObserveOn(RxApp.MainThreadScheduler)
            // 将过滤后的只读镜像绑定给界面变量！
            .Bind(out _usersView)
            .Subscribe(); 
        
        // 数据添加：
        // 执行 AddRange，界面不会像源生 OC 那样刷新 100 遍界面，而是内部打平高效刷新 1 次！
        _usersSource.AddRange(new [] { new UserEntity{Name="A", Age=20}, new UserEntity{Name="B"} });
    }
}
```

---

## 三、 进阶扩展：Avalonia 与 Prism 框架的微核架构搭建

对于常规工具型甚至小型应用，上面的 `ReactiveUI` 已经完全可以让你写出性能爆炸的跨平台客户端。但**真正的巨头系统**（比如一套庞大的银行管理软件，左侧各种导航树、几十个弹弹窗、上百个各自独立的插件程序集互斥存在），仅有响应流还远远不够。

这就是老牌王者 **Prism**（通过社区衍生开源版本 `Prism.DryIoc.Avalonia`）出现的使命！当两者合并，你将会获得：**ReactiveUI 主导细胞活性与属性计算响应** + **Prism 主导骨骼框架、生命周期路由拆解与外挂插拔！**

### 3.1 Prism in Avalonia：定位与核心价值
在双剑合璧架构中，Prism 的使用绝不污染 ReactiveUI。Prism 的任务极专一：
1. **彻底分离 UI 代码和加载机制**（Modularity 模块化技术）。
2. 把大屏幕切成方格子，往格子里丢模块页面（Region 划分与 View Injection）。
3. 让 ViewModelA 在不认识 ViewModelB 的情况下可以呼叫/传递参数给它（EventAggregator 与 Navigation 参数）。

### 3.2 启动接管与依赖注入底座 (DryIoc) API
Prism 在 Avalonia 中的引入步骤极度统一：从原本普通的 Application 接盘。

**修改 `App.axaml` 基类头：**
```xml
<!-- xmlns:prism="" 引入基类命名空间 -->
<prism:PrismApplication xmlns="https://github.com/avaloniaui"
                        xmlns:prism="http://prismlibrary.com/"
                        x:Class="MyPrismApp.App">
```

**修改 `App.axaml.cs`（核心 API 使用解析）：**
所有的模块系统、依赖单例必须在复写方法中集中处理。
```csharp
public partial class App : PrismApplication
{
    // 必须要被调用，以初始化 Avalonia 原生系统底座
    public override void Initialize()
    {
        AvaloniaXamlLoader.Load(this);
        base.Initialize(); // 由 Prism 包接管启动构建
    }

    // Prism 的启动核心：定义应用的 Shell(最外的大壳子主窗体)
    protected override AvaloniaObject CreateShell()
    {
        // 必须使用 IoC 容器产生主窗口。这让该窗口依赖注入进来的 VM 或服务全自动解析出来。
        return Container.Resolve<MainWindow>();
    }

    // Prism 的重头戏：所有的依赖解耦在此集中配置
    protected override void RegisterTypes(IContainerRegistry containerRegistry)
    {
        // 核心API：RegisterSingleton (一直存活单例对象)
        containerRegistry.RegisterSingleton<IGlobalSettings, GlobalSettings>();
        
        // 核心API：Register (瞬态对象，每次要的时候都 New 一个全新的)
        containerRegistry.Register<IHeavyCalculator, HeavyCalculator>();

        // 核心API：RegisterForNavigation 注册可以在大纲窗体中来回推入替换的可跳转“视图页面”。
        // 当你不传第二个参数时，默认叫页面本来的名字(如 "UserListView")作为跳转秘钥。
        containerRegistry.RegisterForNavigation<UserListView, UserListViewModel>("UsersPage");
    }
}
```

### 3.3 区域管理器 (RegionManager) 深度讲解
区域 `Region` 是 Prism 将视图分离出去的神奇容器。你可以在 MainWindow 等母窗体里挖坑。

**在 XAML 里挖坑并起名 API:**
在 Avalonia 中，一般拿 `ContentControl` (单页面容器) 或者 `ItemsControl` (多重集合页，例如 TabControl 的内核) 作为区域适配器。

```xml
<Window ... xmlns:prism="http://prismlibrary.com/">
    <SplitView IsPaneOpen="True" DisplayMode="Inline">
        <SplitView.Pane>
            <!-- 挖出名为"MenuRegion"的坑！ -->
            <ContentControl prism:RegionManager.RegionName="MenuRegion" />
        </SplitView.Pane>

        <SplitView.Content>
            <!-- 挖出右侧主展示区，名叫"MainRegion" -->
            <TransitioningContentControl prism:RegionManager.RegionName="MainRegion" />
        </SplitView.Content>
    </SplitView>
</Window>
```

**后台操作的 API：向坑内注射子视图（View Injection）**
你只需要拿到接口类型是 `IRegionManager` 的对象（比如 ViewModel 构建时由构造函数拿），随后发射即可定点挂载：

```csharp
public class MainWindowViewModel : ReactiveObject
{
    public MainWindowViewModel(IRegionManager regionManager)
    {
        // API1: 直接粗暴在坑位里挂载一次这个对象，通常于启动时挂载左侧菜单面板。不维护历史。
        regionManager.RegisterViewWithRegion("MenuRegion", typeof(LeftMenuView));
    }
}
```

### 3.4 路由系统 (Navigation) 的全场景使用机制
上面的方法通常解决静态区域。想要像网页浏览器一样在多个后台列表组件之间互跳、前进后退并传值，必须使用大发明的 `Navigation` 流：

#### A. 基础跳转 API:`RequestNavigate` 与 `NavigationParameters`

```csharp
// 在侧边栏导航控件的 VM 中我们拿到参数：
var parameters = new NavigationParameters
{
    { "DepartmentId", 1024 },
    { "RoleInfo", new RoleSession{ Name="Admin" } } // 支持传递复杂实体对象类型！
};

// 指定大主干网 "MainRegion"，向内部推送名叫 "UsersPage" 的用户列表，同时抛掷出降落伞参数包！
_regionManager.RequestNavigate("MainRegion", "UsersPage", parameters);
```

#### B. 拦截与响应：`INavigationAware` 全生命周期
被跳转到的 `UserListViewModel` 需要感知发生了跳转事件。此时因为它是底层继承了 `ReactiveObject` 的 ReactiveUI 模型，毫不冲突，再叠加一个接口 `INavigationAware` 即可。

```csharp
public class UserListViewModel : ReactiveObject, INavigationAware
{
    // API 1: 新页面被推挤落地后执行！处理上个跳转地发来的包袱。
    public void OnNavigatedTo(NavigationContext navigationContext)
    {
        // 从上下文中检索获取强类型参数
        if (navigationContext.Parameters.TryGetValue<int>("DepartmentId", out var depId))
        {
           LoadDataReactiveMethod(depId);
        }
    }

    // API 2: 设置是否复用本页生命周期
    // 如果返回 True：以后只要跳进你的页面，不需要走容器重新 new 构造函数，继续用这旧壳子；这就做了大页面的缓存效果。
    // 如果返回 False：每次按导航栏，只要路由进来就生成一个新的类对象替换。
    public bool IsNavigationTarget(NavigationContext navigationContext) => true;

    // API 3: 从当前页面要离开，前往别的地方的时候触发调用，可写暂存等逻辑。
    public void OnNavigatedFrom(NavigationContext navigationContext) { }
}
```

#### C. 路由守卫拦截网防手滑 API：`IConfirmNavigationRequest`
如果用户在当前表单填写了大量内容或者网络没有保存的时候点了返回或者切换，你需要拦截下该路由！只需要继承自带的守卫：
```csharp
public class FormViewModel : ReactiveObject, IConfirmNavigationRequest
{
    // 相较于上面的Aware，额外增加一个必须实现的打断方法：
    public void ConfirmNavigationRequest(NavigationContext context, Action<bool> callback)
    {
        bool allowed = ShowUnsavedChangesDialogAndCheck();
        
        // 这决定了你的路由！回调 false，这辈子也别想切走；回调 true 立即允许放行！
        callback(allowed);
    }
}
```

#### D. 后退与历史管理 API：`IRegionNavigationJournal`
Prism 会自建浏览器模型，它内置在 上下文中。
```csharp
public void OnNavigatedTo(NavigationContext context)
{
    // 把日记本拿到，赋值给你的私有变量或者绑给按钮
    var journal = context.NavigationService.Journal;
    
    // API 大全：
    bool test1 = journal.CanGoBack; // 当前上方有没有回退页？
    bool test2 = journal.CanGoForward; // 能不能前进栈堆？
    journal.GoBack(); // 执行后退！回退上个组件！
    journal.Clear(); // 核心：用户一旦登入成功进系统，把外面的所有登录页等历史一巴掌全部清除不留痕。
}
```

### 3.5 绝对解耦的弹层服务 (DialogService)
如果在一个大型框架里你在普通业务内写 `new Window().ShowDialog()` 这就成了严重破坏封装和跨平台的灾难代码（在 WebAssembly 里会更惨重）。
必须用 Prism 控制抽象依赖：`IDialogService`。

**步骤1：注册弹窗组件**
在 `App.axaml.cs` 下面不使用 RegisterForNavigation 而是使用专有的：
```csharp
containerRegistry.RegisterDialog<WarnAlertView, WarnAlertViewModel>("WarnAlert");
```

**步骤2：ViewModel 必须实现弹窗接口 `IDialogAware`**
```csharp
public class WarnAlertViewModel : ReactiveObject, IDialogAware
{
    public string Title => "危险弹层";

    // 这个动作事件是由 Prism 派发的关闭触发钩子，当你要关掉自己时必须 Invoke 告诉它结果。
    public event Action<IDialogResult> RequestClose;

    // 接参数弹开窗：
    public void OnDialogOpened(IDialogParameters parameters) { }
    
    public bool CanCloseDialog() => true;
    public void OnDialogClosed() { }

    // 你可以用 ReactiveCommand 调用它来手动提交结束整个弹窗的归宿
    public void HandleCloseMeLogic()
    {
        // 送出返回包裹对象：ButtonResult(OK/Cancel...) 以及 DialogParameters 回传结果给召唤你的底层系统。
        var res = new DialogResult(ButtonResult.OK);
        RequestClose?.Invoke(res);
    }
}
```

**步骤3：普通页面执行呼叫：**
```csharp
// _dialog 注入拿来的 IDialogService
_dialog.ShowDialog("WarnAlert", new DialogParameters{ {"msg","断网拉！"} }, result => 
{
    if(result.Result == ButtonResult.OK) { 
        // 别人按了关闭弹窗并且确认了！
    }
});
```
*(注：另外还有一个 `Show(…)` API 用在展示无模式、可以继续跟后边背景互动的提示弹出层)*。

### 3.6 事件聚合器 (EventAggregator) 的极致运用
有些界面处于两重天完全隔接的情况下（你在播放音乐控件点击了切歌，全局桌面底部的歌词栏目需要换字）。
请不用乱绑静态变量，而是靠 EventAggregator 全局集线器发包：

**1.定义一个广播频道类（基于 `PubSubEvent<类型>`）：**
```csharp
public class SongChangedEvent : PubSubEvent<SongModel> { }
```

**2. 在底座（例如播放控制器）无脑发推广播 API：**
```csharp
// _eventAggr 注入的 IEventAggregator
_eventAggr.GetEvent<SongChangedEvent>().Publish(new SongModel(id:112));
```

**3. 在不认识彼此的接收页面（侧栏歌词等）收听雷达 API：**
```csharp
_eventAggr.GetEvent<SongChangedEvent>().Subscribe(
    payload => { /* 开始改变前台歌词状态更新 ViewModel... */ },
    
    // 高级 API 选项1：由于可能发起线程是在后端查询库里，通知你直接切换在 Avalonia 界面层执行处理：
    ThreadOption.UIThread,
    
    // 高级 API 选项2：是否保留对订阅者的强引用？一般选 false 做弱引用，不怕页面死循环销毁不了。
    false,
    
    // 高级 API 选项3：只有发生什么样的特指内容你才关心并继续拦截动作？过滤管道！
    song => song.Duration > 60 // 过滤掉小于 60 秒的数据
);
```
*(注意：也可以使用 ReactiveUI 提供的系统内核即 `MessageBus.Current.SendMessage(...)`。在多半情境下两者可平替，但基于 Prism 生态大型开发大家更偏向于 `EventAggregator`)*。

### 3.7 进阶架构解耦：模块化应用树 (Modularity)
大型 Avalonia 甚至可以允许一个上层的团队完全看不到底层的代码。我们可以将其拆给单独独立在外的类库 (DLL) 以便插件式热插拔，这就构建了插拔式微内核架构系统。

比如有个类库项目：`CometApp.FinanceModule.dll` 负责财务功能。

**模块类创建与接管 API：**
在这个庞大 DLL 内新建一个实现接口： `IModule` 的首脑类：
```csharp
using Prism.Ioc;
using Prism.Modularity;
using Prism.Regions;

public class FinanceModule : IModule
{
    // A. 第一个生命周期触发：该 DLL 的地皮在此向主系统统揽地登记自己的子服务和内部单独导航的窗口！
    public void RegisterTypes(IContainerRegistry containerRegistry)
    {
        containerRegistry.RegisterForNavigation<InvoiceView>("InvoiceBoard");
        containerRegistry.RegisterSingleton<ITaxApiService, TaxApiService>();
    }

    // B. 第二个初始化生命周期触发：已经准备就绪时；用于干啥？
    // 用于拿总装的 RegionManager 神不知鬼不觉把 DLL 内专属私有按钮页面塞进全局菜单的坑！！
    public void OnInitialized(IContainerProvider containerProvider)
    {
        var regions = containerProvider.Resolve<IRegionManager>();
        
        // 全世界的挂载主程序甚至不用这个界面长啥样，模块自动去主界面侧边栏里安插了自己的财务专用图标与列表！
        regions.RegisterViewWithRegion("GlobalSidebarRegion", typeof(FinanceIconBtnView));
    }
}
```

**宿主挂载调用 API (ModuleCatalog)：**
在宿主程序的 `App.axaml.cs` 配置该模块如何挂进系统运转树中：
```csharp
protected override void ConfigureModuleCatalog(IModuleCatalog moduleCatalog)
{
    // 方式1：强引用（主项目在代码里直接 Add Reference 依赖了这个分库）
    moduleCatalog.AddModule<FinanceModule>();
}

// 方式2的黑科技API：基于动态抛目录无引用的极致加载！！！
// 主程序不写死引用代码！所有的团队自己编译了自己的 .dll 后直接甩到一个 "Plugins" 物理文件夹就能直接接管激活功能！！
protected override IModuleCatalog CreateModuleCatalog()
{
    // 此目录扫描将在启动期载入插件加载入一切路由及模块类库中提供的资源分配！
    return new DirectoryModuleCatalog() { ModulePath = @".\Plugins" };
}
```

---

## 四、 总结：从轻量跨平台到重工业巨构的进阶法则

Avalonia 是一款极高灵活度的生态霸主。在此体系下：
*   **基础阶段工具型应用选型：** 只需搭载 **ReactiveUI 生态** (`ReactiveObject，ReactiveCommand，Subscribe，Bind`) 辅以基础的内置窗体调用。它天生拥抱 Avalonia 系统中的所有附加绑定结构，能够极短平快地生成极为清晰数据流的纯 C# 系统，大幅度避免多线程污染和状态通知垃圾逻辑堆砌。
*   **中大型进阶或商业工业级项目架构选型：** 以 **Prism 极其成熟的企业级标准**为“架构骨干”，统筹着 `Modularity` (分拆 DLL 跨组协同微前端) 的生杀大权，调动 `RegionManger` 将模块嵌入各个位置，然后依赖 `DialogService` 断开各方层级硬弹窗纠缠；在所有 ViewModel 当中使用 **ReactiveUI 当作计算心脏或处理灵魂**，发挥一切高吞吐量及 IO 控制的 Rx 功能。这是在 2026 后大型 .NET 跨平台客户端中最完美的满分教科书方案解！
