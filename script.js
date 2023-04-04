const http = require('http');
const sql = require('mssql');

const config = {
  driver: 'JDBC Driver 17 for SQL Server',
  server: 'ML-RefVm-526995',
  database: 'GVV2',
  options: {
    trustedConnection: true
  }
};

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  const request = new sql.Request();
  
  request.query('SELECT * FROM ', (err, result) => {
    if (err) {
      console.log('Failed to execute query:', err);
      return;
    }
    
    res.write(`<pre>${JSON.stringify(result.recordset, null, 2)}</pre>`);
    res.end();
  });
});

sql.connect(config, err => {
  if (err) {
    console.log('Failed to connect to database:', err);
    return;
  }
  
  server.listen(8080, () => {
    console.log('Server listening on http://localhost:8080/');
  });
});
