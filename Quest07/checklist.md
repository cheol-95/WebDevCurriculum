# Quest 07. Node.js의 기초

## node.js는 무엇인가요?

- `비동기 이벤트 기반 Javascript 런타임`으로, 확장성 있는 네트워크 어플리케이션을 만들 수 있도록 설계되었다.

<br>

## node.js의 내부는 어떻게 구성되어 있을까요?

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
<br>

## npm이 무엇인가요?

- `Node Package Manager`의 약자로, node.js에서 사용하는 세계에서 가장 큰 소프트웨어 레지스트리이다.
- 오픈 소스 개발자들은 npm을 사용하여 패키지를 공유하고 차용하며 많은 조직에서 npm을 사용하여 개인 개발도 관리한다.
- 웹 사이트, CLI, 레지스트리로 이루어져 있다.

<br>

## `package.json`파일은 어떤 필드들로 구성되어 있나요?

- package.json 필드

  - `name`
    - 패키지의 이름을 지정하는 필드로, 패키지를 배포 할 계획이라면 name과 version은 필수 사항이다.
    - 이름과 버전은 완전히 고유 한 것으로 간주되는 식별자를 형성한다.
    - 214자 이하, 대문자 불가, URL에 포함되지 때문에 안전하지 않은 문자 불가 등 이름 명명 규칙이 존재한다.
  - `version`
    - 버전은 종속성으로 npm과 함께 번들로 제공 되는 node-semver로 구문 분석 할 수 있어야 한다.
  - `description`
    - 패키지의 설명을 입력하는 필드이다.
  - `keywords`
    - 문자의 배열로 이루어진 키워드를 입력하는 필드이다.
  - `homepage`
    - 프로젝트 홈페이지의 URL이다.
  - `bugs`
    - 프로젝트의 이슈 트래커에 대한 URL, 이슈를 보고해야 하는 이메일 주소를 명시한다.
  - `license`
    - 라이센스를 지정하여 사람들이 패키지 사용이 허용되는 방식과 사용자가 적용하는 제한 사항을 알 수 있도록 해야한다.
  - `people`
    - author
      - 작성한 사람을 의미하며, `이름` 필드는 필수고 선택적으로 `URL`과 `이메일`이 포함 된 객체이다.
    - contributors
      - 기여한 사람들의 배열이다.
  - `funding`
    - 패키지 개발 자금 지원방법에 대한 최신 정보를 제공하는 URL이 포함 된 객체, 문자열 URL 또는 배열이다.
  - `files`
    - 패키지가 종속적으로 설치 될 때 포함될 항목을 설명하는 파일의 배열이다.
    - 설정에 관계없이 항상 포함되는 파일들
      - package.json
      - README
      - CHANGES / CHANGELOG / HISTORY
      - LICENSE / LICENCE
      - NOTICE
    - 항상 무시되는 파일
      - .git
      - CVS
      - .svn
      - .hg
      - .lock-wscript
      - .DS_Store
      - .npmrc
      - node_modules
      - config.gypi
      - \*.orig
      - package-lock.json
  - `main`
    - 해당 패키지 모듈을 불러올 때 사용되는 프로그램의 `기본 진입점인 모듈ID`이다.
    - Default값은 루트폴더의 index.js이다.
  - `browser`
    - 모듈이 클라이언트 측에서 사용되도록 의도 된 경우, 기본 필드 대신 브라우저 필드를 사용해야 한다.
    - 이는 Node.js 모듈에서 사용할 수 없는 기본 요소(window 등)에 의존할 수 있음을 사용자에게 알린다.
  - `bin`
    - 패키지는 PATH에 설치되는 하나 이상의 실행 파일을 가지고 있다.
    - 실행할 수 있는 패키지를 만들기 위해선 bin항목을 제공해야 한다.
    - 패키지 설치 시에, npm은 bin항목에 기술된 파일의 심볼릭 링크를 global install인 경우 prefix/bin에, local install인 경우 /node_modules/.bin/ 에 생성하게 된다.
  - `man`
    - 패키지의 설명서인 파일의 위치를 명시한다.
  - `directories`
    - 프로젝트의 파일들에 대한 위치를 가르킨다.
    - lib, bin, man, doc, example, test 등이 있다.
  - `repository`
    - type과 url로 이루어진 코드 저장소를 명시한다.
  - `scripts`
    - 명령에 해당하는 키와 수행해야 하는 작업에 대한 값이 있는 단순한 객체이다.
    - 어떠한 명령에 `pre`/ `post`를 prefix로 사용해 또 다른 명령을 작성하면 이전/ 이후에 작동한다.
    - 대부분의 경우 위의 사전, 사후 라이프 사이클을 가지고 있으며, 특별한 라이프 사이클을 가지고 있는 명령어도 있다.
  - `config`
    - 스크립트에서 사용할 수 있는 일부 구성을 지정하는 특수한 객체이다.
    - ex) `npm_package_config_port`
    - 오픈소스로 배포시에 공유할만한 환경변수를 설정하기에 적합하고, 프로덕트에 사용하기는 부적합해 보인다.
  - `dependencies`

    - 패키지에 사용되는 종속성을 명시하며, `npm install` 명령어 사용 시 설치된다.
    - 키: 패키지의 이름, 값: 버전으로 구성되어있다.
    - 버전 호환성
      | 명세 | 의미 |
      | -- | -- |
      | version | 정확히 일치|
      | >version | version 보다 크다|
      | >=version | version 크거나 같다|
      | <version | version 작다|
      | ~version | 버전 값 중 유효한 위치의 버전부터 상위 버전까지 |
      | ^version | 버전 값 중 유효한 위치의 버전부터 상위 버전까지 |
      | v1.2.x | 1.2.0, 1.2.1 등, 1.3.0 제외|
      | \* | 모든 버전과 일치|
      | "" | 모든 버전과 일치|
      | version1 - version2 | >=version1 <=version2|
      | range1 \|\| range2 | range1 또는 range2 충족|
      | \_ | 모든 버전과 일치|
      | http://... | 버전 범위 대신 tarball URL 지정 |
      | git... | Git url을 종속성으로 지정하며 기본값은 master |
      | user/repo | 버전 범위 대신 tarball URL 지정 |
      | tag | npm dist-tag 로 태그된 특정한 버전 |
      | local path | 로컬 오프라인 개발용으로 사용 |

  - `devDependencies`
    - `--save-dev / --dev`로 설치되며, 개발 프로세스중에 필요한 모든 종속성을 포함한다.
    - 예를 들어, 테스트 프레임워크(mocha), 모듈 번들러, nodemon 등이 있다.
  - `peerDependencies`
    - 패키지와 다른 패키지의 호환성을 지정하는 객체이다.
  - `bundleDependencies`
    - 패키지를 퍼블리싱할 때 번들되는 패키지 이름들의 목록
  - `optionDependencies`
    - 사용을 원하는 모듈이지만, 없거나 설치가 실패해도 npm이 패키지 설치 과정이 중단되지 않도록 하려면, optionalDependencies를 사용한다.
    - 의존성 모듈이 없는 경우에 대응하도록 했을 때 사용하는 것이 좋다.
  - `engines`
    - 동작 가능한 node의 버전을 지정한다.
  - `os`
    - 어떤 운영체제에서 작동하는지 지정한다.
  - `cpu`
    - 어떤 cpu 아키텍쳐에서 작동하는지 지정한다.
  - `private`
    - publish 명령을 거부할 수 있도록 한다.
  - `publishConfig`

    - 퍼블리싱 시 사용되는 설정값으로, tag, registry, access를 설정하는 경우 편리하다.
    - config 필드를 대체할 수 있다.

  - `workspace`
    - 모듈을 사용하려면 상대경로를 사용해야 했었지만, workspace에 모듈을 명시하면 어디서든 사용할 수 있다.

