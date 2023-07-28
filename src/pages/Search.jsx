import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import Loading from "../components/Loading";

function Search({
  movies,
  setMovies,
  loading,
  search,
  setSearch,
  displayBtn,
  setDisplayBtn,
  nextPage,
  page,
  setPage,
  fetchNextPage,
  searchButtonEnter,
}) {
  const [height, setHeight] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [loadingBottom, setLoadingBottom] = useState(false);

  async function fetchMovies(search, page) {
    try {
      setLoadingBottom(true);
      const {
        data: { Search },
      } = await axios.get(
        `https://www.omdbapi.com/?apikey=da79f3d4&s=${search}&page=${page}`
      );
      if (Search) {
        setLoadingBottom(false);
        setMovies((prevMovies) => [...prevMovies, ...Search]);
        fetchNextPage(search, page);
      }
    } catch (error) {
      console.error("error fetching data:", error);
      setLoadingBottom(false);
    }
  }

  useEffect(() => {
    function changeHeight() {
      setHeight(
        document.documentElement.scrollHeight -
          document.documentElement.scrollTop
      );
      setScroll(document.documentElement.clientHeight);
    }
    window.addEventListener("scroll", changeHeight);
    return () => {
      window.removeEventListener("scroll", changeHeight);
    };
  }, []);

  useEffect(() => {
    if (height - scroll <= 200 && nextPage) {
      loadMoreButton();
    }
  }, [height, scroll]);

  function loadMoreButton() {
    setPage(page + 1);
    fetchMovies(search, page + 1);
    console.log(nextPage);
  }

  return (
    <div className="row">
      <section className="search__section">
        <div className="search__header">
          <h1 className="search__h1">Search</h1>
          <p>Search for a movie, series or TV show.</p>
        </div>

        <SearchBar
          setSearch={setSearch}
          searchButtonEnter={searchButtonEnter}
          style="search__container search__container--search"
        />

        {loading ? (
          <div className="search__movie-cards">
            <Loading />
          </div>
        ) : movies === undefined ? (
          <h1>
            Couldn't find what you were looking for. Please try another title.
          </h1>
        ) : search === null ? (
          <></>
        ) : (
          <div className="search__movie-cards">
            {movies.map((movie, index) => (
              <div className="search__movie-card-outer" key={index}>
                <div className="search__movie-card-inner">
                  <Link to={movie.imdbID} className="search__movie-card-poster">
                    <h2>{movie.Title}</h2>
                    <h3>{movie.Year}</h3>
                    <div className="search__movie-card-poster--img" style={{backgroundImage: `url(${movie.Poster})`}}></div>
                  </Link>
                  <div className="search__movie-card--text">
                    <Link to={movie.imdbID}>
                      <h2 className="search__movie-card--title">
                        {movie.Title}
                      </h2>
                    </Link>
                    <Link to={movie.imdbID}>
                      <h3 className="search__movie-card--title">
                        {movie.Year}
                      </h3>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {loadingBottom ? <Loading /> : <></>}
          </div>
        )}
      </section>
    </div>
  );
}

export default Search;
