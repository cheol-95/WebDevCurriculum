# Quest 07. Node.js의 기초

### node.js는 무엇인가요? node.js의 내부는 어떻게 구성되어 있을까요?

- `비동기 이벤트 기반 Javascript 런타임`으로, 확장성 있는 네트워크 어플리케이션을 만들 수 있도록 설계되었다.
- 노드 표준 라이브러리 (Node standard library)

  - 실질적으로 V8과 연결되어 특정 기능들을 수행할 수 있도록 도와주는 자바스크립트 기본 라이브러리이다. 자바스크립트 언어로 작성되었으며, 이를 통해 노드 바인딩과 연결된다.

- 노드 바인딩 (Node bindings)

  - C/C++로 구성된 시스템 바인딩 레이어로, C/C++로 작성된 라이브러리를 자바스크립트에서 사용할 수 있도록 결합하는 핵심 요소이다. 소켓, http 등의 통신 기능이 제공되지만, DOM에 관한 기능은 제공되지 않고 있다.
  - 소켓이나 http 등에 대한 노드 바인딩이 노드 표준 라이브러리와의 인터페이스 역할을 한다.

- V8 엔진

  - 구글에서 개발된 V8 자바스크립트 엔진으로, 오픈소스 JIT 가상머신 형식은 자바스크립트 엔진이다.
  - 구글 크롬에 내장되어 있지만 독립적으로 실행 가능하며, C++로 작성된 응용 프로그램의 일부로 작동할 수도 있다. 노드는 이 엔진을 이용하여 자바스크립트로 개발된 노드 어플리케이션을 동작시킨다.

- 쓰레드 풀 (Thread pool)

  - libeio 라는 비동기 I/O 라이브러리로 구성되어 있다. 파일 관련 작업을 수행하며, 이벤트 기반의 모든 게 비동기로 동작하는 C언어용 I/O 라이브러리이다.
  - 노드에서 비동기 입출력은 모두 이 라이브러리로 동작한다고 생각하면 된다.
  - Node.js도 싱글 쓰레드만 사용하는 것이 아니라 내부적으로 멀티 쓰레드 풀을 사용하기는 한다.

- 이벤트 루프 (Event loop)

  - 이벤트 루프: 시스템 커널에 작업을 넘겨 Node.js가 블로킹 I/O 작업을 수행하도록 해준다.
  - 이벤트 루프는 libev를 이용하여 구성되어 있다. 다양한 기능을 가진 고성능 이벤트 루프 라이브러리로, libevent라는 라이브러리와 유사하다.
  - 이벤트 루프의 단계
    1. Timers: `setTimeout()`과 `SetInterval()`로 스케줄링한 콜백을 실행한다.
    2. Pending Callbacks: 다음 루프 반복으로 연기된 I/O 콜백들을 실행한다.
    3. Idle, Prepare: 내부용으로만 사용한다.
    4. Poll: 새로운 I/O 이벤트를 가져온다. I/O와 연관된 콜백을 실행하며, 적절한 시기에 node는 여기서 블록한다.
    5. Check: `setImmediate()`은 여기서 호출된다.
    6. Close Callbacks: 일부 close 콜백들이 실행된다. ex) socket.on('close', ...)

- C-ares

  - 동시에 복수의 DNS 질의 요청을 비동기적으로 처리하기 위한 C 라이브러리이다.

- 스레드를 사용하지 않도록 설계되지만, fork나 cluster를 사용해서 다수의 코어에 로드 밸런싱이 가능하도록 할 수 있다.

<br>

### npm이 무엇인가요? `package.json`파일은 어떤 필드들로 구성되어 있나요?

- `Node Package Manager`의 약자로, node.js에서 사용하는 세계에서 가장 큰 소프트웨어 레지스트리이다.
- 오픈 소스 개발자들은 npm을 사용하여 패키지를 공유하고 차용하며 많은 조직에서 npm을 사용하여 개인 개발도 관리한다.
- 웹 사이트, CLI, 레지스트리로 이루어져 있다.

- package.json 필드
  - name
    - pass
  - version
    - pass
  - description
    - pass
  - keywords
    - pass
  - homepage
    - pass
  - bugs
    - pass
  - license
    - pass
  - people fields
    - author
      - pass
    - contributors
      - pass
  - funding
    - pass
  - files
    - pass
  - main
    - pass
  - browser
    - pass
  - bin
    - pass
  - man
    - pass
  - directories
    - pass
  - repository
    - pass
  - scripts
    - pass
  - config
    - pass
  - dependencies
    - pass
      - URLs as Dependencies
        - pass
      - Git URLs as Dependencies
        - pass
      - GitHub URL
        - pass
      - Local Paths
        - pass
  - devDependencies
    - pass
  - peerDependencies
    - pass
  - peerDependenciesMeta
    - pass
  - bundleDependencies
    - pass
  - optionDependencies
    - pass
  - engines
    - pass
  - os
    - pass
  - cpu
    - pass
  - private
    - pass
  - publishConfig
    - pass
  - workspaces
    - pass
  - DEFAULT VALUES
    - pass

<br>

### npx는 어떤 명령인가요? npm 패키지를 `-g` 옵션을 통해 글로벌로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

- `-g` 옵션을 사용하여 패키지를 전역으로 설치하면, 패키지의 코드를 로컬에서 도구 집합으로 사용할 수 있다.

<br>

### 자바스크립트 코드에서 다른 파일의 코드를 부르는 시도들은 지금까지 어떤 것이 있었을까요?

- pass

<br>

### CommonJS 대신 ES Modules가 등장한 이유는 무엇일까요?

- pass

<br>

### ES Modules는 기존의 require()와 동작상에 어떤 차이가 있을까요?

- pass

<br>

### CommonJS는 할 수 있으나 ES Modules가 할 수 없는 일에는 어떤 것이 있을까요?

- pass

<br>

### node.js ES Modules를 사용하려면 어떻게 해야할까요? ES Modules 기반의 코드에서 CommonJS 기반의 패키지를 불러오려면 어떻게 해야 할까요? 그 반대는 어떻게 될까요?

- pass

<br>
<br>
<br>

# Advanced

### node.js 외의 자바스크립트 런타임에는 어떤 것이 있을까요?

- pass
