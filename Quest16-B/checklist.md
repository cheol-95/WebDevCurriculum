# Quest 16-B. 컨테이너

## 컨테이너는 어떻게 동작하나요? 다른 배포판을 사용할 수 있게 하는 원리가 무엇일까요?

- `Container`는 리눅스 커널을 공유하면서 프로세스를 시스템의 나머지 부분과 격리된 환경에서 실행하는 기술이다.
- 기존의 Virtual Machine(VMWare)는 환경별로 각 `Guest OS`를 가상화(하드웨어 가상화)하여 자원소모가 심했지만, 컨테이너는 커널을 공유하는 방식이기 때문에 실행 속도가 빠르고 성능상의 손실이 거의 없다.
- `리눅스 네임스페이스`, `컨트롤 그룹`, `루트 디렉터리` 격리 등의 커널 기능을 활용해 격리되어 실행된다. 이러한 격리 기술 덕분에 호스트 머신에게는 프로세스로 인식되지만, 컨테이너 관점에서는 마치 독립적인 환경을 가진 가상 머신처럼 보인다.
  - 마치 독립된 스택공간을 가지고 있고 나머지 메모리 공간은 공유하는 쓰레드 같네요

<br>
- 각 컨테이너 별로 관련 라이브러리 및 종속된 항목들을 함께 패키지로 묶어 소프트웨어 서비스 구동을 위한 격리 환경을 만들어 준다. 따라서 각각의 컨테이너는 독립적으로 실행되기 때문에 다른 배포판을 사용할 수 있다.
- 이러한 프로세스를 실행하는 데 필요한 모든 파일은 고유한 이미지이서 제공되므로, Linux 컨테이너는 개발 단계에서 테스트, 프로덕션에 이르기까지 이식성과 일관성을 유지할 수 있다.

<br>
- 운영체제 수준의 가상화, 빠른 속도와 효율성, 높은 이식성, stateless 등의 장점이 있다.

<br><br>

## 도커 컨테이너에 호스트의 파일시스템이나 네트워크 포트를 연결하려면 어떻게 해야 할까요?

- 도커 이미지로 커밋하지 않고 컨테이너가 종료되면 그 동안 발생한 컨테이너 내부의 변경사항이 모두 손실된다. 따라서 변경사항이 저장될 수 있도록 변경사항이 저장될 수 있도록 로컬 호스트 시스템의 디렉토리를 도커 컨테이너 내부에 마운트한 공유 디렉토리 상에서 작업을 수행할 수 있다.
- `-v` 혹은 `--volume`옵션을 추가하여 도커 컨테이너의 디렉토리와 공유 디렉토리를 마운트한다.

  ```
  절대경로
  docker run -it -v <host system directory>:<container directory> [IMAGE NAME]

  명령이 실행되는 현재 경로(unix)
  docker run -it -v $PWD:<container directory> [IMAGE NAME]
  ```

<br>

- 각 container에는 통신을 위한 인터페이스가 새롭게 할당되어 `MAC 주소와 private IP`도 부여 받게 되고, 자신들이 상주하고 있는 Docker host와 통신을 위해 `Linux Bridge` 방식으로 바인딩 되어있다.
- 도커는 docker host가 iptables 의 NAT를 사용하지 못하는 상황을 대비해 `docker-proxy`를 사용하여 외부에서 들어온 요청을 내부의 container로 넘긴다.
- `-p` 옵션을 추가하여 컨테이너 포트를 외부로 노출시킨다.

  ```
  docker run -p <외부 IP>:<컨테이너 IP> --name <set container name>
  ```

<br><br>

## 도커 컨테이너에서 런타임에 환경변수를 주입하려면 어떻게 해야 할까요?

- 도커 이미지를 빌드할 때 사용하는 Dockerfile에 초기 환경변수를 설정할 수 있다. 이 때 설정한 환경변수는 RUN, CMD 등의 명령에 적용된다.
  ```
  ENV <환경변수이름> <값>
  ```

<br>

- 도커 이미지를 이용해 컨테이너를 만들 때마다 다른 환경변수를 주입하는 방법.
  ```
  ENV <환경변수이름> <값>
  docker run -e <환경변수이름>=<값>
  ```

<br>

- docker-compose

  ```
  server:
    environment:
      - <환경변수이름>=<값>
      - <환경변수이름>=<값>
  ```

  <br>

  > 위의 방법들을 사용하며 `호스트의 시스템 환경변수`를 주입하고 싶다면 `값`을 입력하지 않는다.

  ```
  ENV <환경변수이름>

  docker run -e <환경변수이름>

  server:
    environment:
      - <환경변수이름>
  ```

