---
title: MySQL 查询日志与性能诊断
published: 2023-06-20
description: 慢查询日志 / EXPLAIN 执行计划 / SHOW PROFILES / Performance Schema
image: ''
tags:
  - MySQL
  - 性能优化
  - 慢查询日志
  - EXPLAIN
  - 查询监控
category: MySQL
draft: false
---

## 目录

1. [慢查询日志（Slow Query Log）](#1-慢查询日志slow-query-log)
   - [1.1 配置参数](#11-配置参数)
   - [1.2 持久化配置（my.cnf）](#12-持久化配置mycnf)
   - [1.3 日志格式解读](#13-日志格式解读)
   - [1.4 mysqldumpslow 分析工具](#14-mysqldumpslow-分析工具)
2. [SHOW PROFILES 执行剖析](#2-show-profiles-执行剖析)
   - [2.1 启用与查看](#21-启用与查看)
   - [2.2 SHOW PROFILE 详细分析](#22-show-profile-详细分析)
3. [EXPLAIN 执行计划](#3-explain-执行计划)
   - [3.1 基本语法](#31-基本语法)
   - [3.2 核心字段详解](#32-核心字段详解)
   - [3.3 type 访问类型一览](#33-type-访问类型一览)
   - [3.4 Extra 字段说明](#34-extra-字段说明)
   - [3.5 EXPLAIN ANALYZE（MySQL 8.0+）](#35-explain-analyzemysql-80)
4. [日志类型总览](#4-日志类型总览)
   - [4.1 通用查询日志](#41-通用查询日志)
   - [4.2 错误日志](#42-错误日志)
   - [4.3 二进制日志（Binlog）](#43-二进制日志binlog)
5. [系统状态与 Performance Schema](#5-系统状态与-performance-schema)
   - [5.1 SHOW STATUS 关键指标](#51-show-status-关键指标)
   - [5.2 Performance Schema 常用查询](#52-performance-schema-常用查询)
   - [5.3 information_schema 表统计](#53-information_schema-表统计)
6. [查询优化实战](#6-查询优化实战)
   - [6.1 慢 JOIN 查询优化](#61-慢-join-查询优化)
   - [6.2 复合索引命中](#62-复合索引命中)
   - [6.3 IN 子查询转 JOIN](#63-in-子查询转-join)
7. [日志管理与维护](#7-日志管理与维护)
   - [7.1 日志轮转（logrotate）](#71-日志轮转logrotate)
   - [7.2 日志清理](#72-日志清理)
8. [性能问题诊断流程](#8-性能问题诊断流程)
9. [最佳实践速查](#9-最佳实践速查)

---

## 1. 慢查询日志（Slow Query Log）

慢查询日志记录执行时间超过阈值的 SQL，是线上性能排障的首选入口。

### 1.1 配置参数

```sql
-- 查看当前配置
SHOW VARIABLES LIKE '%slow_query%';
SHOW VARIABLES LIKE '%long_query_time%';

-- 动态开启
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;                            -- 阈值，单位：秒
SET GLOBAL slow_query_log_file = '/var/log/mysql/slow.log';

-- 记录未命中索引的查询（不管是否超时）
SET GLOBAL log_queries_not_using_indexes = 'ON';

-- 记录慢管理语句（ALTER TABLE 等）
SET GLOBAL log_slow_admin_statements = 'ON';
```

### 1.2 持久化配置（my.cnf）

```ini
[mysqld]
slow_query_log          = 1
slow_query_log_file     = /var/log/mysql/slow.log
long_query_time         = 2
log_queries_not_using_indexes = 1
log_slow_admin_statements     = 1
```

修改后执行 `FLUSH LOGS;` 或重启 mysqld 生效。

### 1.3 日志格式解读

```
# Time: 2023-06-20T10:30:15.123456Z
# User@Host: root[root] @ localhost [127.0.0.1]  Id: 12345
# Query_time: 5.234567  Lock_time: 0.000123  Rows_sent: 1000  Rows_examined: 50000
SET timestamp=1687257015;
SELECT * FROM users WHERE email LIKE '%@gmail.com';
```

| 字段 | 含义 |
|------|------|
| `Query_time` | 总执行时间 |
| `Lock_time` | 等锁时间 |
| `Rows_sent` | 实际返回行数 |
| `Rows_examined` | 扫描行数（越大越危险）|

`Rows_examined / Rows_sent` 比值越高，说明索引效率越低。

### 1.4 mysqldumpslow 分析工具

```bash
# 显示耗时 TOP 10
mysqldumpslow -t 10 /var/log/mysql/slow.log

# 按执行次数排序 TOP 10
mysqldumpslow -s c -t 10 /var/log/mysql/slow.log

# 按锁等待时间排序
mysqldumpslow -s l -t 10 /var/log/mysql/slow.log

# 不抽象参数，显示原始 SQL
mysqldumpslow -a /var/log/mysql/slow.log

# 过滤指定数据库
mysqldumpslow -g "mydb" /var/log/mysql/slow.log
```

---

## 2. SHOW PROFILES 执行剖析

SHOW PROFILES 是会话级别的轻量诊断工具，可以拆分每个查询在各阶段花费的时间。

> ⚠️ MySQL 8.0 开始 SHOW PROFILES 被标记为废弃，推荐迁移到 Performance Schema。但在 5.7 以下环境中仍然是最方便的工具。

### 2.1 启用与查看

```sql
-- 仅对当前会话生效
SET profiling = 1;

-- 执行若干 SQL 后查看列表
SHOW PROFILES;
```

| Query_ID | Duration   | Query                         |
|---------:|-----------:|-------------------------------|
| 1        | 0.00012345 | SELECT 1                      |
| 2        | 0.00123456 | SELECT * FROM users LIMIT 10  |
| 3        | 0.12345678 | SELECT * FROM orders WHERE …  |

### 2.2 SHOW PROFILE 详细分析

```sql
-- 查看最近一次查询各阶段耗时
SHOW PROFILE;

-- 查看指定 Query_ID
SHOW PROFILE FOR QUERY 3;

-- 同时展示 CPU 和块 IO 消耗
SHOW PROFILE CPU, BLOCK IO FOR QUERY 3;

-- 展示全部类型
SHOW PROFILE ALL FOR QUERY 3;
```

**常用 Profile 类型：**

| 类型 | 含义 |
|------|------|
| `CPU` | CPU 用户态/内核态时间 |
| `BLOCK IO` | 块设备读写次数 |
| `CONTEXT SWITCHES` | 上下文切换次数 |
| `MEMORY` | 内存分配（部分版本支持）|
| `SWAPS` | 交换操作次数 |

重点关注状态中的 **`Sending data`**（实际读取和发送数据）和 **`Sorting result`**（排序），这两个通常是性能大头。

---

## 3. EXPLAIN 执行计划

EXPLAIN 是分析单条 SQL 的核心手段，无需修改数据即可预判 MySQL 的执行策略。

### 3.1 基本语法

```sql
-- 标准表格输出
EXPLAIN SELECT * FROM users WHERE id = 1;

-- JSON 格式，包含 cost 信息
EXPLAIN FORMAT=JSON SELECT * FROM users WHERE id = 1;

-- 树形结构（MySQL 8.0.18+）
EXPLAIN FORMAT=TREE SELECT * FROM users WHERE id = 1;

-- 实际执行并附带真实统计数据（MySQL 8.0.18+）
EXPLAIN ANALYZE SELECT * FROM users WHERE id = 1;
```

### 3.2 核心字段详解

| 字段 | 含义 |
|------|------|
| `id` | 查询序号，数字越大优先级越高；相同则从上到下执行 |
| `select_type` | 查询类型：SIMPLE / PRIMARY / SUBQUERY / DERIVED / UNION |
| `table` | 当前行操作的表名或别名 |
| `partitions` | 命中的分区（分区表才有值）|
| `type` | **访问类型**（见下节）|
| `possible_keys` | 优化器候选的索引列表 |
| `key` | 优化器最终选择的索引 |
| `key_len` | 使用索引的字节长度（可推断使用了联合索引的几列）|
| `ref` | 与索引列比较的列或常量 |
| `rows` | 预估扫描行数 |
| `filtered` | 经 WHERE 过滤后的行比例（%）|
| `Extra` | 额外信息（见下节）|

### 3.3 type 访问类型一览

性能从好到差依次排列：

| type | 说明 |
|------|------|
| `system` | 表只有一行，特殊情况 |
| `const` | 主键或唯一索引等值查询，结果最多一行 |
| `eq_ref` | 被驱动表通过唯一索引与驱动表关联 |
| `ref` | 普通索引等值查询 |
| `fulltext` | 全文索引 |
| `range` | 索引范围扫描（BETWEEN / IN / > / < 等）|
| `index` | 全索引扫描（比 ALL 少，因为只扫索引树）|
| `ALL` | 全表扫描，**生产环境大表应尽力避免** |

> 线上要求：至少达到 `range` 级别，核心查询应达到 `ref` 或 `const`。

### 3.4 Extra 字段说明

| Extra | 含义 | 是否需要关注 |
|-------|------|-------------|
| `Using index` | 覆盖索引，无需回表 | ✅ 最优 |
| `Using where` | Server 层用 WHERE 过滤 | ℹ️ 正常 |
| `Using index condition` | 索引条件下推（ICP）| ✅ 好 |
| `Using temporary` | 使用了临时表 | ⚠️ 需优化 |
| `Using filesort` | 需要额外排序，无法用索引 | ⚠️ 需优化 |
| `Using join buffer` | JOIN 使用了 Block Nested Loop | ⚠️ 需优化 |
| `Select tables optimized away` | MIN/MAX 优化，直接查索引 | ✅ 最优 |

`Using temporary` 和 `Using filesort` 同时出现是需要立刻处理的信号。

### 3.5 EXPLAIN ANALYZE（MySQL 8.0+）

EXPLAIN ANALYZE 会**真正执行**查询，并返回预估值与实际值的对比，是排查执行计划偏差的利器。

```sql
EXPLAIN ANALYZE SELECT u.name, COUNT(o.id)
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id;
```

输出示例：
```
-> Table scan on <temporary>  (cost=2.50..5.00 rows=3) (actual time=0.048..0.052 rows=3 loops=1)
    -> Aggregate using temporary table  (actual time=0.043..0.043 rows=3 loops=1)
        -> Nested loop left join  (cost=1.25 rows=3) (actual time=0.019..0.030 rows=4 loops=1)
```

关注 `rows=预估` vs `actual rows=真实值`，偏差大说明统计信息过旧，可执行 `ANALYZE TABLE 表名;` 更新。

---

## 4. 日志类型总览

### 4.1 通用查询日志

记录**所有**进入 MySQL 的 SQL，包括连接、断开和每条语句。线上谨慎开启，I/O 压力极大。

```sql
SET GLOBAL general_log = 'ON';
SET GLOBAL general_log_file = '/var/log/mysql/general.log';

SHOW VARIABLES LIKE 'general_log%';
```

### 4.2 错误日志

```sql
-- 查看路径
SHOW VARIABLES LIKE 'log_error';

-- 日志详细程度（1=错误，2=警告，3=通知）
SHOW VARIABLES LIKE 'log_error_verbosity';
```

### 4.3 二进制日志（Binlog）

用于主从复制和时间点恢复，不直接用于查询性能排障。

```sql
SHOW VARIABLES LIKE 'log_bin%';

-- 查看所有 binlog 文件
SHOW BINARY LOGS;

-- 查看指定文件的事件
SHOW BINLOG EVENTS IN 'mysql-bin.000001' LIMIT 20;
```

---

## 5. 系统状态与 Performance Schema

### 5.1 SHOW STATUS 关键指标

```sql
-- 总慢查询数（自启动以来累计）
SHOW STATUS LIKE 'Slow_queries';

-- 总请求数
SHOW STATUS LIKE 'Questions';

-- 临时表相关（大量磁盘临时表是问题信号）
SHOW STATUS LIKE 'Created_tmp%';

-- 排序操作
SHOW STATUS LIKE 'Sort%';

-- 当前连接数
SHOW STATUS LIKE 'Threads_connected';
SHOW VARIABLES LIKE 'max_connections';

-- 查看线程详情（找长时间运行的查询）
SHOW PROCESSLIST;

-- InnoDB 锁等待详情
SHOW ENGINE INNODB STATUS;
```

### 5.2 Performance Schema 常用查询

```sql
-- 查询耗时最长的 SQL TOP 10
SELECT DIGEST_TEXT, COUNT_STAR, AVG_TIMER_WAIT / 1e12 AS avg_sec
FROM performance_schema.events_statements_summary_by_digest
ORDER BY AVG_TIMER_WAIT DESC
LIMIT 10;

-- 查看当前等待事件
SELECT * FROM performance_schema.events_waits_current
WHERE EVENT_NAME != 'idle';

-- 查看锁等待
SELECT * FROM performance_schema.data_lock_waits;
```

### 5.3 information_schema 表统计

```sql
-- 查看各表大小（MB）
SELECT
    table_schema                AS `数据库`,
    table_name                  AS `表名`,
    ROUND(data_length  / 1024 / 1024, 2) AS `数据(MB)`,
    ROUND(index_length / 1024 / 1024, 2) AS `索引(MB)`,
    ROUND((data_length + index_length) / 1024 / 1024, 2) AS `总计(MB)`
FROM information_schema.tables
WHERE table_schema = 'your_database'
ORDER BY (data_length + index_length) DESC;

-- 查看索引信息
SELECT INDEX_NAME, COLUMN_NAME, CARDINALITY, NON_UNIQUE
FROM information_schema.STATISTICS
WHERE TABLE_SCHEMA = 'your_database'
  AND TABLE_NAME   = 'users'
ORDER BY INDEX_NAME, SEQ_IN_INDEX;
```

---

## 6. 查询优化实战

### 6.1 慢 JOIN 查询优化

```sql
-- ❌ 问题查询：SELECT * + LIKE '%xxx%' + LEFT JOIN 无 LIMIT
SELECT u.*, o.order_date, o.amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.email LIKE '%@gmail.com'
ORDER BY o.order_date DESC;

-- ✅ 优化：指定列、改 INNER JOIN、加 LIMIT
SELECT u.id, u.name, u.email, o.order_date, o.amount
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE u.email LIKE 'support@%'      -- 改为前缀匹配，可命中索引
ORDER BY o.order_date DESC
LIMIT 100;
```

### 6.2 复合索引命中

```sql
-- 查看执行计划
EXPLAIN SELECT * FROM orders
WHERE user_id = 123 AND order_date > '2023-01-01';
-- 若 key 为 NULL，说明缺少索引

-- 创建复合索引（注意顺序：等值列在前）
CREATE INDEX idx_user_date ON orders(user_id, order_date);

-- 再次 EXPLAIN 确认 type 变为 range，key 变为 idx_user_date
EXPLAIN SELECT * FROM orders
WHERE user_id = 123 AND order_date > '2023-01-01';
```

### 6.3 IN 子查询转 JOIN

```sql
-- ❌ IN 子查询：优化器可能生成较差的计划
SELECT * FROM users
WHERE id IN (SELECT user_id FROM orders WHERE amount > 1000);

-- ✅ 改写为 JOIN：更可控
SELECT DISTINCT u.*
FROM users u
INNER JOIN orders o ON u.id = o.user_id
WHERE o.amount > 1000;
```

---

## 7. 日志管理与维护

### 7.1 日志轮转（logrotate）

```bash
cat > /etc/logrotate.d/mysql << 'EOF'
/var/log/mysql/*.log {
    daily
    rotate 7
    compress
    delaycompress
    missingok
    notifempty
    create 640 mysql mysql
    postrotate
        mysqladmin flush-logs
    endscript
}
EOF
```

### 7.2 日志清理

动态关闭 → 手动清空/归档文件 → 重新开启，是最稳妥的步骤：

```sql
-- 关闭慢查询日志
SET GLOBAL slow_query_log = 'OFF';
-- （Shell 层备份并清空文件）
SET GLOBAL slow_query_log = 'ON';

-- 清理通用查询日志（同理）
SET GLOBAL general_log = 'OFF';
SET GLOBAL general_log = 'ON';
```

---

## 8. 性能问题诊断流程

```
发现慢 SQL / 告警
        │
        ▼
SHOW PROCESSLIST  ──→  是否有长时间阻塞？
        │                       │ YES → SHOW ENGINE INNODB STATUS 查锁
        │ NO
        ▼
查慢查询日志
  mysqldumpslow 找 Top SQL
        │
        ▼
EXPLAIN 分析执行计划
  type 是否为 ALL / index？
        │ YES → 添加/调整索引
        │ NO  ↓
EXPLAIN ANALYZE
  实际 rows 与预估差距大？
        │ YES → ANALYZE TABLE 更新统计信息
        │ NO  ↓
SHOW PROFILE / Performance Schema
  找具体耗时阶段（Sending data / Sorting）
        │
        ▼
针对瓶颈：重写 SQL / 调整 buffer_pool / 升级配置
```

**常用快速检查命令：**

```sql
-- 锁等待
SHOW ENGINE INNODB STATUS;

-- 磁盘临时表占比高（> 10% 需关注）
SHOW STATUS LIKE 'Created_tmp_disk_tables';
SHOW STATUS LIKE 'Created_tmp_tables';

-- 排序溢出到磁盘
SHOW STATUS LIKE 'Sort_merge_passes';

-- 连接使用率
SHOW STATUS LIKE 'Threads_connected';
SHOW VARIABLES LIKE 'max_connections';
```

---

## 9. 最佳实践速查

| 场景 | 建议 |
|------|------|
| 慢查询阈值 | 生产环境设 1~2s；初排查可临时设 0.1s |
| 索引设计 | 等值列 > 范围列；低区分度列（如 status）放后面 |
| 避免索引失效 | 不在索引列上做函数、隐式转换、`LIKE '%xx'` |
| 查询设计 | 禁止 `SELECT *`；大结果集必须加 `LIMIT` |
| 统计信息 | 大批量导入后执行 `ANALYZE TABLE`，保证执行计划准确 |
| 监控告警 | 对 `Slow_queries` 增长速率、`Threads_connected` 设阈值告警 |
| 日志维护 | 开启 logrotate，避免慢查询日志撑满磁盘 |
