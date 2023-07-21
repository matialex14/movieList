import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTicket } from "@fortawesome/free-solid-svg-icons";
import "./NavBar.css";
import { newMovieList } from "../index";
import { home } from "../index";
// const call = require("../index");
function NavBar() {
  return (
    <>
      <nav className="navBar">
        <div className="navBarContainer">
          <Link to="/" className="navBarLogo">
            movieList
            <FontAwesomeIcon className="logo" icon={faTicket} />
          </Link>
          <ul>
            <li>
              <Link to="/" onClick={home} className="nav-links ">
                Home
              </Link>
            </li>

            <li>
              <Link to="/" onClick={newMovieList} className="newMovieList nav-links">
                New movieList
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
