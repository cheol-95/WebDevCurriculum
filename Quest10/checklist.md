# Quest 10. 인증의 이해

## 쿠키란 무엇일까요?

- 쿠키는 유저의 상태를 저장하기 위해 서버가 유저의 웹 브라우저에 전송하는 작은 데이터 조각이다.
- 브라우저는 동일한 서버에 요청을 보낼때 쿠키를 함께 전송하고, 서버는 두 요청이 동일한 브라우저에서 들어왔는지 확인한다.
- 상태가 없는 HTTP 프로토콜에서 상태 정보를 기억하기 위해 사용되며, 주로 세 가지 목적을 위해 사용된다.
  ```
  1. 세션 관리 (Session Management)
    - 서버에 저장해야 할 로그인, 장바구니 등의 정보 관리
  2. 개인화 (Personalization)
    - 사용자 선호, 테마 등 세팅
  3. 트래킹(Tracking)
    - 사용자 행동을 기록하고 분석하는 용도
  ```

<br><br>

## 쿠키는 어떤 식으로 동작하나요?

- 쿠키의 라이프타임
  - `세션 쿠키`는 현재 세션이 끝날 때 삭제된다.
  - `영속적인 쿠키`는 `Expires` 속성에 명시된 날짜에 삭제되거나, `Max-Age`속성에 명시된 기간 이후에 삭제된다.
- 보안
  - `Secure`쿠키
    - HTTPS 프로토콜 상에서 암호화된 요청일 경우에만 전송되지만, 본질적으로 안전하지는 않다.
  - `HttpOnly`쿠키
    - `Cross-site Scripting (XSS)` 공격을 방지하기 위해 사용되며, Javascript의 `Document.cookie` API를 통해 접근할 수 없다. (클라이언트의 코드로 접근할 수 없다)
- 스코프

  - `Domain`
    - 쿠키가 전송 될 호스트들을 명시한다. 만약 명시되지 않는다면, 현재 문서 위치의 호스트 일부를 기본값으로 한다.
    - 서브 도메인도 포함한다.
  - `Path`

    - `Cookie` 헤더를 전송하기 위하여 요구되는 URL 경로이다.
    - %x2F ("/")문자는 디렉티브 구분자로 해석되며 서브 디렉토리와의 매칭도 잘 된다.

      ```
      Path=/docs

      /docs
      /docs/Web/
      /docs/Web/HTTP
      ```

<br><br>

## 쿠키는 어떤 식으로 서버와 클라이언트 사이에 정보를 주고받나요?

- 서버가 응답에 `Set-Cookie` 헤더를 사용해 쿠키를 전송하고, 브라우저는 저장한다.

  ```
  (Server)
  Set-Cookies: <cookie-name>=<cookie-value>

  ---------

  (Client)
  HTTP/1.0 200 OK
  Content-type: text/html
  Set-Cookie: yummy_cookie=choco
  Set-Cookie: tasty_cookie=strawberry
  ```

<br>

- 그 후 쿠키는 같은 서버로 전송되는 모든 요청들의 Cookie HTTP 헤더안에 포함되어 전송된다.

  ```
  (Client)
  GET /sample_page.html HTTP/1.1
  Host: www.example.org
  Cookie: yummy_cookie=choco; tasty_cookie=strawberry
  ```

<br>

- `HttpOnly` 플래그가 설정되지 않았다면, 클라이언트는 `Document.cookie`를 사용하여 쿠키에 접근할 수 있다.

<br>

---

<br>

## 웹 어플리케이션의 세션이란 무엇일까요?

- 일정시간동안 같은 유저로부터 들어오는 요청들의 상태를 유지시키는 기술이다.
  - 방문자가 웹 서버에 접속해 있는 상태를 하나의 단위로 인식하기 위해서 사용한다.

<br><br>

## 세션의 ID와 내용은 각각 어디에 저장되고 어떻게 서버와 교환되나요?

- 저장위치

  - `서버의 로컬디스크`
  - `DB`
  - `In-Memory DB`

