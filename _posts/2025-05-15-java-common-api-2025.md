---
layout:     post
title:      "Java常用API"
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

##### 7.9 包装类

**基本数据类型与包装类对应关系：**
```java
// 基本数据类型 -> 包装类
byte -> Byte
short -> Short
int -> Integer
long -> Long
float -> Float
double -> Double
char -> Character
boolean -> Boolean

// 创建包装类对象
Integer intObj = new Integer(100);           // 构造方法（已过时）
Integer intObj2 = Integer.valueOf(100);       // 推荐使用valueOf方法
Integer intObj3 = 100;                        // 自动装箱

// 输出结果
System.out.println("intObj: " + intObj);      // 输出: intObj: 100
System.out.println("intObj2: " + intObj2);    // 输出: intObj2: 100
System.out.println("intObj3: " + intObj3);    // 输出: intObj3: 100
```

**装箱与拆箱：**
```java
// 自动装箱（Autoboxing）
Integer autoBoxed = 100;                      // 基本类型自动转换为包装类
Double autoBoxedDouble = 3.14;               // 基本类型自动转换为包装类

// 自动拆箱（Unboxing）
int primitive = autoBoxed;                    // 包装类自动转换为基本类型
double primitiveDouble = autoBoxedDouble;     // 包装类自动转换为基本类型

// 输出结果
System.out.println("autoBoxed: " + autoBoxed);           // 输出: autoBoxed: 100
System.out.println("primitive: " + primitive);           // 输出: primitive: 100
System.out.println("autoBoxedDouble: " + autoBoxedDouble); // 输出: autoBoxedDouble: 3.14
System.out.println("primitiveDouble: " + primitiveDouble); // 输出: primitiveDouble: 3.14

// 在集合中使用
List<Integer> numbers = new ArrayList<>();
numbers.add(1);    // 自动装箱
numbers.add(2);    // 自动装箱
numbers.add(3);    // 自动装箱

int first = numbers.get(0);  // 自动拆箱
int second = numbers.get(1); // 自动拆箱

// 输出结果
System.out.println("numbers: " + numbers);     // 输出: numbers: [1, 2, 3]
System.out.println("first: " + first);         // 输出: first: 1
System.out.println("second: " + second);       // 输出: second: 2
```

**包装类的常用方法：**
```java
// Integer类的常用方法
Integer num = 123;

// 转换为基本类型
int intValue = num.intValue();
long longValue = num.longValue();
float floatValue = num.floatValue();
double doubleValue = num.doubleValue();

// 输出结果
System.out.println("intValue: " + intValue);       // 输出: intValue: 123
System.out.println("longValue: " + longValue);     // 输出: longValue: 123
System.out.println("floatValue: " + floatValue);   // 输出: floatValue: 123.0
System.out.println("doubleValue: " + doubleValue); // 输出: doubleValue: 123.0

// 字符串转换
String str = num.toString();
String hexStr = Integer.toHexString(num);
String binaryStr = Integer.toBinaryString(num);
String octalStr = Integer.toOctalString(num);

// 输出结果
System.out.println("str: " + str);           // 输出: str: 123
System.out.println("hexStr: " + hexStr);     // 输出: hexStr: 7b
System.out.println("binaryStr: " + binaryStr); // 输出: binaryStr: 1111011
System.out.println("octalStr: " + octalStr); // 输出: octalStr: 173

// 解析字符串
int parsed1 = Integer.parseInt("123");
int parsed2 = Integer.parseInt("7b", 16);    // 十六进制
int parsed3 = Integer.parseInt("1111011", 2); // 二进制

// 输出结果
System.out.println("parsed1: " + parsed1);   // 输出: parsed1: 123
System.out.println("parsed2: " + parsed2);   // 输出: parsed2: 123
System.out.println("parsed3: " + parsed3);   // 输出: parsed3: 123

// 比较方法
int compare = Integer.compare(100, 200);
boolean equals = Integer.valueOf(100).equals(Integer.valueOf(100));

// 输出结果
System.out.println("compare: " + compare);   // 输出: compare: -1 (100 < 200)
System.out.println("equals: " + equals);     // 输出: equals: true

// 最大最小值
int max = Integer.max(100, 200);
int min = Integer.min(100, 200);
int sum = Integer.sum(100, 200);

// 输出结果
System.out.println("max: " + max);           // 输出: max: 200
System.out.println("min: " + min);           // 输出: min: 100
System.out.println("sum: " + sum);           // 输出: sum: 300
```

**Character类的特殊方法：**
```java
char ch = 'A';

// 字符类型判断
boolean isLetter = Character.isLetter(ch);
boolean isDigit = Character.isDigit('5');
boolean isWhitespace = Character.isWhitespace(' ');
boolean isUpperCase = Character.isUpperCase(ch);
boolean isLowerCase = Character.isLowerCase('a');

// 输出结果
System.out.println("isLetter: " + isLetter);         // 输出: isLetter: true
System.out.println("isDigit: " + isDigit);           // 输出: isDigit: true
System.out.println("isWhitespace: " + isWhitespace); // 输出: isWhitespace: true
System.out.println("isUpperCase: " + isUpperCase);   // 输出: isUpperCase: true
System.out.println("isLowerCase: " + isLowerCase);   // 输出: isLowerCase: true

// 字符转换
char upper = Character.toUpperCase('a');
char lower = Character.toLowerCase('A');
int digit = Character.getNumericValue('9');

// 输出结果
System.out.println("upper: " + upper);       // 输出: upper: A
System.out.println("lower: " + lower);       // 输出: lower: a
System.out.println("digit: " + digit);       // 输出: digit: 9

// 字符分类
boolean isJavaIdentifierStart = Character.isJavaIdentifierStart('_');
boolean isJavaIdentifierPart = Character.isJavaIdentifierPart('$');

// 输出结果
System.out.println("isJavaIdentifierStart: " + isJavaIdentifierStart); // 输出: isJavaIdentifierStart: true
System.out.println("isJavaIdentifierPart: " + isJavaIdentifierPart);   // 输出: isJavaIdentifierPart: true
```

**包装类的缓存机制：**
```java
// Integer缓存（-128到127）
Integer a = 100;
Integer b = 100;
Integer c = 200;
Integer d = 200;

// 输出结果
System.out.println("a == b: " + (a == b));   // 输出: a == b: true（缓存）
System.out.println("c == d: " + (c == d));   // 输出: c == d: false（未缓存）

// 使用equals比较
System.out.println("a.equals(b): " + a.equals(b)); // 输出: a.equals(b): true
System.out.println("c.equals(d): " + c.equals(d)); // 输出: c.equals(d): true

// Boolean缓存（只有true和false两个值）
Boolean bool1 = true;
Boolean bool2 = true;
Boolean bool3 = new Boolean(true);

// 输出结果
System.out.println("bool1 == bool2: " + (bool1 == bool2));     // 输出: bool1 == bool2: true
System.out.println("bool1 == bool3: " + (bool1 == bool3));     // 输出: bool1 == bool3: false
System.out.println("bool1.equals(bool3): " + bool1.equals(bool3)); // 输出: bool1.equals(bool3): true
```

