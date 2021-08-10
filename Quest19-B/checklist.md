# Quest 19-B. 서버 아키텍쳐 패턴

### 마이크로서비스 아키텍쳐란 무엇일까요? 어떤 식으로 서비스를 구성할 수 있을까요? 어떤 장점을 가지고 있을까요?

- 어플리케이션을 핵심 기능으로 세분화하는 방식으로, 독립적으로 구축하고 배포한다.
- 분산환경을 관리하기 위한 계획을 세우고 실제 구현은 리눅스 컨테이너를 사용하여 각 서비스를 모둘화한다.
- 장점
  - `출시 기간 단축` : 개발 주기가 단축되기 때문에 배포 및 업데이트가 빨라진다.
  - `높은 확장성` : 특정 서비스에 대한 수요가 증가하면 여러 서버 및 인프라에 배포할 수 있다.
  - `뛰어난 복구 능력` : 서비스간의 간섭이 없기 때문에 한 서비스에 문제가 발생해도 다른 서비스는 문제되지 않는다.
  - `손쉬운 배포` : 각 서비스가 모둘화되고 규모가 작아졌기 때문에 배포에 따르는 우려사항들이 사라졌다.
  - `편리한 액세스` : 하나의 큰 어플리케이션을 분할했기 때문에 각 서비스를 파악하고 업데이트하며 개선하기가 용이해졌다.
  - `향상된 개방성` : 독립적인 환경 즉, 다중 언어를 지원하기 때문에 취향에 맞는 언어와 프레임워크를 선택할 수 있다.

<br><br>

### 서버리스 아키텍쳐란 무엇일까요? 어떤 식으로 서비스를 구성할 수 있을까요? 어떤 장점을 가지고 있을까요?

- 클라우드에 추상화 되어있는 서버를 사용하기 때문에 서버를 관리할 필요 없이 어플리케이션을 빌드하고 실행할 수 있도록 하는 클라우드 네이티브 개발 모델이다.
- 클라우드 제공업체가 서버 인프라에 대한 `프로비저닝, 유지 관리, 스케일링` 등의 일상적인 작업을 처리하며, 개발자는 배포를 위해 코드를 `컨테이너`에 패키징한다.
- 배포되고 나면 필요에 따라 자동으로 스케일 업되거나 스케일 다운된다. 서버리스 오퍼링은 일반적으로 이벤트 기반 실행 모델을 통해 온디맨드로 미터링된다. 그러므로 유휴 상태일 때는 아무런 비용도 들지 않는다.
- 장점
  - `높은 생산성` : 서버 프로비저닝 및 관리와 같은 일상 업무의 부담을 줄여, 개발자 생산성을 높이고 운영 비용을 줄일 수 있다.
  - `낮은 비용` : 항상 자체 서버를 실행하고 관리하는 대신 필요한 만큼 클라우드 기반 컴퓨팅 시간에 대해 비용을 지불한다.

<br><br>

### AWS Lambda는 어떤 서비스일까요? 이러한 서비스는 어떤 특징을 가지고, 어디에 쓰일 수 있을까요?

- `Lambda`는 서버를 프로비저닝하거나 관리하지 않고도 코드를 실행할 수 있는 컴퓨팅 서비스, 즉 `Serverless`다.
- Lambda는 고가용성 컴퓨팅 인프라에서 코드를 실행하고 `서버 및 운영 체제 유지 관리, 용량 프로비저닝 및 자동 확장, 코드 모니터링 및 로깅`을 비롯한 모든 컴퓨팅 리소스 관리를 수행한다.
- 특징
  - 하루에 몇 개의 요청에서 초당 수천개 까지 자동 확장
  - 실행시간 기준으로 요금 책정
- 쓰임새
  - S3 및 DynamoDB같은 AWS 서비스에 대한 데이터 처리 트리거를 빌드한다.
  - Kinesis에 저장된 스트리밍 데이터를 처리한다.
  - AWS의 성능 및 보안으로 작동하며 특정한 기능을 제공하는 백엔드를 만든다. ex) 이메일, 푸시알림 전송, 인증로직 등 (MSA에서 공통된 기능을 처리하기에 좋을 것 같다)

<br><br>

### API Gateway는 어떤 서비스인가요? 어떤 설정을 할 수 있을까요?

- 규모와 관계없이 REST 및 WebSocket API를 생성, 게시, 유지, 모니터링 및 보호하기 위한 AWS 서비스다.
- AWS 또는 다른 웹 서비스를 비롯해 AWS 클라우드에 저장된 데이터에 액세스하는 API를 생성할 수 있고, 외부에 공개할 수 있다.

<br><br>

### 많은 마이크로서비스들을 복잡하게 연결할 경우 관리상에 어떤 난점이 생길 수 있을까요? 서비스 메쉬는 무엇이고 이러한 난점을 어떻게 해결하려는 시도일까요?

- 여러 서비스에 걸쳐져있는 로직의 경우 비지니스 트랜잭션을 유지하기 힘들다.
- 어떠한 장애가 발생했을 때, 원인이 되는 서비스를 추적하기가 힘들다.
- 장애 전파 현상이 발생할 수 있다.
  - Client -> A 서비스 -> B 서비스 관계에서, B 서비스에 장애가 발생하면 A 서비스도 장애가 발생한다. 이를 장애 전파 현상이라고 한다.

<br><br>

### `Service Mesh`

- `개요`
  - 어플리케이션의 다양한 부분(서비스)들이 서로 데이터를 공유하는 방식을 제어하는 방법으로, 서비스 간 커뮤니케이션을 관리하는 다른 시스템들과 달리, 어플리케이션에 구축된 전용 인프라 계층이다.
  - 서비스 메쉬에서는 요청이 자체 인프라 계층의 프록시를 통해 마이크로서비스 간에 라우팅된다. 이러한 이유로 서비스 메쉬를 구성하는 개별 프록시는 서비스 내부가 아니라 각 서비스와 함께 실행되므로 `sidecar`라고 한다.
  - 각 서비스에서 분리된 `Sidecar` 프록시들이 모여 메쉬 네트워크를 형성한다.

<br>

- `커뮤니케이션 최적화`
  - 서비스 메쉬는 `서비스 간 커뮤니케이션의 모든 부분을 성능 메트릭으로 캡처`하기 때문에 복잡한 마이크로서비스 아키텍처 내에서 문제가 발생한 지점을 찾아 낼 수 있다.
  - 시간이 경과함에 따라 서비스 메쉬에서 볼 수 있는 데이터는 서비스 간 커뮤니케이션에 대한 룰에 적용할 수 있으며 보다 효율적이고 안정적으로 서비스 요청을 전달할 수 있다.
  - ex) 서비스에 장애가 발생한 경우, 복구까지의 시간을 수집해 최적의 대기시간을 지정해 불필요한 재시도를 줄인다.

<br>

- `주요 기능`
  - 각 서비스는 `사이드카로 배치된 경량화되고 L7계층기반의 proxy`를 사용하며, 이 프록시들은 중앙집중화된 컨트롤러(`Control Plane`)으로 관리된다.
  - `Jaeger`를 통해 분산 요청 추적은 서비스와 함께 가시적인 인프라 계층을 형성하므로 문제를 손쉽게 인식하고 진단할 수 있다.
  - 장애가 발생한 서비스로부터 요청을 재라우팅할 수 있기 때문에 다운타임 발생 시 어플리케이션 복구 능력이 향상된다.
  - 시스템 성능 메트릭을 통해 런타임 환경에서 커뮤니케이션 최적화 방법을 제안할 수 있다.

<br><br>