require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const movieRouter = require('../routes/movie')

const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

let friendsList = ["Nora Ben", "Berna May", "Eazi Blancs", "Eddy Blinks"]

app.get('/', (req, res) => {
  res.render("home")
})

app.get('/friends', (req, res) => {
  res.render('friends', { friends: friendsList })
})

app.post('/addFriend', (req, res) => {
  const friend = req.body.friend
  friendsList.push(friend)
  res.redirect('/friends')
})

app.get('/posts', (req, res) => {
  let posts = [
    { title: "Things we do for love", author: "Lovern Ralf" },
    { title: "Asthetics and Approach", author: "Rulda Wliaz" },
    { title: "Difinitive Guide to Design", author: "Marqueze Jerry" },
    { title: "All For One", author: "Stella Grand" },
    { title: "The Grannys", author: "Bezos" }
  ]

  res.render("post", { posts })
})

// Movie API
app.use('/movies', movieRouter)
app.use('/movieResults', movieRouter)


app.listen(port, () => console.log(`app running on localhost://${port}`))