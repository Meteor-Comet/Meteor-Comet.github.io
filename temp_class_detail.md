# C#类详解（进阶篇）

## 1. 类的定义与基本结构

C#中的类是引用类型，是面向对象编程的基本构建块。类定义了对象的数据结构和行为。

```csharp
[访问修饰符] [修饰符] class 类名 [: 父类, 接口1, 接口2...]
{
    // 成员定义
}
```

### 1.1 类的访问修饰符

| 访问修饰符 | 可见范围 | 适用场景 |
|------------|----------|----------|
| `public` | 任何位置均可访问 | 公共接口、API类 |
| `internal` | 当前程序集内可访问 | 内部工具类、组件间通信 |
| `protected` | 类内部和派生类中可访问 | 需被子类继承的基类 |
| `private` | 仅类内部可访问 | 类的私有实现细节 |
| `protected internal` | 程序集内或派生类中可访问 | 程序集内的继承体系 |
| `private protected` | 同一程序集中的派生类可访问 | 严格控制的继承层次 |

### 1.2 类的修饰符

- `abstract`: 抽象类，不能实例化，可包含抽象成员
- `sealed`: 密封类，不能被继承
- `static`: 静态类，不能实例化，所有成员必须是静态的
- `partial`: 分部类，可以将类定义分散到多个文件中
- `unsafe`: 不安全代码类，允许使用指针

## 2. 构造函数详解

构造函数是创建对象时自动调用的特殊方法，用于初始化对象状态。

### 2.1 构造函数类型

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
    
    // 默认构造函数
    public Person()
    {
        Name = "Unknown";
        Age = 0;
    }
    
    // 参数化构造函数
    public Person(string name, int age)
    {
        Name = name;
        Age = age;
    }
    
    // 带可选参数的构造函数
    public Person(string name, int age, string email = null)
    {
        Name = name;
        Age = age;
        Email = email;
    }
    
    // 静态构造函数
    static Person()
    {
        // 初始化静态成员，只执行一次
    }
}
```

### 2.2 构造函数链

使用`this`关键字链接同一类的构造函数：

```csharp
public class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }
    
    public Person() : this("Unknown")
    {
    }
    
    public Person(string name) : this(name, 0)
    {
    }
    
    public Person(string name, int age) : this(name, age, null)
    {
    }
    
    public Person(string name, int age, string email)
    {
        Name = name;
        Age = age;
        Email = email;
    }
}
```

### 2.3 继承中的构造函数

使用`base`关键字调用父类构造函数：

```csharp
public class Employee : Person
{
    public string Department { get; set; }
    public decimal Salary { get; set; }
    
    public Employee(string name, int age, string department) : base(name, age)
    {
        Department = department;
    }
    
    public Employee(string name, int age, string email, string department, decimal salary)
        : base(name, age, email)
    {
        Department = department;
        Salary = salary;
    }
}
```

## 3. 成员函数深度解析

### 3.1 方法签名与重载

方法签名由方法名、参数类型和参数数量组成，不包括返回类型和参数名：

```csharp
public class Calculator
{
    // 重载示例
    public int Add(int a, int b) => a + b;
    public double Add(double a, double b) => a + b;
    public int Add(int a, int b, int c) => a + b + c;
    
    // 参数数组（可变参数）
    public int Sum(params int[] numbers)
    {
        int total = 0;
        foreach (var num in numbers)
        {
            total += num;
        }
        return total;
    }
}
```

### 3.2 值参数、引用参数与输出参数

```csharp
public class ParameterDemo
{
    // 值参数 - 传递副本
    public void ModifyValue(int value)
    {
        value = value * 2;
    }
    
    // 引用参数 - 使用ref关键字，传递引用
    public void ModifyRef(ref int value)
    {
        value = value * 2;
    }
    
    // 输出参数 - 使用out关键字，必须在方法中赋值
    public bool TryParse(string input, out int result)
    {
        return int.TryParse(input, out result);
    }
    
