## 파일 관리 질문

개인 프로젝트를 진행하며 많이 고민했었던 기억이 있어 이렇게 질문 남깁니다. <br>
저는 사용자의 프로필 이미지나, 스터디의 이미지를 관리할 때 다음과 같이 관리했었습니다.

```
1. 특정한 확장자만 허용 (png, jpg 등)
2. uuid.v4를 사용해서 서버만 알고있는 파일명 부여 { uuid: 유저가 지정해서 올린 파일명 }
3. DB에 [`userId, uuid, 유저가 지정해서 올린 파일명`] 매핑
   - ex) [1, uuid, map.jpg]
```

<br>

위의 과정을 통해 아래와 같은 이점을 가져올 수 있었습니다.

```
1. 스크립트 파일 등 미심쩍은 파일은 거부함으로써 보안에 도움이 됨
2. 서버 어플리케이션도 DB를 거치지 않으면 누구의 파일인지 알 수 없음
3. 사용자가 요청한 파일명을 사용해 URL로 접근 불가
   - ex) https://www.knowre.com/image/map.jpg (x)

```

<br>

제가 궁금한점은 아래와 같습니다.

```
1. 위의 방법은 바람직한가?
2. 쌤께서 지향하시는 방법과 현재 노리에서 사용중인 방식은?
3. 현재 jwt를 사용해 앱 가입자인지 확인하는 방식으로 이미지 요청 API의 권한을 제한하고 있습니다. 만약 다른 유저의 uuid를 우연히 알아낸다면 url만 수정해 다른 유저의 이미지를 열람할 수 있는데 이는 어떻게 생각하시나요?
```

피드백 부탁드리겠습니다. <br>
감사합니다.
