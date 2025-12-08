### Dictionary<TKey, TValue>的高阶方法详解

Dictionary<TKey, TValue>结合LINQ提供了强大的高阶方法，可以实现复杂的数据查询、转换和操作。下面详细介绍这些常用的高阶方法：

#### 1. 排序方法

##### OrderBy 方法

**签名**：`IOrderedEnumerable<KeyValuePair<TKey, TValue>> OrderBy<TKey, TValue, TKeySelector>(this IEnumerable<KeyValuePair<TKey, TValue>> source, Func<KeyValuePair<TKey, TValue>, TKeySelector> keySelector)`

**返回值**：`IOrderedEnumerable<KeyValuePair<TKey, TValue>>` - 已排序的键值对序列

**功能**：根据指定的键选择器对字典的键值对进行升序排序

```csharp
Dictionary<string, int> studentScores = new Dictionary<string, int>
{
    { "张三", 90 },
    { "李四", 85 },
    { "王五", 95 },
    { "赵六", 88 }
};

// 按分数升序排序
var sortedByScore = studentScores.OrderBy(pair => pair.Value);

// 按姓名排序
var sortedByName = studentScores.OrderBy(pair => pair.Key);

// 遍历排序后的结果
foreach (var pair in sortedByScore)
{
    Console.WriteLine($"{pair.Key}: {pair.Value}");
}
```

##### OrderByDescending 方法

**签名**：`IOrderedEnumerable<KeyValuePair<TKey, TValue>> OrderByDescending<TKey, TValue, TKeySelector>(this IEnumerable<KeyValuePair<TKey, TValue>> source, Func<KeyValuePair<TKey, TValue>, TKeySelector> keySelector)`

**返回值**：`IOrderedEnumerable<KeyValuePair<TKey, TValue>>` - 已降序排序的键值对序列

**功能**：根据指定的键选择器对字典的键值对进行降序排序

```csharp
// 按分数降序排序
var sortedByScoreDesc = studentScores.OrderByDescending(pair => pair.Value);

// 获取最高分的学生
var highestScoreStudent = studentScores.OrderByDescending(pair => pair.Value).FirstOrDefault();
```

##### ThenBy/ThenByDescending 方法

**签名**：`IOrderedEnumerable<KeyValuePair<TKey, TValue>> ThenBy(...) / ThenByDescending(...)`

**返回值**：`IOrderedEnumerable<KeyValuePair<TKey, TValue>>` - 进一步排序的键值对序列

**功能**：在已排序的基础上进行二级排序

```csharp
// 先按分数降序，分数相同时按姓名排序
var sortedByScoreThenName = studentScores
    .OrderByDescending(pair => pair.Value)
    .ThenBy(pair => pair.Key);
```

#### 2. 筛选方法

##### Where 方法

**签名**：`IEnumerable<KeyValuePair<TKey, TValue>> Where<TKey, TValue>(this IEnumerable<KeyValuePair<TKey, TValue>> source, Func<KeyValuePair<TKey, TValue>, bool> predicate)`

**返回值**：`IEnumerable<KeyValuePair<TKey, TValue>>` - 符合条件的键值对序列

**功能**：根据条件筛选字典中的键值对

```csharp
// 筛选分数大于等于90的学生
var highScorers = studentScores.Where(pair => pair.Value >= 90);

// 筛选姓"张"的学生
var zhangStudents = studentScores.Where(pair => pair.Key.StartsWith("张"));

// 组合条件筛选
var specificStudents = studentScores.Where(pair => pair.Value > 85 && pair.Key.Length > 2);
```

#### 3. 投影转换方法

##### Select 方法

**签名**：`IEnumerable<TResult> Select<TKey, TValue, TResult>(this IEnumerable<KeyValuePair<TKey, TValue>> source, Func<KeyValuePair<TKey, TValue>, TResult> selector)`

**返回值**：`IEnumerable<TResult>` - 转换后的结果序列

