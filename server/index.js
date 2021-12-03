require('dotenv/config');

const express = require('express');
const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);
app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then((result) => res.json(result.rows[0]))
    .catch((err) => next(err));
});

app.get('/api/grades', (req, res, next) => {
  const sql = `
    select * from "grades"
    `;
  db.query(sql)
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => next(error));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occured',
    });
  }
});

app.listen(process.env.PORT, () => {
  /* eslint-disable no-console */
  console.log(`Listening on port ${process.env.PORT}, yo`);
});
