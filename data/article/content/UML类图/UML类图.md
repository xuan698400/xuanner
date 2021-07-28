# 1. 连线含义及plantuml代码

## 1.1 泛化
泛化是一种一般与特殊、一般与具体之间关系的描述，具体描述建立在一般描述的基础之上，并对其进行了扩展。在java中用来表示继承的关系。
<img src="data/article/content/UML类图/泛化.png" width="100" />

```
@startuml
class Father {

}
class Son{
}
Father <|-- Son
@enduml
```

## 1.2 实现
实现是一种类与接口的关系，表示类是接口所有特征和行为的实现，在程序中一般通过类实现接口来描述
<img src="data/article/content/UML类图/实现.png" width="100" />
```
@startuml
class IDog {

}
class Dog{
}
IDog <|.. Dog
@enduml
```

## 1.3 依赖
是一种使用的关系，即一个类的实现需要另一个类的协助。java中，方法参数需要传入另一个类的对象，就表示依赖这个类。
<img src="data/article/content/UML类图/依赖.png" width="100" />
```
@startuml
class A {
    + method(B b)
}
class B{
}
A <.. B
@enduml
```

## 1.4 关联
表示类与类之间的联接,它使一个类知道另一个类的属性和方法，这种关系比依赖更强、不存在依赖关系的偶然性、关系也不是临时性的，一般是长期性的。java中一个类的全局变量引用了另一个类，就表示关联了这个类。
<img src="data/article/content/UML类图/关联.png" width="100" />
```
@startuml
class Teacher {
    + Course
}
class Course{
}
Teacher <-- Course
@enduml
```

## 1.5 聚合
聚合关联关系的一种特例，是强的关联关系。聚合是整体和个体之间的关系，即has-a的关系，整体与个体可以具有各自的生命周期，部分可以属于多个整体对象，也可以为多个整体对象共享。程序中聚合和关联关系是一致的，只能从语义级别来区分。
<img src="data/article/content/UML类图/聚合.png" width="100" />
```
@startuml
class Teacher {
    + Course
    + Students

}
class Student{
}
Teacher o-- Student
@enduml
```

## 1.6 组合
组合也是关联关系的一种特例。组合是一种整体与部分的关系，即contains-a的关系，比聚合更强。部分与整体的生命周期一致，整体的生命周期结束也就意味着部分的生命周期结束，组合关系不能共享。程序中组合和关联关系是一致的，只能从语义级别来区分。
<img src="data/article/content/UML类图/组合.png" width="100" />
```
@startuml
class Human {
}
class Leg{
}
class Head{
}
Human *-- Leg
Human *-- Head
@enduml
```