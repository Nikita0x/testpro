const express = require('express');
const app = express();
const cors = require('cors')
const {createUser, getUsers, getFullUserInfo, getAllUsersWithAllInfo} = require('./database')
app.use(cors())
app.use(express.json())

// Define a port for your server
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//create new user
app.post('/api/createUser', (req, res) => {
  try {
    const { name, accesslevel, datecreate, icon } = req.body;

      // Check if all required fields are provided
      if (!name || !accesslevel || !datecreate || !icon) {
        return res.status(400).json({ error: 'All fields are required' });
      }

         // Call the createUser function to insert data into the database
        createUser(name, accesslevel, datecreate, icon);
        return res.status(201).json({ message: 'User created successfully' });

  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' });
  }


})

//get users name
app.get('/api/getUsers', (req, res) => {
  try {
    getUsers((err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Error retrieving users' });
      }
      res.json(data);
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving users' });
  }
})

//get full info with a user name 
app.get('/api/getFullInfoAboutUser/:name', async (req, res) => {
  try {
    const {name} = req.params;
    getFullUserInfo(name, (err, userData) => {
      if(err) {
        console.error('Error getting full user data:', err.message);
        return res.status(500).json({ error: 'Error retrieving user data' });
      }
      res.json(userData)
    })
    
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
})

//get all users with all info
app.get('/api/getAllUsersWithAllInfo', async (req, res) => {
  try {
    getAllUsersWithAllInfo((err, userData) => {
      if(err) {
        console.error('Error getting full users data:', err.message);
        return res.status(500).json({ error: 'Error retrieving users data' });
      }
      res.json(userData)
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' });
  }
})