export default (err, res) => {
  // 로깅 등 validation 에러 로직 추가

  return res.status(400).json(err.response);
};
