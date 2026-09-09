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
