import { useState, useEffect } from "react";
import { API_KEY } from "../mykey";
export const useMovies = (query) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    return {movies, isLoading, error}
};
