import React, { Component } from "react";

class Notification extends Component {
  constructor(props) {
      super(props);

      this.clearNotification = this.clearNotification.bind(this);
  }

  clearNotification() {
      this.props.clearNotification();
  }

  render() {
    return (
      <div id="notification" className="py-2 px-4 rounded bg-primary-700">
        <p className="text-white text-bold">
          You matched with{" "}
          <a href={this.props.link} alt="link to users pfp">
            <u>{this.props.firstName}</u> on {this.props.title}
          </a>
          <button onClick={this.clearNotification} className="error ml-4">X</button>
        </p>
      </div>
    );
  }
}

export default Notification;
