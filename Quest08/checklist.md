# Quest 08. 웹 API의 기초

## HTTP의 GET과 POST 메소드는 어떻게 다른가요?

| 분류              | GET             | POST                                                   |
| ----------------- | --------------- | ------------------------------------------------------ |
| 목적              | 요청 (Read)     | 생성, 수정 (Create)                                    |
| 데이터 위치       | url_queryString | request_body                                           |
| 데이터 길이       | url 길이로 한정 | 제한이 없다                                            |
| 데이터 타입       | string          | string/ binary 등, 데이터 형식은 content-type으로 명시 |
| 보안              | 취약            | 상대적으로 안전하지만 취약한건 동일                    |
| 캐싱              | 지원            | 미지원                                                 |
| 브라우저 히스토리 | O               | X                                                      |
| 멱등성            | O               | X                                                      |

\* `멱등`: 연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질

<br>

### 다른 HTTP 메소드에는 무엇이 있나요?

- `HEAD`
  - GET 요청과 동일한 응답을 요구하지만, 응답 본문을 포함하지 않는다.
  - 웹서버 정보확인, 헬스체크, 버젼확인, 최종 수정일자 확인등의 용도로 사용된다.
- `PUT`
  - 목적 리소스를 요청 payload로 갱신한다(Update).
- `PATCH`
  - 목적 리소스의 일부를 교체한다.
- `DELETE`
  - 목적 리소스를 삭제한다.
- `CONNECT`
  - 목적 리소스로 식별되는 서버로의 터널을 맺는다(연결).
- `OPTIONS`
  - 목적 리소스의 통신을 설정한다.
  - 주로 웹서버에서 지원되는 메소드의 종류를 확인할 때 사용한다.
- `TRACE`
  - 목적 리소스의 경로를 따라 메시지 `loop-back` 테스트를 한다.

<br><br>

## HTTP 서버에 GET과 POST를 통해 데이터를 보내려면 어떻게 해야 하나요?

- GET: QueryString
- POST: Body

<br>

### HTTP 요청의 Content-Type 헤더는 무엇인가요?

- 전송할 리소스의 Media Type을 명시하기 위해 사용된다.
- IANA(Internet Assigned Numbers Authority)에서 공식적인 MIME 미디어 타입을 관리한다.

<br>

### Postman에서 POST 요청을 보내는 여러 가지 방법(form-data, x-www-form-urlencoded, raw, binary) 각각은 어떤 용도를 가지고 있나요?

- raw
  - JSON, XML, HTML 등 모든 형식의 텍스트를 업로드 할 수 있다.
- binary
  - 비 텍스트 데이터 (비디오, 오디오, 이미지 등 기타 바이너리 데이터-파일)에 사용된다.
- form-data
  - `multipart/ form-data`로, 키-값 쌍을 업로드 하거나 파일을 업로드 할 수 있다.
  - 파일 및 기타 바이너리 데이터를 업로드 할 수 있으며, 최종 파일은 메시지로 변환된다.
  - 키-값은 `=`로 구분되고, 각각의 쌍은 `&`로 구분된다.
- x-www-form-urlencoded
  - `application/ x-www-form-urlencoded`로, 키-값 쌍으로 변환된다.
  - 사이즈가 큰 바이너리 데이터나 Non-ASCII를 포함한 text data를 보내기 부적합하다.
  - 키-값은 `=`로 구분되고, 각각의 쌍은 `&`로 구분된다.
  - 일반적인 웹 양식을 전달할때는 해당 방법을 사용하고, 파일이나 기타 바이너리 데이터까지 보낸다면 form-data를 사용한다.

<br><br>

### node.js의 http 모듈을 통해 HTTP 요청을 처리할 때, req와 res객체에는 어떤 정보가 담겨 있을까요?

- `req`
  - URL
  - Event
  - HTTP Method
  - Protocol(version)
  - Header
    - Content-Type
    - Authorization
- `res`
  - Event
  - Header
  - Content-Type
  - HTTP statusCode
  - HTTP statusMessage
  - Body

<br>

### GET과 POST에 대한 처리 형태가 달라지는 이유는 무엇인가요?

- 두 메소드의 용도가 다르기 때문이다.
- `GET`은 주로 데이터를 조회할 때 사용하고, `POST`는 생성 및 수정할 때 사용한다.

<br>

## 만약 API 엔드포인트(URL)가 아주 많다고 한다면, HTTP POST 요청의 Content-Type 헤더에 따라 다른 방식으로 동작하는 서버를 어떻게 정리하면 좋을까요?

- Content-Type 헤더에 따라 분기문을 사용해 다른 동작을 시킨다.

<br>

## 그 밖에 서버가 요청들에 따라 공통적으로 처리하는 일에는 무엇이 있을까요? 이를 어떻게 정리하면 좋을까요?

- 사용자 인증
- 요청 데이터 파싱 (버퍼의 이미지파일 처리 등)
- http status code 설정
- 에러 처리
- 각 기능을 모듈화를 한 뒤, 앞단(루트 라우팅)에서 처리하거나 응답 전에 처리한다.

<br>

# Advanced

### 서버가 파일 업로드를 지원할 때 보안상 주의할 점에는 무엇이 있을까요?

- 의도치 않은 행동을 하는 스크립트나(webShell) 응용 프로그램이 설치되어 보안사고가 발생할 수 있다.
- 해결 방안
  - 업로드하는 파일의 확장자 제한
  - 파일 업로드 시 보안성 검토
  - 업로드 되는 폴더의 실행 권한 제거
  - 서버와 파일 위치 분리 (S3와 같은 버킷에 저장)
