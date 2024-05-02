import { useState, useEffect } from "react";

// const CONST_ENDPOINT_FILM_BY_NAME = `https://www.omdbapi.com/?i=tt3896198&apikey=1b5e2cc8&s=${title}`

function Film({ title }) {
  const [filmList, setFilmList] = useState([]);
  // const [loading, setLoading] = useState(false);

  useEffect(() => {
    // setLoading(true);
    fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=1b5e2cc8&s=${title}`)
      .then((response) => response.json())
      .then((jsonData) => {
        for (let i = 0; i < jsonData.Search.length; i++) {
          // console.log(jsonData.Search[i]);
          const mappedMovies = jsonData.Search.map((movie) => ({
            id: movie.imdbID,
            title: movie.Title,
            year: movie.Year,
            image: movie.Poster,
          }));
          setFilmList(mappedMovies);
          console.log(mappedMovies);
        }
      });
  }, [title]);

  // const mappedMovies = filmList?.map((movie) => ({
  //   id: movie.imdbID,
  //   title: movie.title,
  //   year: movie.year,
  //   image: movie.image,
  // }));

  return (
    <>
      {filmList ? (
        <li className="grid grid-cols-4 gap-6">
          {filmList.map((movies) => (
            <li key={movies?.id}>
              <h3>{movies?.title}</h3>
              <p>{movies?.year}</p>
              <img src={movies?.image} alt={movies?.Title} />
            </li>
          ))}
        </li>
      ) : (
        <p>No se encontraron los resultados</p>
      )}
    </>
  );
}
export default Film;
