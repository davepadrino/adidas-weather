const errorHandler = (res, errorMessage, errorCode = 400) =>
  res.status(errorCode).json({
    ok: false,
    error: errorMessage
  });

module.exports = errorHandler;
