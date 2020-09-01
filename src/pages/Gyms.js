import React, { Component } from "react";
import Listing from "../components/Listing";
import firebase from "firebase";
import ReactPaginate from 'react-paginate';

class Gyms extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      Gyms: [],
      offset: 0,
      perPage: 12,
      currentPage: 1 
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
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }

  receivedData() {
    const slice = this.state.Gyms.slice(this.state.offset, this.state.offset + this.state.perPage)
    
    const postData = slice.map(pd => <React.Fragment>
      <div className="flex-row-item">
      <p>{pd.gymName}</p>
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
            {/* <div className="flex-row-container">
              {this.state.Gyms.map((gym, index) => (
                <div className="flex-row-item">
                  <p>{gym.gymName}</p>
                </div>
              ))}
            </div> */}
            <div>
              <div className="flex-row-container">
                {this.state.postData}
              </div>
                <ReactPaginate
                    previousLabel={"poprzednie"}
                    nextLabel={"następne"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
            </div>
          </div>
        <div id="pls" />
      </div>
    );
  }
}
export default Gyms;
