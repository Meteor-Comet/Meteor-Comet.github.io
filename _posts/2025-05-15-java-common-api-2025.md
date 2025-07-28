---
layout:     post
title:      "Java常用API学习日志"
date:       2025-05-15 20:00:00
author:     "Comet"
tags:
    - Java
    - API
    - 学习日志
---

# Java常用API学习日志

## Java常用API学习

本系列日志将记录Java常用API的学习过程，涵盖Java标准库中的核心API，包括字符串处理、集合框架、IO流、多线程、反射、注解、日期时间处理等常用功能。

### 学习目标

- 掌握Java标准库中常用API的使用方法
- 理解各种API的设计思想和适用场景
- 熟练运用API解决实际编程问题
- 了解API的性能特性和最佳实践
- 为后续框架学习打下坚实基础

### 学习计划

1. **字符串处理API**：String、StringBuilder、StringBuffer、StringJoiner等
2. **集合框架API**：List、Set、Map及其实现类
3. **IO流API**：字节流、字符流、缓冲流、转换流等
4. **多线程API**：Thread、Runnable、线程池、同步机制
5. **反射与注解API**：Class、Method、Field、注解处理器
6. **日期时间API**：Date、Calendar、LocalDateTime、DateTimeFormatter
7. **工具类API**：Arrays、Collections、Objects、Optional等
8. **网络编程API**：Socket、URL、HTTP客户端等

### 学习内容

#### 1. 字符串处理API

##### 1.1 String类常用方法

**字符串创建与基本操作：**
```java
// 字符串创建
String str1 = "Hello";
String str2 = new String("World");
String str3 = String.valueOf(123);

// 基本操作
String str = "Hello World";
int length = str.length();           // 获取长度
char ch = str.charAt(0);            // 获取字符
String sub = str.substring(0, 5);   // 截取子串
String upper = str.toUpperCase();    // 转大写
String lower = str.toLowerCase();    // 转小写
```

**字符串查找与替换：**
```java
String str = "Hello World";
boolean contains = str.contains("World");    // 是否包含
int index = str.indexOf("o");               // 查找字符位置
int lastIndex = str.lastIndexOf("o");       // 从后查找
String replaced = str.replace("World", "Java"); // 替换
String[] parts = str.split(" ");            // 分割
```

**字符串比较：**
```java
String s1 = "Hello";
String s2 = "hello";
boolean equals = s1.equals(s2);             // 内容比较
boolean ignoreCase = s1.equalsIgnoreCase(s2); // 忽略大小写比较
int compare = s1.compareTo(s2);             // 字典序比较
```

##### 1.2 StringBuilder与StringBuffer

**StringBuilder（非线程安全）：**
```java
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ");
sb.append("World");
String result = sb.toString();

// 链式调用
StringBuilder sb2 = new StringBuilder()
    .append("Hello")
    .append(" ")
    .append("World");
```

**StringBuffer（线程安全）：**
```java
StringBuffer buffer = new StringBuffer();
buffer.append("Hello");
buffer.append(" ");
buffer.append("World");
String result = buffer.toString();
```

**常用方法：**
```java
StringBuilder sb = new StringBuilder("Hello");
sb.insert(5, " World");     // 插入
sb.delete(5, 11);           // 删除
sb.reverse();               // 反转
sb.setCharAt(0, 'h');      // 设置字符
```

##### 1.3 StringJoiner

**基本使用：**
```java
StringJoiner joiner = new StringJoiner(", ", "[", "]");
joiner.add("Apple");
joiner.add("Banana");
joiner.add("Orange");
String result = joiner.toString(); // [Apple, Banana, Orange]
```

**简化字符串拼接：**
```java
String[] names = {"Alice", "Bob", "Charlie"};
String result = String.join(", ", names); // Alice, Bob, Charlie
```

#### 2. 集合框架API

##### 2.1 List接口及实现

**ArrayList（动态数组）：**
```java
List<String> list = new ArrayList<>();
list.add("Apple");
list.add("Banana");
list.add("Orange");

// 遍历方式
for (String item : list) {
    System.out.println(item);
}

list.forEach(System.out::println);

// 常用操作
list.get(0);                    // 获取元素
list.set(0, "Grape");          // 设置元素
list.remove(0);                 // 删除元素
list.contains("Apple");         // 是否包含
list.size();                    // 大小
list.clear();                   // 清空
```

**LinkedList（链表）：**
```java
LinkedList<String> linkedList = new LinkedList<>();
linkedList.addFirst("First");   // 头部添加
linkedList.addLast("Last");     // 尾部添加
linkedList.removeFirst();       // 头部删除
linkedList.removeLast();        // 尾部删除
linkedList.peek();              // 查看头部元素
linkedList.poll();              // 头部出队
```

