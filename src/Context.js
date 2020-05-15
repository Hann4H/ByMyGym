import React, { Component } from "react";
import items from "./testData";


const GymContext = React.createContext();



class GymProvider extends Component {
    state={
        rooms:[],
        sortedGymss:[],
        sampleGyms:[],
        loading: true
    };

    componentDidMount(){
        let gyms = this.formatData(items);
        let sampleGyms = gyms.filter(gym => gym.feature === true);
        this.setState({
            gyms, sampleGyms, sortedGyms:gyms, loading:false
        })
    }

    formatData(items){
        let tempItems = items.map(item => {
            let id = item.sys.id;
            let images = item.fields.images.map(image => image.fields.file.url);
            let gym = { ...item.fields, images:images, id};
            return gym;
        });
        return tempItems
    }

    render() {
        return <GymContext.Provider value={{...this.state}}>
            {this.props.children}
        </GymContext.Provider>;
    }
}

const GymConsumer = GymContext.Consumer;

export{GymProvider, GymConsumer, GymContext}