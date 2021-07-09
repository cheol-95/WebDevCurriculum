export default (err, next) => {
  err.from = 'validError';
  err.response = {
    label: err.details[0].context.key,
  };

  switch (err.details[0].type) {
    case 'any.required':
      err.response.message = `${err.response.label} 값을 입력하세요`;
      break;

    case 'string.base':
      err.response.message = `${err.response.label} 은 문자만 입력 가능합니다`;
      break;

    case 'string.empty':
      err.response.message = `${err.response.label} 에 공백은 허용되지 않습니다`;
      break;

    default:
      err.response.message = `${err.response.label} 은 잘못된 값입니다.`;
      break;
  }

  next(err);
};

export const login = async (req, res, next) => {
  try {
    const bodySchema = Joi.object({
      id: Joi.string().required(),
      pw: Joi.string().required(),
    });

    await bodySchema.validateAsync(req.body);
    next();
  } catch (err) {
    setValidError(err, next);
  }
};
