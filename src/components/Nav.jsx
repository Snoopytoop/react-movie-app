import React from "react";
import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="row">
      <nav>
        <Link to="/">
          <h3 className="nav__logo">MovieSearch</h3>
        </Link>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">
              <h3 className="nav__link">Home</h3>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/search">
              <h3 className="nav__link">Search</h3>
            </Link>
          </li>
          <li className="nav__item">
            <Link to="/contact">
              <h3 className="nav__link">Contact</h3>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