    // 输入参数 - 使用in关键字，防止修改
    public void ProcessReadOnly(in int value)
    {
        // value = 10; // 错误：无法修改in参数
    }
}
```

## 4. 属性深入理解

### 4.1 属性类型详解

```csharp
public class PropertyDemo
{
    // 私有字段
    private string _name;
    private int _age = 18; // 默认值
    private static string _companyName = "XYZ Corp";
    
    // 完整属性（带字段）
    public string Name
    {
        get { return _name; }
        set 
        { 
            if (string.IsNullOrWhiteSpace(value))
                throw new ArgumentException("Name cannot be null or empty");
            _name = value; 
        }
    }
    
    // 自动属性
    public int Age { get; set; }
    
    // 只读属性（只有getter）
    public string ReadOnlyProperty { get; }
    
    // 只写属性（只有setter）
    public string WriteOnlyProperty { private get; set; }
    
    // 静态属性
    public static string CompanyName
    {
        get { return _companyName; }
        set { _companyName = value; }
    }
    
    // 计算属性
    public string FullName => $"{_name} from {_companyName}";
    
    // 延迟加载属性
    private Lazy<string> _lazyData = new Lazy<string>(() => LoadExpensiveData());
    public string LazyData => _lazyData.Value;
    
    private static string LoadExpensiveData()
    {
        // 模拟耗时操作
        Thread.Sleep(1000);
        return "Expensive data loaded";
    }
}
```

### 4.2 属性访问器修饰符

```csharp
public class AccessorDemo
{
    // getter和setter不同访问级别
    public string PublicName { get; private set; }
    public int ProtectedAge { get; protected set; }
    
    // 内部设置，公共获取
    public string InternalSetter { get; internal set; }
    
    // 构造函数中设置私有setter的属性
    public AccessorDemo(string name)
    {
        PublicName = name;
    }
}
```

## 5. 索引器（Indexers）

索引器允许类或结构的实例通过类似数组的语法进行访问。

### 5.1 基本索引器

```csharp
public class StringCollection
{
    private List<string> _items = new List<string>();
    
    // 基本索引器
    public string this[int index]
    {
        get
        {
            if (index < 0 || index >= _items.Count)
                throw new IndexOutOfRangeException();
            return _items[index];
        }
        set
        {
            if (index < 0 || index >= _items.Count)
                throw new IndexOutOfRangeException();
            _items[index] = value;
        }
    }
    
    public void Add(string item)
    {
        _items.Add(item);
    }
    
    public int Count => _items.Count;
}
```

### 5.2 多参数索引器

```csharp
public class Matrix
{
    private double[,] _data;
    
    public Matrix(int rows, int cols)
    {
        _data = new double[rows, cols];
    }
    
    // 多参数索引器
    public double this[int row, int col]
    {
        get => _data[row, col];
        set => _data[row, col] = value;
    }
}
```

### 5.3 字符串索引器

```csharp
public class Configuration
{
    private Dictionary<string, string> _settings = new Dictionary<string, string>();
    
    // 字符串索引器
    public string this[string key]
    {
        get
        {
            return _settings.TryGetValue(key, out string value) ? value : null;
        }
        set
        {
            _settings[key] = value;
        }
    }
}
```

## 6. 事件与委托

### 6.1 委托基础

委托是引用类型，类似函数指针，用于封装方法：

```csharp
// 委托声明
public delegate void MessageHandler(string message);
public delegate int Calculator(int a, int b);

public class DelegateDemo
{
    public void Run()
    {
        // 实例化委托
        MessageHandler handler1 = ShowMessage;
        handler1("Hello from delegate");
        
        // 多播委托
        MessageHandler handler2 = ShowMessage;
        handler2 += LogMessage;
        handler2("Multiple handlers");
        
        // 匿名方法
        Calculator add = delegate(int x, int y) { return x + y; };
        
        // Lambda表达式
        Calculator multiply = (x, y) => x * y;
        
        Console.WriteLine($"Add: {add(5, 3)}");
        Console.WriteLine($"Multiply: {multiply(5, 3)}");
    }
    
