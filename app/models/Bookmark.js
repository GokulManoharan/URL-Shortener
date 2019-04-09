const mongoose = require('mongoose')
const validator = require('validator')
const sh = require('shorthash')

const Schema = mongoose.Schema

const bookmarkSchema = new Schema({
title :{
    type : String,
    required : true
},
originalUrl:{
    type : String,
    required : true,
    validate:{
        validator : function(value){
            return validator.isURL(value)
        },
        message:function(){
            return 'Invalid URL format'
        }
    }
},
tags:{
    type : Array,
    default : undefined
},
hashedUrl:{
    type : String
},
createdAt:{
    type : Date,
    default:Date.now
},
clicks:[
    {
        
        ipAddress:String,
        browserName:String,
        osType:String,
        deviceType:String

    }
]
})


bookmarkSchema.pre('save',function(next){
    const bookmark = this
    const hashUrl = sh.unique(bookmark.originalUrl)
    bookmark.hashedUrl = hashUrl
    next()
    
})

bookmarkSchema.statics.findByHash = function(hashedUrl){
    const Bookmark = this
    return BookMark.find({hashedUrl})
        .then(function(bookmark){
            if(bookmark)
            {
                return Promise.resolve(bookmark)
            }
            else{
                return Promise.reject('Hashed URL not found')
            }
           
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}

bookmarkSchema.statics.findByTag = function(tags){
    const BookMark = this
    return BookMark.find({tags})
        .then(function(bookmark){
            return Promise.resolve(bookmark)
        })
        .catch(function(err){
            return Promise.reject(err)
        })
}


// bookmarkSchema.statics.findByTags = function(tag1,tag2){
//     const BookMark = this
//     return BookMark.find({tags:{"$in":[tag1,tag2]}})
//         .then(function(bookmark){
//             return Promise.resolve(bookmark)
//         })
//         .catch(function(err){
//             return Promise.reject(err)
//         })
// }


const BookMark = mongoose.model('BookMark',bookmarkSchema)




module.exports = {
    BookMark
}