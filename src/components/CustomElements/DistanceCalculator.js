import React from 'react';
import { getDistance } from 'geolib';
import Geocode from "react-geocode";

Geocode.setApiKey('AIzaSyDSL79ceVElyvymC_WjjYJtSftaQJhzl0E');



class DistanceCalculator extends React.Component{
    
    state = { latHome: "", lngHome: "", latDestination: "", lngDestination: "" };

    getLocations = () => {
        
        Geocode.fromAddress("Neptunus 49, Katwijk").then(
            (response) => {
            this.setState({
                latHome: response.results[0].geometry.location.lat,
                lngHome: response.results[0].geometry.location.lng
            })
            
            },


            (error) => {
              console.error(error);
            })
        
        Geocode.fromAddress("Schipholweg, Leiden").then(
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

          console.log(this.state.latDestination);

          let calculateDistance = () => {
            var dis = getDistance(
                { latitude: this.state.latHome, longitude: this.state.lngHome},
                { latitude: this.state.latDestination, longitude: this.state.lngDestination},
                
            );
            console.log("afstand in meter: " + dis);
          }

          calculateDistance();
}
    



    render(){
        
        return (
        <button onClick={this.getLocations}>Hallo</button>

        )}

}

export default DistanceCalculator;