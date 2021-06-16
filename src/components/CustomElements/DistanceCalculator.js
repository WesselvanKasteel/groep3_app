import React, { useState, useEffect } from 'react';
import { getDistance } from 'geolib';
import Geocode from 'react-geocode';

Geocode.setApiKey('AIzaSyDSL79ceVElyvymC_WjjYJtSftaQJhzl0E');

const DistanceCalculator = () => {
    const [latHome, setLatHome] = useState('');
    const [lngHome, setLngHome] = useState('');
    const [latDestination, setLatDestination] = useState('');
    const [lngDestination, setLngDestination] = useState('');

    useEffect(() => {
        getLocations();
    }, []);

    const getLocations = () => {
        Geocode.fromAddress('Neptunus 49, Katwijk').then(response => {
            setLatHome(response.results[0].geometry.location.lat);
            setLngHome(response.results[0].geometry.location.lng);
        }).catch(error => console.log(error));

        Geocode.fromAddress('Schipholweg, Leiden').then(response => {
            setLatDestination(response.results[0].geometry.location.lat);
            setLngDestination(response.results[0].geometry.location.lng);
        }).catch(error => console.log(error));

        const distance = getDistance(
            {
                latitude: latHome,
                longitude: lngHome,
            },
            {
                latitude: latDestination,
                longitude: lngDestination,
            }
        );

        console.log(`De afstand is: ${distance} meter`);    
    }

    return(
        <button onClick={getLocations}>Bereken afstand</button>
    );
};

export default DistanceCalculator;


// class DistanceCalculator extends React.Component{
    
//     state = { latHome: "", lngHome: "", latDestination: "", lngDestination: "" };

//     getLocations = () => {
        
//         Geocode.fromAddress("Neptunus 49, Katwijk").then(
//             (response) => {
//             this.setState({
//                 latHome: response.results[0].geometry.location.lat,
//                 lngHome: response.results[0].geometry.location.lng
//             })
            
//             },


//             (error) => {
//               console.error(error);
//             })
        
//         Geocode.fromAddress("Schipholweg, Leiden").then(
//             (response) => {
//             this.setState({
//                 latDestination: response.results[0].geometry.location.lat,
//                 lngDestination: response.results[0].geometry.location.lng
//             })
//             },
//             (error) => {
//               console.error(error);
//             }
//           );

//           console.log(this.state.latDestination);

          
//           }

//           calculateDistance = () => {
//             var dis = getDistance(
//                 { latitude: this.state.latHome, longitude: this.state.lngHome},
//                 { latitude: this.state.latDestination, longitude: this.state.lngDestination},
                
//             );
//             console.log("afstand in meter: " + dis);

          
// }
    



//     render(){
        
//         return (
//         <button onClick={this.calculateDistance}>Hallo</button>

//         )}

// }

// export default DistanceCalculator;