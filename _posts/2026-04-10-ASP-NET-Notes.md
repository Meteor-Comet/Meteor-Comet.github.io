---
layout: post
title:  "ASP.NET 开发笔记：Web API 企业级开发、HttpClient 弹性机制与 IIS 部署实战"
subtitle: "深度解析 IHttpClientFactory 资源池化、Polly 容错、请求管道控制与 IIS 生产级托管"
date:   2026-04-10 10:00:00 +0800
author:     "Comet"
catalog:    true
header-style: text
tags:
    - ASP.NET
    - WebAPI
    - HttpClient
    - IIS
    - C#
---

# ASP.NET Web API 核心实战指南

ASP.NET Core 是一款由微软开发的高性能、开源且跨平台的框架。在企业级开发中，不仅需要构建稳健的 Web API 服务端，还需要高效地消费外部服务（HttpClient）。同时，在 Windows 生态应用中，利用 IIS 托管 Web API 是确保服务端稳定、安全且易于维护的最佳实践。

---

### 文章目录

- [核心架构与请求处理管道](#核心架构与请求处理管道)
- [路由系统详解](#路由系统详解)
- [控制器与 Action 生命周期](#控制器与-action-生命周期)
- [数据层：模型绑定与模型验证](#数据层模型绑定与模型验证)
- [内容协商与响应格式化 (JSON/XML)](#内容协商与响应格式化-jsonxml)
- [中间件管道 (Middleware Pipeline) 机制](#中间件管道-middleware-pipeline-机制)
- [依赖注入 (DI) 生命周期与模式](#依赖注入-di-生命周期与模式)
- [过滤器管道 (Filter Pipeline) 全析](#过滤器管道-filter-pipeline-全析)
- [全局异常处理机制与 Problem Details 规范](#全局异常处理机制与-problem-details-规范)
- [安全基石：身份认证与授权机制](#安全基石身份认证与授权机制)
- [跨域解析：CORS 策略配置与安全实践](#跨域解析cors-策略配置与安全实践)
- [API 版本管理与高并发限流策略](#api-版本管理与高并发限流策略)
- [文档化与可调试性：Swagger / OpenAPI 全解](#文档化与可调试性swagger--openapi-全解)
- [高性能进阶：多级缓存 (IDistributedCache) 指南](#高性能进阶多级缓存-idistributedcache-指南)
- [可观测性：结构化日志与健康检查](#可观测性结构化日志与健康检查)
- [外部调用：HttpClientFactory 深度实践与弹性机制](#外部调用httpclientfactory-深度实践与弹性机制)
- [自动化质量保障：集成测试 (xUnit & TestServer)](#自动化质量保障集成测试-xunit--testserver)
- [生产发布：IIS (Internet Information Services) 托管全流程实战](#生产发布iis-internet-information-services-托管全流程实战)

---

## ASP.NET Web API 开发全景实战

ASP.NET Core Web API 是微软在 .NET 平台上构建 RESTful HTTP 服务的主流框架。本章从请求管道的底层机制出发，逐层拆解路由、控制器、模型绑定、中间件、DI、安全、可观测性、测试到部署的全链路知识体系，所有示例基于 **.NET 8**。

---

### 核心架构与请求处理管道

ASP.NET Core 的每一个 HTTP 请求都经过同一条**中间件管道**（Middleware Pipeline），这是整个框架的核心骨架。

```
HTTP Request
    │
    ▼
┌─────────────────────────────────────────┐
│           Middleware Pipeline           │
│                                         │
│  ExceptionHandler → HSTS → HTTPS重定向  │
│  → StaticFiles → Routing → CORS        │
│  → RateLimiter → Authentication        │
│  → Authorization → [EndpointMiddleware] │
│        │                                │
│        ▼                                │
│  ┌─────────────────────┐                │
│  │  Filter Pipeline    │                │
│  │  Auth → Resource    │                │
│  │  → Action → Result  │                │
│  │  → Exception        │                │
│  └────────┬────────────┘                │
│           ▼                             │
│      Controller / Action                │
└─────────────────────────────────────────┘
    │
    ▼
HTTP Response
```

**Program.cs 最简骨架：**

```csharp
var builder = WebApplication.CreateBuilder(args);

// 1. 注册服务（DI 容器）
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// 2. 配置中间件管道（顺序至关重要）
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
```

> **关键原则**：`UseAuthentication()` 必须在 `UseAuthorization()` 之前；`UseRouting()` 在 .NET 6+ 中由 `MapControllers()` 隐式调用，通常无需手动添加。

---

### 路由系统详解

#### 约定路由 (Conventional Routing)

在 `Program.cs` 中统一配置路由模板，适合 MVC 风格项目：

```csharp
app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
```

Web API 项目一般不使用约定路由，更推荐特性路由。

#### 特性路由 (Attribute Routing)

直接在 Controller 或 Action 上标注路由，语义清晰：

```csharp
[ApiController]
[Route("api/v1/[controller]")]  // [controller] 自动替换为 "products"
public class ProductsController : ControllerBase
{
    // GET api/v1/products
    [HttpGet]
    public IActionResult GetAll() => Ok();

    // GET api/v1/products/42
    [HttpGet("{id:int}")]
    public IActionResult GetById(int id) => Ok();

    // POST api/v1/products
    [HttpPost]
    public IActionResult Create([FromBody] CreateProductDto dto) => CreatedAtAction(nameof(GetById), new { id = 1 }, dto);

    // PUT api/v1/products/42
    [HttpPut("{id:int}")]
    public IActionResult Update(int id, [FromBody] UpdateProductDto dto) => NoContent();

    // DELETE api/v1/products/42
    [HttpDelete("{id:int}")]
    public IActionResult Delete(int id) => NoContent();
}
```

#### 路由约束与正则匹配

路由约束在模板中内联，防止无效参数进入 Action：

```csharp
// 内置约束
[HttpGet("{id:int}")]           // 必须是整数
[HttpGet("{name:alpha}")]       // 只含字母
[HttpGet("{id:guid}")]          // GUID 格式
[HttpGet("{age:range(1,120)}")] // 数值范围
[HttpGet("{slug:minlength(3)}")] // 最短长度

// 自定义约束：实现 IRouteConstraint
public class EvenNumberConstraint : IRouteConstraint
{
    public bool Match(HttpContext? httpContext, IRouter? route,
        string routeKey, RouteValueDictionary values, RouteDirection routeDirection)
    {
        if (values.TryGetValue(routeKey, out var value)
            && int.TryParse(value?.ToString(), out int number))
        {
            return number % 2 == 0;
        }
        return false;
    }
}

// 注册自定义约束
builder.Services.Configure<RouteOptions>(options =>
    options.ConstraintMap.Add("even", typeof(EvenNumberConstraint)));

// 使用
[HttpGet("{id:even}")]
public IActionResult GetEven(int id) => Ok(id);
```

---

### 控制器与 Action 生命周期

#### ApiController 与 ControllerBase 深度解析

`[ApiController]` 特性为控制器启用一组 Web API 专属行为：

| 行为 | 说明 |
|------|------|
| 自动模型验证 | `ModelState` 无效时自动返回 400 `ValidationProblemDetails` |
| 参数来源推断 | 复杂类型自动推断为 `[FromBody]`，简单类型为 `[FromRoute]`/`[FromQuery]` |
| 禁用视图查找 | 返回 `null` 不会尝试渲染视图 |
| ProblemDetails 错误 | 4xx/5xx 状态码使用标准 Problem Details 格式 |

```csharp
[ApiController]
[Route("api/[controller]")]
public class OrdersController : ControllerBase
{
    private readonly IOrderService _orderService;

    // 构造函数注入
    public OrdersController(IOrderService orderService)
        => _orderService = orderService;
}
```

#### ActionResult 多样化返回类型对比

推荐使用 `ActionResult<T>` 或 `IActionResult`，配合语义化帮助方法：

```csharp
// ActionResult<T>：同时支持强类型和 HTTP 响应
[HttpGet("{id}")]
public async Task<ActionResult<ProductDto>> GetById(int id)
{
    var product = await _service.FindAsync(id);
    if (product is null)
        return NotFound(new { message = $"Product {id} not found" });

    return Ok(product);  // 200 + JSON body
}

// 常用帮助方法速查
return Ok(data);                          // 200
return Created("/api/items/1", data);     // 201
return CreatedAtAction(nameof(GetById),   // 201 + Location 头
    new { id = newItem.Id }, newItem);
return Accepted();                        // 202
return NoContent();                       // 204
return BadRequest(ModelState);            // 400
return Unauthorized();                    // 401
return Forbid();                          // 403
return NotFound();                        // 404
return Conflict();                        // 409
return UnprocessableEntity(ModelState);   // 422
return StatusCode(503, "Service unavailable"); // 任意状态码

// .NET 7+ TypedResults（Minimal API 风格，也可在 Controller 使用）
return TypedResults.Ok(product);
return TypedResults.NotFound();
```

---

### 数据层：模型绑定与模型验证

#### 模型参数来源与推断机制

```csharp
[HttpPost("search")]
public IActionResult Search(
    [FromQuery] string keyword,          // ?keyword=laptop
    [FromQuery] int page = 1,            // ?page=2
    [FromHeader(Name = "X-Api-Key")] string apiKey,  // 请求头
    [FromBody] SearchFilter filter,      // 请求体 JSON
    [FromRoute] int categoryId,          // 路由段 /categories/5/search
    [FromServices] ILogger<...> logger)  // 直接从 DI 注入
{
    // ...
}
```

`[FromBody]` 一个 Action 只能用一次（HTTP 请求体只有一个）。需要同时接收多个复杂对象时，将它们包装成一个 DTO。

#### DataAnnotations 声明式验证

```csharp
public class CreateProductDto
{
    [Required(ErrorMessage = "名称不能为空")]
    [StringLength(100, MinimumLength = 2)]
    public string Name { get; set; } = default!;

    [Range(0.01, 999999.99, ErrorMessage = "价格必须在 0.01 到 999999.99 之间")]
    public decimal Price { get; set; }

    [Required]
    [RegularExpression(@"^[A-Z]{2}\d{6}$", ErrorMessage = "SKU 格式不正确")]
    public string Sku { get; set; } = default!;

    [Url]
    public string? ImageUrl { get; set; }

    [EmailAddress]
    public string? ContactEmail { get; set; }
}
```

`[ApiController]` 自动处理验证失败，无需手动检查 `ModelState.IsValid`。如需手动处理或自定义响应：

```csharp
// 禁用自动验证响应，手动控制
[HttpPost]
public IActionResult Create([FromBody] CreateProductDto dto)
{
    if (!ModelState.IsValid)
    {
        // 自定义错误格式
        var errors = ModelState
            .Where(x => x.Value?.Errors.Count > 0)
            .ToDictionary(
                x => x.Key,
                x => x.Value!.Errors.Select(e => e.ErrorMessage).ToArray());
        return BadRequest(new { errors });
    }
    // ...
}
```

#### FluentValidation 高级验证集成

FluentValidation 提供比 DataAnnotations 更强大的验证能力，尤其适合复杂业务规则：

```bash
dotnet add package FluentValidation.AspNetCore
```

```csharp
// 定义验证器
public class CreateProductValidator : AbstractValidator<CreateProductDto>
{
    private readonly IProductRepository _repo;

    public CreateProductValidator(IProductRepository repo)
    {
        _repo = repo;

        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("名称不能为空")
            .Length(2, 100)
            .MustAsync(async (name, ct) => !await _repo.ExistsAsync(name))
            .WithMessage("该名称已存在");

        RuleFor(x => x.Price)
            .GreaterThan(0).WithMessage("价格必须大于 0")
            .LessThanOrEqualTo(999999.99m);

        RuleFor(x => x.CategoryId)
            .NotEmpty()
            .MustAsync(async (id, ct) => await _repo.CategoryExistsAsync(id))
            .WithMessage("分类不存在");

        // 条件验证
        When(x => x.HasDiscount, () =>
        {
            RuleFor(x => x.DiscountPercent)
                .InclusiveBetween(1, 99);
        });
    }
}

// 注册（自动扫描程序集中所有 AbstractValidator<T>）
builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddValidatorsFromAssemblyContaining<CreateProductValidator>();
```

---

### 内容协商与响应格式化 (JSON/XML)

```csharp
// 配置 JSON 序列化选项
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        // 驼峰命名（默认）
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        // 忽略 null 值字段
        options.JsonSerializerOptions.DefaultIgnoreCondition =
            JsonIgnoreCondition.WhenWritingNull;
        // 枚举序列化为字符串
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
        // 允许尾随逗号（宽松模式）
        options.JsonSerializerOptions.AllowTrailingCommas = true;
    });

// 同时支持 XML 格式（内容协商：客户端通过 Accept 头选择）
builder.Services.AddControllers()
    .AddXmlSerializerFormatters();
```

**内容协商**：客户端发送 `Accept: application/xml`，服务端自动返回 XML；发送 `Accept: application/json` 或无 Accept 头，返回 JSON。

---

### 中间件管道 (Middleware Pipeline) 机制

#### 标准中间件注册顺序规范

顺序决定行为，以下是推荐的标准顺序：

```csharp
var app = builder.Build();

app.UseExceptionHandler("/error");   // 1. 最外层：捕获所有未处理异常
app.UseHsts();                        // 2. HSTS 响应头（生产环境）
app.UseHttpsRedirection();            // 3. HTTP → HTTPS 重定向
app.UseStaticFiles();                 // 4. 静态文件（wwwroot）
app.UseRouting();                     // 5. 路由匹配（.NET 6+ 通常隐式）
app.UseCors("MyPolicy");              // 6. CORS（路由之后，认证之前）
app.UseRateLimiter();                 // 7. 限流
app.UseAuthentication();              // 8. 认证（必须在授权之前）
app.UseAuthorization();               // 9. 授权
app.MapControllers();                 // 10. 终端中间件：映射控制器
```

#### 自定义中间件开发实战

**方式一：基于约定的类（推荐）**

```csharp
public class RequestTimingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<RequestTimingMiddleware> _logger;

    public RequestTimingMiddleware(RequestDelegate next,
        ILogger<RequestTimingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        var sw = Stopwatch.StartNew();
        try
        {
            await _next(context);  // 调用管道中的下一个中间件
        }
        finally
        {
            sw.Stop();
            _logger.LogInformation(
                "请求 {Method} {Path} 耗时 {ElapsedMs}ms，状态码 {StatusCode}",
                context.Request.Method,
                context.Request.Path,
                sw.ElapsedMilliseconds,
                context.Response.StatusCode);
        }
    }
}

// 注册扩展方法（可选，便于链式调用）
public static class RequestTimingMiddlewareExtensions
{
    public static IApplicationBuilder UseRequestTiming(
        this IApplicationBuilder builder)
        => builder.UseMiddleware<RequestTimingMiddleware>();
}

// 使用
app.UseRequestTiming();
```

**方式二：内联 Lambda（适合简单逻辑）**

```csharp
// Use：有下一个中间件
app.Use(async (context, next) =>
{
    context.Response.Headers.Add("X-Frame-Options", "DENY");
    await next(context);
});

// Run：终端，不调用 next
app.Run(async context =>
{
    await context.Response.WriteAsync("Fallback response");
});

// Map：路径分支
app.Map("/health-simple", branch =>
{
    branch.Run(async ctx =>
        await ctx.Response.WriteAsync("OK"));
});
```

---

### 依赖注入 (DI) 生命周期与模式

#### 三大服务生存期详解 (Singleton/Scoped/Transient)

```csharp
// Singleton：整个应用生命周期只有一个实例
builder.Services.AddSingleton<IConfigService, ConfigService>();

// Scoped：每个 HTTP 请求一个实例（最常用于 DbContext、业务服务）
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();

// Transient：每次从容器获取都创建新实例（适合无状态的轻量服务）
builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();

// 注册接口的多个实现
builder.Services.AddScoped<IPaymentGateway, AlipayGateway>();
builder.Services.AddScoped<IPaymentGateway, WechatPayGateway>();
// 注入时使用 IEnumerable<IPaymentGateway>

// 工厂注册
builder.Services.AddScoped<INotificationService>(sp =>
{
    var config = sp.GetRequiredService<IConfiguration>();
    return config["NotificationType"] == "sms"
        ? new SmsNotificationService(sp.GetRequiredService<ISmsClient>())
        : new EmailNotificationService(sp.GetRequiredService<IEmailSender>());
});
```

> **注意**：不要在 Singleton 中注入 Scoped 服务，这会导致 Scoped 服务被"捕获"（Captive Dependency），等效于 Singleton 生命周期，可能引发并发问题。

#### 强类型配置管理：Options 模式与热重载

Options 模式将配置强类型绑定，是 `IConfiguration` 的进阶用法：

```json
// appsettings.json
{
  "Jwt": {
    "Issuer": "https://myapi.com",
    "Audience": "myapi-clients",
    "SecretKey": "super-secret-key-at-least-32-chars",
    "ExpirationMinutes": 60
  }
}
```

```csharp
// 配置 POCO
public class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Issuer { get; set; } = default!;
    public string Audience { get; set; } = default!;
    public string SecretKey { get; set; } = default!;
    public int ExpirationMinutes { get; set; } = 60;
}

// 注册并绑定（同时启用数据注解验证）
builder.Services
    .AddOptions<JwtOptions>()
    .BindConfiguration(JwtOptions.SectionName)
    .ValidateDataAnnotations()
    .ValidateOnStart();  // 应用启动时立即验证，配置错误快速失败

// 三种注入方式：
// IOptions<T>：单例，不感知配置变化
// IOptionsSnapshot<T>：Scoped，每请求重新读取（支持热重载）
// IOptionsMonitor<T>：单例，通过 OnChange 回调感知变化

public class TokenService
{
    private readonly JwtOptions _jwt;

    public TokenService(IOptions<JwtOptions> options)
        => _jwt = options.Value;

    public string GenerateToken(string userId)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.SecretKey));
        // ...
    }
}
```

---

### 过滤器管道 (Filter Pipeline) 全析

#### 过滤器类型与管道级联顺序

```
请求进入
    │
    ▼
[Authorization Filter]    ← 最先执行，失败则短路
    │
    ▼
[Resource Filter] - Before
    │
    ▼
    [Model Binding]
    │
    ▼
[Action Filter] - OnActionExecuting
    │
    ▼
    [Action 方法执行]
    │
    ▼
[Action Filter] - OnActionExecuted
    │
    ▼
[Exception Filter]        ← 捕获 Action 执行中的异常
    │
    ▼
[Result Filter] - OnResultExecuting
    │
    ▼
    [Result 执行（序列化响应）]
    │
    ▼
[Result Filter] - OnResultExecuted
    │
    ▼
[Resource Filter] - After
    │
    ▼
响应返回
```

#### 自定义 Action / Exception 过滤器示例

**Action Filter 示例：自动记录操作日志**

```csharp
public class AuditLogFilter : IAsyncActionFilter
{
    private readonly IAuditLogService _auditLog;

    public AuditLogFilter(IAuditLogService auditLog)
        => _auditLog = auditLog;

    public async Task OnActionExecutionAsync(
        ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var actionName = context.ActionDescriptor.DisplayName;
        var user = context.HttpContext.User.Identity?.Name ?? "anonymous";

        // Action 执行前
        var startTime = DateTime.UtcNow;

        var resultContext = await next();  // 执行 Action

        // Action 执行后
        var success = resultContext.Exception is null;
        await _auditLog.RecordAsync(new AuditEntry
        {
            Action = actionName,
            User = user,
            ExecutedAt = startTime,
            DurationMs = (DateTime.UtcNow - startTime).TotalMilliseconds,
            Success = success
        });
    }
}

// 注册为全局过滤器
builder.Services.AddScoped<AuditLogFilter>();
builder.Services.AddControllers(options =>
    options.Filters.AddService<AuditLogFilter>());

// 或在特定 Controller/Action 上使用 [ServiceFilter]
[ServiceFilter(typeof(AuditLogFilter))]
public class OrdersController : ControllerBase { }
```

**Exception Filter 示例：统一异常响应**

```csharp
public class ApiExceptionFilter : IExceptionFilter
{
    private readonly ILogger<ApiExceptionFilter> _logger;

    public ApiExceptionFilter(ILogger<ApiExceptionFilter> logger)
        => _logger = logger;

    public void OnException(ExceptionContext context)
    {
        _logger.LogError(context.Exception, "未处理异常");

        var (statusCode, title) = context.Exception switch
        {
            NotFoundException => (404, "资源未找到"),
            ValidationException => (422, "业务验证失败"),
            UnauthorizedAccessException => (403, "无访问权限"),
            _ => (500, "服务器内部错误")
        };

        context.Result = new ObjectResult(new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Detail = context.Exception.Message
        })
        { StatusCode = statusCode };

        context.ExceptionHandled = true;
    }
}
```

---

### 全局异常处理机制与 Problem Details 规范

#### IExceptionHandler 统一处理器 (.NET 8+)

.NET 8 推荐方式，支持多个处理器按优先级链式处理：

```csharp
public class GlobalExceptionHandler : IExceptionHandler
{
    private readonly ILogger<GlobalExceptionHandler> _logger;

    public GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger)
        => _logger = logger;

    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        _logger.LogError(exception, "未处理异常: {Message}", exception.Message);

        var (statusCode, title) = exception switch
        {
            NotFoundException ex      => (StatusCodes.Status404NotFound,     "资源未找到"),
            ValidationException ex    => (StatusCodes.Status422UnprocessableEntity, "验证失败"),
            ConflictException ex      => (StatusCodes.Status409Conflict,     "数据冲突"),
            UnauthorizedAccessException => (StatusCodes.Status403Forbidden,  "无权限"),
            _                         => (StatusCodes.Status500InternalServerError, "服务器错误")
        };

        httpContext.Response.StatusCode = statusCode;

        await httpContext.Response.WriteAsJsonAsync(new ProblemDetails
        {
            Status = statusCode,
            Title = title,
            Detail = exception.Message,
            Instance = httpContext.Request.Path
        }, cancellationToken);

        return true;  // 返回 false 表示此处理器无法处理，交给下一个
    }
}

// 注册
builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddProblemDetails();

app.UseExceptionHandler();
```

#### RFC 7807: ProblemDetails 响应标准

ProblemDetails 遵循 [RFC 7807](https://www.rfc-editor.org/rfc/rfc7807)，是 HTTP API 错误响应的国际标准格式：

```json
{
  "type": "https://tools.ietf.org/html/rfc9110#section-15.5.5",
  "title": "资源未找到",
  "status": 404,
  "detail": "Product with ID 42 was not found.",
  "instance": "/api/products/42",
  "traceId": "00-abc123-def456-00"
}
```

---

### 安全基石：身份认证与授权机制

#### JWT Bearer 认证流集成与配置对比

```bash
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

```csharp
// Program.cs 注册认证
builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.FromSeconds(30),  // 允许的时钟偏差
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:SecretKey"]!))
        };

        // 事件钩子（可选）
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                if (context.Exception is SecurityTokenExpiredException)
                    context.Response.Headers.Add("Token-Expired", "true");
                return Task.CompletedTask;
            }
        };
    });
```

**生成 JWT Token：**

```csharp
public class TokenService
{
    private readonly JwtOptions _jwt;

    public TokenService(IOptions<JwtOptions> options)
        => _jwt = options.Value;

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, user.Role),
            new Claim("tenant", user.TenantId.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwt.SecretKey));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _jwt.Issuer,
            audience: _jwt.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_jwt.ExpirationMinutes),
            signingCredentials: credentials);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```

#### 基于策略的授权模型 (Policy-Based) 详解

```csharp
// 注册策略
builder.Services.AddAuthorization(options =>
{
    // 基于角色
    options.AddPolicy("AdminOnly", policy =>
        policy.RequireRole("Admin"));

    // 基于 Claim
    options.AddPolicy("PremiumUser", policy =>
        policy.RequireClaim("subscription", "premium", "enterprise"));

    // 复合条件
    options.AddPolicy("SeniorManager", policy =>
        policy.RequireRole("Manager")
              .RequireClaim("experience_years")
              .RequireAssertion(ctx =>
                  int.Parse(ctx.User.FindFirstValue("experience_years") ?? "0") >= 5));

    // 自定义 Requirement
    options.AddPolicy("MinimumAge18", policy =>
        policy.AddRequirements(new MinimumAgeRequirement(18)));
});

// 自定义 Requirement + Handler
public record MinimumAgeRequirement(int MinimumAge) : IAuthorizationRequirement;

public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context,
        MinimumAgeRequirement requirement)
    {
        var birthDateClaim = context.User.FindFirst("birthdate");
        if (birthDateClaim is not null
            && DateTime.TryParse(birthDateClaim.Value, out var birthDate)
            && DateTime.Today.Year - birthDate.Year >= requirement.MinimumAge)
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
builder.Services.AddScoped<IAuthorizationHandler, MinimumAgeHandler>();

// Controller/Action 上使用
[Authorize]                          // 仅需登录
[Authorize(Roles = "Admin")]         // 角色授权
[Authorize(Policy = "PremiumUser")]  // 策略授权
[AllowAnonymous]                     // 豁免认证
```

---

### 跨域解析：CORS 策略配置与安全实践

```csharp
// 定义 CORS 策略
builder.Services.AddCors(options =>
{
    options.AddPolicy("DevelopmentPolicy", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());

    options.AddPolicy("ProductionPolicy", policy =>
        policy.WithOrigins("https://app.example.com", "https://admin.example.com")
              .WithMethods("GET", "POST", "PUT", "DELETE")
              .WithHeaders("Content-Type", "Authorization", "X-Api-Key")
              .AllowCredentials()          // 允许 Cookie/认证头（不能与 AllowAnyOrigin 同用）
              .SetPreflightMaxAge(TimeSpan.FromMinutes(10)));  // 缓存预检结果
});

// 全局应用
app.UseCors("ProductionPolicy");

// 细粒度控制：Controller/Action 级别
[EnableCors("DevelopmentPolicy")]   // 覆盖全局策略
[DisableCors]                        // 完全禁用 CORS
```

---

### API 版本管理 (Versioning) 实现方案

```bash
dotnet add package Asp.Versioning.Mvc
dotnet add package Asp.Versioning.Mvc.ApiExplorer
```

```csharp
// 注册
builder.Services.AddApiVersioning(options =>
{
    options.DefaultApiVersion = new ApiVersion(1, 0);
    options.AssumeDefaultVersionWhenUnspecified = true;
    options.ReportApiVersions = true;  // 响应头中报告支持的版本
    // 版本读取策略（可组合）
    options.ApiVersionReader = ApiVersionReader.Combine(
        new UrlSegmentApiVersionReader(),           // /api/v1/products
        new QueryStringApiVersionReader("api-ver"), // ?api-ver=1.0
        new HeaderApiVersionReader("X-Api-Version") // X-Api-Version: 1.0
    );
})
.AddApiExplorer(options =>
{
    options.GroupNameFormat = "'v'VVV";
    options.SubstituteApiVersionInUrl = true;
});

// 控制器版本标注
[ApiController]
[ApiVersion("1.0")]
[ApiVersion("2.0")]
[Route("api/v{version:apiVersion}/[controller]")]
public class ProductsController : ControllerBase
{
    [HttpGet]
    [MapToApiVersion("1.0")]
    public IActionResult GetV1() => Ok("Version 1");

    [HttpGet]
    [MapToApiVersion("2.0")]
    public IActionResult GetV2() => Ok("Version 2 with more data");

    // 标记废弃
    [HttpPost]
    [MapToApiVersion("1.0")]
    [ApiVersion("1.0", Deprecated = true)]
    public IActionResult CreateV1Legacy() => Ok();
}
```

---

### 高并发防护：内置限流中间件 (Rate Limiting)

.NET 7+ 内置限流中间件，无需第三方库：

```csharp
builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;

    // 固定窗口：每分钟最多 100 次请求
    options.AddFixedWindowLimiter("fixed", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 100;
        opt.QueueLimit = 10;  // 队列中等待的最大请求数
        opt.QueueProcessingOrder = QueueProcessingOrder.OldestFirst;
    });

    // 滑动窗口：更平滑，防止突发
    options.AddSlidingWindowLimiter("sliding", opt =>
    {
        opt.Window = TimeSpan.FromMinutes(1);
        opt.PermitLimit = 100;
        opt.SegmentsPerWindow = 6;  // 分为6个10秒的片段
    });

    // 令牌桶：允许短时间内突发
    options.AddTokenBucketLimiter("token", opt =>
    {
        opt.TokenLimit = 100;
        opt.ReplenishmentPeriod = TimeSpan.FromSeconds(10);
        opt.TokensPerPeriod = 20;
        opt.AutoReplenishment = true;
    });

    // 并发限制：同时处理的请求数
    options.AddConcurrencyLimiter("concurrent", opt =>
    {
        opt.PermitLimit = 50;
        opt.QueueLimit = 20;
    });

    // 按用户 IP 动态分区
    options.AddPolicy("per-ip", httpContext =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            factory: _ => new FixedWindowRateLimiterOptions
            {
                Window = TimeSpan.FromMinutes(1),
                PermitLimit = 60
            }));
});

app.UseRateLimiter();

// 在 Action 上使用
[EnableRateLimiting("per-ip")]
[HttpPost("login")]
public IActionResult Login() { ... }

[DisableRateLimiting]
[HttpGet("public-data")]
public IActionResult GetPublicData() { ... }
```

---

### 文档化与可调试性：Swagger / OpenAPI 全解

```bash
dotnet add package Swashbuckle.AspNetCore
```

```csharp
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "My API",
        Version = "v1",
        Description = "API 描述文档",
        Contact = new OpenApiContact { Name = "开发团队", Email = "dev@example.com" }
    });

    // 启用 XML 注释（需在 .csproj 中开启 <GenerateDocumentationFile>true</GenerateDocumentationFile>）
    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFile));

    // 添加 JWT 认证到 Swagger UI
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "输入 JWT Token（不需要 Bearer 前缀）"
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                    { Type = ReferenceType.SecurityScheme, Id = "Bearer" }
            },
            Array.Empty<string>()
        }
    });
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
        c.RoutePrefix = string.Empty;  // Swagger UI 在根路径
    });
}
```

**控制器上的 XML 注释**：

```csharp
/// <summary>
/// 根据 ID 获取产品详情
/// </summary>
/// <param name="id">产品 ID</param>
/// <returns>产品详情</returns>
/// <response code="200">成功返回产品</response>
/// <response code="404">产品不存在</response>
[HttpGet("{id:int}")]
[ProducesResponseType(typeof(ProductDto), StatusCodes.Status200OK)]
[ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status404NotFound)]
public async Task<ActionResult<ProductDto>> GetById(int id) { ... }
```

---

### 高性能进阶：多级缓存 (IDistributedCache) 指南

```csharp
// 1. 内存缓存（单机）
builder.Services.AddMemoryCache();

