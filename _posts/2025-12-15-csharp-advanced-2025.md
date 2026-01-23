---
layout: post
title: "C#进阶特性详解"
subtitle: "泛型/委托与事件/反射与特性"
date: 2025-12-15 12:00:00
author: "Comet"
catalog: true
tags:
    - C#
    - 进阶特性
---

## 目录

1. [C#泛型详解](#generics-detail)
   - [泛型的基本概念](#generics-concept)
   - [泛型类与泛型接口](#generics-class-interface)
   - [泛型方法](#generics-method)
   - [泛型约束](#generics-constraints)
   - [泛型委托](#generics-delegate)
   - [协变与逆变](#generics-variance)
   - [泛型的性能优势](#generics-performance)
   - [泛型的应用场景](#generics-scenarios)
2. [C#委托与Lambda表达式进阶](#delegates-lambda-advanced)
   - [匿名函数与Lambda表达式](#anonymous-function-lambda)
   - [Func委托详解](#func-delegate-advanced)
   - [Action委托详解](#action-delegate-advanced)
   - [Predicate委托详解](#predicate-delegate-advanced)
   - [委托链与事件](#delegate-chain-event)
   - [表达式树](#expression-trees)
3. [C# LINQ详解](#linq-detail)
   - [LINQ的基本概念](#linq-concept)
   - [LINQ查询语法](#linq-query-syntax)
   - [LINQ方法语法](#linq-method-syntax)
   - [标准查询操作符](#standard-query-operators)
   - [LINQ to Objects](#linq-to-objects)
   - [LINQ to SQL](#linq-to-sql)
   - [LINQ to XML](#linq-to-xml)
   - [LINQ性能优化](#linq-performance)
   - [LINQ应用场景](#linq-scenarios)
4. [C# ORM框架详解](#orm-frameworks)
   - [ADO.NET基础](#ado-net-basics)
   - [ADO.NET连接管理](#ado-net-connection)
   - [ADO.NET命令执行](#ado-net-commands)
   - [ADO.NET数据读取](#ado-net-data-reader)
   - [ADO.NET参数化查询](#ado-net-parameters)
   - [ADO.NET事务处理](#ado-net-transactions)
   - [ADO.NET存储过程](#ado-net-stored-procedures)
   - [Entity Framework 6基础](#ef6-basics)
   - [DbContext详解](#dbcontext-detail)
   - [DbSet详解](#dbset-detail)
   - [实体配置](#entity-configuration)
   - [关系配置](#relationship-configuration)
   - [数据查询](#ef6-querying)
   - [数据修改](#ef6-modifying)
   - [变更跟踪](#change-tracking)
   - [并发控制](#concurrency-control)
   - [迁移（Migrations）](#migrations)
   - [性能优化](#ef6-performance)
   - [高级特性](#ef6-advanced)
5. [C#设计模式详解](#design-patterns)
   - [单例模式](#singleton-pattern)
   - [工厂模式](#factory-pattern)
   - [观察者模式](#observer-pattern)
   - [策略模式](#strategy-pattern)
   - [适配器模式](#adapter-pattern)
   - [装饰器模式](#decorator-pattern)
   - [依赖注入模式](#dependency-injection-pattern)
6. [C#通信编程详解](#communication-programming)
   - [TCP/IP通信基础](#tcp-ip-basics)
   - [Socket编程](#socket-programming)
   - [TcpClient与TcpListener](#tcpclient-tcplistener)
   - [UdpClient编程](#udpclient-programming)
   - [HTTP通信](#http-communication)
   - [WebSocket通信](#websocket-communication)
   - [命名管道通信](#named-pipes)
   - [WCF通信](#wcf-communication)
   - [gRPC通信](#grpc-communication)
   - [消息队列](#message-queues)
7. [C#特性（Attributes）详解](#attributes-detail)
   - [特性的基本概念](#attributes-concept)
   - [特性的定义与使用](#attributes-usage)
   - [常见内置特性](#common-attributes)
   - [自定义特性](#custom-attributes)
   - [特性的反射访问](#attributes-reflection)
   - [特性的应用场景](#attributes-scenarios)
7. [C#反射（Reflection）详解](#reflection-detail)
   - [反射的基本概念](#reflection-concept)
   - [Type类型详解](#type-class)
   - [程序集（Assembly）操作](#assembly-operations)
   - [类型成员访问](#type-members)
   - [动态创建对象](#dynamic-object-creation)
   - [方法调用与属性访问](#method-property-access)
   - [泛型类型的反射](#generic-reflection)
   - [反射的性能优化](#reflection-performance)
   - [反射的应用场景](#reflection-scenarios)
8. [C#异步编程详解](#async-programming)
   - [异步编程基础](#async-basics)
   - [async/await关键字](#async-await)
   - [Task与Task\<T>](#task-types)
   - [异步方法最佳实践](#async-best-practices)
   - [异步编程与WinForm集成](#async-winform)
9. [C#文件操作与流处理](#file-stream)
   - [文件操作基础](#file-basics)
   - [流（Stream）概述](#stream-overview)
   - [FileStream文件流](#filestream)
   - [StreamReader和StreamWriter](#stream-reader-writer)
   - [MemoryStream内存流](#memorystream)
   - [文件操作与WinForm集成](#file-winform)
10. [C#多线程编程详解](#multithreading)
   - [多线程基础概念](#multithreading-basics)
   - [Thread类详解](#thread-class)
   - [ThreadPool线程池](#threadpool)
   - [线程同步机制](#thread-synchronization)
   - [线程安全集合](#thread-safe-collections)
   - [并行编程（Parallel类）](#parallel-programming)
   - [任务并行库（TPL）](#task-parallel-library)
   - [线程间通信](#thread-communication)
   - [死锁与竞态条件](#deadlock-race-condition)
   - [多线程最佳实践](#multithreading-best-practices)


## <a id="generics-detail"></a>C#泛型详解

泛型是C#中一项强大的特性，它允许在编写代码时不指定具体类型，而是在使用时再指定类型参数。泛型提供了类型安全、代码重用和性能优化等好处，是现代C#开发中不可或缺的一部分。

### <a id="generics-concept"></a>泛型的基本概念

泛型的核心思想是"参数化类型"，即把类型作为参数传递给类、接口、方法等。通过泛型，可以创建适用于多种数据类型的可重用组件，同时保持类型安全。

#### 泛型的语法表示

在C#中，泛型通过尖括号`<>`和类型参数来表示。例如：

```csharp
// 泛型类
class GenericClass<T>
{
    // 类型参数T可以在类内部作为类型使用
    private T _value;
    
    public void SetValue(T value)
    {
        _value = value;
    }
    
    public T GetValue()
    {
        return _value;
    }
}
```

#### 泛型的优势

1. **类型安全**：泛型在编译时进行类型检查，避免了运行时的类型转换错误
2. **代码重用**：一套泛型代码可以适用于多种数据类型
3. **性能优化**：减少了装箱和拆箱操作，提高了性能
4. **可读性**：代码更加清晰，类型意图明确

### <a id="generics-class-interface"></a>泛型类与泛型接口

泛型类和泛型接口是C#中最常用的泛型形式，它们允许在定义时指定类型参数，在实例化时提供具体类型。

#### 泛型类

泛型类的定义与普通类类似，但需要在类名后添加类型参数：

```csharp
// 单类型参数泛型类
public class Stack<T>
{
    private T[] _items;
    private int _count;
    
    public Stack(int capacity)
    {
        _items = new T[capacity];
        _count = 0;
    }
    
    public void Push(T item)
    {
        if (_count == _items.Length)
        {
            Array.Resize(ref _items, _items.Length * 2);
        }
        _items[_count++] = item;
    }
    
    public T Pop()
    {
        if (_count == 0)
        {
            throw new InvalidOperationException("Stack is empty");
        }
        return _items[--_count];
    }
    
    public bool IsEmpty => _count == 0;
}

// 使用泛型类
var intStack = new Stack<int>(5);
intStack.Push(10);
intStack.Push(20);
int value = intStack.Pop(); // 20

var stringStack = new Stack<string>(5);
stringStack.Push("Hello");
stringStack.Push("World");
string text = stringStack.Pop(); // "World"
```

#### 泛型接口

泛型接口的定义与泛型类类似，在接口名后添加类型参数：

```csharp
// 泛型接口
public interface IRepository<T>
{
    T GetById(int id);
    void Add(T entity);
    void Update(T entity);
    void Delete(T entity);
    IEnumerable<T> GetAll();
}

// 实现泛型接口
public class UserRepository : IRepository<User>
{
    private List<User> _users = new List<User>();
    
    public User GetById(int id)
    {
        return _users.FirstOrDefault(u => u.Id == id);
    }
    
    public void Add(User entity)
    {
        _users.Add(entity);
    }
    
    public void Update(User entity)
    {
        var user = GetById(entity.Id);
        if (user != null)
        {
            user.Name = entity.Name;
            user.Email = entity.Email;
        }
    }
    
    public void Delete(User entity)
    {
        _users.Remove(entity);
    }
    
    public IEnumerable<User> GetAll()
    {
        return _users;
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
```

### <a id="generics-method"></a>泛型方法

泛型方法是在方法级别定义类型参数的方法，它可以是泛型类的成员，也可以是普通类的成员。

#### 泛型方法的定义与使用

```csharp
public class GenericMethods
{
    // 泛型方法
    public T Max<T>(T a, T b) where T : IComparable<T>
    {
        return a.CompareTo(b) > 0 ? a : b;
    }
    
    // 静态泛型方法
    public static void Swap<T>(ref T a, ref T b)
    {
        T temp = a;
        a = b;
        b = temp;
    }
    
    // 泛型方法与类型推断
    public void Print<T>(T value)
    {
        Console.WriteLine($"Value: {value}, Type: {typeof(T).Name}");
    }
}

// 使用泛型方法
var genericMethods = new GenericMethods();

// 显式指定类型参数
int maxInt = genericMethods.Max<int>(10, 20); // 20
string maxString = genericMethods.Max<string>("apple", "banana"); // "banana"

// 类型推断
int a = 10, b = 20;
GenericMethods.Swap(ref a, ref b); // a=20, b=10

// 类型推断
genericMethods.Print(10); // Value: 10, Type: Int32
genericMethods.Print("Hello"); // Value: Hello, Type: String
genericMethods.Print(3.14); // Value: 3.14, Type: Double
```

#### 泛型方法的类型推断

C#编译器可以根据方法参数的类型自动推断泛型方法的类型参数，这使得代码更加简洁。例如：

```csharp
// 编译器推断T为int
genericMethods.Print(10);

// 编译器推断T为string
genericMethods.Print("Hello");
```

### <a id="generics-constraints"></a>泛型约束

泛型约束允许限制泛型类型参数可以接受的类型，增加了泛型代码的安全性和功能性。C#提供了多种类型的泛型约束：

#### 约束类型

| 约束 | 说明 |
|------|------|
| `where T : struct` | T必须是值类型 |
| `where T : class` | T必须是引用类型 |
| `where T : new()` | T必须有一个无参数的公共构造函数 |
| `where T : <base class name>` | T必须是指定基类或派生自指定基类 |
| `where T : <interface name>` | T必须实现指定接口 |
| `where T : U` | T必须是另一个类型参数U或派生自U |

#### 约束的使用

```csharp
// 多个约束，用逗号分隔
public class GenericConstraintExample<T, U>
    where T : class, IComparable<T>, new()
    where U : struct
{
    public T CreateInstance()
    {
        // 使用new()约束创建实例
        return new T();
    }
    
    public int Compare(T a, T b)
    {
        // 使用IComparable<T>约束调用CompareTo方法
        return a.CompareTo(b);
    }
    
    public void Process(U value)
    {
        // U是值类型
        Console.WriteLine($"Processing value: {value}");
    }
}

// 实现IComparable接口的类
public class Person : IComparable<Person>
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public int CompareTo(Person other)
    {
        if (other == null) return 1;
        return Age.CompareTo(other.Age);
    }
}

// 使用带约束的泛型类
var example = new GenericConstraintExample<Person, int>();
Person person = example.CreateInstance();
person.Name = "Alice";
person.Age = 30;

example.Process(42); // Processing value: 42
```

### <a id="generics-delegate"></a>泛型委托

泛型委托允许定义可以处理不同类型参数的委托，提高了委托的灵活性和重用性。

#### 泛型委托的定义与使用

```csharp
// 泛型委托定义
public delegate TResult Func<T, TResult>(T arg);
public delegate void Action<T>(T arg);
public delegate bool Predicate<T>(T obj);

// 自定义泛型委托
public delegate T Output<T, U, V>(U input1, V input2);

// 使用泛型委托
Func<int, int> square = x => x * x;
int result = square(5); // 25

Action<string> print = s => Console.WriteLine(s);
print("Hello World"); // 输出: Hello World

Predicate<int> isEven = x => x % 2 == 0;
bool even = isEven(4); // true

// 使用自定义泛型委托
Output<int, int, int> add = (a, b) => a + b;
int sum = add(3, 5); // 8
```

#### 泛型委托与事件

泛型委托也可以用于定义事件：

```csharp
// 泛型事件参数
public class GenericEventArgs<T> : EventArgs
{
    public T Data { get; }
    
    public GenericEventArgs(T data)
    {
        Data = data;
    }
}

// 使用泛型委托的事件
public class Publisher<T>
{
    // 定义泛型事件
    public event EventHandler<GenericEventArgs<T>> GenericEvent;
    
    protected virtual void OnGenericEvent(T data)
    {
        GenericEvent?.Invoke(this, new GenericEventArgs<T>(data));
    }
    
    public void Publish(T data)
    {
        Console.WriteLine($"Publishing: {data}");
        OnGenericEvent(data);
    }
}

// 订阅泛型事件
public class Subscriber
{
    public void Subscribe<T>(Publisher<T> publisher)
    {
        publisher.GenericEvent += (sender, e) => 
            Console.WriteLine($"Received: {e.Data}, Type: {typeof(T).Name}");
    }
}

// 使用泛型事件
var publisher = new Publisher<int>();
var subscriber = new Subscriber();
subscriber.Subscribe(publisher);
publisher.Publish(42); // 输出: Publishing: 42  Received: 42, Type: Int32

var stringPublisher = new Publisher<string>();
subscriber.Subscribe(stringPublisher);
stringPublisher.Publish("Hello"); // 输出: Publishing: Hello  Received: Hello, Type: String
```

### <a id="generics-variance"></a>协变与逆变

协变和逆变是C# 4.0引入的特性，它们允许在一定条件下将泛型类型参数的派生类型赋值给基类型，或基类型赋值给派生类型。

#### 协变（Covariance）

协变使用`out`关键字标记类型参数，表示该类型参数只能作为方法的返回值或只读属性使用。协变允许将派生类型的泛型实例赋值给基类型的泛型变量。

```csharp
// 协变接口定义
public interface ICovariant<out T>
{
    T GetItem();
    // 以下方法会导致编译错误，因为T是协变的，不能作为参数
    // void SetItem(T item);
}

// 实现协变接口
public class CovariantImplementation<T> : ICovariant<T>
{
    private T _item;
    
    public CovariantImplementation(T item)
    {
        _item = item;
    }
    
    public T GetItem()
    {
        return _item;
    }
}

// 协变的使用
ICovariant<string> stringCovariant = new CovariantImplementation<string>("Hello");
// 协变：可以将ICovariant<string>赋值给ICovariant<object>
ICovariant<object> objectCovariant = stringCovariant;
object item = objectCovariant.GetItem(); // "Hello"

// .NET中的协变示例
IEnumerable<string> strings = new List<string> { "a", "b", "c" };
IEnumerable<object> objects = strings; // 协变
```

#### 逆变（Contravariance）

逆变使用`in`关键字标记类型参数，表示该类型参数只能作为方法的参数使用。逆变允许将基类型的泛型实例赋值给派生类型的泛型变量。

```csharp
// 逆变接口定义
public interface IContravariant<in T>
{
    void SetItem(T item);
    // 以下方法会导致编译错误，因为T是逆变的，不能作为返回值
    // T GetItem();
}

// 实现逆变接口
public class ContravariantImplementation<T> : IContravariant<T>
{
    public void SetItem(T item)
    {
        Console.WriteLine($"Set item: {item}");
    }
}

// 逆变的使用
IContravariant<object> objectContravariant = new ContravariantImplementation<object>();
// 逆变：可以将IContravariant<object>赋值给IContravariant<string>
IContravariant<string> stringContravariant = objectContravariant;
stringContravariant.SetItem("Hello"); // Set item: Hello

// .NET中的逆变示例
Action<object> objectAction = o => Console.WriteLine(o);
Action<string> stringAction = objectAction; // 逆变
stringAction("Hello"); // Hello
```

#### 协变与逆变的总结

| 特性 | 关键字 | 适用场景 | 示例 |
|------|--------|----------|------|
| 协变 | `out` | 返回类型 | `IEnumerable<out T>` |
| 逆变 | `in` | 参数类型 | `Action<in T>` |

### <a id="generics-performance"></a>泛型的性能优势

泛型提供了显著的性能优势，主要体现在以下几个方面：

1. **减少装箱和拆箱操作**：
   - 非泛型集合（如`ArrayList`）存储值类型时需要装箱，取出时需要拆箱
   - 泛型集合（如`List<T>`）直接存储值类型，避免了装箱和拆箱操作

```csharp
// 使用ArrayList（需要装箱和拆箱）
ArrayList arrayList = new ArrayList();
arrayList.Add(10); // 装箱：int -> object
int value1 = (int)arrayList[0]; // 拆箱：object -> int

// 使用List<T>（避免装箱和拆箱）
List<int> list = new List<int>();
list.Add(10); // 直接存储int
int value2 = list[0]; // 直接获取int
```

2. **编译时类型检查**：
   - 泛型在编译时进行类型检查，避免了运行时类型转换错误
   - 非泛型集合需要在运行时进行类型检查和转换

3. **代码重用**：
   - 一套泛型代码可以适用于多种数据类型
   - 减少了重复代码，提高了代码维护性

### <a id="generics-scenarios"></a>泛型的应用场景

泛型在C#开发中有广泛的应用场景，以下是一些常见的例子：

1. **集合类**：
   - .NET Framework提供的大部分集合类都是泛型的，如`List<T>`、`Dictionary<TKey, TValue>`、`HashSet<T>`等
   - 这些泛型集合提供了类型安全和性能优势

2. **数据访问层**：
   - 使用泛型创建通用的数据访问组件，如`Repository<T>`模式
   - 一套数据访问代码可以适用于多种实体类型

3. **工具类和扩展方法**：
   - 使用泛型创建通用的工具类和扩展方法
   - 提高代码的重用性和灵活性

4. **委托和事件**：
   - 使用泛型委托和事件创建类型安全的回调机制
   - 如`Func<T, TResult>`、`Action<T>`等

5. **算法实现**：
   - 使用泛型实现通用算法，如排序、搜索等
   - 一套算法代码可以适用于多种数据类型

## 总结

泛型是C#中一项强大的特性，它提供了类型安全、代码重用和性能优化等好处。通过泛型类、泛型接口、泛型方法和泛型委托，可以创建适用于多种数据类型的可重用组件。泛型约束、协变和逆变等高级特性进一步增强了泛型的灵活性和功能性。

## <a id="delegates-lambda-advanced"></a>C#委托与Lambda表达式进阶

委托和Lambda表达式是C#中支持函数式编程的核心特性。它们允许将方法作为参数传递、创建匿名函数以及实现回调机制。在现代C#开发中，这些特性被广泛应用于LINQ、异步编程和事件处理等场景。

### <a id="anonymous-function-lambda"></a>匿名函数与Lambda表达式

匿名函数是没有名称的函数，它们可以作为参数传递给其他方法或存储在变量中。在C#中，匿名函数可以通过两种方式实现：传统的`delegate`语法和更简洁的Lambda表达式语法。

#### 传统匿名函数（Delegate语法）

传统匿名函数使用`delegate`关键字定义，语法相对冗长但功能完整。

```csharp
// 基本使用
Func<int, int, int> add = delegate(int a, int b)
{
    return a + b;
};
int result = add(3, 5); // 结果为8

// 作为参数传递
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
List<int> evenNumbers = numbers.FindAll(delegate(int x) { return x % 2 == 0; });

// 闭包特性
int factor = 2;
Func<int, int> multiplyByFactor = delegate(int x) { return x * factor; };
int result2 = multiplyByFactor(5); // 结果为10，因为factor=2
factor = 3;
int result3 = multiplyByFactor(5); // 结果为15，因为factor=3（闭包捕获的是变量引用）
```

#### Lambda表达式

Lambda表达式提供了更简洁的语法来定义匿名函数，它使用`=>`（读作"goes to"）操作符分隔参数列表和函数体。

```csharp
// 基本语法
// (参数列表) => 表达式
// 或
// (参数列表) => { 语句块 }

// 单行Lambda表达式
Func<int, int, int> add = (a, b) => a + b;
Func<string, int> getLength = s => s.Length;
Action<string> print = s => Console.WriteLine(s);

// 多行Lambda表达式
Func<int, int> calculateSquare = x =>
{
    Console.WriteLine($"计算 {x} 的平方");
    return x * x;
};

// 各种简写形式
Func<int, bool> isEven = x => x % 2 == 0; // 单个参数可省略括号
Action printHello = () => Console.WriteLine("Hello"); // 无参数
Func<int, int, bool> isGreater = (a, b) => a > b; // 多个参数
```

#### 匿名函数与Lambda表达式的区别

| 特性 | 传统匿名函数（delegate） | Lambda表达式 |
|------|---------------------------|--------------|
| 语法 | 更冗长 | 更简洁 |
| 类型推断 | 支持有限 | 更强大 |
| 表达式树 | 不支持 | 支持（使用Expression<TDelegate>） |
| 目标类型 | 必须是委托类型 | 可以是委托类型或表达式树类型 |
| 可读性 | 较低 | 较高 |

### <a id="func-delegate-advanced"></a>Func委托详解

`Func`是C#中预定义的泛型委托，用于表示具有返回值的方法。`Func`委托可以接受0到16个输入参数，并始终有一个返回类型（最后一个类型参数）。

```csharp
// Func委托示例

// 无参数，返回string
Func<string> getGreeting = () => "Hello, World!";
string greeting = getGreeting();

// 一个参数，返回bool
Func<int, bool> isEven = (x) => x % 2 == 0;
bool result1 = isEven(4); // 结果为true

// 两个参数，返回int
Func<int, int, int> subtract = (a, b) => a - b;
int result2 = subtract(10, 3); // 结果为7

// 三个参数，返回string
Func<int, int, int, string> formatSum = (a, b, c) => $"{a} + {b} + {c} = {a + b + c}";
string message = formatSum(1, 2, 3); // 结果为"1 + 2 + 3 = 6"
```

#### Func的高级应用

1. **复杂数据转换**

```csharp
// 将Person对象转换为匿名类型
Func<Person, object> toAnonymousType = p => new { p.Name, AgeGroup = p.Age >= 18 ? "Adult" : "Minor" };

// 组合多个Func
Func<int, int> doubleIt = x => x * 2;
Func<int, int> addFive = x => x + 5;
Func<int, int> processNumber = x => addFive(doubleIt(x)); // 先乘2再加5
int result = processNumber(10); // 结果为25
```

2. **作为方法返回值**

```csharp
// 根据条件返回不同的处理函数
Func<int, int> GetProcessor(bool useAddition)
{
    if (useAddition)
        return x => x + 10;
    else
        return x => x * 10;
}

// 使用
var processor = GetProcessor(true);
int result = processor(5); // 结果为15
```

### <a id="action-delegate-advanced"></a>Action委托详解

`Action`是C#中预定义的泛型委托，用于表示没有返回值（void）的方法。`Action`委托可以接受0到16个输入参数。

```csharp
// Action委托示例

// 无参数
Action printMessage = () => Console.WriteLine("Hello from Action!");
printMessage();

// 一个参数
Action<string> greet = (name) => Console.WriteLine($"Hello, {name}!");
greet("Alice");

// 两个参数
Action<string, int> displayInfo = (name, age) => Console.WriteLine($"Name: {name}, Age: {age}");
displayInfo("Bob", 30);

// 三个参数
Action<int, int, int> printSum = (a, b, c) => Console.WriteLine($"Sum: {a + b + c}");
printSum(1, 2, 3);
```

#### Action的高级应用

1. **批量操作**
```csharp
// 对集合中的每个元素执行相同操作
void ProcessCollection<T>(IEnumerable<T> collection, Action<T> action)
{
    foreach (var item in collection)
    {
        action(item);
    }
}

// 使用
List<string> names = new List<string> { "Alice", "Bob", "Charlie" };
ProcessCollection(names, name => Console.WriteLine(name.ToUpper()));
```

2. **复合操作**
```csharp
// 创建一个包含多个操作的复合Action
Action<string> log = s => Console.WriteLine($"[{DateTime.Now}] {s}");
Action<string> validate = s => 
{
    if (string.IsNullOrWhiteSpace(s))
        throw new ArgumentException("输入不能为空");
};
Action<string> process = s => 
{
    log($"开始处理: {s}");
    validate(s);
    log($"处理完成: {s}");
};

// 使用
process("有效输入");
```

### <a id="predicate-delegate-advanced"></a>Predicate委托详解

`Predicate`是C#中预定义的泛型委托，专门用于表示返回bool值的方法，通常用于条件判断。`Predicate`委托只接受一个输入参数，并始终返回bool类型。

```csharp
// Predicate委托示例

// 检查整数是否为正数
Predicate<int> isPositive = (x) => x > 0;
bool result1 = isPositive(5);  // 结果为true
bool result2 = isPositive(-3); // 结果为false

// 检查字符串是否为空或 null
Predicate<string> isNullOrEmpty = (str) => string.IsNullOrEmpty(str);
bool result3 = isNullOrEmpty("");     // 结果为true
bool result4 = isNullOrEmpty("Hello"); // 结果为false

// 检查列表是否包含元素
Predicate<List<int>> hasElements = (list) => list != null && list.Count > 0;
List<int> numbers = new List<int> { 1, 2, 3 };
bool result5 = hasElements(numbers); // 结果为true
```

#### Predicate的高级应用

1. **自定义对象筛选**
```csharp
public class Product
{
    public string Name { get; set; }
    public decimal Price { get; set; }
    public bool IsInStock { get; set; }
}

// 创建产品列表
List<Product> products = new List<Product>
{
    new Product { Name = "笔记本电脑", Price = 5999.99m, IsInStock = true },
    new Product { Name = "智能手机", Price = 3999.99m, IsInStock = true },
    new Product { Name = "平板电脑", Price = 2999.99m, IsInStock = false },
    new Product { Name = "无线耳机", Price = 999.99m, IsInStock = true }
};

// 定义复杂筛选条件
Predicate<Product> affordableInStockProducts = p => 
    p.IsInStock && p.Price < 3000;

// 使用Predicate筛选
List<Product> filteredProducts = products.FindAll(affordableInStockProducts);
```

2. **链式条件**
```csharp
// 组合多个条件
Predicate<int> isEven = x => x % 2 == 0;
Predicate<int> isGreaterThan5 = x => x > 5;
Predicate<int> isEvenAndGreaterThan5 = x => isEven(x) && isGreaterThan5(x);

// 使用
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
List<int> filtered = numbers.FindAll(isEvenAndGreaterThan5);
```

### <a id="delegate-chain-event"></a>委托链与事件

委托链允许将多个委托实例组合在一起，形成一个委托列表。当调用这个委托链时，列表中的所有委托都会被依次调用。事件是基于委托的一种特殊机制，它允许对象在发生特定事件时通知其他对象。

#### 委托链

```csharp
// 定义委托类型
delegate void NumberHandler(int number);

// 创建委托实例
NumberHandler printNumber = n => Console.WriteLine($"数字: {n}");
NumberHandler doubleNumber = n => Console.WriteLine($"两倍: {n * 2}");
NumberHandler squareNumber = n => Console.WriteLine($"平方: {n * n}");

// 组合委托链
NumberHandler chain = printNumber + doubleNumber + squareNumber;

// 调用委托链
chain(5);
// 输出:
// 数字: 5
// 两倍: 10
// 平方: 25

// 移除委托
chain -= doubleNumber;
chain(5);
// 输出:
// 数字: 5
// 平方: 25
```

##### 委托链的高级特性

1. **空委托处理**

```csharp
// 安全调用委托链
NumberHandler safeChain = null;
// 直接调用空委托会引发NullReferenceException
try
{
    safeChain(5);
} catch (NullReferenceException)
{
    Console.WriteLine("直接调用空委托引发异常");
}

// 使用?.Invoke()安全调用
safeChain?.Invoke(5); // 不会引发异常

// 初始化时提供一个空委托，避免空检查
safeChain = delegate { };
// 或者使用Lambda表达式
safeChain = _ => { };
safeChain(5); // 安全调用
```

2. **多播委托的返回值**

```csharp
// 委托链返回值
Func<int, int> func1 = x => x + 1;
Func<int, int> func2 = x => x * 2;
Func<int, int> funcChain = func1 + func2;

// 调用委托链，只会返回最后一个委托的结果
int result = funcChain(5); // 结果为10，即(5 * 2)
Console.WriteLine(result);
```

3. **委托链的执行顺序**

```csharp
// 委托链的执行顺序是添加顺序
Action step1 = () => Console.WriteLine("步骤1");
Action step2 = () => Console.WriteLine("步骤2");
Action step3 = () => Console.WriteLine("步骤3");

Action workflow = step1 + step2 + step3;
workflow(); // 按顺序执行步骤1、步骤2、步骤3

// 更改执行顺序
workflow = step3 + step1 + step2;
workflow(); // 按顺序执行步骤3、步骤1、步骤2
```

#### 事件

事件使用`event`关键字声明，它是对委托的封装，提供了更安全的访问控制。

```csharp
// 定义事件参数类
public class OrderEventArgs : EventArgs
{
    public int OrderId { get; }
    public decimal TotalAmount { get; }
    public OrderEventArgs(int orderId, decimal totalAmount)
    {
        OrderId = orderId;
        TotalAmount = totalAmount;
    }
}

// 定义发布者类
public class OrderService
{
    // 声明事件
    public event EventHandler<OrderEventArgs> OrderPlaced;
    public event EventHandler<OrderEventArgs> OrderShipped;

    // 触发事件的方法
    protected virtual void OnOrderPlaced(OrderEventArgs e)
    {
        // 检查是否有订阅者
        OrderPlaced?.Invoke(this, e);
    }

    protected virtual void OnOrderShipped(OrderEventArgs e)
    {
        OrderShipped?.Invoke(this, e);
    }

    // 业务方法
    public void PlaceOrder(int orderId, decimal amount)
    {
        Console.WriteLine($"订单 {orderId} 已创建");
        // 触发事件
        OnOrderPlaced(new OrderEventArgs(orderId, amount));
    }

    public void ShipOrder(int orderId, decimal amount)
    {
        Console.WriteLine($"订单 {orderId} 已发货");
        // 触发事件
        OnOrderShipped(new OrderEventArgs(orderId, amount));
    }
}

// 定义订阅者类
public class EmailService
{
    public void HandleOrderPlaced(object sender, OrderEventArgs e)
    {
        Console.WriteLine($"发送确认邮件: 订单 {e.OrderId} (金额: {e.TotalAmount})");
    }

    public void HandleOrderShipped(object sender, OrderEventArgs e)
    {
        Console.WriteLine($"发送发货邮件: 订单 {e.OrderId} (金额: {e.TotalAmount})");
    }
}

// 使用示例
var orderService = new OrderService();
var emailService = new EmailService();

// 订阅事件
orderService.OrderPlaced += emailService.HandleOrderPlaced;
orderService.OrderShipped += emailService.HandleOrderShipped;

// 触发事件
orderService.PlaceOrder(1001, 99.99m);
orderService.ShipOrder(1001, 99.99m);

// 输出:
// 订单 1001 已创建
// 发送确认邮件: 订单 1001 (金额: 99.99)
// 订单 1001 已发货
// 发送发货邮件: 订单 1001 (金额: 99.99)
```

##### 事件的高级用法

1. **自定义事件访问器**

```csharp
public class CustomEventPublisher
{
    // 自定义事件存储
    private EventHandler<EventArgs> _customEvent;
    
    // 自定义事件访问器
    public event EventHandler<EventArgs> CustomEvent
    {
        add
        {
            Console.WriteLine("订阅者添加了事件处理程序");
            _customEvent += value;
        }
        remove
        {
            Console.WriteLine("订阅者移除了事件处理程序");
            _customEvent -= value;
        }
    }
    
    public void RaiseEvent()
    {
        _customEvent?.Invoke(this, EventArgs.Empty);
    }
}

// 使用自定义事件访问器
var publisher = new CustomEventPublisher();
publisher.CustomEvent += (sender, e) => Console.WriteLine("事件处理1");
publisher.CustomEvent += (sender, e) => Console.WriteLine("事件处理2");
publisher.RaiseEvent();
publisher.CustomEvent -= (sender, e) => Console.WriteLine("事件处理1"); // 注意：这种方式无法移除匿名方法
```

2. **静态事件**

```csharp
public static class GlobalEvents
{
    public static event EventHandler ApplicationStarted;
    public static event EventHandler ApplicationStopped;
    
    public static void OnApplicationStarted()
    {
        ApplicationStarted?.Invoke(null, EventArgs.Empty);
    }
    
    public static void OnApplicationStopped()
    {
        ApplicationStopped?.Invoke(null, EventArgs.Empty);
    }
}

// 使用静态事件
GlobalEvents.ApplicationStarted += (sender, e) => Console.WriteLine("应用程序已启动");
GlobalEvents.OnApplicationStarted();
```

3. **线程安全的事件**

```csharp
public class ThreadSafeEventPublisher
{
    private readonly object _eventLock = new object();
    private EventHandler<EventArgs> _threadSafeEvent;
    
    public event EventHandler<EventArgs> ThreadSafeEvent
    {
        add
        {
            lock (_eventLock)
            {
                _threadSafeEvent += value;
            }
        }
        remove
        {
            lock (_eventLock)
            {
                _threadSafeEvent -= value;
            }
        }
    }
    
    public void RaiseEvent()
    {
        // 复制到局部变量，避免多线程问题
        EventHandler<EventArgs> handler;
        lock (_eventLock)
        {
            handler = _threadSafeEvent;
        }
        handler?.Invoke(this, EventArgs.Empty);
    }
}
```

4. **弱事件模式**

```csharp
// 弱事件模式可以避免内存泄漏，当订阅者被销毁时，会自动从事件中移除
public class WeakEventPublisher
{
    // 使用WeakReference存储订阅者
    private List<WeakReference<EventHandler<EventArgs>>> _weakHandlers = new List<WeakReference<EventHandler<EventArgs>>>();
    
    public event EventHandler<EventArgs> WeakEvent
    {
        add
        {
            _weakHandlers.Add(new WeakReference<EventHandler<EventArgs>>(value));
        }
        remove
        {
            // 实际实现中需要遍历并比较委托
        }
    }
    
    public void RaiseEvent()
    {
        var handlersToRemove = new List<WeakReference<EventHandler<EventArgs>>>();
        
        foreach (var weakHandler in _weakHandlers)
        {
            if (weakHandler.TryGetTarget(out var handler))
            {
                handler?.Invoke(this, EventArgs.Empty);
            }
            else
            {
                // 订阅者已被垃圾回收，标记移除
                handlersToRemove.Add(weakHandler);
            }
        }
        
        // 清理已被回收的订阅者
        foreach (var handlerToRemove in handlersToRemove)
        {
            _weakHandlers.Remove(handlerToRemove);
        }
    }
}
```

##### 事件的最佳实践

1. **遵循.NET事件命名约定**

```csharp
// 事件命名：动词或动词短语
public event EventHandler Started;
public event EventHandler<DataReceivedEventArgs> DataReceived;

// 触发事件的方法命名：On+事件名
protected virtual void OnStarted(EventArgs e)
{
    Started?.Invoke(this, e);
}

protected virtual void OnDataReceived(DataReceivedEventArgs e)
{
    DataReceived?.Invoke(this, e);
}
```

2. **使用EventHandler和EventHandler<TEventArgs>**

```csharp
// 推荐：使用标准的EventHandler委托
event EventHandler SimpleEvent;

// 推荐：使用泛型EventHandler<TEventArgs>委托
event EventHandler<CustomEventArgs> CustomEvent;

// 不推荐：自定义委托类型（除非有特殊需求）
delegate void MyCustomEventHandler(object sender, CustomEventArgs e);
event MyCustomEventHandler MyCustomEvent;
```

3. **使用不可变的事件参数**

```csharp
// 不可变事件参数
public class ImmutableEventArgs : EventArgs
{
    public int Id { get; }
    public string Name { get; }
    
    public ImmutableEventArgs(int id, string name)
    {
        Id = id;
        Name = name;
    }
}
```

4. **避免在事件处理程序中抛出异常**

```csharp
// 发布者应该考虑订阅者抛出异常的情况
public void SafeRaiseEvent()
{
    var handler = MyEvent;
    if (handler == null) return;
    
    // 逐一调用每个事件处理程序，捕获异常
    foreach (Delegate d in handler.GetInvocationList())
    {
        try
        {
            d.DynamicInvoke(this, EventArgs.Empty);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"事件处理程序抛出异常: {ex.Message}");
            // 可以选择记录日志，但不应该中断其他订阅者
        }
    }
}
```

5. **事件聚合器模式**

```csharp
// 事件聚合器用于解耦事件发布者和订阅者
public class EventAggregator
{
    private readonly Dictionary<Type, List<WeakReference>> _handlers = new Dictionary<Type, List<WeakReference>>();
    
    public void Subscribe<T>(Action<T> handler) where T : EventArgs
    {
        var eventType = typeof(T);
        if (!_handlers.ContainsKey(eventType))
        {
            _handlers[eventType] = new List<WeakReference>();
        }
        _handlers[eventType].Add(new WeakReference(handler));
    }
    
    public void Publish<T>(T eventArgs) where T : EventArgs
    {
        var eventType = typeof(T);
        if (!_handlers.ContainsKey(eventType)) return;
        
        var handlersToRemove = new List<WeakReference>();
        
        foreach (var weakRef in _handlers[eventType])
        {
            if (weakRef.TryGetTarget(out var handlerObj) && handlerObj is Action<T> handler)
            {
                try
                {
                    handler(eventArgs);
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"事件处理程序抛出异常: {ex.Message}");
                }
            }
            else
            {
                handlersToRemove.Add(weakRef);
            }
        }
        
        foreach (var handlerToRemove in handlersToRemove)
        {
            _handlers[eventType].Remove(handlerToRemove);
        }
    }
}

// 使用事件聚合器
var aggregator = new EventAggregator();

// 订阅事件
aggregator.Subscribe<OrderEventArgs>(args =>
{
    Console.WriteLine($"订单 {args.OrderId} 已创建，金额: {args.TotalAmount}");
});

// 发布事件
aggregator.Publish(new OrderEventArgs(1001, 99.99m));
```

##### 事件的应用场景

1. **UI事件处理**

```csharp
// WinForm或WPF中的事件处理
public partial class MainForm : Form
{
    public MainForm()
    {
        InitializeComponent();
        
        // 订阅按钮点击事件
        btnSubmit.Click += BtnSubmit_Click;
        
        // 订阅文本框文本改变事件
        txtInput.TextChanged += TxtInput_TextChanged;
    }
    
    private void BtnSubmit_Click(object sender, EventArgs e)
    {
        // 处理按钮点击
    }
    
    private void TxtInput_TextChanged(object sender, EventArgs e)
    {
        // 处理文本改变
    }
}
```

2. **状态变化通知**

```csharp
// 状态机状态变化事件
public class StateMachine
{
    public enum State { Idle, Running, Paused, Completed }
    
    private State _currentState;
    
    public event EventHandler<StateChangedEventArgs> StateChanged;
    
    public State CurrentState
    {
        get => _currentState;
        private set
        {
            if (_currentState != value)
            {
                var oldState = _currentState;
                _currentState = value;
                OnStateChanged(new StateChangedEventArgs(oldState, value));
            }
        }
    }
    
    protected virtual void OnStateChanged(StateChangedEventArgs e)
    {
        StateChanged?.Invoke(this, e);
    }
    
    public void Start() => CurrentState = State.Running;
    public void Pause() => CurrentState = State.Paused;
    public void Resume() => CurrentState = State.Running;
    public void Stop() => CurrentState = State.Completed;
}

public class StateChangedEventArgs : EventArgs
{
    public StateMachine.State OldState { get; }
    public StateMachine.State NewState { get; }
    
    public StateChangedEventArgs(StateMachine.State oldState, StateMachine.State newState)
    {
        OldState = oldState;
        NewState = newState;
    }
}

// 使用状态机事件
var stateMachine = new StateMachine();
stateMachine.StateChanged += (sender, e) =>
{
    Console.WriteLine($"状态从 {e.OldState} 变为 {e.NewState}");
};
stateMachine.Start(); // 状态从 Idle 变为 Running
stateMachine.Pause(); // 状态从 Running 变为 Paused
stateMachine.Stop();  // 状态从 Paused 变为 Completed
```

3. **消息通知系统**

```csharp
// 简单的消息总线
public static class MessageBus
{
    public static event Action<string, object> MessagePublished;
    
    public static void Publish(string messageType, object payload)
    {
        MessagePublished?.Invoke(messageType, payload);
    }
    
    public static void Subscribe(string messageType, Action<string, object> handler)
    {
        MessagePublished += (type, payload) =>
        {
            if (type == messageType)
            {
                handler(type, payload);
            }
        };
    }
}

// 使用消息总线
MessageBus.Subscribe("UserCreated", (type, payload) =>
{
    if (payload is User user)
    {
        Console.WriteLine($"用户 {user.Name} 已创建");
    }
});

// 发布消息
MessageBus.Publish("UserCreated", new User { Id = 1, Name = "张三" });

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
}
```

通过理解委托和事件的高级特性和最佳实践，可以编写出更加灵活、可维护和高性能的事件驱动代码。事件驱动编程是现代C#开发的核心模式之一，广泛应用于UI开发、分布式系统和异步编程等领域。

### <a id="expression-trees"></a>表达式树

表达式树是一种表示代码结构的数据结构，它允许在运行时检查、修改和执行代码。Lambda表达式可以隐式转换为表达式树，这使得LINQ to SQL、Entity Framework等ORM框架能够将C#代码转换为SQL查询。

```csharp
// 创建表达式树
Expression<Func<int, int, int>> addExpression = (a, b) => a + b;

// 解析表达式树
BinaryExpression body = (BinaryExpression)addExpression.Body;
ParameterExpression leftParam = (ParameterExpression)body.Left;
ParameterExpression rightParam = (ParameterExpression)body.Right;

Console.WriteLine($"表达式类型: {body.NodeType}");
Console.WriteLine($"左操作数: {leftParam.Name}");
Console.WriteLine($"右操作数: {rightParam.Name}");

// 编译表达式树
Func<int, int, int> addFunc = addExpression.Compile();
int result = addFunc(3, 5); // 结果为8
```

#### 表达式树的应用

1. **动态查询构建**
```csharp
// 构建动态查询
Expression<Func<Product, bool>> BuildProductQuery(decimal maxPrice, bool inStock)
{
    ParameterExpression productParam = Expression.Parameter(typeof(Product), "p");
    Expression priceCondition = Expression.LessThan(Expression.Property(productParam, "Price"), Expression.Constant(maxPrice));
    Expression stockCondition = Expression.Equal(Expression.Property(productParam, "IsInStock"), Expression.Constant(inStock));
    Expression combinedCondition = Expression.AndAlso(priceCondition, stockCondition);
    return Expression.Lambda<Func<Product, bool>>(combinedCondition, productParam);
}

// 使用
var query = BuildProductQuery(3000, true);
var compiledQuery = query.Compile();
List<Product> filteredProducts = products.Where(compiledQuery).ToList();
```

2. **ORM框架中的应用**
```csharp
// Entity Framework使用表达式树将LINQ转换为SQL
using (var context = new MyDbContext())
{
    // 这是一个表达式树，会被转换为SQL
    Expression<Func<Customer, bool>> filter = c => c.City == "北京" && c.Age > 18;
    var customers = context.Customers.Where(filter).ToList();
    // 生成的SQL类似: SELECT * FROM Customers WHERE City = '北京' AND Age > 18
}
```

## <a id="linq-detail"></a>C# LINQ详解

LINQ（Language Integrated Query，语言集成查询）是C#中的强大查询功能，它提供了一种统一的语法来查询各种数据源（集合、数据库、XML等）。LINQ将查询语法直接集成到C#语言中，使得数据查询变得简洁、类型安全和易于维护。

### <a id="linq-concept"></a>LINQ的基本概念

#### 什么是LINQ？

LINQ是一组技术和语言扩展，允许在C#中编写类似SQL的查询语句来查询数据。LINQ支持多种数据源：
- **LINQ to Objects**：查询内存中的集合
- **LINQ to SQL**：查询关系数据库
- **LINQ to XML**：查询XML文档
- **LINQ to Entities**：查询Entity Framework实体

#### LINQ的优势

1. **统一语法**：使用相同的语法查询不同的数据源
2. **类型安全**：编译时类型检查，减少运行时错误
3. **IntelliSense支持**：IDE自动完成和类型提示
4. **延迟执行**：查询在需要时才执行，提高性能
5. **声明式编程**：描述"做什么"而不是"怎么做"

#### LINQ的两种语法

LINQ支持两种语法形式：

```csharp
// 1. 查询语法（Query Syntax）- 类似SQL
var query1 = from p in products
             where p.Price > 100
             select p.Name;

// 2. 方法语法（Method Syntax）- 链式方法调用
var query2 = products
    .Where(p => p.Price > 100)
    .Select(p => p.Name);
```

### <a id="linq-query-syntax"></a>LINQ查询语法

查询语法使用类似SQL的关键字，更加直观和易读。

#### 基本查询语法

```csharp
using System.Linq;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public decimal Price { get; set; }
    public string Category { get; set; }
    public bool InStock { get; set; }
}

List<Product> products = new List<Product>
{
    new Product { Id = 1, Name = "笔记本电脑", Price = 5999.99m, Category = "电子产品", InStock = true },
    new Product { Id = 2, Name = "智能手机", Price = 3999.99m, Category = "电子产品", InStock = true },
    new Product { Id = 3, Name = "办公桌", Price = 899.99m, Category = "家具", InStock = false },
    new Product { Id = 4, Name = "椅子", Price = 299.99m, Category = "家具", InStock = true }
};

// from：指定数据源
var query1 = from p in products
             select p;

// where：过滤条件
var query2 = from p in products
             where p.Price > 1000
             select p;

// select：选择字段
var query3 = from p in products
             select p.Name;

// 选择多个字段（匿名类型）
var query4 = from p in products
             select new { p.Name, p.Price };

// orderby：排序
var query5 = from p in products
             orderby p.Price ascending
             select p;

// orderby descending：降序排序
var query6 = from p in products
             orderby p.Price descending
             select p;

// 多个排序条件
var query7 = from p in products
             orderby p.Category, p.Price descending
             select p;

// group by：分组
var query8 = from p in products
             group p by p.Category into g
             select new { Category = g.Key, Products = g };

// join：连接
List<Category> categories = new List<Category>
{
    new Category { Id = 1, Name = "电子产品" },
    new Category { Id = 2, Name = "家具" }
};

var query9 = from p in products
             join c in categories on p.Category equals c.Name
             select new { ProductName = p.Name, CategoryName = c.Name };

// let：创建临时变量
var query10 = from p in products
              let discountPrice = p.Price * 0.9m
              where discountPrice > 500
              select new { p.Name, OriginalPrice = p.Price, DiscountPrice = discountPrice };

// into：继续查询
var query11 = from p in products
              group p by p.Category into categoryGroup
              where categoryGroup.Count() > 1
              select new { Category = categoryGroup.Key, Count = categoryGroup.Count() };
```

### <a id="linq-method-syntax"></a>LINQ方法语法

方法语法使用扩展方法和Lambda表达式，更加灵活和功能强大。

#### 基本方法语法

```csharp
// Where：过滤
var query1 = products.Where(p => p.Price > 1000);

// Select：投影
var query2 = products.Select(p => p.Name);
var query3 = products.Select(p => new { p.Name, p.Price });

// OrderBy / OrderByDescending：排序
var query4 = products.OrderBy(p => p.Price);
var query5 = products.OrderByDescending(p => p.Price);

// ThenBy / ThenByDescending：多级排序
var query6 = products
    .OrderBy(p => p.Category)
    .ThenByDescending(p => p.Price);

// GroupBy：分组
var query7 = products.GroupBy(p => p.Category);

// SelectMany：展平嵌套集合
List<Order> orders = new List<Order>
{
    new Order { Id = 1, Items = new List<OrderItem> { new OrderItem { ProductName = "A" }, new OrderItem { ProductName = "B" } } },
    new Order { Id = 2, Items = new List<OrderItem> { new OrderItem { ProductName = "C" } } }
};

var allItems = orders.SelectMany(o => o.Items);

// Join：连接
var query8 = products.Join(
    categories,
    p => p.Category,
    c => c.Name,
    (p, c) => new { ProductName = p.Name, CategoryName = c.Name }
);

// Take / Skip：分页
var query9 = products.OrderBy(p => p.Price).Take(10);      // 前10条
var query10 = products.OrderBy(p => p.Price).Skip(10).Take(10); // 第11-20条

// First / FirstOrDefault：获取第一个元素
var firstProduct = products.First(p => p.Price > 1000);
var firstOrNull = products.FirstOrDefault(p => p.Price > 10000); // 找不到返回null

// Last / LastOrDefault：获取最后一个元素
var lastProduct = products.Last(p => p.InStock);

// Single / SingleOrDefault：获取唯一元素
var singleProduct = products.Single(p => p.Id == 1);
var singleOrNull = products.SingleOrDefault(p => p.Id == 999);

// Any / All：存在性检查
bool hasExpensive = products.Any(p => p.Price > 5000);
bool allInStock = products.All(p => p.InStock);

// Count / Sum / Average / Min / Max：聚合
int count = products.Count();
int expensiveCount = products.Count(p => p.Price > 1000);
decimal totalPrice = products.Sum(p => p.Price);
decimal avgPrice = products.Average(p => p.Price);
decimal minPrice = products.Min(p => p.Price);
decimal maxPrice = products.Max(p => p.Price);

// Distinct：去重
var distinctCategories = products.Select(p => p.Category).Distinct();

// Contains：包含检查
bool containsProduct = products.Select(p => p.Name).Contains("笔记本电脑");

// Concat / Union：合并
var allItems1 = products.Select(p => p.Name);
var allItems2 = new List<string> { "新产品1", "新产品2" };
var combined = allItems1.Concat(allItems2);
var unioned = allItems1.Union(allItems2); // 去重合并

// Intersect / Except：集合运算
var set1 = new List<int> { 1, 2, 3, 4 };
var set2 = new List<int> { 3, 4, 5, 6 };
var intersection = set1.Intersect(set2); // {3, 4}
var except = set1.Except(set2);          // {1, 2}

// ToList / ToArray / ToDictionary：转换为集合
List<Product> productList = products.Where(p => p.InStock).ToList();
Product[] productArray = products.ToArray();
Dictionary<int, Product> productDict = products.ToDictionary(p => p.Id);
Dictionary<string, List<Product>> categoryDict = products
    .GroupBy(p => p.Category)
    .ToDictionary(g => g.Key, g => g.ToList());
```

### <a id="standard-query-operators"></a>标准查询操作符

#### 筛选操作符（Filtering）

```csharp
// Where：根据条件筛选
var inStockProducts = products.Where(p => p.InStock);
var expensiveProducts = products.Where(p => p.Price > 1000 && p.Category == "电子产品");

// 使用索引的Where重载
var productsByIndex = products.Where((p, index) => index % 2 == 0); // 偶数索引
```

#### 投影操作符（Projection）

```csharp
// Select：选择单个字段
var names = products.Select(p => p.Name);

// Select：创建匿名类型
var productInfo = products.Select(p => new { p.Name, p.Price, IsExpensive = p.Price > 1000 });

// Select：使用索引
var indexedProducts = products.Select((p, index) => new { Index = index, p.Name });

// SelectMany：展平嵌套集合
var allOrderItems = orders.SelectMany(o => o.Items);
var allOrderItemsWithOrder = orders.SelectMany(o => o.Items, (o, item) => new { OrderId = o.Id, Item = item });
```

#### 排序操作符（Sorting）

```csharp
// OrderBy / OrderByDescending
var sortedByPrice = products.OrderBy(p => p.Price);
var sortedByPriceDesc = products.OrderByDescending(p => p.Price);

// ThenBy / ThenByDescending（多级排序）
var sorted = products
    .OrderBy(p => p.Category)
    .ThenByDescending(p => p.Price)
    .ThenBy(p => p.Name);

// Reverse：反转顺序
var reversed = products.Reverse();
```

#### 分组操作符（Grouping）

```csharp
// GroupBy：分组
var groupedByCategory = products.GroupBy(p => p.Category);

foreach (var group in groupedByCategory)
{
    Console.WriteLine($"类别: {group.Key}");
    foreach (var product in group)
    {
        Console.WriteLine($"  - {product.Name}");
    }
}

// GroupBy：多个键
var groupedByMultiple = products.GroupBy(p => new { p.Category, p.InStock });

// GroupBy：使用结果选择器
var categoryStats = products.GroupBy(
    p => p.Category,
    (key, items) => new 
    { 
        Category = key, 
        Count = items.Count(), 
        TotalPrice = items.Sum(p => p.Price),
        Products = items.ToList()
    }
);
```

#### 连接操作符（Joining）

```csharp
// Join：内连接
var joinQuery = products.Join(
    categories,
    product => product.Category,
    category => category.Name,
    (product, category) => new 
    { 
        ProductName = product.Name, 
        CategoryName = category.Name 
    }
);

// GroupJoin：分组连接
var groupJoinQuery = categories.GroupJoin(
    products,
    category => category.Name,
    product => product.Category,
    (category, products) => new 
    { 
        Category = category.Name, 
        Products = products 
    }
);

// Zip：合并两个序列
var numbers = new List<int> { 1, 2, 3 };
var letters = new List<string> { "A", "B", "C" };
var zipped = numbers.Zip(letters, (n, l) => $"{n}{l}"); // {"1A", "2B", "3C"}
```

#### 聚合操作符（Aggregation）

```csharp
// Count：计数
int totalCount = products.Count();
int inStockCount = products.Count(p => p.InStock);

// Sum：求和
decimal totalPrice = products.Sum(p => p.Price);
decimal categoryTotal = products.Where(p => p.Category == "电子产品").Sum(p => p.Price);

// Average：平均值
decimal avgPrice = products.Average(p => p.Price);

// Min / Max：最小/最大值
decimal minPrice = products.Min(p => p.Price);
decimal maxPrice = products.Max(p => p.Price);
Product cheapestProduct = products.OrderBy(p => p.Price).First();

// Aggregate：自定义聚合
decimal total = products.Aggregate(0m, (sum, p) => sum + p.Price);
string allNames = products.Aggregate("", (current, p) => current + p.Name + ", ");
```

#### 元素操作符（Element）

```csharp
// First / FirstOrDefault
Product first = products.First();
Product firstExpensive = products.First(p => p.Price > 5000);
Product firstOrNull = products.FirstOrDefault(p => p.Price > 10000);

// Last / LastOrDefault
Product last = products.Last();
Product lastExpensive = products.LastOrDefault(p => p.Price > 5000);

// Single / SingleOrDefault
Product single = products.Single(p => p.Id == 1);
Product singleOrNull = products.SingleOrDefault(p => p.Id == 999);

// ElementAt / ElementAtOrDefault
Product atIndex = products.ElementAt(2);
Product atIndexOrNull = products.ElementAtOrDefault(100);
```

#### 集合操作符（Set）

```csharp
// Distinct：去重
var distinctCategories = products.Select(p => p.Category).Distinct();

// Distinct：使用自定义比较器
var distinctProducts = products.Distinct(new ProductComparer());

// Union：并集（去重）
var set1 = new List<int> { 1, 2, 3 };
var set2 = new List<int> { 3, 4, 5 };
var union = set1.Union(set2); // {1, 2, 3, 4, 5}

// Intersect：交集
var intersection = set1.Intersect(set2); // {3}

// Except：差集
var except = set1.Except(set2); // {1, 2}

// Concat：连接（不去重）
var concat = set1.Concat(set2); // {1, 2, 3, 3, 4, 5}
```

#### 分区操作符（Partitioning）

```csharp
// Take：取前N个
var first10 = products.Take(10);

// Skip：跳过前N个
var after10 = products.Skip(10);

// TakeWhile：满足条件时取
var takeWhile = products.TakeWhile(p => p.Price < 1000);

// SkipWhile：满足条件时跳过
var skipWhile = products.SkipWhile(p => p.Price < 1000);

// 分页示例
int pageSize = 10;
int pageNumber = 2;
var page = products
    .OrderBy(p => p.Id)
    .Skip((pageNumber - 1) * pageSize)
    .Take(pageSize);
```

#### 转换操作符（Conversion）

```csharp
// ToList
List<Product> productList = products.ToList();

// ToArray
Product[] productArray = products.ToArray();

// ToDictionary
Dictionary<int, Product> dictById = products.ToDictionary(p => p.Id);
Dictionary<int, string> dictIdToName = products.ToDictionary(p => p.Id, p => p.Name);

// ToLookup：类似Dictionary，但一个键可以对应多个值
ILookup<string, Product> lookupByCategory = products.ToLookup(p => p.Category);
var electronics = lookupByCategory["电子产品"];

// AsEnumerable / AsQueryable：延迟执行
IEnumerable<Product> enumerable = products.AsEnumerable();
IQueryable<Product> queryable = products.AsQueryable();

// Cast：类型转换
IEnumerable<object> objects = new List<object> { 1, 2, 3 };
IEnumerable<int> integers = objects.Cast<int>();

// OfType：类型过滤
IEnumerable<object> mixed = new List<object> { 1, "hello", 2, "world" };
IEnumerable<int> numbers = mixed.OfType<int>(); // {1, 2}
```

### <a id="linq-to-objects"></a>LINQ to Objects

LINQ to Objects用于查询内存中的集合（如List、Array等）。

#### 复杂查询示例

```csharp
// 示例1：查找价格最高的前3个产品
var top3Products = products
    .OrderByDescending(p => p.Price)
    .Take(3)
    .Select(p => new { p.Name, p.Price });

// 示例2：按类别分组，计算每类的平均价格
var categoryAvgPrice = products
    .GroupBy(p => p.Category)
    .Select(g => new 
    { 
        Category = g.Key, 
        AvgPrice = g.Average(p => p.Price),
        Count = g.Count()
    });

// 示例3：查找有库存且价格在指定范围内的产品
decimal minPrice = 100;
decimal maxPrice = 5000;
var filteredProducts = products
    .Where(p => p.InStock && p.Price >= minPrice && p.Price <= maxPrice)
    .OrderBy(p => p.Price)
    .ToList();

// 示例4：计算总价值
decimal totalValue = products
    .Where(p => p.InStock)
    .Sum(p => p.Price);

// 示例5：查找产品名称中包含特定关键字的产品
string keyword = "电脑";
var searchResults = products
    .Where(p => p.Name.Contains(keyword))
    .ToList();

// 示例6：判断是否存在符合条件的产品
bool hasExpensiveElectronics = products
    .Any(p => p.Category == "电子产品" && p.Price > 5000);

// 示例7：获取所有类别及其产品数量
var categoryCounts = products
    .GroupBy(p => p.Category)
    .Select(g => new { Category = g.Key, ProductCount = g.Count() })
    .OrderByDescending(x => x.ProductCount);

// 示例8：查找价格最高的产品
var mostExpensive = products
    .OrderByDescending(p => p.Price)
    .FirstOrDefault();

// 示例9：获取产品名称列表（去重）
var uniqueNames = products
    .Select(p => p.Name)
    .Distinct()
    .ToList();
```

### <a id="linq-to-sql"></a>LINQ to SQL

LINQ to SQL用于查询SQL Server数据库。

#### Entity Framework Core示例

```csharp
using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Category> Categories { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("connection string");
    }
}

// 使用LINQ查询数据库
using (var context = new ApplicationDbContext())
{
    // 基本查询（延迟执行，转换为SQL）
    var query = from p in context.Products
                where p.Price > 1000
                select p;
    
    // 执行查询（此时才执行SQL）
    List<Product> products = query.ToList();
    
    // 方法语法
    var expensiveProducts = context.Products
        .Where(p => p.Price > 1000)
        .OrderByDescending(p => p.Price)
        .ToList();
    
    // 连接查询
    var productsWithCategory = from p in context.Products
                               join c in context.Categories on p.CategoryId equals c.Id
                               select new { p.Name, CategoryName = c.Name };
    
    var result = productsWithCategory.ToList();
    
    // 分组查询
    var categoryStats = context.Products
        .GroupBy(p => p.CategoryId)
        .Select(g => new 
        { 
            CategoryId = g.Key, 
            Count = g.Count(),
            AvgPrice = g.Average(p => p.Price)
        })
        .ToList();
    
    // 聚合查询
    decimal totalValue = context.Products.Sum(p => p.Price);
    int productCount = context.Products.Count();
    
    // 分页查询
    int pageSize = 10;
    int pageNumber = 1;
    var pagedProducts = context.Products
        .OrderBy(p => p.Id)
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToList();
}
```

### <a id="linq-to-xml"></a>LINQ to XML

LINQ to XML用于查询和操作XML文档。

```csharp
using System.Xml.Linq;

// 创建XML文档
XDocument xml = new XDocument(
    new XElement("Products",
        new XElement("Product",
            new XAttribute("Id", 1),
            new XElement("Name", "笔记本电脑"),
            new XElement("Price", 5999.99)
        ),
        new XElement("Product",
            new XAttribute("Id", 2),
            new XElement("Name", "智能手机"),
            new XElement("Price", 3999.99)
        )
    )
);

// 查询XML
var products = from p in xml.Descendants("Product")
               where (decimal)p.Element("Price") > 1000
               select new 
               { 
                   Id = (int)p.Attribute("Id"),
                   Name = (string)p.Element("Name"),
                   Price = (decimal)p.Element("Price")
               };

// 方法语法
var expensiveProducts = xml.Descendants("Product")
    .Where(p => (decimal)p.Element("Price") > 1000)
    .Select(p => new 
    { 
        Id = (int)p.Attribute("Id"),
        Name = (string)p.Element("Name"),
        Price = (decimal)p.Element("Price")
    })
    .ToList();

// 修改XML
XElement product = xml.Descendants("Product").First(p => (int)p.Attribute("Id") == 1);
product.Element("Price").Value = "5499.99";

// 添加元素
XElement newProduct = new XElement("Product",
    new XAttribute("Id", 3),
    new XElement("Name", "平板电脑"),
    new XElement("Price", 2999.99)
);
xml.Root.Add(newProduct);

// 删除元素
xml.Descendants("Product")
    .Where(p => (int)p.Attribute("Id") == 2)
    .Remove();
```

### <a id="linq-performance"></a>LINQ性能优化

#### 延迟执行（Deferred Execution）

```csharp
// LINQ查询默认延迟执行
var query = products.Where(p => p.Price > 1000); // 此时不执行查询

// 只有在迭代或调用ToList、ToArray等时才执行
List<Product> result = query.ToList(); // 此时才执行查询

// 多次迭代会多次执行查询
foreach (var item in query) { } // 执行查询
foreach (var item in query) { } // 再次执行查询

// 缓存结果避免重复执行
var cachedResult = query.ToList(); // 执行一次并缓存
foreach (var item in cachedResult) { } // 使用缓存
foreach (var item in cachedResult) { } // 使用缓存
```

#### 及早执行（Immediate Execution）

```csharp
// 这些操作会立即执行
int count = products.Count();
bool any = products.Any();
Product first = products.First();
decimal sum = products.Sum(p => p.Price);
List<Product> list = products.ToList();
Product[] array = products.ToArray();
```

#### 性能优化技巧

```csharp
// 1. 使用索引而不是顺序查找
// ❌ 较慢
var result1 = products.Where(p => p.Name == "笔记本电脑").ToList();

// ✅ 较快（如果有索引）
var result2 = products.Where(p => p.Id == 1).ToList();

// 2. 在Where之前进行排序（如果只需要Top N）
// ❌ 较慢：先排序全部，再取前10
var result3 = products.OrderBy(p => p.Price).Take(10).ToList();

// ✅ 较快：使用索引或较小的数据集
var result4 = products.Where(p => p.InStock).OrderBy(p => p.Price).Take(10).ToList();

// 3. 避免不必要的多次迭代
// ❌ 多次执行查询
if (products.Any(p => p.Price > 1000))
{
    var expensive = products.Where(p => p.Price > 1000).ToList();
}

// ✅ 执行一次
var expensive = products.Where(p => p.Price > 1000).ToList();
if (expensive.Any())
{
    // 使用expensive
}

// 4. 使用正确的集合类型
// ✅ ToList：需要列表操作时
var list = products.ToList();

// ✅ ToArray：需要数组时
var array = products.ToArray();

// ✅ ToDictionary：需要按键查找时
var dict = products.ToDictionary(p => p.Id);

// 5. 避免Select的重复调用
// ❌ 多次Select
var names1 = products.Select(p => p.Name);
var prices1 = products.Select(p => p.Price);

// ✅ 一次Select选择多个字段
var namesAndPrices = products.Select(p => new { p.Name, p.Price });
var names2 = namesAndPrices.Select(x => x.Name);
var prices2 = namesAndPrices.Select(x => x.Price);
```

### <a id="linq-scenarios"></a>LINQ应用场景

#### 1. 数据筛选和排序

```csharp
// 电商网站：筛选和排序商品
public class ProductService
{
    public IEnumerable<Product> GetProducts(
        string category = null, 
        decimal? minPrice = null, 
        decimal? maxPrice = null,
        bool? inStock = null,
        string sortBy = "Price",
        bool ascending = true)
    {
        var query = products.AsQueryable();
        
        if (!string.IsNullOrEmpty(category))
            query = query.Where(p => p.Category == category);
        
        if (minPrice.HasValue)
            query = query.Where(p => p.Price >= minPrice.Value);
        
        if (maxPrice.HasValue)
            query = query.Where(p => p.Price <= maxPrice.Value);
        
        if (inStock.HasValue)
            query = query.Where(p => p.InStock == inStock.Value);
        
        query = sortBy switch
        {
            "Price" => ascending ? query.OrderBy(p => p.Price) : query.OrderByDescending(p => p.Price),
            "Name" => ascending ? query.OrderBy(p => p.Name) : query.OrderByDescending(p => p.Name),
            _ => query
        };
        
        return query.ToList();
    }
}
```

#### 2. 数据统计和分析

```csharp
// 销售报表：统计各类别销售额
public class SalesReport
{
    public class CategorySales
    {
        public string Category { get; set; }
        public int ProductCount { get; set; }
        public decimal TotalValue { get; set; }
        public decimal AveragePrice { get; set; }
    }
    
    public List<CategorySales> GetCategoryStatistics(List<Product> products)
    {
        return products
            .GroupBy(p => p.Category)
            .Select(g => new CategorySales
            {
                Category = g.Key,
                ProductCount = g.Count(),
                TotalValue = g.Sum(p => p.Price),
                AveragePrice = g.Average(p => p.Price)
            })
            .OrderByDescending(x => x.TotalValue)
            .ToList();
    }
}
```

#### 3. 数据转换和映射

```csharp
// DTO映射
public class ProductDto
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string FormattedPrice { get; set; }
    public string Status { get; set; }
}

public List<ProductDto> MapToDto(List<Product> products)
{
    return products.Select(p => new ProductDto
    {
        Id = p.Id,
        Name = p.Name,
        FormattedPrice = $"¥{p.Price:N2}",
        Status = p.InStock ? "有库存" : "缺货"
    }).ToList();
}
```

#### 4. 数据分组和聚合

```csharp
// 按日期分组统计
public class DailySales
{
    public DateTime Date { get; set; }
    public decimal TotalSales { get; set; }
    public int OrderCount { get; set; }
}

public List<DailySales> GetDailySales(List<Order> orders)
{
    return orders
        .GroupBy(o => o.OrderDate.Date)
        .Select(g => new DailySales
        {
            Date = g.Key,
            TotalSales = g.Sum(o => o.TotalAmount),
            OrderCount = g.Count()
        })
        .OrderBy(x => x.Date)
        .ToList();
}
```

LINQ是C#中强大的查询工具，它提供了一种统一、类型安全、声明式的方式来查询各种数据源。通过合理使用LINQ，可以编写出简洁、易读、高效的数据处理代码。

## <a id="orm-frameworks"></a>C# ORM框架详解

ORM（Object-Relational Mapping，对象关系映射）是一种编程技术，用于在面向对象编程语言和关系数据库之间建立映射关系。在C#中，从基础的ADO.NET到现代的Entity Framework，提供了多种数据访问方式。本章将从ADO.NET基础开始，逐步介绍Entity Framework 6的完整功能。

### <a id="ado-net-basics"></a>ADO.NET基础

ADO.NET是.NET Framework中用于访问数据库的核心技术，它提供了直接访问数据库的能力，是其他ORM框架的基础。

#### ADO.NET架构

ADO.NET采用断开式架构，主要组件包括：

```
ADO.NET架构
├── .NET Framework数据提供程序
│   ├── SqlClient（SQL Server）
│   ├── OleDb（OLE DB数据源）
│   ├── Odbc（ODBC数据源）
│   └── OracleClient（Oracle）
├── DataSet和DataTable（断开式数据）
└── 数据访问类
    ├── Connection（连接）
    ├── Command（命令）
    ├── DataReader（数据读取器）
    └── DataAdapter（数据适配器）
```

#### 命名空间

```csharp
using System.Data;                    // 核心数据类
using System.Data.SqlClient;          // SQL Server提供程序
using System.Data.Common;             // 通用数据访问类
using System.Data.SqlTypes;           // SQL Server数据类型
```

### <a id="ado-net-connection"></a>ADO.NET连接管理

#### SqlConnection类

`SqlConnection`用于建立与SQL Server数据库的连接。

```csharp
using System.Data.SqlClient;

// 连接字符串
string connectionString = "Server=localhost;Database=MyDB;User Id=sa;Password=123456;";
// 或者使用集成安全
string connectionString2 = "Server=localhost;Database=MyDB;Integrated Security=True;";
// 或者使用连接字符串构建器
SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder
{
    DataSource = "localhost",
    InitialCatalog = "MyDB",
    UserID = "sa",
    Password = "123456",
    ConnectTimeout = 30,
    Encrypt = true,
    TrustServerCertificate = false
};
string connectionString3 = builder.ConnectionString;

// 创建连接
SqlConnection connection = new SqlConnection(connectionString);

// 打开连接
try
{
    connection.Open();
    Console.WriteLine("连接成功");
    Console.WriteLine($"数据库: {connection.Database}");
    Console.WriteLine($"服务器: {connection.DataSource}");
    Console.WriteLine($"状态: {connection.State}");
    Console.WriteLine($"服务器版本: {connection.ServerVersion}");
}
catch (SqlException ex)
{
    Console.WriteLine($"连接失败: {ex.Message}");
}
finally
{
    // 关闭连接
    if (connection.State == ConnectionState.Open)
    {
        connection.Close();
    }
    connection.Dispose();
}

// 使用using语句（推荐）
using (SqlConnection conn = new SqlConnection(connectionString))
{
    conn.Open();
    // 使用连接
    // 自动关闭和释放
}
```

#### 连接字符串详解

```csharp
// 基本连接字符串
string basic = "Server=localhost;Database=MyDB;User Id=sa;Password=123456;";

// 完整连接字符串（包含所有常用选项）
string full = @"Server=localhost,1433;
                Database=MyDB;
                User Id=sa;
                Password=123456;
                Connect Timeout=30;
                Encrypt=True;
                TrustServerCertificate=False;
                Integrated Security=False;
                MultipleActiveResultSets=True;
                Pooling=True;
                Min Pool Size=5;
                Max Pool Size=100;
                Connection Lifetime=0;
                Application Name=MyApp";

// 使用连接字符串构建器（类型安全）
SqlConnectionStringBuilder csb = new SqlConnectionStringBuilder
{
    // 服务器和数据库
    DataSource = "localhost",
    InitialCatalog = "MyDB",
    
    // 身份验证
    IntegratedSecurity = false,
    UserID = "sa",
    Password = "123456",
    
    // 连接选项
    ConnectTimeout = 30,
    Encrypt = true,
    TrustServerCertificate = false,
    MultipleActiveResultSets = true,
    
    // 连接池
    Pooling = true,
    MinPoolSize = 5,
    MaxPoolSize = 100,
    ConnectionLifetime = 0,
    
    // 应用程序信息
    ApplicationName = "MyApplication"
};

string connectionString = csb.ConnectionString;
```

#### 连接池管理

ADO.NET自动管理连接池，提高性能：

```csharp
// 连接池默认启用
// 相同连接字符串的连接会被放入池中重用

// 检查连接池状态
string poolInfo = $"当前连接池中的连接数: {GetConnectionPoolInfo()}";

// 手动控制连接池
SqlConnectionStringBuilder builder = new SqlConnectionStringBuilder
{
    DataSource = "localhost",
    InitialCatalog = "MyDB",
    IntegratedSecurity = true,
    Pooling = true,        // 启用连接池（默认）
    MinPoolSize = 5,       // 最小连接数
    MaxPoolSize = 100,     // 最大连接数
    ConnectionLifetime = 0 // 连接生命周期（0表示不限制）
};

// 清空连接池（谨慎使用）
SqlConnection.ClearPool(connection);
SqlConnection.ClearAllPools(); // 清空所有连接池
```

### <a id="ado-net-commands"></a>ADO.NET命令执行

#### SqlCommand类

`SqlCommand`用于执行SQL命令。

```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    connection.Open();
    
    // 方式1：使用构造函数
    SqlCommand command = new SqlCommand("SELECT * FROM Users", connection);
    
    // 方式2：使用CommandText属性
    SqlCommand command2 = new SqlCommand();
    command2.Connection = connection;
    command2.CommandText = "SELECT * FROM Users";
    
    // 方式3：使用CommandType
    SqlCommand command3 = new SqlCommand("GetAllUsers", connection);
    command3.CommandType = CommandType.StoredProcedure; // 存储过程
    
    // 执行命令
    // ExecuteNonQuery：执行不返回数据的命令（INSERT、UPDATE、DELETE）
    int rowsAffected = command.ExecuteNonQuery();
    
    // ExecuteScalar：执行返回单个值的命令
    object result = command.ExecuteScalar();
    
    // ExecuteReader：执行返回数据集的命令（SELECT）
    SqlDataReader reader = command.ExecuteReader();
}
```

#### 执行不同类型的命令

```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    connection.Open();
    
    // 1. SELECT查询（使用ExecuteReader）
    SqlCommand selectCmd = new SqlCommand("SELECT Id, Name, Email FROM Users", connection);
    using (SqlDataReader reader = selectCmd.ExecuteReader())
    {
        while (reader.Read())
        {
            int id = reader.GetInt32(0);
            string name = reader.GetString(1);
            string email = reader.GetString(2);
            Console.WriteLine($"ID: {id}, Name: {name}, Email: {email}");
        }
    }
    
    // 2. INSERT命令（使用ExecuteNonQuery）
    SqlCommand insertCmd = new SqlCommand(
        "INSERT INTO Users (Name, Email) VALUES (@Name, @Email)", 
        connection);
    insertCmd.Parameters.AddWithValue("@Name", "张三");
    insertCmd.Parameters.AddWithValue("@Email", "zhangsan@example.com");
    int insertedRows = insertCmd.ExecuteNonQuery();
    Console.WriteLine($"插入了 {insertedRows} 行");
    
    // 3. UPDATE命令
    SqlCommand updateCmd = new SqlCommand(
        "UPDATE Users SET Email = @Email WHERE Id = @Id", 
        connection);
    updateCmd.Parameters.AddWithValue("@Email", "newemail@example.com");
    updateCmd.Parameters.AddWithValue("@Id", 1);
    int updatedRows = updateCmd.ExecuteNonQuery();
    Console.WriteLine($"更新了 {updatedRows} 行");
    
    // 4. DELETE命令
    SqlCommand deleteCmd = new SqlCommand("DELETE FROM Users WHERE Id = @Id", connection);
    deleteCmd.Parameters.AddWithValue("@Id", 1);
    int deletedRows = deleteCmd.ExecuteNonQuery();
    Console.WriteLine($"删除了 {deletedRows} 行");
    
    // 5. 返回单个值（使用ExecuteScalar）
    SqlCommand countCmd = new SqlCommand("SELECT COUNT(*) FROM Users", connection);
    int userCount = (int)countCmd.ExecuteScalar();
    Console.WriteLine($"用户总数: {userCount}");
    
    // 6. 返回OUTPUT参数
    SqlCommand outputCmd = new SqlCommand(
        "INSERT INTO Users (Name, Email) OUTPUT INSERTED.Id VALUES (@Name, @Email)", 
        connection);
    outputCmd.Parameters.AddWithValue("@Name", "李四");
    outputCmd.Parameters.AddWithValue("@Email", "lisi@example.com");
    int newId = (int)outputCmd.ExecuteScalar();
    Console.WriteLine($"新插入的ID: {newId}");
}
```

### <a id="ado-net-data-reader"></a>ADO.NET数据读取

#### SqlDataReader类

`SqlDataReader`提供只进、只读的数据流访问。

```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    connection.Open();
    
    SqlCommand command = new SqlCommand("SELECT * FROM Users", connection);
    
    // 执行查询并获取DataReader
    using (SqlDataReader reader = command.ExecuteReader())
    {
        // 检查是否有数据
        if (reader.HasRows)
        {
            // 读取列信息
            for (int i = 0; i < reader.FieldCount; i++)
            {
                Console.WriteLine($"列 {i}: {reader.GetName(i)}, 类型: {reader.GetFieldType(i)}");
            }
            
            // 逐行读取数据
            while (reader.Read())
            {
                // 方式1：使用索引（最快）
                int id = reader.GetInt32(0);
                string name = reader.GetString(1);
                
                // 方式2：使用列名（更安全）
                int id2 = reader.GetInt32("Id");
                string name2 = reader.GetString("Name");
                
                // 方式3：使用IsDBNull检查空值
                string email = reader.IsDBNull("Email") 
                    ? null 
                    : reader.GetString("Email");
                
                // 方式4：使用索引器
                object idObj = reader["Id"];
                object nameObj = reader["Name"];
                
                Console.WriteLine($"ID: {id}, Name: {name}, Email: {email}");
            }
        }
    }
}
```

#### DataReader的常用方法

```csharp
using (SqlDataReader reader = command.ExecuteReader())
{
    while (reader.Read())
    {
        // 获取值的方法（按类型）
        int intValue = reader.GetInt32("Id");
        long longValue = reader.GetInt64("BigId");
        string stringValue = reader.GetString("Name");
        bool boolValue = reader.GetBoolean("IsActive");
        DateTime dateValue = reader.GetDateTime("CreateDate");
        decimal decimalValue = reader.GetDecimal("Price");
        double doubleValue = reader.GetDouble("Rate");
        float floatValue = reader.GetFloat("Score");
        byte[] bytes = (byte[])reader["ImageData"];
        Guid guidValue = reader.GetGuid("GuidId");
        
        // 获取值（通用方法）
        object value = reader.GetValue("ColumnName");
        string valueAsString = reader.GetValue("ColumnName").ToString();
        
        // 检查是否为NULL
        if (!reader.IsDBNull("Email"))
        {
            string email = reader.GetString("Email");
        }
        
        // 获取列索引
        int columnIndex = reader.GetOrdinal("Name");
        string name = reader.GetString(columnIndex);
        
        // 获取列名
        string columnName = reader.GetName(0);
        
        // 获取列类型
        Type columnType = reader.GetFieldType(0);
        
        // 获取数据类型名称
        string dataTypeName = reader.GetDataTypeName(0);
    }
}
```

#### 读取多个结果集

```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    connection.Open();
    
    SqlCommand command = new SqlCommand(
        "SELECT * FROM Users; SELECT * FROM Orders;", 
        connection);
    
    using (SqlDataReader reader = command.ExecuteReader())
    {
        // 第一个结果集：Users
        Console.WriteLine("=== 用户列表 ===");
        while (reader.Read())
        {
            Console.WriteLine($"用户: {reader.GetString("Name")}");
        }
        
        // 移动到下一个结果集
        if (reader.NextResult())
        {
            Console.WriteLine("=== 订单列表 ===");
            while (reader.Read())
            {
                Console.WriteLine($"订单ID: {reader.GetInt32("Id")}");
            }
        }
    }
}
```

### <a id="ado-net-parameters"></a>ADO.NET参数化查询

参数化查询是防止SQL注入攻击的最佳实践，同时提高查询性能。

#### SqlParameter类

```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    connection.Open();
    
    // 方式1：使用AddWithValue（简单但不推荐用于生产环境）
    SqlCommand command1 = new SqlCommand(
        "SELECT * FROM Users WHERE Name = @Name AND Age > @Age", 
        connection);
    command1.Parameters.AddWithValue("@Name", "张三");
    command1.Parameters.AddWithValue("@Age", 18);
    
    // 方式2：使用Add方法（推荐）
    SqlCommand command2 = new SqlCommand(
        "INSERT INTO Users (Name, Email, Age, CreateDate) VALUES (@Name, @Email, @Age, @CreateDate)", 
        connection);
    
    // 添加参数并指定类型和值
    command2.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = "张三";
    command2.Parameters.Add("@Email", SqlDbType.NVarChar, 200).Value = "zhangsan@example.com";
    command2.Parameters.Add("@Age", SqlDbType.Int).Value = 25;
    command2.Parameters.Add("@CreateDate", SqlDbType.DateTime).Value = DateTime.Now;
    
    // 方式3：创建SqlParameter对象
    SqlParameter nameParam = new SqlParameter("@Name", SqlDbType.NVarChar, 100)
    {
        Value = "张三",
        Direction = ParameterDirection.Input
    };
    command2.Parameters.Add(nameParam);
    
    // 执行命令
    int rowsAffected = command2.ExecuteNonQuery();
}
```

#### 参数类型和方向

```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    connection.Open();
    
    // 输入参数（默认）
    SqlCommand command = new SqlCommand(
        "INSERT INTO Users (Name, Email) VALUES (@Name, @Email); SELECT SCOPE_IDENTITY();", 
        connection);
    
    SqlParameter nameParam = new SqlParameter("@Name", SqlDbType.NVarChar, 100)
    {
        Value = "张三",
        Direction = ParameterDirection.Input // 输入参数
    };
    command.Parameters.Add(nameParam);
    
    // 输出参数
    SqlParameter idParam = new SqlParameter("@NewId", SqlDbType.Int)
    {
        Direction = ParameterDirection.Output // 输出参数
    };
    command.Parameters.Add(idParam);
    
    // 输入输出参数
    SqlParameter countParam = new SqlParameter("@Count", SqlDbType.Int)
    {
        Value = 0,
        Direction = ParameterDirection.InputOutput // 输入输出参数
    };
    command.Parameters.Add(countParam);
    
    // 返回值参数
    SqlParameter returnParam = new SqlParameter("@ReturnValue", SqlDbType.Int)
    {
        Direction = ParameterDirection.ReturnValue // 返回值
    };
    command.Parameters.Add(returnParam);
    
    command.ExecuteNonQuery();
    
    // 获取输出参数值
    int newId = (int)idParam.Value;
    int count = (int)countParam.Value;
    int returnValue = (int)returnParam.Value;
}
```

#### 参数化查询完整示例

```csharp
// 用户实体类
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int Age { get; set; }
    public DateTime CreateDate { get; set; }
}

// 查询示例
public List<User> GetUsers(string nameFilter, int minAge)
{
    List<User> users = new List<User>();
    
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        
        SqlCommand command = new SqlCommand(
            "SELECT Id, Name, Email, Age FROM Users WHERE Name LIKE @Name AND Age >= @MinAge", 
            connection);
        
        // 使用LIKE时，通配符在值中
        command.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = $"%{nameFilter}%";
        command.Parameters.Add("@MinAge", SqlDbType.Int).Value = minAge;
        
        using (SqlDataReader reader = command.ExecuteReader())
        {
            while (reader.Read())
            {
                users.Add(new User
                {
                    Id = reader.GetInt32("Id"),
                    Name = reader.GetString("Name"),
                    Email = reader.GetString("Email"),
                    Age = reader.GetInt32("Age")
                });
            }
        }
    }
    
    return users;
}

// 插入示例
public int InsertUser(User user)
{
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        
        SqlCommand command = new SqlCommand(
            "INSERT INTO Users (Name, Email, Age, CreateDate) " +
            "VALUES (@Name, @Email, @Age, @CreateDate); " +
            "SELECT SCOPE_IDENTITY();", 
            connection);
        
        command.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = user.Name;
        command.Parameters.Add("@Email", SqlDbType.NVarChar, 200).Value = user.Email;
        command.Parameters.Add("@Age", SqlDbType.Int).Value = user.Age;
        command.Parameters.Add("@CreateDate", SqlDbType.DateTime).Value = DateTime.Now;
        
        object result = command.ExecuteScalar();
        return Convert.ToInt32(result);
    }
}

// 更新示例
public int UpdateUser(User user)
{
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        
        SqlCommand command = new SqlCommand(
            "UPDATE Users SET Name = @Name, Email = @Email, Age = @Age WHERE Id = @Id", 
            connection);
        
        command.Parameters.Add("@Id", SqlDbType.Int).Value = user.Id;
        command.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = user.Name;
        command.Parameters.Add("@Email", SqlDbType.NVarChar, 200).Value = user.Email;
        command.Parameters.Add("@Age", SqlDbType.Int).Value = user.Age;
        
        return command.ExecuteNonQuery();
    }
}

// 删除示例
public int DeleteUser(int userId)
{
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        
        SqlCommand command = new SqlCommand("DELETE FROM Users WHERE Id = @Id", connection);
        command.Parameters.Add("@Id", SqlDbType.Int).Value = userId;
        
        return command.ExecuteNonQuery();
    }
}
```

### <a id="ado-net-transactions"></a>ADO.NET事务处理

事务确保数据库操作的原子性、一致性、隔离性和持久性（ACID特性）。

#### 基本事务

```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    connection.Open();
    
    // 开始事务
    SqlTransaction transaction = connection.BeginTransaction();
    
    try
    {
        // 命令1：插入用户
        SqlCommand cmd1 = new SqlCommand(
            "INSERT INTO Users (Name, Email) VALUES (@Name, @Email)", 
            connection, 
            transaction);
        cmd1.Parameters.AddWithValue("@Name", "张三");
        cmd1.Parameters.AddWithValue("@Email", "zhangsan@example.com");
        cmd1.ExecuteNonQuery();
        
        // 命令2：插入订单
        SqlCommand cmd2 = new SqlCommand(
            "INSERT INTO Orders (UserId, TotalAmount) VALUES (@UserId, @TotalAmount)", 
            connection, 
            transaction);
        cmd2.Parameters.AddWithValue("@UserId", 1);
        cmd2.Parameters.AddWithValue("@TotalAmount", 100.00m);
        cmd2.ExecuteNonQuery();
        
        // 提交事务
        transaction.Commit();
        Console.WriteLine("事务提交成功");
    }
    catch (Exception ex)
    {
        // 回滚事务
        transaction.Rollback();
        Console.WriteLine($"事务回滚: {ex.Message}");
    }
}
```

#### 事务隔离级别

```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    connection.Open();
    
    // 设置事务隔离级别
    SqlTransaction transaction = connection.BeginTransaction(IsolationLevel.ReadCommitted);
    
    // 隔离级别选项：
    // ReadUncommitted：读取未提交的数据（最低隔离级别，可能脏读）
    // ReadCommitted：读取已提交的数据（默认，SQL Server，避免脏读）
    // RepeatableRead：可重复读（避免脏读和不可重复读）
    // Serializable：序列化（最高隔离级别，避免所有并发问题，但性能最低）
    // Snapshot：快照隔离（SQL Server 2005+，使用行版本控制）
    
    try
    {
        SqlCommand command = new SqlCommand("UPDATE Users SET Name = @Name WHERE Id = @Id", 
            connection, transaction);
        command.Parameters.AddWithValue("@Name", "新名称");
        command.Parameters.AddWithValue("@Id", 1);
        command.ExecuteNonQuery();
        
        transaction.Commit();
    }
    catch
    {
        transaction.Rollback();
        throw;
    }
}
```

#### 嵌套事务（保存点）

```csharp
using (SqlConnection connection = new SqlConnection(connectionString))
{
    connection.Open();
    SqlTransaction transaction = connection.BeginTransaction();
    
    try
    {
        // 第一个操作
        SqlCommand cmd1 = new SqlCommand("INSERT INTO Users (Name) VALUES ('用户1')", 
            connection, transaction);
        cmd1.ExecuteNonQuery();
        
        // 创建保存点
        transaction.Save("SavePoint1");
        
        try
        {
            // 第二个操作（可能失败）
            SqlCommand cmd2 = new SqlCommand("INSERT INTO Users (Name) VALUES ('用户2')", 
                connection, transaction);
            cmd2.ExecuteNonQuery();
        }
        catch
        {
            // 回滚到保存点（只回滚保存点之后的操作）
            transaction.Rollback("SavePoint1");
            Console.WriteLine("回滚到保存点，第一个操作仍然有效");
        }
        
        // 提交事务
        transaction.Commit();
    }
    catch
    {
        transaction.Rollback();
        throw;
    }
}
```

### <a id="ado-net-stored-procedures"></a>ADO.NET存储过程

存储过程是预编译的SQL代码，可以提高性能、安全性和代码重用性。

#### 执行存储过程

```csharp
// 创建存储过程（SQL Server示例）
/*
CREATE PROCEDURE GetUserById
    @UserId INT
AS
BEGIN
    SELECT Id, Name, Email, Age, CreateDate
    FROM Users 
    WHERE Id = @UserId
END

CREATE PROCEDURE InsertUser
    @Name NVARCHAR(100),
    @Email NVARCHAR(200),
    @Age INT,
    @NewId INT OUTPUT
AS
BEGIN
    INSERT INTO Users (Name, Email, Age, CreateDate)
    VALUES (@Name, @Email, @Age, GETDATE())
    
    SET @NewId = SCOPE_IDENTITY()
END

CREATE PROCEDURE GetUsersByAgeRange
    @MinAge INT,
    @MaxAge INT
AS
BEGIN
    SELECT Id, Name, Email, Age
    FROM Users
    WHERE Age BETWEEN @MinAge AND @MaxAge
    ORDER BY Age
END
*/

// 执行存储过程（查询）
public User GetUserById(int userId)
{
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        
        SqlCommand command = new SqlCommand("GetUserById", connection);
        command.CommandType = CommandType.StoredProcedure;
        command.Parameters.Add("@UserId", SqlDbType.Int).Value = userId;
        
        using (SqlDataReader reader = command.ExecuteReader())
        {
            if (reader.Read())
            {
                return new User
                {
                    Id = reader.GetInt32("Id"),
                    Name = reader.GetString("Name"),
                    Email = reader.GetString("Email"),
                    Age = reader.GetInt32("Age"),
                    CreateDate = reader.GetDateTime("CreateDate")
                };
            }
        }
    }
    return null;
}

// 执行存储过程（带输出参数）
public int InsertUserWithStoredProcedure(User user)
{
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        
        SqlCommand command = new SqlCommand("InsertUser", connection);
        command.CommandType = CommandType.StoredProcedure;
        
        // 输入参数
        command.Parameters.Add("@Name", SqlDbType.NVarChar, 100).Value = user.Name;
        command.Parameters.Add("@Email", SqlDbType.NVarChar, 200).Value = user.Email;
        command.Parameters.Add("@Age", SqlDbType.Int).Value = user.Age;
        
        // 输出参数
        SqlParameter newIdParam = new SqlParameter("@NewId", SqlDbType.Int)
        {
            Direction = ParameterDirection.Output
        };
        command.Parameters.Add(newIdParam);
        
        command.ExecuteNonQuery();
        
        // 获取输出参数值
        return (int)newIdParam.Value;
    }
}

// 执行存储过程（返回多个结果集）
public void GetUsersAndOrders(int userId)
{
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        
        SqlCommand command = new SqlCommand("GetUserWithOrders", connection);
        command.CommandType = CommandType.StoredProcedure;
        command.Parameters.Add("@UserId", SqlDbType.Int).Value = userId;
        
        using (SqlDataReader reader = command.ExecuteReader())
        {
            // 第一个结果集：用户信息
            if (reader.Read())
            {
                Console.WriteLine($"用户: {reader.GetString("Name")}");
            }
            
            // 第二个结果集：订单信息
            if (reader.NextResult())
            {
                while (reader.Read())
                {
                    Console.WriteLine($"订单: {reader.GetInt32("Id")}");
                }
            }
        }
    }
}
```

#### 使用DataAdapter填充DataSet

```csharp
using System.Data;

// 使用DataAdapter填充DataSet（断开式数据访问）
public DataSet GetUsersDataSet()
{
    DataSet dataSet = new DataSet();
    
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        
        SqlDataAdapter adapter = new SqlDataAdapter("SELECT * FROM Users", connection);
        
        // 填充DataSet
        adapter.Fill(dataSet, "Users");
        
        // 可以填充多个表
        adapter.SelectCommand.CommandText = "SELECT * FROM Orders";
        adapter.Fill(dataSet, "Orders");
    }
    
    return dataSet;
}

// 使用DataAdapter更新数据
public void UpdateUsersWithAdapter(DataTable dataTable)
{
    using (SqlConnection connection = new SqlConnection(connectionString))
    {
        connection.Open();
        
        SqlDataAdapter adapter = new SqlDataAdapter();
        
        // 配置SelectCommand
        adapter.SelectCommand = new SqlCommand("SELECT * FROM Users", connection);
        
        // 配置InsertCommand
        adapter.InsertCommand = new SqlCommand(
            "INSERT INTO Users (Name, Email, Age, CreateDate) VALUES (@Name, @Email, @Age, @CreateDate)", 
            connection);
        adapter.InsertCommand.Parameters.Add("@Name", SqlDbType.NVarChar, 100, "Name");
        adapter.InsertCommand.Parameters.Add("@Email", SqlDbType.NVarChar, 200, "Email");
        adapter.InsertCommand.Parameters.Add("@Age", SqlDbType.Int, 0, "Age");
        adapter.InsertCommand.Parameters.Add("@CreateDate", SqlDbType.DateTime, 0, "CreateDate");
        
        // 配置UpdateCommand
        adapter.UpdateCommand = new SqlCommand(
            "UPDATE Users SET Name = @Name, Email = @Email, Age = @Age WHERE Id = @Id", 
            connection);
        adapter.UpdateCommand.Parameters.Add("@Name", SqlDbType.NVarChar, 100, "Name");
        adapter.UpdateCommand.Parameters.Add("@Email", SqlDbType.NVarChar, 200, "Email");
        adapter.UpdateCommand.Parameters.Add("@Age", SqlDbType.Int, 0, "Age");
        SqlParameter idParam = adapter.UpdateCommand.Parameters.Add("@Id", SqlDbType.Int, 0, "Id");
        idParam.SourceVersion = DataRowVersion.Original; // 使用原始值
        
        // 配置DeleteCommand
        adapter.DeleteCommand = new SqlCommand("DELETE FROM Users WHERE Id = @Id", connection);
        SqlParameter deleteIdParam = adapter.DeleteCommand.Parameters.Add("@Id", SqlDbType.Int, 0, "Id");
        deleteIdParam.SourceVersion = DataRowVersion.Original;
        
        // 执行更新
        int rowsAffected = adapter.Update(dataTable);
        Console.WriteLine($"更新了 {rowsAffected} 行");
    }
}
```

### <a id="ef6-basics"></a>Entity Framework 6基础

Entity Framework 6（EF6）是Microsoft开发的ORM框架，它允许开发者使用面向对象的方式操作数据库，而无需编写大量的SQL代码。

#### Entity Framework 6概述

Entity Framework 6的主要特点：
- **Code First**：通过代码定义模型，EF自动创建数据库
- **Database First**：从现有数据库生成模型
- **Model First**：使用设计器创建模型
- **LINQ支持**：使用LINQ查询数据库
- **变更跟踪**：自动跟踪实体状态变化
- **迁移支持**：数据库架构版本管理

#### 安装Entity Framework 6

```csharp
// 通过NuGet包管理器安装
// Install-Package EntityFramework

// 或者在Package Manager Console中执行：
// PM> Install-Package EntityFramework -Version 6.4.4

// 安装后会自动添加引用：
// using System.Data.Entity;
```

#### Code First开发流程（代码先行）

Code First是Entity Framework的一种开发模式，开发者先定义实体类和DbContext，然后由EF自动创建数据库。这种方式适合新项目开发，可以完全通过代码控制数据库结构。

**Code First开发步骤：**

**步骤1：定义实体类**

```csharp
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    
    [Required]
    [MaxLength(200)]
    [Index(IsUnique = true)]
    public string Email { get; set; }
    
    public int Age { get; set; }
    
    public DateTime CreateDate { get; set; }
    
    public virtual ICollection<Order> Orders { get; set; }
    
    public User()
    {
        Orders = new HashSet<Order>();
        CreateDate = DateTime.Now;
    }
}
```

**步骤2：定义DbContext**

```csharp
using System.Data.Entity;

public class MyDbContext : DbContext
{
    public MyDbContext() : base("DefaultConnection")
    {
        // 开发阶段：自动创建数据库（如果不存在）
        Database.SetInitializer(new CreateDatabaseIfNotExists<MyDbContext>());
        
        // 或者：删除并重新创建数据库（仅开发环境，会丢失数据）
        // Database.SetInitializer(new DropCreateDatabaseIfModelChanges<MyDbContext>());
        
        // 生产环境：禁用自动创建
        // Database.SetInitializer<MyDbContext>(null);
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    
    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // 使用Fluent API进行额外配置
        modelBuilder.Entity<User>()
            .HasMany(u => u.Orders)
            .WithRequired(o => o.User)
            .HasForeignKey(o => o.UserId)
            .WillCascadeOnDelete(true);
    }
}
```

**步骤3：配置连接字符串（App.config或Web.config）**

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <connectionStrings>
    <add name="DefaultConnection" 
         connectionString="Server=localhost;Database=MyCodeFirstDB;Integrated Security=True;" 
         providerName="System.Data.SqlClient" />
  </connectionStrings>
  
  <entityFramework>
    <defaultConnectionFactory type="System.Data.Entity.Infrastructure.SqlConnectionFactory, EntityFramework" />
    <providers>
      <provider invariantName="System.Data.SqlClient" 
                type="System.Data.Entity.SqlServer.SqlProviderServices, EntityFramework.SqlServer" />
    </providers>
  </entityFramework>
</configuration>
```

**步骤4：启用迁移（Migration）**

```bash
# 在Package Manager Console中执行：
# 1. 启用迁移（首次）
PM> Enable-Migrations

# 这会创建一个Migrations文件夹和Configuration.cs文件
```

**步骤5：创建初始迁移**

```bash
# 2. 创建初始迁移
PM> Add-Migration InitialCreate

# 这会创建一个迁移文件，包含创建数据库的代码
# 文件名格式：时间戳_InitialCreate.cs
```

**步骤6：查看迁移SQL（可选）**

```bash
# 查看将要执行的SQL语句
PM> Update-Database -Script

# 这会生成SQL脚本，但不执行
```

**步骤7：应用迁移到数据库**

```bash
# 应用迁移，创建或更新数据库
PM> Update-Database

# 这会：
# - 创建数据库（如果不存在）
# - 创建表结构
# - 创建索引和约束
```

**步骤8：使用DbContext**

```csharp
using (var context = new MyDbContext())
{
    // 第一次运行时会自动创建数据库（如果启用了自动创建）
    // 或者手动执行迁移：Update-Database
    
    // 添加数据
    var user = new User
    {
        Name = "张三",
        Email = "zhangsan@example.com",
        Age = 25
    };
    context.Users.Add(user);
    context.SaveChanges(); // 此时数据库和表已创建
}
```

**Code First迁移工作流：**

```bash
# 1. 修改实体类（添加属性、修改属性等）
# 例如：在User类中添加Phone属性

# 2. 创建新的迁移
PM> Add-Migration AddPhoneToUser

# 3. 查看SQL（可选）
PM> Update-Database -Script

# 4. 应用迁移
PM> Update-Database

# 5. 回滚迁移（如果需要）
PM> Update-Database -TargetMigration:PreviousMigrationName
```

**Code First数据库初始化策略：**

```csharp
// 1. CreateDatabaseIfNotExists（默认，如果数据库不存在则创建）
Database.SetInitializer(new CreateDatabaseIfNotExists<MyDbContext>());

// 2. DropCreateDatabaseIfModelChanges（模型改变时删除并重建，仅开发环境）
Database.SetInitializer(new DropCreateDatabaseIfModelChanges<MyDbContext>());

// 3. DropCreateDatabaseAlways（总是删除并重建，仅开发环境）
Database.SetInitializer(new DropCreateDatabaseAlways<MyDbContext>());

// 4. 自定义初始化器
public class MyDbInitializer : CreateDatabaseIfNotExists<MyDbContext>
{
    protected override void Seed(MyDbContext context)
    {
        // 初始化种子数据
        context.Users.Add(new User { Name = "管理员", Email = "admin@example.com" });
        context.SaveChanges();
        base.Seed(context);
    }
}

Database.SetInitializer(new MyDbInitializer());

// 5. 禁用初始化（生产环境）
Database.SetInitializer<MyDbContext>(null);
```

#### Database First开发流程（数据库先行）

Database First是Entity Framework的另一种开发模式，开发者先创建数据库，然后使用EF工具从数据库生成实体类和DbContext。这种方式适合已有数据库或数据库优先的场景。

**Database First开发步骤：**

**步骤1：创建数据库**

在SQL Server Management Studio中创建数据库和表：

```sql
-- 创建数据库
CREATE DATABASE MyDatabaseFirstDB;
GO

USE MyDatabaseFirstDB;
GO

-- 创建Users表
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(100) NOT NULL,
    Email NVARCHAR(200) NOT NULL UNIQUE,
    Age INT NOT NULL,
    CreateDate DATETIME NOT NULL DEFAULT GETDATE()
);

-- 创建Orders表
CREATE TABLE Orders (
    Id INT PRIMARY KEY IDENTITY(1,1),
    OrderDate DATETIME NOT NULL,
    TotalAmount DECIMAL(18,2) NOT NULL,
    UserId INT NOT NULL,
    FOREIGN KEY (UserId) REFERENCES Users(Id)
);
```

**步骤2：在Visual Studio中添加ADO.NET Entity Data Model**

1. 右键点击项目 → 添加 → 新建项
2. 选择"数据" → "ADO.NET Entity Data Model"
3. 输入模型名称（如：MyModel.edmx）
4. 点击"添加"

**步骤3：选择"来自数据库的EF设计器"**

在"Entity Data Model向导"中选择：
- **从数据库生成**（Database First）
- 点击"下一步"

**步骤4：配置数据库连接**

1. 选择"新建连接"
2. 配置连接：
   - 服务器名：localhost
   - 数据库名：MyDatabaseFirstDB
   - 身份验证方式（Windows或SQL Server）
3. 测试连接
4. 勾选"将App.config中的实体连接设置另存为"
5. 连接字符串名称：MyDatabaseFirstDBEntities（或自定义）
6. 点击"下一步"

**步骤5：选择数据库对象**

1. 选择要包含在模型中的表、视图、存储过程
2. 勾选：
   - ✅ Users（表）
   - ✅ Orders（表）
   - ✅ 存储过程（可选）
   - ✅ 视图（可选）
3. 输入模型命名空间（如：MyModel）
4. 勾选"确定所生成对象名称的单复数形式"
5. 勾选"包含外键列"
6. 勾选"导入所选存储过程和函数到实体模型"
7. 点击"完成"

**步骤6：查看生成的模型**

EF会生成以下文件：

```
MyModel.edmx          // 实体数据模型文件（设计器）
MyModel.edmx.diagram  // 模型关系图
MyModel.Designer.cs   // 设计器生成的代码（包含实体类和DbContext）
MyModel.Context.tt    // T4模板
MyModel.tt            // T4模板
MyModel.Context.cs    // DbContext类（由T4生成）
User.cs               // User实体类（由T4生成）
Order.cs              // Order实体类（由T4生成）
```

**步骤7：查看生成的代码**

**生成的DbContext（MyModel.Context.cs）：**

```csharp
public partial class MyDatabaseFirstDBEntities : DbContext
{
    public MyDatabaseFirstDBEntities()
        : base("name=MyDatabaseFirstDBEntities")
    {
    }
    
    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        throw new UnintentionalCodeFirstException();
    }
    
    public virtual DbSet<User> Users { get; set; }
    public virtual DbSet<Order> Orders { get; set; }
}
```

**生成的实体类（User.cs）：**

```csharp
public partial class User
{
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", 
        "CA2214:DoNotCallOverridableMethodsInConstructors")]
    public User()
    {
        this.Orders = new HashSet<Order>();
    }
    
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public int Age { get; set; }
    public System.DateTime CreateDate { get; set; }
    
    [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", 
        "CA2227:CollectionPropertiesShouldBeReadOnly")]
    public virtual ICollection<Order> Orders { get; set; }
}
```

**步骤8：使用生成的DbContext**

```csharp
using (var context = new MyDatabaseFirstDBEntities())
{
    // 查询数据
    var users = context.Users.ToList();
    var userById = context.Users.Find(1);
    
    // 添加数据
    var newUser = new User
    {
        Name = "李四",
        Email = "lisi@example.com",
        Age = 30,
        CreateDate = DateTime.Now
    };
    context.Users.Add(newUser);
    context.SaveChanges();
    
    // 更新数据
    var user = context.Users.Find(1);
    if (user != null)
    {
        user.Name = "更新的名称";
        context.SaveChanges();
    }
    
    // 删除数据
    var userToDelete = context.Users.Find(2);
    if (userToDelete != null)
    {
        context.Users.Remove(userToDelete);
        context.SaveChanges();
    }
}
```

**步骤9：更新模型（当数据库结构改变时）**

1. 在数据库中修改表结构（添加列、修改列等）
2. 在Visual Studio中，右键点击.edmx文件
3. 选择"从数据库更新模型..."
4. 点击"刷新"标签
5. 选择要更新的表
6. 点击"完成"
7. 保存.edmx文件（会自动重新生成代码）

**Database First与数据库同步：**

```bash
# 如果数据库结构改变了：
# 1. 右键.edmx → 从数据库更新模型
# 2. 或者删除.edmx，重新生成
# 3. 注意：Database First不支持迁移（Migration），需要手动更新模型

# 如果模型改变了（但不推荐，Database First应该从数据库同步）：
# 右键.edmx → 从模型生成数据库
# 这会生成SQL脚本，可以执行更新数据库
```

**Database First注意事项：**

1. **不支持迁移**：Database First不支持Code First的迁移功能，数据库结构改变时需要手动更新模型
2. **代码会被覆盖**：.Designer.cs和.tt生成的代码在更新模型时会被覆盖
3. **自定义代码**：将自定义代码放在Partial Class中，避免被覆盖
4. **配置文件**：连接字符串保存在App.config或Web.config中

**创建Partial Class扩展实体：**

```csharp
// 创建新文件：UserExtensions.cs
// 不会被覆盖，可以添加自定义属性和方法

public partial class User
{
    // 计算属性
    public string FullInfo => $"{Name} ({Email}) - {Age}岁";
    
    // 自定义方法
    public bool IsAdult => Age >= 18;
    
    // 业务逻辑方法
    public void UpdateAge(int newAge)
    {
        if (newAge < 0 || newAge > 150)
            throw new ArgumentException("年龄无效");
        Age = newAge;
    }
}
```

#### Code First vs Database First对比

| 特性 | Code First | Database First |
|------|------------|----------------|
| **适用场景** | 新项目开发 | 已有数据库 |
| **控制权** | 代码优先 | 数据库优先 |
| **迁移支持** | ✅ 支持（Migration） | ❌ 不支持 |
| **版本控制** | ✅ 代码控制，便于版本管理 | ⚠️ 需要手动同步 |
| **灵活性** | ✅ 高，完全由代码控制 | ⚠️ 受限于数据库结构 |
| **开发效率** | ✅ 高（修改代码即可） | ⚠️ 需要更新模型 |
| **学习曲线** | 中等 | 较低 |
| **维护成本** | 较低（代码统一管理） | 较高（需要同步数据库和模型） |

**选择建议：**

- **选择Code First**：新项目、需要版本控制、团队协作、需要频繁修改模型
- **选择Database First**：已有数据库、数据库由DBA管理、不需要频繁修改模型、快速原型开发

#### 基本实体类定义

```csharp
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

// 用户实体
public class User
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    public string Name { get; set; }
    
    [Required]
    [MaxLength(200)]
    [Index(IsUnique = true)] // 唯一索引
    public string Email { get; set; }
    
    public int Age { get; set; }
    
    public DateTime CreateDate { get; set; }
    
    // 导航属性（一对多）
    public virtual ICollection<Order> Orders { get; set; }
    
    public User()
    {
        Orders = new HashSet<Order>();
        CreateDate = DateTime.Now;
    }
}

// 订单实体
public class Order
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    public DateTime OrderDate { get; set; }
    
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal TotalAmount { get; set; }
    
    // 外键
    [Required]
    [ForeignKey("User")]
    public int UserId { get; set; }
    
    // 导航属性（多对一）
    public virtual User User { get; set; }
    
    // 导航属性（一对多）
    public virtual ICollection<OrderItem> OrderItems { get; set; }
    
    public Order()
    {
        OrderItems = new HashSet<OrderItem>();
        OrderDate = DateTime.Now;
    }
}

// 订单项实体
public class OrderItem
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(200)]
    public string ProductName { get; set; }
    
    [Required]
    public int Quantity { get; set; }
    
    [Required]
    [Column(TypeName = "decimal(18,2)")]
    public decimal UnitPrice { get; set; }
    
    [Required]
    [ForeignKey("Order")]
    public int OrderId { get; set; }
    
    // 导航属性（多对一）
    public virtual Order Order { get; set; }
}
```

#### DbContext类定义

```csharp
using System.Data.Entity;

public class MyDbContext : DbContext
{
    // 构造函数：指定连接字符串名称（从App.config或Web.config读取）
    public MyDbContext() : base("DefaultConnection")
    {
        // 禁用数据库初始化器（生产环境）
        // Database.SetInitializer<MyDbContext>(null);
        
        // 或者使用自定义初始化器
        Database.SetInitializer(new CreateDatabaseIfNotExists<MyDbContext>());
    }
    
    // 构造函数：直接指定连接字符串
    public MyDbContext(string connectionString) : base(connectionString)
    {
    }
    
    // DbSet属性：表示数据库中的表
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    
    // 重写OnModelCreating方法进行Fluent API配置
    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // 可以在这里进行额外的配置
        // 详见"实体配置"章节
    }
}
```

#### 配置文件（App.config或Web.config）

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <configSections>
    <section name="entityFramework" 
             type="System.Data.Entity.Internal.ConfigFile.EntityFrameworkSection, 
                   EntityFramework, Version=6.0.0.0, Culture=neutral, 
                   PublicKeyToken=b77a5c561934e089" 
             requirePermission="false" />
  </configSections>
  
  <connectionStrings>
    <add name="DefaultConnection" 
         connectionString="Server=localhost;Database=MyDB;Integrated Security=True;" 
         providerName="System.Data.SqlClient" />
  </connectionStrings>
  
  <entityFramework>
    <defaultConnectionFactory type="System.Data.Entity.Infrastructure.SqlConnectionFactory, EntityFramework" />
    <providers>
      <provider invariantName="System.Data.SqlClient" 
                type="System.Data.Entity.SqlServer.SqlProviderServices, EntityFramework.SqlServer" />
    </providers>
  </entityFramework>
</configuration>
```

#### 基本使用示例

```csharp
using (var context = new MyDbContext())
{
    // 1. 添加数据
    var user = new User
    {
        Name = "张三",
        Email = "zhangsan@example.com",
        Age = 25
    };
    context.Users.Add(user);
    context.SaveChanges(); // 保存到数据库
    
    // 2. 查询数据
    var users = context.Users.ToList(); // 查询所有用户
    var userById = context.Users.Find(1); // 根据主键查找
    var userByEmail = context.Users.FirstOrDefault(u => u.Email == "zhangsan@example.com");
    
    // 3. 更新数据
    if (userById != null)
    {
        userById.Name = "李四";
        userById.Age = 30;
        context.SaveChanges();
    }
    
    // 4. 删除数据
    var userToDelete = context.Users.Find(2);
    if (userToDelete != null)
    {
        context.Users.Remove(userToDelete);
        context.SaveChanges();
    }
}
```

### <a id="dbcontext-detail"></a>DbContext详解

`DbContext`是Entity Framework的核心类，它代表与数据库的会话，负责跟踪实体变化、管理连接和执行数据库操作。

#### DbContext的主要属性和方法

```csharp
public class MyDbContext : DbContext
{
    public MyDbContext() : base("DefaultConnection")
    {
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    
    // Database属性：提供对数据库的访问
    // context.Database.Connection - 获取数据库连接
    // context.Database.ExecuteSqlCommand() - 执行SQL命令
    // context.Database.SqlQuery<T>() - 执行SQL查询
    
    // ChangeTracker属性：跟踪实体状态变化
    // context.ChangeTracker.Entries() - 获取所有被跟踪的实体
    
    // Configuration属性：配置选项
    // context.Configuration.LazyLoadingEnabled - 延迟加载
    // context.Configuration.ProxyCreationEnabled - 代理创建
    // context.Configuration.ValidateOnSaveEnabled - 保存时验证
}
```

#### DbContext的常用方法

```csharp
using (var context = new MyDbContext())
{
    // ========== 查询方法 ==========
    
    // Find：根据主键查找（同步）
    var user1 = context.Users.Find(1);
    
    // FindAsync：根据主键查找（异步）
    var user2 = await context.Users.FindAsync(1);
    
    // Set<T>：获取指定类型的DbSet
    var users = context.Set<User>();
    
    // Entry：获取实体的跟踪信息
    var entry = context.Entry(user1);
    Console.WriteLine($"状态: {entry.State}"); // Added, Modified, Deleted, Unchanged, Detached
    
    // ========== 保存方法 ==========
    
    // SaveChanges：保存所有更改（同步）
    int count = context.SaveChanges();
    
    // SaveChangesAsync：保存所有更改（异步）
    int count2 = await context.SaveChangesAsync();
    
    // ========== 数据库方法 ==========
    
    // Database.ExecuteSqlCommand：执行SQL命令
    int rowsAffected = context.Database.ExecuteSqlCommand(
        "UPDATE Users SET Age = Age + 1 WHERE Age < 18");
    
    // Database.SqlQuery：执行SQL查询
    var users2 = context.Database.SqlQuery<User>(
        "SELECT * FROM Users WHERE Age > @Age", 
        new SqlParameter("@Age", 18)).ToList();
    
    // Database.BeginTransaction：开始事务
    using (var transaction = context.Database.BeginTransaction())
    {
        try
        {
            // 执行操作
            context.Users.Add(new User { Name = "新用户" });
            context.SaveChanges();
            
            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }
    
    // ========== 变更跟踪方法 ==========
    
    // ChangeTracker.Entries：获取所有被跟踪的实体
    var allEntries = context.ChangeTracker.Entries();
    foreach (var entry in allEntries)
    {
        Console.WriteLine($"实体: {entry.Entity.GetType().Name}, 状态: {entry.State}");
    }
    
    // ChangeTracker.Entries<T>：获取指定类型的被跟踪实体
    var userEntries = context.ChangeTracker.Entries<User>();
    
    // ========== 配置方法 ==========
    
    // 禁用延迟加载
    context.Configuration.LazyLoadingEnabled = false;
    
    // 禁用代理创建
    context.Configuration.ProxyCreationEnabled = false;
    
    // 禁用保存时验证
    context.Configuration.ValidateOnSaveEnabled = false;
    
    // ========== 其他方法 ==========
    
    // Dispose：释放资源（通常由using语句自动调用）
    // context.Dispose();
}
```

#### DbContext的生命周期管理

```csharp
// 方式1：使用using语句（推荐）
using (var context = new MyDbContext())
{
    // 使用context
    var users = context.Users.ToList();
} // 自动释放资源

// 方式2：手动管理（不推荐）
var context = new MyDbContext();
try
{
    var users = context.Users.ToList();
}
finally
{
    context.Dispose();
}

// 方式3：依赖注入（推荐用于Web应用）
public class UserService
{
    private readonly MyDbContext _context;
    
    public UserService(MyDbContext context)
    {
        _context = context;
    }
    
    public List<User> GetUsers()
    {
        return _context.Users.ToList();
    }
}
```

#### DbContext的配置选项

```csharp
public class MyDbContext : DbContext
{
    public MyDbContext() : base("DefaultConnection")
    {
        // 配置选项
        
        // 禁用延迟加载（提高性能，但需要显式加载关联数据）
        this.Configuration.LazyLoadingEnabled = false;
        
        // 禁用代理创建（提高性能，但失去某些EF功能）
        this.Configuration.ProxyCreationEnabled = false;
        
        // 启用保存时验证（默认启用）
        this.Configuration.ValidateOnSaveEnabled = true;
        
        // 启用自动检测更改（默认启用，可关闭以提高性能）
        this.Configuration.AutoDetectChangesEnabled = true;
        
        // 日志记录（开发环境）
        #if DEBUG
        this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        #endif
    }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
}
```

### <a id="dbset-detail"></a>DbSet详解

`DbSet<T>`表示数据库中的表，提供了查询、添加、更新、删除等操作。

#### DbSet的主要方法

```csharp
using (var context = new MyDbContext())
{
    // ========== 查询方法 ==========
    
    // ToList：转换为列表（立即执行）
    var allUsers = context.Users.ToList();
    
    // ToArray：转换为数组
    var usersArray = context.Users.ToArray();
    
    // First：获取第一个元素（如果不存在会抛异常）
    var firstUser = context.Users.First();
    var firstUserWithCondition = context.Users.First(u => u.Age > 18);
    
    // FirstOrDefault：获取第一个元素（如果不存在返回null）
    var firstUserOrNull = context.Users.FirstOrDefault();
    var firstUserOrNullWithCondition = context.Users.FirstOrDefault(u => u.Age > 100);
    
    // Single：获取唯一元素（如果不存在或存在多个会抛异常）
    var singleUser = context.Users.Single(u => u.Id == 1);
    
    // SingleOrDefault：获取唯一元素（如果不存在返回null，存在多个抛异常）
    var singleUserOrNull = context.Users.SingleOrDefault(u => u.Id == 999);
    
    // Find：根据主键查找（同步）
    var userById = context.Users.Find(1);
    
    // FindAsync：根据主键查找（异步）
    var userByIdAsync = await context.Users.FindAsync(1);
    
    // Where：过滤
    var adultUsers = context.Users.Where(u => u.Age >= 18).ToList();
    
    // OrderBy / OrderByDescending：排序
    var sortedUsers = context.Users.OrderBy(u => u.Name).ToList();
    var sortedUsersDesc = context.Users.OrderByDescending(u => u.Age).ToList();
    
    // ThenBy / ThenByDescending：多级排序
    var multiSorted = context.Users
        .OrderBy(u => u.Age)
        .ThenByDescending(u => u.Name)
        .ToList();
    
    // Skip / Take：分页
    var pagedUsers = context.Users
        .OrderBy(u => u.Id)
        .Skip(10)
        .Take(20)
        .ToList();
    
    // Count：计数
    int userCount = context.Users.Count();
    int adultCount = context.Users.Count(u => u.Age >= 18);
    
    // Any：是否存在
    bool hasUsers = context.Users.Any();
    bool hasAdults = context.Users.Any(u => u.Age >= 18);
    
    // All：是否全部满足条件
    bool allAdults = context.Users.All(u => u.Age >= 18);
    
    // Sum / Average / Min / Max：聚合
    int totalAge = context.Users.Sum(u => u.Age);
    double avgAge = context.Users.Average(u => u.Age);
    int minAge = context.Users.Min(u => u.Age);
    int maxAge = context.Users.Max(u => u.Age);
    
    // Select：投影
    var userNames = context.Users.Select(u => u.Name).ToList();
    var userInfo = context.Users.Select(u => new { u.Id, u.Name, u.Email }).ToList();
    
    // Include：预加载关联数据
    var usersWithOrders = context.Users
        .Include(u => u.Orders)
        .ToList();
    
    var usersWithOrdersAndItems = context.Users
        .Include(u => u.Orders.Select(o => o.OrderItems))
        .ToList();
    
    // ========== 添加方法 ==========
    // Add(T entity)：添加单个实体到DbSet
    // AddRange(IEnumerable<T> entities)：添加多个实体到DbSet
    // 注意：添加后需要调用SaveChanges()才会保存到数据库
    // 详细示例请参考"数据修改"章节
    
    // ========== 更新方法 ==========
    // DbSet没有Update方法，更新操作通过以下方式实现：
    // 1. 修改已跟踪的实体（通过查询获得的实体），然后SaveChanges()
    // 2. 使用Attach()附加实体，然后设置EntityState.Modified
    // 3. 直接使用Entry().State = EntityState.Modified
    // 详细示例请参考"数据修改"章节
    
    // ========== 删除方法 ==========
    // Remove(T entity)：删除单个实体
    // RemoveRange(IEnumerable<T> entities)：删除多个实体
    // 注意：删除后需要调用SaveChanges()才会保存到数据库
    // 也可以通过设置Entry().State = EntityState.Deleted来删除
    // 详细示例请参考"数据修改"章节
    
    // ========== 其他方法 ==========
    
    // Attach：附加实体到上下文（不跟踪）
    var existingUser = new User { Id = 1, Name = "现有用户" };
    context.Users.Attach(existingUser);
    
    // Local：获取本地（内存中）的实体
    var localUsers = context.Users.Local.ToList();
    
    // AsNoTracking：禁用变更跟踪（提高查询性能）
    var usersNoTracking = context.Users.AsNoTracking().ToList();
    
    // AsQueryable：转换为IQueryable（用于动态查询）
    IQueryable<User> query = context.Users.AsQueryable();
    if (someCondition)
    {
        query = query.Where(u => u.Age > 18);
    }
    var result = query.ToList();
    
    // 保存更改
    context.SaveChanges();
}
```

#### DbSet的异步方法

```csharp
using (var context = new MyDbContext())
{
    // 异步查询
    var users = await context.Users.ToListAsync();
    var user = await context.Users.FirstOrDefaultAsync(u => u.Id == 1);
    var count = await context.Users.CountAsync();
    var hasUsers = await context.Users.AnyAsync();
    
    // 异步查找
    var userById = await context.Users.FindAsync(1);
    
    // 异步添加
    var newUser = new User { Name = "新用户", Email = "new@example.com", Age = 25 };
    context.Users.Add(newUser);
    await context.SaveChangesAsync();
    
    // 异步删除
    var userToDelete = await context.Users.FindAsync(1);
    if (userToDelete != null)
    {
        context.Users.Remove(userToDelete);
        await context.SaveChangesAsync();
    }
}
```

### <a id="entity-configuration"></a>实体配置

Entity Framework提供了两种方式来配置实体：Data Annotations（数据注解）和Fluent API（流式API）。

#### Data Annotations（数据注解）

数据注解是直接在实体类上使用特性来配置：

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    // [Key]：指定主键
    [Key]
    public int Id { get; set; }
    
    // [Required]：必填字段
    [Required]
    [MaxLength(100)] // 最大长度
    public string Name { get; set; }
    
    // [StringLength]：字符串长度限制
    [StringLength(200, MinimumLength = 5)]
    public string Email { get; set; }
    
    // [Column]：指定列名和类型
    [Column("UserAge", TypeName = "int")]
    public int Age { get; set; }
    
    // [Index]：创建索引
    [Index(IsUnique = true)]
    public string Email { get; set; }
    
    // [Index]：复合索引
    [Index("IX_Name_Age", IsUnique = false)]
    public string Name { get; set; }
    
    // [Table]：指定表名
    [Table("Users", Schema = "dbo")]
    public class User { }
    
    // [NotMapped]：不映射到数据库
    [NotMapped]
    public string FullName => $"{FirstName} {LastName}";
    
    // [DatabaseGenerated]：数据库生成的值
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // 自增
    public int Id { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.Computed)] // 计算列
    public DateTime CreateDate { get; set; }
    
    [DatabaseGenerated(DatabaseGeneratedOption.None)] // 手动设置
    public Guid UniqueId { get; set; }
    
    // [Timestamp]：时间戳（并发控制）
    [Timestamp]
    public byte[] RowVersion { get; set; }
    
    // [ConcurrencyCheck]：并发检查
    [ConcurrencyCheck]
    public int Version { get; set; }
}
```

#### Fluent API（流式API）

Fluent API在`OnModelCreating`方法中配置，更灵活强大：

```csharp
public class MyDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    
    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        // 配置User实体
        modelBuilder.Entity<User>()
            // 指定表名和架构
            .ToTable("Users", "dbo")
            
            // 配置主键
            .HasKey(u => u.Id)
            
            // 配置属性
            .Property(u => u.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity) // 自增
                .HasColumnName("UserId") // 列名
                .HasColumnOrder(1); // 列顺序
            
            .Property(u => u.Name)
                .IsRequired() // 必填
                .HasMaxLength(100) // 最大长度
                .IsUnicode(false); // 非Unicode
            
            .Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(200)
                .HasColumnName("EmailAddress");
            
            .Property(u => u.Age)
                .IsOptional() // 可选
                .HasColumnType("int");
            
            .Property(u => u.CreateDate)
                .IsRequired()
                .HasColumnType("datetime2")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Computed);
            
            // 忽略属性（不映射到数据库）
            .Ignore(u => u.FullName);
            
            // 配置索引
            .HasIndex(u => u.Email)
                .IsUnique()
                .HasName("IX_Users_Email");
            
            .HasIndex(u => new { u.Name, u.Age })
                .HasName("IX_Users_Name_Age");
    }
}
```

#### Fluent API详细配置指南（EF6）

Fluent API提供了丰富的配置选项，可以精确控制实体映射、属性设置、关系配置和级联行为。

**1. 实体级别配置**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // ========== 实体基础配置 ==========
    modelBuilder.Entity<User>(entity =>
    {
        // 表名和架构配置
        entity.ToTable("Users", "dbo"); // 指定表名和架构
        
        // 主键配置
        entity.HasKey(u => u.Id); // 单主键
        entity.HasKey(u => new { u.Id, u.Code }); // 复合主键
        
        // 忽略实体（不映射到数据库）
        // modelBuilder.Ignore<SomeClass>();
        
        // 实体映射到多个表（Table Splitting）
        entity.Map(m =>
        {
            m.Properties(u => new { u.Id, u.Name, u.Email });
            m.ToTable("Users");
        })
        .Map(m =>
        {
            m.Properties(u => new { u.Id, u.Address, u.Phone });
            m.ToTable("UserDetails");
        });
    });
}
```

**2. 属性详细配置**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>(entity =>
    {
        // ========== 主键属性配置 ==========
        entity.Property(u => u.Id)
            .HasColumnName("UserId")                    // 列名
            .HasColumnOrder(1)                           // 列顺序
            .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity) // 自增
            .IsRequired();                               // 必填
        
        // ========== 字符串属性配置 ==========
        entity.Property(u => u.Name)
            .IsRequired()                                // 必填
            .HasMaxLength(100)                           // 最大长度
            .HasMinLength(2)                             // 最小长度（EF6不支持，仅用于验证）
            .IsUnicode(true)                             // Unicode字符（nvarchar）
            .IsUnicode(false)                            // 非Unicode（varchar）
            .IsFixedLength()                             // 固定长度（char）
            .IsVariableLength()                          // 可变长度（varchar/nvarchar）
            .HasColumnType("nvarchar")                        // 数据库类型
            .HasColumnType("nvarchar(100)")               // 完整类型定义
            .HasColumnName("UserName");                  // 列名
        
        entity.Property(u => u.Email)
            .IsRequired()
            .HasMaxLength(200)
            .HasColumnName("EmailAddress")
            .IsUnicode(false);                           // varchar(200)
        
        // ========== 数值属性配置 ==========
        entity.Property(u => u.Age)
            .IsOptional()                                // 可选（可空）
            .HasColumnType("int")                             // SQL Server类型
            .HasPrecision(10, 0);                        // 精度（对decimal有效）
        
        entity.Property(u => u.Salary)
            .HasColumnType("decimal(18,2)")                  // decimal类型
            .HasPrecision(18, 2)                         // 精度18，小数位2
            .IsOptional();
        
        entity.Property(u => u.Rating)
            .HasColumnType("float")                          // float类型
            .IsOptional();
        
        // ========== 日期时间属性配置 ==========
        entity.Property(u => u.CreateDate)
            .IsRequired()
            .HasColumnType("datetime2")                      // datetime2类型
            .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Computed) // 计算列
            .HasDefaultValueSql("GETDATE()");            // 默认值SQL
        
        entity.Property(u => u.UpdateDate)
            .HasColumnType("datetime2")
            .IsOptional()
            .HasDatabaseGeneratedOption(DatabaseGeneratedOption.None);
        
        // ========== 布尔属性配置 ==========
        entity.Property(u => u.IsActive)
            .IsRequired()
            .HasColumnType("bit")                             // SQL Server bit类型
            .HasDefaultValue(true);                       // 默认值
        
        // ========== 字节数组属性配置 ==========
        entity.Property(u => u.Avatar)
            .HasColumnType("varbinary(max)")                 // varbinary(max)
            .IsOptional();
        
        entity.Property(u => u.RowVersion)
            .HasColumnType("timestamp")                      // timestamp（并发控制）
            .IsRowVersion()                              // 行版本（等同于[Timestamp]）
            .IsConcurrencyToken();                       // 并发令牌
        
        // ========== GUID属性配置 ==========
        entity.Property(u => u.UniqueId)
            .HasColumnType("uniqueidentifier")                // GUID类型
            .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity) // 自动生成
            .IsRequired();
        
        // ========== 枚举属性配置 ==========
        entity.Property(u => u.Status)
            .HasColumnType("int")                             // 枚举存储为int
            .IsRequired();
        
        // ========== 忽略属性（不映射到数据库）==========
        entity.Ignore(u => u.FullName);                  // 计算属性
        entity.Ignore(u => u.DisplayName);              // 临时属性
        
        // ========== 复杂类型配置 ==========
        // 如果Address是复杂类型
        entity.ComplexProperty(u => u.Address)
            .Property(a => a.Street)
            .HasMaxLength(200);
    });
}
```

**3. 索引配置**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>(entity =>
    {
        // ========== 单列索引 ==========
        entity.HasIndex(u => u.Email)
            .IsUnique()                                  // 唯一索引
            .HasName("IX_Users_Email_Unique");           // 索引名称
        
        // ========== 复合索引 ==========
        entity.HasIndex(u => new { u.Name, u.Age })
            .HasName("IX_Users_Name_Age")
            .IsUnique(false);                            // 非唯一索引
        
        // ========== 包含列索引（SQL Server 2005+）==========
        // EF6不支持包含列，需要在迁移中手动添加
        // CREATE INDEX IX_Users_Email ON Users(Email) INCLUDE (Name, Age)
        
        // ========== 过滤索引（SQL Server 2008+）==========
        // EF6不支持过滤索引，需要在迁移中手动添加
        // CREATE INDEX IX_Users_Active ON Users(Email) WHERE IsActive = 1
    });
}
```

**4. 关系配置详解**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // ========== 一对多关系配置 ==========
    
    // 方式1：从Order端配置（推荐）
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)                        // 订单必须有用户（必需关系）
        .WithMany(u => u.Orders)                         // 用户有多个订单
        .HasForeignKey(o => o.UserId)                    // 外键属性
        .WillCascadeOnDelete(true);                      // 级联删除
    
    // 方式2：从User端配置
    modelBuilder.Entity<User>()
        .HasMany(u => u.Orders)                          // 用户有多个订单
        .WithRequired(o => o.User)                       // 订单必须有用户
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(true);
    
    // 方式3：可选关系（外键可空）
    modelBuilder.Entity<Order>()
        .HasOptional(o => o.User)                        // 订单可以没有用户（可选）
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(false);
    
    // 方式4：指定外键列名
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)
        .WithMany(u => u.Orders)
        .Map(m => m.MapKey("FK_UserId"));                // 指定外键列名
    
    // ========== 一对一关系配置 ==========
    
    // 方式1：UserProfile依赖User（UserId是外键）
    modelBuilder.Entity<UserProfile>()
        .HasRequired(p => p.User)                       // 用户资料必须有用户
        .WithOptional(u => u.Profile)                   // 用户可以有可选的资料
        .HasForeignKey(p => p.UserId)
        .WillCascadeOnDelete(true);
    
    // 方式2：共享主键（UserProfile的主键也是外键）
    modelBuilder.Entity<UserProfile>()
        .HasRequired(p => p.User)
        .WithOptional(u => u.Profile)
        .Map(m => m.MapKey("UserId"));                   // UserId既是主键也是外键
    
    // 方式3：双向可选
    modelBuilder.Entity<UserProfile>()
        .HasOptional(p => p.User)
        .WithOptional(u => u.Profile)
        .Map(m => m.MapKey("UserId"));
    
    // ========== 多对多关系配置 ==========
    
    // 方式1：使用默认连接表
    modelBuilder.Entity<User>()
        .HasMany(u => u.Roles)
        .WithMany(r => r.Users)
        .Map(m =>
        {
            m.ToTable("UserRoles");                      // 连接表名
            m.MapLeftKey("UserId");                      // User表的外键
            m.MapRightKey("RoleId");                     // Role表的外键
        });
    
    // 方式2：使用中间实体（推荐，更灵活）
    modelBuilder.Entity<UserRole>()
        .HasKey(ur => new { ur.UserId, ur.RoleId });    // 复合主键
    
    modelBuilder.Entity<UserRole>()
        .HasRequired(ur => ur.User)
        .WithMany(u => u.UserRoles)
        .HasForeignKey(ur => ur.UserId)
        .WillCascadeOnDelete(true);
    
    modelBuilder.Entity<UserRole>()
        .HasRequired(ur => ur.Role)
        .WithMany(r => r.UserRoles)
        .HasForeignKey(ur => ur.RoleId)
        .WillCascadeOnDelete(true);
}
```

**多对多标准开发流程（中间表方案，EF6推荐）**

```csharp
// 步骤1：创建中间表实体（包含复合主键） 
public class UserRole
{
    public int UserId { get; set; }
    public int RoleId { get; set; }
    public DateTime AssignedDate { get; set; } = DateTime.Now; // 额外字段示例
    
    public virtual User User { get; set; }
    public virtual Role Role { get; set; }
}

// 步骤2：在主实体中添加导航集合
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public virtual ICollection<UserRole> UserRoles { get; set; } = new HashSet<UserRole>();
}

public class Role
{
    public int Id { get; set; }
    public string Name { get; set; }
    public virtual ICollection<UserRole> UserRoles { get; set; } = new HashSet<UserRole>();
}

// 步骤3：在 DbContext 中添加 DbSet
public class MyDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }

    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        // 3.1 配置中间表主键
        modelBuilder.Entity<UserRole>()
            .HasKey(ur => new { ur.UserId, ur.RoleId });

        // 3.2 配置 UserRole -> User（一对多）
        modelBuilder.Entity<UserRole>()
            .HasRequired(ur => ur.User)
            .WithMany(u => u.UserRoles)
            .HasForeignKey(ur => ur.UserId)
            .WillCascadeOnDelete(true); // 删除 User 时删除关联

        // 3.3 配置 UserRole -> Role（一对多）
        modelBuilder.Entity<UserRole>()
            .HasRequired(ur => ur.Role)
            .WithMany(r => r.UserRoles)
            .HasForeignKey(ur => ur.RoleId)
            .WillCascadeOnDelete(false); // 避免删除 Role 时误删用户关联

        base.OnModelCreating(modelBuilder);
    }
}

// 步骤4：增删改查示例
using (var context = new MyDbContext())
{
    // 添加关联
    var userRole = new UserRole { UserId = 1, RoleId = 2 };
    context.UserRoles.Add(userRole);
    context.SaveChanges();

    // 查询用户的所有角色
    var roles = context.UserRoles
        .Where(ur => ur.UserId == 1)
        .Select(ur => ur.Role)
        .ToList();

    // 移除关联
    var link = context.UserRoles.Find(1, 2);
    if (link != null)
    {
        context.UserRoles.Remove(link);
        context.SaveChanges();
    }
}
```

要点：先建“中间表实体”，然后用两个一对多完成多对多；可在中间表上挂载额外业务字段（如创建时间、操作人），比默认连接表更灵活。

**5. 级联删除详细配置**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // ========== 级联删除配置 ==========
    
    // 场景1：删除用户时，自动删除其所有订单（级联删除）
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(true);                      // 启用级联删除
    
    // 效果：删除User时，会自动删除所有相关的Order记录
    // DELETE FROM Users WHERE Id = 1
    // 会自动执行：DELETE FROM Orders WHERE UserId = 1
    
    // 场景2：删除用户时，不允许删除（如果存在订单）
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(false);                     // 禁用级联删除
    
    // 效果：如果User有Order，删除User会抛出异常
    // 需要先删除Order，再删除User
    
    // 场景3：可选关系的级联删除
    modelBuilder.Entity<Order>()
        .HasOptional(o => o.User)
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(true);                      // 可选关系也可以级联删除
    
    // 场景4：多级级联删除
    // User -> Order -> OrderItem
    // 删除User时，会级联删除Order，Order删除时会级联删除OrderItem
    
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(true);                      // User -> Order级联
    
    modelBuilder.Entity<OrderItem>()
        .HasRequired(oi => oi.Order)
        .WithMany(o => o.OrderItems)
        .HasForeignKey(oi => oi.OrderId)
        .WillCascadeOnDelete(true);                      // Order -> OrderItem级联
    
    // 场景5：一对一关系的级联删除
    modelBuilder.Entity<UserProfile>()
        .HasRequired(p => p.User)
        .WithOptional(u => u.Profile)
        .HasForeignKey(p => p.UserId)
        .WillCascadeOnDelete(true);                      // 删除User时删除UserProfile
    
    // 场景6：多对多关系的级联删除
    // 删除User时，删除UserRole连接记录，但不删除Role
    modelBuilder.Entity<UserRole>()
        .HasRequired(ur => ur.User)
        .WithMany(u => u.UserRoles)
        .HasForeignKey(ur => ur.UserId)
        .WillCascadeOnDelete(true);                      // 删除User时删除UserRole
    
    modelBuilder.Entity<UserRole>()
        .HasRequired(ur => ur.Role)
        .WithMany(r => r.UserRoles)
        .HasForeignKey(ur => ur.RoleId)
        .WillCascadeOnDelete(false);                     // 删除Role时不删除UserRole（保护User）
    
    // ========== 级联删除注意事项 ==========
    // 1. 级联删除是数据库级别的约束，不是EF代码逻辑
    // 2. 启用级联删除后，数据库会自动创建外键约束
    // 3. 级联删除可能导致意外的数据丢失，需要谨慎使用
    // 4. 生产环境建议禁用级联删除，使用软删除或手动删除
    // 5. 级联删除的性能影响：删除父记录时，需要检查所有子记录
}
```

**6. 并发控制配置**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>(entity =>
    {
        // ========== 时间戳并发控制 ==========
        entity.Property(u => u.RowVersion)
            .IsRowVersion()                              // 等同于[Timestamp]
            .IsConcurrencyToken();                       // 并发令牌
        
        // ========== 字段级并发控制 ==========
        entity.Property(u => u.Version)
            .IsConcurrencyToken();                       // 并发检查字段
        
        // ========== 多字段并发控制 ==========
        entity.Property(u => u.UpdateDate)
            .IsConcurrencyToken();
        
        entity.Property(u => u.UpdateBy)
            .IsConcurrencyToken();
    });
}
```

**7. 默认值和计算列配置**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>(entity =>
    {
        // ========== 默认值配置 ==========
        entity.Property(u => u.CreateDate)
            .HasDefaultValueSql("GETDATE()");            // SQL Server函数
        
        entity.Property(u => u.IsActive)
            .HasDefaultValue(true);                      // C#默认值
        
        entity.Property(u => u.Status)
            .HasDefaultValue(0);                         // 枚举默认值
        
        // ========== 计算列配置 ==========
        entity.Property(u => u.FullName)
            .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Computed)
            .HasColumnType("nvarchar")
            .HasMaxLength(200);
        
        // 需要在迁移中手动添加计算列SQL：
        // ALTER TABLE Users ADD FullName AS (Name + ' ' + Email)
    });
}
```

**8. 完整的Fluent API配置示例**

```csharp
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Configuration;

public class MyDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Role> Roles { get; set; }
    public DbSet<UserRole> UserRoles { get; set; }
    
    protected override void OnModelCreating(DbModelBuilder modelBuilder)
    {
        // ========== User实体完整配置 ==========
        modelBuilder.Entity<User>(entity =>
        {
            // 表配置
            entity.ToTable("Users", "dbo");
            entity.HasKey(u => u.Id);
            
            // 主键属性配置
            entity.Property(u => u.Id)
                .HasColumnName("UserId")
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity)
                .IsRequired();
            
            // 字符串属性配置
            entity.Property(u => u.Name)
                .IsRequired()
                .HasMaxLength(100)
                .IsUnicode(true)
                .HasColumnName("UserName");
            
            entity.Property(u => u.Email)
                .IsRequired()
                .HasMaxLength(200)
                .IsUnicode(false)
                .HasColumnName("EmailAddress");
            
            // 数值属性配置
            entity.Property(u => u.Age)
                .IsOptional()
                .HasColumnType("int");
            
            // 日期时间属性配置
            entity.Property(u => u.CreateDate)
                .IsRequired()
                .HasColumnType("datetime2")
                .HasDefaultValueSql("GETDATE()");
            
            entity.Property(u => u.UpdateDate)
                .IsOptional()
                .HasColumnType("datetime2");
            
            // 布尔属性配置
            entity.Property(u => u.IsActive)
                .IsRequired()
                .HasColumnType("bit")
                .HasDefaultValue(true);
            
            // 并发控制
            entity.Property(u => u.RowVersion)
                .IsRowVersion()
                .IsConcurrencyToken();
            
            // 索引配置
            entity.HasIndex(u => u.Email)
                .IsUnique()
                .HasName("IX_Users_Email_Unique");
            
            entity.HasIndex(u => new { u.Name, u.Age })
                .HasName("IX_Users_Name_Age");
            
            // 忽略属性
            entity.Ignore(u => u.FullName);
        });
        
        // ========== Order实体配置 ==========
        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Orders");
            entity.HasKey(o => o.Id);
            
            entity.Property(o => o.OrderDate)
                .IsRequired()
                .HasColumnType("datetime2");
            
            entity.Property(o => o.TotalAmount)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasPrecision(18, 2);
            
            // 一对多关系：Order -> User（级联删除）
            entity.HasRequired(o => o.User)
                .WithMany(u => u.Orders)
                .HasForeignKey(o => o.UserId)
                .WillCascadeOnDelete(true);
        });
        
        // ========== OrderItem实体配置 ==========
        modelBuilder.Entity<OrderItem>(entity =>
        {
            entity.ToTable("OrderItems");
            entity.HasKey(oi => oi.Id);
            
            entity.Property(oi => oi.ProductName)
                .IsRequired()
                .HasMaxLength(200);
            
            entity.Property(oi => oi.Quantity)
                .IsRequired()
                .HasColumnType("int");
            
            entity.Property(oi => oi.UnitPrice)
                .IsRequired()
                .HasColumnType("decimal(18,2)")
                .HasPrecision(18, 2);
            
            // 一对多关系：OrderItem -> Order（级联删除）
            entity.HasRequired(oi => oi.Order)
                .WithMany(o => o.OrderItems)
                .HasForeignKey(oi => oi.OrderId)
                .WillCascadeOnDelete(true);
        });
        
        // ========== UserProfile实体配置（一对一）==========
        modelBuilder.Entity<UserProfile>(entity =>
        {
            entity.ToTable("UserProfiles");
            entity.HasKey(p => p.Id);
            
            entity.Property(p => p.Address)
                .IsOptional()
                .HasMaxLength(500);
            
            entity.Property(p => p.Phone)
                .IsOptional()
                .HasMaxLength(20);
            
            // 一对一关系：UserProfile -> User（级联删除）
            entity.HasRequired(p => p.User)
                .WithOptional(u => u.Profile)
                .HasForeignKey(p => p.UserId)
                .WillCascadeOnDelete(true);
        });
        
        // ========== Role实体配置 ==========
        modelBuilder.Entity<Role>(entity =>
        {
            entity.ToTable("Roles");
            entity.HasKey(r => r.Id);
            
            entity.Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(50);
        });
        
        // ========== UserRole中间实体配置（多对多）==========
        modelBuilder.Entity<UserRole>(entity =>
        {
            entity.ToTable("UserRoles");
            entity.HasKey(ur => new { ur.UserId, ur.RoleId }); // 复合主键
            
            entity.Property(ur => ur.AssignedDate)
                .IsRequired()
                .HasColumnType("datetime2")
                .HasDefaultValueSql("GETDATE()");
            
            // UserRole -> User（级联删除）
            entity.HasRequired(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId)
                .WillCascadeOnDelete(true);
            
            // UserRole -> Role（不级联删除，保护Role）
            entity.HasRequired(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId)
                .WillCascadeOnDelete(false);
        });
    }
}
```

**9. Fluent API配置最佳实践**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // ========== 最佳实践 ==========
    
    // 1. 使用EntityTypeConfiguration分离配置（推荐）
    // 创建单独的配置类
    public class UserConfiguration : EntityTypeConfiguration<User>
    {
        public UserConfiguration()
        {
            ToTable("Users");
            HasKey(u => u.Id);
            
            Property(u => u.Name)
                .IsRequired()
                .HasMaxLength(100);
            
            // ... 其他配置
        }
    }
    
    // 在OnModelCreating中应用配置
    modelBuilder.Configurations.Add(new UserConfiguration());
    
    // 2. 使用配置约定（Convention）
    // 所有字符串属性默认最大长度100
    modelBuilder.Properties<string>()
        .Configure(p => p.HasMaxLength(100));
    
    // 所有DateTime属性默认类型为datetime2
    modelBuilder.Properties<DateTime>()
        .Configure(p => p.HasColumnType("datetime2"));
    
    // 3. 级联删除策略建议
    // - 开发环境：可以启用级联删除，方便测试
    // - 生产环境：建议禁用级联删除，使用软删除或手动删除
    // - 多对多关系：通常不级联删除，保护关联实体
    
    // 4. 性能优化建议
    // - 合理使用索引
    // - 避免过度配置
    // - 使用延迟加载（Lazy Loading）或显式加载（Explicit Loading）
}
```

### <a id="relationship-configuration"></a>关系配置

Entity Framework支持三种关系类型：一对一、一对多、多对多。

#### 一对多关系（One-to-Many）

```csharp
// 实体定义
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // 导航属性：一个用户有多个订单
    public virtual ICollection<Order> Orders { get; set; }
}

public class Order
{
    public int Id { get; set; }
    public DateTime OrderDate { get; set; }
    
    // 外键属性
    public int UserId { get; set; }
    
    // 导航属性：一个订单属于一个用户
    public virtual User User { get; set; }
}

// Fluent API配置
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // 方式1：通过导航属性配置
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User) // 订单必须有用户（必需关系）
        .WithMany(u => u.Orders)  // 用户有多个订单
        .HasForeignKey(o => o.UserId); // 外键
    
    // 方式2：可选关系
    modelBuilder.Entity<Order>()
        .HasOptional(o => o.User) // 订单可以没有用户（可选关系）
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(true); // 级联删除
    
    // 方式3：指定外键名称
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)
        .WithMany(u => u.Orders)
        .Map(m => m.MapKey("FK_UserId")); // 指定外键列名
}
```

#### 一对一关系（One-to-One）

```csharp
// 实体定义
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // 导航属性：一个用户有一个用户资料
    public virtual UserProfile Profile { get; set; }
}

public class UserProfile
{
    public int Id { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    
    // 外键
    public int UserId { get; set; }
    
    // 导航属性：一个用户资料属于一个用户
    public virtual User User { get; set; }
}

// Fluent API配置
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // 方式1：User是主体，UserProfile是依赖
    modelBuilder.Entity<UserProfile>()
        .HasRequired(p => p.User) // 用户资料必须有用户
        .WithOptional(u => u.Profile) // 用户可以有可选的资料
        .HasForeignKey(p => p.UserId); // 外键在UserProfile中
    
    // 方式2：共享主键（UserProfile的主键也是外键）
    modelBuilder.Entity<UserProfile>()
        .HasRequired(p => p.User)
        .WithOptional(u => u.Profile)
        .Map(m => m.MapKey("UserId")); // UserId既是主键也是外键
}
```

#### 多对多关系（Many-to-Many）

```csharp
// 实体定义
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // 导航属性：一个用户有多个角色
    public virtual ICollection<Role> Roles { get; set; }
}

public class Role
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    // 导航属性：一个角色有多个用户
    public virtual ICollection<User> Users { get; set; }
}

// Fluent API配置
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // 方式1：使用默认连接表名（UsersRoles）
    modelBuilder.Entity<User>()
        .HasMany(u => u.Roles)
        .WithMany(r => r.Users)
        .Map(m =>
        {
            m.ToTable("UserRoles"); // 连接表名
            m.MapLeftKey("UserId");  // User表的外键
            m.MapRightKey("RoleId"); // Role表的外键
        });
    
    // 方式2：使用中间实体（更灵活）
    // 定义中间实体
    public class UserRole
    {
        public int UserId { get; set; }
        public int RoleId { get; set; }
        public DateTime AssignedDate { get; set; }
        
        public virtual User User { get; set; }
        public virtual Role Role { get; set; }
    }
    
    // 配置中间实体
    modelBuilder.Entity<UserRole>()
        .HasKey(ur => new { ur.UserId, ur.RoleId });
    
    modelBuilder.Entity<User>()
        .HasMany(u => u.Roles)
        .WithMany(r => r.Users)
        .Map(m =>
        {
            m.ToTable("UserRoles");
            m.MapLeftKey("UserId");
            m.MapRightKey("RoleId");
        });
}
```

#### 级联删除配置详解

级联删除（Cascade Delete）是数据库外键约束的一种行为，当删除父记录时，自动删除所有相关的子记录。EF6通过`WillCascadeOnDelete()`方法配置级联删除行为。

**基本级联删除配置：**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // ========== 启用级联删除 ==========
    // 删除用户时，自动删除其所有订单
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(true); // 启用级联删除
    
    // 效果：
    // DELETE FROM Users WHERE Id = 1
    // 会自动执行：DELETE FROM Orders WHERE UserId = 1
    
    // ========== 禁用级联删除 ==========
    // 删除用户时，如果有订单则不允许删除（会抛出异常）
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(false); // 禁用级联删除
    
    // 效果：
    // 如果User有Order，删除User会抛出异常：
    // "The DELETE statement conflicted with the REFERENCE constraint"
    // 需要先手动删除Order，再删除User
}
```

**级联删除的多种场景：**

```csharp
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    // ========== 场景1：一对多关系的级联删除 ==========
    // User -> Order（级联删除）
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(true);
    
    // ========== 场景2：多级级联删除 ==========
    // User -> Order -> OrderItem
    // 删除User时，会级联删除Order，Order删除时会级联删除OrderItem
    
    modelBuilder.Entity<Order>()
        .HasRequired(o => o.User)
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(true); // User -> Order级联
    
    modelBuilder.Entity<OrderItem>()
        .HasRequired(oi => oi.Order)
        .WithMany(o => o.OrderItems)
        .HasForeignKey(oi => oi.OrderId)
        .WillCascadeOnDelete(true); // Order -> OrderItem级联
    
    // 删除User(Id=1)时的执行顺序：
    // 1. DELETE FROM OrderItems WHERE OrderId IN (SELECT Id FROM Orders WHERE UserId = 1)
    // 2. DELETE FROM Orders WHERE UserId = 1
    // 3. DELETE FROM Users WHERE Id = 1
    
    // ========== 场景3：一对一关系的级联删除 ==========
    // User -> UserProfile（级联删除）
    modelBuilder.Entity<UserProfile>()
        .HasRequired(p => p.User)
        .WithOptional(u => u.Profile)
        .HasForeignKey(p => p.UserId)
        .WillCascadeOnDelete(true);
    
    // 删除User时，会自动删除对应的UserProfile
    
    // ========== 场景4：可选关系的级联删除 ==========
    // Order -> User（可选，但可以级联删除）
    modelBuilder.Entity<Order>()
        .HasOptional(o => o.User)
        .WithMany(u => u.Orders)
        .HasForeignKey(o => o.UserId)
        .WillCascadeOnDelete(true); // 可选关系也可以级联删除
    
    // ========== 场景5：多对多关系的级联删除 ==========
    // UserRole中间表：删除User时删除UserRole，但不删除Role
    
    modelBuilder.Entity<UserRole>()
        .HasRequired(ur => ur.User)
        .WithMany(u => u.UserRoles)
        .HasForeignKey(ur => ur.UserId)
        .WillCascadeOnDelete(true); // 删除User时删除UserRole
    
    modelBuilder.Entity<UserRole>()
        .HasRequired(ur => ur.Role)
        .WithMany(r => r.UserRoles)
        .HasForeignKey(ur => ur.RoleId)
        .WillCascadeOnDelete(false); // 删除Role时不删除UserRole（保护User）
    
    // 删除User时，只删除UserRole连接记录，Role不受影响
    // 删除Role时，如果存在UserRole，会抛出异常（需要先删除UserRole）
}
```

**级联删除的实际使用示例：**

```csharp
using (var context = new MyDbContext())
{
    // ========== 启用级联删除的情况 ==========
    // 删除User，会自动删除其所有Order和OrderItem
    var user = context.Users.Find(1);
    if (user != null)
    {
        context.Users.Remove(user);
        context.SaveChanges(); // 自动删除相关数据，不会抛出异常
    }
    
    // ========== 禁用级联删除的情况 ==========
    // 如果禁用了级联删除，需要手动删除子记录
    var user = context.Users.Find(1);
    if (user != null)
    {
        // 先删除所有订单项
        var orderIds = user.Orders.Select(o => o.Id).ToList();
        var orderItems = context.OrderItems
            .Where(oi => orderIds.Contains(oi.OrderId))
            .ToList();
        context.OrderItems.RemoveRange(orderItems);
        
        // 再删除所有订单
        context.Orders.RemoveRange(user.Orders);
        
        // 最后删除用户
        context.Users.Remove(user);
        context.SaveChanges();
    }
    
    // 或者使用数据库的级联删除（推荐）
    // 在EF中启用级联删除，让数据库处理
}
```

**级联删除的注意事项：**

```csharp
// ========== 注意事项 ==========
// 1. 级联删除是数据库级别的约束，不是EF代码逻辑
//    - 在数据库中创建外键约束时，会设置ON DELETE CASCADE
//    - EF只是配置这个约束，实际删除由数据库执行
//
// 2. 级联删除可能导致意外的数据丢失
//    - 删除父记录时，所有子记录都会被删除
//    - 生产环境需要谨慎使用
//
// 3. 级联删除的性能影响
//    - 删除父记录时，数据库需要检查所有子记录
//    - 如果子记录很多，删除操作可能较慢
//
// 4. 级联删除的限制
//    - SQL Server不允许循环级联删除
//    - 不能创建相互级联删除的关系
//
// 5. 最佳实践建议
//    - 开发环境：可以启用级联删除，方便测试
//    - 生产环境：建议禁用级联删除，使用软删除或手动删除
//    - 多对多关系：通常不级联删除，保护关联实体
//    - 重要数据：禁用级联删除，防止误删
```

**级联删除的替代方案：**

```csharp
// ========== 替代方案1：软删除 ==========
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; } // 软删除标记
    public DateTime? DeletedDate { get; set; }
}

// 查询时过滤已删除的记录
var activeUsers = context.Users.Where(u => !u.IsDeleted).ToList();

// ========== 替代方案2：手动删除 ==========
public void DeleteUser(int userId)
{
    using (var context = new MyDbContext())
    {
        var user = context.Users.Find(userId);
        if (user != null)
        {
            // 手动删除相关数据
            DeleteUserOrders(context, userId);
            DeleteUserProfile(context, userId);
            
            // 最后删除用户
            context.Users.Remove(user);
            context.SaveChanges();
        }
    }
}

// ========== 替代方案3：使用存储过程 ==========
// 在数据库中创建存储过程，控制删除逻辑
// CREATE PROCEDURE DeleteUser
//     @UserId INT
// AS
// BEGIN
//     DELETE FROM OrderItems WHERE OrderId IN (SELECT Id FROM Orders WHERE UserId = @UserId)
//     DELETE FROM Orders WHERE UserId = @UserId
//     DELETE FROM UserProfiles WHERE UserId = @UserId
//     DELETE FROM Users WHERE Id = @UserId
// END
```

### <a id="ef6-querying"></a>数据查询

Entity Framework支持多种查询方式：LINQ to Entities、原始SQL、存储过程等。

#### LINQ to Entities查询

```csharp
using (var context = new MyDbContext())
{
    // ========== 基本查询 ==========
    
    // 查询所有用户
    var allUsers = context.Users.ToList();
    
    // 条件查询
    var adultUsers = context.Users.Where(u => u.Age >= 18).ToList();
    
    // 排序查询
    var sortedUsers = context.Users.OrderBy(u => u.Name).ToList();
    var sortedUsersDesc = context.Users.OrderByDescending(u => u.Age).ToList();
    
    // 分页查询
    int pageSize = 10;
    int pageNumber = 2;
    var pagedUsers = context.Users
        .OrderBy(u => u.Id)
        .Skip((pageNumber - 1) * pageSize)
        .Take(pageSize)
        .ToList();
    
    // 投影查询（只选择需要的字段）
    var userNames = context.Users.Select(u => u.Name).ToList();
    var userInfo = context.Users.Select(u => new 
    { 
        u.Id, 
        u.Name, 
        u.Email 
    }).ToList();
    
    // ========== 关联查询 ==========
    
    // Include：预加载关联数据（Eager Loading）
    var usersWithOrders = context.Users
        .Include(u => u.Orders)
        .ToList();
    
    // 多级Include
    var usersWithOrdersAndItems = context.Users
        .Include(u => u.Orders.Select(o => o.OrderItems))
        .ToList();
    
    // 多个Include
    var usersWithAll = context.Users
        .Include(u => u.Orders)
        .Include(u => u.Profile)
        .ToList();
    
    // Join查询
    var usersWithOrderCount = context.Users
        .GroupJoin(
            context.Orders,
            u => u.Id,
            o => o.UserId,
            (user, orders) => new 
            { 
                User = user, 
                OrderCount = orders.Count() 
            })
        .ToList();
    
    // ========== 聚合查询 ==========
    
    var userCount = context.Users.Count();
    var adultCount = context.Users.Count(u => u.Age >= 18);
    var avgAge = context.Users.Average(u => u.Age);
    var maxAge = context.Users.Max(u => u.Age);
    var minAge = context.Users.Min(u => u.Age);
    var totalAge = context.Users.Sum(u => u.Age);
    
    // 分组查询
    var usersByAge = context.Users
        .GroupBy(u => u.Age)
        .Select(g => new 
        { 
            Age = g.Key, 
            Count = g.Count(),
            Users = g.ToList()
        })
        .ToList();
    
    // ========== 复杂查询 ==========
    
    // 子查询
    var usersWithManyOrders = context.Users
        .Where(u => u.Orders.Count() > 5)
        .ToList();
    
    // 条件查询
    var users = context.Users
        .Where(u => u.Age >= 18 && u.Age <= 65)
        .Where(u => u.Email.Contains("@example.com"))
        .OrderBy(u => u.Name)
        .ToList();
    
    // 动态查询
    IQueryable<User> query = context.Users;
    
    if (filterByAge)
    {
        query = query.Where(u => u.Age >= minAge);
    }
    
    if (filterByName)
    {
        query = query.Where(u => u.Name.Contains(nameFilter));
    }
    
    var result = query.ToList();
}
```

#### 延迟加载（Lazy Loading）

```csharp
// 启用延迟加载（默认启用）
public class MyDbContext : DbContext
{
    public MyDbContext() : base("DefaultConnection")
    {
        this.Configuration.LazyLoadingEnabled = true; // 启用延迟加载
    }
}

using (var context = new MyDbContext())
{
    var user = context.Users.First();
    
    // 访问导航属性时自动加载（延迟加载）
    var orders = user.Orders.ToList(); // 此时才执行SQL查询Orders表
}
```

#### 显式加载（Explicit Loading）

```csharp
using (var context = new MyDbContext())
{
    var user = context.Users.First();
    
    // 显式加载关联数据
    context.Entry(user)
        .Collection(u => u.Orders)
        .Load();
    
    // 显式加载单个关联实体
    context.Entry(user)
        .Reference(u => u.Profile)
        .Load();
    
    // 条件加载
    context.Entry(user)
        .Collection(u => u.Orders)
        .Query()
        .Where(o => o.TotalAmount > 100)
        .Load();
    
    // 检查是否已加载
    bool isLoaded = context.Entry(user)
        .Collection(u => u.Orders)
        .IsLoaded;
}
```

#### 原始SQL查询

```csharp
using (var context = new MyDbContext())
{
    // 方式1：SqlQuery（返回实体）
    var users = context.Database.SqlQuery<User>(
        "SELECT * FROM Users WHERE Age > @Age",
        new SqlParameter("@Age", 18))
        .ToList();
    
    // 方式2：SqlQuery（返回匿名类型）
    var userInfo = context.Database.SqlQuery<UserInfo>(
        "SELECT Id, Name, Email FROM Users WHERE Age > @Age",
        new SqlParameter("@Age", 18))
        .ToList();
    
    // 方式3：ExecuteSqlCommand（执行命令）
    int rowsAffected = context.Database.ExecuteSqlCommand(
        "UPDATE Users SET Age = Age + 1 WHERE Age < @Age",
        new SqlParameter("@Age", 18));
    
    // 方式4：使用DbSet的SqlQuery
    var users2 = context.Users.SqlQuery(
        "SELECT * FROM Users WHERE Age > @Age",
        new SqlParameter("@Age", 18))
        .ToList();
}
```

#### 存储过程查询

```csharp
// 定义存储过程结果类
public class UserOrderSummary
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public int OrderCount { get; set; }
    public decimal TotalAmount { get; set; }
}

using (var context = new MyDbContext())
{
    // 调用存储过程
    var summaries = context.Database.SqlQuery<UserOrderSummary>(
        "EXEC GetUserOrderSummary @UserId",
        new SqlParameter("@UserId", 1))
        .ToList();
    
    // 带输出参数的存储过程
    var userIdParam = new SqlParameter("@UserId", 1);
    var orderCountParam = new SqlParameter("@OrderCount", SqlDbType.Int)
    {
        Direction = ParameterDirection.Output
    };
    
    context.Database.ExecuteSqlCommand(
        "EXEC GetUserOrderCount @UserId, @OrderCount OUTPUT",
        userIdParam,
        orderCountParam);
    
    int orderCount = (int)orderCountParam.Value;
}
```

### <a id="ef6-modifying"></a>数据修改

Entity Framework提供了多种方式来添加、更新和删除数据。

#### 添加数据

```csharp
using (var context = new MyDbContext())
{
    // 方式1：Add单个实体
    var newUser = new User
    {
        Name = "张三",
        Email = "zhangsan@example.com",
        Age = 25
    };
    context.Users.Add(newUser);
    context.SaveChanges(); // 返回受影响的行数
    
    // 方式2：AddRange多个实体
    var newUsers = new List<User>
    {
        new User { Name = "李四", Email = "lisi@example.com", Age = 30 },
        new User { Name = "王五", Email = "wangwu@example.com", Age = 28 }
    };
    context.Users.AddRange(newUsers);
    context.SaveChanges();
    
    // 方式3：直接设置状态
    var user = new User { Name = "赵六", Email = "zhaoliu@example.com", Age = 32 };
    context.Entry(user).State = EntityState.Added;
    context.SaveChanges();
    
    // 获取插入后的ID
    var user2 = new User { Name = "新用户", Email = "new@example.com", Age = 20 };
    context.Users.Add(user2);
    context.SaveChanges();
    int newId = user2.Id; // SaveChanges后自动填充ID
}
```

#### 更新数据

```csharp
using (var context = new MyDbContext())
{
    // 方式1：修改已跟踪的实体（推荐）
    var user = context.Users.Find(1);
    if (user != null)
    {
        user.Name = "更新后的名称";
        user.Age = 30;
        context.SaveChanges(); // EF自动检测更改
    }
    
    // 方式2：附加并标记为已修改
    var detachedUser = new User 
    { 
        Id = 1, 
        Name = "新名称", 
        Email = "newemail@example.com",
        Age = 25
    };
    context.Users.Attach(detachedUser);
    context.Entry(detachedUser).State = EntityState.Modified;
    context.SaveChanges();
    
    // 方式3：只更新特定属性
    var userToUpdate = new User { Id = 1, Name = "只更新名称" };
    context.Users.Attach(userToUpdate);
    context.Entry(userToUpdate).Property(u => u.Name).IsModified = true;
    context.SaveChanges(); // 只更新Name字段
    
    // 方式4：批量更新（使用原始SQL，性能更好）
    int rowsAffected = context.Database.ExecuteSqlCommand(
        "UPDATE Users SET Age = Age + 1 WHERE Age < @Age",
        new SqlParameter("@Age", 18));
}
```

#### 删除数据

```csharp
using (var context = new MyDbContext())
{
    // 方式1：Remove单个实体
    var user = context.Users.Find(1);
    if (user != null)
    {
        context.Users.Remove(user);
        context.SaveChanges();
    }
    
    // 方式2：RemoveRange多个实体
    var usersToDelete = context.Users.Where(u => u.Age < 18).ToList();
    context.Users.RemoveRange(usersToDelete);
    context.SaveChanges();
    
    // 方式3：直接设置状态
    var userToDelete = new User { Id = 2 };
    context.Entry(userToDelete).State = EntityState.Deleted;
    context.SaveChanges();
    
    // 方式4：批量删除（使用原始SQL，性能更好）
    int rowsAffected = context.Database.ExecuteSqlCommand(
        "DELETE FROM Users WHERE Age < @Age",
        new SqlParameter("@Age", 18));
}
```

#### 批量操作

```csharp
using (var context = new MyDbContext())
{
    // 批量添加
    var users = new List<User>();
    for (int i = 0; i < 1000; i++)
    {
        users.Add(new User 
        { 
            Name = $"User{i}", 
            Email = $"user{i}@example.com", 
            Age = 20 + i % 50 
        });
    }
    
    // 方式1：AddRange（EF会分批执行）
    context.Users.AddRange(users);
    context.SaveChanges();
    
    // 方式2：使用BulkInsert扩展（需要安装EntityFramework.BulkInsert）
    // context.BulkInsert(users);
    
    // 批量更新
    var usersToUpdate = context.Users.Where(u => u.Age < 18).ToList();
    foreach (var user in usersToUpdate)
    {
        user.Age = 18;
    }
    context.SaveChanges();
    
    // 批量删除
    var usersToDelete = context.Users.Where(u => u.Age > 100).ToList();
    context.Users.RemoveRange(usersToDelete);
    context.SaveChanges();
}
```

### <a id="change-tracking"></a>变更跟踪

Entity Framework自动跟踪实体的状态变化，这是实现更新和删除的基础。

#### 实体状态（EntityState）

```csharp
using (var context = new MyDbContext())
{
    // 实体状态枚举：
    // Detached：未跟踪
    // Unchanged：未更改
    // Added：已添加
    // Deleted：已删除
    // Modified：已修改
    
    var user = new User { Name = "新用户", Email = "new@example.com", Age = 25 };
    
    // 检查状态
    var state1 = context.Entry(user).State; // Detached（未跟踪）
    
    context.Users.Add(user);
    var state2 = context.Entry(user).State; // Added（已添加）
    
    context.SaveChanges();
    var state3 = context.Entry(user).State; // Unchanged（未更改）
    
    user.Name = "更新的名称";
    var state4 = context.Entry(user).State; // Modified（已修改）
    
    context.Users.Remove(user);
    var state5 = context.Entry(user).State; // Deleted（已删除）
    
    context.SaveChanges();
}
```

#### 获取变更信息

```csharp
using (var context = new MyDbContext())
{
    var user = context.Users.Find(1);
    user.Name = "新名称";
    user.Age = 30;
    
    // 获取实体的变更跟踪信息
    var entry = context.Entry(user);
    
    // 检查实体是否被修改
    bool isModified = entry.State == EntityState.Modified;
    
    // 获取所有被修改的属性
    var modifiedProperties = entry.Properties
        .Where(p => p.IsModified)
        .Select(p => p.Name)
        .ToList();
    
    // 获取属性的原始值和当前值
    foreach (var property in entry.Properties)
    {
        if (property.IsModified)
        {
            var originalValue = property.OriginalValue;
            var currentValue = property.CurrentValue;
            Console.WriteLine($"{property.Name}: {originalValue} -> {currentValue}");
        }
    }
    
    // 获取所有被跟踪的实体
    var allEntries = context.ChangeTracker.Entries();
    foreach (var e in allEntries)
    {
        Console.WriteLine($"实体: {e.Entity.GetType().Name}, 状态: {e.State}");
    }
    
    // 获取特定类型的被跟踪实体
    var userEntries = context.ChangeTracker.Entries<User>();
    foreach (var e in userEntries)
    {
        if (e.State == EntityState.Modified)
        {
            Console.WriteLine($"修改的用户: {e.Entity.Name}");
        }
    }
    
    context.SaveChanges();
}
```

#### 禁用变更跟踪

```csharp
using (var context = new MyDbContext())
{
    // AsNoTracking：禁用变更跟踪（提高查询性能）
    var users = context.Users
        .AsNoTracking()
        .ToList();
    
    // 修改后不会自动跟踪
    users[0].Name = "新名称";
    // 需要手动附加才能更新
    context.Users.Attach(users[0]);
    context.Entry(users[0]).State = EntityState.Modified;
    context.SaveChanges();
    
    // 全局禁用自动检测更改（提高批量操作性能）
    context.Configuration.AutoDetectChangesEnabled = false;
    
    // 手动检测更改
    context.ChangeTracker.DetectChanges();
    
    // 批量操作后重新启用
    context.Configuration.AutoDetectChangesEnabled = true;
}
```

### <a id="concurrency-control"></a>并发控制

Entity Framework提供了多种并发控制机制来处理多用户同时修改数据的情况。

#### 乐观并发控制（Optimistic Concurrency）

```csharp
// 方式1：使用RowVersion（时间戳）
public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    
    [Timestamp] // 自动生成时间戳
    public byte[] RowVersion { get; set; }
}

// 更新时会检查RowVersion
using (var context = new MyDbContext())
{
    var user = context.Users.Find(1);
    user.Name = "新名称";
    
    try
    {
        context.SaveChanges();
    }
    catch (DbUpdateConcurrencyException ex)
    {
        // 处理并发冲突
        var entry = ex.Entries.Single();
        var databaseValues = entry.GetDatabaseValues();
        var clientValues = entry.Entity as User;
        
        // 选择解决策略
        // 策略1：使用数据库值
        entry.OriginalValues.SetValues(databaseValues);
        
        // 策略2：使用客户端值
        entry.CurrentValues.SetValues(clientValues);
        
        // 策略3：合并值
        var databaseUser = databaseValues.ToObject() as User;
        clientValues.Name = databaseUser.Name; // 使用数据库的Name
        entry.CurrentValues.SetValues(clientValues);
        
        context.SaveChanges();
    }
}

// 方式2：使用ConcurrencyCheck特性
public class User
{
    public int Id { get; set; }
    
    [ConcurrencyCheck] // 并发检查
    public int Version { get; set; }
    
    public string Name { get; set; }
}

// 方式3：Fluent API配置并发
protected override void OnModelCreating(DbModelBuilder modelBuilder)
{
    modelBuilder.Entity<User>()
        .Property(u => u.Version)
        .IsConcurrencyToken(); // 设置为并发令牌
}
```

#### 悲观并发控制（Pessimistic Concurrency）

```csharp
using (var context = new MyDbContext())
{
    using (var transaction = context.Database.BeginTransaction(IsolationLevel.Serializable))
    {
        try
        {
            // 使用Serializable隔离级别实现悲观锁
            var user = context.Users
                .SqlQuery("SELECT * FROM Users WITH (UPDLOCK) WHERE Id = @Id",
                    new SqlParameter("@Id", 1))
                .FirstOrDefault();
            
            if (user != null)
            {
                user.Name = "更新的名称";
                context.SaveChanges();
            }
            
            transaction.Commit();
        }
        catch
        {
            transaction.Rollback();
            throw;
        }
    }
}
```

### <a id="migrations"></a>迁移（Migrations）

迁移是Entity Framework的数据库版本控制系统，用于管理数据库架构的变更。

#### 启用迁移

```bash
# 在Package Manager Console中执行
PM> Enable-Migrations

# 指定上下文
PM> Enable-Migrations -ContextTypeName MyDbContext

# 启用自动迁移（不推荐用于生产环境）
PM> Enable-Migrations -EnableAutomaticMigrations
```

#### 创建迁移

```bash
# 创建迁移
PM> Add-Migration InitialCreate

# 创建命名迁移
PM> Add-Migration AddUserTable

# 指定迁移名称和配置
PM> Add-Migration AddEmailIndex -ConfigurationTypeName MyProject.Migrations.Configuration
```

#### 迁移文件结构

```csharp
// 自动生成的迁移文件
public partial class AddUserTable : DbMigration
{
    public override void Up()
    {
        CreateTable(
            "dbo.Users",
            c => new
            {
                Id = c.Int(nullable: false, identity: true),
                Name = c.String(nullable: false, maxLength: 100),
                Email = c.String(nullable: false, maxLength: 200),
                Age = c.Int(nullable: false),
                CreateDate = c.DateTime(nullable: false),
            })
            .PrimaryKey(t => t.Id)
            .Index(t => t.Email, unique: true, name: "IX_Users_Email");
    }
    
    public override void Down()
    {
        DropIndex("dbo.Users", "IX_Users_Email");
        DropTable("dbo.Users");
    }
}
```

#### 应用迁移

```csharp
// 方式1：使用Update-Database命令
// PM> Update-Database

// 方式2：在代码中应用迁移
public class MyDbContext : DbContext
{
    public MyDbContext() : base("DefaultConnection")
    {
        // 自动应用迁移（仅用于开发环境）
        Database.SetInitializer(new MigrateDatabaseToLatestVersion<MyDbContext, Migrations.Configuration>());
    }
}

// 方式3：手动应用迁移
using (var context = new MyDbContext())
{
    var migrator = new DbMigrator(new Migrations.Configuration());
    migrator.Update(); // 应用所有待处理的迁移
}
```

#### 回滚迁移

```bash
# 回滚到指定迁移
PM> Update-Database -TargetMigration PreviousMigrationName

# 回滚所有迁移
PM> Update-Database -TargetMigration 0
```

### <a id="ef6-performance"></a>性能优化

Entity Framework提供了多种性能优化技巧来提高查询和操作效率。

#### 查询性能优化

```csharp
using (var context = new MyDbContext())
{
    // 1. 使用AsNoTracking禁用变更跟踪（只读查询）
    var users = context.Users
        .AsNoTracking()
        .ToList();
    
    // 2. 使用Select只查询需要的字段
    var userNames = context.Users
        .Select(u => new { u.Id, u.Name })
        .ToList();
    
    // 3. 使用Include预加载关联数据（避免N+1查询）
    var usersWithOrders = context.Users
        .Include(u => u.Orders)
        .ToList();
    
    // 4. 禁用延迟加载（避免意外查询）
    context.Configuration.LazyLoadingEnabled = false;
    
    // 5. 使用Find查找（使用主键，性能最好）
    var user = context.Users.Find(1);
    
    // 6. 批量操作时禁用自动检测更改
    context.Configuration.AutoDetectChangesEnabled = false;
    
    for (int i = 0; i < 1000; i++)
    {
        context.Users.Add(new User { Name = $"User{i}", Email = $"user{i}@example.com", Age = 20 });
    }
    
    context.SaveChanges(); // 只检测一次更改
    
    context.Configuration.AutoDetectChangesEnabled = true;
    
    // 7. 使用编译查询（重复查询）
    private static readonly Func<MyDbContext, int, User> GetUserById =
        CompiledQuery.Compile((MyDbContext ctx, int id) =>
            ctx.Users.FirstOrDefault(u => u.Id == id));
    
    var user2 = GetUserById(context, 1);
    
    // 8. 使用原始SQL进行复杂查询
    var users = context.Database.SqlQuery<User>(
        "SELECT * FROM Users WHERE Age > @Age",
        new SqlParameter("@Age", 18))
        .ToList();
}
```

#### 批量操作优化

```csharp
using (var context = new MyDbContext())
{
    // 1. 批量添加
    var users = new List<User>();
    for (int i = 0; i < 1000; i++)
    {
        users.Add(new User { Name = $"User{i}", Email = $"user{i}@example.com", Age = 20 });
    }
    
    context.Configuration.AutoDetectChangesEnabled = false;
    context.Users.AddRange(users);
    context.SaveChanges();
    context.Configuration.AutoDetectChangesEnabled = true;
    
    // 2. 批量更新（使用原始SQL）
    int rowsAffected = context.Database.ExecuteSqlCommand(
        "UPDATE Users SET Age = Age + 1 WHERE Age < @Age",
        new SqlParameter("@Age", 18));
    
    // 3. 批量删除（使用原始SQL）
    int deletedRows = context.Database.ExecuteSqlCommand(
        "DELETE FROM Users WHERE Age < @Age",
        new SqlParameter("@Age", 18));
}
```

### <a id="ef6-advanced"></a>高级特性

#### 数据库初始化策略

```csharp
public class MyDbContext : DbContext
{
    public MyDbContext() : base("DefaultConnection")
    {
        // 策略1：如果数据库不存在则创建（开发环境）
        Database.SetInitializer(new CreateDatabaseIfNotExists<MyDbContext>());
        
        // 策略2：总是删除并重新创建（开发环境，危险）
        // Database.SetInitializer(new DropCreateDatabaseAlways<MyDbContext>());
        
        // 策略3：模型改变时删除并重新创建（开发环境）
        // Database.SetInitializer(new DropCreateDatabaseIfModelChanges<MyDbContext>());
        
        // 策略4：使用迁移（生产环境推荐）
        Database.SetInitializer(new MigrateDatabaseToLatestVersion<MyDbContext, Migrations.Configuration>());
        
        // 策略5：禁用初始化（生产环境）
        // Database.SetInitializer<MyDbContext>(null);
    }
}
```

#### 数据库日志记录

```csharp
public class MyDbContext : DbContext
{
    public MyDbContext() : base("DefaultConnection")
    {
        // 记录SQL到控制台
        this.Database.Log = s => Console.WriteLine(s);
        
        // 记录SQL到文件
        this.Database.Log = s => 
        {
            File.AppendAllText("ef.log", s);
        };
        
        // 记录SQL到调试输出
        #if DEBUG
        this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        #endif
    }
}
```

#### 存储过程和函数映射

```csharp
// 定义存储过程结果类
public class UserOrderResult
{
    public int UserId { get; set; }
    public string UserName { get; set; }
    public int OrderCount { get; set; }
}

// 调用存储过程
using (var context = new MyDbContext())
{
    var results = context.Database.SqlQuery<UserOrderResult>(
        "EXEC GetUserOrders @UserId",
        new SqlParameter("@UserId", 1))
        .ToList();
}
```

Entity Framework 6提供了强大的ORM功能，从基础的ADO.NET到高级的EF6特性，涵盖了数据访问的各个方面。通过合理使用这些特性，可以大大提高开发效率和代码质量。

## <a id="design-patterns"></a>C#设计模式详解

设计模式是软件工程中经过验证的解决方案，用于解决常见的设计问题。它们提供了一套最佳实践，帮助开发者构建可维护、可扩展和可重用的软件系统。在C#中，设计模式被广泛应用于各种类型的应用程序开发。

### <a id="singleton-pattern"></a>单例模式

单例模式是一种创建型设计模式，它确保一个类只有一个实例，并提供一个全局访问点来获取这个实例。单例模式在需要控制资源访问、协调系统行为或提供全局状态管理时非常有用。

#### 单例模式的核心要点

1. **单一实例**：类只能有一个实例
2. **全局访问**：提供一个全局访问点来获取该实例
3. **自我实例化**：类负责创建自己的唯一实例
4. **防止外部实例化**：通过私有构造函数防止外部创建新实例

#### 单例模式的实现方式

##### 1. 饿汉式单例

饿汉式单例在类加载时就创建实例，线程安全但可能导致资源浪费。

```csharp
// 线程安全的饿汉式单例模式实现
public sealed class Singleton
{
    // 私有静态字段，保存唯一实例
    private static readonly Singleton _instance = new Singleton();
    
    // 静态构造函数，由CLR保证线程安全
    static Singleton() { }
    
    // 私有构造函数，防止外部实例化
    private Singleton() { }
    
    // 公共静态属性，提供全局访问点
    public static Singleton Instance
    {
        get { return _instance; }
    }
    
    // 单例类的成员
    public void DoSomething()
    {
        Console.WriteLine("Singleton instance is doing something.");
    }
}

// 使用单例
Singleton.Instance.DoSomething();
```

##### 2. 懒汉式单例（使用Lazy<T>）

懒汉式单例在第一次使用时才创建实例，实现了延迟初始化，节省资源。C# 4.0引入的`Lazy<T>`类提供了简洁且线程安全的延迟初始化实现。

```csharp
// 使用Lazy<T>实现的懒汉式单例
public sealed class LazySingleton
{
    // 使用Lazy<T>实现延迟初始化
    private static readonly Lazy<LazySingleton> _lazyInstance = 
        new Lazy<LazySingleton>(() => new LazySingleton(), LazyThreadSafetyMode.ExecutionAndPublication);
    
    private LazySingleton() { }
    
    public static LazySingleton Instance
    {
        get { return _lazyInstance.Value; }
    }
    
    public void DoSomething()
    {
        Console.WriteLine("Lazy singleton instance is doing something.");
    }
}
```

##### 3. 双重检查锁定单例

双重检查锁定是一种传统的延迟初始化实现方式，通过两次检查实例是否已创建来减少锁的开销。

```csharp
// 双重检查锁定实现的单例
public sealed class DoubleCheckedLockingSingleton
{
    // volatile关键字确保多线程环境下的可见性
    private static volatile DoubleCheckedLockingSingleton _instance;
    private static readonly object _lock = new object();
    
    private DoubleCheckedLockingSingleton() { }
    
    public static DoubleCheckedLockingSingleton Instance
    {
        get
        {
            // 第一次检查（无锁）
            if (_instance == null)
            {
                // 加锁
                lock (_lock)
                {
                    // 第二次检查（有锁）
                    if (_instance == null)
                    {
                        _instance = new DoubleCheckedLockingSingleton();
                    }
                }
            }
            return _instance;
        }
    }
    
    public void DoSomething()
    {
        Console.WriteLine("Double-checked locking singleton instance is doing something.");
    }
}
```

##### 4. 静态内部类单例

利用C#类加载机制实现的线程安全单例，既实现了延迟初始化，又避免了显式加锁。

```csharp
// 静态内部类实现的单例
public sealed class InnerClassSingleton
{
    private InnerClassSingleton() { }
    
    // 静态内部类
    private static class SingletonHolder
    {
        // 在内部类中创建实例
        internal static readonly InnerClassSingleton Instance = new InnerClassSingleton();
    }
    
    public static InnerClassSingleton Instance
    {
        get { return SingletonHolder.Instance; }
    }
    
    public void DoSomething()
    {
        Console.WriteLine("Inner class singleton instance is doing something.");
    }
}
```

#### 单例模式的优缺点

##### 优点

1. **唯一实例**：确保类只有一个实例，避免资源浪费
2. **全局访问**：提供统一的访问点，方便状态管理
3. **延迟初始化**：部分实现支持延迟加载，提高启动性能
4. **线程安全**：正确实现的单例模式是线程安全的

##### 缺点

1. **隐藏依赖关系**：使用全局访问点可能导致代码耦合
2. **测试困难**：单例模式可能影响单元测试的隔离性
3. **违背单一职责原则**：单例类既要负责自身的业务逻辑，又要负责管理实例
4. **扩展性差**：通常难以扩展单例类

#### 单例模式的应用场景

1. **资源管理**：数据库连接池、日志系统、配置管理器等需要共享资源的场景
2. **全局状态**：需要在应用程序范围内共享状态的场景
3. **服务类**：提供全局服务的类，如缓存服务、消息队列服务等
4. **工具类**：需要统一访问点的工具类，如日期时间管理器、加密服务等

#### 单例模式的最佳实践

1. **使用sealed关键字**：防止单例类被继承
2. **选择合适的实现方式**：根据需求选择饿汉式或懒汉式
3. **优先使用Lazy<T>**：在.NET 4.0及以上版本中，推荐使用`Lazy<T>`实现延迟初始化
4. **避免滥用**：仅在确实需要单一实例时使用单例模式
5. **考虑线程安全**：确保在多线程环境下的正确性
6. **实现IDisposable**：如果单例持有非托管资源，应实现`IDisposable`接口

### <a id="factory-pattern"></a>工厂模式

工厂模式是一种创建型设计模式，它提供了一种创建对象的最佳方式，将对象的创建与使用分离。工厂模式包括简单工厂、工厂方法和抽象工厂三种形式。

#### 1. 简单工厂模式

简单工厂模式通过一个工厂类来创建所有产品实例，客户端不需要知道具体产品的创建细节。

```csharp
// 产品接口
public interface IProduct
{
    void Display();
}

// 具体产品A
public class ProductA : IProduct
{
    public void Display()
    {
        Console.WriteLine("这是产品A");
    }
}

// 具体产品B
public class ProductB : IProduct
{
    public void Display()
    {
        Console.WriteLine("这是产品B");
    }
}

// 简单工厂类
public class SimpleFactory
{
    public IProduct CreateProduct(string type)
    {
        switch (type.ToLower())
        {
            case "a":
                return new ProductA();
            case "b":
                return new ProductB();
            default:
                throw new ArgumentException("无效的产品类型");
        }
    }
}

// 使用示例
public void TestSimpleFactory()
{
    SimpleFactory factory = new SimpleFactory();
    IProduct productA = factory.CreateProduct("a");
    productA.Display();
    
    IProduct productB = factory.CreateProduct("b");
    productB.Display();
}
```

#### 2. 工厂方法模式

工厂方法模式将产品的创建推迟到子类中实现，每个具体产品对应一个具体工厂。

```csharp
// 产品接口
public interface IProduct
{
    void Display();
}

// 具体产品A
public class ProductA : IProduct
{
    public void Display()
    {
        Console.WriteLine("这是产品A");
    }
}

// 具体产品B
public class ProductB : IProduct
{
    public void Display()
    {
        Console.WriteLine("这是产品B");
    }
}

// 抽象工厂接口
public interface IFactory
{
    IProduct CreateProduct();
}

// 具体工厂A
public class FactoryA : IFactory
{
    public IProduct CreateProduct()
    {
        return new ProductA();
    }
}

// 具体工厂B
public class FactoryB : IFactory
{
    public IProduct CreateProduct()
    {
        return new ProductB();
    }
}

// 使用示例
public void TestFactoryMethod()
{
    IFactory factoryA = new FactoryA();
    IProduct productA = factoryA.CreateProduct();
    productA.Display();
    
    IFactory factoryB = new FactoryB();
    IProduct productB = factoryB.CreateProduct();
    productB.Display();
}
```

#### 3. 抽象工厂模式

抽象工厂模式用于创建一系列相关或相互依赖的对象，它提供了一个接口，可以创建多个产品族中的产品对象。

```csharp
// 抽象产品A
public interface IProductA
{
    void Display();
}

// 抽象产品B
public interface IProductB
{
    void Display();
}

// 具体产品A1
public class ProductA1 : IProductA
{
    public void Display()
    {
        Console.WriteLine("这是产品A1");
    }
}

// 具体产品A2
public class ProductA2 : IProductA
{
    public void Display()
    {
        Console.WriteLine("这是产品A2");
    }
}

// 具体产品B1
public class ProductB1 : IProductB
{
    public void Display()
    {
        Console.WriteLine("这是产品B1");
    }
}

// 具体产品B2
public class ProductB2 : IProductB
{
    public void Display()
    {
        Console.WriteLine("这是产品B2");
    }
}

// 抽象工厂
public interface IAbstractFactory
{
    IProductA CreateProductA();
    IProductB CreateProductB();
}

// 具体工厂1
public class ConcreteFactory1 : IAbstractFactory
{
    public IProductA CreateProductA()
    {
        return new ProductA1();
    }
    
    public IProductB CreateProductB()
    {
        return new ProductB1();
    }
}

// 具体工厂2
public class ConcreteFactory2 : IAbstractFactory
{
    public IProductA CreateProductA()
    {
        return new ProductA2();
    }
    
    public IProductB CreateProductB()
    {
        return new ProductB2();
    }
}

// 使用示例
public void TestAbstractFactory()
{
    IAbstractFactory factory1 = new ConcreteFactory1();
    IProductA productA1 = factory1.CreateProductA();
    IProductB productB1 = factory1.CreateProductB();
    productA1.Display();
    productB1.Display();
    
    IAbstractFactory factory2 = new ConcreteFactory2();
    IProductA productA2 = factory2.CreateProductA();
    IProductB productB2 = factory2.CreateProductB();
    productA2.Display();
    productB2.Display();
}
```

### <a id="observer-pattern"></a>观察者模式

观察者模式（发布-订阅模式）定义了对象间的一种一对多依赖关系，当一个对象状态发生变化时，所有依赖它的对象都会得到通知并自动更新。

```csharp
// 被观察者接口
public interface ISubject
{
    void RegisterObserver(IObserver observer);
    void RemoveObserver(IObserver observer);
    void NotifyObservers();
}

// 观察者接口
public interface IObserver
{
    void Update(string message);
}

// 具体被观察者
public class Subject : ISubject
{
    private List<IObserver> _observers = new List<IObserver>();
    private string _message;
    
    public void RegisterObserver(IObserver observer)
    {
        _observers.Add(observer);
    }
    
    public void RemoveObserver(IObserver observer)
    {
        _observers.Remove(observer);
    }
    
    public void NotifyObservers()
    {
        foreach (var observer in _observers)
        {
            observer.Update(_message);
        }
    }
    
    public void SetMessage(string message)
    {
        _message = message;
        NotifyObservers();
    }
}

// 具体观察者A
public class ObserverA : IObserver
{
    public void Update(string message)
    {
        Console.WriteLine($"观察者A收到消息: {message}");
    }
}

// 具体观察者B
public class ObserverB : IObserver
{
    public void Update(string message)
    {
        Console.WriteLine($"观察者B收到消息: {message}");
    }
}

// 使用示例
public void TestObserver()
{
    Subject subject = new Subject();
    
    IObserver observerA = new ObserverA();
    IObserver observerB = new ObserverB();
    
    subject.RegisterObserver(observerA);
    subject.RegisterObserver(observerB);
    
    subject.SetMessage("Hello, Observers!");
    
    subject.RemoveObserver(observerA);
    
    subject.SetMessage("Second message!");
}
```

### <a id="strategy-pattern"></a>策略模式

策略模式定义了一系列算法，并将每个算法封装起来，使它们可以相互替换。策略模式让算法独立于使用它的客户而变化。

```csharp
// 策略接口
public interface IStrategy
{
    int Calculate(int a, int b);
}

// 具体策略A：加法
public class AddStrategy : IStrategy
{
    public int Calculate(int a, int b)
    {
        return a + b;
    }
}

// 具体策略B：减法
public class SubtractStrategy : IStrategy
{
    public int Calculate(int a, int b)
    {
        return a - b;
    }
}

// 具体策略C：乘法
public class MultiplyStrategy : IStrategy
{
    public int Calculate(int a, int b)
    {
        return a * b;
    }
}

// 上下文类
public class Context
{
    private IStrategy _strategy;
    
    public Context(IStrategy strategy)
    {
        _strategy = strategy;
    }
    
    public void SetStrategy(IStrategy strategy)
    {
        _strategy = strategy;
    }
    
    public int ExecuteStrategy(int a, int b)
    {
        return _strategy.Calculate(a, b);
    }
}

// 使用示例
public void TestStrategy()
{
    Context context = new Context(new AddStrategy());
    Console.WriteLine($"10 + 5 = {context.ExecuteStrategy(10, 5)}");
    
    context.SetStrategy(new SubtractStrategy());
    Console.WriteLine($"10 - 5 = {context.ExecuteStrategy(10, 5)}");
    
    context.SetStrategy(new MultiplyStrategy());
    Console.WriteLine($"10 * 5 = {context.ExecuteStrategy(10, 5)}");
}
```

### <a id="adapter-pattern"></a>适配器模式

适配器模式将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

```csharp
// 目标接口
public interface ITarget
{
    void Request();
}

// 适配者类
public class Adaptee
{
    public void SpecificRequest()
    {
        Console.WriteLine("适配者的具体请求");
    }
}

// 类适配器
public class ClassAdapter : Adaptee, ITarget
{
    public void Request()
    {
        SpecificRequest();
    }
}

// 对象适配器
public class ObjectAdapter : ITarget
{
    private Adaptee _adaptee;
    
    public ObjectAdapter(Adaptee adaptee)
    {
        _adaptee = adaptee;
    }
    
    public void Request()
    {
        _adaptee.SpecificRequest();
    }
}

// 使用示例
public void TestAdapter()
{
    // 类适配器
    ITarget classAdapter = new ClassAdapter();
    classAdapter.Request();
    
    // 对象适配器
    Adaptee adaptee = new Adaptee();
    ITarget objectAdapter = new ObjectAdapter(adaptee);
    objectAdapter.Request();
}
```

### <a id="decorator-pattern"></a>装饰器模式

装饰器模式动态地给一个对象添加一些额外的职责，就增加功能来说，装饰器模式比生成子类更为灵活。

```csharp
// 组件接口
public interface IComponent
{
    string Operation();
}

// 具体组件
public class ConcreteComponent : IComponent
{
    public string Operation()
    {
        return "具体组件的操作";
    }
}

// 装饰器抽象类
public abstract class Decorator : IComponent
{
    protected IComponent _component;
    
    public Decorator(IComponent component)
    {
        _component = component;
    }
    
    public virtual string Operation()
    {
        return _component.Operation();
    }
}

// 具体装饰器A
public class ConcreteDecoratorA : Decorator
{
    public ConcreteDecoratorA(IComponent component) : base(component) { }
    
    public override string Operation()
    {
        return $"{base.Operation()} + 装饰器A的操作";
    }
}

// 具体装饰器B
public class ConcreteDecoratorB : Decorator
{
    public ConcreteDecoratorB(IComponent component) : base(component) { }
    
    public override string Operation()
    {
        return $"{base.Operation()} + 装饰器B的操作";
    }
}

// 使用示例
public void TestDecorator()
{
    IComponent component = new ConcreteComponent();
    Console.WriteLine(component.Operation());
    
    IComponent decoratorA = new ConcreteDecoratorA(component);
    Console.WriteLine(decoratorA.Operation());
    
    IComponent decoratorB = new ConcreteDecoratorB(decoratorA);
    Console.WriteLine(decoratorB.Operation());
}
```

### <a id="dependency-injection-pattern"></a>依赖注入模式

依赖注入模式是一种实现控制反转（IoC）的设计模式，它允许对象在运行时接收依赖关系，而不是在编译时硬编码。

```csharp
// 服务接口
public interface IService
{
    void Execute();
}

// 具体服务A
public class ServiceA : IService
{
    public void Execute()
    {
        Console.WriteLine("ServiceA执行");
    }
}

// 具体服务B
public class ServiceB : IService
{
    public void Execute()
    {
        Console.WriteLine("ServiceB执行");
    }
}

// 客户端类
public class Client
{
    private IService _service;
    
    // 构造函数注入
    public Client(IService service)
    {
        _service = service;
    }
    
    // 属性注入
    public IService Service
    {
        get { return _service; }
        set { _service = value; }
    }
    
    // 方法注入
    public void SetService(IService service)
    {
        _service = service;
    }
    
    public void DoSomething()
    {
        _service.Execute();
    }
}

// 使用示例
public void TestDependencyInjection()
{
    // 构造函数注入
    IService serviceA = new ServiceA();
    Client client = new Client(serviceA);
    client.DoSomething();
    
    // 属性注入
    IService serviceB = new ServiceB();
    client.Service = serviceB;
    client.DoSomething();
    
    // 方法注入
    client.SetService(serviceA);
    client.DoSomething();
}
```

## <a id="communication-programming"></a>C#通信编程详解

通信编程是C#开发中的重要组成部分，它涉及不同系统之间的数据交换和通信。C#提供了多种通信方式，包括TCP/IP、HTTP、WebSocket、命名管道等。本章将详细介绍C#中的各种通信编程技术。

### <a id="tcp-ip-basics"></a>TCP/IP通信基础

TCP/IP是Internet的基础协议，它提供了可靠的、面向连接的通信机制。在C#中，可以通过Socket编程或高级封装类（如TcpClient、TcpListener）来实现TCP/IP通信。

#### TCP/IP协议栈

TCP/IP协议栈由四层组成：
- **应用层**：提供应用程序接口，如HTTP、FTP、SMTP等
- **传输层**：提供端到端的通信服务，主要协议包括TCP和UDP
- **网络层**：负责数据包的路由和转发，主要协议是IP
- **链路层**：负责物理网络的连接和数据帧的传输

#### TCP与UDP的区别

| 特性 | TCP | UDP |
|------|-----|-----|
| 连接类型 | 面向连接 | 无连接 |
| 可靠性 | 可靠 | 不可靠 |
| 传输速度 | 相对较慢 | 相对较快 |
| 数据大小 | 无限制 | 有限制（通常小于65535字节） |
| 适用场景 | 文件传输、网页浏览等 | 实时通信、视频流等 |

### <a id="socket-programming"></a>Socket编程

Socket是TCP/IP通信的基础，它提供了低级别的网络通信API。通过Socket编程，可以实现复杂的网络通信逻辑。

#### Socket基本概念

- **Socket类型**：
  - `Stream`：面向连接的TCP套接字
  - `Datagram`：无连接的UDP套接字
  - `Raw`：原始套接字，用于直接访问网络层协议

- **Socket地址**：
  - `IPEndPoint`：包含IP地址和端口号
  - `Dns`：用于域名解析

#### TCP Socket服务器示例

```csharp
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading;

public class TcpSocketServer
{
    public static void Start()
    {
        // 创建TCP监听套接字
        TcpListener server = new TcpListener(IPAddress.Any, 8888);
        server.Start();
        Console.WriteLine("TCP服务器已启动，监听端口8888...");

        while (true)
        {
            // 等待客户端连接
            TcpClient client = server.AcceptTcpClient();
            Console.WriteLine($"客户端 {((IPEndPoint)client.Client.RemoteEndPoint).Address} 已连接");

            // 为每个客户端创建一个新线程处理通信
            Thread clientThread = new Thread(HandleClient);
            clientThread.Start(client);
        }
    }

    private static void HandleClient(object obj)
    {
        TcpClient client = (TcpClient)obj;
        NetworkStream stream = client.GetStream();
        byte[] buffer = new byte[1024];

        try
        {
            while (true)
            {
                // 读取客户端数据
                int bytesRead = stream.Read(buffer, 0, buffer.Length);
                if (bytesRead == 0) break;

                string message = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                Console.WriteLine($"收到客户端消息: {message}");

                // 回复客户端
                string response = $"服务器已收到消息: {message}";
                byte[] responseBytes = Encoding.UTF8.GetBytes(response);
                stream.Write(responseBytes, 0, responseBytes.Length);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"通信错误: {ex.Message}");
        }
        finally
        {
            stream.Close();
            client.Close();
            Console.WriteLine($"客户端 {((IPEndPoint)client.Client.RemoteEndPoint).Address} 已断开连接");
        }
    }
}

// 使用示例
// TcpSocketServer.Start();
```

#### TCP Socket客户端示例

```csharp
using System;
using System.Net.Sockets;
using System.Text;

public class TcpSocketClient
{
    public static void Start()
    {
        TcpClient client = new TcpClient();
        
        try
        {
            // 连接服务器
            client.Connect("127.0.0.1", 8888);
            Console.WriteLine("已连接到服务器");

            NetworkStream stream = client.GetStream();
            
            // 发送消息
            string message = "Hello, Server!";
            byte[] messageBytes = Encoding.UTF8.GetBytes(message);
            stream.Write(messageBytes, 0, messageBytes.Length);
            Console.WriteLine($"已发送消息: {message}");

            // 接收回复
            byte[] buffer = new byte[1024];
            int bytesRead = stream.Read(buffer, 0, buffer.Length);
            string response = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            Console.WriteLine($"收到服务器回复: {response}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"连接错误: {ex.Message}");
        }
        finally
        {
            client.Close();
        }
    }
}

// 使用示例
// TcpSocketClient.Start();
```

### <a id="tcpclient-tcplistener"></a>TcpClient与TcpListener

TcpClient和TcpListener是Socket的高级封装，它们简化了TCP通信的开发过程。

#### TcpListener（TCP服务器）示例

```csharp
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

public class TcpListenerExample
{
    public static async Task StartAsync()
    {
        // 创建TcpListener实例
        TcpListener listener = new TcpListener(IPAddress.Loopback, 9000);
        listener.Start();
        Console.WriteLine("TcpListener服务器已启动，监听端口9000...");

        while (true)
        {
            // 异步接受客户端连接
            TcpClient client = await listener.AcceptTcpClientAsync();
            Console.WriteLine($"客户端已连接: {client.Client.RemoteEndPoint}");
            
            // 使用异步方法处理客户端通信
            _ = HandleClientAsync(client);
        }
    }

    private static async Task HandleClientAsync(TcpClient client)
    {
        using (client)
        {
            NetworkStream stream = client.GetStream();
            byte[] buffer = new byte[1024];

            try
            {
                while (true)
                {
                    // 异步读取数据
                    int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
                    if (bytesRead == 0) break;

                    string message = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                    Console.WriteLine($"收到消息: {message}");

                    // 异步回复
                    string response = $"已处理消息: {message}";
                    byte[] responseBytes = Encoding.UTF8.GetBytes(response);
                    await stream.WriteAsync(responseBytes, 0, responseBytes.Length);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"通信错误: {ex.Message}");
            }
            finally
            {
                Console.WriteLine($"客户端已断开连接: {client.Client.RemoteEndPoint}");
            }
        }
    }
}

// 使用示例
// await TcpListenerExample.StartAsync();
```

#### TcpClient（TCP客户端）示例

```csharp
using System;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

public class TcpClientExample
{
    public static async Task StartAsync()
    {
        using (TcpClient client = new TcpClient())
        {
            // 异步连接服务器
            await client.ConnectAsync(IPAddress.Loopback, 9000);
            Console.WriteLine("已连接到服务器");

            NetworkStream stream = client.GetStream();

            // 发送多条消息
            for (int i = 1; i <= 3; i++)
            {
                string message = $"消息 #{i}";
                byte[] messageBytes = Encoding.UTF8.GetBytes(message);
                await stream.WriteAsync(messageBytes, 0, messageBytes.Length);
                Console.WriteLine($"已发送: {message}");

                // 接收回复
                byte[] buffer = new byte[1024];
                int bytesRead = await stream.ReadAsync(buffer, 0, buffer.Length);
                string response = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                Console.WriteLine($"收到回复: {response}");

                // 等待1秒
                await Task.Delay(1000);
            }
        }
    }
}

// 使用示例
// await TcpClientExample.StartAsync();
```

### <a id="udpclient-programming"></a>UdpClient编程

UdpClient是UDP通信的高级封装，它简化了UDP套接字的使用。

#### UDP服务器示例

```csharp
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

public class UdpServerExample
{
    public static async Task StartAsync()
    {
        UdpClient server = new UdpClient(9001);
        Console.WriteLine("UDP服务器已启动，监听端口9001...");

        IPEndPoint remoteEndPoint = new IPEndPoint(IPAddress.Any, 0);

        try
        {
            while (true)
            {
                // 异步接收数据
                byte[] receivedBytes = await server.ReceiveAsync();
                string message = Encoding.UTF8.GetString(receivedBytes);
                Console.WriteLine($"收到来自 {remoteEndPoint.Address}:{remoteEndPoint.Port} 的消息: {message}");

                // 回复客户端
                string response = $"服务器已收到UDP消息: {message}";
                byte[] responseBytes = Encoding.UTF8.GetBytes(response);
                await server.SendAsync(responseBytes, responseBytes.Length, remoteEndPoint);
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"UDP服务器错误: {ex.Message}");
        }
        finally
        {
            server.Close();
        }
    }
}

// 使用示例
// await UdpServerExample.StartAsync();
```

#### UDP客户端示例

```csharp
using System;
using System.Net;
using System.Net.Sockets;
using System.Text;
using System.Threading.Tasks;

public class UdpClientExample
{
    public static async Task StartAsync()
    {
        using (UdpClient client = new UdpClient())
        {
            IPEndPoint serverEndPoint = new IPEndPoint(IPAddress.Loopback, 9001);

            // 发送UDP消息
            string message = "Hello UDP Server!";
            byte[] messageBytes = Encoding.UTF8.GetBytes(message);
            await client.SendAsync(messageBytes, messageBytes.Length, serverEndPoint);
            Console.WriteLine($"已发送UDP消息: {message}");

            // 接收回复
            client.Client.ReceiveTimeout = 5000;
            IPEndPoint remoteEndPoint = new IPEndPoint(IPAddress.Any, 0);
            byte[] receivedBytes = await client.ReceiveAsync();
            string response = Encoding.UTF8.GetString(receivedBytes);
            Console.WriteLine($"收到UDP回复: {response}");
        }
    }
}

// 使用示例
// await UdpClientExample.StartAsync();
```

### <a id="http-communication"></a>HTTP通信

HTTP是Web通信的基础协议，C#提供了多种方式来实现HTTP通信，包括HttpClient、HttpWebRequest等。

#### HttpClient示例

HttpClient是.NET 4.5引入的现代化HTTP客户端，它支持异步操作，是推荐的HTTP通信方式。

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

public class HttpClientExample
{
    private static readonly HttpClient _client = new HttpClient();

    public static async Task GetAsync()
    {
        try
        {
            // 发送GET请求
            HttpResponseMessage response = await _client.GetAsync("https://jsonplaceholder.typicode.com/posts/1");
            
            // 确保请求成功
            response.EnsureSuccessStatusCode();
            
            // 读取响应内容
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"GET请求成功，响应内容: {responseBody}");
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"GET请求失败: {ex.Message}");
        }
    }

    public static async Task PostAsync()
    {
        try
        {
            // 创建请求内容
            var postData = new {
                title = "测试标题",
                body = "测试内容",
                userId = 1
            };
            
            // 序列化对象为JSON
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(postData);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
            
            // 发送POST请求
            HttpResponseMessage response = await _client.PostAsync("https://jsonplaceholder.typicode.com/posts", content);
            
            response.EnsureSuccessStatusCode();
            
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"POST请求成功，响应内容: {responseBody}");
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"POST请求失败: {ex.Message}");
        }
    }

    public static async Task PutAsync()
    {
        try
        {
            var putData = new {
                id = 1,
                title = "更新后的标题",
                body = "更新后的内容",
                userId = 1
            };
            
            string json = Newtonsoft.Json.JsonConvert.SerializeObject(putData);
            var content = new StringContent(json, System.Text.Encoding.UTF8, "application/json");
            
            HttpResponseMessage response = await _client.PutAsync("https://jsonplaceholder.typicode.com/posts/1", content);
            
            response.EnsureSuccessStatusCode();
            
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine($"PUT请求成功，响应内容: {responseBody}");
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"PUT请求失败: {ex.Message}");
        }
    }

    public static async Task DeleteAsync()
    {
        try
        {
            HttpResponseMessage response = await _client.DeleteAsync("https://jsonplaceholder.typicode.com/posts/1");
            
            response.EnsureSuccessStatusCode();
            Console.WriteLine($"DELETE请求成功，状态码: {response.StatusCode}");
        }
        catch (HttpRequestException ex)
        {
            Console.WriteLine($"DELETE请求失败: {ex.Message}");
        }
    }
}

// 使用示例
// await HttpClientExample.GetAsync();
// await HttpClientExample.PostAsync();
// await HttpClientExample.PutAsync();
// await HttpClientExample.DeleteAsync();
```

### <a id="websocket-communication"></a>WebSocket通信

WebSocket提供了全双工的通信方式，允许服务器主动向客户端推送数据。C#中可以使用ClientWebSocket和WebSocket类来实现WebSocket通信。

#### WebSocket服务器示例（使用ASP.NET Core）

```csharp
// 在ASP.NET Core控制器中
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        // 广播消息给所有客户端
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task SendPrivateMessage(string user, string receiver, string message)
    {
        // 发送私聊消息
        await Clients.User(receiver).SendAsync("ReceivePrivateMessage", user, message);
    }

    public override async Task OnConnectedAsync()
    {
        // 客户端连接时的处理
        await Clients.All.SendAsync("UserConnected", Context.ConnectionId);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception exception)
    {
        // 客户端断开连接时的处理
        await Clients.All.SendAsync("UserDisconnected", Context.ConnectionId);
        await base.OnDisconnectedAsync(exception);
    }
}

// Startup.cs中配置SignalR
public void ConfigureServices(IServiceCollection services)
{
    services.AddSignalR();
    // 其他配置...
}

public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    // 其他配置...
    app.UseEndpoints(endpoints =>
    {
        endpoints.MapHub<ChatHub>("/chathub");
        // 其他端点...
    });
}
```

#### WebSocket客户端示例

```csharp
using System;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

public class WebSocketClientExample
{
    public static async Task StartAsync()
    {
        using (ClientWebSocket client = new ClientWebSocket())
        {
            // 连接到WebSocket服务器
            Uri serverUri = new Uri("wss://echo.websocket.org");
            await client.ConnectAsync(serverUri, CancellationToken.None);
            Console.WriteLine("WebSocket客户端已连接");

            // 发送消息
            string message = "Hello WebSocket!";
            byte[] buffer = Encoding.UTF8.GetBytes(message);
            await client.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);
            Console.WriteLine($"已发送WebSocket消息: {message}");

            // 接收消息
            buffer = new byte[1024];
            WebSocketReceiveResult result = await client.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
            string response = Encoding.UTF8.GetString(buffer, 0, result.Count);
            Console.WriteLine($"收到WebSocket回复: {response}");

            // 关闭连接
            await client.CloseAsync(WebSocketCloseStatus.NormalClosure, "正常关闭", CancellationToken.None);
            Console.WriteLine("WebSocket连接已关闭");
        }
    }
}

// 使用示例
// await WebSocketClientExample.StartAsync();
```

### <a id="named-pipes"></a>命名管道通信

命名管道是Windows操作系统提供的一种进程间通信机制，它允许同一台计算机上的不同进程或不同计算机上的进程进行通信。

#### 命名管道服务器示例

```csharp
using System;
using System.IO.Pipes;
using System.Text;
using System.Threading.Tasks;

public class NamedPipeServerExample
{
    public static async Task StartAsync()
    {
        while (true)
        {
            // 创建命名管道服务器
            using (NamedPipeServerStream pipeServer = new NamedPipeServerStream(
                "TestPipe",
                PipeDirection.InOut,
                NamedPipeServerStream.MaxAllowedServerInstances,
                PipeTransmissionMode.Message))
            {
                Console.WriteLine("命名管道服务器已启动，等待客户端连接...");
                
                // 等待客户端连接
                await pipeServer.WaitForConnectionAsync();
                Console.WriteLine("客户端已连接");

                try
                {
                    // 读取客户端消息
                    byte[] buffer = new byte[1024];
                    int bytesRead = await pipeServer.ReadAsync(buffer, 0, buffer.Length);
                    string message = Encoding.UTF8.GetString(buffer, 0, bytesRead);
                    Console.WriteLine($"收到客户端消息: {message}");

                    // 回复客户端
                    string response = $"服务器已收到消息: {message}";
                    byte[] responseBytes = Encoding.UTF8.GetBytes(response);
                    await pipeServer.WriteAsync(responseBytes, 0, responseBytes.Length);
                    pipeServer.Flush();
                }
                catch (Exception ex)
                {
                    Console.WriteLine($"通信错误: {ex.Message}");
                }
            }
        }
    }
}

// 使用示例
// await NamedPipeServerExample.StartAsync();
```

#### 命名管道客户端示例

```csharp
using System;
using System.IO.Pipes;
using System.Text;
using System.Threading.Tasks;

public class NamedPipeClientExample
{
    public static async Task StartAsync()
    {
        // 创建命名管道客户端
        using (NamedPipeClientStream pipeClient = new NamedPipeClientStream(
            ".",
            "TestPipe",
            PipeDirection.InOut,
            PipeOptions.Asynchronous))
        {
            Console.WriteLine("正在连接到命名管道服务器...");
            
            // 连接到服务器
            await pipeClient.ConnectAsync();
            Console.WriteLine("已连接到命名管道服务器");

            // 发送消息
            string message = "Hello Named Pipe Server!";
            byte[] buffer = Encoding.UTF8.GetBytes(message);
            await pipeClient.WriteAsync(buffer, 0, buffer.Length);
            pipeClient.Flush();
            Console.WriteLine($"已发送消息: {message}");

            // 接收回复
            buffer = new byte[1024];
            int bytesRead = await pipeClient.ReadAsync(buffer, 0, buffer.Length);
            string response = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            Console.WriteLine($"收到回复: {response}");
        }
    }
}

// 使用示例
// await NamedPipeClientExample.StartAsync();
```

### <a id="wcf-communication"></a>WCF通信

WCF（Windows Communication Foundation）是.NET框架中的一种通信技术，它提供了统一的编程模型，用于构建面向服务的应用程序。

#### WCF服务契约示例

```csharp
using System.ServiceModel;

// 定义服务契约
[ServiceContract]
public interface ICalculatorService
{
    [OperationContract]
    int Add(int a, int b);
    
    [OperationContract]
    int Subtract(int a, int b);
    
    [OperationContract]
    int Multiply(int a, int b);
    
    [OperationContract]
    double Divide(int a, int b);
}

// 实现服务契约
public class CalculatorService : ICalculatorService
{
    public int Add(int a, int b)
    {
        return a + b;
    }
    
    public int Subtract(int a, int b)
    {
        return a - b;
    }
    
    public int Multiply(int a, int b)
    {
        return a * b;
    }
    
    public double Divide(int a, int b)
    {
        if (b == 0)
            throw new FaultException("除数不能为零");
        
        return (double)a / b;
    }
}
```

#### WCF服务配置（app.config）

```xml
<configuration>
  <system.serviceModel>
    <services>
      <service name="CalculatorService" behaviorConfiguration="CalculatorServiceBehavior">
        <endpoint address="" binding="wsHttpBinding" contract="ICalculatorService">
          <identity>
            <dns value="localhost" />
          </identity>
        </endpoint>
        <endpoint address="mex" binding="mexHttpBinding" contract="IMetadataExchange" />
        <host>
          <baseAddresses>
            <add baseAddress="http://localhost:8000/CalculatorService" />
          </baseAddresses>
        </host>
      </service>
    </services>
    <behaviors>
      <serviceBehaviors>
        <behavior name="CalculatorServiceBehavior">
          <serviceMetadata httpGetEnabled="True" />
          <serviceDebug includeExceptionDetailInFaults="False" />
        </behavior>
      </serviceBehaviors>
    </behaviors>
  </system.serviceModel>
</configuration>
```

#### WCF客户端调用示例

```csharp
using System;
using System.ServiceModel;

// 使用svcutil.exe生成客户端代理
// svcutil.exe http://localhost:8000/CalculatorService?wsdl

public class WcfClientExample
{
    public static void Start()
    {
        // 创建WCF客户端
        CalculatorServiceClient client = new CalculatorServiceClient();
        
        try
        {
            // 调用WCF服务方法
            int addResult = client.Add(10, 5);
            Console.WriteLine($"10 + 5 = {addResult}");
            
            int subtractResult = client.Subtract(10, 5);
            Console.WriteLine($"10 - 5 = {subtractResult}");
            
            int multiplyResult = client.Multiply(10, 5);
            Console.WriteLine($"10 * 5 = {multiplyResult}");
            
            double divideResult = client.Divide(10, 5);
            Console.WriteLine($"10 / 5 = {divideResult}");
        }
        catch (FaultException ex)
        {
            Console.WriteLine($"WCF服务调用失败: {ex.Message}");
        }
        finally
        {
            client.Close();
        }
    }
}
```

### <a id="grpc-communication"></a>gRPC通信

gRPC是一种高性能、开源的远程过程调用（RPC）框架，它基于HTTP/2协议，使用Protocol Buffers作为序列化机制。

#### gRPC服务定义（.proto文件）

```proto
// calculator.proto
syntax = "proto3";

option csharp_namespace = "GrpcCalculator";

package calculator;

// 定义计算器服务
service Calculator {
  // 定义Add方法
  rpc Add (AddRequest) returns (AddResponse);
  
  // 定义Subtract方法
  rpc Subtract (SubtractRequest) returns (SubtractResponse);
  
  // 定义Multiply方法
  rpc Multiply (MultiplyRequest) returns (MultiplyResponse);
  
  // 定义Divide方法
  rpc Divide (DivideRequest) returns (DivideResponse);
}

// Add请求消息
message AddRequest {
  int32 a = 1;
  int32 b = 2;
}

// Add响应消息
message AddResponse {
  int32 result = 1;
}

// Subtract请求消息
message SubtractRequest {
  int32 a = 1;
  int32 b = 2;
}

// Subtract响应消息
message SubtractResponse {
  int32 result = 1;
}

// Multiply请求消息
message MultiplyRequest {
  int32 a = 1;
  int32 b = 2;
}

// Multiply响应消息
message MultiplyResponse {
  int32 result = 1;
}

// Divide请求消息
message DivideRequest {
  int32 a = 1;
  int32 b = 2;
}

// Divide响应消息
message DivideResponse {
  double result = 1;
}
```

#### gRPC服务实现

```csharp
using Grpc.Core;
using GrpcCalculator;

public class CalculatorServiceImpl : Calculator.CalculatorBase
{
    public override Task<AddResponse> Add(AddRequest request, ServerCallContext context)
    {
        int result = request.A + request.B;
        return Task.FromResult(new AddResponse { Result = result });
    }

    public override Task<SubtractResponse> Subtract(SubtractRequest request, ServerCallContext context)
    {
        int result = request.A - request.B;
        return Task.FromResult(new SubtractResponse { Result = result });
    }

    public override Task<MultiplyResponse> Multiply(MultiplyRequest request, ServerCallContext context)
    {
        int result = request.A * request.B;
        return Task.FromResult(new MultiplyResponse { Result = result });
    }

    public override Task<DivideResponse> Divide(DivideRequest request, ServerCallContext context)
    {
        if (request.B == 0)
        {
            throw new RpcException(new Status(StatusCode.InvalidArgument, "除数不能为零"));
        }
        double result = (double)request.A / request.B;
        return Task.FromResult(new DivideResponse { Result = result });
    }
}
```

#### gRPC服务器启动

```csharp
using Grpc.Core;

public class GrpcServerExample
{
    public static void Start()
    {
        const int Port = 50051;

        Server server = new Server
        {
            Services = { Calculator.BindService(new CalculatorServiceImpl()) },
            Ports = { new ServerPort("localhost", Port, ServerCredentials.Insecure) }
        };

        server.Start();
        Console.WriteLine($"gRPC服务器已启动，监听端口 {Port}...");
        Console.WriteLine("按任意键停止服务器...");
        Console.ReadKey();

        server.ShutdownAsync().Wait();
    }
}

// 使用示例
// GrpcServerExample.Start();
```

#### gRPC客户端调用

```csharp
using Grpc.Core;
using GrpcCalculator;

public class GrpcClientExample
{
    public static void Start()
    {
        Channel channel = new Channel("localhost:50051", ChannelCredentials.Insecure);
        Calculator.CalculatorClient client = new Calculator.CalculatorClient(channel);

        try
        {
            // 调用Add方法
            AddRequest addRequest = new AddRequest { A = 10, B = 5 };
            AddResponse addResponse = client.Add(addRequest);
            Console.WriteLine($"10 + 5 = {addResponse.Result}");

            // 调用Subtract方法
            SubtractRequest subtractRequest = new SubtractRequest { A = 10, B = 5 };
            SubtractResponse subtractResponse = client.Subtract(subtractRequest);
            Console.WriteLine($"10 - 5 = {subtractResponse.Result}");

            // 调用Multiply方法
            MultiplyRequest multiplyRequest = new MultiplyRequest { A = 10, B = 5 };
            MultiplyResponse multiplyResponse = client.Multiply(multiplyRequest);
            Console.WriteLine($"10 * 5 = {multiplyResponse.Result}");

            // 调用Divide方法
            DivideRequest divideRequest = new DivideRequest { A = 10, B = 5 };
            DivideResponse divideResponse = client.Divide(divideRequest);
            Console.WriteLine($"10 / 5 = {divideResponse.Result}");
        }
        catch (RpcException ex)
        {
            Console.WriteLine($"gRPC调用失败: {ex.Status.Detail}");
        }
        finally
        {
            channel.ShutdownAsync().Wait();
        }
    }
}

// 使用示例
// GrpcClientExample.Start();
```

### <a id="message-queues"></a>消息队列

消息队列是一种异步通信机制，它允许应用程序之间通过消息进行通信，而不需要直接调用彼此。常见的消息队列系统包括RabbitMQ、Azure Service Bus、Apache Kafka等。

#### RabbitMQ示例

```csharp
using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;

public class RabbitMqExample
{
    private const string QueueName = "test_queue";
    private const string ExchangeName = "test_exchange";
    private const string RoutingKey = "test_routing_key";

    // 发送消息
    public static void SendMessage()
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };
        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel())
        {
            // 声明交换机
            channel.ExchangeDeclare(exchange: ExchangeName, type: ExchangeType.Direct);
            
            // 声明队列
            channel.QueueDeclare(queue: QueueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
            
            // 绑定队列到交换机
            channel.QueueBind(queue: QueueName, exchange: ExchangeName, routingKey: RoutingKey);
            
            // 发送消息
            string message = "Hello RabbitMQ!";
            var body = Encoding.UTF8.GetBytes(message);
            channel.BasicPublish(exchange: ExchangeName, routingKey: RoutingKey, basicProperties: null, body: body);
            Console.WriteLine($"已发送消息: {message}");
        }
    }

    // 接收消息
    public static void ReceiveMessages()
    {
        var factory = new ConnectionFactory() { HostName = "localhost" };
        using (var connection = factory.CreateConnection())
        using (var channel = connection.CreateModel())
        {
            channel.QueueDeclare(queue: QueueName, durable: false, exclusive: false, autoDelete: false, arguments: null);
            
            var consumer = new EventingBasicConsumer(channel);
            consumer.Received += (model, ea) =>
            {
                var body = ea.Body.ToArray();
                var message = Encoding.UTF8.GetString(body);
                Console.WriteLine($"收到消息: {message}");
            };
            
            channel.BasicConsume(queue: QueueName, autoAck: true, consumer: consumer);
            
            Console.WriteLine("正在等待消息...");
            Console.WriteLine("按任意键退出");
            Console.ReadKey();
        }
    }
}

// 使用示例
// RabbitMqExample.SendMessage();
// RabbitMqExample.ReceiveMessages();
```

## 通信编程总结

C#提供了丰富的通信编程API，从低级别的Socket编程到高级别的框架如WCF和gRPC，开发者可以根据具体需求选择合适的通信方式：

- **Socket编程**：适用于需要精细控制网络通信的场景
- **TcpClient/TcpListener**：适用于简单的TCP通信场景
- **HttpClient**：适用于HTTP/HTTPS通信，特别是REST API调用
- **WebSocket**：适用于需要双向实时通信的场景，如聊天应用、实时数据推送
- **命名管道**：适用于同一台计算机上的进程间通信
- **WCF**：适用于构建面向服务的应用程序，支持多种通信协议
- **gRPC**：适用于高性能、跨语言的分布式系统
- **消息队列**：适用于异步通信、解耦系统组件的场景

选择合适的通信方式需要考虑多种因素，包括性能要求、可靠性要求、跨平台需求、开发复杂度等。在实际开发中，应根据具体项目需求选择最适合的通信技术。

## <a id="attributes-detail"></a>C#特性（Attributes）详解

特性（Attributes）是C#中的元数据机制，它允许为程序元素（类、方法、属性等）添加声明性信息。特性可以在运行时通过反射访问，广泛应用于序列化、ORM、依赖注入、单元测试等场景。

### <a id="attributes-concept"></a>特性的基本概念

#### 什么是特性？

特性是一种声明性标签，用于向程序元素添加元数据信息。特性本身不直接影响程序的执行逻辑，但可以通过反射在运行时获取和利用这些信息。

```csharp
// 特性使用方括号 [] 语法
[Serializable]
public class Person
{
    [Obsolete("使用新版本的方法")]
    public void OldMethod() { }
}
```

#### 特性的作用

1. **添加元数据**：为代码元素添加描述性信息
2. **编译时检查**：某些特性会被编译器识别并产生警告或错误
3. **运行时访问**：通过反射可以获取特性信息
4. **框架支持**：许多框架（如ASP.NET、Entity Framework）依赖特性来配置行为

### <a id="attributes-usage"></a>特性的定义与使用

#### 特性的语法

```csharp
// 基本语法：[特性名]
[Serializable]

// 带参数的特性：[特性名(参数)]
[Obsolete("此方法已过时")]

// 多个参数：[特性名(参数1, 参数2, 命名参数=值)]
[Author("张三", "2024-01-01", Version = 2.0)]

// 多个特性：可以堆叠或分开
[Serializable]
[Obsolete]
public class MyClass { }

// 或者
[Serializable, Obsolete]
public class MyClass { }
```

#### 特性的应用目标

特性可以应用于各种程序元素：

```csharp
// 应用于程序集
[assembly: AssemblyTitle("MyApplication")]

// 应用于模块
[module: CLSCompliant(true)]

// 应用于类
[Serializable]
public class MyClass { }

// 应用于方法
[Obsolete("此方法已过时")]
public void MyMethod() { }

// 应用于属性
[Required]
public string Name { get; set; }

// 应用于字段
[NonSerialized]
private int _value;

// 应用于参数
public void Method([In] int parameter) { }

// 应用于返回值
[return: MarshalAs(UnmanagedType.Bool)]
public bool GetValue() { return true; }
```

### <a id="common-attributes"></a>常见内置特性

#### 序列化相关特性

```csharp
using System;
using System.Runtime.Serialization;

// Serializable：标记类可序列化
[Serializable]
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    // NonSerialized：标记字段不序列化
    [NonSerialized]
    private string _tempData;
    
    // OptionalField：标记字段为可选（用于版本兼容）
    [OptionalField]
    public string Email { get; set; }
}

// DataContract：用于WCF数据契约
[DataContract]
public class Customer
{
    [DataMember(Name = "CustomerName")]
    public string Name { get; set; }
    
    [DataMember(IsRequired = true)]
    public int Id { get; set; }
    
    // 不标记DataMember的成员不会被序列化
    public string TempData { get; set; }
}
```

#### 过时标记特性

```csharp
// Obsolete：标记代码元素已过时
[Obsolete("此方法已过时，请使用NewMethod代替")]
public void OldMethod() { }

// 第二个参数为true时，使用该元素会产生编译错误
[Obsolete("此方法已移除", true)]
public void RemovedMethod() { }

public void NewMethod() { }
```

#### 条件编译特性

```csharp
using System.Diagnostics;

// Conditional：条件编译特性
[Conditional("DEBUG")]
public void DebugMethod()
{
    Console.WriteLine("仅在DEBUG模式下执行");
}

// 使用示例
public void Test()
{
    DebugMethod(); // 在DEBUG模式下才会编译和执行
}
```

#### 调用者信息特性

```csharp
using System.Runtime.CompilerServices;

public class Logger
{
    // CallerMemberName：自动获取调用者成员名
    public void Log(
        string message,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string filePath = "",
        [CallerLineNumber] int lineNumber = 0)
    {
        Console.WriteLine($"[{memberName}] {filePath}:{lineNumber} - {message}");
    }
}

// 使用示例
public void Test()
{
    Logger logger = new Logger();
    logger.Log("测试消息");
    // 输出: [Test] C:\...\Program.cs:123 - 测试消息
}
```

#### 参数验证特性

```csharp
// 在.NET Core/.NET 5+中的参数验证
public void ProcessData(
    [NotNull] string data,
    [Range(0, 100)] int value,
    [EmailAddress] string email)
{
    // data不为null
    // value在0-100范围内
    // email是有效的邮箱地址
}
```

#### 结构布局特性

```csharp
using System.Runtime.InteropServices;

// StructLayout：控制结构体在内存中的布局
[StructLayout(LayoutKind.Sequential)]
public struct Point
{
    public int X;
    public int Y;
}

// 显式布局（用于与C/C++互操作）
[StructLayout(LayoutKind.Explicit)]
public struct Union
{
    [FieldOffset(0)]
    public int Integer;
    
    [FieldOffset(0)]
    public float Float;
}

// MarshalAs：指定如何封送数据
[DllImport("user32.dll")]
public static extern int MessageBox(
    IntPtr hWnd,
    [MarshalAs(UnmanagedType.LPStr)] string text,
    [MarshalAs(UnmanagedType.LPStr)] string caption,
    uint type);
```

### <a id="custom-attributes"></a>自定义特性

#### 创建自定义特性

自定义特性类必须继承自`Attribute`类：

```csharp
using System;

// 定义自定义特性
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method, AllowMultiple = false)]
public class AuthorAttribute : Attribute
{
    public string Name { get; }
    public string Date { get; set; }
    public double Version { get; set; }
    
    // 位置参数（必需参数）
    public AuthorAttribute(string name)
    {
        Name = name;
    }
}

// 使用自定义特性
[Author("张三", Date = "2024-01-01", Version = 1.0)]
public class MyClass
{
    [Author("李四")]
    public void MyMethod() { }
}
```

#### AttributeUsage特性

`AttributeUsage`用于定义特性的使用规则：

```csharp
[AttributeUsage(
    AttributeTargets.Class | AttributeTargets.Method,  // 应用目标
    AllowMultiple = false,                              // 是否允许多次应用
    Inherited = true)]                                  // 是否可继承
public class MyAttribute : Attribute { }
```

**AttributeTargets枚举值：**
- `All`：所有目标
- `Class`：类
- `Method`：方法
- `Property`：属性
- `Field`：字段
- `Parameter`：参数
- `Constructor`：构造函数
- `Event`：事件
- `Interface`：接口
- `Struct`：结构体
- `Enum`：枚举
- `Assembly`：程序集
- `Module`：模块
- `ReturnValue`：返回值

#### 自定义特性示例

```csharp
// 示例1：验证特性
[AttributeUsage(AttributeTargets.Property)]
public class RequiredAttribute : Attribute
{
    public string ErrorMessage { get; set; }
    
    public RequiredAttribute(string errorMessage = "此字段是必需的")
    {
        ErrorMessage = errorMessage;
    }
}

// 示例2：权限特性
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public class AuthorizeAttribute : Attribute
{
    public string[] Roles { get; set; }
    
    public AuthorizeAttribute(params string[] roles)
    {
        Roles = roles;
    }
}

// 示例3：性能监控特性
[AttributeUsage(AttributeTargets.Method)]
public class PerformanceMonitorAttribute : Attribute
{
    public int Threshold { get; set; } // 阈值（毫秒）
    
    public PerformanceMonitorAttribute(int threshold = 1000)
    {
        Threshold = threshold;
    }
}

// 使用示例
public class UserService
{
    [Authorize("Admin", "Manager")]
    [PerformanceMonitor(500)]
    public void DeleteUser(int userId)
    {
        // 方法实现
    }
    
    [Required("用户名不能为空")]
    public string UserName { get; set; }
}
```

### <a id="attributes-reflection"></a>特性的反射访问

#### 获取特性

通过反射可以获取和应用在代码元素上的特性：

```csharp
using System;
using System.Reflection;

// 获取类上的特性
[Author("张三", Date = "2024-01-01")]
public class MyClass { }

// 获取特性
Type type = typeof(MyClass);
AuthorAttribute authorAttr = type.GetCustomAttribute<AuthorAttribute>();

if (authorAttr != null)
{
    Console.WriteLine($"作者: {authorAttr.Name}");
    Console.WriteLine($"日期: {authorAttr.Date}");
    Console.WriteLine($"版本: {authorAttr.Version}");
}

// 获取所有特性
object[] attributes = type.GetCustomAttributes(true);
foreach (Attribute attr in attributes)
{
    Console.WriteLine($"特性: {attr.GetType().Name}");
}

// 获取方法上的特性
[Author("李四")]
public void MyMethod() { }

MethodInfo method = typeof(MyClass).GetMethod("MyMethod");
AuthorAttribute methodAttr = method.GetCustomAttribute<AuthorAttribute>();

// 获取属性上的特性
public class Person
{
    [Required(ErrorMessage = "姓名不能为空")]
    [StringLength(50, ErrorMessage = "姓名不能超过50个字符")]
    public string Name { get; set; }
    
    [Range(18, 120, ErrorMessage = "年龄必须在18-120之间")]
    public int Age { get; set; }
    
    [EmailAddress(ErrorMessage = "请输入有效的邮箱地址")]
    public string Email { get; set; }
}

// 获取所有属性
PropertyInfo[] properties = typeof(Person).GetProperties();
foreach (PropertyInfo property in properties)
{
    Console.WriteLine($"\n属性名: {property.Name}");
    
    // 获取属性上的所有特性
    object[] propAttributes = property.GetCustomAttributes(true);
    foreach (Attribute attr in propAttributes)
    {
        Console.WriteLine($"  特性类型: {attr.GetType().Name}");
        
        // 处理Required特性
        if (attr is RequiredAttribute requiredAttr)
        {
            Console.WriteLine($"  错误信息: {requiredAttr.ErrorMessage}");
        }
        
        // 处理StringLength特性
        if (attr is StringLengthAttribute stringLengthAttr)
        {
            Console.WriteLine($"  最大长度: {stringLengthAttr.MaximumLength}");
            Console.WriteLine($"  错误信息: {stringLengthAttr.ErrorMessage}");
        }
        
        // 处理Range特性
        if (attr is RangeAttribute rangeAttr)
        {
            Console.WriteLine($"  最小值: {rangeAttr.Minimum}");
            Console.WriteLine($"  最大值: {rangeAttr.Maximum}");
            Console.WriteLine($"  错误信息: {rangeAttr.ErrorMessage}");
        }
        
        // 处理EmailAddress特性
        if (attr is EmailAddressAttribute emailAttr)
        {
            Console.WriteLine($"  错误信息: {emailAttr.ErrorMessage}");
        }
    }
}

// 获取特定属性的特定特性
PropertyInfo nameProperty = typeof(Person).GetProperty("Name");
RequiredAttribute nameRequiredAttr = nameProperty.GetCustomAttribute<RequiredAttribute>();
if (nameRequiredAttr != null)
{
    Console.WriteLine($"\nName属性的Required特性: {nameRequiredAttr.ErrorMessage}");
}

// 获取属性的多个特性
PropertyInfo emailProperty = typeof(Person).GetProperty("Email");
Attribute[] emailAttributes = emailProperty.GetCustomAttributes(typeof(ValidationAttribute), true) as Attribute[];
foreach (Attribute attr in emailAttributes)
{
    Console.WriteLine($"\nEmail属性的验证特性: {attr.GetType().Name}");
}
```

#### 实现特性驱动的验证

```csharp
using System;
using System.Collections.Generic;
using System.Reflection;

// 验证特性基类
public abstract class ValidationAttribute : Attribute
{
    public abstract bool IsValid(object value);
    public abstract string ErrorMessage { get; }
}

// 必需字段特性
[AttributeUsage(AttributeTargets.Property)]
public class RequiredAttribute : ValidationAttribute
{
    public override bool IsValid(object value)
    {
        if (value == null) return false;
        if (value is string str) return !string.IsNullOrWhiteSpace(str);
        return true;
    }
    
    public override string ErrorMessage => "此字段是必需的";
}

// 范围验证特性
[AttributeUsage(AttributeTargets.Property)]
public class RangeAttribute : ValidationAttribute
{
    public int Min { get; }
    public int Max { get; }
    
    public RangeAttribute(int min, int max)
    {
        Min = min;
        Max = max;
    }
    
    public override bool IsValid(object value)
    {
        if (value is int intValue)
        {
            return intValue >= Min && intValue <= Max;
        }
        return false;
    }
    
    public override string ErrorMessage => $"值必须在 {Min} 到 {Max} 之间";
}

// 验证器类
public static class Validator
{
    public static List<string> Validate(object obj)
    {
        List<string> errors = new List<string>();
        Type type = obj.GetType();
        
        foreach (PropertyInfo property in type.GetProperties())
        {
            // 获取所有验证特性
            var validationAttributes = property.GetCustomAttributes<ValidationAttribute>();
            
            foreach (var attribute in validationAttributes)
            {
                object value = property.GetValue(obj);
                
                if (!attribute.IsValid(value))
                {
                    errors.Add($"{property.Name}: {attribute.ErrorMessage}");
                }
            }
        }
        
        return errors;
    }
}

// 使用示例
[Required]
public class Person
{
    [Required]
    public string Name { get; set; }
    
    [Range(0, 150)]
    public int Age { get; set; }
    
    [Required]
    public string Email { get; set; }
}

// 验证
Person person = new Person { Name = "", Age = 200, Email = null };
List<string> errors = Validator.Validate(person);
foreach (string error in errors)
{
    Console.WriteLine(error);
}
```

#### 特性驱动的AOP（面向切面编程）

```csharp
using System;
using System.Diagnostics;
using System.Reflection;

// 日志特性
[AttributeUsage(AttributeTargets.Method)]
public class LogAttribute : Attribute
{
    public LogLevel Level { get; set; } = LogLevel.Info;
}

public enum LogLevel
{
    Debug,
    Info,
    Warning,
    Error
}

// 缓存特性
[AttributeUsage(AttributeTargets.Method)]
public class CacheAttribute : Attribute
{
    public int Duration { get; set; } // 缓存时长（秒）
    
    public CacheAttribute(int duration = 60)
    {
        Duration = duration;
    }
}

// 特性处理器（简化示例）
public static class AttributeProcessor
{
    public static void ProcessMethod(MethodInfo method, object instance, object[] parameters)
    {
        // 检查日志特性
        var logAttr = method.GetCustomAttribute<LogAttribute>();
        if (logAttr != null)
        {
            Console.WriteLine($"[{logAttr.Level}] 调用方法: {method.Name}");
        }
        
        // 检查缓存特性
        var cacheAttr = method.GetCustomAttribute<CacheAttribute>();
        if (cacheAttr != null)
        {
            Console.WriteLine($"检查缓存，缓存时长: {cacheAttr.Duration}秒");
            // 实现缓存逻辑
        }
        
        // 执行方法
        method.Invoke(instance, parameters);
    }
}
```

### <a id="attributes-scenarios"></a>特性的应用场景

#### 1. 数据序列化

```csharp
using System;
using System.Text.Json;
using System.Text.Json.Serialization;

public class Product
{
    [JsonPropertyName("product_id")]
    public int Id { get; set; }
    
    [JsonPropertyName("product_name")]
    public string Name { get; set; }
    
    [JsonIgnore]
    public decimal InternalPrice { get; set; }
    
    [JsonPropertyName("price")]
    public decimal PublicPrice { get; set; }
}

// 序列化时会使用特性指定的名称
Product product = new Product { Id = 1, Name = "商品", PublicPrice = 99.99m };
string json = JsonSerializer.Serialize(product);
// 输出: {"product_id":1,"product_name":"商品","price":99.99}
```

#### 2. ORM映射

```csharp
// Entity Framework使用特性进行映射
[Table("Users")]
public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }
    
    [Required]
    [MaxLength(100)]
    [Column("UserName")]
    public string Name { get; set; }
    
    [NotMapped]
    public string TempData { get; set; }
}
```

#### 3. API路由和验证

```csharp
// ASP.NET Core中使用特性
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetUser(int id)
    {
        // 实现
        return Ok();
    }
    
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult CreateUser([FromBody] CreateUserRequest request)
    {
        // 实现
        return Ok();
    }
}

public class CreateUserRequest
{
    [Required(ErrorMessage = "用户名是必需的")]
    [StringLength(50, MinimumLength = 3)]
    public string UserName { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; }
}
```

#### 4. 单元测试

```csharp
using Microsoft.VisualStudio.TestTools.UnitTesting;

[TestClass]
public class CalculatorTests
{
    [TestMethod]
    [TestCategory("Math")]
    [Priority(1)]
    public void Add_TwoNumbers_ReturnsSum()
    {
        // 测试代码
    }
    
    [TestMethod]
    [ExpectedException(typeof(ArgumentException))]
    public void Divide_ByZero_ThrowsException()
    {
        // 测试代码
    }
    
    [TestInitialize]
    public void Setup()
    {
        // 测试初始化
    }
    
    [TestCleanup]
    public void Cleanup()
    {
        // 测试清理
    }
}
```

#### 5. 依赖注入

```csharp
// 使用特性标记需要注入的依赖
public class UserService
{
    [Inject]
    private IUserRepository _repository;
    
    [Inject]
    private ILogger _logger;
}

// 或者方法注入
public class OrderService
{
    private IOrderRepository _repository;
    
    [Inject]
    public void SetRepository(IOrderRepository repository)
    {
        _repository = repository;
    }
}
```

特性是C#中强大的元数据机制，它使得代码更加声明式、可配置，并且为框架提供了丰富的扩展点。通过合理使用特性，可以构建更加灵活和可维护的应用程序。

## <a id="reflection-detail"></a>C#反射（Reflection）详解

反射（Reflection）是C#中强大的运行时类型检查和操作机制。它允许在运行时获取类型信息、创建对象实例、调用方法和访问属性，而无需在编译时知道这些类型。反射广泛应用于序列化、ORM框架、依赖注入、代码生成等场景。

### <a id="reflection-concept"></a>反射的基本概念

#### 什么是反射？

反射是程序在运行时检查、访问和修改自身结构的能力。通过反射，可以：
- 获取类型的元数据信息
- 动态创建类型实例
- 动态调用方法和访问属性
- 在运行时构建和执行代码

#### 为什么需要反射？

1. **框架开发**：框架需要处理未知类型（如ORM、序列化器）
2. **插件系统**：动态加载和调用插件
3. **代码生成**：动态生成和执行代码
4. **调试和诊断**：运行时类型检查和分析
5. **配置驱动**：基于配置动态创建和配置对象

#### 反射的性能考虑

反射操作比直接调用慢很多，因为需要：
- 运行时类型查找
- 动态方法调用
- 安全性检查

**性能优化建议：**
- 缓存反射结果
- 使用`Delegate.CreateDelegate`创建委托
- 使用表达式树编译
- 避免在频繁调用的代码中使用反射

### <a id="type-class"></a>Type类型详解

`Type`类是反射的核心，它表示类型声明（类、接口、数组等）。

#### 获取Type对象

```csharp
using System;
using System.Reflection;

// 方式1：使用typeof运算符（编译时已知类型）
Type type1 = typeof(string);
Type type2 = typeof(int);
Type type3 = typeof(Person);

// 方式2：使用GetType()方法（运行时获取）
string str = "Hello";
Type type4 = str.GetType();

Person person = new Person();
Type type5 = person.GetType();

// 方式3：使用Type.GetType()（通过类型名）
Type type6 = Type.GetType("System.String");
Type type7 = Type.GetType("MyNamespace.Person", true); // true表示找不到时抛出异常

// 方式4：从程序集获取
Assembly assembly = Assembly.GetExecutingAssembly();
Type[] types = assembly.GetTypes(); // 获取所有类型
Type type8 = assembly.GetType("MyNamespace.Person");
```

#### Type的常用属性

```csharp
Type type = typeof(Person);

// 类型基本信息
Console.WriteLine($"名称: {type.Name}");                    // Person
Console.WriteLine($"完整名称: {type.FullName}");            // MyNamespace.Person
Console.WriteLine($"命名空间: {type.Namespace}");           // MyNamespace
Console.WriteLine($"程序集: {type.Assembly.FullName}");     // 程序集名称

// 类型特性
Console.WriteLine($"是类: {type.IsClass}");                 // True
Console.WriteLine($"是接口: {type.IsInterface}");           // False
Console.WriteLine($"是值类型: {type.IsValueType}");         // False
Console.WriteLine($"是抽象类: {type.IsAbstract}");          // False
Console.WriteLine($"是密封类: {type.IsSealed}");            // False
Console.WriteLine($"是泛型: {type.IsGenericType}");         // False

// 可见性
Console.WriteLine($"是公开的: {type.IsPublic}");            // True
Console.WriteLine($"不是公开的: {type.IsNotPublic}");       // False

// 继承关系
Console.WriteLine($"基类: {type.BaseType}");                // System.Object
Console.WriteLine($"是否实现接口: {type.IsAssignableFrom(typeof(IDisposable))}");
```

#### 获取类型的成员

通过反射获取类型成员是反射机制的核心功能之一，它允许我们在运行时动态检查类型的结构。

```csharp
// 获取Person类型的Type对象
Type type = typeof(Person);

// 获取类型的所有公共成员（包括继承的成员）
// MemberInfo是所有成员信息类型的基类，包含成员的基本信息
MemberInfo[] allMembers = type.GetMembers();

// 获取特定类型的公共成员
// PropertyInfo：表示属性信息，用于获取和设置属性值
PropertyInfo[] properties = type.GetProperties();
// MethodInfo：表示方法信息，用于调用方法
MethodInfo[] methods = type.GetMethods();
// FieldInfo：表示字段信息，用于获取和设置字段值
FieldInfo[] fields = type.GetFields();
// ConstructorInfo：表示构造函数信息，用于创建实例
ConstructorInfo[] constructors = type.GetConstructors();
// EventInfo：表示事件信息，用于添加或移除事件处理程序
EventInfo[] events = type.GetEvents();

// 使用BindingFlags控制搜索范围和条件
// BindingFlags枚举用于指定反射如何搜索成员
// - Public：搜索公共成员
// - NonPublic：搜索非公共成员（私有、保护、内部）
// - Instance：搜索实例成员
// - Static：搜索静态成员
BindingFlags flags = BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance | BindingFlags.Static;

// 获取所有属性（包括公共和非公共、实例和静态）
PropertyInfo[] allProperties = type.GetProperties(flags);
// 获取所有方法（包括公共和非公共、实例和静态）
MethodInfo[] allMethods = type.GetMethods(flags);
// 获取所有字段（包括公共和非公共、实例和静态）
FieldInfo[] allFields = type.GetFields(flags);

// 获取特定名称的成员
// 获取名为"Name"的公共属性
PropertyInfo nameProperty = type.GetProperty("Name");
// 获取ToString方法（继承自Object）
MethodInfo toStringMethod = type.GetMethod("ToString");
// 获取名为"_id"的非公共实例字段
FieldInfo idField = type.GetField("_id", BindingFlags.NonPublic | BindingFlags.Instance);
// 获取接收string和int参数的构造函数
ConstructorInfo constructor = type.GetConstructor(new Type[] { typeof(string), typeof(int) });
```

**成员类型说明：**

| 成员类型 | 描述 | 主要用途 |
|---------|------|---------|
| `PropertyInfo` | 属性信息 | 获取/设置属性值、获取属性元数据 |
| `MethodInfo` | 方法信息 | 调用方法、获取方法参数和返回值信息 |
| `FieldInfo` | 字段信息 | 获取/设置字段值、获取字段元数据 |
| `ConstructorInfo` | 构造函数信息 | 创建类的实例 |
| `EventInfo` | 事件信息 | 添加/移除事件处理程序 |
| `MemberInfo` | 成员基类 | 提供成员的通用信息 |

**BindingFlags枚举完整值：**

| 标志 | 描述 | 用途 |
|------|------|------|
| `Default` | 表示默认绑定标志 | 不常用，通常使用其他特定标志组合 |
| `IgnoreCase` | 搜索时忽略名称的大小写 | 允许以不区分大小写的方式查找成员 |
| `DeclaredOnly` | 只搜索类型本身声明的成员，不包括继承的成员 | 限制搜索范围到当前类型 |
| `Instance` | 搜索实例成员 | 用于获取实例字段、属性、方法等 |
| `Static` | 搜索静态成员 | 用于获取静态字段、属性、方法等 |
| `Public` | 搜索公共成员 | 用于获取公共访问级别的成员 |
| `NonPublic` | 搜索非公共成员（私有、保护、内部） | 用于获取私有、保护或内部访问级别的成员 |
| `FlattenHierarchy` | 搜索基类中的公共和保护静态成员 | 用于在继承层次结构中搜索静态成员 |
| `InvokeMethod` | 用于InvokeMember，指示要调用方法 | 仅用于Type.InvokeMember方法 |
| `CreateInstance` | 用于InvokeMember，指示要创建实例 | 仅用于Type.InvokeMember方法 |
| `GetField` | 用于InvokeMember，指示要获取字段 | 仅用于Type.InvokeMember方法 |
| `SetField` | 用于InvokeMember，指示要设置字段 | 仅用于Type.InvokeMember方法 |
| `GetProperty` | 用于InvokeMember，指示要获取属性 | 仅用于Type.InvokeMember方法 |
| `SetProperty` | 用于InvokeMember，指示要设置属性 | 仅用于Type.InvokeMember方法 |
| `PutDispProperty` | 用于InvokeMember，指示要调用IDispatch的PutProperty | 仅用于COM互操作场景 |
| `PutRefDispProperty` | 用于InvokeMember，指示要调用IDispatch的PutRefProperty | 仅用于COM互操作场景 |
| `ExactBinding` | 用于InvokeMember，指示参数类型必须完全匹配 | 要求精确的参数类型匹配 |
| `SuppressChangeType` | 用于InvokeMember，指示不要将参数类型转换为匹配参数类型 | 禁用参数类型自动转换 |
| `OptionalParamBinding` | 用于InvokeMember，指示方法可以有可选参数 | 用于处理带有可选参数的方法 |
| `IgnoreReturn` | 用于InvokeMember，指示忽略方法的返回值 | 调用方法但不关心返回结果 |
| `DoNotWrapExceptions` | 用于InvokeMember，指示不要将异常包装在TargetInvocationException中 | 直接抛出原始异常 |

### <a id="assembly-operations"></a>程序集（Assembly）操作

程序集是.NET中代码部署和版本控制的基本单位。

#### 加载程序集

```csharp
using System.Reflection;

// 方式1：加载已加载的程序集
Assembly assembly1 = Assembly.GetExecutingAssembly(); // 当前程序集
Assembly assembly2 = Assembly.GetCallingAssembly();   // 调用者程序集
Assembly assembly3 = Assembly.GetEntryAssembly();     // 入口程序集

// 方式2：通过程序集名称加载
Assembly assembly4 = Assembly.Load("MyAssembly");
Assembly assembly5 = Assembly.LoadFrom("C:\\Path\\To\\MyAssembly.dll");
Assembly assembly6 = Assembly.LoadFile("C:\\Path\\To\\MyAssembly.dll");

// 方式3：通过类型获取程序集
Assembly assembly7 = typeof(Person).Assembly;

// 方式4：反射加载（推荐用于插件系统）
string assemblyPath = "MyPlugin.dll";
Assembly pluginAssembly = Assembly.LoadFrom(assemblyPath);
```

#### 程序集信息

```csharp
Assembly assembly = Assembly.GetExecutingAssembly();

// 程序集基本信息
Console.WriteLine($"程序集名称: {assembly.GetName().Name}");
Console.WriteLine($"完整名称: {assembly.FullName}");
Console.WriteLine($"位置: {assembly.Location}");
Console.WriteLine($"是否在GAC: {assembly.GlobalAssemblyCache}");

// 获取程序集中的所有类型
Type[] types = assembly.GetTypes();
foreach (Type type in types)
{
    Console.WriteLine($"类型: {type.FullName}");
}

// 获取导出的类型（公开类型）
Type[] exportedTypes = assembly.GetExportedTypes();

// 获取类型（通过名称）
Type type = assembly.GetType("MyNamespace.Person");

// 获取程序集的清单资源
string[] resources = assembly.GetManifestResourceNames();
foreach (string resource in resources)
{
    Console.WriteLine($"资源: {resource}");
}

// 加载嵌入资源
using (Stream stream = assembly.GetManifestResourceStream("MyNamespace.resource.txt"))
{
    // 读取资源
}
```

### <a id="type-members"></a>类型成员访问

#### 属性（Property）访问

```csharp
using System.Reflection;

public class Person
{
    public string Name { get; set; }
    public int Age { get; private set; }
    private string _email;
    
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
}

// 获取属性信息
Type type = typeof(Person);
PropertyInfo nameProperty = type.GetProperty("Name");
PropertyInfo ageProperty = type.GetProperty("Age");

// 属性信息
Console.WriteLine($"属性名: {nameProperty.Name}");
Console.WriteLine($"属性类型: {nameProperty.PropertyType}");
Console.WriteLine($"可读: {nameProperty.CanRead}");
Console.WriteLine($"可写: {nameProperty.CanWrite}");
Console.WriteLine($"是静态: {nameProperty.GetMethod.IsStatic}");

// 获取和设置属性值
Person person = new Person("张三", 25);

// 获取值
object nameValue = nameProperty.GetValue(person);
Console.WriteLine($"Name: {nameValue}"); // 输出: Name: 张三

// 设置值
nameProperty.SetValue(person, "李四");
Console.WriteLine($"Name: {person.Name}"); // 输出: Name: 李四

// 获取所有属性
PropertyInfo[] properties = type.GetProperties();
foreach (PropertyInfo prop in properties)
{
    Console.WriteLine($"{prop.Name} ({prop.PropertyType.Name})");
}

// 获取特性
var attributes = nameProperty.GetCustomAttributes();
foreach (Attribute attr in attributes)
{
    Console.WriteLine($"特性: {attr.GetType().Name}");
}
```

#### 方法（Method）访问

```csharp
public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
    
    private int Multiply(int a, int b)
    {
        return a * b;
    }
    
    public static int Subtract(int a, int b)
    {
        return a - b;
    }
}

// 获取方法信息
Type type = typeof(Calculator);
MethodInfo addMethod = type.GetMethod("Add");
MethodInfo multiplyMethod = type.GetMethod("Multiply", BindingFlags.NonPublic | BindingFlags.Instance);

// 方法信息
Console.WriteLine($"方法名: {addMethod.Name}");
Console.WriteLine($"返回类型: {addMethod.ReturnType}");
Console.WriteLine($"参数数量: {addMethod.GetParameters().Length}");
Console.WriteLine($"是静态: {addMethod.IsStatic}");

// 获取参数信息
ParameterInfo[] parameters = addMethod.GetParameters();
foreach (ParameterInfo param in parameters)
{
    Console.WriteLine($"参数: {param.Name}, 类型: {param.ParameterType}");
}

// 调用实例方法
Calculator calc = new Calculator();
object result = addMethod.Invoke(calc, new object[] { 10, 20 });
Console.WriteLine($"结果: {result}"); // 输出: 结果: 30

// 调用私有方法
object multiplyResult = multiplyMethod.Invoke(calc, new object[] { 5, 6 });
Console.WriteLine($"结果: {multiplyResult}"); // 输出: 结果: 30

// 调用静态方法
MethodInfo subtractMethod = type.GetMethod("Subtract");
object subtractResult = subtractMethod.Invoke(null, new object[] { 20, 10 });
Console.WriteLine($"结果: {subtractResult}"); // 输出: 结果: 10
```

#### 字段（Field）访问

```csharp
public class Person
{
    public string Name;
    private int _age;
    public static int Count;
}

// 获取字段信息
Type type = typeof(Person);
FieldInfo nameField = type.GetField("Name");
FieldInfo ageField = type.GetField("_age", BindingFlags.NonPublic | BindingFlags.Instance);
FieldInfo countField = type.GetField("Count");

// 字段信息
Console.WriteLine($"字段名: {nameField.Name}");
Console.WriteLine($"字段类型: {nameField.FieldType}");
Console.WriteLine($"是静态: {nameField.IsStatic}");

// 获取和设置字段值
Person person = new Person();

// 设置公共字段
nameField.SetValue(person, "张三");
Console.WriteLine($"Name: {person.Name}"); // 输出: Name: 张三

// 获取公共字段
object nameValue = nameField.GetValue(person);
Console.WriteLine($"Name: {nameValue}"); // 输出: Name: 张三

// 访问私有字段
ageField.SetValue(person, 25);
int age = (int)ageField.GetValue(person);
Console.WriteLine($"Age: {age}"); // 输出: Age: 25

// 访问静态字段
countField.SetValue(null, 10);
int count = (int)countField.GetValue(null);
Console.WriteLine($"Count: {count}"); // 输出: Count: 10
```

#### 构造函数访问

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public Person() { }
    
    public Person(string name)
    {
        Name = name;
    }
    
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
    
    private Person(int age)
    {
        Age = age;
    }
}

// 获取构造函数
Type type = typeof(Person);

// 获取无参构造函数
ConstructorInfo defaultConstructor = type.GetConstructor(Type.EmptyTypes);
Person person1 = (Person)defaultConstructor.Invoke(null);

// 获取带参数的构造函数
ConstructorInfo constructor1 = type.GetConstructor(new Type[] { typeof(string) });
Person person2 = (Person)constructor1.Invoke(new object[] { "张三" });

ConstructorInfo constructor2 = type.GetConstructor(new Type[] { typeof(string), typeof(int) });
Person person3 = (Person)constructor2.Invoke(new object[] { "李四", 25 });

// 获取所有构造函数
ConstructorInfo[] constructors = type.GetConstructors();
foreach (ConstructorInfo ctor in constructors)
{
    Console.WriteLine($"构造函数参数: {ctor.GetParameters().Length}");
}

// 获取私有构造函数
ConstructorInfo privateConstructor = type.GetConstructor(
    BindingFlags.NonPublic | BindingFlags.Instance,
    null,
    new Type[] { typeof(int) },
    null);
Person person4 = (Person)privateConstructor.Invoke(new object[] { 30 });
```

### <a id="dynamic-object-creation"></a>动态创建对象

#### 使用Activator创建对象

```csharp
using System;

// 方式1：使用Activator.CreateInstance（无参构造函数）
Type type = typeof(Person);
Person person1 = (Person)Activator.CreateInstance(type);

// 方式2：带参数
Person person2 = (Person)Activator.CreateInstance(type, "张三", 25);

// 方式3：通过类型名创建
object person3 = Activator.CreateInstance("MyAssembly", "MyNamespace.Person");
object person4 = Activator.CreateInstance("MyAssembly", "MyNamespace.Person", false, 
    BindingFlags.Default, null, new object[] { "李四", 30 }, null, null);

// 方式4：使用泛型方法（编译时已知类型）
Person person5 = Activator.CreateInstance<Person>();
```

#### 使用构造函数创建对象

```csharp
// 性能更好的方式：使用ConstructorInfo
Type type = typeof(Person);
ConstructorInfo constructor = type.GetConstructor(new Type[] { typeof(string), typeof(int) });

// 创建委托以提高性能（只创建一次）
Func<string, int, Person> createPerson = (name, age) =>
    (Person)constructor.Invoke(new object[] { name, age });

// 使用委托创建对象（比直接Invoke快）
Person person = createPerson("张三", 25);
```

#### 使用表达式树创建对象（高性能）

```csharp
using System.Linq.Expressions;

// 创建对象工厂（编译后性能接近直接new）
public static class ObjectFactory
{
    public static Func<object> CreateFactory(Type type)
    {
        NewExpression newExpr = Expression.New(type);
        Expression<Func<object>> lambda = Expression.Lambda<Func<object>>(newExpr);
        return lambda.Compile();
    }
    
    public static Func<T> CreateFactory<T>()
    {
        return Expression.Lambda<Func<T>>(Expression.New(typeof(T))).Compile();
    }
}

// 使用
Func<Person> factory = ObjectFactory.CreateFactory<Person>();
Person person = factory(); // 性能接近 new Person()
```

### <a id="method-property-access"></a>方法调用与属性访问

#### 性能优化的方法调用

```csharp
using System.Reflection;

// 方式1：直接Invoke（最慢）
MethodInfo method = typeof(Calculator).GetMethod("Add");
Calculator calc = new Calculator();
int result = (int)method.Invoke(calc, new object[] { 10, 20 });

// 方式2：使用Delegate.CreateDelegate（较快）
MethodInfo addMethod = typeof(Calculator).GetMethod("Add");
Func<Calculator, int, int, int> addDelegate = 
    (Func<Calculator, int, int, int>)Delegate.CreateDelegate(
        typeof(Func<Calculator, int, int, int>), addMethod);
int result2 = addDelegate(calc, 10, 20);

// 方式3：使用表达式树编译（最快，接近直接调用）
using System.Linq.Expressions;

MethodInfo methodInfo = typeof(Calculator).GetMethod("Add");
ParameterExpression instance = Expression.Parameter(typeof(Calculator), "calc");
ParameterExpression param1 = Expression.Parameter(typeof(int), "a");
ParameterExpression param2 = Expression.Parameter(typeof(int), "b");
MethodCallExpression call = Expression.Call(instance, methodInfo, param1, param2);
Expression<Func<Calculator, int, int, int>> lambda = 
    Expression.Lambda<Func<Calculator, int, int, int>>(call, instance, param1, param2);
Func<Calculator, int, int, int> compiled = lambda.Compile();
int result3 = compiled(calc, 10, 20);
```

#### 属性访问优化

```csharp
// 方式1：直接GetValue/SetValue（较慢）
PropertyInfo property = typeof(Person).GetProperty("Name");
Person person = new Person();
property.SetValue(person, "张三");
string name = (string)property.GetValue(person);

// 方式2：使用委托（较快）
PropertyInfo nameProperty = typeof(Person).GetProperty("Name");

// 创建getter和setter委托
Func<Person, string> getter = (Func<Person, string>)Delegate.CreateDelegate(
    typeof(Func<Person, string>), nameProperty.GetMethod);
Action<Person, string> setter = (Action<Person, string>)Delegate.CreateDelegate(
    typeof(Action<Person, string>), nameProperty.SetMethod);

// 使用委托
setter(person, "李四");
string value = getter(person);
```

### <a id="generic-reflection"></a>泛型类型的反射

#### 处理泛型类型

```csharp
// 获取泛型类型定义
Type listType = typeof(List<>);
Type dictionaryType = typeof(Dictionary<,>);

// 创建封闭的泛型类型
Type stringListType = listType.MakeGenericType(typeof(string));
Type intStringDictType = dictionaryType.MakeGenericType(typeof(int), typeof(string));

// 创建泛型类型实例
object stringList = Activator.CreateInstance(stringListType);
object intStringDict = Activator.CreateInstance(intStringDictType);

// 调用泛型方法
public class GenericHelper
{
    public static T Create<T>() where T : new()
    {
        return new T();
    }
    
    public static void Process<T>(T item)
    {
        Console.WriteLine($"处理: {item}");
    }
}

// 使用反射调用泛型方法
MethodInfo createMethod = typeof(GenericHelper).GetMethod("Create");
MethodInfo genericCreateMethod = createMethod.MakeGenericMethod(typeof(Person));
Person person = (Person)genericCreateMethod.Invoke(null, null);

MethodInfo processMethod = typeof(GenericHelper).GetMethod("Process");
MethodInfo genericProcessMethod = processMethod.MakeGenericMethod(typeof(string));
genericProcessMethod.Invoke(null, new object[] { "测试" });

// 检查泛型类型
Type type = typeof(List<string>);
Console.WriteLine($"是泛型: {type.IsGenericType}");              // True
Console.WriteLine($"是泛型定义: {type.IsGenericTypeDefinition}"); // False
Console.WriteLine($"泛型参数: {string.Join(", ", type.GetGenericArguments().Select(t => t.Name))}");
```

### <a id="reflection-performance"></a>反射的性能优化

#### 缓存反射结果

```csharp
using System.Collections.Generic;

// 缓存Type对象
private static Dictionary<string, Type> _typeCache = new Dictionary<string, Type>();

public static Type GetCachedType(string typeName)
{
    if (!_typeCache.TryGetValue(typeName, out Type type))
    {
        type = Type.GetType(typeName);
        _typeCache[typeName] = type;
    }
    return type;
}

// 缓存MethodInfo
private static Dictionary<string, MethodInfo> _methodCache = new Dictionary<string, MethodInfo>();

public static MethodInfo GetCachedMethod(Type type, string methodName, Type[] parameterTypes)
{
    string key = $"{type.FullName}.{methodName}({string.Join(",", parameterTypes.Select(t => t.Name))})";
    
    if (!_methodCache.TryGetValue(key, out MethodInfo method))
    {
        method = type.GetMethod(methodName, parameterTypes);
        _methodCache[key] = method;
    }
    return method;
}

// 缓存编译后的委托
private static Dictionary<string, Delegate> _delegateCache = new Dictionary<string, Delegate>();

public static Func<T, TResult> GetCachedGetter<T, TResult>(PropertyInfo property)
{
    string key = $"{typeof(T).FullName}.{property.Name}.Getter";
    
    if (!_delegateCache.TryGetValue(key, out Delegate del))
    {
        MethodInfo getter = property.GetMethod;
        del = Delegate.CreateDelegate(typeof(Func<T, TResult>), getter);
        _delegateCache[key] = del;
    }
    
    return (Func<T, TResult>)del;
}
```

### <a id="reflection-scenarios"></a>反射的应用场景

#### 1. 对象映射（Object Mapper）

```csharp
public static class ObjectMapper
{
    public static TTarget Map<TSource, TTarget>(TSource source) where TTarget : new()
    {
        TTarget target = new TTarget();
        Type sourceType = typeof(TSource);
        Type targetType = typeof(TTarget);
        
        foreach (PropertyInfo targetProperty in targetType.GetProperties())
        {
            PropertyInfo sourceProperty = sourceType.GetProperty(targetProperty.Name);
            
            if (sourceProperty != null && sourceProperty.PropertyType == targetProperty.PropertyType)
            {
                object value = sourceProperty.GetValue(source);
                targetProperty.SetValue(target, value);
            }
        }
        
        return target;
    }
}

// 使用
public class Source
{
    public string Name { get; set; }
    public int Age { get; set; }
}

public class Target
{
    public string Name { get; set; }
    public int Age { get; set; }
}

Source source = new Source { Name = "张三", Age = 25 };
Target target = ObjectMapper.Map<Source, Target>(source);
```

#### 2. 依赖注入容器

```csharp
public class SimpleContainer
{
    private Dictionary<Type, Type> _mappings = new Dictionary<Type, Type>();
    private Dictionary<Type, object> _singletons = new Dictionary<Type, object>();
    
    public void Register<TInterface, TImplementation>() where TImplementation : TInterface
    {
        _mappings[typeof(TInterface)] = typeof(TImplementation);
    }
    
    public void RegisterSingleton<TInterface, TImplementation>() where TImplementation : TInterface
    {
        _mappings[typeof(TInterface)] = typeof(TImplementation);
    }
    
    public T Resolve<T>()
    {
        return (T)Resolve(typeof(T));
    }
    
    private object Resolve(Type type)
    {
        // 检查单例
        if (_singletons.ContainsKey(type))
        {
            return _singletons[type];
        }
        
        // 获取实现类型
        Type implementationType = _mappings.ContainsKey(type) ? _mappings[type] : type;
        
        // 获取构造函数
        ConstructorInfo constructor = implementationType.GetConstructors()[0];
        ParameterInfo[] parameters = constructor.GetParameters();
        
        // 解析参数
        object[] resolvedParameters = parameters.Select(p => Resolve(p.ParameterType)).ToArray();
        
        // 创建实例
        object instance = constructor.Invoke(resolvedParameters);
        
        // 如果是单例，缓存
        if (_singletons.ContainsKey(type))
        {
            _singletons[type] = instance;
        }
        
        return instance;
    }
}
```

#### 3. 序列化器

```csharp
public static class SimpleSerializer
{
    public static string Serialize(object obj)
    {
        Type type = obj.GetType();
        var properties = type.GetProperties();
        
        var keyValues = properties.Select(p => 
            $"\"{p.Name}\":\"{p.GetValue(obj)}\"");
        
        return "{" + string.Join(",", keyValues) + "}";
    }
    
    public static T Deserialize<T>(string json) where T : new()
    {
        T obj = new T();
        Type type = typeof(T);
        
        // 简化的JSON解析（实际应使用JSON库）
        // 这里仅演示反射的使用
        
        return obj;
    }
}
```

反射是C#中强大的运行时类型操作机制，它使得程序能够动态地处理类型、创建对象和调用方法。虽然反射有一定的性能开销，但在框架开发、插件系统、序列化等场景中，反射是不可或缺的工具。通过合理使用缓存和委托，可以在保持灵活性的同时提高性能。

## <a id="async-programming"></a>C#异步编程详解

异步编程是C#中处理耗时操作（如I/O操作、网络请求等）的重要技术。通过异步编程，可以在等待耗时操作完成的同时，不阻塞主线程，从而提高应用程序的响应性和性能。在现代C#开发中，`async/await`关键字使得异步编程变得简单而优雅。

### <a id="async-basics"></a>异步编程基础

#### 为什么需要异步编程？

在传统的同步编程中，当执行耗时操作（如读取大文件、网络请求）时，程序会阻塞等待操作完成，导致用户界面冻结、应用程序无响应等问题。异步编程通过非阻塞的方式处理这些操作，让程序在等待期间可以继续执行其他任务。

```csharp
// 同步方式：会阻塞线程
private void LoadFileSync()
{
    string content = File.ReadAllText("largefile.txt"); // 阻塞，UI冻结
    textBox1.Text = content;
}

// 异步方式：不阻塞线程
private async void LoadFileAsync()
{
    string content = await File.ReadAllTextAsync("largefile.txt"); // 不阻塞，UI保持响应
    textBox1.Text = content;
}
```

#### 异步编程的核心概念

1. **异步方法**：使用`async`关键字标记的方法
2. **await表达式**：等待异步操作完成，但不阻塞当前线程
3. **Task和Task\<T>**：表示异步操作的返回类型
4. **异步状态机**：编译器将异步方法转换为状态机

### <a id="async-await"></a>async/await关键字

#### async关键字

`async`关键字用于标记一个方法是异步方法。异步方法必须返回`void`、`Task`或`Task<T>`类型。

```csharp
// 返回Task的异步方法
public async Task DoWorkAsync()
{
    await Task.Delay(1000); // 模拟异步操作
    Console.WriteLine("工作完成");
}

// 返回Task<T>的异步方法
public async Task<string> GetDataAsync()
{
    await Task.Delay(1000);
    return "数据";
}

// 异步事件处理程序（返回void）
private async void button1_Click(object sender, EventArgs e)
{
    await DoWorkAsync();
}
```

#### await关键字

`await`关键字用于等待异步操作完成。它只能在`async`方法中使用。

```csharp
public async Task<string> DownloadFileAsync(string url)
{
    using (HttpClient client = new HttpClient())
    {
        // await等待
        异步操作完成
        string content = await client.GetStringAsync(url);
        return content;
    }
}
```

#### async/await的工作原理

当遇到`await`表达式时：
1. 如果异步操作已完成，方法继续同步执行
2. 如果异步操作未完成，方法返回调用者，不阻塞线程
3. 当异步操作完成时，方法从`await`处继续执行

```csharp
public async Task ProcessDataAsync()
{
    Console.WriteLine("开始处理");
    
    // 第一个异步操作
    string data1 = await FetchDataAsync("url1");
    Console.WriteLine($"数据1: {data1}");
    
    // 第二个异步操作
    string data2 = await FetchDataAsync("url2");
    Console.WriteLine($"数据2: {data2}");
    
    // 处理数据
    ProcessData(data1, data2);
    Console.WriteLine("处理完成");
}
```

### <a id="task-types"></a>Task与Task\<T>

#### Task类型

`Task`表示一个没有返回值的异步操作。

```csharp
// 创建并启动Task
Task task = Task.Run(() =>
{
    Console.WriteLine("在后台线程执行");
    Thread.Sleep(1000);
});

// 等待Task完成
await task;
Console.WriteLine("Task完成");

// 使用Task.Delay延迟
await Task.Delay(2000); // 延迟2秒
```

#### Task<T>类型

`Task<T>`表示一个返回类型为`T`的异步操作。

```csharp
// 创建返回值的Task
Task<int> task = Task.Run(() =>
{
    Thread.Sleep(1000);
    return 42;
});

// 获取结果
int result = await task;
Console.WriteLine($"结果: {result}");

// 异步方法返回Task<T>
public async Task<int> CalculateAsync()
{
    await Task.Delay(1000);
    return 100;
}
```

#### Task的常用方法

```csharp
// Task.Run：在线程池中执行代码
Task task1 = Task.Run(() => DoWork());

// Task.Delay：异步延迟
await Task.Delay(1000);

// Task.WhenAll：等待所有任务完成
Task task1 = DoWork1Async();
Task task2 = DoWork2Async();
Task task3 = DoWork3Async();
await Task.WhenAll(task1, task2, task3);

// Task.WhenAny：等待任意一个任务完成
Task<int> task1 = GetData1Async();
Task<int> task2 = GetData2Async();
Task<int> completedTask = await Task.WhenAny(task1, task2);
int result = await completedTask;

// Task.FromResult：创建已完成的任务
Task<string> completedTask = Task.FromResult("已完成");
string result = await completedTask;
```

### <a id="async-best-practices"></a>异步方法最佳实践

#### 1. 避免async void

除了事件处理程序外，应避免使用`async void`。使用`async Task`代替。

```csharp
// ❌ 错误：async void（除了事件处理程序）
public async void BadMethod()
{
    await DoWorkAsync();
}

// ✅ 正确：async Task
public async Task GoodMethod()
{
    await DoWorkAsync();
}
```

#### 2. 使用ConfigureAwait(false)

在库代码中，如果不需要在原始上下文中继续执行，使用`ConfigureAwait(false)`可以提高性能。

```csharp
// 在库代码中
public async Task<string> GetDataAsync()
{
    using (var client = new HttpClient())
    {
        // 不需要返回到UI线程，使用ConfigureAwait(false)
        string result = await client.GetStringAsync(url).ConfigureAwait(false);
        return result;
    }
}
```

#### 3. 异常处理

异步方法中的异常会被包装在`Task`中，需要使用`try-catch`捕获。

```csharp
public async Task ProcessDataAsync()
{
    try
    {
        string data = await FetchDataAsync("url");
        ProcessData(data);
    }
    catch (HttpRequestException ex)
    {
        Console.WriteLine($"网络错误: {ex.Message}");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"错误: {ex.Message}");
    }
}

// 多个异步操作的异常处理
public async Task ProcessMultipleAsync()
{
    try
    {
        await Task.WhenAll(
            Process1Async(),
            Process2Async(),
            Process3Async()
        );
    }
    catch (AggregateException ex)
    {
        foreach (var innerEx in ex.InnerExceptions)
        {
            Console.WriteLine($"错误: {innerEx.Message}");
        }
    }
}
```

#### 4. 取消操作

`CancellationTokenSource`（简称cts）和`CancellationToken`是.NET中用于支持异步操作取消的核心机制。它们提供了一种优雅的方式来取消长时间运行的操作，避免资源浪费。

##### CancellationTokenSource基础

`CancellationTokenSource`用于创建和管理`CancellationToken`，后者被传递给异步方法以支持取消。

```csharp
// 创建CancellationTokenSource
CancellationTokenSource cts = new CancellationTokenSource();

// 获取CancellationToken
CancellationToken token = cts.Token;

// 启动异步操作
Task task = LongRunningOperationAsync(token);

// 取消操作
cts.Cancel();

try
{
    await task;
}
catch (OperationCanceledException ex)
{
    Console.WriteLine($"操作已取消: {ex.Message}");
}

async Task LongRunningOperationAsync(CancellationToken cancellationToken)
{
    for (int i = 0; i < 100; i++)
    {
        // 方式1：抛出OperationCanceledException
        cancellationToken.ThrowIfCancellationRequested();
        
        // 方式2：手动检查并处理
        if (cancellationToken.IsCancellationRequested)
        {
            Console.WriteLine("操作被取消，执行清理逻辑");
            break;
        }
        
        await Task.Delay(100); // 模拟耗时操作
        Console.WriteLine($"进度: {i + 1}%");
    }
}
```

##### CancellationTokenSource高级用法

###### 1. 超时自动取消

```csharp
// 创建3秒后自动取消的CancellationTokenSource
CancellationTokenSource timeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(3));

// 或者后续设置超时
timeoutCts = new CancellationTokenSource();
timeoutCts.CancelAfter(TimeSpan.FromSeconds(3));

try
{
    await LongRunningOperationAsync(timeoutCts.Token);
    Console.WriteLine("操作成功完成");
}
catch (OperationCanceledException)
{
    Console.WriteLine("操作超时被取消");
}
```

###### 2. 链接多个CancellationTokenSource

```csharp
// 主取消源
CancellationTokenSource mainCts = new CancellationTokenSource();

// 超时取消源
CancellationTokenSource timeoutCts = new CancellationTokenSource(TimeSpan.FromSeconds(5));

// 链接两个取消源，任何一个取消都会触发
CancellationTokenSource linkedCts = CancellationTokenSource.CreateLinkedTokenSource(mainCts.Token, timeoutCts.Token);

try
{
    await LongRunningOperationAsync(linkedCts.Token);
}
catch (OperationCanceledException)
{
    if (mainCts.IsCancellationRequested)
        Console.WriteLine("操作被手动取消");
    else if (timeoutCts.IsCancellationRequested)
        Console.WriteLine("操作超时被取消");
}

// 手动取消
// mainCts.Cancel();
```

###### 3. 注册取消回调

```csharp
CancellationTokenSource cts = new CancellationTokenSource();

// 注册取消回调
CancellationTokenRegistration registration = cts.Token.Register(() =>
{
    Console.WriteLine("取消回调被触发，执行清理逻辑");
    // 可以在这里执行资源清理、日志记录等操作
});

try
{
    await LongRunningOperationAsync(cts.Token);
}
catch (OperationCanceledException)
{
    Console.WriteLine("操作已取消");
}
finally
{
    // 取消注册（可选，尤其是在using块外使用时）
    registration.Dispose();
    cts.Dispose();
}
```

###### 4. 异步方法中的取消协作

```csharp
async Task DownloadFileAsync(string url, string destination, CancellationToken cancellationToken)
{
    using (HttpClient client = new HttpClient())
    {
        // 使用支持取消的异步方法
        using (HttpResponseMessage response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, cancellationToken))
        {
            response.EnsureSuccessStatusCode();
            
            using (Stream contentStream = await response.Content.ReadAsStreamAsync(cancellationToken))
            using (FileStream fileStream = new FileStream(destination, FileMode.Create, FileAccess.Write, FileShare.None, 8192, true))
            {
                // 使用CopyToAsync，它支持取消
                await contentStream.CopyToAsync(fileStream, 8192, cancellationToken);
            }
        }
    }
}
```

##### CancellationToken最佳实践

1. **始终接受CancellationToken参数**：为所有长时间运行的异步方法添加可选的`CancellationToken`参数

```csharp
// 推荐写法
async Task DoWorkAsync(CancellationToken cancellationToken = default)
{
    // 方法实现
}
```

2. **适当检查取消状态**：在耗时操作开始前、循环迭代中、I/O操作前后检查取消状态

3. **使用支持取消的异步方法**：优先使用内置支持`CancellationToken`的.NET方法，如`Task.Delay`、`HttpClient.GetAsync`等

4. **正确处理OperationCanceledException**：取消操作不是错误，应适当处理

5. **释放资源**：确保在取消时正确释放资源

6. **避免过度检查**：在非常频繁的循环中，适当减少检查频率

7. **使用using语句**：正确释放`CancellationTokenSource`

```csharp
using (CancellationTokenSource cts = new CancellationTokenSource())
{
    // 使用cts
}
```

##### 完整示例：用户取消的文件下载

```csharp
class FileDownloader
{
    public async Task DownloadAsync(string url, string destination, IProgress<int> progress = null, CancellationToken cancellationToken = default)
    {
        using (HttpClient client = new HttpClient())
        {
            using (HttpResponseMessage response = await client.GetAsync(url, HttpCompletionOption.ResponseHeadersRead, cancellationToken))
            {
                response.EnsureSuccessStatusCode();
                
                long? totalBytes = response.Content.Headers.ContentLength;
                long downloadedBytes = 0;
                
                using (Stream contentStream = await response.Content.ReadAsStreamAsync(cancellationToken))
                using (FileStream fileStream = new FileStream(destination, FileMode.Create, FileAccess.Write, FileShare.None, 8192, true))
                {
                    byte[] buffer = new byte[8192];
                    int bytesRead;
                    
                    while ((bytesRead = await contentStream.ReadAsync(buffer, 0, buffer.Length, cancellationToken)) > 0)
                    {
                        await fileStream.WriteAsync(buffer, 0, bytesRead, cancellationToken);
                        
                        downloadedBytes += bytesRead;
                        
                        // 报告进度
                        if (totalBytes.HasValue && progress != null)
                        {
                            int percent = (int)((downloadedBytes * 100) / totalBytes.Value);
                            progress.Report(percent);
                        }
                    }
                }
            }
        }
    }
}

// 使用示例
async Task Main()
{
    var downloader = new FileDownloader();
    var progress = new Progress<int>(percent =>
    {
        Console.WriteLine($"下载进度: {percent}%");
    });
    
    using (CancellationTokenSource cts = new CancellationTokenSource())
    {
        // 模拟用户在2秒后取消
        _ = Task.Delay(2000).ContinueWith(_ =>
        {
            Console.WriteLine("用户取消了下载");
            cts.Cancel();
        });
        
        try
        {
            await downloader.DownloadAsync(
                "https://example.com/large-file.zip",
                "large-file.zip",
                progress,
                cts.Token);
            Console.WriteLine("下载完成");
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("下载已取消");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"下载出错: {ex.Message}");
        }
    }
}
```

##### CancellationToken在UI中的应用

在WinForm、WPF等UI应用中，`CancellationTokenSource`常用于处理用户取消操作，如取消按钮点击：

```csharp
private CancellationTokenSource _cts;

private async void btnStart_Click(object sender, EventArgs e)
{
    btnStart.Enabled = false;
    btnCancel.Enabled = true;
    
    // 创建新的CancellationTokenSource
    _cts = new CancellationTokenSource();
    
    try
    {
        var progress = new Progress<int>(value =>
        {
            progressBar.Value = value;
        });
        
        await LongRunningOperationAsync(progress, _cts.Token);
        MessageBox.Show("操作完成");
    }
    catch (OperationCanceledException)
    {
        MessageBox.Show("操作已取消");
    }
    catch (Exception ex)
    {
        MessageBox.Show($"错误: {ex.Message}");
    }
    finally
    {
        _cts.Dispose();
        _cts = null;
        btnStart.Enabled = true;
        btnCancel.Enabled = false;
    }
}

private void btnCancel_Click(object sender, EventArgs e)
{
    // 取消操作
    _cts?.Cancel();
}

async Task LongRunningOperationAsync(IProgress<int> progress, CancellationToken cancellationToken)
{
    for (int i = 0; i <= 100; i += 5)
    {
        cancellationToken.ThrowIfCancellationRequested();
        await Task.Delay(200);
        progress.Report(i);
    }
}
```

通过合理使用`CancellationTokenSource`和`CancellationToken`，可以使异步操作更加健壮、高效，并提供更好的用户体验。

#### 5. 异步异常捕获

异步操作中的异常处理是一个重要话题，特别是当涉及到父task和子task之间的异常传播时。

##### 基本的异步异常捕获

在异步方法中，可以使用标准的`try-catch`块来捕获异常：

```csharp
async Task DoWorkAsync()
{
    try
    {
        await Task.Delay(100);
        throw new InvalidOperationException("异步操作中的异常");
    }
    catch (InvalidOperationException ex)
    {
        Console.WriteLine($"捕获到异常: {ex.Message}");
    }
}

// 调用异步方法
try
{
    await DoWorkAsync();
}
catch (Exception ex)
{
    Console.WriteLine($"调用者捕获到异常: {ex.Message}");
}
```

##### 父Task与子Task的异常关系

当一个Task内部创建并等待其他Task时，会形成父Task与子Task的关系。异常在这种关系中的传播方式取决于Task的创建方式。

###### 1. 同步等待子Task（使用await）

当使用`await`关键字等待子Task时，子Task的异常会直接冒泡到父Task：

```csharp
async Task ParentTaskAsync()
{
    Console.WriteLine("父Task开始");
    
    try
    {
        await ChildTaskAsync(); // 同步等待子Task
        Console.WriteLine("父Task完成");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"父Task捕获到子Task的异常: {ex.Message}");
    }
}

async Task ChildTaskAsync()
{
    Console.WriteLine("子Task开始");
    await Task.Delay(100);
    throw new Exception("子Task抛出异常");
}

// 输出:
// 父Task开始
// 子Task开始
// 父Task捕获到子Task的异常: 子Task抛出异常
```

###### 2. 异步创建子Task（使用Task.Run但不await）

当使用`Task.Run`创建子Task但不立即等待时，子Task的异常不会自动传播到父Task，除非显式等待：

```csharp
async Task ParentTaskAsync()
{
    Console.WriteLine("父Task开始");
    
    // 创建子Task但不等待
    Task childTask = Task.Run(async () =>
    {
        Console.WriteLine("子Task开始");
        await Task.Delay(100);
        throw new Exception("子Task抛出异常");
    });
    
    // 做一些其他工作
    await Task.Delay(50);
    Console.WriteLine("父Task继续执行");
    
    try
    {
        await childTask; // 显式等待子Task，此时异常会传播
        Console.WriteLine("父Task完成");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"父Task捕获到子Task的异常: {ex.Message}");
    }
}

// 输出:
// 父Task开始
// 子Task开始
// 父Task继续执行
// 父Task捕获到子Task的异常: 子Task抛出异常
```

##### 异常冒泡机制

在异步编程中，异常冒泡遵循以下规则：

1. **使用await时**：子Task的异常会直接冒泡到父Task，父Task的`try-catch`可以捕获到
2. **使用Task.Wait()或Task.Result时**：异常会被包装在`AggregateException`中抛出
3. **未等待的Task**：异常会被存储在Task对象中，直到Task被等待或其异常被观察到
4. **子Task异常**：当父Task包含多个子Task时，所有异常会被包装在`AggregateException`中

###### AggregateException处理

当使用`Task.Wait()`、`Task.Result`或`Task.WaitAll()`时，多个异常会被包装在`AggregateException`中：

```csharp
async Task HandleMultipleExceptionsAsync()
{
    Task task1 = Task.Run(() =>
    {
        throw new InvalidOperationException("异常1");
    });
    
    Task task2 = Task.Run(() =>
    {
        throw new ArgumentException("异常2");
    });
    
    // 使用Task.WaitAll()等待多个Task
    try
    {
        Task.WaitAll(task1, task2);
    }
    catch (AggregateException ex)
    {
        Console.WriteLine($"捕获到AggregateException，包含{ex.InnerExceptions.Count}个异常:");
        
        // 遍历所有内部异常
        foreach (Exception innerEx in ex.InnerExceptions)
        {
            Console.WriteLine($"- {innerEx.GetType().Name}: {innerEx.Message}");
        }
        
        // 仅处理特定类型的异常
        ex.Handle(innerEx =>
        {
            if (innerEx is InvalidOperationException)
            {
                Console.WriteLine($"已处理InvalidOperationException: {innerEx.Message}");
                return true; // 返回true表示已处理
            }
            return false; // 返回false表示未处理，会重新抛出
        });
    }
}
```

###### Task.WhenAll()与异常

`Task.WhenAll()`与`Task.WaitAll()`的异常处理不同：

- `Task.WaitAll()`：阻塞调用线程，异常包装在`AggregateException`中
- `Task.WhenAll()`：异步等待，只抛出第一个异常，其他异常会被忽略

```csharp
async Task CompareWaitAllAndWhenAll()
{
    Task task1 = Task.Run(() => { throw new Exception("异常1"); });
    Task task2 = Task.Run(() => { throw new Exception("异常2"); });
    
    // 使用Task.WhenAll()
    try
    {
        await Task.WhenAll(task1, task2);
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Task.WhenAll()抛出: {ex.Message}"); // 只抛出第一个异常
    }
    
    // 使用Task.WaitAll()
    try
    {
        Task.WaitAll(task1, task2);
    }
    catch (AggregateException ex)
    {
        Console.WriteLine($"Task.WaitAll()抛出AggregateException，包含{ex.InnerExceptions.Count}个异常");
    }
}
```

##### 未观察到的异常

在.NET 4.0中，未观察到的Task异常会导致应用程序崩溃。从.NET 4.5开始，未观察到的异常会被`TaskScheduler.UnobservedTaskException`事件捕获，默认不会导致应用程序崩溃，但会被记录到事件日志。

```csharp
// 注册未观察到的异常事件
TaskScheduler.UnobservedTaskException += (sender, e) =>
{
    Console.WriteLine($"捕获到未观察到的Task异常: {e.Exception.Message}");
    e.SetObserved(); // 标记异常为已观察
};

// 创建并启动Task，但不等待（会产生未观察到的异常）
Task.Run(() =>
{
    throw new Exception("未观察到的异常");
});

// 强制垃圾回收，触发未观察到的异常事件
GC.Collect();
GC.WaitForPendingFinalizers();
```

##### 异步异常处理最佳实践

1. **始终等待Task**：避免创建未观察到的异常
2. **使用await而非Task.Wait()或Task.Result**：避免死锁和AggregateException包装
3. **使用Task.WhenAll()处理多个异步操作**：异步等待多个Task，提高性能
4. **正确处理AggregateException**：当使用同步等待时，记得遍历内部异常
5. **注册UnobservedTaskException事件**：捕获未观察到的异常，便于调试
6. **在异步方法中使用try-catch**：在适当的层级处理异常，提高代码可读性
7. **避免在finally块中使用await**：finally块中的await可能导致异常丢失

##### 完整示例：父Task与子Task异常处理

```csharp
async Task ParentChildExceptionDemo()
{
    Console.WriteLine("=== 父Task与子Task异常处理演示 ===");
    
    // 创建三个子Task，其中两个会抛出异常
    Task task1 = ChildTaskAsync(1, false); // 成功
    Task task2 = ChildTaskAsync(2, true);  // 抛出异常
    Task task3 = ChildTaskAsync(3, true);  // 抛出异常
    
    // 方式1：使用await Task.WhenAll()
    Console.WriteLine("\n--- 方式1：使用await Task.WhenAll() ---");
    try
    {
        await Task.WhenAll(task1, task2, task3);
        Console.WriteLine("所有Task成功完成");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Task.WhenAll()捕获到: {ex.Message}");
        // 检查其他Task的状态
        Console.WriteLine($"Task1状态: {task1.Status}");
        Console.WriteLine($"Task2状态: {task2.Status}");
        Console.WriteLine($"Task3状态: {task3.Status}");
    }
    
    // 方式2：分别等待每个Task
    Console.WriteLine("\n--- 方式2：分别等待每个Task ---");
    List<Task> tasks = new List<Task>
    {
        ChildTaskAsync(4, false),
        ChildTaskAsync(5, true),
        ChildTaskAsync(6, true)
    };
    
    foreach (Task task in tasks)
    {
        try
        {
            await task;
            Console.WriteLine($"Task {GetTaskId(task)} 成功");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Task {GetTaskId(task)} 失败: {ex.Message}");
        }
    }
}

async Task ChildTaskAsync(int id, bool throwException)
{
    Console.WriteLine($"ChildTask {id} 开始");
    await Task.Delay(100);
    
    if (throwException)
    {
        throw new Exception($"ChildTask {id} 抛出异常");
    }
    
    Console.WriteLine($"ChildTask {id} 完成");
}

// 辅助方法：获取Task的ID（简化示例）
int GetTaskId(Task task)
{
    // 实际应用中，应该通过其他方式跟踪Task ID
    return task.GetHashCode() % 1000;
}
```

通过理解异步异常的传播机制和正确的处理方式，可以编写更加健壮、可靠的异步代码，避免隐藏的bug和难以调试的问题。

### <a id="async-winform"></a>异步编程与WinForm集成

在WinForm应用程序中，异步编程特别重要，可以保持UI响应性。

#### 异步加载数据

```csharp
// WinForm窗体中的异步方法
public partial class MainForm : Form
{
    private async void btnLoadData_Click(object sender, EventArgs e)
    {
        btnLoadData.Enabled = false;
        progressBar1.Visible = true;
        
        try
        {
            // 异步加载数据，不阻塞UI线程
            string data = await LoadDataFromFileAsync("data.txt");
            
            // 更新UI（自动返回到UI线程）
            textBox1.Text = data;
            labelStatus.Text = "加载成功";
        }
        catch (Exception ex)
        {
            MessageBox.Show($"加载失败: {ex.Message}", "错误", 
                MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
        finally
        {
            btnLoadData.Enabled = true;
            progressBar1.Visible = false;
        }
    }
    
    private async Task<string> LoadDataFromFileAsync(string filePath)
    {
        // 使用异步文件读取
        using (StreamReader reader = new StreamReader(filePath))
        {
            return await reader.ReadToEndAsync();
        }
    }
}
```

#### 异步网络请求

```csharp
public partial class MainForm : Form
{
    private async void btnDownload_Click(object sender, EventArgs e)
    {
        btnDownload.Enabled = false;
        progressBar1.Value = 0;
        
        try
        {
            using (HttpClient client = new HttpClient())
            {
                // 异步下载文件
                byte[] data = await client.GetByteArrayAsync("https://example.com/file.zip");
                
                // 异步保存文件
                await File.WriteAllBytesAsync("downloaded.zip", data);
                
                MessageBox.Show("下载完成！", "成功", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
        }
        catch (HttpRequestException ex)
        {
            MessageBox.Show($"网络错误: {ex.Message}", "错误", 
                MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
        catch (Exception ex)
        {
            MessageBox.Show($"错误: {ex.Message}", "错误", 
                MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
        finally
        {
            btnDownload.Enabled = true;
        }
    }
}
```

#### 异步进度报告

```csharp
public partial class MainForm : Form
{
    private async void btnProcess_Click(object sender, EventArgs e)
    {
        btnProcess.Enabled = false;
        progressBar1.Value = 0;
        
        // 使用Progress<T>报告进度
        var progress = new Progress<int>(percent =>
        {
            progressBar1.Value = percent;
            labelProgress.Text = $"{percent}%";
        });
        
        try
        {
            await ProcessDataAsync(progress);
            MessageBox.Show("处理完成！", "成功", 
                MessageBoxButtons.OK, MessageBoxIcon.Information);
        }
        catch (Exception ex)
        {
            MessageBox.Show($"处理失败: {ex.Message}", "错误", 
                MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
        finally
        {
            btnProcess.Enabled = true;
        }
    }
    
    private async Task ProcessDataAsync(IProgress<int> progress)
    {
        for (int i = 0; i <= 100; i++)
        {
            // 模拟处理
            await Task.Delay(50);
            
            // 报告进度
            progress?.Report(i);
        }
    }
}
```

#### 异步数据库操作

```csharp
public partial class MainForm : Form
{
    private async void btnLoadUsers_Click(object sender, EventArgs e)
    {
        dataGridView1.DataSource = null;
        labelStatus.Text = "加载中...";
        
        try
        {
            // 异步加载数据
            List<User> users = await LoadUsersFromDatabaseAsync();
            
            // 更新UI
            dataGridView1.DataSource = users;
            labelStatus.Text = $"已加载 {users.Count} 条记录";
        }
        catch (Exception ex)
        {
            MessageBox.Show($"加载失败: {ex.Message}", "错误", 
                MessageBoxButtons.OK, MessageBoxIcon.Error);
        }
    }
    
    private async Task<List<User>> LoadUsersFromDatabaseAsync()
    {
        // 模拟异步数据库查询
        await Task.Delay(1000);
        
        return new List<User>
        {
            new User { Id = 1, Name = "张三", Email = "zhangsan@example.com" },
            new User { Id = 2, Name = "李四", Email = "lisi@example.com" },
            new User { Id = 3, Name = "王五", Email = "wangwu@example.com" }
        };
    }
}

public class User
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}
```

## <a id="file-stream"></a>C#文件操作与流处理

文件操作和流处理是C#中处理数据输入输出的核心功能。通过流（Stream），可以高效地读写文件、处理网络数据、操作内存数据等。

### <a id="file-basics"></a>文件操作基础

#### File类

`File`类提供了静态方法用于文件操作，适合简单的文件读写。

```csharp
// 读取文件内容
string content = File.ReadAllText("file.txt", Encoding.UTF8);

// 写入文件内容
File.WriteAllText("file.txt", "Hello World", Encoding.UTF8);

// 追加内容
File.AppendAllText("file.txt", "\n追加内容", Encoding.UTF8);

// 读取所有行
string[] lines = File.ReadAllLines("file.txt", Encoding.UTF8);

// 写入所有行
File.WriteAllLines("file.txt", lines, Encoding.UTF8);

// 读取字节数组
byte[] bytes = File.ReadAllBytes("file.bin");

// 写入字节数组
File.WriteAllBytes("file.bin", bytes);

// 检查文件是否存在
if (File.Exists("file.txt"))
{
    // 文件存在
}

// 删除文件
File.Delete("file.txt");

// 复制文件
File.Copy("source.txt", "dest.txt", overwrite: true);

// 移动文件
File.Move("old.txt", "new.txt");
```

#### FileInfo类

`FileInfo`类提供了实例方法用于文件操作，适合需要多次操作同一文件。

```csharp
FileInfo fileInfo = new FileInfo("file.txt");

// 检查文件是否存在
if (fileInfo.Exists)
{
    // 获取文件信息
    long size = fileInfo.Length;
    DateTime created = fileInfo.CreationTime;
    DateTime modified = fileInfo.LastWriteTime;
    
    // 读取文件
    string content = File.ReadAllText(fileInfo.FullName);
    
    // 删除文件
    fileInfo.Delete();
}
```

#### Directory类

`Directory`类用于目录操作。

```csharp
// 创建目录
Directory.CreateDirectory("NewFolder");

// 检查目录是否存在
if (Directory.Exists("Folder"))
{
    // 目录存在
}

// 获取目录中的所有文件
string[] files = Directory.GetFiles("Folder");

// 获取目录中的所有子目录
string[] directories = Directory.GetDirectories("Folder");

// 删除目录
Directory.Delete("Folder", recursive: true);
```

### <a id="stream-overview"></a>流（Stream）概述

流是C#中处理数据输入输出的抽象基类，提供了统一的接口来处理不同类型的数据源（文件、内存、网络等）。

#### Stream类的层次结构

```
Stream (抽象基类)
├── FileStream (文件流)
├── MemoryStream (内存流)
├── NetworkStream (网络流)
├── BufferedStream (缓冲流)
└── 其他流类型
```

#### Stream的常用属性和方法

```csharp
// 属性
long Length { get; }           // 流的长度
long Position { get; set; }    // 流的当前位置
bool CanRead { get; }          // 是否可读
bool CanWrite { get; }         // 是否可写
bool CanSeek { get; }          // 是否可定位

// 方法
int Read(byte[] buffer, int offset, int count);      // 读取数据
void Write(byte[] buffer, int offset, int count);   // 写入数据
long Seek(long offset, SeekOrigin origin);           // 定位
void Flush();                                        // 刷新缓冲区
void Close();                                        // 关闭流
```

### <a id="filestream"></a>FileStream文件流

`FileStream`用于读写文件，提供了对文件的底层访问。

#### FileStream的基本使用

```csharp
// 创建FileStream（写入模式）
using (FileStream fs = new FileStream("file.txt", FileMode.Create, FileAccess.Write))
{
    string text = "Hello World";
    byte[] bytes = Encoding.UTF8.GetBytes(text);
    fs.Write(bytes, 0, bytes.Length);
    fs.Flush(); // 确保数据写入磁盘
}

// 创建FileStream（读取模式）
using (FileStream fs = new FileStream("file.txt", FileMode.Open, FileAccess.Read))
{
    byte[] buffer = new byte[1024];
    int bytesRead = fs.Read(buffer, 0, buffer.Length);
    string text = Encoding.UTF8.GetString(buffer, 0, bytesRead);
    Console.WriteLine(text);
}

// FileMode枚举
// Create: 创建新文件，如果存在则覆盖
// Open: 打开现有文件
// OpenOrCreate: 打开文件，如果不存在则创建
// Append: 追加模式
// Truncate: 截断文件

// FileAccess枚举
// Read: 只读
// Write: 只写
// ReadWrite: 读写
```

#### FileStream的异步操作

```csharp
// 异步写入
public async Task WriteFileAsync(string filePath, string content)
{
    using (FileStream fs = new FileStream(filePath, FileMode.Create, FileAccess.Write, FileShare.None, 4096, true))
    {
        byte[] bytes = Encoding.UTF8.GetBytes(content);
        await fs.WriteAsync(bytes, 0, bytes.Length);
        await fs.FlushAsync();
    }
}

// 异步读取
public async Task<string> ReadFileAsync(string filePath)
{
    using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read, 4096, true))
    {
        byte[] buffer = new byte[fs.Length];
        await fs.ReadAsync(buffer, 0, (int)fs.Length);
        return Encoding.UTF8.GetString(buffer);
    }
}
```

### <a id="stream-reader-writer"></a>StreamReader和StreamWriter

`StreamReader`和`StreamWriter`提供了对文本文件的便捷读写操作。

#### StreamReader的使用

```csharp
// 读取整个文件
using (StreamReader reader = new StreamReader("file.txt", Encoding.UTF8))
{
    string content = reader.ReadToEnd();
    Console.WriteLine(content);
}

// 逐行读取
using (StreamReader reader = new StreamReader("file.txt", Encoding.UTF8))
{
    string line;
    while ((line = reader.ReadLine()) != null)
    {
        Console.WriteLine(line);
    }
}

// 读取指定字符数
using (StreamReader reader = new StreamReader("file.txt", Encoding.UTF8))
{
    char[] buffer = new char[100];
    int charsRead = reader.Read(buffer, 0, buffer.Length);
    string text = new string(buffer, 0, charsRead);
    Console.WriteLine(text);
}

// 异步读取
public async Task<string> ReadFileAsync(string filePath)
{
    using (StreamReader reader = new StreamReader(filePath, Encoding.UTF8))
    {
        return await reader.ReadToEndAsync();
    }
}

// 异步逐行读取
public async Task<List<string>> ReadLinesAsync(string filePath)
{
    List<string> lines = new List<string>();
    using (StreamReader reader = new StreamReader(filePath, Encoding.UTF8))
    {
        string line;
        while ((line = await reader.ReadLineAsync()) != null)
        {
            lines.Add(line);
        }
    }
    return lines;
}
```

#### StreamWriter的使用

```csharp
// 写入文本
using (StreamWriter writer = new StreamWriter("file.txt", append: false, Encoding.UTF8))
{
    writer.Write("Hello");
    writer.WriteLine(" World");
    writer.WriteLine("New Line");
}

// 追加文本
using (StreamWriter writer = new StreamWriter("file.txt", append: true, Encoding.UTF8))
{
    writer.WriteLine("追加的内容");
}

// 异步写入
public async Task WriteFileAsync(string filePath, string content)
{
    using (StreamWriter writer = new StreamWriter(filePath, append: false, Encoding.UTF8))
    {
        await writer.WriteAsync(content);
        await writer.FlushAsync();
    }
}

// 异步写入多行
public async Task WriteLinesAsync(string filePath, IEnumerable<string> lines)
{
    using (StreamWriter writer = new StreamWriter(filePath, append: false, Encoding.UTF8))
    {
        foreach (string line in lines)
        {
            await writer.WriteLineAsync(line);
        }
        await writer.FlushAsync();
    }
}
```

### <a id="memorystream"></a>MemoryStream内存流

`MemoryStream`用于在内存中操作数据，不需要实际文件。

```csharp
// 创建MemoryStream并写入数据
using (MemoryStream ms = new MemoryStream())
{
    string text = "Hello MemoryStream";
    byte[] bytes = Encoding.UTF8.GetBytes(text);
    ms.Write(bytes, 0, bytes.Length);
    
    // 读取数据
    ms.Position = 0; // 重置位置
    byte[] buffer = new byte[ms.Length];
    ms.Read(buffer, 0, (int)ms.Length);
    string result = Encoding.UTF8.GetString(buffer);
    Console.WriteLine(result);
}

// 从字节数组创建MemoryStream
byte[] data = { 1, 2, 3, 4, 5 };
using (MemoryStream ms = new MemoryStream(data))
{
    // 读取数据
    byte[] buffer = new byte[ms.Length];
    ms.Read(buffer, 0, (int)ms.Length);
}

// 获取MemoryStream的字节数组
using (MemoryStream ms = new MemoryStream())
{
    ms.WriteByte(1);
    ms.WriteByte(2);
    byte[] array = ms.ToArray(); // 获取字节数组
}
```

### <a id="file-winform"></a>文件操作与WinForm集成

在WinForm应用程序中，文件操作通常与用户界面交互，需要异步处理以保持UI响应性。

#### 异步文件读取示例

```csharp
public partial class FileReaderForm : Form
{
    private TextBox textBoxContent;
    private Button btnLoad;
    private ProgressBar progressBar;
    private Label labelStatus;
    
    public FileReaderForm()
    {
        InitializeComponent();
    }
    
    private async void btnLoad_Click(object sender, EventArgs e)
    {
        // 打开文件对话框
        OpenFileDialog dialog = new OpenFileDialog
        {
            Filter = "文本文件 (*.txt)|*.txt|所有文件 (*.*)|*.*",
            Title = "选择要读取的文件"
        };
        
        if (dialog.ShowDialog() == DialogResult.OK)
        {
            btnLoad.Enabled = false;
            progressBar.Visible = true;
            labelStatus.Text = "加载中...";
            
            try
            {
                // 异步读取文件
                string content = await ReadFileAsync(dialog.FileName);
                
                // 更新UI
                textBoxContent.Text = content;
                labelStatus.Text = "加载成功";
            }
            catch (FileNotFoundException)
            {
                MessageBox.Show("文件不存在", "错误", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (UnauthorizedAccessException)
            {
                MessageBox.Show("没有访问权限", "错误", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"读取文件失败: {ex.Message}", "错误", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                btnLoad.Enabled = true;
                progressBar.Visible = false;
            }
        }
    }
    
    private async Task<string> ReadFileAsync(string filePath)
    {
        // 使用StreamReader异步读取
        using (StreamReader reader = new StreamReader(filePath, Encoding.UTF8))
        {
            return await reader.ReadToEndAsync();
        }
    }
}
```

#### 异步文件写入示例

```csharp
public partial class FileWriterForm : Form
{
    private TextBox textBoxContent;
    private Button btnSave;
    private Label labelStatus;
    
    private async void btnSave_Click(object sender, EventArgs e)
    {
        // 保存文件对话框
        SaveFileDialog dialog = new SaveFileDialog
        {
            Filter = "文本文件 (*.txt)|*.txt|所有文件 (*.*)|*.*",
            Title = "保存文件",
            DefaultExt = "txt"
        };
        
        if (dialog.ShowDialog() == DialogResult.OK)
        {
            btnSave.Enabled = false;
            labelStatus.Text = "保存中...";
            
            try
            {
                // 异步写入文件
                await WriteFileAsync(dialog.FileName, textBoxContent.Text);
                
                labelStatus.Text = "保存成功";
                MessageBox.Show("文件保存成功！", "成功", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (UnauthorizedAccessException)
            {
                MessageBox.Show("没有写入权限", "错误", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"保存文件失败: {ex.Message}", "错误", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                btnSave.Enabled = true;
            }
        }
    }
    
    private async Task WriteFileAsync(string filePath, string content)
    {
        // 使用StreamWriter异步写入
        using (StreamWriter writer = new StreamWriter(filePath, append: false, Encoding.UTF8))
        {
            await writer.WriteAsync(content);
            await writer.FlushAsync();
        }
    }
}
```

#### 大文件处理示例

```csharp
public partial class LargeFileForm : Form
{
    private ProgressBar progressBar;
    private Label labelProgress;
    private Button btnProcess;
    
    private async void btnProcess_Click(object sender, EventArgs e)
    {
        OpenFileDialog dialog = new OpenFileDialog
        {
            Filter = "所有文件 (*.*)|*.*",
            Title = "选择要处理的文件"
        };
        
        if (dialog.ShowDialog() == DialogResult.OK)
        {
            btnProcess.Enabled = false;
            progressBar.Value = 0;
            
            try
            {
                // 处理大文件，显示进度
                await ProcessLargeFileAsync(dialog.FileName, new Progress<long>(bytesProcessed =>
                {
                    FileInfo fileInfo = new FileInfo(dialog.FileName);
                    int percent = (int)(bytesProcessed * 100 / fileInfo.Length);
                    progressBar.Value = percent;
                    labelProgress.Text = $"{percent}% ({bytesProcessed}/{fileInfo.Length} 字节)";
                }));
                
                MessageBox.Show("处理完成！", "成功", 
                    MessageBoxButtons.OK, MessageBoxIcon.Information);
            }
            catch (Exception ex)
            {
                MessageBox.Show($"处理失败: {ex.Message}", "错误", 
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            finally
            {
                btnProcess.Enabled = true;
            }
        }
    }
    
    private async Task ProcessLargeFileAsync(string filePath, IProgress<long> progress)
    {
        const int bufferSize = 8192; // 8KB缓冲区
        
        using (FileStream fs = new FileStream(filePath, FileMode.Open, FileAccess.Read, FileShare.Read, bufferSize, true))
        {
            byte[] buffer = new byte[bufferSize];
            long totalBytesRead = 0;
            int bytesRead;
            
            while ((bytesRead = await fs.ReadAsync(buffer, 0, bufferSize)) > 0)
            {
                // 处理数据
                ProcessBuffer(buffer, bytesRead);
                
                totalBytesRead += bytesRead;
                progress?.Report(totalBytesRead);
            }
        }
    }
    
    private void ProcessBuffer(byte[] buffer, int count)
    {
        // 处理缓冲区数据
        // 例如：数据转换、加密、压缩等
    }
}
```

#### 文件复制示例

```csharp
public partial class FileCopyForm : Form
{
    private ProgressBar progressBar;
    private Label labelStatus;
    private Button btnCopy;
    
    private async void btnCopy_Click(object sender, EventArgs e)
    {
        OpenFileDialog openDialog = new OpenFileDialog
        {
            Title = "选择源文件"
        };
        
        if (openDialog.ShowDialog() == DialogResult.OK)
        {
            SaveFileDialog saveDialog = new SaveFileDialog
            {
                Title = "选择目标位置",
                FileName = Path.GetFileName(openDialog.FileName)
            };
            
            if (saveDialog.ShowDialog() == DialogResult.OK)
            {
                btnCopy.Enabled = false;
                progressBar.Value = 0;
                
                try
                {
                    await CopyFileAsync(openDialog.FileName, saveDialog.FileName, new Progress<int>(percent =>
                    {
                        progressBar.Value = percent;
                        labelStatus.Text = $"{percent}%";
                    }));
                    
                    MessageBox.Show("复制完成！", "成功", 
                        MessageBoxButtons.OK, MessageBoxIcon.Information);
                }
                catch (Exception ex)
                {
                    MessageBox.Show($"复制失败: {ex.Message}", "错误", 
                        MessageBoxButtons.OK, MessageBoxIcon.Error);
                }
                finally
                {
                    btnCopy.Enabled = true;
                }
            }
        }
    }
    
    private async Task CopyFileAsync(string sourcePath, string destPath, IProgress<int> progress)
    {
        const int bufferSize = 8192;
        
        using (FileStream sourceStream = new FileStream(sourcePath, FileMode.Open, FileAccess.Read, FileShare.Read, bufferSize, true))
        using (FileStream destStream = new FileStream(destPath, FileMode.Create, FileAccess.Write, FileShare.None, bufferSize, true))
        {
            long fileLength = sourceStream.Length;
            byte[] buffer = new byte[bufferSize];
            long totalBytesRead = 0;
            int bytesRead;
            
            while ((bytesRead = await sourceStream.ReadAsync(buffer, 0, bufferSize)) > 0)
            {
                await destStream.WriteAsync(buffer, 0, bytesRead);
                
                totalBytesRead += bytesRead;
                int percent = (int)(totalBytesRead * 100 / fileLength);
                progress?.Report(percent);
            }
            
            await destStream.FlushAsync();
        }
    }
}
```

## <a id="multithreading"></a>C#多线程编程详解

多线程编程是C#中实现并发执行的核心技术。通过多线程，可以让程序同时执行多个任务，充分利用多核CPU资源，提高程序性能。本章将深入讲解C#中的多线程编程，包括线程创建、同步、通信等各个方面。

### <a id="multithreading-basics"></a>多线程基础概念

#### 什么是线程？

**线程（Thread）**是操作系统能够进行运算调度的最小单位。一个进程可以包含多个线程，每个线程可以独立执行不同的任务。

**进程 vs 线程：**
- **进程**：程序的执行实例，拥有独立的内存空间
- **线程**：进程内的执行单元，共享进程的内存空间

#### 为什么需要多线程？

1. **提高性能**：充分利用多核CPU，并行处理任务
2. **响应性**：在后台执行耗时操作，保持UI响应
3. **资源利用**：在等待I/O操作时，可以执行其他任务
4. **并发处理**：同时处理多个请求或任务

#### 多线程的挑战

1. **线程安全**：多个线程访问共享资源时的数据竞争
2. **死锁**：线程相互等待导致的程序卡死
3. **竞态条件**：执行顺序不确定导致的结果不一致
4. **性能开销**：线程创建、切换、同步的开销

### <a id="thread-class"></a>Thread类详解

`Thread`类是C#中创建和管理线程的基础类。

#### 创建线程

```csharp
using System.Threading;

// 方式1：使用ThreadStart委托
Thread thread1 = new Thread(new ThreadStart(DoWork));
thread1.Start();

// 方式2：使用ParameterizedThreadStart（带参数）
Thread thread2 = new Thread(new ParameterizedThreadStart(DoWorkWithParameter));
thread2.Start("参数值");

// 方式3：使用Lambda表达式
Thread thread3 = new Thread(() => 
{
    Console.WriteLine("线程执行中...");
    Thread.Sleep(1000);
    Console.WriteLine("线程完成");
});
thread3.Start();

// 方式4：使用匿名方法
Thread thread4 = new Thread(delegate()
{
    Console.WriteLine("匿名方法线程");
});
thread4.Start();

// 线程方法
static void DoWork()
{
    Console.WriteLine($"线程ID: {Thread.CurrentThread.ManagedThreadId}");
    Console.WriteLine($"线程名称: {Thread.CurrentThread.Name}");
    Console.WriteLine($"是否后台线程: {Thread.CurrentThread.IsBackground}");
    Console.WriteLine($"线程状态: {Thread.CurrentThread.ThreadState}");
    
    for (int i = 0; i < 10; i++)
    {
        Console.WriteLine($"工作线程: {i}");
        Thread.Sleep(100);
    }
}

static void DoWorkWithParameter(object parameter)
{
    Console.WriteLine($"接收参数: {parameter}");
    // 处理参数...
}
```

#### Thread的常用属性

```csharp
Thread thread = new Thread(DoWork);

// 线程属性
thread.Name = "工作线程1";              // 线程名称
thread.IsBackground = true;            // 是否为后台线程
thread.Priority = ThreadPriority.Normal; // 线程优先级
thread.CurrentCulture = CultureInfo.CurrentCulture; // 当前文化
thread.CurrentUICulture = CultureInfo.CurrentUICulture; // UI文化

// 线程状态
ThreadState state = thread.ThreadState; // 获取线程状态

// 线程ID
int threadId = thread.ManagedThreadId;  // 托管线程ID

thread.Start();
```

#### Thread的常用方法

```csharp
Thread thread = new Thread(DoWork);

// 启动线程
thread.Start();

// 等待线程完成（阻塞当前线程）
thread.Join();

// 等待指定时间
bool completed = thread.Join(1000); // 等待1秒，返回是否完成

// 中断线程（抛出ThreadInterruptedException）
thread.Interrupt();

// 中止线程（已过时，不推荐使用）
// thread.Abort(); // 已废弃

// 挂起线程（已过时）
// thread.Suspend(); // 已废弃

// 恢复线程（已过时）
// thread.Resume(); // 已废弃
```

#### 线程优先级

```csharp
Thread thread = new Thread(DoWork);

// 设置线程优先级
thread.Priority = ThreadPriority.Lowest;    // 最低
thread.Priority = ThreadPriority.BelowNormal; // 低于正常
thread.Priority = ThreadPriority.Normal;      // 正常（默认）
thread.Priority = ThreadPriority.AboveNormal; // 高于正常
thread.Priority = ThreadPriority.Highest;     // 最高

thread.Start();
```

**注意**：线程优先级只是建议，操作系统可能不遵循。过度使用高优先级可能导致其他线程饥饿。

#### 前台线程 vs 后台线程

```csharp
// 前台线程（默认）
Thread foregroundThread = new Thread(DoWork);
foregroundThread.IsBackground = false; // 前台线程
foregroundThread.Start();
// 进程会等待所有前台线程结束才退出

// 后台线程
Thread backgroundThread = new Thread(DoWork);
backgroundThread.IsBackground = true; // 后台线程
backgroundThread.Start();
// 进程退出时，后台线程会被强制终止
```

**区别：**
- **前台线程**：进程会等待所有前台线程结束才退出
- **后台线程**：进程退出时，后台线程会被强制终止

#### 线程状态

```csharp
Thread thread = new Thread(DoWork);

// 线程状态枚举
// Unstarted: 未启动
// Running: 运行中
// WaitSleepJoin: 等待、睡眠或加入
// Suspended: 已挂起（已废弃）
// AbortRequested: 中止请求（已废弃）
// Stopped: 已停止
// Aborted: 已中止（已废弃）

ThreadState state = thread.ThreadState;
Console.WriteLine($"线程状态: {state}");

thread.Start();
state = thread.ThreadState;
Console.WriteLine($"启动后状态: {state}");
```

#### 线程本地存储（ThreadLocal）

```csharp
// ThreadLocal：每个线程有独立的值
ThreadLocal<int> threadLocal = new ThreadLocal<int>(() => 
{
    return Thread.CurrentThread.ManagedThreadId; // 初始化为线程ID
});

// 在不同线程中使用
Thread thread1 = new Thread(() =>
{
    threadLocal.Value = 100;
    Console.WriteLine($"线程1的值: {threadLocal.Value}");
});

Thread thread2 = new Thread(() =>
{
    threadLocal.Value = 200;
    Console.WriteLine($"线程2的值: {threadLocal.Value}");
});

thread1.Start();
thread2.Start();
thread1.Join();
thread2.Join();

// 每个线程的值是独立的
Console.WriteLine($"主线程的值: {threadLocal.Value}");

// 清理资源
threadLocal.Dispose();
```

#### ThreadStatic特性

```csharp
// 使用[ThreadStatic]特性标记静态字段
[ThreadStatic]
private static int threadStaticValue = 0;

// 每个线程都有独立的副本
Thread thread1 = new Thread(() =>
{
    threadStaticValue = 100;
    Console.WriteLine($"线程1的值: {threadStaticValue}");
});

Thread thread2 = new Thread(() =>
{
    threadStaticValue = 200;
    Console.WriteLine($"线程2的值: {threadStaticValue}");
});

thread1.Start();
thread2.Start();
thread1.Join();
thread2.Join();

// 注意：主线程的值仍然是0（初始值）
Console.WriteLine($"主线程的值: {threadStaticValue}");
```

### <a id="threadpool"></a>ThreadPool线程池

线程池是.NET提供的线程管理机制，可以重用线程，减少线程创建和销毁的开销。

#### 为什么使用线程池？

1. **性能优化**：重用线程，减少创建/销毁开销
2. **资源管理**：自动管理线程数量，避免创建过多线程
3. **简单易用**：无需手动管理线程生命周期

#### ThreadPool的基本使用

```csharp
using System.Threading;

// 方式1：使用QueueUserWorkItem（无返回值）
ThreadPool.QueueUserWorkItem(DoWork);
ThreadPool.QueueUserWorkItem(DoWork, "参数值");

// 方式2：使用Lambda表达式
ThreadPool.QueueUserWorkItem(state =>
{
    Console.WriteLine($"线程池线程执行: {state}");
    Console.WriteLine($"线程ID: {Thread.CurrentThread.ManagedThreadId}");
    Console.WriteLine($"是否线程池线程: {Thread.CurrentThread.IsThreadPoolThread}");
});

// 方式3：使用WaitCallback委托
WaitCallback callback = new WaitCallback(DoWork);
ThreadPool.QueueUserWorkItem(callback, "数据");

static void DoWork(object state)
{
    Console.WriteLine($"执行工作: {state}");
    Thread.Sleep(1000);
    Console.WriteLine("工作完成");
}
```

#### ThreadPool的配置

```csharp
// 获取线程池信息
int workerThreads, completionPortThreads;
ThreadPool.GetAvailableThreads(out workerThreads, out completionPortThreads);
Console.WriteLine($"可用工作线程: {workerThreads}");
Console.WriteLine($"可用I/O线程: {completionPortThreads}");

// 获取最大线程数
ThreadPool.GetMaxThreads(out workerThreads, out completionPortThreads);
Console.WriteLine($"最大工作线程: {workerThreads}");
Console.WriteLine($"最大I/O线程: {completionPortThreads}");

// 获取最小线程数
ThreadPool.GetMinThreads(out workerThreads, out completionPortThreads);
Console.WriteLine($"最小工作线程: {workerThreads}");
Console.WriteLine($"最小I/O线程: {completionPortThreads}");

// 设置最小线程数
ThreadPool.SetMinThreads(10, 10);

// 设置最大线程数
ThreadPool.SetMaxThreads(100, 100);
```

#### ThreadPool vs Thread

| 特性 | Thread | ThreadPool |
|------|--------|------------|
| 线程创建 | 手动创建 | 自动管理 |
| 线程重用 | 不重用 | 重用线程 |
| 适用场景 | 长时间运行的任务 | 短时间任务 |
| 控制能力 | 完全控制 | 有限控制 |
| 性能开销 | 较大 | 较小 |

### <a id="thread-synchronization"></a>线程同步机制

当多个线程访问共享资源时，需要使用同步机制确保线程安全。

#### lock关键字

`lock`是最常用的同步机制，基于`Monitor`类实现。

```csharp
// 共享资源
private int _counter = 0;
private readonly object _lockObject = new object();

// 使用lock保护共享资源
public void Increment()
{
    lock (_lockObject)
    {
        _counter++;
        Console.WriteLine($"计数器: {_counter}, 线程ID: {Thread.CurrentThread.ManagedThreadId}");
    }
}

// 多线程测试
Thread thread1 = new Thread(() =>
{
    for (int i = 0; i < 1000; i++)
    {
        Increment();
    }
});

Thread thread2 = new Thread(() =>
{
    for (int i = 0; i < 1000; i++)
    {
        Increment();
    }
});

thread1.Start();
thread2.Start();
thread1.Join();
thread2.Join();

Console.WriteLine($"最终计数: {_counter}"); // 应该是2000
```

**lock的注意事项：**
1. 锁定对象应该是`private readonly`，避免外部锁定
2. 不要锁定`this`或`Type`对象
3. 避免嵌套锁定，防止死锁
4. 锁定范围要尽可能小

#### Monitor类

`Monitor`提供了比`lock`更灵活的控制。

```csharp
private readonly object _lockObject = new object();

// 使用Monitor
public void DoWork()
{
    Monitor.Enter(_lockObject);
    try
    {
        // 临界区代码
        Console.WriteLine("执行工作");
    }
    finally
    {
        Monitor.Exit(_lockObject);
    }
}

// Monitor.TryEnter（非阻塞）
public bool TryDoWork()
{
    if (Monitor.TryEnter(_lockObject, 1000)) // 等待1秒
    {
        try
        {
            // 临界区代码
            return true;
        }
        finally
        {
            Monitor.Exit(_lockObject);
        }
    }
    return false;
}

// Monitor.Wait和Monitor.Pulse（线程间通信）
private bool _condition = false;

public void WaitForCondition()
{
    lock (_lockObject)
    {
        while (!_condition)
        {
            Monitor.Wait(_lockObject); // 释放锁并等待
        }
        // 条件满足，继续执行
    }
}

public void SetCondition()
{
    lock (_lockObject)
    {
        _condition = true;
        Monitor.Pulse(_lockObject); // 通知等待的线程
    }
}
```

#### Mutex互斥锁

`Mutex`是跨进程的同步机制。

```csharp
// 创建Mutex
Mutex mutex = new Mutex(false, "MyMutex");

// 等待获取锁
mutex.WaitOne();
try
{
    // 临界区代码
    Console.WriteLine("执行工作");
}
finally
{
    mutex.ReleaseMutex();
}

// 使用using自动释放
using (Mutex mutex = new Mutex(false, "MyMutex"))
{
    if (mutex.WaitOne(1000)) // 等待1秒
    {
        try
        {
            // 临界区代码
        }
        finally
        {
            mutex.ReleaseMutex();
        }
    }
}
```

#### Semaphore信号量

`Semaphore`控制同时访问资源的线程数量。

```csharp
// 创建信号量：最多允许3个线程同时访问
Semaphore semaphore = new Semaphore(3, 3, "MySemaphore");

// 多个线程竞争访问
for (int i = 0; i < 10; i++)
{
    int threadId = i;
    Thread thread = new Thread(() =>
    {
        semaphore.WaitOne(); // 等待获取信号量
        try
        {
            Console.WriteLine($"线程 {threadId} 开始工作");
            Thread.Sleep(2000);
            Console.WriteLine($"线程 {threadId} 完成工作");
        }
        finally
        {
            semaphore.Release(); // 释放信号量
        }
    });
    thread.Start();
}
```

#### SemaphoreSlim（轻量级信号量）

`SemaphoreSlim`是`Semaphore`的轻量级、高性能版本，专为.NET Framework 4.0及以上设计，提供异步支持。它控制同时访问资源的线程数量，适用于高并发场景。

##### SemaphoreSlim与Semaphore的区别

| 特性 | SemaphoreSlim | Semaphore |
|------|---------------|-----------|
| 性能 | 更高，轻量级实现 | 较低，基于内核对象 |
| 异步支持 | 原生支持异步等待 | 不支持异步等待 |
| 等待超时 | 支持 | 支持 |
| 取消支持 | 支持CancellationToken | 不支持 |
| 命名信号量 | 不支持 | 支持（跨进程） |

##### 基本用法

```csharp
// 创建SemaphoreSlim，初始计数3，最大计数3
SemaphoreSlim semaphore = new SemaphoreSlim(3, 3);

// 异步等待获取信号量
async Task DoWorkAsync()
{
    Console.WriteLine($"线程 {Thread.CurrentThread.ManagedThreadId} 等待获取信号量");
    await semaphore.WaitAsync(); // 异步等待，不阻塞调用线程
    try
    {
        Console.WriteLine($"线程 {Thread.CurrentThread.ManagedThreadId} 获取到信号量，开始工作");
        await Task.Delay(1000); // 模拟耗时操作
        Console.WriteLine($"线程 {Thread.CurrentThread.ManagedThreadId} 完成工作");
    }
    finally
    {
        semaphore.Release(); // 释放信号量，允许其他线程获取
        Console.WriteLine($"线程 {Thread.CurrentThread.ManagedThreadId} 释放信号量");
    }
}

// 同步等待获取信号量
void DoWork()
{
    semaphore.Wait(); // 同步等待，会阻塞调用线程
    try
    {
        // 临界区代码
    }
    finally
    {
        semaphore.Release();
    }
}
```

##### 高级用法

###### 1. 带超时的等待

```csharp
// 异步等待1秒，超时返回false
bool acquired = await semaphore.WaitAsync(TimeSpan.FromSeconds(1));
if (acquired)
{
    try
    {
        // 临界区代码
    }
    finally
    {
        semaphore.Release();
    }
}
else
{
    Console.WriteLine("超时未获取到信号量");
}

// 同步等待1秒
acquired = semaphore.Wait(TimeSpan.FromSeconds(1));
```

###### 2. 支持取消操作

```csharp
CancellationTokenSource cts = new CancellationTokenSource();

// 异步等待并支持取消
try
{
    await semaphore.WaitAsync(cts.Token);
    try
    {
        // 临界区代码
    }
    finally
    {
        semaphore.Release();
    }
}
catch (OperationCanceledException)
{
    Console.WriteLine("等待已取消");
}

// 取消等待
cts.Cancel();
```

###### 3. 释放多个计数

```csharp
// 释放2个计数，允许2个线程同时获取
int previousCount = semaphore.Release(2);
Console.WriteLine($"释放前计数: {previousCount}, 释放后计数: {previousCount + 2}");
```

###### 4. 获取当前计数

```csharp
int currentCount = semaphore.CurrentCount;
Console.WriteLine($"当前信号量计数: {currentCount}");
```

##### 应用场景

1. **限制并发请求数**：例如限制同时处理的HTTP请求数
2. **资源池管理**：例如数据库连接池、线程池
3. **限流**：防止系统过载，保护关键资源
4. **并行任务控制**：控制同时执行的并行任务数量

##### 最佳实践

1. 始终在`finally`块中释放信号量，确保即使发生异常也能正确释放
2. 避免长时间持有信号量，将临界区代码保持尽可能小
3. 适当设置初始计数和最大计数，根据系统资源和负载调整
4. 对于跨进程场景，使用`Semaphore`而非`SemaphoreSlim`
5. 结合`CancellationToken`使用，支持优雅取消

##### 完整示例：并发请求限流

```csharp
class RequestThrottler
{
    // 限制最多3个并发请求
    private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(3, 3);
    
    public async Task ProcessRequestAsync(int requestId, CancellationToken cancellationToken = default)
    {
        Console.WriteLine($"请求 {requestId} 等待处理");
        
        // 异步等待获取信号量，支持取消
        await _semaphore.WaitAsync(cancellationToken);
        
        try
        {
            Console.WriteLine($"请求 {requestId} 开始处理");
            // 模拟请求处理耗时
            await Task.Delay(1000, cancellationToken);
            Console.WriteLine($"请求 {requestId} 处理完成");
        }
        finally
        {
            _semaphore.Release();
            Console.WriteLine($"请求 {requestId} 释放资源");
        }
    }
}

// 使用示例
async Task Main()
{
    var throttler = new RequestThrottler();
    var tasks = new List<Task>();
    
    // 模拟10个并发请求
    for (int i = 1; i <= 10; i++)
    {
        int requestId = i;
        tasks.Add(throttler.ProcessRequestAsync(requestId));
    }
    
    await Task.WhenAll(tasks);
    Console.WriteLine("所有请求处理完成");
}
```

#### ReaderWriterLockSlim读写锁

`ReaderWriterLockSlim`允许多个读操作或单个写操作。

```csharp
private ReaderWriterLockSlim _rwLock = new ReaderWriterLockSlim();
private int _data = 0;

// 读操作（允许多个线程同时读）
public int ReadData()
{
    _rwLock.EnterReadLock();
    try
    {
        return _data;
    }
    finally
    {
        _rwLock.ExitReadLock();
    }
}

// 写操作（独占）
public void WriteData(int value)
{
    _rwLock.EnterWriteLock();
    try
    {
        _data = value;
    }
    finally
    {
        _rwLock.ExitWriteLock();
    }
}

// 可升级锁（先读后写）
public void UpgradeReadToWrite()
{
    _rwLock.EnterUpgradeableReadLock();
    try
    {
        // 读取数据
        int current = _data;
        
        // 需要时升级为写锁
        _rwLock.EnterWriteLock();
        try
        {
            _data = current + 1;
        }
        finally
        {
            _rwLock.ExitWriteLock();
        }
    }
    finally
    {
        _rwLock.ExitUpgradeableReadLock();
    }
}
```

#### Interlocked原子操作

`Interlocked`提供原子操作，无需锁定。

```csharp
private int _counter = 0;

// 原子递增
int newValue = Interlocked.Increment(ref _counter);

// 原子递减
int newValue = Interlocked.Decrement(ref _counter);

// 原子加法
int newValue = Interlocked.Add(ref _counter, 10);

// 原子交换
int oldValue = Interlocked.Exchange(ref _counter, 100);

// 原子比较并交换（CAS）
int expected = 50;
int desired = 100;
bool success = Interlocked.CompareExchange(ref _counter, desired, expected) == expected;

// 原子读取（64位）
long longValue = 0;
long result = Interlocked.Read(ref longValue);
```

**Interlocked的优势：**
- 性能高：无需锁定，CPU级别原子操作
- 无死锁风险：不涉及锁
- 适合简单操作：递增、递减、交换等

### <a id="thread-safe-collections"></a>线程安全集合

.NET提供了线程安全的集合类，可以在多线程环境中安全使用。

#### ConcurrentQueue<T>线程安全队列

```csharp
using System.Collections.Concurrent;

ConcurrentQueue<int> queue = new ConcurrentQueue<int>();

// 多线程入队
Parallel.For(0, 100, i =>
{
    queue.Enqueue(i);
});

// 出队
int value;
while (queue.TryDequeue(out value))
{
    Console.WriteLine($"出队: {value}");
}

// 查看但不移除
if (queue.TryPeek(out value))
{
    Console.WriteLine($"队首元素: {value}");
}
```

#### ConcurrentStack<T>线程安全栈

```csharp
ConcurrentStack<int> stack = new ConcurrentStack<int>();

// 入栈
stack.Push(1);
stack.Push(2);
stack.Push(3);

// 出栈
int value;
if (stack.TryPop(out value))
{
    Console.WriteLine($"出栈: {value}");
}

// 查看栈顶
if (stack.TryPeek(out value))
{
    Console.WriteLine($"栈顶: {value}");
}

// 批量出栈
int[] values = new int[10];
int count = stack.TryPopRange(values);
```

#### ConcurrentDictionary<TKey, TValue>线程安全字典

```csharp
ConcurrentDictionary<string, int> dictionary = new ConcurrentDictionary<string, int>();

// 添加或更新
dictionary.TryAdd("key1", 1);
dictionary.TryAdd("key2", 2);

// 获取或添加
int value = dictionary.GetOrAdd("key3", 3);

// 添加或更新
dictionary.AddOrUpdate("key1", 1, (key, oldValue) => oldValue + 1);

// 尝试更新
if (dictionary.TryUpdate("key1", 2, 1))
{
    Console.WriteLine("更新成功");
}

// 尝试移除
if (dictionary.TryRemove("key1", out value))
{
    Console.WriteLine($"移除的值: {value}");
}

// 遍历（快照）
foreach (var kvp in dictionary)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}
```

#### ConcurrentBag<T>线程安全包

```csharp
ConcurrentBag<int> bag = new ConcurrentBag<int>();

// 添加
bag.Add(1);
bag.Add(2);
bag.Add(3);

// 取出（不保证顺序）
if (bag.TryTake(out int value))
{
    Console.WriteLine($"取出: {value}");
}

// 查看但不移除
if (bag.TryPeek(out value))
{
    Console.WriteLine($"查看: {value}");
}
```

#### BlockingCollection<T>阻塞集合

```csharp
// 创建阻塞集合（基于ConcurrentQueue）
BlockingCollection<int> collection = new BlockingCollection<int>();

// 生产者线程
Thread producer = new Thread(() =>
{
    for (int i = 0; i < 10; i++)
    {
        collection.Add(i);
        Console.WriteLine($"生产: {i}");
        Thread.Sleep(100);
    }
    collection.CompleteAdding(); // 标记完成
});

// 消费者线程
Thread consumer = new Thread(() =>
{
    foreach (int item in collection.GetConsumingEnumerable())
    {
        Console.WriteLine($"消费: {item}");
    }
});

producer.Start();
consumer.Start();
producer.Join();
consumer.Join();
```

### <a id="parallel-programming"></a>并行编程（Parallel类）

`Parallel`类提供了简单的并行循环和并行执行方法。

#### Parallel.For并行循环

```csharp
using System.Threading.Tasks;

// 基本用法
Parallel.For(0, 100, i =>
{
    Console.WriteLine($"并行执行: {i}, 线程ID: {Thread.CurrentThread.ManagedThreadId}");
});

// 带选项的并行循环
ParallelOptions options = new ParallelOptions
{
    MaxDegreeOfParallelism = 4, // 最大并行度
    CancellationToken = CancellationToken.None
};

Parallel.For(0, 100, options, i =>
{
    // 执行工作
    Console.WriteLine($"执行: {i}");
});

// 带状态的并行循环
long sum = 0;
Parallel.For<long>(0, 100,
    () => 0, // 初始化局部状态
    (i, loop, localSum) => // 循环体
    {
        localSum += i;
        return localSum;
    },
    localSum => // 合并局部状态
    {
        Interlocked.Add(ref sum, localSum);
    }
);
Console.WriteLine($"总和: {sum}");
```

#### Parallel.ForEach并行遍历

```csharp
List<int> numbers = Enumerable.Range(0, 100).ToList();

// 基本用法
Parallel.ForEach(numbers, number =>
{
    Console.WriteLine($"处理: {number}");
});

// 带选项
ParallelOptions options = new ParallelOptions
{
    MaxDegreeOfParallelism = 4
};

Parallel.ForEach(numbers, options, number =>
{
    // 处理每个元素
    ProcessNumber(number);
});

// 带局部状态
int total = 0;
Parallel.ForEach(numbers,
    () => 0, // 初始化
    (number, loopState, localTotal) => // 循环体
    {
        return localTotal + number;
    },
    localTotal => // 合并
    {
        Interlocked.Add(ref total, localTotal);
    }
);
```

#### Parallel.Invoke并行执行

```csharp
// 并行执行多个方法
Parallel.Invoke(
    () => DoWork1(),
    () => DoWork2(),
    () => DoWork3(),
    () => DoWork4()
);

// 带选项
ParallelOptions options = new ParallelOptions
{
    MaxDegreeOfParallelism = 2
};

Parallel.Invoke(options,
    () => DoWork1(),
    () => DoWork2(),
    () => DoWork3()
);
```

#### 中断和取消并行操作

```csharp
// 使用ParallelLoopState中断
Parallel.For(0, 100, (i, loopState) =>
{
    if (i == 50)
    {
        loopState.Break(); // 中断循环
        // 或
        loopState.Stop(); // 立即停止
    }
    
    Console.WriteLine($"执行: {i}");
    
    // 检查是否应该停止
    if (loopState.ShouldExitCurrentIteration)
    {
        return;
    }
});

// 使用CancellationToken取消
CancellationTokenSource cts = new CancellationTokenSource();
ParallelOptions options = new ParallelOptions
{
    CancellationToken = cts.Token
};

Task.Run(() =>
{
    Thread.Sleep(2000);
    cts.Cancel(); // 2秒后取消
});

try
{
    Parallel.For(0, 100, options, i =>
    {
        // 检查取消
        options.CancellationToken.ThrowIfCancellationRequested();
        Console.WriteLine($"执行: {i}");
        Thread.Sleep(100);
    });
}
catch (OperationCanceledException)
{
    Console.WriteLine("操作已取消");
}
```

### <a id="task-parallel-library"></a>任务并行库（TPL）

TPL（Task Parallel Library）是.NET推荐的并行编程方式，比直接使用Thread更高级。

#### Task基础

```csharp
using System.Threading.Tasks;

// 创建并启动Task
Task task = Task.Run(() =>
{
    Console.WriteLine("Task执行中...");
    Thread.Sleep(1000);
    Console.WriteLine("Task完成");
});

// 等待Task完成
task.Wait();

// 创建带返回值的Task
Task<int> taskWithResult = Task.Run(() =>
{
    Thread.Sleep(1000);
    return 42;
});

int result = taskWithResult.Result; // 阻塞等待结果

// 使用Task.Factory创建Task
Task task2 = Task.Factory.StartNew(() =>
{
    Console.WriteLine("使用Factory创建Task");
});

// 创建未启动的Task
Task task3 = new Task(() =>
{
    Console.WriteLine("手动启动的Task");
});
task3.Start();
task3.Wait();
```

#### Task的延续

```csharp
// ContinueWith：任务完成后执行
Task task1 = Task.Run(() =>
{
    Console.WriteLine("任务1");
    return 10;
});

Task task2 = task1.ContinueWith(previousTask =>
{
    int result = previousTask.Result;
    Console.WriteLine($"任务2，接收结果: {result}");
    return result * 2;
});

Task task3 = task2.ContinueWith(previousTask =>
{
    int result = previousTask.Result;
    Console.WriteLine($"任务3，接收结果: {result}");
});

task3.Wait();

// 多个延续选项
Task task = Task.Run(() => DoWork());

task.ContinueWith(t => Console.WriteLine("成功"), TaskContinuationOptions.OnlyOnRanToCompletion);
task.ContinueWith(t => Console.WriteLine("失败"), TaskContinuationOptions.OnlyOnFaulted);
task.ContinueWith(t => Console.WriteLine("取消"), TaskContinuationOptions.OnlyOnCanceled);
```

#### Task异常处理

```csharp
// Task中的异常会被包装在AggregateException中
Task task = Task.Run(() =>
{
    throw new InvalidOperationException("任务异常");
});

try
{
    task.Wait();
}
catch (AggregateException ex)
{
    foreach (var innerEx in ex.InnerExceptions)
    {
        Console.WriteLine($"异常: {innerEx.Message}");
    }
    ex.Handle(e => e is InvalidOperationException);
}

// 检查Task状态
if (task.IsFaulted)
{
    Console.WriteLine("Task失败");
    Console.WriteLine(task.Exception?.Message);
}

if (task.IsCanceled)
{
    Console.WriteLine("Task已取消");
}

if (task.IsCompleted)
{
    Console.WriteLine("Task已完成");
}
```

#### Task组合

```csharp
// Task.WhenAll：等待所有任务完成
Task task1 = Task.Run(() => { Thread.Sleep(1000); return 1; });
Task task2 = Task.Run(() => { Thread.Sleep(2000); return 2; });
Task task3 = Task.Run(() => { Thread.Sleep(1500); return 3; });

Task<int[]> allTasks = Task.WhenAll(task1, task2, task3);
int[] results = await allTasks;
Console.WriteLine($"结果: {string.Join(", ", results)}");

// Task.WhenAny：等待任意一个任务完成
Task<int>[] tasks = new[]
{
    Task.Run(() => { Thread.Sleep(1000); return 1; }),
    Task.Run(() => { Thread.Sleep(2000); return 2; }),
    Task.Run(() => { Thread.Sleep(1500); return 3; })
};

Task<int> completedTask = await Task.WhenAny(tasks);
int result = await completedTask;
Console.WriteLine($"第一个完成的任务结果: {result}");
```

### <a id="thread-communication"></a>线程间通信

线程间需要协调和通信时，可以使用多种机制。

#### 事件等待句柄（EventWaitHandle）

```csharp
// AutoResetEvent：自动重置事件
AutoResetEvent autoEvent = new AutoResetEvent(false);

Thread thread1 = new Thread(() =>
{
    Console.WriteLine("线程1等待事件");
    autoEvent.WaitOne(); // 等待事件
    Console.WriteLine("线程1收到事件");
});

Thread thread2 = new Thread(() =>
{
    Thread.Sleep(2000);
    Console.WriteLine("线程2设置事件");
    autoEvent.Set(); // 设置事件
});

thread1.Start();
thread2.Start();
thread1.Join();
thread2.Join();

// ManualResetEvent：手动重置事件
ManualResetEvent manualEvent = new ManualResetEvent(false);

Thread thread3 = new Thread(() =>
{
    Console.WriteLine("线程3等待事件");
    manualEvent.WaitOne();
    Console.WriteLine("线程3收到事件");
});

Thread thread4 = new Thread(() =>
{
    Thread.Sleep(2000);
    Console.WriteLine("线程4设置事件");
    manualEvent.Set(); // 设置事件，所有等待的线程都会继续
    Thread.Sleep(1000);
    manualEvent.Reset(); // 重置事件
});

thread3.Start();
thread4.Start();
thread3.Join();
thread4.Join();
```

#### CountdownEvent倒计时事件

```csharp
// 等待多个操作完成
CountdownEvent countdown = new CountdownEvent(3);

for (int i = 0; i < 3; i++)
{
    int taskId = i;
    Task.Run(() =>
    {
        Console.WriteLine($"任务 {taskId} 开始");
        Thread.Sleep(1000);
        Console.WriteLine($"任务 {taskId} 完成");
        countdown.Signal(); // 信号计数减1
    });
}

countdown.Wait(); // 等待计数为0
Console.WriteLine("所有任务完成");
countdown.Dispose();
```

#### Barrier屏障

```csharp
// 多个线程在屏障处同步
Barrier barrier = new Barrier(3, b =>
{
    Console.WriteLine($"阶段 {b.CurrentPhaseNumber} 完成");
});

for (int i = 0; i < 3; i++)
{
    int threadId = i;
    Task.Run(() =>
    {
        Console.WriteLine($"线程 {threadId} 阶段1");
        barrier.SignalAndWait(); // 到达屏障并等待
        
        Console.WriteLine($"线程 {threadId} 阶段2");
        barrier.SignalAndWait();
        
        Console.WriteLine($"线程 {threadId} 完成");
    });
}

Thread.Sleep(5000);
barrier.Dispose();
```

### <a id="deadlock-race-condition"></a>死锁与竞态条件

#### 死锁（Deadlock）

死锁是指两个或多个线程相互等待对方释放资源，导致程序无法继续执行。

```csharp
// 死锁示例
object lock1 = new object();
object lock2 = new object();

Thread thread1 = new Thread(() =>
{
    lock (lock1)
    {
        Thread.Sleep(100);
        lock (lock2) // 等待lock2
        {
            Console.WriteLine("线程1完成");
        }
    }
});

Thread thread2 = new Thread(() =>
{
    lock (lock2)
    {
        Thread.Sleep(100);
        lock (lock1) // 等待lock1
        {
            Console.WriteLine("线程2完成");
        }
    }
});

thread1.Start();
thread2.Start();
// 两个线程相互等待，导致死锁
```

**避免死锁的方法：**
1. 按相同顺序获取锁
2. 使用超时机制（Monitor.TryEnter）
3. 避免嵌套锁定
4. 使用更高级的同步机制

```csharp
// 避免死锁：按相同顺序获取锁
object lock1 = new object();
object lock2 = new object();

void SafeMethod1()
{
    lock (lock1)
    {
        lock (lock2) // 总是先lock1后lock2
        {
            // 安全代码
        }
    }
}

void SafeMethod2()
{
    lock (lock1) // 同样先lock1
    {
        lock (lock2) // 后lock2
        {
            // 安全代码
        }
    }
}
```

#### 竞态条件（Race Condition）

竞态条件是指多个线程访问共享资源时，执行顺序不确定导致的结果不一致。

```csharp
// 竞态条件示例
private int _counter = 0;

void Increment()
{
    _counter++; // 不是原子操作
    // 实际包含：读取、加1、写入三个步骤
}

// 多线程调用会导致结果不正确
Parallel.For(0, 10000, i => Increment());
Console.WriteLine($"计数器: {_counter}"); // 可能不是10000
```

**解决方法：**

```csharp
// 方法1：使用lock
private int _counter = 0;
private readonly object _lock = new object();

void SafeIncrement()
{
    lock (_lock)
    {
        _counter++;
    }
}

// 方法2：使用Interlocked
private int _counter = 0;

void AtomicIncrement()
{
    Interlocked.Increment(ref _counter);
}

// 方法3：使用线程安全集合
private ConcurrentDictionary<string, int> _counters = new ConcurrentDictionary<string, int>();

void SafeIncrement(string key)
{
    _counters.AddOrUpdate(key, 1, (k, v) => v + 1);
}
```

### <a id="multithreading-best-practices"></a>多线程最佳实践

#### 1. 优先使用Task而不是Thread

```csharp
// ❌ 不推荐：直接使用Thread
Thread thread = new Thread(DoWork);
thread.Start();

// ✅ 推荐：使用Task
Task task = Task.Run(DoWork);
await task;
```

#### 2. 使用async/await进行异步编程

```csharp
// ❌ 不推荐：阻塞等待
Task task = Task.Run(DoWork);
task.Wait();

// ✅ 推荐：异步等待
await Task.Run(DoWork);
```

#### 3. 避免共享可变状态

```csharp
// ❌ 不推荐：共享可变状态
private int _sharedCounter = 0;

// ✅ 推荐：使用不可变对象或线程安全集合
private readonly ConcurrentDictionary<string, int> _counters = new ConcurrentDictionary<string, int>();
```

#### 4. 使用线程安全集合

```csharp
// ❌ 不推荐：普通集合+锁
private List<int> _list = new List<int>();
private readonly object _lock = new object();

// ✅ 推荐：线程安全集合
private ConcurrentBag<int> _bag = new ConcurrentBag<int>();
```

#### 5. 合理使用锁的范围

```csharp
// ❌ 不推荐：锁范围太大
lock (_lock)
{
    DoWork1(); // 不需要锁的操作
    DoWork2(); // 不需要锁的操作
    UpdateSharedResource(); // 需要锁的操作
}

// ✅ 推荐：锁范围最小化
DoWork1();
DoWork2();
lock (_lock)
{
    UpdateSharedResource();
}
```

#### 6. 避免在锁内调用外部方法

```csharp
// ❌ 不推荐：锁内调用外部方法可能导致死锁
lock (_lock)
{
    ExternalMethod(); // 可能获取其他锁
}

// ✅ 推荐：先调用外部方法，再锁定
var result = ExternalMethod();
lock (_lock)
{
    UpdateWithResult(result);
}
```

#### 7. 使用CancellationToken支持取消

```csharp
// ✅ 推荐：支持取消
async Task DoWorkAsync(CancellationToken cancellationToken)
{
    for (int i = 0; i < 100; i++)
    {
        cancellationToken.ThrowIfCancellationRequested();
        await ProcessItemAsync(i);
    }
}
```

#### 8. 合理设置并行度

```csharp
// ✅ 推荐：根据CPU核心数设置并行度
int maxParallelism = Environment.ProcessorCount;
ParallelOptions options = new ParallelOptions
{
    MaxDegreeOfParallelism = maxParallelism
};

Parallel.For(0, 1000, options, i =>
{
    // 处理工作
});
```

#### 9. 及时释放资源

```csharp
// ✅ 推荐：使用using确保资源释放
using (SemaphoreSlim semaphore = new SemaphoreSlim(1))
{
    await semaphore.WaitAsync();
    try
    {
        // 使用资源
    }
    finally
    {
        semaphore.Release();
    }
}
```

#### 10. 监控和诊断

```csharp
// 使用性能计数器监控线程
PerformanceCounter threadCounter = new PerformanceCounter(
    "Process", "Thread Count", Process.GetCurrentProcess().ProcessName);

Console.WriteLine($"线程数: {threadCounter.NextValue()}");

// 使用诊断工具
System.Diagnostics.Trace.WriteLine($"线程ID: {Thread.CurrentThread.ManagedThreadId}");
```

## 总结

C#进阶特性包括泛型、委托与Lambda表达式、LINQ、ORM框架、设计模式、特性（Attributes）、反射（Reflection）、异步编程、文件操作流处理和多线程编程等。这些特性在现代C#开发中发挥着重要作用：

1. **泛型**：提供类型安全、代码重用和性能优化
2. **委托与Lambda表达式**：支持函数式编程，简化代码
3. **LINQ**：统一的查询语法，简化数据查询和处理
4. **ORM框架**：从ADO.NET到Entity Framework 6，提供了完整的数据访问解决方案
5. **设计模式**：提供经过验证的解决方案
6. **特性（Attributes）**：为代码添加元数据，支持声明式编程
7. **反射（Reflection）**：运行时类型检查和操作，支持框架和插件系统
8. **异步编程**：提高应用程序响应性和性能
9. **文件操作与流处理**：高效处理数据输入输出
10. **多线程编程**：充分利用多核CPU，实现并发执行

在WinForm开发中，合理运用这些特性可以构建出高性能、可维护的桌面应用程序：

- **ADO.NET**是数据访问的基础，提供了直接访问数据库的能力，包括连接管理、命令执行、参数化查询、事务处理和存储过程等核心功能。掌握ADO.NET有助于理解数据访问的底层机制。

- **Entity Framework 6**是强大的ORM框架，提供了Code First、Database First等多种开发模式。通过DbContext和DbSet，可以以面向对象的方式操作数据库。EF6支持LINQ查询、变更跟踪、并发控制、迁移等高级特性，大大提高了开发效率。

- **LINQ**统一了数据查询语法，无论是查询内存集合、数据库还是XML，都能使用一致的语法，大大简化了数据处理代码。LINQ与EF6结合使用，可以实现类型安全、高效的数据库查询。

- **异步编程和多线程编程**特别重要，可以保持UI响应性并提高程序性能；但需要注意线程安全和同步机制，避免死锁和竞态条件。在数据访问中，使用异步方法可以避免阻塞UI线程。

- **特性（Attributes）**广泛用于数据验证、序列化、ORM映射等场景，使得代码更加声明式和可配置。在EF6中，Data Annotations提供了简洁的实体配置方式。

- **反射（Reflection）**在框架开发、插件系统、对象映射等场景中不可或缺，但需要注意性能优化，通过缓存和委托提高执行效率。EF6内部大量使用反射来实现ORM功能。

掌握这些进阶特性，可以让您构建更加灵活、高效和可维护的C#应用程序。从基础的ADO.NET到高级的Entity Framework 6，从简单的CRUD操作到复杂的查询和性能优化，这些技术构成了现代C#数据访问的完整体系。通过合理使用ORM框架，可以大大提高开发效率，同时保持代码的可维护性和性能。