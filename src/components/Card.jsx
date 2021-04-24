import React, { Component } from "react";

class Card extends Component {
  render() {
    return (
      <>
        <figure className="shadow-lg rounded-xl flex-none w-60rem">
          <div className="w-60rem">
            <img
              src={this.props.url}
              alt={this.props.title}
              className="image-crop w-60rem rounded-t-3xl"
            />
          </div>

          <figcaption className="flex items-center space-x-4 p-6 md:px-10 md:py-6 bg-primary-700 rounded-b-3xl leading-6 font-semibold text-white">
            <div className="flex-none  w-12 h-12  space-bg-white rounded-full flex items-center justify-center">
              <img
                src={this.props.author_url}
                alt="pfp"
                className="rounded-full w-3/5 h-3/5"
              />
            </div>
            <div className="flex-auto">
              <p className="text-5xl text-white">{this.props.title}</p>
              <br />
              <i
                className="fas fa-map-marker-alt text-gray-600 text-2xl text-gray"
                aria-hidden="true"
              ></i>
              <p className="inline-block text-2xl inter pl-4 text-gray">
                {this.props.location}
              </p>
            </div>
          </figcaption>
        </figure>
      </>
    );
  }
}

export default Card;
