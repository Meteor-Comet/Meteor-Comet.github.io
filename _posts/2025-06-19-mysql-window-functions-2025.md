---
layout: post
title: "MySQL窗口函数"
subtitle: "OVER / PARTITION BY / ORDER BY / FRAME / LAG / LEAD "
date: 2025-06-19 18:00:00
author: "Comet"
catalog: true
tags:
    - MySQL
    - SQL
    - 窗口函数
    - 数据分析
    - 学习日志
---

## 学习目标
- 掌握窗口函数的语法与使用场景
- 熟悉排名/偏移/聚合类窗口函数（ROW_NUMBER、RANK、LAG、LEAD、SUM OVER等）
- 理解窗口帧（FRAME）的含义与性能影响
- 能使用窗口函数解决常见业务需求（排名、同环比、累计值、分组TopN）

## 学习计划
1. 窗口函数基础与语法
2. 排名类函数：ROW_NUMBER / RANK / DENSE_RANK / NTILE
3. 偏移类函数：LAG / LEAD / FIRST_VALUE / LAST_VALUE / NTH_VALUE
4. 聚合窗口：SUM / AVG / COUNT / MAX / MIN OVER
5. 窗口帧（FRAME）与ROWS/RANGE区别
6. 实战示例：电商销售场景
7. 注意事项与性能优化
8. 练习题与扩展

---

## 1. 窗口函数基础与语法

- **窗口函数定义**：在不折叠行的前提下，对一组相关行进行计算并将结果返回到每一行。
- **与普通聚合的区别**：聚合函数（GROUP BY）会聚合成更少的行；窗口函数保留每一行。
- **基本语法**：
{% highlight sql %}
<window_function>() OVER (
  [PARTITION BY <expr_list>]
  [ORDER BY <order_list>]
  [<frame_clause>]
)
{% endhighlight %}
- **位置限制**：仅能用于SELECT与ORDER BY子句，不能直接用于WHERE，需要借助子查询/CTE。

---

## 2. 排名类函数

### 2.1 ROW_NUMBER
为分区内的每行分配唯一且连续的序号。
{% highlight sql %}
SELECT user_id, amount,
       ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC) AS rk
FROM sales;
{% endhighlight %}

### 2.2 RANK
同分并列，排名会跳跃（1,2,2,4）。
{% highlight sql %}
SELECT user_id, amount,
       RANK() OVER (PARTITION BY user_id ORDER BY amount DESC) AS rk
FROM sales;
{% endhighlight %}

### 2.3 DENSE_RANK
同分并列但不跳跃（1,2,2,3）。
{% highlight sql %}
SELECT user_id, amount,
       DENSE_RANK() OVER (PARTITION BY user_id ORDER BY amount DESC) AS rk
FROM sales;
{% endhighlight %}

### 2.4 NTILE(n)
将分区内的行尽量均匀地分到n个桶中。
{% highlight sql %}
SELECT user_id, amount,
       NTILE(4) OVER (PARTITION BY user_id ORDER BY amount DESC) AS bucket
FROM sales;
{% endhighlight %}

---

## 3. 偏移类函数

### 3.1 LAG/LEAD
- LAG：取当前行之前第k行的值（默认k=1）
- LEAD：取当前行之后第k行的值
{% highlight sql %}
SELECT user_id, order_date, amount,
       LAG(amount, 1, 0)  OVER (PARTITION BY user_id ORDER BY order_date) AS prev_amount,
       LEAD(amount, 1, 0) OVER (PARTITION BY user_id ORDER BY order_date) AS next_amount
FROM sales;
{% endhighlight %}

