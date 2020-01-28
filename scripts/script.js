const APIkey = 'bf8d8c39210feaa4f5257edcddc7451a';
const upcomingList = document.querySelector('.movies-grid')

const createGuestSession = async apikey => {
  const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new?api_key=bf8d8c39210feaa4f5257edcddc7451a');
  const data = response.json();
  return data;
};

createGuestSession(APIkey)
  .then(data => {
      localStorage.setItem("guest_session_id", data.guest_session_id);
  })
  .catch(err => {
      console.log(`Error occured while fetching data`);
  });


const getUpcomingMovies = async (apikey) =>{
    const response = await fetch('https://api.themoviedb.org/3/movie/upcoming?api_key=bf8d8c39210feaa4f5257edcddc7451a&language=en-US&page=1');
    const data = response.json();
    return data;
}

getUpcomingMovies(APIkey).then(data =>{
    createUpcomingList(data)
}).catch(err =>{
    console.log(`Error occured while fetching upcoming movies`);
});

const createUpcomingList = (data) =>{
    console.log(data.results);
    let listItem = '';
    data.results.forEach(movie => {
        console.log(movie);
        listItem += `
        <div class="movies-card">
        <div class="movies-img" style="background-image:url('https://image.tmdb.org/t/p/w500${movie.poster_path}')">
        </div>
        <h1 class="movie-title">${movie.title}</h1>
        <p class="movie-overview">${movie.overview.substring(1, 100)}</p>
      </div>
    `

    console.log(`https://image.tmdb.org/t/p/w500${movie.poster_path}'`);
    });

    upcomingList.innerHTML = listItem
}
