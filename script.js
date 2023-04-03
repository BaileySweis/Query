const config = {
  user: 'cis455vgg',
  password: 'CIS$%%',
  database: 'Categories',
  socketPath: '/cloudsql/gifted-airport-382516:us-west3:cis455vgg',
};

// Define the SQL query to retrieve data from the database
const query = 'SELECT ProductName, UnitPrice, UnitsInStock, CategoryName FROM `gifted-airport-382516.Categories.Products`, `gifted-airport-382516.Categories.Category` WHERE `gifted-airport-382516.Categories.Products`.CategoryID = `gifted-airport-382516.Categories.Category`.CategoryID';

// Retrieve the data from the database using the Google Cloud SQL library for Node.js
const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.query(query, function (error, results, fields) {
  if (error) {
    console.error(error);
  } else {
    // Display the retrieved data on the webpage
    const resultsDiv = document.getElementById('results');
    results.forEach((result) => {
      const resultDiv = document.createElement('div');
      resultDiv.innerHTML = `ID: ${result.id} - Name: ${result.name}`;
      resultsDiv.appendChild(resultDiv);
    });
  }
  connection.end();
});
