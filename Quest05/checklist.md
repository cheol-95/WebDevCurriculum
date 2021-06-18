# Quest 05. OOP 특훈

## 관심사의 분리 원칙이란 무엇인가요? 웹에서는 원칙이 어떻게 적용되나요?

- 프로그램의 복잡성을 극복하기 위한 원칙으로, 프로그램은 별개의 섹션을 가져야 하며 각 센셕이 자체 관심사를 담당한다는 원칙이다.
- HTML 태그에 직접 CSS를 선언하지 않고, HTML, CSS, JS파일을 나눠서 관리한다.

<br><br>

## 객체지향의 SOLID 원칙이란 무엇인가요? 이 원칙을 구체적인 예를 들어 설명할 수 있나요?

1. SRP (Single Responsibility Principle) - 단일 책임 원칙

- 한 클래스는 한개의 책임만 갖는다는 원칙으로, 역할에 따라 클래스를 분리하여 리스크를 최소화하고 문제 발생 시 원인을 빠르게 찾을 수 있다.
- 어떤 이슈에 대한 책임을 나누기 모호할 때, 그 이슈로 인해 프로퍼티 값이 변경된 클래스가 책임자일 확률이 높다.
  ```
  음식점을 예로 들면, 캐셔, 요리사, 서버, 청소부, 안내원 등 각자의 역할에 맞춰 클래스를 생성함으로써 역할과 책임을 나눈다.
  ```

<br>

2. OCP (Open Close Principle) - 개방 폐쇄 원칙

- 확장에는 개방적이고 수정에 폐쇄적인 원칙으로, 요구사항이 변화(확장)될 때 기존 코드의 수정없이(폐쇄) 요구사항을 반영하기 용이하게 하는 원칙이다.
- 아웃소싱과 같은 개념으로, 어떠한 역할을 요청했을 때 그에 맞는 동작을 하도록 분리해서 설계한다.

  ```
  에어비앤비의 경우, 호스트와 고객을 매칭시켜주는 서비스를 제공한다.

  호스트가 제공하는 방의 어떠한 변화가 생기거나 가격 정책등이 달라져도(개방) 에어비앤비는 호스트에게 "고객에게 숙박서비스를 제공하세요" 라는 명령을 할 뿐 에어비앤비 자체적인 기능은 변경되지 않는다.(폐쇄)
  ```

<br>

3. LSP (Liskov Substitution Principle) - 리스코프 치환 법칙

- 부모 자료형의 객체를 자식 자료형의 객체로 교환할 수 있어야 한다는 원칙이다.
- 상속받은 클래스에서 오버라이딩을 사용해 물려받은 일반적인 특징은 살리고 자신만의 특수성을 부각시키는 것이다.

  ```
  사각형이라는 부모 클래스에게 상속받아 직사각형, 정사각형을 구현할 때, 넓이를 구하는 함수를 오버라이딩해서 각각에 맞게 구현한다.
  ```

<br>

4. ISP (Interface Segregation Principle) - 인터페이스 분리 원칙

- 클라이언트가 자신이 이용하지 않는 메서드에 의존하지 않아야 한다는 원칙으로, 큰 덩어리의 인터페이스들을 구체적이고 작은 단위들로 분리시켜 꼭 필요한 메서드들만 이용할 수 있게 하는 원칙이다.
- 언터페이스는 서로 간섭을 일으키지 않아야 하고, 내부의 동작과 직접적으로 연결되어서도 안된다.

  ```
  복합기 클래스를 만들 때, [프린트, 팩스, 스캔, 복사] 등의 모든 기능을 가지고 있는 클래스를 만들지않고, 각 기능을 보유하고 있는 클래스를 만든뒤 요구사항에 맞춰 조합해서 사용한다.

  기능별로 클래스를 나누었기 때문에 각 기능에 대한 내부 동작이 서로 충돌하지 않는다.
  요구사항에 맞는 클래스들을 합성해 적재적소에 사용할 수 있다.
  ```

<br>

5. DIP (Dependency Inversion Principle) - 의존성 역전 원칙

- 의존관계를 갖는 모듈 인스턴스의 구성이 추상화에 의존하는 것을 뜻한다.
- 구체적인 의존 관계가 추상화에 의해 런타임에 결정되기 때문에 다형성을 적극적으로 활용할 수 있으며 모듈의 재사용성이 높아진다.
- 각 모듈을 테스트하기 좋아진다.

<br>
<img src='https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FsvTMl%2FbtqE2lFmDkt%2FRc7H51OI86TgyiD4o51iH0%2Fimg.png' width=400 height=150>

- AlarmService: 알림 전송을 사용하는 클래스
- Alarm: 알림을 전송하는 기능을 명시한 인터페이스
- A: Alarm을 상속하여 오버라이딩 한 A사의 알림 클래스
- B: Alarm을 상속하여 오버라이딩 한 B사의 알림 클래스

```
- DIP 미 적용: AlarmService가 A, B를 직접 사용하면 A, B에 의존하게 된다

- DPI 적용: A, B가 Alarm에 의존하게 된다.
```

<br><br>

## 로컬 스토리지란 무엇인가요? 로컬 스토리지의 내용을 개발자 도구를 이용해 확인하려면 어떻게 해야 할까요?

- Document 출처의 Storage로, 저장된 데이터는 브라우저 세션 간에 공유된다.
- sessionStorage와 비슷하지만 localStorage는 데이터가 만료되지 않는다.
- 페이지 프로토콜별로 구분된다. http://~~ 와 https://~~는 다른 localStorage에 저장된다.
  - 오리진(domain/port/protocol)만 같다면 url 경로는 달라도 동일한 결과를 볼 수 있다.
- Key, Value는 각 문자에 2바이트를 할당하는 UTF-16 DOMString의 형태로 저장한다.
- 정수 키는 자동으로 문자열로 변환된다.
- 개발자 도구 - Application - Storage 로 확인하거나 콘솔로 확인할 수 있다.

```
myLocalStorage = window.localStorage; // 접근 및 할당

myLocalStorage.setItem(key, value);

myLocalStorage.getItem(key);

myLocalStorage.removeItem(key);

myLocalStorage.clear(); // 전체 삭제
```

<br><br><br>

# Note

## Template

- 사용될 때마다 매번 재생성하지 않아도 된다.
- 페이지 로딩 시에는 사용되지 않도록 하지만 런타임에는 인스턴스화가 가능하다.
- 실제로 적용되기 전의 템플릿은 "외부 문서"로 간주되어 스타일이나 스크립트가 실행되지 않는다.

  ```
  [html]
  <template id="mytemplate">
    <img src="" alt="great image">
    <div class="comment"></div>
  </template>


  [js]
  const template = document.querySelector('#mytemplate')
  template.content.querySelector('img').src = 'logo.png';

  const clone = document.importNode(template.content, true);
  document.body.appendChild(clone);
  ```

- Function
  - Node.cloneNode(state): 노드 복사 (자식 노드 복사유무)
  - Node.importNode(state): 외부 문서의 노드를 복사, 기능은 cloneNode와 동일

## customEvent
