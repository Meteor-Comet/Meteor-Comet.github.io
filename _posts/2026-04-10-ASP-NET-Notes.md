---
layout: post
title:  "ASP.NET Core 轻量化实战：Minimal API 构建与 HttpClient 跨端联动指南"
subtitle: "深度解析高性能最小 API 设计、IIS 生产托管及上位机 HttpClient 资源池化调用"
date:   2026-04-10 10:00:00 +0800
author:     "Comet"
catalog:    true
header-style: text
tags:
    - ASP.NET
    - MinimalAPI
    - HttpClient
    - IIS
    - C#
---

# ASP.NET Core 现代联动开发指南

在工业物联网（IIoT）与现代企业应用中，系统通常分为“服务端（提供数据）”与“上位机/客户端（消费数据）”。为了追求极致的开发效率与运行性能，**.NET 8+** 推崇使用 **Minimal API** 快速构建轻量化服务，并通过 **IHttpClientFactory** 在客户端建立高性能、弹性的通信链路。

本文将聚焦于这两者的“端到端”联动，并解决在 Windows 环境下通过 **IIS** 进行生产级发布的关键问题。

---

### 文章目录

- [一、服务端实战：使用 Minimal API 快速构建轻量化 API](#一服务端实战使用-minimal-api-快速构建轻量化-api)
- [二、桥梁建设：将 Web API 生产发布并部署至 IIS](#二桥梁建设将-web-api-生产发布并部署至-iis)
- [三、上位机联动：使用 HttpClient 高效消费服务](#三上位机联动使用-httpclient-高效消费服务)
- [四、核心保障：依赖注入与全局异常处理规范](#四核心保障依赖注入与全局异常处理规范)

---

## 一、服务端实战：使用 Minimal API 快速构建轻量化 API

Minimal API 是自 .NET 6 引入的重大革命，它剥离了传统 Controller 的繁琐结构，允许开发者以极简的代码定义高性能的路由。

### 1.1 极简骨架与路由容器
不同于以往需要多个文件夹，Minimal API 支持在 `Program.cs` 中直接定义所有行为。

```csharp
var builder = WebApplication.CreateBuilder(args);
// 核心服务配置（如 DI 注册）
builder.Services.AddScoped<IDeviceService, DeviceService>();
var app = builder.Build();

// 定义一个基础的 GET 接口
app.MapGet("/api/status", () => new { Status = "Running", Temperature = 24.5 });

app.Run();
```

### 1.2 路由组与参数绑定
在实际应用中，我们推荐使用 `MapGroup` 来对路由进行逻辑切分，这不仅让结构清晰，还能统一应用身份认证或过滤器。

```csharp
var deviceApi = app.MapGroup("/api/v1/devices")
    .WithTags("Devices")      // Swagger 自动分组
    .WithOpenApi();

// 获取特定设备详情
// {id:int} 是路由约束，防止传入无效非数字参数
deviceApi.MapGet("/{id:int}", async (int id, IDeviceService svc) =>
    await svc.GetByIdAsync(id) is { } dev ? Results.Ok(dev) : Results.NotFound());

// 创建新设备
deviceApi.MapPost("/", async (DeviceDto dto, IDeviceService svc) => {
    var created = await svc.CreateAsync(dto);
    return Results.Created($"/api/v1/devices/{created.Id}", created);
});
```

### 1.3 Endpoint Filter（端点过滤器）
Minimal API 使用轻量级的 `AddEndpointFilter` 来替代传统的 ActionFilter，适合做通用的参数校验或性能监控。

```csharp
deviceApi.MapPost("/command", async (CommandDto cmd) => Results.Accepted())
    .AddEndpointFilter(async (context, next) => {
        var cmd = context.GetArgument<CommandDto>(0);
        if (string.IsNullOrEmpty(cmd.Code)) return Results.BadRequest("指令码不能为空");
        return await next(context);
    });
```

---

## 二、桥梁建设：将 Web API 生产发布并部署至 IIS

在 Windows 企业级环境下，利用 IIS 托管是确保服务高可用（自动故障重启、负载均衡）的最佳实践。

### 2.1 托管环境准备
1.  **安装 Hosting Bundle**：服务器端必须安装对应版本的 `.NET Core Hosting Bundle`。
2.  **配置模块**：确认 IIS 模块中已加载 `AspNetCoreModuleV2`。
3.  **应用池设置**：创建应用池时，**.NET CLR 版本** 必须选择 **无托管代码 (No Managed Code)**。

### 2.2 发布产物与权限
使用 `dotnet publish -c Release` 生成干净的可执行产物。
*   **关键权限**：务必为发布文件夹添加 `IIS AppPool\你的应用池名` 的读取与执行权限，否则会触发 501.19/500.30 错误。

---

## 三、上位机联动：使用 HttpClient 高效消费服务

在上位机或 C# 桌面端（WPF/WinForms）中消费上述 API 时，`HttpClient` 的管理质量决定了应用的稳定性。

### 3.1 核心原则：HttpClientFactory 为王
严禁通过 `new HttpClient()` 手动创建实例，这会导致高并发下的**套接字耗尽**。推荐使用 `IHttpClientFactory` 进行资源池化。

#### 类型化客户端 (Typed Client) 实战
这是上位机开发中最推荐的模式，它将网络访问封装在特定的类中，像调用本地方法一样调用远程 API。

```csharp
public class DeviceClient
{
    private readonly HttpClient _http;

    public DeviceClient(HttpClient http) {
        _http = http;
    }

    public async Task<DeviceDto?> GetDeviceAsync(int id) {
        // 利用流式处理优化，比先读取字符串再反序列化快得多，内存占用更低
        return await _http.GetFromJsonAsync<DeviceDto>($"api/v1/devices/{id}");
    }
}

// 在 DI 中注册
services.AddHttpClient<DeviceClient>(c => {
    c.BaseAddress = new Uri("http://192.168.1.100:8080/");
    c.Timeout = TimeSpan.FromSeconds(5);
});
```

### 3.2 联动容错：Polly 弹性策略
当服务端（IIS）重启或网络闪断时，客户端需要自动重试。

```csharp
services.AddHttpClient<DeviceClient>()
    .AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2))) // 三次重试
    .AddTransientHttpErrorPolicy(p => p.CircuitBreakerAsync(5, TimeSpan.FromSeconds(30)));  // 熔断保护
```

### 3.3 深度拦截：DelegatingHandler
如果你想在上位机发出的每一个请求头部自动带上 Token 或记录日志，可以使用自定义 Handler。

```csharp
public class LoggingHandler : DelegatingHandler {
    protected override async Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken ct) {
        Console.WriteLine($"Sending: {request.RequestUri}");
        return await base.SendAsync(request, ct);
    }
}
```

---

## 四、核心保障：依赖注入与全局异常处理规范

即使是轻量化项目，良好的异常处理和解耦也是长久运行的保障。

### 4.1 IExceptionHandler (.NET 8+)
这是处理预期外故障的现代方案，它能确保 API 始终返回遵循 RFC 7807 规范的 `ProblemDetails` 错误信息。

```csharp
public class GlobalExceptionHandler : IExceptionHandler {
    public async ValueTask<bool> TryHandleAsync(HttpContext ctx, Exception ex, CancellationToken ct) {
        ctx.Response.StatusCode = StatusCodes.Status500InternalServerError;
        await ctx.Response.WriteAsJsonAsync(new ProblemDetails {
            Title = "服务器内部故障",
            Detail = ex.Message
        });
        return true;
    }
}
```

---

> **总结：端到端联动逻辑**：
> 1. **服务端**：利用 **Minimal API** 定义超低开销的路由端点。
> 2. **部署层**：通过 **IIS + Hosting Bundle** 在 Windows 环境下构建稳固的宿主环境。
> 3. **客户端**：利用 **HttpClientFactory + Polly** 构建具备容错能力的通信链路，实现上位机与服务端的无缝对接。
