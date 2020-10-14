import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
  // Responsible for whatever random movie selected at the top
  const [movie, setMovie] = useState([]);

  // Runs based on a given condition
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.fetchNetflixOriginals);
      const randomBanner = Math.floor(
        Math.random() * request.data.results.length - 1
      );
      setMovie(request.data.results[randomBanner]);
      return request;
    }
    fetchData();
  }, []);
  console.log(movie);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        left: "0",
        right: "0",
        top:  "0",
        bottom: "0",
        width: "100%",
    
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        // Question mark to handle elegantly if movie is undefined
        backgroundPosition: "center center",
      }}
    >
        
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name} </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
        
      </div>
      <div className="banner--fadeBottom" />
     
    </header>
  );
}

export default Banner;

// I began this by planning the Banner:
//   { Background Image}
//   { Title}
//   { 2 button (div) }
//   { Description <o> }