<br>

- .env : 실행하는 위치에 .env 파일 생성

  ```
  $ cat .env
  TAG=v1.5

  $ cat docker-compose.yml
  version: '3'
  services:
    web:
      image: "webapp:${TAG}
  ```

- env file

  ```
  docker run --env-file=FILE

  [FILE]
  server:
    env_file:
      - server.env
  ```

- 우선 순위
  ```
  1. Compose file
  2. Shell environment variables
  3. Environment file
  4. Dockerfile
  5. Variable is not defined
  ```

ex)

- 설정

  ```
  $ cat ./Docker/api/api.env
  NODE_ENV=test

  $ cat docker-compose.yml
  version: '3'
  services:
    api:
      image: 'node:6-alpine'
      env_file:
      - ./Docker/api/api.env
      environment:
      - NODE_ENV=production
  ```

- 실행

  ```
  $ docker-compose exec api node

  > process.env.NODE_ENV
  'production'
  ```

  <br><br>

## 도커 컨테이너의 stdout 로그를 보려면 어떻게 해야 할까요?

- `실시간`으로 보려면 docker logs를 사용한다.
- tail, timestamps, details, follow, since 등의 옵션을 제공한다.

  ```
  docker logs <컨테이너 명>

  docker logs <컨테이너 명> --tail <rows>
  ```

- `json-file` 로깅 드라이버를 사용하여 json 파일로 저장할 수 있다.
  - --log-opt 옵션으로 로그파일의 최대 크기와 개수를 지정해야 한다.
- `Fluentd` 로그를 수집 및 저장하는 오픈소스 도구로, 도커 엔진에서 fluentd를 통해 저장할 수 있는 공식 로깅 드라이버를 제공한다. 도커 서버에서 발생하는 로그를 fluentd 서버로 전송하고, fluentd 서버는 지정된 저장소(DB등)으로 로그를 전송한다.

<br><br>

## 실행중인 도커 컨테이너에 들어가 bash 등의 쉘을 실행하고 로그 등을 보려면 어떻게 해야 할까요?

- 컨테이너에 특정 명령을 실행할 수 있는 `exec` 명령을 사용하며 bash를 실행한다.
  ```
  docker exec -it <컨테이너 명> /bin/bash
  ```

<br><br>

# Advanced

## 도커 외의 컨테이너 기술의 대안은 어떤 것이 있을까요?

### OPENVZ

- Linux 커널에 컨테이너 관련 기술이 충분히 구현되지 않은 오래전부터 Linux 커널에 패치 컨테이너를 구현한 것이다.
- OpenVZ와 그것을 바탕으로 한 상용 소프트웨어 인 페러럴즈의 `Virtuozzo` 는 이전부터 전세계의 호스팅 서비스에서 널리 사용되어 왔으며, 현재에도 널리 사용되고 있는 안정적인 상용 소프트웨어다.

<br>

### LIBVIRT

- 가상 머신을 수행 공통 API를 제공하는 라이브러리에서 다양한 가상화를 지원한다.

<br><br>

## 맥이나 윈도우에서도 컨테이너 기술을 사용할 수 있는 원리는 무엇일까요?

- 컨테이너가 가진 다음과 같은 특성으로 인해 사용할 수 있다.

  - 바이너리, 라이브러리, 종속성, 구성 파일 등 애플리케이션을 실행하기 위해 필요한 모든 것을 갖추고 있으며 모두 컨테이너에 캡슐화되고 격리되어 있음
  - 애플리케이션 컨테이너화는 기본 리소스에 대해 제한된 액세스 권한을 통해 호스트 운영 체제로부터 컨테이너를 간소화한 것으로, 경량의 가상 머신과 유사함
  - 베어 메탈, 클라우드, VM 내부 등 다양한 유형의 인프라스트럭처에서 컨테이너화된 애플리케이션을 실행할 수 있으며 각 환경에 맞춰 리팩토링할 필요가 없음

- 이식성과 관련된 특징을 살펴보면 `컨테이너는 호스트 OS에서 추출하여 실행 가능한 소프트웨어 패키지를 생성`한다. 이는 호스트 OS에 종속되거나 의존하지 않으면서 이식이 가능하게 하고 모든 플랫폼이나 클라우드 전반에서 일관되고 통일되게 실행되도록 한다. -> 도커의 역할

<br><br>

# Note

- Bridge?
  - 두 개의 이더넷 세그먼트를 연결하기 위해 사용
