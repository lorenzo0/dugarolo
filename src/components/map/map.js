import React, { Component } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

class MapView extends Component {
  constructor(props) {
    super(props);
    let position = props.position;
    this.state = {
      items: [],
      isLoaded: false,
      currentLocation: {lat: position.lat, lng: position.long},
      zoom: 10,
    }
  }

  componentDidMount(){
    fetch('http://mml.arces.unibo.it:3000/v0/WDmanager/%7Bid%7D/WDMInspector/%7Bispector%7D/assigned_farms')
        .then( res => res.json())
        .then( json => {
            this.setState({
                isLoaded: true,
                items: json,
            })
        } );
}

  render() {
    const { items, isLoaded, currentLocation, zoom } = this.state;
    const farms = [];
    const purpleOptions = { color: 'purple' }

    const renderData = items.map((payload) => {
      return payload.fields.map(fields =>{
        farms.push({id:payload.name, field:fields});
      }).join("\n")
    }).join("\n")    

    if(!isLoaded)
        return <div> Loading... </div>;
    else{

      return (
          <MapContainer center={currentLocation} zoom={zoom}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />

          {farms.map(farm => (
            <Polygon pathOptions={purpleOptions} positions={farm.field.area} />
          ))}
            
          </MapContainer>
      );
    }
  }
}


export default MapView;

/*
id
{"name":"http://swamp-project.org/cbec/farmer_91268487",
"location":{"lat":44.829997852407445,"lon":10.5473201941384},
"fields":[
  {"id":"http://swamp-project.org/cbec/field_25905",
  "location":{"lon":10.5481341798491,"lat":44.8314080153867},
  "area":[
      {"lon":10.5481341798491,"lat":44.8314080153867},
      {"lon":10.5500414684569,"lat":44.8311461729286},
      {"lon":10.5500035734655,"lat":44.8308570860147},
      {"lon":10.5503024603645,"lat":44.8301987446831},
      {"lon":10.5500121547528,"lat":44.8300525215735},
      {"lon":10.5488582439921,"lat":44.8280516937209},
      {"lon":10.5471086051994,"lat":44.8285688043852},
      {"lon":10.546710683279,"lat":44.8289066995902},
      {"lon":10.5481341798491,"lat":44.8314080153867}]},
  {"id":"http://swamp-project.org/cbec/field_30185",
  "location":{"lon":10.5465062084277,"lat":44.8285876894282},
  "area":[
      {"lon":10.5465062084277,"lat":44.8285876894282},
      {"lon":10.546670799456,"lat":44.8285425565615},
      {"lon":10.5468922170489,"lat":44.8283679420313},
      {"lon":10.5488675679631,"lat":44.827837047718},
      {"lon":10.5459446340468,"lat":44.8228032627438},
      {"lon":10.544046185391,"lat":44.8233866970945},
      {"lon":10.5445662598048,"lat":44.8242377432152},
      {"lon":10.5440446749672,"lat":44.824459315977},
      {"lon":10.5465062084277,"lat":44.8285876894282}]}
  ]}
*/