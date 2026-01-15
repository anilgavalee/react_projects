import { Friend } from "./Friend";

export function FriendsList({ friends, selectedFriend, onSelectFriend }) {
  return friends.map((friend) => {
    return (
      <Friend
        key={friend.id}
        friend={friend}
        selectedFriend={selectedFriend}
        onSelectFriend={onSelectFriend}
      ></Friend>
    );
  });
}
