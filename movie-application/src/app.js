const http = require('http');
const moviesService = require('./moviesService');
const getRequestData = require('./utils');

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET') {
    if (req.url === '/movies') {
      moviesService.getMovies((err, results) => {
        if(!err){
          res.setHeader(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(results));
        }else{
          res.setHeader(404, {'Content-Type': 'application/json'});
          res.end(err);
        }
      });
    } else if (req.url.startsWith('/movies/')) {
      const movieId = req.url.split('/')[2];
      moviesService.getMoviesById(movieId, (err, results) => {
        if(!err){
          res.setHeader(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(results));
        }else{
          res.setHeader(404, {'Content-Type': 'application/json'});
          res.end(err);
        }
      });
    }
  } else if (req.method === 'POST') {
    if (req.url === '/movies') {
      const newMovie = await getRequestData(req);
      moviesService.saveMovie(newMovie, (err, results) => {
        if(!err){
          res.setHeader(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(results));
        }else{
          res.setHeader(404, {'Content-Type': 'application/json'});
          res.end(err);
        }
      });
    }
  } else if (req.method === 'PUT') {
    if (req.url.startsWith('/movies/')) {
      const movieId = req.url.split('/')[2];
      const updateData = await getRequestData(req);
      moviesService.updateMovie(movieId, updateData, (err, results) => {
        if(!err){
          res.setHeader(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(results));
        }else{
          res.setHeader(404, {'Content-Type': 'application/json'});
          res.end(err);
        }
      });
    }
  } else if (req.method === 'DELETE') {
    if (req.url.startsWith('/movies/')) {
      const movieId = req.url.split('/')[2];
      moviesService.deleteMovieById(movieId, (err, results) => {
        if(!err){
          res.setHeader(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(results));
        }else{
          res.setHeader(404, {'Content-Type': 'application/json'});
          res.end(err);
        }
      });
    }
  }else if (req.method === 'PATCH') {
    if (req.url.startsWith('/movies/')) {
      const movieId = req.url.split('/')[2];
      const updateData = await getRequestData(req);
      moviesService.updateMovie(movieId, updateData, (err, results) => {
        if(!err){
          res.setHeader(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify(results));
        }else{
          res.setHeader(404, {'Content-Type': 'application/json'});
          res.end(err);
        }
      });
    }
  }else {
    res.statusCode = 404;
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.log('Port already in use');
  }
});
