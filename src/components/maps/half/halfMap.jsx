import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, Polyline, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { CropFree, MyLocation } from '@material-ui/icons';
import { Button, Snackbar } from '@material-ui/core';
import MapTab from '../../../tabs/Map/MapTab';
import loadingGif from '../../../assets/loading.gif';
import farmer from '../../../assets/farmer.jpg';
import './halfMap.css';

const zoom = 13;
let mapInstance;

export function onClick(newPosition) {
  mapInstance.flyTo(newPosition, zoom);
}

export default function MapView() {
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [extendedMap, setExtendedMap] = useState(false);

  const [farms, setFarms] = useState([]);
  const [weirs, setWeirs] = useState([]);
  const [connections, setConnections] = useState([]);
  const [snackBarError, setSnackBarError] = useState(false);

  const purpleOptions = { color: 'purple' };

  useEffect(() => {
    if (map != null) {
      mapInstance = map;
    }

    if (!isLoaded) {
      fetch(
        'http://mml.arces.unibo.it:3000/v0/WDmanager/%7Bid%7D/WDMInspector/%7Bispector%7D/assigned_farms'
      )
        .then(res => res.json())
        .then(json => {
          loadFarms(json);
          return fetch('http://mml.arces.unibo.it:3000/v0/WDmanager/{id}/wdn/nodes');
        })
        .then(res => res.json())
        .then(json => {
          loadWeirs(json);
          return fetch('http://mml.arces.unibo.it:3000/v0/WDmanager/%7Bid%7D/wdn/connections');
        })
        .then(res => res.json())
        .then(json => loadConnection(json))
        .then(() => setIsLoaded(true))
        .catch(() => setSnackBarError(true));
    }
  }, [isLoaded, map]);

  function loadLocationMap() {
    map.locate({
      setView: true,
    });
  }

  function loadFarms(items) {
    let tmpFarms = [];

    items.map(payload =>
      payload.fields.map(fields => tmpFarms.push({ id: payload.name, field: fields })).join('\n')
    );

    setFarms(tmpFarms);
    //delete x exists, but it has to be understood
    tmpFarms = null;
  }

  //{"type":"Weir","id":"http://swamp-project.org/ns#Gate2","name":"Paratoia 2","location":{"lat":44.7745341766,"lon":10.7233746178}}

  function loadWeirs(items) {
    let tmpWeirs = [];

    items.map(weir => (weir.type === 'Weir' ? tmpWeirs.push({ id: weir.name, weir: weir }) : null));

    setWeirs(tmpWeirs);
    tmpWeirs = null;
  }

  function loadConnection(items) {
    let tmpConnection = [];

    items.map(connection =>
      tmpConnection.push({
        id: connection.id,
        connection: connection,
        line: [[connection.start], [connection.end]],
      })
    );

    setConnections(tmpConnection);
    tmpConnection = null;
  }

  function toggleExtendedMap() {
    setExtendedMap(!extendedMap);
  }

  return !snackBarError ? (
    !extendedMap ? (
      isLoaded ? (
        <>
          <MapContainer center={[44.7016081, 10.5682283]} zoom={zoom} whenCreated={setMap}>
            <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors/>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {farms.map(farm => (
              <Polygon pathOptions={purpleOptions} positions={farm.field.area} />
            ))}

            {weirs.map(object => {
              <Circle center={object.weir.location} radius={200} />;
            })}

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

          <div className="position-buttons">
            <Button size="small" startIcon={<CropFree />} onClick={toggleExtendedMap} />
            <Button
              size="small"
              className="btn-location-map"
              startIcon={<MyLocation />}
              onClick={loadLocationMap}
            />
          </div>
        </>
      ) : (
        <div className="loading-icon-div">
          <img className="loading-icon" src={loadingGif} alt="loading" />
        </div>
      )
    ) : (
      <MapTab
        farms={farms}
        weirs={weirs}
        connections={connections}
        toggleExtendedMap={toggleExtendedMap}
      />
    )
  ) : (
    <Snackbar
      className="snackbar"
      message="Error while retrieving data"
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      open={snackBarError}
    />
  );
}
