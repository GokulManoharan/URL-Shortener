const mongoose = require('mongoose')

mongoose.Promise = global.Promise

mongoose.connect('mongodb://localhost:27017/my-apps-jan',{useNewUrlParser :true,useCreateIndex:true})
.then(function(){
    console.log('connected')
})
.catch(function(){
    console.log('error')
})

module.exports = {
    mongoose
}