**包装类的实用工具类：**
```java
public class WrapperUtils {
    
    // 安全转换字符串为整数
    public static Integer safeParseInt(String str) {
        try {
            return Integer.parseInt(str);
        } catch (NumberFormatException e) {
            return null;
        }
    }
    
    // 安全转换字符串为长整数
    public static Long safeParseLong(String str) {
        try {
            return Long.parseLong(str);
        } catch (NumberFormatException e) {
            return null;
        }
    }
    
    // 安全转换字符串为双精度浮点数
    public static Double safeParseDouble(String str) {
        try {
            return Double.parseDouble(str);
        } catch (NumberFormatException e) {
            return null;
        }
    }
    
    // 检查字符串是否为有效数字
    public static boolean isValidNumber(String str) {
        if (str == null || str.trim().isEmpty()) {
            return false;
        }
        try {
            Double.parseDouble(str);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }
    
    // 获取数字的位数
    public static int getDigitCount(int number) {
        if (number == 0) return 1;
        return (int) Math.log10(Math.abs(number)) + 1;
    }
    
    // 获取数字的各位数字
    public static int[] getDigits(int number) {
        int count = getDigitCount(number);
        int[] digits = new int[count];
        int temp = Math.abs(number);
        
        for (int i = count - 1; i >= 0; i--) {
            digits[i] = temp % 10;
            temp /= 10;
        }
        
        return digits;
    }
    
    // 检查字符是否为元音字母
    public static boolean isVowel(char ch) {
        char lower = Character.toLowerCase(ch);
        return lower == 'a' || lower == 'e' || lower == 'i' || 
               lower == 'o' || lower == 'u';
    }
    
    // 统计字符串中各种字符的数量
    public static void analyzeString(String str) {
        if (str == null) {
            System.out.println("字符串为null");
            return;
        }
        
        int letters = 0, digits = 0, spaces = 0, others = 0;
        
        for (char ch : str.toCharArray()) {
            if (Character.isLetter(ch)) {
                letters++;
            } else if (Character.isDigit(ch)) {
                digits++;
            } else if (Character.isWhitespace(ch)) {
                spaces++;
            } else {
                others++;
            }
        }
        
        System.out.println("字符串分析结果:");
        System.out.println("  字母: " + letters);
        System.out.println("  数字: " + digits);
        System.out.println("  空格: " + spaces);
        System.out.println("  其他: " + others);
    }
    
    // 格式化数字
    public static String formatNumber(Number number, String pattern) {
        if (number == null) return "null";
        
        java.text.DecimalFormat df = new java.text.DecimalFormat(pattern);
        return df.format(number);
    }
    
    // 生成随机包装类对象
    public static Integer randomInteger(int min, int max) {
        return (int)(Math.random() * (max - min + 1)) + min;
    }
    
    public static Double randomDouble(double min, double max) {
        return min + (Math.random() * (max - min));
    }
    
    public static Boolean randomBoolean() {
        return Math.random() < 0.5;
    }
}

// 使用示例
public class WrapperUtilsExample {
    public static void main(String[] args) {
        // 安全解析
        System.out.println("safeParseInt('123'): " + WrapperUtils.safeParseInt("123")); // 输出: 123
        System.out.println("safeParseInt('abc'): " + WrapperUtils.safeParseInt("abc")); // 输出: null
        
        // 数字验证
        System.out.println("isValidNumber('123.45'): " + WrapperUtils.isValidNumber("123.45")); // 输出: true
        System.out.println("isValidNumber('abc'): " + WrapperUtils.isValidNumber("abc")); // 输出: false
        
        // 数字分析
        int number = 12345;
        System.out.println("位数: " + WrapperUtils.getDigitCount(number)); // 输出: 位数: 5
        System.out.println("各位数字: " + Arrays.toString(WrapperUtils.getDigits(number))); // 输出: 各位数字: [1, 2, 3, 4, 5]
        
        // 字符分析
        WrapperUtils.analyzeString("Hello World 123!");
        // 输出:
        // 字符串分析结果:
        //   字母: 10
        //   数字: 3
        //   空格: 2
        //   其他: 1
        
        // 格式化
        System.out.println("格式化: " + WrapperUtils.formatNumber(1234.5678, "#,##0.00")); // 输出: 格式化: 1,234.57
        
        // 随机生成
        System.out.println("随机整数: " + WrapperUtils.randomInteger(1, 100)); // 输出: 随机整数: 45
        System.out.println("随机浮点数: " + WrapperUtils.randomDouble(0.0, 1.0)); // 输出: 随机浮点数: 0.123456789
        System.out.println("随机布尔值: " + WrapperUtils.randomBoolean()); // 输出: 随机布尔值: true
    }
}
```

**包装类的性能考虑：**
```java
public class WrapperPerformance {
    
    // 性能测试：基本类型 vs 包装类
    public static void performanceTest() {
        int iterations = 10000000;
        
        // 基本类型测试
        long startTime = System.currentTimeMillis();
        int sum = 0;
        for (int i = 0; i < iterations; i++) {
            sum += i;
        }
        long endTime = System.currentTimeMillis();
        System.out.println("基本类型耗时: " + (endTime - startTime) + "ms");
        
        // 包装类测试
        startTime = System.currentTimeMillis();
        Integer sumObj = 0;
        for (int i = 0; i < iterations; i++) {
            sumObj += i; // 自动装箱和拆箱
        }
        endTime = System.currentTimeMillis();
        System.out.println("包装类耗时: " + (endTime - startTime) + "ms");
        
        // 输出结果示例:
        // 基本类型耗时: 5ms
        // 包装类耗时: 45ms
    }
    
    // 避免不必要的装箱拆箱
    public static void avoidUnnecessaryBoxing() {
        // 不好的做法
        Integer sum = 0;
        for (int i = 0; i < 1000; i++) {
            sum += i; // 每次循环都有装箱和拆箱
        }
        
        // 好的做法
        int sum2 = 0;
        for (int i = 0; i < 1000; i++) {
            sum2 += i; // 使用基本类型
        }
        Integer result = sum2; // 最后才装箱
    }
    
    // 使用valueOf而不是构造方法
    public static void useValueOf() {
        // 推荐
        Integer good = Integer.valueOf(100);
        Double good2 = Double.valueOf(3.14);
        
        // 不推荐（已过时）
        // Integer bad = new Integer(100);
        // Double bad2 = new Double(3.14);
    }
}
```

**包装类的常见陷阱：**
```java
public class WrapperTraps {
    
    public static void demonstrateTraps() {
        // 陷阱1：null值拆箱
        Integer nullInt = null;
        try {
            int value = nullInt; // NullPointerException
        } catch (NullPointerException e) {
            System.out.println("陷阱1：null值拆箱会抛出NullPointerException");
        }
        
        // 陷阱2：比较时使用==而不是equals
        Integer a = 100;
        Integer b = 100;
        Integer c = 200;
        Integer d = 200;
        
        System.out.println("a == b: " + (a == b)); // true（缓存）
        System.out.println("c == d: " + (c == d)); // false（未缓存）
        System.out.println("c.equals(d): " + c.equals(d)); // true
        
        // 陷阱3：自动装箱的性能问题
        Long sum = 0L;
        for (long i = 0; i < 1000000; i++) {
            sum += i; // 每次都有装箱和拆箱
        }
        
        // 更好的做法
        long sum2 = 0L;
        for (long i = 0; i < 1000000; i++) {
            sum2 += i; // 使用基本类型
        }
        Long result = sum2; // 最后才装箱
        
        // 陷阱4：包装类不可变
        Integer num = 100;
        num = 200; // 不是修改原对象，而是创建新对象
        
        // 陷阱5：类型转换问题
        Double dbl = 3.14;
        int intValue = dbl.intValue(); // 截断小数部分
        System.out.println("intValue: " + intValue); // 输出: 3
    }
}
```

