import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../cart/cartSlice";

function PizzaItem({ pizza }) {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const isInCart = cart.some((item) => item.pizzaId === pizza.id);

  function handleAdd() {
    dispatch(
      addItem({
        pizzaId: pizza.id,
        name: pizza.name,
        quantity: 1,
        unitPrice: pizza.unitPrice,
        totalPrice: pizza.unitPrice,
      }),
    );
  }

  return (
    <li>
      {pizza.name} – ₹{pizza.unitPrice}
      {!isInCart && <button onClick={handleAdd}>Add</button>}
    </li>
  );
}

export default PizzaItem;
