---
layout: post
title: "Python数据分析三剑客：NumPy、Pandas、Matplotlib详解"
subtitle: "数据科学 / 数据分析 / 机器学习 / Python编程"
date: 2024-09-01 12:00:00
author: "Comet"
catalog: true
tags:
    - Python
    - NumPy
    - Pandas
    - Matplotlib
    - 数据分析
    - 数据科学
    - 机器学习
    - 学习日志
---

## 学习目标
- 掌握NumPy数组操作和数学计算
- 熟练使用Pandas进行数据处理和分析
- 学会使用Matplotlib创建各种数据可视化
- 理解三个库的协同工作方式
- 掌握数据科学工作流程
- 学会处理真实世界的数据分析问题

## 学习计划
1. NumPy基础：数组操作和数学计算
2. Pandas核心：数据结构和数据处理
3. Matplotlib可视化：图表创建和样式设置
4. 三库协同：完整的数据分析工作流
5. 实战案例：真实数据分析项目
6. 性能优化和最佳实践

---

## 1. NumPy基础

### 1.1 NumPy概述
NumPy是Python科学计算的基础库，提供了高性能的多维数组对象和数学函数。

**NumPy的核心特性：**
- 多维数组（ndarray）
- 广播机制
- 线性代数运算
- 随机数生成
- 傅里叶变换

### 1.2 创建数组
{% highlight python %}
import numpy as np

# 创建数组的不同方法
# 从列表创建
arr1 = np.array([1, 2, 3, 4, 5])
print("一维数组:", arr1)

# 创建二维数组
arr2 = np.array([[1, 2, 3], [4, 5, 6]])
print("二维数组:\n", arr2)

# 使用zeros创建
zeros_arr = np.zeros((3, 4))
print("零数组:\n", zeros_arr)

# 使用ones创建
ones_arr = np.ones((2, 3))
print("一数组:\n", ones_arr)

# 使用arange创建
range_arr = np.arange(0, 10, 2)
print("范围数组:", range_arr)

# 使用linspace创建
linspace_arr = np.linspace(0, 1, 5)
print("线性空间数组:", linspace_arr)

# 随机数组
random_arr = np.random.rand(3, 3)
print("随机数组:\n", random_arr)
{% endhighlight %}

### 1.3 数组操作
{% highlight python %}
# 数组形状和维度
arr = np.array([[1, 2, 3], [4, 5, 6]])
print("数组形状:", arr.shape)
print("数组维度:", arr.ndim)
print("数组大小:", arr.size)
print("数据类型:", arr.dtype)

# 重塑数组
reshaped = arr.reshape(3, 2)
print("重塑后:\n", reshaped)

# 数组索引和切片
print("第一行:", arr[0])
print("第一列:", arr[:, 0])
print("子数组:", arr[0:1, 1:3])

# 布尔索引
bool_mask = arr > 3
print("布尔掩码:\n", bool_mask)
print("条件选择:", arr[bool_mask])
{% endhighlight %}

### 1.4 数学运算
{% highlight python %}
# 基本数学运算
a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])

print("加法:", a + b)
print("乘法:", a * b)
print("平方:", a ** 2)
print("平方根:", np.sqrt(a))

# 统计函数
data = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
print("平均值:", np.mean(data))
print("中位数:", np.median(data))
print("标准差:", np.std(data))
print("方差:", np.var(data))
print("最大值:", np.max(data))
print("最小值:", np.min(data))

# 线性代数运算
matrix = np.array([[1, 2], [3, 4]])
print("矩阵:\n", matrix)
print("行列式:", np.linalg.det(matrix))
print("逆矩阵:\n", np.linalg.inv(matrix))
print("特征值:", np.linalg.eigvals(matrix))
{% endhighlight %}

### 1.5 广播机制
{% highlight python %}
# 广播示例
arr = np.array([[1, 2, 3], [4, 5, 6]])
scalar = 2

# 标量与数组运算
print("数组 + 标量:\n", arr + scalar)
print("数组 * 标量:\n", arr * scalar)

