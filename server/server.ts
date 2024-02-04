var express = require('express');
var app = express();

const SERVER_PORT = 4004;

app.post('/', function (req, res) {
  console.log('POST request to homepage');
  console.log(req);
  console.log(res);
});

app.listen(SERVER_PORT);