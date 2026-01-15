import { FormAddFriend } from "./components/FormAddFriend";
import { Friend } from "./components/Friend";
import { FriendsList } from "./components/FriendsList";
import { FormSplitBill } from "./components/FormSplitBill";
import { useState } from "react";
const initialFriends = [
  {
    id: 1,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 2,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 3,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);
  function handleSelectFriend(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  }
  function handleSplitBill(value) {
    setFriends((friends) =>
      friends.map((friend) => {
        return friend.id === selectedFriend?.id
          ? { ...friend, balance: friend.balance + value }
          : friend;
      })
    );
    setSelectedFriend(null);
  }
  function addFriend(friendName, img) {
    const newFriend = {
      id: new Date().getTime(),
      name: friendName,
      image: img,
      balance: 0,
    };
    setFriends((friends) => [...friends,newFriend]);
  }
  return (
    <>
      <div className="">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelectFriend={handleSelectFriend}
        ></FriendsList>
        {selectedFriend && (
          <FormSplitBill
            key={selectedFriend.id}
            selectedFriend={selectedFriend}
            handleSplitBill={handleSplitBill}
          ></FormSplitBill>
        )}
        <FormAddFriend onAddFriend={addFriend}></FormAddFriend>
      </div>
    </>
  );
}

export default App;