# 不同形状数组的广播
arr1 = np.array([[1, 2, 3], [4, 5, 6]])
arr2 = np.array([10, 20, 30])

print("广播加法:\n", arr1 + arr2)
{% endhighlight %}

---

## 2. Pandas核心

### 2.1 Pandas概述
Pandas是Python数据分析的核心库，提供了高性能、易用的数据结构和数据分析工具。

**Pandas的主要数据结构：**
- Series：一维带标签数组
- DataFrame：二维表格数据结构
- Panel：三维数据结构（已弃用）

### 2.2 Series操作
{% highlight python %}
import pandas as pd

# 创建Series
s1 = pd.Series([1, 3, 5, 7, 9])
print("Series:", s1)

# 带索引的Series
s2 = pd.Series([1, 2, 3, 4], index=['a', 'b', 'c', 'd'])
print("带索引Series:\n", s2)

# 从字典创建Series
dict_data = {'a': 1, 'b': 2, 'c': 3}
s3 = pd.Series(dict_data)
print("从字典创建:\n", s3)

# Series操作
print("索引:", s2.index)
print("值:", s2.values)
print("数据类型:", s2.dtype)
print("大小:", s2.size)

# 数学运算
print("求和:", s2.sum())
print("平均值:", s2.mean())
print("标准差:", s2.std())
{% endhighlight %}

### 2.3 DataFrame操作
{% highlight python %}
# 创建DataFrame
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 40],
    'city': ['New York', 'London', 'Paris', 'Tokyo'],
    'salary': [50000, 60000, 70000, 80000]
}
df = pd.DataFrame(data)
print("DataFrame:\n", df)

# 从CSV文件读取
# df = pd.read_csv('data.csv')

# 基本属性
print("形状:", df.shape)
print("列名:", df.columns)
print("索引:", df.index)
print("数据类型:\n", df.dtypes)
print("信息:\n", df.info())

# 查看数据
print("前3行:\n", df.head(3))
print("后2行:\n", df.tail(2))
print("描述性统计:\n", df.describe())
{% endhighlight %}

### 2.4 数据选择和索引
{% highlight python %}
# 列选择
print("选择单列:", df['name'])
print("选择多列:\n", df[['name', 'age']])

# 行选择
print("第一行:", df.iloc[0])
print("前两行:\n", df.iloc[0:2])

# 条件选择
young_people = df[df['age'] < 35]
print("年轻人:\n", young_people)

high_salary = df[df['salary'] > 60000]
print("高薪人员:\n", high_salary)

# 复合条件
filtered = df[(df['age'] > 30) & (df['salary'] > 60000)]
print("复合条件筛选:\n", filtered)
{% endhighlight %}

### 2.5 数据处理
{% highlight python %}
# 缺失值处理
df_with_na = pd.DataFrame({
    'A': [1, 2, np.nan, 4],
    'B': [5, np.nan, np.nan, 8],
    'C': [9, 10, 11, np.nan]
})
print("原始数据:\n", df_with_na)

# 检查缺失值
print("缺失值统计:\n", df_with_na.isnull().sum())

# 删除缺失值
df_cleaned = df_with_na.dropna()
print("删除缺失值后:\n", df_cleaned)

# 填充缺失值
df_filled = df_with_na.fillna(0)
print("填充0后:\n", df_filled)

# 数据排序
df_sorted = df.sort_values('age', ascending=False)
print("按年龄排序:\n", df_sorted)

# 数据分组
grouped = df.groupby('city')['salary'].mean()
print("按城市分组平均薪资:\n", grouped)
{% endhighlight %}

### 2.6 数据合并和连接
{% highlight python %}
# 创建两个DataFrame
df1 = pd.DataFrame({
    'id': [1, 2, 3, 4],
    'name': ['Alice', 'Bob', 'Charlie', 'David']
})

df2 = pd.DataFrame({
    'id': [1, 2, 3, 5],
    'salary': [50000, 60000, 70000, 90000]
})

# 内连接
merged_inner = pd.merge(df1, df2, on='id', how='inner')
print("内连接:\n", merged_inner)