**功能**：将字典中的键值对转换为新的形式

```csharp
// 转换为匿名类型
var studentInfo = studentScores.Select(pair => new {
    Name = pair.Key,
    Score = pair.Value,
    Grade = pair.Value >= 90 ? "优秀" : (pair.Value >= 80 ? "良好" : "及格")
});

// 转换为字符串数组
var studentDescriptions = studentScores.Select(pair => $"{pair.Key}的分数是{pair.Value}");

// 只选择值
var scores = studentScores.Select(pair => pair.Value).ToList();
```

##### SelectMany 方法

**签名**：`IEnumerable<TResult> SelectMany<TKey, TValue, TResult>(this IEnumerable<KeyValuePair<TKey, TValue>> source, Func<KeyValuePair<TKey, TValue>, IEnumerable<TResult>> selector)`

**返回值**：`IEnumerable<TResult>` - 展平后的结果序列

**功能**：将每个键值对转换为序列，然后将这些序列展平

```csharp
Dictionary<string, List<string>> studentCourses = new Dictionary<string, List<string>>
{
    { "张三", new List<string> { "数学", "物理" } },
    { "李四", new List<string> { "化学", "生物" } }
};

// 获取所有课程列表
var allCourses = studentCourses.SelectMany(pair => pair.Value).Distinct();
```

#### 4. 分组方法

##### GroupBy 方法

**签名**：`IEnumerable<IGrouping<TGroupKey, KeyValuePair<TKey, TValue>>> GroupBy<TKey, TValue, TGroupKey>(this IEnumerable<KeyValuePair<TKey, TValue>> source, Func<KeyValuePair<TKey, TValue>, TGroupKey> keySelector)`

**返回值**：`IEnumerable<IGrouping<TGroupKey, KeyValuePair<TKey, TValue>>>` - 分组后的结果序列

**功能**：根据指定的键选择器对字典的键值对进行分组

```csharp
// 按分数段分组
var groupedByScoreRange = studentScores.GroupBy(pair => {
    if (pair.Value >= 90) return "优秀";
    if (pair.Value >= 80) return "良好";
    return "及格";
});

// 遍历分组结果
foreach (var group in groupedByScoreRange)
{
    Console.WriteLine($"{group.Key}学生：");
    foreach (var student in group)
    {
        Console.WriteLine($"  - {student.Key}: {student.Value}");
    }
}
```

#### 5. 转换为字典或查找表

##### ToDictionary 方法

**签名**：`Dictionary<TResultKey, TResultValue> ToDictionary<TKey, TValue, TResultKey, TResultValue>(this IEnumerable<KeyValuePair<TKey, TValue>> source, Func<KeyValuePair<TKey, TValue>, TResultKey> keySelector, Func<KeyValuePair<TKey, TValue>, TResultValue> valueSelector)`

**返回值**：`Dictionary<TResultKey, TResultValue>` - 新的字典

**功能**：将查询结果转换为新的字典

```csharp
// 分数翻倍并创建新字典
var doubledScores = studentScores.ToDictionary(
    pair => pair.Key,
    pair => pair.Value * 2
);

// 筛选后创建新字典
var highScoreDict = studentScores
    .Where(pair => pair.Value >= 90)
    .ToDictionary(pair => pair.Key, pair => pair.Value);
```

##### ToLookup 方法

**签名**：`ILookup<TGroupKey, TValue> ToLookup<TKey, TValue, TGroupKey>(this IEnumerable<KeyValuePair<TKey, TValue>> source, Func<KeyValuePair<TKey, TValue>, TGroupKey> keySelector, Func<KeyValuePair<TKey, TValue>, TValue> elementSelector)`

**返回值**：`ILookup<TGroupKey, TValue>` - 查找表对象

**功能**：创建一个查找表，类似于允许重复键的字典

