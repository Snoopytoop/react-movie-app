import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Rating from "../components/Rating";

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
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <section className="movie__section">
          <div className="movie__img--wrapper">
            <img src={film.Poster} alt="" className="movie__img" />
          </div>
          <div className="movie__text--wrapper">
            <h1>{film.Title}</h1>
            <p className="movie__text--para">{film.Plot}</p>
            <ul>
              <li className="movie__text--li">
                <p className="movie__text--li-para">
                  <span className="bold">Relase date: </span>
                  {film.Released}
                </p>
              </li>
              <li className="movie__text--li">
                <p className="movie__text--li-para">
                  <span className="bold">Languages: </span>
                  {film.Language}
                </p>
              </li>
              <li className="movie__text--li">
                <p className="movie__text--li-para">
                  <span className="bold">Genres: </span>
                  {film.Genre}
                </p>
              </li>
              <li className="movie__text--li">
                <p className="movie__text--li-para">
                  <span className="bold">Actors: </span>
                  {film.Actors}
                </p>
              </li>
              <li className="movie__text--li">
                <p className="movie__text--li-para">
                  <span className="bold">Runtime: </span>
                  {film.Runtime}
                </p>
              </li>
              <li className="movie__text--li">
                <p className="movie__text--li-para">
                  <span className="bold">IMDB Rating: </span>
                  <Rating film={film} />
                </p>
              </li>
            </ul>
          </div>
        </section>
      )}
    </>
  );
}

export default Movie;