- 교환과정

  1. (클라이언트) 로그인 요청
  2. (서버) 세션 생성 및 세션 ID 응답
     - 세션 저장
     - 클라이언트에게 쿠키 전송
  3. (클라이언트) 쿠키에 세션 ID를 담아 요청
  4. (서버) 세션 ID를 사용해 DB에서 유저정보 획득

  <img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=http%3A%2F%2Fcfile25.uf.tistory.com%2Fimage%2F236A0533597EBE431EEE4E" style="width:580px; height:430px">

<br>

---

<br>

## JWT란 무엇인가요?

- 두 개체에서 JSON 객체를 사용하여 가볍고 `self-contained`한 방식으로 정보를 안전하게 교환하기 위한 개방형 표준이다.
  - `자가수용적`이란 토큰에 대한 기본정보, 교환할 정보, 검증을 증명하는 signature등 필요한 모든 정보를 자체적으로 지니고 있음을 의미한다.
- `HMAC 알고리즘` 또는 `RSA` 또는 `ECDSA` 를 사용해 암호화하고, 디지털 서명을 제공하기 때문에 보안이 좋다.

- 구조는 Header, Payload, Signature가 점으로 구분되어있다.

  - `Header` - JWT를 검증하는 데 필요한 정보를 가짐

    ```json
    {
      "typ": "JWT", // 토큰타입 지정
      "alg": "HS256" // 해싱 알고리즘 지정
    }
    ```

  <br>

  - `Payload`

    - 토큰에 담을 정보들이 들어있는데, 여기에 담는 정보의 한 '조각'을 클레임이라고 부르고, 이는 key-value의 한 쌍으로 이뤄져 있다.
    - 서명 된 토큰의 경우이 정보는 변조로부터 보호되지만 누구나 읽을 수 있기 때문에, 암호화되지 않은 경우 JWT의 페이로드 또는 헤더 요소에 비밀 정보를 넣지 않아야 한다.

    ```json
    {
      "sub": "1234567890",
      "name": "John Doe",
      "admin": true
    }
    ```

    - `claim`

      - `등록된 클레임 - Registered Claim`

        - 토큰 정보를 표현하기 위해 이미 정해진 종류의 클레임이다. (Optional)
        - IANA JSON Web Token Claims에 등록된 이름만 사용할 수 있다.

        ```json
        {
          "iss": "토큰 발급자 (issuer)",
          "sub": "토큰 제목 (subject)",
          "aud": "토큰 대상자 (audience)",
          "exp": "토큰의 만료시간 (expiraton) - 시간은 NumericDate형식",
          "nbf": "Not Before를 의미, 토큰의 활성 날짜 - NumericDate형식",
          "iat": "토큰 발급 시간(issued at), 이 값을 사용하여 age를 판단",
          "jti": "JWT의 고유 식별자로서, 주로 중복처리를 방지하기 위해 사용(일회성적합)"
        }
        ```

      - `공개 클레임 - Public Claim`

        - 사용자 정의 클레임으로, 공개용 정보를 위해 사용되며 충돌방지를 위해 URI포맷을 이용한다.

        ```json
        {
          "https://test.com/jwt_claims/is_admin": true
        }
        ```

      - `비공개 클레임 - Private Claim`

        - 사용자 정의 클레임으로, 서버와 클라이언트 사이에 임의로 지정한 정보를 저장한다.

        ```json
        {
          "username": "cheol"
        }
        ```

<br>

- `Signature`
  - 서명은 메시지가 변경되지 않았음을 확인하는 데 사용되며, 개인 키로 서명 된 토큰의 경우 JWT의 발신자가 자신이 말하는 사람인지 확인할 수 있다.
  - 서명은 인코딩 된 헤더, 인코딩 된 페이로드, secret(서버 암호), 헤더에 지정된 알고리즘을 이용해 생성한다.
  ```
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    secret)
  ```

<br><br>

## JWT 토큰은 어디에 저장되고 어떻게 서버와 교환되나요?

