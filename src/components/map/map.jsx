import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import {CropFree, MyLocation} from '@material-ui/icons';
import {Button} from '@material-ui/core';
import '../LayoutTabs.css'

const zoom = 13;
let mapInstance;

export function onClick(newPosition) {
  mapInstance.flyTo(newPosition, zoom);
}

function MapView({}) {

  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [farms, setFarms] = useState([]);
  let tmpFarms = [];
  const purpleOptions = { color: 'purple' }

  useEffect(() => {
    if(map!=null){
      mapInstance = map;

      /*map.locate({
        setView: true
      });

      map.on('handleLocation', onUserLocation);*/
    }

    if(!isLoaded){
      fetch('http://mml.arces.unibo.it:3000/v0/WDmanager/%7Bid%7D/WDMInspector/%7Bispector%7D/assigned_farms')
        .then( res => res.json())
        .then( json => loadFarms(json))
    }
  }, [isLoaded])
  
  function loadFarms(items){
    items.map((payload) => {
      return payload.fields.map(fields =>{
        tmpFarms.push({id:payload.name, field:fields});
      }).join("\n")
    }).join("\n")

    setIsLoaded(true);
    setFarms(tmpFarms);
  }

  function onUserLocation(event){
    const latlng = event.latlng;
    const circle = L.circle(latlng);

    circle.addTo(map);
  }

//center={[44.7016081, 10.5682283]}

  return (
    
    <>
              <MapContainer
                center={[44.7016081, 10.5682283]}
                zoom={zoom}
                whenCreated={setMap}
              >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors/>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

              {
              farms.map(farm => (
                <Polygon pathOptions={purpleOptions} positions={farm.field.area} />
              ))}
                
              </MapContainer>

              <div className="position-buttons">
                <Button size="small" startIcon={<CropFree />}/>
                <Button size="small" className="btn-location-map" startIcon={<MyLocation />}/>
              </div>
    </>
  );
}

export default MapView;

