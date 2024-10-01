const heading = document.getElementById("heading")

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

// const searchButton = document.getElementById('searchButton');
// const searchInput = document.getElementById('searchInput');
// const movieDetails = document.getElementById('movieDetails');
// const heading = document.getElementById('heading');

// searchButton.addEventListener('click', async () => {
//     // Remove content before the search bar (heading and other content)
//     heading.style.display = 'none';

//     const searchTerm = searchInput.value.trim();
//     if (searchTerm === "") {
//         movieDetails.innerHTML = `<p class="error">Please enter a valid movie title.</p>`;
//         return;
//     }

//     // Clear previous movie details
//     movieDetails.innerHTML = '';

//     try {
//         const response = await fetch(`https://www.omdbapi.com/?t=${searchTerm}&apikey=your_api_key`);
//         if (!response.ok) {
//             throw new Error("Failed to fetch data");
//         }
        
//         const data = await response.json();
//         if (data.Response === "False") {
//             throw new Error(data.Error);
//         }

//         // Display movie details
//         movieDetails.innerHTML = `
//             <img src="${data.Poster !== "N/A" ? data.Poster : 'placeholder.jpg'}" alt="${data.Title}">
//             <h2>${data.Title} (${data.Year})</h2>
//             <p><strong>Plot:</strong> ${data.Plot}</p>
//             <p><strong>Director:</strong> ${data.Director}</p>
//             <p><strong>Actors:</strong> ${data.Actors}</p>
//             <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
//         `;
//     } catch (error) {
//         movieDetails.innerHTML = `<p class="error">${error.message}. Please try another movie.</p>`;
//     }
// });
