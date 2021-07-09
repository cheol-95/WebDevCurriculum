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
