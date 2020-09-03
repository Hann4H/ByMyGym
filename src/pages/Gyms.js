import React, { Component } from "react";
import Listing from "../components/Listing";
import firebase from "firebase";
import ReactPaginate from 'react-paginate';
import Loading from "../components/Loading";
import { FaSearch } from "react-icons/fa";

class Gyms extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      Gyms: [],
      offset: 0,
      perPage: 8,
      currentPage: 1,
      loading: false
    };
    this.handlePageClick = this
            .handlePageClick
            .bind(this);
  }

  

  componentDidMount() {
    firebase
      .firestore()
      .collection("gyms")
      .get()
      .then((querySnapshot) => {
        const Gyms = [];

        this.state.loading = true;

        querySnapshot.forEach(function (doc) {
          Gyms.push({
            gymName: doc.data().gymName,
            gymStreet: doc.data().gymStreet,
            gymCity: doc.data().gymCity,
            gymZip: doc.data().gymZip,
            gymURL: doc.data().gymURL,
            gymPhone: doc.data().gymPhone,
            gymEmail: doc.data().gymEmail,
            gymPhoto: doc.data().gymPhoto,
            gymDescription: doc.data().gymDescription,
            gymLat: doc.data().gymLat,
            gymLng: doc.data().gymLng,

            gymHeight: doc.data().gymHeight,
            gymWidth: doc.data().gymWidth,
            gymLength: doc.data().gymLength,
            gymPrice: doc.data().gymPrice,
            id: doc.data().id,
          });
        });
        this.setState({ Gyms });
        // console.log(Gyms);
        this.receivedData()
        this.state.loading = true;
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  receivedData() {
    const slice = this.state.Gyms.slice(this.state.offset, this.state.offset + this.state.perPage)
    
    const postData = slice.map(pd => <React.Fragment>
      <div className="flex-row-item">
        <div className="pic-fa">
          {pd.gymPhoto ? (
            <img className="small-pic" src={pd.gymPhoto} />
            ) : (
            <img
              className="small-pic"
              src={require("../img/no_image.svg.png")}
              alt="nothing"
            />
          )}
          <FaSearch className="gym-fa" />
        </div>
      <p className="gym-p">{pd.gymName}</p>
      
      </div>
    </React.Fragment>)

    this.setState({
        pageCount: Math.ceil(this.state.Gyms.length / this.state.perPage),
      
        postData
    })
  }


  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset
    }, () => {
        this.receivedData()
    });

};

  render() {



    return (
      <div>
        <div id="pls" />
          <div className="gyms-container">
          <div className="gyms-load">
                {this.state.loading ? null : <Loading />}
              </div>
            <div>
              
              <div className="flex-row-container">
                {this.state.postData}
              </div>
              <div className="pagination-out">
                <ReactPaginate
                    previousLabel={"<"}
                    nextLabel={">"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={1}
                    pageRangeDisplayed={0}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
              </div>
            </div>
          </div>
        <div id="pls" />
      </div>
    );
  }
}
export default Gyms;
