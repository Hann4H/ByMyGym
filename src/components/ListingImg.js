import React, {Component} from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import "firebase/storage";


class ListingImg extends Component {



    render() {
        return (
            <div>
                <img src={ this.state.img }/>
            </div>
        )

    }
}

export default ListingImg;
