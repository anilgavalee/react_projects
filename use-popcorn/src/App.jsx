import { useEffect, useState } from "react";
import { MoviesList } from "./MoviesList";
import { Search } from "./Search";
import { API_KEY } from "./mykey";
import { MovieDetails } from "./MovieDetails";
import { WatchedList } from "./WatchedList";
import { WatchedSummary } from "./WatchedSummary";
import { useMovies } from "./hooks/useMovies";
import { useLocalStorage } from "./hooks/useLocaleStorage";
export function App() {
  const [query, setQuery] = useState("");
  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useLocalStorage("watched", []);

  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    setSelectedId(null);
  }

  function handleSelectMovie(id) {
    setSelectedId((cur) => (cur === id ? null : id));
    setQuery("");
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((mov) => mov.imdbID !== id));
  }
  return (
    <>
      <h1>use popcorn</h1>
      <Search query={query} setQuery={setQuery}></Search>
      {isLoading && <h2>finding movies</h2>}
      {error && <h3>{error}</h3>}
      {!isLoading && !error && (
        <MoviesList
          movies={movies}
          selectedId={selectedId}
          onSelectMovie={handleSelectMovie}
        ></MoviesList>
      )}
      {selectedId && (
        <MovieDetails
          selectedId={selectedId}
          onCloseMovie={() => setSelectedId(null)}
          watched={watched}
          onAddWatched={handleAddWatched}
        ></MovieDetails>
      )}
      <WatchedSummary watched={watched}></WatchedSummary>
      {watched && (
        <WatchedList
          watched={watched}
          onDeleteWatched={handleDeleteWatched}
        ></WatchedList>
      )}
    </>
  );
}

////////////////////////////////////////////////////////////////////////////////////////
