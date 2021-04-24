import React, { Component } from "react";
import Login from "../account/Login";
import { ReactComponent as IconLarge } from "../../assets/icon-large.svg";

export default class LandingPage extends Component {
  constructor(props) {
    super(props);

    this.props = props;
  }

  render() {
    return (
      <>
        <div className="md:grid md:grid-cols-2 md:divide-y">
          {/* LEFT */}
          <div className=" flex justify-center items-center hidden md:flex w-full h-100 m-6 gap-5 bg-primary-800 sm:rounded-8 flex justify-center items-center">
            <IconLarge width={400} height={800} />
          </div>

          {/* RIGHT */}
          <Login />
        </div>
      </>
    );
  }
}
