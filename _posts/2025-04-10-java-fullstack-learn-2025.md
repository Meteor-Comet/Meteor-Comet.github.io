---
layout:     post
title:      "Java全栈学习日志"
date:       2025-04-10 20:00:00
author:     "Comet"
tags:
    - Java
    - 全栈
    - 学习日志
---

# Java全栈学习日志

## 重新学一遍Java全栈

本系列日志将记录我重新学习Java全栈开发的过程，涵盖Java基础、Web开发、数据库、Spring全家桶、前端基础、项目实战等内容。

### 学习目标
- 夯实Java基础，掌握面向对象编程思想
- 熟悉常用开发工具与环境配置
- 掌握Web开发（Servlet/JSP、Spring MVC、Spring Boot等）
- 理解数据库原理并熟练使用MySQL
- 掌握Spring、Spring Boot、Spring Cloud等主流框架
- 了解前端基础（HTML/CSS/JavaScript）及与后端的集成
- 完成至少一个全栈项目实战

### 学习计划
1. Java基础复习与进阶
2. Web开发基础与进阶
3. 数据库与持久层技术
4. Spring全家桶体系
5. 前端基础与集成
6. 项目实战与总结

---

## 1.Java基础：JDK、JRE、JVM的关系与作用

- **JVM（Java Virtual Machine）**：Java虚拟机，负责Java字节码的加载、验证、执行和内存管理，是Java实现跨平台的核心。
- **JRE（Java Runtime Environment）**：Java运行环境，包含JVM和Java核心类库，提供运行Java程序的最小环境。
- **JDK（Java Development Kit）**：Java开发工具包，包含JRE以及编译器（javac）、调试工具等开发所需工具，是开发Java程序的完整环境。

**三者关系**：
- JDK ⊃ JRE ⊃ JVM。
- JVM是最底层的虚拟机，JRE在其基础上加上了类库，JDK则在JRE基础上再加上开发工具。

**作用总结**：
- 开发Java程序用JDK，
- 运行Java程序只需JRE，
  
  如果已经有编译好的.class字节码文件，运行时只需要JRE环境，无需JDK。JRE包含JVM和Java核心类库，能够加载和执行.class文件。
- JVM负责Java程序的跨平台运行。
  
  JVM实现跨平台的原理在于：Java源代码经过编译后生成与平台无关的字节码文件（.class），这种字节码并不能直接被操作系统识别和执行。无论在Windows、Linux还是macOS等不同操作系统上，只要安装了对应平台的JVM，JVM就能识别并执行这些字节码。JVM会根据当前操作系统和硬件环境，将字节码翻译为本地机器指令，从而实现"编写一次，到处运行"（Write Once, Run Anywhere, WORA）的目标。这也是Java语言最大的优势之一。
  
  总结：只要有.class文件，任何装有JRE的操作系统都能运行该Java程序，无需JDK参与。

---

## 2.Java主要关键词及其作用

- **class**  
  定义一个类，是Java的基本结构单元。
- **interface**  
  定义一个接口，接口用于规范类必须实现的方法。
- **extends**  
  表示类的继承，子类通过extends继承父类。
- **implements**  
  表示类实现接口。
- **public**  
  公有访问修饰符，任何地方都可以访问。
- **private**  
  私有访问修饰符，只能在本类中访问。
- **protected**  
  受保护访问修饰符，同包或子类可访问。
- **static**  
  静态修饰符，表示属于类而不是实例。
- **final**  
  修饰类、方法、变量，表示不可更改或不可继承。
- **void**  
  表示方法无返回值。
- **new**  
  创建对象实例。
- **this**  
  当前对象的引用。
- **super**  
  父类对象的引用。
- **return**  
  方法返回语句。
- **if / else**  
  条件判断语句。
- **switch / case**  
  多分支选择语句。
- **for / while / do-while**  
  循环语句。
- **break / continue**  
  跳出循环或跳过本次循环。
- **try / catch / finally / throw / throws**  
  异常处理相关关键词。
- **import**  
  导入其他包或类。
- **package**  
  定义包名。
- **abstract**  
  抽象类或方法，不能被实例化或必须被子类实现。
- **synchronized**  
  用于多线程同步。
- **volatile**  
  声明变量易变，线程可见性。
- **transient**  
  序列化时跳过该字段。
- **instanceof**  
  判断对象是否为某个类的实例。
- **enum**  
  枚举类型。
- **default**  
  用于switch语句的默认分支，或接口的默认方法实现。


## 3. Java中的字面量分类

Java中的字面量（Literal）是指在代码中直接表示固定值的数据。常见字面量分类如下：

- **整数型字面量**
  - 十进制：如 123
  - 八进制：以0开头，如 0123
  - 十六进制：以0x或0X开头，如 0x7B
  - 二进制：以0b或0B开头，如 0b1010

- **浮点型字面量**
  - 如 3.14、2.0e-3、1.5F、6.022E23D

- **字符型字面量**
  - 单引号括起来的单个字符，如 'A'、'中'、'\n'

- **字符串字面量**
  - 双引号括起来的字符序列，如 "Hello, Java!"

- **布尔型字面量**
  - 只有 true 和 false

- **null字面量**
  - 表示空引用，如 null

字面量是Java程序中最基本的数据表示方式，直接参与表达式和赋值。 

## 4. Java变量定义的格式

Java中变量的定义格式如下：

```
数据类型 变量名 = 初始值;
```

- **数据类型**：如 int、double、char、String、boolean 等。
- **变量名**：自定义的标识符，需遵循命名规范。
- **初始值**：可选，变量声明时赋的初始值。

### 示例
```java
int age = 25;
double price = 19.99;
char gender = 'M';
String name = "Tom";
boolean isActive = true;
```

也可以先声明后赋值：
```java
int score;
score = 100;
```

变量名建议使用有意义的英文单词，遵循小驼峰命名法（如 studentName）。 

## 5. Java中的键盘录入

在Java中，常用`Scanner`类实现从键盘读取用户输入。`Scanner`类位于`java.util`包中。

### 基本用法
1. 导入包：
```java
import java.util.Scanner;
```
2. 创建Scanner对象：
```java
Scanner sc = new Scanner(System.in);
```
3. 读取输入：
- 读取字符串：`String str = sc.nextLine();`
- 读取整数：`int num = sc.nextInt();`
- 读取浮点数：`double d = sc.nextDouble();`

### 示例代码
```java
import java.util.Scanner;

public class InputDemo {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("请输入姓名：");
        String name = sc.nextLine();
        System.out.print("请输入年龄：");
        int age = sc.nextInt();
        System.out.println("姓名：" + name + ", 年龄：" + age);
    }
}
```

> 提示：使用完Scanner后建议调用`sc.close();`关闭资源。 

## 6. IDEA中Java项目的结构介绍

在IntelliJ IDEA中创建的标准Java项目通常包含如下目录结构：

```
project-name/
├── .idea/                # IDEA项目配置文件夹
├── src/                  # 源代码目录
│   └── main/             # 主代码目录（Maven/Gradle项目）
│       ├── java/         # Java源代码
│       └── resources/    # 资源文件（配置、图片等）
│   └── test/             # 测试代码目录
│       ├── java/         # 测试用Java代码
│       └── resources/    # 测试资源文件
├── out/                  # 编译输出目录（普通项目）
├── target/               # 构建输出目录（Maven项目）
├── build/                # 构建输出目录（Gradle项目）
├── pom.xml               # Maven项目配置文件
├── build.gradle          # Gradle项目配置文件
└── ...                   # 其他文件
```

