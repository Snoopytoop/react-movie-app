import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home({ setSearch, searchButtonEnter }) {
  let navigate = useNavigate();

  return (
    <div className="row home__row">
      <section>
        <h1>MovieSearch</h1>
        <p className="home__para">Browse 1000's of movies and TV shows!</p>

        <div className="search__container">
        <input
          type="text"
          placeholder="search for a movie..."
          onChange={(event) => {
            setSearch(event.target.value);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              searchButtonEnter();
              navigate("/search");
            }
          }}
        />
        <button
          onClick={() => {
            searchButtonEnter();
            navigate("/search");
          }}
        >
          Search
        </button>
        </div>

      </section>
    </div>
  );
}

export default Home;
