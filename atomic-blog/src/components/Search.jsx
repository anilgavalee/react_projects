export function Search({ searchQuery, onSearch }) {
  return (
    <input
      placeholder="...search post"
      value={searchQuery}
      onChange={(e) => onSearch(e.target.value)}
    ></input>
  );
}
