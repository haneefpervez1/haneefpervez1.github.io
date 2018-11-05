import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps'

/*
  This component uses the Google Maps API to render a map with some markers on it. The markers show the most popular
  starting and ending stations, and the average starting and ending positions.
*/


class Map extends Component {
    constructor(props){
        super(props);
    }
  render(){
    const GoogleMapExample = withGoogleMap(props => (
        <GoogleMap 
         defaultCenter = { { lat: 34.03930875830339, lng: -118.2203837593023}}
         defaultZoom = {13}
         >
        <Marker 
           label={"3069"}
           position={ { lat: 34.0460701, lng: -118.23309 } }
        />
        <Marker 
           label={"3005"}
           position={ { lat: 34.0569687, lng: -118.25359 } }
        />
        <Marker 
           label={"Average Starting Position"}
           position={ { lat: 34.03930875830339, lng: -118.2203837593023} }
        />
        <Marker 
           label={"Average Ending Position"}
           position={ { lat: 34.03461425703138, lng: -118.2066416953904 } }
        />
        </GoogleMap>
    ));
    return(
      <div>
      <GoogleMapExample
        containerElement={ <div style={{ height: `500px`, width: '1450px' }} /> }
        mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    );
  }
};

export default Map;