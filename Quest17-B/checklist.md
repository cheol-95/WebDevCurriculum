# Quest 17-B. 배포 파이프라인

## CI/CD는 무엇일까요?

### CI - 지속적 통합

- 자동화된 빌드 및 테스트가 수행된 후, 개발자가 코드 변경 사항을 중앙 레파지토리에 정기적으로 병합하는 데브옵스 소프트웨어 방식이다.
- 소프트웨어 릴리즈 프로세스 중 빌드 또는 통합 단계를 주로 가리키며, 자동화 구성 요소와 문화정 구성 요소 모두를 포함한다.
- CI의 목표는 `버그를 신속하게 찾아 해결`하고, `소프트웨어 품질을 개선`하고, 새로운 소프트웨어 업데이트 검증 및 릴리스하는데 `걸리는 시간을 단축`한다.
- CI는 소프트웨어 릴리스 프로세스 중 `빌드 및 유닛 테스트 단계`를 지칭한다. 수정 버전이 커밋될 때마다 자동화된 빌드 및 테스트가 트리거 된다.

<br>

### CD - 지속적 전달

- 프로덕션에 릴리스하기 위한 코드 변경이 자동으로 준비되는 소프트웨어 개발 방식으로, `빌드 단계 이후의 모든 코드 변경을 테스트 환경 및 프로덕션 환경에 배포`함으로써 지속적 통합을 확장한다.
- CD에는 개발자가 단순한 유닛 테스트 외에 `UI 테스트, 로드 테스트, 통합 테스트, API 안정성 테스트 등`이 포함될 수 있다.
- `온프레미스와는 달리` 클라우드에서는 여러의 테스트 환경을 손쉽게 구축하여 효율적으로 테스트할 수 있다.
- 모든 코드 변경이 빌드 및 테스트된 후, 비프로덕션 테스트 또는 스테이징 환경으로 푸시된다.
- 프로덕션 배포 전에 여러 개의 병렬 테스트 단계가 있을 수 있으며 `CI와의 차이점은 프로덕션 업데이트에 대한 최종 승인 여부`이다.

<br><br>

## CI/CD 시스템을 구축하면 어떤 장점이 있을까요?

- 자동화로 인한 생산성 향상
- 빈번한 테스트로 인해 버그 검출
- 빠른 업데이트 제공

<br><br>

## CI 시스템인 Travis CI, Jenkins, Circle CI, Github Actions, AWS Codebuild 의 차이점과 장단점은 무엇일까요?

### Jenkins

- java로 만들어짐
- 무료 및 오픈소스
- 다양한 언어 지원
- 확장성이 뛰어남
- 강력한 커뮤니티
- AWS, GCP, Azure 등 인기있는 클라우드와 호환
- 병렬로 작업을 수행하고 복잡한 CD 요구사항 실현

<br>

### Travis CI

- Ruby로 만들어짐
- 오픈 소스 프로젝트
- 다양한 언어 지원
- 더 많은 보안 관련 기능을 위한 Travis CI Enterprise 제공
- AWS, GCP, Azure 등 인기있는 클라우드와 호환
- 빌드 매트릭스 기능을 사용하여 다양한 환경, 언어 및 런타임으로 구성된 다양한 조합에서 병렬 빌드를 수행
-

<br>

### Circle CI

- YAML 구문을 사용
- CircleCI Cloud(클라우드) 기반 / CircleCI Server(온 프레미스) 기반 제품
- 설정이 쉽고 Github, Bitbucket 등과 같은 인기있는 버전 제어 시스템과 함께 사용 가능
- 빌드 시간을 줄이기 위해 여러 컨테이너에서 빌드를 분할하고 조절 가능
- CI/ CD 파이프라인을 워크 플로로 제공
- 여러 실행 프로그램에서 병렬로 테스트를 실행
- 타이밍 데이터를 사용하여 테스트를 분리
- AWS, GCP, Azure 등 인기있는 클라우드와 호환

<br>

### Github Actions

- 2018년 등장
- Github와 완전히 통합
- Github Repo에서 직접 사용자 지정 SDLC 워크 플로우를 쉽게 생성
- 위의 이점에 따라 공개된 CI 템플릿 중에서 선택 가능
- 소프트웨어 개발 방식을 생성, 공유, 재사용 및 포크 가능
- Docker에 대한 지원을 추가하여 다중 컨테이너 테스트를 수행
- 모든 개인 Repo에 대해 월별 2000분 무료 빌드 시간 제공

<br>

### AWS Codebuild

- 설정이 간편하다.
- 설치형 CI 도구를 사용할 때 겪는 문제들을 피할 수 있고 다른 AWS 서비스들과의 연동이 용이
- CI 도구 자체의 서버 관리하지 않아도 된다.
- 각 작업의 실헹환경을 분리하여 독립적으로 관리한다.

<br><br>