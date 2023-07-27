import React from "react";
import SearchBar from "../components/SearchBar";

function Home({ setSearch, searchButtonEnter }) {

  return (
    <div className="row home__row">
      <section>
        <h1>MovieSearch</h1>
        <p className="home__para">Browse 1000's of movies and TV shows!</p>
        <SearchBar setSearch={setSearch} searchButtonEnter={searchButtonEnter} style="search__container" />
      </section>
    </div>
  );
}

export default Home;
