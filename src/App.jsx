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
    const key = "263d22d8";

	const getMovieRequest = async (searchValue, isID) => {
		const url = `http://www.omdbapi.com/?${(isID ? "i" : "s")}=${searchValue}&apikey=${key}`;

		const res = await fetch(url);
		const json = await res.json();

        return json;
	};

    const updateMovies = async ( searchValue, ID ) => {
        const json = await getMovieRequest( searchValue, ID );

        if (json.Search) {
			setMovies(json.Search);
		}
    }

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

    const addDescription = (description) => {
        setDescription(description);
    };

	useEffect(() => {
		updateMovies(searchValue, false);
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
                    getMovieRequest={getMovieRequest}
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
                    getMovieRequest={getMovieRequest}
				/>
			</div>

            <div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Description' />
			</div>
            <div className="movieDescription" >
                <MovieDescription 
                description={description}
                 />
            </div>
		</div>
	);
};

export default App;