# 左连接
merged_left = pd.merge(df1, df2, on='id', how='left')
print("左连接:\n", merged_left)

# 外连接
merged_outer = pd.merge(df1, df2, on='id', how='outer')
print("外连接:\n", merged_outer)

# 连接操作
concatenated = pd.concat([df1, df2], axis=1)
print("连接:\n", concatenated)
{% endhighlight %}

---

## 3. Matplotlib可视化

### 3.1 Matplotlib概述
Matplotlib是Python最流行的绘图库，可以创建各种静态、动态和交互式图表。

**Matplotlib的主要特性：**
- 支持多种图表类型
- 高度可定制
- 支持多种输出格式
- 与NumPy和Pandas完美集成

### 3.2 基础绘图
{% highlight python %}
import matplotlib.pyplot as plt
import numpy as np

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

# 创建数据
x = np.linspace(0, 10, 100)
y = np.sin(x)

# 基础线图
plt.figure(figsize=(10, 6))
plt.plot(x, y, 'b-', linewidth=2, label='sin(x)')
plt.title('正弦函数')
plt.xlabel('x')
plt.ylabel('y')
plt.legend()
plt.grid(True)
plt.show()

# 散点图
x_scatter = np.random.randn(100)
y_scatter = np.random.randn(100)

plt.figure(figsize=(8, 6))
plt.scatter(x_scatter, y_scatter, alpha=0.6)
plt.title('散点图')
plt.xlabel('x')
plt.ylabel('y')
plt.show()
{% endhighlight %}

### 3.3 多子图
{% highlight python %}
# 创建子图
fig, axes = plt.subplots(2, 2, figsize=(12, 8))

# 第一个子图：线图
x = np.linspace(0, 2*np.pi, 100)
axes[0, 0].plot(x, np.sin(x))
axes[0, 0].set_title('正弦函数')
axes[0, 0].grid(True)

# 第二个子图：余弦函数
axes[0, 1].plot(x, np.cos(x), 'r-')
axes[0, 1].set_title('余弦函数')
axes[0, 1].grid(True)

# 第三个子图：散点图
x_scatter = np.random.randn(50)
y_scatter = np.random.randn(50)
axes[1, 0].scatter(x_scatter, y_scatter)
axes[1, 0].set_title('随机散点图')

# 第四个子图：柱状图
categories = ['A', 'B', 'C', 'D']
values = [4, 3, 2, 1]
axes[1, 1].bar(categories, values)
axes[1, 1].set_title('柱状图')

plt.tight_layout()
plt.show()
{% endhighlight %}

### 3.4 统计图表
{% highlight python %}
# 柱状图
categories = ['苹果', '香蕉', '橙子', '葡萄']
sales = [23, 45, 56, 78]

plt.figure(figsize=(8, 6))
bars = plt.bar(categories, sales, color=['red', 'yellow', 'orange', 'purple'])
plt.title('水果销售统计')
plt.xlabel('水果种类')
plt.ylabel('销售量')

# 添加数值标签
for bar, value in zip(bars, sales):
    plt.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1, 
             str(value), ha='center', va='bottom')

plt.show()

# 饼图
sizes = [30, 25, 20, 15, 10]
labels = ['苹果', '香蕉', '橙子', '葡萄', '其他']
colors = ['red', 'yellow', 'orange', 'purple', 'gray']

plt.figure(figsize=(8, 8))
plt.pie(sizes, labels=labels, colors=colors, autopct='%1.1f%%', startangle=90)
plt.title('水果销售比例')
plt.axis('equal')
plt.show()

# 直方图
data = np.random.normal(0, 1, 1000)

plt.figure(figsize=(8, 6))
plt.hist(data, bins=30, alpha=0.7, color='skyblue', edgecolor='black')
plt.title('正态分布直方图')
plt.xlabel('值')
plt.ylabel('频次')
plt.grid(True, alpha=0.3)
plt.show()
{% endhighlight %}

### 3.5 高级可视化
{% highlight python %}
# 热力图
import seaborn as sns

# 创建相关性矩阵
np.random.seed(0)
data = np.random.randn(100, 4)
df_corr = pd.DataFrame(data, columns=['A', 'B', 'C', 'D'])
correlation_matrix = df_corr.corr()

