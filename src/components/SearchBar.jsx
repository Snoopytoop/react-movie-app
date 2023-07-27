import React from 'react'
import { useNavigate } from 'react-router-dom';

function SearchBar({ setSearch, searchButtonEnter, style }) {

    let navigate = useNavigate();


  return (
    <div className={style}>
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
        <button className='searchBar__button'
          onClick={() => {
            searchButtonEnter();
            navigate("/search");
          }}
        >
          Search
        </button>
        </div>
  )
}

export default SearchBar