public class ProductService
{
    private readonly IMemoryCache _cache;
    private readonly IProductRepository _repo;

    public async Task<ProductDto?> GetByIdAsync(int id)
    {
        var cacheKey = $"product:{id}";
        if (_cache.TryGetValue(cacheKey, out ProductDto? cached))
            return cached;

        var product = await _repo.FindByIdAsync(id);
        if (product is not null)
        {
            _cache.Set(cacheKey, product, new MemoryCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromMinutes(10),
                SlidingExpiration = TimeSpan.FromMinutes(2),
                Size = 1  // 配合 SizeLimit 使用
            });
        }
        return product;
    }
}

// 2. 分布式缓存（Redis）
builder.Services.AddStackExchangeRedisCache(options =>
    options.Configuration = builder.Configuration.GetConnectionString("Redis"));

// IDistributedCache 统一接口，后端可换 Redis/SQL Server/Memory
public async Task<string?> GetCachedAsync(string key)
{
    var bytes = await _distributedCache.GetAsync(key);
    return bytes is null ? null : Encoding.UTF8.GetString(bytes);
}

// 3. 响应缓存（HTTP 缓存）
builder.Services.AddResponseCaching();
app.UseResponseCaching();

[HttpGet]
[ResponseCache(Duration = 60, VaryByQueryKeys = new[] { "page", "size" })]
public IActionResult GetList([FromQuery] int page, [FromQuery] int size) { ... }

