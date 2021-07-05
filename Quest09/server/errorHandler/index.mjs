const ErrorEnum = Object.freeze({
  ENOENT: {
    status: 404,
    message: '파일이 존재하지 않습니다',
  },
  EXISTS: {
    status: 400,
    message: '이미 존재하는 파일명 입니다',
  },
});

export const errorHandler = (err, req, res, next) => {
  if (err.code) {
    const { status, message } = ErrorEnum[err.code];
    return res.status(status).json(message);
  }

  next(err);
};
