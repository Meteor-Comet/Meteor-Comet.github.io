---
layout: post
title: "MySQL查询日志与性能监控"
subtitle: "慢查询日志 / SHOW PROFILES / 性能监控 / 查询优化"
date: 2025-06-20 12:00:00
author: "Comet"
catalog: true
tags:
    - MySQL
    - 性能优化
    - 慢查询日志
    - SHOW PROFILES
    - 查询监控
    - 学习日志
---

## 学习目标
- 掌握MySQL慢查询日志的配置与分析方法
- 熟悉SHOW PROFILES和SHOW PROFILE的使用
- 了解MySQL性能监控的各种工具和方法
- 学会使用查询日志进行SQL优化
- 掌握性能问题诊断和解决技巧

## 学习计划
1. MySQL慢查询日志配置与分析
2. SHOW PROFILES和SHOW PROFILE详解
3. EXPLAIN执行计划分析
4. 通用查询日志和错误日志
5. 性能监控工具使用
6. 查询优化实战案例
7. 日志管理和维护
8. 性能问题诊断流程

---

## 1. MySQL慢查询日志（Slow Query Log）

### 1.1 慢查询日志概述
慢查询日志记录执行时间超过指定阈值的SQL语句，是性能优化的核心工具。

### 1.2 配置参数
{% highlight sql %}
-- 查看当前慢查询配置
SHOW VARIABLES LIKE '%slow_query%';
SHOW VARIABLES LIKE '%long_query_time%';

-- 启用慢查询日志
SET GLOBAL slow_query_log = 'ON';

-- 设置慢查询阈值（秒）
SET GLOBAL long_query_time = 2;

-- 设置慢查询日志文件路径
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';

-- 记录未使用索引的查询
SET GLOBAL log_queries_not_using_indexes = 'ON';

-- 记录慢管理语句
SET GLOBAL log_slow_admin_statements = 'ON';
{% endhighlight %}

### 1.3 配置文件设置
在 `my.cnf` 或 `my.ini` 中添加：
{% highlight ini %}
[mysqld]
# 慢查询日志配置
slow_query_log = 1
slow_query_log_file = /var/log/mysql/slow.log
long_query_time = 2
log_queries_not_using_indexes = 1
log_slow_admin_statements = 1
{% endhighlight %}

### 1.4 慢查询日志格式
{% highlight text %}
# Time: 2025-06-20T10:30:15.123456Z
# User@Host: root[root] @ localhost [127.0.0.1]  Id: 12345
# Query_time: 5.234567  Lock_time: 0.000123  Rows_sent: 1000  Rows_examined: 50000
SET timestamp=1624186215;
SELECT * FROM users WHERE email LIKE '%@gmail.com';
{% endhighlight %}

### 1.5 使用mysqldumpslow分析
{% highlight bash %}
# 查看慢查询统计
mysqldumpslow /var/log/mysql/slow.log

# 按查询时间排序
mysqldumpslow -t 10 /var/log/mysql/slow.log

# 按执行次数排序
mysqldumpslow -s c -t 10 /var/log/mysql/slow.log

# 按锁定时间排序
mysqldumpslow -s l -t 10 /var/log/mysql/slow.log

# 显示完整SQL
mysqldumpslow -a /var/log/mysql/slow.log

# 过滤特定数据库
mysqldumpslow -g "database_name" /var/log/mysql/slow.log
{% endhighlight %}

---

## 2. SHOW PROFILES和SHOW PROFILE

### 2.1 启用Profiling
{% highlight sql %}
-- 启用profiling
SET profiling = 1;

-- 查看profiling状态
SHOW VARIABLES LIKE 'profiling';
{% endhighlight %}

### 2.2 SHOW PROFILES
显示最近执行的查询列表：
{% highlight sql %}
SHOW PROFILES;
{% endhighlight %}
输出示例：
{% highlight text %}
+----------+------------+----------------------------------+
| Query_ID | Duration   | Query                            |
+----------+------------+----------------------------------+
|        1 | 0.00012345 | SELECT 1                        |
|        2 | 0.00123456 | SELECT * FROM users LIMIT 10    |
|        3 | 0.12345678 | SELECT * FROM orders WHERE ...  |
+----------+------------+----------------------------------+
{% endhighlight %}

### 2.3 SHOW PROFILE
分析特定查询的详细执行信息：
{% highlight sql %}
-- 分析最近一次查询
SHOW PROFILE;

-- 分析指定Query_ID的查询
SHOW PROFILE FOR QUERY 3;

-- 显示特定类型的详细信息
SHOW PROFILE CPU, BLOCK IO, SWAPS FOR QUERY 3;

-- 显示所有可用类型
SHOW PROFILE ALL FOR QUERY 3;
{% endhighlight %}

