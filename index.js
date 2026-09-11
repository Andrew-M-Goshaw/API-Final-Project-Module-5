// Burger Menu
document.getElementById("burgerMenu").addEventListener("click", function () {
  const navLinks = document.getElementById("navLinks");
  navLinks.classList.toggle("active");
});

const apiKey = "92a7848e"; // Your OMDb API key
const searchInput = document.getElementById("search-input");
const loadingIndicator = document.getElementById("loading");
const resultsContainer = document.getElementById("results");
const yearRange = document.getElementById("yearRange");
const yearValue = document.getElementById("yearValue");
let movies = []; // Declare movies in a higher scope so it's accessible

function fetchMovies() {
  const query = searchInput.value.trim(); // Get and trim the user's input

  if (!query) {
    alert("Please enter a search term.");
    return;
  }

  const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
  loadingIndicator.style.display = "block";

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      loadingIndicator.style.display = "none";
      if (data.Response === "True") {
        movies = data.Search; // Store fetched movies in a global variable
        displayResults(movies); // Call displayResults with the fetched movies
      } else {
        alert(data.Error);
        resultsContainer.innerHTML = "";
      }
    })
    .catch((error) => {
      loadingIndicator.style.display = "none";
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

document.getElementById("search-button").addEventListener("click", fetchMovies);

// Consolidated displayMovies function for filtering by year
function displayMovies(year) {
  const filteredMovies = movies.filter((movie) => parseInt(movie.Year) <= year); // Filter movies
  const results = document.getElementById("results");
  results.innerHTML = ""; // Clear previous results

  filteredMovies.forEach((movie) => {
    const movieElement = document.createElement("div");
    movieElement.innerHTML = `
    <img src="${movie.Poster}" alt="${movie.Title}" />
      <h3>${movie.Title}</h3>
      <p>Year: ${movie.Year}</p>
    `;
    results.appendChild(movieElement);
  });
}

// Event Listener for the Slider
yearRange.addEventListener("input", () => {
  const year = parseInt(yearRange.value);
  yearValue.textContent = year; // Update the displayed year value
  displayMovies(year); // Call the displayMovies function with the selected year
});

// Initial Display
function initialDisplay() {
  displayMovies(parseInt(yearRange.value)); // Display movies based on the initial slider value
}
