export function Item({ item, onToggleItem, onDeleteItem }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "16px",
        textDecoration: item.packed ? "line-through" : "none",
      }}
    >
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onToggleItem(item.id)}
      ></input>
      <span>{item.quantity}</span>
      <p>{item.description}</p>
      <button type='button' onClick={()=>onDeleteItem(item.id)}>X</button>
    </div>
  );
}
