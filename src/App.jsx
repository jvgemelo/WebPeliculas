import { useState, useRef } from "react";

import "./index.css";
import Film from "./components/film/film";

function App() {
  // const [dato, setDato] = useState("shrek");
  const [query, setQuery] = useState("Star wars");
  const [error, setError] = useState(null);
  const inputRef = useRef();

  const recogerPelicula = (event) => {
    event.preventDefault();
    const value = inputRef.current.value;
    console.log(value);
    setQuery(document.getElementById("input").value);
  };

  const handleChange = (event) => {
    const newQuery = event.target.value;

    setQuery(event.target.value);
    if (newQuery.length < 4) {
      setError("No se pueden buscar peliculas con menos de 4 caracteres");
      return;
    }
    if (newQuery.length >= 4) {
      setError(" ");
      return;
    }
  };

  return (
    <div className="flex flex-col items-center align-middle w-screen ">
      <header className="w-full">
        <div className="flex flex-col justify-start items-start align-top">
          <h1 className="my-3 font-mono text-3xl"> Buscador de peliculas </h1>
        </div>
        <div className=" ">
          <form
            className="form flex flex-row justify-end items-center align-bottom mr-10 space-x-4"
            onSubmit={recogerPelicula}
          >
            <input
              ref={inputRef}
              onChange={handleChange}
              // value={query}
              className="p-2"
              placeholder="Buscar peliculas..."
              id="input"
            />

            <button type="submit" className="py-2 px-6 my-3 bg-slate-500 ">
              Buscar
            </button>
          </form>
        </div>
        {error && (
          <p className="flex justify-center" style={{ color: "red" }}>
            {error}
          </p>
        )}
      </header>

      <main className="flex justify-center ">
        <Film title={query} />
      </main>
    </div>
  );
}

export default App;
