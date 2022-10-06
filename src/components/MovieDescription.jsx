import React from 'react'

const MovieDescription = ({description}) => {

    if (description === undefined)
        return(<></>);

    return (
    <>
        <p>Title: {description.Title}</p>
        <p>Year: {description.Year}</p>
        <p>Type: {description.Type}</p>
        <p>ID: {description.imdbID}</p>
        <p>Genre: {description.Genre}</p>
        <p>Plot: {description.Plot}</p>
        <p>Rating:</p>
        <ul>
        {
            description.Ratings.map((site,index) => {
                return (
                    <li key={index}><p>{site.Source}: {site.Value}</p></li>
                );

            })
        }
        </ul>
    </>
    );
}

export default MovieDescription