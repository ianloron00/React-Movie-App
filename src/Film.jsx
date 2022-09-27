import React, { useState, useEffect } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Film.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';

let omdb_key = '7be09767';
let data_URL = `http://www.omdbapi.com/?apikey='${omdb_key}`;


function getJson(film_id) {
    // response = requests.get(data_URL, params={'i'})
}
function Film() {
    const [ movies, setMovies ] = useState([]);
    const [ searchValue, setSearchValue ] = useState('');

    const getMovieRequest = async() => {
        const url = `http://www.omdbapi.com/?s=star wars&apikey=${omdb_key}`;

        const response = await fetch(url);
        const responseJson = await response.json();

        if ( responseJson.Search ) {
            setMovies( responseJson.Search );
        }
    };

    useEffect( () => {
        getMovieRequest(searchValue);
    }, [searchValue] );

    return (
        <div className='container-fluid movie-app'>
            <div className='row d-flex align-items-center mt-4 mb-4'>
                <MovieListHeading heading='Movies' />
                <SearchBox searchValue={ searchValue } setSearchValue={ setSearchValue } /> 
            </div>
            <div className='row'>
                <MovieList movies={movies} />
            </div>
        </div>
    );
}

export default Film;