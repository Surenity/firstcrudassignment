var fs = require('fs')
var express = require('express')
var app = express()
var port = process.env.port || 8000;
var bodyParser = require('body-parser')

app.use(bodyParser.json())

//user/:name/:email/:(state)AZ
app.post('/users', function(req, res) {
  let body = req.body;
  // console.log(req.body)
  let rawData = fs.readFileSync('./storage.json', 'utf8');
  let parsedData = JSON.parse(rawData);
  // console.log(typeof rawData);
  // console.log(rawData);
  // console.log("******")
  // console.log(parsedData)
  parsedData.push(body);
  var putInJsonFile = fs.writeFileSync("./storage.json", JSON.stringify(parsedData));
  res.json(req.body);
});

app.get('/users', function(req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data) {
    res.json(JSON.parse(data))
  })
});

app.get('/users/:name', function(req, res) {
  fs.readFile('./storage.json', 'utf8', function(err, data) {
    let userData = JSON.parse(data)
    let foundUser = userData.filter((item) => {
      return item.name == req.params.name
    })
    res.json(foundUser)
  })
});

app.put('/users/:name', function(req, res) {
  let readData = fs.readFileSync('./storage.json', 'utf8')
  readData = JSON.parse(readData)

  for (let i = 0; i < readData.length; i++) {
    if (readData[i].name === req.params.name) {
      readData[i] = {
        name: req.body.name,
        age: req.body.age,
        state: req.body.state
      }
    }
  }
  console.log(readData)

  res.json(readData)
});

app.delete('/users/:name', function(req, res) {
  let readData = fs.readFileSync('./storage.json', 'utf8')
  readData = JSON.parse(readData)
  console.log(readData);
  for (let i = 0; i < readData.length; i++) {
    if (readData[i].name === req.params.name) {
      readData.splice(i, 1);
      break;
    }
  }
  console.log(readData);
  var json = JSON.stringify(readData)
  fs.writeFileSync('./storage.json', json, 'utf8')
  console.log(readData)

  res.json(readData)
});

app.listen(port, function() {
  console.log('Listening on', port);
});
