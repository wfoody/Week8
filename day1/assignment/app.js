const express = require('express')
const app = express ()
const pgp = require('pg-promise')()

const connectionString = 'postgres://localhost:5432/mydatabase'

const db = pgp(connectionString)

const mustacheExpress = require('mustache-express')
app.use(express.urlencoded())

app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')





app.get('/', (req, res) => {
    
    db.any('SELECT post_id, title, body, date_created, date_updated, is_published FROM posts;')
    .then(posts => {
       // console.log("FETCHED POSTS")
        res.render('index',{posts: posts})
    })
})

app.post('/add-album', (req, res) => {

    const albumName = req.body.albumName 
    const albumReview = req.body.albumReview 
    const date_created = req.body.date_created
    const is_published = req.body.is_published
    
    /* INSERT INTO users(first_name, last_name, age) VALUES('George', 'Doe', 45);  */
    
    db.none('INSERT INTO posts(title, body, date_created, is_published) VALUES($1,$2,$3,$4)',[albumName, albumReview, date_created, is_published])
    .then(() => {
       // do something after inserted successfully! 
       res.redirect('/')
    })
    
 })  

app.listen(3000, () => {
    console.log('Server is running...')
})
