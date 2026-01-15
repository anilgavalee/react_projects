export function Stats({ items }) {
  const numItems = items.length;
  const numChecked = items.filter((item) => item.packed === true).length;
  const percentage = Math.round((numChecked / numItems) * 100);
  return numItems === 0 ? (
    <p>keep adding items</p>
  ) : (
    <h1>
      You have {numItems} items on your list, and you already packed{" "}
      {numChecked} ({percentage}%)
    </h1>
  );
}
