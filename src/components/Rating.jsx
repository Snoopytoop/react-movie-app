import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Rating({ film }) {
  const num = parseFloat(film.imdbRating);
  const arr = new Array(Math.floor(num)).fill(0);
  console.log(arr)
  return (
    <>
      
      
      {/* {
      arr.map((_, index) => (
        <FontAwesomeIcon icon="star" key={index} />
      ))}
      {!Number.isInteger(num) && <FontAwesomeIcon icon="star-half-alt" />} */}
    </>
  );
}

export default Rating;
