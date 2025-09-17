# 动画效果使用指南

## 概述

本项目已经优化了动画效果，提供了丰富的动画工具类和关键帧动画，让整个应用更加流畅自然。

## 动画效果分类

### 1. 页面进入动画
- **pageEnter**: 页面整体进入动画，从下方滑入
- **fadeIn**: 淡入效果
- **fadeInUp**: 从下方淡入
- **fadeInDown**: 从上方淡入
- **fadeInLeft**: 从左侧淡入
- **fadeInRight**: 从右侧淡入

### 2. 滑入动画
- **slideInUp**: 从下方滑入
- **slideInDown**: 从上方滑入
- **slideInLeft**: 从左侧滑入
- **slideInRight**: 从右侧滑入

### 3. 缩放动画
- **scaleIn**: 缩放进入
- **scaleInBounce**: 弹跳缩放进入

### 4. 弹跳动画
- **bounceIn**: 弹跳进入
- **bounceInUp**: 从下方弹跳进入

### 5. 循环动画
- **pulse**: 脉冲效果
- **twinkle**: 闪烁效果
- **float**: 浮动效果
- **swing**: 摇摆效果
- **heartbeat**: 心跳效果

## 使用方法

### 1. 在页面中使用

```css
/* 在页面的 .wxss 文件中 */
.container {
  animation: pageEnter 0.5s ease-out;
}

.card {
  animation: slideInUp 0.6s ease-out 0.4s both;
}

.button {
  animation: scaleIn 0.3s ease-out;
}
```

### 2. 使用工具类

```xml
<!-- 在 .wxml 文件中直接使用类名 -->
<view class="fade-in-up">内容</view>
<view class="slide-in-left">内容</view>
<view class="bounce-in">内容</view>
```

### 3. 列表项动画

```xml
<!-- 为列表项添加动画 -->
<view class="list-item" wx:for="{{items}}" wx:key="id">
  {{item.name}}
</view>
```

### 4. 按钮涟漪效果

```xml
<!-- 按钮添加涟漪效果 -->
<button class="btn btn-primary btn-ripple">点击按钮</button>
```

### 5. 卡片光效

```xml
<!-- 卡片添加光效 -->
<view class="card card-shine">卡片内容</view>
```

## 动画参数说明

### 动画时长
- **快速**: 0.2s - 0.3s (适合微交互)
- **标准**: 0.4s - 0.6s (适合一般动画)
- **缓慢**: 0.8s - 1.2s (适合重要元素)

### 缓动函数
- **ease-out**: 快速开始，缓慢结束 (推荐)
- **ease-in**: 缓慢开始，快速结束
- **ease-in-out**: 缓慢开始和结束
- **cubic-bezier(0.4, 0, 0.2, 1)**: 自定义缓动 (Material Design)

### 延迟时间
- **0.1s - 0.3s**: 轻微延迟
- **0.4s - 0.8s**: 中等延迟
- **1.0s+**: 较长延迟

## 最佳实践

### 1. 页面加载动画
```css
.container {
  animation: pageEnter 0.5s ease-out;
}
```

### 2. 卡片进入动画
```css
.card {
  animation: slideInUp 0.6s ease-out;
  animation-fill-mode: both;
}

.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
```

### 3. 按钮交互动画
```css
.btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:active {
  transform: scale(0.95) translateY(2rpx);
}
```

### 4. 加载状态动画
```xml
<view class="loading-spinner"></view>
<!-- 或者 -->
<view class="loading-dots">
  <view class="loading-dot"></view>
  <view class="loading-dot"></view>
  <view class="loading-dot"></view>
</view>
```

### 5. 骨架屏动画
```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200rpx 100%;
  animation: shimmer 1.5s infinite;
}
```

## 性能优化建议

### 1. 使用 transform 和 opacity
- 优先使用 `transform` 和 `opacity` 进行动画
- 避免使用 `width`、`height`、`margin` 等属性

### 2. 合理使用 will-change
```css
.animated-element {
  will-change: transform, opacity;
}
```

### 3. 避免过度动画
- 不要同时运行太多动画
- 控制动画时长，避免过长

### 4. 使用 animation-fill-mode
```css
.animated-element {
  animation: slideInUp 0.6s ease-out both;
}
```

## 自定义动画

### 1. 创建新的关键帧动画
```css
@keyframes customAnimation {
  0% {
    opacity: 0;
    transform: translateY(20rpx);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 2. 应用自定义动画
```css
.custom-element {
  animation: customAnimation 0.5s ease-out;
}
```

## 常见问题

### 1. 动画不生效
- 检查类名是否正确
- 确认动画关键帧是否定义
- 检查元素是否可见

### 2. 动画卡顿
- 减少同时运行的动画数量
- 使用 `transform` 替代其他属性
- 检查设备性能

### 3. 动画重复播放
- 使用 `animation-fill-mode: both`
- 设置合适的 `animation-iteration-count`

## 示例代码

### 完整的页面动画示例
```css
/* 页面容器 */
.container {
  animation: pageEnter 0.5s ease-out;
}

/* 头部区域 */
.header {
  animation: slideInDown 0.6s ease-out 0.2s both;
}

/* 内容卡片 */
.content-card {
  animation: slideInUp 0.6s ease-out 0.4s both;
}

/* 列表项 */
.list-item {
  animation: slideInUp 0.4s ease-out;
  animation-fill-mode: both;
}

.list-item:nth-child(1) { animation-delay: 0.6s; }
.list-item:nth-child(2) { animation-delay: 0.7s; }
.list-item:nth-child(3) { animation-delay: 0.8s; }

/* 按钮 */
.btn {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn:active {
  transform: scale(0.95) translateY(2rpx);
}
```

通过合理使用这些动画效果，可以让你的微信小程序更加生动有趣，提升用户体验！