// 4. HybridCache（.NET 9，结合内存+分布式）
builder.Services.AddHybridCache();

public async Task<ProductDto?> GetAsync(int id, CancellationToken ct)
    => await _hybridCache.GetOrCreateAsync(
        $"product:{id}",
        async ct => await _repo.FindByIdAsync(id, ct),
        new HybridCacheEntryOptions
        {
            Expiration = TimeSpan.FromMinutes(10),
            LocalCacheExpiration = TimeSpan.FromMinutes(2)
        },
        cancellationToken: ct);
```

---

### 可观测性：结构化日志 (Serilog) 与链路追踪

```csharp
// 内置 ILogger（依赖注入）
public class ProductsController : ControllerBase
{
    private readonly ILogger<ProductsController> _logger;

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        // 结构化日志：花括号内是属性名，可被日志平台索引
        _logger.LogInformation("查询产品 {ProductId}", id);

        var product = await _service.GetByIdAsync(id);
        if (product is null)
        {
            _logger.LogWarning("产品 {ProductId} 不存在", id);
            return NotFound();
        }

        _logger.LogDebug("返回产品 {@Product}", product);  // @ 符号序列化整个对象
        return Ok(product);
    }
}
```

**Serilog 集成（推荐）：**

```bash
dotnet add package Serilog.AspNetCore
dotnet add package Serilog.Sinks.Console
dotnet add package Serilog.Sinks.File
dotnet add package Serilog.Sinks.Seq
```

```csharp
// Program.cs
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Information()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Warning)
    .MinimumLevel.Override("Microsoft.Hosting.Lifetime", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .Enrich.WithEnvironmentName()
    .Enrich.WithMachineName()
    .WriteTo.Console(new JsonFormatter())  // 结构化 JSON 输出
    .WriteTo.File("logs/app-.log",
        rollingInterval: RollingInterval.Day,
        retainedFileCountLimit: 30)
    .WriteTo.Seq("http://seq-server:5341")
    .CreateLogger();

builder.Host.UseSerilog();

// 中间件：自动记录每个请求
app.UseSerilogRequestLogging(options =>
{
    options.MessageTemplate = "{RequestMethod} {RequestPath} 响应 {StatusCode} 耗时 {Elapsed:0.000}ms";
    options.EnrichDiagnosticContext = (diagnosticContext, httpContext) =>
    {
        diagnosticContext.Set("RequestHost", httpContext.Request.Host.Value);
        diagnosticContext.Set("UserId", httpContext.User.FindFirstValue(ClaimTypes.NameIdentifier));
    };
});
```

---

### 服务可靠性：健康检查 (Health Checks) 监控

```bash
dotnet add package AspNetCore.HealthChecks.SqlServer
dotnet add package AspNetCore.HealthChecks.Redis
dotnet add package AspNetCore.HealthChecks.UI
```

```csharp
builder.Services
    .AddHealthChecks()
    .AddSqlServer(
        connectionString: builder.Configuration.GetConnectionString("Default")!,
        name: "sql-server",
        tags: new[] { "db", "ready" })
    .AddRedis(
        redisConnectionString: builder.Configuration.GetConnectionString("Redis")!,
        name: "redis",
        tags: new[] { "cache", "ready" })
    .AddUrlGroup(
        uri: new Uri("https://external-api.example.com/ping"),
        name: "external-api",
        tags: new[] { "external" })
    .AddCheck<CustomHealthCheck>("custom", tags: new[] { "ready" });

// 自定义健康检查
public class CustomHealthCheck : IHealthCheck
{
    public Task<HealthCheckResult> CheckHealthAsync(
        HealthCheckContext context, CancellationToken ct = default)
    {
        var isHealthy = /* 业务逻辑 */ true;
        return Task.FromResult(isHealthy
            ? HealthCheckResult.Healthy("一切正常")
            : HealthCheckResult.Degraded("部分功能受损",
                data: new Dictionary<string, object> { { "queue_depth", 10000 } }));
    }
}

// 暴露端点（Kubernetes liveness/readiness 探针分离）
app.MapHealthChecks("/health/live", new HealthCheckOptions
{
    Predicate = _ => false  // 只要应用还在运行就返回 200，不检查依赖
});

app.MapHealthChecks("/health/ready", new HealthCheckOptions
{
    Predicate = check => check.Tags.Contains("ready"),  // 检查数据库、缓存等
    ResponseWriter = UIResponseWriter.WriteHealthCheckUIResponse
});
```

---

### 外部调用：HttpClientFactory 深度实践与弹性机制

在现代分布式系统中，API 并不总是孤立运行。高效、稳健地调用第三方服务是企业级应用的核心能力。

#### 1. 为什么严禁直接 `new HttpClient()`？
*   **套接字耗尽 (Socket Exhaustion)**：虽然 `HttpClient` 实现了 `IDisposable`，但底层 Socket 在关闭后会进入 `TIME_WAIT` 状态（默认持续 4 分钟）。高并发下会迅速耗尽服务器可用端口。
*   **DNS 缓存失效**：如果将 `HttpClient` 定义为单例，它将永久绑定到首次解析的 IP 地址，无法感知目标服务器的 DNS 故障转移或扩容。

`IHttpClientFactory` 通过**资源池化管理 `HttpMessageHandler`** 的生命周期，完美平衡了上述两个难题。

#### 2. 核心使用模式

##### A. 类型化客户端 (Typed Clients) - 工业级推荐
利用 DI 容器将配置逻辑与业务逻辑解耦，代码最具可读性且易于单元测试。

```csharp
public class OrderApiClient
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<OrderApiClient> _logger;

    public OrderApiClient(HttpClient httpClient, ILogger<OrderApiClient> logger)
    {
        _httpClient = httpClient;
        _logger = logger;
    }

    public async Task<OrderDto?> GetOrderAsync(int id)
    {
        // 核心优化：使用 GetFromJsonAsync 内部基于流的处理，性能优于先字符串再反序列化
        return await _httpClient.GetFromJsonAsync<OrderDto>($"api/orders/{id}");
    }
}

