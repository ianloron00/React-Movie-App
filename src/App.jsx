// 7be09767;263d22d8
import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import MovieDescription from './components/MovieDescription';

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');
	const [favourites, setFavourites] = useState([]);
    const [description, setDescription] = useState();

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
	};

    const addDescription = (movie) => {
        setDescription(movie);
    };

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);
    
	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Movies' />
				<SearchBox 
                    searchValue={searchValue} 
                    setSearchValue={setSearchValue}
                />
			</div>
			<div className='row'>
				<MovieList
					movies={movies}
					favouriteComponent={AddFavourites}
					handleFavouritesClick={addFavouriteMovie}
                    addDescription={addDescription}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<MovieList
					movies={favourites}
					favouriteComponent={RemoveFavourites}
					handleFavouritesClick={removeFavouriteMovie}
                    addDescription={addDescription}
				/>
			</div>

            <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Description' />
			</div>
            <div className="movieDescription" >
                <MovieDescription description={description} />
            </div>
		</div>
	);
};

export default App;