##### 2.2 Set接口及实现

**HashSet（哈希集合）：**
```java
Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Banana");
set.add("Apple"); // 重复元素不会添加

// 遍历
set.forEach(System.out::println);

// 常用操作
set.contains("Apple");          // 是否包含
set.remove("Apple");           // 删除
set.size();                    // 大小
set.clear();                   // 清空
```

**TreeSet（有序集合）：**
```java
TreeSet<String> treeSet = new TreeSet<>();
treeSet.add("Zebra");
treeSet.add("Apple");
treeSet.add("Banana");
// 自动排序：Apple, Banana, Zebra

// 获取第一个和最后一个
String first = treeSet.first();
String last = treeSet.last();
```

##### 2.3 Map接口及实现

**HashMap（哈希映射）：**
```java
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 1);
map.put("Banana", 2);
map.put("Orange", 3);

// 遍历方式
map.forEach((key, value) -> 
    System.out.println(key + ": " + value));

for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}

// 常用操作
map.get("Apple");              // 获取值
map.containsKey("Apple");      // 是否包含键
map.containsValue(1);          // 是否包含值
map.remove("Apple");           // 删除
map.size();                    // 大小
map.clear();                   // 清空
```

**TreeMap（有序映射）：**
```java
TreeMap<String, Integer> treeMap = new TreeMap<>();
treeMap.put("Zebra", 3);
treeMap.put("Apple", 1);
treeMap.put("Banana", 2);
// 按键自动排序

// 获取第一个和最后一个
Map.Entry<String, Integer> first = treeMap.firstEntry();
Map.Entry<String, Integer> last = treeMap.lastEntry();
```

#### 3. IO流API

##### 3.1 字节流

