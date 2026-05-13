function errorHandler(error, req, res, next) {
  console.error(error);

  const status = error.status || 500;
  res.status(status).render('errors/error', {
    title: 'Application error',
    message: status === 500 ? 'Something went wrong. Please try again.' : error.message
  });
}

module.exports = errorHandler;
