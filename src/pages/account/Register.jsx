import { Component } from "react";
import { Redirect } from "react-router-dom";
import { ReactComponent as LogoLarge } from "../../assets/logo-large.svg";

import { createNewUser, validateSignUp, UserContext } from "../../utils";

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
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    console.log(event);
    const { value, name } = event.target;

    console.log(value, name);
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
      var user = userCredential.user;
      console.log(`user: `, { user });
      console.log(`userCredential: `, { userCredential });

      const { currentUser, isLoggedIn } = this.context;
      console.log(`Register`, { currentUser, isLoggedIn });
      return <Redirect push to="/app"></Redirect>;
    });
  }

  userContext() {
    const _user = this.context;

    return _user;
  }

  render() {
    //eslint-disable-next-line
    const { currentUser, isLoggedIn } = this.context;

    //? If Logged In;
    if (isLoggedIn) {
      return <Redirect push to="/app"></Redirect>;
    }

    var emailErrorMessage;
    var lastNameErrorMessage;
    var firstNameErrorMessage;
    var passwordErrorMessage;
    var confirmPasswordErrorMessage;

    this.state.errors.forEach((error) => {
      if (error.field === "password") passwordErrorMessage = error.message;
      else if (error.field === "email") emailErrorMessage = error.message;
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

            <button
              type="submit"
              className="flex mx-auto outline-none bg-accent hover:bg-accent-hover text-white disabled:text-primary font-bold py-3 px-14 mt-8 rounded-lg font-base"
            >
              SIGN IN
            </button>
          </form>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Register;
