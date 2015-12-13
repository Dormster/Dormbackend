var express = require('express')
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var mongoose = require('mongoose')

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
  etc: String
})
var admindb = mongoose.model('admin', {})
var dormdb = mongoose.model('dorm', dorm)

var app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(express.static('public'))

app.get('/database', function (req, res) {
  dormdb.find({}, function (err, done) {
    res.send(done)
  })
})

app.post('/public/admin',jsonParser, function(req , res){
	if(req.body.username === "admin"&& req.body.password === "admin")
		res.send(true)
	else res.send(false)
})
app.post('/public/add',jsonParser, function(req , res){
	var insertdorm = new dormdb(req.body)
	insertdorm.save(function(err,data){
	if(err)
	 	res.send(false)
	else 
	res.send(true)
	})
})
app.delete('/database',jsonParser, function(req , res){
	console.log(req.body)
})

//app.use('/api', require('./routes/api'))
app.listen(3000)
console.log('run in 3000')
