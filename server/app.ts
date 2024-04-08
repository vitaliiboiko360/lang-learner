const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));