export function WatchedList({ watched, onDeleteWatched }) {
  return (
    <ul>
      {watched.map((movie) => {
        return (
          <li key={movie.imdbID}>
            <h3>{movie.title}</h3>
            <p>⭐ IMDb: {movie.imdbRating}</p>
            <p>🌟 You: {movie.userRating}</p>
            <button onClick={() => onDeleteWatched(movie.imdbID)}>❌</button>
          </li>
        );
      })}
    </ul>
  );
}
