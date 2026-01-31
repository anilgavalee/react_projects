import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  getTotalCartPrice,
  getTotalCartQuantity,
} from "./cartSelectors";
import { decreaseQuantity, increaseQuantity, removeItem } from "./cartSlice";

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const totalPrice = useSelector(getTotalCartPrice);
  const totalQuantity = useSelector(getTotalCartQuantity);
  return (
    <div>
      <h2>🛒 Cart ({totalQuantity})</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.pizzaId}>
            {item.name} - {item.totalPrice}
            <button onClick={() => dispatch(decreaseQuantity(item.pizzaId))}>
              -
            </button>
            <button onClick={() => dispatch(increaseQuantity(item.pizzaId))}>
              +
            </button>
            <button onClick={() => dispatch(removeItem(item.pizzaId))}>
              X
            </button>
          </li>
        ))}
      </ul>
      <p>{totalPrice}</p>
    </div>
  );
}

export default Cart;
