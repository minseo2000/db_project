**# 시스템 아키텍쳐?
- 설계를 하기위해 필요한 개념이다.
- 설계는 어떻게 실현할 것인가에 대하여 기술한 내용이다.

# 설계 작업의 두가지 단계
- 기본 구조 설계 단계
- 상세 설계 단계

    ## 기본구조 설계단계
  - 기본구조 설계단계에서는 아키텍처 설계로 각 모듈의 역할과 인터페이스를 정의하는 단계이다.
  - 그렇다면 아키텍쳐 설계란 무엇인고? 모듈의 역할과 인터페이스를 어떻게 정의하는가?

    ## 상세 설계 단계
  - 상세 설계 단계는 모듈의 내부 알고리즘과 데이터를 명세화하는 단계이다.
  - 모듈의 내부 알고리즘은 알겠고, 명세화하는 것은 문서작업을 이야기 하는거 겠찌?


# 설계 방법 ?
- 전통적인 설계방법
  - 분할 정복, 추상화, 합성 등의 원리를 적용하여 대규모 문제를 다룸.
  - 서브시스템과 모듈이 무엇인가?
  - 설계 작업은 어떻게 하는가?

    ## 컴포넌트란?
    - 컴포넌트 = (서브시스템 or 모듈)
    - 서브시스템 = (클래스의 모임 or 패키지(다른 서브시스템과 상호작용하기 위한 인터페이스를 갖고 있음))
    ## 전통적인 설계 원리
    - 추상화
    - 캡슐화
    - 모듈화
    - 결합 (내용결합, 공통결합, 제어결합, 스탬프결합, 데이터결합)
    - 응집 (우연적, 논리적, 시간적, 절차적, 교환적, 기능적, 정보적)

# 결합을 설명하는 코드 예시

1. 내용 결합에 대해

- 메서드 사이 내용 결합 예시

```java
public class ContentCouplingExample {

    // 예시로 사용할 변수
    private static int sharedVariable = 10;

    public static void main(String[] args) {
        // 함수 B를 호출
        methodB();
    }

    // 함수 A의 정의
    private static void methodA() {
        // 공유 변수의 값을 변경
        sharedVariable = 5;
        System.out.println("함수 A에서 변경된 값: " + sharedVariable);
    }

    // 함수 B의 정의
    private static void methodB() {
        // 함수 A를 호출하여 공유 변수의 값을 변경
        methodA();
        System.out.println("함수 B에서 확인된 값: " + sharedVariable);
    }
}
```
- 메서드 A는 sharedVariable 공유 변수 값을 변경시키는데, 이때 methodB에 의해 methodA가 호출이되고, 변수 값이 변경됩니다.
- 이런식으로 methodA와 methodB는 공유변수에 대해 내용 결합외어 있습니다.
- 이 때 한 함수의 변경이 다른 함수에도 영향을 미칠 수 있습니다.
- 예를 들어 methodA의 내용이 변경된다면, methodB가 원하는 동작과는 다르게 작동을 할 수 있습니다.


- 클래스 사이 내용결합 예시

```java
public class ClassA {
    // ClassA의 내부 상태
    int internalState;

    public ClassA() {
        internalState = 0;
    }

    // 내부 상태를 변경하는 메서드
    public void changeState(int newState) {
        internalState = newState;
    }
}

public class ClassB {
    // ClassB에서 ClassA의 내부 상태를 직접 변경
    public void manipulateClassA(ClassA instance) {
        instance.internalState = 10;  // 내용 결합 발생
    }
}

public class ContentCouplingDemo {
    public static void main(String[] args) {
        ClassA a = new ClassA();
        ClassB b = new ClassB();

        // ClassB를 통해 ClassA의 내부 상태를 변경
        b.manipulateClassA(a);
    }
}
```
- 클래스 B는 클래스 A의 내부 구현에 직접적으로 의존하고 있습니다.
- 이로 인해 클래스 A의 내부 구현이 변경될 경우 클래스 B도 영향을 받을 수 있습니다.

