const request = require('request')

const apikey = process.env.API_KEY

module.exports = {
  getMovies: (req, res) => {
    res.render('movies')
  },
  newMovie: (req, res) => {
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
  }
}