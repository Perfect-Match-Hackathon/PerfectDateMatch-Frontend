import React, { Component } from "react";
import { UserContext, watchNotifications } from "../../utils";
import * as axios from "axios";

import Card from "../../components/Card";
import Notification from "../../components/Notification";

import { ReactComponent as Tick } from "../../assets/tick.svg";
import { ReactComponent as Cross } from "../../assets/cross.svg";

class App extends Component {
  static contextType = UserContext;

  constructor(props) {
    super(props);

    this.state = {
      url:
        "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
      author_url:
        "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
      title: "No more events left",
      location: "Sad town",
      id: null,
      hasNotification: false,
      notification_name: "",
      notification_link: "",
      notification_title: "",
      notification_id: "",
    };

    this.handleYes = this.handleYes.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.getNewData = this.getNewData.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.clearNotifications = this.clearNotifications.bind(this);
  }

  async getNewData() {
    const { userToken } = this.context;

    return axios
      .get(`${process.env.REACT_APP_API_URL}/collection/dates/`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
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
    var i = (events.length * Math.random()) << 0;
    var event = this.state._events[events[i]];

    delete this.state._events[events[i]];

    if (event) event.id = events[i];

    return event;
  }

  async handleYes(event) {
    event.preventDefault();
    const { userToken } = this.context;

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    const post = {
      test: "asd",
    };

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/collection/dates/response/${this.state.id}/true`,
        post,
        { headers }
      )

    const _event = await this.getRandomUnusedEvent();

    if (!_event || !Object.keys(_event).length) {
      this.setState({
        url:
          "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
        author_url:
          "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
        title: "No more events left",
        location: "Sad town",
      });
    } else {
      this.setState({
        url: _event.thumbnail,
        title: _event.title,
        location: _event.location,
        id: _event.id,
      });
    }
  }

  async handleNo(event) {
    event.preventDefault();
    const { userToken } = this.context;
    const headers = {
      Authorization: `Bearer ${userToken}`,
    };
    const post = {
      test: "asd",
    };

    await axios.post(
      `${process.env.REACT_APP_API_URL}/collection/dates/response/${this.state.id}/false`,
      post,
      { headers }
    );

    const _event = await this.getRandomUnusedEvent();

    if (!_event || !Object.keys(_event).length) {
      this.setState({
        url:
          "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
        author_url:
          "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
        title: "No more events left",
        location: "Sad town",
      });
    } else {
      this.setState({
        url: _event.thumbnail,
        title: _event.title,
        location: _event.location,
        id: _event.id,
      });
    }
  }

  async componentDidMount() {
    const { currentUser, userToken } = this.context;
    const _event = await this.getRandomUnusedEvent();

    if (!_event || !Object.keys(_event).length) {
      this.setState({
        url:
          "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
        author_url:
          "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
        title: "No more events left",
        location: "Sad town",
      });
    } else {
      this.setState({
        url: _event.thumbnail,
        title: _event.title,
        location: _event.location,
        id: _event.id,
      });
    }

    await watchNotifications(currentUser.uid, async (snapshot) => {
      const dateId = snapshot.key;
      var _data;

      await axios
        .get(`${process.env.REACT_APP_API_URL}/collection/dates/${dateId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        })
        .then((data) => data.data)
        .then((data) => (_data = data));


      axios
        .get(
          `${process.env.REACT_APP_API_URL}/collection/datematch/${dateId}`,
          {
            headers: {
              Authorization: `Bearer ${userToken}`,
            },
          }
        )
        .then((data) => data.data)
        .then((data) => {
          this.setState({
            notification_link: data.socialMedia,
            notification_name: data.firstName,
            notification_title: _data.title,
            notification_id: dateId,
            hasNotification: true,
          });

        });
    });
  }

  clearNotifications() {
    const { userToken } = this.context;
    
    const post = {
      "random": "pls rito"
    };

    axios.post(
      `${process.env.REACT_APP_API_URL}/collection/dates/response/${this.state.notification_id}/false`,
      post,
      {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      }
    );

    this.setState({
      hasNotification: false,
      notification_link: "",
      notification_name: "",
      notification_title: "",
      notification_id: "",
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
              onClick={this.handleNo}
              className="text-base py-4 px-8 inline-block outline-none focus:ring-4 focus:ring-secondary bg-custom mr-15rem mt-8"
            >
              <Cross />
            </button>
            <button
              onClick={this.handleYes}
              className="text-base py-4 px-8 inline-block outline-none focus:ring-4 focus:ring-secondary bg-custom"
            >
              <Tick />
            </button>
          </div>
        </div>

        {this.state.hasNotification && (
          <div id="notification bar" className="w-1/7 flex ml-8 mb-4">
            <Notification
              link={this.state.notification_link}
              firstName={this.state.notification_name}
              title={this.state.notification_title}
              clearNotification={this.clearNotifications}
            />
          </div>
        )}
      </>
    );
  }
}

export default App;
