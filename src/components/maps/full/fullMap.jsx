import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CropFree, MyLocation } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import TodayTab from '../../../tabs/Today/TodayTab';
import './fullMap.css';

const zoom = 13;

function FullMap({ farms }) {
  const [map, setMap] = useState(null);
  const [extendedMap, setExtendedMap] = useState(true);
  const purpleOptions = { color: 'purple' };

  function loadLocationMap() {
    console.log('Ci sono');
    map.locate({
      setView: true,
    });

    map.on('handleLocation', onUserLocation);
  }

  function onUserLocation(event) {
    const latlng = event.latlng;
    const circle = L.circle(latlng);

    circle.addTo(map);
  }

  return extendedMap ? (
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

      <div className="position-buttons-extended">
        <Button size="small" startIcon={<CropFree />} onClick={() => setExtendedMap(false)} />
        <Button
          size="small"
          className="btn-location-map"
          startIcon={<MyLocation />}
          onClick={loadLocationMap}
        />
      </div>
    </>
  ) : ( <TodayTab /> );
}

export default FullMap;
