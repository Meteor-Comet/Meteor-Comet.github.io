---
layout: post
title: "C#基础语法详解"
subtitle: "C#基础语法详解"
date: 2025-11-19 12:00:00
author: "Comet"
catalog: true
tags:
    - C#
    - 基础语法
---
# C#核心基础语法详解

## C#简介：能做什么，解决什么问题？

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

## C#数据类型详解

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

## C#类型转换详解

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

## C#运算符详解

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

## C#分支语句详解

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

## C#函数详解

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

### 函数参数

#### 1. 值参数

值参数是默认的参数传递方式，函数接收的是实际参数值的副本。

```csharp
public void ModifyValue(int number)
{
    number = 100; // 这个修改不会影响调用方的变量
    Console.WriteLine($"函数内部: number = {number}");
}

// 调用示例
int value = 50;
ModifyValue(value);
Console.WriteLine($"函数外部: value = {value}"); // 仍然是50
```

#### 2. 引用参数（ref）

使用ref关键字可以按引用传递参数，函数可以直接修改调用方的变量。

```csharp
public void ModifyRefValue(ref int number)
{
    number = 100; // 这个修改会影响调用方的变量
    Console.WriteLine($"函数内部: number = {number}");
}

// 调用示例
int value = 50;
ModifyRefValue(ref value);
Console.WriteLine($"函数外部: value = {value}"); // 现在是100
```

#### 3. 输出参数（out）

使用out关键字可以在函数中为参数赋值，并将值返回给调用方。

```csharp
public void Calculate(int a, int b, out int sum, out int product)
{
    sum = a + b;
    product = a * b;
}

// 调用示例
int x = 5, y = 3;
Calculate(x, y, out int sum, out int product);
Console.WriteLine($"和: {sum}, 积: {product}");
```

#### 4. 参数数组（params）

使用params关键字可以传递可变数量的参数。

```csharp
public int Sum(params int[] numbers)
{
    int total = 0;
    foreach (int number in numbers)
    {
        total += number;
    }
    return total;
}

// 调用示例
int result1 = Sum(1, 2, 3);           // 6
int result2 = Sum(1, 2, 3, 4, 5);     // 15
int result3 = Sum(new int[] {1, 2, 3, 4, 5, 6}); // 21
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
CreateUser(email: "lisi@example.com", name: "李四", age: 30);
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

// Lambda表达式用于集合操作
List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };
List<int> evenNumbers = numbers.Where(n => n % 2 == 0).ToList(); // [2, 4]
int sum = numbers.Sum(n => n); // 15
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