plt.figure(figsize=(8, 6))
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('相关性热力图')
plt.show()

# 箱线图
data_box = [np.random.normal(0, std, 100) for std in range(1, 4)]
labels = ['组1', '组2', '组3']

plt.figure(figsize=(8, 6))
plt.boxplot(data_box, labels=labels)
plt.title('箱线图')
plt.ylabel('值')
plt.show()

# 3D图
from mpl_toolkits.mplot3d import Axes3D

fig = plt.figure(figsize=(10, 8))
ax = fig.add_subplot(111, projection='3d')

x = np.linspace(-5, 5, 100)
y = np.linspace(-5, 5, 100)
X, Y = np.meshgrid(x, y)
Z = np.sin(np.sqrt(X**2 + Y**2))

surf = ax.plot_surface(X, Y, Z, cmap='viridis')
ax.set_title('3D表面图')
ax.set_xlabel('X')
ax.set_ylabel('Y')
ax.set_zlabel('Z')

fig.colorbar(surf)
plt.show()
{% endhighlight %}

---

## 4. 三库协同工作

### 4.1 数据科学工作流
{% highlight python %}
# 完整的数据分析示例
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# 1. 数据生成/加载
np.random.seed(42)
n_samples = 1000

# 生成模拟数据
data = {
    'age': np.random.normal(35, 10, n_samples),
    'income': np.random.normal(50000, 15000, n_samples),
    'education_years': np.random.normal(16, 3, n_samples),
    'satisfaction': np.random.uniform(1, 10, n_samples)
}

df = pd.DataFrame(data)

# 2. 数据探索
print("数据基本信息:")
print(df.info())
print("\n描述性统计:")
print(df.describe())

# 3. 数据清洗
# 处理异常值
df_clean = df[(df['age'] > 0) & (df['age'] < 100)]
df_clean = df_clean[(df_clean['income'] > 0) & (df_clean['income'] < 200000)]

print(f"清洗后数据量: {len(df_clean)}")

# 4. 数据分析
# 相关性分析
correlation = df_clean.corr()
print("\n相关性矩阵:")
print(correlation)

# 5. 数据可视化
fig, axes = plt.subplots(2, 2, figsize=(15, 12))

# 年龄分布
axes[0, 0].hist(df_clean['age'], bins=30, alpha=0.7, color='skyblue')
axes[0, 0].set_title('年龄分布')
axes[0, 0].set_xlabel('年龄')
axes[0, 0].set_ylabel('频次')

# 收入分布
axes[0, 1].hist(df_clean['income'], bins=30, alpha=0.7, color='lightgreen')
axes[0, 1].set_title('收入分布')
axes[0, 1].set_xlabel('收入')
axes[0, 1].set_ylabel('频次')

# 年龄vs收入散点图
axes[1, 0].scatter(df_clean['age'], df_clean['income'], alpha=0.6)
axes[1, 0].set_title('年龄 vs 收入')
axes[1, 0].set_xlabel('年龄')
axes[1, 0].set_ylabel('收入')

# 相关性热力图
sns.heatmap(correlation, annot=True, cmap='coolwarm', ax=axes[1, 1])
axes[1, 1].set_title('相关性热力图')

plt.tight_layout()
plt.show()

# 6. 统计分析
print("\n统计分析结果:")
print(f"平均年龄: {df_clean['age'].mean():.2f}")
print(f"平均收入: {df_clean['income'].mean():.2f}")
print(f"年龄与收入相关系数: {df_clean['age'].corr(df_clean['income']):.3f}")
{% endhighlight %}

### 4.2 时间序列分析
{% highlight python %}
# 时间序列数据处理
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 创建时间序列数据
dates = pd.date_range('2023-01-01', periods=365, freq='D')
np.random.seed(42)

# 生成模拟销售数据
sales_data = {
    'date': dates,
    'sales': np.random.normal(1000, 200, 365) + 50 * np.sin(np.arange(365) * 2 * np.pi / 365),
    'temperature': np.random.normal(20, 10, 365) + 15 * np.sin(np.arange(365) * 2 * np.pi / 365)
}

