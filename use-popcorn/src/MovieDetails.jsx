import { useEffect, useState } from "react";
import { API_KEY } from "./mykey";
export function MovieDetails({
  selectedId,
  onCloseMovie,
  watched,
  onAddWatched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const isWatched = watched.some((mov) => mov.imdbID === selectedId);
  const [userRating, setUserRating] = useState(0);
  useEffect(() => {
    if (!selectedId) return; // 🔑 CRITICAL GUARD
    const controller = new AbortController();
    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError("");
        const response = await fetch(
          `https://www.omdbapi.com/?apikey=${API_KEY}&i=${selectedId}`,
          { signal: controller.signal }
        );
        const data = await response.json();
        if (data.Response === "False") {
          throw new Error(data.Error);
        }
        console.log(data);
        setMovie(data);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchMovie();
    // return () => console.log("MovieDetails unmounted");
    return () => controller.abort();
  }, [selectedId]);
  return (
    <>
      {isLoading && <h1>wait we are getting movie details</h1>}
      {error && <h1>{error}</h1>}
      {!isLoading && !error && movie.Title && (
        <>
          <h2>{movie.Title}</h2>
          <p>{movie.Plot}</p>
          <p>⭐ {movie.imdbRating}</p>
          <p>⏱ {movie.Runtime}</p>
        </>
      )}
      {!isWatched && (
        <>
          <div>
            <h3>rate this movie</h3>
            <select
              value={userRating}
              onChange={(e) => setUserRating(Number(e.target.value))}
            >
              <option value={0}>select rating:</option>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                return (
                  <option key={num} value={num}>
                    {num}
                  </option>
                );
              })}
            </select>
          </div>
        </>
      )}
      {userRating > 0 && !isWatched && (
        <button
          onClick={() =>
            onAddWatched({
              imdbID: movie.imdbID,
              title: movie.Title,
              year: movie.Year,
              poster: movie.Poster,
              imdbRating: Number(movie.imdbRating),
              runtime: Number(movie.Runtime.split(" ")[0]),
              userRating,
            })
          }
        >
          + Add to watch
        </button>
      )}
    </>
  );
}
