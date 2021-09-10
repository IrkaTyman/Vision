const mysql = require('mysql2');
const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'L7TlNly1PtEWKrY',
  database:'experimentVI'
})

connection.connect((error) => {
  if(error){
    return console.log('Error mysql'+error)
  } else {
    return console.log('good mysql')
  }
})

module.exports = connection
