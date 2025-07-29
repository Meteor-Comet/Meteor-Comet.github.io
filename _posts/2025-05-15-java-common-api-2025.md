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

// 输出结果
System.out.println("str1: " + str1);           // 输出: str1: Hello
System.out.println("str2: " + str2);           // 输出: str2: World
System.out.println("str3: " + str3);           // 输出: str3: 123
System.out.println("length: " + length);       // 输出: length: 11
System.out.println("ch: " + ch);               // 输出: ch: H
System.out.println("sub: " + sub);             // 输出: sub: Hello
System.out.println("upper: " + upper);         // 输出: upper: HELLO WORLD
System.out.println("lower: " + lower);         // 输出: lower: hello world
```

**字符串查找与替换：**
```java
String str = "Hello World";
boolean contains = str.contains("World");    // 是否包含
int index = str.indexOf("o");               // 查找字符位置
int lastIndex = str.lastIndexOf("o");       // 从后查找
String replaced = str.replace("World", "Java"); // 替换
String[] parts = str.split(" ");            // 分割

// 输出结果
System.out.println("contains: " + contains);     // 输出: contains: true
System.out.println("index: " + index);           // 输出: index: 4
System.out.println("lastIndex: " + lastIndex);   // 输出: lastIndex: 7
System.out.println("replaced: " + replaced);     // 输出: replaced: Hello Java
System.out.println("parts[0]: " + parts[0]);     // 输出: parts[0]: Hello
System.out.println("parts[1]: " + parts[1]);     // 输出: parts[1]: World
```

**字符串比较：**
```java
String s1 = "Hello";
String s2 = "hello";
boolean equals = s1.equals(s2);             // 内容比较
boolean ignoreCase = s1.equalsIgnoreCase(s2); // 忽略大小写比较
int compare = s1.compareTo(s2);             // 字典序比较

// 输出结果
System.out.println("equals: " + equals);           // 输出: equals: false
System.out.println("ignoreCase: " + ignoreCase);   // 输出: ignoreCase: true
System.out.println("compare: " + compare);         // 输出: compare: -32 (H的ASCII码比h小32)
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

// 输出结果
System.out.println("result: " + result);           // 输出: result: Hello World
System.out.println("sb2: " + sb2.toString());      // 输出: sb2: Hello World
```

**StringBuffer（线程安全）：**
```java
StringBuffer buffer = new StringBuffer();
buffer.append("Hello");
buffer.append(" ");
buffer.append("World");
String result = buffer.toString();

// 输出结果
System.out.println("result: " + result);           // 输出: result: Hello World
```

**常用方法：**
```java
StringBuilder sb = new StringBuilder("Hello");
sb.insert(5, " World");     // 插入
System.out.println("insert: " + sb);               // 输出: insert: Hello World

sb.delete(5, 11);           // 删除
System.out.println("delete: " + sb);               // 输出: delete: Hello

sb.reverse();               // 反转
System.out.println("reverse: " + sb);              // 输出: reverse: olleH

sb.setCharAt(0, 'h');      // 设置字符
System.out.println("setCharAt: " + sb);            // 输出: setCharAt: hlleH
```

##### 1.3 StringJoiner

**基本使用：**
```java
StringJoiner joiner = new StringJoiner(", ", "[", "]");
joiner.add("Apple");
joiner.add("Banana");
joiner.add("Orange");
String result = joiner.toString();

// 输出结果
System.out.println("result: " + result);           // 输出: result: [Apple, Banana, Orange]
```

**简化字符串拼接：**
```java
String[] names = {"Alice", "Bob", "Charlie"};
String result = String.join(", ", names);

// 输出结果
System.out.println("result: " + result);           // 输出: result: Alice, Bob, Charlie
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
System.out.println("=== 遍历方式 ===");
for (String item : list) {
    System.out.println(item);
}
// 输出:
// Apple
// Banana
// Orange

list.forEach(System.out::println);
// 输出:
// Apple
// Banana
// Orange

// 常用操作
String first = list.get(0);                    // 获取元素
list.set(0, "Grape");                         // 设置元素
boolean contains = list.contains("Apple");     // 是否包含
int size = list.size();                       // 大小

// 输出结果
System.out.println("first: " + first);         // 输出: first: Apple
System.out.println("contains Apple: " + contains); // 输出: contains Apple: false
System.out.println("size: " + size);           // 输出: size: 3
System.out.println("list after set: " + list); // 输出: list after set: [Grape, Banana, Orange]
```

**LinkedList（链表）：**
```java
LinkedList<String> linkedList = new LinkedList<>();
linkedList.addFirst("First");   // 头部添加
linkedList.addLast("Last");     // 尾部添加
linkedList.add("Middle");       // 中间添加

// 输出结果
System.out.println("linkedList: " + linkedList); // 输出: linkedList: [First, Middle, Last]

String first = linkedList.removeFirst();       // 头部删除
String last = linkedList.removeLast();        // 尾部删除
String peek = linkedList.peek();              // 查看头部元素

// 输出结果
System.out.println("removed first: " + first); // 输出: removed first: First
System.out.println("removed last: " + last);   // 输出: removed last: Last
System.out.println("peek: " + peek);           // 输出: peek: Middle
System.out.println("final list: " + linkedList); // 输出: final list: [Middle]
```

##### 2.2 Set接口及实现

**HashSet（哈希集合）：**
```java
Set<String> set = new HashSet<>();
set.add("Apple");
set.add("Banana");
set.add("Apple"); // 重复元素不会添加

// 遍历
System.out.println("=== HashSet遍历 ===");
set.forEach(System.out::println);
// 输出:
// Apple
// Banana

// 常用操作
boolean contains = set.contains("Apple");          // 是否包含
boolean removed = set.remove("Apple");            // 删除
int size = set.size();                            // 大小

// 输出结果
System.out.println("contains Apple: " + contains); // 输出: contains Apple: true
System.out.println("removed Apple: " + removed);   // 输出: removed Apple: true
System.out.println("size: " + size);               // 输出: size: 1
System.out.println("final set: " + set);           // 输出: final set: [Banana]
```

**TreeSet（有序集合）：**
```java
TreeSet<String> treeSet = new TreeSet<>();
treeSet.add("Zebra");
treeSet.add("Apple");
treeSet.add("Banana");
// 自动排序：Apple, Banana, Zebra

// 输出结果
System.out.println("treeSet: " + treeSet); // 输出: treeSet: [Apple, Banana, Zebra]

// 获取第一个和最后一个
String first = treeSet.first();
String last = treeSet.last();

// 输出结果
System.out.println("first: " + first); // 输出: first: Apple
System.out.println("last: " + last);   // 输出: last: Zebra
```

##### 2.3 Map接口及实现

**HashMap（哈希映射）：**
```java
Map<String, Integer> map = new HashMap<>();
map.put("Apple", 1);
map.put("Banana", 2);
map.put("Orange", 3);

// 遍历方式
System.out.println("=== HashMap遍历 ===");
map.forEach((key, value) -> 
    System.out.println(key + ": " + value));
// 输出:
// Apple: 1
// Banana: 2
// Orange: 3

for (Map.Entry<String, Integer> entry : map.entrySet()) {
    System.out.println(entry.getKey() + " -> " + entry.getValue());
}
// 输出:
// Apple -> 1
// Banana -> 2
// Orange -> 3

// 常用操作
Integer appleValue = map.get("Apple");              // 获取值
boolean containsKey = map.containsKey("Apple");     // 是否包含键
boolean containsValue = map.containsValue(1);       // 是否包含值
Integer removed = map.remove("Apple");              // 删除

// 输出结果
System.out.println("appleValue: " + appleValue);           // 输出: appleValue: 1
System.out.println("containsKey Apple: " + containsKey);   // 输出: containsKey Apple: true
System.out.println("containsValue 1: " + containsValue);   // 输出: containsValue 1: true
System.out.println("removed: " + removed);                 // 输出: removed: 1
System.out.println("final map: " + map);                   // 输出: final map: {Banana=2, Orange=3}
```

**TreeMap（有序映射）：**
```java
TreeMap<String, Integer> treeMap = new TreeMap<>();
treeMap.put("Zebra", 3);
treeMap.put("Apple", 1);
treeMap.put("Banana", 2);
// 按键自动排序

// 输出结果
System.out.println("treeMap: " + treeMap); // 输出: treeMap: {Apple=1, Banana=2, Zebra=3}

