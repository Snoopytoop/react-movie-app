import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function Movie() {
  const { movie } = useParams();

  const [film, setFilm] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchMovies() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://www.omdbapi.com/?apikey=da79f3d4&i=${movie}&plot=full`
      );
      setLoading(false);
      console.log(data);
      setFilm(data);
    } catch (error) {
      console.error("error fetching data:", error);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <Link to="/search">
        <h1>Go back</h1>
      </Link>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div>
          <h1>{film.Title}</h1>
          <p>{film.Plot}</p>
        </div>
      )}
    </div>
  );
}

export default Movie;
