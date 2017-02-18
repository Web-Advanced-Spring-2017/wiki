// Request & Response
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencodeds
app.use(express.static('public'))

// GET
app.get('/', function(req, res) {
  console.log("Got a GET request for the homepage")
  //  res.send('Hello GET')
  res.sendFile(__dirname + "/index.html")
})

// POST
app.post('/form-submit', function(req, res) {
  // Prepare output in JSON format
  response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name
  }
  console.log(response)
  res.end(JSON.stringify(response))
})

var server = app.listen(8080, function() {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