### 2.4 PROFILE类型说明
- **ALL**: 显示所有信息
- **BLOCK IO**: 块I/O操作
- **CONTEXT SWITCHES**: 上下文切换
- **CPU**: CPU使用情况
- **IPC**: 进程间通信
- **MEMORY**: 内存使用
- **PAGE FAULTS**: 页错误
- **SOURCE**: 源代码位置
- **SWAPS**: 交换操作

---

## 3. EXPLAIN执行计划分析

### 3.1 EXPLAIN概述
EXPLAIN是MySQL中分析SQL执行计划的核心工具，帮助理解查询的执行方式和性能瓶颈。

### 3.2 基本语法
{% highlight sql %}
-- 基本EXPLAIN语法
EXPLAIN SELECT * FROM users WHERE id = 1;

-- 显示详细信息
EXPLAIN FORMAT=JSON SELECT * FROM users WHERE id = 1;

-- 显示树形结构
EXPLAIN FORMAT=TREE SELECT * FROM users WHERE id = 1;

-- 分析实际执行
EXPLAIN ANALYZE SELECT * FROM users WHERE id = 1;
{% endhighlight %}

### 3.3 EXPLAIN输出字段详解

#### 3.3.1 核心字段
{% highlight text %}
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-------+
| id | select_type | table | partitions | type | possible_keys | key  | key_len | ref  | rows | filtered | Extra |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-------+
{% endhighlight %}

#### 3.3.2 字段说明
- **id**: 查询标识符，数字越大优先级越高
- **select_type**: 查询类型
  - SIMPLE: 简单查询
  - PRIMARY: 主查询
  - SUBQUERY: 子查询
  - DERIVED: 派生表
  - UNION: 联合查询
  - UNION RESULT: 联合结果

- **table**: 表名或别名
- **partitions**: 分区信息
- **type**: 访问类型（性能从好到差）
  - system: 表中只有一行
  - const: 主键或唯一索引等值查询
  - eq_ref: 唯一索引扫描
  - ref: 非唯一索引扫描
  - range: 索引范围扫描
  - index: 全索引扫描
  - ALL: 全表扫描

- **possible_keys**: 可能使用的索引
- **key**: 实际使用的索引
- **key_len**: 索引长度
- **ref**: 索引比较的列
- **rows**: 预计扫描的行数
- **filtered**: 过滤后的行数百分比
- **Extra**: 额外信息

### 3.4 常见Extra字段说明
{% highlight sql %}
-- 使用索引覆盖
EXPLAIN SELECT id, name FROM users WHERE id = 1;
-- Extra: Using index

-- 使用临时表
EXPLAIN SELECT * FROM users ORDER BY name;
-- Extra: Using filesort

-- 使用索引条件
EXPLAIN SELECT * FROM users WHERE name LIKE 'John%';
-- Extra: Using index condition

-- 使用WHERE过滤
EXPLAIN SELECT * FROM users WHERE age > 18;
-- Extra: Using where

-- 使用JOIN缓冲区
EXPLAIN SELECT * FROM users u JOIN orders o ON u.id = o.user_id;
-- Extra: Using join buffer
{% endhighlight %}

### 3.5 执行计划分析案例

#### 3.5.1 索引使用分析
{% highlight sql %}
-- 创建测试表
CREATE TABLE test_users (
    id INT PRIMARY KEY,
    name VARCHAR(50),
    email VARCHAR(100),
    age INT,
    INDEX idx_name (name),
    INDEX idx_email (email),
    INDEX idx_age (age)
);

-- 分析不同查询的执行计划
EXPLAIN SELECT * FROM test_users WHERE id = 1;
-- type: const, key: PRIMARY

EXPLAIN SELECT * FROM test_users WHERE name = 'John';
-- type: ref, key: idx_name

EXPLAIN SELECT * FROM test_users WHERE age > 18;
-- type: range, key: idx_age

EXPLAIN SELECT * FROM test_users WHERE email LIKE '%@gmail.com';
-- type: ALL, key: NULL (全表扫描)
{% endhighlight %}

#### 3.5.2 JOIN查询分析
{% highlight sql %}
-- 分析JOIN查询
EXPLAIN SELECT u.name, o.order_date 
FROM test_users u 
JOIN orders o ON u.id = o.user_id 
WHERE u.age > 18;

-- 分析LEFT JOIN
EXPLAIN SELECT u.name, COUNT(o.id) 
FROM test_users u 
LEFT JOIN orders o ON u.id = o.user_id 
GROUP BY u.id;
{% endhighlight %}

#### 3.5.3 子查询分析
{% highlight sql %}
-- 分析IN子查询
EXPLAIN SELECT * FROM test_users 
WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);

