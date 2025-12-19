# SQL 基础

## 什么是 SQL？

SQL（Structured Query Language）是用于管理关系数据库的标准语言。

## 基本操作

### SELECT 查询

```sql
SELECT * FROM users;
SELECT name, email FROM users WHERE age > 18;
```

### INSERT 插入

```sql
INSERT INTO users (name, email) VALUES ('John', 'john@example.com');
```

### UPDATE 更新

```sql
UPDATE users SET email = 'newemail@example.com' WHERE id = 1;
```

### DELETE 删除

```sql
DELETE FROM users WHERE id = 1;
```

## 常用函数

- COUNT(): 计数
- SUM(): 求和
- AVG(): 平均值
- MAX(): 最大值
- MIN(): 最小值

## JOIN 操作

JOIN 用于从多个表中获取数据。

