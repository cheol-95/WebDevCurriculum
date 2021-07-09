const FsErrorEnum = Object.freeze({
  ENOENT: {
    status: 404,
    message: '파일이 존재하지 않습니다',
  },
  EXISTS: {
    status: 400,
    message: '이미 존재하는 파일명 입니다',
  },
});

export default (err, res) => {
  // 로깅 등 fs 에러 로직 추가

  const { status, message } = FsErrorEnum[err.code];
  return res.status(status).json(message);
};
