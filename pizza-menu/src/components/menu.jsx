import { Pizza } from "./pizza";

const pizzaData = [
  {
    id: 1,
    name: "Margherita",
    ingredients: "Tomato sauce, mozzarella, basil",
    price: 250,
    soldOut: false,
  },
  {
    id: 2,
    name: "Pepperoni",
    ingredients: "Tomato sauce, mozzarella, pepperoni",
    price: 350,
    soldOut: false,
  },
  {
    id: 3,
    name: "Veggie Supreme",
    ingredients: "Onion, capsicum, olives, corn, mozzarella",
    price: 300,
    soldOut: true,
  },
];

export function Menu() {
  const hasPizzas = Boolean(pizzaData.length);
  return (
    <main>
      <h1>Our Menu</h1>
      {hasPizzas ? (
        <ul>
          {pizzaData.map((pizza) => {
            return (
              <li key={pizza.id}>
                <Pizza pizza={pizza}></Pizza>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>"We’re currently working on our menu."</p>
      )}
    </main>
  );
}