// 获取第一个和最后一个
Map.Entry<String, Integer> first = treeMap.firstEntry();
Map.Entry<String, Integer> last = treeMap.lastEntry();

// 输出结果
System.out.println("first: " + first.getKey() + "=" + first.getValue()); // 输出: first: Apple=1
System.out.println("last: " + last.getKey() + "=" + last.getValue());   // 输出: last: Zebra=3
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
System.out.println("sorted: " + Arrays.toString(arr)); // 输出: sorted: [1, 1, 2, 3, 4, 5, 6, 9]

// 二分查找（需要先排序）
int index = Arrays.binarySearch(arr, 5);
System.out.println("index of 5: " + index); // 输出: index of 5: 5

// 填充
Arrays.fill(arr, 0);
System.out.println("filled: " + Arrays.toString(arr)); // 输出: filled: [0, 0, 0, 0, 0, 0, 0, 0]

// 复制
int[] original = {1, 2, 3, 4, 5};
int[] copy = Arrays.copyOf(original, original.length);
System.out.println("copy: " + Arrays.toString(copy)); // 输出: copy: [1, 2, 3, 4, 5]

// 比较
boolean equals = Arrays.equals(original, copy);
System.out.println("equals: " + equals); // 输出: equals: true

// 转换为字符串
String str = Arrays.toString(original);
System.out.println("string: " + str); // 输出: string: [1, 2, 3, 4, 5]
```

##### 7.2 Collections工具类

**集合操作：**
```java
import java.util.*;

List<String> list = Arrays.asList("Apple", "Banana", "Orange");

// 排序
Collections.sort(list);
System.out.println("sorted: " + list); // 输出: sorted: [Apple, Banana, Orange]

// 反转
Collections.reverse(list);
System.out.println("reversed: " + list); // 输出: reversed: [Orange, Banana, Apple]

// 随机打乱
Collections.shuffle(list);
System.out.println("shuffled: " + list); // 输出: shuffled: [Banana, Apple, Orange] (顺序随机)

// 查找最大最小值
String max = Collections.max(list);
String min = Collections.min(list);
System.out.println("max: " + max); // 输出: max: Orange
System.out.println("min: " + min); // 输出: min: Apple

// 替换
Collections.replaceAll(list, "Apple", "Grape");
System.out.println("replaced: " + list); // 输出: replaced: [Banana, Grape, Orange]

// 频率统计
int frequency = Collections.frequency(list, "Banana");
System.out.println("frequency of Banana: " + frequency); // 输出: frequency of Banana: 1
```

##### 7.3 Objects工具类

**对象操作：**
```java
import java.util.Objects;

String str = null;

// 空值检查
boolean isNull = Objects.isNull(str);
boolean nonNull = Objects.nonNull(str);
System.out.println("isNull: " + isNull);     // 输出: isNull: true
System.out.println("nonNull: " + nonNull);   // 输出: nonNull: false

// 相等性比较
boolean equals = Objects.equals("Hello", "Hello");
boolean equalsNull = Objects.equals(null, null);
System.out.println("equals: " + equals);         // 输出: equals: true
System.out.println("equalsNull: " + equalsNull); // 输出: equalsNull: true

// 哈希码
int hashCode = Objects.hash("Hello", "World");
System.out.println("hashCode: " + hashCode); // 输出: hashCode: 123456789 (具体值可能不同)

// 要求非空
try {
    String result = Objects.requireNonNull(str, "String cannot be null");
} catch (NullPointerException e) {
    System.out.println("Exception: " + e.getMessage()); // 输出: Exception: String cannot be null
}
```

##### 7.4 Optional类

**空值安全处理：**
```java
import java.util.Optional;

String str = "Hello";
Optional<String> optional = Optional.of(str);

// 安全获取值
String value = optional.orElse("Default");
System.out.println("value: " + value); // 输出: value: Hello

// 条件处理
optional.ifPresent(System.out::println); // 输出: Hello

// 链式操作
Optional<String> result = optional
    .map(s -> s.toUpperCase())
    .filter(s -> s.length() > 3);
System.out.println("result: " + result.get()); // 输出: result: HELLO

// 创建Optional
Optional<String> empty = Optional.empty();
Optional<String> ofNullable = Optional.ofNullable(str);

// 处理空Optional
String emptyValue = empty.orElse("Empty");
System.out.println("emptyValue: " + emptyValue); // 输出: emptyValue: Empty
```

##### 7.5 Math类

**数学运算方法：**
```java
import java.lang.Math;

// 基本数学运算
double abs = Math.abs(-5.5);        // 绝对值
double ceil = Math.ceil(5.3);       // 向上取整
double floor = Math.floor(5.7);     // 向下取整
double round = Math.round(5.5);     // 四舍五入
double max = Math.max(10, 20);      // 最大值
double min = Math.min(10, 20);      // 最小值

// 输出结果
System.out.println("abs(-5.5): " + abs);     // 输出: abs(-5.5): 5.5
System.out.println("ceil(5.3): " + ceil);    // 输出: ceil(5.3): 6.0
System.out.println("floor(5.7): " + floor);  // 输出: floor(5.7): 5.0
System.out.println("round(5.5): " + round);  // 输出: round(5.5): 6.0
System.out.println("max(10,20): " + max);    // 输出: max(10,20): 20.0
System.out.println("min(10,20): " + min);    // 输出: min(10,20): 10.0

// 幂运算
double pow = Math.pow(2, 3);        // 2的3次方
double sqrt = Math.sqrt(16);        // 平方根
double cbrt = Math.cbrt(27);        // 立方根

// 输出结果
System.out.println("pow(2,3): " + pow);   // 输出: pow(2,3): 8.0
System.out.println("sqrt(16): " + sqrt);  // 输出: sqrt(16): 4.0
System.out.println("cbrt(27): " + cbrt);  // 输出: cbrt(27): 3.0

// 三角函数（参数为弧度）
double sin = Math.sin(Math.PI / 2); // 正弦
double cos = Math.cos(0);           // 余弦
double tan = Math.tan(Math.PI / 4); // 正切

// 输出结果
System.out.println("sin(π/2): " + sin);   // 输出: sin(π/2): 1.0
System.out.println("cos(0): " + cos);     // 输出: cos(0): 1.0
System.out.println("tan(π/4): " + tan);   // 输出: tan(π/4): 1.0

// 反三角函数
double asin = Math.asin(1.0);       // 反正弦
double acos = Math.acos(1.0);       // 反余弦
double atan = Math.atan(1.0);       // 反正切

// 角度与弧度转换
double toRadians = Math.toRadians(180); // 角度转弧度
double toDegrees = Math.toDegrees(Math.PI); // 弧度转角度

// 对数函数
double log = Math.log(Math.E);      // 自然对数
double log10 = Math.log10(100);     // 常用对数

// 随机数
double random = Math.random();       // 0.0到1.0之间的随机数
int randomInt = (int)(Math.random() * 100); // 0到99的随机整数

// 输出结果
System.out.println("random: " + random);     // 输出: random: 0.123456789 (具体值随机)
System.out.println("randomInt: " + randomInt); // 输出: randomInt: 45 (具体值随机)

// 常量
double pi = Math.PI;                // 圆周率
double e = Math.E;                  // 自然对数的底

// 输出结果
System.out.println("π: " + pi);     // 输出: π: 3.141592653589793
System.out.println("e: " + e);      // 输出: e: 2.718281828459045
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

##### 7.6 System类

**系统相关操作：**
```java
import java.lang.System;

// 获取当前时间戳
long currentTime = System.currentTimeMillis();  // 毫秒时间戳
long nanoTime = System.nanoTime();              // 纳秒时间戳

// 输出结果
System.out.println("currentTime: " + currentTime); // 输出: currentTime: 1640995200000 (具体值不同)
System.out.println("nanoTime: " + nanoTime);       // 输出: nanoTime: 1234567890123456789 (具体值不同)

// 系统属性
String osName = System.getProperty("os.name");           // 操作系统名称
String javaVersion = System.getProperty("java.version"); // Java版本
String userHome = System.getProperty("user.home");       // 用户主目录

// 输出结果
System.out.println("osName: " + osName);         // 输出: osName: Windows 10 (或Linux、macOS等)
System.out.println("javaVersion: " + javaVersion); // 输出: javaVersion: 17.0.1 (具体版本不同)
System.out.println("userHome: " + userHome);     // 输出: userHome: C:\Users\username (具体路径不同)

// 数组复制
int[] source = {1, 2, 3, 4, 5};
int[] dest = new int[5];
System.arraycopy(source, 0, dest, 0, source.length);
System.out.println("dest: " + Arrays.toString(dest)); // 输出: dest: [1, 2, 3, 4, 5]

// 垃圾回收
System.gc();  // 建议进行垃圾回收

// 程序退出
// System.exit(0);  // 正常退出
// System.exit(1);  // 异常退出

// 安全检查
SecurityManager sm = System.getSecurityManager();
```

