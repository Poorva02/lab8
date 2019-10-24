const express = require('express');
const redis = require('redis');
const cookieParser = require('cookie-parser');
const axios = require('axios');

const client = redis.createClient();

const app = express();
app.use(cookieParser());
const port = 3001;

app.use((req, res, next) => {
  console.log(req.cookies);
  
  const body = {
    username: req.cookies.username,
    password: req.cookies.password,
  };
  const key = req.cookies.username + '_' + req.cookies.password;

  client.get(key, (err,cachedValue) => {
    console.log(err);
    console.log(cachedValue);

    if(cachedValue !== null){
      console.log('cache hit');
      if(cachedValue === 'true'){
        return next();
      }
    }
    else{
      console.log('cache miss');
      axios.post("http://localhost:3002/service2/", body)
    .then(res => {
      if (res.data.valid) {
        client.set(key, 'true', 'EX', 3000);
        return next();
        // document.cookie = `username=${username}`; //set cookies with key/value pairs
        // document.cookie = `password=${md5(password)}`; //set cookies with key/value pairs
      } else {
        client.set(key, 'false', 'EX', 3000);
        res.status(403);
        return res.send('You need access to this endpoint!');
      }
      console.log(res);
    })
    .catch(console.log);
    }
  });

  

 

app.get('/service1/*', (req, res) => {
  console.log(req.cookies)
  //client.set('myKey', 'myValue', 'EX', 3000);
  res.send("ads");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))