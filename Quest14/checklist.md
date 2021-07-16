# Quest 14. 정적 분석: 타입스크립트와 린트 시스템

### 코드를 린팅하는 것의 장점은 무엇일까요?

- 코드를 정적으로 분석하여 문제를 빠르게 찾을 수 있다.
- 위에서 찾은 문제를 자동으로 수정해 런타임 버그를 예방할 수 있다. (코드 품질 향상)
- 프로젝트의 컨벤션을 정의하여 코드 형태를 통일하고, 가독성 좋게 코드를 정돈해준다. (포맷팅)

<br>

### 린트 규칙은 어떻게 설정하는 것이 좋을까요? 너무 빡빡한 규칙과 너무 헐거운 규칙 사이에서 어떻게 밸런스를 잡아야 할까요?

- google, airbnb등 대중적인 스타일 가이드에서 필요한 부분을 수정하여 사용한다.
- 위의 내용을 바탕으로 팀원들과 협의하에 밸런스를 맞춘다.

<br>

---

<br>

### 타입스크립트는 어떤 언어인가요?

- 자바스크립트에 정적 타입 시스템을 도입한 슈퍼셋 언어이다.

<br>

### 타입스크립트를 사용했을 때 얻을 수 있는 장점은 무엇인가요?

- IDE의 강력한 지원을 받을 수 있다.
- 컴파일을 통해 런타임에서 발생할 만한 에러를 미리 검출할 수 있다.
- enum class, annotation 등 자바스크립트에서 제공하지 않는 기능을 사용할 수 있다.
- interface와 같은 구현으로 OOP를 지향하며 개발할 수 있다.

<br>

### 타입스크립트를 사용하면서 타입이 없는 라이브러리나 프레임워크를 사용해야 할 경우에는 어떻게 해야 할까요?

- 모듈 구현에 맞는 타입을 선언하기 위해 정의 파일(index.d.ts)을 작성한다. - Ambient Declarations

<br>

### any 타입을 남용하는 것은 왜 좋지 않을까요?

- 정적 분석을 실행할 수 없다.
- `타입 정의를 제공하지 않는 라이브러리`나 급한 상황에서는 유용하겠지만, 타입스크립트의 장점을 잃게된다.

<br>

### 린트와 빌드 등의 과정을 개발 싸이클에서 편하게 수행하려면 어떻게 하는 것이 좋을까요?

- `개인` : eslint, prettier를 IDE와 연동하여 코드를 포맷팅한다.
- `팀` : CI/CD를 도입하여 Test, Lint, 빌드 등의 과정을 자동화한다.

<br><br>

# Advanced

### 자바스크립트 코드에 대한 정적분석은 어떤 과정을 통해 이루어질까요?

컴파일러처럼 코드를 분석하여 프로그램의 추상 구문 트리(AST)와 기호 테이블을 생성한다. 이 추상 구문 트리로부터 중간 표현(IR)이 생성되며, 중간 표현에서 제어 흐름 그래프(CFG)가 구성되고, IR과 CFG를 활용하여 특정 속성이나 의심스러운 코딩 패턴을 탐지한다.

<br>

반면 간단한 분석만 가능한 단순 코드 분석 도구(JSLint, ESLint)는 구문 트리만 구성하고 패턴에 일치하는 구문이나 스타일 문제를 찾는다.
변수의 현재 값이나 조건문에서의 가능 조건과 같은 프로그램의 추상화된 상태를 흐름 그래프를 통해 추적하여 널 포인터 역참조나 모듈 간의 잘못된 함수 호출 같이 더 어렵고 실제적으로 유익한 문제를 찾아낼 수 있다.

<br>

- `Javascript Code` -> Intermediate Representation(`IR`)

  ```
  function foo(x) {
    var type = 'undefined';
    if (typeof x === type) {
      type === 'number;
    }
  }

  ----------------------------

  [1] assert(typeof x<>1 === type<>3)

    typeof x<>1               -> Str
    x<>1                      -> *
    type<>3                   -> "undefined"
    typeof x<>1 === type<>3   -> false

  ```

- 예시

  ```
  var testArray = ['Test'];
  function testFn(testArray) {
    for (var i = 0; i < testArray.length; i++) { // 에러!
      console.log(testArray[i])
    }
  }

  testFunction()

  위의 상황에서는 .length에서 에러

  ----------------------------


  var test = undefined;
  test.value = 0 // 에러!

  위의 상황에서는 널 포인터가 참조되는 에러

  ----------------------------


  function Fn(data) {
    if (!data) {
      console.warn('error');
    }

    ...
    console.log('success result is ', data) // 에러!
  }

  위의 상황에서는 data의 널 체크이후 실행이 멈추지 않기 때문에 에러

  ```

  - 참고: `Rollbar`

<br><br>

### 이러한 정적분석을 수행해 주는 핵심 역할을 하는 npm 패키지는 어떤 것이 있을까요?

- `ESLint`, `Prettier`, JSLint, JSHint, JSCS 등

<br><br>

# TS Compile - type part

> 타입 선언을 참조하여 모듈을 올바르게 사용하는지 검증하는 것

### Implement & Declaration

- Implement: 모듈의 동작부 (모듈 구현)
- Declaration: TS Compiler에서 제공하는 타입 검증을 위해 객체의 타입 서술 (타입 선언)

<br>

### 역할

- `.d.ts` : 타입 선언
- `.js` : 모듈 구현
- `.ts` : 타입 선언과 모듈 구현

<br>

### 참고

- 타입스크립트 컴파일러가 모듈 타입 선언을 참조하는 과정
  - https://medium.com/naver-fe-platform/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%BB%B4%ED%8C%8C%EC%9D%BC%EB%9F%AC%EA%B0%80-%EB%AA%A8%EB%93%88-%ED%83%80%EC%9E%85-%EC%84%A0%EC%96%B8%EC%9D%84-%EC%B0%B8%EC%A1%B0%ED%95%98%EB%8A%94-%EA%B3%BC%EC%A0%95-5bfc55a88bb6