**System.out输出流：**
```java
// 标准输出
System.out.println("Hello World");                    // 输出: Hello World
System.out.print("不换行输出");                        // 输出: 不换行输出
System.out.printf("格式化输出: %s, %d", "字符串", 123); // 输出: 格式化输出: 字符串, 123

// 输出格式控制
System.out.printf("整数: %d%n", 100);                 // 输出: 整数: 100
System.out.printf("浮点数: %.2f%n", 3.14159);         // 输出: 浮点数: 3.14
System.out.printf("字符串: %s%n", "Java");            // 输出: 字符串: Java
System.out.printf("字符: %c%n", 'A');                 // 输出: 字符: A
System.out.printf("布尔值: %b%n", true);              // 输出: 布尔值: true
System.out.printf("十六进制: %x%n", 255);             // 输出: 十六进制: ff
System.out.printf("八进制: %o%n", 255);               // 输出: 八进制: 377

// 重定向输出流
PrintStream originalOut = System.out;
try {
    // 重定向到文件
    PrintStream fileOut = new PrintStream("output.txt");
    System.setOut(fileOut);
    System.out.println("这条消息会写入文件");
} finally {
    // 恢复原始输出流
    System.setOut(originalOut);
}
```

**System.in输入流：**
```java
// 标准输入
Scanner scanner = new Scanner(System.in);
System.out.print("请输入姓名: ");  // 输出: 请输入姓名: 
String name = scanner.nextLine();  // 等待用户输入
System.out.print("请输入年龄: ");  // 输出: 请输入年龄: 
int age = scanner.nextInt();       // 等待用户输入

// 输出结果
System.out.println("姓名: " + name); // 输出: 姓名: 张三 (用户输入的内容)
System.out.println("年龄: " + age);  // 输出: 年龄: 25 (用户输入的内容)

// 直接读取字节
try {
    System.out.print("请输入一个字符: "); // 输出: 请输入一个字符: 
    int ch = System.in.read();
    System.out.println("输入的字符: " + (char)ch); // 输出: 输入的字符: A (用户输入的内容)
} catch (IOException e) {
    e.printStackTrace();
}

// 重定向输入流
try {
    // 从文件读取输入
    FileInputStream fileIn = new FileInputStream("input.txt");
    System.setIn(fileIn);
    Scanner fileScanner = new Scanner(System.in);
    while (fileScanner.hasNextLine()) {
        String line = fileScanner.nextLine();
        System.out.println("从文件读取: " + line); // 输出: 从文件读取: 文件内容
    }
} catch (FileNotFoundException e) {
    e.printStackTrace();
}
```

**System.err错误输出流：**
```java
// 错误输出
System.err.println("这是一个错误消息");                    // 输出: 这是一个错误消息 (红色错误输出)
System.err.print("错误信息不换行");                        // 输出: 错误信息不换行 (红色错误输出)

// 格式化错误输出
System.err.printf("错误代码: %d, 错误信息: %s%n", 404, "页面未找到"); 
// 输出: 错误代码: 404, 错误信息: 页面未找到 (红色错误输出)

// 重定向错误流
PrintStream originalErr = System.err;
try {
    PrintStream errorFile = new PrintStream("error.log");
    System.setErr(errorFile);
    System.err.println("错误日志会写入文件");
} finally {
    System.setErr(originalErr);
}
```

**System类的实用工具方法：**
```java
public class SystemUtils {
    
    // 获取系统信息
    public static void printSystemInfo() {
        System.out.println("操作系统: " + System.getProperty("os.name"));
        System.out.println("Java版本: " + System.getProperty("java.version"));
        System.out.println("Java供应商: " + System.getProperty("java.vendor"));
        System.out.println("JVM版本: " + System.getProperty("java.vm.version"));
        System.out.println("用户目录: " + System.getProperty("user.dir"));
        System.out.println("用户主目录: " + System.getProperty("user.home"));
    }
    
    // 性能测试工具
    public static void performanceTest(Runnable task, String taskName) {
        long startTime = System.currentTimeMillis();
        long startNano = System.nanoTime();
        
        task.run();
        
        long endTime = System.currentTimeMillis();
        long endNano = System.nanoTime();
        
        System.out.println(taskName + " 执行时间:");
        System.out.println("  毫秒: " + (endTime - startTime) + "ms");
        System.out.println("  纳秒: " + (endNano - startNano) + "ns");
    }
    
    // 内存使用情况
    public static void printMemoryInfo() {
        Runtime runtime = Runtime.getRuntime();
        long totalMemory = runtime.totalMemory();
        long freeMemory = runtime.freeMemory();
        long usedMemory = totalMemory - freeMemory;
        long maxMemory = runtime.maxMemory();
        
        System.out.println("内存使用情况:");
        System.out.println("  总内存: " + (totalMemory / 1024 / 1024) + "MB");
        System.out.println("  已用内存: " + (usedMemory / 1024 / 1024) + "MB");
        System.out.println("  空闲内存: " + (freeMemory / 1024 / 1024) + "MB");
        System.out.println("  最大内存: " + (maxMemory / 1024 / 1024) + "MB");
    }
    
    // 安全退出程序
    public static void safeExit(int code) {
        System.out.println("程序即将退出，代码: " + code);
        System.gc();  // 建议垃圾回收
        System.exit(code);
    }
}

// 使用示例
public class SystemUtilsExample {
    public static void main(String[] args) {
        // 获取系统信息
        SystemUtils.printSystemInfo();
        // 输出:
        // 操作系统: Windows 10
        // Java版本: 17.0.1
        // Java供应商: Oracle Corporation
        // JVM版本: 17.0.1+12-LTS-39
        // 用户目录: C:\Users\username\project
        // 用户主目录: C:\Users\username
        
        // 性能测试
        SystemUtils.performanceTest(() -> {
            for (int i = 0; i < 1000000; i++) {
                Math.sqrt(i);
            }
        }, "计算平方根");
        // 输出:
        // 计算平方根 执行时间:
        //   毫秒: 15ms
        //   纳秒: 15000000ns
        
        // 内存使用情况
        SystemUtils.printMemoryInfo();
        // 输出:
        // 内存使用情况:
        //   总内存: 256MB
        //   已用内存: 45MB
        //   空闲内存: 211MB
        //   最大内存: 4096MB
    }
}
```

**System类的注意事项：**
- System.currentTimeMillis()返回的是毫秒级时间戳，适合一般用途
- System.nanoTime()返回纳秒级时间戳，适合高精度计时
- System.exit()会强制终止JVM，谨慎使用
- System.gc()只是建议进行垃圾回收，不保证立即执行
- 重定向流后记得恢复原始流，避免影响其他代码
- 系统属性是全局的，修改会影响整个JVM

##### 7.7 BigInteger和BigDecimal

