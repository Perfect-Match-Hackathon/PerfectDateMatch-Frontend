import React, { Component } from "react";

export default class Container extends Component {
  render() {
    return (
      <>
        <div
          className="grid w-full h-full"
        >
          {this.props.children}
        </div>
      </>
    );
  }
}
