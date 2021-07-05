# Editor API Document

## 파일 목록 조회

- Request

  ```
  GET /file
  ```

<br>

- Response

  ```
  status: 200

  body: {
    "fileList": [
        "file1",
        "file2",
    ]
  }
  ```

<br>

## 파일 로드

- Request

  ```
  GET /file/:fileName
  ```

<br>

- Response

  ```
  status: 200

  body: {
    "fileName": "file1",
    "data": "Hello World"
  }
  ```

<br>

## 파일 생성

- Request

  ```
  POST /file

  body: {
    "newFileName": string
  }

  ```

<br>

- Response

  ```
  status: 201
  ```

<br>

## 다른 이름으로 저장

- Request

  ```
  POST /file/:fileName

  body: {
    "newFileName": string,
    "text": string
  }
  ```

<br>

- Response

  ```
  status: 200
  ```

<br>

## 파일 업데이트

- Request

  ```
  PUT /file/:fileName

  body: {
    "text": string
  }
  ```

<br>

- Response

  ```
  status: 200
  ```

<br>

## 파일 삭제

- Request

  ```
  DELETE /file/:fileName
  ```

<br>

- Response

  ```
  status: 200
  ```

<br><br><br>

# 질문

## `에러처리` 관련하여 질문드립니다.

저는 진행했던 프로젝트에서 에러처리를 다음와 같이 했었습니다.

```
1. 에러가 발생하는 부분에서 미리 정의해 둔 커스텀 에러 클래스의 인스턴스 생성 후 throw
2. 라우터에 적용한 wrapAsync 함수에서 next(err)
3. 메인 에러 핸들러에서 instanceOf를 사용해 어떤 커스텀 에러의 인스턴스인지 1차 분류
4. 내부적으로 소분류를 통해 구체적으로 어떤 에러인지 파악후 에러 로직 실행
```

<br>

제가 궁금한건 아래와 같습니다.

```
1. 위의 방법은 바람직한가?
2. 쌤께서 생각하시기에 더 나은 에러처리 방식
```
