import React from 'react';
import axios from 'axios';
import { getDistance } from 'geolib';
import Geocode from "react-geocode";

Geocode.setApiKey('AIzaSyBbTKTqfRDmqoxF3pjT_H3i2kmmNzKDEkc');



class DistanceCalculator extends React.Component{
    
    state = {};

    componentDidUpdate(){
        window.onload = () => {
        Geocode.fromAddress("Groenland 4, Den Haag").then(
            (response) => {
            this.setState({
                latHome: response.results[0].geometry.location.lat,
                lngHome: response.results[0].geometry.location.lng
            })
            },


            (error) => {
              console.error(error);
            })
        
        Geocode.fromAddress("Fonteinkruidstraat 14, Den Haag").then(
            (response) => {
            this.setState({
                latDestination: response.results[0].geometry.location.lat,
                lngDestination: response.results[0].geometry.location.lng
            })
            },
            (error) => {
              console.error(error);
            }
          );
    }
}
    
    calculateDistance = () => {
        var dis = getDistance(
            { latitude: this.state.latHome, longitude: this.state.lngHome},
            { latitude: this.state.latDestination, longitude: this.state.lngDestination},
        );
        console.log(dis);
    }

    checkLats = () =>{
    console.log(this.state.latDestination);
    console.log("home: "+ this.state.latHome);

    }


    render(){
        this.checkLats();
        
        // console.log(this.state.latHome);
        
        return <h1></h1>;
    }

}

export default DistanceCalculator;