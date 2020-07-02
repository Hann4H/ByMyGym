import React, { Component } from "react";
import firebase from "../firebase";
import { Search, Grid, Header, Segment, Label } from "semantic-ui-react";
import _ from "lodash";
import PropTypes from "prop-types";
import faker from "faker";
import GymItem from "../components/GymItem";

// https://codesandbox.io/s/uyowr?module=/example.js&file=/example.js:0-22
// https://react.semantic-ui.com/usage
// https://react.semantic-ui.com/modules/search/

// https://stackoverflow.com/questions/39065786/auto-increment-a-value-in-firebase-with-javascript
// https://firebase.google.com/docs/database/web/lists-of-data

const db = firebase.firestore();

const initialState = {
  isLoading: false,
  results: [],
  value: "",
};

// const source = _.times(5, () => ({
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, "$"),
// }));

// const categoryLayoutRenderer = ({ categoryContent, resultsContent }) => (
//     <div>
//       <h3 className='name'>{categoryContent}</h3>
//       <div style={{ background: 'red' }} className='results'>
//         {resultsContent}
//       </div>
//     </div>
//   )

//   categoryLayoutRenderer.propTypes = {
//     categoryContent: PropTypes.node,
//     resultsContent: PropTypes.node,
//   }

//   const categoryRenderer = ({ name }) => <Label as='span' content={name} />

//   categoryRenderer.propTypes = {
//     name: PropTypes.string,
//   }

const resultRenderer = ({ nazwa }) => <Label content={nazwa} />;

resultRenderer.propTypes = {
  nazwa: PropTypes.string,
  opis: PropTypes.string,
};

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

      //   const filteredResults = _.reduce(
      //     source,
      //     (memo, data, name) => {
      //       const results = _.filter(data.results, isMatch)
      //       if (results.length) memo[name] = { name, results } // eslint-disable-line no-param-reassign

      //       return memo
      //     },
      //     {},
      //   )

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
    return (
      <>
        <div id="idk3"></div>
        <Grid>
          <Grid.Column width={17}>
            <Search
              // category
              // categoryLayoutRenderer={categoryLayoutRenderer}
              // categoryRenderer={categoryRenderer}
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

          {/* <Grid.Column width={10}>
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
          </Grid.Column> */}
        </Grid>
      </>
    );
  }
}
