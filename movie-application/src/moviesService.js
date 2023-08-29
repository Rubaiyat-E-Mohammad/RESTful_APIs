const axios = require('axios');

const getMovies = async (done) => {
  try {
    const response = await axios.get('http://localhost:3000/movies');
    done(null, response.data);
  } catch (error) {
    done(error);
  }
};

const getMoviesById = async (movieId, done) => {
  try {
    const response = await axios.get(`http://localhost:3000/movies/${movieId}`);
    done(null, response.data);
  } catch (error) {
    done(error);
  }
};

const saveMovie = async function (newMovie, done) {
  try {
    const response = await axios.post('http://localhost:3000/movies', newMovie);
    done(null, response.data);
  } catch (error) {
    done(error);
  }
};

const updateMovie = async function (movieId, updateData, done) {
  try {
    const response = await axios.put(`http://localhost:3000/movies/${movieId}`, updateData);
    done(null, response.data);
  } catch (error) {
    done(err, null);
  }
}

const deleteMovieById = async function (movieId, done) {
  try {
    const response = await axios.delete(`http://localhost:3000/movies/${movieId}`);
    done(null, response.data);
  } catch (error) {
    done(error);
  }
};

module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById,
};
