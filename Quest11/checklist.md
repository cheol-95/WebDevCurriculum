# Quest11. RDB의 기초와 ORM

## RDBMS 테이블의 정규화는 무엇인가요?

- 정제되어 있지 않은 데이터를 관계형 데이터베이스의 표에 맞게 수정하는 과정으로, 일반적으로 `3NF`를 사용한다.
- NF - UnNormalized Form

<br>

## `3NF`

### `제 1 정규화: 원자성(Atomic columns)`

- 각 컬럼은 하나의 값만 가져야 한다.
  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a8b23c0a-df8e-4ca0-b4ee-52e9628e1247/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210709%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210709T023213Z&X-Amz-Expires=86400&X-Amz-Signature=cb79252e75ae6186a6e3ba8e8c79dd1db8d3156d5e62497e272cf16701751c10&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22">

<br>

### `제 2 정규화: 부분 종속성 제거(No partial dependencies)`

- 기본키 중 중복키가 없어야 한다.
  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/7e376c45-7bf6-46b0-9787-4f1ccf0b4125/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210709%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210709T023215Z&X-Amz-Expires=86400&X-Amz-Signature=f4adebf3ce4992fa63c26ff96b8bb4c633e80576cb2d5eb373ab10154736fb12&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22">

<br>

### `제 3 정규화: 이행적 종속성 제거(No Transitive Dependencies)`

- 다른 대상에게 무엇을 이행하는것을 제거한다.
- 명시적으로 되어있지 않아도 두 컬럼이 서로 종속성이 있다면 추출 → ex) prefix?
  <img src="https://s3.us-west-2.amazonaws.com/secure.notion-static.com/a12e9ebe-2ca4-4206-abb5-8011cd763e7f/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20210709%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20210709T023216Z&X-Amz-Expires=86400&X-Amz-Signature=5c5d710ab69457f5c2f168305996a105c35f811db5d17a8baeb2f5278db763ed&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22Untitled.png%22">

<br><br>

## MySQL 외의 RDB에는 어떤 것들이 있나요?

- Oracle, MS-SQL, DB2, Maria DB, SQLite 등이 있다.

<br><br>

## Relational Database 외에 다른 DB에는 어떤 것들이 있을까요?

- `NoSQL`(NotOnly SQL)
  - `Document`
    - MongoDB, CouchDB
  - `Key-Value`
    - Redis, Memcached
  - `Big Table DB`
    - HBase, Cassandra, Hypertable, ScyllaDB

<br><br>

## RDBMS 에서 테이블의 인덱싱은 무엇인가요? 인덱싱을 하면 어떤 점이 다르며, 어떤 식으로 동작하나요?

- 인덱싱?
  - 테이블의 컬럼을 `색인화`하여 `검색속도`를 높이기 위해 사용하는 기술이다.
  - TREE 구조로 색인화하며, `B-Tree` 혹은 `B+Tree`를 사용한다.
- 특징
  - 검색 성능이 좋아지고, 다른 요청의 성능이 낮아진다.
  - 파일의 용량이 커진다.
- 동작
  - 지정
    - 어떠한 컬럼에 인덱스를 주게 되면, MYI파일에 해당 컬럼을 색인화하여 저장한다.
    - 이후 검색을 할때 테이블을 full scan 하지않고 MYI파일을 거쳐 검색한다.
  - 실행
    - B-Tree의 루트 노드부터 시작해 인터널 노드를 거쳐 최종 리프 노드까지 이동하면서 비교 작업을 수행한다. 이 과정을 `트리탐색`이라고 한다.
    - B-Tree인덱스르 이용한 검색은 100%일치 또는 값의 앞부분만 일치하는 경우에 사용할 수 있고, 값의 뒷부분이 일치하느 경우나 부등호를 사용한 검색이 불가능 하다.
- 알고리즘

  - `B-Tree Index`
    - 컬럼의 값을 변형하지 않고 원래의 값의 앞부분을 이용해 인덱싱한다.
    - I/O가 많이 발생하면 균형이 깨질 수 있다 -> 재 정렬
  - `Hash Index`
    - 컬럼의 값으로 해시 값을 계산해서 인덱싱하는 알고리즘으로 매우 빠르다.
    - 값을 변형해서 인덱싱하므로, 특정 문자로 시작하는 값으로 검색을 하는 등 전 일치와 같이 값의 일부만으로 검색은 불가능하다.
    - 주로 메모리 기반의 DB에서 많이 사용한다.

<br><br>

---

<br>

## ORM을 사용하는 것은 사용하지 않는 것에 비해 어떤 장단점을 가지고 있나요?

- Object Relational Mapping
  - RDB의 모델을 OOP에 Entity 형태로 투영시키는 방식을 사용한다.
- 장점
  - RDBMS에 대한 종속성이 줄어든다.
  - 재사용 및 유지보수의 편리성이 증가한다.
  - 객체지향적인 코드로 인해 더 직관적이고 로직에 집중할 수 있도록 도와준다.
    - 내부적인 추상화로 인해 DB를 교체해도 동일하게 동작한다.
- 단점
  - 상황에 따라 성능 이슈가 존재한다.
  - 완벽한 ORM으로만 서비스를 구현하기가 어렵다.
  - 프로시저가 많은 시스템에선 ORM의 객체 지향적인 장점을 활용하기 어렵다.