- 패키지 사이 내용결합 예시

```java
// packageA의 ClassA
package packageA;

public class ClassA {
    // ClassA의 내부 상태
    public int internalState;

    public ClassA() {
        internalState = 0;
    }
}

// packageB의 ClassB
package packageB;

import packageA.ClassA;

public class ClassB {
    // ClassB에서 ClassA의 내부 상태를 직접 변경
    public void manipulateClassA(ClassA instance) {
        instance.internalState = 10;  // 내용 결합 발생
    }
}

// 메인 클래스
public class ContentCouplingDemo {
    public static void main(String[] args) {
        ClassA a = new ClassA();
        ClassB b = new ClassB();

        // ClassB를 통해 ClassA의 내부 상태를 변경
        b.manipulateClassA(a);
    }
}
```
- 마찬가지로 패키지 A속 클래스 A를 패키지B에 있는 클래스 B가 직접적으로 그 내부상태를 변경합니다.


2. 공통 결합에 대해
- 여러 모듈이나, 클래스가 같은 전역 데이터에 접근할 때 발생하는 결합 유형이다.

```java
public class GlobalData {
    // 전역 데이터
    public static int sharedData = 0;
}

public class ClassA {
    // 전역 데이터를 사용하여 작업을 수행하는 메소드
    public void manipulateSharedData() {
        GlobalData.sharedData += 10;
        System.out.println("ClassA에서 변경된 sharedData: " + GlobalData.sharedData);
    }
}

public class ClassB {
    // 전역 데이터를 사용하여 작업을 수행하는 메소드
    public void manipulateSharedData() {
        GlobalData.sharedData += 20;
        System.out.println("ClassB에서 변경된 sharedData: " + GlobalData.sharedData);
    }
}

public class CommonCouplingExample {
    public static void main(String[] args) {
        ClassA a = new ClassA();
        ClassB b = new ClassB();

        a.manipulateSharedData();  // ClassA를 통해 sharedData 변경
        b.manipulateSharedData();  // ClassB를 통해 sharedData 변경
    }
}

```
- 전역 변수 데이터 -> sharedData를 두 개의 클래스에서 사용하고 있으므로, 공통 결합에 위배됩니다.
- 따라서 필요한 변수를 매개변수 인자로 받아 사용하는 거이 더 바람직합니다.

3. 제어 결합에 대해.
- 한 모듈이나 클래스가 다른 모듈이나 클래스의 행동을 제어하기 위해 정보를 전달하는 경우 발생합니다.


```java
public class Worker {
    public void doWork(boolean flag) {
        if (flag) {
            System.out.println("작업 방식 A를 수행합니다.");
        } else {
            System.out.println("작업 방식 B를 수행합니다.");
        }
    }
}

public class Controller {
    public void controlOperation() {
        Worker worker = new Worker();
        // 작업 방식을 제어하는 플래그 전달
        worker.doWork(true);  // 작업 방식 A 실행
        worker.doWork(false); // 작업 방식 B 실행
    }
}

public class ControlCouplingExample {
    public static void main(String[] args) {
        Controller controller = new Controller();
        controller.controlOperation();
    }
}
```

- 위 코드에서 컨트롤러 클래스는 워커 클래스의 작동방식을 결정합니다. 이 경우 제어 결합이 되어있다고 합니다.

4. 스탬프 결합
- 복합 데이터 구조의 일부만 사용하는 모듈에 복잡 데이터 구조를 전달할 떄 발생한다.

```java
public class Data {
    public int valueA;
    public String valueB;
}

public class ProcessorA {
    public void process(Data data) {
        System.out.println("ProcessorA에서 처리된 valueA: " + data.valueA);
    }
}

public class ProcessorB {
    public void process(Data data) {
        System.out.println("ProcessorB에서 처리된 valueB: " + data.valueB);
    }
}

public class StampCouplingExample {
    public static void main(String[] args) {
        Data sharedData = new Data();
        sharedData.valueA = 10;
        sharedData.valueB = "테스트";

        ProcessorA processorA = new ProcessorA();
        ProcessorB processorB = new ProcessorB();

        processorA.process(sharedData);  // ProcessorA는 valueA를 사용
        processorB.process(sharedData);  // ProcessorB는 valueB를 사용
    }
}

```
- 데이터 구조를 통해 모듈 간의 상호 작용을 나타낸다고 합니다.
- 이 결합 유형은 데이터 구조가 변경될 경우 여러 모듈에 영향을 미칠 수 있습니다.