**包装类的最佳实践：**
```java
public class WrapperBestPractices {
    
    // 1. 优先使用基本类型
    public static void preferPrimitives() {
        // 好的做法
        int[] numbers = new int[1000];
        double sum = 0.0;
        
        // 避免
        // Integer[] numbers = new Integer[1000];
        // Double sum = 0.0;
    }
    
    // 2. 在集合中使用包装类
    public static void useWrappersInCollections() {
        List<Integer> numbers = new ArrayList<>();
        Map<String, Double> prices = new HashMap<>();
        
        numbers.add(100); // 自动装箱
        prices.put("apple", 2.99); // 自动装箱
    }
    
    // 3. 使用equals比较包装类
    public static void compareWrappers() {
        Integer a = 100;
        Integer b = 100;
        
        // 正确的比较方式
        boolean equals = a.equals(b);
        int compare = a.compareTo(b);
        
        // 避免使用==（除非是缓存范围内的值）
    }
    
    // 4. 处理null值
    public static Integer safeUnboxing(Integer wrapper) {
        return wrapper != null ? wrapper : 0; // 提供默认值
    }
    
    // 5. 使用工具方法
    public static void useUtilityMethods() {
        // 字符串解析
        int num = Integer.parseInt("123");
        double dbl = Double.parseDouble("3.14");
        
        // 格式化
        String hex = Integer.toHexString(255);
        String binary = Integer.toBinaryString(255);
        
        // 比较
        int max = Integer.max(10, 20);
        int min = Integer.min(10, 20);
    }
    
    // 6. 性能优化
    public static void performanceOptimization() {
        // 避免在循环中频繁装箱拆箱
        int sum = 0;
        for (int i = 0; i < 1000000; i++) {
            sum += i; // 使用基本类型
        }
        Integer result = sum; // 最后装箱
        
        // 使用缓存
        Integer cached = Integer.valueOf(100); // 使用缓存
        Integer notCached = Integer.valueOf(200); // 不在缓存范围内
    }
}
```

**包装类的注意事项：**

1. **性能考虑**：
   - 基本类型比包装类性能更好
   - 避免在循环中频繁装箱拆箱
   - 优先使用基本类型进行数值计算

2. **null值处理**：
   - 包装类可以为null，基本类型不能
   - 拆箱前要检查null值
   - 提供默认值处理null情况

3. **比较操作**：
   - 使用equals()比较包装类内容
   - 使用compareTo()进行排序
   - 避免使用==比较（除非是缓存值）

4. **缓存机制**：
   - Integer缓存-128到127
   - Boolean缓存true和false
   - Character缓存0到127
   - 使用valueOf()方法利用缓存

5. **不可变性**：
   - 所有包装类都是不可变的
   - 修改操作会创建新对象
   - 适合作为Map的键

6. **应用场景**：
   - 集合中存储数值
   - 需要null值的场景
   - 反射和泛型中使用
   - 数据库操作中的null处理

##### 7.10 Lambda表达式

**Lambda表达式基础：**
```java
// Lambda表达式语法：(参数列表) -> {表达式或语句块}

// 1. 无参数Lambda表达式
Runnable runnable = () -> System.out.println("Hello Lambda");
runnable.run(); // 输出: Hello Lambda

// 2. 单参数Lambda表达式
Consumer<String> consumer = (str) -> System.out.println("接收: " + str);
consumer.accept("Hello"); // 输出: 接收: Hello

// 3. 多参数Lambda表达式
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
int result = add.apply(5, 3);
System.out.println("结果: " + result); // 输出: 结果: 8

// 4. 带类型声明的Lambda表达式
BiFunction<String, String, String> concat = (String a, String b) -> a + b;
String result2 = concat.apply("Hello", " World");
System.out.println("拼接结果: " + result2); // 输出: 拼接结果: Hello World

// 5. 多行Lambda表达式
Consumer<String> multiLine = (str) -> {
    System.out.println("处理字符串: " + str);
    System.out.println("字符串长度: " + str.length());
    System.out.println("转换为大写: " + str.toUpperCase());
};
multiLine.accept("hello world");
// 输出:
// 处理字符串: hello world
// 字符串长度: 11
// 转换为大写: HELLO WORLD
```

**函数式接口：**
```java
// 自定义函数式接口
@FunctionalInterface
interface MathOperation {
    int operate(int a, int b);
}

@FunctionalInterface
interface StringProcessor {
    String process(String input);
}

// 使用自定义函数式接口
MathOperation add = (a, b) -> a + b;
MathOperation subtract = (a, b) -> a - b;
MathOperation multiply = (a, b) -> a * b;
MathOperation divide = (a, b) -> a / b;

// 输出结果
System.out.println("加法: " + add.operate(10, 5));      // 输出: 加法: 15
System.out.println("减法: " + subtract.operate(10, 5)); // 输出: 减法: 5
System.out.println("乘法: " + multiply.operate(10, 5)); // 输出: 乘法: 50
System.out.println("除法: " + divide.operate(10, 5));   // 输出: 除法: 2

// 字符串处理
StringProcessor upper = str -> str.toUpperCase();
StringProcessor reverse = str -> new StringBuilder(str).reverse().toString();
StringProcessor addPrefix = str -> "处理后的: " + str;

// 输出结果
System.out.println("大写: " + upper.process("hello"));           // 输出: 大写: HELLO
System.out.println("反转: " + reverse.process("hello"));         // 输出: 反转: olleh
System.out.println("加前缀: " + addPrefix.process("hello"));     // 输出: 加前缀: 处理后的: hello
```

**Java内置函数式接口：**
```java
import java.util.function.*;
import java.util.*;

// Predicate<T> - 断言接口
Predicate<String> isLongerThan5 = str -> str.length() > 5;
Predicate<String> startsWithA = str -> str.startsWith("A");
Predicate<String> isLongerThan5AndStartsWithA = isLongerThan5.and(startsWithA);

// 输出结果
System.out.println("长度大于5: " + isLongerThan5.test("Hello"));     // 输出: 长度大于5: false
System.out.println("长度大于5: " + isLongerThan5.test("Hello World")); // 输出: 长度大于5: true
System.out.println("以A开头且长度大于5: " + isLongerThan5AndStartsWithA.test("Apple")); // 输出: 以A开头且长度大于5: false

// Function<T, R> - 函数接口
Function<String, Integer> getLength = str -> str.length();
Function<String, String> toUpperCase = str -> str.toUpperCase();
Function<String, String> addExclamation = str -> str + "!";

// 函数组合
Function<String, String> combined = getLength.andThen(length -> "长度: " + length);
Function<String, String> pipeline = toUpperCase.andThen(addExclamation);

// 输出结果
System.out.println("长度: " + getLength.apply("Hello"));           // 输出: 长度: 5
System.out.println("组合结果: " + combined.apply("Hello"));        // 输出: 组合结果: 长度: 5
System.out.println("管道处理: " + pipeline.apply("hello"));        // 输出: 管道处理: HELLO!

// Consumer<T> - 消费者接口
Consumer<String> print = str -> System.out.println("打印: " + str);
Consumer<String> printLength = str -> System.out.println("长度: " + str.length());
Consumer<String> combinedConsumer = print.andThen(printLength);

// 输出结果
combinedConsumer.accept("Hello");
// 输出:
// 打印: Hello
// 长度: 5

// Supplier<T> - 供应者接口
Supplier<Double> randomDouble = () -> Math.random();
Supplier<String> currentTime = () -> new Date().toString();
Supplier<List<String>> emptyList = ArrayList::new;

// 输出结果
System.out.println("随机数: " + randomDouble.get());     // 输出: 随机数: 0.123456789
System.out.println("当前时间: " + currentTime.get());   // 输出: 当前时间: Wed May 15 20:30:45 CST 2025
System.out.println("空列表: " + emptyList.get());       // 输出: 空列表: []

// BiFunction<T, U, R> - 双参数函数接口
BiFunction<String, String, String> concat = (a, b) -> a + b;
BiFunction<Integer, Integer, Integer> max = Math::max;
BiFunction<String, Integer, String> repeat = (str, times) -> str.repeat(times);

// 输出结果
System.out.println("拼接: " + concat.apply("Hello", " World")); // 输出: 拼接: Hello World
System.out.println("最大值: " + max.apply(10, 20));             // 输出: 最大值: 20
System.out.println("重复: " + repeat.apply("Ha", 3));           // 输出: 重复: HaHaHa
```

