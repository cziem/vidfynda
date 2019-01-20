require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
const movieRouter = require('../routes/movie')

const port = process.env.PORT || 3000
const apikey = process.env.API_KEY

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

app.post('/movieResults', (req, res) => {
  let movieName = req.body.find_movie
  const uri = `http://www.omdbapi.com/?apikey=${apikey}&s=${movieName}`

  request(uri, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const data = JSON.parse(body)
        if (data.Response.toLowerCase() === 'false') {
          res.render('error', { data: data.Error })
        } else {
          res.render('results', { data })
        }
      }
    })
})

app.listen(port, () => console.log(`app running on localhost://${port}`))