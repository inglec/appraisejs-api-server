const express = require('express');
const httpStatus = require('http-status-codes');
const sql = require('mysql');

const setupExpress = () => {
  app.use((req, res, next) => {
    // Setup mySQL database connection.
    res.locals.connection = sql.createConnection({
      database: 'test',
      host: 'localhost',
      user: 'root'
    });
    res.locals.connect();

    next();
  });
  app.use('/', index);
  app.use('/api/v1/users', users);

  // GET routes.
  app.get('/', (req, res) => {
    res.locals.connection.query('SELECT * from users', (error, results, fields) => {
      if (error) {
        throw error;
      }

      res.status(httpStatus.OK);
      res.send(JSON.stringify(results));
      res.end();
    });
  });
};

function main() {
  setupExpress();
}

main();
