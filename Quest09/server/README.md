# Editor API Document

### 파일 목록 조회

- Request

  ```
  GET {URL}/file
  ```

<br>

- Response
  ```
  pass
  ```

<br><br>

### 파일 로드

- Request

  ```
  GET {URL}/file/:fileName
  ```

<br>

- Response
  ```
  pass
  ```

<br><br>

### 파일 생성

- Request

  ```
  POST {URL}/file

  body: {
    "fileName": string
  }

  ```

<br>

- Response
  ```
    pass
  ```

<br><br>

### 다른 이름으로 저장

- Request

  ```
  PUT {URL}/file/:fileName

  body: {
    "newFileName": string,
    "text": string
  }
  ```

<br>

- Response

  ```
  pass
  ```

<br><br>

### 파일 업데이트

- Request

  ```
  PUT {URL}/file/:fileName

  body: {
    "text": string
  }
  ```

<br>

- Response
  ```
  pass
  ```

<br><br>

### 파일 삭제

- Request

  ```
  DELETE {URL}/file/:fileName
  ```

<br>

- Response

  ```
  pass
  ```

<!-- <br><br>

| 동작               | Method | Path                 | Body                                           | Content-Type |
| ------------------ | ------ | -------------------- | ---------------------------------------------- | ------------ |
| 파일목록 조회      | GET    | {url}/file           | -                                              | -            |
| 파일 조회          | GET    | {url}/file/:filename | -                                              | -            |
| 파일 생성          | POST   | {url}/file           | { "fileName": 파일명 }                         | json         |
| 다른 이름으로 저장 | PUT    | {url}/file/:filename | { "newFileName": 새로운 파일명, "text": 내용 } | - json       |
| 파일 수정          | PUT    | {url}/file/:fileName | { "text" : 내용 }                              | json         |
| 파일 삭제          | DELETE | {url}/file/:fileName | -                                              | -            | -->
