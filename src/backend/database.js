const sqlite3 = require('sqlite3').verbose();

// Connect to the SQLite database (create it if it doesn't exist)
const db = new sqlite3.Database('./mydatabase.db');

// Create a table (example: listnames)
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS listnames (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    accesslevel TEXT,
    datecreate TEXT,
    icon TEXT
  )`);
});


function createUser(name, accesslevel, datecreate, icon) {
    db.run('INSERT INTO listnames (name,accesslevel, datecreate, icon) VALUES (?,?,?,?)', [name, accesslevel, datecreate, icon], (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
      } else {
        console.log('Data inserted successfully');
      }
    });
}

function getUsers(callback) {
  db.all('SELECT name FROM listnames', (err, rows) => {
    if (err) {
      console.error('Error retrieving data:', err.message);
      callback(err, null);
    } else {
      console.log('Data retrieved successfully');
      callback(null, rows);
    }
  });
}

function getFullUserInfo(name, callback) {
  db.get('SELECT * FROM listnames WHERE name = ?', [name], (err, row) => {
    if (err) {
      console.error('Error getting full user data:', err.message);
      callback(err);
    } else {
      console.log('Full user data retrieved successfully');
      callback(null, row); // Pass the user data to the callback
    }
  })
}

function getAllUsersWithAllInfo(callback) {
  db.all('SELECT * FROM listnames', (err, row) => {
    if (err) {
      console.error('Error getting all users data:', err.message);
      callback(err);
    } else {
      console.log('Full users data retrieved successfully');
      callback(null, row); // Pass the user data to the callback
    }
  })
}

module.exports = { createUser, getUsers, getFullUserInfo, getAllUsersWithAllInfo };
