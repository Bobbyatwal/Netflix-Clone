import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/"; // URL for images

function Row({ title, fetchUrl, isLargeRow }) {
  //State is like short term memory, to keep track of movies. dissapears when we refresh.
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  //UseEffect is code that runs based on a specific condiition. Grabbing data here:
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl); // Await means it waits for data to come back before running
      setMovies(request.data.results);
      return request;
    }
    fetchData(); //This is to call UseEffect function
  }, [fetchUrl]);
  // When empty, []  only runs function once. Since fetchURL not in code block, have to add
  //   console.log(movies);

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  // Returning rows using mapping:
  return (
    <div className="row">
      <h2> {title} </h2>

      <div className="row_posters">
        {/* posters */}

        {movies.map((movie) => (
          <img
            key={movie.id} // OPTIMIZATION: (faster) With key, React wont render entire row, just that  particluar movie.
            onClick={() => handleClick(movie)}
            className={` row_poster ${isLargeRow && "row_posterLarge"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
