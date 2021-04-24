import React, { Component } from "react";
import Card from "../../components/Card";
import { UserContext } from "../../utils";
import * as axios from "axios";

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

  getNewData() {
    const { userToken } = this.context;

    axios
      .get(`https://perfectmatchbackend.herokuapp.com/collection/dates/list`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then((data) => console.log(data.data));
  }

  handleYes(event) {
    event.preventDefault();

    const _event = this.getNewData();

    this.setState({
      url:
        "https://www.denverpost.com/wp-content/uploads/2017/06/film-despicable-review-adv30-ed62de0a-5c40-11e7-a9f6-7c3296387341.jpg?w=1024&h=661",
      title: "Despicable Me",
      location: "Eastern Europe",
    });
  }

  handleNo(event) {
    event.preventDefault();
    this.getNewData();

    this.setState({
      url:
        "https://archinect.imgix.net/uploads/c2/c2a190686138bc7348491e2ba264b508.jpg?auto=compress%2Cformat",
      author_url:
        "https://camo.githubusercontent.com/e23dcbd59a1ffa2e8a0179d6e994f0e03eb3af102480b93a21f3e13bf3e2537c/68747470733a2f2f692e696d6775722e636f6d2f6a53524e6b58482e6a7067",
      title: "Medieval Dueling",
      location: "NYC, Centeral Park",
    });
  }

  render() {
    return (
      <>
        <div className="p-3 flex flex-col items-center">
          <Card
            url={this.state.url}
            author_url={this.state.author_url}
            title={this.state.title}
            location={this.state.location}
          />

          <button onClick={this.handleYes}>Yes</button>
          <button onClick={this.handleNo}>No</button>
        </div>
      </>
    );
  }
}

export default App;
