const customLoginError = (message) => {
  return {
    errors: [
      {
        message,
        extensions: {
          code: 'INTERNAL_SERVER_ERROR',
        },
      },
    ],
  };
};

module.exports = {
  customLoginError,
};
