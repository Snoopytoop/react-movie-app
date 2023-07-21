import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Search() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const [nextPage, setNextPage] = useState();
  const [height, setHeight] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingBottom, setLoadingBottom] = useState(false);
  const [displayBtn, setDisplayBtn] = useState(true);

  async function fetchMoviesInitial(search, page) {
    try {
      setLoading(true);
      const {
        data: { Search },
      } = await axios.get(
        `https://www.omdbapi.com/?apikey=da79f3d4&s=${search}&page=${page}`
      );
      setLoading(false);
      setMovies(Search);
      fetchNextPage(search, page);
      setDisplayBtn(true);
    } catch (error) {
      console.error("error fetching data:", error);
      setLoading(false);
    }
  }

  async function fetchMovies(search, page) {
    try {
      setLoadingBottom(true);
      const {
        data: { Search },
      } = await axios.get(
        `https://www.omdbapi.com/?apikey=da79f3d4&s=${search}&page=${page}`
      );
      setLoadingBottom(false);
      setMovies((prevMovies) => [...prevMovies, ...Search]);
      fetchNextPage(search, page);
    } catch (error) {
      console.error("error fetching data:", error);
      setLoadingBottom(false);
    }
  }

  async function fetchNextPage(search, page) {
    const {
      data: { Search },
    } = await axios.get(
      `https://www.omdbapi.com/?apikey=da79f3d4&s=${search}&page=${page + 1}`
    );
    setNextPage(Search);
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
    if (height - scroll <= 200 && nextPage && !displayBtn) {
      loadMoreButton();
    }
  }, [height, scroll]);

  function loadMoreButton() {
    setPage(page + 1);
    fetchMovies(search, page + 1);
    setDisplayBtn(false);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search for a movie"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
        onKeyPress={(event) => {
            if (event.key === "Enter") {
                fetchMoviesInitial(search, 1)
            }
        }}
      />
      <button onClick={() => fetchMoviesInitial(search, 1)}>Search</button>
      <div>
        {loading ? (
          <h1>Loading...</h1>
        ) : movies === undefined ? (
          <h1>
            Couldn't find what you were looking for. Please try another title.
          </h1>
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
        {loadingBottom ? <h1>Loading...</h1> : <></>}
        {nextPage && displayBtn ? (
          <button
            onClick={() => loadMoreButton()}
            style={{ margin: "0 0 32px 0" }}
          >
            Load more
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Search;
