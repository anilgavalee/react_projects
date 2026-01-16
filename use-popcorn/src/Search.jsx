import { useEffect, useRef } from "react";

export function Search({ query, setQuery }) {
  const inputRef = useRef(null);
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Enter") {
        inputRef?.current.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <div className="bg-blue-500 px-3 py-5 text-white rounded-lg w-{80}">
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="search movie..."
        className="text-black px-2"
      ></input>
    </div>
  );
}
