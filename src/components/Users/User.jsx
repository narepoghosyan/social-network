import photo from "../../assets/user.png";
import { NavLink } from "react-router-dom";
import s from "./Users.module.css";

const User = ({ user, isFollowingInProgress, follow, unfollow }) => {
  return (
    <div>
      <span>
        <div>
          <NavLink to={"/profile/" + user.id}>
            <img
              className={s.photo}
              src={user.photos.small != null ? user.photos.small : photo}
            />
          </NavLink>
        </div>
        <div>
          {user.followed ? (
            <button
              disabled={isFollowingInProgress.some((id) => id == user.id)}
              onClick={() => {
                unfollow(user.id);
              }}
            >
              Unfollow
            </button>
          ) : (
            <button
              disabled={isFollowingInProgress.some((id) => id == user.id)}
              onClick={() => {
                follow(user.id);
              }}
            >
              Follow
            </button>
          )}
        </div>
      </span>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"user.location.city"}</div>
          <div>{"user.location.country"}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