**BigInteger（大整数）：**
```java
import java.math.BigInteger;

// 创建BigInteger
BigInteger bigInt1 = new BigInteger("123456789012345678901234567890");
BigInteger bigInt2 = BigInteger.valueOf(123456789);
BigInteger bigInt3 = BigInteger.ONE;  // 常量1
BigInteger bigInt4 = BigInteger.ZERO; // 常量0
BigInteger bigInt5 = BigInteger.TEN;  // 常量10

// 输出结果
System.out.println("bigInt1: " + bigInt1); // 输出: bigInt1: 123456789012345678901234567890
System.out.println("bigInt2: " + bigInt2); // 输出: bigInt2: 123456789
System.out.println("bigInt3: " + bigInt3); // 输出: bigInt3: 1
System.out.println("bigInt4: " + bigInt4); // 输出: bigInt4: 0
System.out.println("bigInt5: " + bigInt5); // 输出: bigInt5: 10

// 基本运算
BigInteger a = new BigInteger("123456789");
BigInteger b = new BigInteger("987654321");

BigInteger sum = a.add(b);           // 加法
BigInteger diff = b.subtract(a);     // 减法
BigInteger product = a.multiply(b);  // 乘法
BigInteger quotient = b.divide(a);   // 除法
BigInteger remainder = b.remainder(a); // 取余

// 输出结果
System.out.println("sum: " + sum);           // 输出: sum: 1111111110
System.out.println("diff: " + diff);         // 输出: diff: 864197532
System.out.println("product: " + product);   // 输出: product: 121932631112635269
System.out.println("quotient: " + quotient); // 输出: quotient: 8
System.out.println("remainder: " + remainder); // 输出: remainder: 9

// 幂运算
BigInteger base = new BigInteger("2");
BigInteger power = base.pow(100); // 2的100次方
System.out.println("2^100: " + power); // 输出: 2^100: 1267650600228229401496703205376

// 比较操作
BigInteger x = new BigInteger("100");
BigInteger y = new BigInteger("200");
int compare = x.compareTo(y);
boolean equals = x.equals(y);
boolean isZero = x.equals(BigInteger.ZERO);
boolean isPositive = x.compareTo(BigInteger.ZERO) > 0;

// 输出结果
System.out.println("compare: " + compare);     // 输出: compare: -1 (x < y)
System.out.println("equals: " + equals);       // 输出: equals: false
System.out.println("isZero: " + isZero);       // 输出: isZero: false
System.out.println("isPositive: " + isPositive); // 输出: isPositive: true

// 位运算
BigInteger num = new BigInteger("42");
BigInteger and = num.and(new BigInteger("15"));    // 按位与
BigInteger or = num.or(new BigInteger("15"));      // 按位或
BigInteger xor = num.xor(new BigInteger("15"));    // 按位异或
BigInteger not = num.not();                        // 按位非
BigInteger shiftLeft = num.shiftLeft(2);           // 左移2位
BigInteger shiftRight = num.shiftRight(1);         // 右移1位

// 输出结果
System.out.println("and: " + and);           // 输出: and: 10
System.out.println("or: " + or);             // 输出: or: 47
System.out.println("xor: " + xor);           // 输出: xor: 37
System.out.println("not: " + not);           // 输出: not: -43
System.out.println("shiftLeft: " + shiftLeft);     // 输出: shiftLeft: 168
System.out.println("shiftRight: " + shiftRight);   // 输出: shiftRight: 21

// 素数测试
BigInteger prime = new BigInteger("17");
boolean isProbablePrime = prime.isProbablePrime(100); // 概率素数测试
System.out.println("isProbablePrime: " + isProbablePrime); // 输出: isProbablePrime: true

// 最大公约数和最小公倍数
BigInteger gcd = a.gcd(b); // 最大公约数
BigInteger lcm = a.multiply(b).divide(gcd); // 最小公倍数
System.out.println("gcd: " + gcd); // 输出: gcd: 3
System.out.println("lcm: " + lcm); // 输出: lcm: 40623982634538657907

// 转换为其他类型
int intValue = a.intValue();
long longValue = a.longValue();
String stringValue = a.toString();
String hexValue = a.toString(16); // 十六进制
String binaryValue = a.toString(2); // 二进制

// 输出结果
System.out.println("intValue: " + intValue);       // 输出: intValue: 123456789
System.out.println("longValue: " + longValue);     // 输出: longValue: 123456789
System.out.println("stringValue: " + stringValue); // 输出: stringValue: 123456789
System.out.println("hexValue: " + hexValue);       // 输出: hexValue: 75bcd15
System.out.println("binaryValue: " + binaryValue); // 输出: binaryValue: 111010110111100110100010101
```

**BigDecimal（高精度小数）：**
```java
import java.math.BigDecimal;
import java.math.RoundingMode;

// 创建BigDecimal
BigDecimal bd1 = new BigDecimal("3.141592653589793238462643383279");
BigDecimal bd2 = BigDecimal.valueOf(2.718281828459045);
BigDecimal bd3 = new BigDecimal("100.00");
BigDecimal bd4 = BigDecimal.ONE;   // 常量1
BigDecimal bd5 = BigDecimal.ZERO;  // 常量0
BigDecimal bd6 = BigDecimal.TEN;   // 常量10

// 输出结果
System.out.println("bd1: " + bd1); // 输出: bd1: 3.141592653589793238462643383279
System.out.println("bd2: " + bd2); // 输出: bd2: 2.718281828459045
System.out.println("bd3: " + bd3); // 输出: bd3: 100.00
System.out.println("bd4: " + bd4); // 输出: bd4: 1
System.out.println("bd5: " + bd5); // 输出: bd5: 0
System.out.println("bd6: " + bd6); // 输出: bd6: 10

// 基本运算
BigDecimal a = new BigDecimal("10.5");
BigDecimal b = new BigDecimal("3.2");

BigDecimal sum = a.add(b);           // 加法
BigDecimal diff = a.subtract(b);     // 减法
BigDecimal product = a.multiply(b);  // 乘法
BigDecimal quotient = a.divide(b, 10, RoundingMode.HALF_UP); // 除法，保留10位小数
BigDecimal remainder = a.remainder(b); // 取余

// 输出结果
System.out.println("sum: " + sum);           // 输出: sum: 13.7
System.out.println("diff: " + diff);         // 输出: diff: 7.3
System.out.println("product: " + product);   // 输出: product: 33.60
System.out.println("quotient: " + quotient); // 输出: quotient: 3.2812500000
System.out.println("remainder: " + remainder); // 输出: remainder: 0.9

// 幂运算
BigDecimal base = new BigDecimal("2.5");
BigDecimal power = base.pow(3); // 2.5的3次方
System.out.println("2.5^3: " + power); // 输出: 2.5^3: 15.625

// 比较操作
BigDecimal x = new BigDecimal("10.5");
BigDecimal y = new BigDecimal("10.50");
int compare = x.compareTo(y);
boolean equals = x.equals(y);
boolean isZero = x.equals(BigDecimal.ZERO);
boolean isPositive = x.compareTo(BigDecimal.ZERO) > 0;

// 输出结果
System.out.println("compare: " + compare);     // 输出: compare: 0 (x = y)
System.out.println("equals: " + equals);       // 输出: equals: false (精度不同)
System.out.println("isZero: " + isZero);       // 输出: isZero: false
System.out.println("isPositive: " + isPositive); // 输出: isPositive: true

// 精度控制
BigDecimal pi = new BigDecimal("3.141592653589793");
BigDecimal rounded = pi.setScale(2, RoundingMode.HALF_UP); // 保留2位小数
BigDecimal ceiling = pi.setScale(2, RoundingMode.CEILING); // 向上取整
BigDecimal floor = pi.setScale(2, RoundingMode.FLOOR);     // 向下取整

// 输出结果
System.out.println("rounded: " + rounded); // 输出: rounded: 3.14
System.out.println("ceiling: " + ceiling); // 输出: ceiling: 3.15
System.out.println("floor: " + floor);     // 输出: floor: 3.14

// 舍入模式示例
BigDecimal value = new BigDecimal("3.5");
System.out.println("HALF_UP: " + value.setScale(0, RoundingMode.HALF_UP));     // 输出: HALF_UP: 4
System.out.println("HALF_DOWN: " + value.setScale(0, RoundingMode.HALF_DOWN)); // 输出: HALF_DOWN: 3
System.out.println("HALF_EVEN: " + value.setScale(0, RoundingMode.HALF_EVEN)); // 输出: HALF_EVEN: 4
System.out.println("CEILING: " + value.setScale(0, RoundingMode.CEILING));     // 输出: CEILING: 4
System.out.println("FLOOR: " + value.setScale(0, RoundingMode.FLOOR));         // 输出: FLOOR: 3

// 转换为其他类型
int intValue = a.intValue();
long longValue = a.longValue();
float floatValue = a.floatValue();
double doubleValue = a.doubleValue();
String stringValue = a.toString();

// 输出结果
System.out.println("intValue: " + intValue);       // 输出: intValue: 10
System.out.println("longValue: " + longValue);     // 输出: longValue: 10
System.out.println("floatValue: " + floatValue);   // 输出: floatValue: 10.5
System.out.println("doubleValue: " + doubleValue); // 输出: doubleValue: 10.5
System.out.println("stringValue: " + stringValue); // 输出: stringValue: 10.5

// 获取精度信息
int scale = a.scale();           // 小数位数
int precision = a.precision();   // 总位数
BigInteger unscaledValue = a.unscaledValue(); // 去掉小数点的整数值

// 输出结果
System.out.println("scale: " + scale);           // 输出: scale: 1
System.out.println("precision: " + precision);   // 输出: precision: 3
System.out.println("unscaledValue: " + unscaledValue); // 输出: unscaledValue: 105
```

