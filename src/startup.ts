var fs = require('fs')

const inputFile = 'index.html'

var http = require("http");
var server = http.createServer();
server.listen(8000);
var ipAddress = server.address().address;
server.close();
console.log(`Determined IP address ${ipAddress}`);
fs.readFile(inputFile, 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  var result = data.replace(/${host}/g, 'replacement');

  fs.writeFile(inputFile, result, 'utf8', function (err) {
     if (err) return console.log(err);
  });
});

