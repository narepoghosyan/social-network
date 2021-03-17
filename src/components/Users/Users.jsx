import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = ({
  totalUsersCount,
  pageCount,
  onPageChange,
  currentPage,
  ...props
}) => {
  return (
    <div>
      <Paginator
        totalItemsCount={totalUsersCount}
        pageCount={pageCount}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <div>
        {props.users.map((u) => {
          return (
            <User
              key={u.id}
              user={u}
              isFollowingInProgress={props.isFollowingInProgress}
              follow={props.follow}
              unfollow={props.unfollow}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Users;
