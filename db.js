const mongoose = require("mongoose");


var mongoURL = 'mongodb+srv://ravi:ravi1234@cluster0.qfqgqqw.mongodb.net/mern-rooms'

mongoose.connect(mongoURL , {useUnifiedTopology : true , useNewUrlParser:true})

var connection = mongoose.connection


connection.on('error', ()=>{
    console.log('Mongo Db Connection Failed')
})

connection.on('connected', ()=>{
    console.log('Mongo Db Connection Approved')
})

module.exports = mongoose

