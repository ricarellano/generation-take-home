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

     function geocodeAddress(geocoder, resultsMap, location) {
       geocoder.geocode({'address': location.Address}, function(results, status) {
         if (status === 'OK') {
            let infowindow = new google.maps.InfoWindow({
             content: location.Name + ' ' + '<button>save</button>',
             position: results[0].geometry.location
           });

           let marker = new google.maps.Marker({
             map: resultsMap,
             position: results[0].geometry.location
           });
            marker.addListener('click', function() {
             infowindow.open(map);
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
