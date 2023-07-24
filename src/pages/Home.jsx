import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Home({ setSearch, searchButtonEnter }) {
  let navigate = useNavigate();

  return (
    <div>
      <h1>Homepage</h1>

      <input
        type="text"
        placeholder="search for a movie"
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
  );
}

export default Home;
