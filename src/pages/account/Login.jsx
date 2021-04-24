import { Component } from "react";
import { Redirect } from "react-router-dom";
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
            <LogoLarge />
            <div className="flex items-center">
            </div>
        </div>
    );
  }
}

export default Login;
