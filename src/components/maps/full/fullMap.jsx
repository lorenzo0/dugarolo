import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CropFree, MyLocation } from '@material-ui/icons';
import { Button } from '@material-ui/core';
import './fullMap.css';

const zoom = 13;

/*
  Another instance of the map is created. This because it is impossible
  to modify the size of the map after being created.

  The arrays with the data are already generated from the first map, so it
  is not needed to load them again.
*/

export default function FullMap({ farms, weirs, connections, toggleExtendedMap }) {
  const [map, setMap] = useState(null);
  const purpleOptions = { color: 'purple' };

  useEffect(() => {
    if (map) {
      map.invalidateSize();
    }
  }, [map]);

  function loadLocationMap() {
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

  return (
    <>
      <MapContainer center={[44.7016081, 10.5682283]} zoom={zoom} whenCreated={setMap}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {farms.map(farm => (
          <Polygon pathOptions={purpleOptions} positions={farm.field.area} />
        ))}

        {weirs.map(object => (
          <Circle center={object.weir.location} radius={200} />
        ))}

        {connections.map(object => (
          <Polyline
            color="blue"
            positions={[
              [object.connection.start.lan, object.connection.start.long],
              [object.connection.end.lan, object.connection.end.long],
            ]}
          />
        ))}
      </MapContainer>

      <div className="position-buttons-extended">
        <Button size="small" startIcon={<CropFree />} onClick={toggleExtendedMap} />
        <Button
          size="small"
          className="btn-location-map"
          startIcon={<MyLocation />}
          onClick={loadLocationMap}
        />
      </div>
    </>
  );
}
