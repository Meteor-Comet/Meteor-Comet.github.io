---
layout: post
title:  "ASP.NET 开发笔记：核心架构与 Web 应用实战"
subtitle: "探索 ASP.NET Core 高性能跨平台 Web 应用程序开发框架及其在工业互联网中的应用"
date:   2026-04-10 10:00:00 +0800
author:     "Comet"
catalog:    true
header-style: text
tags:
    - ASP.NET
    - Web
    - C#
---

# ASP.NET Web API 核心实战指南

ASP.NET Core 是一款由微软开发的高性能、开源且跨平台的框架，广泛应用于构建现代 Web 应用程序。在工业物联网（IIoT）与企业级开发中，Web API 作为数据交互的核心，其稳定性和性能至关重要。

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

### 外部调用：HttpClientFactory 最佳实践与资源池化

直接 `new HttpClient()` 存在套接字耗尽和 DNS 缓存问题，`IHttpClientFactory` 是标准解法：

```csharp
// 方式一：命名客户端
builder.Services.AddHttpClient("github", client =>
{
    client.BaseAddress = new Uri("https://api.github.com/");
    client.DefaultRequestHeaders.Add("Accept", "application/vnd.github.v3+json");
    client.DefaultRequestHeaders.Add("User-Agent", "MyApp/1.0");
    client.Timeout = TimeSpan.FromSeconds(30);
})
.AddTransientHttpErrorPolicy(policy =>  // 集成 Polly：自动重试
    policy.WaitAndRetryAsync(3, retry => TimeSpan.FromSeconds(Math.Pow(2, retry))))
.AddTransientHttpErrorPolicy(policy =>  // 熔断
    policy.CircuitBreakerAsync(5, TimeSpan.FromSeconds(30)));

// 使用命名客户端
public class GitHubService
{
    private readonly HttpClient _client;

    public GitHubService(IHttpClientFactory factory)
        => _client = factory.CreateClient("github");

    public async Task<GitHubUser?> GetUserAsync(string login)
    {
        var response = await _client.GetAsync($"users/{login}");
        response.EnsureSuccessStatusCode();
        return await response.Content.ReadFromJsonAsync<GitHubUser>();
    }
}

// 方式二：类型化客户端（推荐，更易测试）
public class WeatherApiClient
{
    private readonly HttpClient _client;

    public WeatherApiClient(HttpClient client)
    {
        _client = client;
        _client.BaseAddress = new Uri("https://api.weather.com/");
    }

    public async Task<WeatherData?> GetCurrentAsync(string city)
        => await _client.GetFromJsonAsync<WeatherData>($"current?city={city}");
}

builder.Services.AddHttpClient<WeatherApiClient>()
    .SetHandlerLifetime(TimeSpan.FromMinutes(5));  // 重用时间

// 直接注入类型化客户端
public class ForecastController : ControllerBase
{
    private readonly WeatherApiClient _weather;

    public ForecastController(WeatherApiClient weather)
        => _weather = weather;
}
```

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

### 生产发布：Docker 容器化与 Nginx 反向代理配置

#### 多阶段 Dockerfile

```dockerfile
# 阶段一：构建
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# 先复制 csproj，利用 Docker 层缓存避免每次重新还原包
COPY ["MyApi/MyApi.csproj", "MyApi/"]
RUN dotnet restore "MyApi/MyApi.csproj"

COPY . .
WORKDIR "/src/MyApi"
RUN dotnet publish "MyApi.csproj" -c Release -o /app/publish \
    --no-restore \
    /p:UseAppHost=false

# 阶段二：运行（最小化镜像）
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app

# 安全：非 root 用户运行
RUN adduser --disabled-password --gecos '' appuser && chown -R appuser /app
USER appuser

COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production
EXPOSE 8080

ENTRYPOINT ["dotnet", "MyApi.dll"]
```

#### docker-compose.yml（本地开发）

```yaml
version: '3.8'
services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - ConnectionStrings__Default=Server=db;Database=MyDb;User=sa;Password=YourStrong@Passw0rd;
      - ConnectionStrings__Redis=redis:6379
      - ASPNETCORE_ENVIRONMENT=Development
    depends_on:
      db:
        condition: service_healthy
      redis:
        condition: service_started
    restart: unless-stopped

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStrong@Passw0rd
    ports:
      - "1433:1433"
    healthcheck:
      test: /opt/mssql-tools/bin/sqlcmd -S localhost -U sa -P "$$SA_PASSWORD" -Q "SELECT 1"
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
      - ./certs:/etc/nginx/certs:ro
    depends_on:
      - api
```

#### Nginx 反向代理配置

```nginx
upstream aspnet_api {
    server api:8080;
    keepalive 32;
}

server {
    listen 80;
    server_name api.example.com;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name api.example.com;

    ssl_certificate     /etc/nginx/certs/fullchain.pem;
    ssl_certificate_key /etc/nginx/certs/privkey.pem;
    ssl_protocols       TLSv1.2 TLSv1.3;
    ssl_ciphers         HIGH:!aNULL:!MD5;

    # 安全响应头
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";

    location / {
        proxy_pass          http://aspnet_api;
        proxy_http_version  1.1;
        proxy_set_header    Upgrade $http_upgrade;
        proxy_set_header    Connection keep-alive;
        proxy_set_header    Host $host;
        proxy_set_header    X-Real-IP $remote_addr;
        proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header    X-Forwarded-Proto $scheme;
        proxy_cache_bypass  $http_upgrade;
        proxy_read_timeout  60s;
        proxy_send_timeout  60s;
        client_max_body_size 50m;
    }
}
```

**处理转发头（Program.cs）：** 在 Nginx 后面部署时，需要让 ASP.NET Core 正确识别客户端真实 IP 和协议：

```csharp
// 必须在所有其他中间件之前
app.UseForwardedHeaders(new ForwardedHeadersOptions
{
    ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
});
```

---

> **章节小结**：ASP.NET Web API 是一个层次分明、高度可扩展的框架。掌握请求管道的流向是一切的基础——从 URL 进入路由匹配，经过中间件层层处理，到 Filter Pipeline 的精细控制，再到 Controller 的业务执行，最终通过格式化层返回规范化的 HTTP 响应。在此基础上，叠加 JWT 安全、版本管理、限流、可观测性等生产级特性，配合 Docker 容器化部署，即可构建出健壮、可维护的企业级 REST API。