### 主要部分说明
- **src/main/java/**：存放项目的主Java源代码。
- **src/main/resources/**：存放配置文件、图片等资源。
- **src/test/java/**：存放测试用的Java代码。
- **src/test/resources/**：存放测试相关的资源文件。
- **pom.xml**：Maven项目的依赖和构建配置文件。
- **build.gradle**：Gradle项目的依赖和构建配置文件。
- **out/**、**target/**、**build/**：编译或打包后生成的输出目录。

> 普通Java项目只有src和out，Maven/Gradle项目结构更规范，推荐使用。 

### 项目、模块、类的概念与关系

- **项目（Project）**
  - 在IDEA中，项目是开发的整体工程，包含所有代码、资源、配置和依赖管理。一个项目可以包含一个或多个模块。

- **模块（Module）**
  - 模块是项目中的功能单元，可以独立编译、运行和测试。每个模块有自己的源码、资源和依赖配置。大型项目通常会按功能或层次拆分为多个模块（如web、service、dao等）。

- **类（Class）**
  - 类是Java程序的基本代码结构，用于描述对象的属性和行为。类文件（.java）位于模块的src目录下，是实现具体功能的最小单元。

#### 三者关系
- 一个**项目**可以包含多个**模块**。
- 一个**模块**可以包含多个**类**。
- **类**是代码实现的最小单元，**模块**是功能或层次的划分，**项目**是整体工程的集合。

> 简单理解：项目 > 模块 > 类，三者层层包含，便于大型系统的分工、协作和维护。 

## 7. Java运算符及其运算规则

### 1. 算术运算符
- `+` ：加法，两数相加。例如：a + b
- `-` ：减法，两数相减。例如：a - b
- `*` ：乘法，两数相乘。例如：a * b
- `/` ：除法，两数相除（整除/浮点）。例如：a / b
- `%` ：取余，取模，余数。例如：a % b
- `++` ：自增，变量加1（前/后缀）。例如：a++ 或 ++a
- `--` ：自减，变量减1（前/后缀）。例如：a-- 或 --a

**示例：**
```java
int a = 10, b = 3;
System.out.println(a + b); // 13
System.out.println(a - b); // 7
System.out.println(a * b); // 30
System.out.println(a / b); // 3
System.out.println(a % b); // 1
System.out.println(++a);   // 11
System.out.println(b--);   // 3（b变为2）
```

### 2. 赋值运算符
- `=` ：赋值，将右侧值赋给左侧变量。例如：a = b
- `+=` ：加后赋值，a = a + b。例如：a += b
- `-=` ：减后赋值，a = a - b。例如：a -= b
- `*=` ：乘后赋值，a = a * b。例如：a *= b
- `/=` ：除后赋值，a = a / b。例如：a /= b
- `%=` ：取余后赋值，a = a % b。例如：a %= b

**示例：**
```java
int a = 5;
a += 3; // a = 8
a -= 2; // a = 6
a *= 4; // a = 24
a /= 6; // a = 4
a %= 3; // a = 1
```

### 3. 比较（关系）运算符
- `==` ：等于，判断两值是否相等。例如：a == b
- `!=` ：不等于，判断两值是否不等。例如：a != b
- `>` ：大于。例如：a > b
- `<` ：小于。例如：a < b
- `>=` ：大于等于。例如：a >= b
- `<=` ：小于等于。例如：a <= b

**示例：**
```java
int a = 5, b = 8;
System.out.println(a == b); // false
System.out.println(a != b); // true
System.out.println(a > b);  // false
System.out.println(a < b);  // true
System.out.println(a >= 5); // true
System.out.println(b <= 8); // true
```

### 4. 逻辑运算符
- `&&` ：逻辑与，两个条件都为true时结果为true。例如：a && b
- `||` ：逻辑或，两个条件有一个为true时结果为true。例如：a || b
- `!` ：逻辑非，取反。例如：!a

**示例：**
```java
boolean x = true, y = false;
System.out.println(x && y); // false
System.out.println(x || y); // true
System.out.println(!x);     // false
```

### 5. 位运算符
- `&` ：按位与。例如：a & b
- `|` ：按位或。例如：a | b
- `^` ：按位异或。例如：a ^ b
- `~` ：按位取反。例如：~a
- `<<` ：左移。例如：a << n
- `>>` ：右移。例如：a >> n
- `>>>` ：无符号右移。例如：a >>> n

**示例：**
```java
int a = 6, b = 3; // 6: 110, 3: 011
System.out.println(a & b);  // 2  (010)
System.out.println(a | b);  // 7  (111)
System.out.println(a ^ b);  // 5  (101)
System.out.println(~a);     // -7
System.out.println(a << 1); // 12
System.out.println(a >> 1); // 3
System.out.println(a >>> 1);// 3
```

### 6. 条件（三元）运算符
- `?:` ：条件运算符，格式为 条件 ? 值1 : 值2。例如：a > b ? x : y

**示例：**
```java
int a = 10, b = 20;
int max = (a > b) ? a : b; // max = 20
System.out.println(max);
```

### 7. 字符串连接运算符
- `+` ：字符串拼接，只要有一个操作数是字符串，+ 就会拼接。例如："Hello" + name

**示例：**
```java
String name = "Java";
System.out.println("Hello, " + name); // Hello, Java
System.out.println("结果：" + 1 + 2); // 结果：12
System.out.println(1 + 2 + "结果"); // 3结果
```

### 8. instanceof 运算符
- `instanceof` ：类型判断，判断对象是否为某个类的实例。例如：obj instanceof String

**示例：**
```java
Object obj = "abc";
System.out.println(obj instanceof String); // true
System.out.println(obj instanceof Integer); // false
```

> 如需详细举例或对某类运算符深入讲解，可随时补充！ 

## 8. Java字符串运算规则

- **字符串拼接**
  - 使用 + 运算符可以将两个字符串拼接为一个新字符串。
  - 只要有一个操作数是字符串，+ 运算符就会把另一个操作数转换为字符串后再拼接。
  - 示例：
    ```java
    String s1 = "Hello" + "World"; // 结果：HelloWorld
    String s2 = "Java" + 2025;      // 结果：Java2025
    String s3 = 1 + 2 + "abc";      // 结果：3abc（先算1+2，再拼接）
    String s4 = "abc" + 1 + 2;      // 结果：abc12（从左到右依次拼接）
    ```

- **与其他类型的运算**
  - 字符串与数字、字符、布尔等类型用 + 运算时，非字符串类型会自动转换为字符串。
  - 示例：
    ```java
    String s = "结果：" + true; // 结果：结果：true
    ```

- **不可变性**
  - 字符串在Java中是不可变对象，每次拼接都会生成新的字符串对象。
  - 多次拼接建议使用StringBuilder/StringBuffer提高效率。

- **常见注意事项**
  - 字符串比较内容要用 equals() 方法，不能用 ==。
  - 字符串拼接优先级低于算术运算，表达式中注意括号使用。

> 字符串运算是Java开发中最常见的操作之一，理解其规则有助于避免常见错误和提升性能。 

## 9. 原码、反码与补码

在Java等计算机系统中，整数的底层存储采用二进制，负数的表示依赖于补码。理解原码、反码、补码有助于掌握位运算、溢出等底层原理。

### 1. 原码
- 原码是最直接的二进制表示，最高位为符号位（0正1负），其余为数值部分。
- 例如：
  - +7 的原码：0000 0111
  - -7 的原码：1000 0111

### 2. 反码
- 正数的反码与原码相同。
- 负数的反码：符号位不变，数值部分按位取反（0变1，1变0）。
- 例如：
  - +7 的反码：0000 0111
  - -7 的反码：1111 1000

### 3. 补码
- 正数的补码与原码相同。
- 负数的补码：反码加1。
- 例如：
  - +7 的补码：0000 0111
  - -7 的补码：1111 1001

### 4. 转换规则总结
- 正数：原码 = 反码 = 补码
- 负数：补码 = 反码 + 1
- 反码 = 补码 - 1

### 5. Java中的意义
- Java中的int、byte等整数类型，底层存储和运算都采用补码。
- 补码的好处：加减法统一、便于硬件实现、只有一个零。
- 位运算、溢出、负数右移等现象都与补码密切相关。

### 6. 示例
```java
int a = 7;      // 二进制：0000 0111
int b = -7;     // 二进制（补码）：1111 1001
System.out.println(Integer.toBinaryString(a)); // 111
System.out.println(Integer.toBinaryString(b)); // 11111111111111111111111111111001
```

> 理解补码机制有助于深入掌握Java底层运算和调试技巧。 

## 10. Java三大程序结构

### 10.1 顺序结构
- 程序从上到下依次执行每一条语句，中间没有任何判断和跳转。
- 是最简单、最常见的结构。

**示例：**
```java
int a = 10;
int b = 20;
int sum = a + b;
System.out.println("和为：" + sum);
```

### 10.2 分支结构（选择结构）
- 根据条件判断，决定执行哪一部分代码。
- 常用的分支语句有：if、if-else、if-else if-else、switch。

**if语句示例：**
```java
int score = 85;
if (score >= 60) {
    System.out.println("及格");
} else {
    System.out.println("不及格");
}
```

**switch语句示例：**
```java
int day = 3;
switch (day) {
    case 1:
        System.out.println("星期一");
        break;
    case 2:
        System.out.println("星期二");
        break;
    case 3:
        System.out.println("星期三");
        // break;
    default:
        System.out.println("其他");
}
```

**case穿透（fall through）说明：**
- 如果某个case分支没有写break，程序会继续执行后续case或default中的代码，直到遇到break或switch结束。
- 这称为"case穿透"或"fall through"。

**穿透示例：**
```java
int num = 2;
switch (num) {
    case 1:
        System.out.println("A");
    case 2:
        System.out.println("B");
    case 3:
        System.out.println("C");
    default:
        System.out.println("D");
}
// 输出：B
//      C
//      D
```
> 建议每个case后都加break，除非有意为之。

**case -> 新写法（Java 14+）：**
- 从Java 14开始，switch语句支持"case ->"箭头写法，简化代码且不允许穿透。
- 每个case只能执行对应的代码块，自动break，无需手动添加。

**示例：**
```java
int day = 2;
switch (day) {
    case 1 -> System.out.println("星期一");
    case 2 -> System.out.println("星期二");
    case 3, 4, 5 -> System.out.println("工作日");
    default -> System.out.println("周末或非法");
}
```
- 也可以用于赋值：
```java
String result = switch (day) {
    case 1 -> "星期一";
    case 2 -> "星期二";
    default -> "其他";
};
System.out.println(result);
```
> 箭头写法更简洁、安全，推荐在支持的JDK版本中使用。

### 10.3 循环结构
- 根据条件反复执行某段代码。
- 常用的循环语句有：for、while、do-while。

**for循环示例：**
```java
for (int i = 1; i <= 5; i++) {
    System.out.println("第" + i + "次循环");
}
```

**for循环运用场景：**
- 适用于已知循环次数的场景，如遍历数组、批量处理、计数循环等。
- 例如：遍历数组、打印1~100、批量初始化对象等。

**while循环示例：**
```java
int i = 1;
while (i <= 5) {
    System.out.println("第" + i + "次循环");
    i++;
}
```

**while循环运用场景：**
- 适用于循环次数不确定、依赖条件判断的场景，如用户输入、等待某个条件达成、读取文件等。
- 例如：用户输入密码直到正确、读取文件直到结尾、网络连接重试等。

> 总结：for循环更适合计数型、范围型循环，while循环更适合条件型、事件驱动型循环。合理选择可提升代码可读性和健壮性。

**do-while循环示例：**
```java
int i = 1;
do {
    System.out.println("第" + i + "次循环");
    i++;
} while (i <= 5);
```

> 顺序、分支、循环结构是所有程序的基础，合理组合可实现各种复杂逻辑。 

## 11. Java中的Random库

在Java中，`Random`类用于生成伪随机数，位于`java.util`包。

### 基本用法
1. 导入包：
```java
import java.util.Random;
```
2. 创建Random对象：
```java
Random rand = new Random();
```

### 常用方法
- `nextInt()`：生成一个int范围内的随机整数。
- `nextInt(n)`：生成[0, n)范围内的随机整数。
- `nextDouble()`：生成[0.0, 1.0)范围内的随机小数。
- `nextBoolean()`：生成一个随机布尔值。
- `nextLong()`：生成一个随机long值。

### 示例代码
```java
import java.util.Random;

public class RandomDemo {
    public static void main(String[] args) {
        Random rand = new Random();
        int num = rand.nextInt(100); // 0~99的随机整数
        double d = rand.nextDouble(); // 0.0~1.0的随机小数
        boolean b = rand.nextBoolean(); // 随机布尔值
        System.out.println("随机整数：" + num);
        System.out.println("随机小数：" + d);
        System.out.println("随机布尔：" + b);
    }
}
```

> Random生成的随机数是伪随机数，种子相同则序列相同。Java 1.7+还可用`ThreadLocalRandom`和`SecureRandom`。 

## 12. Java中的next命名规范详细解释

在Java标准库和第三方库中，许多方法以`next`开头，这是一种广泛采用的命名规范，体现了"获取序列中的下一个元素"或"生成下一个值"的设计思想。

### 1. 设计思想
- `next`强调"顺序获取"，通常用于遍历、生成、读取等需要依次处理数据的场景。
- 以`nextXxx()`命名的方法，往往每调用一次就返回序列中的下一个元素或值。
- 这种命名方式让API的用途一目了然，易于理解和记忆。

### 2. 常见场景
- **迭代器（Iterator）**：
  - `hasNext()`判断是否还有下一个元素，`next()`获取下一个元素。
  - 典型用法：
    ```java
    Iterator<String> it = list.iterator();
    while (it.hasNext()) {
        String s = it.next();
        // 处理s
    }
    ```
- **输入读取（Scanner）**：
  - `next()`读取下一个以空白分隔的字符串。
  - `nextInt()`、`nextDouble()`等读取下一个指定类型的输入。
  - 典型用法：
    ```java
    Scanner sc = new Scanner(System.in);
    int num = sc.nextInt();
    String word = sc.next();
    ```
- **随机数生成（Random）**：
  - `nextInt()`、`nextDouble()`等每次生成一个新的随机值。
- **枚举、流、生成器等**：
  - 只要是"顺序获取"或"生成下一个"，都常用next命名。

### 3. 与hasNext的配合
- 在迭代器、流等场景，通常有`hasNext()`方法判断是否还有下一个元素，配合`next()`安全遍历。
- 这样可以避免越界异常（如NoSuchElementException）。

### 4. 易混淆点
- `next()`和`nextLine()`：Scanner的`next()`读取一个单词，`nextLine()`读取一整行。
- `next()`通常不做类型转换，`nextInt()`等会尝试将输入转换为指定类型。

### 5. 实际开发建议
- 使用`nextXxx()`方法时，建议先用`hasNextXxx()`判断是否有下一个元素或输入，避免异常。
- 理解"next"语义有助于快速掌握Java集合、输入、生成器等API的用法。

> 总结：以next开头的方法体现了Java对顺序处理、流式操作的高度抽象，是高效、可读代码的重要基础。 

## 13. Java数组基础

### 13.1 数组的概念
- 数组是存储同一类型数据的有序集合，长度固定。
- 每个元素通过下标（索引）访问，下标从0开始。

### 13.2 数组的声明与初始化
- 声明数组：
  ```java
  int[] arr;
  String[] names;
  ```
- 分配空间并初始化：
  ```java
  arr = new int[5]; // 长度为5，默认值为0
  String[] cities = new String[3]; // 长度为3，默认值为null
  ```
- 声明+初始化（静态初始化）：
  ```java
  int[] nums = {1, 2, 3, 4, 5};
  String[] colors = {"red", "green", "blue"};
  ```

### 13.3 访问和修改数组元素
```java
int[] arr = {10, 20, 30};
System.out.println(arr[0]); // 10
arr[1] = 99;
System.out.println(arr[1]); // 99
```

### 13.4 数组的遍历
- for循环遍历：
  ```java
  for (int i = 0; i < arr.length; i++) {
      System.out.println(arr[i]);
  }
  ```
- 增强for循环（for-each）：
  ```java
  for (int num : arr) {
      System.out.println(num);
  }
  ```

### 13.5 数组的常用属性和特性
- `length`：数组长度属性，如arr.length。
- 数组一旦创建，长度不可变。
- 支持多维数组（如int[][] matrix = new int[3][4];）。
- 数组元素类型可以是基本类型或引用类型。

### 13.6 示例：求数组元素之和
```java
int[] nums = {1, 2, 3, 4, 5};
int sum = 0;
for (int n : nums) {
    sum += n;
}
System.out.println("总和：" + sum);
```

### 13.7 直接输出数组与地址格式说明
- 直接输出数组对象（如System.out.println(arr);）时，显示的不是数组内容，而是数组的类型和哈希码地址。
- 格式通常为：[类型标识@哈希码]，如：[I@6d06d69c
  - [I 表示int[]类型，@后为哈希码的十六进制。
  - 其他类型如String[]会显示为 [Ljava.lang.String;@xxxxxx

**示例：**
```java
int[] arr = {1, 2, 3};
System.out.println(arr); // 输出：[I@6d06d69c（示例）
```

- 如果要输出数组内容，需用循环或工具类：
  - for循环/增强for循环遍历输出
  - 使用Arrays.toString(arr)

**示例：**
```java
import java.util.Arrays;
int[] arr = {1, 2, 3};
System.out.println(Arrays.toString(arr)); // 输出：[1, 2, 3]
```

> 直接输出数组变量看到的是"地址信息"，不是数组元素本身。建议用Arrays.toString()等方法查看内容。

> 数组是Java中最基础的数据结构，后续可学习ArrayList等集合类实现更灵活的数据管理。 

### 13.8 动态初始化时的默认值
- 使用`new`关键字动态初始化数组时，数组中的每个元素都会被自动赋予默认值。
- 不同类型的数组默认值如下：
  - 整型（int、byte、short、long）：默认值为0
  - 浮点型（float、double）：默认值为0.0
  - 字符型（char）：默认值为'\u0000'（空字符）
  - 布尔型（boolean）：默认值为false
  - 引用类型（如String、对象）：默认值为null

**示例：**
```java
int[] arr = new int[3];
System.out.println(Arrays.toString(arr)); // [0, 0, 0]

boolean[] flags = new boolean[2];
System.out.println(Arrays.toString(flags)); // [false, false]

String[] names = new String[2];
System.out.println(Arrays.toString(names)); // [null, null]
```

> 动态初始化时，数组元素的默认值由类型决定，无需手动赋值。 

## 14. Java内存分布

Java程序运行时，JVM会将内存划分为不同的区域，每个区域负责不同类型的数据存储和管理。

### 1. 方法区（Method Area）
- 存储类的结构信息（如类的元数据、静态变量、常量、运行时常量池等）。
- 所有线程共享。

### 2. 堆（Heap）
- 存储所有对象实例和数组。
- 由垃圾回收器统一管理。
- 所有线程共享。

### 3. 虚拟机栈（Stack）
- 每个线程独有，存储方法调用时的局部变量、操作数栈、方法返回地址等。
- 局部变量包括基本类型、对象引用等。

### 4. 本地方法栈（Native Method Stack）
- 为JVM调用本地（Native）方法服务。
- 每个线程独有。

### 5. 程序计数器（Program Counter Register）
- 记录当前线程所执行字节码的行号指示器。
- 每个线程独有。

### 6. 内存分布结构图
```mermaid
graph TD
  A[方法区 Method Area]
  B[堆 Heap]
  C[虚拟机栈 Stack]
  D[本地方法栈 Native Method Stack]
  E[程序计数器 PC Register]
  subgraph 线程1
    C
    D
    E
  end
  subgraph 线程2
    C2[虚拟机栈 Stack]
    D2[本地方法栈 Native Method Stack]
    E2[程序计数器 PC Register]
  end
  A -->|共享| B
  B -->|共享| C
  B -->|共享| D
  B -->|共享| E
```

### 7. 总结
- 堆和方法区是所有线程共享的，栈、本地方法栈、程序计数器是线程私有的。
- 对象实例存储在堆，局部变量存储在栈。
- 合理理解内存分布有助于掌握对象生命周期、垃圾回收、线程安全等核心知识。 

## 15. Java方法基础

### 1. 方法的概念
- 方法（Method）是完成特定功能的代码块，可以重复调用。
- 方法有名称、参数列表、返回值类型和方法体。
- 方法有助于代码复用、结构清晰和模块化。

### 2. 方法的定义格式
```java
修饰符 返回值类型 方法名(参数列表) {
    // 方法体
    // 可选：return 返回值;
}
```
- 常见修饰符：public、private、static、final、abstract等。
- 返回值类型：可以是基本类型、引用类型或void（无返回值）。
- 参数列表：0个或多个参数，类型+名称，用逗号分隔。

### 3. 方法的调用
- 语法：方法名(实参列表);
- 静态方法可用类名调用：ClassName.methodName();
- 非静态方法需通过对象调用：obj.methodName();

**示例：**
```java
public static int add(int a, int b) {
    return a + b;
}

public void sayHello(String name) {
    System.out.println("Hello, " + name);
}

// 调用
int sum = add(3, 5); // 静态方法
MyClass obj = new MyClass();
obj.sayHello("Tom"); // 实例方法
```

### 4. 方法的重载（Overload）
- 同一个类中，方法名相同但参数列表不同（类型、个数、顺序不同），构成方法重载。
- 返回值类型不同不能单独构成重载。

**示例：**
```java
public int max(int a, int b) {
    return a > b ? a : b;
}
public double max(double a, double b) {
    return a > b ? a : b;
}
```

### 5. 常见修饰符说明
- `public`：公有方法，任何类都可访问。
- `private`：私有方法，仅本类可访问。
- `static`：静态方法，属于类本身。
- `final`：最终方法，不能被子类重写。
- `abstract`：抽象方法，无方法体，需子类实现。

### 6. void方法和return
- void方法无返回值，可用return;提前结束方法。
- 有返回值方法必须用return返回对应类型的值。

### 7. 参数传递
- 基本类型参数：值传递，方法内修改不影响外部变量。
- 引用类型参数：传递对象引用，方法内可修改对象内容。

### 8. 方法参数传递机制详解

Java方法参数传递采用"值传递"机制，但根据参数类型（基本类型或引用类型），在堆和栈上的表现和影响不同。

#### 1. 基本类型参数（int、double、char等）
- 传递的是变量的"值"副本。
- 方法内对参数的修改不会影响原变量。
- 存储在栈内存中。

**示例：**
```java
public static void change(int x) {
    x = 100;
}
int a = 10;
change(a);
System.out.println(a); // 输出10，a未被改变
```

#### 2. 引用类型参数（数组、对象等）
- 传递的是对象引用的"值"副本（即对象在堆中的地址）。
- 方法内通过引用可以修改堆中对象的内容，影响原对象。
- 但如果在方法内让引用指向新对象，不会影响原对象。
- 引用本身在栈内存，对象内容在堆内存。

**示例1：修改对象内容**
```java
public static void modify(int[] arr) {
    arr[0] = 99;
}
int[] nums = {1, 2, 3};
modify(nums);
System.out.println(nums[0]); // 输出99，原数组被修改
```

**示例2：引用指向新对象**
```java
public static void reassign(int[] arr) {
    arr = new int[]{7, 8, 9};
}
int[] nums = {1, 2, 3};
reassign(nums);
System.out.println(nums[0]); // 仍输出1，原数组未被替换
```

#### 3. 内存分布简图
- 基本类型参数：
  - 变量和参数都在栈，互不影响。
- 引用类型参数：
  - 引用变量在栈，实际对象在堆。
  - 传递的是"引用的副本"，可通过引用修改堆中对象内容。

> 总结：Java所有参数传递本质上都是值传递。基本类型传递值，引用类型传递引用的值（地址）。理解堆栈分布和引用机制，有助于避免参数修改的误区。 

## 16. Java二维数组的创建与初始化

### 1. 二维数组的声明
- 语法：
  ```java
  int[][] matrix;
  String[][] table;
  ```

### 2. 二维数组的创建
- 指定行和列：
  ```java
  int[][] arr = new int[3][4]; // 3行4列，所有元素默认值为0
  ```
- 只指定行，列可后续单独分配（不规则数组）：
  ```java
  int[][] arr = new int[3][];
  arr[0] = new int[2]; // 第一行2列
  arr[1] = new int[4]; // 第二行4列
  arr[2] = new int[3]; // 第三行3列
  ```

### 3. 二维数组的静态初始化
- 声明+赋值：
  ```java
  int[][] nums = {
      {1, 2, 3},
      {4, 5, 6},
      {7, 8, 9}
  };
  ```

### 4. 访问和遍历二维数组
- 访问元素：`arr[i][j]` 表示第i行第j列元素。
- 遍历方式：
  ```java
  for (int i = 0; i < arr.length; i++) {
      for (int j = 0; j < arr[i].length; j++) {
          System.out.print(arr[i][j] + " ");
      }
      System.out.println();
  }
  ```
- 增强for循环：
  ```java
  for (int[] row : arr) {
      for (int val : row) {
          System.out.print(val + " ");
      }
      System.out.println();
  }
  ```

### 5. 特点说明
- Java二维数组本质上是"数组的数组"，每一行可以有不同的列数（不规则数组）。
- 默认值规则与一维数组一致。

> 二维数组常用于矩阵、表格、棋盘等场景，是多维数据结构的基础。 

## 17. Java面向对象编程（OOP）基础

### 1. 类与对象
- **类（Class）**：对象的模板或蓝图，定义属性和行为。
- **对象（Object）**：类的实例，实际存在的实体。

**示例：**
```java
class Person {
    String name;
    int age;
    void sayHello() {
        System.out.println("Hello, my name is " + name);
    }
}
Person p = new Person();
p.name = "Tom";
p.age = 20;
p.sayHello();
```

### 2. 封装（Encapsulation）
- 将属性和方法封装在类内部，属性私有（private），通过公有方法（getter/setter）访问。
- 提高安全性和可维护性。

**示例：**
```java
class Student {
    private int score;
    public int getScore() { return score; }
    public void setScore(int s) { score = s; }
}
```

### 3. 继承（Inheritance）
- 子类通过`extends`继承父类，获得父类的属性和方法。
- 支持单继承。

**示例：**
```java
class Animal {
    void eat() { System.out.println("吃东西"); }
}
class Dog extends Animal {
    void bark() { System.out.println("汪汪"); }
}
Dog d = new Dog();
d.eat();
d.bark();
```

### 4. 多态（Polymorphism）
- 父类引用指向子类对象，调用方法时表现出不同形态。
- 体现为方法重写（Override）和接口实现。

**示例：**
```java
Animal a = new Dog();
a.eat(); // 调用Dog的eat方法（如果重写）
```

### 5. 构造方法（Constructor）
- 与类名相同，无返回值，用于对象初始化。
- 可重载多个构造方法。

**示例：**
```java
class Person {
    String name;
    Person() { name = "无名"; }
    Person(String n) { name = n; }
}
```

### 6. this与super关键字
- `this`：当前对象的引用，区分成员变量和局部变量，调用本类方法/构造器。
- `super`：父类对象的引用，调用父类属性、方法、构造器。

**示例：**
```java
class Parent {
    int x = 1;
}
class Child extends Parent {
    int x = 2;
    void print() {
        System.out.println(this.x); // 2
        System.out.println(super.x); // 1
    }
}
```

### 7. 方法重写（Override）与重载（Overload）
- **重写**：子类重写父类方法，方法名、参数、返回值完全一致，需加@Override注解。
- **重载**：同类中方法名相同，参数列表不同。

### 8. final与abstract
- `final`类不能被继承，final方法不能被重写，final变量为常量。
- `abstract`类不能实例化，抽象方法无方法体，子类必须实现。

### 9. 接口（Interface）
- 用`interface`定义，所有方法默认public abstract，属性默认public static final。
- 类用`implements`实现接口，可多实现。

**示例：**
```java
interface USB {
    void connect();
}
class Mouse implements USB {
    public void connect() { System.out.println("鼠标连接"); }
}
```

### 10. 静态成员（static）
- static变量/方法属于类本身，不依赖对象。
- 可用类名直接访问。

### 11. 内部类
- 类中定义的类，分为成员内部类、静态内部类、局部内部类、匿名内部类。

### 12. 对象的创建与内存分布
- new对象时，属性分配在堆，引用变量在栈。
- 构造方法初始化对象。

### 13. 常见OOP原则
- 单一职责、开闭原则、里氏替换、依赖倒置、接口隔离、迪米特法则等。

> 面向对象是Java的核心思想，掌握OOP有助于开发高内聚、低耦合、易维护的系统。 

### 面向对象的内存分布说明

- **栈内存（Stack）**：用于存储方法调用时的局部变量，包括对象引用变量（如Person p）。每个线程有自己的栈空间。
- **堆内存（Heap）**：用于存储所有new出来的对象实例和数组。对象的实际内容（属性等）都在堆中，所有线程共享。
- **方法区（Method Area）**：用于存储类的结构信息（如类的元数据、静态变量、常量、方法代码等），所有线程共享。

**对象引用与内存分布关系：**
- 当你写`Person p = new Person();`时：
  - `p`变量在栈内存，保存的是堆中Person对象的地址（引用）。
  - 堆内存中存放Person对象的实际内容。
  - 类的结构信息（如方法、静态变量）在方法区。
- 多个引用变量可以在栈中分别保存同一个对象的地址，实现对象共享。
- 对象的生命周期由是否有引用指向它决定，无引用时会被垃圾回收。

> 这种分布方式有助于实现对象的共享、封装和高效管理，是Java面向对象内存模型的基础。 

### Java对象与引用的内存分布详解

#### 1. 一个对象引用的情况
- 当你写 `Person p = new Person();` 时，发生了什么？
  1. **栈内存**：变量`p`在栈上分配空间，存储的是一个"地址"。
  2. **堆内存**：`new Person()`会在堆上开辟一块空间，存放Person对象的实际内容（属性等）。
  3. **引用关系**：`p`保存的是堆中Person对象的地址（引用），通过`p`可以访问和操作该对象。
- **影响**：如果`p`被赋值为`null`，则它不再指向任何对象，但堆中的对象如果没有其他引用指向，会被垃圾回收。

#### 2. 两个引用指向同一个对象
- 代码示例：
  ```java
  Person p1 = new Person();
  Person p2 = p1;
  ```
- 解释：
  1. `p1`和`p2`都在栈内存中，各自保存一个地址。
  2. 这两个地址其实是一样的，都指向同一个堆内存中的Person对象。
  3. 通过`p1`或`p2`修改对象的属性，另一个引用也能看到变化（因为本质上是同一个对象）。
- **影响**：只要有一个引用还指向该对象，对象就不会被回收。

#### 3. 两个引用指向不同对象
- 代码示例：
  ```java
  Person p1 = new Person();
  Person p2 = new Person();
  ```
- 解释：
  1. `p1`和`p2`都在栈内存，各自保存不同的地址。
  2. 堆内存中有两个不同的Person对象，`p1`和`p2`分别指向各自的对象。
  3. 修改`p1`指向的对象不会影响`p2`指向的对象，反之亦然。
- **影响**：每个对象的生命周期独立，只有当没有引用指向某个对象时，该对象才会被回收。

---
**总结：**
- 栈内存存放引用变量（地址），堆内存存放实际对象内容。
- 多个引用可以指向同一个对象，也可以各自指向不同对象。
- 理解这种分布有助于掌握Java对象的共享、参数传递、垃圾回收等机制。 

## 18.Java的基本数据类型与引用数据类型

### 1. 基本数据类型（Primitive Types）
- Java共有8种基本数据类型，直接存储具体的数值，分配在栈内存。
- 包括：
  - 整型：byte（1字节）、short（2字节）、int（4字节）、long（8字节）
  - 浮点型：float（4字节）、double（8字节）
  - 字符型：char（2字节，存储单个字符）
  - 布尔型：boolean（1字节，true/false）

**示例：**
```java
int a = 10;
double d = 3.14;
char c = 'A';
boolean flag = true;
```
- 基本类型变量直接存储值，赋值和传参时是值的拷贝。

### 2. 引用数据类型（Reference Types）
- 包括：类（对象）、数组、接口、枚举、String等。
- 变量存储的是对象在堆内存的地址（引用），实际内容在堆内存。

**示例：**
```java
String s = "Hello";
int[] arr = {1, 2, 3};
Person p = new Person();
```
- 引用类型变量存储在栈，指向堆中的实际对象。
- 赋值和传参时是引用的拷贝（地址），可通过引用修改堆中对象内容。

### 3. 区别总结
- 基本类型：存储值本身，内存分配在栈，速度快，不能为null。
- 引用类型：存储地址，实际内容在堆，变量可为null，功能更丰富。
- 基本类型有对应的包装类（如int对应Integer），用于集合等只能存引用类型的场景。

> 理解两者区别有助于掌握Java的内存管理、参数传递、对象操作等核心机制。 

## 19.this关键字的内存原理

### 1. this的本质
- this是Java中每个实例方法内部的一个隐式引用，指向当前调用该方法的对象本身。
- 本质上，this是一个指向当前对象的引用变量，存储在栈帧的局部变量表中。

### 2. 内存表现
- 当调用实例方法时，JVM会自动将当前对象的引用（即this）作为第一个参数传递给方法。
- 在方法执行期间，this指向堆内存中当前对象实例。
- 每个对象的方法调用时，this的值不同，始终指向当前操作的对象。

### 3. 作用和常见用法
- 区分成员变量和局部变量（如构造方法参数与成员变量同名时）。
- 在对象方法内部引用当前对象。
- 在构造方法中调用其他构造方法（this(...)）。
- 在链式调用中返回当前对象（如return this;）。

**示例：**
```java
class Person {
    String name;
    Person(String name) {
        this.name = name; // 区分成员变量和参数
    }
    void printName() {
        System.out.println(this.name); // this可省略
    }
    Person setName(String name) {
        this.name = name;
        return this; // 支持链式调用
    }
}
```

### 4. 注意事项
- 静态方法中不能使用this，因为没有具体对象。
- this只能在实例方法和构造方法中使用。

> 理解this的内存原理有助于掌握对象方法的调用机制、链式编程和构造方法重载等高级用法。 

## 20.Java对象数组

### 1. 概念
- 对象数组是存放对象引用的数组，每个元素都是某个类的对象引用。
- 本质上是"引用类型数组"，数组本身在堆，元素为对象引用。

### 2. 声明与创建
- 声明：
  ```java
  Person[] people;
  ```
- 创建数组空间：
  ```java
  people = new Person[3]; // 创建长度为3的对象数组，每个元素默认值为null
  ```
- 创建并初始化对象：
  ```java
  people[0] = new Person("Tom");
  people[1] = new Person("Jerry");
  people[2] = new Person("Alice");
  ```
- 声明+静态初始化：
  ```java
  Person[] group = {
      new Person("Tom"),
      new Person("Jerry"),
      new Person("Alice")
  };
  ```

### 3. 遍历对象数组
- for循环或增强for循环：
  ```java
  for (int i = 0; i < people.length; i++) {
      if (people[i] != null) {
          people[i].sayHello();
      }
  }
  // 或
  for (Person p : group) {
      p.sayHello();
  }
  ```

### 4. 内存分布说明
- 对象数组本身在堆内存，数组元素为对象引用（地址）。
- 每个元素指向堆中的实际对象实例。
- 未初始化的元素为null。

### 5. 注意事项
- 创建对象数组时，只分配了引用空间，需逐个new对象。
- 访问未初始化的元素会抛出NullPointerException。

> 对象数组常用于批量管理同类对象，如学生列表、商品清单等，是面向对象编程的重要应用。 

## 21.Java字符串（String）常用API

### 1. 字符串的创建
- 直接赋值：
  ```java
  String s1 = "Hello";
  ```
- 使用构造方法：
  ```java
  String s2 = new String("World");
  ```

### 2. 字符串的不可变性
- String对象一旦创建，内容不可更改，所有修改操作都会生成新字符串。
- 适合做常量、作为Map的key等。

### 3. 常用API方法
- `length()`：获取字符串长度
- `charAt(int index)`：获取指定位置字符
- `equals(String other)`：内容比较
- `equalsIgnoreCase(String other)`：忽略大小写比较
- `compareTo(String other)`：字典序比较
- `isEmpty()`：是否为空串
- `toUpperCase()/toLowerCase()`：转大/小写
- `substring(int begin, int end)`：截取子串
- `indexOf(String str)`：查找子串首次出现位置
- `lastIndexOf(String str)`：查找子串最后出现位置
- `contains(String str)`：是否包含子串
- `replace(old, new)`：替换内容
- `split(String regex)`：分割字符串
- `trim()`：去除首尾空白
- `startsWith()/endsWith()`：前缀/后缀判断
- `getBytes()`：转为字节数组
- `toCharArray()`：转为字符数组

### 4. 示例代码
```java
String str = "  Hello, Java!  ";
System.out.println(str.length()); // 15
System.out.println(str.trim()); // "Hello, Java!"
System.out.println(str.substring(2, 7)); // "Hello"
System.out.println(str.toUpperCase()); // "  HELLO, JAVA!  "
System.out.println(str.replace("Java", "World")); // "  Hello, World!  "
String[] arr = str.split(",");
System.out.println(arr[0]); // "  Hello"
```

### 5. 字符串拼接与效率
- 使用`+`拼接字符串简单但效率低，建议多次拼接时用`StringBuilder`或`StringBuffer`。

### 6. String构造方法参数说明
- `String s = new String()` 这句代码中的括号内可以写多种内容，取决于String类的构造方法重载。
- 常见构造方法有：
  - `new String()`：创建空字符串，等价于""
  - `new String(String original)`：根据已有字符串创建新字符串
  - `new String(char[] value)`：由字符数组创建字符串
  - `new String(char[] value, int offset, int count)`：由字符数组的部分内容创建字符串
  - `new String(byte[] bytes)`：由字节数组创建字符串（按平台默认编码）
  - `new String(byte[] bytes, String charsetName)`：由字节数组按指定编码创建字符串
  - `new String(StringBuffer buffer)`、`new String(StringBuilder builder)`：由可变字符串对象创建

**示例：**
```java
String s1 = new String(); // 空字符串
String s2 = new String("abc");
char[] arr = {'H', 'e', 'l', 'l', 'o'};
String s3 = new String(arr); // "Hello"
String s4 = new String(arr, 1, 3); // "ell"
byte[] bytes = {65, 66, 67};
String s5 = new String(bytes); // "ABC"（默认编码）
String s6 = new String(bytes, "UTF-8"); // "ABC"
StringBuffer sb = new StringBuffer("hi");
String s7 = new String(sb);
```
- 通过不同构造方法，可以实现字符串与字符数组、字节数组、StringBuffer/StringBuilder等类型的灵活转换。

> 熟练掌握String API是Java开发的基础，能高效处理文本数据。 

## 22.StringBuilder与StringBuffer

### 1. 概念与区别
- **StringBuilder** 和 **StringBuffer** 都是可变字符串类，适合频繁修改字符串内容的场景。
- 区别：
  - StringBuilder：线程不安全，效率高，JDK 1.5后推荐单线程场景使用。
  - StringBuffer：线程安全，效率略低，适合多线程环境。
- 二者都比String拼接效率高，避免产生大量无用字符串对象。

### 2. 常用API
- `append(xxx)`：追加内容
- `insert(offset, xxx)`：插入内容
- `delete(start, end)`：删除指定区间内容
- `replace(start, end, str)`：替换内容
- `reverse()`：反转字符串
- `toString()`：转为不可变String
- `setCharAt(index, ch)`：修改指定位置字符
- `length()`：获取长度

### 3. 示例代码
```java
StringBuilder sb = new StringBuilder("Hello");
sb.append(", Java!");
sb.insert(5, " World");
sb.delete(0, 6);
sb.replace(0, 4, "Hi");
sb.reverse();
System.out.println(sb.toString());

StringBuffer sbf = new StringBuffer();
sbf.append("abc").append(123);
System.out.println(sbf);
```

### 4. 适用场景
- StringBuilder：推荐用于单线程环境下的大量字符串拼接、修改，如循环拼接、临时字符串处理等。
- StringBuffer：用于多线程环境下对同一字符串变量的并发修改。

> 总结：字符串频繁拼接、修改时优先考虑StringBuilder，需线程安全时用StringBuffer，普通不可变字符串用String。 

### StringBuilder和StringBuffer的区别

1. **线程安全性**
   - **StringBuffer**：线程安全。其大多数方法都用`synchronized`修饰，多线程环境下可安全操作同一个StringBuffer对象。
   - **StringBuilder**：线程不安全。没有同步机制，适合单线程环境，效率更高。

2. **执行效率**
   - **StringBuffer**：由于线程安全，方法有同步开销，效率略低。
   - **StringBuilder**：无同步开销，执行速度更快，推荐在单线程下使用。

3. **JDK版本**
   - **StringBuffer**：JDK 1.0就有。
   - **StringBuilder**：JDK 1.5引入，作为StringBuffer的高效替代。

4. **用法和API**
   - 二者API几乎完全一致，如`append()`、`insert()`、`delete()`、`reverse()`等。
   - 用法相同，唯一差别在于线程安全性和效率。

5. **适用场景**
   - **StringBuffer**：多线程环境下字符串频繁修改。
   - **StringBuilder**：单线程环境下字符串频繁修改（如循环拼接、临时字符串处理等）。

**示例对比：**
```java
StringBuffer sbf = new StringBuffer("abc");
sbf.append(123);

StringBuilder sbd = new StringBuilder("abc");
sbd.append(123);
```

**总结：**
- 需要线程安全时用StringBuffer，否则优先用StringBuilder。
- 普通不可变字符串用String，频繁拼接/修改用Builder或Buffer。

## 23.Java链式编程（链式调用）

### 1. 概念
- 链式编程（Fluent Interface/Method Chaining）是指通过连续调用对象的方法，每个方法返回当前对象自身（this），从而实现多个操作的连贯书写。
- 常见于构建器模式、StringBuilder、集合操作等。

### 2. 实现原理
- 方法返回`this`（当前对象），使得可以继续调用该对象的其他方法。
- 适用于需要对同一对象连续操作的场景。

**示例：**
```java
class Person {
    private String name;
    private int age;
    public Person setName(String name) {
        this.name = name;
        return this;
    }
    public Person setAge(int age) {
        this.age = age;
        return this;
    }
    public void show() {
        System.out.println(name + ", " + age);
    }
}

Person p = new Person().setName("Tom").setAge(20);
p.show();
```

### 3. 常见场景
- StringBuilder/StringBuffer的append、insert等方法：
  ```java
  StringBuilder sb = new StringBuilder().append("Hello").append(", ").append("World");
  ```
- Java集合的add、remove等方法（部分实现支持）：
  ```java
  List<String> list = new ArrayList<>();
  list.add("a").add("b"); // 需返回this
  ```
- 构建器模式（Builder Pattern）：用于复杂对象的灵活构建。

### 4. 优缺点
- **优点**：代码简洁、可读性强、便于批量设置属性。
- **缺点**：不适合所有场景，方法需返回this，易导致调试困难。

> 链式编程是现代Java开发中常用的风格，尤其适合配置、构建、批量操作等场景。

## 24.StringJoiner的用法

### 1. 概念
- StringJoiner是Java 8引入的字符串连接工具类，位于java.util包。
- 用于高效拼接多个字符串，并可自定义分隔符、前缀和后缀。

### 2. 构造方法
- `StringJoiner(CharSequence delimiter)`：指定分隔符。
- `StringJoiner(CharSequence delimiter, CharSequence prefix, CharSequence suffix)`：指定分隔符、前缀和后缀。

### 3. 常用API
- `add(String element)`：添加元素。
- `toString()`：返回拼接后的字符串。
- `setEmptyValue(String emptyValue)`：设置无元素时的返回值。
- `length()`：当前拼接字符串的长度。

### 4. 示例代码
```java
import java.util.StringJoiner;

StringJoiner sj = new StringJoiner(", ");
sj.add("Java").add("Python").add("C++");
System.out.println(sj.toString()); // Java, Python, C++

StringJoiner sj2 = new StringJoiner(", ", "[", "]");
sj2.add("A").add("B");
System.out.println(sj2); // [A, B]

StringJoiner sj3 = new StringJoiner("-");
System.out.println(sj3.setEmptyValue("空").toString()); // 空
```

### 5. 适用场景
- 拼接集合、数组等多个字符串，需自定义分隔符、前后缀时。
- 替代手动循环拼接，代码更简洁高效。

> StringJoiner常与Stream API结合使用，也可用于String.join()等场景，是现代Java字符串拼接的推荐方式之一。

## 25.Java字符串（String）的底层原理

### 1. 不可变性
- String对象一旦创建，内容不可更改（final修饰的char[]数组存储字符）。
- 修改字符串（如拼接、替换）会生成新的String对象，原对象不变。
- 不可变性带来线程安全、可缓存、可作为Map的key等优势。

### 2. 内存结构
- String底层由一个final char[]数组存储字符内容（JDK 9+为byte[]，支持压缩存储）。
- String对象本身在堆内存，char[]数组也在堆内存。

### 3. 字符串常量池
- Java为提高效率和节省内存，维护一个字符串常量池（String Pool）。
- 直接赋值的字符串字面量会被放入常量池，池中相同内容的字符串只存一份。
- new String("abc")会在堆中新建对象，不会自动放入常量池。
- 可用intern()方法将字符串加入常量池。

**示例：**
```java
String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2); // true，指向常量池同一对象
String s3 = new String("hello");
System.out.println(s1 == s3); // false，s3为新对象
System.out.println(s1 == s3.intern()); // true
```

### 4. 字符串比较
- == 比较的是引用（地址），equals()比较的是内容。
- 推荐用equals()判断字符串内容是否相等。

### 5. 字符串拼接机制
- 字符串拼接（+）在编译期会优化为StringBuilder.append()，但多次拼接建议手动用StringBuilder。
- 字符串常量拼接会在编译期合并，变量拼接则在运行时生成新对象。

**示例：**
```java
String a = "he" + "llo"; // 编译期合并为"hello"
String b = "he";
String c = b + "llo"; // 运行时拼接
System.out.println(a == "hello"); // true
System.out.println(c == "hello"); // false
```

### 6. 性能影响
- 频繁修改字符串建议用StringBuilder/StringBuffer，避免生成大量无用String对象。
- 字符串不可变性有利于安全和性能优化，但需注意拼接和创建方式。

> 理解String的底层原理有助于编写高效、健壮的Java代码，避免常见性能和内存问题。

### 7. 字符串拼接的底层原理

- **编译期优化**：
  - 对于字符串常量的拼接（如"a" + "b"），编译器会在编译阶段直接合并为一个常量（"ab"），不会生成多余对象。
  - 例如：
    ```java
    String s = "a" + "b" + "c"; // 编译后等价于 String s = "abc";
    ```

- **运行时机制**：
  - 对于包含变量的拼接（如a + b），编译器会将其转换为StringBuilder的append()方法链式调用，最后toString()生成新字符串。
  - 例如：
    ```java
    String a = "hello";
    String b = "world";
    String s = a + b;
    // 实际等价于：
    // String s = new StringBuilder().append(a).append(b).toString();
    ```

- **多次拼接建议**：
  - 在循环或大量拼接场景下，建议手动使用StringBuilder/StringBuffer，避免生成大量临时String对象，提升性能。
  - 例如：
    ```java
    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < 1000; i++) {
        sb.append(i);
    }
    String result = sb.toString();
    ```

- **常量拼接与变量拼接的区别**：
  - 常量拼接在编译期完成，结果在常量池。
  - 变量拼接在运行期完成，结果在堆内存。

- **性能影响**：
  - 频繁使用+拼接字符串会导致性能下降，尤其是在循环中。
  - 推荐用StringBuilder进行高效拼接。

> 理解字符串拼接的底层原理有助于写出高效、可维护的Java代码，避免无谓的内存浪费和性能瓶颈。

### 8. 直接赋值字符串与变量拼接字符串的==比较

- **直接赋值字符串**（如String s1 = "abc";）会被放入字符串常量池，池中相同内容的字符串只存一份。
- **变量拼接字符串**（如String s2 = a + b;）即使内容相同，结果是运行时新创建的对象，存放在堆内存，不会自动进入常量池。
- 因此，内容相同但创建方式不同的字符串，用==比较时结果通常为false。
- == 比较的是引用（地址），不是内容。内容比较应使用equals()。

**示例：**
```java
String s1 = "hello";
String s2 = "he" + "llo"; // 编译期常量拼接，等价于"hello"，与s1同一对象
System.out.println(s1 == s2); // true

String a = "he";
String b = "llo";
String s3 = a + b; // 运行时拼接，生成新对象
System.out.println(s1 == s3); // false
System.out.println(s1.equals(s3)); // true
```

**重点总结：**
- 直接赋值或常量拼接的字符串，内容相同==为true。
- 变量拼接的字符串，即使内容相同==为false。
- 判断字符串内容相等，必须用equals()方法。

## 26.Java集合框架基础

### 1. 集合的概念
- 集合（Collection）是存储、操作一组数据的容器，支持动态扩容、去重、排序等功能。
- Java集合框架（Collection Framework）提供了丰富的数据结构和算法，位于java.util包。
- 集合只能存引用类型（对象），基本类型需用包装类（如Integer、Double）。

### 2. 主要接口与体系结构
- **Collection接口**：单值集合的根接口，子接口有List、Set、Queue等。
- **List接口**：有序、可重复元素，如ArrayList、LinkedList。
- **Set接口**：无序、不可重复元素，如HashSet、TreeSet。
- **Map接口**：键值对集合，如HashMap、TreeMap，不继承Collection。

```
Collection
  ├── List（有序、可重复）
  │     ├── ArrayList
  │     └── LinkedList
  └── Set（无序、不可重复）
        ├── HashSet
        └── TreeSet
Map（键值对）
  ├── HashMap
  └── TreeMap
```

### 3. 常用实现类
- **ArrayList**：基于数组，查询快，增删慢，常用。
- **LinkedList**：基于链表，增删快，查询慢。
- **HashSet**：基于哈希表，无序、唯一。
- **TreeSet**：基于红黑树，自动排序、唯一。
- **HashMap**：基于哈希表，键值对，无序，key唯一。
- **TreeMap**：基于红黑树，键值对，自动按key排序。

### 4. 基本用法与常见操作
- 添加元素：add()/put()
- 删除元素：remove()
- 判断包含：contains()/containsKey()
- 获取元素：get()/iterator()/for-each
- 清空集合：clear()
- 获取大小：size()

### 5. 示例代码
```java
import java.util.*;

List<String> list = new ArrayList<>();
list.add("A");
list.add("B");
System.out.println(list.get(0)); // A

Set<Integer> set = new HashSet<>();
set.add(1);
set.add(2);
System.out.println(set.contains(1)); // true

Map<String, Integer> map = new HashMap<>();
map.put("Tom", 18);
map.put("Jerry", 20);
System.out.println(map.get("Tom")); // 18
```

### 6. 遍历集合
- for-each循环：
  ```java
  for (String s : list) {
      System.out.println(s);
  }
  ```
- 迭代器遍历：
  ```java
  Iterator<Integer> it = set.iterator();
  while (it.hasNext()) {
      System.out.println(it.next());
  }
  ```
- Map遍历：
  ```java
  for (Map.Entry<String, Integer> entry : map.entrySet()) {
      System.out.println(entry.getKey() + ":" + entry.getValue());
  }
  ```

> 集合是Java开发中最常用的数据结构，掌握其用法有助于高效管理和处理数据。

## 27. Java泛型（Generics）

### 1. 概念
- 泛型是JDK 1.5引入的特性，用于在类、接口、方法中定义和使用类型参数，实现类型安全和代码复用。
- 常用于集合类、工具类等，避免强制类型转换和运行时类型错误。

### 2. 基本语法
- 泛型类/接口：
  ```java
  class Box<T> {
      private T value;
      public void set(T value) { this.value = value; }
      public T get() { return value; }
  }
  Box<Integer> box = new Box<>();
  box.set(123);
  ```
- 泛型方法：
  ```java
  public <T> void print(T t) {
      System.out.println(t);
  }
  ```
- 泛型接口：
  ```java
  interface Converter<F, T> {
      T convert(F from);
  }
  ```

### 3. 集合中的泛型
- 指定集合元素类型，避免强转：
  ```java
  List<String> list = new ArrayList<>();
  list.add("abc");
  String s = list.get(0); // 无需强转
  ```

### 4. 通配符与类型限定
- `?`：通配符，表示未知类型。
- `? extends T`：上限通配符，表示T或T的子类（如读取数据时）。
- `? super T`：下限通配符，表示T或T的父类（如写入数据时）。

**示例：**
```java
List<? extends Number> nums = new ArrayList<Integer>(); // 只能读，不能写
List<? super Integer> ints = new ArrayList<Number>(); // 可写入Integer及其子类
```

### 5. 好处
- 类型安全：编译期检查类型，避免ClassCastException。
- 代码复用：同一泛型类/方法可适用于多种类型。
- 可读性强：代码意图明确。

> 泛型是Java类型系统的重要组成部分，合理使用可提升代码的健壮性和灵活性。

## 28. 数组与集合的选择：什么时候用集合，什么时候用数组？

在Java开发中，选择"集合"还是"数组"主要取决于你的具体需求。下面详细说明它们各自的适用场景和选择依据：

### 一、数组适用场景

1. **元素数量固定且已知**  
   例如：存储一周7天的名称、12个月份等。  
   一旦创建，长度不可变。
2. **对性能要求极高**  
   数组在内存中是连续分布，访问速度快，适合对性能有极高要求的场景（如底层算法、频繁索引访问）。
3. **存储基本数据类型或对象引用**  
   可以存储任何类型（基本类型或引用类型），但类型必须一致。
4. **内存占用可控**  
   数组没有额外的对象封装和元数据，内存开销小。

### 二、集合适用场景

1. **元素数量不确定或经常变化**  
   例如：用户动态输入、数据量随时增减的场景。  
   集合可以动态扩容，元素数量不受限制。
2. **需要丰富的操作和功能**  
   集合类（如List、Set、Map）提供了丰富的API，如增删查改、排序、去重、查找等。
3. **需要存储对象（引用类型）**  
   集合只能存储对象，不能直接存储基本数据类型（但可以用包装类）。
4. **需要灵活的数据结构**  
   如链表、队列、栈、哈希表、树等，集合框架都提供了相应实现。

### 三、选择建议

- **数据量固定且类型单一**：优先用数组。
- **数据量不确定或需频繁增删**：优先用集合。
- **需要高级操作（如排序、去重、查找）**：优先用集合。
- **只需存储基本类型且追求极致性能**：用基本类型数组。

### 四、举例说明

- **数组**：  
  ```java
  int[] scores = new int[5]; // 固定5个成绩
  ```
- **集合**：  
  ```java
  List<Integer> scoreList = new ArrayList<>(); // 可以随时添加、删除成绩
  ```

### 五、总结口诀

> "定长用数组，变长用集合；操作多用集合，性能极致用数组。"

如需更详细的代码示例或对比，也可以补充说明！

## 29. static关键字详解

static是Java中用于修饰成员变量、成员方法、代码块和内部类的关键字，表示"静态"，即属于类本身而不是某个对象。

### 一、static的作用

1. **修饰成员变量（静态变量）**
   - 属于类本身，所有对象共享一份内存。
   - 类加载时初始化，优先于对象存在。
   - 访问方式：`类名.变量名` 或 `对象.变量名`（推荐前者）。

2. **修饰成员方法（静态方法）**
   - 不依赖对象，可以直接通过类名调用。
   - 不能访问非static成员（因为没有this对象）。
   - 常用于工具类方法（如Math类的静态方法）。

3. **修饰代码块（静态代码块）**
   - 随类加载自动执行且只执行一次。
   - 常用于类的初始化操作（如加载驱动、初始化静态资源）。

4. **修饰内部类（静态内部类）**
   - 静态内部类不依赖外部类对象，可以直接创建。
   - 只能访问外部类的静态成员。

### 二、static的常见用法

- 静态变量：
  ```java
  public class Demo {
      static int count = 0; // 静态变量，所有对象共享
  }
  ```
- 静态方法：
  ```java
  public class MathUtil {
      public static int add(int a, int b) {
          return a + b;
      }
  }
  // 调用：MathUtil.add(1, 2);
  ```
- 静态代码块：
  ```java
  public class InitDemo {
      static {
          System.out.println("类被加载时执行，只执行一次");
      }
  }
  ```
- 静态内部类：
  ```java
  public class Outer {
      static class Inner {
          void show() {
              System.out.println("静态内部类方法");
          }
      }
  }
  // 创建静态内部类对象：Outer.Inner inner = new Outer.Inner();
  ```

### 三、static的适用场景

- 工具类方法（如Arrays、Collections、Math等）
- 计数器、全局常量（如public static final PI）
- 只需一份数据且所有对象共享的场景
- 工厂方法、单例模式等设计模式实现

### 四、注意事项

- 静态方法不能直接访问非静态成员（没有this）。
- 静态方法中不能使用super、this关键字。
- 静态成员随着类的加载而存在，优先于对象。
- 静态变量会被所有对象共享，修改会影响所有对象。
- 静态代码块只执行一次。

### 五、常见面试点

- static和实例成员的区别？
- 静态方法能否被重写？（不能，但可以被子类隐藏）
- main方法为什么是static？（JVM无需创建对象即可调用）
- 静态变量和常量的区别？（常量需加final修饰）

### 六、示例代码

```java
public class StaticDemo {
    static int count = 0; // 静态变量
    int id; // 实例变量

    static {
        System.out.println("静态代码块：类加载时执行");
    }

    public StaticDemo(int id) {
        this.id = id;
        count++;
    }

    public static void showCount() {
        System.out.println("创建了" + count + "个对象");
        // System.out.println(id); // 错误，不能访问非静态成员
    }

    public void showId() {
        System.out.println("对象id：" + id);
    }

    public static void main(String[] args) {
        StaticDemo a = new StaticDemo(1);
        StaticDemo b = new StaticDemo(2);
        StaticDemo.showCount(); // 创建了2个对象
        a.showId(); // 对象id：1
        b.showId(); // 对象id：2
    }
}
```

> static是Java类成员管理和工具方法设计的核心，理解其原理有助于写出高效、规范的Java代码。

## 30. Java中的继承（Inheritance）

### 1. 概念
- 继承是面向对象编程的三大特性之一，允许子类自动获得父类的属性和方法，实现代码复用和扩展。
- Java使用`extends`关键字实现类的继承。

### 2. 语法
```java
class 父类名 {
    // 父类内容
}
class 子类名 extends 父类名 {
    // 子类内容
}
```

### 3. 特性
- 子类继承父类的非private成员（属性和方法）。
- 子类可以新增自己的成员。
- 子类可以重写（Override）父类的方法。
- Java只支持单继承（一个类只能有一个直接父类），但支持多层继承和多实现接口。

### 4. super关键字
- super用于在子类中引用父类的成员（属性、方法、构造器）。
- 可用于区分同名成员、调用父类构造方法。

**示例：**
```java
class Animal {
    String name = "动物";
    void eat() { System.out.println("吃东西"); }
}
class Dog extends Animal {
    String name = "狗";
    void eat() {
        super.eat(); // 调用父类方法
        System.out.println("狗吃骨头");
    }
    void printName() {
        System.out.println(super.name); // 父类name
        System.out.println(this.name);  // 子类name
    }
}
```

### 5. 构造方法调用
- 子类构造方法会默认先调用父类的无参构造方法（super()），如需调用父类有参构造，需显式写super(参数)。
- 父类构造方法执行完后才执行子类构造方法。

### 6. 方法重写（Override）
- 子类可重写父类方法，方法名、参数、返回值完全一致，访问权限不能更低。
- 重写方法可加@Override注解，提升可读性和安全性。

### 7. final/abstract与继承
- final类不能被继承，final方法不能被重写，final变量为常量。
- abstract类不能实例化，抽象方法无方法体，子类必须实现。

### 8. 单继承与多态
- Java类只支持单继承，但可多层继承和多实现接口。
- 继承是实现多态的基础，父类引用可指向子类对象。

### 9. 常见面试点
- 构造方法的调用顺序？（父类→子类）
- super和this的区别？
- 方法重写与重载的区别？
- final/abstract与继承的关系？
- 为什么Java不支持多继承？（避免菱形继承、简化设计）

### 10. 示例代码
```java
class Animal {
    void speak() { System.out.println("动物叫"); }
}
class Cat extends Animal {
    @Override
    void speak() { System.out.println("喵喵"); }
}
public class Test {
    public static void main(String[] args) {
        Animal a = new Cat();
        a.speak(); // 输出：喵喵
    }
}
```

> 继承是Java代码复用和多态实现的基础，合理设计继承结构有助于提升系统的可维护性和扩展性。

### 11. 继承中成员变量和成员方法的访问与重写

#### 1. 成员变量
- 子类可以定义与父类同名的成员变量，这种情况下，子类变量会"隐藏"父类变量。
- 通过子类对象访问变量时，**编译和运行都看引用类型**，即变量的类型由引用变量的声明类型决定。
- 可用super关键字访问父类的同名变量。

**示例：**
```java
class Parent {
    int x = 1;
}
class Child extends Parent {
    int x = 2;
    void print() {
        System.out.println(x); // 2，子类变量
        System.out.println(super.x); // 1，父类变量
    }
}
Parent p = new Child();
System.out.println(p.x); // 1，引用类型为Parent
```

#### 2. 成员方法
- 子类可以重写（Override）父类的成员方法。
- 方法重写时，**编译看引用类型，运行看对象实际类型**（多态）。
- 可用super关键字调用父类被重写的方法。

**示例：**
```java
class Parent {
    void show() { System.out.println("Parent"); }
}
class Child extends Parent {
    @Override
    void show() { System.out.println("Child"); }
}
Parent p = new Child();
p.show(); // 输出：Child
```

#### 3. 访问权限
- private成员不能被继承，protected和public成员可被继承。
- 子类重写方法时，访问权限不能低于父类方法。

#### 4. super与this的区别
- this：指向当前对象（子类对象），可访问本类成员。
- super：指向父类对象（父类部分），可访问父类被隐藏/重写的成员。

> 理解继承中成员变量和方法的访问与重写规则，有助于正确使用多态、避免变量隐藏和方法覆盖带来的困惑。

## 30.2 Java方法重写（Override）详解

### 1. 概念
- 方法重写（Override）是指子类对父类继承的方法进行重新实现，方法名、参数列表、返回值类型完全一致。
- 目的是让子类对象调用时有不同的行为，实现多态。

### 2. 语法规则
- 子类方法必须与父类被重写方法的方法名、参数列表、返回值类型完全一致。
- 访问权限不能低于父类（可相同或更大）。
- 不能重写父类的private、static、final方法。
- 子类方法抛出的异常不能比父类更宽泛。
- 推荐加@Override注解，编译器会检查是否正确重写。

### 3. @Override注解
- 放在重写方法前，提升代码可读性和安全性。
- 如果方法签名不一致，编译器会报错。

### 4. 与重载（Overload）的区别
- **重写**：子类对父类方法重新实现，方法签名完全一致，发生在继承体系中。
- **重载**：同一个类中方法名相同，参数列表不同，返回值类型可不同。

### 5. 常见面试点
- 重写方法的访问权限、异常、返回值要求？
- static方法能否重写？（不能，只能被隐藏）
- 构造方法能否重写？（不能）
- 为什么要用@Override注解？

### 6. 示例代码
```java
class Animal {
    void speak() { System.out.println("动物叫"); }
}
class Dog extends Animal {
    @Override
    void speak() { System.out.println("汪汪"); }
}
public class Test {
    public static void main(String[] args) {
        Animal a = new Dog();
        a.speak(); // 输出：汪汪
    }
}
```

> 方法重写是实现多态的基础，合理使用可提升代码的灵活性和可维护性。

### 12. 继承中构造方法的自动调用（super）

- 在Java中，子类构造方法执行时会**自动调用父类的构造方法**，以保证父类部分被正确初始化。
- 如果子类构造方法没有显式写`super(...)`，编译器会自动在第一行加上`super();`，即调用父类的无参构造方法。
- 如果父类没有无参构造方法，子类必须显式调用父类的有参构造方法，否则编译报错。
- `super(...)`必须是子类构造方法的第一条语句。

**调用顺序：**
1. 先执行父类构造方法（super），再执行子类构造方法。
2. 多层继承时，先最顶层父类，再逐层向下。

**示例：**
```java
class Parent {
    Parent() { System.out.println("父类构造"); }
}
class Child extends Parent {
    Child() { System.out.println("子类构造"); }
}
public class Test {
    public static void main(String[] args) {
        new Child();
        // 输出：
        // 父类构造
        // 子类构造
    }
}
```

**有参构造情况：**
```java
class Parent {
    Parent(String msg) { System.out.println(msg); }
}
class Child extends Parent {
    Child() { super("父类有参构造"); System.out.println("子类构造"); }
}
```

> 理解构造方法的自动调用顺序，有助于正确初始化继承体系中的对象，避免常见的编译和运行错误。

### 13. 构造方法中this(...)的含义与用法

- 在Java构造方法中，`this(...)`用于调用本类的另一个构造方法，实现构造方法之间的重用和统一初始化。
- `this(...)`只能出现在构造方法的第一行，且不能与super(...)同时出现。
- 通过this(...)可以实现构造方法的链式调用，最终会调用到某个没有this(...)的构造方法（通常是最全参的构造方法）。

**示例：**
```java
class Person {
    String name;
    int age;

    // 无参构造
    public Person() {
        this("无名氏", 0); // 调用有参构造
        System.out.println("无参构造执行");
    }

    // 有参构造
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("有参构造执行");
    }
}

public class Test {
    public static void main(String[] args) {
        Person p = new Person();
        // 输出：
        // 有参构造执行
        // 无参构造执行
    }
}
```

**注意事项：**
- this(...)只能用于构造方法，且必须是第一条语句。
- 不能和super(...)同时出现。

**作用总结：**
- 统一初始化逻辑，减少重复代码。
- 便于维护和扩展构造方法。

> 在构造方法中用this(...)，就是"让本类的另一个构造方法帮我初始化"。

### 14. 多态（Polymorphism）

多态是面向对象编程的三大特性之一，指同一个行为具有多个不同表现形式或形态的能力。在Java中，多态主要通过继承和接口实现。

#### 14.1 多态的概念

- **多态**：同一个接口，使用不同的实例而执行不同操作。
- **编译时多态**：方法重载（Overloading）
- **运行时多态**：方法重写（Overriding）

#### 14.2 多态的实现方式

**1. 继承多态**
```java
class Animal {
    public void makeSound() {
        System.out.println("动物发出声音");
    }
}

class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("汪汪汪");
    }
}

class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("喵喵喵");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal animal1 = new Dog(); // 父类引用指向子类对象
        Animal animal2 = new Cat();
        
        animal1.makeSound(); // 输出：汪汪汪
        animal2.makeSound(); // 输出：喵喵喵
    }
}
```

**2. 接口多态**
```java
interface Flyable {
    void fly();
}

class Bird implements Flyable {
    @Override
    public void fly() {
        System.out.println("鸟儿飞翔");
    }
}

class Airplane implements Flyable {
    @Override
    public void fly() {
        System.out.println("飞机飞行");
    }
}

public class Test {
    public static void main(String[] args) {
        Flyable flyable1 = new Bird();
        Flyable flyable2 = new Airplane();
        
        flyable1.fly(); // 输出：鸟儿飞翔
        flyable2.fly(); // 输出：飞机飞行
    }
}
```

#### 14.3 多态的特点

**1. 向上转型（Upcasting）**
- 子类对象可以赋值给父类引用
- 自动类型转换，安全可靠
```java
Animal animal = new Dog(); // 向上转型
```

**2. 向下转型（Downcasting）**
- 父类引用转换为子类引用
- 需要强制类型转换，可能抛出ClassCastException
```java
Animal animal = new Dog();
Dog dog = (Dog) animal; // 向下转型
```

**3. instanceof运算符**
- 用于判断对象是否为某个类的实例
- 避免ClassCastException异常
```java
Animal animal = new Dog();
if (animal instanceof Dog) {
    Dog dog = (Dog) animal;
    dog.makeSound();
}
```

#### 14.4 多态的应用场景

**1. 方法参数多态**
```java
public class AnimalTrainer {
    public void train(Animal animal) {
        animal.makeSound();
    }
}

public class Test {
    public static void main(String[] args) {
        AnimalTrainer trainer = new AnimalTrainer();
        trainer.train(new Dog()); // 输出：汪汪汪
        trainer.train(new Cat()); // 输出：喵喵喵
    }
}
```

**2. 方法返回值多态**
```java
public class AnimalFactory {
    public static Animal createAnimal(String type) {
        if ("dog".equals(type)) {
            return new Dog();
        } else if ("cat".equals(type)) {
            return new Cat();
        }
        return null;
    }
}
```

**3. 集合中的多态**
```java
List<Animal> animals = new ArrayList<>();
animals.add(new Dog());
animals.add(new Cat());

for (Animal animal : animals) {
    animal.makeSound(); // 多态调用
}
```

#### 14.5 多态的注意事项

**1. 成员变量没有多态**
```java
class Parent {
    int num = 10;
}

class Child extends Parent {
    int num = 20;
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        System.out.println(p.num); // 输出：10（成员变量没有多态）
    }
}
```

**2. 静态方法没有多态**
```java
class Parent {
    public static void method() {
        System.out.println("父类静态方法");
    }
}

class Child extends Parent {
    public static void method() {
        System.out.println("子类静态方法");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        p.method(); // 输出：父类静态方法（静态方法没有多态）
    }
}
```

**3. 构造方法没有多态**
- 构造方法不能被重写，因此不存在多态

#### 14.6 多态的优势

1. **可扩展性**：新增子类不需要修改现有代码
2. **可维护性**：统一的接口，便于维护
3. **可复用性**：一个方法可以处理多种类型的对象
4. **灵活性**：运行时动态绑定，提高程序灵活性

#### 14.7 实际应用示例

**图形计算器**
```java
abstract class Shape {
    abstract double getArea();
    abstract double getPerimeter();
}

class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
    
    @Override
    double getPerimeter() {
        return 2 * Math.PI * radius;
    }
}

class Rectangle extends Shape {
    private double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    double getArea() {
        return width * height;
    }
    
    @Override
    double getPerimeter() {
        return 2 * (width + height);
    }
}

public class ShapeCalculator {
    public static void printShapeInfo(Shape shape) {
        System.out.println("面积：" + shape.getArea());
        System.out.println("周长：" + shape.getPerimeter());
    }
    
    public static void main(String[] args) {
        printShapeInfo(new Circle(5));
        printShapeInfo(new Rectangle(4, 6));
    }
}
```

> 多态是面向对象编程的核心特性，通过多态可以实现代码的灵活性和可扩展性，是设计优秀面向对象程序的重要基础。

### 15. 多态中成员变量与成员方法的调用机制

多态中成员变量和成员方法的调用行为存在重要差异，理解这些差异有助于正确使用多态特性。

#### 15.1 成员变量的调用机制

**核心规则：成员变量没有多态，编译时确定**

```java
class Parent {
    int num = 10;
    String name = "父类";
    
    public void showInfo() {
        System.out.println("父类方法中的num: " + num);
        System.out.println("父类方法中的name: " + name);
    }
}

class Child extends Parent {
    int num = 20;
    String name = "子类";
    
    @Override
    public void showInfo() {
        System.out.println("子类方法中的num: " + num);
        System.out.println("子类方法中的name: " + name);
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child(); // 父类引用指向子类对象
        
        // 成员变量调用 - 看引用类型
        System.out.println(p.num);    // 输出：10（父类的num）
        System.out.println(p.name);   // 输出：父类（父类的name）
        
        // 成员方法调用 - 看对象类型
        p.showInfo(); // 输出：
        // 子类方法中的num: 20
        // 子类方法中的name: 子类
    }
}
```

**内存原理分析：**
```
内存中的对象结构：
Child对象 {
    Parent部分 {
        num = 10
        name = "父类"
    }
    Child部分 {
        num = 20  (隐藏了父类的num)
        name = "子类"  (隐藏了父类的name)
    }
}

当使用 Parent p = new Child() 时：
- p.num 访问的是 Parent 部分的 num (10)
- p.showInfo() 调用的是 Child 的 showInfo() 方法
- 在 Child 的 showInfo() 方法中，num 和 name 访问的是 Child 部分的变量
```

#### 15.2 成员方法的调用机制

**核心规则：成员方法有多态，运行时确定**

```java
class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
    
    public void sleep() {
        System.out.println("动物睡觉");
        this.eat(); // 调用的是实际对象的方法
    }
}

class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("狗吃骨头");
    }
    
    public void bark() {
        System.out.println("狗叫");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal animal = new Dog();
        
        animal.eat();   // 输出：狗吃骨头（多态调用）
        animal.sleep(); // 输出：动物睡觉 + 狗吃骨头
        // animal.bark(); // 编译错误：父类引用无法调用子类特有方法
    }
}
```

#### 15.3 静态成员的调用机制

**核心规则：静态成员没有多态，编译时确定**

```java
class Parent {
    static int staticNum = 100;
    
    public static void staticMethod() {
        System.out.println("父类静态方法");
    }
    
    public void instanceMethod() {
        System.out.println("父类实例方法");
    }
}

class Child extends Parent {
    static int staticNum = 200;
    
    public static void staticMethod() {
        System.out.println("子类静态方法");
    }
    
    @Override
    public void instanceMethod() {
        System.out.println("子类实例方法");
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child();
        
        // 静态成员调用 - 看引用类型
        System.out.println(p.staticNum);     // 输出：100
        p.staticMethod();                    // 输出：父类静态方法
        
        // 实例方法调用 - 看对象类型
        p.instanceMethod();                  // 输出：子类实例方法
    }
}
```

#### 15.4 构造方法中的调用

```java
class Parent {
    int num = 10;
    
    public Parent() {
        System.out.println("父类构造方法中的num: " + num);
        this.showNum();
    }
    
    public void showNum() {
        System.out.println("父类showNum方法中的num: " + num);
    }
}

class Child extends Parent {
    int num = 20;
    
    public Child() {
        super(); // 调用父类构造方法
        System.out.println("子类构造方法中的num: " + num);
        this.showNum();
    }
    
    @Override
    public void showNum() {
        System.out.println("子类showNum方法中的num: " + num);
    }
}

public class Test {
    public static void main(String[] args) {
        Child child = new Child();
        // 输出：
        // 父类构造方法中的num: 10
        // 父类showNum方法中的num: 10
        // 子类构造方法中的num: 20
        // 子类showNum方法中的num: 20
    }
}
```

#### 15.5 实际应用中的注意事项

**1. 避免在父类方法中直接访问成员变量**
```java
class Shape {
    protected double area;
    
    public void calculateArea() {
        // 子类重写此方法时，area的访问可能不符合预期
        System.out.println("面积: " + area);
    }
}

class Circle extends Shape {
    private double radius;
    
    @Override
    public void calculateArea() {
        this.area = Math.PI * radius * radius; // 正确设置area
        super.calculateArea(); // 调用父类方法显示
    }
}
```

**2. 使用getter/setter方法**
```java
class Person {
    private String name;
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
}

class Student extends Person {
    private String studentId;
    
    @Override
    public String getName() {
        return "学生: " + super.getName();
    }
}
```

**3. 方法重写时的变量访问**
```java
class Base {
    protected int value = 10;
    
    public void display() {
        System.out.println("Base value: " + value);
    }
}

class Derived extends Base {
    protected int value = 20;
    
    @Override
    public void display() {
        System.out.println("Derived value: " + value);        // 20
        System.out.println("Base value: " + super.value);     // 10
    }
}
```

#### 15.6 总结对比

| 特性 | 成员变量 | 成员方法 | 静态成员 |
|------|----------|----------|----------|
| 多态性 | ❌ 无多态 | ✅ 有多态 | ❌ 无多态 |
| 调用依据 | 引用类型 | 对象类型 | 引用类型 |
| 确定时机 | 编译时 | 运行时 | 编译时 |
| 内存访问 | 直接访问 | 动态绑定 | 直接访问 |

> **记忆口诀**：变量看引用，方法看对象，静态看引用。理解这个机制有助于避免多态使用中的常见错误。

### 16. 多态中的强制类型转换

多态中的类型转换是Java面向对象编程中的重要概念，包括向上转型和向下转型两种方式。

#### 16.1 向上转型（Upcasting）

**概念：** 子类对象赋值给父类引用，自动进行类型转换。

```java
class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}

class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("狗吃骨头");
    }
    
    public void bark() {
        System.out.println("狗叫");
    }
}

public class Test {
    public static void main(String[] args) {
        // 向上转型 - 自动转换，安全可靠
        Animal animal = new Dog();
        animal.eat(); // 可以调用父类方法
        
        // animal.bark(); // 编译错误：父类引用无法调用子类特有方法
    }
}
```

**特点：**
- 自动进行，无需强制转换
- 安全可靠，不会抛出异常
- 可以调用父类方法，无法调用子类特有方法

#### 16.2 向下转型（Downcasting）

**概念：** 父类引用转换为子类引用，需要强制类型转换。

```java
class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}

class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("狗吃骨头");
    }
    
    public void bark() {
        System.out.println("狗叫");
    }
}

class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }
    
    public void meow() {
        System.out.println("猫叫");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();
        
        // 向下转型 - 需要强制转换
        Dog dog = (Dog) animal1; // 成功
        dog.bark(); // 可以调用子类特有方法
        
        // Cat cat = (Cat) animal1; // 运行时异常：ClassCastException
    }
}
```

#### 16.3 instanceof运算符

**作用：** 判断对象是否为某个类的实例，避免ClassCastException异常。

```java
public class Test {
    public static void main(String[] args) {
        Animal animal1 = new Dog();
        Animal animal2 = new Cat();
        
        // 使用instanceof进行安全转换
        if (animal1 instanceof Dog) {
            Dog dog = (Dog) animal1;
            dog.bark();
        }
        
        if (animal2 instanceof Cat) {
            Cat cat = (Cat) animal2;
            cat.meow();
        }
        
        // 检查是否为null
        Animal animal3 = null;
        System.out.println(animal3 instanceof Animal); // false，null不是任何类的实例
    }
}
```

#### 16.4 类型转换的实际应用

**1. 集合中的类型转换**
```java
import java.util.*;

class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}

class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("狗吃骨头");
    }
    
    public void bark() {
        System.out.println("狗叫");
    }
}

class Cat extends Animal {
    @Override
    public void eat() {
        System.out.println("猫吃鱼");
    }
    
    public void meow() {
        System.out.println("猫叫");
    }
}

public class Test {
    public static void main(String[] args) {
        List<Animal> animals = new ArrayList<>();
        animals.add(new Dog());
        animals.add(new Cat());
        animals.add(new Dog());
        
        for (Animal animal : animals) {
            animal.eat(); // 多态调用
            
            // 根据类型调用特有方法
            if (animal instanceof Dog) {
                Dog dog = (Dog) animal;
                dog.bark();
            } else if (animal instanceof Cat) {
                Cat cat = (Cat) animal;
                cat.meow();
            }
        }
    }
}
```

**2. 工厂模式中的类型转换**
```java
interface Vehicle {
    void drive();
}

class Car implements Vehicle {
    @Override
    public void drive() {
        System.out.println("汽车行驶");
    }
    
    public void park() {
        System.out.println("汽车停车");
    }
}

class Motorcycle implements Vehicle {
    @Override
    public void drive() {
        System.out.println("摩托车行驶");
    }
    
    public void wheelie() {
        System.out.println("摩托车翘头");
    }
}

class VehicleFactory {
    public static Vehicle createVehicle(String type) {
        if ("car".equals(type)) {
            return new Car();
        } else if ("motorcycle".equals(type)) {
            return new Motorcycle();
        }
        return null;
    }
}

public class Test {
    public static void main(String[] args) {
        Vehicle vehicle1 = VehicleFactory.createVehicle("car");
        Vehicle vehicle2 = VehicleFactory.createVehicle("motorcycle");
        
        // 使用instanceof进行安全转换
        if (vehicle1 instanceof Car) {
            Car car = (Car) vehicle1;
            car.drive();
            car.park();
        }
        
        if (vehicle2 instanceof Motorcycle) {
            Motorcycle motorcycle = (Motorcycle) vehicle2;
            motorcycle.drive();
            motorcycle.wheelie();
        }
    }
}
```

#### 16.5 类型转换的注意事项

**1. 避免不必要的转换**
```java
class Animal {
    public void eat() {
        System.out.println("动物吃东西");
    }
}

class Dog extends Animal {
    @Override
    public void eat() {
        System.out.println("狗吃骨头");
    }
}

public class Test {
    public static void main(String[] args) {
        Dog dog = new Dog();
        Animal animal = dog; // 向上转型
        
        // 不必要的向下转型
        Dog dog2 = (Dog) animal; // 可以，但不必要
        
        // 直接使用原始引用更好
        dog.eat(); // 更直接，无需转换
    }
}
```

**2. 处理转换异常**
```java
public class Test {
    public static void main(String[] args) {
        Animal animal = new Dog();
        
        try {
            Cat cat = (Cat) animal; // 会抛出ClassCastException
        } catch (ClassCastException e) {
            System.out.println("类型转换失败：" + e.getMessage());
        }
        
        // 使用instanceof更安全
        if (animal instanceof Cat) {
            Cat cat = (Cat) animal;
            cat.meow();
        } else {
            System.out.println("animal不是Cat类型");
        }
    }
}
```

**3. 接口类型转换**
```java
interface Flyable {
    void fly();
}

interface Swimmable {
    void swim();
}

class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("鸭子飞翔");
    }
    
    @Override
    public void swim() {
        System.out.println("鸭子游泳");
    }
}

public class Test {
    public static void main(String[] args) {
        Duck duck = new Duck();
        
        // 向上转型到接口
        Flyable flyable = duck;
        Swimmable swimmable = duck;
        
        // 向下转型回具体类
        Duck duck2 = (Duck) flyable;
        Duck duck3 = (Duck) swimmable;
        
        // 接口之间的转换
        if (flyable instanceof Swimmable) {
            Swimmable swimmable2 = (Swimmable) flyable;
            swimmable2.swim();
        }
    }
}
```

#### 16.6 类型转换的最佳实践

**1. 优先使用instanceof检查**
```java
public void processAnimal(Animal animal) {
    if (animal instanceof Dog) {
        Dog dog = (Dog) animal;
        dog.bark();
    } else if (animal instanceof Cat) {
        Cat cat = (Cat) animal;
        cat.meow();
    } else {
        animal.eat(); // 使用父类方法
    }
}
```

**2. 使用模式匹配（Java 14+）**
```java
public void processAnimal(Animal animal) {
    if (animal instanceof Dog dog) {
        dog.bark(); // 自动转换
    } else if (animal instanceof Cat cat) {
        cat.meow(); // 自动转换
    } else {
        animal.eat();
    }
}
```

**3. 避免过度使用类型转换**
```java
// 不好的设计
public void process(Object obj) {
    if (obj instanceof String) {
        String str = (String) obj;
        // 处理字符串
    } else if (obj instanceof Integer) {
        Integer num = (Integer) obj;
        // 处理数字
    }
}

// 更好的设计 - 使用泛型
public <T> void process(T obj) {
    // 直接使用，无需类型转换
}
```

#### 16.7 总结

| 转换类型 | 语法 | 安全性 | 使用场景 |
|----------|------|--------|----------|
| 向上转型 | 自动 | 安全 | 多态使用 |
| 向下转型 | 强制 | 需检查 | 调用子类特有方法 |
| instanceof | 检查 | 安全 | 类型判断 |

> **关键要点**：向上转型安全自动，向下转型需要检查，instanceof是安全转换的保障。合理使用类型转换可以充分利用多态的优势，但要注意避免ClassCastException异常。

### 17. Java包（package）的命名规范、作用与分类

#### 17.1 包的作用

- **组织管理类文件**：将相关类、接口、枚举等组织在一起，便于项目结构清晰、维护方便。
- **避免命名冲突**：不同包下可以有同名的类，互不影响。
- **访问控制**：包提供包访问权限（default/package-private），有助于封装实现细节。
- **便于代码复用和分发**：包结构清晰，便于模块化开发和第三方库的分发。

#### 17.2 包的命名规范

- **全部小写**，多个单词用点`.`分隔。
- **推荐使用反域名（Reverse Domain Name）命名法**，保证全局唯一性。
  - 例如：`com.example.project.module`
- **不要使用Java保留字或特殊字符**。
- **包名应简洁明了，体现所属公司、项目、模块等信息**。
- **常见命名结构**：
  - 公司/组织域名反写 + 项目名 + 模块名 + 功能名
  - 例：`com.alibaba.fastjson.parser`
  - 例：`org.springframework.context.annotation`
- **避免使用下划线、连字符等特殊符号**。

**示例：**
```java
package com.example.myapp.service;
package org.apache.commons.lang3;
package cn.itcast.demo.util;
```

#### 17.3 包的分类方法

1. **按功能分层**（推荐，最常见）
   - `controller`：控制层（如Web接口、API入口）
   - `service`：业务逻辑层
   - `dao` / `repository`：数据访问层
   - `model` / `entity` / `domain`：实体类、数据模型
   - `util` / `utils`：工具类
   - `config`：配置类
   - `exception`：异常处理
   - `constant`：常量
   - 例：
     ```
     com.example.project.controller
     com.example.project.service
     com.example.project.dao
     com.example.project.model
     com.example.project.util
     ```

2. **按业务模块分类**
   - 适用于大型项目，将不同业务模块分包管理
   - 例：
     ```
     com.example.project.user
     com.example.project.order
     com.example.project.product
     ```

3. **按技术/层次混合分类**
   - 结合功能和业务模块
   - 例：
     ```
     com.example.project.user.controller
     com.example.project.user.service
     com.example.project.order.controller
     ```

4. **第三方/开源包命名**
   - 通常以组织域名反写开头，如`org.apache`, `com.google`, `io.reactivex`等

#### 17.4 包的使用示例

**定义包：**
```java
package com.example.myapp.service;

public class UserService {
    // ...
}
```

**导入包：**
```java
import com.example.myapp.service.UserService;
```

**包结构示意：**
```
src/
  └─ main/
      └─ java/
          └─ com/
              └─ example/
                  └─ myapp/
                      ├─ controller/
                      ├─ service/
                      ├─ dao/
                      ├─ model/
                      └─ util/
```

#### 17.5 总结

- 包的命名要规范、唯一、简洁，体现公司、项目、模块等信息。
- 合理分类包结构有助于项目的可维护性、可扩展性和团队协作。
- 推荐采用"反域名+项目+模块+功能"方式命名和分层。

> **最佳实践**：始终遵循公司/社区的包命名规范，保持包结构清晰有序，便于团队协作和代码管理。

### 18. final 关键词的作用与用法

#### 18.1 final 的基本作用

final 是 Java 的一个修饰符，可以用于**变量**、**方法**和**类**，其核心作用是"不可更改"：

- **final 变量**：值不可更改（常量）
- **final 方法**：不可被子类重写
- **final 类**：不可被继承

#### 18.2 final 用于变量

1. **修饰基本类型变量**  
   变量赋值后不可再更改
   ```java
   final int a = 10;
   // a = 20; // 编译错误
   ```

2. **修饰引用类型变量**  
   引用不可更改（即不能指向其他对象），但对象内容可变
   ```java
   final StringBuilder sb = new StringBuilder("hello");
   sb.append(" world"); // 合法，对象内容可变
   // sb = new StringBuilder(); // 编译错误，引用不可变
   ```

3. **修饰成员变量**  
   必须在定义时或构造方法中初始化
   ```java
   class Person {
       final String name;
       Person(String name) {
           this.name = name; // 构造器中初始化
       }
   }
   ```

4. **修饰静态变量**  
   通常与 static 连用，定义全局常量
   ```java
   public static final double PI = 3.1415926;
   ```

#### 18.3 final 用于方法

- 被 final 修饰的方法不能被子类重写（override），但可以被继承和重载（overload）。
```java
class Parent {
    public final void show() {
        System.out.println("父类方法");
    }
}
class Child extends Parent {
    // public void show() {} // 编译错误，不能重写
}
```

#### 18.4 final 用于类

- 被 final 修饰的类不能被继承，所有方法都隐式为 final。
```java
final class Constants {
    // ...
}
// class MyConstants extends Constants {} // 编译错误
```
- 常见应用：工具类（如 java.lang.String、java.lang.Math）

#### 18.5 final 的注意事项

- final 变量必须初始化，且只能赋值一次。
- final 不能与 abstract 同时使用（final 意味着不可变，abstract 意味着需被重写，两者矛盾）。
- final 方法可以被子类继承，但不能被重写。
- final 类不能有子类，但可以创建对象。

#### 18.6 典型应用场景

- 定义常量（public static final）
- 保证安全性（防止被继承或重写）
- 设计不可变类（如 String）

#### 18.7 示例总结

```java
public final class MyUtils {
    public static final double PI = 3.14;

    public final void printHello() {
        System.out.println("Hello");
    }
}
```

> **最佳实践**：final 用于常量、工具类、不可变对象和防止继承/重写的场景，能提升代码安全性和可维护性。

### 19. Java 常量（Constant）的定义与使用

#### 19.1 什么是常量

- 常量（Constant）指在程序运行过程中其值不可更改的量。
- 在 Java 中，常量通常用 `final` 关键字修饰，配合 `static` 关键字可定义全局常量。

#### 19.2 常量的定义方式

1. **局部常量**
   ```java
   final int DAYS_IN_WEEK = 7;
   ```

2. **类常量（全局常量）**
   - 推荐用 `public static final` 修饰，通常放在类的顶部。
   ```java
   public class MathConstants {
       public static final double PI = 3.1415926;
       public static final int MAX_SIZE = 1000;
   }
   ```

3. **接口常量**
   - 接口中的变量默认是 `public static final`，可省略修饰符。
   ```java
   public interface Status {
       int SUCCESS = 1;
       int ERROR = 0;
   }
   ```

#### 19.3 常量的命名规范

- **全部大写**，单词间用下划线 `_` 分隔。
- 命名应简洁明了，表达常量含义。
- 例：`MAX_VALUE`, `DEFAULT_TIMEOUT`, `PI`

#### 19.4 常量的使用场景

- 表示不会改变的物理量、配置信息、状态码、魔法数字等。
- 便于统一管理和维护，避免硬编码。
- 提高代码可读性和可维护性。

**示例：**
```java
public class Config {
    public static final String BASE_URL = "https://api.example.com";
    public static final int TIMEOUT_SECONDS = 30;
}
```

**使用：**
```java
System.out.println(Config.BASE_URL);
```

#### 19.5 常量的最佳实践

- 常量应集中管理，建议放在专门的常量类或接口中。
- 不要在代码中直接写"魔法数字"或"魔法字符串"，应使用常量代替。
- 常量一旦定义，不应再修改其值。

#### 19.6 常量与变量的区别

| 特性     | 常量（final）         | 变量                |
|----------|----------------------|---------------------|
| 值是否可变 | 不可变               | 可变                |
| 命名规范 | 全大写+下划线         | 小驼峰/下划线       |
| 赋值次数 | 只能赋值一次          | 可多次赋值          |
| 典型修饰 | static final         | 无                  |

#### 19.7 示例总结

```java
public class Constants {
    public static final double PI = 3.1415926;
    public static final int MAX_USER = 1000;
    public static final String APP_NAME = "MyApp";
}
```

> **最佳实践**：常量集中管理、命名规范、避免魔法数字，提升代码可维护性和可读性。

### 20. Java 字符串（String）是否不可变及原理

#### 20.1 不可变的含义

- **不可变（immutable）**：一旦创建，字符串对象的内容（字符序列）就不能被更改。
- 对字符串的任何修改操作（如拼接、替换、截取等）都会生成新的String对象，原有对象不会被改变。

#### 20.2 不可变的实现原理

- String 类被声明为 `final`，不能被继承。
- String 内部使用 `private final char[] value`（JDK 8 及以前）或 `private final byte[] value`（JDK 9+）存储字符数组，`final` 保证了数组引用不可变。
- 没有提供可以直接修改字符数组内容的方法。

**源码片段（JDK 17）：**
```java
public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    private final byte[] value; // JDK 9+ 用byte数组，JDK 8及以前用char[]
    // ...
}
```

#### 20.3 不可变的好处

1. **安全性**  
   字符串常用于用户名、密码、URL等敏感信息，防止被恶意篡改。
2. **线程安全**  
   多线程环境下可安全共享同一个字符串对象，无需加锁。
3. **字符串常量池优化**  
   不可变性使得字符串可以被缓存和复用，提高内存利用率和性能。
4. **哈希值缓存**  
   不可变对象的哈希值可缓存，提升作为 HashMap 键的效率。

#### 20.4 示例说明

```java
String s1 = "hello";
String s2 = "hello";
System.out.println(s1 == s2); // true，指向常量池同一对象
String s3 = new String("hello");
System.out.println(s1 == s3); // false，s3为新对象
System.out.println(s1 == s3.intern()); // true
```
- s1 改变后，s2 仍然指向原来的字符串对象，原内容未被修改。

#### 20.5 字符串可变的替代方案

- 如果需要频繁修改字符串内容，建议使用 `StringBuilder` 或 `StringBuffer`，它们是可变的字符串容器，效率更高。

**示例：**
```java
StringBuilder sb = new StringBuilder("hello");
sb.append(" world"); // 直接在原对象上修改
System.out.println(sb.toString()); // hello world
```

#### 20.6 总结

- **String 是不可变的**，所有修改操作都会生成新对象。
- 不可变性带来安全、线程安全、常量池优化等诸多好处。
- 频繁修改字符串时应使用 StringBuilder/StringBuffer。
```

### 21. Java 权限修饰符（访问控制修饰符）

#### 21.1 权限修饰符的作用

- 用于控制类、成员变量、方法等的访问范围，保护数据安全，隐藏实现细节，实现封装。

#### 21.2 四种权限修饰符

| 修饰符         | 说明                   | 关键字      |
|----------------|------------------------|-------------|
| 公有           | 任何地方都可访问        | public      |
| 受保护         | 同包或子类可访问        | protected   |
| 默认（包访问）  | 仅同包可访问            | （无修饰符） |
| 私有           | 仅本类可访问            | private     |

#### 21.3 访问范围对比表

| 修饰符      | 同类 | 同包 | 子类（不同包） | 其他包 |
|-------------|------|------|---------------|--------|
| public      | ✔    | ✔    | ✔             | ✔      |
| protected   | ✔    | ✔    | ✔             | ✘      |
| 默认（无）  | ✔    | ✔    | ✘             | ✘      |
| private     | ✔    | ✘    | ✘             | ✘      |

#### 21.4 典型用法与示例

```java
public class Person {
    public String name;         // 任何地方都可访问
    protected int age;          // 同包和子类可访问
    String gender;              // 默认（包访问），仅同包可访问
    private String idCard;      // 仅本类可访问

    public void showName() {
        System.out.println(name); // 可访问
        System.out.println(idCard); // 可访问
    }
}

class Student extends Person {
    public void showInfo() {
        System.out.println(name);   // public，能访问
        System.out.println(age);    // protected，能访问
        // System.out.println(idCard); // private，不能访问
        System.out.println(gender); // 默认，同包能访问
    }
}
```

#### 21.5 访问修饰符的使用建议

- **private**：优先用于成员变量，保证封装性，通过 getter/setter 访问。
- **public**：用于对外开放的类、方法、常量等。
- **protected**：用于继承体系中对子类开放的成员。
- **默认（无修饰符）**：用于包内部协作的类和成员。

#### 21.6 总结

- 合理使用权限修饰符是实现封装、保护数据和模块化设计的基础。
- 推荐"属性私有、方法公有"，通过方法暴露功能，隐藏实现细节。

> **最佳实践**：优先使用 private，必要时用 protected 或 public，尽量避免无修饰符暴露包外。

### 22. Java 代码块（初始化块）的类型与用法

#### 22.1 代码块的分类

1. **局部代码块**  
   出现在方法内部，用于限定变量作用域，常用于控制流程。
   ```java
   public void test() {
       {
           int x = 10;
           System.out.println(x);
       }
       // System.out.println(x); // 编译错误，x超出作用域
   }
   ```

2. **构造代码块（实例初始化块）**  
   直接写在类中、方法外，用 `{}` 包裹。
   每次创建对象时都会执行，优先于构造方法执行。
   常用于多个构造方法间的公共初始化代码。
   ```java
   public class Person {
       {
           System.out.println("构造代码块执行");
       }
       public Person() {
           System.out.println("无参构造");
       }
       public Person(String name) {
           System.out.println("有参构造");
       }
   }
   // new Person(); // 输出：构造代码块执行  无参构造
   // new Person("Tom"); // 输出：构造代码块执行  有参构造
   ```

3. **静态代码块（静态初始化块）**  
   用 `static {}` 声明，属于类本身。
   类加载时执行且只执行一次，常用于静态资源初始化。
   ```java
   public class Demo {
       static {
           System.out.println("静态代码块执行");
       }
   }
   // 类首次加载时输出：静态代码块执行
   ```

4. **同步代码块**  
   用于多线程并发控制，`synchronized {}`。
   ```java
   public void method() {
       synchronized(this) {
           // 线程安全的操作
       }
   }
   ```

#### 22.2 执行顺序

- 静态代码块 > 实例变量初始化 > 构造代码块 > 构造方法
- 静态代码块只执行一次，实例相关代码块每次创建对象都会执行

**示例：**
```java
public class Order {
    static {
        System.out.println("1. 静态代码块");
    }
    {
        System.out.println("2. 构造代码块");
    }
    public Order() {
        System.out.println("3. 构造方法");
    }
}
// new Order();
// 输出：1. 静态代码块（类加载时）
//      2. 构造代码块
//      3. 构造方法
```

#### 22.3 代码块的作用

- 静态代码块：初始化静态资源、加载驱动、只执行一次
- 构造代码块：多个构造方法间的公共初始化逻辑
- 局部代码块：限定变量作用域，优化内存
- 同步代码块：保证线程安全

#### 22.4 注意事项

- 静态代码块不能访问非静态成员
- 构造代码块可访问实例成员
- 代码块执行顺序影响对象初始化流程
- 同步代码块需合理选择锁对象，避免死锁

#### 22.5 典型应用场景

- 静态代码块：数据库驱动注册、全局配置加载
- 构造代码块：日志打印、对象通用初始化
- 局部代码块：for/if/switch等流程控制
- 同步代码块：多线程安全操作

#### 22.6 总结

- 合理使用代码块可提升代码复用性、可维护性和安全性。
- 静态代码块适合一次性初始化，构造代码块适合对象级初始化，局部代码块适合临时变量管理。

> **最佳实践**：优先用构造方法实现初始化，代码块用于特殊场景和通用逻辑，避免滥用。

### 23. Java 抽象类（Abstract Class）

#### 23.1 抽象类的概念

抽象类是一种特殊的类，用 `abstract` 关键字修饰，可以包含抽象方法和具体方法。
抽象类不能被实例化，只能被继承，子类必须实现所有抽象方法。

#### 23.2 抽象类的语法

```java
public abstract class Animal {
    // 抽象方法：没有方法体，子类必须实现
    public abstract void makeSound();
    
    // 具体方法：有方法体，子类可以直接使用
    public void sleep() {
        System.out.println("动物在睡觉");
    }
    
    // 构造方法：用于初始化
    public Animal() {
        System.out.println("动物被创建");
    }
    
    // 成员变量
    protected String name;
    protected int age;
}
```

#### 23.3 抽象类的特点

1. **不能实例化**
   ```java
   // Animal animal = new Animal(); // 编译错误
   ```

2. **可以包含抽象方法和具体方法**
   ```java
   public abstract class Shape {
       // 抽象方法
       public abstract double getArea();
       public abstract double getPerimeter();
       
       // 具体方法
       public void display() {
           System.out.println("这是一个形状");
       }
   }
   ```

3. **可以有构造方法**
   ```java
   public abstract class Vehicle {
       protected String brand;
       
       public Vehicle(String brand) {
           this.brand = brand;
       }
   }
   ```

4. **可以有成员变量**
   ```java
   public abstract class Person {
       protected String name;
       protected int age;
   }
   ```

#### 23.4 抽象方法的特点

- 用 `abstract` 关键字修饰
- 没有方法体（没有 `{}`）
- 子类必须实现
- 不能是 `private` 或 `static`

```java
public abstract class Database {
    // 抽象方法
    public abstract void connect();
    public abstract void disconnect();
    public abstract void executeQuery(String sql);
    
    // 具体方法
    public void log(String message) {
        System.out.println("日志: " + message);
    }
}
```

#### 23.5 抽象类的继承

```java
// 抽象类继承抽象类
public abstract class Bird extends Animal {
    public abstract void fly();
}

// 具体类继承抽象类
public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("汪汪汪");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("喵喵喵");
    }
}
```

#### 23.6 抽象类与接口的区别

| 特性 | 抽象类 | 接口 |
|------|--------|------|
| 关键字 | `abstract class` | `interface` |
| 构造方法 | 可以有 | 不能有 |
| 成员变量 | 可以有各种修饰符 | 默认 `public static final` |
| 方法实现 | 可以有具体方法 | Java 8+ 可以有默认方法 |
| 继承 | 单继承 | 多实现 |
| 访问修饰符 | 各种修饰符 | 默认 `public` |

#### 23.7 抽象类的使用场景

1. **模板方法模式**
   ```java
   public abstract class Game {
       // 模板方法
       public final void play() {
           initialize();
           startPlay();
           endPlay();
       }
       
       // 抽象方法，子类实现
       protected abstract void initialize();
       protected abstract void startPlay();
       protected abstract void endPlay();
   }
   
   public class Cricket extends Game {
       @Override
       protected void initialize() {
           System.out.println("板球游戏初始化");
       }
       
       @Override
       protected void startPlay() {
           System.out.println("开始板球游戏");
       }
       
       @Override
       protected void endPlay() {
           System.out.println("结束板球游戏");
       }
   }
   ```

2. **代码复用**
   ```java
   public abstract class Employee {
       protected String name;
       protected double salary;
       
       public Employee(String name, double salary) {
           this.name = name;
           this.salary = salary;
       }
       
       // 通用方法
       public void work() {
           System.out.println(name + " 在工作");
       }
       
       // 抽象方法，子类实现
       public abstract double calculateBonus();
   }
   
   public class Manager extends Employee {
       public Manager(String name, double salary) {
           super(name, salary);
       }
       
       @Override
       public double calculateBonus() {
           return salary * 0.2;
       }
   }
   ```

#### 23.8 注意事项

1. **抽象类不能被 `final` 修饰**
   ```java
   // public final abstract class Test {} // 编译错误
   ```

2. **抽象方法不能是 `private`**
   ```java
   public abstract class Test {
       // private abstract void method(); // 编译错误
       protected abstract void method(); // 正确
   }
   ```

3. **抽象方法不能是 `static`**
   ```java
   public abstract class Test {
       // public static abstract void method(); // 编译错误
       public abstract void method(); // 正确
   }
   ```

4. **子类必须实现所有抽象方法**
   ```java
   public abstract class Parent {
       public abstract void method1();
       public abstract void method2();
   }
   
   public class Child extends Parent {
       @Override
       public void method1() {
           // 实现
       }
       
       @Override
       public void method2() {
           // 实现
       }
   }
   ```

#### 23.9 抽象类的优势

1. **代码复用**：具体方法可以在子类中直接使用
2. **强制规范**：抽象方法强制子类实现特定功能
3. **封装性**：可以隐藏实现细节
4. **扩展性**：易于添加新的子类

#### 23.10 实际应用示例

```java
// 数据库操作抽象类
public abstract class DatabaseOperation {
    protected Connection connection;
    
    public DatabaseOperation() {
        this.connection = getConnection();
    }
    
    // 模板方法
    public final void executeOperation() {
        openConnection();
        performOperation();
        closeConnection();
    }
    
    // 具体方法
    protected void openConnection() {
        System.out.println("打开数据库连接");
    }
    
    protected void closeConnection() {
        System.out.println("关闭数据库连接");
    }
    
    // 抽象方法
    protected abstract void performOperation();
    protected abstract Connection getConnection();
}

// 具体实现
public class MySQLOperation extends DatabaseOperation {
    @Override
    protected void performOperation() {
        System.out.println("执行MySQL操作");
    }
    
    @Override
    protected Connection getConnection() {
        return new MySQLConnection();
    }
}
```

#### 23.11 总结

- 抽象类提供了一种介于接口和具体类之间的抽象层次
- 适合有共同属性和行为的类族设计
- 支持代码复用和强制规范
- 是面向对象设计中重要的抽象工具

> **最佳实践**：当多个类有共同属性和行为时，使用抽象类；当只需要定义规范时，使用接口。抽象类适合"是什么"的关系，接口适合"能做什么"的关系。

---

### 24. Java 接口（Interface）

#### 24.1 接口的概念

- 接口（interface）是Java中用`interface`关键字定义的一种引用类型，是抽象方法和常量值的集合。
- 接口只定义规范（方法签名、常量），不包含具体实现。
- 接口用于描述一组类应当遵循的行为标准，实现代码解耦和多态。

#### 24.2 接口的语法与定义

```java
public interface Animal {
    void makeSound(); // 抽象方法，默认public abstract
    int AGE = 10;     // 常量，默认public static final
}
```

- 接口中的方法默认是`public abstract`，可以省略。
- 接口中的变量默认是`public static final`，必须初始化。
- 接口不能有构造方法。

#### 24.3 接口的实现与多继承

- 类通过`implements`关键字实现接口，可以实现多个接口（用逗号分隔）。
- 一个类可以继承一个父类，同时实现多个接口。
- 接口之间可以多继承（`extends`），一个接口可以继承多个接口。

**示例：**
```java
public interface Flyable {
    void fly();
}

public interface Swimmable {
    void swim();
}

public class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("鸭子飞翔");
    }
    @Override
    public void swim() {
        System.out.println("鸭子游泳");
    }
}
```

#### 24.4 接口的默认方法与静态方法（Java 8+）

- 接口可以有`default`修饰的默认方法（有方法体），用于接口升级时的兼容。
- 接口可以有`static`修饰的静态方法（有方法体），只能通过接口名调用。

**示例：**
```java
public interface MyInterface {
    void abstractMethod();
    default void defaultMethod() {
        System.out.println("默认方法");
    }
    static void staticMethod() {
        System.out.println("静态方法");
    }
}

public class MyClass implements MyInterface {
    @Override
    public void abstractMethod() {
        System.out.println("实现抽象方法");
    }
}

// 调用
MyClass obj = new MyClass();
obj.defaultMethod(); // 默认方法
MyInterface.staticMethod(); // 静态方法
```

#### 24.5 接口的特性与规则

- 接口不能被实例化。
- 实现类必须实现接口的所有抽象方法，否则实现类也必须声明为抽象类。
- 接口支持多继承，类只支持单继承。
- 接口可以有常量、抽象方法、默认方法、静态方法（Java 8+）、私有方法（Java 9+）。
- 接口方法不能是private、protected、final、static（除非是静态方法实现）。

#### 24.6 接口的使用场景

- 规范API设计，定义一组类的统一行为。
- 解耦系统结构，实现多态和灵活扩展。
- 回调机制、策略模式、适配器模式等设计模式。
- JDK大量API（如Runnable、Comparator、List等）都基于接口设计。

#### 24.7 示例代码

```java
public interface USB {
    void connect();
    void disconnect();
}

public class Mouse implements USB {
    @Override
    public void connect() {
        System.out.println("鼠标已连接");
    }
    @Override
    public void disconnect() {
        System.out.println("鼠标已断开");
    }
}

public class Keyboard implements USB {
    @Override
    public void connect() {
        System.out.println("键盘已连接");
    }
    @Override
    public void disconnect() {
        System.out.println("键盘已断开");
    }
}

public class Computer {
    public void useUSB(USB usb) {
        usb.connect();
        System.out.println("设备工作中...");
        usb.disconnect();
    }
    public static void main(String[] args) {
        Computer pc = new Computer();
        pc.useUSB(new Mouse());
        pc.useUSB(new Keyboard());
    }
}
```

#### 24.8 注意事项与补充

- 一个类可以实现多个接口，接口之间用逗号分隔。
- 接口可以继承多个接口，实现多继承特性。
- 接口中的常量建议大写字母+下划线命名。
- 接口适合做规范、回调、扩展点，避免滥用。

> **总结：** 接口是行为规范和扩展点，是Java实现多态和解耦的核心机制。合理设计接口有助于系统的灵活性、可维护性和可扩展性。

---

### 25. 适配器设计模式

适配器模式（Adapter Pattern）是一种结构型设计模式，它允许将一个类的接口转换成客户端所期望的另一个接口，使得原本由于接口不兼容而不能一起工作的类可以一起工作。

#### 25.1 基本概念

- **目标接口（Target）**：客户端所期望的接口
- **适配者（Adaptee）**：需要被适配的类或接口
- **适配器（Adapter）**：将适配者转换为目标接口的类

#### 25.2 适配器的两种实现方式

1. **类适配器**：通过继承适配者来实现
2. **对象适配器**：通过组合适配者来实现

#### 25.3 类适配器模式

类适配器使用继承机制实现适配。

```java
// 目标接口
public interface Target {
    void request();
}

// 适配者
public class Adaptee {
    public void specificRequest() {
        System.out.println("适配者的特殊请求");
    }
}

// 类适配器
public class ClassAdapter extends Adaptee implements Target {
    @Override
    public void request() {
        specificRequest(); // 调用适配者的方法
    }
}

// 客户端代码
public class Client {
    public static void main(String[] args) {
        Target target = new ClassAdapter();
        target.request(); // 通过适配器调用适配者的方法
    }
}
```

#### 25.4 对象适配器模式

对象适配器使用组合机制实现适配。

```java
// 目标接口
public interface Target {
    void request();
}

// 适配者
public class Adaptee {
    public void specificRequest() {
        System.out.println("适配者的特殊请求");
    }
}

// 对象适配器
public class ObjectAdapter implements Target {
    private Adaptee adaptee;

    public ObjectAdapter(Adaptee adaptee) {
        this.adaptee = adaptee;
    }

    @Override
    public void request() {
        adaptee.specificRequest(); // 调用适配者的方法
    }
}

// 客户端代码
public class Client {
    public static void main(String[] args) {
        Adaptee adaptee = new Adaptee();
        Target target = new ObjectAdapter(adaptee);
        target.request(); // 通过适配器调用适配者的方法
    }
}
```

#### 25.5 实际应用场景

**1. 电源适配器示例**

```java
// 220V交流电
public class AC220 {
    public int output220V() {
        return 220;
    }
}

// 5V直流电接口
public interface DC5 {
    int output5V();
}

// 电源适配器
public class PowerAdapter implements DC5 {
    private AC220 ac220;

    public PowerAdapter(AC220 ac220) {
        this.ac220 = ac220;
    }

    @Override
    public int output5V() {
        int input = ac220.output220V();
        // 变压
        int output = input / 44;
        System.out.println("输入电压: " + input + "V -> 输出电压: " + output + "V");
        return output;
    }
}

// 使用示例
public class PowerAdapterDemo {
    public static void main(String[] args) {
        DC5 dc5 = new PowerAdapter(new AC220());
        dc5.output5V();
    }
}
```

**2. 日期格式转换适配器**

```java
// 老的日期接口
public class OldDateFormat {
    public String formatDate(Date date) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        return sdf.format(date);
    }
}

// 新的日期接口
public interface NewDateFormat {
    String formatDate(LocalDate date);
}

// 日期格式适配器
public class DateFormatAdapter implements NewDateFormat {
    private OldDateFormat oldFormat;

    public DateFormatAdapter(OldDateFormat oldFormat) {
        this.oldFormat = oldFormat;
    }

    @Override
    public String formatDate(LocalDate date) {
        // 将LocalDate转换为Date
        Date oldDate = Date.from(date.atStartOfDay(ZoneId.systemDefault()).toInstant());
        return oldFormat.formatDate(oldDate);
    }
}

// 使用示例
public class DateFormatDemo {
    public static void main(String[] args) {
        NewDateFormat adapter = new DateFormatAdapter(new OldDateFormat());
        String formattedDate = adapter.formatDate(LocalDate.now());
        System.out.println("格式化日期: " + formattedDate);
    }
}
```

**3. 第三方SDK适配**

```java
// 第三方支付接口
public interface ThirdPartyPayment {
    void processPayment(String orderId, double amount);
}

// 支付宝SDK
public class AlipaySDK {
    public void payWithAlipay(String orderNo, double money) {
        System.out.println("使用支付宝支付: " + money + "元");
    }
}

// 微信支付SDK
public class WeChatPaySDK {
    public void pay(String orderId, float price) {
        System.out.println("使用微信支付: " + price + "元");
    }
}

// 统一支付接口
public interface UnifiedPayment {
    void pay(String orderId, double amount);
}

// 支付宝适配器
public class AlipayAdapter implements UnifiedPayment {
    private AlipaySDK alipaySDK;

    public AlipayAdapter(AlipaySDK alipaySDK) {
        this.alipaySDK = alipaySDK;
    }

    @Override
    public void pay(String orderId, double amount) {
        alipaySDK.payWithAlipay(orderId, amount);
    }
}

// 微信支付适配器
public class WeChatPayAdapter implements UnifiedPayment {
    private WeChatPaySDK weChatPaySDK;

    public WeChatPayAdapter(WeChatPaySDK weChatPaySDK) {
        this.weChatPaySDK = weChatPaySDK;
    }

    @Override
    public void pay(String orderId, double amount) {
        weChatPaySDK.pay(orderId, (float)amount);
    }
}

// 支付服务
public class PaymentService {
    private UnifiedPayment paymentMethod;

    public void setPaymentMethod(UnifiedPayment paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public void processPayment(String orderId, double amount) {
        paymentMethod.pay(orderId, amount);
    }
}

// 使用示例
public class PaymentDemo {
    public static void main(String[] args) {
        PaymentService paymentService = new PaymentService();

        // 使用支付宝支付
        paymentService.setPaymentMethod(new AlipayAdapter(new AlipaySDK()));
        paymentService.processPayment("ORDER001", 100.00);

        // 使用微信支付
        paymentService.setPaymentMethod(new WeChatPayAdapter(new WeChatPaySDK()));
        paymentService.processPayment("ORDER002", 200.00);
    }
}
```

#### 25.6 适配器模式的优缺点

**优点：**
1. 将目标类和适配者类解耦
2. 增加了类的透明性
3. 提高了类的复用性
4. 灵活性好

**缺点：**
1. 过多使用适配器会让系统变得凌乱
2. 类适配器模式的缺点是不支持适配器的适配者类的子类

#### 25.7 使用场景

1. 系统需要使用现有的类，但接口不符合要求
2. 想要建立一个可以重复使用的类，用于与一些彼此之间没有太大关联的类一起工作
3. 需要统一多个类的接口设计
4. 旧系统改造与升级

#### 25.8 最佳实践

1. 优先使用对象适配器，更符合组合复用原则
2. 尽量保持适配器的简单性，只做必要的转换
3. 适配器类命名应当以"Adapter"结尾
4. 适配器中的代码应该是"薄"的，只做必要的接口转换

> **注意**：适配器模式是一种"补偿模式"，用来补救设计上的缺陷。如果在设计之初就能协调好接口，就不需要适配器模式了。

---

### 26. Java内部类

内部类（Inner Class）是定义在另一个类内部的类。Java支持四种内部类：成员内部类、静态内部类、局部内部类和匿名内部类。

#### 26.1 成员内部类

成员内部类是最普通的内部类，作为外部类的一个成员存在，可以无限制地访问外部类的所有成员。

```java
public class OuterClass {
    private String outerField = "外部类字段";
    
    // 成员内部类
    public class InnerClass {
        private String innerField = "内部类字段";
        
        public void innerMethod() {
            // 访问外部类的私有成员
            System.out.println(outerField);
            // 访问外部类的this引用
            System.out.println(OuterClass.this.outerField);
            // 访问内部类成员
            System.out.println(innerField);
        }
    }
    
    // 外部类方法
    public void createInner() {
        InnerClass inner = new InnerClass();
        inner.innerMethod();
    }
}

// 使用示例
public class Main {
    public static void main(String[] args) {
        // 创建外部类实例
        OuterClass outer = new OuterClass();
        // 创建内部类实例
        OuterClass.InnerClass inner = outer.new InnerClass();
        inner.innerMethod();
    }
}
```

**特点：**
1. 可以访问外部类的所有成员，包括私有成员
2. 必须先创建外部类实例，才能创建内部类实例
3. 内部类中可以使用OuterClass.this引用外部类实例

#### 26.2 静态内部类

静态内部类（Static Nested Class）是使用static修饰的内部类，不依赖外部类实例。

```java
public class OuterClass {
    private static String staticField = "静态字段";
    private String instanceField = "实例字段";
    
    // 静态内部类
    public static class StaticInnerClass {
        public void display() {
            // 可以访问外部类的静态成员
            System.out.println(staticField);
            // 不能直接访问外部类的实例成员
            // System.out.println(instanceField); // 编译错误
        }
    }
}

// 使用示例
public class Main {
    public static void main(String[] args) {
        // 直接创建静态内部类实例，不需要外部类实例
        OuterClass.StaticInnerClass inner = new OuterClass.StaticInnerClass();
        inner.display();
    }
}
```

**特点：**
1. 只能访问外部类的静态成员
2. 不需要外部类实例即可创建
3. 可以包含静态成员和实例成员

#### 26.3 局部内部类

局部内部类是定义在方法或作用域内的类。

```java
public class OuterClass {
    private String field = "外部类字段";
    
    public void method(final String param) {
        final String localVar = "局部变量";
        
        // 局部内部类
        class LocalInnerClass {
            public void print() {
                // 访问外部类成员
                System.out.println(field);
                // 访问方法参数和局部变量（必须是final或实际上的final）
                System.out.println(param);
                System.out.println(localVar);
            }
        }
        
        // 创建并使用局部内部类
        LocalInnerClass local = new LocalInnerClass();
        local.print();
    }
}
```

**特点：**
1. 只能在定义它的方法或作用域内使用
2. 可以访问外部类的所有成员
3. 可以访问所在方法的final或实际上final的局部变量

#### 26.4 匿名内部类

匿名内部类是没有名字的内部类，必须继承一个父类或实现一个接口。

```java
public interface Greeting {
    void greet();
}

public class OuterClass {
    public void sayHello() {
        // 匿名内部类实现接口
        Greeting greeting = new Greeting() {
            @Override
            public void greet() {
                System.out.println("Hello from anonymous class!");
            }
        };
        greeting.greet();
    }
    
    public void processRunnable() {
        // 匿名内部类实现Runnable接口
        Runnable runnable = new Runnable() {
            @Override
            public void run() {
                System.out.println("Running in anonymous class");
            }
        };
        new Thread(runnable).start();
        
        // 使用Lambda表达式（简化的匿名内部类）
        Runnable lambda = () -> System.out.println("Running in lambda");
        new Thread(lambda).start();
    }
}
```

**特点：**
1. 没有类名，创建时必须继承或实现一个接口
2. 只能使用一次
3. 可以访问外部类的所有成员
4. 经常用于事件处理和回调

#### 26.5 实际应用场景

**1. 适配器模式中使用匿名内部类**
```java
public class Button {
    private OnClickListener listener;
    
    public interface OnClickListener {
        void onClick();
    }
    
    public void setOnClickListener(OnClickListener listener) {
        this.listener = listener;
    }
    
    public void click() {
        if (listener != null) {
            listener.onClick();
        }
    }
}

// 使用示例
public class Main {
    public static void main(String[] args) {
        Button button = new Button();
        
        // 使用匿名内部类设置点击监听器
        button.setOnClickListener(new Button.OnClickListener() {
            @Override
            public void onClick() {
                System.out.println("Button clicked!");
            }
        });
        
        // 使用Lambda表达式（简化形式）
        button.setOnClickListener(() -> System.out.println("Button clicked!"));
        
        button.click();
    }
}
```

**2. 构建器模式中使用静态内部类**
```java
public class Person {
    private final String name;
    private final int age;
    private final String address;
    
    private Person(Builder builder) {
        this.name = builder.name;
        this.age = builder.age;
        this.address = builder.address;
    }
    
    // 静态内部类作为构建器
    public static class Builder {
        private String name;
        private int age;
        private String address;
        
        public Builder name(String name) {
            this.name = name;
            return this;
        }
        
        public Builder age(int age) {
            this.age = age;
            return this;
        }
        
        public Builder address(String address) {
            this.address = address;
            return this;
        }
        
        public Person build() {
            return new Person(this);
        }
    }
}

// 使用示例
Person person = new Person.Builder()
    .name("张三")
    .age(25)
    .address("北京")
    .build();
```

**3. 数据封装中使用成员内部类**
```java
public class LinkedList<E> {
    private Node<E> first;
    private int size;
    
    // 成员内部类封装节点实现
    private class Node<E> {
        E item;
        Node<E> next;
        
        Node(E element, Node<E> next) {
            this.item = element;
            this.next = next;
        }
    }
    
    public void add(E element) {
        Node<E> newNode = new Node<>(element, first);
        first = newNode;
        size++;
    }
}
```

#### 26.6 内部类的优点

1. **封装性**：内部类可以访问外部类的私有成员
2. **代码组织**：将相关的类放在一起，提高可读性
3. **回调机制**：匿名内部类适合用于事件处理
4. **数据隐藏**：可以对外隐藏实现细节

#### 26.7 注意事项

1. 内部类会持有外部类的引用，可能导致内存泄漏
2. 过多使用内部类会使代码结构复杂
3. 静态内部类不持有外部类引用，内存效率更高
4. 局部内部类访问局部变量时，变量必须是final或实际上的final

#### 26.8 最佳实践

1. 优先使用静态内部类，除非需要访问外部类的实例成员
2. 使用内部类封装实现细节
3. 合理使用匿名内部类简化代码
4. 注意内存泄漏问题，适时释放资源

> **提示**：在Java 8及以后的版本中，对于函数式接口，优先使用Lambda表达式替代匿名内部类，代码更简洁。

---

## 30.3 继承中构造方法的自动调用（super）

- 在Java中，子类构造方法执行时会**自动调用父类的构造方法**，以保证父类部分被正确初始化。
- 如果子类构造方法没有显式写`super(...)`，编译器会自动在第一行加上`super();`，即调用父类的无参构造方法。
- 如果父类没有无参构造方法，子类必须显式调用父类的有参构造方法，否则编译报错。
- `super(...)`必须是子类构造方法的第一条语句。

**调用顺序：**
1. 先执行父类构造方法（super），再执行子类构造方法。
2. 多层继承时，先最顶层父类，再逐层向下。

**示例：**
```java
class Parent {
    Parent() { System.out.println("父类构造"); }
}
class Child extends Parent {
    Child() { System.out.println("子类构造"); }
}
public class Test {
    public static void main(String[] args) {
        new Child();
        // 输出：
        // 父类构造
        // 子类构造
    }
}
```

**有参构造情况：**
```java
class Parent {
    Parent(String msg) { System.out.println(msg); }
}
class Child extends Parent {
    Child() { super("父类有参构造"); System.out.println("子类构造"); }
}
```

> 理解构造方法的自动调用顺序，有助于正确初始化继承体系中的对象，避免常见的编译和运行错误。

## 30.4 构造方法中this(...)的含义与用法

- 在Java构造方法中，`this(...)`用于调用本类的另一个构造方法，实现构造方法之间的重用和统一初始化。
- `this(...)`只能出现在构造方法的第一行，且不能与super(...)同时出现。
- 通过this(...)可以实现构造方法的链式调用，最终会调用到某个没有this(...)的构造方法（通常是最全参的构造方法）。

**示例：**
```java
class Person {
    String name;
    int age;

    // 无参构造
    public Person() {
        this("无名氏", 0); // 调用有参构造
        System.out.println("无参构造执行");
    }

    // 有参构造
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
        System.out.println("有参构造执行");
    }
}

public class Test {
    public static void main(String[] args) {
        Person p = new Person();
        // 输出：
        // 有参构造执行
        // 无参构造执行
    }
}
```

**注意事项：**
- this(...)只能用于构造方法，且必须是第一条语句。
- 不能和super(...)同时出现。

**作用总结：**
- 统一初始化逻辑，减少重复代码。
- 便于维护和扩展构造方法。

> 在构造方法中用this(...)，就是"让本类的另一个构造方法帮我初始化"。

## 31. 多态（Polymorphism）

### 31.1 多态的概念与实现方式

- **多态**：同一个接口，使用不同的实例而执行不同操作。
- **编译时多态**：方法重载（Overloading）
- **运行时多态**：方法重写（Overriding）

**示例：**
```java
interface Animal {
    void makeSound();
}

class Dog implements Animal {
    @Override
    public void makeSound() {
        System.out.println("汪汪汪");
    }
}

class Cat implements Animal {
    @Override
    public void makeSound() {
        System.out.println("喵喵喵");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal animal1 = new Dog(); // 父类引用指向子类对象
        Animal animal2 = new Cat();
        
        animal1.makeSound(); // 输出：汪汪汪
        animal2.makeSound(); // 输出：喵喵喵
    }
}
```

### 31.2 多态的应用场景

- **方法参数多态**：一个方法可以接受不同类型的参数，实现不同的行为。
- **方法返回值多态**：一个方法可以返回不同类型的对象，实现不同的行为。
- **集合中的多态**：如List、Set、Map等，可以存储不同类型的对象，实现统一处理。

**示例：**
```java
public class AnimalTrainer {
    public void train(Animal animal) {
        animal.makeSound();
    }
}

public class AnimalFactory {
    public static Animal createAnimal(String type) {
        if ("dog".equals(type)) {
            return new Dog();
        } else if ("cat".equals(type)) {
            return new Cat();
        }
        return null;
    }
}

public class Test {
    public static void main(String[] args) {
        AnimalTrainer trainer = new AnimalTrainer();
        trainer.train(new Dog()); // 输出：汪汪汪
        trainer.train(new Cat()); // 输出：喵喵喵

        Animal dog = AnimalFactory.createAnimal("dog");
        Animal cat = AnimalFactory.createAnimal("cat");
        dog.makeSound(); // 输出：汪汪汪
        cat.makeSound(); // 输出：喵喵喵
    }
}
```

### 31.3 多态的注意事项

- **成员变量没有多态**：父类和子类的成员变量是独立的，子类不能访问父类的成员变量。
- **静态方法没有多态**：父类的静态方法不能被子类重写，子类可以定义同名的静态方法。
- **构造方法没有多态**：子类不能重写父类的构造方法。

**示例：**
```java
class Parent {
    int num = 10;
    String name = "父类";
    
    public void showInfo() {
        System.out.println("父类方法中的num: " + num);
        System.out.println("父类方法中的name: " + name);
    }
}

class Child extends Parent {
    int num = 20;
    String name = "子类";
    
    @Override
    public void showInfo() {
        System.out.println("子类方法中的num: " + num);
        System.out.println("子类方法中的name: " + name);
    }
}

public class Test {
    public static void main(String[] args) {
        Parent p = new Child(); // 父类引用指向子类对象
        
        // 成员变量调用 - 看引用类型
        System.out.println(p.num);    // 输出：10（父类的num）
        System.out.println(p.name);   // 输出：父类（父类的name）
        
        // 成员方法调用 - 看对象类型
        p.showInfo(); // 输出：
        // 子类方法中的num: 20
        // 子类方法中的name: 子类
    }
}
```

### 31.4 多态的优势与实际应用

1. **可扩展性**：新增子类不需要修改现有代码，只需添加新的子类即可。
2. **可维护性**：统一的接口，便于维护和扩展。
3. **可复用性**：一个方法可以处理多种类型的对象，提高代码的复用性。
4. **灵活性**：运行时动态绑定，提高程序的灵活性。

**示例：**
```java
public class AnimalTrainer {
    public void train(Animal animal) {
        animal.makeSound();
    }
}

public class AnimalFactory {
    public static Animal createAnimal(String type) {
        if ("dog".equals(type)) {
            return new Dog();
        } else if ("cat".equals(type)) {
            return new Cat();
        }
        return null;
    }
}

public class Test {
    public static void main(String[] args) {
        AnimalTrainer trainer = new AnimalTrainer();
        trainer.train(new Dog()); // 输出：汪汪汪
        trainer.train(new Cat()); // 输出：喵喵喵

        Animal dog = AnimalFactory.createAnimal("dog");
        Animal cat = AnimalFactory.createAnimal("cat");
        dog.makeSound(); // 输出：汪汪汪
        cat.makeSound(); // 输出：喵喵喵
    }
}
```

### 31.5 多态中成员变量与成员方法的调用机制

多态中成员变量和成员方法的调用行为存在重要差异，理解这些差异有助于正确使用多态特性。



### 32. 抽象类与抽象方法

#### 32.1 抽象类的概念

- 抽象类（abstract class）是用`abstract`关键字修饰的类，不能被实例化，只能被继承。
- 抽象类可以包含抽象方法（没有方法体的方法）和普通方法（有方法体的方法）。
- 抽象类用于描述一类事物的通用特征，具体实现由子类完成。

#### 32.2 抽象方法的概念

- 抽象方法用`abstract`关键字修饰，没有方法体（只声明，不实现）。
- 抽象方法只能出现在抽象类或接口中。
- 子类继承抽象类后，必须实现所有抽象方法，否则子类也必须声明为抽象类。

**抽象类和抽象方法的语法：**
```java
public abstract class Animal {
    public abstract void makeSound(); // 抽象方法
    public void eat() {
        System.out.println("动物吃东西");
    }
}
```

#### 32.3 特性与规则

- 抽象类不能被实例化：`new Animal()`会报错。
- 抽象类可以有构造方法（用于子类初始化）。
- 抽象类可以有成员变量、普通方法、静态方法、常量等。
- 抽象类可以没有抽象方法（但一般有）。
- 抽象方法不能有方法体，不能用`private`、`static`、`final`修饰。
- 子类必须实现所有抽象方法，除非子类也是抽象类。

#### 32.4 使用场景

- 抽象类用于描述一组具有共性但不完全相同的对象。
- 适合做模板、基类，定义规范和通用行为，具体细节由子类实现。
- 常用于框架、模板方法设计模式等。

#### 32.5 示例代码

```java
// 抽象类定义
public abstract class Animal {
    public abstract void makeSound(); // 抽象方法
    public void eat() {
        System.out.println("动物吃东西");
    }
}

// 具体子类实现
public class Dog extends Animal {
    @Override
    public void makeSound() {
        System.out.println("汪汪汪");
    }
}

public class Cat extends Animal {
    @Override
    public void makeSound() {
        System.out.println("喵喵喵");
    }
}

public class Test {
    public static void main(String[] args) {
        Animal dog = new Dog();
        Animal cat = new Cat();
        dog.makeSound(); // 输出：汪汪汪
        cat.makeSound(); // 输出：喵喵喵
        dog.eat(); // 输出：动物吃东西
    }
}
```

#### 32.6 注意事项与补充

- 抽象类可以有构造方法，但不能直接创建对象。
- 抽象类的子类如果没有实现所有抽象方法，子类也必须声明为抽象类。
- 抽象方法不能是private、static、final。
- 抽象类可以有静态方法和常量。
- 抽象类可以实现接口，也可以被其他类继承。

> **总结：** 抽象类是模板，抽象方法是规范。用抽象类可以统一一组子类的行为规范，强制子类实现核心功能，提升代码的可扩展性和可维护性。

---

### 33. 接口（Interface）

#### 33.1 接口的概念

- 接口（interface）是Java中用`interface`关键字定义的一种引用类型，是抽象方法和常量值的集合。
- 接口只定义规范（方法签名、常量），不包含具体实现。
- 接口用于描述一组类应当遵循的行为标准，实现代码解耦和多态。

#### 33.2 接口的语法与定义

```java
public interface Animal {
    void makeSound(); // 抽象方法，默认public abstract
    int AGE = 10;     // 常量，默认public static final
}
```

- 接口中的方法默认是`public abstract`，可以省略。
- 接口中的变量默认是`public static final`，必须初始化。
- 接口不能有构造方法。

#### 33.3 接口的实现与多继承

- 类通过`implements`关键字实现接口，可以实现多个接口（用逗号分隔）。
- 一个类可以继承一个父类，同时实现多个接口。
- 接口之间可以多继承（`extends`），一个接口可以继承多个接口。

**示例：**
```java
public interface Flyable {
    void fly();
}

public interface Swimmable {
    void swim();
}

public class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("鸭子飞翔");
    }
    @Override
    public void swim() {
        System.out.println("鸭子游泳");
    }
}
```

#### 33.4 接口的默认方法与静态方法（Java 8+）

- 接口可以有`default`修饰的默认方法（有方法体），用于接口升级时的兼容。
- 接口可以有`static`修饰的静态方法（有方法体），只能通过接口名调用。

**示例：**
```java
public interface MyInterface {
    void abstractMethod();
    default void defaultMethod() {
        System.out.println("默认方法");
    }
    static void staticMethod() {
        System.out.println("静态方法");
    }
}

public class MyClass implements MyInterface {
    @Override
    public void abstractMethod() {
        System.out.println("实现抽象方法");
    }
}

// 调用
MyClass obj = new MyClass();
obj.defaultMethod(); // 默认方法
MyInterface.staticMethod(); // 静态方法
```

#### 33.5 接口的特性与规则

- 接口不能被实例化。
- 实现类必须实现接口的所有抽象方法，否则实现类也必须声明为抽象类。
- 接口支持多继承，类只支持单继承。
- 接口可以有常量、抽象方法、默认方法、静态方法（Java 8+）、私有方法（Java 9+）。
- 接口方法不能是private、protected、final、static（除非是静态方法实现）。

#### 33.6 接口的使用场景

- 规范API设计，定义一组类的统一行为。
- 解耦系统结构，实现多态和灵活扩展。
- 回调机制、策略模式、适配器模式等设计模式。
- JDK大量API（如Runnable、Comparator、List等）都基于接口设计。

#### 33.7 示例代码

```java
public interface USB {
    void connect();
    void disconnect();
}

public class Mouse implements USB {
    @Override
    public void connect() {
        System.out.println("鼠标已连接");
    }
    @Override
    public void disconnect() {
        System.out.println("鼠标已断开");
    }
}

public class Keyboard implements USB {
    @Override
    public void connect() {
        System.out.println("键盘已连接");
    }
    @Override
    public void disconnect() {
        System.out.println("键盘已断开");
    }
}

public class Computer {
    public void useUSB(USB usb) {
        usb.connect();
        System.out.println("设备工作中...");
        usb.disconnect();
    }
    public static void main(String[] args) {
        Computer pc = new Computer();
        pc.useUSB(new Mouse());
        pc.useUSB(new Keyboard());
    }
}
```

#### 33.8 注意事项与补充

- 一个类可以实现多个接口，接口之间用逗号分隔。
- 接口可以继承多个接口，实现多继承特性。
- 接口中的常量建议大写字母+下划线命名。
- 接口适合做规范、回调、扩展点，避免滥用。

> **总结：** 接口是行为规范和扩展点，是Java实现多态和解耦的核心机制。合理设计接口有助于系统的灵活性、可维护性和可扩展性。

---

### 34. 内部类（Inner Class）

#### 34.1 内部类的概念

- 内部类是定义在另一个类内部的类。
- 内部类可以访问外部类的成员，包括私有成员。
- 内部类的主要作用是更好地组织代码、实现封装和逻辑关联。

#### 34.2 内部类的分类

1. **成员内部类**（普通内部类）：定义在类的成员位置，没有static修饰。
2. **静态内部类**：用static修饰，类似于外部类的静态成员。
3. **局部内部类**：定义在方法、代码块、构造器内部，只在其作用域内有效。
4. **匿名内部类**：没有名字的内部类，通常用于简化接口或抽象类的临时实现。

#### 34.3 成员内部类

- 作为外部类的成员存在，可以访问外部类的所有成员。
- 需要通过外部类对象创建。

**示例：**
```java
public class Outer {
    private int data = 10;
    class Inner {
        public void show() {
            System.out.println("外部类data: " + data);
        }
    }
    public void test() {
        Inner inner = new Inner();
        inner.show();
    }
}
```

#### 34.4 静态内部类

- 用static修饰，只能访问外部类的静态成员。
- 可以直接通过外部类名创建。

**示例：**
```java
public class Outer {
    private static int data = 20;
    static class StaticInner {
        public void show() {
            System.out.println("外部类静态data: " + data);
        }
    }
    public static void test() {
        StaticInner inner = new StaticInner();
        inner.show();
    }
}
```

#### 34.5 局部内部类

- 定义在方法、代码块、构造器内部。
- 只能在其作用域内使用。
- 可以访问外部类的成员和方法内的final或effectively final局部变量。

**示例：**
```java
public class Outer {
    public void method() {
        int num = 100;
        class LocalInner {
            public void show() {
                System.out.println("num: " + num);
            }
        }
        LocalInner inner = new LocalInner();
        inner.show();
    }
}
```

#### 34.6 匿名内部类

- 没有名字的内部类，通常用于简化接口或抽象类的临时实现。
- 常用于回调、事件监听等场景。

**示例：**
```java
public class Test {
    public static void main(String[] args) {
        Runnable r = new Runnable() {
            @Override
            public void run() {
                System.out.println("匿名内部类实现线程");
            }
        };
        new Thread(r).start();
        // 或者直接：
        new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println("直接传递匿名内部类");
            }
        }).start();
    }
}
```

#### 34.7 内部类的特性与注意事项

- 内部类可以访问外部类的所有成员，包括private。
- 外部类访问成员内部类需通过对象，访问静态内部类可直接通过外部类名。
- 局部内部类访问方法内变量时，该变量需为final或"实际上final"。
- 匿名内部类不能有构造方法，只能重写父类或接口的方法。
- 内部类有自己的字节码文件，命名格式为：外部类$内部类.class。

#### 34.8 内部类的使用场景

- 事件监听、回调机制（如GUI编程、线程等）。
- 封装只为外部类服务的辅助类。
- 实现与外部类强关联的功能。

> **总结：** 内部类是Java实现封装、逻辑关联和简化代码的重要机制。合理使用内部类可以提升代码的结构性和可维护性。
