const heading = document.getElementById("heading")
const btnSign = document.getElementById("btnSign")
const form = document.getElementById("form")
const formBtn = document.getElementById("formBtn")
const username = document.getElementById("username")
const user = document.getElementById("user")

btnSign.addEventListener("click", ()=>{
form.style.display = "flex"
btnSign.style.display = "none"
})

formBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    form.style.display = "none"
    btnSign.style.display = "none"
    user.style.display = "flex"
    user.textContent = username.value
})

document.getElementById('searchButton').addEventListener('click', async function() {
   
    heading.style.display = "none"
    const searchTerm = document.getElementById('searchInput').value.trim();
    const movieDetails = document.getElementById('movieDetails');
    const errorMessage = document.getElementById('errorMessage');
    const loadingSpinner = document.getElementById('loadingSpinner');
    movieDetails.style.display = "flex"
    movieDetails.style.gap = "15px"
    movieDetails.style.justifyContent = "center"
movieDetails.style.overflow = "none"
    movieDetails.classList.add('hidden');
    errorMessage.textContent = '';
    loadingSpinner.classList.remove('hidden');

    if (!searchTerm) {
        errorMessage.textContent = 'Please enter a movie title.';
        loadingSpinner.classList.add('hidden');
        return;
    }

    try {
        const response = await fetch(`https://www.omdbapi.com/?t=${searchTerm}&apikey=acd6921c`);

        if (!response.ok) {
            throw new Error('Failed to fetch movie details.');
        }

        const data = await response.json();

        if (data.Response === 'False') {
            throw new Error(data.Error);
        }

        // Populate movie details
        document.getElementById('moviePoster').src = data.Poster !== "N/A" ? data.Poster : "placeholder.svg";
        document.getElementById('movieTitle').textContent = data.Title;
        document.getElementById('moviePlot').textContent = data.Plot;
        document.getElementById('movieYear').textContent = data.Year;
        document.getElementById('movieRating').textContent = data.imdbRating;
        document.getElementById('movieGenre').textContent = data.Genre;
        document.getElementById('movieDirector').textContent = data.Director;
        document.getElementById('movieActors').textContent = data.Actors;
        document.getElementById('movieRuntime').textContent = data.Runtime;
        document.getElementById('movieReleased').textContent = data.Released;

        movieDetails.classList.remove('hidden');
    } catch (error) {
        errorMessage.textContent = error.message;
    } finally {
        loadingSpinner.classList.add('hidden');
    }
     
});
