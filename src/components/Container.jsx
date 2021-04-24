import React, { Component } from "react";

export default class Container extends Component {
  render() {
    return (
      <>
        <div
          className="grid w-full h-full"
          style={{
            gridTemplateRows: "1fr auto 1fr",
          }}
        >
          {this.props.children}
        </div>
      </>
    );
  }
}
