var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'localhost',
  password : '',
  database : 'HealthCard'
});
 
connection.connect();
 
var ins= 'select * from Patient'
connection.query(ins, function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[1].id);
});
 
connection.end();