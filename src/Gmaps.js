import React from 'react';
import axios from 'axios';
import store_directory from '../store_directory.json';
import mapStyles from '../styles';


const MEXICO = {
  lat: 19.4326,
  lng: -99.1332
};

let currentLocation = {}

class Gmaps extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    let map = new google.maps.Map(this.refs.map, {
      center: MEXICO,
      zoom: 10,
      styles: mapStyles

    });


     let geocoder = new google.maps.Geocoder();

     function geocodeAddress(geocoder, resultsMap, location) {
       geocoder.geocode({'address': location.Address}, function(results, status) {
         if (status === 'OK') {
            let infowindow = new google.maps.InfoWindow({
             content: location.Name,
             position: results[0].geometry.location
           });

           let marker = new google.maps.Marker({
             map: resultsMap,
             position: results[0].geometry.location
           });
            marker.addListener('click', function() {
             infowindow.open(map);
             currentLocation = location
             console.log(currentLocation)
           });
         } else {
           alert('Geocode was not successful for the following reason: ' + status);
         }
       })
     }


   this.serverRequest =
     axios
       .get('../store_directory.json')
       .then(function(result) {
         result.data.forEach(function(location){
           geocodeAddress(geocoder, map, location);


         })
       })


 }


 saveLocation = () => {
   console.log('button clicked', currentLocation)
 }

  render() {
    return (
      <div className="row">
        <div ref="map" style={style} className="map col-sm-12 col-sm-offset-2"></div>

        <button className="btn btn-success text-center"
          onClick={this.saveLocation}
          >
          Save Location
        </button>
      </div>

    )
  }
}

var style = {
      width: 800,
      height: 500
};

module.exports = Gmaps;