// 在 Program.cs 中注册
builder.Services.AddHttpClient<OrderApiClient>(client =>
{
    client.BaseAddress = new Uri("https://orders-service.com/");
    client.DefaultRequestHeaders.Add("X-API-Key", "secret-key");
});
```

##### B. 命名客户端 (Named Clients)
适用于一个类需要调用多个不同配置的 API。

```csharp
builder.Services.AddHttpClient("Inventory", c => c.BaseAddress = new Uri("..."));

// 注入 IHttpClientFactory 手动创建
var client = _factory.CreateClient("Inventory");
```

#### 3. 拦截器：DelegatingHandler 
就像服务端的中间件一样，`DelegatingHandler` 允许你对发出的每一个请求进行统一拦截处理（如自动添加 Token、记录耗时日志、签名加密等）。

```csharp
public class AuthHeaderHandler : DelegatingHandler
{
    protected override async Task<HttpResponseMessage> SendAsync(
        HttpRequestMessage request, CancellationToken ct)
    {
        request.Headers.Authorization = new AuthenticationHeaderValue("Bearer", "token-from-somewhere");
        return await base.SendAsync(request, ct);
    }
}

// 注册
builder.Services.AddTransient<AuthHeaderHandler>();
builder.Services.AddHttpClient<OrderApiClient>().AddHttpMessageHandler<AuthHeaderHandler>();
```

#### 4. 弹性能力集成：Polly 实战
通过 `Microsoft.Extensions.Http.Polly` 扩展，可以为 HttpClient 瞬间注入容错能力。

```csharp
builder.Services.AddHttpClient<OrderApiClient>()
    .AddTransientHttpErrorPolicy(p => p.WaitAndRetryAsync(3, _ => TimeSpan.FromSeconds(2)))
    .AddTransientHttpErrorPolicy(p => p.CircuitBreakerAsync(5, TimeSpan.FromSeconds(30)));
