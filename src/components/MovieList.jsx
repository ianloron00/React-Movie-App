import React from 'react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

    {console.log("movies ", props.movies);}
	return (
		<div className='images-container d-flex justify-content-start m-3'>
			{
                props.movies.map((movie, index) => (
				<div 
                    className='image-container d-flex justify-content-start m-3' 
                    key={index}
                >
					<img 
                        src={movie.Poster} 
                        alt='movie'
                        onMouseOver={async () => {
                            const description = await props.getMovieRequest( movie.imdbID, true );
                            props.addDescription(description);
                        }
                        }
                    ></img>
					<div
						onClick={() => props.handleFavouritesClick(movie) }
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</div>
	);
};

export default MovieList;