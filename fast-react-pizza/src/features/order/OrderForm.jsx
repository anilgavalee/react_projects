import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder } from "./orderSlice";

function OrderForm() {
  const dispatch = useDispatch();
  const status = useSelector((state) => state.order.status);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    dispatch(
      createOrder({
        customer: name,
        phone,
        address,
      })
    );
  }

  if (status === "loading") return <p>Placing order...</p>;
  if (status === "success") return <p>✅ Order placed!</p>;

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      <input value={address} onChange={(e) => setAddress(e.target.value)} />
      <button>Order now</button>
    </form>
  );
}

export default OrderForm;
