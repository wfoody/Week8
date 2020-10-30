
const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')
const models = require('./models')
const {Op} = require('sequelize')

app.use(express.urlencoded())


app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')


app.get('/', (req, res) => {
    models.Album.findAll().then(albums => {
        res.render('index', {albums: albums})   
    })
})

app.get('/albums/:albumId', (req, res) => {
    
    const albumId = req.params.albumId
    
    models.Album.findByPk(albumId).then(album => {
        res.json(album)
    })
})

app.post('/add-album', (req, res) => {

    const name = req.body.name
    const review = req.body.review
    const year = req.body.year

    // building album object
    let album = models.Album.build({
        name: name,
        review: review,
        year: year
    })
    // saving album to the database
    album.save().then((savedAlbum) => {
        res.render('index', savedAlbum.dataValues)
    }).catch((error) => {
        res.render('error')
    })
})

app.post('/update-album', (req, res) => {

    const name = req.body.name
    const review = req.body.review
    const year = req.body.year
    const albumId = req.body.albumId

    models.Album.update({
        name: name,
        review: review,
        year: year
    }, {
        where: {
            id: albumId
        }
    }).then(updatedAlbum => {
        res.redirect('/albums')
    })
})


app.post('/delete-album', (req, res) => {

    const albumId = req.body.albumId
    models.Album.destroy({
        where: {
            id: albumId
        }
    }).then(deletedAlbum => {
        res.render('albums')
    })
})



app.listen(3000, () => {
    console.log('Server is running...')
})
// saving ***

// let album = models.Album.build({
//     name: 'Let It Be',
//     review: 'best Beatles album',
//     year: 1970

// })

// album.save().then((persistedAlbum) => {
//     console.log(persistedAlbum)
// })




//  finding all ****

// models.Album.findAll()
// .then((albums) => console.log(albums))





//  finding one ***

// models.Album.findByPk(1)
// .then((album) => console.log(album))


// passing in specific attributes ---  .findOne to find one, need to enter attributes

// models.Album.findAll({
//     where: {
//         id: 1
//     }
// }).then((album) => console.log(album))





//  updating ****

// models.Album.update({
//     name: 'Help'
// }, {
//     where: {
//         id: 1
//     }
// })





// deleting***
// models.Album.destroy({
//     where: {
//         id: 4
//     }
// })