    private void ShowMessage(string msg)
    {
        Console.WriteLine($"Show: {msg}");
    }
    
    private void LogMessage(string msg)
    {
        Console.WriteLine($"Log: {msg}");
    }
}
```

### 6.2 事件实现

```csharp
public class EventPublisher
{
    // 使用EventHandler泛型委托
    public event EventHandler<DataChangedEventArgs> DataChanged;
    
    // 自定义事件参数
    public class DataChangedEventArgs : EventArgs
    {
        public string OldValue { get; }
        public string NewValue { get; }
        public DateTime Timestamp { get; }
        
        public DataChangedEventArgs(string oldValue, string newValue)
        {
            OldValue = oldValue;
            NewValue = newValue;
            Timestamp = DateTime.Now;
        }
    }
    
    private string _data;
    
    public string Data
    {
        get => _data;
        set
        {
            if (_data != value)
            {
                string oldValue = _data;
                _data = value;
                // 触发事件
                OnDataChanged(new DataChangedEventArgs(oldValue, value));
            }
        }
    }
    
    // 事件触发方法（通常protected virtual）
    protected virtual void OnDataChanged(DataChangedEventArgs e)
    {
        // 线程安全的事件触发
        DataChanged?.Invoke(this, e);
    }
}

// 事件订阅者
public class EventSubscriber
{
    private string _name;
    
    public EventSubscriber(string name, EventPublisher publisher)
    {
        _name = name;
        // 订阅事件
        publisher.DataChanged += Publisher_DataChanged;
    }
    
    private void Publisher_DataChanged(object sender, EventPublisher.DataChangedEventArgs e)
    {
        Console.WriteLine($"[{_name}] Data changed from '{e.OldValue}' to '{e.NewValue}' at {e.Timestamp}");
    }
    
    // 取消订阅
    public void Unsubscribe(EventPublisher publisher)
    {
        publisher.DataChanged -= Publisher_DataChanged;
    }
}
```

## 7. 静态类与静态成员

### 7.1 静态类的使用

```csharp
public static class StringExtensions
{
    // 静态字段
    public static readonly string DefaultSeparator = ", ";
    
    // 静态属性
    public static bool IsNullOrEmpty => string.IsNullOrEmpty(value);
    
    // 静态方法
    public static string Truncate(this string value, int maxLength)
    {
        if (string.IsNullOrEmpty(value))
            return value;
            
        return value.Length <= maxLength ? value : value.Substring(0, maxLength) + "...";
    }
    
    public static string Join<T>(IEnumerable<T> items, string separator = null)
    {
        separator ??= DefaultSeparator;
        return string.Join(separator, items);
    }
    
    // 静态构造函数
    static StringExtensions()
    {
        // 初始化静态成员
    }
}
```

### 7.2 静态类与单例模式

```csharp
// 单例模式实现
public sealed class Singleton
{
    // 私有构造函数
    private Singleton() { }
    
    // 懒加载单例
    private static readonly Lazy<Singleton> _instance = new Lazy<Singleton>(() => new Singleton());
    
    // 公共访问点
    public static Singleton Instance => _instance.Value;
    
    // 实例成员
    public void DoSomething() { }
}
```

## 8. 继承与多态高级特性

### 8.1 方法重写与隐藏

```csharp
public class Shape
{
    public virtual void Draw()
    {
        Console.WriteLine("Drawing a shape");
    }
    
    public void Identify()
    {
        Console.WriteLine("This is a shape");
    }
}

public class Circle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a circle");
    }
    
    // 隐藏基类方法（使用new关键字）
    public new void Identify()
    {
        Console.WriteLine("This is a circle");
    }
}
```

### 8.2 密封方法与类

```csharp
public class BaseClass
{
    public virtual void Method1() { }
    public virtual void Method2() { }
}

