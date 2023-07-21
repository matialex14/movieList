import React, { useEffect, useState } from "react";
import axios from "axios";
import "./HomeItem.css";

export const HomeItem = () => {
  const API_URL = "https://api.themoviedb.org/3/movie/upcoming?api_key=c785d8d56d06e43e11a4ef68b7cd8ade";

  //   const [movies, setMovies] = useState([]);

  //   useEffect(() => {
  //     fetch(API_URL)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         setMovies(data.results);
  //       });
  //   }, []);
  //   console.log(movies[0]);

  const dataMovies = [];
  async function getMovies() {
    const response = await fetch(API_URL);
    const data = response.json();
    const aaa = () => {
      dataMovies.push(data);
    };
    setTimeout(aaa, 1000);
  }
  //   getMovies();
  getMovies();
  console.log(dataMovies);

  return (
    <div>
      <div className="homeItem">
        <div className="homeItemContainer">
          <div className="userContainer"></div>
          <div className="moviesContainer"></div>
        </div>
      </div>
    </div>
  );
};
