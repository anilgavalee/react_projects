export function Movie({ movie, onSelectMovie, isSelected }) {
  return (
    <li
      onClick={() => onSelectMovie(movie.imdbID)}
      style={{
        cursor: "pointer",
        background: isSelected ? "#e5e7eb" : "transparent",
      }}
    >
      <h3>
        {movie.Title} ({movie.Year})
      </h3>
    </li>
  );
}
