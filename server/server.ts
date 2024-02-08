var express = require('express');
var app = express();
const path = require('path');
var url = require('url');

var bodyParser = require('body-parser');
const fs = require('fs');

app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

const SERVER_PORT = 4001;

// app.use('/css/*', express.static(path.join(__dirname, 'css')))
// app.use('/data/*', express.static(path.join(__dirname, 'data')))
// app.use('/js/*', express.static(path.join(__dirname, 'js')))

let mimeTypes = {
  "css": "text/css",
  "html": "text/html",
  "png": "image/png",
  "json": "application/json",
  "mp3": "audio/mpeg"
};

const getFileExtensionOrEmptyString = (filePath) => {
  const index = path.lastIndexOf('.');
  return (index < 0) ? '' : filePath.substr(index);
}

const getMimeType = (url) => {
  const ext = getFileExtensionOrEmptyString(url.pathname).replace('.', '');
  return mimeTypes[ext.toLowerCase()] || 'application/octet-stream';
};

const serveFile = (response, pathName, mime) => {
  fs.readFile(__dirname + '/' + pathName, function (err, data) {
    if (err) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      return response.end('Error loading ' + pathName + " with Error: " + err);
    }
    response.writeHead(200, { "Content-Type": mime });
    response.end(data);
  });
}

app.get('/css/*', function (req, res) {
  let options = url.parse(req.url, true);
  let mime = getMimeType(options);
  serveFile(res, options.pathname, mime);
});

app.get('/', function (req, res) {
  let options = url.parse(req.url, true);
  res.sendFile(path.join(__dirname, '/index.html'));
});

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