```
*   **重试策略 (Retry)**：针对网络抖动或 503 错误自动重跑。
*   **熔断策略 (Circuit Breaker)**：当目标服务持续崩溃时，主动“断路”停止发车，防止自身线程被挂起拖累。

#### 5. 性能极致优化点
*   **JsonSerializerOptions**：务必重用 `JsonSerializerOptions` 对象，甚至直接使用 `JsonTypeInfo` 代替（Source Generator 模式）以消灭反射性能开销。
*   **响应流式处理**：对于大数据量返回，严禁使用 `GetStringAsync`。应使用 `GetAsync` 配合 `stream.ReadAsStreamAsync()`，并直接传递给反序列化器，从而实现**零拷贝**与**极低内存占用**。

---

### 轻量化趋势：Minimal API 构建指南

.NET 6 引入的极简风格，适合微服务、轻量端点：

```csharp
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<IProductService, ProductService>();
var app = builder.Build();

// 路由组（共享前缀和过滤器）
var productsGroup = app.MapGroup("/api/v1/products")
    .WithTags("Products")        // Swagger 分组
    .RequireAuthorization()      // 组内所有端点需要认证
    .WithOpenApi();

// CRUD 端点
productsGroup.MapGet("/", async (IProductService svc, [FromQuery] int page = 1) =>
    Results.Ok(await svc.GetAllAsync(page)));

