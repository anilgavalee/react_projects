import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "./menuSlice";
import PizzaItem from "./pizzaItem";

function Menu() {
  const dispatch = useDispatch();
  const { menu, status } = useSelector((state) => state.menu);
  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);
  if (status === "loading") return <p>...loading</p>;
  if (status === "error") return <p>Error loading menu</p>;
  return (
    <div>
      <h1>Munu</h1>
      <ul>
        {menu.map((pizza) => (
          <PizzaItem pizza={pizza} key={pizza.id} />
        ))}
      </ul>
    </div>
  );
}

export default Menu;
