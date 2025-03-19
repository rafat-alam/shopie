const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'instagram',
  password: '1122',
});

let queryrunner = (q, placeholder) => {
  try {
    connection.query(q, [placeholder], (err, res) => {
      if(err) throw err;
      console.log(res);
    });
  } catch(err) {
    console.log(err);
  }
}

let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(),
  ];
}

let q = "INSERT INTO user (id, username, email, password) VALUES ?;";
let data = [];
for(let i=0; i<100; i++) {
  data.push(getRandomUser());
}
queryrunner(q, data);

connection.end();
