const apiKey = "92a7848e"; // Your OMDb API key
const searchInput = document.getElementById("search-input");
const loadingIndicator = document.getElementById("loading");
const resultsContainer = document.getElementById("results");

function fetchMovies() {
  const query = searchInput.value.trim(); // Get and trim the user's input

  // Only fetch if the query is not empty
  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

  // Show loading state
  loadingIndicator.style.display = "block";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        // Check if response is OK
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      loadingIndicator.style.display = "none"; // Hide loading state
      if (data.Response === "True") {
        displayResults(data.Search); // Call displayResults with the fetched movies
      } else {
        alert(data.Error); // Show error message from the API
        resultsContainer.innerHTML = ""; // Clear results
      }
    })
    .catch((error) => {
      loadingIndicator.style.display = "none"; // Hide loading state
      console.error("Error fetching movies:", error);
    });
}

function displayResults(movies) {
  resultsContainer.innerHTML = ""; // Clear previous results
  movies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.innerHTML = `
            <h3>${movie.Title}</h3>
            <p>Year: ${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title}">
        `;
    resultsContainer.appendChild(movieElement);
  });
}

// Assuming you have a button to trigger the fetchMovies function
document.getElementById("search-button").addEventListener("click", fetchMovies);

const yearRange = document.getElementById("yearRange");
const yearValue = document.getElementById("yearValue");
const movieList = document.getElementById("movieList");

async function displayMovies(searchTerm) {
  const movies = await fetchMovies(searchTerm);

  // Sort movies by year
  movies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));

  const movieList = document.getElementById("movieList");
  movieList.innerHTML = ""; // Clear previous results

  movies.forEach((movie) => {
    const movieItem = document.createElement("div");
    movieItem.innerHTML = `
            <h3>${movie.Title} (${movie.Year})</h3>
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
        `;
    movieList.appendChild(movieItem);
  });
}

// Call displayMovies with a search term, e.g. when a button is clicked
function displayMovies(year) {
  movieList.innerHTML = ""; // Clear Previous Results
  const filteredMovies = movies.filter((movie) => movie.year <= year);
  filteredMovies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.innerHTML = `
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    `;
    movieList.appendChild(movieElement);
  });
}

// Event Listener for the Slider
yearRange.addEventListener("input", () => {
  const year = parseInt(yearRange.value);
  yearValue.textContent = year;
  displayMovies(year);
});

//Initial Display
function display(movies) {}
