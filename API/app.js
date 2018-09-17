var express = require('express');
var app = express();
var request = require('request');

const apiKey = "30518d029801cf3dfd400a78f69a0cce"
const baseURL = "https://api.themoviedb.org/3"

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/movies', function(req, res) {
  var page = req.query.page;
  var getMoviesList = baseURL + '/discover/movie?' + 
      'api_key=' + apiKey +
      '&language=en-US' +
      '&sort_by=popularity.desc' +
      '&include_adult=false' +
      '&include_video=false' +
      '&page=' + page;
  
  request(getMoviesList, function (error, response, body) {
    if (response.statusCode == 200) { 
      var json = JSON.parse(response.body);
      var movies = json.results.map(function(item) {
          return {
            id: item.id,
            title: item.title,
            releaseDate: item.release_date,
            image: item.poster_path
          };
      });
      res.send(movies);
    }
    else{
      res.status(response.statusCode).send(error);
    }
  });
});

app.get('/movie/:id', function(req, res) {
  var movieId = req.params.id;
  var getMovieDetails = baseURL + '/movie/' + movieId + '?' + 
      'api_key=' + apiKey +
      '&language=en-US';
  
  request(getMovieDetails, function (error, response, body) {
    if (response.statusCode == 200) { 
      var json = JSON.parse(response.body);
      var movie =  {
            id: json.id,
            title: json.title,
            releaseDate: json.release_date,
            image: json.poster_path,
            description: json.overview
      };
      res.send(movie);
    }
    else{
      res.status(response.statusCode).send(error);
    }
  });
});

app.listen(process.env.PORT || 5000, function () {
  console.log('App is listening on port 5000');
});