**Lambda表达式在集合中的应用：**
```java
import java.util.*;
import java.util.stream.Collectors;

List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Eve");

// 1. forEach - 遍历
System.out.println("=== forEach遍历 ===");
names.forEach(name -> System.out.println("名字: " + name));
// 输出:
// 名字: Alice
// 名字: Bob
// 名字: Charlie
// 名字: David
// 名字: Eve

// 2. removeIf - 条件删除
List<String> namesCopy = new ArrayList<>(names);
namesCopy.removeIf(name -> name.length() < 4);
System.out.println("删除短名字后: " + namesCopy); // 输出: 删除短名字后: [Alice, Charlie, David]

// 3. replaceAll - 批量替换
List<String> namesCopy2 = new ArrayList<>(names);
namesCopy2.replaceAll(name -> name.toUpperCase());
System.out.println("转换为大写: " + namesCopy2); // 输出: 转换为大写: [ALICE, BOB, CHARLIE, DAVID, EVE]

// 4. sort - 排序
List<String> namesCopy3 = new ArrayList<>(names);
namesCopy3.sort((a, b) -> a.compareTo(b)); // 按字母顺序排序
System.out.println("排序后: " + namesCopy3); // 输出: 排序后: [Alice, Bob, Charlie, David, Eve]

// 按长度排序
namesCopy3.sort((a, b) -> Integer.compare(a.length(), b.length()));
System.out.println("按长度排序: " + namesCopy3); // 输出: 按长度排序: [Bob, Eve, Alice, David, Charlie]

// 5. Map操作
Map<String, Integer> scores = new HashMap<>();
scores.put("Alice", 85);
scores.put("Bob", 92);
scores.put("Charlie", 78);

// 遍历Map
System.out.println("=== Map遍历 ===");
scores.forEach((name, score) -> System.out.println(name + ": " + score));
// 输出:
// Alice: 85
// Bob: 92
// Charlie: 78

// 条件操作
scores.entrySet().removeIf(entry -> entry.getValue() < 80);
System.out.println("删除低分后: " + scores); // 输出: 删除低分后: {Alice=85, Bob=92}

// 6. Stream API与Lambda
System.out.println("=== Stream操作 ===");

// 过滤
List<String> longNames = names.stream()
    .filter(name -> name.length() > 4)
    .collect(Collectors.toList());
System.out.println("长名字: " + longNames); // 输出: 长名字: [Alice, Charlie, David]

// 映射
List<Integer> nameLengths = names.stream()
    .map(String::length)
    .collect(Collectors.toList());
System.out.println("名字长度: " + nameLengths); // 输出: 名字长度: [5, 3, 7, 5, 3]

// 归约
int totalLength = names.stream()
    .mapToInt(String::length)
    .sum();
System.out.println("总长度: " + totalLength); // 输出: 总长度: 23

// 分组
Map<Integer, List<String>> groupedByLength = names.stream()
    .collect(Collectors.groupingBy(String::length));
System.out.println("按长度分组: " + groupedByLength); // 输出: 按长度分组: {3=[Bob, Eve], 5=[Alice, David], 7=[Charlie]}
```

**Lambda表达式的高级用法：**
```java
import java.util.*;
import java.util.concurrent.*;
import java.util.function.*;

// 1. 方法引用
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");

// 静态方法引用
names.forEach(System.out::println);
// 输出:
// Alice
// Bob
// Charlie

// 实例方法引用
names.forEach(String::toUpperCase);
names.stream().map(String::length).forEach(System.out::println);

// 构造方法引用
Supplier<ArrayList<String>> listSupplier = ArrayList::new;
ArrayList<String> newList = listSupplier.get();

// 2. 闭包和变量捕获
int factor = 10;
Function<Integer, Integer> multiplier = x -> x * factor;
System.out.println("乘以因子: " + multiplier.apply(5)); // 输出: 乘以因子: 50

// 注意：捕获的变量必须是final或effectively final
// int mutableFactor = 10;
// Function<Integer, Integer> badMultiplier = x -> x * mutableFactor; // 编译错误
// mutableFactor = 20; // 如果这行存在，上面的Lambda表达式会编译错误

// 3. 异常处理
Function<String, Integer> safeParseInt = str -> {
    try {
        return Integer.parseInt(str);
    } catch (NumberFormatException e) {
        return 0;
    }
};

System.out.println("安全解析: " + safeParseInt.apply("123")); // 输出: 安全解析: 123
System.out.println("安全解析: " + safeParseInt.apply("abc")); // 输出: 安全解析: 0

// 4. 递归Lambda
// 使用函数式接口实现递归
Function<Integer, Integer> factorial = new Function<Integer, Integer>() {
    @Override
    public Integer apply(Integer n) {
        return n <= 1 ? 1 : n * this.apply(n - 1);
    }
};

System.out.println("阶乘: " + factorial.apply(5)); // 输出: 阶乘: 120

// 5. 组合模式
Function<String, String> pipeline = ((Function<String, String>) String::toUpperCase)
    .andThen(str -> str + "!")
    .andThen(str -> "处理结果: " + str);

System.out.println("管道处理: " + pipeline.apply("hello")); // 输出: 管道处理: 处理结果: HELLO!

// 6. 条件Lambda
Predicate<String> isLong = str -> str.length() > 5;
Predicate<String> startsWithA = str -> str.startsWith("A");

Function<String, String> conditionalProcessor = str -> {
    if (isLong.test(str)) {
        return str.toUpperCase();
    } else if (startsWithA.test(str)) {
        return str.toLowerCase();
    } else {
        return str + " (默认处理)";
    }
};

System.out.println("条件处理1: " + conditionalProcessor.apply("Hello World")); // 输出: 条件处理1: HELLO WORLD
System.out.println("条件处理2: " + conditionalProcessor.apply("Apple"));      // 输出: 条件处理2: apple
System.out.println("条件处理3: " + conditionalProcessor.apply("Hi"));         // 输出: 条件处理3: Hi (默认处理)
```