df_ts = pd.DataFrame(sales_data)
df_ts.set_index('date', inplace=True)

# 时间序列分析
plt.figure(figsize=(15, 10))

# 销售趋势
plt.subplot(3, 1, 1)
plt.plot(df_ts.index, df_ts['sales'])
plt.title('销售趋势')
plt.ylabel('销售额')

# 温度趋势
plt.subplot(3, 1, 2)
plt.plot(df_ts.index, df_ts['temperature'])
plt.title('温度趋势')
plt.ylabel('温度 (°C)')

# 销售vs温度散点图
plt.subplot(3, 1, 3)
plt.scatter(df_ts['temperature'], df_ts['sales'], alpha=0.6)
plt.title('温度 vs 销售额')
plt.xlabel('温度 (°C)')
plt.ylabel('销售额')

plt.tight_layout()
plt.show()

# 月度统计
monthly_sales = df_ts['sales'].resample('M').mean()
monthly_temp = df_ts['temperature'].resample('M').mean()

print("月度平均销售额:")
print(monthly_sales)
print("\n月度平均温度:")
print(monthly_temp)
{% endhighlight %}

---

## 5. 实战案例

### 5.1 股票数据分析
{% highlight python %}
# 股票数据分析示例
import yfinance as yf
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 获取股票数据（这里使用模拟数据）
np.random.seed(42)
dates = pd.date_range('2023-01-01', periods=252, freq='B')
stock_data = {
    'Date': dates,
    'Close': 100 + np.cumsum(np.random.randn(252) * 0.02),
    'Volume': np.random.randint(1000000, 5000000, 252)
}

df_stock = pd.DataFrame(stock_data)
df_stock.set_index('Date', inplace=True)

# 计算技术指标
df_stock['SMA_20'] = df_stock['Close'].rolling(window=20).mean()
df_stock['SMA_50'] = df_stock['Close'].rolling(window=50).mean()
df_stock['Returns'] = df_stock['Close'].pct_change()

# 可视化
fig, axes = plt.subplots(3, 1, figsize=(15, 12))

# 股价走势
axes[0].plot(df_stock.index, df_stock['Close'], label='收盘价', linewidth=2)
axes[0].plot(df_stock.index, df_stock['SMA_20'], label='20日均线', alpha=0.7)
axes[0].plot(df_stock.index, df_stock['SMA_50'], label='50日均线', alpha=0.7)
axes[0].set_title('股票价格走势')
axes[0].set_ylabel('价格')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# 成交量
axes[1].bar(df_stock.index, df_stock['Volume'], alpha=0.7, color='orange')
axes[1].set_title('成交量')
axes[1].set_ylabel('成交量')

# 收益率分布
axes[2].hist(df_stock['Returns'].dropna(), bins=50, alpha=0.7, color='green')
axes[2].set_title('收益率分布')
axes[2].set_xlabel('收益率')
axes[2].set_ylabel('频次')

plt.tight_layout()
plt.show()

# 统计分析
print("股票数据分析结果:")
print(f"平均收盘价: {df_stock['Close'].mean():.2f}")
print(f"最高价: {df_stock['Close'].max():.2f}")
print(f"最低价: {df_stock['Close'].min():.2f}")
print(f"年化收益率: {df_stock['Returns'].mean() * 252 * 100:.2f}%")
print(f"年化波动率: {df_stock['Returns'].std() * np.sqrt(252) * 100:.2f}%")
{% endhighlight %}

### 5.2 机器学习数据预处理
{% highlight python %}
# 机器学习数据预处理示例
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
import seaborn as sns

# 加载鸢尾花数据集
iris = load_iris()
df_iris = pd.DataFrame(iris.data, columns=iris.feature_names)
df_iris['target'] = iris.target

# 数据探索
print("鸢尾花数据集信息:")
print(df_iris.info())
print("\n描述性统计:")
print(df_iris.describe())