**BigInteger和BigDecimal的实用工具类：**
```java
import java.math.BigInteger;
import java.math.BigDecimal;
import java.math.RoundingMode;

public class MathUtils {
    
    // 计算阶乘
    public static BigInteger factorial(int n) {
        if (n < 0) throw new IllegalArgumentException("负数没有阶乘");
        if (n <= 1) return BigInteger.ONE;
        
        BigInteger result = BigInteger.ONE;
        for (int i = 2; i <= n; i++) {
            result = result.multiply(BigInteger.valueOf(i));
        }
        return result;
    }
    
    // 计算斐波那契数列
    public static BigInteger fibonacci(int n) {
        if (n <= 0) return BigInteger.ZERO;
        if (n == 1) return BigInteger.ONE;
        
        BigInteger a = BigInteger.ZERO;
        BigInteger b = BigInteger.ONE;
        for (int i = 2; i <= n; i++) {
            BigInteger temp = a.add(b);
            a = b;
            b = temp;
        }
        return b;
    }
    
    // 计算组合数 C(n,k)
    public static BigInteger combination(int n, int k) {
        if (k > n || k < 0) return BigInteger.ZERO;
        if (k == 0 || k == n) return BigInteger.ONE;
        
        return factorial(n).divide(factorial(k).multiply(factorial(n - k)));
    }
    
    // 计算排列数 P(n,k)
    public static BigInteger permutation(int n, int k) {
        if (k > n || k < 0) return BigInteger.ZERO;
        
        return factorial(n).divide(factorial(n - k));
    }
    
    // 计算平方根（使用牛顿迭代法）
    public static BigDecimal sqrt(BigDecimal value, int scale) {
        if (value.compareTo(BigDecimal.ZERO) < 0) {
            throw new IllegalArgumentException("负数没有实数平方根");
        }
        
        BigDecimal x = value;
        BigDecimal y = BigDecimal.ZERO;
        BigDecimal epsilon = BigDecimal.ONE.divide(BigDecimal.TEN.pow(scale));
        
        while (x.subtract(y).abs().compareTo(epsilon) > 0) {
            y = x;
            x = value.divide(x, scale, RoundingMode.HALF_UP)
                    .add(x)
                    .divide(BigDecimal.valueOf(2), scale, RoundingMode.HALF_UP);
        }
        
        return x;
    }
    
    // 计算e的n次方
    public static BigDecimal exp(BigDecimal x, int scale) {
        BigDecimal result = BigDecimal.ONE;
        BigDecimal term = BigDecimal.ONE;
        BigDecimal factorial = BigDecimal.ONE;
        int n = 1;
        
        while (term.abs().compareTo(BigDecimal.ONE.divide(BigDecimal.TEN.pow(scale))) > 0) {
            factorial = factorial.multiply(BigDecimal.valueOf(n));
            term = x.pow(n).divide(factorial, scale, RoundingMode.HALF_UP);
            result = result.add(term);
            n++;
        }
        
        return result;
    }
    
    // 计算自然对数
    public static BigDecimal ln(BigDecimal x, int scale) {
        if (x.compareTo(BigDecimal.ZERO) <= 0) {
            throw new IllegalArgumentException("对数只能计算正数");
        }
        
        BigDecimal y = x.subtract(BigDecimal.ONE).divide(x.add(BigDecimal.ONE), scale, RoundingMode.HALF_UP);
        BigDecimal result = BigDecimal.ZERO;
        BigDecimal term = y;
        int n = 1;
        
        while (term.abs().compareTo(BigDecimal.ONE.divide(BigDecimal.TEN.pow(scale))) > 0) {
            result = result.add(term.divide(BigDecimal.valueOf(n), scale, RoundingMode.HALF_UP));
            term = term.multiply(y).multiply(y);
            n += 2;
        }
        
        return result.multiply(BigDecimal.valueOf(2));
    }
    
    // 货币计算（避免浮点数精度问题）
    public static BigDecimal calculateInterest(BigDecimal principal, BigDecimal rate, int years) {
        BigDecimal multiplier = BigDecimal.ONE.add(rate.divide(BigDecimal.valueOf(100), 10, RoundingMode.HALF_UP));
        return principal.multiply(multiplier.pow(years)).setScale(2, RoundingMode.HALF_UP);
    }
    
    // 百分比计算
    public static BigDecimal percentage(BigDecimal value, BigDecimal total) {
        return value.multiply(BigDecimal.valueOf(100))
                   .divide(total, 2, RoundingMode.HALF_UP);
    }
}

// 使用示例
public class MathUtilsExample {
    public static void main(String[] args) {
        // 阶乘计算
        System.out.println("5! = " + MathUtils.factorial(5)); // 输出: 5! = 120
        System.out.println("10! = " + MathUtils.factorial(10)); // 输出: 10! = 3628800
        
        // 斐波那契数列
        System.out.println("F(10) = " + MathUtils.fibonacci(10)); // 输出: F(10) = 55
        System.out.println("F(20) = " + MathUtils.fibonacci(20)); // 输出: F(20) = 6765
        
        // 组合数
        System.out.println("C(5,2) = " + MathUtils.combination(5, 2)); // 输出: C(5,2) = 10
        System.out.println("C(10,3) = " + MathUtils.combination(10, 3)); // 输出: C(10,3) = 120
        
        // 平方根
        BigDecimal sqrt2 = MathUtils.sqrt(new BigDecimal("2"), 10);
        System.out.println("√2 = " + sqrt2); // 输出: √2 = 1.4142135624
        
        // 货币计算
        BigDecimal principal = new BigDecimal("10000.00");
        BigDecimal rate = new BigDecimal("5.5"); // 5.5%
        BigDecimal interest = MathUtils.calculateInterest(principal, rate, 3);
        System.out.println("利息: " + interest); // 输出: 利息: 11742.38
        
        // 百分比
        BigDecimal value = new BigDecimal("75");
        BigDecimal total = new BigDecimal("200");
        BigDecimal percentage = MathUtils.percentage(value, total);
        System.out.println("百分比: " + percentage + "%"); // 输出: 百分比: 37.50%
    }
}
```

**BigInteger和BigDecimal的注意事项：**

1. **精度问题**：
   - BigInteger可以表示任意大的整数
   - BigDecimal可以表示任意精度的十进制数
   - 避免使用double构造BigDecimal，使用字符串构造

2. **性能考虑**：
   - BigInteger和BigDecimal运算比基本类型慢
   - 对于简单计算，优先使用基本类型
   - 需要高精度时才使用BigInteger/BigDecimal

3. **舍入模式**：
   - HALF_UP：四舍五入（默认）
   - HALF_DOWN：五舍六入
   - HALF_EVEN：银行家舍入法
   - CEILING：向上取整
   - FLOOR：向下取整

4. **比较操作**：
   - 使用compareTo()而不是equals()进行比较
   - equals()会考虑精度，compareTo()只比较数值

5. **应用场景**：
   - 金融计算（货币、利率）
   - 科学计算（高精度数学）
   - 大数运算（密码学、统计）
   - 避免浮点数精度问题

##### 7.8 正则表达式

**Pattern和Matcher类：**
```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;

// 基本匹配
String text = "Hello World 123";
Pattern pattern = Pattern.compile("\\d+"); // 匹配一个或多个数字
Matcher matcher = pattern.matcher(text);

// 查找匹配
while (matcher.find()) {
    System.out.println("找到数字: " + matcher.group());
    System.out.println("位置: " + matcher.start() + "-" + matcher.end());
}
// 输出:
// 找到数字: 123
// 位置: 12-15

// 完全匹配
String email = "user@example.com";
Pattern emailPattern = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
boolean isValidEmail = emailPattern.matcher(email).matches();
System.out.println("邮箱有效: " + isValidEmail); // 输出: 邮箱有效: true

// 分组捕获
String phone = "138-1234-5678";
Pattern phonePattern = Pattern.compile("(\\d{3})-(\\d{4})-(\\d{4})");
Matcher phoneMatcher = phonePattern.matcher(phone);
if (phoneMatcher.matches()) {
    System.out.println("区号: " + phoneMatcher.group(1)); // 输出: 区号: 138
    System.out.println("前缀: " + phoneMatcher.group(2)); // 输出: 前缀: 1234
    System.out.println("后缀: " + phoneMatcher.group(3)); // 输出: 后缀: 5678
}
```

