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
        <div className="grid grid-cols-2 divide-y">
          {/* LEFT */}
          <div className="w-full h-80 m-6 gap-5 bg-primary-800 sm:rounded-8 flex justify-center items-center">
            <IconLarge width={400} height={800}/>
          </div>

          {/* RIGHT */}
          <Login />
        </div>
      </>
    );
  }
}
