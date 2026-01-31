import { useDispatch, useSelector } from "react-redux";
import { getUsername } from "./userSelectors";
import { setUsername } from "./userSlice";

function User() {
  const dispatch = useDispatch();
  const username = useSelector(getUsername);
  return (
    <div>
      <input
        value={username}
        placeholder="Enter your name"
        onChange={(e) => dispatch(setUsername(e.target.value))}
      ></input>
      <p>Welcome, {username}</p>
    </div>
  );
}

export default User;
