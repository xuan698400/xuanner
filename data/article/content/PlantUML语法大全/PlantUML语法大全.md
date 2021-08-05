# 1. 流程图
流程图（Flowchart）：使用图形表示算法的思路是一种极好的方法，因为千言万语不如一张图。流程图在汇编语言和早期的BASIC语言环境中得到应用。相关的还有一种PAD图，对PASCAL或C语言都极适用。
## 1.1 普通流程图
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
## 1.2 泳道图

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

# 2. 时序图
时序图（Sequence Diagram），又名序列图、循序图，是一种UML交互图。它通过描述对象之间发送消息的时间顺序显示多个对象之间的动态协作。它可以表示用例的行为顺序，当执行一个用例行为时，其中的每条消息对应一个类操作或状态机中引起转换的触发事件。
参考：https://plantuml.com/zh/sequence-diagram
## 2.1 基本例子
序列-> 用于绘制两个参与者之间的信息。 参与者不必明确声明。要有一个点状的箭头，就用-->
。也可以用<- 和<-- 。 这不会改变绘图，但可能提高可读性。 注意，这只适用于序列图，其他图的规则不同。

PS：可以使用`skinparam responseMessageBelowArrow true`让响应文案在下方

图示：
<img src="data/article/content/PlantUML语法大全/时序图_基本例子.png" width="300" />
脚本：
```
@startuml
skinparam responseMessageBelowArrow true
header 页头提示
footer 页尾提示
老王 -> 老张: 请求借点钱
activate 老张
老张 -> 银行 : 从银行取钱
return 好的借给你
== 分隔符 ==
老王 -> 老王: 花钱
||30||
note left: 这个老王乱花钱
group 我的标签[我的标签2]
老王 -> 老张: 再请求借点钱
老张 --> 老王: 上次还没有还不借了
end
@enduml
```

## 2.2 申明参与者
参与者可以有不同的类型。可以申明参与者可以使你对参与者做更多的控制。有如下参与者可以申明：
* actor（角色）
* boundary（边界）
* control（控制）
* entity（实体）
* database（数据库）
* collections（集合）
* queue（队列）

PS：使用as取别名，后面可以加颜色，可以用order来排列顺序

图示：
<img src="data/article/content/PlantUML语法大全/时序图_申明参与者.png" width="400" />

脚本：
```
@startuml
participant participant as Foo
actor       actor       as Foo1
boundary    boundary    as Foo2
control     control     as Foo3
entity      entity      as Foo4
database    database    as Foo5
collections collections as Foo6
queue       queue       as Foo7
Foo -> Foo1 : To actor
Foo -> Foo2 : To boundary
Foo -> Foo3 : To control
Foo -> Foo4 : To entity
Foo -> Foo5 : To database
Foo -> Foo6 : To collections
Foo -> Foo7 : To queue
@enduml
```

## 2.3 修改箭头样式
图示：
<img src="data/article/content/PlantUML语法大全/时序图_修改箭头样式.png" width="100" />

脚本：
```
@startuml
Bob -[%230000FF]>x Alice
Bob -> Alice
Bob ->> Alice
Bob -\ Alice
Bob \\- Alice
Bob //-- Alice

Bob ->o Alice
Bob o\\-- Alice

Bob <-> Alice
Bob <->o Alice
@enduml
```

# 3. 类图
参考：https://plantuml.com/zh/class-diagram
## 3.1 元素申明
图示：
<img src="data/article/content/PlantUML语法大全/类图_元素申明.png" width="300" />

脚本：
```
@startuml
Bob -[%230000FF]>x Alice
Bob -> Alice
Bob ->> Alice
Bob -\ Alice
Bob \\- Alice
Bob //-- Alice
Bob ->o Alice
Bob o\\-- Alice
Bob <-> Alice
Bob <->o Alice
@enduml
```
