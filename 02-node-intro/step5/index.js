// File upload
//https://www.npmjs.com/package/multer

var express = require('express')
var bodyParser = require('body-parser')
var multer = require('multer') // Handling multi-part forms
var fs = require('fs') // Handling files I/O


var app = express()
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ // for parsing application/x-www-form-urlencodeds
  extended: true
}))
app.use(express.static('public'))

//Save without filename & extension
//-----------------------
// var upload = multer({
//   dest: 'uploads/'
// })
//-----------------------

//Save with original filename & extension
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({
  storage: storage
})


// GET
app.get('/', function(req, res) {
  console.log("Got a GET request for the homepage")
    //  res.send('Hello GET')
  res.sendFile(__dirname + "/index.html")
})

// POST
app.post('/upload', upload.single('file'), function(req, res) {

  if (req.file) {
    console.dir(req.file)
    return res.end('Thank you for the file')
  }
  res.end('Missing file')
})

var server = app.listen(8080, function() {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)
})