```csharp
// 创建按分数段分组的查找表
var scoreLookup = studentScores.ToLookup(
    pair => pair.Value >= 90 ? "优秀" : (pair.Value >= 80 ? "良好" : "及格"),
    pair => pair.Key
);

// 查询优秀学生
var excellentStudents = scoreLookup["优秀"];
```

#### 6. 查找和获取元素方法

##### First/FirstOrDefault 方法

**签名**：`KeyValuePair<TKey, TValue> First<TKey, TValue>(...) / KeyValuePair<TKey, TValue>? FirstOrDefault<TKey, TValue>(...)`

**返回值**：`KeyValuePair<TKey, TValue>` 或 `KeyValuePair<TKey, TValue>?`

**功能**：获取序列中的第一个元素，或满足条件的第一个元素

```csharp
// 获取第一个学生
var firstStudent = studentScores.First();

// 获取第一个分数大于90的学生，如果没有则返回默认值
var highScorer = studentScores.FirstOrDefault(pair => pair.Value > 90);

if (highScorer.HasValue)
{
    Console.WriteLine($"找到高分学生：{highScorer.Value.Key}");
}
```

##### Last/LastOrDefault 方法

**签名**：`KeyValuePair<TKey, TValue> Last<TKey, TValue>(...) / KeyValuePair<TKey, TValue>? LastOrDefault<TKey, TValue>(...)`

**返回值**：`KeyValuePair<TKey, TValue>` 或 `KeyValuePair<TKey, TValue>?`

**功能**：获取序列中的最后一个元素，或满足条件的最后一个元素

```csharp
// 获取排序后的最后一名学生
var lastStudent = studentScores.OrderBy(pair => pair.Value).LastOrDefault();
```

##### Single/SingleOrDefault 方法

**签名**：`KeyValuePair<TKey, TValue> Single<TKey, TValue>(...) / KeyValuePair<TKey, TValue>? SingleOrDefault<TKey, TValue>(...)`

**返回值**：`KeyValuePair<TKey, TValue>` 或 `KeyValuePair<TKey, TValue>?`

**功能**：获取序列中唯一的元素，如果有多个或零个匹配项则抛出异常

```csharp
// 获取唯一叫张三的学生信息
var zhangSan = studentScores.SingleOrDefault(pair => pair.Key == "张三");
```

#### 7. 聚合方法

##### Aggregate 方法

**签名**：`TAccumulate Aggregate<TKey, TValue, TAccumulate>(this IEnumerable<KeyValuePair<TKey, TValue>> source, TAccumulate seed, Func<TAccumulate, KeyValuePair<TKey, TValue>, TAccumulate> func)`

**返回值**：`TAccumulate` - 聚合后的结果

**功能**：对序列应用累加器函数，执行自定义聚合操作

```csharp
// 拼接所有学生信息
string studentSummary = studentScores.Aggregate(
    "学生成绩汇总：",
    (current, pair) => current + $"{pair.Key}({pair.Value}), "
);

// 计算总分
int totalScore = studentScores.Aggregate(0, (sum, pair) => sum + pair.Value);
```

##### Count 方法

**签名**：`int Count<TKey, TValue>(this IEnumerable<KeyValuePair<TKey, TValue>> source, Func<KeyValuePair<TKey, TValue>, bool> predicate)`

**返回值**：`int` - 满足条件的元素数量

**功能**：计算满足条件的键值对数量

```csharp
// 统计分数大于90的学生数量
int highScorerCount = studentScores.Count(pair => pair.Value > 90);
```

##### Sum/Average/Max/Min 方法

**签名**：`TSource Sum<TKey, TValue, TSource>(...) / double Average<TKey, TValue>(...) / TSource Max<TKey, TValue, TSource>(...) / TSource Min<TKey, TValue, TSource>(...)`

**返回值**：根据方法不同返回数值类型

**功能**：计算数值序列的总和、平均值、最大值或最小值

```csharp
// 计算统计数据
int total = studentScores.Sum(pair => pair.Value);
double average = studentScores.Average(pair => pair.Value);
int max = studentScores.Max(pair => pair.Value);
int min = studentScores.Min(pair => pair.Value);
```