public class DerivedClass : BaseClass
{
    // 密封方法，防止进一步重写
    public sealed override void Method1() { }
    
    public override void Method2() { }
}

// 密封类，不能被继承
public sealed class FinalClass : DerivedClass
{
    // 可以重写Method2，因为它不是密封的
    public override void Method2() { }
    
    // 不能重写Method1，因为它被密封了
}
```

### 8.3 类型转换与is/as运算符

```csharp
public class TypeConversionDemo
{
    public void ProcessObject(object obj)
    {
        // is运算符 - 检查类型兼容性
        if (obj is string str)
        {
            Console.WriteLine($"String length: {str.Length}");
        }
        else if (obj is int number)
        {
            Console.WriteLine($"Number squared: {number * number}");
        }
        
        // as运算符 - 安全转换，失败返回null
        string text = obj as string;
        if (text != null)
        {
            Console.WriteLine($"Text: {text}");
        }
        
        // 显式类型转换（可能抛出异常）
        try
        {
            int num = (int)obj;
        }
        catch (InvalidCastException)
        {
            Console.WriteLine("Invalid cast");
        }
    }
}
```

## 9. 特殊类与结构体

### 9.1 分部类

分部类允许将一个类的定义分散到多个文件中：

```csharp
// 文件1: Person.cs
public partial class Person
{
    public string Name { get; set; }
    public int Age { get; set; }
    
    public void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name}, {Age} years old.");
    }
}

// 文件2: Person.Contact.cs
public partial class Person
{
    public string Email { get; set; }
    public string Phone { get; set; }
    
    public void Contact()
    {
        Console.WriteLine($"Email: {Email}, Phone: {Phone}");
    }
}
```

### 9.2 抽象类

抽象类不能实例化，用于定义接口和部分实现：

```csharp
public abstract class Document
{
    public string Title { get; set; }
    public DateTime CreatedDate { get; } = DateTime.Now;
    
    // 普通方法
    public void Save()
    {
        Console.WriteLine($"Saving document: {Title}");
    }
    
    // 抽象方法（必须在派生类中实现）
    public abstract void Print();
    
    // 抽象属性
    public abstract string Content { get; set; }
}

public class Report : Document
{
    public override string Content { get; set; }
    
    public override void Print()
    {
        Console.WriteLine($"Printing report: {Title}\n{Content}");
    }
}
```

## 10. 接口深度解析

### 10.1 接口定义与实现

```csharp
// 基本接口
public interface ILogger
{
    void Log(string message);
    void LogError(string message, Exception exception = null);
}

// 泛型接口
public interface IRepository<T> where T : class
{
    T GetById(int id);
    IEnumerable<T> GetAll();
    void Add(T entity);
    void Update(T entity);
    void Delete(int id);
}

// 接口继承
public interface IAdvancedLogger : ILogger
{
    void LogWarning(string message);
    void LogInfo(string message);
    void SetLogLevel(LogLevel level);
}

// 枚举用于接口参数
public enum LogLevel { Debug, Info, Warning, Error, Fatal }
```

### 10.2 接口实现示例

```csharp
// 文件日志实现
public class FileLogger : IAdvancedLogger
{
    private string _logFilePath;
    private LogLevel _currentLevel = LogLevel.Info;
    
    public FileLogger(string logFilePath)
    {
        _logFilePath = logFilePath;
    }
    
    public void Log(string message)
    {
        WriteToFile($"[LOG] {DateTime.Now}: {message}");
    }
    
    public void LogError(string message, Exception exception = null)
    {
        if (_currentLevel <= LogLevel.Error)
        {
            string errorMsg = exception != null ? 
                $"[ERROR] {DateTime.Now}: {message}\nException: {exception}" : 
                $"[ERROR] {DateTime.Now}: {message}";
            WriteToFile(errorMsg);
        }
    }
    
    public void LogWarning(string message)
    {
        if (_currentLevel <= LogLevel.Warning)
        {
            WriteToFile($"[WARNING] {DateTime.Now}: {message}");
        }
    }
    