**String类的正则方法：**
```java
// matches方法
String text = "Hello123World";
boolean hasDigits = text.matches(".*\\d+.*");
System.out.println("包含数字: " + hasDigits); // 输出: 包含数字: true

// split方法
String csv = "apple,banana,orange,grape";
String[] fruits = csv.split(",");
System.out.println("水果数量: " + fruits.length); // 输出: 水果数量: 4
for (String fruit : fruits) {
    System.out.println(fruit);
}
// 输出:
// apple
// banana
// orange
// grape

// replaceAll方法
String text = "Hello123World456";
String lettersOnly = text.replaceAll("\\d+", "");
System.out.println("只保留字母: " + lettersOnly); // 输出: 只保留字母: HelloWorld

// replaceFirst方法
String text = "Hello123World123";
String firstReplaced = text.replaceFirst("\\d+", "XXX");
System.out.println("替换第一个数字: " + firstReplaced); // 输出: 替换第一个数字: HelloXXXWorld123
```

**常用正则表达式模式：**
```java
public class RegexPatterns {
    
    // 邮箱验证
    public static final String EMAIL_PATTERN = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$";
    
    // 手机号验证（中国）
    public static final String PHONE_PATTERN = "^1[3-9]\\d{9}$";
    
    // 身份证号验证（中国）
    public static final String ID_CARD_PATTERN = "^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$";
    
    // URL验证
    public static final String URL_PATTERN = "^https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-.,@?^=%&:/~+#]*[\\w\\-@?^=%&/~+#])?$";
    
    // 日期验证（YYYY-MM-DD）
    public static final String DATE_PATTERN = "^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01])$";
    
    // 时间验证（HH:MM:SS）
    public static final String TIME_PATTERN = "^([01]\\d|2[0-3]):([0-5]\\d):([0-5]\\d)$";
    
    // 邮政编码验证（中国）
    public static final String POSTAL_CODE_PATTERN = "^[1-9]\\d{5}$";
    
    // 用户名验证（字母开头，允许字母数字下划线，长度3-16）
    public static final String USERNAME_PATTERN = "^[a-zA-Z]\\w{2,15}$";
    
    // 密码验证（至少8位，包含大小写字母和数字）
    public static final String PASSWORD_PATTERN = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d@$!%*?&]{8,}$";
    
    // IPv4地址验证
    public static final String IPV4_PATTERN = "^((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)$";
    
    // 十六进制颜色验证
    public static final String HEX_COLOR_PATTERN = "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$";
}

// 使用示例
public class RegexExample {
    public static void main(String[] args) {
        // 邮箱验证
        String email = "user@example.com";
        boolean isValidEmail = email.matches(RegexPatterns.EMAIL_PATTERN);
        System.out.println("邮箱有效: " + isValidEmail); // 输出: 邮箱有效: true
        
        // 手机号验证
        String phone = "13812345678";
        boolean isValidPhone = phone.matches(RegexPatterns.PHONE_PATTERN);
        System.out.println("手机号有效: " + isValidPhone); // 输出: 手机号有效: true
        
        // URL验证
        String url = "https://www.example.com/path?param=value";
        boolean isValidUrl = url.matches(RegexPatterns.URL_PATTERN);
        System.out.println("URL有效: " + isValidUrl); // 输出: URL有效: true
        
        // 日期验证
        String date = "2025-05-15";
        boolean isValidDate = date.matches(RegexPatterns.DATE_PATTERN);
        System.out.println("日期有效: " + isValidDate); // 输出: 日期有效: true
        
        // 密码验证
        String password = "MyPass123";
        boolean isValidPassword = password.matches(RegexPatterns.PASSWORD_PATTERN);
        System.out.println("密码有效: " + isValidPassword); // 输出: 密码有效: true
    }
}
```

**正则表达式语法详解：**
```java
public class RegexSyntax {
    
    public static void demonstrateSyntax() {
        String text = "Hello World 123 ABC";
        
        // 字符类
        System.out.println("=== 字符类 ===");
        System.out.println("数字: " + text.replaceAll("\\d", "X")); // 输出: Hello World XXX ABC
        System.out.println("非数字: " + text.replaceAll("\\D", "X")); // 输出: XXXXX XXXXX XXX XXX
        System.out.println("字母: " + text.replaceAll("[a-zA-Z]", "X")); // 输出: XXXXX XXXXX 123 XXX
        System.out.println("非字母: " + text.replaceAll("[^a-zA-Z]", "X")); // 输出: HelloXWorldX123XABC
        
        // 量词
        System.out.println("=== 量词 ===");
        System.out.println("一个或多个数字: " + text.replaceAll("\\d+", "X")); // 输出: Hello World X ABC
        System.out.println("零个或多个字母: " + text.replaceAll("[a-zA-Z]*", "X")); // 输出: X X X X
        System.out.println("1到3个字母: " + text.replaceAll("[a-zA-Z]{1,3}", "X")); // 输出: X X 123 X
        
        // 边界
        System.out.println("=== 边界 ===");
        System.out.println("单词边界: " + text.replaceAll("\\b\\w+\\b", "X")); // 输出: X X 123 X
        System.out.println("行首: " + text.replaceAll("^\\w+", "X")); // 输出: X World 123 ABC
        System.out.println("行尾: " + text.replaceAll("\\w+$", "X")); // 输出: Hello World 123 X
        
        // 分组和引用
        System.out.println("=== 分组和引用 ===");
        String name = "John Doe";
        String result = name.replaceAll("(\\w+)\\s+(\\w+)", "$2, $1");
        System.out.println("姓名格式转换: " + result); // 输出: Doe, John
        
        // 非捕获组
        String text2 = "color colour";
        String result2 = text2.replaceAll("colou?r", "color");
        System.out.println("统一拼写: " + result2); // 输出: color color
        
        // 前瞻和后顾
        System.out.println("=== 前瞻和后顾 ===");
        String numbers = "123 456 789";
        // 匹配后面跟着空格的数字
        String result3 = numbers.replaceAll("\\d+(?=\\s)", "X");
        System.out.println("前瞻: " + result3); // 输出: X X 789
        
        // 匹配前面有数字的空格
        String result4 = numbers.replaceAll("(?<=\\d)\\s", "X");
        System.out.println("后顾: " + result4); // 输出: 123X456X789
    }
}
```

