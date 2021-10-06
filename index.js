require("dotenv").config();
const bodyParser = require("body-parser");
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
  users.push(req.body);
  res.status(201).json(req.body);
});

// get user by id, Request Method: Get
app.get('/users/:id',(req, res) => {
  let user = users.find(user => user.id === parseInt(req.params.id));
  if (!user) res.status(404).send('The user with the given ID was not found.');
  res.json(user);
})

//
app.put("/users/:id",(req,res)=>{
  let userIndex = user.findIndex((user)=> user.id === parseInt(req.params.id));
  if(userIndex > users.length){
    return res.status(404).json({
      error:'User Not Found'
    })
  }
  users[userIndex]['name'] = req.body.name;
  users[userIndex]["email"] = req.body.email;
  users[userIndex]["address"] = req.body.address;
  res.json(req.body);
});

// DELETE
app.delete('/users/:id',(req,res)=>{
  let userIndex = user.findIndex((user) => user.id === parseInt(req.params.id));
  if (userIndex > users.length) {
    return res.status(404).json({
      error: "User Not Found",
    });
  }

  users.splice(userIndex,1);
  res.status(204).json({message:"The user has been deleted"});
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
