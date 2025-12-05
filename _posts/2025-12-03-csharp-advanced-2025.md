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