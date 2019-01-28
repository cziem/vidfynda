require('../config/config')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const movieRouter = require('../routes/movie')

const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))
app.set('view engine', 'ejs')

let friendsList = ["Nora Ben", "Berna May", "Eazi Blancs", "Eddy Blinks"]

app.get('/', (req, res) => {
  res.render("home")
})

// Movie API
app.use('/movies', movieRouter)
app.use('/movieResults', movieRouter)


app.listen(port, () => console.log(`app running on localhost://${port}`))