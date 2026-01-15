export function Pizza({ pizza }) {
  return (
    <div>
      <h2>{pizza.name}</h2>
      <p>{pizza.ingredients}</p>
      <div className={pizza.soldOut ? 'sold-out': ''}>
      {pizza.soldOut ? (
        <strong>SOLD OUT</strong>
      ) : (
        <strong>{pizza.price}</strong>
      )}
      </div>
    </div>
  );
}