**Lambda表达式的性能优化：**
```java
import java.util.*;
import java.util.stream.*;

public class LambdaPerformance {
    
    // 1. 避免在循环中创建Lambda
    public static void avoidLambdaInLoop() {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
        
        // 不好的做法：每次循环都创建新的Lambda
        for (String name : names) {
            Consumer<String> printer = str -> System.out.println("名字: " + str);
            printer.accept(name);
        }
        
        // 好的做法：预先定义Lambda
        Consumer<String> printer = str -> System.out.println("名字: " + str);
        for (String name : names) {
            printer.accept(name);
        }
        
        // 更好的做法：使用forEach
        names.forEach(str -> System.out.println("名字: " + str));
    }
    
    // 2. 使用并行流提高性能
    public static void parallelStreamExample() {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        
        // 顺序流
        long startTime = System.currentTimeMillis();
        int sum = numbers.stream()
            .mapToInt(Integer::intValue)
            .sum();
        long endTime = System.currentTimeMillis();
        System.out.println("顺序流耗时: " + (endTime - startTime) + "ms");
        
        // 并行流
        startTime = System.currentTimeMillis();
        int sumParallel = numbers.parallelStream()
            .mapToInt(Integer::intValue)
            .sum();
        endTime = System.currentTimeMillis();
        System.out.println("并行流耗时: " + (endTime - startTime) + "ms");
    }
    
    // 3. 缓存Lambda表达式
    public static void cacheLambda() {
        // 缓存常用的Lambda表达式
        Function<String, String> upperCase = String::toUpperCase;
        Function<String, String> addExclamation = str -> str + "!";
        Predicate<String> isLong = str -> str.length() > 5;
        
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");
        
        // 重用缓存的Lambda
        names.stream()
            .filter(isLong)
            .map(upperCase)
            .map(addExclamation)
            .forEach(System.out::println);
    }
    
    // 4. 避免不必要的装箱拆箱
    public static void avoidBoxing() {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // 不好的做法：有装箱拆箱
        int sum = numbers.stream()
            .mapToInt(Integer::intValue) // 避免装箱
            .sum();
        
        // 更好的做法：直接使用基本类型
        int[] primitiveNumbers = {1, 2, 3, 4, 5};
        int sum2 = Arrays.stream(primitiveNumbers)
            .sum();
    }
}

// 使用示例
public class LambdaPerformanceExample {
    public static void main(String[] args) {
        // 性能测试
        LambdaPerformance.avoidLambdaInLoop();
        LambdaPerformance.parallelStreamExample();
        LambdaPerformance.cacheLambda();
        LambdaPerformance.avoidBoxing();
    }
}
```

**Lambda表达式的实用工具类：**
```java
import java.util.*;
import java.util.function.*;
import java.util.stream.Collectors;

public class LambdaUtils {
    
    // 1. 安全的函数执行
    public static <T, R> Optional<R> safeApply(Function<T, R> function, T input) {
        try {
            return Optional.of(function.apply(input));
        } catch (Exception e) {
            return Optional.empty();
        }
    }
    
    // 2. 重试机制
    public static <T> T retry(Supplier<T> supplier, int maxAttempts) {
        for (int i = 0; i < maxAttempts; i++) {
            try {
                return supplier.get();
            } catch (Exception e) {
                if (i == maxAttempts - 1) {
                    throw new RuntimeException("重试失败", e);
                }
            }
        }
        throw new RuntimeException("重试失败");
    }
    
    // 3. 条件执行
    public static <T> Optional<T> executeIf(Predicate<T> condition, Function<T, T> action, T input) {
        return condition.test(input) ? Optional.of(action.apply(input)) : Optional.of(input);
    }
    
    // 4. 管道处理
    @SafeVarargs
    public static <T> Function<T, T> pipeline(Function<T, T>... functions) {
        return Arrays.stream(functions)
            .reduce(Function.identity(), Function::andThen);
    }
    
    // 5. 批量处理
    public static <T, R> List<R> batchProcess(List<T> items, Function<T, R> processor, int batchSize) {
        return items.stream()
            .collect(Collectors.groupingBy(item -> items.indexOf(item) / batchSize))
            .values()
            .stream()
            .flatMap(batch -> batch.stream().map(processor))
            .collect(Collectors.toList());
    }
    
    // 6. 异步执行
    public static <T> CompletableFuture<T> asyncExecute(Supplier<T> supplier) {
        return CompletableFuture.supplyAsync(supplier);
    }
    
    // 7. 缓存函数结果
    public static <T, R> Function<T, R> memoize(Function<T, R> function) {
        Map<T, R> cache = new ConcurrentHashMap<>();
        return input -> cache.computeIfAbsent(input, function);
    }
    
    // 8. 组合多个谓词
    @SafeVarargs
    public static <T> Predicate<T> allOf(Predicate<T>... predicates) {
        return Arrays.stream(predicates)
            .reduce(Predicate::and)
            .orElse(x -> true);
    }
    
    @SafeVarargs
    public static <T> Predicate<T> anyOf(Predicate<T>... predicates) {
        return Arrays.stream(predicates)
            .reduce(Predicate::or)
            .orElse(x -> false);
    }
    
    // 9. 函数柯里化
    public static <T, U, R> Function<T, Function<U, R>> curry(BiFunction<T, U, R> function) {
        return t -> u -> function.apply(t, u);
    }
    
    // 10. 部分应用
    public static <T, U, R> Function<U, R> partial(BiFunction<T, U, R> function, T first) {
        return u -> function.apply(first, u);
    }
}

// 使用示例
public class LambdaUtilsExample {
    public static void main(String[] args) {
        // 安全执行
        Optional<String> result = LambdaUtils.safeApply(
            str -> str.toUpperCase(), "hello");
        System.out.println("安全执行结果: " + result); // 输出: 安全执行结果: Optional[HELLO]
        
        // 重试机制
        String retryResult = LambdaUtils.retry(
            () -> "成功", 3);
        System.out.println("重试结果: " + retryResult); // 输出: 重试结果: 成功
        
        // 条件执行
        Optional<String> conditionalResult = LambdaUtils.executeIf(
            str -> str.length() > 3,
            str -> str.toUpperCase(),
            "hello");
        System.out.println("条件执行结果: " + conditionalResult); // 输出: 条件执行结果: Optional[HELLO]
        
        // 管道处理
        Function<String, String> pipeline = LambdaUtils.pipeline(
            String::toUpperCase,
            str -> str + "!",
            str -> "处理结果: " + str
        );
        System.out.println("管道处理: " + pipeline.apply("hello")); // 输出: 管道处理: 处理结果: HELLO!
        
        // 批量处理
        List<String> items = Arrays.asList("a", "b", "c", "d", "e");
        List<String> processed = LambdaUtils.batchProcess(
            items, str -> str.toUpperCase(), 2);
        System.out.println("批量处理结果: " + processed); // 输出: 批量处理结果: [A, B, C, D, E]
        
        // 组合谓词
        Predicate<String> combined = LambdaUtils.allOf(
            str -> str.length() > 3,
            str -> str.startsWith("h")
        );
        System.out.println("组合谓词测试: " + combined.test("hello")); // 输出: 组合谓词测试: true
        
        // 柯里化
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
        Function<Integer, Function<Integer, Integer>> curriedAdd = LambdaUtils.curry(add);
        Function<Integer, Integer> addFive = curriedAdd.apply(5);
        System.out.println("柯里化结果: " + addFive.apply(3)); // 输出: 柯里化结果: 8
    }
}
```

**Lambda表达式的注意事项：**

1. **语法规则**：
   - 参数类型可以省略（类型推断）
   - 单个参数可以省略括号
   - 单行表达式可以省略return和大括号
   - 多行表达式需要大括号和return

2. **变量捕获**：
   - 只能捕获final或effectively final的变量
   - 不能修改捕获的变量
   - 可以访问实例变量和静态变量

3. **性能考虑**：
   - 避免在循环中重复创建Lambda
   - 使用并行流提高性能
   - 缓存常用的Lambda表达式
   - 避免不必要的装箱拆箱

4. **常见陷阱**：
   - 变量捕获的限制
   - 异常处理
   - 递归Lambda的实现
   - 并发环境下的使用

5. **最佳实践**：
   - 优先使用方法引用
   - 合理使用函数式接口
   - 注意代码可读性
   - 适当使用Stream API

6. **应用场景**：
   - 集合操作和遍历
   - 事件处理
   - 异步编程
   - 函数式编程
   - 回调函数

##### 7.11 Apache Commons IO