### 3.2 FIRST_VALUE / LAST_VALUE
取分区内（或指定帧）首/尾值。注意默认帧会随ORDER BY移动，常与显式帧一起使用。
{% highlight sql %}
SELECT user_id, order_date, amount,
       FIRST_VALUE(amount) OVER (
         PARTITION BY user_id ORDER BY order_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS first_amt,
       LAST_VALUE(amount)  OVER (
         PARTITION BY user_id ORDER BY order_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS last_amt
FROM sales;
{% endhighlight %}

### 3.3 NTH_VALUE
取分区内第n个值（随帧而变）。
{% highlight sql %}
SELECT user_id, order_date, amount,
       NTH_VALUE(amount, 3) OVER (
         PARTITION BY user_id ORDER BY order_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS third_amt
FROM sales;
{% endhighlight %}

---

## 4. 聚合窗口

在窗口上执行SUM/AVG/COUNT/MAX/MIN等，常用于累计、滑动窗口。

### 4.1 累计值（running total）
{% highlight sql %}
SELECT user_id, order_date, amount,
       SUM(amount) OVER (
         PARTITION BY user_id ORDER BY order_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_amount
FROM sales;
{% endhighlight %}

### 4.2 滑动窗口（近N行）
{% highlight sql %}
SELECT user_id, order_date, amount,
       AVG(amount) OVER (
         PARTITION BY user_id ORDER BY order_date
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS avg_3_rows
FROM sales;
{% endhighlight %}

### 4.3 同比/环比（与上一期比较）
{% highlight sql %}
SELECT user_id, order_month, amount,
       LAG(amount) OVER (PARTITION BY user_id ORDER BY order_month) AS prev_amount,
       amount - LAG(amount) OVER (PARTITION BY user_id ORDER BY order_month) AS mom_diff,
       CASE WHEN LAG(amount) OVER (PARTITION BY user_id ORDER BY order_month) = 0 THEN NULL
            ELSE ROUND(
              (amount - LAG(amount) OVER (PARTITION BY user_id ORDER BY order_month))
              / LAG(amount) OVER (PARTITION BY user_id ORDER BY order_month) * 100, 2)
       END AS mom_rate
FROM monthly_sales;
{% endhighlight %}

---

## 5. 窗口帧（FRAME）与ROWS/RANGE

- **ROWS**：按物理行计数，严格依赖行数。
- **RANGE**：按排序键的逻辑范围（相同排序值为同一范围）。对数值/日期等更直观，但在MySQL中常见实现限制较多。
- **常见帧写法**：
  - `ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW`（从分区首到当前行）
  - `ROWS BETWEEN N PRECEDING AND CURRENT ROW`（近N行含当前行）
  - `ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING`（整个分区）
- **注意**：未显式指定帧时，很多函数会采用默认帧（受ORDER BY影响），在FIRST_VALUE/LAST_VALUE等场景建议显式帧以避免“尾值漂移”。

---

## 6. 实战示例：电商销售

### 6.1 示例表结构
{% highlight sql %}
-- 销售明细
CREATE TABLE sales (
  order_id    BIGINT PRIMARY KEY,
  user_id     BIGINT NOT NULL,
  order_date  DATE   NOT NULL,
  amount      DECIMAL(10,2) NOT NULL
);
{% endhighlight %}

### 6.2 需求1：用户内订单金额排名并取Top3
{% highlight sql %}
WITH ranked AS (
  SELECT *,
         ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY amount DESC) AS rk
  FROM sales
)
SELECT * FROM ranked WHERE rk <= 3;
{% endhighlight %}

### 6.3 需求2：计算用户累计消费与上/下单金额
{% highlight sql %}
SELECT user_id, order_date, amount,
       SUM(amount) OVER (
         PARTITION BY user_id ORDER BY order_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS cum_amount,
       LAG(amount)  OVER (PARTITION BY user_id ORDER BY order_date) AS prev_amount,
       LEAD(amount) OVER (PARTITION BY user_id ORDER BY order_date) AS next_amount
FROM sales;
{% endhighlight %}

### 6.4 需求3：按月环比增长率
{% highlight sql %}
SELECT user_id, order_month, amount,
       LAG(amount) OVER (PARTITION BY user_id ORDER BY order_month) AS prev_amount,
       ROUND(
         CASE WHEN LAG(amount) OVER (PARTITION BY user_id ORDER BY order_month) = 0 THEN NULL
              ELSE (amount - LAG(amount) OVER (PARTITION BY user_id ORDER BY order_month))
                   / LAG(amount) OVER (PARTITION BY user_id ORDER BY order_month) * 100
         END, 2) AS mom_rate
FROM monthly_sales;
{% endhighlight %}

---

## 7. 注意事项与性能优化
- **不能用于WHERE**：将窗口计算放在子查询/CTE，再在外层过滤。
- **索引优化**：为`PARTITION BY`与`ORDER BY`涉及的列建立合适索引，减少排序/临时表开销。
- **帧大小**：`UNBOUNDED`帧可能扫描大量数据；滑动窗口选择合适N。
- **内存与临时表**：大窗口计算可能落磁盘；关注`tmp_table_size`、`max_heap_table_size`。
- **版本要求**：需MySQL 8.0+（5.7不支持窗口函数）。
- **与聚合混用**：先窗口后聚合或先聚合后窗口，注意语义与行数变化。

---

## 8. 练习题与扩展
1. 计算每位用户最近3单的平均客单价。
2. 统计各品类Top5订单，并给出每单相对该品类均值的差值。
3. 在同一查询中同时返回累计金额、上/下单金额、分位桶（NTILE(4)）。
4. 尝试用窗口函数重写传统子查询实现的“分组取TopN”。

---

## 总结
- 窗口函数在保留明细行的同时进行分组内计算，是现代SQL分析的核心能力。
- 掌握排名、偏移、聚合与帧控制，可以覆盖大多数业务分析需求。
- 重视索引与帧控制，避免无界窗口造成的性能问题。
