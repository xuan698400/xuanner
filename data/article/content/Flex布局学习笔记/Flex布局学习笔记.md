# 零、简介
2009年，W3C提出了一种新的方案—-Flex布局，可以简便、完整、响应式地实现各种页面布局。目前，它已经得到了所有浏览器的支持，这意味着，现在就能很安全地使用这项功能。

<img src="data/article/content/Flex布局学习笔记/images/browser_support.jpeg" width="300" />

# 一、Flex布局是什么？
Flex是Flexible Box的缩写，意为”弹性布局”，用来为盒状模型提供最大的灵活性。任何一个容器都可以指定为Flex布局。
块元素：
```
.box{
  display: flex;
}
```
行内元素：
```
.box{
  display: inline-flex;
}
```
Webkit内核的浏览器，必须加上-webkit前缀：
```
.box{
  display: -webkit-flex; /* Safari */
  display: flex;
}
```
注意，设为Flex布局以后，子元素的float、clear和vertical-align属性将失效。

# 二、基本概念
采用Flex布局的元素，称为Flex容器（flex container），简称”容器”。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称”项目”。
<img src="data/article/content/Flex布局学习笔记/images/base_info.png" width="400" />
容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）。主轴的开始位置（与边框的交叉点）叫做main start，结束位置叫做main end；交叉轴的开始位置叫做cross start，结束位置叫做cross end。
项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴空间叫做cross size。

# 三、容器属性
flex-direction、flex-wrap、flex-flow、justify-content、align-items、align-content

## flex-direction
决定容器中子项的排列方向。
* row（默认）：子项从左到右排列。<br/>
<img src="data/article/content/Flex布局学习笔记/images/direction_row.png" width="200" />

* row-reverse：子项从右到左排列。<br/>
<img src="data/article/content/Flex布局学习笔记/images/direction_row_reverse.png" width="200" />

* column：子项从上到下排列。<br/>
<img src="data/article/content/Flex布局学习笔记/images/direction_column.png" width="70" />

* column：子项从下到上排列。<br/>
<img src="data/article/content/Flex布局学习笔记/images/direction_column_reverse.png" width="70" />

## flex-wrap
当子项一行排不下时，设置处理方式。

* nowrap（默认）：不换行。
<img src="data/article/content/Flex布局学习笔记/images/wrap_nowrap.png" width="300" />

* wrap：换行，多的往下放。
<img src="data/article/content/Flex布局学习笔记/images/wrap_wrap.jpeg" width="300" />

* wrap-reverse：换行，多的往上放。
<img src="data/article/content/Flex布局学习笔记/images/wrap_wrap_reverse.jpeg" width="300" />

## flex-flow
flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。
```
.box {
  flex-flow: <flex-direction> <flex-wrap>;
}
```

## justify-content
定义了项目在主轴上的对齐方式。下面假设主轴为从左到右。

* flex-start（默认值）：左对齐。<br/>
<img src="data/article/content/Flex布局学习笔记/images/justify_start.png" width="300" />

* flex-end：右对齐。<br/>
<img src="data/article/content/Flex布局学习笔记/images/justify_end.png" width="300" />

* center： 居中。<br/>
<img src="data/article/content/Flex布局学习笔记/images/justify_center.png" width="300" />

* space-between：两端对齐，项目之间的间隔都相等。<br/>
<img src="data/article/content/Flex布局学习笔记/images/justify_between.png" width="300" />

* space-around：每个项目两侧的间隔相等。所以，项目之间的间隔比项目与边框的间隔大一倍。<br/>
<img src="data/article/content/Flex布局学习笔记/images/justify_around.png" width="300" />


## align-items
定义项目在交叉轴上如何对齐。

* stretch（默认值）：如果项目未设置高度或设为auto，将占满整个容器的高度。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_stretch.png" width="150" />

* flex-start：交叉轴的起点对齐。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_start.png" width="150" />

* flex-end：交叉轴的终点对齐。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_end.png" width="150" />

* center：交叉轴的中点对齐。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_center.png" width="150" />

* baseline: 项目的第一行文字的基线对齐。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_baseline.png" width="300" />

## align-content
定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。

* stretch（默认值）：轴线占满整个交叉轴。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_content_stretch.png" width="150" />

* flex-start：与交叉轴的起点对齐。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_content_start.png" width="150" />

* flex-end：与交叉轴的终点对齐。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_content_end.png" width="150" />

* center：与交叉轴的中点对齐。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_content_center.png" width="150" />

* space-between：与交叉轴两端对齐，轴线之间的间隔平均分布。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_content_between.png" width="150" />

* space-around：每根轴线两侧的间隔都相等。所以，轴线之间的间隔比轴线与边框的间隔大一倍。<br/>
<img src="data/article/content/Flex布局学习笔记/images/align_content_around.png" width="150" />

# 四、项目属性
项目上有6个属性：order、flex-grow、flex-shrink、flex-basis、flex、align-self

## order
定义项目的排列顺序。数值越小，排列越靠前，默认为0。
```
.item {
  order: <integer>;
}
```
<img src="data/article/content/Flex布局学习笔记/images/order.png" width="300" />

## flex-grow
定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。
```
.item {
  flex-grow: <number>; /* default 0 */
}
```
<img src="data/article/content/Flex布局学习笔记/images/grow.png" width="400" />

如果所有项目的flex-grow属性都为1，则它们将等分剩余空间（如果有的话）。如果一个项目的flex-grow属性为2，其他项目都为1，则前者占据的剩余空间将比其他项多一倍。

## flex-shrink
定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。
```
.item {
  flex-shrink: <number>; /* default 1 */
}
```
<img src="data/article/content/Flex布局学习笔记/images/shrink.jpeg" width="400" />

如果所有项目的flex-shrink属性都为1，当空间不足时，都将等比例缩小。如果一个项目的flex-shrink属性为0，其他项目都为1，则空间不足时，前者不缩小。负值对该属性无效。

## flex-basis
定义了在分配多余空间之前，项目占据的主轴空间（main size）。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。
```
.item {
  flex-basis: <length> | auto; /* default auto */
}
```
它可以设为跟width或height属性一样的值（比如350px），则项目将占据固定空间。

## flex
是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
```
.item {
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
}
```
该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。
建议优先使用这个属性，而不是单独写三个分离的属性，因为浏览器会推算相关值。

## align-self
允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。
```
.item {
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
}
```
该属性可能取6个值，除了auto，其他都与align-items属性完全一致。
<img src="data/article/content/Flex布局学习笔记/images/align_self.png" width="300" />

# 参考资料
> https://www.runoob.com/w3cnote/flex-grammar.html