import React, { Component } from "react";
import Login from "../account/Login";
import Register from "../account/Register";
import { ReactComponent as IconLarge } from "../../assets/icon-large.svg";

export default class LandingPage extends Component {

  constructor(props) {
    super(props);

    this.props = props;
    this.state = {
      isLogin: this.props.isLogin
    };

    this.handleLink = this.handleLink.bind(this);
  }

  handleLink() {
    this.setState({ isLogin: !this.state.isLogin });  
  }

  render() {
    return (
      <>
        <div className="md:grid md:grid-cols-2 md:divide-y">
          {/* Container && Logo */}
          <div className=" flex justify-center items-center hidden md:flex w-full h-100 m-6 gap-5 bg-primary-800 sm:rounded-8 flex justify-center items-center">
            <IconLarge width={400} height={800} />
          </div>

          <div>
            {this.state.isLogin ? (
              <Login>
                <div className="flex justify-center items-center">
                  <p className="mt-4 text-white">
                    New to DateMatch?{" "}
                    <button onClick={this.handleLink} className="link">
                      <u>Create an account</u>
                    </button>
                  </p>
                </div>
              </Login>
            ) : (
              <Register>
                <div className="flex justify-center items-center">
                  <p className="mt-4 text-white">
                    Already have a DateMatch account?{" "}
                    <button onClick={this.handleLink} className="link">
                      <u>Sign In</u>
                    </button>
                  </p>
                </div>
              </Register>
            )}
          </div>
        </div>
      </>
    );
  }
}