**Commons IO简介：**
```java
// Maven依赖
<dependency>
    <groupId>commons-io</groupId>
    <artifactId>commons-io</artifactId>
    <version>2.15.1</version>
</dependency>

// Gradle依赖
implementation 'commons-io:commons-io:2.15.1'

// 主要包结构
import org.apache.commons.io.*;
import org.apache.commons.io.file.*;
import org.apache.commons.io.input.*;
import org.apache.commons.io.output.*;
import org.apache.commons.io.monitor.*;
```

**FileUtils工具类：**
```java
import org.apache.commons.io.FileUtils;
import java.io.*;
import java.nio.charset.StandardCharsets;

// 1. 文件读写操作
public class FileUtilsExample {
    
    public static void fileOperations() throws IOException {
        // 读取文件内容
        String content = FileUtils.readFileToString(new File("input.txt"), StandardCharsets.UTF_8);
        System.out.println("文件内容: " + content);
        
        // 写入文件内容
        FileUtils.writeStringToFile(new File("output.txt"), "Hello Commons IO", StandardCharsets.UTF_8);
        
        // 追加内容
        FileUtils.writeStringToFile(new File("output.txt"), "\n追加内容", StandardCharsets.UTF_8, true);
        
        // 读取文件为字节数组
        byte[] bytes = FileUtils.readFileToByteArray(new File("input.txt"));
        System.out.println("文件大小: " + bytes.length + " bytes");
        
        // 写入字节数组到文件
        FileUtils.writeByteArrayToFile(new File("output.bin"), bytes);
        
        // 按行读取文件
        List<String> lines = FileUtils.readLines(new File("input.txt"), StandardCharsets.UTF_8);
        lines.forEach(System.out::println);
        
        // 按行写入文件
        List<String> writeLines = Arrays.asList("第一行", "第二行", "第三行");
        FileUtils.writeLines(new File("lines.txt"), writeLines, StandardCharsets.UTF_8);
    }
    
    // 2. 文件操作
    public static void fileManipulation() throws IOException {
        File source = new File("source.txt");
        File dest = new File("dest.txt");
        
        // 复制文件
        FileUtils.copyFile(source, dest);
        System.out.println("文件复制完成");
        
        // 复制目录
        FileUtils.copyDirectory(new File("sourceDir"), new File("destDir"));
        System.out.println("目录复制完成");
        
        // 移动文件
        FileUtils.moveFile(source, new File("moved.txt"));
        System.out.println("文件移动完成");
        
        // 删除文件或目录
        FileUtils.deleteQuietly(new File("temp.txt")); // 静默删除，不抛异常
        FileUtils.forceDelete(new File("tempDir"));    // 强制删除，抛异常
        
        // 创建目录
        FileUtils.forceMkdir(new File("newDir"));
        System.out.println("目录创建完成");
        
        // 清理目录
        FileUtils.cleanDirectory(new File("tempDir")); // 删除目录内容，保留目录
        System.out.println("目录清理完成");
    }
    
    // 3. 文件信息
    public static void fileInfo() throws IOException {
        File file = new File("example.txt");
        
        // 获取文件大小
        long size = FileUtils.sizeOf(file);
        System.out.println("文件大小: " + size + " bytes");
        
        // 获取目录大小
        long dirSize = FileUtils.sizeOfDirectory(new File("exampleDir"));
        System.out.println("目录大小: " + dirSize + " bytes");
        
        // 获取文件大小（人类可读格式）
        String humanReadableSize = FileUtils.byteCountToDisplaySize(size);
        System.out.println("可读大小: " + humanReadableSize);
        
        // 检查文件是否为空
        boolean isEmpty = FileUtils.isEmptyDirectory(new File("emptyDir"));
        System.out.println("目录是否为空: " + isEmpty);
        
        // 获取文件修改时间
        Date lastModified = new Date(file.lastModified());
        System.out.println("最后修改时间: " + lastModified);
    }
    
    // 4. 文件比较
    public static void fileComparison() throws IOException {
        File file1 = new File("file1.txt");
        File file2 = new File("file2.txt");
        
        // 比较文件内容
        boolean isEqual = FileUtils.contentEquals(file1, file2);
        System.out.println("文件内容是否相同: " + isEqual);
        
        // 比较文件内容（忽略行结束符）
        boolean isEqualIgnoreEOL = FileUtils.contentEqualsIgnoreEOL(file1, file2, StandardCharsets.UTF_8);
        System.out.println("文件内容是否相同（忽略行结束符）: " + isEqualIgnoreEOL);
    }
}
```

**IOUtils工具类：**
```java
import org.apache.commons.io.IOUtils;
import java.io.*;
import java.net.URL;
import java.nio.charset.StandardCharsets;

public class IOUtilsExample {
    
    // 1. 流操作
    public static void streamOperations() throws IOException {
        // 复制流
        InputStream input = new FileInputStream("input.txt");
        OutputStream output = new FileOutputStream("output.txt");
        IOUtils.copy(input, output);
        IOUtils.closeQuietly(input, output);
        
        // 复制流（指定缓冲区大小）
        IOUtils.copy(input, output, 8192);
        
        // 复制流到字符串
        String content = IOUtils.toString(input, StandardCharsets.UTF_8);
        System.out.println("流内容: " + content);
        
        // 复制字符串到流
        IOUtils.write("Hello IOUtils", output, StandardCharsets.UTF_8);
        
        // 复制流到字节数组
        byte[] bytes = IOUtils.toByteArray(input);
        System.out.println("字节数组大小: " + bytes.length);
        
        // 复制字节数组到流
        IOUtils.write(bytes, output);
        
        // 按行读取
        List<String> lines = IOUtils.readLines(input, StandardCharsets.UTF_8);
        lines.forEach(System.out::println);
        
        // 按行写入
        IOUtils.writeLines(lines, "\n", output, StandardCharsets.UTF_8);
    }
    
    // 2. 网络操作
    public static void networkOperations() throws IOException {
        // 从URL读取内容
        URL url = new URL("https://www.example.com");
        String content = IOUtils.toString(url, StandardCharsets.UTF_8);
        System.out.println("网页内容长度: " + content.length());
        
        // 从URL读取字节数组
        byte[] bytes = IOUtils.toByteArray(url);
        System.out.println("网页字节大小: " + bytes.length);
        
        // 下载文件
        try (InputStream input = url.openStream();
             FileOutputStream output = new FileOutputStream("downloaded.html")) {
            IOUtils.copy(input, output);
        }
    }
    
    // 3. 流转换
    public static void streamConversion() throws IOException {
        // 字符串转输入流
        String text = "Hello World";
        InputStream inputStream = IOUtils.toInputStream(text, StandardCharsets.UTF_8);
        
        // 字节数组转输入流
        byte[] bytes = "Hello Bytes".getBytes(StandardCharsets.UTF_8);
        InputStream byteStream = IOUtils.toInputStream(bytes);
        
        // 读取所有内容
        String allContent = IOUtils.toString(inputStream, StandardCharsets.UTF_8);
        System.out.println("转换后的内容: " + allContent);
    }
    
    // 4. 流监控
    public static void streamMonitoring() throws IOException {
        InputStream input = new FileInputStream("large.txt");
        
        // 创建带进度监控的流
        InputStream monitoredStream = new ProgressMonitorInputStream(
            null, "读取文件", input);
        
        // 读取内容
        String content = IOUtils.toString(monitoredStream, StandardCharsets.UTF_8);
        System.out.println("文件读取完成");
    }
}
```

