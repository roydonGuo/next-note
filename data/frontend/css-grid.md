# CSS Grid 布局

## Grid 简介

CSS Grid 是一个二维布局系统，可以同时处理行和列。

## 基本概念

### Grid Container
设置为 `display: grid` 的元素。

### Grid Item
Grid 容器的直接子元素。

### Grid Line
Grid 的分隔线。

### Grid Track
两条 Grid Line 之间的空间。

## 示例

```css
.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: 20px;
}
```

## 常用属性

- `grid-template-columns`: 定义列
- `grid-template-rows`: 定义行
- `gap`: 设置间距
- `grid-column`: 跨列
- `grid-row`: 跨行

