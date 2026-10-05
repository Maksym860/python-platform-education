function notFound(req, res, next) {
  res.status(404).json({ message: `Маршрут не знайдено: ${req.originalUrl}` });
}

function errorHandler(err, req, res, next) {
  console.error('[Error]', err.message);
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    message: err.message || 'Внутрішня помилка сервера'
  });
}

module.exports = { notFound, errorHandler };
