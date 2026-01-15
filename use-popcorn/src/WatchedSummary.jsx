export function WatchedSummary({ watched }) {
  if (watched.length === 0)
    return <p>No movies watched yet</p>;

  const avg = arr =>
    arr.length === 0
      ? 0
      : arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

  const avgImdbRating = avg(watched.map(m => m.imdbRating));
  const avgUserRating = avg(watched.map(m => m.userRating));
  const avgRuntime = avg(watched.map(m => m.runtime));

  return (
    <div>
      <p>🎬 Movies watched: {watched.length}</p>
      <p>⭐ IMDb avg: {avgImdbRating.toFixed(1)}</p>
      <p>🌟 Your avg: {avgUserRating.toFixed(1)}</p>
      <p>⏱ Avg runtime: {avgRuntime.toFixed(0)} min</p>
    </div>
  );
}
