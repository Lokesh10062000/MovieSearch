import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
// import MovieList from "./components/MovieList";
// import MovieListHeading from "./components/MovieListHeading";
// import SearchBox from "./components/SearchBox";
// import AddFavourites from "./components/AddFavourites";
// import RemoveFavourites from "./components/RemoveFavourites";
import Movielist from "./Components/Movielist";
import MovieslistHeading from "./Components/MovieslistHeading";
import SearchBox from "./Components/SearchBox";
import AddFavorate from "./Components/AddFavorate";
import RemoveFavorate from "./Components/RemoveFavorate";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=aeb2b829`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieslistHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <Movielist
          movies={movies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavorate}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieslistHeading heading="Favourites" />
      </div>
      <div className="row">
        <Movielist
          movies={favourites}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavorate}
        />
      </div>
    </div>
  );
};

export default App;
