import { useState } from "react";

export function Form({ onAddItem }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  function handleSubmit(e) {
    if (!description) return;
    const newItem = {
      id: Date.now(),
      description,
      quantity,
      packed: false,
    };
    e.preventDefault();
    onAddItem(newItem);
    setDescription("");
    setQuantity(1);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Add items description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="item..."
        ></input>
        <label>Quantity:</label>
        <input
          type="number"
          name="quantity"
          onChange={(e) => setQuantity(Number(e.target.value))}
          id="quantity"
          min={1}
          max={20}
          value={quantity}
        ></input>
        <button type="submit">Add</button>
      </form>
    </>
  );
}
