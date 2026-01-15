import { useEffect, useState } from "react";
import { MoviesList } from "./MoviesList";
import { Search } from "./Search";
import { API_KEY } from "./mykey";
import { MovieDetails } from "./MovieDetails";
import { WatchedList } from "./WatchedList";
import { WatchedSummary } from "./WatchedSummary";
export function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(() => {
    const stored = localStorage.getItem("watched");
    return stored ? JSON.parse(stored) : [];
  });
  function handleAddWatched(movie) {
    setWatched((watched) => [...watched, movie]);
    setSelectedId(null);
  }
  useEffect(() => {
    if (query.length < 3) {
      setIsLoading(false);
      setMovies([]);
      setError("");
      return;
    }
    const controller = new AbortController();
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!response.ok) {
          throw new Error("somwthing went wrong");
        }
        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        setMovies(() => {
          const unique = new Map();
          (data.Search || []).forEach((movie) => {
            unique.set(movie.imdbID, movie);
          });
          return Array.from(unique.values());
        });
      } catch (error) {
        if (error.name !== "AbortError") setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovies();
    return () => {
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
  }, [watched]);
  function handleSelectMovie(id) {
    setSelectedId((cur) => (cur === id ? null : id));
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
