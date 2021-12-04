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
    .catch((err) => {
      console.error(err);
      next(err);
    });
});

app.get('/api/grades', (req, res, next) => {
  const sql = `
    select * from "grades"
    `;
  db.query(sql)
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => {
      console.error(error);
      next(error);
    });
});

app.post('/api/grades', (req, res, next) => {
  const newGrade = req.body;
  const name = newGrade.name;
  const course = newGrade.course;
  const grade = newGrade.grade;
  if (!name) {
    return res.status(400).json({
      error: 'You must enter a name',
    });
  } else if (!course) {
    return res.status(400).json({
      error: 'You must enter a course',
    });
  } else if (!grade) {
    return res.status(400).json({
      error: 'You must enter a grade',
    });
  } else if (!parseInt(grade)) {
    return res.status(400).json({
      error: 'Grade must be a positive integer',
    });
  } else if (parseInt(grade) > 100) {
    return res.status(400).json({
      error: 'Grade cannot be larger than 100',
    });
  }
  const sql = `
    insert into "grades" ("name", "course", "grade")
    values ($1, $2, $3)
    returning *;
  `;
  const params = [name, course, grade];
  db.query(sql, params)
    .then((result) => res.status(201).json(result.rows[0]))
    .catch((error) => {
      console.error(error);
      next(error);
    });
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