productsGroup.MapGet("/{id:int}", async (int id, IProductService svc) =>
    await svc.GetByIdAsync(id) is { } product
        ? Results.Ok(product)
        : Results.NotFound());

productsGroup.MapPost("/", async (
    [FromBody] CreateProductDto dto,
    IProductService svc,
    LinkGenerator links,
    HttpContext ctx) =>
{
    var created = await svc.CreateAsync(dto);
    var url = links.GetUriByName(ctx, "GetProductById", new { id = created.Id });
    return Results.Created(url, created);
})
.WithName("CreateProduct")
.Produces<ProductDto>(201)
.ProducesValidationProblem();

productsGroup.MapPut("/{id:int}", async (int id, [FromBody] UpdateProductDto dto, IProductService svc) =>
{
    await svc.UpdateAsync(id, dto);
    return Results.NoContent();
});

productsGroup.MapDelete("/{id:int}", async (int id, IProductService svc) =>
{
    await svc.DeleteAsync(id);
    return Results.NoContent();
})
.WithName("GetProductById");

// 端点过滤器（类似 Action Filter）
productsGroup.MapPost("/upload", async (IFormFile file) =>
    Results.Ok(new { FileName = file.FileName }))
.AddEndpointFilter(async (context, next) =>
{
    var file = context.GetArgument<IFormFile>(0);
    if (file.Length > 10 * 1024 * 1024)
        return Results.BadRequest("文件不能超过 10MB");
    return await next(context);
});
```

**Minimal API 与 Controller 对比：**

| 特性 | Controller API | Minimal API |
|------|---------------|-------------|
| 代码量 | 多，结构化 | 少，扁平化 |
| 性能 | 略低 | 略高（更少反射） |
| 模型绑定 | 自动 | 手动指定 |
| 过滤器 | 完整 Filter Pipeline | 轻量 EndpointFilter |
| 适用场景 | 大型项目、复杂业务 | 微服务、轻量端点 |

---

---

### 自动化质量保障：集成测试 (xUnit & TestServer)

集成测试使用 `WebApplicationFactory<TProgram>` 在内存中启动完整应用：

```bash
dotnet add package Microsoft.AspNetCore.Mvc.Testing
dotnet add package xunit
dotnet add package FluentAssertions
```

```csharp
// 测试固件：定制测试环境
public class ApiTestFixture : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly MsSqlContainer _dbContainer = new MsSqlBuilder().Build();

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureTestServices(services =>
        {
            // 替换真实数据库为测试数据库
            services.RemoveAll<DbContextOptions<AppDbContext>>();
            services.AddDbContext<AppDbContext>(opts =>
                opts.UseSqlServer(_dbContainer.GetConnectionString()));

            // 替换外部服务
            services.RemoveAll<IEmailSender>();
            services.AddSingleton<IEmailSender, FakeEmailSender>();
        });
    }

    public async Task InitializeAsync()
    {
        await _dbContainer.StartAsync();
        // 执行数据库迁移
        using var scope = Services.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
        await db.Database.MigrateAsync();
    }

    public new async Task DisposeAsync()
        => await _dbContainer.DisposeAsync();
}

