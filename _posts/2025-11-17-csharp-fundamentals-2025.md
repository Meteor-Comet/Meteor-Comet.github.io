---
layout: post
title: "C#基础语法详解"
subtitle: "类/对象/方法/枚举/结构体"
date: 2025-11-19 12:00:00
author: "Comet"
catalog: true
tags:
    - C#
    - 基础语法
---
# C#核心基础语法详解

## 目录

1. [C#简介：能做什么，解决什么问题？](#intro)
2. [C#数据类型详解](#data-types)
3. [C#类型转换详解](#type-conversion)
4. [C#运算符详解](#operators)
5. [C#分支语句详解](#branch-statements)
6. [C#函数详解](#functions)
7. [C# Math类详解](#math-class)
8. [C# Random类详解](#random-class)
9. [C# DateTime类详解](#datetime-class)
10. [C# Array类详解](#array-class)
11. [C# String类详解](#string-class)
12. [C# Object类详解](#object-class)
13. [C# ArrayList类详解](#arraylist-class)
14. [C# List类详解](#list-class)

## <a id="intro"></a>C#简介：能做什么，解决什么问题？

C#（读作"C Sharp"）是微软公司于2000年推出的一门现代、面向对象的编程语言。它由 Anders Hejlsberg 领导设计，是.NET生态系统的核心语言之一。C#结合了C++的强大功能和Visual Basic的易用性，成为当今最受欢迎的编程语言之一。

### C#能做什么？

#### 1. 桌面应用程序开发
使用Windows Forms、WPF或UWP等技术，C#可以创建功能丰富的桌面应用程序。从简单的工具软件到复杂的企业级应用，C#都能胜任。

#### 2. Web应用程序开发
通过ASP.NET Core框架，C#可以构建高性能的Web应用程序和API服务。无论是传统的MVC网站还是现代化的RESTful API，C#都是优秀的选择。

#### 3. 移动应用开发
借助Xamarin和MAUI（.NET Multi-platform App UI）技术，开发者可以用C#编写跨平台的移动应用，一套代码可以同时运行在iOS和Android平台上。

#### 4. 游戏开发
Unity游戏引擎广泛使用C#作为脚本语言，使得C#成为游戏开发的热门选择。从手机小游戏到3A级大作，都有C#的身影。

#### 5. 云和微服务
Azure云平台原生支持C#，配合ASP.NET Core和Docker容器技术，C#非常适合构建云原生应用和微服务架构。

#### 6. 数据科学和机器学习
通过ML.NET框架，开发者可以使用C#构建机器学习模型。同时，C#也可以与Python生态系统集成，进行数据分析和科学计算。

### C#解决了什么问题？

#### 1. 简化复杂性
相比C++，C#通过自动内存管理和垃圾回收机制，大大简化了内存管理的复杂性，减少了内存泄漏和指针错误等问题。

#### 2. 提高开发效率
C#提供了丰富的标准库和现代化的语法特性，使得开发者能够更快速地构建应用程序，减少样板代码的编写。

#### 3. 跨平台兼容性
随着.NET Core（现为.NET 5+）的推出，C#实现了真正的跨平台支持，可以在Windows、Linux和macOS上运行相同的代码。

#### 4. 类型安全
C#是强类型语言，编译器会在编译时捕获许多类型相关的错误，提高了程序的稳定性和可靠性。

#### 5. 面向对象编程支持
C#提供了完整的面向对象编程支持，包括封装、继承、多态等特性，帮助开发者构建可维护、可扩展的软件系统。

#### 6. 异步编程模型
C#内置了强大的异步编程支持（async/await），简化了并发和异步操作的实现，提高了应用程序的响应性。

通过这些特性和功能，C#成为了构建各种类型应用程序的强大工具，无论是企业级应用、Web服务、移动应用还是游戏开发，都能提供优秀的解决方案。

## <a id="data-types"></a>C#数据类型详解

在编程中，数据类型用于定义变量可以存储的数据种类。C#是一种强类型语言，这意味着每个变量都必须有一个明确的类型。数据类型决定了：

1. 变量可以存储的数据种类
2. 变量占用的内存大小
3. 可以对变量执行的操作

### 为什么需要对数据类型进行分类管理？

#### 1. 内存管理优化
不同类型的数据占用不同的内存空间。例如，一个bool类型只需要1位，而一个long类型需要64位。通过分类管理，编译器可以为变量分配最合适的内存空间，避免浪费。

#### 2. 类型安全
类型分类有助于编译器在编译时检查代码的正确性。例如，不能将一个字符串直接赋值给一个整数变量，这种错误会在编译时被发现。

#### 3. 性能优化
不同类型支持不同的操作和运算。例如，数值类型支持数学运算，而字符类型支持字符操作。通过类型分类，编译器可以优化代码执行效率。

#### 4. 代码可读性和维护性
明确的数据类型使代码更易理解和维护。开发者可以清楚地知道每个变量的用途和可以执行的操作。

### C#数据类型分类

C#中的数据类型可以分为两大类：

#### 1. 值类型（Value Types）
值类型直接包含数据，存储在栈（Stack）内存中。当您创建一个值类型变量时，系统会在栈上直接存储该变量的值。

##### 基本数值类型：
- **整数类型**：sbyte、byte、short、ushort、int、uint、long、ulong
- **浮点类型**：float、double、decimal
- **字符类型**：char
- **布尔类型**：bool

##### 示例代码：
```csharp
// 整数类型
int age = 25;
long population = 7800000000L;
short temperature = -10;

// 浮点类型
float price = 99.9f;
double pi = 3.14159265359;
decimal accountBalance = 1234.56m;

// 字符类型
char grade = 'A';
char symbol = '@';

// 布尔类型
bool isCompleted = true;
bool isRunning = false;
```

#### 2. 引用类型（Reference Types）
引用类型存储对数据的引用（内存地址），实际数据存储在堆（Heap）内存中。引用类型包括：

- **字符串类型**：string
- **对象类型**：object
- **类**：class
- **接口**：interface
- **数组**：array
- **委托**：delegate

除了这些基本的引用类型，C#还提供了丰富的集合类型，用于存储和操作多个数据项：

##### 集合类型（Collections）

###### 1. List<T>（列表）
List<T>是动态数组，可以根据需要自动调整大小。

```csharp
// 创建整数列表
List<int> numbers = new List<int>();
numbers.Add(1);
numbers.Add(2);
numbers.Add(3);

// 创建并初始化字符串列表
List<string> names = new List<string> { "张三", "李四", "王五" };

// 访问列表元素
int firstNumber = numbers[0];
string firstName = names[0];

// 遍历列表
foreach (string name in names)
{
    Console.WriteLine(name);
}
```

###### 2. Dictionary<TKey, TValue>（字典/哈希表）
Dictionary<TKey, TValue>存储键值对，提供快速的键值查找。

```csharp
// 创建字典
Dictionary<string, int> ages = new Dictionary<string, int>();
ages["张三"] = 25;
ages["李四"] = 30;

// 创建并初始化字典
Dictionary<string, string> capitals = new Dictionary<string, string>
{
    { "中国", "北京" },
    { "美国", "华盛顿" },
    { "日本", "东京" }
};

// 访问字典元素
int zhangSanAge = ages["张三"];
string chinaCapital = capitals["中国"];

// 检查键是否存在
if (ages.ContainsKey("王五"))
{
    Console.WriteLine($"王五的年龄是: {ages["王五"]}");
}
else
{
    Console.WriteLine("未找到王五的信息");
}

// 遍历字典
foreach (var kvp in capitals)
{
    Console.WriteLine($"{kvp.Key}: {kvp.Value}");
}
```

###### 3. 其他常用集合类型
- **ArrayList**：非泛型动态数组（不推荐在新代码中使用）
- **Hashtable**：非泛型哈希表（不推荐在新代码中使用）
- **Queue<T>**：先进先出（FIFO）队列
- **Stack<T>**：后进先出（LIFO）栈
- **HashSet<T>**：不包含重复元素的集合

```csharp
// Queue<T> 示例
Queue<string> taskQueue = new Queue<string>();
taskQueue.Enqueue("任务1");
taskQueue.Enqueue("任务2");
string nextTask = taskQueue.Dequeue(); // 返回"任务1"

// Stack<T> 示例
Stack<int> numberStack = new Stack<int>();
numberStack.Push(1);
numberStack.Push(2);
int topNumber = numberStack.Pop(); // 返回2

// HashSet<T> 示例
HashSet<string> uniqueNames = new HashSet<string>();
uniqueNames.Add("张三");
uniqueNames.Add("李四");
uniqueNames.Add("张三"); // 不会添加重复项
```

##### 示例代码：
```csharp
// 字符串类型
string name = "张三";
string message = "Hello, World!";

// 对象类型（可以存储任何类型的值）
object obj1 = 100;
object obj2 = "文本";
object obj3 = true;

// 数组类型
int[] numbers = {1, 2, 3, 4, 5};
string[] names = {"张三", "李四", "王五"};
```

### 值类型与引用类型的区别

| 特性 | 值类型 | 引用类型 |
|------|--------|----------|
| 存储位置 | 栈内存 | 堆内存 |
| 内存分配 | 直接存储值 | 存储引用（地址） |
| 赋值操作 | 复制值 | 复制引用 |
| 默认值 | 0、false、'\0'等 | null |
| 性能 | 较快 | 相对较慢 |
| 内存回收 | 自动释放 | 由垃圾回收器管理 |

通过合理使用这些数据类型，我们可以编写出高效、安全且易于维护的C#程序。

## <a id="type-conversion"></a>C#类型转换详解

在编程过程中，我们经常需要在不同的数据类型之间进行转换。C#提供了多种类型转换机制，理解这些机制对编写高效、安全的代码至关重要。

### 隐式类型转换（Implicit Conversion）

隐式类型转换是由编译器自动执行的转换，不需要程序员显式指定。这种转换是安全的，不会导致数据丢失。

#### 基本原理

隐式转换发生在从较小范围的类型向较大范围的类型转换时。例如，从int到long的转换是安全的，因为long类型的范围比int类型更大，可以容纳int类型的所有可能值。

#### 数值类型间的隐式转换

C#中数值类型的隐式转换遵循一定的规则：

```csharp
// 整数类型间的隐式转换
byte b = 100;
short s = b;     // byte -> short (安全)
int i = s;       // short -> int (安全)
long l = i;      // int -> long (安全)

// 有符号到无符号类型的隐式转换（仅在特定情况下）
sbyte sb = 100;
short ss = sb;   // sbyte -> short (安全)

// 整数到浮点数的隐式转换
int intValue = 1000;
float floatValue = intValue;    // int -> float (可能精度丢失，但仍为隐式)
double doubleValue = intValue;  // int -> double (安全)

// float到double的隐式转换
float f = 3.14f;
double d = f;    // float -> double (安全)
```

#### 隐式转换的特点

1. **安全性**：隐式转换不会导致数据丢失或溢出
2. **自动性**：编译器自动处理，无需程序员干预
3. **方向性**：通常是从"小"类型向"大"类型转换

#### 隐式引用类型转换

除了值类型，引用类型之间也存在隐式转换：

```csharp
// 对象到object的隐式转换
string str = "Hello";
object obj = str;  // string -> object (安全)

// 派生类到基类的隐式转换
List<int> list = new List<int>();
IEnumerable<int> enumerable = list;  // List<int> -> IEnumerable<int> (安全)
```

#### 用户定义的隐式转换

C#允许开发者定义自定义的隐式转换操作符：

```csharp
public class Celsius
{
    public double Temperature { get; set; }
    
    public Celsius(double temperature)
    {
        Temperature = temperature;
    }
    
    // 定义从Celsius到Fahrenheit的隐式转换
    public static implicit operator Fahrenheit(Celsius c)
    {
        return new Fahrenheit(c.Temperature * 9 / 5 + 32);
    }
}

public class Fahrenheit
{
    public double Temperature { get; set; }
    
    public Fahrenheit(double temperature)
    {
        Temperature = temperature;
    }
}

// 使用示例
Celsius celsius = new Celsius(25);
Fahrenheit fahrenheit = celsius;  // 隐式转换
Console.WriteLine($"摄氏度: {celsius.Temperature}, 华氏度: {fahrenheit.Temperature}");
```

隐式转换使代码更加简洁和易读，但需要注意的是，并非所有类型之间都可以进行隐式转换，只有在保证安全的前提下编译器才会自动执行这种转换。

### 显式类型转换（Explicit Conversion）和强制类型转换（Casting）

与隐式转换相对，显式转换需要程序员明确指定转换操作。这类转换可能存在数据丢失的风险，因此必须由程序员显式声明。

#### 基本概念

显式转换（也称为强制类型转换或类型转换）使用强制转换运算符`()来执行。当从较大范围的类型转换为较小范围的类型，或者在不同类型之间转换时，通常需要显式转换。

#### 数值类型间的显式转换

```csharp
// 从大范围整数类型到小范围整数类型的显式转换
long longValue = 1000000L;
int intValue = (int)longValue;     // long -> int (需要显式转换)

// 从浮点数到整数的显式转换
double doubleValue = 123.456;
int intFromDouble = (int)doubleValue;  // 会丢失小数部分，结果为123

// 从double到float的显式转换
double d = 123.456789;
float f = (float)d;  // 可能精度丢失

// 从decimal到其他数值类型的显式转换
decimal decimalValue = 123.45m;
double doubleFromDecimal = (double)decimalValue;
int intFromDecimal = (int)decimalValue;
```

#### 显式转换的特点

1. **风险性**：可能导致数据丢失或精度降低
2. **必要性**：编译器要求必须显式声明
3. **可控性**：程序员明确知道转换可能发生的问题

#### 溢出检查和unchecked上下文

在进行显式转换时，可能会发生溢出。C#提供了`checked`和`unchecked`关键字来控制溢出检查：

```csharp
// checked上下文 - 检查溢出并抛出异常
try
{
    int largeNumber = int.MaxValue;
    long longNumber = largeNumber + 1000000L;
    int result = checked((int)longNumber);  // 会抛出OverflowException
}
catch (OverflowException ex)
{
    Console.WriteLine("发生溢出: " + ex.Message);
}

// unchecked上下文 - 不检查溢出
int largeNumber = int.MaxValue;
long longNumber = largeNumber + 1000000L;
int result = unchecked((int)longNumber);  // 不会抛出异常，但结果可能不正确
Console.WriteLine($"unchecked转换结果: {result}");
```

#### 引用类型间的显式转换

引用类型之间也经常需要显式转换，特别是基类到派生类的转换：

```csharp
// 基类到派生类的显式转换
object obj = "Hello World";
string str = (string)obj;  // object -> string (需要显式转换)

// 使用as操作符进行安全转换
object obj2 = 123;
string str2 = obj2 as string;  // 不会抛出异常，转换失败时返回null
if (str2 != null)
{
    Console.WriteLine("转换成功: " + str2);
}
else
{
    Console.WriteLine("转换失败");
}

// 使用is操作符检查类型兼容性
if (obj is string)
{
    string str3 = (string)obj;  // 安全转换
    Console.WriteLine("转换后的字符串: " + str3);
}
```

#### 用户定义的显式转换

与隐式转换类似，C#允许定义自定义的显式转换操作符：

```csharp
public class Fahrenheit
{
    public double Temperature { get; set; }
    
    public Fahrenheit(double temperature)
    {
        Temperature = temperature;
    }
    
    // 定义从Fahrenheit到Celsius的显式转换
    public static explicit operator Celsius(Fahrenheit f)
    {
        return new Celsius((f.Temperature - 32) * 5 / 9);
    }
}

public class Celsius
{
    public double Temperature { get; set; }
    
    public Celsius(double temperature)
    {
        Temperature = temperature;
    }
}

// 使用示例
Fahrenheit fahrenheit = new Fahrenheit(100);
Celsius celsius = (Celsius)fahrenheit;  // 必须显式转换
Console.WriteLine($"华氏度: {fahrenheit.Temperature}, 摄氏度: {celsius.Temperature}");
```

#### 转换方法和辅助类

除了强制转换运算符，C#还提供了其他转换方法，这些方法在处理字符串到数值类型的转换时特别有用：

```csharp
// Convert类的使用
string numberString = "123";
int convertedInt = Convert.ToInt32(numberString);

// Parse方法的使用
int parsedInt = int.Parse(numberString);

// TryParse方法的使用（推荐）
if (int.TryParse(numberString, out int result))
{
    Console.WriteLine($"转换成功: {result}");
}
else
{
    Console.WriteLine("转换失败");
}

// 处理可能失败的转换
string invalidString = "abc";
if (int.TryParse(invalidString, out int invalidResult))
{
    Console.WriteLine($"转换成功: {invalidResult}");
}
else
{
    Console.WriteLine($"'{invalidString}' 无法转换为整数");
}
```

##### Parse方法详解

Parse方法用于将字符串转换为指定的数据类型。如果转换成功，返回转换后的值；如果转换失败，则抛出异常。

```csharp
try
{
    string validNumber = "123";
    int number = int.Parse(validNumber);  // 成功转换为123
    Console.WriteLine($"Parse成功: {number}");
    
    string invalidNumber = "abc";
    int invalid = int.Parse(invalidNumber);  // 抛出FormatException异常
}
catch (FormatException)
{
    Console.WriteLine("输入的字符串格式不正确");
}
catch (OverflowException)
{
    Console.WriteLine("数值超出范围");
}
```

Parse方法适用于当你确定字符串可以被正确转换的情况，但在实际应用中，由于用户输入的不确定性，使用Parse方法时必须处理可能的异常。

##### TryParse方法详解

TryParse方法是更安全的转换方法，它不会抛出异常。如果转换成功，返回true并将结果存储在out参数中；如果转换失败，返回false。

```csharp
// 基本用法
string input1 = "123";
string input2 = "abc";

if (int.TryParse(input1, out int result1))
{
    Console.WriteLine($"{input1} 转换成功: {result1}");
}
else
{
    Console.WriteLine($"{input1} 转换失败");
}

if (int.TryParse(input2, out int result2))
{
    Console.WriteLine($"{input2} 转换成功: {result2}");
}
else
{
    Console.WriteLine($"{input2} 转换失败");
}

// 处理不同数值类型
string floatString = "123.45";
string doubleString = "678.901";

if (float.TryParse(floatString, out float floatResult))
{
    Console.WriteLine($"float转换成功: {floatResult}");
}

if (double.TryParse(doubleString, out double doubleResult))
{
    Console.WriteLine($"double转换成功: {doubleResult}");
}
```

TryParse方法是处理用户输入的推荐方式，因为它避免了异常处理的开销，并且代码更加清晰易读。

##### Convert类详解

Convert类提供了更广泛的转换功能，可以处理不同类型之间的转换，包括DBNull值的处理：

```csharp
// 基本转换
string stringNumber = "123";
int convertedInt = Convert.ToInt32(stringNumber);

// 处理null值
string nullString = null;
try
{
    int nullResult = int.Parse(nullString);  // 抛出ArgumentNullException
}
catch (ArgumentNullException)
{
    Console.WriteLine("Parse无法处理null值");
}

int convertResult = Convert.ToInt32(nullString);  // 返回0
Console.WriteLine($"Convert处理null值结果: {convertResult}");

// 处理各种数据类型
object objInt = 123;
object objString = "456";
object objDouble = 789.12;

int intFromObject = Convert.ToInt32(objInt);
int stringFromObject = Convert.ToInt32(objString);
int doubleFromObject = Convert.ToInt32(objDouble);

Console.WriteLine($"从int转换: {intFromObject}");
Console.WriteLine($"从string转换: {stringFromObject}");
Console.WriteLine($"从double转换: {doubleFromObject}");
```

##### 三种方法的比较

| 方法 | 异常处理 | 性能 | 适用场景 |
|------|----------|------|----------|
| Parse | 抛出异常 | 较快 | 确定转换会成功 |
| TryParse | 返回bool值 | 中等 | 不确定输入是否有效 |
| Convert | 处理null值 | 较慢 | 需要处理多种类型或null值 |

在实际开发中，推荐使用TryParse方法处理用户输入，因为它提供了最佳的安全性和性能平衡。

显式转换和强制类型转换是C#中处理类型转换的重要机制，它们允许我们在不同类型之间进行转换，但需要程序员明确意识到可能存在的风险，如数据丢失或溢出。

## <a id="operators"></a>C#运算符详解

运算符是用于执行程序代码运算的符号，它们可以对一个或多个操作数进行数学或逻辑运算。C#提供了丰富的运算符来支持各种操作。

### 算术运算符

算术运算符用于执行基本的数学运算：

| 运算符 | 名称 | 示例 | 说明 |
|--------|------|------|------|
| + | 加法 | a + b | 两个数相加 |
| - | 减法 | a - b | 两个数相减 |
| * | 乘法 | a * b | 两个数相乘 |
| / | 除法 | a / b | 两个数相除 |
| % | 取模 | a % b | 返回除法的余数 |
| ++ | 自增 | a++ | 将变量值加1 |
| -- | 自减 | a-- | 将变量值减1 |

```csharp
int a = 10;
int b = 3;

// 基本算术运算
int sum = a + b;        // 13
int difference = a - b; // 7
int product = a * b;    // 30
int quotient = a / b;   // 3 (整数除法)
int remainder = a % b;  // 1 (取余数)

// 自增和自减
int x = 5;
x++; // x现在是6
x--; // x现在是5

// 前置和后置自增
int y = 5;
int result1 = ++y; // 先自增，再赋值，result1 = 6, y = 6
int z = 5;
int result2 = z++; // 先赋值，再自增，result2 = 5, z = 6
```

### 比较运算符

比较运算符用于比较两个值，结果为布尔类型（true或false）：

| 运算符 | 名称 | 示例 | 说明 |
|--------|------|------|------|
| == | 等于 | a == b | 检查两个值是否相等 |
| != | 不等于 | a != b | 检查两个值是否不相等 |
| > | 大于 | a > b | 检查左边值是否大于右边值 |
| < | 小于 | a < b | 检查左边值是否小于右边值 |
| >= | 大于等于 | a >= b | 检查左边值是否大于等于右边值 |
| <= | 小于等于 | a <= b | 检查左边值是否小于等于右边值 |

```csharp
int x = 10;
int y = 20;

bool isEqual = (x == y);        // false
bool isNotEqual = (x != y);     // true
bool isGreater = (x > y);       // false
bool isLess = (x < y);          // true
bool isGreaterOrEqual = (x >= y); // false
bool isLessOrEqual = (x <= y);   // true
```

### 逻辑运算符

逻辑运算符用于组合多个布尔表达式：

| 运算符 | 名称 | 示例 | 说明 |
|--------|------|------|------|
| && | 逻辑与 | a && b | 当两个条件都为true时结果为true |
| \|\| | 逻辑或 | a \|\| b | 当至少一个条件为true时结果为true |
| ! | 逻辑非 | !a | 取反布尔值 |

```csharp
bool isSunny = true;
bool isWarm = false;

// 逻辑与
bool isGoodWeather = isSunny && isWarm; // false

// 逻辑或
bool picnicDay = isSunny || isWarm; // true

// 逻辑非
bool isNotSunny = !isSunny; // false

// 复合逻辑表达式
int age = 25;
bool canDrive = (age >= 18) && (age <= 80); // true
```

### 赋值运算符

赋值运算符用于给变量赋值：

| 运算符 | 示例 | 等价于 | 说明 |
|--------|------|--------|------|
| = | a = b |  | 简单赋值 |
| += | a += b | a = a + b | 加法赋值 |
| -= | a -= b | a = a - b | 减法赋值 |
| *= | a *= b | a = a * b | 乘法赋值 |
| /= | a /= b | a = a / b | 除法赋值 |
| %= | a %= b | a = a % b | 取模赋值 |

```csharp
int x = 10;

x += 5;  // 等价于 x = x + 5; x现在是15
x -= 3;  // 等价于 x = x - 3; x现在是12
x *= 2;  // 等价于 x = x * 2; x现在是24
x /= 4;  // 等价于 x = x / 4; x现在是6
x %= 4;  // 等价于 x = x % 4; x现在是2
```

### 位运算符

位运算符用于对整数类型的二进制位进行操作：

| 运算符 | 名称 | 示例 | 说明 |
|--------|------|------|------|
| & | 按位与 | a & b | 对两个数的每一位执行与操作 |
| \| | 按位或 | a \| b | 对两个数的每一位执行或操作 |
| ^ | 按位异或 | a ^ b | 对两个数的每一位执行异或操作 |
| ~ | 按位取反 | ~a | 对数的每一位执行取反操作 |
| << | 左移 | a << b | 将数的二进制位向左移动指定位数 |
| >> | 右移 | a >> b | 将数的二进制位向右移动指定位数 |

```csharp
int a = 5;  // 二进制: 0101
int b = 3;  // 二进制: 0011

int andResult = a & b;   // 0001 = 1
int orResult = a | b;    // 0111 = 7
int xorResult = a ^ b;   // 0110 = 6
int notResult = ~a;      // 1010 = -6 (补码表示)
int leftShift = a << 1;  // 1010 = 10
int rightShift = a >> 1; // 0010 = 2
```

### 条件运算符（三元运算符）

条件运算符是C#中唯一的三元运算符，它根据条件的真假返回两个值中的一个：

```csharp
// 语法: 条件 ? 值1 : 值2
int age = 18;
string status = (age >= 18) ? "成年人" : "未成年人";

// 等价于以下if-else语句
string status2;
if (age >= 18)
{
    status2 = "成年人";
}
else
{
    status2 = "未成年人";
}
```

### 运算符优先级

在复杂的表达式中，运算符按照优先级顺序执行。以下是一些常见运算符的优先级（从高到低）：

1. 括号：()
2. 自增/自减：++、--
3. 乘法、除法、取模：*、/、%
4. 加法、减法：+、-
5. 比较运算符：<、<=、>、>=
6. 相等运算符：==、!=
7. 逻辑与：&&
8. 逻辑或：`||`
9. 条件运算符：? :
10. 赋值运算符：=、+=、-=、*=、/=、%=

```csharp
int result = 5 + 3 * 2;        // 11 (先乘法后加法)
int result2 = (5 + 3) * 2;     // 16 (括号优先)
bool condition = 5 > 3 && 2 < 4; // true (比较运算符优先于逻辑运算符)
```

理解并正确使用这些运算符是编写C#程序的基础。在实际编程中，适当使用括号可以提高代码的可读性并确保运算顺序符合预期。

## <a id="branch-statements"></a>C#分支语句详解

在程序设计中，分支语句用于根据不同的条件执行不同的代码路径。C#提供了多种分支语句来实现程序的条件执行逻辑。

### if语句

if语句是最基本的条件语句，它根据条件的真假来决定是否执行某段代码。

#### 基本if语句

```csharp
int age = 18;

// 基本if语句
if (age >= 18)
{
    Console.WriteLine("您已成年");
}
```

#### if-else语句

当条件为真时执行一段代码，为假时执行另一段代码。

```csharp
int age = 16;

// if-else语句
if (age >= 18)
{
    Console.WriteLine("您已成年");
}
else
{
    Console.WriteLine("您未成年");
}
```

#### if-else if-else语句

可以检查多个条件，按顺序执行第一个为真的条件对应的代码块。

```csharp
int score = 85;

// 多重if-else语句
if (score >= 90)
{
    Console.WriteLine("优秀");
}
else if (score >= 80)
{
    Console.WriteLine("良好");
}
else if (score >= 70)
{
    Console.WriteLine("中等");
}
else if (score >= 60)
{
    Console.WriteLine("及格");
}
else
{
    Console.WriteLine("不及格");
}
```

#### 嵌套if语句

if语句可以嵌套使用，以实现更复杂的条件判断。

```csharp
int age = 25;
bool hasLicense = true;

// 嵌套if语句
if (age >= 18)
{
    if (hasLicense)
    {
        Console.WriteLine("您可以合法驾驶");
    }
    else
    {
        Console.WriteLine("您已成年但没有驾照");
    }
}
else
{
    Console.WriteLine("您未成年");
}
```

### switch语句

switch语句用于根据变量的值执行不同的代码块，是多重条件判断的另一种实现方式。

#### 基本switch语句

```csharp
int day = 3;
string dayName;

// 基本switch语句
switch (day)
{
    case 1:
        dayName = "星期一";
        break;
    case 2:
        dayName = "星期二";
        break;
    case 3:
        dayName = "星期三";
        break;
    case 4:
        dayName = "星期四";
        break;
    case 5:
        dayName = "星期五";
        break;
    case 6:
        dayName = "星期六";
        break;
    case 7:
        dayName = "星期日";
        break;
    default:
        dayName = "无效的日期";
        break;
}

Console.WriteLine(dayName);
```

#### switch语句中的fall through（贯穿）

在某些情况下，可以故意省略break语句来实现贯穿效果。

```csharp
int score = 85;

// switch语句中的贯穿
switch (score / 10)
{
    case 10:
    case 9:
        Console.WriteLine("优秀");
        break;
    case 8:
        Console.WriteLine("良好");
        break;
    case 7:
        Console.WriteLine("中等");
        break;
    case 6:
        Console.WriteLine("及格");
        break;
    default:
        Console.WriteLine("不及格");
        break;
}
```

#### C# 8.0及以后版本的switch表达式

C# 8.0引入了switch表达式，提供了更简洁的语法。

```csharp
int day = 3;

// switch表达式
string dayName = day switch
{
    1 => "星期一",
    2 => "星期二",
    3 => "星期三",
    4 => "星期四",
    5 => "星期五",
    6 => "星期六",
    7 => "星期日",
    _ => "无效的日期"  // 相当于default
};

Console.WriteLine(dayName);

// 带条件的switch表达式
int score = 85;
string grade = score switch
{
    >= 90 => "优秀",
    >= 80 => "良好",
    >= 70 => "中等",
    >= 60 => "及格",
    _ => "不及格"
};

Console.WriteLine(grade);
```

### 条件运算符（三元运算符）

条件运算符(?:)是if-else语句的简化形式，适用于简单的条件判断。

```csharp
int age = 18;

// 三元运算符
string status = (age >= 18) ? "成年人" : "未成年人";
Console.WriteLine(status);

// 三元运算符嵌套
int score = 85;
string grade = score >= 60 ? 
    (score >= 80 ? 
        (score >= 90 ? "优秀" : "良好") : 
        "及格") : 
    "不及格";
Console.WriteLine(grade);
```

### 分支语句的最佳实践

#### 1. 避免深层嵌套

深层嵌套的if语句会降低代码的可读性，应尽量避免。

```csharp
// 不推荐的深层嵌套
if (condition1)
{
    if (condition2)
    {
        if (condition3)
        {
            // 执行操作
        }
    }
}

// 推荐的扁平化写法
if (condition1 && condition2 && condition3)
{
    // 执行操作
}

// 或者提前返回
if (!condition1)
    return;

if (!condition2)
    return;

if (!condition3)
    return;

// 执行操作
```

#### 2. 使用卫语句（Guard Clauses）

卫语句是一种编程模式，通过提前返回来减少嵌套层级。

```csharp
// 不使用卫语句
void ProcessUser(User user)
{
    if (user != null)
    {
        if (user.IsActive)
        {
            if (user.Age >= 18)
            {
                // 处理用户
            }
            else
            {
                Console.WriteLine("用户未成年");
            }
        }
        else
        {
            Console.WriteLine("用户未激活");
        }
    }
    else
    {
        Console.WriteLine("用户为空");
    }
}

// 使用卫语句
void ProcessUser(User user)
{
    if (user == null)
    {
        Console.WriteLine("用户为空");
        return;
    }

    if (!user.IsActive)
    {
        Console.WriteLine("用户未激活");
        return;
    }

    if (user.Age < 18)
    {
        Console.WriteLine("用户未成年");
        return;
    }

    // 处理用户
}
```

#### 3. 合理使用switch语句

当有多个离散值需要判断时，switch语句比多重if-else更清晰。

```csharp
// 适合使用switch的情况
string GetDayType(DayOfWeek day)
{
    return day switch
    {
        DayOfWeek.Saturday or DayOfWeek.Sunday => "周末",
        DayOfWeek.Monday or DayOfWeek.Tuesday or DayOfWeek.Wednesday or 
        DayOfWeek.Thursday or DayOfWeek.Friday => "工作日",
        _ => "未知"
    };
}
```

#### 4. 注意浮点数比较

在进行浮点数比较时，应该使用误差范围而不是直接相等比较。

```csharp
double a = 0.1 + 0.2;
double b = 0.3;

// 错误的做法
if (a == b)
{
    Console.WriteLine("相等");
}

// 正确的做法
if (Math.Abs(a - b) < 0.0001)
{
    Console.WriteLine("近似相等");
}
```

分支语句是程序控制流程的基础，合理使用这些语句可以让程序根据不同的条件执行相应的逻辑，实现复杂的业务需求。

## <a id="functions"></a>C#函数详解

函数（在C#中也称为方法）是执行特定任务的代码块。函数有助于将复杂的程序分解为更小、更易管理的部分，提高代码的可重用性和可维护性。

### 函数的基本结构

C#中的函数由以下几个部分组成：
1. 访问修饰符（如public、private等）
2. 返回类型（函数返回值的类型）
3. 函数名
4. 参数列表（括号中的参数）
5. 函数体（花括号中的代码）

```csharp
// 函数的基本结构示例
public int Add(int a, int b)
{
    return a + b;
}
```

### 函数的定义和调用

#### 无返回值的函数（void类型）

```csharp
// 定义一个无返回值的函数
public void SayHello()
{
    Console.WriteLine("Hello, World!");
}

// 调用函数
SayHello();
```

#### 有返回值的函数

```csharp
// 定义一个有返回值的函数
public int Add(int x, int y)
{
    return x + y;
}

// 调用函数并使用返回值
int result = Add(5, 3);
Console.WriteLine($"5 + 3 = {result}");
```

### return语句详解

return语句用于从函数中返回，并可以返回一个值（对于有返回类型的函数）。理解return语句的各种用法对于编写清晰的代码至关重要。

#### 1. 基本return语句

```csharp
// 返回值的return语句
public int GetMax(int a, int b)
{
    if (a > b)
        return a;  // 提前返回
    return b;      // 正常返回
}

// void函数的return（可选）
public void ProcessData()
{
    if (data == null)
        return;  // 提前退出，不返回值
    // 继续处理
}

// 返回表达式的值
public int Square(int x)
{
    return x * x;  // 返回表达式的结果
}

// 返回字面量
public string GetGreeting()
{
    return "Hello, World!";
}
```

#### 2. 提前返回（Early Return）

提前返回是一种编程模式，通过提前退出函数来减少嵌套层级，提高代码可读性。

```csharp
// 不使用提前返回（深层嵌套）
public bool IsValidUser(User user)
{
    if (user != null)
    {
        if (!string.IsNullOrEmpty(user.Name))
        {
            if (user.Age >= 18)
            {
                if (user.Email != null && user.Email.Contains("@"))
                {
                    return true;
                }
            }
        }
    }
    return false;
}

// 使用提前返回（推荐）
public bool IsValidUser(User user)
{
    // 提前返回无效情况
    if (user == null)
        return false;
    
    if (string.IsNullOrEmpty(user.Name))
        return false;
    
    if (user.Age < 18)
        return false;
    
    if (user.Email == null || !user.Email.Contains("@"))
        return false;
    
    // 所有验证通过
    return true;
}

// 提前返回在void函数中的应用
public void ProcessOrder(Order order)
{
    if (order == null)
        return;  // 提前退出
    
    if (order.Items.Count == 0)
        return;  // 提前退出
    
    // 处理订单
    Console.WriteLine($"处理订单: {order.Id}");
}
```

#### 3. 返回多个值

C#提供了多种方式返回多个值：

```csharp
// 方式1：使用out参数（已介绍）

// 方式2：使用元组（Tuple）- C# 7.0+
public (int sum, int product) Calculate(int a, int b)
{
    return (a + b, a * b);
}

// 调用示例
var result = Calculate(5, 3);
Console.WriteLine($"和: {result.sum}, 积: {result.product}");

// 解构元组
(int sum, int product) = Calculate(5, 3);
Console.WriteLine($"和: {sum}, 积: {product}");

// 方式3：使用命名元组
public (int Sum, int Product) CalculateNamed(int a, int b)
{
    return (Sum: a + b, Product: a * b);
}

// 调用示例
var result2 = CalculateNamed(5, 3);
Console.WriteLine($"和: {result2.Sum}, 积: {result2.Product}");

// 方式4：返回自定义类或结构
public class CalculationResult
{
    public int Sum { get; set; }
    public int Product { get; set; }
}

public CalculationResult CalculateWithClass(int a, int b)
{
    return new CalculationResult
    {
        Sum = a + b,
        Product = a * b
    };
}

// 方式5：返回数组或集合
public int[] GetMinMax(int[] numbers)
{
    if (numbers == null || numbers.Length == 0)
        return new int[0];
    
    return new int[] { numbers.Min(), numbers.Max() };
}
```

#### 4. 条件返回

```csharp
// 三元运算符返回
public string GetStatus(int score)
{
    return score >= 60 ? "及格" : "不及格";
}

// 多个条件返回
public string GetGrade(int score)
{
    if (score >= 90) return "优秀";
    if (score >= 80) return "良好";
    if (score >= 70) return "中等";
    if (score >= 60) return "及格";
    return "不及格";
}

// switch表达式返回（C# 8.0+）
public string GetGradeSwitch(int score) => score switch
{
    >= 90 => "优秀",
    >= 80 => "良好",
    >= 70 => "中等",
    >= 60 => "及格",
    _ => "不及格"
};
```

#### 5. 返回null和默认值

```csharp
// 返回null（引用类型）
public string FindUser(int id)
{
    // 查找用户
    if (userExists)
        return user;
    return null;  // 未找到返回null
}

// 返回默认值
public int GetValueOrDefault(int? value)
{
    return value ?? 0;  // 如果为null返回0
}

// 使用default关键字
public T GetDefault<T>()
{
    return default(T);  // 返回类型的默认值
}

// 调用示例
int defaultInt = GetDefault<int>();        // 0
string defaultString = GetDefault<string>(); // null
bool defaultBool = GetDefault<bool>();     // false
```

#### 6. 返回集合和数组

```csharp
// 返回数组
public int[] GetEvenNumbers(int[] numbers)
{
    List<int> evens = new List<int>();
    foreach (int num in numbers)
    {
        if (num % 2 == 0)
            evens.Add(num);
    }
    return evens.ToArray();
}

// 返回List
public List<string> GetNames()
{
    return new List<string> { "张三", "李四", "王五" };
}

// 返回IEnumerable（延迟执行）
public IEnumerable<int> GetNumbers()
{
    for (int i = 0; i < 10; i++)
    {
        yield return i;  // 使用yield return
    }
}

// 调用示例
foreach (int num in GetNumbers())
{
    Console.WriteLine(num);
}
```

#### 7. 返回委托和Lambda

```csharp
// 返回委托
public Func<int, int> GetMultiplier(int factor)
{
    return x => x * factor;
}

// 调用示例
var multiplyBy5 = GetMultiplier(5);
int result = multiplyBy5(10); // 50

// 返回Action
public Action<string> GetLogger(bool isError)
{
    if (isError)
        return message => Console.WriteLine($"[错误] {message}");
    else
        return message => Console.WriteLine($"[信息] {message}");
}
```

#### 8. return与异常处理

```csharp
// return在try-catch中的使用
public int SafeDivide(int a, int b)
{
    try
    {
        if (b == 0)
            throw new DivideByZeroException("除数不能为零");
        return a / b;
    }
    catch (DivideByZeroException)
    {
        return 0;  // 发生异常时返回默认值
    }
}

// return在finally中的注意事项
public int ProcessWithFinally()
{
    try
    {
        return 100;
    }
    finally
    {
        // finally中的代码会在return之前执行
        Console.WriteLine("清理资源");
    }
    // 注意：finally之后不能有return语句
}
```

#### 9. return语句的最佳实践

```csharp
// 1. 单一返回点 vs 多个返回点
// 多个返回点（推荐用于简单验证）
public bool IsValid(string input)
{
    if (string.IsNullOrEmpty(input))
        return false;
    
    if (input.Length < 5)
        return false;
    
    return true;
}

// 单一返回点（适用于复杂逻辑）
public string ProcessData(string input)
{
    string result = null;
    
    if (!string.IsNullOrEmpty(input))
    {
        result = input.Trim().ToUpper();
        // 更多处理...
    }
    
    return result;
}

// 2. 明确返回值类型
public int? GetNullableInt()
{
    // 明确返回可空类型
    return null;
}

// 3. 避免在finally中使用return（不推荐）
public int BadExample()
{
    try
    {
        return 1;
    }
    finally
    {
        return 2;  // 这会覆盖try中的返回值，不推荐
    }
}

// 4. 使用表达式体成员（C# 6.0+）
public int Add(int a, int b) => a + b;
public bool IsEven(int n) => n % 2 == 0;
public string GetName() => "张三";
```

#### 10. return语句总结

| 场景 | 语法 | 说明 |
|------|------|------|
| 返回值 | `return value;` | 返回指定值 |
| 提前退出 | `return;` | void函数中提前退出 |
| 返回null | `return null;` | 返回null值 |
| 返回默认值 | `return default(T);` | 返回类型默认值 |
| 返回表达式 | `return a + b;` | 返回表达式结果 |
| 条件返回 | `return condition ? value1 : value2;` | 三元运算符 |
| 返回元组 | `return (a, b);` | 返回多个值 |
| 返回集合 | `return list;` | 返回集合或数组 |

return语句是函数控制流程的关键，合理使用return可以让代码更加清晰、易读和高效。

### 函数参数详解

参数是函数与外部世界交互的桥梁，C#提供了多种参数传递方式，每种方式都有其特定的用途和适用场景。

#### 1. 值参数（Value Parameters）

值参数是默认的参数传递方式，函数接收的是实际参数值的副本。对于值类型，传递的是值的副本；对于引用类型，传递的是引用的副本。

```csharp
// 值类型参数 - 传递值的副本
public void ModifyValue(int number)
{
    number = 100; // 这个修改不会影响调用方的变量
    Console.WriteLine($"函数内部: number = {number}");
}

// 调用示例
int value = 50;
ModifyValue(value);
Console.WriteLine($"函数外部: value = {value}"); // 仍然是50

// 引用类型参数 - 传递引用的副本
public void ModifyArray(int[] arr)
{
    arr[0] = 999; // 修改数组元素会影响原数组（因为引用指向同一对象）
    arr = new int[] { 1, 2, 3 }; // 但重新赋值不会影响原引用
    Console.WriteLine($"函数内部数组: [{string.Join(", ", arr)}]");
}

// 调用示例
int[] numbers = { 10, 20, 30 };
ModifyArray(numbers);
Console.WriteLine($"函数外部数组: [{string.Join(", ", numbers)}]"); // [999, 20, 30]

// 值参数的特点
// - 调用方不需要特殊语法
// - 函数内部对参数的修改不会影响调用方的变量（引用类型除外，但重新赋值引用不会影响）
// - 适用于大多数场景
```

#### 2. 引用参数（ref）

使用ref关键字可以按引用传递参数，函数可以直接修改调用方的变量。调用时必须使用ref关键字，且变量必须先初始化。

```csharp
// ref参数示例
public void ModifyRefValue(ref int number)
{
    number = 100; // 这个修改会影响调用方的变量
    Console.WriteLine($"函数内部: number = {number}");
}

// 调用示例
int value = 50;
ModifyRefValue(ref value); // 必须使用ref关键字
Console.WriteLine($"函数外部: value = {value}"); // 现在是100

// ref参数用于交换两个变量的值
public void Swap(ref int a, ref int b)
{
    int temp = a;
    a = b;
    b = temp;
}

// 调用示例
int x = 10, y = 20;
Console.WriteLine($"交换前: x = {x}, y = {y}");
Swap(ref x, ref y);
Console.WriteLine($"交换后: x = {x}, y = {y}"); // x = 20, y = 10

// ref参数的特点
// - 调用方和函数定义都必须使用ref关键字
// - 变量必须先初始化才能作为ref参数传递
// - 函数内部对参数的修改会直接影响调用方的变量
// - 适用于需要函数修改调用方变量的场景
```

#### 3. 输出参数（out）

使用out关键字可以在函数中为参数赋值，并将值返回给调用方。out参数必须在函数返回前赋值，调用时变量不需要初始化。

```csharp
// out参数示例 - 返回多个值
public void Calculate(int a, int b, out int sum, out int product)
{
    sum = a + b;      // 必须在返回前赋值
    product = a * b;  // 必须在返回前赋值
}

// 调用示例
int x = 5, y = 3;
Calculate(x, y, out int sum, out int product); // 变量可以在调用时声明
Console.WriteLine($"和: {sum}, 积: {product}");

// 或者先声明变量
int result1, result2;
Calculate(x, y, out result1, out result2);
Console.WriteLine($"和: {result1}, 积: {result2}");

// out参数用于TryParse模式
public bool TryDivide(int dividend, int divisor, out double result)
{
    if (divisor == 0)
    {
        result = 0; // 即使失败也要赋值
        return false;
    }
    result = (double)dividend / divisor;
    return true;
}

// 调用示例
if (TryDivide(10, 3, out double quotient))
{
    Console.WriteLine($"除法结果: {quotient}");
}
else
{
    Console.WriteLine("除法失败");
}

// out参数的特点
// - 调用方和函数定义都必须使用out关键字
// - 变量不需要初始化就可以作为out参数传递
// - 函数必须在返回前为out参数赋值
// - 适用于需要返回多个值的场景，特别是TryParse模式
```

#### 4. 参数数组（params）

使用params关键字可以传递可变数量的参数。params参数必须是参数列表中的最后一个参数，且只能有一个params参数。

```csharp
// params参数示例
public int Sum(params int[] numbers)
{
    int total = 0;
    foreach (int number in numbers)
    {
        total += number;
    }
    return total;
}

// 调用示例 - 多种方式
int result1 = Sum(1, 2, 3);           // 6 - 直接传递多个参数
int result2 = Sum(1, 2, 3, 4, 5);     // 15 - 传递任意数量的参数
int result3 = Sum(new int[] {1, 2, 3, 4, 5, 6}); // 21 - 传递数组
int result4 = Sum();                   // 0 - 可以不传参数

// params参数与其他参数结合
public void PrintInfo(string title, params object[] values)
{
    Console.Write($"{title}: ");
    foreach (var value in values)
    {
        Console.Write($"{value} ");
    }
    Console.WriteLine();
}

// 调用示例
PrintInfo("数字", 1, 2, 3, 4, 5);
PrintInfo("信息", "姓名", "张三", "年龄", 25);

// params参数的特点
// - 必须是参数列表中的最后一个参数
// - 只能有一个params参数
// - 可以传递0个或多个参数
// - 适用于参数数量不确定的场景
```

#### 5. 可选参数和默认值

C#允许为参数指定默认值，这样在调用时可以省略这些参数。有默认值的参数必须放在没有默认值的参数之后。

```csharp
// 默认参数示例
public void PrintInfo(string name, int age = 18, string city = "未知")
{
    Console.WriteLine($"姓名: {name}, 年龄: {age}, 城市: {city}");
}

// 调用示例
PrintInfo("张三");                    // 姓名: 张三, 年龄: 18, 城市: 未知
PrintInfo("李四", 25);               // 姓名: 李四, 年龄: 25, 城市: 未知
PrintInfo("王五", 30, "北京");       // 姓名: 王五, 年龄: 30, 城市: 北京

// 默认参数必须是编译时常量
public void SetTimeout(int milliseconds = 1000) // 正确
{
    // ...
}

// 默认参数与params结合
public void Log(string message, bool isError = false, params object[] args)
{
    string prefix = isError ? "[错误]" : "[信息]";
    Console.WriteLine($"{prefix} {message}", args);
}

// 调用示例
Log("用户登录成功");
Log("发生错误", true, "数据库连接失败");
Log("处理完成", false, "共处理", 100, "条记录");

// 默认参数的特点
// - 默认值必须是编译时常量
// - 有默认值的参数必须放在没有默认值的参数之后
// - 调用时可以省略有默认值的参数
// - 适用于参数有常用默认值的场景
```

#### 6. 命名参数

调用函数时可以使用命名参数，提高代码的可读性，并且可以改变参数的传递顺序。

```csharp
// 函数定义
public void CreateUser(string name, int age, string email, bool isActive = true)
{
    Console.WriteLine($"创建用户: {name}, {age}岁, 邮箱: {email}, 激活: {isActive}");
}

// 使用命名参数
CreateUser(name: "张三", age: 25, email: "zhangsan@example.com");
CreateUser(email: "lisi@example.com", name: "李四", age: 30); // 可以改变顺序
CreateUser("王五", 28, "wangwu@example.com", isActive: false); // 混合使用位置参数和命名参数

// 命名参数与默认参数结合
public void SendEmail(string to, string subject, string body = "", bool isHtml = false)
{
    Console.WriteLine($"发送邮件到: {to}");
    Console.WriteLine($"主题: {subject}");
    Console.WriteLine($"内容: {body}");
    Console.WriteLine($"HTML格式: {isHtml}");
}

// 调用示例 - 只指定需要的参数
SendEmail(to: "user@example.com", subject: "测试邮件");
SendEmail(to: "user@example.com", subject: "HTML邮件", isHtml: true);
SendEmail("user@example.com", "主题", "内容", true); // 也可以不使用命名参数

// 命名参数的特点
// - 提高代码可读性
// - 可以改变参数传递顺序
// - 必须放在位置参数之后（如果混合使用）
// - 适用于参数较多或参数含义不明显的场景
```

#### 7. 参数传递方式对比

| 参数类型 | 关键字 | 调用语法 | 变量初始化 | 函数内赋值 | 适用场景 |
|---------|--------|---------|-----------|-----------|---------|
| 值参数 | 无 | `Func(value)` | 需要 | 可选 | 大多数场景 |
| ref参数 | ref | `Func(ref value)` | 需要 | 可选 | 需要修改调用方变量 |
| out参数 | out | `Func(out value)` | 不需要 | 必须 | 返回多个值，TryParse模式 |
| params参数 | params | `Func(1, 2, 3)` | - | - | 参数数量不确定 |
| 默认参数 | = | `Func()` | - | - | 参数有常用默认值 |
| 命名参数 | : | `Func(name: value)` | - | - | 提高可读性 |

#### 8. 参数验证和异常处理

```csharp
// 参数验证示例
public double Divide(double dividend, double divisor)
{
    // 参数验证
    if (double.IsNaN(dividend) || double.IsNaN(divisor))
    {
        throw new ArgumentException("参数不能为NaN");
    }
    
    if (divisor == 0)
    {
        throw new DivideByZeroException("除数不能为零");
    }
    
    return dividend / divisor;
}

// 使用nameof获取参数名（C# 6.0+）
public void SetAge(int age)
{
    if (age < 0 || age > 150)
    {
        throw new ArgumentOutOfRangeException(nameof(age), "年龄必须在0-150之间");
    }
    // ...
}

// 参数验证的最佳实践
public void ProcessUser(string name, int age, string email)
{
    // 使用ArgumentNullException检查null
    if (string.IsNullOrWhiteSpace(name))
        throw new ArgumentNullException(nameof(name), "姓名不能为空");
    
    // 使用ArgumentException检查无效值
    if (age < 0 || age > 150)
        throw new ArgumentException("年龄必须在0-150之间", nameof(age));
    
    // 使用ArgumentOutOfRangeException检查范围
    if (string.IsNullOrWhiteSpace(email))
        throw new ArgumentException("邮箱不能为空", nameof(email));
    
    // 处理逻辑
    Console.WriteLine($"处理用户: {name}, {age}岁, {email}");
}
```

### 函数重载

C#支持函数重载，即可以定义多个同名但参数列表不同的函数。

```csharp
// 重载的Add函数
public int Add(int a, int b)
{
    return a + b;
}

public double Add(double a, double b)
{
    return a + b;
}

public int Add(int a, int b, int c)
{
    return a + b + c;
}

// 调用示例
int result1 = Add(5, 3);        // 调用第一个Add函数
double result2 = Add(5.5, 3.2); // 调用第二个Add函数
int result3 = Add(1, 2, 3);     // 调用第三个Add函数
```

### 匿名函数与Lambda表达式

C#支持匿名函数，即没有名称的函数。匿名函数可以使用`delegate`关键字定义，或者使用更简洁的Lambda表达式语法。

#### 1. 使用delegate关键字的匿名函数

```csharp
// 定义一个接受两个int参数并返回int的匿名函数
Func<int, int, int> addDelegate = delegate(int a, int b)
{
    return a + b;
};

// 调用匿名函数
int result = addDelegate(5, 3); // 结果为8
```

#### 2. Lambda表达式

Lambda表达式提供了一种更简洁的方式来编写匿名函数，语法为：`(parameters) => expression`或`(parameters) => { statements }`。

```csharp
// 简单的Lambda表达式（单行）
Func<int, int, int> addLambda = (a, b) => a + b;
int sum = addLambda(5, 3); // 结果为8

// 多行Lambda表达式
Func<int, int, int> multiplyLambda = (a, b) =>
{
    Console.WriteLine($"Multiplying {a} and {b}");
    return a * b;
};
int product = multiplyLambda(4, 6); // 结果为24
```

### Func委托

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

### Action委托

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

### Func与Action的应用场景

#### 1. 作为参数传递给其他方法

```csharp
// 使用Func作为参数
public int ProcessNumbers(int a, int b, Func<int, int, int> operation)
{
    return operation(a, b);
}

// 使用Action作为参数
public void ProcessData(string data, Action<string> processAction)
{
    Console.WriteLine($"Processing: {data}");
    processAction(data);
}

// 调用示例
int result = ProcessNumbers(5, 3, (x, y) => x * y); // 使用Lambda表达式作为参数
ProcessData("Sample data", (data) => Console.WriteLine($"Processed: {data.ToUpper()}"));
```

#### 2. 实现回调功能

```csharp
public void LongRunningOperation(Action<string> callback)
{
    // 模拟长时间运行的操作
    Thread.Sleep(2000);
    
    // 操作完成后调用回调
    callback("Operation completed successfully!");
}

// 调用示例
LongRunningOperation((message) => Console.WriteLine(message));
```

#### 3. 配合LINQ使用

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// 使用Func作为LINQ方法的参数
var evenNumbers = numbers.Where(n => n % 2 == 0);
var squaredNumbers = numbers.Select(n => n * n);
var sumOfSquares = numbers.Where(n => n % 2 == 0).Sum(n => n * n);

// 输出结果
Console.WriteLine("Even numbers: " + string.Join(", ", evenNumbers));
Console.WriteLine("Squared numbers: " + string.Join(", ", squaredNumbers));
Console.WriteLine("Sum of squares of even numbers: " + sumOfSquares);
```

### 默认参数

C#允许为函数参数指定默认值，这样在调用时可以省略这些参数。

```csharp
public void PrintInfo(string name, int age = 18, string city = "未知")
{
    Console.WriteLine($"姓名: {name}, 年龄: {age}, 城市: {city}");
}

// 调用示例
PrintInfo("张三");                    // 姓名: 张三, 年龄: 18, 城市: 未知
PrintInfo("李四", 25);               // 姓名: 李四, 年龄: 25, 城市: 未知
PrintInfo("王五", 30, "北京");       // 姓名: 王五, 年龄: 30, 城市: 北京
```

### 命名参数

调用函数时可以使用命名参数，提高代码的可读性。

```csharp
public void CreateUser(string name, int age, string email, bool isActive = true)
{
    Console.WriteLine($"创建用户: {name}, {age}岁, 邮箱: {email}, 激活: {isActive}");
}

// 调用示例（使用命名参数）
CreateUser(name: "张三", age: 25, email: "zhangsan@example.com");
// 输出: 创建用户: 张三, 25岁, 邮箱: zhangsan@example.com, 激活: True

CreateUser(email: "lisi@example.com", name: "李四", age: 30);
// 输出: 创建用户: 李四, 30岁, 邮箱: lisi@example.com, 激活: True
```

### 递归函数

函数可以调用自身，这称为递归。递归在解决某些问题时非常有用。

```csharp
// 计算阶乘的递归函数
public int Factorial(int n)
{
    if (n <= 1)
        return 1;
    else
        return n * Factorial(n - 1);
}

// 计算斐波那契数列的递归函数
public int Fibonacci(int n)
{
    if (n <= 1)
        return n;
    else
        return Fibonacci(n - 1) + Fibonacci(n - 2);
}

// 调用示例
Console.WriteLine($"5的阶乘: {Factorial(5)}");     // 120
Console.WriteLine($"第10个斐波那契数: {Fibonacci(10)}"); // 55
```

### Lambda表达式

Lambda表达式是一种简洁的函数定义方式，常用于简化代码。

```csharp
// 传统函数定义
public int Add(int a, int b)
{
    return a + b;
}

// 等价的Lambda表达式
Func<int, int, int> add = (a, b) => a + b;

// 使用Lambda表达式
int result = add(5, 3); // 8
Console.WriteLine($"Lambda计算结果: {result}"); // 输出: Lambda计算结果: 8

// Lambda表达式用于集合操作
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
List<int> evenNumbers = numbers.Where(n => n % 2 == 0).ToList(); // [2, 4]
int sum = numbers.Sum(n => n); // 15
Console.WriteLine($"偶数: [{string.Join(", ", evenNumbers)}]"); // 输出: 偶数: [2, 4]
Console.WriteLine($"总和: {sum}"); // 输出: 总和: 15
```

### 局部函数

C# 7.0引入了局部函数，允许在函数内部定义函数。

```csharp
public void ProcessData()
{
    // 局部函数
    int Square(int x) => x * x;
    
    int Add(int a, int b) => a + b;
    
    // 使用局部函数
    int result = Add(Square(3), Square(4));
    Console.WriteLine($"结果: {result}"); // 结果: 25
}
```

### 函数最佳实践

#### 1. 函数应该具有单一职责

```csharp
// 不好的做法 - 一个函数做多件事情
public void ProcessOrder(Order order)
{
    // 验证订单
    if (order.Items.Count == 0)
        throw new Exception("订单不能为空");
    
    // 计算总价
    decimal total = 0;
    foreach (var item in order.Items)
    {
        total += item.Price * item.Quantity;
    }
    
    // 保存订单
    SaveOrder(order);
}

// 好的做法 - 拆分为多个函数
public void ProcessOrder(Order order)
{
    ValidateOrder(order);
    CalculateTotal(order);
    SaveOrder(order);
}

private void ValidateOrder(Order order)
{
    if (order.Items.Count == 0)
        throw new Exception("订单不能为空");
}

private void CalculateTotal(Order order)
{
    order.Total = order.Items.Sum(item => item.Price * item.Quantity);
}

private void SaveOrder(Order order)
{
    // 保存订单逻辑
}
```

#### 2. 函数应该具有良好的命名

```csharp
// 不好的命名
public bool Check(int x)
{
    return x > 0;
}

// 好的命名
public bool IsPositive(int number)
{
    return number > 0;
}
```

#### 3. 函数应该尽量短小

```csharp
// 过长的函数
public void ProcessUserData(User user)
{
    // 验证用户数据
    if (user == null)
        throw new ArgumentNullException(nameof(user));
    
    if (string.IsNullOrEmpty(user.Name))
        throw new ArgumentException("用户名不能为空");
    
    if (user.Age < 0 || user.Age > 150)
        throw new ArgumentException("年龄必须在0-150之间");
    
    // 格式化用户数据
    user.Name = user.Name.Trim();
    user.Email = user.Email?.ToLower();
    
    // 保存用户数据
    userRepository.Save(user);
    
    // 发送欢迎邮件
    if (!string.IsNullOrEmpty(user.Email))
    {
        emailService.SendWelcomeEmail(user.Email);
    }
    
    // 记录日志
    logger.Info($"用户 {user.Name} 已创建");
}

// 拆分为多个小函数
public void ProcessUserData(User user)
{
    ValidateUser(user);
    FormatUserData(user);
    SaveUser(user);
    SendWelcomeEmail(user);
    LogUserCreation(user);
}

private void ValidateUser(User user)
{
    if (user == null)
        throw new ArgumentNullException(nameof(user));
    
    if (string.IsNullOrEmpty(user.Name))
        throw new ArgumentException("用户名不能为空");
    
    if (user.Age < 0 || user.Age > 150)
        throw new ArgumentException("年龄必须在0-150之间");
}

private void FormatUserData(User user)
{
    user.Name = user.Name.Trim();
    user.Email = user.Email?.ToLower();
}

private void SaveUser(User user)
{
    userRepository.Save(user);
}

private void SendWelcomeEmail(User user)
{
    if (!string.IsNullOrEmpty(user.Email))
    {
        emailService.SendWelcomeEmail(user.Email);
    }
}

private void LogUserCreation(User user)
{
    logger.Info($"用户 {user.Name} 已创建");
}
```

函数是C#编程的基础构建块，合理使用函数可以让代码更加模块化、可重用和易于维护。通过掌握函数的各种特性和最佳实践，可以编写出高质量的C#程序。

## <a id="math-class"></a>C# Math类详解

Math类是C#中用于执行基本数学运算的静态类，提供了丰富的数学函数，包括三角函数、对数函数、幂函数、舍入函数等。使用Math类可以简化复杂的数学计算。

### Math类的基本数学运算

Math类提供了许多常用的数学运算方法，这些方法都是静态的，可以直接通过类名调用：

```csharp
using System;

// 基本数学运算
double abs = Math.Abs(-5.5);        // 绝对值
double ceil = Math.Ceiling(5.3);    // 向上取整
double floor = Math.Floor(5.7);     // 向下取整
double round = Math.Round(5.5);     // 四舍五入
double truncate = Math.Truncate(5.789); // 截断小数部分
double max = Math.Max(10, 20);      // 最大值
double min = Math.Min(10, 20);      // 最小值

// 输出结果
Console.WriteLine($"Abs(-5.5): {abs}");        // 输出: Abs(-5.5): 5.5
Console.WriteLine($"Ceiling(5.3): {ceil}");     // 输出: Ceiling(5.3): 6
Console.WriteLine($"Floor(5.7): {floor}");       // 输出: Floor(5.7): 5
Console.WriteLine($"Round(5.5): {round}");       // 输出: Round(5.5): 6
Console.WriteLine($"Truncate(5.789): {truncate}"); // 输出: Truncate(5.789): 5
Console.WriteLine($"Max(10,20): {max}");         // 输出: Max(10,20): 20
Console.WriteLine($"Min(10,20): {min}");         // 输出: Min(10,20): 10
```

### 幂运算和根运算

Math类提供了处理幂运算和根运算的方法：

```csharp
// 幂运算
double pow = Math.Pow(2, 3);        // 2的3次方
double sqrt = Math.Sqrt(16);        // 平方根
double cbrt = Math.Cbrt(27);        // 立方根 (C# 10+)

// 对数运算
double log = Math.Log(Math.E);      // 自然对数
double log10 = Math.Log10(100);     // 常用对数 (以10为底)
double log2 = Math.Log2(8);         // 以2为底的对数 (C# 10+)

// 输出结果
Console.WriteLine($"Pow(2,3): {pow}");      // 输出: Pow(2,3): 8
Console.WriteLine($"Sqrt(16): {sqrt}");     // 输出: Sqrt(16): 4
Console.WriteLine($"Cbrt(27): {cbrt}");     // 输出: Cbrt(27): 3
Console.WriteLine($"Log(e): {log}");        // 输出: Log(e): 1
Console.WriteLine($"Log10(100): {log10}");  // 输出: Log10(100): 2
Console.WriteLine($"Log2(8): {log2}");      // 输出: Log2(8): 3
```

### 三角函数

Math类提供了完整的三角函数支持，注意这些函数的参数都是以弧度为单位。在实际应用中，我们通常习惯使用角度，因此需要进行角度与弧度之间的转换：

```csharp
// 角度与弧度转换的通用公式
// 弧度 = 角度 * π / 180
// 角度 = 弧度 * 180 / π

// 定义转换方法（可选，为了代码可读性）
public static double DegreesToRadians(double degrees)
{
    return degrees * Math.PI / 180.0;
}

public static double RadiansToDegrees(double radians)
{
    return radians * 180.0 / Math.PI;
}

// 直接使用Math类进行转换
const double angle30 = 30.0;
const double angle45 = 45.0;
const double angle60 = 60.0;
const double angle90 = 90.0;

// 角度转弧度
double rad30 = angle30 * Math.PI / 180;  // 30度转弧度
double rad45 = angle45 * Math.PI / 180;  // 45度转弧度
double rad60 = angle60 * Math.PI / 180;  // 60度转弧度
double rad90 = angle90 * Math.PI / 180;  // 90度转弧度

// 三角函数计算（使用角度）
double sin30 = Math.Sin(angle30 * Math.PI / 180);  // sin(30°)
double cos45 = Math.Cos(angle45 * Math.PI / 180);  // cos(45°)
double tan60 = Math.Tan(angle60 * Math.PI / 180);  // tan(60°)

// 三角函数计算（使用弧度）
double sinPiOver6 = Math.Sin(Math.PI / 6);   // sin(π/6) = sin(30°)
double cosPiOver4 = Math.Cos(Math.PI / 4);   // cos(π/4) = cos(45°)
double tanPiOver3 = Math.Tan(Math.PI / 3);   // tan(π/3) = tan(60°)

// 反三角函数（结果为弧度）
double asinValue = Math.Asin(0.5);           // arcsin(0.5) = π/6 弧度
double acosValue = Math.Acos(0.707106781);   // arccos(0.707106781) ≈ π/4 弧度
double atanValue = Math.Atan(1.0);           // arctan(1.0) = π/4 弧度

// 将反三角函数结果转换为角度
double asinDegrees = asinValue * 180 / Math.PI;  // 转换为角度
double acosDegrees = acosValue * 180 / Math.PI;  // 转换为角度
double atanDegrees = atanValue * 180 / Math.PI;  // 转换为角度

// 输出结果
Console.WriteLine($"30度 = {rad30}弧度");
Console.WriteLine($"45度 = {rad45}弧度");
Console.WriteLine($"60度 = {rad60}弧度");
Console.WriteLine($"90度 = {rad90}弧度");

Console.WriteLine($"sin(30°) = {sin30}");
Console.WriteLine($"cos(45°) = {cos45}");
Console.WriteLine($"tan(60°) = {tan60}");

Console.WriteLine($"arcsin(0.5) = {asinValue}弧度 = {asinDegrees}度");
Console.WriteLine($"arccos(0.707106781) = {acosValue}弧度 = {acosDegrees}度");
Console.WriteLine($"arctan(1.0) = {atanValue}弧度 = {atanDegrees}度");
```

### 实用的三角函数示例

以下是一些常见的三角函数应用场景：

```csharp
// 计算直角三角形的边长
public static void RightTriangleExample()
{
    double angle = 30;  // 角度
    double hypotenuse = 10;  // 斜边长度
    
    // 计算对边和邻边长度
    double opposite = hypotenuse * Math.Sin(angle * Math.PI / 180);
    double adjacent = hypotenuse * Math.Cos(angle * Math.PI / 180);
    
    Console.WriteLine($"角度: {angle}度");
    Console.WriteLine($"斜边: {hypotenuse}");
    Console.WriteLine($"对边: {opposite}");
    Console.WriteLine($"邻边: {adjacent}");
}

// 计算两点间的角度
public static double CalculateAngle(double x1, double y1, double x2, double y2)
{
    double deltaX = x2 - x1;
    double deltaY = y2 - y1;
    
    // 使用Atan2计算角度（结果为弧度）
    double angleRadians = Math.Atan2(deltaY, deltaX);
    
    // 转换为角度
    double angleDegrees = angleRadians * 180 / Math.PI;
    
    // 确保角度在0-360度范围内
    if (angleDegrees < 0)
        angleDegrees += 360;
    
    return angleDegrees;
}

// 坐标旋转
public static (double newX, double newY) RotatePoint(double x, double y, double angleDegrees)
{
    double angleRadians = angleDegrees * Math.PI / 180;
    double cos = Math.Cos(angleRadians);
    double sin = Math.Sin(angleRadians);
    
    double newX = x * cos - y * sin;
    double newY = x * sin + y * cos;
    
    return (newX, newY);
}

// 使用示例
static void TrigonometryExamples()
{
    Console.WriteLine("=== 直角三角形示例 ===");
    RightTriangleExample();
    
    Console.WriteLine("\n=== 角度计算示例 ===");
    double angle = CalculateAngle(0, 0, 1, 1);
    Console.WriteLine($"从原点到点(1,1)的角度: {angle}度");
    
    Console.WriteLine("\n=== 坐标旋转示例 ===");
    var (newX, newY) = RotatePoint(1, 0, 90);  // 将点(1,0)绕原点旋转90度
    Console.WriteLine($"点(1,0)绕原点旋转90度后: ({newX}, {newY})");
}
```

### Math类的常量

Math类提供了两个重要的数学常量：

```csharp
// 数学常量
double pi = Math.PI;                // 圆周率π
double e = Math.E;                  // 自然对数的底e

// 输出结果
Console.WriteLine($"π: {pi}");      // 输出: π: 3.141592653589793
Console.WriteLine($"e: {e}");       // 输出: e: 2.718281828459045
```

### 随机数生成

虽然Random类更适合生成随机数，但Math类也提供了随机数方法：

```csharp
// 随机数 (返回0.0到1.0之间的double值)
double random = Math.Random();

// 生成指定范围的随机数
int randomInt = (int)(Math.Random() * 100); // 0到99的随机整数

double min = 10.0;
double max = 20.0;
double randomRange = min + Math.Random() * (max - min); // min到max之间的随机数

// 输出结果
Console.WriteLine($"Random: {random}");           // 输出: Random: 0.123456789 (具体值随机)
Console.WriteLine($"RandomInt: {randomInt}");     // 输出: RandomInt: 45 (具体值随机)
Console.WriteLine($"RandomRange: {randomRange}"); // 输出: RandomRange: 15.6789 (具体值随机)
```

### 舍入和精度控制

Math类提供了多种舍入方法来控制数字的精度：

```csharp
// 舍入方法
double value = 12.345;

// 四舍五入到指定小数位数
double rounded1 = Math.Round(value, 2);           // 保留2位小数
double rounded2 = Math.Round(value, 2, MidpointRounding.AwayFromZero); // 四舍五入

double truncateValue = Math.Truncate(value);      // 截断小数部分

double ceilingValue = Math.Ceiling(value);        // 向上取整
double floorValue = Math.Floor(value);            // 向下取整

// 输出结果
Console.WriteLine($"原始值: {value}");                    // 输出: 原始值: 12.345
Console.WriteLine($"Round(2位小数): {rounded1}");        // 输出: Round(2位小数): 12.34
Console.WriteLine($"Round(远离零): {rounded2}");         // 输出: Round(远离零): 12.35
Console.WriteLine($"Truncate: {truncateValue}");          // 输出: Truncate: 12
Console.WriteLine($"Ceiling: {ceilingValue}");           // 输出: Ceiling: 13
Console.WriteLine($"Floor: {floorValue}");               // 输出: Floor: 12
```

### Math类的实际应用示例

以下是一些Math类在实际开发中的应用场景：

```csharp
using System;

class MathExamples
{
    // 计算两点间距离
    public static double Distance(double x1, double y1, double x2, double y2)
    {
        return Math.Sqrt(Math.Pow(x2 - x1, 2) + Math.Pow(y2 - y1, 2));
    }
    
    // 判断是否为素数
    public static bool IsPrime(int n)
    {
        if (n <= 1) return false;
        if (n <= 3) return true;
        if (n % 2 == 0 || n % 3 == 0) return false;
        
        int sqrt = (int)Math.Sqrt(n);
        for (int i = 5; i <= sqrt; i += 6)
        {
            if (n % i == 0 || n % (i + 2) == 0) return false;
        }
        return true;
    }
    
    // 计算圆的面积
    public static double CircleArea(double radius)
    {
        return Math.PI * Math.Pow(radius, 2);
    }
    
    // 计算球的体积
    public static double SphereVolume(double radius)
    {
        return (4.0 / 3.0) * Math.PI * Math.Pow(radius, 3);
    }
    
    // 生成指定范围的随机整数
    public static int RandomRange(int min, int max)
    {
        return (int)(Math.Random() * (max - min + 1)) + min;
    }
    
    static void Main()
    {
        // 测试距离计算
        double distance = Distance(0, 0, 3, 4);
        Console.WriteLine($"两点间距离: {distance}"); // 输出: 两点间距离: 5
        
        // 测试素数判断
        Console.WriteLine($"17是素数: {IsPrime(17)}"); // 输出: 17是素数: True
        Console.WriteLine($"18是素数: {IsPrime(18)}"); // 输出: 18是素数: False
        
        // 测试圆面积计算
        double area = CircleArea(5);
        Console.WriteLine($"半径为5的圆面积: {area}"); // 输出: 半径为5的圆面积: 78.53981633974483
        
        // 测试球体积计算
        double volume = SphereVolume(3);
        Console.WriteLine($"半径为3的球体积: {volume}"); // 输出: 半径为3的球体积: 113.09733552923254
        
        // 测试随机数生成
        for (int i = 0; i < 5; i++)
        {
            int randomNum = RandomRange(1, 10);
            Console.Write($"{randomNum} "); // 输出: 3 7 1 9 4 (示例，具体值随机)
        }
        Console.WriteLine();
    }
}
```

### Math类使用注意事项

1. **静态方法调用**：Math类中的所有方法都是静态的，直接通过类名调用，无需创建实例。

2. **参数单位**：三角函数的参数是弧度而不是角度，需要进行转换时使用`角度 * Math.PI / 180`。

3. **返回类型**：大多数Math方法返回double类型，必要时需要进行类型转换。

4. **精度问题**：浮点数运算可能存在精度问题，在比较时应使用误差范围而不是直接相等比较。

5. **异常处理**：某些方法在无效输入时会返回特殊值（如NaN或Infinity）而不是抛出异常。

6. **性能考虑**：复杂的数学运算可能影响性能，在性能敏感的代码中应考虑优化。

### Math类常用函数速查表

为了方便查阅，下面列出了Math类中常用的函数及其参数和作用：

#### 基本数学运算

| 函数 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Abs | 数值类型 value | 同输入类型 | 返回指定数字的绝对值。支持int、long、float、double等数值类型 |
| Max | 数值类型 val1, val2 | 同输入类型 | 返回两个数字中的较大值。支持int、long、float、double等数值类型 |
| Min | 数值类型 val1, val2 | 同输入类型 | 返回两个数字中的较小值。支持int、long、float、double等数值类型 |
| Sign | double value | int | 返回指定数字的符号（正数返回1，负数返回-1，零返回0） |

#### 舍入和精度控制

| 函数 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Ceiling | double value | double | 返回大于或等于指定数字的最小整数 |
| Floor | double value | double | 返回小于或等于指定数字的最大整数 |
| Round | double value, (int digits), (MidpointRounding mode) | double | 将值舍入到最近的整数或指定小数位数，可指定舍入模式 |
| Truncate | double value | double | 将指定数字的小数部分截断 |

#### 幂运算和对数运算

| 函数 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Pow | double x, double y | double | 返回x的y次幂 (x^y) |
| Sqrt | double value | double | 返回指定数字的平方根 |
| Cbrt | double value | double | 返回指定数字的立方根 (C# 10+) |
| Exp | double value | double | 返回 e 的指定次幂 |
| Log | double value, (double base) | double | 返回指定数字的自然对数或指定底数的对数 |
| Log10 | double value | double | 返回指定数字的常用对数（以10为底） |
| Log2 | double value | double | 返回指定数字的以2为底的对数 (C# 10+) |

#### 三角函数

| 函数 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Sin/Cos/Tan | double radians | double | 返回指定弧度的正弦/余弦/正切值 |
| Asin/Acos/Atan | double value | double | 返回指定数字的反正弦/反余弦/反正切值 |
| Atan2 | double y, double x | double | 返回由正切值的商所定义的角度 |
| Sinh/Cosh/Tanh | double value | double | 返回指定角度的双曲正弦/余弦/正切值 |

#### 常量

| 名称 | 类型 | 值 | 说明 |
|------|------|--------|----------|
| PI | double | 3.141592653589793 | 圆周率π |
| E | double | 2.718281828459045 | 自然对数的底数e |

通过合理使用Math类，可以大大简化数学计算的代码编写，提高开发效率和代码可读性。

## <a id="random-class"></a>C# Random类详解

在编程中，我们经常需要生成随机数，例如游戏开发中的随机事件、抽奖程序、密码生成等场景。C#提供了Random类来生成伪随机数。

### Random类的基本使用

Random类用于生成随机数序列。需要注意的是，Random类生成的是伪随机数，这意味着它们是通过算法计算出来的，看起来是随机的，但实际上是可以预测的。

```csharp
using System;

// 创建Random对象
Random random = new Random();

// 生成0到Int32.MaxValue-1之间的随机整数
int randomInt = random.Next();

// 生成0到指定值之间的随机整数（不包含指定值）
int randomIntLessThan100 = random.Next(100); // 0到99之间的随机整数

// 生成指定范围内的随机整数（包含最小值，不包含最大值）
int randomIntInRange = random.Next(10, 20); // 10到19之间的随机整数

// 生成0.0到1.0之间的随机浮点数
double randomDouble = random.NextDouble();

// 生成指定范围内的随机浮点数
double min = 5.0;
double max = 15.0;
double randomDoubleInRange = random.NextDouble() * (max - min) + min;

// 输出结果
Console.WriteLine($"随机整数: {randomInt}");
Console.WriteLine($"0到99之间的随机整数: {randomIntLessThan100}");
Console.WriteLine($"10到19之间的随机整数: {randomIntInRange}");
Console.WriteLine($"0.0到1.0之间的随机浮点数: {randomDouble}");
Console.WriteLine($"5.0到15.0之间的随机浮点数: {randomDoubleInRange}");
```

### Random类的构造函数

Random类提供了两种构造函数：

1. **无参构造函数**：使用系统时间作为种子值
2. **有参构造函数**：使用指定的种子值

```csharp
// 使用系统时间作为种子（推荐用于大多数场景）
Random random1 = new Random();

// 使用指定种子值（相同种子会产生相同的随机数序列）
Random random2 = new Random(12345);

// 演示相同种子的效果
Random r1 = new Random(100);
Random r2 = new Random(100);

Console.WriteLine("使用相同种子生成的随机数序列:");
for (int i = 0; i < 5; i++)
{
    Console.WriteLine($"r1: {r1.Next(1, 100)}, r2: {r2.Next(1, 100)}");
}
```

### Random类常用方法详解

Random类提供了多种生成随机数的方法：

#### Next()方法

```csharp
Random random = new Random();

// Next() - 返回非负随机整数
int next1 = random.Next();
Console.WriteLine($"Next(): {next1}");

// Next(maxValue) - 返回0到maxValue之间的随机整数（不包含maxValue）
int next2 = random.Next(100);
Console.WriteLine($"Next(100): {next2}");

// Next(minValue, maxValue) - 返回minValue到maxValue之间的随机整数（包含minValue，不包含maxValue）
int next3 = random.Next(50, 100);
Console.WriteLine($"Next(50, 100): {next3}");
```

#### NextDouble()方法

```csharp
Random random = new Random();

// NextDouble() - 返回0.0到1.0之间的随机浮点数
double nextDouble = random.NextDouble();
Console.WriteLine($"NextDouble(): {nextDouble}");

// 生成指定范围内的随机浮点数
public static double NextDouble(Random random, double min, double max)
{
    return random.NextDouble() * (max - min) + min;
}

double randomValue = NextDouble(random, 10.5, 20.8);
Console.WriteLine($"10.5到20.8之间的随机浮点数: {randomValue}");
```

#### NextBytes()方法

```csharp
Random random = new Random();

// NextBytes() - 用随机数填充字节数组
byte[] buffer = new byte[10];
random.NextBytes(buffer);

Console.WriteLine("随机字节数组:");
foreach (byte b in buffer)
{
    Console.Write($"{b} ");
}
Console.WriteLine();
```

### Random类的实际应用示例

以下是一些Random类在实际开发中的应用场景：

```csharp
using System;
using System.Collections.Generic;

class RandomExamples
{
    private static Random random = new Random();
    
    // 生成随机密码
    public static string GeneratePassword(int length)
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        char[] password = new char[length];
        
        for (int i = 0; i < length; i++)
        {
            password[i] = chars[random.Next(chars.Length)];
        }
        
        return new string(password);
    }
    
    // 随机打乱数组
    public static void Shuffle<T>(T[] array)
    {
        for (int i = array.Length - 1; i > 0; i--)
        {
            int j = random.Next(i + 1);
            T temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }
    
    // 从集合中随机选择元素
    public static T RandomSelect<T>(IList<T> list)
    {
        if (list == null || list.Count == 0)
            throw new ArgumentException("列表不能为空");
            
        int index = random.Next(list.Count);
        return list[index];
    }
    
    // 模拟抛硬币
    public static string FlipCoin()
    {
        return random.Next(2) == 0 ? "正面" : "反面";
    }
    
    // 模拟掷骰子
    public static int RollDice(int sides = 6)
    {
        return random.Next(1, sides + 1);
    }
    
    // 生成随机颜色
    public static string GenerateRandomColor()
    {
        int red = random.Next(256);
        int green = random.Next(256);
        int blue = random.Next(256);
        return $"RGB({red}, {green}, {blue})";
    }
    
    static void Main()
    {
        Console.WriteLine($"随机密码: {GeneratePassword(12)}");
        
        string[] cards = { "红桃", "方块", "梅花", "黑桃" };
        Shuffle(cards);
        Console.WriteLine("洗牌后:");
        foreach (string card in cards)
        {
            Console.Write($"{card} ");
        }
        Console.WriteLine();
        
        string[] fruits = { "苹果", "香蕉", "橙子", "葡萄", "草莓" };
        Console.WriteLine($"随机选择的水果: {RandomSelect(fruits)}");
        
        Console.WriteLine($"抛硬币结果: {FlipCoin()}");
        Console.WriteLine($"掷骰子结果: {RollDice()}");
        Console.WriteLine($"随机颜色: {GenerateRandomColor()}");
    }
}
```

### Random类使用注意事项

1. **线程安全性**：Random类不是线程安全的。在多线程环境中，应为每个线程创建独立的Random实例，或者使用锁机制。

2. **种子值选择**：使用无参构造函数时，系统会使用当前时间作为种子值。如果在短时间内创建多个Random实例，可能会产生相同的随机数序列。

3. **避免频繁创建实例**：不应在循环中频繁创建Random实例，而应复用同一个实例。

```csharp
// 错误的做法 - 可能产生相同的随机数
for (int i = 0; i < 10; i++)
{
    Random r = new Random();
    Console.Write(r.Next(1, 100) + " ");
}
Console.WriteLine();

// 正确的做法 - 复用同一个实例
Random random = new Random();
for (int i = 0; i < 10; i++)
{
    Console.Write(random.Next(1, 100) + " ");
}
Console.WriteLine();
```

4. **随机数分布**：NextDouble()方法返回的随机数在0.0到1.0之间是均匀分布的。

5. **安全性考虑**：Random类生成的是伪随机数，不适合用于加密等安全性要求高的场景。对于这类场景，应使用System.Security.Cryptography命名空间中的类。

### Random类常用方法速查表

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Next | (int maxValue) 或 (int minValue, int maxValue) | int | 生成随机整数。无参返回非负整数，一个参数返回0到maxValue-1的值，两个参数返回minValue到maxValue-1的值 |
| NextDouble | 无 | double | 返回0.0到1.0之间的随机浮点数 |
| NextBytes | byte[] buffer | void | 用随机数填充字节数组 |
| NextInt64 | (long maxValue) 或 (long minValue, long maxValue) | long | 生成随机长整数 (C# 10+) |
| NextSingle | 无 | float | 返回0.0到1.0之间的随机单精度浮点数 (C# 10+) |

通过合理使用Random类，可以为应用程序添加随机性，增强用户体验，实现游戏逻辑，进行模拟计算等。

## <a id="datetime-class"></a>C# DateTime类详解

在实际开发中，处理日期和时间是一个常见的需求，例如记录用户注册时间、计算时间差、格式化时间显示等。C#提供了DateTime结构来处理日期和时间相关的操作。

### DateTime类的基本概念

DateTime结构表示一个时间点，精确到100纳秒，称为刻度(Ticks)。DateTime的值范围从公元1年1月1日到公元9999年12月31日。

### DateTime的创建和初始化

DateTime可以通过多种方式创建：

```csharp
using System;

// 1. 使用默认构造函数（创建最小日期值）
DateTime defaultDate = new DateTime(); // 0001/1/1 0:00:00

// 2. 指定年、月、日
DateTime date1 = new DateTime(2025, 11, 20);

// 3. 指定年、月、日、时、分、秒
DateTime date2 = new DateTime(2025, 11, 20, 14, 30, 0);

// 4. 指定年、月、日、时、分、秒和毫秒
DateTime date3 = new DateTime(2025, 11, 20, 14, 30, 0, 500);

// 5. 使用静态属性获取特殊日期时间
DateTime now = DateTime.Now;           // 当前本地时间
DateTime utcNow = DateTime.UtcNow;     // 当前UTC时间
DateTime today = DateTime.Today;       // 今天的日期，时间为00:00:00
DateTime min = DateTime.MinValue;      // 最小日期值 0001/1/1 0:00:00
DateTime max = DateTime.MaxValue;      // 最大日期值 9999/12/31 23:59:59

// 输出结果
Console.WriteLine($"默认日期: {defaultDate}");
// 输出: 默认日期: 0001/1/1 0:00:00

Console.WriteLine($"指定日期: {date1}");
// 输出: 指定日期: 2025/11/20 0:00:00

Console.WriteLine($"指定日期时间: {date2}");
// 输出: 指定日期时间: 2025/11/20 14:30:00

Console.WriteLine($"指定日期时间毫秒: {date3}");
// 输出: 指定日期时间毫秒: 2025/11/20 14:30:00

Console.WriteLine($"当前时间: {now}");
// 输出: 当前时间: 2025/11/19 12:00:00 (实际值取决于当前时间)

Console.WriteLine($"UTC时间: {utcNow}");
// 输出: UTC时间: 2025/11/19 4:00:00 (实际值取决于当前UTC时间)

Console.WriteLine($"今天: {today}");
// 输出: 今天: 2025/11/19 0:00:00 (实际值取决于当前日期)

Console.WriteLine($"最小日期: {min}");
// 输出: 最小日期: 0001/1/1 0:00:00

Console.WriteLine($"最大日期: {max}");
// 输出: 最大日期: 9999/12/31 23:59:59
```

### DateTime的常用属性

DateTime提供了丰富的属性来获取日期时间的各个组成部分：

```csharp
DateTime now = DateTime.Now;

Console.WriteLine($"当前时间: {now}");
// 输出: 当前时间: 2025/11/19 12:00:00 (实际值取决于当前时间)

Console.WriteLine($"年: {now.Year}");
// 输出: 年: 2025 (实际值取决于当前年份)

Console.WriteLine($"月: {now.Month}");
// 输出: 月: 11 (实际值取决于当前月份)

Console.WriteLine($"日: {now.Day}");
// 输出: 日: 19 (实际值取决于当前日期)

Console.WriteLine($"时: {now.Hour}");
// 输出: 时: 12 (实际值取决于当前时间)

Console.WriteLine($"分: {now.Minute}");
// 输出: 分: 0 (实际值取决于当前时间)

Console.WriteLine($"秒: {now.Second}");
// 输出: 秒: 0 (实际值取决于当前时间)

Console.WriteLine($"毫秒: {now.Millisecond}");
// 输出: 毫秒: 0 (实际值取决于当前时间)

Console.WriteLine($"星期: {now.DayOfWeek}");
// 输出: 星期: Wednesday (实际值取决于当前日期)

Console.WriteLine($"一年中的第几天: {now.DayOfYear}");
// 输出: 一年中的第几天: 323 (实际值取决于当前日期)

Console.WriteLine($"刻度数: {now.Ticks}");
// 输出: 刻度数: 638123456789012345 (实际值取决于当前时间)

Console.WriteLine($"日期部分: {now.Date}");
// 输出: 日期部分: 2025/11/19 0:00:00 (实际值取决于当前日期)

Console.WriteLine($"时间部分: {now.TimeOfDay}");
// 输出: 时间部分: 12:00:00 (实际值取决于当前时间)
```

### DateTime的格式化

DateTime可以通过ToString方法进行格式化显示：

```csharp
DateTime now = DateTime.Now;

// 标准格式
Console.WriteLine($"默认格式: {now}");
// 输出: 默认格式: 2025/11/19 12:00:00 (实际值取决于当前时间)

Console.WriteLine($"短日期: {now.ToShortDateString()}");
// 输出: 短日期: 2025/11/19

Console.WriteLine($"长日期: {now.ToLongDateString()}");
// 输出: 长日期: 2025年11月19日 (中文环境) 或 Wednesday, November 19, 2025 (英文环境)

Console.WriteLine($"短时间: {now.ToShortTimeString()}");
// 输出: 短时间: 12:00

Console.WriteLine($"长时间: {now.ToLongTimeString()}");
// 输出: 长时间: 12:00:00

// 自定义格式
Console.WriteLine($"自定义格式1: {now:yyyy-MM-dd}");
// 输出: 自定义格式1: 2025-11-19

Console.WriteLine($"自定义格式2: {now:yyyy年MM月dd日}");
// 输出: 自定义格式2: 2025年11月19日

Console.WriteLine($"自定义格式3: {now:yyyy-MM-dd HH:mm:ss}");
// 输出: 自定义格式3: 2025-11-19 12:00:00

Console.WriteLine($"自定义格式4: {now:yyyy年MM月dd日 HH时mm分ss秒}");
// 输出: 自定义格式4: 2025年11月19日 12时00分00秒

// 使用ToString方法
Console.WriteLine($"ToString(""d""): {now.ToString("d")}");
// 输出: ToString("d"): 2025/11/19

Console.WriteLine($"ToString(""D""): {now.ToString("D")}");
// 输出: ToString("D"): 2025年11月19日 (中文环境)

Console.WriteLine($"ToString(""f""): {now.ToString("f")}");
// 输出: ToString("f"): 2025年11月19日 12:00 (中文环境)

Console.WriteLine($"ToString(""F""): {now.ToString("F")}");
// 输出: ToString("F"): 2025年11月19日 12:00:00 (中文环境)

Console.WriteLine($"ToString(""g""): {now.ToString("g")}");
// 输出: ToString("g"): 2025/11/19 12:00

Console.WriteLine($"ToString(""G""): {now.ToString("G")}");
// 输出: ToString("G"): 2025/11/19 12:00:00

Console.WriteLine($"ToString(""yyyy-MM-dd HH:mm:ss""): {now.ToString("yyyy-MM-dd HH:mm:ss")}");
// 输出: ToString("yyyy-MM-dd HH:mm:ss"): 2025-11-19 12:00:00
```

### DateTime的计算和比较

DateTime支持各种计算和比较操作：

```csharp
DateTime date1 = new DateTime(2025, 1, 1);
DateTime date2 = new DateTime(2025, 12, 31);

// 比较操作
Console.WriteLine($"date1 < date2: {date1 < date2}");
// 输出: date1 < date2: True

Console.WriteLine($"date1 > date2: {date1 > date2}");
// 输出: date1 > date2: False

Console.WriteLine($"date1 == date2: {date1 == date2}");
// 输出: date1 == date2: False

Console.WriteLine($"date1 != date2: {date1 != date2}");
// 输出: date1 != date2: True

Console.WriteLine($"date1.CompareTo(date2): {date1.CompareTo(date2)}");
// 输出: date1.CompareTo(date2): -1 (负数表示date1 < date2)

// 计算时间差
TimeSpan difference = date2 - date1;
Console.WriteLine($"时间差: {difference}");
// 输出: 时间差: 364.00:00:00

Console.WriteLine($"相差天数: {difference.TotalDays}");
// 输出: 相差天数: 364

// 添加时间
DateTime futureDate = date1.AddYears(1);
DateTime pastDate = date1.AddMonths(-3);
DateTime nextWeek = date1.AddDays(7);
DateTime tomorrow = date1.AddHours(24);
DateTime nextMinute = date1.AddMinutes(1);
DateTime nextSecond = date1.AddSeconds(1);

Console.WriteLine($"原日期: {date1}");
// 输出: 原日期: 2025/1/1 0:00:00

Console.WriteLine($"增加1年: {futureDate}");
// 输出: 增加1年: 2026/1/1 0:00:00

Console.WriteLine($"减少3个月: {pastDate}");
// 输出: 减少3个月: 2024/10/1 0:00:00

Console.WriteLine($"增加7天: {nextWeek}");
// 输出: 增加7天: 2025/1/8 0:00:00

Console.WriteLine($"增加24小时: {tomorrow}");
// 输出: 增加24小时: 2025/1/2 0:00:00

Console.WriteLine($"增加1分钟: {nextMinute}");
// 输出: 增加1分钟: 2025/1/1 0:01:00

Console.WriteLine($"增加1秒: {nextSecond}");
// 输出: 增加1秒: 2025/1/1 0:00:01
```

#### 时间直接相加相减计算

DateTime支持与TimeSpan直接进行加减运算，这是处理时间间隔最灵活的方式：

```csharp
DateTime date1 = new DateTime(2025, 1, 1, 10, 30, 0);
DateTime date2 = new DateTime(2025, 1, 1, 14, 45, 30);

// 1. DateTime与TimeSpan相加
TimeSpan span1 = new TimeSpan(2, 15, 30); // 2小时15分30秒
DateTime result1 = date1 + span1;
Console.WriteLine($"原时间: {date1}");
// 输出: 原时间: 2025/1/1 10:30:00

Console.WriteLine($"加上2小时15分30秒: {result1}");
// 输出: 加上2小时15分30秒: 2025/1/1 12:45:30

// 2. DateTime与TimeSpan相减
TimeSpan span2 = new TimeSpan(1, 30, 0); // 1小时30分钟
DateTime result2 = date1 - span2;
Console.WriteLine($"减去1小时30分钟: {result2}");
// 输出: 减去1小时30分钟: 2025/1/1 9:00:00

// 3. 两个DateTime相减得到TimeSpan
TimeSpan difference = date2 - date1;
Console.WriteLine($"时间差: {difference}");
// 输出: 时间差: 04:15:30 (4小时15分30秒)

// 4. 使用TimeSpan.FromXXX方法创建时间间隔
DateTime baseDate = new DateTime(2025, 1, 1, 12, 0, 0);

// 使用FromDays添加天数
DateTime afterDays = baseDate + TimeSpan.FromDays(5);
Console.WriteLine($"5天后: {afterDays}");
// 输出: 5天后: 2025/1/6 12:00:00

// 使用FromHours添加小时
DateTime afterHours = baseDate + TimeSpan.FromHours(3.5);
Console.WriteLine($"3.5小时后: {afterHours}");
// 输出: 3.5小时后: 2025/1/1 15:30:00

// 使用FromMinutes添加分钟
DateTime afterMinutes = baseDate + TimeSpan.FromMinutes(90);
Console.WriteLine($"90分钟后: {afterMinutes}");
// 输出: 90分钟后: 2025/1/1 13:30:00

// 使用FromSeconds添加秒
DateTime afterSeconds = baseDate + TimeSpan.FromSeconds(3600);
Console.WriteLine($"3600秒后: {afterSeconds}");
// 输出: 3600秒后: 2025/1/1 13:00:00

// 使用FromMilliseconds添加毫秒
DateTime afterMs = baseDate + TimeSpan.FromMilliseconds(1500);
Console.WriteLine($"1500毫秒后: {afterMs}");
// 输出: 1500毫秒后: 2025/1/1 12:00:01

// 使用FromTicks添加刻度
DateTime afterTicks = baseDate + TimeSpan.FromTicks(10000000); // 1秒 = 10,000,000刻度
Console.WriteLine($"10000000刻度后: {afterTicks}");
// 输出: 10000000刻度后: 2025/1/1 12:00:01

// 5. 组合使用多个TimeSpan
TimeSpan span3 = new TimeSpan(1, 2, 3, 4, 500); // 1天2小时3分4秒500毫秒
DateTime result3 = baseDate + span3;
Console.WriteLine($"加上1天2小时3分4秒500毫秒: {result3}");
// 输出: 加上1天2小时3分4秒500毫秒: 2025/1/2 14:03:04

// 6. 负数TimeSpan表示向前推时间
TimeSpan negativeSpan = new TimeSpan(-2, -30, 0); // -2小时30分钟
DateTime result4 = baseDate + negativeSpan;
Console.WriteLine($"减去2小时30分钟: {result4}");
// 输出: 减去2小时30分钟: 2025/1/1 9:30:00

// 7. 计算两个日期之间的完整时间差
DateTime start = new DateTime(2025, 1, 1, 8, 0, 0);
DateTime end = new DateTime(2025, 1, 3, 14, 30, 45);
TimeSpan totalDiff = end - start;
Console.WriteLine($"总时间差: {totalDiff}");
// 输出: 总时间差: 2.06:30:45 (2天6小时30分45秒)

Console.WriteLine($"总天数: {totalDiff.TotalDays}");
// 输出: 总天数: 2.2713541666666666

Console.WriteLine($"总小时数: {totalDiff.TotalHours}");
// 输出: 总小时数: 54.5125

Console.WriteLine($"总分钟数: {totalDiff.TotalMinutes}");
// 输出: 总分钟数: 3270.75

Console.WriteLine($"总秒数: {totalDiff.TotalSeconds}");
// 输出: 总秒数: 196245
```

### TimeSpan类详解

TimeSpan表示一个时间间隔，可以表示正数或负数的时间段。它是处理时间差、时间计算的重要类型。

#### TimeSpan的基本概念

TimeSpan可以表示从几纳秒到几百万天的时间间隔，精度为100纳秒（1个刻度）。

```csharp
// TimeSpan的内部表示
// TimeSpan使用以下组件表示时间间隔：
// - Days: 天数部分
// - Hours: 小时部分（0-23）
// - Minutes: 分钟部分（0-59）
// - Seconds: 秒部分（0-59）
// - Milliseconds: 毫秒部分（0-999）
// - Ticks: 总刻度数（1秒 = 10,000,000刻度）
```

#### TimeSpan的创建和初始化

```csharp
// 1. 使用构造函数创建TimeSpan
TimeSpan ts1 = new TimeSpan(1, 2, 3); // 1小时2分3秒
TimeSpan ts2 = new TimeSpan(1, 2, 3, 4); // 1天2小时3分4秒
TimeSpan ts3 = new TimeSpan(1, 2, 3, 4, 500); // 1天2小时3分4秒500毫秒
TimeSpan ts4 = new TimeSpan(100000000); // 使用刻度数创建（100000000刻度 = 10秒）

Console.WriteLine($"ts1: {ts1}"); // 输出: ts1: 01:02:03
Console.WriteLine($"ts2: {ts2}"); // 输出: ts2: 1.02:03:04
Console.WriteLine($"ts3: {ts3}"); // 输出: ts3: 1.02:03:04.5000000
Console.WriteLine($"ts4: {ts4}"); // 输出: ts4: 00:00:10

// 2. 使用静态方法创建TimeSpan
TimeSpan fromDays = TimeSpan.FromDays(2.5); // 2.5天
TimeSpan fromHours = TimeSpan.FromHours(12.5); // 12.5小时
TimeSpan fromMinutes = TimeSpan.FromMinutes(90); // 90分钟
TimeSpan fromSeconds = TimeSpan.FromSeconds(3600); // 3600秒 = 1小时
TimeSpan fromMs = TimeSpan.FromMilliseconds(1500); // 1500毫秒 = 1.5秒
TimeSpan fromTicks = TimeSpan.FromTicks(100000000); // 100000000刻度 = 10秒

Console.WriteLine($"FromDays(2.5): {fromDays}"); // 输出: FromDays(2.5): 2.12:00:00
Console.WriteLine($"FromHours(12.5): {fromHours}"); // 输出: FromHours(12.5): 12:30:00
Console.WriteLine($"FromMinutes(90): {fromMinutes}"); // 输出: FromMinutes(90): 01:30:00
Console.WriteLine($"FromSeconds(3600): {fromSeconds}"); // 输出: FromSeconds(3600): 01:00:00
Console.WriteLine($"FromMilliseconds(1500): {fromMs}"); // 输出: FromMilliseconds(1500): 00:00:01.5000000
Console.WriteLine($"FromTicks(100000000): {fromTicks}"); // 输出: FromTicks(100000000): 00:00:10

// 3. 使用静态属性获取常用TimeSpan值
TimeSpan zero = TimeSpan.Zero; // 零时间间隔
TimeSpan max = TimeSpan.MaxValue; // 最大时间间隔
TimeSpan min = TimeSpan.MinValue; // 最小时间间隔（负数）

Console.WriteLine($"Zero: {zero}"); // 输出: Zero: 00:00:00
Console.WriteLine($"MaxValue: {max}"); // 输出: MaxValue: 10675199.02:48:05.4775807
Console.WriteLine($"MinValue: {min}"); // 输出: MinValue: -10675199.02:48:05.4775808
```

#### TimeSpan的常用属性

```csharp
TimeSpan ts = new TimeSpan(2, 3, 45, 30, 500); // 2天3小时45分30秒500毫秒

// 获取各个时间组件
Console.WriteLine($"Days: {ts.Days}"); // 输出: Days: 2
Console.WriteLine($"Hours: {ts.Hours}"); // 输出: Hours: 3
Console.WriteLine($"Minutes: {ts.Minutes}"); // 输出: Minutes: 45
Console.WriteLine($"Seconds: {ts.Seconds}"); // 输出: Seconds: 30
Console.WriteLine($"Milliseconds: {ts.Milliseconds}"); // 输出: Milliseconds: 500
Console.WriteLine($"Ticks: {ts.Ticks}"); // 输出: Ticks: 1887305000000

// 获取总时间（以不同单位表示）
Console.WriteLine($"TotalDays: {ts.TotalDays}"); // 输出: TotalDays: 2.1566041666666667
Console.WriteLine($"TotalHours: {ts.TotalHours}"); // 输出: TotalHours: 51.7585
Console.WriteLine($"TotalMinutes: {ts.TotalMinutes}"); // 输出: TotalMinutes: 3105.5083333333333
Console.WriteLine($"TotalSeconds: {ts.TotalSeconds}"); // 输出: TotalSeconds: 186330.5
Console.WriteLine($"TotalMilliseconds: {ts.TotalMilliseconds}"); // 输出: TotalMilliseconds: 186330500

// 其他属性
Console.WriteLine($"是否为负数: {ts < TimeSpan.Zero}"); // 输出: 是否为负数: False
```

#### TimeSpan的运算操作

```csharp
TimeSpan ts1 = new TimeSpan(2, 30, 0); // 2小时30分钟
TimeSpan ts2 = new TimeSpan(1, 15, 0); // 1小时15分钟

// 1. TimeSpan相加
TimeSpan sum = ts1 + ts2;
Console.WriteLine($"ts1 + ts2: {sum}"); // 输出: ts1 + ts2: 03:45:00

// 2. TimeSpan相减
TimeSpan diff = ts1 - ts2;
Console.WriteLine($"ts1 - ts2: {diff}"); // 输出: ts1 - ts2: 01:15:00

// 3. TimeSpan乘以数值
TimeSpan multiplied = ts1 * 2;
Console.WriteLine($"ts1 * 2: {multiplied}"); // 输出: ts1 * 2: 05:00:00

// 4. TimeSpan除以数值
TimeSpan divided = ts1 / 2;
Console.WriteLine($"ts1 / 2: {divided}"); // 输出: ts1 / 2: 01:15:00

// 5. 两个TimeSpan相除（得到倍数）
double ratio = ts1 / ts2;
Console.WriteLine($"ts1 / ts2 (倍数): {ratio}"); // 输出: ts1 / ts2 (倍数): 2

// 6. TimeSpan取反
TimeSpan negated = -ts1;
Console.WriteLine($"-ts1: {negated}"); // 输出: -ts1: -02:30:00

// 7. TimeSpan比较
Console.WriteLine($"ts1 > ts2: {ts1 > ts2}"); // 输出: ts1 > ts2: True
Console.WriteLine($"ts1 < ts2: {ts1 < ts2}"); // 输出: ts1 < ts2: False
Console.WriteLine($"ts1 == ts2: {ts1 == ts2}"); // 输出: ts1 == ts2: False
Console.WriteLine($"ts1 != ts2: {ts1 != ts2}"); // 输出: ts1 != ts2: True
```

#### TimeSpan的常用方法

```csharp
TimeSpan ts1 = new TimeSpan(2, 30, 45);
TimeSpan ts2 = new TimeSpan(1, 15, 30);

// 1. Add方法 - 添加另一个TimeSpan
TimeSpan added = ts1.Add(ts2);
Console.WriteLine($"ts1.Add(ts2): {added}"); // 输出: ts1.Add(ts2): 03:46:15

// 2. Subtract方法 - 减去另一个TimeSpan
TimeSpan subtracted = ts1.Subtract(ts2);
Console.WriteLine($"ts1.Subtract(ts2): {subtracted}"); // 输出: ts1.Subtract(ts2): 01:15:15

// 3. Negate方法 - 取反
TimeSpan negated = ts1.Negate();
Console.WriteLine($"ts1.Negate(): {negated}"); // 输出: ts1.Negate(): -02:30:45

// 4. Duration方法 - 获取绝对值
TimeSpan negative = new TimeSpan(-2, -30, -45);
TimeSpan duration = negative.Duration();
Console.WriteLine($"Duration(): {duration}"); // 输出: Duration(): 02:30:45

// 5. CompareTo方法 - 比较两个TimeSpan
int compare = ts1.CompareTo(ts2);
Console.WriteLine($"ts1.CompareTo(ts2): {compare}"); // 输出: ts1.CompareTo(ts2): 1 (正数表示ts1 > ts2)

// 6. Equals方法 - 判断是否相等
bool equal = ts1.Equals(ts2);
Console.WriteLine($"ts1.Equals(ts2): {equal}"); // 输出: ts1.Equals(ts2): False

// 7. ToString方法 - 转换为字符串
string str = ts1.ToString();
Console.WriteLine($"ToString(): {str}"); // 输出: ToString(): 02:30:45

// 8. ToString格式化
string formatted1 = ts1.ToString(@"d\.hh\:mm\:ss");
Console.WriteLine($"格式化1: {formatted1}"); // 输出: 格式化1: 0.02:30:45

string formatted2 = ts1.ToString(@"hh\:mm\:ss");
Console.WriteLine($"格式化2: {formatted2}"); // 输出: 格式化2: 02:30:45
```

#### TimeSpan的实际应用示例

```csharp
// 1. 计算程序执行时间
DateTime startTime = DateTime.Now;
// 模拟一些操作
System.Threading.Thread.Sleep(1500); // 休眠1.5秒
DateTime endTime = DateTime.Now;
TimeSpan elapsed = endTime - startTime;
Console.WriteLine($"程序执行时间: {elapsed.TotalMilliseconds}毫秒");
// 输出: 程序执行时间: 1500.1234毫秒 (实际值可能略有不同)

// 2. 计算剩余时间
DateTime deadline = new DateTime(2025, 12, 31, 23, 59, 59);
DateTime now = DateTime.Now;
TimeSpan remaining = deadline - now;
Console.WriteLine($"距离截止日期还有: {remaining.Days}天 {remaining.Hours}小时");
// 输出: 距离截止日期还有: 42天 12小时 (实际值取决于当前时间)

// 3. 计算工作时间
TimeSpan workStart = new TimeSpan(9, 0, 0); // 9:00
TimeSpan workEnd = new TimeSpan(18, 0, 0); // 18:00
TimeSpan workDuration = workEnd - workStart;
Console.WriteLine($"工作时间: {workDuration.TotalHours}小时");
// 输出: 工作时间: 9小时

// 4. 计算平均时间
TimeSpan[] durations = {
    new TimeSpan(2, 30, 0),
    new TimeSpan(3, 15, 0),
    new TimeSpan(2, 45, 0)
};
TimeSpan total = TimeSpan.Zero;
foreach (var duration in durations)
{
    total += duration;
}
TimeSpan average = TimeSpan.FromTicks(total.Ticks / durations.Length);
Console.WriteLine($"平均时间: {average}");
// 输出: 平均时间: 02:50:00

// 5. 格式化时间间隔显示
TimeSpan interval = new TimeSpan(2, 3, 45, 30);
string formatted = $"{interval.Days}天{interval.Hours}小时{interval.Minutes}分钟{interval.Seconds}秒";
Console.WriteLine($"格式化显示: {formatted}");
// 输出: 格式化显示: 2天3小时45分钟30秒

// 6. 判断时间间隔是否在范围内
TimeSpan minInterval = new TimeSpan(0, 5, 0); // 最少5分钟
TimeSpan maxInterval = new TimeSpan(1, 0, 0); // 最多1小时
TimeSpan checkInterval = new TimeSpan(0, 30, 0); // 30分钟

bool inRange = checkInterval >= minInterval && checkInterval <= maxInterval;
Console.WriteLine($"30分钟是否在5分钟到1小时之间: {inRange}");
// 输出: 30分钟是否在5分钟到1小时之间: True
```

#### TimeSpan的格式化字符串

TimeSpan支持自定义格式化字符串：

```csharp
TimeSpan ts = new TimeSpan(2, 3, 45, 30, 500);

// 标准格式
Console.WriteLine($"默认格式: {ts}"); // 输出: 默认格式: 2.03:45:30.5000000
Console.WriteLine($"c格式: {ts.ToString("c")}"); // 输出: c格式: 2.03:45:30.5000000
Console.WriteLine($"g格式: {ts.ToString("g")}"); // 输出: g格式: 2:3:45:30.5
Console.WriteLine($"G格式: {ts.ToString("G")}"); // 输出: G格式: 2:03:45:30.5000000

// 自定义格式
Console.WriteLine($@"d\.hh\:mm\:ss: {ts.ToString(@"d\.hh\:mm\:ss")}");
// 输出: d\.hh\:mm\:ss: 2.03:45:30

Console.WriteLine($@"hh\:mm\:ss: {ts.ToString(@"hh\:mm\:ss")}");
// 输出: hh\:mm\:ss: 03:45:30

Console.WriteLine($@"d天hh小时mm分钟: {ts.ToString(@"d天hh小时mm分钟")}");
// 输出: d天hh小时mm分钟: 2天03小时45分钟
```

### DateTime的解析

可以将字符串解析为DateTime对象：

```csharp
// 使用Parse方法
try
{
    DateTime parsedDate1 = DateTime.Parse("2025-11-20");
    DateTime parsedDate2 = DateTime.Parse("2025/11/20 14:30:00");
    DateTime parsedDate3 = DateTime.Parse("November 20, 2025");
    
    Console.WriteLine($"解析"2025-11-20": {parsedDate1}");
    // 输出: 解析"2025-11-20": 2025/11/20 0:00:00
    
    Console.WriteLine($"解析"2025/11/20 14:30:00": {parsedDate2}");
    // 输出: 解析"2025/11/20 14:30:00": 2025/11/20 14:30:00
    
    Console.WriteLine($"解析"November 20, 2025": {parsedDate3}");
    // 输出: 解析"November 20, 2025": 2025/11/20 0:00:00
}
catch (FormatException ex)
{
    Console.WriteLine($"解析失败: {ex.Message}");
}

// 使用TryParse方法（推荐）
if (DateTime.TryParse("2025-11-20", out DateTime result1))
{
    Console.WriteLine($"TryParse成功: {result1}");
    // 输出: TryParse成功: 2025/11/20 0:00:00
}
else
{
    Console.WriteLine("TryParse失败");
}

// 使用ParseExact方法
try
{
    DateTime exactDate = DateTime.ParseExact("2025-11-20 14:30:00", "yyyy-MM-dd HH:mm:ss", null);
    Console.WriteLine($"ParseExact: {exactDate}");
    // 输出: ParseExact: 2025/11/20 14:30:00
}
catch (FormatException ex)
{
    Console.WriteLine($"ParseExact失败: {ex.Message}");
}

// 使用TryParseExact方法
if (DateTime.TryParseExact("20/11/2025", "dd/MM/yyyy", null, System.Globalization.DateTimeStyles.None, out DateTime result2))
{
    Console.WriteLine($"TryParseExact成功: {result2}");
    // 输出: TryParseExact成功: 2025/11/20 0:00:00
}
else
{
    Console.WriteLine("TryParseExact失败");
}
```

### 高级时间解析

除了基本的解析方法，DateTime还支持更复杂的时间解析场景：

```csharp
// 解析带时区信息的时间字符串
try
{
    // 解析ISO 8601格式的时间
    DateTime isoDate = DateTime.Parse("2025-11-20T14:30:00");
    Console.WriteLine($"ISO 8601格式解析: {isoDate}");
    // 输出: ISO 8601格式解析: 2025/11/20 14:30:00
    
    // 解析带毫秒的时间
    DateTime millisecondDate = DateTime.Parse("2025-11-20 14:30:00.123");
    Console.WriteLine($"带毫秒时间解析: {millisecondDate}");
    // 输出: 带毫秒时间解析: 2025/11/20 14:30:00
}
catch (FormatException ex)
{
    Console.WriteLine($"解析带时区信息失败: {ex.Message}");
}

// 使用特定文化信息解析
try
{
    // 使用美国英语文化信息解析
    var usCulture = System.Globalization.CultureInfo.GetCultureInfo("en-US");
    DateTime usDate = DateTime.Parse("11/20/2025", usCulture);
    Console.WriteLine($"美式日期解析: {usDate}");
    // 输出: 美式日期解析: 2025/11/20 0:00:00
    
    // 使用英国英语文化信息解析
    var ukCulture = System.Globalization.CultureInfo.GetCultureInfo("en-GB");
    DateTime ukDate = DateTime.Parse("20/11/2025", ukCulture);
    Console.WriteLine($"英式日期解析: {ukDate}");
    // 输出: 英式日期解析: 2025/11/20 0:00:00
}
catch (FormatException ex)
{
    Console.WriteLine($"文化信息解析失败: {ex.Message}");
}

// 处理多种可能的格式
public static bool TryParseMultipleFormats(string input, out DateTime result)
{
    string[] formats = {
        "yyyy-MM-dd",
        "yyyy/MM/dd",
        "dd-MM-yyyy",
        "dd/MM/yyyy",
        "yyyy-MM-dd HH:mm:ss",
        "yyyy/MM/dd HH:mm:ss",
        "MM/dd/yyyy",
        "MMMM dd, yyyy"
    };
    
    return DateTime.TryParseExact(input, formats, null, System.Globalization.DateTimeStyles.None, out result);
}

// 使用示例
string[] testDates = { "2025-11-20", "20/11/2025", "11/20/2025", "November 20, 2025" };
foreach (string testDate in testDates)
{
    if (TryParseMultipleFormats(testDate, out DateTime parsedDate))
    {
        Console.WriteLine($"多格式解析 '{testDate}' 成功: {parsedDate}");
        // 输出示例:
        // 多格式解析 '2025-11-20' 成功: 2025/11/20 0:00:00
        // 多格式解析 '20/11/2025' 成功: 2025/11/20 0:00:00
        // 多格式解析 '11/20/2025' 成功: 2025/11/20 0:00:00
        // 多格式解析 'November 20, 2025' 成功: 2025/11/20 0:00:00
    }
    else
    {
        Console.WriteLine($"多格式解析 '{testDate}' 失败");
    }
}
```

### 时间戳处理

在许多应用场景中，特别是与Web API交互时，经常需要处理Unix时间戳。Unix时间戳是从1970年1月1日00:00:00 UTC开始计算的秒数或毫秒数：

```csharp
// Unix时间戳常量
public static readonly DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc);

// 将DateTime转换为Unix时间戳（秒）
public static long ToUnixTimestamp(DateTime dateTime)
{
    return (long)(dateTime.ToUniversalTime() - UnixEpoch).TotalSeconds;
}

// 将DateTime转换为Unix时间戳（毫秒）
public static long ToUnixTimestampMilliseconds(DateTime dateTime)
{
    return (long)(dateTime.ToUniversalTime() - UnixEpoch).TotalMilliseconds;
}

// 将Unix时间戳（秒）转换为DateTime
public static DateTime FromUnixTimestamp(long timestamp)
{
    return UnixEpoch.AddSeconds(timestamp).ToLocalTime();
}

// 将Unix时间戳（毫秒）转换为DateTime
public static DateTime FromUnixTimestampMilliseconds(long timestamp)
{
    return UnixEpoch.AddMilliseconds(timestamp).ToLocalTime();
}

// 使用示例
DateTime now = DateTime.Now;
Console.WriteLine($"当前时间: {now}");
// 输出: 当前时间: 2025/11/19 12:00:00 (实际值取决于当前时间)

// 转换为Unix时间戳
long unixTimestamp = ToUnixTimestamp(now);
long unixTimestampMs = ToUnixTimestampMilliseconds(now);
Console.WriteLine($"Unix时间戳(秒): {unixTimestamp}");
// 输出: Unix时间戳(秒): 1763452800 (实际值取决于当前时间)

Console.WriteLine($"Unix时间戳(毫秒): {unixTimestampMs}");
// 输出: Unix时间戳(毫秒): 1763452800000 (实际值取决于当前时间)

// 从Unix时间戳转换回DateTime
DateTime fromUnix = FromUnixTimestamp(unixTimestamp);
DateTime fromUnixMs = FromUnixTimestampMilliseconds(unixTimestampMs);
Console.WriteLine($"从时间戳转换: {fromUnix}");
// 输出: 从时间戳转换: 2025/11/19 12:00:00 (实际值取决于当前时间)

Console.WriteLine($"从毫秒时间戳转换: {fromUnixMs}");
// 输出: 从毫秒时间戳转换: 2025/11/19 12:00:00 (实际值取决于当前时间)

// 处理JavaScript时间戳（毫秒）
// JavaScript中的Date.now()返回的是毫秒时间戳
long jsTimestamp = 1758432600000; // 示例时间戳
DateTime jsDateTime = FromUnixTimestampMilliseconds(jsTimestamp);
Console.WriteLine($"JavaScript时间戳转换: {jsDateTime}");
// 输出: JavaScript时间戳转换: 2025/9/22 0:00:00
```

### DateTime的实际应用示例

以下是一些DateTime在实际开发中的应用场景：

```csharp
using System;

class DateTimeExamples
{
    // 计算年龄
    public static int CalculateAge(DateTime birthDate)
    {
        DateTime today = DateTime.Today;
        int age = today.Year - birthDate.Year;
        
        // 检查是否还没过生日
        if (birthDate.Date > today.AddYears(-age))
        {
            age--;
        }
        
        return age;
    }
    
    // 计算工作日
    public static int CalculateWorkDays(DateTime startDate, DateTime endDate)
    {
        int workDays = 0;
        DateTime currentDate = startDate;
        
        while (currentDate <= endDate)
        {
            if (currentDate.DayOfWeek != DayOfWeek.Saturday && 
                currentDate.DayOfWeek != DayOfWeek.Sunday)
            {
                workDays++;
            }
            currentDate = currentDate.AddDays(1);
        }
        
        return workDays;
    }
    
    // 格式化时间显示（如：刚刚、几分钟前、几小时前等）
    public static string FormatTimeAgo(DateTime dateTime)
    {
        TimeSpan timeSpan = DateTime.Now - dateTime;
        
        if (timeSpan.TotalSeconds < 60)
        {
            return "刚刚";
        }
        else if (timeSpan.TotalMinutes < 60)
        {
            return $"{timeSpan.Minutes}分钟前";
        }
        else if (timeSpan.TotalHours < 24)
        {
            return $"{timeSpan.Hours}小时前";
        }
        else if (timeSpan.TotalDays < 30)
        {
            return $"{timeSpan.Days}天前";
        }
        else
        {
            return dateTime.ToString("yyyy年MM月dd日");
        }
    }
    
    // 获取指定月份的最后一天
    public static DateTime GetLastDayOfMonth(int year, int month)
    {
        return new DateTime(year, month, 1).AddMonths(1).AddDays(-1);
    }
    
    static void Main()
    {
        // 测试计算年龄
        DateTime birthDate = new DateTime(1990, 5, 15);
        Console.WriteLine($"出生日期: {birthDate:yyyy年MM月dd日}");
        Console.WriteLine($"当前年龄: {CalculateAge(birthDate)}岁");
        
        // 测试计算工作日
        DateTime startDate = new DateTime(2025, 11, 1);
        DateTime endDate = new DateTime(2025, 11, 30);
        Console.WriteLine($"{startDate:yyyy年MM月dd日}到{endDate:yyyy年MM月dd日}的工作日: {CalculateWorkDays(startDate, endDate)}天");
        
        // 测试时间显示格式化
        DateTime[] testDates = {
            DateTime.Now.AddSeconds(-30),
            DateTime.Now.AddMinutes(-15),
            DateTime.Now.AddHours(-3),
            DateTime.Now.AddDays(-5),
            DateTime.Now.AddDays(-45)
        };
        
        foreach (DateTime date in testDates)
        {
            Console.WriteLine($"{date:yyyy年MM月dd日 HH:mm} -> {FormatTimeAgo(date)}");
        }
        
        // 测试获取月份最后一天
        Console.WriteLine($"2025年2月的最后一天: {GetLastDayOfMonth(2025, 2):yyyy年MM月dd日}");
        Console.WriteLine($"2025年12月的最后一天: {GetLastDayOfMonth(2025, 12):yyyy年MM月dd日}");
    }
}
```

### DateTime使用注意事项

1. **时区问题**：DateTime.Now返回本地时间，DateTime.UtcNow返回UTC时间。在处理跨时区应用时，应明确使用哪种时间。

2. **精度问题**：DateTime的精度是100纳秒，但在某些平台上可能达不到这个精度。

3. **夏令时问题**：在涉及夏令时的地区，需要注意时间计算可能出现的问题。

4. **线程安全性**：DateTime结构是不可变的，因此是线程安全的。

5. **异常处理**：在解析字符串为DateTime时，应使用TryParse或TryParseExact方法，避免异常处理的开销。

6. **性能考虑**：频繁创建DateTime对象可能影响性能，在性能敏感的代码中应考虑优化。

### DateTime类常用属性和方法速查表

#### 常用属性

| 属性 | 类型 | 作用说明 |
|------|------|----------|
| Now | DateTime | 获取当前本地日期和时间 |
| UtcNow | DateTime | 获取当前UTC日期和时间 |
| Today | DateTime | 获取当前日期，时间为00:00:00 |
| MinValue | DateTime | 表示DateTime的最小可能值 |
| MaxValue | DateTime | 表示DateTime的最大可能值 |
| Year | int | 获取日期的年份部分 |
| Month | int | 获取日期的月份部分 |
| Day | int | 获取日期的天数部分 |
| Hour | int | 获取时间的小时部分 |
| Minute | int | 获取时间的分钟部分 |
| Second | int | 获取时间的秒部分 |
| Millisecond | int | 获取时间的毫秒部分 |
| DayOfWeek | DayOfWeek | 获取星期几 |
| DayOfYear | int | 获取一年中的第几天 |
| Ticks | long | 获取表示日期和时间的刻度数 |
| Date | DateTime | 获取日期部分 |
| TimeOfDay | TimeSpan | 获取时间部分 |

#### 常用方法

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Add(TimeSpan) | TimeSpan | DateTime | 在此实例的值上添加指定的时间间隔 |
| AddDays(double) | double | DateTime | 在此实例的值上添加指定的天数 |
| AddHours(double) | double | DateTime | 在此实例的值上添加指定的小时数 |
| AddMinutes(double) | double | DateTime | 在此实例的值上添加指定的分钟数 |
| AddMonths(int) | int | DateTime | 在此实例的值上添加指定的月数 |
| AddSeconds(double) | double | DateTime | 在此实例的值上添加指定的秒数 |
| AddYears(int) | int | DateTime | 在此实例的值上添加指定的年数 |
| CompareTo(DateTime) | DateTime | int | 将此实例与指定的DateTime对象进行比较 |
| Equals(DateTime) | DateTime | bool | 返回一个值，该值指示此实例是否等于指定的DateTime实例 |
| ToString() | 无 | string | 将当前DateTime对象的值转换为其等效的字符串表示形式 |
| ToString(string) | string | string | 使用指定的格式将当前DateTime对象的值转换为字符串 |
| Parse(string) | string | DateTime | 将日期和时间的字符串表示形式转换为等效的DateTime |
| TryParse(string, out DateTime) | string, out DateTime | bool | 将日期和时间的字符串表示形式转换为等效的DateTime，返回是否转换成功 |
| ParseExact(string, string, IFormatProvider) | string, string, IFormatProvider | DateTime | 使用指定的格式将日期和时间的字符串表示形式转换为等效的DateTime |
| TryParseExact(string, string, IFormatProvider, DateTimeStyles, out DateTime) | string, string, IFormatProvider, DateTimeStyles, out DateTime | bool | 使用指定的格式将日期和时间的字符串表示形式转换为等效的DateTime，返回是否转换成功 |
| ToShortDateString() | 无 | string | 将当前DateTime对象的值转换为其等效的短日期字符串表示形式 |
| ToLongDateString() | 无 | string | 将当前DateTime对象的值转换为其等效的长日期字符串表示形式 |
| ToShortTimeString() | 无 | string | 将当前DateTime对象的值转换为其等效的短时间字符串表示形式 |
| ToLongTimeString() | 无 | string | 将当前DateTime对象的值转换为其等效的长时间字符串表示形式 |

通过合理使用DateTime类，可以方便地处理各种日期和时间相关的操作，满足应用程序中对时间处理的需求。

## <a id="array-class"></a>C# Array类详解

数组(Array)是C#中最基本的数据结构之一，用于存储相同类型的元素集合。数组在内存中是连续存储的，可以通过索引快速访问元素。C#提供了Array类来操作数组，同时支持多种创建和操作数组的方法。

### Array类的基本概念

在C#中，数组是引用类型，继承自System.Array类。数组一旦创建，其大小就是固定的。数组的索引从0开始，可以通过索引访问和修改数组元素。

### Array的创建和初始化

C#提供了多种创建和初始化数组的方法：

```csharp
using System;

// 1. 声明数组但不初始化
int[] numbers1;

// 2. 创建指定大小的数组（元素初始化为默认值）
int[] numbers2 = new int[5]; // 创建包含5个int元素的数组，所有元素初始化为0

// 3. 创建并初始化数组
int[] numbers3 = new int[] { 1, 2, 3, 4, 5 };
int[] numbers4 = { 1, 2, 3, 4, 5 }; // 简化语法

// 4. 创建多维数组
int[,] matrix = new int[3, 4]; // 3行4列的二维数组
int[,] matrix2 = { { 1, 2, 3, 4 }, { 5, 6, 7, 8 }, { 9, 10, 11, 12 } };

// 5. 创建交错数组（数组的数组）
int[][] jaggedArray = new int[3][];
jaggedArray[0] = new int[] { 1, 2 };
jaggedArray[1] = new int[] { 3, 4, 5, 6 };
jaggedArray[2] = new int[] { 7, 8, 9 };

// 6. 使用Array类的静态方法创建数组
int[] numbers5 = Array.CreateInstance(typeof(int), 5) as int[];

// 输出数组内容
Console.WriteLine("一维数组:");
for (int i = 0; i < numbers3.Length; i++)
{
    Console.Write(numbers3[i] + " ");
}
Console.WriteLine();

Console.WriteLine("二维数组:");
for (int i = 0; i < matrix2.GetLength(0); i++)
{
    for (int j = 0; j < matrix2.GetLength(1); j++)
    {
        Console.Write(matrix2[i, j] + "\t");
    }
    Console.WriteLine();
}

Console.WriteLine("交错数组:");
for (int i = 0; i < jaggedArray.Length; i++)
{
    for (int j = 0; j < jaggedArray[i].Length; j++)
    {
        Console.Write(jaggedArray[i][j] + " ");
    }
    Console.WriteLine();
}
```

### Array的常用属性

Array类提供了多个有用的属性来获取数组的信息：

```csharp
int[] numbers = { 1, 2, 3, 4, 5 };
int[,] matrix = { { 1, 2, 3 }, { 4, 5, 6 } };

// Length属性 - 获取数组中所有元素的总数
Console.WriteLine($"一维数组长度: {numbers.Length}");
Console.WriteLine($"二维数组总元素数: {matrix.Length}");

// Rank属性 - 获取数组的维数
Console.WriteLine($"一维数组维数: {numbers.Rank}");
Console.WriteLine($"二维数组维数: {matrix.Rank}");

// GetLength方法 - 获取指定维度的长度
Console.WriteLine($"二维数组第1维长度: {matrix.GetLength(0)}");
Console.WriteLine($"二维数组第2维长度: {matrix.GetLength(1)}");

// IsFixedSize属性 - 检查数组是否有固定大小
Console.WriteLine($"数组是否有固定大小: {numbers.IsFixedSize}");

// IsReadOnly属性 - 检查数组是否为只读
Console.WriteLine($"数组是否只读: {numbers.IsReadOnly}");
```

### Array的常用方法

Array类提供了丰富的静态和实例方法来操作数组：

#### 排序和搜索方法

```csharp
int[] numbers = { 5, 2, 8, 1, 9, 3 };
string[] names = { "张三", "李四", "王五", "赵六" };

Console.WriteLine("原始数组:");
Console.WriteLine($"数字: {string.Join(", ", numbers)}");
Console.WriteLine($"姓名: {string.Join(", ", names)}");

// Sort方法 - 对数组进行排序
Array.Sort(numbers);
Array.Sort(names);

Console.WriteLine("排序后:");
Console.WriteLine($"数字: {string.Join(", ", numbers)}");
Console.WriteLine($"姓名: {string.Join(", ", names)}");

// 重新初始化数组以演示搜索
numbers = new int[] { 5, 2, 8, 1, 9, 3 };
Array.Sort(numbers); // 先排序，因为BinarySearch要求数组已排序

// BinarySearch方法 - 在已排序数组中搜索元素
int index = Array.BinarySearch(numbers, 8);
if (index >= 0)
{
    Console.WriteLine($"找到元素8，索引为: {index}");
}
else
{
    Console.WriteLine("未找到元素8");
}

// IndexOf方法 - 在数组中搜索元素首次出现的索引
int[] unsortedNumbers = { 5, 2, 8, 1, 9, 3, 8 };
int firstIndex = Array.IndexOf(unsortedNumbers, 8);
Console.WriteLine($"元素8首次出现的索引: {firstIndex}");

// LastIndexOf方法 - 在数组中搜索元素最后出现的索引
int lastIndex = Array.LastIndexOf(unsortedNumbers, 8);
Console.WriteLine($"元素8最后出现的索引: {lastIndex}");
```

#### 数组操作方法

```csharp
int[] sourceArray = { 1, 2, 3, 4, 5 };

// Copy方法 - 复制数组元素
int[] destinationArray = new int[5];
Array.Copy(sourceArray, destinationArray, sourceArray.Length);
Console.WriteLine($"复制后的数组: {string.Join(", ", destinationArray)}");

// CopyTo方法 - 将数组元素复制到另一个数组
int[] targetArray = new int[5];
sourceArray.CopyTo(targetArray, 0);
Console.WriteLine($"CopyTo后的数组: {string.Join(", ", targetArray)}");

// Clone方法 - 创建数组的浅表副本
int[] clonedArray = (int[])sourceArray.Clone();
Console.WriteLine($"克隆的数组: {string.Join(", ", clonedArray)}");

// Clear方法 - 将数组元素设置为默认值
int[] tempArray = { 1, 2, 3, 4, 5 };
Console.WriteLine($"清除前: {string.Join(", ", tempArray)}");
Array.Clear(tempArray, 1, 3); // 从索引1开始清除3个元素
Console.WriteLine($"清除后: {string.Join(", ", tempArray)}");

// Reverse方法 - 反转数组元素
int[] reverseArray = { 1, 2, 3, 4, 5 };
Console.WriteLine($"反转前: {string.Join(", ", reverseArray)}");
Array.Reverse(reverseArray);
Console.WriteLine($"反转后: {string.Join(", ", reverseArray)}");

// Resize方法 - 调整数组大小（注意：这是Array类的静态方法，但定义在System命名空间中）
int[] resizeArray = { 1, 2, 3 };
Console.WriteLine($"调整大小前: {string.Join(", ", resizeArray)} (长度: {resizeArray.Length})");
Array.Resize(ref resizeArray, 5); // 扩展到5个元素
Console.WriteLine($"扩展后: {string.Join(", ", resizeArray)} (长度: {resizeArray.Length})");
Array.Resize(ref resizeArray, 2); // 缩小到2个元素
Console.WriteLine($"缩小后: {string.Join(", ", resizeArray)} (长度: {resizeArray.Length})");
```

### Array的实际应用示例

以下是一些Array在实际开发中的应用场景：

```csharp
using System;
using System.Linq;

class ArrayExamples
{
    // 查找数组中的最大值和最小值
    public static (int max, int min) FindMaxMin(int[] array)
    {
        if (array == null || array.Length == 0)
            throw new ArgumentException("数组不能为空");
            
        int max = array[0];
        int min = array[0];
        
        for (int i = 1; i < array.Length; i++)
        {
            if (array[i] > max)
                max = array[i];
            if (array[i] < min)
                min = array[i];
        }
        
        return (max, min);
    }
    
    // 计算数组元素的平均值
    public static double CalculateAverage(int[] array)
    {
        if (array == null || array.Length == 0)
            throw new ArgumentException("数组不能为空");
            
        long sum = 0;
        foreach (int value in array)
        {
            sum += value;
        }
        
        return (double)sum / array.Length;
    }
    
    // 移除数组中的重复元素
    public static int[] RemoveDuplicates(int[] array)
    {
        if (array == null || array.Length == 0)
            return new int[0];
            
        // 使用Array.Sort和自定义逻辑
        int[] sortedArray = (int[])array.Clone();
        Array.Sort(sortedArray);
        
        int[] temp = new int[sortedArray.Length];
        int count = 1;
        temp[0] = sortedArray[0];
        
        for (int i = 1; i < sortedArray.Length; i++)
        {
            if (sortedArray[i] != sortedArray[i - 1])
            {
                temp[count] = sortedArray[i];
                count++;
            }
        }
        
        int[] result = new int[count];
        Array.Copy(temp, result, count);
        return result;
    }
    
    // 合并两个数组
    public static T[] MergeArrays<T>(T[] array1, T[] array2)
    {
        T[] result = new T[array1.Length + array2.Length];
        Array.Copy(array1, 0, result, 0, array1.Length);
        Array.Copy(array2, 0, result, array1.Length, array2.Length);
        return result;
    }
    
    static void Main()
    {
        // 测试查找最大值和最小值
        int[] numbers = { 5, 2, 8, 1, 9, 3 };
        var (max, min) = FindMaxMin(numbers);
        Console.WriteLine($"数组 {string.Join(", ", numbers)} 中的最大值: {max}, 最小值: {min}");
        
        // 测试计算平均值
        double average = CalculateAverage(numbers);
        Console.WriteLine($"数组的平均值: {average}");
        
        // 测试移除重复元素
        int[] withDuplicates = { 5, 2, 8, 1, 9, 3, 5, 8, 1 };
        int[] unique = RemoveDuplicates(withDuplicates);
        Console.WriteLine($"原数组: {string.Join(", ", withDuplicates)}");
        Console.WriteLine($"去重后: {string.Join(", ", unique)}");
        
        // 测试合并数组
        int[] arr1 = { 1, 2, 3 };
        int[] arr2 = { 4, 5, 6 };
        int[] merged = MergeArrays(arr1, arr2);
        Console.WriteLine($"合并数组: {string.Join(", ", merged)}");
    }
}
```

### Array使用注意事项

1. **数组大小固定**：数组一旦创建，其大小就不能改变。如果需要动态调整大小，应考虑使用List<T>等集合类。

2. **索引越界检查**：访问数组元素时必须确保索引在有效范围内，否则会抛出IndexOutOfRangeException异常。

3. **性能考虑**：数组是性能最高的集合类型之一，因为它们在内存中连续存储，访问速度快。

4. **多维数组与交错数组**：多维数组是矩形的，而交错数组的每一行可以有不同的长度。

5. **引用类型与值类型**：存储引用类型的数组实际存储的是引用，而存储值类型的数组存储的是实际值。

6. **内存分配**：大型数组会在大对象堆(LOH)上分配，可能影响垃圾回收性能。

### Array类常用属性和方法速查表

#### 常用属性

| 属性 | 类型 | 作用说明 |
|------|------|----------|
| Length | int | 获取数组中所有元素的总数。例如：int[] arr = {1,2,3}; int count = arr.Length; // 返回3 |
| Rank | int | 获取数组的维数。一维数组返回1，二维数组返回2，以此类推 |
| IsFixedSize | bool | 获取一个值，该值指示数组是否有固定大小。对于所有Array实例，该值始终为true |
| IsReadOnly | bool | 获取一个值，该值指示数组是否为只读。对于所有Array实例，该值始终为false |
| IsSynchronized | bool | 获取一个值，该值指示对数组的访问是否同步（线程安全）。对于所有Array实例，该值始终为false |
| SyncRoot | object | 获取可用于同步对数组的访问的对象。通常用于多线程环境中的同步操作 |

#### 常用静态方法

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| BinarySearch(Array, object) | Array array, object value | int | 在已排序的一维数组中搜索指定对象。如果找到，返回元素索引；否则返回负数。array必须已排序 |
| BinarySearch(Array, object, IComparer) | Array array, object value, IComparer comparer | int | 使用指定的IComparer接口在已排序的数组中搜索元素 |
| BinarySearch(Array, int, int, object) | Array array, int index, int length, object value | int | 在数组的指定范围内搜索元素。index是起始索引，length是搜索的元素个数 |
| Clear(Array, int, int) | Array array, int index, int length | void | 将数组中指定范围的元素设置为该类型默认值。index是起始索引，length是要清除的元素个数 |
| Copy(Array, Array, int) | Array sourceArray, Array destinationArray, int length | void | 从第一个数组复制指定数量的元素到第二个数组。length是要复制的元素个数 |
| Copy(Array, int, Array, int, int) | Array sourceArray, int sourceIndex, Array destinationArray, int destinationIndex, int length | void | 从源数组的指定索引开始，复制指定数量的元素到目标数组的指定索引位置 |
| CreateInstance(Type, int) | Type elementType, int length | Array | 创建指定类型和一维长度的数组。例如：Array.CreateInstance(typeof(int), 5)创建包含5个int元素的数组 |
| CreateInstance(Type, int[]) | Type elementType, int[] lengths | Array | 创建指定类型和维度长度的多维数组。lengths数组指定每个维度的长度 |
| CreateInstance(Type, int[], int[]) | Type elementType, int[] lengths, int[] lowerBounds | Array | 创建指定类型、维度长度和下界的多维数组 |
| IndexOf(Array, object) | Array array, object value | int | 在一维数组中搜索指定对象，返回首次出现的索引。如果未找到，返回-1 |
| IndexOf(Array, object, int) | Array array, object value, int startIndex | int | 从指定索引开始，在一维数组中搜索指定对象 |
| IndexOf(Array, object, int, int) | Array array, object value, int startIndex, int count | int | 在数组的指定范围内搜索指定对象。startIndex是起始索引，count是搜索的元素个数 |
| LastIndexOf(Array, object) | Array array, object value | int | 在一维数组中搜索指定对象，返回最后出现的索引。如果未找到，返回-1 |
| LastIndexOf(Array, object, int) | Array array, object value, int startIndex | int | 从指定索引开始，反向搜索指定对象 |
| LastIndexOf(Array, object, int, int) | Array array, object value, int startIndex, int count | int | 在数组的指定范围内反向搜索指定对象 |
| Reverse(Array) | Array array | void | 反转整个一维数组中元素的顺序 |
| Reverse(Array, int, int) | Array array, int index, int length | void | 反转数组指定范围内元素的顺序。index是起始索引，length是要反转的元素个数 |
| Sort(Array) | Array array | void | 对一维数组中的元素进行升序排序 |
| Sort(Array, Array) | Array keys, Array items | void | 基于第一个数组中的键对两个数组进行排序，第一个数组包含键，第二个数组包含对应的项 |
| Sort(Array, IComparer) | Array array, IComparer comparer | void | 使用指定的IComparer接口对数组进行排序 |
| Sort(Array, int, int) | Array array, int index, int length | void | 对数组的指定范围内元素进行排序。index是起始索引，length是要排序的元素个数 |
| Sort(Array, Array, IComparer) | Array keys, Array items, IComparer comparer | void | 基于第一个数组中的键对两个数组进行排序，并使用指定的IComparer接口 |
| Sort(Array, Array, int, int) | Array keys, Array items, int index, int length | void | 对两个数组的指定范围内元素进行排序 |
| Sort(Array, Array, int, int, IComparer) | Array keys, Array items, int index, int length, IComparer comparer | void | 对两个数组的指定范围内元素进行排序，并使用指定的IComparer接口 |
| Sort(Array, int, int, IComparer) | Array array, int index, int length, IComparer comparer | void | 对数组的指定范围内元素进行排序，并使用指定的IComparer接口 |
| Resize<T>(ref T[], int) | ref T[] array, int newSize | void | 将数组大小调整为指定大小。这是一个泛型方法，不是Array类的成员，但与数组操作密切相关 |

#### 常用实例方法

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Clone() | 无 | object | 创建数组的浅表副本。对于值类型数组，会复制值；对于引用类型数组，会复制引用但不复制引用的对象 |
| CopyTo(Array, int) | Array array, int index | void | 将当前一维数组的所有元素复制到指定的一维数组中。index是目标数组中的起始索引 |
| GetLength(int) | int dimension | int | 获取指定维度的长度。dimension是维度索引，从0开始。对于二维数组，0表示行数，1表示列数 |
| GetLowerBound(int) | int dimension | int | 获取指定维度的下界。对于C#数组，通常返回0 |
| GetUpperBound(int) | int dimension | int | 获取指定维度的上界。等于该维度长度减1 |
| GetValue(int) | int index | object | 获取一维数组中指定位置的值。index是元素索引 |
| GetValue(int, int) | int index1, int index2 | object | 获取二维数组中指定位置的值。index1是行索引，index2是列索引 |
| GetValue(int, int, int) | int index1, int index2, int index3 | object | 获取三维数组中指定位置的值 |
| GetValue(int[]) | int[] indices | object | 获取多维数组中指定位置的值。indices数组包含每个维度的索引 |
| SetValue(object, int) | object value, int index | void | 设置一维数组中指定位置的值。value是要设置的值，index是元素索引 |
| SetValue(object, int, int) | object value, int index1, int index2 | void | 设置二维数组中指定位置的值。index1是行索引，index2是列索引 |
| SetValue(object, int, int, int) | object value, int index1, int index2, int index3 | void | 设置三维数组中指定位置的值 |
| SetValue(object, int[]) | object value, int[] indices | void | 设置多维数组中指定位置的值。indices数组包含每个维度的索引 |

需要注意的是，Array类本身不直接提供Resize方法。Array.Resize<T>(ref T[] array, int newSize)是一个静态泛型方法，定义在System命名空间中，专门用于调整数组大小。当数组扩展时，新元素被设置为类型的默认值；当数组缩小时，多余的元素会被丢弃。

在实际开发中，如果需要动态调整数组大小，通常建议使用List<T>集合类，它提供了更好的性能和更丰富的功能。但在某些特定场景下，Array.Resize方法仍然很有用。

通过合理使用Array类，可以高效地处理各种数据集合操作，满足应用程序中对数据存储和处理的需求。

## <a id="string-class"></a>C# String类详解

字符串(String)是C#中最常用的数据类型之一，用于存储和处理文本数据。C#中的字符串是System.String类的别名，提供了丰富的字符串操作方法。理解字符串的特性和使用方法对于编写高效的C#程序至关重要。

### String类的基本概念

在C#中，字符串是引用类型，但具有值类型的某些特性。字符串是不可变的(immutable)，这意味着一旦创建，字符串的内容就不能被修改。任何看似修改字符串的操作实际上都会创建一个新的字符串对象。

#### 字符串的不可变性

```csharp
string str = "Hello";
str = str + " World"; // 这里不是修改原字符串，而是创建了一个新字符串

// 演示不可变性
string original = "Hello";
string modified = original;
modified = modified + " World";
Console.WriteLine($"原字符串: {original}"); // 输出: 原字符串: Hello
Console.WriteLine($"修改后的字符串: {modified}"); // 输出: 修改后的字符串: Hello World
```

### String的创建和初始化

C#提供了多种创建和初始化字符串的方法：

```csharp
using System;

// 1. 使用字符串字面量
string str1 = "Hello, World!";
string str2 = "C#编程";

// 2. 使用String构造函数
string str3 = new string('A', 5); // 创建包含5个'A'字符的字符串: "AAAAA"
char[] chars = { 'H', 'e', 'l', 'l', 'o' };
string str4 = new string(chars); // "Hello"

// 3. 使用字符串插值（String Interpolation）
string name = "张三";
int age = 25;
string str5 = $"姓名: {name}, 年龄: {age}"; // "姓名: 张三, 年龄: 25"

// 4. 使用String.Format方法
string str6 = String.Format("姓名: {0}, 年龄: {1}", name, age);

// 5. 使用字符串连接
string str7 = "Hello" + " " + "World"; // "Hello World"

// 6. 使用@符号创建逐字字符串（Verbatim String）
string path1 = "C:\\Users\\Documents\\file.txt"; // 需要转义
string path2 = @"C:\Users\Documents\file.txt"; // 不需要转义
string multiline = @"第一行
第二行
第三行";

// 7. 空字符串和null
string empty1 = ""; // 空字符串
string empty2 = String.Empty; // 空字符串（推荐）
string nullString = null; // null引用

// 输出结果
Console.WriteLine($"str1: {str1}");
Console.WriteLine($"str3: {str3}");
Console.WriteLine($"str5: {str5}");
Console.WriteLine($"path2: {path2}");
```

### String的常用属性

String类提供了多个有用的属性来获取字符串的信息：

```csharp
string text = "Hello, World!";

// Length属性 - 获取字符串的字符数
Console.WriteLine($"字符串长度: {text.Length}"); // 输出: 13

// 检查字符串是否为空或null
string empty = "";
string nullStr = null;

Console.WriteLine($"empty是否为空: {String.IsNullOrEmpty(empty)}"); // true
Console.WriteLine($"nullStr是否为null或空: {String.IsNullOrEmpty(nullStr)}"); // true
Console.WriteLine($"empty是否为空白: {String.IsNullOrWhiteSpace(empty)}"); // true
Console.WriteLine($"text是否为空白: {String.IsNullOrWhiteSpace("   ")}"); // true

// 访问字符串中的字符（通过索引）
char firstChar = text[0]; // 'H'
char lastChar = text[text.Length - 1]; // '!'
Console.WriteLine($"第一个字符: {firstChar}");
Console.WriteLine($"最后一个字符: {lastChar}");
```

### String的常用方法

String类提供了丰富的实例方法和静态方法来操作字符串：

#### 字符串查找方法

```csharp
string text = "Hello, World! Hello, C#!";

// IndexOf方法 - 查找子字符串首次出现的位置
int index1 = text.IndexOf("Hello"); // 0
int index2 = text.IndexOf("World"); // 7
int index3 = text.IndexOf("Java"); // -1 (未找到)

// LastIndexOf方法 - 查找子字符串最后出现的位置
int lastIndex = text.LastIndexOf("Hello"); // 14

// Contains方法 - 检查字符串是否包含子字符串
bool contains = text.Contains("World"); // true

// StartsWith方法 - 检查字符串是否以指定子字符串开头
bool startsWith = text.StartsWith("Hello"); // true

// EndsWith方法 - 检查字符串是否以指定子字符串结尾
bool endsWith = text.EndsWith("!"); // true

Console.WriteLine($"IndexOf('Hello'): {index1}");
Console.WriteLine($"LastIndexOf('Hello'): {lastIndex}");
Console.WriteLine($"Contains('World'): {contains}");
```

#### 字符串截取和分割方法

```csharp
string text = "Hello, World, C#, Programming";

// Substring方法 - 截取子字符串
string sub1 = text.Substring(0, 5); // "Hello" (从索引0开始，长度为5)
string sub2 = text.Substring(7); // "World, C#, Programming" (从索引7到末尾)

// Split方法 - 分割字符串
string[] parts1 = text.Split(','); // 按逗号分割
string[] parts2 = text.Split(new char[] { ',', ' ' }, StringSplitOptions.RemoveEmptyEntries); // 按多个字符分割并移除空项

Console.WriteLine($"Substring(0, 5): {sub1}");
Console.WriteLine($"Split结果:");
foreach (string part in parts1)
{
    Console.WriteLine($"  - {part.Trim()}"); // Trim()移除首尾空白
}

// 使用Split的重载方法
string data = "张三|25|北京|工程师";
string[] fields = data.Split('|');
Console.WriteLine($"姓名: {fields[0]}, 年龄: {fields[1]}, 城市: {fields[2]}, 职业: {fields[3]}");
```

#### 字符串替换方法

```csharp
string text = "Hello, World! Hello, C#!";

// Replace方法 - 替换字符串
string replaced1 = text.Replace("Hello", "Hi"); // "Hi, World! Hi, C#!"
string replaced2 = text.Replace("World", "Universe"); // "Hello, Universe! Hello, C#!"

// 替换单个字符
string replaced3 = text.Replace('o', 'O'); // "HellO, WOrld! HellO, C#!"

Console.WriteLine($"替换'Hello'为'Hi': {replaced1}");
Console.WriteLine($"替换'o'为'O': {replaced3}");

// 移除字符串
string removed = text.Remove(5, 2); // 从索引5开始移除2个字符: "Hello World! Hello, C#!"
Console.WriteLine($"移除字符后: {removed}");
```

#### 字符串大小写转换方法

```csharp
string text = "Hello, World!";

// ToUpper方法 - 转换为大写
string upper = text.ToUpper(); // "HELLO, WORLD!"

// ToLower方法 - 转换为小写
string lower = text.ToLower(); // "hello, world!"

Console.WriteLine($"大写: {upper}");
Console.WriteLine($"小写: {lower}");
```

#### 字符串格式化方法

```csharp
string name = "张三";
int age = 25;
double salary = 8500.50;

// 使用字符串插值（推荐）
string formatted1 = $"姓名: {name}, 年龄: {age}, 薪资: {salary:C}";

// 使用String.Format方法
string formatted2 = String.Format("姓名: {0}, 年龄: {1}, 薪资: {2:C}", name, age, salary);

// 使用ToString方法格式化
string formatted3 = $"薪资: {salary:F2}"; // 保留2位小数
string formatted4 = $"百分比: {0.25:P}"; // 25.00%
string formatted5 = $"十六进制: {255:X}"; // FF

Console.WriteLine(formatted1);
Console.WriteLine(formatted2);
Console.WriteLine(formatted3);
Console.WriteLine(formatted4);
Console.WriteLine(formatted5);
```

#### 字符串连接方法

```csharp
string[] words = { "Hello", "World", "C#", "Programming" };

// 使用+运算符连接
string joined1 = words[0] + " " + words[1]; // "Hello World"

// 使用String.Concat方法
string joined2 = String.Concat(words); // "HelloWorldC#Programming"

// 使用String.Join方法（推荐）
string joined3 = String.Join(" ", words); // "Hello World C# Programming"
string joined4 = String.Join(", ", words); // "Hello, World, C#, Programming"

Console.WriteLine($"Join结果: {joined3}");
Console.WriteLine($"Join结果(逗号分隔): {joined4}");
```

#### 字符串修剪方法

```csharp
string text = "   Hello, World!   ";

// Trim方法 - 移除首尾空白字符
string trimmed = text.Trim(); // "Hello, World!"

// TrimStart方法 - 移除开头空白字符
string trimmedStart = text.TrimStart(); // "Hello, World!   "

// TrimEnd方法 - 移除结尾空白字符
string trimmedEnd = text.TrimEnd(); // "   Hello, World!"

// Trim方法可以指定要移除的字符
string text2 = "***Hello, World!***";
string trimmed2 = text2.Trim('*'); // "Hello, World!"

Console.WriteLine($"Trim结果: '{trimmed}'");
Console.WriteLine($"Trim('*')结果: '{trimmed2}'");
```

### StringBuilder类

当需要频繁修改字符串时，使用StringBuilder类可以获得更好的性能，因为它不会每次都创建新的字符串对象。

```csharp
using System.Text;

// 创建StringBuilder对象
StringBuilder sb = new StringBuilder();

// Append方法 - 追加字符串
sb.Append("Hello");
sb.Append(" ");
sb.Append("World");

// AppendLine方法 - 追加字符串并换行
sb.AppendLine();
sb.AppendLine("C# Programming");

// AppendFormat方法 - 追加格式化字符串
sb.AppendFormat("姓名: {0}, 年龄: {1}", "张三", 25);

// Insert方法 - 在指定位置插入字符串
sb.Insert(0, "开始: ");

// Remove方法 - 移除指定范围的字符
sb.Remove(0, 4); // 移除前4个字符

// Replace方法 - 替换字符串
sb.Replace("World", "Universe");

// Clear方法 - 清空内容
// sb.Clear();

// ToString方法 - 转换为字符串
string result = sb.ToString();
Console.WriteLine(result);

// StringBuilder的容量管理
StringBuilder sb2 = new StringBuilder(100); // 指定初始容量
StringBuilder sb3 = new StringBuilder("初始内容", 100); // 指定初始内容和容量

// 获取和设置容量
Console.WriteLine($"当前长度: {sb2.Length}, 容量: {sb2.Capacity}");
sb2.EnsureCapacity(200); // 确保容量至少为200
```

### 字符串比较

C#提供了多种字符串比较方法，每种方法适用于不同的场景：

```csharp
string str1 = "Hello";
string str2 = "hello";
string str3 = "Hello";

// == 运算符和 Equals方法 - 区分大小写的比较
bool equal1 = (str1 == str2); // false
bool equal2 = str1.Equals(str2); // false
bool equal3 = str1.Equals(str3); // true

// String.Equals静态方法
bool equal4 = String.Equals(str1, str2); // false
bool equal5 = String.Equals(str1, str2, StringComparison.OrdinalIgnoreCase); // true (忽略大小写)

// CompareTo方法 - 比较字符串（返回负数、0或正数）
int compare1 = str1.CompareTo(str2); // 负数（str1 < str2）
int compare2 = str1.CompareTo(str3); // 0 (相等)

// String.Compare静态方法
int compare3 = String.Compare(str1, str2); // 负数
int compare4 = String.Compare(str1, str2, StringComparison.OrdinalIgnoreCase); // 0 (忽略大小写)

// StringComparison枚举的常用值
// Ordinal: 区分大小写的序数比较（最快）
// OrdinalIgnoreCase: 不区分大小写的序数比较
// CurrentCulture: 使用当前文化信息比较
// InvariantCulture: 使用固定文化信息比较

Console.WriteLine($"str1 == str2: {equal1}");
Console.WriteLine($"CompareTo结果: {compare1}");
```

### 字符串的实际应用示例

以下是一些String在实际开发中的应用场景：

```csharp
using System;
using System.Text;
using System.Text.RegularExpressions;

class StringExamples
{
    // 验证邮箱格式
    public static bool IsValidEmail(string email)
    {
        if (String.IsNullOrWhiteSpace(email))
            return false;
        
        // 简单的邮箱验证（实际应用中应使用更严格的验证）
        return email.Contains("@") && 
               email.Contains(".") && 
               email.IndexOf("@") < email.LastIndexOf(".");
    }
    
    // 提取字符串中的数字
    public static string ExtractNumbers(string input)
    {
        if (String.IsNullOrEmpty(input))
            return "";
        
        StringBuilder numbers = new StringBuilder();
        foreach (char c in input)
        {
            if (Char.IsDigit(c))
            {
                numbers.Append(c);
            }
        }
        return numbers.ToString();
    }
    
    // 反转字符串
    public static string ReverseString(string input)
    {
        if (String.IsNullOrEmpty(input))
            return input;
        
        char[] chars = input.ToCharArray();
        Array.Reverse(chars);
        return new string(chars);
    }
    
    // 统计字符串中单词的数量
    public static int CountWords(string text)
    {
        if (String.IsNullOrWhiteSpace(text))
            return 0;
        
        string[] words = text.Split(new char[] { ' ', '\t', '\n', '\r' }, 
                                    StringSplitOptions.RemoveEmptyEntries);
        return words.Length;
    }
    
    // 首字母大写
    public static string CapitalizeFirstLetter(string input)
    {
        if (String.IsNullOrEmpty(input))
            return input;
        
        return Char.ToUpper(input[0]) + input.Substring(1).ToLower();
    }
    
    // 移除HTML标签
    public static string RemoveHtmlTags(string html)
    {
        if (String.IsNullOrEmpty(html))
            return html;
        
        // 简单的HTML标签移除（实际应用中应使用更完善的方法）
        return Regex.Replace(html, "<.*?>", String.Empty);
    }
    
    // 格式化手机号码（添加分隔符）
    public static string FormatPhoneNumber(string phone)
    {
        if (String.IsNullOrEmpty(phone) || phone.Length != 11)
            return phone;
        
        return $"{phone.Substring(0, 3)}-{phone.Substring(3, 4)}-{phone.Substring(7)}";
    }
    
    // 检查字符串是否为回文
    public static bool IsPalindrome(string input)
    {
        if (String.IsNullOrEmpty(input))
            return false;
        
        string cleaned = input.Replace(" ", "").ToLower();
        string reversed = ReverseString(cleaned);
        return cleaned == reversed;
    }
    
    static void Main()
    {
        // 测试邮箱验证
        Console.WriteLine($"'test@example.com' 是否为有效邮箱: {IsValidEmail("test@example.com")}");
        Console.WriteLine($"'invalid-email' 是否为有效邮箱: {IsValidEmail("invalid-email")}");
        
        // 测试提取数字
        string textWithNumbers = "我有3个苹果和5个橙子";
        Console.WriteLine($"从'{textWithNumbers}'中提取数字: {ExtractNumbers(textWithNumbers)}");
        
        // 测试反转字符串
        Console.WriteLine($"'Hello'反转后: {ReverseString("Hello")}");
        
        // 测试统计单词
        string sentence = "C# 是一门强大的编程语言";
        Console.WriteLine($"'{sentence}'中的单词数: {CountWords(sentence)}");
        
        // 测试首字母大写
        Console.WriteLine($"'hello world'首字母大写: {CapitalizeFirstLetter("hello world")}");
        
        // 测试格式化手机号
        Console.WriteLine($"格式化手机号: {FormatPhoneNumber("13812345678")}");
        
        // 测试回文检查
        Console.WriteLine($"'level'是否为回文: {IsPalindrome("level")}");
        Console.WriteLine($"'hello'是否为回文: {IsPalindrome("hello")}");
    }
}
```

### 字符串与性能优化

由于字符串的不可变性，频繁的字符串操作可能影响性能。以下是一些优化建议：

```csharp
// 1. 使用StringBuilder进行大量字符串拼接
// 不推荐的做法
string result = "";
for (int i = 0; i < 1000; i++)
{
    result += i.ToString(); // 每次都会创建新字符串
}

// 推荐的做法
StringBuilder sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
{
    sb.Append(i.ToString());
}
string result2 = sb.ToString();

// 2. 使用String.Join代替循环拼接
string[] items = new string[1000];
for (int i = 0; i < 1000; i++)
{
    items[i] = i.ToString();
}
string joined = String.Join("", items); // 比循环拼接更高效

// 3. 使用字符串插值代替String.Format（C# 6.0+）
string name = "张三";
int age = 25;
// 推荐
string msg1 = $"姓名: {name}, 年龄: {age}";
// 不推荐（较旧的方式）
string msg2 = String.Format("姓名: {0}, 年龄: {1}", name, age);
```

### String使用注意事项

1. **字符串不可变性**：字符串一旦创建就不能修改，任何修改操作都会创建新字符串。对于频繁修改的场景，应使用StringBuilder。

2. **null和空字符串的区别**：
   - `null`表示没有引用任何字符串对象
   - `""`或`String.Empty`表示引用了一个空字符串对象
   - 使用`String.IsNullOrEmpty()`或`String.IsNullOrWhiteSpace()`进行检查

3. **字符串比较**：
   - 使用`==`运算符进行引用比较（对于字符串，实际上是比较值）
   - 使用`String.Equals()`进行值比较
   - 使用`String.Compare()`进行排序比较
   - 根据场景选择合适的`StringComparison`选项

4. **性能考虑**：
   - 避免在循环中进行字符串拼接，使用StringBuilder
   - 使用字符串插值代替String.Format（C# 6.0+）
   - 对于大量字符串操作，考虑使用StringBuilder

5. **内存管理**：
   - 字符串是引用类型，存储在堆上
   - 字符串字面量会被字符串池（String Pool）缓存，相同内容的字符串可能共享同一引用

6. **字符编码**：
   - C#中的字符串使用UTF-16编码
   - 处理不同编码时，需要使用`Encoding`类进行转换

### String类常用属性和方法速查表

#### 常用属性

| 属性 | 类型 | 作用说明 |
|------|------|----------|
| Length | int | 获取字符串中的字符数。例如：`string str = "Hello"; int len = str.Length; // 返回5` |
| Chars[int] | char | 获取字符串中指定位置的字符。例如：`char c = str[0]; // 获取第一个字符` |

#### 常用静态方法

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Compare(string, string) | string strA, string strB | int | 比较两个字符串，返回负数、0或正数。负数表示strA < strB，0表示相等，正数表示strA > strB |
| Compare(string, string, StringComparison) | string strA, string strB, StringComparison comparisonType | int | 使用指定的比较规则比较两个字符串 |
| Concat(params string[]) | params string[] values | string | 连接多个字符串。例如：`String.Concat("Hello", " ", "World")` 返回 "Hello World" |
| Format(string, params object[]) | string format, params object[] args | string | 格式化字符串。例如：`String.Format("{0} is {1} years old", "John", 25)` |
| Join(string, string[]) | string separator, string[] value | string | 使用指定分隔符连接字符串数组。例如：`String.Join(", ", new[]{"a", "b", "c"})` 返回 "a, b, c" |
| IsNullOrEmpty(string) | string value | bool | 检查字符串是否为null或空字符串 |
| IsNullOrWhiteSpace(string) | string value | bool | 检查字符串是否为null、空字符串或只包含空白字符 |
| Empty | string | string | 表示空字符串的静态字段，等同于"" |

#### 常用实例方法

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Contains(string) | string value | bool | 检查字符串是否包含指定的子字符串 |
| EndsWith(string) | string value | bool | 检查字符串是否以指定的子字符串结尾 |
| StartsWith(string) | string value | bool | 检查字符串是否以指定的子字符串开头 |
| IndexOf(string) | string value | int | 返回指定子字符串首次出现的索引位置，如果未找到返回-1 |
| IndexOf(string, int) | string value, int startIndex | int | 从指定索引开始搜索子字符串 |
| LastIndexOf(string) | string value | int | 返回指定子字符串最后出现的索引位置 |
| Substring(int) | int startIndex | string | 从指定索引开始截取到字符串末尾的子字符串 |
| Substring(int, int) | int startIndex, int length | string | 从指定索引开始截取指定长度的子字符串 |
| Replace(string, string) | string oldValue, string newValue | string | 将字符串中所有出现的指定子字符串替换为新的子字符串 |
| Replace(char, char) | char oldChar, char newChar | string | 将字符串中所有出现的指定字符替换为新的字符 |
| Split(params char[]) | params char[] separator | string[] | 根据指定的分隔符将字符串分割为字符串数组 |
| Split(char[], StringSplitOptions) | char[] separator, StringSplitOptions options | string[] | 根据指定的分隔符和选项分割字符串 |
| ToLower() | 无 | string | 将字符串转换为小写 |
| ToUpper() | 无 | string | 将字符串转换为大写 |
| Trim() | 无 | string | 移除字符串首尾的空白字符 |
| Trim(params char[]) | params char[] trimChars | string | 移除字符串首尾的指定字符 |
| TrimStart() | 无 | string | 移除字符串开头的空白字符 |
| TrimEnd() | 无 | string | 移除字符串结尾的空白字符 |
| Remove(int) | int startIndex | string | 从指定索引开始移除到字符串末尾的所有字符 |
| Remove(int, int) | int startIndex, int count | string | 从指定索引开始移除指定数量的字符 |
| Insert(int, string) | int startIndex, string value | string | 在指定索引位置插入字符串 |
| PadLeft(int) | int totalWidth | string | 在字符串左侧填充空白字符，使总长度达到指定值 |
| PadRight(int) | int totalWidth | string | 在字符串右侧填充空白字符，使总长度达到指定值 |
| Equals(string) | string value | bool | 检查字符串是否与指定字符串相等 |
| Equals(string, StringComparison) | string value, StringComparison comparisonType | bool | 使用指定的比较规则检查字符串是否相等 |
| CompareTo(string) | string strB | int | 比较当前字符串与指定字符串，返回负数、0或正数 |
| ToCharArray() | 无 | char[] | 将字符串转换为字符数组 |
| ToString() | 无 | string | 返回字符串本身（因为已经是字符串） |

### StringBuilder类常用方法速查表

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Append(string) | string value | StringBuilder | 在StringBuilder末尾追加字符串，返回当前StringBuilder实例以支持链式调用 |
| AppendLine() | 无 | StringBuilder | 追加换行符 |
| AppendLine(string) | string value | StringBuilder | 追加字符串并换行 |
| AppendFormat(string, params object[]) | string format, params object[] args | StringBuilder | 追加格式化字符串 |
| Insert(int, string) | int index, string value | StringBuilder | 在指定索引位置插入字符串 |
| Remove(int, int) | int startIndex, int length | StringBuilder | 从指定索引开始移除指定长度的字符 |
| Replace(string, string) | string oldValue, string newValue | StringBuilder | 替换字符串中所有出现的指定子字符串 |
| Clear() | 无 | StringBuilder | 清空StringBuilder的内容 |
| ToString() | 无 | string | 将StringBuilder转换为字符串 |
| EnsureCapacity(int) | int capacity | int | 确保容量至少为指定值 |

通过合理使用String类和StringBuilder类，可以高效地处理各种文本操作，满足应用程序中对字符串处理的需求。在实际开发中，应根据具体场景选择合适的字符串操作方法，并注意性能优化。

## <a id="object-class"></a>C# Object类详解

Object类是C#中所有类型的基类，在C#类型系统中占据核心地位。理解Object类的特性和用法对于深入理解C#的类型系统、继承机制以及类型转换至关重要。

### Object类的基本概念

在C#中，`object`是`System.Object`类的别名，所有类型（包括值类型和引用类型）都直接或间接继承自Object类。这意味着任何类型的变量都可以赋值给object类型的变量。

#### Object在类型系统中的地位

```csharp
// Object是所有类型的基类
object obj1 = 100;           // int类型可以赋值给object
object obj2 = "Hello";       // string类型可以赋值给object
object obj3 = true;          // bool类型可以赋值给object
object obj4 = new List<int>(); // 引用类型可以赋值给object

// 值类型和引用类型都可以转换为object
int number = 42;
string text = "C#";
DateTime date = DateTime.Now;

object o1 = number;  // 值类型装箱为object
object o2 = text;    // 引用类型直接赋值
object o3 = date;    // 值类型装箱为object

Console.WriteLine($"obj1类型: {obj1.GetType()}");
Console.WriteLine($"obj2类型: {obj2.GetType()}");
Console.WriteLine($"obj3类型: {obj3.GetType()}");
```

#### 为什么需要Object类？

1. **统一类型系统**：Object类为所有类型提供了统一的基类，使得C#具有统一的类型系统。

2. **多态支持**：通过Object类型可以实现多态，编写能够处理任意类型的通用代码。

3. **集合存储**：在泛型出现之前，Object类型用于在集合中存储不同类型的数据。

4. **反射支持**：Object类提供了GetType()方法，支持运行时类型检查。

### Object类的常用方法

Object类提供了几个重要的虚方法，这些方法可以被派生类重写：

#### ToString()方法

ToString()方法返回对象的字符串表示。默认实现返回类型的完全限定名。

```csharp
// 默认的ToString()实现
object obj = new object();
Console.WriteLine(obj.ToString()); // 输出: System.Object

// 值类型的ToString()
int number = 42;
Console.WriteLine(number.ToString()); // 输出: 42

// 引用类型的ToString()
string text = "Hello";
Console.WriteLine(text.ToString()); // 输出: Hello

// 自定义类型的ToString()
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public override string ToString()
    {
        return $"姓名: {Name}, 年龄: {Age}";
    }
}

Person person = new Person { Name = "张三", Age = 25 };
Console.WriteLine(person.ToString()); // 输出: 姓名: 张三, 年龄: 25
```

#### Equals()方法

Equals()方法用于比较两个对象是否相等。Object类提供了两个版本的Equals方法：

```csharp
// 实例方法 Equals(object obj)
object obj1 = "Hello";
object obj2 = "Hello";
object obj3 = "World";

bool equal1 = obj1.Equals(obj2); // true (字符串值相等)
bool equal2 = obj1.Equals(obj3); // false

// 静态方法 Equals(object objA, object objB)
bool equal3 = Object.Equals(obj1, obj2); // true
bool equal4 = Object.Equals(obj1, null); // false
bool equal5 = Object.Equals(null, null); // true (两个null相等)

// 值类型的Equals()比较
int a = 100;
int b = 100;
int c = 200;
Console.WriteLine($"a.Equals(b): {a.Equals(b)}"); // true
Console.WriteLine($"a.Equals(c): {a.Equals(c)}"); // false

// 引用类型的Equals()默认比较引用
Person p1 = new Person { Name = "张三", Age = 25 };
Person p2 = new Person { Name = "张三", Age = 25 };
Person p3 = p1;

Console.WriteLine($"p1.Equals(p2): {p1.Equals(p2)}"); // false (不同对象，引用不同)
Console.WriteLine($"p1.Equals(p3): {p1.Equals(p3)}"); // true (同一对象)

// 重写Equals()方法实现值比较
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
            return false;
        
        Person other = (Person)obj;
        return Name == other.Name && Age == other.Age;
    }
    
    public override int GetHashCode()
    {
        return HashCode.Combine(Name, Age);
    }
}
```

#### GetHashCode()方法

GetHashCode()方法返回对象的哈希码，用于在哈希表等数据结构中快速查找对象。

```csharp
// 默认的GetHashCode()实现
object obj1 = new object();
object obj2 = new object();
Console.WriteLine($"obj1的哈希码: {obj1.GetHashCode()}");
Console.WriteLine($"obj2的哈希码: {obj2.GetHashCode()}");

// 相同对象的哈希码相同
object obj3 = obj1;
Console.WriteLine($"obj1和obj3的哈希码相同: {obj1.GetHashCode() == obj3.GetHashCode()}"); // true

// 字符串的哈希码基于内容
string str1 = "Hello";
string str2 = "Hello";
Console.WriteLine($"相同内容的字符串哈希码相同: {str1.GetHashCode() == str2.GetHashCode()}"); // true

// 值类型的哈希码基于值
int num1 = 100;
int num2 = 100;
Console.WriteLine($"相同值的整数哈希码相同: {num1.GetHashCode() == num2.GetHashCode()}"); // true

// 重写GetHashCode()的示例
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public override int GetHashCode()
    {
        // 使用HashCode.Combine (C# 7.3+)
        return HashCode.Combine(Name, Age);
        
        // 或者使用传统方式
        // int hash = 17;
        // hash = hash * 23 + (Name?.GetHashCode() ?? 0);
        // hash = hash * 23 + Age.GetHashCode();
        // return hash;
    }
}
```

#### GetType()方法

GetType()方法返回对象的运行时类型信息，返回Type对象。

```csharp
// 获取对象的类型
object obj1 = 100;
object obj2 = "Hello";
object obj3 = new List<int>();

Type type1 = obj1.GetType();
Type type2 = obj2.GetType();
Type type3 = obj3.GetType();

Console.WriteLine($"obj1的类型: {type1.Name}"); // Int32
Console.WriteLine($"obj2的类型: {type2.Name}"); // String
Console.WriteLine($"obj3的类型: {type3.Name}"); // List`1

// 使用typeof运算符比较类型
if (obj1.GetType() == typeof(int))
{
    Console.WriteLine("obj1是int类型");
}

// 获取类型的完全限定名
Console.WriteLine($"完全限定名: {type1.FullName}"); // System.Int32
Console.WriteLine($"命名空间: {type1.Namespace}"); // System
```

#### ReferenceEquals()方法

ReferenceEquals()是静态方法，用于比较两个对象的引用是否指向同一个对象。

```csharp
// ReferenceEquals比较引用
object obj1 = new object();
object obj2 = new object();
object obj3 = obj1;

Console.WriteLine($"obj1和obj2引用相同: {Object.ReferenceEquals(obj1, obj2)}"); // false
Console.WriteLine($"obj1和obj3引用相同: {Object.ReferenceEquals(obj1, obj3)}"); // true

// 字符串的特殊情况（字符串驻留）
string str1 = "Hello";
string str2 = "Hello";
string str3 = new string("Hello".ToCharArray());

Console.WriteLine($"str1和str2引用相同: {Object.ReferenceEquals(str1, str2)}"); // true (字符串驻留)
Console.WriteLine($"str1和str3引用相同: {Object.ReferenceEquals(str1, str3)}"); // false

// null比较
Console.WriteLine($"null和null引用相同: {Object.ReferenceEquals(null, null)}"); // true
```

### Object的运算和比较

#### 相等性比较

C#提供了多种方式比较对象的相等性：

```csharp
// 1. == 运算符
int a = 100;
int b = 100;
Console.WriteLine($"a == b: {a == b}"); // true (值类型比较值)

string s1 = "Hello";
string s2 = "Hello";
Console.WriteLine($"s1 == s2: {s1 == s2}"); // true (字符串重载了==，比较值)

Person p1 = new Person { Name = "张三", Age = 25 };
Person p2 = new Person { Name = "张三", Age = 25 };
Console.WriteLine($"p1 == p2: {p1 == p2}"); // false (引用类型默认比较引用)

// 2. Equals()方法
Console.WriteLine($"a.Equals(b): {a.Equals(b)}"); // true
Console.WriteLine($"s1.Equals(s2): {s1.Equals(s2)}"); // true
Console.WriteLine($"p1.Equals(p2): {p1.Equals(p2)}"); // 取决于是否重写了Equals

// 3. Object.ReferenceEquals()方法
Console.WriteLine($"ReferenceEquals(p1, p2): {Object.ReferenceEquals(p1, p2)}"); // false
```

#### 类型比较

```csharp
// 使用is运算符进行类型检查
object obj = "Hello";

if (obj is string)
{
    Console.WriteLine("obj是string类型");
}

if (obj is int)
{
    Console.WriteLine("obj是int类型");
}

// 使用is运算符进行模式匹配 (C# 7.0+)
if (obj is string str)
{
    Console.WriteLine($"转换后的字符串: {str}");
}

// 使用as运算符进行安全类型转换
string text = obj as string;
if (text != null)
{
    Console.WriteLine($"转换成功: {text}");
}

int? number = obj as int?;
if (number == null)
{
    Console.WriteLine("转换失败，返回null");
}
```

### Object的类型转换

#### 向上转型（隐式转换）

值类型和引用类型都可以隐式转换为object类型，这个过程对于值类型来说就是装箱。

```csharp
// 值类型向上转型（装箱）
int number = 42;
object obj1 = number; // 隐式装箱

// 引用类型向上转型
string text = "Hello";
object obj2 = text; // 直接赋值，无装箱

// 自定义类型向上转型
Person person = new Person { Name = "张三", Age = 25 };
object obj3 = person; // 直接赋值
```

#### 向下转型（显式转换）

从object类型转换回具体类型需要显式转换。

```csharp
// 使用强制类型转换
object obj = 100;
int number = (int)obj; // 显式拆箱

object obj2 = "Hello";
string text = (string)obj2; // 显式转换

// 转换失败会抛出InvalidCastException
try
{
    object obj3 = "Hello";
    int num = (int)obj3; // 抛出异常
}
catch (InvalidCastException ex)
{
    Console.WriteLine($"转换失败: {ex.Message}");
}

// 使用as运算符进行安全转换（不会抛出异常）
object obj4 = "Hello";
string str = obj4 as string; // 成功，返回"Hello"

object obj5 = 100;
string str2 = obj5 as string; // 失败，返回null（因为int不能转换为string）

// 使用is运算符检查类型后再转换
object obj6 = 100;
if (obj6 is int)
{
    int num = (int)obj6; // 安全转换
    Console.WriteLine($"转换成功: {num}");
}
```

### 装箱和拆箱详解

装箱和拆箱是C#类型系统中的重要概念，理解它们对于编写高性能代码至关重要。

#### 什么是装箱（Boxing）？

装箱是将值类型转换为object类型或接口类型的过程。装箱时，值类型的值会被复制到堆上，并创建一个对象引用来包装这个值。

```csharp
// 装箱示例
int number = 42;
object obj = number; // 装箱：值类型转换为引用类型

// 装箱的过程：
// 1. 在堆上分配内存
// 2. 将值类型的值复制到堆上
// 3. 返回对象引用

// 验证装箱
Console.WriteLine($"number的类型: {number.GetType()}"); // System.Int32
Console.WriteLine($"obj的类型: {obj.GetType()}"); // System.Int32
Console.WriteLine($"number的值: {number}"); // 42
Console.WriteLine($"obj的值: {obj}"); // 42

// 多个值类型的装箱
int i = 100;
double d = 3.14;
bool b = true;
DateTime dt = DateTime.Now;

object o1 = i;  // 装箱
object o2 = d;  // 装箱
object o3 = b;  // 装箱
object o4 = dt; // 装箱
```

#### 什么是拆箱（Unboxing）？

拆箱是将object类型或接口类型转换回值类型的过程。拆箱时，需要显式指定目标类型，并且只能拆箱到原始的值类型。

```csharp
// 拆箱示例
object obj = 42; // 装箱
int number = (int)obj; // 拆箱：引用类型转换回值类型

// 拆箱的过程：
// 1. 检查对象引用是否为null
// 2. 检查对象是否为指定值类型的装箱实例
// 3. 将堆上的值复制回栈上的值类型变量

// 正确的拆箱
object obj1 = 100;
int num1 = (int)obj1; // 正确：拆箱到原始类型

// 错误的拆箱会抛出异常
object obj2 = 100;
try
{
    long num2 = (long)obj2; // 错误：不能拆箱到不同的类型
}
catch (InvalidCastException ex)
{
    Console.WriteLine($"拆箱失败: {ex.Message}");
}

// 正确的拆箱方式
object obj3 = 100;
if (obj3 is int)
{
    int num3 = (int)obj3; // 安全拆箱
    Console.WriteLine($"拆箱成功: {num3}");
}
```

#### 装箱和拆箱的性能影响

装箱和拆箱会带来性能开销，应尽量避免在性能敏感的代码中使用。

```csharp
// 性能测试：避免装箱
void PerformanceTest()
{
    // 不好的做法：频繁装箱
    int sum1 = 0;
    for (int i = 0; i < 1000000; i++)
    {
        object obj = i; // 装箱
        sum1 += (int)obj; // 拆箱
    }
    
    // 好的做法：避免装箱
    int sum2 = 0;
    for (int i = 0; i < 1000000; i++)
    {
        sum2 += i; // 直接操作值类型
    }
}

// 集合中的装箱问题
// ArrayList会进行装箱（不推荐）
ArrayList list1 = new ArrayList();
list1.Add(1);    // 装箱
list1.Add(2);    // 装箱
int value1 = (int)list1[0]; // 拆箱

// List<T>不会装箱（推荐）
List<int> list2 = new List<int>();
list2.Add(1);    // 无装箱
list2.Add(2);    // 无装箱
int value2 = list2[0]; // 无拆箱
```

#### 装箱和拆箱的最佳实践

```csharp
// 1. 使用泛型集合代替非泛型集合
// 不推荐
ArrayList list = new ArrayList();
list.Add(100); // 装箱

// 推荐
List<int> genericList = new List<int>();
genericList.Add(100); // 无装箱

// 2. 使用泛型方法
// 不推荐
public void Process(object obj)
{
    if (obj is int)
    {
        int value = (int)obj; // 拆箱
        // 处理value
    }
}

// 推荐
public void Process<T>(T value)
{
    // 直接使用value，无装箱拆箱
}

// 3. 避免在接口中使用值类型
// 不推荐：值类型实现接口会导致装箱
int number = 42;
IComparable comparable = number; // 装箱

// 4. 使用Nullable<T>代替object存储值类型
// 不推荐
object obj = GetNullableInt(); // 可能装箱

// 推荐
int? nullableInt = GetNullableInt(); // 无装箱
```

### Object的实际应用示例

以下是一些Object在实际开发中的应用场景：

```csharp
using System;
using System.Collections;

class ObjectExamples
{
    // 通用方法：处理任意类型的对象
    public static void ProcessObject(object obj)
    {
        if (obj == null)
        {
            Console.WriteLine("对象为null");
            return;
        }
        
        Type type = obj.GetType();
        Console.WriteLine($"对象类型: {type.Name}");
        Console.WriteLine($"对象值: {obj}");
        
        // 根据类型进行不同处理
        if (obj is int)
        {
            int value = (int)obj;
            Console.WriteLine($"这是一个整数: {value * 2}");
        }
        else if (obj is string)
        {
            string text = (string)obj;
            Console.WriteLine($"这是一个字符串，长度: {text.Length}");
        }
        else if (obj is Person)
        {
            Person person = (Person)obj;
            Console.WriteLine($"这是一个Person对象: {person.Name}");
        }
    }
    
    // 使用模式匹配处理对象 (C# 7.0+)
    public static void ProcessObjectWithPatternMatching(object obj)
    {
        switch (obj)
        {
            case int i:
                Console.WriteLine($"整数: {i}");
                break;
            case string s:
                Console.WriteLine($"字符串: {s}");
                break;
            case Person p:
                Console.WriteLine($"Person: {p.Name}, {p.Age}岁");
                break;
            case null:
                Console.WriteLine("对象为null");
                break;
            default:
                Console.WriteLine($"未知类型: {obj.GetType().Name}");
                break;
        }
    }
    
    // 深拷贝对象（使用序列化）
    public static T DeepClone<T>(T obj) where T : class
    {
        if (obj == null)
            return null;
        
        // 这里只是示例，实际应使用序列化库
        // 例如：使用System.Text.Json或Newtonsoft.Json
        return obj; // 简化示例
    }
    
    // 比较两个对象是否相等
    public static bool AreEqual(object obj1, object obj2)
    {
        // 处理null情况
        if (obj1 == null && obj2 == null)
            return true;
        
        if (obj1 == null || obj2 == null)
            return false;
        
        // 使用Equals方法
        return obj1.Equals(obj2);
    }
    
    // 获取对象的哈希码（用于字典等）
    public static int GetObjectHashCode(object obj)
    {
        if (obj == null)
            return 0;
        
        return obj.GetHashCode();
    }
    
    // 类型安全的转换辅助方法
    public static T SafeCast<T>(object obj) where T : class
    {
        return obj as T;
    }
    
    public static T SafeCastValue<T>(object obj) where T : struct
    {
        if (obj is T)
            return (T)obj;
        return default(T);
    }
    
    static void Main()
    {
        // 测试ProcessObject
        ProcessObject(100);
        ProcessObject("Hello");
        ProcessObject(new Person { Name = "张三", Age = 25 });
        ProcessObject(null);
        
        Console.WriteLine();
        
        // 测试模式匹配
        ProcessObjectWithPatternMatching(42);
        ProcessObjectWithPatternMatching("World");
        ProcessObjectWithPatternMatching(new Person { Name = "李四", Age = 30 });
        
        Console.WriteLine();
        
        // 测试相等性比较
        int a = 100, b = 100;
        Console.WriteLine($"AreEqual(100, 100): {AreEqual(a, b)}");
        
        string s1 = "Hello", s2 = "Hello";
        Console.WriteLine($"AreEqual('Hello', 'Hello'): {AreEqual(s1, s2)}");
        
        Person p1 = new Person { Name = "张三", Age = 25 };
        Person p2 = new Person { Name = "张三", Age = 25 };
        Console.WriteLine($"AreEqual(p1, p2): {AreEqual(p1, p2)}");
    }
}

// 辅助类
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public override bool Equals(object obj)
    {
        if (obj == null || GetType() != obj.GetType())
            return false;
        
        Person other = (Person)obj;
        return Name == other.Name && Age == other.Age;
    }
    
    public override int GetHashCode()
    {
        return HashCode.Combine(Name, Age);
    }
    
    public override string ToString()
    {
        return $"Person(姓名: {Name}, 年龄: {Age})";
    }
}```

### Object与泛型

在C# 2.0引入泛型之前，Object类型被广泛用于创建通用集合和方法。现在应优先使用泛型。

```csharp
// 旧方式：使用Object（不推荐）
public class ObjectList
{
    private ArrayList list = new ArrayList();
    
    public void Add(object item)
    {
        list.Add(item); // 值类型会装箱
    }
    
    public object Get(int index)
    {
        return list[index]; // 需要拆箱
    }
}

// 新方式：使用泛型（推荐）
public class GenericList<T>
{
    private List<T> list = new List<T>();
    
    public void Add(T item)
    {
        list.Add(item); // 无装箱
    }
    
    public T Get(int index)
    {
        return list[index]; // 无拆箱
    }
}

// 使用示例
ObjectList oldList = new ObjectList();
oldList.Add(100); // 装箱
int value1 = (int)oldList.Get(0); // 拆箱

GenericList<int> newList = new GenericList<int>();
newList.Add(100); // 无装箱
int value2 = newList.Get(0); // 无拆箱
```

### Object使用注意事项

1. **性能考虑**：
   - 避免在性能敏感的代码中频繁使用装箱和拆箱
   - 优先使用泛型集合（List<T>）而不是非泛型集合（ArrayList）
   - 使用泛型方法代替Object参数的方法

2. **类型安全**：
   - 使用as运算符进行安全类型转换，避免InvalidCastException
   - 使用is运算符检查类型后再进行转换
   - 在C# 7.0+中使用模式匹配简化类型检查

3. **Equals()和GetHashCode()的重写规则**：
   - 如果重写了Equals()，必须同时重写GetHashCode()
   - 相等的对象必须具有相同的哈希码
   - GetHashCode()应该在对象的生命周期内保持不变

4. **null处理**：
   - 使用Object.ReferenceEquals()比较null更明确
   - 使用null条件运算符（?.）安全访问对象成员
   - 使用null合并运算符（??）提供默认值

5. **ToString()的重写**：
   - 为自定义类型重写ToString()提供有意义的字符串表示
   - ToString()应该返回可读的、描述性的字符串

### Object类常用方法速查表

#### 实例方法

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| ToString() | 无 | string | 返回对象的字符串表示。默认返回类型的完全限定名，建议为自定义类型重写此方法 |
| Equals(object) | object obj | bool | 比较当前对象与指定对象是否相等。值类型比较值，引用类型默认比较引用。可以重写以实现值比较 |
| GetHashCode() | 无 | int | 返回对象的哈希码。如果重写了Equals()，必须同时重写GetHashCode()。相等的对象必须具有相同的哈希码 |
| GetType() | 无 | Type | 返回对象的运行时类型信息。返回Type对象，可用于反射操作 |

#### 静态方法

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Equals(object, object) | object objA, object objB | bool | 比较两个对象是否相等。如果两个参数都为null，返回true；如果只有一个为null，返回false；否则调用objA.Equals(objB) |
| ReferenceEquals(object, object) | object objA, object objB | bool | 比较两个对象的引用是否指向同一个对象。这是唯一可靠的方式来判断两个引用是否指向同一对象实例 |

### 装箱和拆箱总结

#### 装箱（Boxing）

- **定义**：将值类型转换为object类型或接口类型
- **过程**：在堆上分配内存，复制值类型的值，返回对象引用
- **性能影响**：会分配堆内存，有性能开销
- **何时发生**：值类型赋值给object、接口类型，或作为object参数传递

#### 拆箱（Unboxing）

- **定义**：将object类型或接口类型转换回值类型
- **过程**：检查对象是否为指定类型的装箱实例，将堆上的值复制回栈
- **性能影响**：需要类型检查，有性能开销
- **注意事项**：只能拆箱到原始的值类型，否则会抛出InvalidCastException

#### 避免装箱和拆箱的最佳实践

1. 使用泛型集合（List<T>、Dictionary<TKey, TValue>等）代替非泛型集合
2. 使用泛型方法代替Object参数的方法
3. 避免值类型实现接口（如果可能）
4. 使用Nullable<T>代替object存储可空值类型
5. 在性能敏感的代码中，直接使用具体类型而不是object

通过深入理解Object类、装箱和拆箱机制，可以编写出更高效、更类型安全的C#代码。在实际开发中，应优先使用泛型来避免装箱和拆箱带来的性能开销。

## <a id="arraylist-class"></a>C# ArrayList类详解

ArrayList是C#中一个非泛型的动态数组集合类，位于System.Collections命名空间中。虽然现在推荐使用泛型集合List<T>，但了解ArrayList仍然有助于理解集合的基本概念和C#的发展历程。

### ArrayList的基本概念

ArrayList是一个可以动态调整大小的数组，可以存储任意类型的对象（object类型）。它是C# 1.0时代的主要集合类，在C# 2.0引入泛型后，逐渐被List<T>取代。

#### 为什么需要ArrayList？

在泛型出现之前，ArrayList提供了以下优势：
1. **动态大小**：可以根据需要自动调整容量
2. **类型灵活**：可以存储任意类型的对象
3. **丰富的操作**：提供了添加、删除、查找、排序等方法

#### ArrayList的局限性

1. **类型不安全**：存储的是object类型，需要类型转换
2. **性能开销**：值类型会进行装箱，读取时需要拆箱
3. **运行时错误**：类型转换错误只能在运行时发现

### ArrayList的创建和初始化

```csharp
using System.Collections;

// 1. 使用默认构造函数创建空ArrayList
ArrayList list1 = new ArrayList();

// 2. 指定初始容量创建ArrayList
ArrayList list2 = new ArrayList(10); // 初始容量为10

// 3. 使用集合初始化器创建并初始化
ArrayList list3 = new ArrayList { 1, 2, 3, "Hello", true };

// 4. 从其他集合创建ArrayList
int[] array = { 1, 2, 3, 4, 5 };
ArrayList list4 = new ArrayList(array);

// 5. 使用AddRange方法初始化
ArrayList list5 = new ArrayList();
list5.AddRange(new int[] { 1, 2, 3, 4, 5 });
list5.AddRange(new string[] { "A", "B", "C" });

Console.WriteLine($"list3的元素数: {list3.Count}");
Console.WriteLine($"list4的元素数: {list4.Count}");
```

### ArrayList的常用属性

```csharp
ArrayList list = new ArrayList { 1, 2, 3, 4, 5 };

// Count属性 - 获取ArrayList中实际包含的元素数量
Console.WriteLine($"元素数量: {list.Count}"); // 5

// Capacity属性 - 获取或设置ArrayList的容量（内部数组的大小）
Console.WriteLine($"当前容量: {list.Capacity}"); // 可能是8或更大

// 设置容量
list.Capacity = 20;
Console.WriteLine($"设置后的容量: {list.Capacity}"); // 20

// IsFixedSize属性 - 检查ArrayList是否有固定大小
Console.WriteLine($"是否有固定大小: {list.IsFixedSize}"); // false

// IsReadOnly属性 - 检查ArrayList是否为只读
Console.WriteLine($"是否只读: {list.IsReadOnly}"); // false

// IsSynchronized属性 - 检查对ArrayList的访问是否同步（线程安全）
Console.WriteLine($"是否同步: {list.IsSynchronized}"); // false
```

### ArrayList的常用方法

#### 添加元素

```csharp
ArrayList list = new ArrayList();

// Add方法 - 在末尾添加单个元素
list.Add(100);
list.Add("Hello");
list.Add(true);
list.Add(3.14);

Console.WriteLine($"添加后元素数: {list.Count}");

// AddRange方法 - 添加多个元素（从集合）
list.AddRange(new int[] { 1, 2, 3 });
list.AddRange(new string[] { "A", "B", "C" });

Console.WriteLine($"AddRange后元素数: {list.Count}");

// Insert方法 - 在指定索引位置插入元素
list.Insert(0, "First"); // 在索引0处插入
list.Insert(2, "Middle"); // 在索引2处插入

// InsertRange方法 - 在指定位置插入多个元素
list.InsertRange(1, new int[] { 10, 20, 30 });

// 输出所有元素
foreach (var item in list)
{
    Console.Write($"{item} ");
}
Console.WriteLine();
```

#### 访问和修改元素

```csharp
ArrayList list = new ArrayList { 10, 20, 30, 40, 50 };

// 通过索引访问元素（需要类型转换）
int first = (int)list[0]; // 拆箱
string second = list[1] as string; // 如果类型不匹配返回null

// 通过索引修改元素
list[0] = 100; // 如果原来是值类型，新值会装箱
list[1] = "New Value";

// 遍历ArrayList
for (int i = 0; i < list.Count; i++)
{
    Console.WriteLine($"索引 {i}: {list[i]}");
}

// 使用foreach遍历
foreach (object item in list)
{
    Console.WriteLine($"元素: {item}");
}
```

#### 查找元素

```csharp
ArrayList list = new ArrayList { 10, 20, 30, 20, 40, 20 };

// IndexOf方法 - 查找元素首次出现的索引
int index1 = list.IndexOf(20); // 返回1
int index2 = list.IndexOf(100); // 返回-1（未找到）

// LastIndexOf方法 - 查找元素最后出现的索引
int lastIndex = list.LastIndexOf(20); // 返回5

// Contains方法 - 检查是否包含指定元素
bool contains = list.Contains(30); // true
bool notContains = list.Contains(100); // false

// BinarySearch方法 - 二分查找（要求列表已排序）
ArrayList sortedList = new ArrayList { 10, 20, 30, 40, 50 };
int binaryIndex = sortedList.BinarySearch(30); // 返回2
int notFound = sortedList.BinarySearch(25); // 返回负数

Console.WriteLine($"IndexOf(20): {index1}");
Console.WriteLine($"LastIndexOf(20): {lastIndex}");
Console.WriteLine($"Contains(30): {contains}");
```

#### 删除元素

```csharp
ArrayList list = new ArrayList { 10, 20, 30, 40, 50, 20 };

// Remove方法 - 删除首次出现的指定元素
list.Remove(20); // 删除第一个20
Console.WriteLine($"Remove后: [{string.Join(", ", list.ToArray())}]");

// RemoveAt方法 - 删除指定索引的元素
list.RemoveAt(0); // 删除索引0的元素
Console.WriteLine($"RemoveAt后: [{string.Join(", ", list.ToArray())}]");

// RemoveRange方法 - 删除指定范围的元素
ArrayList list2 = new ArrayList { 10, 20, 30, 40, 50 };
list2.RemoveRange(1, 2); // 从索引1开始删除2个元素
Console.WriteLine($"RemoveRange后: [{string.Join(", ", list2.ToArray())}]");

// Clear方法 - 清空所有元素
list2.Clear();
Console.WriteLine($"Clear后元素数: {list2.Count}"); // 0
```

#### 排序和反转

```csharp
ArrayList list = new ArrayList { 50, 20, 30, 10, 40 };

// Sort方法 - 对ArrayList进行排序
Console.WriteLine($"排序前: [{string.Join(", ", list.ToArray())}]");
list.Sort();
Console.WriteLine($"排序后: [{string.Join(", ", list.ToArray())}]");

// 注意：Sort要求所有元素实现IComparable接口
// 如果元素类型不同，排序可能会失败

// Reverse方法 - 反转ArrayList中元素的顺序
ArrayList list2 = new ArrayList { 1, 2, 3, 4, 5 };
list2.Reverse();
Console.WriteLine($"反转后: [{string.Join(", ", list2.ToArray())}]");

// 使用自定义比较器排序
ArrayList list3 = new ArrayList { "apple", "banana", "cherry", "date" };
list3.Sort(new CaseInsensitiveComparer()); // 不区分大小写排序
Console.WriteLine($"自定义排序后: [{string.Join(", ", list3.ToArray())}]");
```

#### 复制和转换

```csharp
ArrayList list = new ArrayList { 10, 20, 30, 40, 50 };

// Clone方法 - 创建ArrayList的浅表副本
ArrayList cloned = (ArrayList)list.Clone();
Console.WriteLine($"原列表: [{string.Join(", ", list.ToArray())}]");
Console.WriteLine($"克隆列表: [{string.Join(", ", cloned.ToArray())}]");

// ToArray方法 - 将ArrayList转换为数组
object[] array = list.ToArray();
int[] intArray = list.Cast<int>().ToArray(); // 使用LINQ转换类型

// CopyTo方法 - 复制到数组
int[] targetArray = new int[list.Count];
list.CopyTo(targetArray);
Console.WriteLine($"复制到数组: [{string.Join(", ", targetArray)}]");

// GetRange方法 - 获取指定范围的元素（返回新的ArrayList）
ArrayList range = list.GetRange(1, 3); // 从索引1开始，获取3个元素
Console.WriteLine($"范围元素: [{string.Join(", ", range.ToArray())}]");
```

### ArrayList的类型转换和装箱拆箱

由于ArrayList存储的是object类型，值类型会进行装箱，读取时需要拆箱：

```csharp
ArrayList list = new ArrayList();

// 值类型装箱
int number = 100;
list.Add(number); // 装箱：int转换为object

// 读取时需要拆箱
int value = (int)list[0]; // 拆箱：object转换为int

// 类型转换错误会在运行时抛出异常
try
{
    string str = (string)list[0]; // 抛出InvalidCastException
}
catch (InvalidCastException ex)
{
    Console.WriteLine($"类型转换错误: {ex.Message}");
}

// 使用as运算符进行安全转换
string safeStr = list[0] as string; // 返回null，不会抛出异常
if (safeStr != null)
{
    Console.WriteLine($"转换成功: {safeStr}");
}
else
{
    Console.WriteLine("转换失败，返回null");
}

// 使用is运算符检查类型
if (list[0] is int)
{
    int intValue = (int)list[0];
    Console.WriteLine($"是int类型: {intValue}");
}
```

### ArrayList的实际应用示例

```csharp
using System;
using System.Collections;

class ArrayListExamples
{
    // 存储混合类型的数据
    public static void MixedTypeExample()
    {
        ArrayList mixedList = new ArrayList();
        mixedList.Add(100);           // int
        mixedList.Add("Hello");      // string
        mixedList.Add(3.14);         // double
        mixedList.Add(true);         // bool
        mixedList.Add(DateTime.Now);  // DateTime
        
        Console.WriteLine("混合类型列表:");
        foreach (var item in mixedList)
        {
            Console.WriteLine($"类型: {item.GetType().Name}, 值: {item}");
        }
    }
    
    // 动态添加和删除元素
    public static void DynamicOperations()
    {
        ArrayList list = new ArrayList();
        
        // 动态添加
        for (int i = 0; i < 10; i++)
        {
            list.Add(i * i);
        }
        
        Console.WriteLine($"添加后元素数: {list.Count}");
        
        // 动态删除
        while (list.Count > 5)
        {
            list.RemoveAt(list.Count - 1);
        }
        
        Console.WriteLine($"删除后元素数: {list.Count}");
        Console.WriteLine($"剩余元素: [{string.Join(", ", list.ToArray())}]");
    }
    
    // 查找和过滤
    public static void FindAndFilter()
    {
        ArrayList numbers = new ArrayList { 10, 20, 30, 40, 50, 20, 30 };
        
        // 查找所有20的索引
        ArrayList indices = new ArrayList();
        int index = -1;
        while ((index = numbers.IndexOf(20, index + 1)) != -1)
        {
            indices.Add(index);
        }
        
        Console.WriteLine($"元素20出现的索引: [{string.Join(", ", indices.ToArray())}]");
        
        // 过滤大于30的元素
        ArrayList filtered = new ArrayList();
        foreach (int num in numbers)
        {
            if (num > 30)
            {
                filtered.Add(num);
            }
        }
        
        Console.WriteLine($"大于30的元素: [{string.Join(", ", filtered.ToArray())}]");
    }
    
    // 排序和搜索
    public static void SortAndSearch()
    {
        ArrayList numbers = new ArrayList { 50, 20, 30, 10, 40 };
        
        // 排序
        numbers.Sort();
        Console.WriteLine($"排序后: [{string.Join(", ", numbers.ToArray())}]");
        
        // 二分查找
        int searchValue = 30;
        int index = numbers.BinarySearch(searchValue);
        if (index >= 0)
        {
            Console.WriteLine($"找到 {searchValue}，索引: {index}");
        }
        else
        {
            Console.WriteLine($"未找到 {searchValue}");
        }
    }
    
    // 合并两个ArrayList
    public static ArrayList Merge(ArrayList list1, ArrayList list2)
    {
        ArrayList merged = new ArrayList(list1);
        merged.AddRange(list2);
        return merged;
    }
    
    static void Main()
    {
        Console.WriteLine("=== 混合类型示例 ===");
        MixedTypeExample();
        
        Console.WriteLine("\n=== 动态操作示例 ===");
        DynamicOperations();
        
        Console.WriteLine("\n=== 查找和过滤示例 ===");
        FindAndFilter();
        
        Console.WriteLine("\n=== 排序和搜索示例 ===");
        SortAndSearch();
        
        Console.WriteLine("\n=== 合并示例 ===");
        ArrayList list1 = new ArrayList { 1, 2, 3 };
        ArrayList list2 = new ArrayList { 4, 5, 6 };
        ArrayList merged = Merge(list1, list2);
        Console.WriteLine($"合并结果: [{string.Join(", ", merged.ToArray())}]");
    }
}
```

### ArrayList vs List<T> 对比

| 特性 | ArrayList | List<T> |
|------|-----------|---------|
| 类型安全 | 否（存储object） | 是（存储指定类型T） |
| 装箱拆箱 | 值类型会装箱拆箱 | 无装箱拆箱 |
| 性能 | 较慢（装箱拆箱开销） | 较快 |
| 编译时类型检查 | 否 | 是 |
| 代码可读性 | 较差 | 较好 |
| 推荐使用 | 不推荐（遗留代码） | 推荐 |

### ArrayList使用注意事项

1. **类型安全问题**：
   - ArrayList存储的是object类型，需要类型转换
   - 类型转换错误只能在运行时发现
   - 建议使用List<T>获得编译时类型检查

2. **性能问题**：
   - 值类型会进行装箱，读取时需要拆箱
   - 装箱和拆箱会带来性能开销
   - 对于值类型，List<T>性能更好

3. **容量管理**：
   - ArrayList会自动扩容，但频繁扩容会影响性能
   - 如果知道大概容量，可以在创建时指定初始容量

4. **线程安全**：
   - ArrayList不是线程安全的
   - 多线程环境下需要使用同步机制或使用线程安全的集合

5. **排序限制**：
   - Sort方法要求元素实现IComparable接口
   - 混合类型无法排序

### ArrayList类常用属性和方法速查表

#### 常用属性

| 属性 | 类型 | 作用说明 |
|------|------|----------|
| Count | int | 获取ArrayList中实际包含的元素数量 |
| Capacity | int | 获取或设置ArrayList的容量（内部数组的大小）。容量总是大于或等于Count |
| IsFixedSize | bool | 获取一个值，该值指示ArrayList是否有固定大小。对于ArrayList，始终返回false |
| IsReadOnly | bool | 获取一个值，该值指示ArrayList是否为只读。对于ArrayList，始终返回false |
| IsSynchronized | bool | 获取一个值，该值指示对ArrayList的访问是否同步（线程安全）。对于ArrayList，始终返回false |
| SyncRoot | object | 获取可用于同步对ArrayList的访问的对象 |

#### 常用方法

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Add(object) | object value | int | 在ArrayList末尾添加元素，返回添加位置的索引 |
| AddRange(ICollection) | ICollection c | void | 将集合中的元素添加到ArrayList末尾 |
| Insert(int, object) | int index, object value | void | 在指定索引位置插入元素 |
| InsertRange(int, ICollection) | int index, ICollection c | void | 在指定索引位置插入集合中的元素 |
| Remove(object) | object obj | void | 删除首次出现的指定元素 |
| RemoveAt(int) | int index | void | 删除指定索引的元素 |
| RemoveRange(int, int) | int index, int count | void | 从指定索引开始删除指定数量的元素 |
| Clear() | 无 | void | 清空ArrayList中的所有元素 |
| Contains(object) | object item | bool | 检查ArrayList是否包含指定元素 |
| IndexOf(object) | object value | int | 查找元素首次出现的索引，未找到返回-1 |
| IndexOf(object, int) | object value, int startIndex | int | 从指定索引开始查找元素 |
| LastIndexOf(object) | object value | int | 查找元素最后出现的索引 |
| BinarySearch(object) | object value | int | 在已排序的ArrayList中使用二分查找，返回索引或负数 |
| Sort() | 无 | void | 对ArrayList进行排序（要求元素实现IComparable） |
| Sort(IComparer) | IComparer comparer | void | 使用指定的比较器对ArrayList进行排序 |
| Reverse() | 无 | void | 反转ArrayList中元素的顺序 |
| ToArray() | 无 | object[] | 将ArrayList转换为object数组 |
| CopyTo(Array) | Array array | void | 将ArrayList的元素复制到数组中 |
| CopyTo(Array, int) | Array array, int index | void | 从指定索引开始复制到数组 |
| GetRange(int, int) | int index, int count | ArrayList | 返回包含指定范围元素的新ArrayList |
| Clone() | 无 | object | 创建ArrayList的浅表副本 |
| TrimToSize() | 无 | void | 将容量设置为实际元素数量，释放多余内存 |

### 何时使用ArrayList？

虽然现在推荐使用List<T>，但在以下情况下可能仍需要使用ArrayList：

1. **遗留代码维护**：维护使用ArrayList的旧代码
2. **需要存储混合类型**：虽然不推荐，但如果确实需要存储不同类型且无法使用泛型
3. **学习目的**：理解集合的基本概念和C#的发展历程

### 迁移到List<T>的建议

如果现有代码使用ArrayList，建议迁移到List<T>：

```csharp
// 旧代码（使用ArrayList）
ArrayList oldList = new ArrayList();
oldList.Add(100);
oldList.Add(200);
int value = (int)oldList[0]; // 需要拆箱

// 新代码（使用List<T>）
List<int> newList = new List<int>();
newList.Add(100);
newList.Add(200);
int value2 = newList[0]; // 无拆箱，类型安全
```

通过了解ArrayList，可以更好地理解C#集合的发展历程，以及为什么泛型集合（如List<T>）是更好的选择。在实际开发中，应优先使用List<T>等泛型集合来获得更好的类型安全性和性能。

## <a id="list-class"></a>C# List类详解

List<T>是C#中最常用的泛型集合类，位于System.Collections.Generic命名空间中。它提供了类型安全的动态数组功能，是ArrayList的泛型替代品，也是现代C#开发中推荐使用的集合类型。

### List<T>的基本概念

List<T>是一个泛型动态数组，可以存储指定类型T的元素。与ArrayList相比，List<T>具有以下优势：

1. **类型安全**：编译时进行类型检查，避免运行时类型错误
2. **性能优异**：值类型无需装箱拆箱，性能更好
3. **代码清晰**：类型明确，代码更易读易维护
4. **IntelliSense支持**：IDE可以提供更好的代码提示

#### 为什么使用List<T>？

```csharp
// ArrayList的问题
ArrayList list1 = new ArrayList();
list1.Add(100);
list1.Add("Hello"); // 可以添加不同类型，但类型不安全
int value = (int)list1[0]; // 需要类型转换，可能出错

// List<T>的优势
List<int> list2 = new List<int>();
list2.Add(100);
// list2.Add("Hello"); // 编译错误，类型安全
int value2 = list2[0]; // 无需类型转换，直接使用
```

### List<T>的创建和初始化

```csharp
using System.Collections.Generic;

// 1. 使用默认构造函数创建空List
List<int> list1 = new List<int>();

// 2. 指定初始容量创建List（性能优化）
List<int> list2 = new List<int>(100); // 初始容量为100

// 3. 使用集合初始化器创建并初始化
List<int> list3 = new List<int> { 1, 2, 3, 4, 5 };
List<string> list4 = new List<string> { "Apple", "Banana", "Cherry" };

// 4. 从数组创建List
int[] array = { 1, 2, 3, 4, 5 };
List<int> list5 = new List<int>(array);

// 5. 从其他集合创建List
List<int> list6 = new List<int>(list3);

// 6. 使用var关键字（类型推断）
var list7 = new List<string> { "A", "B", "C" };

// 7. 使用AddRange方法初始化
List<int> list8 = new List<int>();
list8.AddRange(new int[] { 1, 2, 3, 4, 5 });

Console.WriteLine($"list3的元素数: {list3.Count}");
Console.WriteLine($"list4的元素数: {list4.Count}");
```

### List<T>的常用属性

```csharp
List<int> list = new List<int> { 1, 2, 3, 4, 5 };

// Count属性 - 获取List中实际包含的元素数量
Console.WriteLine($"元素数量: {list.Count}"); // 5

// Capacity属性 - 获取或设置List的容量（内部数组的大小）
Console.WriteLine($"当前容量: {list.Capacity}"); // 可能是8或更大

// 设置容量（如果知道大概数量，可以提前设置以提高性能）
list.Capacity = 20;
Console.WriteLine($"设置后的容量: {list.Capacity}"); // 20

// 注意：Capacity总是 >= Count
```

### List<T>的常用方法

#### 添加元素

```csharp
List<int> list = new List<int>();

// Add方法 - 在末尾添加单个元素
list.Add(10);
list.Add(20);
list.Add(30);

Console.WriteLine($"添加后元素数: {list.Count}"); // 输出: 添加后元素数: 3

// AddRange方法 - 添加多个元素（从集合）
list.AddRange(new int[] { 40, 50, 60 });
list.AddRange(new List<int> { 70, 80, 90 });

Console.WriteLine($"AddRange后元素数: {list.Count}"); // 输出: AddRange后元素数: 9

// Insert方法 - 在指定索引位置插入元素
list.Insert(0, 5); // 在索引0处插入5
list.Insert(2, 15); // 在索引2处插入15

// InsertRange方法 - 在指定位置插入多个元素
list.InsertRange(1, new int[] { 11, 12, 13 });

// 输出所有元素
Console.WriteLine($"列表内容: [{string.Join(", ", list)}]");
// 输出: 列表内容: [5, 11, 12, 13, 10, 15, 20, 30, 40, 50, 60, 70, 80, 90]
```

#### 访问和修改元素

```csharp
List<int> list = new List<int> { 10, 20, 30, 40, 50 };

// 通过索引访问元素（类型安全，无需转换）
int first = list[0]; // 10
int second = list[1]; // 20
Console.WriteLine($"第一个元素: {first}, 第二个元素: {second}"); // 输出: 第一个元素: 10, 第二个元素: 20

// 通过索引修改元素
list[0] = 100;
list[1] = 200;
Console.WriteLine($"修改后: [{string.Join(", ", list)}]"); // 输出: 修改后: [100, 200, 30, 40, 50]

// 遍历List - 使用for循环
for (int i = 0; i < list.Count; i++)
{
    Console.WriteLine($"索引 {i}: {list[i]}");
}
// 输出:
// 索引 0: 100
// 索引 1: 200
// 索引 2: 30
// 索引 3: 40
// 索引 4: 50

// 遍历List - 使用foreach（推荐）
foreach (int item in list)
{
    Console.WriteLine($"元素: {item}");
}
// 输出:
// 元素: 100
// 元素: 200
// 元素: 30
// 元素: 40
// 元素: 50

// 遍历List - 使用LINQ
list.ForEach(item => Console.WriteLine($"LINQ遍历: {item}"));
// 输出:
// LINQ遍历: 100
// LINQ遍历: 200
// LINQ遍历: 30
// LINQ遍历: 40
// LINQ遍历: 50

// 获取最后一个元素
int last = list[list.Count - 1];
Console.WriteLine($"最后一个元素: {last}"); // 输出: 最后一个元素: 50

// 获取第一个元素
int first2 = list[0];
Console.WriteLine($"第一个元素: {first2}"); // 输出: 第一个元素: 100
```

#### 查找元素

```csharp
List<int> list = new List<int> { 10, 20, 30, 20, 40, 20 };

// IndexOf方法 - 查找元素首次出现的索引
int index1 = list.IndexOf(20); // 返回1
int index2 = list.IndexOf(100); // 返回-1（未找到）
Console.WriteLine($"IndexOf(20): {index1}"); // 输出: IndexOf(20): 1
Console.WriteLine($"IndexOf(100): {index2}"); // 输出: IndexOf(100): -1

// IndexOf重载 - 从指定位置开始查找
int index3 = list.IndexOf(20, 2); // 从索引2开始查找，返回3
Console.WriteLine($"IndexOf(20, 2): {index3}"); // 输出: IndexOf(20, 2): 3

// LastIndexOf方法 - 查找元素最后出现的索引
int lastIndex = list.LastIndexOf(20); // 返回5
Console.WriteLine($"LastIndexOf(20): {lastIndex}"); // 输出: LastIndexOf(20): 5

// Contains方法 - 检查是否包含指定元素
bool contains = list.Contains(30); // true
bool notContains = list.Contains(100); // false
Console.WriteLine($"Contains(30): {contains}"); // 输出: Contains(30): True
Console.WriteLine($"Contains(100): {notContains}"); // 输出: Contains(100): False

// Find方法 - 查找第一个满足条件的元素
int found = list.Find(x => x > 25); // 返回30（第一个大于25的元素）
Console.WriteLine($"Find(>25): {found}"); // 输出: Find(>25): 30

// FindLast方法 - 查找最后一个满足条件的元素
int foundLast = list.FindLast(x => x > 25); // 返回40
Console.WriteLine($"FindLast(>25): {foundLast}"); // 输出: FindLast(>25): 40

// FindAll方法 - 查找所有满足条件的元素
List<int> foundAll = list.FindAll(x => x > 25); // 返回[30, 40]
Console.WriteLine($"FindAll(>25): [{string.Join(", ", foundAll)}]"); // 输出: FindAll(>25): [30, 40]

// FindIndex方法 - 查找第一个满足条件的元素的索引
int foundIndex = list.FindIndex(x => x > 25); // 返回2
Console.WriteLine($"FindIndex(>25): {foundIndex}"); // 输出: FindIndex(>25): 2

// FindLastIndex方法 - 查找最后一个满足条件的元素的索引
int foundLastIndex = list.FindLastIndex(x => x > 25); // 返回4
Console.WriteLine($"FindLastIndex(>25): {foundLastIndex}"); // 输出: FindLastIndex(>25): 4

// Exists方法 - 检查是否存在满足条件的元素
bool exists = list.Exists(x => x > 50); // false
Console.WriteLine($"Exists(>50): {exists}"); // 输出: Exists(>50): False
```

#### 删除元素

```csharp
List<int> list = new List<int> { 10, 20, 30, 40, 50, 20 };

// Remove方法 - 删除首次出现的指定元素
bool removed = list.Remove(20); // 返回true，删除第一个20
Console.WriteLine($"Remove后: [{string.Join(", ", list)}]");

// RemoveAt方法 - 删除指定索引的元素
list.RemoveAt(0); // 删除索引0的元素
Console.WriteLine($"RemoveAt后: [{string.Join(", ", list)}]");

// RemoveRange方法 - 删除指定范围的元素
List<int> list2 = new List<int> { 10, 20, 30, 40, 50 };
list2.RemoveRange(1, 2); // 从索引1开始删除2个元素
Console.WriteLine($"RemoveRange后: [{string.Join(", ", list2)}]");

// RemoveAll方法 - 删除所有满足条件的元素
List<int> list3 = new List<int> { 10, 20, 30, 40, 50 };
int removedCount = list3.RemoveAll(x => x > 25); // 删除所有大于25的元素
Console.WriteLine($"RemoveAll删除了{removedCount}个元素: [{string.Join(", ", list3)}]");

// Clear方法 - 清空所有元素
list3.Clear();
Console.WriteLine($"Clear后元素数: {list3.Count}"); // 0
```

#### 排序和反转

```csharp
List<int> list = new List<int> { 50, 20, 30, 10, 40 };

// Sort方法 - 对List进行排序（升序）
Console.WriteLine($"排序前: [{string.Join(", ", list)}]");
list.Sort();
Console.WriteLine($"排序后: [{string.Join(", ", list)}]");

// Sort重载 - 使用自定义比较器排序（降序）
list.Sort((x, y) => y.CompareTo(x)); // 降序排序
Console.WriteLine($"降序排序: [{string.Join(", ", list)}]");

// Sort重载 - 使用Comparison委托
list.Sort(CompareNumbers);
Console.WriteLine($"自定义排序: [{string.Join(", ", list)}]");

// Reverse方法 - 反转List中元素的顺序
List<int> list2 = new List<int> { 1, 2, 3, 4, 5 };
list2.Reverse();
Console.WriteLine($"反转后: [{string.Join(", ", list2)}]");

// 字符串列表排序
List<string> names = new List<string> { "张三", "李四", "王五", "赵六" };
names.Sort();
Console.WriteLine($"字符串排序: [{string.Join(", ", names)}]");

// 自定义对象排序
List<Person> people = new List<Person>
{
    new Person { Name = "张三", Age = 25 },
    new Person { Name = "李四", Age = 30 },
    new Person { Name = "王五", Age = 20 }
};

people.Sort((p1, p2) => p1.Age.CompareTo(p2.Age)); // 按年龄排序
Console.WriteLine("按年龄排序:");
foreach (var person in people)
{
    Console.WriteLine($"  {person.Name}: {person.Age}岁");
}
// 输出:
// 按年龄排序:
//   王五: 20岁
//   张三: 25岁
//   李四: 30岁

// 辅助方法
static int CompareNumbers(int x, int y)
{
    return x.CompareTo(y);
}
```

#### 转换和复制

```csharp
List<int> list = new List<int> { 10, 20, 30, 40, 50 };

// ToArray方法 - 将List转换为数组
int[] array = list.ToArray();
Console.WriteLine($"转换为数组: [{string.Join(", ", array)}]");
// 输出: 转换为数组: [10, 20, 30, 40, 50]

// CopyTo方法 - 复制到数组
int[] targetArray = new int[list.Count];
list.CopyTo(targetArray);
Console.WriteLine($"复制到数组: [{string.Join(", ", targetArray)}]");
// 输出: 复制到数组: [10, 20, 30, 40, 50]

// CopyTo重载 - 从指定索引开始复制
int[] targetArray2 = new int[10];
list.CopyTo(targetArray2, 2); // 从索引2开始复制
Console.WriteLine($"从索引2复制: [{string.Join(", ", targetArray2)}]");
// 输出: 从索引2复制: [0, 0, 10, 20, 30, 40, 50, 0, 0, 0]

// GetRange方法 - 获取指定范围的元素（返回新的List）
List<int> range = list.GetRange(1, 3); // 从索引1开始，获取3个元素
Console.WriteLine($"范围元素: [{string.Join(", ", range)}]");
// 输出: 范围元素: [20, 30, 40]

// ConvertAll方法 - 将List中的元素转换为另一种类型
List<string> stringList = list.ConvertAll(x => x.ToString());
Console.WriteLine($"转换为字符串: [{string.Join(", ", stringList)}]");
// 输出: 转换为字符串: [10, 20, 30, 40, 50]

// 使用LINQ进行转换
List<double> doubleList = list.Select(x => (double)x).ToList();
Console.WriteLine($"转换为double: [{string.Join(", ", doubleList)}]");
// 输出: 转换为double: [10, 20, 30, 40, 50]
```

### List<T>与LINQ

List<T>与LINQ完美集成，提供了强大的查询和操作能力：

```csharp
List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

// Where - 过滤元素
List<int> evens = numbers.Where(x => x % 2 == 0).ToList();
Console.WriteLine($"偶数: [{string.Join(", ", evens)}]");

// Select - 投影转换
List<string> strings = numbers.Select(x => $"数字{x}").ToList();
Console.WriteLine($"转换后: [{string.Join(", ", strings)}]");

// OrderBy / OrderByDescending - 排序
List<int> sorted = numbers.OrderByDescending(x => x).ToList();
Console.WriteLine($"降序: [{string.Join(", ", sorted)}]");

// First / Last - 获取第一个/最后一个元素
int first = numbers.First();
int last = numbers.Last();
int firstEven = numbers.First(x => x % 2 == 0);
Console.WriteLine($"第一个元素: {first}, 最后一个元素: {last}, 第一个偶数: {firstEven}");
// 输出: 第一个元素: 1, 最后一个元素: 10, 第一个偶数: 2

// Any / All - 检查条件
bool hasEven = numbers.Any(x => x % 2 == 0); // true
bool allPositive = numbers.All(x => x > 0); // true
Console.WriteLine($"是否有偶数: {hasEven}, 是否都为正数: {allPositive}");
// 输出: 是否有偶数: True, 是否都为正数: True

// Count - 计数
int evenCount = numbers.Count(x => x % 2 == 0); // 5
Console.WriteLine($"偶数个数: {evenCount}"); // 输出: 偶数个数: 5

// Sum / Average / Max / Min - 聚合操作
int sum = numbers.Sum(); // 55
double average = numbers.Average(); // 5.5
int max = numbers.Max(); // 10
int min = numbers.Min(); // 1
Console.WriteLine($"总和: {sum}, 平均值: {average}, 最大值: {max}, 最小值: {min}");
// 输出: 总和: 55, 平均值: 5.5, 最大值: 10, 最小值: 1

// Distinct - 去重
List<int> withDuplicates = new List<int> { 1, 2, 2, 3, 3, 3, 4 };
List<int> distinct = withDuplicates.Distinct().ToList();
Console.WriteLine($"去重后: [{string.Join(", ", distinct)}]");

// GroupBy - 分组
var grouped = numbers.GroupBy(x => x % 2 == 0 ? "偶数" : "奇数");
foreach (var group in grouped)
{
    Console.WriteLine($"{group.Key}: [{string.Join(", ", group)}]");
}
```

### List<T>的实际应用示例

```csharp
using System;
using System.Collections.Generic;
using System.Linq;

class ListExamples
{
    // 学生成绩管理
    public static void StudentGradeExample()
    {
        List<Student> students = new List<Student>
        {
            new Student { Name = "张三", Score = 85 },
            new Student { Name = "李四", Score = 92 },
            new Student { Name = "王五", Score = 78 },
            new Student { Name = "赵六", Score = 96 },
            new Student { Name = "孙七", Score = 88 }
        };
        
        // 按分数排序
        students.Sort((s1, s2) => s2.Score.CompareTo(s1.Score));
        
        Console.WriteLine("学生成绩排名:");
        for (int i = 0; i < students.Count; i++)
        {
            Console.WriteLine($"{i + 1}. {students[i].Name}: {students[i].Score}分");
        }
        
        // 计算平均分
        double average = students.Average(s => s.Score);
        Console.WriteLine($"平均分: {average:F2}");
        
        // 查找高分学生（>=90）
        List<Student> highScorers = students.Where(s => s.Score >= 90).ToList();
        Console.WriteLine($"高分学生: {string.Join(", ", highScorers.Select(s => s.Name))}");
    }
    
    // 分页功能
    public static List<T> GetPage<T>(List<T> list, int pageNumber, int pageSize)
    {
        int skip = (pageNumber - 1) * pageSize;
        return list.Skip(skip).Take(pageSize).ToList();
    }
    
    // 去重并保持顺序
    public static List<T> RemoveDuplicates<T>(List<T> list)
    {
        return list.Distinct().ToList();
    }
    
    // 合并两个List
    public static List<T> Merge<T>(List<T> list1, List<T> list2)
    {
        List<T> merged = new List<T>(list1);
        merged.AddRange(list2);
        return merged;
    }
    
    // 查找和替换
    public static void FindAndReplace<T>(List<T> list, T oldValue, T newValue)
    {
        int index = list.IndexOf(oldValue);
        while (index != -1)
        {
            list[index] = newValue;
            index = list.IndexOf(oldValue, index + 1);
        }
    }
    
    // 批量操作
    public static void BatchProcess(List<int> numbers)
    {
        // 过滤、转换、聚合
        var result = numbers
            .Where(x => x > 0)
            .Select(x => x * 2)
            .Where(x => x > 10)
            .OrderByDescending(x => x)
            .ToList();
        
        Console.WriteLine($"处理结果: [{string.Join(", ", result)}]");
    }
    
    static void Main()
    {
        Console.WriteLine("=== 学生成绩示例 ===");
        StudentGradeExample();
        
        Console.WriteLine("\n=== 分页示例 ===");
        List<int> numbers = Enumerable.Range(1, 20).ToList();
        List<int> page1 = GetPage(numbers, 1, 5);
        Console.WriteLine($"第1页: [{string.Join(", ", page1)}]");
        
        Console.WriteLine("\n=== 去重示例 ===");
        List<int> withDupes = new List<int> { 1, 2, 2, 3, 3, 3, 4 };
        List<int> unique = RemoveDuplicates(withDupes);
        Console.WriteLine($"去重后: [{string.Join(", ", unique)}]");
        
        Console.WriteLine("\n=== 批量处理示例 ===");
        List<int> data = new List<int> { -5, 2, 8, 15, 3, 20, -10 };
        BatchProcess(data);
    }
}

// 辅助类
class Student
{
    public string Name { get; set; }
    public int Score { get; set; }
}
```

### List<T>的性能优化

```csharp
// 1. 指定初始容量（如果知道大概数量）
List<int> list1 = new List<int>(1000); // 避免频繁扩容

// 2. 使用Capacity属性优化
List<int> list2 = new List<int>();
list2.Capacity = 1000; // 提前设置容量

// 3. 使用TrimExcess方法释放多余内存
List<int> list3 = new List<int>(1000);
// ... 添加元素
list3.TrimExcess(); // 将容量减少到实际元素数量

// 4. 批量操作优于逐个操作
// 不推荐
List<int> list4 = new List<int>();
for (int i = 0; i < 1000; i++)
{
    list4.Add(i); // 可能多次扩容
}

// 推荐
List<int> list5 = new List<int>(1000);
for (int i = 0; i < 1000; i++)
{
    list5.Add(i); // 只需一次分配
}

// 或者使用AddRange
List<int> list6 = new List<int>();
list6.AddRange(Enumerable.Range(0, 1000));
```

### List<T>使用注意事项

1. **类型安全**：
   - List<T>是类型安全的，编译时检查类型
   - 不能添加不兼容类型的元素

2. **性能考虑**：
   - 如果知道大概容量，指定初始容量可以提高性能
   - 频繁插入/删除中间元素时，考虑使用LinkedList<T>
   - 只读场景考虑使用IReadOnlyList<T>

3. **线程安全**：
   - List<T>不是线程安全的
   - 多线程环境下需要使用锁或线程安全的集合

4. **空值处理**：
   - 对于引用类型T，可以存储null
   - 对于值类型T，不能存储null（除非使用Nullable<T>）

5. **容量管理**：
   - Capacity会自动增长，但频繁扩容会影响性能
   - 使用TrimExcess可以释放多余内存

### List<T>类常用属性和方法速查表

#### 常用属性

| 属性 | 类型 | 作用说明 |
|------|------|----------|
| Count | int | 获取List中实际包含的元素数量 |
| Capacity | int | 获取或设置List的容量（内部数组的大小）。容量总是大于或等于Count |
| Item[int] | T | 获取或设置指定索引处的元素。这是索引器，可以通过list[index]访问 |

#### 常用方法

| 方法 | 参数 | 返回值 | 作用说明 |
|------|------|--------|----------|
| Add(T) | T item | void | 在List末尾添加元素 |
| AddRange(IEnumerable<T>) | IEnumerable<T> collection | void | 将集合中的元素添加到List末尾 |
| Insert(int, T) | int index, T item | void | 在指定索引位置插入元素 |
| InsertRange(int, IEnumerable<T>) | int index, IEnumerable<T> collection | void | 在指定索引位置插入集合中的元素 |
| Remove(T) | T item | bool | 删除首次出现的指定元素，返回是否成功 |
| RemoveAt(int) | int index | void | 删除指定索引的元素 |
| RemoveRange(int, int) | int index, int count | void | 从指定索引开始删除指定数量的元素 |
| RemoveAll(Predicate<T>) | Predicate<T> match | int | 删除所有满足条件的元素，返回删除的数量 |
| Clear() | 无 | void | 清空List中的所有元素 |
| Contains(T) | T item | bool | 检查List是否包含指定元素 |
| IndexOf(T) | T item | int | 查找元素首次出现的索引，未找到返回-1 |
| IndexOf(T, int) | T item, int index | int | 从指定索引开始查找元素 |
| LastIndexOf(T) | T item | int | 查找元素最后出现的索引 |
| BinarySearch(T) | T item | int | 在已排序的List中使用二分查找 |
| Sort() | 无 | void | 对List进行排序（要求T实现IComparable） |
| Sort(Comparison<T>) | Comparison<T> comparison | void | 使用指定的比较委托对List进行排序 |
| Sort(IComparer<T>) | IComparer<T> comparer | void | 使用指定的比较器对List进行排序 |
| Reverse() | 无 | void | 反转List中元素的顺序 |
| ToArray() | 无 | T[] | 将List转换为数组 |
| CopyTo(T[]) | T[] array | void | 将List的元素复制到数组中 |
| CopyTo(T[], int) | T[] array, int arrayIndex | void | 从指定索引开始复制到数组 |
| GetRange(int, int) | int index, int count | List<T> | 返回包含指定范围元素的新List |
| Find(Predicate<T>) | Predicate<T> match | T | 查找第一个满足条件的元素 |
| FindLast(Predicate<T>) | Predicate<T> match | T | 查找最后一个满足条件的元素 |
| FindAll(Predicate<T>) | Predicate<T> match | List<T> | 查找所有满足条件的元素 |
| FindIndex(Predicate<T>) | Predicate<T> match | int | 查找第一个满足条件的元素的索引 |
| FindLastIndex(Predicate<T>) | Predicate<T> match | int | 查找最后一个满足条件的元素的索引 |
| Exists(Predicate<T>) | Predicate<T> match | bool | 检查是否存在满足条件的元素 |
| TrueForAll(Predicate<T>) | Predicate<T> match | bool | 检查是否所有元素都满足条件 |
| ForEach(Action<T>) | Action<T> action | void | 对每个元素执行指定操作 |
| ConvertAll<TOutput>(Converter<T, TOutput>) | Converter<T, TOutput> converter | List<TOutput> | 将List中的元素转换为另一种类型 |
| TrimExcess() | 无 | void | 将容量减少到实际元素数量（如果容量大于Count的90%） |

### List<T>与其他集合类的选择

| 场景 | 推荐集合 | 说明 |
|------|---------|------|
| 动态数组，频繁随机访问 | List<T> | 最常用 |
| 频繁在开头/中间插入删除 | LinkedList<T> | 链表结构 |
| 需要唯一元素 | HashSet<T> | 哈希集合 |
| 需要排序且唯一 | SortedSet<T> | 有序集合 |
| 键值对存储 | Dictionary<TKey, TValue> | 字典 |
| 先进先出 | Queue<T> | 队列 |
| 后进先出 | Stack<T> | 栈 |
| 只读访问 | IReadOnlyList<T> | 只读列表 |

List<T>是C#开发中最重要和最常用的集合类之一。通过熟练掌握List<T>的各种方法和特性，可以高效地处理各种数据集合操作，编写出类型安全、性能优异的C#代码。
