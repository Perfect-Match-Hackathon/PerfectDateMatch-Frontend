import { Component } from "react";
import { Redirect } from "react-router-dom";
import { ReactComponent as LogoLarge } from "../../assets/logo-large.svg";

import {
  createNewUser,
  validateSignUp,
  UserContext,
  spawnUser,
} from "../../utils";

class Register extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      errors: [],
      redirect: "/app",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { value, name } = event.target;

    this.setState({
      [name]: value,
      errors: [],
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.errors.length > 0) return;

    const _errors = validateSignUp(
      this.state.email,
      this.state.password,
      this.state.confirmPassword,
      this.state.firstName,
      this.state.lastName
    );

    if (_errors.length > 0) {
      this.setState({
        errors: _errors,
      });

      return;
    }

    createNewUser(this.state.email, this.state.password, (userCredential) => {
      spawnUser(
        this.state.firstName,
        this.state.lastName,
        userCredential.user.uid,
        this.state.socialMedia
      );

      return <Redirect to={this.state.redirect} />;
    });
  }

  userContext() {
    const _user = this.context;

    return _user;
  }

  render() {
    const {  isLoggedIn } = this.context;

    //? If Logged In;
    if (isLoggedIn) {
      return <Redirect push to="/app" />;
    }

    var emailErrorMessage,
      lastNameErrorMessage,
      firstNameErrorMessage,
      passwordErrorMessage,
      confirmPasswordErrorMessage,
      socialMediaErrorMessage;

    this.state.errors.forEach((error) => {
      // Switch statement? Never heard of it; (TODO: change to switch statement when have time)
      if (error.field === "password") passwordErrorMessage = error.message;
      else if (error.field === "email") emailErrorMessage = error.message;
      else if (error.field === "confirmPassword")
        passwordErrorMessage = error.message;
      else if (error.field === "socialMedia")
        socialMediaErrorMessage = error.message;
      else if (error.field === "firstName")
        firstNameErrorMessage = error.message;
      else if (error.field === "lastName") lastNameErrorMessage = error.message;
    });

    return (
      <div id="contianer" className="h-screen flex items-center justify-center">
        <div className="mb-4">
          <LogoLarge className="mx-auto mb-8" />
          <form onSubmit={this.handleSubmit}>
            <div className="form__group field mb-4 form__field__half">
              <input
                type="text"
                className="form__field form_field__overide"
                placeholder="firstname"
                name="firstName"
                id="firstname"
                autoComplete="off"
                value={this.state.firstName}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="firstname" className="form__label">
                First Name
              </label>
              {firstNameErrorMessage && (
                <p className="error">{firstNameErrorMessage}</p>
              )}
            </div>

            <div className="form__group field mb-4 form__field__half">
              <input
                type="text"
                className="form__field"
                placeholder="lastname"
                name="lastName"
                id="lastname"
                autoComplete="off"
                value={this.state.lastName}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="lastname" className="form__label">
                Last Name
              </label>
              {lastNameErrorMessage && (
                <p className="error">{lastNameErrorMessage}</p>
              )}
            </div>

            <div className="form__group field mb-4">
              <input
                type="email"
                className="form__field"
                placeholder="email"
                name="email"
                id="email"
                autoComplete="off"
                value={this.state.email}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="email" className="form__label">
                Email address
              </label>
              {emailErrorMessage && (
                <p className="error">{emailErrorMessage}</p>
              )}
            </div>

            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="password"
                name="password"
                id="password"
                autoComplete="off"
                value={this.state.password}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="Password" className="form__label">
                Password
              </label>
              {passwordErrorMessage && (
                <p className="error">{passwordErrorMessage}</p>
              )}
            </div>

            <div className="form__group field">
              <input
                type="password"
                className="form__field"
                placeholder="confirmpassword"
                name="confirmPassword"
                id="confirmpassword"
                autoComplete="off"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="confirmpassword" className="form__label">
                Confirm Password
              </label>
              {confirmPasswordErrorMessage && (
                <p className="error">{confirmPasswordErrorMessage}</p>
              )}
            </div>

            <div className="form__group field">
              <input
                type="text"
                className="form__field"
                placeholder="socialMedia"
                name="socialMedia"
                id="socialMedia"
                autoComplete="off"
                value={this.state.socialMedia}
                onChange={this.handleInputChange}
                required
              />
              <label htmlFor="socialMedia" className="form__label">
                Social Media URL
              </label>
              {socialMediaErrorMessage && (
                <p className="error">{socialMediaErrorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              className="flex mx-auto outline-none bg-accent hover:bg-accent-hover text-white disabled:text-primary font-bold py-3 px-14 mt-8 rounded-lg font-base"
            >
              SIGN UP
            </button>
          </form>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Register;
