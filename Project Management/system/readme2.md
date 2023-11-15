# 객체지향 설계 원리

| 설계 원칙 (SOLID)                                    |
|--------------------------------------------------|
| 단일 책임의 원리 ( Single Responsibility Principle      |
| 개방 폐쇄의 원리 ( Open Close Principle )               |
| 리스코프 교체의 원리 ( Liskov Substitution Principle )    |
| 인터페이스 분리의 원리 ( Interface Segregation Principle ) |
| 의존관계 역전의 원리 ( Dependency Inversion Principle )   |

## 단일 책임의 원칙 ( Single Responsibility Principle ), 응집성!
- 클래스나 모듈을 변경할 이유가 하나, 단 하나뿐이여야 한다는 원칙이다.
- 아래는 단일 책임의 원칙을 지키는 클래스들이다.
- 큰 클래스 몇 개가 아니라, 작은 클래스 여럿으로 이뤄진 시스템이 더 바람직하다.
- 다른 작은 클래스와 협력해 시스템에 필요한 동작을 수행한다.
- 하나의 모듈은 하나의, 오직 하나의 액터에 대해서만 책임져야 한다! 
  - 모듈은 단순히 말해 소스코드이다!
  - 요구사항에서 도출된 액터가 해당 클래스를 공유하는지 확인해보자!
```java
public class Version{
    public int getMajorVersionNumber()
    public int getMinorVersionNumber()
    public int getBuildNumber()
}

public class Book{
    private String name;
    private String author;
    private Author text;
    public String replaceWordInText(String word);
    public String isWordInText(String word); 
}
```
- 만약 한 클래스에 여러 액터가 사용하는 메서드가 각각 들어있다고 생각해보자.
- 다음은 가정한 상황에 대한 코드이다.

```java

public class Employee{
    public int calculatePay();
    public int reportHours();
    public int save();
}
```
- calculatePay() 메서드는 회계팀에서 기능을 정의하며, CFO 보고를 위해 사용한다.
- reportBHours() 메서드는 인사팀에서 기능을 정의하며, COO 보고를 위해 사용한다.
- save() 메서드는 데이터베이스 관리자가 기능을 정의하고, CTO 보고를 위해 사용한다.
> 그렇다면 왜 이런 상황을 피해야 하는 것인가?
- 만약 CFO 팀에서 초과 근무를 제외한 업무 시간을 계산하는 방식을 약간 수정하기로 결정했다고 하자. 반면 인사를 담당하는 COO 팀에서는 초과 근무를 제외한 업무 시간을 CFO 팀과는 다른 목적으로 사용하기 때문에 이 같은 변경을 원하지 않는다고 해보자.
- 이 변경을 적용하는 업무를 할당받은 개발자는 calculatePay() 메서드가 편의 메서드는 regularHours()를 호출한다는 사실을 발견한다.
- 하지만 안타깝게도 이 함수가 reportHours() 메서드에서도 호출된다는 사실은 눈치채지 못한다.
- 이 상황에서 CFO 팀이 코드를 수정해버려 배포하게 된다면 COO팀은 해당 사실을 모르고 손해를 보게 된다.
- 이러한 문제는 서로 다른 액터가 의존하는 코드를 너무 가까이 배치했기 떄문에 발생한다!
<hr>
- 다음은 병합에 관한 문제점에 대한 내용이다.
- 소스 파일에 다양하고 많은 메서드를 포함하면 병합이 자주 발생하리라고 짐작하기는 어려운 일이 아니다.
- CTO팀과 COO팀이 동시에 같은 클래스를 수정하게 된다면 -> 병합 발생 가능성이 아주 높다!

<hr>
### 그렇다면 해결책은 무엇인가? --> 퍼사드 패턴을 사용해보자!
- 퍼사드 패턴이란? 
- 서비시스템의 복잡성을 숨기고, 클라이언트에게는 사용하기 쉬운 인터페이스를 제공하는 것이 목적이다!
- 인터페이스로 묶어버려 사용하는 것

```python
class CPU:
    def start(self):
        print("CPU 가동")

    def execute(self):
        print("명령어 실행")

class Memory:
    def load(self, position, data):
        print(f"{position}에 {data} 로딩")

class HardDrive:
    def read(self, lba, size):
        return f"{lba}에서 {size}만큼 데이터 읽기"

# 파사드 클래스
class ComputerFacade:
    def __init__(self):
        self.cpu = CPU()
        self.memory = Memory()
        self.hard_drive = HardDrive()

    def startComputer(self):
        self.cpu.start()
        self.memory.load("부트 섹터", "시스템 초기화 정보")
        data = self.hard_drive.read("부트 섹터", "256")
        self.cpu.execute()

# 클라이언트 코드
computer = ComputerFacade()
computer.startComputer()
```

## 개방 폐쇄의 원리 ( Open Close Principle )
- 소프트웨어 개체(클래스, 모듈, 기능 등)가 확장을 위해서는 열려있어야 하지만, 수정을 위해서는 닫혀 있어야 한다고 명시한다.
- 다형성에 대한 이해가 먼저 있어야 한다.
- 상속을 이용하여 클래스가 정의되어 있을 때 다형성이 적용되어 서로 대체할 수 있는 인터페이스를 구현할 수 있다.
- 또한 클래스 자체를 수정하지 않고, 클래스를 쉽게 확장할 수 있다. 
- 만약 요구사항을 살짝 확장하는 데 소프트웨어를 엄청나게 수정해야 한다면, 그 소프트웨어 시스템을 설계한 아키텍트는 엄청난 실패에 맞닥뜨린 것이다.
<hr>
예제
- 재무제표를 웹 페이지로 보여주는 시스템이 있다고 하자
- 이해 관계자가 동일한 정보를 보고서 형태로 변환해서 흑백 프린터로 출력해 달라고 요청.

- 단일 책임 원칙(SRP)을 적용하면 데이터 흐름은 다음과 같다.
1. 재무 데이터
2. 재무 분석기
3. 보고서용 재무 데이터
4. 보고서를 웹에 표시 하거나 보고서를 프린터로 출력한다.

-> 책임성을 분리했다면, 두 책임 중 하나에서 변경이 발생하더라도 다른 하나는 변경되지 않도록 소스코드 의존성도 확실히 조직화해야 한다.<br>
또한 새로 조직화한 구조에서는 행위가 확장될 때 변경이 발생하지 않음을 보장해야 한다.
- 목적을 달성하기 위해서?
1. 처리 과정을 클래스 단위로 분할하고,
2. 이들 클래스를 컴포넌트 단위로 구분해야 한다.
3. A컴포넌트에서 발생한 변경으로부터 B컴포넌트를 보호하려면 A컴포넌트가 B컴포넌트에 의존해야하고, 화설표로 A -> B 로 나타낸다.

### 상속 표시는 -> 확장 한 것 , 즉 확장에 열려있다. (새로운 기능이 추가됬다고 볼 수 있음)
### 의존 표시는 -> 해당 기능을 사용하는 것, 즉 수정에 닫혀있다. (새로운 기능이 추가되었다고 해서, 해당 알고리즘을 수정할 필요가 없다.)

- 코드로 확인해보자
```java
class Client {
    SortAlgorithm sortAlgorithm = new BubbleSort();
}

class SortAlgorithm {


}

class BubbleSort extends SortAlgorithm {

}

class HeapSort extends SortAlgorithm {

}

class ShellSort extends SortAlgorithm {

}
```
- 위와 같은 소스 코드가 있다고 가정하자. 
- 이 때 정렬 알고리즘 클래스에 새로운 기능을 추가할 수 있다 (확장에 열림)
- 이 때 기능을 추가한다고 해서 클라이언트가 사용하는 메서드를 수정해야 할 필요가 있는가? -> 없다 ( 수정에 닫혀 있다. )

<hr>

## 리스코프 교체의 원리
- 클래스 B가 클래스 A에서 상속받은 하위 유형이라면 프로그램의 동작을 방해하지 않고, A를 B로 대체할 수 있어야 한다.
- 하위 클래스 즉 파생 클래스가 기본, 부모 클래스로 대체 가능해야 함을 의미한다.
- 상속에 대해서 자세히 이해할 필요가 있다. 코드로 알아보자

```java
class Billing{

}

class License{
    public int calcFee();
}

class PersonalLicense extends License{

}

class BusinessLicense extends License{
    private String users;
}
```
- 위와 같은 코드가 있을 때 다음과 같이 License에 매개변수에 대해 어떠한 하위 객체를 사용하더라도 알고리즘 계산이 동일하게 가능해야한다.

```java
License l1 = new PersonalLicense();
License l2 = new BusinessLicense();

l1.calcFee();
l2.calcFee();
```

## 인터페이스 분리 원칙 ( Interface Segregation Principle )
- 하위 모듈을 추상화한 인터페이스를 설계할 때 주의해야한다. 하위 클래스에 구현된 인터페이스를 추상화 할 때 일부 메서드만을 사용하는 다른 모듈이 있어 이를 추가 확장하려한다. 이 때 전체 인터페이스에 의존하게 하되 사용하지 않는 일부 메서드에 대해 더미 메서드를 구현하게 된다. 이러한 인터페이스를 비만 인터페이스라고 한다.
- 코드로 보자

```java
class OPS implements I1Ops, I2Ops, I3Ops{
    public op1;
    public op2;
    public op3;
}

interface I1Ops{
    public int op1;
}
interface I2Ops{
    public int op2;
}
interface I3Ops{
    public int op3;
}

class User1 implements I1Ops{

}
class User2 implements I1Op2{

}
class User3 implements I1Op3{

}
```
- 이런식으로 인터페이스를 분리시켜 관리해라!

## 의존 관계 역전의 원리
- 유연성이 극대화된 시스템 -> 추상에 의존하지만 구체에는 의존하지 않는 시스템을 말한다.

- 자바와 같은(정적 언어 타입)언어에서 이 말은 use, import, include 구문은 오직 인터페이스나 추상 클래스 같은 추상적인 선언만을 참조해야 한다는 뜻이다. 구체적인 대상에는 절대로 의존해서는 안된다.
- 루비나 파이썬(동적 타입 언어)같은 언어에서도 동일한 규칙이 적용된다. 

- 추상 인터페이스에 변경이 생기면, 이를 구체화한 구현체들도 따라서 수정해야 한다.
- 반대로 구체적인 구현체에 변경이 생기더라도, 그 구현체가 구현하는 인터페이스는 항상, 변경될 필요가 없다.
- 따라서 인터페이스는 변동성이 적다.

- 변동성이 적은 인터페이스를 선호하라!
<hr>
코딩 실천법
- 변동성이 큰 구체 클래스를 참조하지 마라. -> 대신 추상 인터페이스를 참조하라. -> 일반적으로 팩토리를 사용하도록 강제한다.
- 변동성이 큰 구체 클래스로부터 파생하지마라. -> 상속은 아주 신중하게 사용해야 한다. -> 의존성 문제와 직결되기 때문이다.
- 구체 함수를 오버라이드 하지 마라. -> 구체 함수는 소스 코드 의존성을 필요로 한다. , 차라리 추상 함수로 선언하고, 구현체들에서 각자의 용도에 맞게 구현해야 한다.
- 구체적이며 변동성이 크다면, 절대로 그 이름을 언급하지 마라!

### 팩토리란?
- 변동성이 큰 구체적인 객체는 특별히 주의해서 생성해야 한다.
- 바람직한 의존성을 처리할 때 추상 팩토리를 사용하곤 한다.

- 코드로 보자!
```java
class Application {

}


```