    public void LogInfo(string message)
    {
        if (_currentLevel <= LogLevel.Info)
        {
            WriteToFile($"[INFO] {DateTime.Now}: {message}");
        }
    }
    
    public void SetLogLevel(LogLevel level)
    {
        _currentLevel = level;
    }
    
    private void WriteToFile(string message)
    {
        // 文件写入实现...
    }
}
```

## 11. 类的生命周期管理

### 11.1 构造函数与初始化顺序

C#对象创建过程的初始化顺序：

1. 静态字段初始化
2. 静态构造函数执行
3. 实例字段初始化
4. 基类实例构造函数执行（如有继承）
5. 派生类实例构造函数执行

```csharp
public class BaseClass
{
    // 静态字段
    public static int StaticBaseField = InitializeStaticField();
    
    // 实例字段
    public int InstanceBaseField = InitializeInstanceField();
    
    static BaseClass()
    {
        Console.WriteLine("BaseClass static constructor");
    }
    
    public BaseClass()
    {
        Console.WriteLine("BaseClass instance constructor");
    }
    
    private static int InitializeStaticField()
    {
        Console.WriteLine("Initializing BaseClass static field");
        return 10;
    }
    
    private int InitializeInstanceField()
    {
        Console.WriteLine("Initializing BaseClass instance field");
        return 20;
    }
}
```

### 11.2 析构函数与资源管理

```csharp
public class ResourceManager : IDisposable
{
    // 托管资源
    private StreamWriter _writer;
    
    // 非托管资源（示例）
    private bool _disposed = false;
    
    public ResourceManager(string filePath)
    {
        _writer = new StreamWriter(filePath);
    }
    
    // 使用资源
    public void WriteData(string data)
    {
        if (_disposed)
            throw new ObjectDisposedException("ResourceManager");
            
        _writer.WriteLine(data);
    }
    
    // 实现IDisposable接口
    public void Dispose()
    {
        Dispose(true);
        // 告诉垃圾回收器不要调用析构函数
        GC.SuppressFinalize(this);
    }
    
    // 受保护的Dispose方法
    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            // 释放托管资源
            if (disposing && _writer != null)
            {
                _writer.Dispose();
                _writer = null;
            }
            
            // 释放非托管资源
            // ...
            
            _disposed = true;
        }
    }
    
    // 析构函数（Finalizer）
    ~ResourceManager()
    {
        Dispose(false);
    }
}

// 使用using语句自动调用Dispose
public void UseResourceManager()
{
    using (var manager = new ResourceManager("data.txt"))
    {
        manager.WriteData("Some important data");
    } // 自动调用manager.Dispose()
}
```

## 12. 类设计最佳实践

### 12.1 设计原则

1. **单一职责原则**：一个类只负责一项功能
2. **开闭原则**：对扩展开放，对修改关闭
3. **里氏替换原则**：子类可以替换父类使用
4. **接口隔离原则**：客户端不应该依赖它不使用的接口
5. **依赖倒置原则**：依赖于抽象，不依赖于具体实现
6. **组合优于继承**：优先使用组合而非继承实现功能复用

### 12.2 编码规范

```csharp
// 类命名 - PascalCase
public class CustomerManager { }

// 接口命名 - I前缀 + PascalCase
public interface ILogger { }

// 字段命名 - 私有字段使用下划线前缀
private string _firstName;

// 常量命名 - 全大写，下划线分隔
public const int MAX_RETRY_COUNT = 3;

// 方法命名 - PascalCase，动词开头
public void CalculateTotal() { }

// 异步方法命名 - 后缀Async
public async Task<string> GetDataAsync() { }
```

### 12.3 常用模式实现

```csharp
// 工厂模式
public class LoggerFactory
{
    public static ILogger CreateLogger(string type)
    {
        switch (type.ToLower())
        {
            case "console":
                return new ConsoleLogger();
            case "file":
                return new FileLogger("app.log");
            case "null":
                return new NullLogger();
            default:
                throw new ArgumentException($"Unknown logger type: {type}");
        }
    }
}