-- 分析EXISTS子查询
EXPLAIN SELECT * FROM test_users u 
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.user_id = u.id);
{% endhighlight %}

### 3.6 性能优化建议

#### 3.6.1 索引优化
{% highlight sql %}
-- 避免全表扫描
EXPLAIN SELECT * FROM test_users WHERE name LIKE '%John%';
-- 优化：使用前缀索引或全文索引

-- 复合索引顺序
CREATE INDEX idx_name_age ON test_users(name, age);
EXPLAIN SELECT * FROM test_users WHERE name = 'John' AND age > 18;
-- 注意：复合索引的顺序很重要
{% endhighlight %}

#### 3.6.2 查询优化
{% highlight sql %}
-- 避免SELECT *
EXPLAIN SELECT id, name FROM test_users WHERE age > 18;
-- 比 SELECT * 更高效

-- 使用LIMIT
EXPLAIN SELECT * FROM test_users ORDER BY name LIMIT 10;
-- 减少排序开销
{% endhighlight %}

### 3.7 EXPLAIN ANALYZE（MySQL 8.0+）
{% highlight sql %}
-- 显示实际执行时间
EXPLAIN ANALYZE SELECT * FROM test_users WHERE age > 18;

-- 输出示例
-- -> Filter: (test_users.age > 18)  (cost=1.25 rows=5) (actual time=0.123..0.456 rows=3 loops=1)
--     -> Table scan on test_users  (cost=1.25 rows=10) (actual time=0.098..0.234 rows=10 loops=1)
{% endhighlight %}

---

## 4. 通用查询日志和错误日志

### 4.1 通用查询日志
记录所有SQL语句：
{% highlight sql %}
-- 启用通用查询日志
SET GLOBAL general_log = 'ON';
SET GLOBAL general_log_file = '/var/log/mysql/general.log';

-- 查看配置
SHOW VARIABLES LIKE 'general_log%';
{% endhighlight %}

### 4.2 错误日志
记录MySQL错误和警告：
{% highlight sql %}
-- 查看错误日志位置
SHOW VARIABLES LIKE 'log_error';

-- 查看错误日志级别
SHOW VARIABLES LIKE 'log_error_verbosity';
{% endhighlight %}

### 4.3 二进制日志
{% highlight sql %}
-- 查看二进制日志配置
SHOW VARIABLES LIKE 'log_bin%';

-- 查看二进制日志文件
SHOW BINARY LOGS;

-- 查看二进制日志事件
SHOW BINLOG EVENTS IN 'mysql-bin.000001';
{% endhighlight %}

---

## 5. 性能监控工具

### 5.1 系统状态监控
{% highlight sql %}
-- 查看系统状态
SHOW STATUS;

-- 查看特定状态变量
SHOW STATUS LIKE 'Slow_queries';
SHOW STATUS LIKE 'Questions';
SHOW STATUS LIKE 'Uptime';

-- 查看线程状态
SHOW PROCESSLIST;

-- 查看InnoDB状态
SHOW ENGINE INNODB STATUS;
{% endhighlight %}

### 5.2 性能模式（Performance Schema）
{% highlight sql %}
-- 启用性能模式
UPDATE performance_schema.setup_instruments 
SET ENABLED = 'YES', TIMED = 'YES';

-- 查看等待事件
SELECT * FROM performance_schema.events_waits_current;

-- 查看语句事件
SELECT * FROM performance_schema.events_statements_current;

-- 查看连接信息
SELECT * FROM performance_schema.accounts;
{% endhighlight %}

### 5.3 信息模式查询
{% highlight sql %}
-- 查看表统计信息
SELECT * FROM information_schema.TABLE_STATISTICS;

-- 查看索引统计信息
SELECT * FROM information_schema.STATISTICS 
WHERE TABLE_SCHEMA = 'your_database';

-- 查看表大小
SELECT 
    table_schema,
    table_name,
    ROUND(((data_length + index_length) / 1024 / 1024), 2) AS 'Size (MB)'
FROM information_schema.tables 
WHERE table_schema = 'your_database'
ORDER BY (data_length + index_length) DESC;
{% endhighlight %}

---

## 6. 查询优化实战案例

### 6.1 案例1：慢查询分析
{% highlight sql %}
-- 原始慢查询
SELECT u.*, o.order_date, o.amount 
FROM users u 
LEFT JOIN orders o ON u.id = o.user_id 
WHERE u.email LIKE '%@gmail.com' 
ORDER BY o.order_date DESC;

-- 优化后查询
SELECT u.id, u.name, u.email, o.order_date, o.amount 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id 
WHERE u.email LIKE '%@gmail.com' 
ORDER BY o.order_date DESC 
LIMIT 100;
{% endhighlight %}

