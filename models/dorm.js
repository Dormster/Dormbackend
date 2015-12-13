var restful = require('node-restful')
var mongoose = restful.mongoose

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
module.exports = restful.model('dormair', dorm)
