const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const coursesRouter = require('./routes/courses');
const modulesRouter = require('./routes/modules');
const lessonsRouter = require('./routes/lessons');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || '*' }));
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Interactive Python Platform API працює' });
});

app.use('/api/courses', coursesRouter);
app.use('/api/modules', modulesRouter);
app.use('/api/lessons', lessonsRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
