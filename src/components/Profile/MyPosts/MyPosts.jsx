import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { Field, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

const maxLength10 = maxLengthCreator(10);

const MyPostsForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Type something"
          name="post"
          component={Textarea}
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const MyPostsReduxForm = reduxForm({ form: "myPostsForm" })(MyPostsForm);

const MyPosts = React.memo((props) => {
  let postsElements = props.posts.map((p) => (
    <Post message={p.message} key={p.id} likesCount={p.likesCount}></Post>
  ));

  let onSubmit = (data) => {
    props.addPost(data.post);
  };
  console.log("RENDER");

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <MyPostsReduxForm onSubmit={onSubmit} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

export default MyPosts;