# 数据可视化
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# 特征分布
for i, feature in enumerate(iris.feature_names):
    row, col = i // 2, i % 2
    for target in range(3):
        data = df_iris[df_iris['target'] == target][feature]
        axes[row, col].hist(data, alpha=0.7, label=f'类别 {target}')
    axes[row, col].set_title(f'{feature} 分布')
    axes[row, col].legend()

plt.tight_layout()
plt.show()

# 相关性分析
plt.figure(figsize=(8, 6))
correlation_matrix = df_iris.drop('target', axis=1).corr()
sns.heatmap(correlation_matrix, annot=True, cmap='coolwarm', center=0)
plt.title('特征相关性热力图')
plt.show()

# 数据标准化
scaler = StandardScaler()
X_scaled = scaler.fit_transform(df_iris.drop('target', axis=1))
df_scaled = pd.DataFrame(X_scaled, columns=iris.feature_names)

# PCA降维
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X_scaled)

# 可视化PCA结果
plt.figure(figsize=(10, 8))
for target in range(3):
    mask = df_iris['target'] == target
    plt.scatter(X_pca[mask, 0], X_pca[mask, 1], 
                label=f'类别 {target}', alpha=0.7)

plt.xlabel('主成分1')
plt.ylabel('主成分2')
plt.title('PCA降维结果')
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()

print(f"PCA解释方差比例: {pca.explained_variance_ratio_}")
print(f"累计解释方差: {pca.explained_variance_ratio_.sum():.3f}")
{% endhighlight %}

---

## 6. 性能优化和最佳实践

### 6.1 NumPy优化
{% highlight python %}
# NumPy性能优化示例
import time

# 比较Python列表和NumPy数组的性能
n = 1000000

# Python列表
start_time = time.time()
python_list = list(range(n))
python_result = [x**2 for x in python_list]
python_time = time.time() - start_time

# NumPy数组
start_time = time.time()
numpy_array = np.arange(n)
numpy_result = numpy_array**2
numpy_time = time.time() - start_time

print(f"Python列表时间: {python_time:.4f}秒")
print(f"NumPy数组时间: {numpy_time:.4f}秒")
print(f"性能提升: {python_time/numpy_time:.1f}倍")

# 向量化操作
# 低效方式
def slow_function(x):
    result = []
    for i in range(len(x)):
        if x[i] > 0:
            result.append(np.sqrt(x[i]))
        else:
            result.append(0)
    return np.array(result)

# 高效方式
def fast_function(x):
    return np.where(x > 0, np.sqrt(x), 0)

# 性能比较
x = np.random.randn(100000)
start_time = time.time()
result1 = slow_function(x)
slow_time = time.time() - start_time

start_time = time.time()
result2 = fast_function(x)
fast_time = time.time() - start_time

print(f"慢速函数时间: {slow_time:.4f}秒")
print(f"快速函数时间: {fast_time:.4f}秒")
print(f"性能提升: {slow_time/fast_time:.1f}倍")
{% endhighlight %}

### 6.2 Pandas优化
{% highlight python %}
# Pandas性能优化示例

# 1. 使用适当的数据类型
# 低效
df_inefficient = pd.DataFrame({
    'category': ['A', 'B', 'A', 'B'] * 1000,
    'value': [1, 2, 3, 4] * 1000
})

# 高效
df_efficient = pd.DataFrame({
    'category': pd.Categorical(['A', 'B', 'A', 'B'] * 1000),
    'value': [1, 2, 3, 4] * 1000
})

print("内存使用比较:")
print(f"低效方式: {df_inefficient.memory_usage(deep=True).sum()} bytes")
print(f"高效方式: {df_efficient.memory_usage(deep=True).sum()} bytes")

# 2. 使用向量化操作
# 低效方式
def slow_apply(df):
    return df['value'].apply(lambda x: x * 2)

# 高效方式
def fast_apply(df):
    return df['value'] * 2

# 性能比较
large_df = pd.DataFrame({'value': range(100000)})

start_time = time.time()
result1 = slow_apply(large_df)
slow_time = time.time() - start_time

start_time = time.time()
result2 = fast_apply(large_df)
fast_time = time.time() - start_time

