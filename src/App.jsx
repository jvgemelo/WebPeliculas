import { useState } from "react";

import "./index.css";
// import withResults from "./mocks/with-results.json";
import Film from "./components/film/film";

// import noResults from "./mocks/no-results.json";

function App() {
  // const movies = withResults.Search;
  // const hasMovies = movies?.length > 0;
  const [dato, setDato] = useState("shrek");

  const recogerPelicula = () => {
    setDato(document.getElementById("input").value);
  };

  return (
    <div className="flex flex-col items-center w-screen ">
      <header className="flex flex-row justify-center items-center space-x-4 my-8">
        <h1 className="mt-4 font-mono text-3xl"> Buscador de peliculas </h1>
        <form className="form"></form>
        <input className="p-2" placeholder="Buscar peliculas..." id="input" />

        <button className="py-2 px-6 bg-slate-500 " onClick={recogerPelicula}>
          Buscar
        </button>
      </header>

      <main>
        <Film title={dato} />
      </main>
    </div>
  );
}

export default App;