5. 데이터 결합
- 모듈이나 클래스가 단순하고 원시적인 데이터를 매개변수로서 전달받아 사용할 때 발생하는 결합유형이다.


```java
public class Calculator {
    // 두 정수를 더하는 메서드
    public int add(int a, int b) {
        return a + b;
    }

    // 두 정수를 곱하는 메서드
    public int multiply(int a, int b) {
        return a * b;
    }
}

public class DataCouplingExample {
    public static void main(String[] args) {
        Calculator calculator = new Calculator();

        int resultAdd = calculator.add(10, 20);  // 덧셈
        int resultMultiply = calculator.multiply(10, 20);  // 곱셈

        System.out.println("덧셈 결과: " + resultAdd);
        System.out.println("곱셈 결과: " + resultMultiply);
    }
}

```
- 가장 바람직한 데이터 결합 유형입니다.

# 응집도?
- 하나의 모듈 안에서 수행되는 작업들이 서로 관련된 정도를 뜻한다.
- 설계 단위들이 특정 작업을 수행하기 위해 함께 잘 모여 있는지를 나타낸다.

1. 우연적 응집도

```java
public class MiscellaneousTasks {
    // 문자열을 출력하는 메서드
    public void printMessage(String message) {
        System.out.println(message);
    }

    // 두 숫자를 곱하는 메서드
    public int multiplyNumbers(int a, int b) {
        return a * b;
    }

    // 현재 시간을 반환하는 메서드
    public long getCurrentTime() {
        return System.currentTimeMillis();
    }
}

public class AccidentalCohesionExample {
    public static void main(String[] args) {
        MiscellaneousTasks tasks = new MiscellaneousTasks();

        tasks.printMessage("안녕하세요!");
        int result = tasks.multiplyNumbers(5, 10);
        long currentTime = tasks.getCurrentTime();

        System.out.println("곱셈 결과: " + result);
        System.out.println("현재 시간: " + currentTime);
    }
}

```
- 위 클래스 속 메서드들은 서로 아무런 관련이 없는 메서드로 이루어져 있으므로 우연적응집에 해당한다.

2. 논리적 응집도

```java
public class TaskProcessor {
    public static final int PRINT = 1;
    public static final int CALCULATE = 2;
    public static final int SAVE = 3;

    // 작업을 처리하는 메소드
    public void processTask(int taskType, Object data) {
        switch (taskType) {
            case PRINT:
                printData(data);
                break;
            case CALCULATE:
                calculateData(data);
                break;
            case SAVE:
                saveData(data);
                break;
            default:
                System.out.println("알 수 없는 작업 유형입니다.");
        }
    }

    private void printData(Object data) {
        System.out.println("Printing: " + data);
    }

    private void calculateData(Object data) {
        // 계산 로직 구현
    }

    private void saveData(Object data) {
        // 데이터 저장 로직 구현
    }
}

public class LogicalCohesionExample {
    public static void main(String[] args) {
        TaskProcessor processor = new TaskProcessor();

        processor.processTask(TaskProcessor.PRINT, "테스트 메시지");
        processor.processTask(TaskProcessor.CALCULATE, 123);
        processor.processTask(TaskProcessor.SAVE, "저장할 데이터");
    }
}

```
-taskType에 따라서 그 기능이 달라지기 떄문에 논리적 응집에 해당합니다.

