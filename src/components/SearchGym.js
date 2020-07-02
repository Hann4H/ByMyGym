import React, { Component } from "react";
import firebase from "../firebase";
import { Search, Grid } from "semantic-ui-react";
import _ from "lodash";
import PropTypes from "prop-types";
import GymItem from "../components/GymItem";

// search source page: https://react.semantic-ui.com/modules/search/

const db = firebase.firestore();

const resultRenderer = ({ nazwa }) => (
  <div style={{ color: "rgb(117, 117, 117)" }}>{nazwa}</div>
);

resultRenderer.propTypes = {
  nazwa: PropTypes.string,
  opis: PropTypes.string,
};

export default class SearchGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      results: [],
      value: "",
      data: [],
    };
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.nazwa });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1)
        return this.setState({
          isLoading: false,
          results: this.state.data,
          value: "",
        });

      const re = new RegExp(_.escapeRegExp(this.state.value), "i");
      const isMatch = (result) => re.test(result.nazwa);
      this.setState({
        isLoading: false,
        results: _.filter(this.state.data, isMatch),
      });
    }, 300);
  };

  componentDidMount() {
    db.collection("gyms")
      .orderBy("nazwa")
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() };
        });
        this.setState({ data: links, results: links });
        this.gymData = links;
        console.log("links: " + links);
        console.log("links data: " + this.gymData);
      });
  }

  render() {
    const { isLoading, value, results } = this.state;
    return (
      <>
        <Grid>
          <Grid.Column width={17}>
            <Search
              autoFocus
              fluid
              placeholder="Wprowadź nazwę"
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              resultRenderer={resultRenderer}
              {...this.props}
            />
            {this.state.results.map((gym, index) => (
              <GymItem key={gym.id} showCount={false} gym={gym} index={index} />
            ))}
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