<br><br>

## 자바스크립트 생태계의 ORM에는 어떤 것들이 있나요?

- sequelize, TypeORM, Knex

<br><br>

## 모델간의 1:1, 1:N, N:M 관계는 각각 무엇이고 어떨 때 사용하나요?

- 1:1 (일대일)
  - 상대 엔티티와 반드시 단 하나의 관계를 가지는 것
  - ex) 결혼
- 1:N (일대다)
  - 관계를 맺은 엔티티 쪽의 여러 객체를 가질 수 있는 것
  - ex) 부모-자식
- N:M (다대다)
  - 양쪽 엔티티 모두에서 1:N 관계를 가지는 것
  - ex) 학원-학생

<br><br>

---

<br>

## DB에 사용자의 암호를 평문으로 작성하지 않고도 사용자의 암호를 인증하는 것이 가능한 이유는 무엇일까요?

- `단방향 해시 함수`를 사용하기 때문에 사용자의 암호인 평문으로 저장된 다이제스트를 비교할 수 있다.
- 역으로는 불가능하다.

<br><br>

## 해시 함수에는 어떤 것이 있나요?

- SHA-1, SHA-256, SHA-512, MD5 등

<br><br>

## 사용자의 암호를 해싱하여 저장할 때 어떤 식으로 저장하는 것이 보안에 좋을까요?

- `salting`
  - DIGEST = Hash(password + SALT)
- `key stretching`
  - DIGEST = Hash(Hash(password)) ... 반복
- `Adaptive Key Derivation Function`

  - 다이제스트를 생성할 때 salting과 key stretching을 반복하며 SALT와 Password외에도 입력 값을 추가하여 암호화한다.
  - `PBKDF2`
    - salting을 적용한 후, key stretching의 반복 횟수를 임의로 선택할 수 있다.
  - `bcrypt`
    - 패스워드 저장을 목적으로 설계되었고, work factor를 사용해 처리 과정의 수를 지정한다.
  - `scrypt`
    - PBKDF2와 유사하며 다이제스트 생성 시 메모리 오버헤드를 갖도록 설계되어, 억지 기법 공격(브루스포트)을 시도할 때 병렬화 처리가 매우 어렵다.

- 선정 (보안 순위)

  1. `scrypt` - 매우 민감한 정보를 다루고 보안 시스템에 많은 리소스를 투자할 수 있을 경우
  2. `bcrypt` - 매우 강력한 다이제스트를 쉽게 구현 + 레퍼런스 많음
  3. `PBKDF2-HMAC-SHA-256/SHA-512` - 서드파티 라이브러리에 의존하지 않으면서 구현 가능

- 상황에 맞게 사용하되, 일반적으로 bcrypt를 사용할 거 같다.

<br><br>

# Advanced

## Object-relational impedance mismatch란 어떤 개념인가요?

- RDBMS는 데이터를 테이블 형태로 표현하고 자바와 같은 객체지향 언어는 데이터를 상호 연결된 그래프로 표현하는데, 여기서 발생하는 부정합을 말한다.
  - 세분성(Granularity): 구조상 테이블 수 보다 더 많은 객체 모델이 있을 수 있다.
  - 상속성(Subtypes): RDBMS에는 상속이랑 개념이 없다
  - 동일성(Identity): RDBMS는 정황히 하나의 동일성을 보장하는 개념인 PK를 제공하지만 자바 객체는 동일성(==)뿐만 아니라 동등성(equals())을 모두 정의한다.
  - 연관성(Associations): 객체지향 언어에서 연관 관계는 단방향 참조로만 이루어지고, RDBMS는 FK 하나를 사용해서 양방향 참조를 가진다.
  - 데이터 탐색(Data Navigation): 자바는 객체 그래프 탐색 방식 사용, RDBMS에서는 이 방식이 비효율 적이기 때문에 JOIN을 사용해 엔티티를 불러와서 데이터를 탐색한다.
    <br><br>

## Foreign Key란 무엇인가요? 이것을 사용할 때의 장점과 단점은 무엇일까요?

- 다른 테이블의 컬럼과 관계를 맺을 때 기준이 되는 Key
- 장점
  - cascade 등 지원
  - 데이터의 무결성을 지켜준다.
- 단점
  - 복잡성이 증가한다.
  - I/O 발생 시 참조 무결성 검증을 위한 오버헤드 발생

<br><br>

## 이전에 쓰이던 해시함수들에는 어떤 것이 있을까요? 패스워드 해싱의 추세의 역사는 어떻게 이어져 왔나요?

- MD2/ 4/ 5, SHA-0/ 1/ 256/ 512, CRC, GOST, HACAL 등
- `MD5`, `sha-1`는 공격방법이 발견되었다.

<br><br>

# Note

### B+Tree?

- 리프 노드를 제외하고 데이터를 담아두지 않기 때문에 메모리를 더 확보함으로써 더 많은 key들을 수용할 수 있다. 하나의 노드에 더 많은 key들을 담을 수 있기에 트리의 높이는 더 낮아진다.(cache hit를 높일 수 있음)
- 풀 스캔 시, B+tree는 리프 노드에 데이터가 모두 있기 때문에 한 번의 선형탐색만 하면 되기 때문에 B-tree에 비해 빠르다. B-tree의 경우에는 모든 노드를 확인해야 한다.
