var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const SERVER_PORT = 4004;

app.post('/', function (req, res) {
  console.log(`${req.method} request received from ${req.originalUrl} ${req.ip} : ${req.protocol}`);
  console.log(`content type ${req.get('Content-Type')}`);
  //console.log(`content type ${req.get('content-type')}`);
  console.log(JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(SERVER_PORT);