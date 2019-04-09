const express = require('express')
const {mongoose} = require('./config/database')
const {bookmarksRouter} = require('./app/controllers/BookMarkController')
const app = express ()
const port = 3000

app.use(express.json())
app.use('/',bookmarksRouter)

app.listen(port,function(){
    console.log('Listening on the port ', port)
})


