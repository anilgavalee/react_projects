import { useState } from "react";

export function FormAddFriend({ onAddFriend }) {
  const [name, setName] = useState("");
  const imageURL = "https://i.pravatar.cc/48";
  const [isAdding, setIsAdding] = useState(false);
  function handleAddFriend(e) {
    e.preventDefault();
    if (!name) return;
    onAddFriend(name, imageURL);
    setName('');
    setIsAdding(false);
  }
  function handleAddBtnClick() {
    setIsAdding((initialVal) => !initialVal);
  }
  return (
    <>
      <button onClick={handleAddBtnClick}>
        {!isAdding ? "Add Friend" : "Close"}
      </button>
      {isAdding && (
        <form onSubmit={handleAddFriend}>
          <label>name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <label>Image</label>
          <input value={imageURL} disabled></input>
          <button type="submit">Add</button>
        </form>
      )}
    </>
  );
}
