import { useState } from "react";

export function FormSplitBill({ selectedFriend, handleSplitBill }) {
  const [bill, setBill] = useState("");
  const [expenseOfUser, setexpenseOfUser] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const expenseOfFriend = bill ? Number(bill) - Number(expenseOfUser) : "";

  function handleSubmit(e) {
    e.preventDefault();
    // const value = expenseOfFriend;
    if (!bill || !expenseOfUser) return;
    handleSplitBill(whoIsPaying === "user" ? expenseOfFriend : -expenseOfUser);
    /* setBill("");
    setexpenseOfUser("");
    setWhoIsPaying("user"); */
  }

  return (
    <>
      <h3>Spliting bills with {selectedFriend.name}</h3>
      <form onSubmit={handleSubmit}>
        <label>Bill Value</label>
        <input
          type="number"
          value={bill}
          onChange={(e) => setBill(e.target.value)}
        ></input>
        <label>Your Expense</label>
        <input
          type="number"
          value={expenseOfUser}
          onChange={(e) =>
            setexpenseOfUser(
              Number(e.target.value) > Number(bill)
                ? expenseOfUser
                : e.target.value
            )
          }
        ></input>
        <label>{`${selectedFriend.name}'s expense`}</label>
        <input type="number" value={expenseOfFriend} disabled></input>
        <select
          value={whoIsPaying}
          onChange={(e) => setWhoIsPaying(e.target.value)}
        >
          <option value="user">You</option>
          <option value="friend">{selectedFriend.name}</option>
        </select>
        <button type="submit">Split bill</button>
      </form>
    </>
  );
}