- 브라우저의 `localStorage` 또는 `cookie`에 저장된다.
- 교환과정

    <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/c7da917b-8992-4237-ae1c-e3ac3f598758/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210706%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210706T064038Z&X-Amz-Expires=86400&X-Amz-Signature=80f8de64ebcb592cbfcb481f3923ac2b60999bd4a497be4fbb6ed37189515748&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22" style="width:580px; height:430px">

  ```
  (A) 클라이언트가 인증 서버에 인증과 함께 액세스 토큰을 요청 한다.

  (B) 인증 서버는 인증과 함께 권한을 검증하고 액세스 토큰과 리프레시 토큰을 발급한다.

  (C) 클라이언트는 액세스 토큰과 함께 리소스 서버에 요청을 보낸다.

  (D) 리소스 서버는 액세스 토큰을 검증하고 유효한 경우 요청을 처리한다.

  (E) 액세스 토큰이 만료될 때 까지 (C) ~ (D) 단계를 반복한다. 만약 클라이언트가 액세스 토큰이 만료된 것을 알고 있으면 단계 (G)로 건너뛰고, 그렇지 않으면 만료된 액세스 토큰으로 요청을 보낸다.

  (F) 리소스 서버는 액세스 토큰이 만료되었다는 메시지를 응답한다.

  (G) 클라이언트 인증 서버에 리프레시 토큰과 함께 새로운 액세스 토큰을 요청한다.

  (H) 인증 서버는 리프레시 토큰을 검증하고 유효한 경우 새로은 액세스 토큰을 제공한다.
  ```

  <br><br>

## 세션에 비해 JWT가 가지는 장점은 무엇인가요? 또 JWT에 비해 세션이 가지는 장점은 무엇인가요?

- 장점

  1. 웹, 모바일, IoT 등 어떠한 플랫폼에서도 사용할 수 있다.
  2. `self-contained`의 특성에 따라 서버는 요청이 들어왔을 때 디코딩을 통해 유저의 정보를 알아낼 수 있다.
     - 이는 세션공유를 하지 않아도 됨을 의미하고 더 나아가 MSA환경에서 유용하게 사용된다.
  3. JWT의 저장 위치를 서버가 아닌 클라이언트에 저장해 서버 리소스 부담을 줄일 수 있다.

- 단점
  1. 토큰을 한번 생성하고 나면 만료될 때 까지 `변경`할 수 없다. 만약 토큰이 만료되기 전에 탈취된다면 피해를 입게된다.
     - 이를 최소화 하기 위해 `Access Token` 과 `Refresh Token`개념을 도입해 사용한다.
  2. `세션`의 경우 어떠한 탈취를 감지했을 떄 세션 ID를 제거하면 되지만 JWT 는 해당 토큰을 거절하기 위한 다른 처리를 해줘야 한다.
  3. 서버는 요청이 올 때마다 JWT를 디코딩해야 하는 작업이 추가된다.

<br><br><br>

# Advanced

## Web Authentication API(WebAuthn)은 무엇인가요?

- 공개 키 암호화와 인증자를 사용한 인증 방식으로, 기본적으로 웹 사이트 별로 고유한 암호를 생성해 사용하는 방식이다.
- 인증 방식으로는 `생체 인식`과 `하드웨어 보안 토큰`을 사용한다.
  - 생체 인식은 카메라를 사용한 `안면인식`, `지문인식` 등을 사용하는 인증 방식이다.
  - 하드웨어 보안 토큰은 USB같은 하드웨어를 사용하는 인증 방식이다.

<br><br>

- 인증 과정
  1. 웹사이트에 로그인을 하는 경우, 브라우저는 PC사용자의 신뢰할 수 있는 인증자에게 증명 제공을 요구한다.
     - 지문 리더기, 윈도우 헬로, 하드웨어 토큰 등을 말한다.
  2. 인증자가 신뢰된 상태이기 때문에 암호를 사이트에 저장하는 지금 방식과 다르게 웹사이트에 지문 데이터, 기타 고유 데이터를 저장 할 필요가 없다.
  3. 브라우저는 사용자 확인에 대한 정보를 암호화해 웹 서버로 다시 보낸다.

<br>

- 특징
  - 피싱으로부터 보호
  - 데이터 유출의 영향 감소

<br><br><br>

# Note

## XSS?

- pass

<br><br>

## CSRF?

- pass
