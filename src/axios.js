import axios from "axios";

/** this is the base URl for making requests to my movie database from TMDB */

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;
