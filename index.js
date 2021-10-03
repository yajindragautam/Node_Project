const express = require('express');
const app = express();

app.get('/',(req,res)=>{
  res.json({
    message: 'Hello World'
  })
})

app.get('about',(req,res)=>{
  res.send('This is about our history')
})

app.listen(3000);

