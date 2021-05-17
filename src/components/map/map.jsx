import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CropFree, MyLocation } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import MapTab from '../../tabs/Map/MapTab';
import '../LayoutTabs.css';

const zoom = 13;
let mapInstance;

export function onClick(newPosition) {
  mapInstance.flyTo(newPosition, zoom);
}

function MapView({}) {
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [extendedMap, setExtendedMap] = useState(false);
  const [farms, setFarms] = useState([]);
  let tmpFarms = [];
  const purpleOptions = { color: 'purple' };

  useEffect(() => {
    if (map != null) mapInstance = map;

    if (!isLoaded) {
      fetch(
        'http://mml.arces.unibo.it:3000/v0/WDmanager/%7Bid%7D/WDMInspector/%7Bispector%7D/assigned_farms'
      )
        .then(res => res.json())
        .then(json => loadFarms(json));
    }
  }, [isLoaded]);

  function loadLocationMap() {
    map.locate({
      setView: true,
    });

    //map.on('click', onUserLocation);
    map.on({
      click: onUserLocation,
    });
  }

  function loadFarms(items) {
    items
      .map(payload => {
        return payload.fields
          .map(fields => {
            tmpFarms.push({ id: payload.name, field: fields });
          })
          .join('\n');
      })
      .join('\n');

    setIsLoaded(true);
    setFarms(tmpFarms);
    tmpFarms = [];
  }

  function onUserLocation(event) {
    const latlng = event.latlng;
    const accuracy = event.accuracy;
    const circle = L.circle(latlng, accuracy);

    console.log(latlng);
    circle.addTo(map);
  }

  return !extendedMap ? (
    <>
      <MapContainer center={[44.7016081, 10.5682283]} zoom={zoom} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors/>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {farms.map(farm => (
          <Polygon pathOptions={purpleOptions} positions={farm.field.area} />
        ))}
      </MapContainer>

      <div className="position-buttons">
        <Button
          size="small"
          startIcon={<CropFree />}
          onClick={() => {
            setExtendedMap(true);
          }}
        />
        <Button
          size="small"
          className="btn-location-map"
          startIcon={<MyLocation />}
          onClick={loadLocationMap}
        />
      </div>
    </>
  ) : (
    <MapTab farms={farms} />
  );
}

export default MapView;
