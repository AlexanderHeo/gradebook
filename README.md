# Student Grade Table

A crud app for teachers to record student grades

## Introduction

The Student Grade Table is a dynamic web application for teachers to record the grades of their students.

## Technologies Used

- JavaScript
- React JS
- Node JS
- Express JS
- HTML5
- CSS3
- PostgreSQL
- AWS EC2

## Features

- User can view all grades already recorded
- User can view average of all grades
- User can add new grades
- User can delete existing grade
- User can modify existing grade

## Preview

![SGT](sgt-react.gif)

# Development

## System Requirements

- Node.js 10 or higher
- npm 6 or higher
- PostgreSQL 10 or higher

## Getting Started

1. Clone the respository.

```
git clone https://github.com/AlexanderHeo/student_grade_table.git
```

```
cd student_grade_table
```

2. Install dependencies with npm.

```
npm install
```

3. Setup environment variables

copy the .env.example file and rename to .env

```
copy .env.example .env
```

edit .env with PostgreSQL credentials

4. Create a PostgreSQL database

```
createdb gradebook
```

5. Import database schema and data

```
psql [DATABASE_URL] < database/dump.sql
```

6. Start project

```
npm run dev
```

7. Open in your browser

```
localhost:5000
```
