# Quest 09. 서버와 클라이언트의 대화

## 비동기 프로그래밍이란 무엇인가요?

- 비동기 프로그래밍이란, 어떠한 프로그램의 동작 순서에서 이전에 실행된 메소드의 반환 값을 기다리지 않고 `바로 다음 코드를 실행`하는 것을 말한다.
- 동기의 경우, 함수가 실행되었을 때 값이 반환되기 전까지는 `blocking`이 되어 있다는 것을 의미한다.
- 비동기의 경우, blocking이 되지 않고 `이벤트 큐`에 넣거나 백 그라운드 쓰레드에게 task를 위임하고 바로 다음 코드를 실행하기 때문에 `blocking`이 되지 않는다.
- 위임했던 task가 완료되면 콜백 또는 이벤트를 통해 어플리케이션에게 알려주고 이를 처리한다.

<br><br>

### 콜백을 통해 비동기적 작업을 할 때의 불편한 점은 무엇인가요?

- 가독성이 떨어진다.
- 동기로 동작하는 코드에 비해 직관성이 떨어진다. -> 복잡성 증가

<br><br>

### 콜백 지옥이란 무엇인가요?

- 콜백 지옥이란, 함수의 매개 변수로 넘겨지는 콜백 함수가 반복되어 코드의 들여쓰기 수준이 감당하기 힘들 정도로 깊어지는 현상을 말한다.

<br><br>

### 자바스크립트의 Promise는 어떤 객체이고 어떤 일을 하나요?

- Promise객체는 비동기 작업이 맞이할 미래의 완료 또는 실패와 그 결과 값을 나타낸다.
- 비동기 연산이 종료된 이후의 결과값이나 실패 이유를 처리하기 위한 처리기를 연결할 수 있도록 한다.
- 프로미스가 이행이나 거부될 때, 프로미스에 연결한 처리기는 그 프로미스의 then 메서드에 의해 대기열에 오른다.
- 다음 중 하나의 상태를 가진다.
  - `pending - 대기`: 이행하거나 거부되지 않은 초기 상태
  - `fulfilled - 이행`: 연산이 성공적으로 완료됨
  - `rejected - 거부`: 연산이 실패함

<br>