<br><br>

## npx는 어떤 명령인가요?

- `npm run` script를 사용하지 않고 로컬에 설치된 패키지를 실행 시키는 명령어이다.

<br>

## npm 패키지를 `-g` 옵션을 통해 글로벌로 저장하는 것과 그렇지 않은 것은 어떻게 다른가요?

- 시스템 디렉토리(usr/lib/node_modules)에 설치되며, 다른 프로젝트에서도 사용할 수 있다.
- 옵션을 사용하지 않는다면, 현재 디렉토리의 node_modules에 설치된다.

<br>

## 자바스크립트 코드에서 다른 파일의 코드를 부르는 시도들은 지금까지 어떤 것이 있었을까요?

- 서버사이드에 포커스를 맞춘 CommonJS
- 브라우저에 포커스를 맞춘 AMD
- RequireJS: AMD의 명세를 구체화
- ES Modules

<br>

## CommonJS 대신 ES Modules가 등장한 이유는 무엇일까요?

- 모듈 로드의 비동기화
- 간단한 문법
- 실제 객체/ 함수 바인딩 -> 순환 참조 관리 유용
- 정적 분석이 가능해서 트리 쉐이킹이 쉬워졌다.

<br>

## ES Modules는 기존의 require()와 동작상에 어떤 차이가 있을까요?