**实用正则表达式工具类：**
```java
import java.util.regex.Pattern;
import java.util.regex.Matcher;
import java.util.ArrayList;
import java.util.List;

public class RegexUtils {
    
    // 验证字符串是否匹配正则表达式
    public static boolean isValid(String text, String regex) {
        return text != null && Pattern.matches(regex, text);
    }
    
    // 提取所有匹配的字符串
    public static List<String> extractAll(String text, String regex) {
        List<String> results = new ArrayList<>();
        if (text == null) return results;
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        
        while (matcher.find()) {
            results.add(matcher.group());
        }
        
        return results;
    }
    
    // 提取第一个匹配的字符串
    public static String extractFirst(String text, String regex) {
        if (text == null) return null;
        
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(text);
        
        return matcher.find() ? matcher.group() : null;
    }
    
    // 替换所有匹配的字符串
    public static String replaceAll(String text, String regex, String replacement) {
        return text != null ? text.replaceAll(regex, replacement) : null;
    }
    
    // 替换第一个匹配的字符串
    public static String replaceFirst(String text, String regex, String replacement) {
        return text != null ? text.replaceFirst(regex, replacement) : null;
    }
    
    // 分割字符串
    public static String[] split(String text, String regex) {
        return text != null ? text.split(regex) : new String[0];
    }
    
    // 验证邮箱
    public static boolean isValidEmail(String email) {
        return isValid(email, "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    }
    
    // 验证手机号（中国）
    public static boolean isValidPhone(String phone) {
        return isValid(phone, "^1[3-9]\\d{9}$");
    }
    
    // 验证身份证号（中国）
    public static boolean isValidIdCard(String idCard) {
        return isValid(idCard, "^[1-9]\\d{5}(18|19|20)\\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\\d{3}[0-9Xx]$");
    }
    
    // 验证URL
    public static boolean isValidUrl(String url) {
        return isValid(url, "^https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-.,@?^=%&:/~+#]*[\\w\\-@?^=%&/~+#])?$");
    }
    
    // 提取邮箱地址
    public static List<String> extractEmails(String text) {
        return extractAll(text, "\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b");
    }
    
    // 提取手机号
    public static List<String> extractPhones(String text) {
        return extractAll(text, "\\b1[3-9]\\d{9}\\b");
    }
    
    // 提取IP地址
    public static List<String> extractIpAddresses(String text) {
        return extractAll(text, "\\b((25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\.){3}(25[0-5]|2[0-4]\\d|[01]?\\d\\d?)\\b");
    }
    
    // 提取HTML标签
    public static List<String> extractHtmlTags(String text) {
        return extractAll(text, "<[^>]+>");
    }
    
    // 移除HTML标签
    public static String removeHtmlTags(String text) {
        return replaceAll(text, "<[^>]+>", "");
    }
    
    // 提取数字
    public static List<String> extractNumbers(String text) {
        return extractAll(text, "\\b\\d+\\b");
    }
    
    // 提取小数
    public static List<String> extractDecimals(String text) {
        return extractAll(text, "\\b\\d+\\.\\d+\\b");
    }
    
    // 验证密码强度
    public static boolean isStrongPassword(String password) {
        // 至少8位，包含大小写字母、数字和特殊字符
        return isValid(password, "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
    }
    
    // 格式化手机号（添加分隔符）
    public static String formatPhone(String phone) {
        if (!isValidPhone(phone)) return phone;
        return phone.replaceAll("(\\d{3})(\\d{4})(\\d{4})", "$1-$2-$3");
    }
    
    // 隐藏敏感信息
    public static String maskSensitiveInfo(String text, String regex, String mask) {
        return replaceAll(text, regex, mask);
    }
}

// 使用示例
public class RegexUtilsExample {
    public static void main(String[] args) {
        // 验证功能
        System.out.println("邮箱验证: " + RegexUtils.isValidEmail("user@example.com")); // true
        System.out.println("手机号验证: " + RegexUtils.isValidPhone("13812345678")); // true
        System.out.println("URL验证: " + RegexUtils.isValidUrl("https://www.example.com")); // true
        
        // 提取功能
        String text = "联系邮箱：user1@example.com, user2@test.org，手机号：13812345678, 13987654321";
        List<String> emails = RegexUtils.extractEmails(text);
        List<String> phones = RegexUtils.extractPhones(text);
        
        System.out.println("提取的邮箱: " + emails); // [user1@example.com, user2@test.org]
        System.out.println("提取的手机号: " + phones); // [13812345678, 13987654321]
        
        // 替换功能
        String html = "<p>Hello <b>World</b></p>";
        String plainText = RegexUtils.removeHtmlTags(html);
        System.out.println("移除HTML标签: " + plainText); // Hello World
        
        // 格式化功能
        String phone = "13812345678";
        String formatted = RegexUtils.formatPhone(phone);
        System.out.println("格式化手机号: " + formatted); // 138-1234-5678
        
        // 隐藏敏感信息
        String sensitive = "身份证号：123456789012345678，手机号：13812345678";
        String masked = RegexUtils.maskSensitiveInfo(sensitive, "\\d{17}[\\dXx]", "***");
        System.out.println("隐藏敏感信息: " + masked); // 身份证号：***，手机号：13812345678
    }
}
```

**正则表达式性能优化：**
```java
public class RegexPerformance {
    
    // 编译正则表达式以提高性能
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    private static final Pattern PHONE_PATTERN = Pattern.compile("^1[3-9]\\d{9}$");
    private static final Pattern URL_PATTERN = Pattern.compile("^https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-.,@?^=%&:/~+#]*[\\w\\-@?^=%&/~+#])?$");
    
    // 使用预编译的正则表达式
    public static boolean isValidEmailOptimized(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }
    
    public static boolean isValidPhoneOptimized(String phone) {
        return phone != null && PHONE_PATTERN.matcher(phone).matches();
    }
    
    public static boolean isValidUrlOptimized(String url) {
        return url != null && URL_PATTERN.matcher(url).matches();
    }
    
    // 性能测试
    public static void performanceTest() {
        String email = "user@example.com";
        String phone = "13812345678";
        String url = "https://www.example.com";
        
        long startTime = System.currentTimeMillis();
        
        // 测试10000次验证
        for (int i = 0; i < 10000; i++) {
            isValidEmailOptimized(email);
            isValidPhoneOptimized(phone);
            isValidUrlOptimized(url);
        }
        
        long endTime = System.currentTimeMillis();
        System.out.println("优化后耗时: " + (endTime - startTime) + "ms");
        
        // 对比未优化的版本
        startTime = System.currentTimeMillis();
        
        for (int i = 0; i < 10000; i++) {
            email.matches("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
            phone.matches("^1[3-9]\\d{9}$");
            url.matches("^https?://[\\w\\-]+(\\.[\\w\\-]+)+([\\w\\-.,@?^=%&:/~+#]*[\\w\\-@?^=%&/~+#])?$");
        }
        
        endTime = System.currentTimeMillis();
        System.out.println("未优化耗时: " + (endTime - startTime) + "ms");
    }
}
```

**正则表达式的注意事项：**

1. **性能考虑**：
   - 预编译正则表达式以提高性能
   - 避免在循环中重复编译正则表达式
   - 使用非贪婪匹配（*?、+?）避免回溯过多

2. **语法要点**：
   - 转义字符：在Java中需要使用双反斜杠
   - 字符类：使用方括号定义字符集合
   - 量词：控制匹配次数
   - 边界：定义匹配位置

3. **常见陷阱**：
   - 点号（.）不匹配换行符，需要使用Pattern.DOTALL标志
   - 大小写敏感，需要使用Pattern.CASE_INSENSITIVE标志
   - 多行模式，需要使用Pattern.MULTILINE标志

4. **应用场景**：
   - 数据验证：邮箱、手机号、身份证等
   - 文本处理：提取、替换、分割
   - 日志分析：提取关键信息
   - 数据清洗：格式化、标准化

##### 7.9 对象克隆

**浅克隆（Shallow Clone）：**
```java
// 实现Cloneable接口
public class Student implements Cloneable {
    private String name;
    private int age;
    private Address address;  // 引用类型
    
    // 构造方法
    public Student(String name, int age, Address address) {
        this.name = name;
        this.age = age;
        this.address = address;
    }
    
    // 浅克隆方法
    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();  // 调用Object的clone方法
    }
    
    // getter和setter方法
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public Address getAddress() { return address; }
    public void setAddress(Address address) { this.address = address; }
}

// 地址类
public class Address {
    private String city;
    private String street;
    
    public Address(String city, String street) {
        this.city = city;
        this.street = street;
    }
    
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
}

// 浅克隆测试
public class CloneTest {
    public static void main(String[] args) throws CloneNotSupportedException {
        Address address = new Address("北京", "长安街");
        Student original = new Student("张三", 20, address);
        
        // 浅克隆
        Student cloned = (Student) original.clone();
        
        System.out.println("原始对象: " + original.getName() + ", " + original.getAddress().getCity());
        // 输出: 原始对象: 张三, 北京
        System.out.println("克隆对象: " + cloned.getName() + ", " + cloned.getAddress().getCity());
        // 输出: 克隆对象: 张三, 北京
        
        // 修改原始对象的引用类型属性
        original.getAddress().setCity("上海");
        
        System.out.println("修改后原始对象: " + original.getName() + ", " + original.getAddress().getCity());
        // 输出: 修改后原始对象: 张三, 上海
        System.out.println("修改后克隆对象: " + cloned.getName() + ", " + cloned.getAddress().getCity());
        // 输出: 修改后克隆对象: 张三, 上海
        // 克隆对象的地址也被修改了！这就是浅克隆的问题
    }
}
```

**深克隆（Deep Clone）：**