// 测试类
public class ProductsApiTests : IClassFixture<ApiTestFixture>
{
    private readonly HttpClient _client;

    public ProductsApiTests(ApiTestFixture fixture)
    {
        _client = fixture.CreateClient();
        // 设置 JWT 认证头
        _client.DefaultRequestHeaders.Authorization =
            new AuthenticationHeaderValue("Bearer", fixture.GenerateTestToken());
    }

    [Fact]
    public async Task GetById_ExistingProduct_Returns200WithProduct()
    {
        // Arrange - 准备测试数据（略）

        // Act
        var response = await _client.GetAsync("/api/v1/products/1");

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.OK);

        var product = await response.Content.ReadFromJsonAsync<ProductDto>();
        product.Should().NotBeNull();
        product!.Id.Should().Be(1);
        product.Name.Should().NotBeNullOrEmpty();
    }

    [Fact]
    public async Task CreateProduct_ValidDto_Returns201WithLocation()
    {
        // Arrange
        var dto = new CreateProductDto
        {
            Name = "测试产品",
            Price = 99.99m,
            CategoryId = 1
        };

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/products", dto);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.Created);
        response.Headers.Location.Should().NotBeNull();

        var created = await response.Content.ReadFromJsonAsync<ProductDto>();
        created!.Name.Should().Be(dto.Name);
    }

    [Fact]
    public async Task CreateProduct_InvalidDto_Returns400WithValidationErrors()
    {
        // Arrange
        var dto = new CreateProductDto { Name = "", Price = -1 };  // 无效数据

        // Act
        var response = await _client.PostAsJsonAsync("/api/v1/products", dto);

        // Assert
        response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

        var problem = await response.Content.ReadFromJsonAsync<ValidationProblemDetails>();
        problem!.Errors.Should().ContainKey("Name");
        problem.Errors.Should().ContainKey("Price");
    }

    [Fact]
    public async Task GetById_Unauthorized_Returns401()
    {
        // 移除认证头
        _client.DefaultRequestHeaders.Authorization = null;

        var response = await _client.GetAsync("/api/v1/products/1");

        response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
    }
}
```

---

---

### 生产发布：IIS (Internet Information Services) 托管实战

将 ASP.NET Core API 部署到 IIS 与传统的 ASP.NET (.NET Framework) 有很大不同。ASP.NET Core 并不直接运行在 IIS 工作进程中，而是通过 **IIS AspNetCore 模块 (ANCM)** 进行反向代理。以下是完整的配置流程：

#### 1. 环境准备（服务器端）
在配置 IIS 之前，必须安装 **.NET Core Hosting Bundle**（托管捆绑包）。它包含了让 IIS 识别并运行 .NET Core 程序所需的运行时和 IIS 模块。
*   **下载与安装**：下载对应版本的 Hosting Bundle。
*   **服务重启**：安装完成后，打开 CMD 输入 `iisreset` 重启 IIS 服务。
*   **检查验证**：打开 IIS 管理器，点击服务器节点 -> “模块”，确保列表中出现了 `AspNetCoreModuleV2`。

#### 2. 发布程序 (Publish)
不要直接拷贝源代码或生成后的 bin 文件夹。你需要执行正式的“发布”操作：
*   在 Visual Studio 中右键点击项目 -> **发布 (Publish)**。
*   **部署模式**：建议选择“框架依赖 (Framework-Dependent)”。
*   **目标运行时**：可移植 (Portable) 或 `win-x64`。
*   **产物**：发布后会得到一个包含 `.dll`、`web.config` 和 `appsettings.json` 的文件夹。

#### 3. IIS 站点配置
*   **步骤 A：创建应用程序池**
    *   名称：建议与项目同名。
    *   **.NET CLR 版本**：必须选择 **无托管代码 (No Managed Code)**。
    *   *原因：IIS 此时仅充当反向代理，不负责解析 .NET 逻辑，逻辑由 Kestrel 引擎执行。*
*   **步骤 B：添加网站**
    *   **物理路径**：指向发布产生的文件夹。
    *   **应用程序池**：选择刚才创建的“无托管代码”池。
    *   **绑定**：设置对应的 IP、端口或域名。

#### 4. 权限配置（关键环节）
若出现 500.19 或 500.30 错误，通常是权限不足。需为发布文件夹授权：
1.  右键文件夹 -> 属性 -> 安全 -> 编辑 -> 添加。
2.  输入 `IIS AppPool\你的应用程序池名称`（例如 `IIS AppPool\MyApi`）。
3.  赋予 **“读取和执行”**、**“列出文件夹内容”** 和 **“读取”** 权限。

#### 5. 详解 web.config 参数
发布后生成的 `web.config` 是 IIS 与程序之间的“翻译官”：
```xml
<configuration>
  <system.webServer>
    <handlers>
      <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
    </handlers>
    <aspNetCore processPath="dotnet" 
                arguments=".\YourApp.dll" 
                stdoutLogEnabled="false" 
                stdoutLogFile=".\logs\stdout" 
                hostingModel="inprocess" />
  </system.webServer>
