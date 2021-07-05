export default (err, res) => {
  // 로깅 등 validError 에러 로직 추가

  return res.status(err.status).json({
    label: err.label,
    message: err.message,
  });
};
