import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Search() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(null);

  async function fetchMovies(searchID) {
    const {
      data: { Search },
    } = await axios.get(
      `https://www.omdbapi.com/?apikey=da79f3d4&s=${searchID}&page=1`
    );
    console.log(Search);
    setMovies(Search);
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Search</h1>
      <input
        type="text"
        placeholder="search for your movie"
        onChange={(event) => setSearch(event.target.value)}
        onKeyPress={(event) => {
          event.key === "Enter" && fetchMovies(search);
        }}
      />
      <button onClick={() => fetchMovies(search)}>Search</button>
      {search === null ? (
        <h1>Search for a movie...</h1>
      ) : (
        movies.map((movie, index) => (
          <Link to={movie.imdbID} key={index}>
            <div
              className="movie-card"
              style={{
                margin: "16px",
                border: "2px solid black",
                width: "30%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <h2>{movie.Title}</h2>
              <h3>{movie.Year}</h3>
            </div>
          </Link>
        ))
      )}
    </div>
  );
}

export default Search;
