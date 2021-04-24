import { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { ReactComponent as LogoLarge } from "../../assets/logo-large.svg";

import { authenticate, validate, UserContext } from "../../utils";

class Login extends Component {
  static userContext = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errors: [],
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    console.log(event);
    const { value, name } = event.target;

    console.log(value, name)
    this.setState({
      [name]: value,
      errors: [],
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.errors.length > 0) return;

    const _errors = validate(this.state.email, this.state.password);

    if (_errors.length > 0) {
      this.setState({
        errors: _errors,
      });

      return;
    }

    authenticate(this.state.email, this.state.password)
      .then(() => console.log("Success"))
      .catch((e) => {
        this.setState({
          errors: [
            {
              field: "password",
              message: "Invalid Email or Password",
            },
            {
              field: "email",
              message: "Invalid Email or Password",
            },
          ],
        });
      });
  }

  render() {
    // eslint-disable-next-line
    const { currentUser, isLoggedIn } = Login.userContext;

    //? If Logged In;
    if (isLoggedIn) {
      return <Redirect to="/"></Redirect>;
    }

    var emailErrorMessage;
    var passwordErrorMessage;

    this.state.errors.forEach((error) => {
      if (error.field === "password") passwordErrorMessage = error.message;
      else if (error.field === "email") emailErrorMessage = error.message;
    });

    return (
      <div id="contianer" className="h-screen flex items-center justify-center">
        <div className="mb-4">
          <LogoLarge className="mx-auto mb-8" />
          <form onSubmit={this.handleSubmit}>
            <div class="form__group field mb-4">
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
              <label for="email" class="form__label">
                Email address
              </label>
              {emailErrorMessage && (
                <p className="error">{emailErrorMessage}</p>
              )}
            </div>

            <div class="form__group field">
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
              <label for="Password" class="form__label">
                Password
              </label>
              {passwordErrorMessage && (
                <p className="error">{passwordErrorMessage}</p>
              )}
            </div>

            <button
              type="submit"
              className="flex outline-none bg-accent hover:bg-accent-hover text-white disabled:text-primary font-bold py-3 px-14 mt-8 rounded-lg font-base"
            >
              SIGN IN
            </button>
          </form>
          <div className="flex justify-center items-center">
            <p className="mt-4 text-white">New to DateMatch? <Link to="/register" className="link"><u>Create an account</u></Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