**FilenameUtils工具类：**
```java
import org.apache.commons.io.FilenameUtils;
import java.io.File;

public class FilenameUtilsExample {
    
    public static void filenameOperations() {
        String path = "/home/user/documents/file.txt";
        
        // 获取文件名（不含路径）
        String name = FilenameUtils.getName(path);
        System.out.println("文件名: " + name); // 输出: file.txt
        
        // 获取文件名（不含扩展名）
        String baseName = FilenameUtils.getBaseName(path);
        System.out.println("文件名（不含扩展名）: " + baseName); // 输出: file
        
        // 获取扩展名
        String extension = FilenameUtils.getExtension(path);
        System.out.println("扩展名: " + extension); // 输出: txt
        
        // 获取完整路径（不含文件名）
        String fullPath = FilenameUtils.getFullPath(path);
        System.out.println("完整路径: " + fullPath); // 输出: /home/user/documents/
        
        // 获取路径（不含文件名）
        String pathOnly = FilenameUtils.getPath(path);
        System.out.println("路径: " + pathOnly); // 输出: home/user/documents/
        
        // 获取前缀
        String prefix = FilenameUtils.getPrefix(path);
        System.out.println("前缀: " + prefix); // 输出: /
        
        // 规范化路径
        String normalized = FilenameUtils.normalize(path);
        System.out.println("规范化路径: " + normalized);
        
        // 连接路径
        String joined = FilenameUtils.concat("/home/user", "documents/file.txt");
        System.out.println("连接路径: " + joined); // 输出: /home/user/documents/file.txt
        
        // 检查扩展名
        boolean isTxt = FilenameUtils.isExtension(path, "txt");
        System.out.println("是否为txt文件: " + isTxt); // 输出: true
        
        boolean isImage = FilenameUtils.isExtension(path, "jpg", "png", "gif");
        System.out.println("是否为图片文件: " + isImage); // 输出: false
        
        // 移除扩展名
        String withoutExt = FilenameUtils.removeExtension(path);
        System.out.println("移除扩展名: " + withoutExt); // 输出: /home/user/documents/file
        
        // 更改扩展名
        String newExt = FilenameUtils.getBaseName(path) + ".bak";
        System.out.println("新文件名: " + newExt); // 输出: file.bak
    }
}
```

**FileSystemUtils工具类：**
```java
import org.apache.commons.io.FileSystemUtils;
import java.io.IOException;

public class FileSystemUtilsExample {
    
    public static void fileSystemOperations() throws IOException {
        // 获取磁盘空间（字节）
        long freeSpace = FileSystemUtils.freeSpaceKb("/");
        System.out.println("可用空间: " + freeSpace + " KB");
        
        // 获取磁盘空间（MB）
        long freeSpaceMB = FileSystemUtils.freeSpaceKb("/") / 1024;
        System.out.println("可用空间: " + freeSpaceMB + " MB");
        
        // 获取磁盘空间（GB）
        long freeSpaceGB = FileSystemUtils.freeSpaceKb("/") / (1024 * 1024);
        System.out.println("可用空间: " + freeSpaceGB + " GB");
        
        // 检查磁盘空间是否足够
        long requiredSpace = 1024 * 1024; // 1GB in KB
        boolean hasEnoughSpace = FileSystemUtils.freeSpaceKb("/") > requiredSpace;
        System.out.println("是否有足够空间: " + hasEnoughSpace);
    }
}
```

**LineIterator工具类：**
```java
import org.apache.commons.io.LineIterator;
import org.apache.commons.io.FileUtils;
import java.io.File;
import java.io.IOException;

public class LineIteratorExample {
    
    public static void lineIteratorOperations() throws IOException {
        File file = new File("large.txt");
        
        // 使用LineIterator逐行读取大文件
        try (LineIterator lineIterator = FileUtils.lineIterator(file, "UTF-8")) {
            while (lineIterator.hasNext()) {
                String line = lineIterator.nextLine();
                // 处理每一行
                System.out.println("处理行: " + line);
                
                // 可以在这里添加处理逻辑
                if (line.startsWith("ERROR")) {
                    System.out.println("发现错误行: " + line);
                }
            }
        }
        
        // 统计行数
        try (LineIterator lineIterator = FileUtils.lineIterator(file, "UTF-8")) {
            int lineCount = 0;
            while (lineIterator.hasNext()) {
                lineIterator.nextLine();
                lineCount++;
            }
            System.out.println("文件总行数: " + lineCount);
        }
        
        // 查找特定行
        try (LineIterator lineIterator = FileUtils.lineIterator(file, "UTF-8")) {
            int lineNumber = 0;
            while (lineIterator.hasNext()) {
                lineNumber++;
                String line = lineIterator.nextLine();
                if (line.contains("target")) {
                    System.out.println("在第" + lineNumber + "行找到目标: " + line);
                    break;
                }
            }
        }
    }
}
```

**文件监控器：**
```java
import org.apache.commons.io.monitor.FileAlterationListener;
import org.apache.commons.io.monitor.FileAlterationListenerAdaptor;
import org.apache.commons.io.monitor.FileAlterationMonitor;
import org.apache.commons.io.monitor.FileAlterationObserver;
import java.io.File;

public class FileMonitorExample {
    
    public static void fileMonitoring() throws Exception {
        // 创建文件监听器
        FileAlterationListener listener = new FileAlterationListenerAdaptor() {
            @Override
            public void onFileCreate(File file) {
                System.out.println("文件创建: " + file.getName());
            }
            
            @Override
            public void onFileDelete(File file) {
                System.out.println("文件删除: " + file.getName());
            }
            
            @Override
            public void onFileChange(File file) {
                System.out.println("文件修改: " + file.getName());
            }
            
            @Override
            public void onDirectoryCreate(File directory) {
                System.out.println("目录创建: " + directory.getName());
            }
            
            @Override
            public void onDirectoryDelete(File directory) {
                System.out.println("目录删除: " + directory.getName());
            }
            
            @Override
            public void onDirectoryChange(File directory) {
                System.out.println("目录修改: " + directory.getName());
            }
        };
        
        // 创建观察者
        FileAlterationObserver observer = new FileAlterationObserver(
            new File("monitored_dir"), null, null);
        observer.addListener(listener);
        
        // 创建监控器
        FileAlterationMonitor monitor = new FileAlterationMonitor(1000); // 1秒检查一次
        monitor.addObserver(observer);
        
        // 启动监控
        monitor.start();
        System.out.println("文件监控已启动，监控目录: monitored_dir");
        
        // 运行一段时间后停止
        Thread.sleep(30000); // 运行30秒
        monitor.stop();
        System.out.println("文件监控已停止");
    }
}
```