- `CommonJS`의 require()는 동기로 이루어진다. 따라서 promise나 콜백 호출을 리턴하지 않는다 require()은 디스크로부터 읽어서 그 즉시 스크립트를 실행한다. 따라서 스스로 I/O나 부수효과를 실행하고 module.exports에 설정되어 있는 값을 리턴한다.

- `ES Modules`는 모듈 로더를 비동기 환경에서 실행한다. 먼저 가져온 스크립트를 바로 실행하지 않고, import/ export구문을 찾아서 스크립트를 파싱한다. 그 다음 가져온 스크립트를 비동기로 다운로드 하여 파싱한 다음 dependencies의 모듈 그래프를 만들어 낸다. 스크립트는 실행될 준비를 마치게 되며, 그 스크립트에 의존하고 있는 스크립트들도 실행 할 준비를 마치면 마침내 실행된다.
- `ES Modules` 모듈 내의 모든 자식 스크립트들은 병렬로 다운로드 되지만, 실행은 순차적으로 진행된다.

- 순환참조의 경우 `CommonJS`의 경우 {}, `ES Modules`의 경우 에러가 발생한다.
  <br>

## CommonJS는 할 수 있으나 ES Modules가 할 수 없는 일에는 어떤 것이 있을까요?

- 위의 정리 내용으로 봤을 땐, CommonJS는 즉시 실행되고, ES Modules는 아닌거 같습니다.

<br>

## node.js ES Modules를 사용하려면 어떻게 해야할까요? ES Modules 기반의 코드에서 CommonJS 기반의 패키지를 불러오려면 어떻게 해야 할까요? 그 반대는 어떻게 될까요?

- node.js에서 ES Modules 사용법

  - `package.json`에 `type: module` 옵션을 넣는 방법이 있다.

- ES Modules에서 CommonJS 사용법

  - default import만 가능하다.

    ```
    import _ from './lodash.cjs' (O)

    import { shuffle } from './lodash.cjs' (X)

    import _ from './lodash.cjs'
    const { shuffle } = _

    위 방법은 tree shaking이 되지 않으므로 번들링 시 사이즈가 커진다.
    ```

- CommonJS에서 ES Modules 사용법
  - CommonJS는 Top Level에서 await을 지원하지 않기 때문에 아래와 같이 사용
    ```
    ;(async () => {
      const { foo } = await import ('./foo.mjs')
    })()
    ```

<br>
<br>
<br>

# Advanced

## node.js 외의 자바스크립트 런타임에는 어떤 것이 있을까요?

- deno

tarball?
정적 분석
