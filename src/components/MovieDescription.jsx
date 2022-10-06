import React from 'react'

const MovieDescription = ({description}) => {

    {console.log(description);}
    if (description === undefined)
        return(<></>);
    
    return (
    <>
        <p>Title: {description.Title}</p>
        <p>Year: {description.Year}</p>
        <p>Type: {description.Type}</p>
        <p>ID: {description.imdbID}</p>
        {/* <ul>
        {
            description.Ratings.map((site,index) => {
                <li>{site.Source}: {site.Value}</li>      
            })
        }
        </ul> */}
    </>
    );
}

export default MovieDescription