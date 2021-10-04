require("dotenv").config();
const express = require("express");
const app = express();

// Express Routes
/*app.get('/',(req,res)=>{
  res.json({
    message: 'Hello World'
  })
})

app.get('about',(req,res)=>{
  res.send('This is about our history')
}) */

// CROU IN ARRAY
let users = [];

// get all users, Request Method: Get
app.get("/users", (req, res) => {
  res.json(users);
});

// create new users, Request Method: POST
app.post("/users", (req, res) => {
  req.json(req)
});

// get user by id, Request Method: Get
app.get('/users/:id',(req, res) => {
  let user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) res.status(404).send('The user with the given ID was not found.');
  res.json(user);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
