---
layout: post
title:  "WPF 标准化开发流程与核心组件解析"
subtitle: "基于泛型主机与现代化 NuGet 包的工业级 WPF 架构指南"
date:   2026-03-15 10:00:00 +0800
author:     "Comet"
categories: WPF Architecture
header-style: text
tags:
    - WPF
    - C#
    - .NET
    - MVVM
    - HandyControl
    - SqlSugar
    - Architecture
---

# WPF 标准化开发流程与核心组件解析

在现代桌面开发环境（.NET 8/9+）下，构建一个可维护、高性能且具有企业级稳定性的 WPF 应用，不再仅仅是拖拽控件，而是需要一套严谨的解耦架构。

本文将围绕一份工业级的公开示例仓库 [GitHub 仓库地址：Meteor-Comet/WPF_Standard_Development](https://github.com/Meteor-Comet/WPF_Standard_Development.git) 展开，深度解析构建现代 WPF 项目必备的 10 大核心 NuGet 组件及高阶拓展。

---

# WPF 项目 NuGet 包说明

---

## 1. CommunityToolkit.Mvvm `8.4.1`

### 作用
微软官方 MVVM 框架，通过**源生成器**在编译期自动生成属性和命令代码，大幅减少样板代码。

### 涉及代码

**自动生成属性（替代手写 INotifyPropertyChanged）**
```csharp
// 不需要再手写 ViewModelBase，直接继承 ObservableObject
public partial class UserListViewModel : ObservableObject
{
    // [ObservableProperty] 自动生成完整属性 + OnPropertyChanged
    [ObservableProperty]
    private string _searchKeyword;

    [ObservableProperty]
    private List<User> _userList;

    [ObservableProperty]
    private bool _isLoading;
}
// 编译期自动生成等价代码：
// public string SearchKeyword
// {
//     get => _searchKeyword;
//     set => SetProperty(ref _searchKeyword, value);
// }
```

**自动生成命令（替代手写 RelayCommand）**
```csharp
// [RelayCommand] 自动生成对应的 RelayCommand
[RelayCommand]
private void Search()
    => UserList = _userService.GetUsers(SearchKeyword);

[RelayCommand]
private async Task LoadAsync()
{
    IsLoading = true;
    UserList = await _userService.GetUsersAsync();
    IsLoading = false;
}
// 自动生成等价代码：
// public IRelayCommand SearchCommand => ...
// public IAsyncRelayCommand LoadCommand => ...
```

**XAML 绑定不变**
```xml
<TextBox Text="{Binding SearchKeyword}"/>
<Button Command="{Binding SearchCommand}"/>
```

### 进阶补充

**partial 关键字是必须的**

源生成器需要在另一个文件里生成代码，所以 ViewModel 必须是 `partial` 类：
```csharp
// ✅ 必须加 partial，源生成器才能在编译期追加生成的代码
public partial class UserListViewModel : ObservableObject { }

// ❌ 不加 partial，源生成器无法工作，编译报错
public class UserListViewModel : ObservableObject { }
```

**属性变更通知钩子**

`[ObservableProperty]` 生成的属性变更时，可以通过约定方法名监听：
```csharp
[ObservableProperty]
private string _searchKeyword;

// 命名约定：On{属性名}Changed，属性变更时自动调用
partial void OnSearchKeywordChanged(string value)
{
    // SearchKeyword 变化时自动触发搜索
    SearchCommand.Execute(null);
}
```

**命令的 CanExecute**

控制命令是否可以执行，自动联动按钮的 `IsEnabled`：
```csharp
[ObservableProperty]
private User? _selectedUser;

// CanExecute：只有选中用户才能删除
[RelayCommand(CanExecute = nameof(CanDelete))]
private void Delete()
    => _userService.Delete(SelectedUser!.Id);

private bool CanDelete() => SelectedUser != null;

// 当 SelectedUser 变化时，通知命令重新判断 CanExecute
partial void OnSelectedUserChanged(User? value)
    => DeleteCommand.NotifyCanExecuteChanged();
```

**ObservableValidator（带验证的 ViewModel）**
```csharp
// 继承 ObservableValidator 支持数据验证
public partial class LoginViewModel : ObservableValidator
{
    [ObservableProperty]
    [Required(ErrorMessage = "用户名不能为空")]
    [MinLength(3, ErrorMessage = "用户名至少3位")]
    private string _userName = string.Empty;

    [ObservableProperty]
    [Required(ErrorMessage = "密码不能为空")]
    private string _password = string.Empty;

    [RelayCommand]
    private void Login()
    {
        // 触发所有属性验证
        ValidateAllProperties();
        if (HasErrors) return;  // 有验证错误就不继续

        // 验证通过，执行登录逻辑
    }
}
```

**Messenger（跨 ViewModel 通信）**
```csharp
// 定义消息类型
public record UserLoggedInMessage(User User);

// 发送消息（LoginViewModel）
WeakReferenceMessenger.Default.Send(new UserLoggedInMessage(user));

// 接收消息（MainViewModel）
public partial class MainViewModel : ObservableRecipient
{
    public MainViewModel()
    {
        IsActive = true;  // 激活消息接收
    }

    // 自动注册，收到消息时触发
    protected override void OnActivated()
        => Messenger.Register<UserLoggedInMessage>(this, (_, msg) =>
        {
            CurrentUserName = msg.User.UserName;
        });
}
```

---

## 2. HandyControl `3.5.1`

### 作用
国内流行的 WPF UI 组件库，提供大量开箱即用的美观控件和样式。

### 涉及代码

**引入命名空间**
```xml
xmlns:hc="https://handyorg.github.io/handycontrol"
```

**常用控件示例**
```xml
<!-- 带圆角的边框 -->
<Border hc:BorderElement.CornerRadius="8"/>

<!-- 带图标的输入框 -->
<hc:TextBox hc:InfoElement.Placeholder="请输入用户名"
            hc:InfoElement.ShowClearButton="True"/>

<!-- 加载动画 -->
<hc:LoadingCircle IsRunning="{Binding IsLoading}"/>
```

```csharp
// 消息提示
Growl.Success("操作成功！");
Growl.Error("操作失败！");
Growl.Warning("请注意！");

// 确认弹窗
Growl.Ask("确认删除？", result =>
{
    if (result) DeleteUser();
    return true;
});
```

### 进阶补充

**App.xaml 引入主题（必须配置）**
```xml
<Application.Resources>
    <ResourceDictionary>
        <ResourceDictionary.MergedDictionaries>
            <hc:ThemeResources/>
            <hc:Theme/>
        </ResourceDictionary.MergedDictionaries>
    </ResourceDictionary>
</Application.Resources>
```

**主题切换**
```csharp
// 切换到暗色主题
var dark = new ResourceDictionary
{
    Source = new Uri("pack://application:,,,/HandyControl;component/Themes/SkinDark.xaml")
};
Application.Current.Resources.MergedDictionaries.Add(dark);
```

**附加属性（HandyControl 扩展原生控件）**
```xml
<!-- 给原生 TextBox 加占位符、清除按钮、标题 -->
<TextBox hc:InfoElement.Placeholder="请输入..."
         hc:InfoElement.ShowClearButton="True"
         hc:InfoElement.Necessary="True"
         hc:InfoElement.Title="用户名"/>

<!-- 给原生 Button 加图标 -->
<Button hc:IconElement.Geometry="{StaticResource SearchGeometry}"
        Content="搜索"/>
```

---

## 3. Microsoft.Extensions.Configuration.Json `10.0.5`

### 作用
让程序能读取 `appsettings.json` 配置文件，提供 `AddJsonFile()` 和 `SetBasePath()` 方法。

### 涉及代码

```csharp
.ConfigureAppConfiguration((_, config) =>
{
    // SetBasePath：设置配置文件的根目录
    // AppContext.BaseDirectory → 程序运行目录（bin/Debug/net8.0/）
    config.SetBasePath(AppContext.BaseDirectory);

    // AddJsonFile 参数说明：
    // optional: false     → 文件不存在时抛出异常（必须存在）
    // optional: true      → 文件不存在时忽略（可选文件）
    // reloadOnChange: true → 文件改变时自动重新加载（热更新）
    config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
})
```

**appsettings.json 对应结构**
```json
{
  "Database": {
    "ConnectionString": "Server=.;Database=MyDb;Trusted_Connection=True;",
    "DbType": "SqlServer"
  },
  "App": {
    "Title": "我的WPF应用",
    "PageSize": 20
  }
}
```

### 进阶补充

**多环境配置**
```csharp
.ConfigureAppConfiguration((context, config) =>
{
    config.SetBasePath(AppContext.BaseDirectory);

    // 基础配置（所有环境共用）
    config.AddJsonFile("appsettings.json", optional: false);

    // 环境特定配置（覆盖基础配置中的同名项）
    // context.HostingEnvironment.EnvironmentName 读取环境变量 DOTNET_ENVIRONMENT
    config.AddJsonFile(
        $"appsettings.{context.HostingEnvironment.EnvironmentName}.json",
        optional: true);  // 环境文件可以不存在

    // 还可以读取环境变量（优先级最高）
    config.AddEnvironmentVariables();
})

// 文件结构示例：
// appsettings.json              → 公共配置
// appsettings.Development.json  → 开发环境（测试数据库、详细日志）
// appsettings.Production.json   → 生产环境（正式数据库、精简日志）
```

**配置优先级（从低到高）**
```
appsettings.json
    ↓ 被覆盖
appsettings.{Environment}.json
    ↓ 被覆盖
环境变量
    ↓ 被覆盖
命令行参数（优先级最高）
```

**直接读取配置（不绑定类）**
```csharp
public class SomeService(IConfiguration config)
{
    public void DoSomething()
    {
        // 读取单个值，冒号分隔层级
        var connStr = config["Database:ConnectionString"];

        // 读取整个节点
        var section = config.GetSection("Database");
        var dbType = section["DbType"];
    }
}
```

**IOptions 的三种形态**
```csharp
// IOptions<T>         → 单例，程序启动时读一次，不会热更新
// IOptionsSnapshot<T> → 每次请求重新读（WPF 里用得少）
// IOptionsMonitor<T>  → 实时监听配置变化（需要 reloadOnChange: true）

public class UserService(IOptionsMonitor<DatabaseConfig> monitor) : IUserService
{
    public void Connect()
    {
        // 每次调用都是最新配置，配置文件改了会自动更新
        var config = monitor.CurrentValue;
        Console.WriteLine(config.ConnectionString);
    }
}
```

---

## 4. Microsoft.Extensions.DependencyInjection `10.0.5`

### 作用
微软官方 DI 容器，提供服务注册（`IServiceCollection`）和服务解析（`IServiceProvider`）。

### 涉及代码

**服务注册**
```csharp
services.AddSingleton<IUserService, UserService>();   // 单例
services.AddTransient<UserListViewModel>();            // 瞬态
services.AddSingleton<INavigationService, NavigationService>();
```

**服务解析**
```csharp
var userService = provider.GetRequiredService<IUserService>();
var viewModel = provider.GetRequiredService<UserListViewModel>();
```

**构造函数自动注入**
```csharp
// 容器自动分析构造函数，递归创建所有依赖
public class UserService(IUserRepository repo, ILogger<UserService> logger) : IUserService
{
    // 容器自动创建 repo 和 logger 并传进来
}
```

### 进阶补充

**三种生命周期对比**
```
Singleton  → 整个程序只创建一次，所有人共用同一个实例
             适合：Service、Repository、NavigationService

Transient  → 每次从容器获取都创建新实例
             适合：ViewModel（每次打开页面都是新状态）

Scoped     → 同一个作用域内共用，不同作用域各自创建
             WPF 里用得少，Web 里一个 HTTP 请求一个作用域
```

**Captive Dependency（捕获依赖）陷阱**
```csharp
// ❌ 危险：Singleton 持有了 Transient
// UserRepository 是 Transient，但被 Singleton 的 UserService 永久持有
// 这个 repo 实例永远不会释放，事实上变成了 Singleton
services.AddSingleton<UserService>();
services.AddTransient<UserRepository>();
public class UserService(UserRepository repo) { }  // ← 危险

// ✅ 解决方案1：统一改成 Singleton（最简单）
services.AddSingleton<UserRepository>();

// ✅ 解决方案2：通过工广每次取新实例
public class UserService(IServiceProvider provider) : IUserService
{
    public List<User> GetUsers()
    {
        var repo = provider.GetRequiredService<IUserRepository>();
        return repo.GetAll();
    }
}
```

**注册已有实例 / 工厂方式注册**
```csharp
// 把已经创建好的实例注册进去
var config = new AppConfig { Title = "MyApp" };
services.AddSingleton(config);

// 工厂方式注册（需要自定义创建逻辑时）
services.AddSingleton<IUserService>(provider =>
{
    var repo = provider.GetRequiredService<IUserRepository>();
    var logger = provider.GetRequiredService<ILogger<UserService>>();
    return new UserService(repo, logger);
});
```

**注册多个实现（同一接口）**
```csharp
// 注册多个实现
services.AddSingleton<IValidator, NameValidator>();
services.AddSingleton<IValidator, AgeValidator>();
services.AddSingleton<IValidator, EmailValidator>();

// 获取所有实现
public class UserService(IEnumerable<IValidator> validators) : IUserService
{
    public bool Validate(User user)
        => validators.All(v => v.Validate(user));
}
```

---

## 5. Microsoft.Extensions.Hosting `10.0.5`

### 作用
泛型主机，整合 DI、配置、日志、生命周期管理为一套统一框架，是整个项目的基础设施核心。

### 涉及代码

**App.xaml.cs 完整配置**
```csharp
_host = Host.CreateDefaultBuilder()
    .ConfigureAppConfiguration(...)
    .UseSerilog(...)
    .ConfigureServices(...)
    .Build();

ServiceProvider = _host.Services;
await _host.StartAsync();
```

**后台服务**
```csharp
public class DataRefreshService(ILogger<DataRefreshService> logger) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
            logger.LogInformation("数据刷新完成 {Time}", DateTime.Now);
        }
    }
}

services.AddHostedService<DataRefreshService>();
```

### 进阶补充

**Host.CreateDefaultBuilder() 内部做了什么**

`CreateDefaultBuilder()` 不是空方法，调用它时内部已自动完成很多默认配置：
```csharp
Host.CreateDefaultBuilder()
// 等价于内部自动执行了：

// 1. 设置内容根目录为程序运行目录
.UseContentRoot(Directory.GetCurrentDirectory())

// 2. 加载配置（按优先级从低到高）
.ConfigureAppConfiguration((context, config) =>
{
    config.AddJsonFile("appsettings.json", optional: true);
    config.AddJsonFile($"appsettings.{env}.json", optional: true);
    config.AddEnvironmentVariables();
    config.AddCommandLine(args);
})

// 3. 配置默认日志（Console + Debug）
.ConfigureLogging((context, logging) =>
{
    logging.AddConsole();
    logging.AddDebug();
})

// 4. 注册基础服务到 DI 容器
// IHostEnvironment、IConfiguration、ILoggerFactory 等
```

> 所以我们再调用 `.ConfigureAppConfiguration()` 是在默认配置基础上**追加或覆盖**，不是完全替换。

**ConfigureServices 的 context 参数**
```csharp
.ConfigureServices((context, services) =>
{
    // context.Configuration → 已加载的完整配置（json + 环境变量等）
    services.Configure<DatabaseConfig>(
        context.Configuration.GetSection("Database"));

    // context.HostingEnvironment → 当前运行环境
    if (context.HostingEnvironment.IsDevelopment())
    {
        // 开发环境注册 Mock 服务，方便测试
        services.AddSingleton<IUserService, MockUserService>();
    }
    else
    {
        // 生产环境注册真实服务
        services.AddSingleton<IUserService, UserService>();
    }
})
```

**IHostApplicationLifetime - 生命周期钩子**
```csharp
public class AppLifetimeLogger(
    ILogger<AppLifetimeLogger> logger,
    IHostApplicationLifetime lifetime) : IHostedService
{
    public Task StartAsync(CancellationToken ct)
    {
        lifetime.ApplicationStarted.Register(()
            => logger.LogInformation("✅ 应用启动完成"));

        lifetime.ApplicationStopping.Register(()
            => logger.LogInformation("⏳ 应用正在关闭..."));

        lifetime.ApplicationStopped.Register(()
            => logger.LogInformation("🛑 应用已关闭"));

        return Task.CompletedTask;
    }

    public Task StopAsync(CancellationToken ct) => Task.CompletedTask;
}

services.AddHostedService<AppLifetimeLogger>();
```

**Build() / StartAsync() / StopAsync() 的区别**
```csharp
// Build()：构建主机，初始化所有服务，但后台任务还未启动
var host = builder.Build();

// StartAsync()：启动所有 IHostedService 和 BackgroundService
// 所有 ExecuteAsync() 开始在后台运行
await host.StartAsync();

// StopAsync()：发送取消信号，等待所有后台任务优雅退出
// CancellationToken 会被触发，BackgroundService 的 while 循环会退出
await host.StopAsync();

// Dispose()：释放所有资源
host.Dispose();
```

---

## 6. Microsoft.Xaml.Behaviors.Wpf `1.1.142`

### 作用
为你提供 `Behavior`、`EventTrigger`、`InvokeCommandAction` 等交互行为，让 XAML 能绑定事件到 ViewModel 命令。

### 涉及代码

**引入命名空间**
```xml
xmlns:i="http://schemas.microsoft.com/xaml/behaviors"
```

**绑定事件到命令**
```xml
<Page>
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="Loaded">
            <i:InvokeCommandAction Command="{Binding LoadCommand}"/>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</Page>

<Window>
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="Closing">
            <i:InvokeCommandAction Command="{Binding ClosingCommand}"
                                   PassEventArgsToCommand="True"/>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</Window>
```

**ViewModel 接收事件参数**
```csharp
[RelayCommand]
private void Closing(CancelEventArgs e)
{
    var result = MessageBox.Show("确认退出？", "提示", MessageBoxButton.YesNo);
    if (result == MessageBoxResult.No)
        e.Cancel = true;
}
```

### 进阶补充

**EventTrigger vs 直接绑定 Command 的选择**
```xml
<!-- 有 Command 属性的控件直接绑定，不需要 EventTrigger -->
<Button Command="{Binding SaveCommand}"/>

<!-- 没有 Command 属性的控件（TextBox、ListBox 等），用 EventTrigger -->
<TextBox>
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="TextChanged">
            <i:InvokeCommandAction Command="{Binding SearchCommand}"/>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</TextBox>

<ListBox>
    <i:Interaction.Triggers>
        <i:EventTrigger EventName="SelectionChanged">
            <i:InvokeCommandAction Command="{Binding SelectCommand}"
                                   PassEventArgsToCommand="True"/>
        </i:EventTrigger>
    </i:Interaction.Triggers>
</ListBox>
```

**自定义 Behavior（封装复用逻辑）**
```csharp
// 封装"只能输入数字"的行为
public class NumericOnlyBehavior : Behavior<TextBox>
{
    // 附加到控件时调用
    protected override void OnAttached()
    {
        base.OnAttached();
        AssociatedObject.PreviewTextInput += OnPreviewTextInput;
    }

    // 从控件分离时调用（清理事件，防止内存泄漏）
    protected override void OnDetaching()
    {
        base.OnDetaching();
        AssociatedObject.PreviewTextInput -= OnPreviewTextInput;
    }

    private void OnPreviewTextInput(object sender, TextCompositionEventArgs e)
    {
        e.Handled = !e.Text.All(char.IsDigit);
    }
}
```

```xml
<!-- XAML 中使用，一行代码完成复用 -->
<TextBox>
    <i:Interaction.Behaviors>
        <helpers:NumericOnlyBehavior/>
    </i:Interaction.Behaviors>
</TextBox>
```

---

## 7. Serilog.Extensions.Hosting `10.0.0`

### 作用
将 Serilog 集成到泛型主机，提供 `UseSerilog()` 扩展方法，替换主机默认日志系统。

### 涉及代码
```csharp
.UseSerilog((_, config) =>
{
    config
        .MinimumLevel.Information()
        .WriteTo.Console()
        .WriteTo.File("logs/app-.log",
            rollingInterval: RollingInterval.Day);
})
```

### 进阶补充

**UseSerilog() 的两种重载**
```csharp
// 重载1：直接在代码里写死配置
.UseSerilog((context, config) =>
{
    config.MinimumLevel.Information()
          .WriteTo.Console();
})

// 重载2：从 appsettings.json 读取日志配置（推荐，更灵活）
.UseSerilog((context, config) =>
{
    config.ReadFrom.Configuration(context.Configuration);
})
```

**从 json 读取日志配置**
```json
{
  "Serilog": {
    "MinimumLevel": {
      "Default": "Information",
      "Override": {
        "Microsoft": "Warning",
        "System": "Warning"
      }
    },
    "WriteTo": [
      { "Name": "Console" },
      {
        "Name": "File",
        "Args": {
          "path": "logs/app-.log",
          "rollingInterval": "Day"
        }
      }
    ]
  }
}
```

**为什么用 Serilog 而不是内置日志**
```
内置 ILogger              Serilog
──────────────────────────────────────────────────
只能输出到 Console/Debug  → 支持几十种输出目标（文件、数据库、Slack...）
日志格式固定              → 完全自定义格式模板
无结构化日志              → 支持结构化日志（便于查询分析）
配置繁琐                  → 链式配置，一目了然
```

---

## 8. Serilog.Sinks.Console `6.1.1`

### 作用
Serilog 的控制台输出插件，开发时在 VS 输出窗口查看日志。

### 涉及代码
```csharp
config.WriteTo.Console(
    outputTemplate: "[{Timestamp:HH:mm:ss} {Level:u3}] {Message}{NewLine}{Exception}");
// 输出示例：
// [14:30:25 INF] 开始查询用户列表
// [14:30:25 ERR] 查询失败 System.Exception: ...
```

### 进阶补充

**结构化日志 vs 字符串拼接**
```csharp
// ❌ 字符串拼接：无法按参数查询，性能差
logger.LogInformation("查询用户：" + userId + " 结果：" + count);

// ✅ 结构化日志：参数有名字，可以按 UserId 过滤查询
logger.LogInformation("查询用户 {UserId} 结果 {Count} 条", userId, count);
// 输出：查询用户 123 结果 10 条
// 结构化存储：{ UserId: 123, Count: 10, Message: "..." }
```

**按命名空间过滤日志级别**
```csharp
config
    .MinimumLevel.Information()
    // 框架本身会输出大量 Debug/Info，单独过滤掉
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .MinimumLevel.Override("System", LogEventLevel.Warning)
    // 自己的代码保持 Debug 级别
    .MinimumLevel.Override("MyWpfApp", LogEventLevel.Debug)
    .WriteTo.Console();
```

**日志级别完整说明**
```
Verbose     → 极度详细，追踪每一步执行（极少用）
Debug       → 调试信息，开发时使用
Information → 正常业务流程记录（推荐开发时使用）
Warning     → 潜在问题，程序还能继续运行
Error       → 错误，某个操作失败但程序可以继续
Fatal       → 严重错误，程序即将崩溃（推荐生产环境最低级别）
```

---

## 9. Serilog.Sinks.File `7.0.0`

### 作用
Serilog 的文件输出插件，把日志写入本地文件，支持按时间自动滚动。

### 涉及代码
```csharp
config.WriteTo.File(
    "logs/app-.log",
    rollingInterval: RollingInterval.Day,
    retainedFileCountLimit: 30);
```

### 进阶补充

**完整参数说明**
```csharp
config.WriteTo.File(
    path: "logs/app-.log",                    // 路径，- 被日期替换
    rollingInterval: RollingInterval.Day,     // 滚动间隔：Hour/Day/Month/Year
    retainedFileCountLimit: 30,               // 保留文件数量，null 为不限制
    fileSizeLimitBytes: 10 * 1024 * 1024,    // 单文件大小限制：10MB
    rollOnFileSizeLimit: true,                // 超过大小限制时也滚动新文件
    outputTemplate: "[{Timestamp:yyyy-MM-dd HH:mm:ss} {Level:u3}] {Message}{NewLine}{Exception}",
    restrictedToMinimumLevel: LogEventLevel.Warning  // 文件只记录 Warning 以上
);

// 生成文件名示例：
// logs/app-20260321.log
// logs/app-20260321_001.log  ← 同一天超过大小限制时自动新建
// logs/app-20260322.log
```

**按级别分文件输出**
```csharp
config
    // 所有日志写到 all.log
    .WriteTo.File("logs/all-.log", rollingInterval: RollingInterval.Day)

    // 只有 Error 以上写到 error.log，方便快速定位问题
    .WriteTo.File("logs/error-.log",
        rollingInterval: RollingInterval.Day,
        restrictedToMinimumLevel: LogEventLevel.Error);
```

---

## 10. SqlSugarCore `5.1.4.214`

### 作用
国产轻量 ORM，提供 Lambda 表达式查询、Code First 建表、分页、事务等数据库操作功能。

### 涉及代码

**配置数据库连接**
```csharp
public class DbContext
{
    private static SqlSugarClient? _db;

    public static SqlSugarClient Db => _db ??= new SqlSugarClient(new ConnectionConfig
    {
        ConnectionString = "Server=.;Database=MyDb;Trusted_Connection=True;",
        DbType = DbType.SqlServer,
        IsAutoCloseConnection = true,
        InitKeyType = InitKeyType.Attribute
    });
}
```

**实体定义**
```csharp
[SugarTable("tb_user")]
public class User
{
    [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
    public int Id { get; set; }

    [SugarColumn(ColumnName = "user_name")]
    public string UserName { get; set; }

    public int Age { get; set; }

    [SugarColumn(IsIgnore = true)]
    public string TempField { get; set; }
}
```

**增删改查**
```csharp
var list = db.Queryable<User>()
             .Where(u => u.Age > 18)
             .OrderBy(u => u.Id, OrderByType.Desc)
             .ToPageList(1, 10, ref total);

var id = db.Insertable(user).ExecuteReturnIdentity();

db.Updateable(user)
  .UpdateColumns(u => new { u.UserName, u.Age })
  .ExecuteCommand();

db.Deleteable<User>().Where(u => u.Id == 1).ExecuteCommand();
```

### 进阶补充

**ConnectionConfig 参数详解**
```csharp
new ConnectionConfig
{
    ConnectionString = "...",

    DbType = DbType.SqlServer,
    // 支持的数据库类型：
    // DbType.SqlServer  → SQL Server
    // DbType.MySql      → MySQL
    // DbType.PostgreSQL → PostgreSQL
    // DbType.Sqlite     → SQLite（嵌入式，无需安装数据库服务）
    // DbType.Oracle     → Oracle
    // DbType.Dm         → 达梦（国产）
    // DbType.Kdbndp     → 人大金仓（国产）

    IsAutoCloseConnection = true,
    // true  → 每次操作完自动关闭连接（推荐，防止连接泄漏）
    // false → 手动管理连接生命周期

    InitKeyType = InitKeyType.Attribute,
    // Attribute   → 从 [SugarColumn] 特性读取主键配置（推荐）
    // SystemTable → 从数据库系统表读取（性能略差）
}
```

**集成到 DI 容器（结合配置文件）**
```csharp
services.AddSingleton<ISqlSugarClient>(provider =>
{
    var config = provider.GetRequiredService<IOptions<DatabaseConfig>>().Value;

    return new SqlSugarClient(new ConnectionConfig
    {
        ConnectionString = config.ConnectionString,
        DbType = Enum.Parse<DbType>(config.DbType),
        IsAutoCloseConnection = true,
        InitKeyType = InitKeyType.Attribute,

        // 开发时开启 SQL 打印，方便调试
        AopEvents = new AopEvents
        {
            OnLogExecuting = (sql, pars) =>
                Console.WriteLine($"SQL: {sql}")
        }
    });
});
```

**事务**
```csharp
// 优雅写法，自动提交/回滚
var result = db.UseTran(() =>
{
    db.Insertable(user).ExecuteCommand();
    db.Insertable(order).ExecuteCommand();
    db.Updateable(stock).ExecuteCommand();
});

if (!result.IsSuccess)
    logger.LogError("事务失败：{Error}", result.ErrorMessage);
```

**导航属性查询**
```csharp
public class User
{
    [SugarColumn(IsPrimaryKey = true, IsIdentity = true)]
    public int Id { get; set; }
    public string UserName { get; set; }

    // 一对多：一个用户有多个订单
    [Navigate(NavigateType.OneToMany, nameof(Order.UserId))]
    public List<Order> Orders { get; set; }
}

// 查询时自动联表，不需要手写 Join
var users = db.Queryable<User>()
              .Includes(u => u.Orders)
              .ToList();
```

**Code First 建表策略**
```csharp
// 策略1：没有表就创建，有表不动（最安全，生产环境用）
db.CodeFirst.InitTables<User, Order>();

// 策略2：对比差异，自动加列（有新字段时自动更新表结构）
db.CodeFirst.BackupTable().InitTables<User>();

// 策略3：强制重建（删掉重建，会清空数据，只在开发初期用）
db.CodeFirst.IsCreateInitTable(true).InitTables<User>();
```

---

## 包依赖关系总览

```
泛型主机基础设施
├── Microsoft.Extensions.Hosting              → 主机核心（含DI容器）
├── Microsoft.Extensions.Configuration.Json  → 读取 json 配置
├── Serilog.Extensions.Hosting               → 日志集成主机
├── Serilog.Sinks.Console                    → 日志输出控制台
└── Serilog.Sinks.File                       → 日志输出文件

MVVM 框架
├── CommunityToolkit.Mvvm                    → 属性/命令自动生成
└── Microsoft.Xaml.Behaviors.Wpf            → 事件绑定到命令

数据访问
└── SqlSugarCore                             → ORM 数据库操作

UI 组件
└── HandyControl                             → 美观控件和样式

DI 容器（被 Hosting 包含，单独列出说明）
└── Microsoft.Extensions.DependencyInjection → 服务注册和解析
```

---

## 附：完整 App.xaml.cs 配置注释版

```csharp
_host = Host.CreateDefaultBuilder()
// ↑ 创建默认主机构建器，内部已自动完成：
//   · 设置内容根目录为程序运行目录
//   · 加载 appsettings.json（optional: true）
//   · 配置 Console + Debug 日志
//   · 注册 IHostEnvironment、IConfiguration 等基础服务

    .ConfigureAppConfiguration((context, config) =>
    // context.HostingEnvironment → 当前环境（Development/Production）
    // context.Configuration     → 当前已加载的配置（可读取已有值）
    {
        config.SetBasePath(AppContext.BaseDirectory);
        // ↑ 设置配置文件根目录为程序运行目录

        config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: true);
        // optional: false      → 文件不存在则抛异常
        // reloadOnChange: true → 文件变化时自动热更新

        config.AddJsonFile(
            $"appsettings.{context.HostingEnvironment.EnvironmentName}.json",
            optional: true);
        // ↑ 加载环境配置，optional: true → 文件不存在不报错
    })

    .UseSerilog((context, config) =>
    // ↑ 替换默认日志为 Serilog
    // context.Configuration → 可从 appsettings.json 读取日志配置
    {
        config
            .MinimumLevel.Information()
            .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
            // ↑ 过滤掉框架产生的大量无用 Info 日志
            .WriteTo.Console()
            .WriteTo.File("logs/app-.log",
                rollingInterval: RollingInterval.Day,
                retainedFileCountLimit: 30);
    })

    .ConfigureServices((context, services) =>
    // context.Configuration     → 已加载的完整配置
    // context.HostingEnvironment → 当前运行环境，可做环境判断
    {
        // 绑定配置类，注入时用 IOptions<T> 接收
        services.Configure<DatabaseConfig>(
            context.Configuration.GetSection("Database"));
        services.Configure<AppConfig>(
            context.Configuration.GetSection("App"));

        // 自动扫描注册所有打了 [AutoRegister] 的类
        services.AddAutoRegister(Assembly.GetExecutingAssembly());

        // 手动注册无法打标记的服务
        services.AddSingleton<INavigationService, NavigationService>();
    })

    .Build();
// ↑ 构建主机，所有服务初始化完成，后台任务尚未启动

await _host.StartAsync();
// ↑ 启动所有 IHostedService 和 BackgroundService
// ↑ 所有 ExecuteAsync() 开始在后台运行

await _host.StopAsync();
// ↑ 发出取消信号，CancellationToken 触发
// ↑ 等待所有后台任务优雅退出后才返回

_host.Dispose();
// ↑ 释放所有资源
```