</configuration>
```
*   **hostingModel="inprocess"**：进程内托管。这是 .NET Core 3.0+ 的默认值，性能最高（API 直接在 `w3wp.exe` 中运行）。
*   **stdoutLogEnabled="true"**：若启动失败且无报错，请将其设为 `true`，错误信息将记录到 `logs` 文件夹中。

#### 6. 常见问题排查 (Troubleshooting)

| 现象 | 可能原因 | 解决方法 |
| :--- | :--- | :--- |
| **500.19** | web.config 格式错误或未安装 Hosting Bundle | 检查 XML 语法；确认 Hosting Bundle 已安装并重启 IIS。 |
| **500.30** | 运行时故障（程序启动即崩溃） | 在发布目录手动运行 `dotnet YourApp.dll` 查看控制台输出报错。 |
| **404** | 路由配置不正确或环境限制 | 确认请求路径；检查 Swagger 是否被 `app.Environment.IsDevelopment()` 限制（生产环境默认不可见）。 |
| **503** | 应用程序池崩溃或未启动 | 检查应用池状态，确认其配置为“无托管代码”。 |

> **💡 特别提示：关于 Swagger 首页**
> 默认情况下，`Program.cs` 里的条件判断会阻止 Swagger 在生产环境运行。若需在服务器访问 Swagger，请移除 `if (app.Environment.IsDevelopment())` 限制，或将服务器环境变量设置为 `Development`。

---

### 可选进阶：Docker 容器化部署

对于需要快速横向扩展或跨平台一致性的场景，Docker 依然是首选方案。

#### 多阶段 Dockerfile 优化
```dockerfile
# 构建阶段
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["MyApi/MyApi.csproj", "MyApi/"]
RUN dotnet restore "MyApi/MyApi.csproj"
COPY . .
RUN dotnet publish "MyApi/MyApi.csproj" -c Release -o /app/publish

# 运行阶段
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
USER 1000 # 安全：非 root 运行
ENTRYPOINT ["dotnet", "MyApi.dll"]
```

---

> **章节总结**：ASP.NET Web API 是工业物联网中纵向数据整合的关键环节。在完成从路由器匹配、模型绑定、业务逻辑到安全认证的开发逻辑后，针对具体的交付环境选择合适的部署策略至关重要。对于传统 Windows 生态，基于 **IIS + Hosting Bundle** 的静态托管方案凭借其在负载均衡、权限集成及管理便利性上的优势，是实现高可靠 Web 服务的首选路径；而对于现代化弹性扩展需求，Docker 与反向代理的组合则提供了更强的环境一致性保障。掌握这一全链路知识，是完成从“写代码”到“交付服务”转变的核心跨越。