3. 시간적 응집
- 기능들이 그 실행 지점에 따라 묶여 있음을 의미한다.
- 
```java
public class InitializationTasks {
    // 애플리케이션 시작 시 실행되는 초기화 작업들

    public void loadConfiguration() {
        System.out.println("환경 설정을 로드합니다.");
    }

    public void initializeLogging() {
        System.out.println("로깅 시스템을 초기화합니다.");
    }

    public void establishDatabaseConnection() {
        System.out.println("데이터베이스 연결을 설정합니다.");
    }

    // 이 클래스의 모든 초기화 작업을 실행
    public void executeAllInitializationTasks() {
        loadConfiguration();
        initializeLogging();
        establishDatabaseConnection();
    }
}

public class TemporalCohesionExample {
    public static void main(String[] args) {
        InitializationTasks initTasks = new InitializationTasks();
        initTasks.executeAllInitializationTasks();
    }
}
 
```
- 특정 시간 또는 상황에 의해 실행되는 것에 초점을 맞추며, 떄떄로 초기화나 정리 작업에서 흔히 볼 수 있다.
- 이런 방식은 모듈이나 클래스가 다양한 책임을 지니게 하여 코드의 가독성과 유지보수성을 저해할 수 있다.


4. 절차적 응집
- 클래스나 모듈의 구성 요소들이 특정 순서나 절차에 따라 실행되도록 구성되었을 때 나타나는 응집도 형태

```java
public class DataProcessing {
    // 데이터 처리의 첫 단계
    public String fetchData() {
        System.out.println("데이터를 가져옵니다.");
        return "원본 데이터";
    }

    // 데이터를 변환하는 단계
    public String transformData(String data) {
        System.out.println("데이터를 변환합니다: " + data);
        return "변환된 " + data;
    }

    // 데이터를 저장하는 단계
    public void saveData(String data) {
        System.out.println("데이터를 저장합니다: " + data);
    }

    // 전체 데이터 처리 절차 실행
    public void executeDataProcessing() {
        String data = fetchData();
        String transformedData = transformData(data);
        saveData(transformedData);
    }
}

public class ProceduralCohesionExample {
    public static void main(String[] args) {
        DataProcessing dataProcessing = new DataProcessing();
        dataProcessing.executeDataProcessing();
    }
}

```
- 위 코드에서 executeDataProcessing 메서드의 의해 절차적으로 실행되며, 각 메서드의 출력이 다음 메서드의 입력으로 들어가고 있다.
- 작업이 명확한 순서대로 진행될 때 유용하다.
- 각 단계가 서로 밀접하게 연관되어 있어서, 다른 맥락에서는 재사용하기 어렵다.

5. 교환적 응집
- 클래스나 모듈이 외부의 데이터 소스나 다른 모듈로부터 데이터를 수신하거나 전송할 때 사용되는 설계 패턴입니다.
```java
// 데이터를 전송하는 클래스
public class DataSender {
    public String sendData() {
        String data = "데이터";
        System.out.println("전송 데이터: " + data);
        return data;
    }
}

// 데이터를 수신하는 클래스
public class DataReceiver {
    public void receiveData(DataSender sender) {
        String receivedData = sender.sendData();
        System.out.println("수신된 데이터: " + receivedData);
    }
}

// 메인 클래스
public class ExchangeAdaptationExample {
    public static void main(String[] args) {
        DataSender sender = new DataSender();
        DataReceiver receiver = new DataReceiver();

        receiver.receiveData(sender);
    }
}
```
- 시스템 내부의 다양한 구성요소들이 서로 정보를 교환하며 상호작용하는 상황에서 중요하다.
- 모듈간의 의존성을 적절히 관리해, 시스템의 유연성과 확장성을 유지하는 것이 중요하다.

