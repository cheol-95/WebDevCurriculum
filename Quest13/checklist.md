# Quest 13. 웹 API의 응용과 GraphQL

## GraphQL API는 무엇인가요? REST의 어떤 단점을 보완해 주나요?

- `Graph Query Language`의 약자로, 클라이언트-백엔드 사이의 쿼리를 수행하기 위한 런타임이다.
- 일반적으로 HTTP POST를 사용하여 통신하며 필요에 따라 TCP/UDP, 이더넷 프레임을 사용할 수도 있다.
- 보완
  - 필요한 정보만 정확히 얻어올 수 있다.
    - `OverFetching`, `UnderFetching` 문제 해결, 데이터 전송량, 요청 횟수 감소
  - 멀티플랫폼 환경에서 각 클라이언트 환경에 맞는 정보를 일일히 나누지 않아도 된다.
    - 관리 포인트가 줄어든다.

<br><br>

## GraphQL 스키마는 어떤 역할을 하며 어떤 식으로 정의되나요?

- 데이터 타입의 집합으로 API 문서 역할을 한다.
- SDL(Schema Definition Language)를 사용하여 작성한다.
- 정의
  - `어떤 종류의 객체를 반환하는지`
  - `어떠한 자원을 인자로 받는지`
  - `내가 받을 수 있는 자원은 어떤 종류인지`
- 스칼라 타입
  - 내장 자료형
    | Type | Description |
    | ------- | ------------------------------------- |
    | ID | 기본적으로는 String, 고유 식별자 역할 |
    | String | UTF-8 문자열 |
    | Int | 부호가 있는 32비트 정수 |
    | Float | 부호가 있는 부동소수점 값 |
    | Boolean | 참/거짓 |
    | ! | Non Null - 자료형x |

<br><br>

## GraphQL 리졸버는 어떤 역할을 하며 어떤 식으로 정의되나요?

- 스키마에 명시해놓은 쿼리나 뮤테이션의 실제 동작을 정의한다.
- CRUD의 R을 담당하는 Query와 CUD를 담당하는 Mutation으로 구성되어있다.

<br><br>

## GraphQL 리졸버의 성능 향상을 위한 DataLoader는 무엇이고 어떻게 쓰나요?

- 일괄 처리 및 캐싱을 통해 DB나 서비스와 같은 다양한 원격 데이터 소스에 대한 데이터 가져오기 계층의 일부로 사용되는 유틸리티이다.
- `Batching`을 통해 엔티티의 릴레이션을 사용한 쿼리에서 발생하는 N+1 문제를 1+1로 변환해준다.
  - `Batching`
    - DataLoader는 Javascript의 Event-loop를 사용하며, 주요 기능인 batching은 event-loop중 하나의 tick에서 실행 된 data fetch에 대한 요청을 하나의 요청으로 모아서 실행하고 그 결과를 다시 알맞게 분배한다.
      - `resolver`와 `DB`사이의 미들웨어 같은 위치

<br><br>

## 클라이언트 상에서 GraphQL 요청을 보내려면 어떻게 해야 할까요?

- Apollo-Client를 사용하여 보낸다.
- Ajax를 사용해 HTTP통신을 보낸다.

<br><br>

## Apollo 프레임워크(서버/클라이언트)의 장점은 무엇일까요?

- Local state 관리가 용이하다.
- 전송받은 데이터를 자동으로 캐싱한다.
- Query 및 Mutation을 직접 전송함으로써, API 서버에서 데이터를 가져오기 위한 HTTP 요청을 신경쓰지 않아도 된다.

<br><br>

## Apollo Client를 쓰지 않고 Vanilla JavaScript로 GraphQL 요청을 보내려면 어떻게 해야 할까요?

- HTTP 통신을 사용하여 요청할 수 있다.

  ```
  {
    Method: GET
    QueryString
    Body: JSON
  }

  {
    Method: POST
    Content-Type: application/json or application/graphql
    Body: JSON
  }
  ```

<br><br>

## GraphQL 기반의 API를 만들 때 에러처리와 HTTP 상태코드 등은 어떻게 하는게 좋을까요?

- 인증단계에서 발생하는 에러는 400을 리턴하고 `extensions`의 `code`로 분류하여 처리한다.
- 이후 단계에서 에러가 발생하면 200과 함께 에러를 throw 한다. 해당 에러와 관련하여 후속처리가 있다면 `formatError`에서 컨트롤한다.
- 여러 데이터를 중복으로 요청 시 일부만 성공했을 경우?
  - `data, errors`가 동시에 내려가기 때문에 이와 관련된 내용은 내부적으로 컨벤션을 통해 해결해야 될것 같다.

<br><br>

# Advanced

## GraphQL이 아직 제대로 수행하지 못하거나 불가능한 요구사항에는 어떤 것이 있을까요?

- File 전송 등 Text 만으로 하기 힘든 내용들을 처리하기 복잡하다.
- 고정된 요청과 응답만 필요할 경우에는 Query로 인해 요청의 크기가 RESTful API 의 경우보다 더 커진다.
- 재귀적인 Query가 불가능하다.
- HTTP Status를 완벽하게 사용할 수 없다.

<br><br>

## GraphQL의 경쟁자에는 어떤 것이 있을까요?

- 오픈소스 원격 프로시저 호출 시스템인 `gRPC`가 있다. 바이너리 데이터를 사용하며 상황에 따라 높은 성능을 자랑한다.
