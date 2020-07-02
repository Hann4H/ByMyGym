import React, { Component } from "react";
import SearchGym from "../components/SearchGym";
import SearchCSS from "../theme/SearchCSS";

class Search extends Component {
  render() {
    return (
      <div>
        <SearchCSS>
          <SearchGym />
        </SearchCSS>
      </div>
    );
  }
}

export default Search;
