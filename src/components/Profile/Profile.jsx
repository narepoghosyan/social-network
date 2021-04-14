import MyPostsContainer from "./MyPosts/MyPostsContainer";
import s from "./Profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";

const Profile = (props) => {
  return (
    <div>
      <ProfileInfo
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        isOwner={props.isOwner}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer></MyPostsContainer>
    </div>
  );
};

export default Profile;
