-- This file creates the listed tables and entries on Heroku Postgres
-- cat init.sql | heroku pg:psql postgresql-whatever-00000 --app example-node-api
CREATE TABLE books (
  ID SERIAL PRIMARY KEY,
  author VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL
);

INSERT INTO books (author, title)
VALUES  ('J.K. Rowling', 'Harry Potter');
