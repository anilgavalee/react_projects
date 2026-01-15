export function Search({ query, setQuery }) {
  return (
    <div className="bg-blue-500 px-3 py-5 text-white rounded-lg w-{80}">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search movie..."
        className="text-black px-2"
      ></input>
    </div>
  );
}
