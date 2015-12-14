var express = require('express')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var mongoose = require('mongoose')
var path = require('path')

mongoose.connect('mongodb://dbadmin:305286@ds039504.mongolab.com:39504/dorm')
var dorm = new mongoose.Schema({
  namedormair: String,
  addressdormair: String,
  priceair: Number,
  pricefan: Number,
  contact: String,
  namecontact: String,
  distance: Number,
  emproomair: Number,
  emproomfan: Number,
  links : [{
  	Link : String
  }
  ],
  maps : String,
  etc: String
})
var admindb = mongoose.model('admin', {})
var dormdb = mongoose.model('dorm', dorm)
var id = ''
var app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')))
app.use('/detail', express.static(__dirname + '/public'))
app.use('/editdorm', express.static(__dirname + '/public'))

app.get('/database', function (req, res) {
  dormdb.find({}, function (err, done) {
    res.send(done)
  })
})
app.get('/dataslide', function (req, res) {
  dormdb.find({}, function (err, done) {
    res.send(done)
  })
})

app.get('/databasesortpricefan', function (req, res) {
  dormdb.find().sort({'pricefan':1}).exec(function (err, done) {
   res.send(done) 
  })
})
app.get('/databasesortpriceair', function (req, res) {
  dormdb.find().sort({'priceair':1}).exec(function (err, done) {
   res.send(done) 
  })
})
app.get('/databasesortdistan', function (req, res) {
  dormdb.find().sort({'distance':1}).exec(function (err, done) {
   res.send(done) 
  })
})

app.get('/detail/:id', function (req, res) {
  id = req.params.id
  console.log(id)

  res.sendfile('public/detail.html')
})
app.get('/detaildorm', function (req, res) {
  res.send(id)
})
app.get('/editdorm/:id', function (req, res) {
  id = req.params.id
  console.log(id)

  res.sendfile('public/edit.html')
})
app.get('/editdata', function (req, res) {
  res.send(id)
})
app.post('/public/admin', jsonParser, function (req , res) {
  if (req.body.username == 'admin' && req.body.password == 'admin')
    res.send(true)
  else res.send(false)
})
app.post('/public/add', jsonParser, function (req , res) {
  var insertdorm = new dormdb(req.body)
  insertdorm.save(function (err, data) {
    if (err)
      res.send(false)
    else
      res.send(true)
  })
})
app.post('/public/update', jsonParser, function (req , res) {
  console.log('data=' + req.body)
  dormdb.update({_id: req.body._id}, {$set: req.body}, function (err, done) {
    res.send(done)
  })
})
app.post('/database', function (req, res) {
  dormdb.remove({_id: req.body._id}).exec(function (err, results) {
    if (err) {
      res.status(500).send(err)
    } else {
      res.send(results)
    }
  })
})


app.listen(3000)
console.log('run in 3000')