![Promise](https://mdn.mozillademos.org/files/8633/promises.png)

<br><br>

### 자바스크립트의 async와 await키워드는 어떤 역할을 하며 그 정체는 무엇일까요?

- `async`
  - AsyncFunction 객체를 반환하는 하나의 비동기 함수를 정의힌다.
  - 비동기 함수는 이벤트 루트를 통해 비동기적으로 작동하는 함수로, 암시적으로 Promise를 사용하여 결과를 반환한다.
  - 비동기 함수를 사용하는 코드의 구문과 구조는, 표준 동기 함수를 사용하는것과 많이 비슷하다.

<br>

- `await`
  - async function 내부에서 Promise가 처리될 때까지 `async함수의 실행을 일시 정지`하고, Promise가 fulfill되면 async함수를 일시 정지한 부분부터 실행한다.
  - 이때 await문의 반환값은 Promise에서 fulfill된 값이고, reject되면 throw한다.
  - await연산자 다음에 나오는 문의 값이 Promise가 아니면 해당 값을 `resolved Promise`로 변환시킨다.

<br>

- `async와 await`
  - 위의 기능들을 토대로 비동기 코드를 동기 코드처럼 작성할 수 있도록 한다.
  - 코드는 동기적으로 보이지만, non-block으로 동작하기 때문에 코드 가독성과 성능에 이점이 있다.

<br><br>

## 브라우저 내 스크립트에서 외부 리소스를 가져오려면 어떻게 해야 할까요?

- 서버로 비동기 HTTP 요청을 통해 필요한 리소스를 받아온다. (AJAX)

<br><br><br>

### 브라우저의 XMLHttpRequest 객체는 무엇이고 어떻게 동작하나요?

- `XHR`로 부르며, 전체 페이지의 새로고침 없이도 URL로 부터 데이터를 받아올 수 있게 하는 객체이다.
- XML뿐만 아니라 `모든 종류의 데이터`를 받아올 수 있고, HTTP 이외의 프로토콜도 지원한다.
- 아래와 같은 순서와 상태를 가진다
  | Code | status | Description |
  | ---- | ---------------- | --------------------------------- |
  | 0 | unsent | XHR 객체 생성 |
  | 1 | opened | 클라이언트-서버 간 연결 요청 준비 |
  | 2 | headers_received | response headers 수신 완료 |
  | 3 | loading | response body 수신 중 |
  | 4 | done | 통신 완료 or 문제 발생 |
  [XHR 표준](https://xhr.spec.whatwg.org/#interface-xmlhttprequest)

<br><br>

### fetch API은 무엇이고 어떻게 동작하나요?

- 네트워크 통신을 포함한 리소스 취득을 위한 인터페이스가 정의되어 있으며, XHR보다 유연한 조작이 가능하다.
- Promise 객체를 반환하며 요청의 결과에 무관하게 Response객체가 취득된다.
- 반환 값에 Request, Response Object가 포함되어 있기 때문에 캐시 웹 서비스 핸들링 등 이 가능하고, CORS나 HTTP Origin 헤더에 관련한 개념도 다룰 수 있다.
- 쿠키를 보내거나 받지 않는다. 쿠키를 전송하기 위해서는 credentials 옵션을 설정해야 한다.
  - 2017.08.25 이후, 기본 자격증명 정책이 same-origin으로 변경되었다.

<br><br><br>

## REST는 무엇인가요?

- REpresentation State Transfer의 약자로, 분산 하이퍼 미디어 시스템을 위한 아키텍처 스타일이다.
- RESTful로 참조되어야 하는 경우 충족되어야 하는 6가지 기본 원칙이 있다.

  1. `Client-Server`
     - 아키텍처를 단순화시키고 작은 단위로 분리함으로써 여러 플랫폼에서 사용자 인터페이스의 이식성을 개선하고 서버 구성 요소를 단순화하여 확장성을 개선한다.
  2. `무상태 (Stateless)`
     - 클라이언트에서 서버로의 각 요청에는 요청을 처리하는데 데 필요한 모든 정보가 포함되어야 한다.
     - 서버에 저장된 컨텍스트를 이용할 수 없다. 따라서 세션 상태는 전적으로 클라이언트에 유지된다.
  3. `캐시 처리 가능 (CacheAble)`
     - 요청에 대한 응답 내의 데이터를 암시적/명시적으로 캐시 가능/불가능으로 지정해야 한다. 응답이 캐시 가능한 경우 클라이언트는 해당 응답 데이터를 캐싱할 수 있다.
  4. `인터페이스 일관성 (Uniform Interface)`
     - 소프트웨어 엔지니어링 원칙의 일반성을 구성 요소 인터페이스에 적용함으로써 전체 시스템 아키텍처가 단순화되고 상호 작용의 가시성이 향상된다.
     - 아래 서술한 인터페이스 제약을 구성한다.
  5. `계층 시스템 (Layered System)`
     - 클라이언트는 보통 대상 서버에 직접 연결되었는지, 또는 중간 서버를 통해 연결되었는지 알 수 없다.
     - 중간 서버는 로드 밸런싱 기능이나 공유 캐시 기능을 제공함으로써 시스템 규모 확장성을 향상 시키는 데 유용하다.
  6. `Code on Demand(optional)`
     - 자바 애플릿이나 js의 제공을 통해 서버가 클라이언트에서 실행시킬 수 있는 로직을 전송하여 기능을 확장시킬 수 있다.

- REST는 네 가지 인터페이스 제약으로 정의된다.

  1. `지원 식별 (identification of resources)`
     - REST에서 정보의 핵심 추상화는 `자원`이다. 요청 내에 기술된 개별 자원을 식별할 수 있어야 한다.
     - 보통 URL로 식별하며, 이름을 지정할 수 있는 모든 정보는 문서 또는 이미지, 임시 서비스, 기타 리소스 모음, 비가 상 개체 등 리소스가 될 수 있다.
  2. `메시지를 통한 자원 조작 (manipulation of resources through representations)`
     - 클라이언트가 어떤 자원을 지칭하는 메시지와 특정 메타데이터만 가지고 있다면 이것으로 서버 상의 해당 자원을 컨트롤 할 수 있는 충분한 정보를 가지고 있는 것이다.
  3. `자기서술적 메시지 (self-descriptive messages)`
     - 각 메시지는 자신을 어떻게 처리해야 하는지에 대한 충분한 정보를 포함해야 한다.
       - 예를 들어, MIME type과 같은 인터넷 미디어 타입을 전달한다면, 그 메시지에는 어떤 파서를 이용해야 하는지에 대한 정보도 포함해야 한다. 미디어 타입만 가지고도, 클라이언트는 어떻게 그 내용을 처리해야할 지 알 수 있어야 한다.
     - 메시지를 이해하기 위해 그 내용까지 봐야 한다면, 그 메시지는 자기서술적이 아니다.
       - 예를 들어, 단순히 "application/xml" 이라는 미디어 타입은, 실제 내용을 다운로드 받지 않으면 그 메시지만 가지고는 무엇을 해야할지에 대해 충분히 알려주지 못한다.
  4. `어플리케이션의 상태에 대한 엔진으로서 하이퍼미디어 (hypermedia as the engine of application state)`
     - 만약 클라이언트가 관련된 리소스에 접근하기를 원한다면, 리턴되는 지시자에서 구별될 수 있어야 한다.
     - 충분한 콘텍스트 속에서의 URI를 제공해주는 하이퍼텍스트 링크의 예를 들 수 있다 -> 클라이언트에 영향을 미치지 않으면서 서버를 변경할 수 있다.

- 이외에도 URL에 버전 정보를
  <br><br>

### REST API는 어떤 목적을 달성하기 위해 나왔고 어떤 장점을 가지고 있나요?

- 목적

  - 어플리케이션 분리 및 통합의 유용성
  - 모바일 등 다양한 클라이언트가 등장함에 따른 멀티 플랫폼에 대한 지원성

- 장점
  - 별도의 인프라를 구축할 필요 없다.
  - HTTP 표준 프로토콜을 활용하여 추가적인 장점을 사용할 수 있다.
  - HTTP 표준을 따르는 모든 플랫폼에서 사용 가능하다. (멀티 플랫폼)
  - REST API 메시지가 의도하는 바를 나타내여 쉽게 파악 가능하다.
  - 서버와 클라이언트의 역할을 명확하게 구분한다.

<br><br>

### RESTful한 API 설계의 단점은 무엇인가요?

- 표준이 존재하지 않는다.
- 사용할 수 있는 HTTP Method의 수가 적다.
- `개인적으로는 self-descriptive messages, HATEOAS가 지키기 까다로운 제약이라고 생각했습니다.`

[그런 REST API로 괜찮은가](https://slides.com/eungjun/rest)

<br><br><br>

## CORS란 무엇인가요? 이러한 기능이 왜 필요할까요?

- `Cross-Origin Resource Sharing`의 약자로 번역하면 `교차 출처 리소스 공유`이다.
- 브라우저가 리소스 로드를 허용해야 하는 origin 이외의 다른 origin을 서버가 나타낼 수 있도록 하는 HTTP 헤더 기반 메커니즘이다.
- 기본적으로 웹은 보안을 위해서 SOP(Same-Origin Policy)라는 정책을 지켜야 하는데, 예외 조항으로 CORS를 사용해 다른 출처의 리소스를 얻어올 수 있다.
  - `origin`이란, Protocol, Host, Port의 묶음을 의미한다.

<br><br>

## CORS는 어떻게 구현될까요?

CORS는 서버에 구현된 스펙이 아니라 브라우저에 구현되어 있는 스펙이기 때문에, 리소스의 출처에 따라 응답을 파기하는것은 브라우저에서 진행한다. 따라서 서버측 에서는 정상적으로 응답을 했다는 로그를 남긴다.

- `Preflight Request`

  > 1.  가장 일반적인 방식으로, 브라우저는 요청을 한번에 보내지 않고 예비 요청과 본 요청으로 나누어서 서버로 전송한다.
  > 2.  이때 본 요청을 보내기 전에 보내는 예비 요청을 preflight라고 부는 것이며, 이 예비 요청에는 HTTP 메소드 중 OPTIONS 메소드가 사용된다.
  > 3.  서버는 자신이 허용하는 것과 금지하고 있는 것에 대한 정보를 응답 헤더에 담아서 브라우저에게 전달한다.
  > 4.  이후 브라우저는 자신이 보낸 예비 요청과 서버가 응답에 담아준 허용 정책을 비교한 후, 이 요청을 보내는 것이 안전하다고 판단되면 같은 엔드포인트로 다시 본 요청을 보내게 된다.

    <img src="https://evan-moon.github.io/static/c86699252752391939dc68f8f9a860bf/21b4d/cors-preflight.png" width="550px" height="350px">

<br><br>

- `Simple Request`

  > 1.  단순 요청은 예비 요청을 보내지 않고 바로 서버에게 본 요청부터 보낸다.
  > 2.  서버가 이에 대한 응답의 헤더에 `Access-Control-Allow-Origin`을 내려준다.
  > 3.  브라우저에서 CORS 정책 위반 여부를 검사한다.

- Simple Request 단순해 보이지만 여러 제약사항이 있어 사용하기 까다롭다.

  > 1.  요청의 메소드는 GET, HEAD, POST 중 하나여야 한다.
  > 2.  Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Width를 제외한 헤더를 사용하면 안된다.
  > 3.  만약 Content-Type를 사용하는 경우에는 application/x-www-form-urlencoded, multipart/form-data, text/plain만 허용된다.

    <img src="https://evan-moon.github.io/static/d8ed6519e305c807c687032ff61240f8/21b4d/simple-request.png" width="550px" height="270px">

<br><br><br>

# Advanced

### fetch API는 구현할 수 없지만 XMLHttpRequest로는 구현할 수 있는 기능이 있을까요?

- `404, 500 Error` 컨트롤을 지원한다.
- `connection timeout`을 지정할 수 있다.
- `xhr.abort()`를 통한 요청취소를 지원한다.
- 파일 업로드와 같은 긴 시간을 소요하는 작업의 progress를 알 수 있다.
- <br><br>

### REST 이전에는 HTTP API에 어떤 패러다임들이 있었을까요? REST의 대안으로는 어떤 것들이 제시되고 있을까요?

- REST 이전: SOAP, RMI, Corba, DEC, DCOM
- REST 대안: GraphQL, gRPC

<br><br>

# Quest 관련

1. 일정산출
   - 7/1 [서버] API 명세, 아키텍처 선정, 기능 구현
   - 7/2 [서버 & 클라이언트] 서버 마무리, 3000번 서버 생성 및 static 적용
   - 7/5 코드 최적화 및 리뷰 요청

<br><br>

### 참고

[비동기 프로그래밍](https://asfirstalways.tistory.com/348)
