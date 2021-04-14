import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import photo from "../../../assets/user.png";
import { useState } from "react";
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);

  if (!profile) {
    return <Preloader />;
  }

  const onPhotoChange = (e) => {
    let photo = e.target.files[0];
    savePhoto(photo);
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        <img src={profile.photos.large || photo} className={s.mainPhoto} />
        {isOwner && <input type="file" onChange={onPhotoChange} />}
        {editMode ? (
          <ProfileDataForm
            profile={profile}
            initialValues={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            profile={profile}
            goToEditMode={() => {
              setEditMode(true);
            }}
            isOwner={isOwner}
          />
        )}
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

const ProfileData = ({ profile, goToEditMode, isOwner }) => {
  return (
    <div>
      {isOwner && <button onClick={goToEditMode}>Edit</button>}
      <div>
        <b>Full name:</b> {profile.fullName}
      </div>
      <div>
        <b>About me:</b> {profile.aboutMe}
      </div>
      <div>
        <b>Looking for a job:</b> {profile.lookingForAJob ? "Yes" : "No"}
      </div>
      {profile.lookingForAJob && (
        <div>
          <b>My skills:</b> {profile.lookingForAJobDescription}
        </div>
      )}
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactName={key}
              contactValue={profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactName, contactValue }) => {
  return (
    <div className={s.contact}>
      <b>{contactName}: </b>
      {contactValue}
    </div>
  );
};

export default ProfileInfo;
