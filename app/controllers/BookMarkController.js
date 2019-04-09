const express = require('express')
const router = express.Router()
const {BookMark} = require('../models/Bookmark')


router.post('/bookmarks',function(req,res){
    const body = req.body
    const bookmark = new BookMark(body)
    bookmark.save()
        .then(function(bookmark){
            res.send(bookmark)
        })  
        .catch(function(err){
            res.send(err)
        })
})

router.get('/bookmarks/:id',function(req,res){
    const id = req.params.id
    BookMark.findById(id)
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })

})

router.get('/bookmarks',function(req,res){
    BookMark.find()
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.put('/bookmarks/:id',function(req,res){
    const body = req.body
    const id = req.params.id
    BookMark.findByIdAndUpdate(id,body,{new: true})
        .then(function(bookmark){
            res.send({
                bookmark,
                notice : 'Update successful'
            })
        })
        .catch(function(err){
            res.send(err)
        })
    })

router.delete('/bookmarks/:id',function(req,res){
    const id = req.params.id
    BookMark.findByIdAndDelete(id)
        .then(function(bookmark){
            res.send({
                bookmark,
                notice :'Bookmark deleted successfully'
            })
        })
})

router.get('/:hash',function(req,res){
    const hashedUrl = req.params.hash
    BookMark.findByHash(hashedUrl)
        .then(function(bookmark){
             res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.get('/bookmarks/tags/:name',function(req,res){
    const tags = req.params.name
    BookMark.findByTag(tags)
        .then(function(bookmark){
            res.send(bookmark)
        })
        .catch(function(err){
            res.send(err)
        })
})

// router.get('/bookmarks/tags/:name1,:name2',function(req,res){
//     const tag1 = req.params.name1
//     const tag2 = req.params.name2

//     BookMark.findByTags(tag1,tag2)
//         .then(function(bookmark){
//             res.send(bookmark)
//         })
//         .catch(function(err){
//             res.send(err)
//         })
// })
module.exports = {
    bookmarksRouter : router
}