### 6.2 案例2：索引优化
{% highlight sql %}
-- 查看查询执行计划
EXPLAIN SELECT * FROM orders 
WHERE user_id = 123 AND order_date > '2025-01-01';

-- 创建复合索引
CREATE INDEX idx_user_date ON orders(user_id, order_date);

-- 再次查看执行计划
EXPLAIN SELECT * FROM orders 
WHERE user_id = 123 AND order_date > '2025-01-01';
{% endhighlight %}

### 6.3 案例3：子查询优化
{% highlight sql %}
-- 原始子查询
SELECT * FROM users 
WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);

-- 优化为JOIN
SELECT DISTINCT u.* 
FROM users u 
INNER JOIN orders o ON u.id = o.user_id 
WHERE o.amount > 1000;
{% endhighlight %}

---

## 7. 日志管理和维护

### 7.1 日志轮转
{% highlight bash
# 使用logrotate配置
cat > /etc/logrotate.d/mysql << EOF
/var/log/mysql/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 644 mysql mysql
    postrotate
        mysqladmin flush-logs
    endscript
}
EOF
{% endhighlight %}

### 7.2 日志清理
{% highlight sql %}
-- 清理慢查询日志
SET GLOBAL slow_query_log = 'OFF';
-- 备份并清空日志文件
SET GLOBAL slow_query_log = 'ON';

-- 清理通用查询日志
SET GLOBAL general_log = 'OFF';
-- 备份并清空日志文件
SET GLOBAL general_log = 'ON';
{% endhighlight %}

### 7.3 日志监控脚本
{% highlight bash
#!/bin/bash
# 监控慢查询数量
SLOW_QUERIES=$(mysql -e "SHOW STATUS LIKE 'Slow_queries'" | awk 'NR==2 {print $2}')
echo "Slow queries: $SLOW_QUERIES"

# 监控查询总数
TOTAL_QUERIES=$(mysql -e "SHOW STATUS LIKE 'Questions'" | awk 'NR==2 {print $2}')
echo "Total queries: $TOTAL_QUERIES"

# 计算慢查询比例
if [ $TOTAL_QUERIES -gt 0 ]; then
    RATIO=$(echo "scale=4; $SLOW_QUERIES / $TOTAL_QUERIES * 100" | bc)
    echo "Slow query ratio: ${RATIO}%"
fi
{% endhighlight %}

---

## 8. 性能问题诊断流程

### 8.1 诊断步骤
1. **收集信息**
   - 查看慢查询日志
   - 检查SHOW PROCESSLIST
   - 分析SHOW PROFILE结果

2. **识别瓶颈**
   - CPU密集型 vs I/O密集型
   - 锁等待 vs 资源竞争
   - 网络延迟 vs 磁盘I/O

3. **优化策略**
   - 索引优化
   - 查询重写
   - 配置调优
   - 硬件升级

### 8.2 常见性能问题
{% highlight sql %}
-- 检查锁等待
SHOW ENGINE INNODB STATUS;

-- 检查临时表使用
SHOW STATUS LIKE 'Created_tmp%';

-- 检查排序操作
SHOW STATUS LIKE 'Sort%';

-- 检查连接数
SHOW STATUS LIKE 'Threads_connected';
SHOW VARIABLES LIKE 'max_connections';
{% endhighlight %}

### 8.3 性能基准测试
{% highlight sql %}
-- 使用sysbench进行基准测试
-- 安装sysbench后执行：
sysbench --test=oltp --mysql-host=localhost --mysql-user=root --mysql-password=password --mysql-db=test --oltp-table-size=1000000 prepare
sysbench --test=oltp --mysql-host=localhost --mysql-user=root --mysql-password=password --mysql-db=test --oltp-table-size=1000000 --num-threads=8 run
{% endhighlight %}

---

## 9. 最佳实践

### 9.1 慢查询日志配置
- 设置合理的 `long_query_time` 阈值（建议1-2秒）
- 定期分析慢查询日志
- 启用 `log_queries_not_using_indexes`
- 配置日志轮转避免文件过大

### 9.2 性能监控
- 定期检查关键性能指标
- 设置性能告警阈值
- 建立性能基准和趋势分析
- 记录性能变更历史

### 9.3 查询优化
- 使用EXPLAIN分析执行计划
- 避免SELECT *，只查询需要的列
- 合理使用索引，避免过度索引
- 优化JOIN操作，避免笛卡尔积
- 使用LIMIT限制结果集大小

---

## 总结
- MySQL查询日志是性能优化的核心工具
- 慢查询日志帮助识别性能瓶颈
- SHOW PROFILES提供详细的查询执行信息
- 结合多种监控工具进行全面的性能分析
- 建立系统化的性能监控和优化流程

## 参考资料
- MySQL官方文档：Query Log
- MySQL性能优化最佳实践
- 数据库性能调优实战指南
