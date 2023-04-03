const express = require('express');
const sql = require('mssql');

const app = express();

// Define the MSSQL configuration
const config = {
  user: 'cis455vgg',
  password: 'CIS$%%',
  server: ':34.106.124.233,1433',
  database: 'VGG455',
  options: {
    encrypt: true // Use encryption
  }
};

// Define the SQL query to retrieve data from the database
const query = 'SELECT ProductName, UnitPrice, UnitsInStock, CategoryName FROM `gifted-airport-382516.Categories.Products`, `gifted-airport-382516.Categories.Category` WHERE `gifted-airport-382516.Categories.Products`.CategoryID = `gifted-airport-382516.Categories.Category`.CategoryID';

// Create a route that returns the data in JSON format
app.get('/data', (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal server error');
      return;
    }

    // Create a request object and execute the SQL query
    const request = new sql.Request();
    request.query(query, (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Internal server error');
        return;
      }

      // Return the results in JSON format
      res.json(result.recordset);

      // Close the MSSQL connection
      sql.close();
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
