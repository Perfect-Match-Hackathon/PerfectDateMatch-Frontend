import { Component } from "react";
import { Redirect } from "react-router-dom";
import { ReactComponent as LogoLarge } from "../../assets/logo-large.svg";

import { authenticate, validateSignIn, UserContext } from "../../utils";

class Login extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      errors: [],
      redirect: "",
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

    const _errors = validateSignIn(this.state.email, this.state.password);

    if (_errors.length > 0) {
      this.setState({
        errors: _errors,
      });

      return;
    }

    return authenticate(
      this.state.email,
      this.state.password,
      () => {
        console.log("authenticated");
          console.log("attempting to redirect");
          this.setState({
            redirect: "/app",
          });
      },
      () => {
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
      }
    );
  }

  render() {
    // eslint-disable-next-line
    const { isLoggedIn } = this.context;
    //? if attempting to reroute
    if (this.state.redirect) {
      // wait 3 seconds before redirect, so the token doesn't get set during next pages RENDER()
      return <Redirect to={this.state.redirect} />;
    }

    //? If Logged In;
    if (isLoggedIn) {
      this.setState({
        redirect: "/app",
      });
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

            <button
              type="submit"
              className="flex outline-none bg-accent hover:bg-accent-hover text-white disabled:text-primary font-bold py-3 px-14 mt-8 rounded-lg font-base"
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

export default Login;
