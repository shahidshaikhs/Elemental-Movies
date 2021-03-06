const express = require('express');
const axios = require('axios');

// Initialize Express
const app = express();

// Initialize Dotenv
require('dotenv').config();

// Initialize EJS
app.set('view engine', 'ejs');

// Setting static directory as public
app.use(express.static(__dirname + '/public'));

// Body Parser stuff
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  axios
    .get(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.APIkey}&language=en-US&page=1`)
    .then(response => {
      res.render('home', { data: response.data.results });
      console.log(response.data.results);
    })
    .catch(err => {
      console.log(`Error occured ${err}`);
    });
});

app.get('/movie/:id', (req, res) => {
  const movieid = req.params.id;
  axios
    .get(`https://api.themoviedb.org/3/movie/${movieid}?api_key=${process.env.APIkey}&language=en-US`)
    .then(response => {
      res.render('movie', { data: response.data });
    })
    .catch(err => {
      console.log(`Error occured ${err}`);
    });

});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port: ${process.env.PORT}`);
});
