# 介绍

图片瀑布流
# 使用
    imageFlow.init({cols:4})
# 参数 options
## cols
+ Type: Number
+ Default: 1

显示列數

## rootElement
+ Type: String
+ Default:#flow

图片列表父元素

## zoom
+ Type: Number
+ Default: 1

图片缩放比例

## gap
+ Type: Number
+ Default: 2

图片间距

## scrollBottom(images)
+ images
    + Type: Array
    + 图片数组

滑动到底部触发

# 方法
## init(options)

初始化

## update(data)
+ data
    + Type: Array
    + 向瀑布流插入新的图片
    + Example : [{url:x.jpg}]