**方法一：重写clone方法**
```java
public class Student implements Cloneable {
    private String name;
    private int age;
    private Address address;
    private List<String> hobbies;  // 集合类型
    
    public Student(String name, int age, Address address, List<String> hobbies) {
        this.name = name;
        this.age = age;
        this.address = address;
        this.hobbies = hobbies;
    }
    
    // 深克隆方法
    @Override
    public Object clone() throws CloneNotSupportedException {
        Student cloned = (Student) super.clone();  // 先进行浅克隆
        
        // 对引用类型进行深克隆
        if (this.address != null) {
            cloned.address = (Address) this.address.clone();
        }
        
        // 对集合类型进行深克隆
        if (this.hobbies != null) {
            cloned.hobbies = new ArrayList<>(this.hobbies);
        }
        
        return cloned;
    }
}

// Address类也需要实现Cloneable
public class Address implements Cloneable {
    private String city;
    private String street;
    
    public Address(String city, String street) {
        this.city = city;
        this.street = street;
    }
    
    @Override
    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
    
    // getter和setter方法
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
    public String getStreet() { return street; }
    public void setStreet(String street) { this.street = street; }
}
```

**方法二：使用序列化实现深克隆**
```java
import java.io.*;

public class DeepCloneUtil {
    
    // 通过序列化实现深克隆
    public static <T> T deepClone(T obj) throws Exception {
        if (obj == null) return null;
        
        // 检查对象是否实现了Serializable接口
        if (!(obj instanceof Serializable)) {
            throw new IllegalArgumentException("对象必须实现Serializable接口");
        }
        
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);
        oos.writeObject(obj);
        oos.close();
        
        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bis);
        T cloned = (T) ois.readObject();
        ois.close();
        
        return cloned;
    }
}

// 需要实现Serializable接口
public class Student implements Serializable {
    private static final long serialVersionUID = 1L;
    private String name;
    private int age;
    private Address address;
    private List<String> hobbies;
    
    // 构造方法和getter/setter方法...
    
    // 使用序列化进行深克隆
    public Student deepClone() throws Exception {
        return DeepCloneUtil.deepClone(this);
    }
}

public class Address implements Serializable {
    private static final long serialVersionUID = 1L;
    private String city;
    private String street;
    
    // 构造方法和getter/setter方法...
}
```

**方法三：使用JSON实现深克隆**
```java
import com.fasterxml.jackson.databind.ObjectMapper;

public class JsonCloneUtil {
    private static final ObjectMapper mapper = new ObjectMapper();
    
    // 通过JSON实现深克隆
    public static <T> T deepClone(T obj, Class<T> clazz) throws Exception {
        if (obj == null) return null;
        
        String json = mapper.writeValueAsString(obj);
        return mapper.readValue(json, clazz);
    }
}

// 使用示例
public class CloneExample {
    public static void main(String[] args) throws Exception {
        Address address = new Address("北京", "长安街");
        List<String> hobbies = Arrays.asList("读书", "游泳");
        Student original = new Student("张三", 20, address, hobbies);
        
        // 使用JSON进行深克隆
        Student cloned = JsonCloneUtil.deepClone(original, Student.class);
        
        // 修改原始对象
        original.getAddress().setCity("上海");
        original.getHobbies().add("编程");
        
        // 克隆对象不受影响
        System.out.println("原始对象地址: " + original.getAddress().getCity());
        // 输出: 原始对象地址: 上海
        System.out.println("克隆对象地址: " + cloned.getAddress().getCity());
        // 输出: 克隆对象地址: 北京
        System.out.println("原始对象爱好数量: " + original.getHobbies().size());
        // 输出: 原始对象爱好数量: 3
        System.out.println("克隆对象爱好数量: " + cloned.getHobbies().size());
        // 输出: 克隆对象爱好数量: 2
    }
}
```

**克隆工具类：**
```java
public class CloneUtils {
    
    // 通用深克隆方法
    public static <T> T deepClone(T obj) {
        if (obj == null) return null;
        
        try {
            // 优先使用序列化方法
            if (obj instanceof Serializable) {
                return deepCloneBySerialization(obj);
            } else {
                // 使用反射方法
                return deepCloneByReflection(obj);
            }
        } catch (Exception e) {
            throw new RuntimeException("深克隆失败", e);
        }
    }
    
    // 序列化深克隆
    private static <T> T deepCloneBySerialization(T obj) throws Exception {
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);
        oos.writeObject(obj);
        oos.close();
        
        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bis);
        T cloned = (T) ois.readObject();
        ois.close();
        
        return cloned;
    }
    
    // 反射深克隆（简化版）
    private static <T> T deepCloneByReflection(T obj) throws Exception {
        Class<?> clazz = obj.getClass();
        T cloned = (T) clazz.newInstance();
        
        // 这里需要根据具体类的结构来实现
        // 实际应用中可能需要更复杂的反射逻辑
        
        return cloned;
    }
}
```

**克隆的注意事项：**
- **浅克隆**：只复制基本数据类型和引用地址，引用类型对象共享
- **深克隆**：复制所有数据，包括引用类型对象的完整副本
- **Cloneable接口**：标记接口，不实现会抛出CloneNotSupportedException
- **序列化方法**：要求所有相关类都实现Serializable接口
- **JSON方法**：简单易用，但性能相对较低
- **性能考虑**：深克隆比浅克隆消耗更多资源
- **循环引用**：深克隆时需要注意处理循环引用问题

**使用场景：**
- **浅克隆**：对象结构简单，引用类型不需要独立副本
- **深克隆**：对象结构复杂，需要完全独立的副本
- **原型模式**：创建对象的副本作为原型
- **缓存机制**：避免修改原始数据影响缓存

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
8. **大数运算**：掌握BigInteger和BigDecimal的使用，能够进行高精度数学计算和金融计算
9. **正则表达式**：掌握Pattern、Matcher类的使用，能够进行文本匹配、验证和替换
10. **网络编程**：理解Socket编程和URL处理的基本原理

这些API是Java开发的基础，为后续学习Spring框架、数据库操作、Web开发等高级主题奠定了坚实基础。

### 今日学习心得

今天重点学习了BigInteger和BigDecimal这两个重要的数值类型：

**BigInteger学习要点：**
- 可以表示任意大的整数，解决了基本整数类型的范围限制
- 支持所有基本数学运算：加减乘除、幂运算、位运算等
- 提供了素数测试、最大公约数、最小公倍数等高级功能
- 适用于密码学、大数统计、科学计算等场景

**BigDecimal学习要点：**
- 解决了浮点数精度问题，特别适用于金融计算
- 支持精确的十进制运算，避免浮点数舍入误差
- 提供了多种舍入模式，满足不同业务需求
- 可以控制精度和舍入方式，确保计算结果的准确性

**实际应用场景：**
- 金融系统：货币计算、利率计算、百分比计算
- 科学计算：高精度数学运算、统计分析
- 密码学：大数运算、素数生成
- 避免浮点数精度问题：确保计算结果的准确性

**注意事项：**
- 性能考虑：BigInteger和BigDecimal运算比基本类型慢，只在需要时使用
- 构造方式：优先使用字符串构造BigDecimal，避免double精度问题
- 比较操作：使用compareTo()而不是equals()进行比较
- 舍入模式：根据业务需求选择合适的舍入模式

通过今天的学习，对Java的数值处理能力有了更深入的理解，特别是在处理大数和精确计算方面的优势。这些知识为后续开发金融应用、科学计算程序等提供了重要基础。

**正则表达式学习要点：**
- 掌握了Pattern和Matcher类的核心用法，能够进行复杂的文本匹配和验证
- 熟练使用String类的正则方法（matches、split、replaceAll、replaceFirst）
- 掌握了常用正则表达式模式，包括邮箱、手机号、身份证、URL等验证
- 理解了正则表达式的语法要点，包括字符类、量词、边界、分组等
- 学会了性能优化技巧，如预编译正则表达式、避免回溯等
- 能够编写实用的正则表达式工具类，提高代码复用性

**正则表达式应用场景：**
- 数据验证：表单验证、数据格式检查
- 文本处理：提取关键信息、格式化文本
- 日志分析：解析日志文件、提取错误信息
- 数据清洗：标准化数据格式、去除无用信息

**正则表达式注意事项：**
- 性能考虑：预编译正则表达式，避免在循环中重复编译
- 语法陷阱：注意转义字符、边界匹配、贪婪与非贪婪匹配
- 可读性：复杂正则表达式要添加注释，提高代码可维护性
- 测试验证：编写充分的测试用例，确保正则表达式的正确性

通过正则表达式的学习，对文本处理和模式匹配有了更深入的理解，这将为后续开发数据处理、日志分析、表单验证等功能提供重要支持。

---

后续将继续深入学习更多高级API和框架，不断提升Java编程技能。 