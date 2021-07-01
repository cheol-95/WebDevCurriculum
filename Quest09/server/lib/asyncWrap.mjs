export const asyncWrap = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (err) {
      console.log('에러!! : ', err);
      next(err);
    }
  };
};
