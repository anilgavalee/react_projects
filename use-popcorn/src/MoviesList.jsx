import { Movie } from "./Movie";

export function MoviesList({ movies, selectedId, onSelectMovie }) {
  console.log(movies);

  return (
    <>
      <ul>
        {movies.map((movie) => (
          <Movie
            movie={movie}
            key={movie.imdbID}
            isSelected={selectedId === movie.imdbID}
            onSelectMovie={onSelectMovie}
          ></Movie>
        ))}
      </ul>
    </>
  );
}