**FileInputStream（文件输入流）：**
```java
try (FileInputStream fis = new FileInputStream("input.txt")) {
    byte[] buffer = new byte[1024];
    int bytesRead;
    while ((bytesRead = fis.read(buffer)) != -1) {
        // 处理读取的数据
        System.out.write(buffer, 0, bytesRead);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

**FileOutputStream（文件输出流）：**
```java
try (FileOutputStream fos = new FileOutputStream("output.txt")) {
    String data = "Hello World";
    fos.write(data.getBytes());
} catch (IOException e) {
    e.printStackTrace();
}
```

##### 3.2 字符流

**FileReader（文件字符输入流）：**
```java
try (FileReader reader = new FileReader("input.txt")) {
    char[] buffer = new char[1024];
    int charsRead;
    while ((charsRead = reader.read(buffer)) != -1) {
        System.out.print(new String(buffer, 0, charsRead));
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

**FileWriter（文件字符输出流）：**
```java
try (FileWriter writer = new FileWriter("output.txt")) {
    writer.write("Hello World");
} catch (IOException e) {
    e.printStackTrace();
}
```

##### 3.3 缓冲流

**BufferedReader（缓冲字符输入流）：**
```java
try (BufferedReader reader = new BufferedReader(
        new FileReader("input.txt"))) {
    String line;
    while ((line = reader.readLine()) != null) {
        System.out.println(line);
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

**BufferedWriter（缓冲字符输出流）：**
```java
try (BufferedWriter writer = new BufferedWriter(
        new FileWriter("output.txt"))) {
    writer.write("Line 1");
    writer.newLine();
    writer.write("Line 2");
} catch (IOException e) {
    e.printStackTrace();
}
```

#### 4. 多线程API

##### 4.1 线程创建

**继承Thread类：**
```java
class MyThread extends Thread {
    @Override
    public void run() {
        System.out.println("Thread running: " + Thread.currentThread().getName());
    }
}

// 使用
MyThread thread = new MyThread();
thread.start();
```

**实现Runnable接口：**
```java
class MyRunnable implements Runnable {
    @Override
    public void run() {
        System.out.println("Runnable running: " + Thread.currentThread().getName());
    }
}

// 使用
Thread thread = new Thread(new MyRunnable());
thread.start();
```

**Lambda表达式：**
```java
Thread thread = new Thread(() -> {
    System.out.println("Lambda thread running");
});
thread.start();
```

##### 4.2 线程控制

**基本控制：**
```java
Thread thread = new Thread(() -> {
    for (int i = 0; i < 5; i++) {
        System.out.println("Count: " + i);
        try {
            Thread.sleep(1000); // 休眠1秒
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
});

thread.start();
thread.join(); // 等待线程结束
```

**线程状态：**
```java
Thread thread = new Thread(() -> {
    // 线程任务
});

System.out.println("State: " + thread.getState()); // NEW
thread.start();
System.out.println("State: " + thread.getState()); // RUNNABLE
```

##### 4.3 线程同步

**synchronized关键字：**
```java
class Counter {
    private int count = 0;
    
    public synchronized void increment() {
        count++;
    }
    
    public synchronized int getCount() {
        return count;
    }
}
```

**ReentrantLock：**
```java
import java.util.concurrent.locks.ReentrantLock;

class Counter {
    private int count = 0;
    private ReentrantLock lock = new ReentrantLock();
    
    public void increment() {
        lock.lock();
        try {
            count++;
        } finally {
            lock.unlock();
        }
    }
}
```

#### 5. 反射与注解API

##### 5.1 反射基础

**获取Class对象：**
```java
// 方式1：通过类名
Class<?> clazz1 = String.class;

// 方式2：通过对象
String str = "Hello";
Class<?> clazz2 = str.getClass();

// 方式3：通过全限定名
try {
    Class<?> clazz3 = Class.forName("java.lang.String");
} catch (ClassNotFoundException e) {
    e.printStackTrace();
}
```

**获取构造方法：**
```java
Class<?> clazz = String.class;

// 获取所有公共构造方法
Constructor<?>[] constructors = clazz.getConstructors();

// 获取指定构造方法
try {
    Constructor<?> constructor = clazz.getConstructor(String.class);
    String obj = (String) constructor.newInstance("Hello");
} catch (Exception e) {
    e.printStackTrace();
}
```

**获取方法：**
```java
Class<?> clazz = String.class;

// 获取所有公共方法
Method[] methods = clazz.getMethods();

// 获取指定方法
try {
    Method method = clazz.getMethod("length");
    String str = "Hello";
    int length = (int) method.invoke(str);
    System.out.println("Length: " + length);
} catch (Exception e) {
    e.printStackTrace();
}
```

**获取字段：**
```java
class Person {
    private String name;
    public int age;
}

Class<?> clazz = Person.class;

// 获取所有公共字段
Field[] fields = clazz.getFields();

// 获取所有字段（包括私有）
Field[] allFields = clazz.getDeclaredFields();

// 访问私有字段
try {
    Field nameField = clazz.getDeclaredField("name");
    nameField.setAccessible(true); // 设置可访问
    Person person = new Person();
    nameField.set(person, "Alice");
    String name = (String) nameField.get(person);
} catch (Exception e) {
    e.printStackTrace();
}
```

##### 5.2 注解使用

**自定义注解：**
```java
import java.lang.annotation.*;

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface MyAnnotation {
    String value() default "";
    int count() default 1;
}
```

**使用注解：**
```java
class TestClass {
    @MyAnnotation(value = "test", count = 3)
    public void testMethod() {
        System.out.println("Test method");
    }
}
```

**注解处理器：**
```java
Class<?> clazz = TestClass.class;
Method[] methods = clazz.getMethods();

for (Method method : methods) {
    if (method.isAnnotationPresent(MyAnnotation.class)) {
        MyAnnotation annotation = method.getAnnotation(MyAnnotation.class);
        System.out.println("Value: " + annotation.value());
        System.out.println("Count: " + annotation.count());
    }
}
```

#### 6. 日期时间API

##### 6.1 新日期时间API（Java 8+）

**LocalDate（日期）：**
```java
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

LocalDate today = LocalDate.now();
LocalDate specificDate = LocalDate.of(2025, 5, 15);

// 日期操作
LocalDate tomorrow = today.plusDays(1);
LocalDate yesterday = today.minusDays(1);
LocalDate nextMonth = today.plusMonths(1);

// 格式化
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
String formatted = today.format(formatter);
LocalDate parsed = LocalDate.parse("2025-05-15", formatter);
```

**LocalTime（时间）：**
```java
import java.time.LocalTime;

LocalTime now = LocalTime.now();
LocalTime specificTime = LocalTime.of(14, 30, 45);

// 时间操作
LocalTime plusHours = now.plusHours(2);
LocalTime minusMinutes = now.minusMinutes(30);

// 格式化
DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss");
String formatted = now.format(timeFormatter);
```

**LocalDateTime（日期时间）：**
```java
import java.time.LocalDateTime;

LocalDateTime now = LocalDateTime.now();
LocalDateTime specific = LocalDateTime.of(2025, 5, 15, 14, 30, 45);

// 日期时间操作
LocalDateTime plusDays = now.plusDays(1);
LocalDateTime minusHours = now.minusHours(2);

// 格式化
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formatted = now.format(formatter);
```

##### 6.2 传统日期时间API

**Date类：**
```java
import java.util.Date;
import java.text.SimpleDateFormat;

Date now = new Date();
Date specific = new Date(2025 - 1900, 4, 15); // 月份从0开始

// 格式化
SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
String formatted = sdf.format(now);

// 解析
try {
    Date parsed = sdf.parse("2025-05-15 14:30:45");
} catch (ParseException e) {
    e.printStackTrace();
}
```

**Calendar类：**
```java
import java.util.Calendar;

Calendar cal = Calendar.getInstance();
cal.set(2025, Calendar.MAY, 15); // 月份从0开始

// 获取字段
int year = cal.get(Calendar.YEAR);
int month = cal.get(Calendar.MONTH);
int day = cal.get(Calendar.DAY_OF_MONTH);

// 操作
cal.add(Calendar.DAY_OF_MONTH, 1); // 加一天
cal.add(Calendar.MONTH, 1);        // 加一月
```

#### 7. 工具类API

##### 7.1 Arrays工具类

**数组操作：**
```java
import java.util.Arrays;

int[] arr = {3, 1, 4, 1, 5, 9, 2, 6};

// 排序
Arrays.sort(arr);

// 二分查找（需要先排序）
int index = Arrays.binarySearch(arr, 5);

// 填充
Arrays.fill(arr, 0);

// 复制
int[] copy = Arrays.copyOf(arr, arr.length);

// 比较
boolean equals = Arrays.equals(arr, copy);

// 转换为字符串
String str = Arrays.toString(arr);
```

##### 7.2 Collections工具类

**集合操作：**
```java
import java.util.*;

List<String> list = Arrays.asList("Apple", "Banana", "Orange");

// 排序
Collections.sort(list);

// 反转
Collections.reverse(list);

// 随机打乱
Collections.shuffle(list);

// 查找最大最小值
String max = Collections.max(list);
String min = Collections.min(list);

// 替换
Collections.replaceAll(list, "Apple", "Grape");

// 频率统计
int frequency = Collections.frequency(list, "Apple");
```

##### 7.3 Objects工具类

**对象操作：**
```java
import java.util.Objects;

String str = null;

// 空值检查
boolean isNull = Objects.isNull(str);
boolean nonNull = Objects.nonNull(str);

// 相等性比较
boolean equals = Objects.equals("Hello", "Hello");

// 哈希码
int hashCode = Objects.hash("Hello", "World");

// 要求非空
String result = Objects.requireNonNull(str, "String cannot be null");
```

##### 7.4 Optional类

**空值安全处理：**
```java
import java.util.Optional;

String str = "Hello";
Optional<String> optional = Optional.of(str);

// 安全获取值
String value = optional.orElse("Default");

// 条件处理
optional.ifPresent(System.out::println);

// 链式操作
Optional<String> result = optional
    .map(s -> s.toUpperCase())
    .filter(s -> s.length() > 3);

// 创建Optional
Optional<String> empty = Optional.empty();
Optional<String> ofNullable = Optional.ofNullable(str);
```

##### 7.5 Math类

**数学运算方法：**
```java
import java.lang.Math;

// 基本数学运算
double abs = Math.abs(-5.5);        // 绝对值: 5.5
double ceil = Math.ceil(5.3);       // 向上取整: 6.0
double floor = Math.floor(5.7);     // 向下取整: 5.0
double round = Math.round(5.5);     // 四舍五入: 6.0
double max = Math.max(10, 20);      // 最大值: 20.0
double min = Math.min(10, 20);      // 最小值: 10.0

// 幂运算
double pow = Math.pow(2, 3);        // 2的3次方: 8.0
double sqrt = Math.sqrt(16);        // 平方根: 4.0
double cbrt = Math.cbrt(27);        // 立方根: 3.0

// 三角函数（参数为弧度）
double sin = Math.sin(Math.PI / 2); // 正弦: 1.0
double cos = Math.cos(0);           // 余弦: 1.0
double tan = Math.tan(Math.PI / 4); // 正切: 1.0

// 反三角函数
double asin = Math.asin(1.0);       // 反正弦
double acos = Math.acos(1.0);       // 反余弦
double atan = Math.atan(1.0);       // 反正切

// 角度与弧度转换
double toRadians = Math.toRadians(180); // 角度转弧度: π
double toDegrees = Math.toDegrees(Math.PI); // 弧度转角度: 180.0

// 对数函数
double log = Math.log(Math.E);      // 自然对数: 1.0
double log10 = Math.log10(100);     // 常用对数: 2.0

// 随机数
double random = Math.random();       // 0.0到1.0之间的随机数
int randomInt = (int)(Math.random() * 100); // 0到99的随机整数

// 常量
double pi = Math.PI;                // 圆周率: 3.141592653589793
double e = Math.E;                  // 自然对数的底: 2.718281828459045
```

**Math类的常用场景：**
```java
// 生成指定范围的随机数
public static int randomRange(int min, int max) {
    return (int)(Math.random() * (max - min + 1)) + min;
}

// 计算两点间距离
public static double distance(double x1, double y1, double x2, double y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

// 判断是否为素数
public static boolean isPrime(int n) {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    
    int sqrt = (int)Math.sqrt(n);
    for (int i = 5; i <= sqrt; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}

// 计算圆的面积
public static double circleArea(double radius) {
    return Math.PI * Math.pow(radius, 2);
}

// 计算球的体积
public static double sphereVolume(double radius) {
    return (4.0 / 3.0) * Math.PI * Math.pow(radius, 3);
}
```

**Math类的注意事项：**
- Math类中的所有方法都是静态的，可以直接通过类名调用
- 三角函数参数为弧度，不是角度
- Math.random()生成的是伪随机数，对于需要高安全性的场景应使用SecureRandom
- 浮点数运算可能存在精度问题，需要特别注意比较操作

#### 8. 网络编程API

##### 8.1 Socket编程

**服务器端：**
```java
import java.net.*;
import java.io.*;

public class Server {
    public static void main(String[] args) {
        try (ServerSocket serverSocket = new ServerSocket(8080)) {
            System.out.println("Server started on port 8080");
            
            while (true) {
                Socket clientSocket = serverSocket.accept();
                System.out.println("Client connected: " + clientSocket.getInetAddress());
                
                // 处理客户端连接
                new Thread(() -> handleClient(clientSocket)).start();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    
    private static void handleClient(Socket clientSocket) {
        try (BufferedReader in = new BufferedReader(
                new InputStreamReader(clientSocket.getInputStream()));
             PrintWriter out = new PrintWriter(clientSocket.getOutputStream(), true)) {
            
            String inputLine;
            while ((inputLine = in.readLine()) != null) {
                System.out.println("Received: " + inputLine);
                out.println("Echo: " + inputLine);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**客户端：**
```java
import java.net.*;
import java.io.*;

public class Client {
    public static void main(String[] args) {
        try (Socket socket = new Socket("localhost", 8080);
             PrintWriter out = new PrintWriter(socket.getOutputStream(), true);
             BufferedReader in = new BufferedReader(
                 new InputStreamReader(socket.getInputStream()));
             BufferedReader stdIn = new BufferedReader(
                 new InputStreamReader(System.in))) {
            
            String userInput;
            while ((userInput = stdIn.readLine()) != null) {
                out.println(userInput);
                String response = in.readLine();
                System.out.println("Server response: " + response);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

##### 8.2 URL处理

**URL操作：**
```java
import java.net.*;
import java.io.*;

try {
    URL url = new URL("https://www.example.com");
    
    // 获取URL信息
    System.out.println("Protocol: " + url.getProtocol());
    System.out.println("Host: " + url.getHost());
    System.out.println("Port: " + url.getPort());
    System.out.println("Path: " + url.getPath());
    
    // 读取URL内容
    try (BufferedReader reader = new BufferedReader(
            new InputStreamReader(url.openStream()))) {
        String line;
        while ((line = reader.readLine()) != null) {
            System.out.println(line);
        }
    }
} catch (IOException e) {
    e.printStackTrace();
}
```

### 学习总结

通过本阶段的学习，掌握了Java常用API的核心功能和使用方法：

1. **字符串处理**：熟练使用String、StringBuilder、StringBuffer等类进行字符串操作
2. **集合框架**：理解List、Set、Map的特点和适用场景，能够选择合适的集合类型
3. **IO流**：掌握字节流、字符流、缓冲流的使用，能够进行文件读写操作
4. **多线程**：理解线程创建、控制、同步机制，能够编写多线程程序
5. **反射注解**：掌握反射机制和注解的使用，能够动态操作类和对象
6. **日期时间**：熟练使用新日期时间API，能够进行日期时间计算和格式化
7. **工具类**：掌握Arrays、Collections、Objects、Optional等工具类的使用
8. **网络编程**：理解Socket编程和URL处理的基本原理

这些API是Java开发的基础，为后续学习Spring框架、数据库操作、Web开发等高级主题奠定了坚实基础。

---

后续将继续深入学习更多高级API和框架，不断提升Java编程技能。 