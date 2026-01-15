import { useState } from "react";
import { Item } from "./item";
export function PackingList({ items, onToggleItem, onDeleteItem }) {
  const [selectedOption, setSelectedOption] = useState("input");
  let sortedItems = [...items];
  const options = [
    { label: "input", value: "input" },
    { label: "description", value: "description" },
    { label: "packed", value: "packed" },
  ];
  if (selectedOption === "description") {
    sortedItems = sortedItems.sort((a, b) =>
      a.description.localeCompare(b.description)
    );
  } else if (selectedOption === "packed") {
    sortedItems = sortedItems.sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }
  function handleChange(e) {
    setSelectedOption(e.target.value);
  }
  return (
    <>
      <select value={selectedOption} onChange={handleChange}>
        {options.map((option) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {sortedItems.map((item) => {
        return (
          <Item
            key={item.id}
            item={item}
            onToggleItem={onToggleItem}
            onDeleteItem={onDeleteItem}
          ></Item>
        );
      })}
    </>
  );
}
