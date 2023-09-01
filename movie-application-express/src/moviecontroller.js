//import service layer
const movieservice = require('./movieservice')

const getMovies = (done) => {
//call service method getMovies method
 movieservice.getMovies(done)
}

const getMovieById = (movieId, done) => {
    //call service method getMovieById method
 movieservice.getMovieById(movieId, done)
}

const saveMovieDetails = (movieDetails, done) => {
  //call service method saveMovieDetails method
  movieservice.saveMovieDetails(movieDetails, done)
}

const updateMovieDetails = (movieId, movieDetails, done) => {
  //call service method updateMovieDetails method
 movieservice.updateMovieDetails(movieId, movieDetails, done)
}

const deleteMovieById = (movieId, done) => {
  //call service method deleteMovieById method
  movieservice.deleteMovieById(movieId, done)
}

module.exports = {
  getMovies, getMovieById, saveMovieDetails, updateMovieDetails, deleteMovieById
}
