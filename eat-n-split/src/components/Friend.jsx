export function Friend({ friend, selectedFriend, onSelectFriend }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <div
      className={`flex gap-4 items-center ${isSelected ? "bg-gray-200" : ""}`}
    >
      <img src={friend.image} alt={friend.name}></img>
      <h3>{friend.name}</h3>
      {friend.balance < 0 ? (
        <span>
          you owe {friend.name} {Math.abs(friend.balance)}$
        </span>
      ) : friend.balance > 0 ? (
        <span>
          {friend.name} owes you {Math.abs(friend.balance)}$
        </span>
      ) : (
        <span>you and {friend.name} are even</span>
      )}

      <button onClick={() => onSelectFriend(friend)}>
        {isSelected ? "close" : "select"}
      </button>
    </div>
  );
}
