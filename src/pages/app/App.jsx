import React, { Component } from "react";
import Card from "../../components/Card";
import { UserContext } from "../../utils";
import * as axios from "axios";

import { ReactComponent as Tick } from "../../assets/tick.svg";
import { ReactComponent as Cross } from "../../assets/cross.svg";

class App extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      url:
        "https://archinect.imgix.net/uploads/c2/c2a190686138bc7348491e2ba264b508.jpg?auto=compress%2Cformat",
      author_url:
        "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
      title: "Medieval Dueling",
      location: "NYC, Centeral Park",
    };

    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.getNewData = this.getNewData.bind(this);
  }

  async getNewData() {
    const { userToken } = this.context;

    console.log(userToken["i"]);
    return axios
      .get(`https://perfectmatchbackend.herokuapp.com/collection/dates/`, {
        headers: {
          Authorization: `Bearer ${userToken["i"]}`,
        },
      })
      .then((data) => (this.state._events = data.data));
  }

  async getRandomUnusedEvent(loopstop) {
    if (!this.state._events && loopstop) return "failed";
    if (!this.state._events) {
      await this.getNewData();
      return this.getRandomUnusedEvent("prevent");
    }

    var events = Object.keys(this.state._events);
    var event = this.state._events[
      events[(events.length * Math.random()) << 0]
    ];

    console.log(event);
    console.log(events);
    return event;
  }

  async handleYes(event) {
    event.preventDefault();

    const _event = await this.getRandomUnusedEvent();

    this.setState({
      url: _event.thumbnail,
      title: _event.title,
      location: _event.location,
    });
  }

  async handleNo(event) {
    event.preventDefault();
    const _event = await this.getRandomUnusedEvent();

    this.setState({
      url: _event.thumbnail,
      title: _event.title,
      location: _event.location,
    });
  }

  render() {
    return (
      <>
        <div className="p-3 flex flex-col mt-8 items-center">
          <Card
            url={this.state.url}
            author_url={this.state.author_url}
            title={this.state.title}
            location={this.state.location}
          />

          <div className="flex-auto">
            <button
              onClick={this.handleYes}
              className="text-base py-4 px-7 inline-block outline-none focus:ring-4 focus:ring-secondary mr-15rem mt-8 bg-custom"
            >
              <Tick />
            </button>
            <button
              onClick={this.handleNo}
              className="text-base py-4 px-8 inline-block outline-none focus:ring-4 focus:ring-secondary bg-custom"
            >
              <Cross />
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default App;