#### 8. 集合判断方法

##### Any/All 方法

**签名**：`bool Any<TKey, TValue>(...) / bool All<TKey, TValue>(...)`

**返回值**：`bool` - 布尔值结果

**功能**：判断是否存在满足条件的元素，或所有元素是否都满足条件

```csharp
// 判断是否有优秀学生
bool hasExcellentStudents = studentScores.Any(pair => pair.Value >= 90);

// 判断是否所有学生都及格
bool allPassed = studentScores.All(pair => pair.Value >= 60);
```

##### Contains 方法

**签名**：`bool Contains<TKey, TValue>(this IEnumerable<KeyValuePair<TKey, TValue>> source, KeyValuePair<TKey, TValue> item, IEqualityComparer<KeyValuePair<TKey, TValue>>? comparer)`

**返回值**：`bool` - 是否包含指定元素

**功能**：判断序列是否包含指定的键值对

```csharp
// 检查是否包含特定键值对
bool containsSpecificPair = studentScores.Contains(
    new KeyValuePair<string, int>("张三", 90));
```

#### 9. 分页和切片方法

##### Skip/Take 方法

**签名**：`IEnumerable<KeyValuePair<TKey, TValue>> Skip<TKey, TValue>(...) / IEnumerable<KeyValuePair<TKey, TValue>> Take<TKey, TValue>(...)`

**返回值**：`IEnumerable<KeyValuePair<TKey, TValue>>` - 处理后的序列

**功能**：跳过指定数量的元素，或获取指定数量的元素

```csharp
// 分页获取学生信息（每页2条）
int pageSize = 2;
int pageIndex = 1;
var pageStudents = studentScores
    .OrderBy(pair => pair.Key)
    .Skip(pageIndex * pageSize)
    .Take(pageSize);
```

##### SkipWhile/TakeWhile 方法

**签名**：`IEnumerable<KeyValuePair<TKey, TValue>> SkipWhile<TKey, TValue>(...) / IEnumerable<KeyValuePair<TKey, TValue>> TakeWhile<TKey, TValue>(...)`

**返回值**：`IEnumerable<KeyValuePair<TKey, TValue>>` - 处理后的序列

**功能**：跳过满足条件的元素，或获取满足条件的元素，直到条件不满足为止

```csharp
// 获取分数连续大于85的学生，直到遇到第一个不满足条件的
var连续高分学生 = studentScores
    .OrderBy(pair => pair.Key)
    .TakeWhile(pair => pair.Value > 85);
```

#### 10. 高阶方法的组合使用

Dictionary<TKey, TValue>的高阶方法可以灵活组合，实现复杂的数据处理逻辑：

```csharp
// 示例1：获取前三名学生并转换为新格式
var topThreeStudents = studentScores
    .OrderByDescending(pair => pair.Value)
    .Take(3)
    .Select((pair, index) => new {
        Rank = index + 1,
        Name = pair.Key,
        Score = pair.Value
    });

// 示例2：复杂分组和统计
var scoreStats = studentScores
    .GroupBy(pair => pair.Value >= 90 ? "优秀" : (pair.Value >= 80 ? "良好" : "及格"))
    .Select(group => new {
        Category = group.Key,
        Count = group.Count(),
        Names = string.Join(", ", group.Select(pair => pair.Key)),
        AverageScore = group.Average(pair => pair.Value)
    });

// 示例3：根据条件筛选并转换为多级字典
var studentDictionary = studentScores
    .Where(pair => pair.Value > 80)
    .GroupBy(pair => pair.Value >= 90 ? "A" : "B")
    .ToDictionary(
        group => group.Key,
        group => group.ToDictionary(pair => pair.Key, pair => pair.Value)
    );
```

通过这些高阶方法的组合使用，可以极大地简化字典数据的处理和转换操作，提高代码的可读性和可维护性。