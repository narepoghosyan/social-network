import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { loginApi } from "../../api/api";
import { login } from "../../redux/auth-reducer";
import { required } from "../../utils/validators/validators";
import { createField, Input } from "../common/FormsControls/FormsControls";
import styles from "./../common/FormsControls/FormsControls.module.css";

const LoginForm = ({ handleSubmit, error, captchaURL }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField("email", Input, [required], "Email")}
      {createField("password", Input, [required], "Password", {
        type: "password",
      })}
      {createField(
        "rememberMe",
        Input,
        [],
        "",
        { type: "checkbox" },
        "Remember me"
      )}
      {captchaURL && <img src={captchaURL} />}
      {captchaURL &&
        createField("captcha", Input, [required], "Captcha symbols")}
      {error && <div className={styles.formSummaryError}>{error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

const LoginReduxForm = reduxForm({
  form: "login",
})(LoginForm);

const Login = (props) => {
  const onSubmit = (data) => {
    props.login(data.email, data.password, data.rememberMe, data.captcha);
  };

  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
      <h1>Login form</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaURL={props.captchaURL} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return { isAuth: state.auth.isAuth, captchaURL: state.auth.captchaURL };
};

export default connect(mapStateToProps, { login })(Login);