print(f"apply方法时间: {slow_time:.4f}秒")
print(f"向量化操作时间: {fast_time:.4f}秒")
print(f"性能提升: {slow_time/fast_time:.1f}倍")
{% endhighlight %}

### 6.3 可视化最佳实践
{% highlight python %}
# 可视化最佳实践示例

# 设置全局样式
plt.style.use('seaborn-v0_8')
plt.rcParams['figure.figsize'] = (12, 8)
plt.rcParams['font.size'] = 12

# 创建示例数据
np.random.seed(42)
categories = ['A', 'B', 'C', 'D', 'E']
values1 = np.random.randint(10, 100, 5)
values2 = np.random.randint(10, 100, 5)

# 创建子图
fig, axes = plt.subplots(2, 2, figsize=(15, 12))

# 1. 清晰的柱状图
bars1 = axes[0, 0].bar(categories, values1, color='skyblue', alpha=0.8)
axes[0, 0].set_title('清晰的柱状图', fontsize=14, fontweight='bold')
axes[0, 0].set_xlabel('类别')
axes[0, 0].set_ylabel('数值')

# 添加数值标签
for bar, value in zip(bars1, values1):
    axes[0, 0].text(bar.get_x() + bar.get_width()/2, bar.get_height() + 1,
                    str(value), ha='center', va='bottom', fontweight='bold')

# 2. 对比柱状图
x = np.arange(len(categories))
width = 0.35

bars2 = axes[0, 1].bar(x - width/2, values1, width, label='组1', alpha=0.8)
bars3 = axes[0, 1].bar(x + width/2, values2, width, label='组2', alpha=0.8)

axes[0, 1].set_title('对比柱状图', fontsize=14, fontweight='bold')
axes[0, 1].set_xlabel('类别')
axes[0, 1].set_ylabel('数值')
axes[0, 1].set_xticks(x)
axes[0, 1].set_xticklabels(categories)
axes[0, 1].legend()

# 3. 散点图
x_scatter = np.random.randn(100)
y_scatter = np.random.randn(100)
colors = np.random.rand(100)

scatter = axes[1, 0].scatter(x_scatter, y_scatter, c=colors, alpha=0.6, cmap='viridis')
axes[1, 0].set_title('散点图', fontsize=14, fontweight='bold')
axes[1, 0].set_xlabel('X轴')
axes[1, 0].set_ylabel('Y轴')
plt.colorbar(scatter, ax=axes[1, 0])

# 4. 饼图
sizes = [30, 25, 20, 15, 10]
labels = ['A', 'B', 'C', 'D', 'E']
colors_pie = ['#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#ff99cc']

wedges, texts, autotexts = axes[1, 1].pie(sizes, labels=labels, colors=colors_pie,
                                          autopct='%1.1f%%', startangle=90)
axes[1, 1].set_title('饼图', fontsize=14, fontweight='bold')

# 美化文本
for autotext in autotexts:
    autotext.set_color('white')
    autotext.set_fontweight('bold')

plt.tight_layout()
plt.show()
{% endhighlight %}

---

## 总结

### 核心要点
- **NumPy**：提供高效的数组操作和数学计算基础
- **Pandas**：强大的数据处理和分析工具
- **Matplotlib**：灵活的数据可视化库
- **协同工作**：三个库相互配合，形成完整的数据科学工具链

### 学习建议
1. **循序渐进**：先掌握NumPy基础，再学习Pandas，最后深入Matplotlib
2. **实践为主**：多动手编写代码，处理真实数据
3. **性能意识**：注意代码效率，使用向量化操作
4. **可视化思维**：学会用图表表达数据洞察
5. **持续学习**：关注新特性和最佳实践

### 应用领域
- 数据分析和探索
- 机器学习数据预处理
- 科学计算和数值分析
- 商业智能和报表
- 学术研究和论文写作

## 参考资料
- NumPy官方文档：https://numpy.org/doc/
- Pandas官方文档：https://pandas.pydata.org/docs/
- Matplotlib官方文档：https://matplotlib.org/
- Python数据科学手册
- 数据科学实战指南
