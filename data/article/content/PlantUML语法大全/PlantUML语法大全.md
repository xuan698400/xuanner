# 1、流程图
## 普通流程图
图示：
<img src="data/article/content/PlantUML语法大全/流程图_常规.png" width="600" />
脚本：
```
@startuml
start
:普通节点带简单注释;
floating note left: 我是注释哈
if(判断) then(条件1)
:Yes处理\n换行;
:带复杂注释;
note left
  简单文本
  //斜体//
  <b>HTML加粗</b>
  ====
  * 类似markdown的序列1
  * 类似markdown的序列2
end note
else if (条件2)
:No处理
__下滑线__;
%23FF7F50:改变颜色;
while (循环条件) is (true)
  :循环执行逻辑节点;
endwhile (false)

else (其他条件)
fork
  :并行节点1;
fork again
  :并行节点2;
end fork
-[%23green,dashed]-> 箭头上可以加注释和修改样式;
:箭头样式;
partition 包含起来一部分 {
    :子节点1;
    :子节点2;
}
endif
stop
@enduml
```
## 泳道图

图示：
<img src="data/article/content/PlantUML语法大全/流程图_泳道图.png" width="200" />

脚本：
```
@startuml
|系统A|
start
:系统A流程1;
:系统A流程2;
|%23AntiqueWhite|系统B|
:系统B流程1;
:系统B流程2;
|%23D2D2D2|系统C|
:系统C流程1;
:系统C流程2;
|系统A|
:收尾;
stop
@enduml
```