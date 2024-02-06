var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const fs = require('fs');

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

  const data = req.body;

  console.log(`resource is ${data.resource}`);
  const fileName = './data/' + data.resource + '.json';

  function updateFile(fileName, fileContent, newData) {
    const oldContent = JSON.parse(fileContent);
    let lines = oldContent.lines;
    let newLines = lines.map((line, index) => {
      let newLine = line;
      newLine.start = newData.data[index].start;
      newLine.end = newData.data[index].end;
      return newLine;
    });

    let jsonToWrite = oldContent;
    jsonToWrite.lines = newLines;
    console.log(`before writeFile`);

    fs.writeFile(fileName, JSON.stringify(jsonToWrite), function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(`file ${fileName} was saved`);
    });

  }

  fs.readFile(fileName, function read(err, fileData) {
    if (err) {
      console.error(err);
      return;
    }
    const content = fileData;

    updateFile(fileName, content, data);
  });


  res.sendStatus(200);
});

app.listen(SERVER_PORT);