import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Movie from "./pages/Movie";
import Nav from "./components/Nav";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [displayBtn, setDisplayBtn] = useState(false);
  const [nextPage, setNextPage] = useState();

  async function fetchMoviesInitial(search) {
    try {
      setLoading(true);
      const {
        data: { Search },
      } = await axios.get(
        `https://www.omdbapi.com/?apikey=da79f3d4&s=${search}`
      );
      setLoading(false);
      if (search !== null) {
        setMovies(Search);
      }
    } catch (error) {
      console.error("error fetching data:", error);
      setLoading(false);
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

  function searchButtonEnter() {
    fetchMoviesInitial(search);
    fetchNextPage(search, page);
    setDisplayBtn(true);
    console.log(search);
    console.log(movies);
  }

  

  return (
    <Router>
      <div className="App">
        <Nav />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setSearch={setSearch}
                searchButtonEnter={searchButtonEnter}
              />
            }
          ></Route>
          <Route
            path="/search"
            element={
              <Search
                movies={movies}
                setMovies={setMovies}
                fetchMoviesInitial={fetchMoviesInitial}
                loading={loading}
                search={search}
                setSearch={setSearch}
                page={page}
                setPage={setPage}
                displayBtn={displayBtn}
                setDisplayBtn={setDisplayBtn}
                nextPage={nextPage}
                setNextPage={setNextPage}
                fetchNextPage={fetchNextPage}
                searchButtonEnter={searchButtonEnter}
              />
            }
          ></Route>
          <Route path="/search/:movie" element={<Movie />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
