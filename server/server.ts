const express = require('express');
const app = express();
const path = require('path');
const url = require('node:url');

const bodyParser = require('body-parser');
const fs = require('fs');


const resourceList = require('./data/list_of_texts.json')

app.use(express.json({
  type: ['application/json', 'text/plain']
}))
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

app.use(function (req, res, next) {
  //Accept-Ranges: bytes
  res.setHeader('Accept-Ranges', 'bytes');
  res.setHeader('Connection', 'keep-alive');
  next();
});

const SERVER_PORT = 4001;

let mimeTypes = {
  "css": "text/css",
  "html": "text/html",
  "png": "image/png",
  "json": "application/json",
  "mp3": "audio/mpeg"
};

const getFileExtensionOrEmptyString = (filePath) => {
  const index = filePath.lastIndexOf('.');
  return (index < 0) ? '' : filePath.substr(index);
}

const getMimeType = (urlpath) => {
  const ext = getFileExtensionOrEmptyString(urlpath).replace('.', '');
  return mimeTypes[ext.toLowerCase()] || "application/octet-stream";
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

app.get(['/css/*', '/data/*', '/js/*'], function (req, res) {
  console.log(`${req.method} (css|data|js) ${req.originalUrl} ${req.ip} : ${req.protocol}`);
  let urlpath = req.path[req.path.length - 1] == '/' ? req.path.slice(0, req.path.length - 1) : req.path
  let mime = getMimeType(urlpath);
  serveFile(res, urlpath, mime);
});

app.get(['', '/:resource'], function (req, res) {
  console.log(`${req.method} request received from ${req.originalUrl} ${req.ip} : ${req.protocol}`);
  // const resource = req.param('resource');
  // console.log(`${resource}`);
  let resource = req.params['resource'] ? req.params['resource'].replace('/', '') : '';
  if (req.path === '' || req.path === '/' || resourceList.texts.some(item => item.resource === resource)) {
    console.log(`we served index.html for resource: ${resource}`);
    res.sendFile(path.join(__dirname, '/index.html'));
    return;
  }
  console.log(`we cut this request returned 404`);
  return res.sendStatus(404);
});

// app.get('/', function (req, res) {
//   let urlpath = req.path.replace('/', '');
//   res.sendFile(path.join(__dirname, '/index.html'));
// });

app.post('/:updatedResource', function (req, res) {
  const updatedResource = req.params['updatedResource'];
  if (!resourceList.texts.some(item => item.resource === updatedResource)) {
    console.log(`${req.method} request received from ${req.originalUrl} ${req.ip} : ${req.protocol} : ${req.get('Content-Type')}`);
    console.log(`returned 403`);
    res.sendStatus(403);
    return;
  }

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