// 观察者模式（使用事件实现）
public class Subject
{
    public event Action<string> StateChanged;
    
    private string _state;
    public string State
    {
        get => _state;
        set
        {
            _state = value;
            // 通知观察者
            StateChanged?.Invoke(value);
        }
    }
}
```

## 13. 实际应用示例

```csharp
// 完整的Employee类实现示例
public class Employee : Person, IComparable<Employee>, ICloneable, IDisposable
{
    public int EmployeeId { get; set; }
    public string Department { get; set; }
    public decimal Salary { get; private set; }
    public DateTime HireDate { get; set; }
    
    // 事件
    public event EventHandler<SalaryChangedEventArgs> SalaryChanged;
    
    public class SalaryChangedEventArgs : EventArgs
    {
        public decimal OldSalary { get; }
        public decimal NewSalary { get; }
        
        public SalaryChangedEventArgs(decimal oldSalary, decimal newSalary)
        {
            OldSalary = oldSalary;
            NewSalary = newSalary;
        }
    }
    
    // 构造函数
    public Employee(string firstName, string lastName, string department)
        : base(firstName, lastName)
    {
        Department = department;
        HireDate = DateTime.Now;
    }
    
    // 方法
    public void SetSalary(decimal salary)
    {
        if (salary < 0)
            throw new ArgumentException("Salary cannot be negative");
            
        if (Salary != salary)
        {
            decimal oldSalary = Salary;
            Salary = salary;
            
            // 触发事件
            OnSalaryChanged(new SalaryChangedEventArgs(oldSalary, salary));
        }
    }
    
    protected virtual void OnSalaryChanged(SalaryChangedEventArgs e)
    {
        SalaryChanged?.Invoke(this, e);
    }
    
    // 重写ToString方法
    public override string ToString()
    {
        return $"{FullName} (ID: {EmployeeId}) - {Department}, Salary: ${Salary:N2}";
    }
    
    // 实现IComparable接口
    public int CompareTo(Employee other)
    {
        if (other == null)
            return 1;
            
        // 按姓名比较
        return FullName.CompareTo(other.FullName);
    }
    
    // 实现ICloneable接口
    public object Clone()
    {
        return new Employee(FirstName, LastName, Department)
        {
            EmployeeId = this.EmployeeId,
            Salary = this.Salary,
            HireDate = this.HireDate
        };
    }
    
    // 实现IDisposable接口
    private bool _disposed = false;
    
    public void Dispose()
    {
        Dispose(true);
        GC.SuppressFinalize(this);
    }
    
    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed)
        {
            // 释放资源
            // ...
            _disposed = true;
        }
    }
    
    ~Employee()
    {
        Dispose(false);
    }
}

// 使用示例
public class EmployeeManager
{
    private List<Employee> _employees = new List<Employee>();
    
    public void AddEmployee(Employee employee)
    {
        employee.SalaryChanged += OnEmployeeSalaryChanged;
        _employees.Add(employee);
    }
    
    private void OnEmployeeSalaryChanged(object sender, Employee.SalaryChangedEventArgs e)
    {
        var emp = sender as Employee;
        Console.WriteLine($"Salary changed for {emp.FullName}: ${e.OldSalary:N2} → ${e.NewSalary:N2}");
    }
    
    public void RemoveEmployee(int employeeId)
    {
        var employee = _employees.Find(e => e.EmployeeId == employeeId);
        if (employee != null)
        {
            employee.SalaryChanged -= OnEmployeeSalaryChanged;
            _employees.Remove(employee);
        }
    }
    
    public List<Employee> GetEmployeesByDepartment(string department)
    {
        return _employees.Where(e => e.Department == department).ToList();
    }
    
    public void SortEmployees()
    {
        _employees.Sort();
    }
}
```