**实用工具类组合使用：**
```java
import org.apache.commons.io.*;
import java.io.*;
import java.nio.charset.StandardCharsets;
import java.util.List;

public class CommonsIOUtils {
    
    // 1. 文件备份工具
    public static void backupFile(String sourcePath, String backupPath) throws IOException {
        File source = new File(sourcePath);
        File backup = new File(backupPath);
        
        if (source.exists()) {
            // 创建备份目录
            FileUtils.forceMkdirParent(backup);
            
            // 复制文件
            FileUtils.copyFile(source, backup);
            System.out.println("文件备份完成: " + backupPath);
        } else {
            System.out.println("源文件不存在: " + sourcePath);
        }
    }
    
    // 2. 批量文件处理
    public static void batchProcessFiles(String directory, String extension) throws IOException {
        File dir = new File(directory);
        if (!dir.exists() || !dir.isDirectory()) {
            System.out.println("目录不存在: " + directory);
            return;
        }
        
        // 获取所有指定扩展名的文件
        String[] files = dir.list((dir1, name) -> name.endsWith(extension));
        
        if (files != null) {
            for (String fileName : files) {
                File file = new File(dir, fileName);
                processFile(file);
            }
        }
    }
    
    private static void processFile(File file) throws IOException {
        // 读取文件内容
        String content = FileUtils.readFileToString(file, StandardCharsets.UTF_8);
        
        // 处理内容（示例：转换为大写）
        String processedContent = content.toUpperCase();
        
        // 写入处理后的内容
        FileUtils.writeStringToFile(file, processedContent, StandardCharsets.UTF_8);
        
        System.out.println("文件处理完成: " + file.getName());
    }
    
    // 3. 日志文件分析
    public static void analyzeLogFile(String logPath) throws IOException {
        File logFile = new File(logPath);
        
        if (!logFile.exists()) {
            System.out.println("日志文件不存在: " + logPath);
            return;
        }
        
        // 统计行数
        List<String> lines = FileUtils.readLines(logFile, StandardCharsets.UTF_8);
        int totalLines = lines.size();
        
        // 统计错误行数
        long errorLines = lines.stream()
            .filter(line -> line.contains("ERROR"))
            .count();
        
        // 统计警告行数
        long warningLines = lines.stream()
            .filter(line -> line.contains("WARN"))
            .count();
        
        // 统计信息行数
        long infoLines = lines.stream()
            .filter(line -> line.contains("INFO"))
            .count();
        
        System.out.println("日志文件分析结果:");
        System.out.println("  总行数: " + totalLines);
        System.out.println("  错误行数: " + errorLines);
        System.out.println("  警告行数: " + warningLines);
        System.out.println("  信息行数: " + infoLines);
        System.out.println("  文件大小: " + FileUtils.byteCountToDisplaySize(logFile.length()));
    }
    
    // 4. 文件同步工具
    public static void syncDirectories(String sourceDir, String targetDir) throws IOException {
        File source = new File(sourceDir);
        File target = new File(targetDir);
        
        if (!source.exists() || !source.isDirectory()) {
            System.out.println("源目录不存在: " + sourceDir);
            return;
        }
        
        // 创建目标目录
        FileUtils.forceMkdir(target);
        
        // 复制目录
        FileUtils.copyDirectory(source, target);
        System.out.println("目录同步完成: " + targetDir);
    }
    
    // 5. 文件清理工具
    public static void cleanupOldFiles(String directory, long maxAge) {
        File dir = new File(directory);
        if (!dir.exists() || !dir.isDirectory()) {
            System.out.println("目录不存在: " + directory);
            return;
        }
        
        File[] files = dir.listFiles();
        if (files != null) {
            long currentTime = System.currentTimeMillis();
            int deletedCount = 0;
            
            for (File file : files) {
                if (file.isFile()) {
                    long fileAge = currentTime - file.lastModified();
                    if (fileAge > maxAge) {
                        if (FileUtils.deleteQuietly(file)) {
                            deletedCount++;
                            System.out.println("删除旧文件: " + file.getName());
                        }
                    }
                }
            }
            
            System.out.println("清理完成，共删除 " + deletedCount + " 个文件");
        }
    }
}

// 使用示例
public class CommonsIOExample {
    public static void main(String[] args) {
        try {
            // 文件备份
            CommonsIOUtils.backupFile("important.txt", "backup/important.txt.bak");
            
            // 批量处理
            CommonsIOUtils.batchProcessFiles("documents", ".txt");
            
            // 日志分析
            CommonsIOUtils.analyzeLogFile("application.log");
            
            // 目录同步
            CommonsIOUtils.syncDirectories("source", "backup");
            
            // 清理旧文件（7天前）
            CommonsIOUtils.cleanupOldFiles("temp", 7 * 24 * 60 * 60 * 1000L);
            
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```

**Commons IO的注意事项：**

1. **性能考虑**：
   - 大文件操作时使用流式处理
   - 避免一次性加载大文件到内存
   - 使用LineIterator处理大文本文件

2. **异常处理**：
   - 使用closeQuietly方法安全关闭流
   - 处理IO异常和文件不存在异常
   - 使用try-with-resources语句

3. **字符编码**：
   - 明确指定字符编码，避免平台差异
   - 使用StandardCharsets常量
   - 处理编码异常

4. **文件操作**：
   - 检查文件存在性
   - 创建必要的目录
   - 处理文件权限问题

5. **最佳实践**：
   - 使用工具类简化代码
   - 合理使用文件监控
   - 注意跨平台兼容性

6. **应用场景**：
   - 文件操作和IO处理
   - 日志文件分析
   - 文件备份和同步
   - 批量文件处理
   - 文件监控和事件处理

##### 7.12 对象克隆

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
10. **包装类**：掌握基本类型与包装类的转换，理解装箱拆箱机制和性能优化
11. **Lambda表达式**：掌握函数式编程，理解Lambda语法、函数式接口和Stream API
12. **网络编程**：理解Socket编程和URL处理的基本原理

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

**包装类学习要点：**
- 掌握了基本数据类型与包装类的对应关系，理解装箱拆箱机制
- 熟练使用包装类的常用方法，包括类型转换、字符串解析、比较操作等
- 理解了包装类的缓存机制，特别是Integer的-128到127缓存范围
- 掌握了Character类的特殊方法，能够进行字符类型判断和转换
- 学会了包装类的性能优化技巧，避免不必要的装箱拆箱操作
- 能够编写实用的包装类工具方法，提高代码的安全性和可读性

**包装类应用场景：**
- 集合框架：在List、Set、Map中存储数值类型
- 泛型编程：在泛型中使用包装类类型参数
- 数据库操作：处理可能为null的数值字段
- 反射机制：在反射中使用包装类类型
- 序列化：包装类支持序列化操作

**包装类注意事项：**
- 性能考虑：基本类型比包装类性能更好，避免在循环中频繁装箱拆箱
- null值处理：包装类可以为null，拆箱前要检查null值
- 比较操作：使用equals()比较内容，使用compareTo()进行排序
- 缓存机制：利用valueOf()方法使用缓存，提高性能
- 不可变性：所有包装类都是不可变的，修改会创建新对象

通过包装类的学习，对Java的类型系统有了更深入的理解，特别是在处理基本类型与对象类型转换、集合框架使用、数据库操作等方面的重要作用。这些知识为后续开发企业级应用、数据库操作、框架使用等提供了重要基础。

**Lambda表达式学习要点：**
- 掌握了Lambda表达式的基本语法，包括参数列表、箭头操作符和表达式体
- 理解了函数式接口的概念，能够自定义和使用函数式接口
- 熟练使用Java内置函数式接口：Predicate、Function、Consumer、Supplier、BiFunction等
- 掌握了Lambda表达式在集合中的应用，包括forEach、removeIf、replaceAll、sort等
- 学会了Stream API的使用，能够进行过滤、映射、归约、分组等操作
- 理解了方法引用、闭包、变量捕获等高级概念
- 学会了Lambda表达式的性能优化技巧，避免常见陷阱

**Lambda表达式应用场景：**
- 集合操作：简化遍历、过滤、映射、排序等操作
- 事件处理：GUI事件、异步回调等
- 函数式编程：函数组合、管道处理、柯里化等
- Stream API：数据流处理、并行计算
- 回调函数：异步编程、事件驱动编程

**Lambda表达式注意事项：**
- 语法规则：参数类型推断、括号省略、return省略等
- 变量捕获：只能捕获final或effectively final的变量
- 性能考虑：避免在循环中重复创建Lambda，使用并行流
- 常见陷阱：变量捕获限制、异常处理、递归实现
- 最佳实践：优先使用方法引用，合理使用函数式接口

通过Lambda表达式的学习，对Java的函数式编程能力有了显著提升，特别是在集合处理、异步编程、事件处理等方面的应用。这些知识为后续学习现代Java框架、响应式编程、微服务开发等提供了重要基础。

---

后续将继续深入学习更多高级API和框架，不断提升Java编程技能。 