import s from "./ProfileInfo.module.css";
import { Field, reduxForm } from "redux-form";
import {
  createField,
  Input,
  Textarea,
} from "../../common/FormsControls/FormsControls";
import styles from "./../../common/FormsControls/FormsControls.module.css";

const ProfileDataForm = ({ profile, handleSubmit, error }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>Save</button>
      </div>
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <b>Full name:</b>
        {createField("fullName", Input, [], "Full name")}
      </div>
      <div>
        <b>About me:</b>
        {createField("aboutMe", Textarea, [], "About me")}
      </div>
      <div>
        <b>Looking for a job:</b>
        {createField("lookingForAJob", Input, [], "", { type: "checkbox" })}
      </div>
      <div>
        <b>My skills:</b>
        {createField("lookingForAJobDescription", Textarea, [], "My skills")}
      </div>
      <div>
        <b>Contacts:</b>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <div key={key} className={s.contact}>
              <b>{key}: </b>
              {createField("contacts." + key, Input, [], key)}
            </div>
          );
        })}
      </div>
    </form>
  );
};

const ProfileDataReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);

export default ProfileDataReduxForm;
