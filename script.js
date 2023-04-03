npm install mysql
const express = require('express');
const mysql = require('mysql');

const app = express();

// Define the Google Cloud SQL configuration
const config = {
  user: 'cis455vgg',
  password: 'CIS$%%',
  database: 'VGG455',
  socketPath: '/cloudsql/gifted-airport-382516:us-west3:cis455vgg,
};

// Define the SQL query to retrieve data from the database
const query = 'SELECT ProductName, UnitPrice, UnitsInStock, CategoryName FROM `gifted-airport-382516.Categories.Products`, `gifted-airport-382516.Categories.Category` WHERE `gifted-airport-382516.Categories.Products`.CategoryID = `gifted-airport-382516.Categories.Category`.CategoryID';

// Create a route that returns the data in JSON format
app.get('/data', (req, res) => {
  const connection = mysql.createConnection(config);
  connection.query(query, function (error, results, fields) {
    if (error) {
      console.error(error);
      res.status(500).send('Internal server error');
    } else {
      res.json(results);
    }
    connection.end();
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