6. 기능적 응집**
- 클래스나 모듈의 모든 구성요소가 단일하고 명확한 기능을 수행하는 응집도의 형태
```java
 import java.io.*;

public class FileProcessor {
    // 파일 내용을 읽어서 반환하는 메서드
    public String readFile(String fileName) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
            return content.toString();
        }
    }

    // 파일에 내용을 쓰는 메서드
    public void writeFile(String fileName, String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) {
            writer.write(content);
        }
    }
}

public class FunctionalCohesionExample {
    public static void main(String[] args) {
        FileProcessor processor = new FileProcessor();
        String fileName = "example.txt";

        try {
            String fileContent = "Hello, world!";
            processor.writeFile(fileName, fileContent);

            String readContent = processor.readFile(fileName);
            System.out.println("읽은 파일 내용: " + readContent);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
import java.io.*;

public class FileProcessor {
    // 파일 내용을 읽어서 반환하는 메서드
    public String readFile(String fileName) throws IOException {
        try (BufferedReader reader = new BufferedReader(new FileReader(fileName))) {
            StringBuilder content = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                content.append(line).append("\n");
            }
            return content.toString();
        }
    }

    // 파일에 내용을 쓰는 메서드
    public void writeFile(String fileName, String content) throws IOException {
        try (BufferedWriter writer = new BufferedWriter(new FileWriter(fileName))) {
            writer.write(content);
        }
    }
}

public class FunctionalCohesionExample {
    public static void main(String[] args) {
        FileProcessor processor = new FileProcessor();
        String fileName = "example.txt";

        try {
            String fileContent = "Hello, world!";
            processor.writeFile(fileName, fileContent);

            String readContent = processor.readFile(fileName);
            System.out.println("읽은 파일 내용: " + readContent);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

7. 정보적 응집
- 클래스나 모듈이 하나의 데이터 구조를 중심으로 다양한 기능을 제공하는 응집도의 형태이다.

```java
class Employee {
    String name;
    int age;
    String department;

    Employee(String name, int age, String department) {
        this.name = name;
        this.age = age;
        this.department = department;
    }

    // 직원 정보 출력 등 기타 메서드
}

class EmployeeManager {
    private List<Employee> employees = new ArrayList<>();

    public void addEmployee(Employee employee) {
        employees.add(employee);
    }

    public void printAllEmployees() {
        for (Employee emp : employees) {
            System.out.println(emp.name + " - " + emp.age + " - " + emp.department);
        }
    }

    public void printEmployeesByDepartment(String department) {
        for (Employee emp : employees) {
            if (emp.department.equals(department)) {
                System.out.println(emp.name + " - " + emp.age + " - " + emp.department);
            }
        }
    }

    // 직원 관련 기타 메서드
}

public class InformationalCohesionExample {
    public static void main(String[] args) {
        EmployeeManager manager = new EmployeeManager();
        manager.addEmployee(new Employee("김철수", 30, "인사부"));
        manager.addEmployee(new Employee("이영희", 25, "마케팅부"));

        manager.printAllEmployees();
        manager.printEmployeesByDepartment("인사부");
    }
}

```

# 객체지향 설계 원리?

## 인터페이스와 구현의 분리?
- 인터페이스는 공개된 메소드의 프로토타입만을 정의해 놓은 것이다.
- 공개된 메서드를 인터페이스로 따로 정의하고, 이를 구현 상속한 것으로 관계를 맺는 것이 좋다.
- 객체지향의 상속에 의한 다형성이라는 특성을 이용하면 하나의 인터페이스로 상속된 구현을 공유할 수 있다.

- 실제 구현 코드와, 어떤 메서드가 있는지 분리하기 위해 해야한다!
- 실제 구현 코드는 클래스 속에 해놓으면, 해당 코드를 상속하는 코드마다 따로 구현되어 변경이 용이하다.
- 마치 ssd가 구현된 것(소스코드)라고 보면, 인터페이스는 sata선 또는 m.2라고 말할 수 있지.

## 단일 책임의 원리?
- 


## 개방 폐쇄의 원리?
- 소프트웨어의 개체(클래스, 모듈, 기능)이 확장을 위해서는 열려 있어야하는데,
- 수정에 대해서는 닫혀 있어야 한다고 명시한다.

## 의존 관계 역전의 원리
- 높은 수준의 모듈이 영향을 받지 않으려면 높은 수준의 모듈과 낮은 수준의 모듈을 서로 분리하는 추상화를 도입해야한다.



