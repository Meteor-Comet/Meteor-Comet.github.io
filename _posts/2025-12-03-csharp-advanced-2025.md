---
layout: post
title: "C#进阶特性详解"
subtitle: "泛型/委托与事件/反射与特性"
date: 2025-12-03 12:00:00
author: "Comet"
catalog: true
tags:
    - C#
    - 进阶特性
---
# C#进阶特性详解

## 目录

1. [LINQ（Language Integrated Query）](#linq-language-integrated-query)
2. [异步编程（async/await）](#异步编程-asyncawait)
3. [泛型编程](#泛型编程)
4. [委托与事件](#委托与事件)
5. [反射与特性](#反射与特性)
6. [表达式树](#表达式树)
7. [扩展方法](#扩展方法)
8. [动态类型（dynamic）](#动态类型-dynamic)
9. [元组（Tuples）](#元组-tuples)
10. [可空引用类型（Nullable Reference Types）](#可空引用类型-nullable-reference-types)

## LINQ（Language Integrated Query）

LINQ是C#中强大的查询语言集成特性，允许开发者使用统一的语法查询不同类型的数据源。

### LINQ的核心概念

#### 1. 查询表达式
查询表达式使用类似SQL的语法，提供了声明式的查询方式：

```csharp
var query = from student in students
            where student.Age > 18
            orderby student.Name
            select student;
```

#### 2. 方法语法
方法语法使用Lambda表达式和扩展方法：

```csharp
var query = students.Where(s => s.Age > 18)
                   .OrderBy(s => s.Name);
```

#### 3. 延迟执行
LINQ查询通常是延迟执行的，这意味着查询表达式在实际迭代时才会执行：

```csharp
var query = students.Where(s => s.Age > 18); // 不会立即执行
foreach (var student in query) { /* 此时才会执行查询 */ }
```

### LINQ的类型

#### 1. LINQ to Objects
用于查询内存中的集合：

```csharp
var numbers = new List<int> { 1, 2, 3, 4, 5 };
var evenNumbers = numbers.Where(n => n % 2 == 0);
```

#### 2. LINQ to SQL/EF
用于查询数据库：

```csharp
using (var context = new SchoolContext())
{
    var students = context.Students.Where(s => s.Grade == "A");
}
```

#### 3. LINQ to XML
用于查询和操作XML文档：

```csharp
XDocument doc = XDocument.Load("students.xml");
var studentNames = doc.Descendants("Student").Select(s => s.Element("Name").Value);
```

## 异步编程（async/await）

C#的异步编程模型使得编写并发和异步代码变得更加简单和直观。

### 异步编程的基本概念

#### 1. async关键字
用于标记一个方法为异步方法：

```csharp
public async Task<string> DownloadDataAsync(string url)
{
    // 异步操作
}
```

#### 2. await关键字
用于等待异步操作完成，同时不阻塞主线程：

```csharp
public async Task<string> DownloadDataAsync(string url)
{
    using (var client = new HttpClient())
    {
        string result = await client.GetStringAsync(url);
        return result;
    }
}
```

#### 3. Task和Task<T>
- `Task`表示一个没有返回值的异步操作
- `Task<T>`表示一个有返回值的异步操作

### 异步编程的最佳实践

1. **使用async/await而不是Task.Wait()或Task.Result**，避免死锁
2. **命名约定**：异步方法名应以"Async"结尾
3. **异常处理**：使用try-catch捕获异步操作的异常
4. **避免async void**，除非是事件处理器

```csharp
// 错误示例：可能导致死锁
public string DownloadData(string url)
{
    using (var client = new HttpClient())
    {
        return client.GetStringAsync(url).Result; // 同步等待，可能死锁
    }
}

// 正确示例：使用async/await
public async Task<string> DownloadDataAsync(string url)
{
    using (var client = new HttpClient())
    {
        return await client.GetStringAsync(url);
    }
}
```

## 泛型编程

泛型允许开发者编写可以处理多种数据类型的可重用代码，提高代码的类型安全性和性能。

### 泛型的基本概念

#### 1. 泛型类

```csharp
public class Stack<T>
{
    private List<T> _items = new List<T>();
    
    public void Push(T item)
    {
        _items.Add(item);
    }
    
    public T Pop()
    {
        if (_items.Count == 0)
            throw new InvalidOperationException("Stack is empty");
        
        T item = _items[_items.Count - 1];
        _items.RemoveAt(_items.Count - 1);
        return item;
    }
}
```

#### 2. 泛型方法

```csharp
public static T Max<T>(T a, T b) where T : IComparable<T>
{
    return a.CompareTo(b) > 0 ? a : b;
}
```

#### 3. 泛型约束

```csharp
public class Repository<T> where T : class, new()
{
    public void Add(T entity)
    {
        // 添加实体
    }
    
    public T Create()
    {
        return new T(); // 因为有new()约束
    }
}
```

常见的泛型约束：
- `where T : class`：T必须是引用类型
- `where T : struct`：T必须是值类型
- `where T : new()`：T必须有公共无参数构造函数
- `where T : <base class>`：T必须继承自指定的基类
- `where T : <interface>`：T必须实现指定的接口

## 委托与事件

委托和事件是C#中实现回调机制和观察者模式的核心特性。

### 委托

委托是一种引用类型，它可以引用具有特定签名的方法。

```csharp
// 定义委托类型
public delegate int Calculator(int x, int y);

// 实现符合委托签名的方法
public int Add(int x, int y)
{
    return x + y;
}

public int Multiply(int x, int y)
{
    return x * y;
}

// 使用委托
Calculator calc = Add;
int result1 = calc(5, 3); // 返回8

calc = Multiply;
int result2 = calc(5, 3); // 返回15
```

### 事件

事件是基于委托的一种机制，用于实现发布-订阅模式。

```csharp
// 定义事件参数类
public class TemperatureChangedEventArgs : EventArgs
{
    public double OldTemperature { get; }
    public double NewTemperature { get; }
    
    public TemperatureChangedEventArgs(double oldTemp, double newTemp)
    {
        OldTemperature = oldTemp;
        NewTemperature = newTemp;
    }
}

// 定义发布者类
public class Thermometer
{
    private double _temperature;
    
    // 定义事件
    public event EventHandler<TemperatureChangedEventArgs> TemperatureChanged;
    
    public double Temperature
    {
        get { return _temperature; }
        set
        {
            if (_temperature != value)
            {
                double oldTemp = _temperature;
                _temperature = value;
                
                // 触发事件
                OnTemperatureChanged(new TemperatureChangedEventArgs(oldTemp, value));
            }
        }
    }
    
    // 保护的虚拟方法，用于触发事件
    protected virtual void OnTemperatureChanged(TemperatureChangedEventArgs e)
    {
        TemperatureChanged?.Invoke(this, e);
    }
}

// 定义订阅者类
public class Heater
{
    public void OnTemperatureChanged(object sender, TemperatureChangedEventArgs e)
    {
        if (e.NewTemperature < 20)
        {
            Console.WriteLine("温度过低，启动加热器...");
        }
        else
        {
            Console.WriteLine("温度适宜，关闭加热器...");
        }
    }
}

// 使用事件
var thermometer = new Thermometer();
var heater = new Heater();

// 订阅事件
thermometer.TemperatureChanged += heater.OnTemperatureChanged;

// 改变温度，触发事件
thermometer.Temperature = 18;
thermometer.Temperature = 25;
```

## 反射与特性

反射允许程序在运行时获取类型信息并动态操作类型和对象，而特性则用于为代码添加元数据。

### 反射的基本概念

#### 1. 获取类型信息

```csharp
// 获取类型
Type type = typeof(string);
Type type2 = "Hello".GetType();

// 获取类型的属性
PropertyInfo[] properties = type.GetProperties();

// 获取类型的方法
MethodInfo[] methods = type.GetMethods();

// 获取类型的构造函数
ConstructorInfo[] constructors = type.GetConstructors();
```

#### 2. 动态创建对象

```csharp
// 使用默认构造函数创建对象
object obj = Activator.CreateInstance(typeof(string));

// 使用带参数的构造函数创建对象
object obj2 = Activator.CreateInstance(typeof(string), new object[] { 'a', 3 }); // 创建 "aaa"
```

#### 3. 动态调用方法

```csharp
// 获取String.ToUpper方法
MethodInfo toUpperMethod = typeof(string).GetMethod("ToUpper", Type.EmptyTypes);

// 调用方法
string str = "hello";
string result = (string)toUpperMethod.Invoke(str, null); // 返回 "HELLO"
```

### 特性

特性是一种允许将元数据附加到代码中的机制。

```csharp
// 定义自定义特性
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorAttribute : Attribute
{
    public string Name { get; }
    public string Version { get; set; }
    
    public AuthorAttribute(string name)
    {
        Name = name;
    }
}

// 使用自定义特性
[Author("Comet", Version = "1.0")]
public class Calculator
{
    [Author("Comet")]
    public int Add(int x, int y)
    {
        return x + y;
    }
}

// 读取特性信息
Type type = typeof(Calculator);
AuthorAttribute classAttribute = (AuthorAttribute)Attribute.GetCustomAttribute(type, typeof(AuthorAttribute));
Console.WriteLine($"类作者: {classAttribute.Name}, 版本: {classAttribute.Version}");

MethodInfo addMethod = type.GetMethod("Add");
AuthorAttribute methodAttribute = (AuthorAttribute)Attribute.GetCustomAttribute(addMethod, typeof(AuthorAttribute));
Console.WriteLine($"方法作者: {methodAttribute.Name}");
```

## 表达式树

表达式树是一种表示代码的数据结构，允许在运行时分析和操作代码。

### 表达式树的基本概念

```csharp
// 创建表达式树
Expression<Func<int, int, int>> addExpr = (x, y) => x + y;

// 分析表达式树
BinaryExpression body = (BinaryExpression)addExpr.Body;
ParameterExpression left = (ParameterExpression)body.Left;
ParameterExpression right = (ParameterExpression)body.Right;

Console.WriteLine($"表达式: {left.Name} {body.NodeType} {right.Name}");
```

### 编译和执行表达式树

```csharp
// 编译表达式树为委托
Func<int, int, int> addFunc = addExpr.Compile();

// 执行委托
int result = addFunc(5, 3); // 返回8
```

### 动态构建表达式树

```csharp
// 创建参数x和y
ParameterExpression x = Expression.Parameter(typeof(int), "x");
ParameterExpression y = Expression.Parameter(typeof(int), "y");

// 创建加法表达式x + y
BinaryExpression addExpr = Expression.Add(x, y);

// 创建Lambda表达式(x, y) => x + y
Expression<Func<int, int, int>> lambdaExpr = Expression.Lambda<Func<int, int, int>>(addExpr, x, y);

// 编译并执行
Func<int, int, int> addFunc = lambdaExpr.Compile();
int result = addFunc(5, 3); // 返回8
```

## 扩展方法

扩展方法允许开发者向现有类型添加方法，而无需修改原始类型或创建派生类。

### 扩展方法的基本概念

```csharp
// 定义扩展方法
public static class StringExtensions
{
    public static bool IsPalindrome(this string str)
    {
        string reversed = new string(str.Reverse().ToArray());
        return str.Equals(reversed, StringComparison.OrdinalIgnoreCase);
    }
}

// 使用扩展方法
string word = "Racecar";
bool isPalindrome = word.IsPalindrome(); // 返回true
```

### 扩展方法的规则

1. 扩展方法必须在静态类中定义
2. 扩展方法必须是静态方法
3. 第一个参数必须使用`this`关键字，指定要扩展的类型
4. 扩展方法不能访问扩展类型的私有成员

## 动态类型（dynamic）

动态类型允许开发者编写在编译时不进行类型检查的代码，类型检查延迟到运行时进行。

### 动态类型的基本概念

```csharp
dynamic x = 10;
dynamic y = "Hello";
dynamic z = new List<int>();

// 编译时不检查类型，运行时检查
x = x + 5; // 运行时执行整数加法
y = y.ToUpper(); // 运行时执行字符串的ToUpper方法
z.Add(1); // 运行时执行List<int>的Add方法
```

### 动态类型的使用场景

1. **与COM对象交互**
2. **与动态语言（如Python、JavaScript）交互**
3. **简化反射代码**
4. **处理动态数据（如JSON、XML）**

```csharp
// 使用dynamic简化反射代码
dynamic obj = Activator.CreateInstance(typeof(Calculator));
int result = obj.Add(5, 3); // 动态调用Add方法
```

## 元组（Tuples）

元组允许开发者将多个不同类型的值组合成一个单一的对象，而无需创建自定义类或结构体。

### 元组的基本概念

#### 1. 命名元组

```csharp
// 创建命名元组
var person = (Name: "张三", Age: 30, City: "北京");

// 访问元组成员
Console.WriteLine($"姓名: {person.Name}, 年龄: {person.Age}, 城市: {person.City}");
```

#### 2. 元组作为方法返回值

```csharp
// 方法返回多个值
public (int Sum, int Product) Calculate(int x, int y)
{
    return (x + y, x * y);
}

// 使用方法返回的元组
var result = Calculate(5, 3);
Console.WriteLine($"和: {result.Sum}, 积: {result.Product}");
```

#### 3. 元组的解构

```csharp
// 解构元组
var (sum, product) = Calculate(5, 3);
Console.WriteLine($"和: {sum}, 积: {product}");

// 使用下划线忽略某些成员
var (_, product2) = Calculate(5, 3);
Console.WriteLine($"积: {product2}");
```

## 可空引用类型（Nullable Reference Types）

C# 8.0引入了可空引用类型，用于明确区分可以为null和不可以为null的引用类型。

### 可空引用类型的基本概念

#### 1. 非空引用类型

```csharp
// 非空引用类型，不能为null
string nonNullable = "Hello";
// nonNullable = null; // 编译错误
```

#### 2. 可空引用类型

```csharp
// 可空引用类型，可以为null
string? nullable = "Hello";
nullable = null; // 允许
```

#### 3. 空值检查

```csharp
// 使用null条件运算符
string? name = null;
int? length = name?.Length;

// 使用null合并运算符
string displayName = name ?? "未知";

// 使用null合并赋值运算符
name ??= "默认名称";
```

### 可空引用类型的配置

在项目文件中启用可空引用类型：

```xml
<Project Sdk="Microsoft.NET.Sdk">
  
  <PropertyGroup>
    <OutputType>Exe</OutputType>
    <TargetFramework>net6.0</TargetFramework>
    <Nullable>enable</Nullable> <!-- 启用可空引用类型 -->
  </PropertyGroup>
  
</Project>
```

或者在文件顶部使用#nullable指令：

```csharp
#nullable enable

string? nullable = "Hello";
```

# 总结

C#的进阶特性大大增强了语言的表达能力和开发效率，包括：

1. **LINQ**：提供了统一的查询语法，简化了数据访问
2. **异步编程**：使用async/await简化并发和异步代码
3. **泛型**：提高代码的可重用性和类型安全性
4. **委托与事件**：实现回调机制和观察者模式
5. **反射与特性**：允许运行时类型检查和元数据操作
6. **表达式树**：支持动态代码生成和分析
7. **扩展方法**：向现有类型添加方法而无需修改原始类型
8. **动态类型**：支持运行时类型检查和动态操作
9. **元组**：简化多值返回和数据组合
10. **可空引用类型**：提高代码的安全性，减少空引用异常

掌握这些进阶特性将帮助开发者编写更高效、更安全、更可维护的C#代码。