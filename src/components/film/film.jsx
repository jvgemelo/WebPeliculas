import { useState, useEffect, useMemo } from "react";
import noImageAvaliable from "../../assets/noImageAvaliable.jpg";

// const CONST_ENDPOINT_FILM_BY_NAME = `https://www.omdbapi.com/?i=tt3896198&apikey=1b5e2cc8&s=${title}`

function Film({ title, order }) {
  const [filmList, setFilmList] = useState([]);
  const [loading, setLoading] = useState(false);

  const cogerPelicula = async (title) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?i=tt3896198&apikey=1b5e2cc8&s=${title}`
      );

      if (response.ok) {
        setLoading(true);
        await response
          .json()
          .then((jsonData) => {
            if (jsonData.Search === undefined) {
              console.log(" Peliculas asociadas no encontradas");
              setLoading(false);
            } else {
              setFilmList(jsonData.Search);
              setLoading(false);
            }
          })
          .catch("Busqueda no encontrada........");
      }
    } catch (error) {
      console.log("Error fetching" + error);
    }
  };

  useEffect(() => {
    cogerPelicula(title);
  }, [title, order]);

  useMemo(() => {
    if (order) {
      const newArr = filmList.sort((a, b) => b.Year - a.Year);
      return newArr;
    }
    return;
  }, [order, filmList]);

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center w-80 h-96">
          <svg
            className="animate-spin mx-2"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="100"
            height="100"
            color="#fff"
            fill="none"
          >
            <path
              d="M18.001 20C16.3295 21.2558 14.2516 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 12.8634 21.8906 13.7011 
                        21.6849 14.5003C21.4617 15.3673 20.5145 15.77 19.6699 15.4728C18.9519 15.2201 18.6221 14.3997 18.802 13.66C18.9314 13.1279 19 12.572 19 12C19 8.13401 15.866 5 
                        12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C13.3197 19 14.554 18.6348 15.6076 18"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      ) : filmList ? (
        <li className="grid xl:grid-cols-4  md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1  gap-8 items-end justi w-full m-0 p-0 ">
          {filmList.map((movies) => (
            <li className="flex flex-col justify-between" key={movies?.imdbID}>
              <div>
                <div className="mb-auto mt-0">
                  <h3 className="max-w-72 ">{movies?.Title}</h3>
                  <p className="mb-2">{movies?.Year}</p>
                </div>
                <div className="">
                  {movies.image === "N/A" ? (
                    <img
                      className="w-80 h-96 "
                      src={noImageAvaliable}
                      alt=" "
                    ></img>
                  ) : (
                    <img
                      className="w-80 h-96"
                      src={movies?.Poster}
                      alt={movies?.Title}
                    />
                  )}
                </div>
              </div>
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
