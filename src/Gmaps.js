var React = require('react');
var axios = require('axios');
var store_directory = require('../store_directory.json');
var mapStyles = require('../styles');


const MEXICO = {
  lat: 19.4326,
  lng: -99.1332
};

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

     function geocodeAddress(geocoder, resultsMap, address) {
       geocoder.geocode({'address': address}, function(results, status) {
         if (status === 'OK') {
           resultsMap.setCenter(results[0].geometry.location);
           this.marker = new google.maps.Marker({
             map: resultsMap,
             position: results[0].geometry.location
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
           geocodeAddress(geocoder, map, location.Address);
         })
       })

 }

  render() {
    return (
      <div className="row">
        <div ref="map" style={style} className="map col-sm-12 col-sm-offset-2"></div>
      </div>
    )
  }
}

var style = {
      width: 800,
      height: 500
};

module.exports = Gmaps;
