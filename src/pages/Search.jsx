import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Search() {
  //   const [movies, setMovies] = useState(null);
  //   const [search, setSearch] = useState();
  //   const [loading, setLoading] = useState(null);
  //   const [page, setPage] = useState(false);
  //   const [movieLength, setMovieLength] = useState(10)

  //   async function fetchMovies(searchID) {
  //     const results = [];

  //     for (let page = 1; page <= 100; page++) {
  //       const {
  //         data: { Search },
  //       } = await axios.get(
  //         `https://www.omdbapi.com/?apikey=da79f3d4&s=${searchID}&page=${page}`
  //       );
  //       if (Search !== undefined) {
  //         const filteredResults = Search.filter((item) => item !== undefined);
  //         results.push(...filteredResults);
  //       }
  //     }
  //     console.log(results);
  //     setMovies(results);
  //     setLoading(false);
  //   }

  //   function buttonClick() {
  //     fetchMovies(search);
  //     setLoading(true);
  //   }

  //   function buttonClick2() {
  //     setPage(true);
  //     setMovieLength((prev) => prev + 10)
  //   }

  //   function DisplayHello() {
  //     const [show, setShow] = useState(false)
  //     return (
  //         <>
  //         <button onClick={() => setShow(true)}>Click to show</button>
  //         {show ? <h1>Hello!</h1> : null}
  //         </>
  //     )
  //   }

  //   return (
  //     <div>
  //       <h1>Search</h1>
  //       <input
  //         type="text"
  //         placeholder="search for your movie"
  //         onChange={(event) => {
  //           setSearch(event.target.value);
  //         }}
  //         // onKeyPress={(event) => {
  //         //   event.key === "Enter" && fetchMovies(search);
  //         // }}
  //       />
  //       <button onClick={() => buttonClick()}>Search</button>
  //       {loading === null ? (
  //         <h1>Search for a movie...</h1>
  //       ) : loading === false ? (
  //         <></>
  //       ) : (
  //         <h1>Loading...</h1>
  //       )}
  //       {movies === null ? (
  //         <></>
  //       ) : movies.length === 0 ? (
  //         <h1>
  //           Couldn't find what you were looking for. Please try another title.
  //         </h1>
  //       ) : (
  //         movies
  //           .map((movie, index) => (
  //             <Link to={movie.imdbID} key={index}>
  //               <div
  //                 className="movie-card"
  //                 style={{
  //                   margin: "16px",
  //                   border: "2px solid black",
  //                   width: "30%",
  //                   display: "flex",
  //                   flexDirection: "column",
  //                   justifyContent: "center",
  //                   alignItems: "center",
  //                 }}
  //               >
  //                 <h2>{movie.Title}</h2>
  //                 <h3>{movie.Year}</h3>
  //               </div>
  //             </Link>
  //           ))
  //           .slice(movieLength - 10, movieLength)
  //       )}
  //       {movies && movies.length > movieLength ? (
  //         <button onClick={() => buttonClick2()}>Load more</button>
  //       ) : (
  //         <></>
  //       )}
  //       {page ? (
  //         movies
  //           .map((movie, index) => (
  //             <Link to={movie.imdbID} key={index}>
  //               <div
  //                 className="movie-card"
  //                 style={{
  //                   margin: "16px",
  //                   border: "2px solid black",
  //                   width: "30%",
  //                   display: "flex",
  //                   flexDirection: "column",
  //                   justifyContent: "center",
  //                   alignItems: "center",
  //                 }}
  //               >
  //                 <h2>{movie.Title}</h2>
  //                 <h3>{movie.Year}</h3>
  //               </div>
  //             </Link>
  //           ))
  //           .slice(movieLength - 10, movieLength)
  //       ) : (
  //         <></>
  //       )}
  //     <DisplayHello />
  //     </div>
  //   );

  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState();
  const [nextPage, setNextPage] = useState();

  async function fetchMovies(search, page) {
    const {
      data: { Search },
    } = await axios.get(
      `https://www.omdbapi.com/?apikey=da79f3d4&s=${search}&page=${page}`
    );
    setMovies((prevMovies) => [...prevMovies, ...Search]);
    fetchNextPage(search, page);
  }

  async function fetchNextPage(search, page) {
    const {
      data: { Search },
    } = await axios.get(
      `https://www.omdbapi.com/?apikey=da79f3d4&s=${search}&page=${page + 1}`
    );
    setNextPage(Search);
  }

  function loadMoreButton() {
    setPage(page + 1);
    fetchMovies(search, page + 1);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="search for a movie"
        onChange={(event) => {
          setSearch(event.target.value);
        }}
      />
      <button onClick={() => fetchMovies(search, page)}>Search</button>
      {movies.map((movie, index) => (
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
      ))}

      {nextPage ? (
        <button onClick={() => loadMoreButton()}>Load more</button>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Search;
