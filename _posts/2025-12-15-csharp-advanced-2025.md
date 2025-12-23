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
3. [C#设计模式详解](#design-patterns)
   - [单例模式](#singleton-pattern)
4. [C#异步编程详解](#async-programming)
   - [异步编程基础](#async-basics)
   - [async/await关键字](#async-await)
   - [Task与Task<T>](#task-types)
   - [异步方法最佳实践](#async-best-practices)
   - [异步编程与WinForm集成](#async-winform)
5. [C#文件操作与流处理](#file-stream)
   - [文件操作基础](#file-basics)
   - [流（Stream）概述](#stream-overview)
   - [FileStream文件流](#filestream)
   - [StreamReader和StreamWriter](#stream-reader-writer)
   - [MemoryStream内存流](#memorystream)
   - [文件操作与WinForm集成](#file-winform)
6. [C#多线程编程详解](#multithreading)
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

单例模式是C#开发中最常用的设计模式之一，正确应用单例模式可以提高系统的性能和可维护性，但也要注意避免过度使用带来的问题。

在实际开发中，合理使用泛型可以提高代码的质量、性能和可维护性，是现代C#开发中不可或缺的一部分。

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
3. **Task和Task<T>**：表示异步操作的返回类型
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
        // await等待异步操作完成
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

使用`CancellationToken`支持取消异步操作。

```csharp
public async Task ProcessDataAsync(CancellationToken cancellationToken)
{
    for (int i = 0; i < 100; i++)
    {
        // 检查是否已取消
        cancellationToken.ThrowIfCancellationRequested();
        
        await DoWorkAsync();
    }
}

// 使用CancellationTokenSource
CancellationTokenSource cts = new CancellationTokenSource();

// 启动异步操作
Task task = ProcessDataAsync(cts.Token);

// 取消操作
cts.Cancel();

try
{
    await task;
}
catch (OperationCanceledException)
{
    Console.WriteLine("操作已取消");
}
```

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

`SemaphoreSlim`是`Semaphore`的轻量级版本，性能更好。

```csharp
// 创建SemaphoreSlim
SemaphoreSlim semaphore = new SemaphoreSlim(3, 3);

// 异步等待
async Task DoWorkAsync()
{
    await semaphore.WaitAsync(); // 异步等待
    try
    {
        // 临界区代码
        await Task.Delay(1000);
    }
    finally
    {
        semaphore.Release();
    }
}

// 同步等待
void DoWork()
{
    semaphore.Wait(); // 同步等待
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

C#进阶特性包括泛型、委托与Lambda表达式、设计模式、异步编程、文件操作流处理和多线程编程等。这些特性在现代C#开发中发挥着重要作用：

1. **泛型**：提供类型安全、代码重用和性能优化
2. **委托与Lambda表达式**：支持函数式编程，简化代码
3. **设计模式**：提供经过验证的解决方案
4. **异步编程**：提高应用程序响应性和性能
5. **文件操作与流处理**：高效处理数据输入输出
6. **多线程编程**：充分利用多核CPU，实现并发执行

在WinForm开发中，合理运用这些特性可以构建出高性能、可维护的桌面应用程序。异步编程和多线程编程特别重要，可以保持UI响应性并提高程序性能；但需要注意线程安全和同步机制，避免死锁和竞态条件。