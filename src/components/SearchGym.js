import React, { Component } from "react";
import firebase from "../firebase";
import { Search, Grid, Header, Segment } from "semantic-ui-react";
import _ from "lodash";
import faker from "faker";
// https://codesandbox.io/s/uyowr?module=/example.js&file=/example.js:0-22
// https://react.semantic-ui.com/usage

// https://stackoverflow.com/questions/39065786/auto-increment-a-value-in-firebase-with-javascript
// https://firebase.google.com/docs/database/web/lists-of-data

const db = firebase.firestore();

const initialState = { isLoading: false, results: [], value: "" };

// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, "$"),
// }));

export default class SearchGym extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false, results: [], value: "", data: [] };
  }

  handleResultSelect = (e, { result }) =>
    this.setState({ value: result.nazwa });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

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
      .get()
      .then((snapshot) => {
        const links = snapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() };
        });
        this.setState({ data: links });
        this.gymData = links;
        console.log("links: " + links);
        console.log("links data: " + this.gymData);
      });
  }

  render() {
    const { isLoading, value, results } = this.state;
    console.log("nr 3:" + this.gymData);
    return (
      <>
        <div id="idk3"></div>
        <Grid>
          <Grid.Column width={6}>
            <Search
              loading={isLoading}
              onResultSelect={this.handleResultSelect}
              onSearchChange={_.debounce(this.handleSearchChange, 500, {
                leading: true,
              })}
              results={results}
              value={value}
              {...this.props}
            />
          </Grid.Column>
          <Grid.Column width={10}>
            <Segment>
              <Header>State</Header>
              <pre style={{ overflowX: "auto" }}>
                {JSON.stringify(this.state.results, null, 2)}
              </pre>
              <Header>Options</Header>
              <pre style={{ overflowX: "auto" }}>
                {JSON.stringify(this.state.data, null, 2)}
              </pre>
            </Segment>
          </Grid.Column>
        </Grid>
      </>
    );
  }
}
