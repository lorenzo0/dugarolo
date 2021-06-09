import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polygon, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CropFree, MyLocation } from '@material-ui/icons';
import { Button, Snackbar } from '@material-ui/core';
import MapTab from '../../../tabs/Map';
import loadingGif from '../../../assets/loading.gif';
import './halfMap.css';

let zoom = 13;
let mapInstance;

/*
  Function called from CardLoader in order to fly to the location of
  the field selected. It will modifiy the center and the zoom of the interactive map. 
*/
export function onClick(newPosition) {
  zoom = 17;
  mapInstance.flyTo(newPosition, zoom);
}

export default function MapView(props) {
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [extendedMap, setExtendedMap] = useState(false);
  const [farms, setFarms] = useState([]);
  const [weirs, setWeirs] = useState([]);
  const [connections, setConnections] = useState([]);
  const [snackBarError, setSnackBarError] = useState(false);

  const purpleOptions = { color: 'purple' };

  /*
    Generator of map instance. If App.tsx loaded correctly the data,
    the useEffect of halfMap.jsx, will load the farms, weirs and connection 
    as elements over the interactive map.

    Before adding this information, the information received from LayoutTabs.tsx
    have to be analysed and structured in a way where it is possible retriving 
    basic information regarding the objects.
  */
  useEffect(() => {
    if (map != null) {
      mapInstance = map;

      setTimeout(() => {
        map.invalidateSize();
      }, 500);
    }

    if (!isLoaded) {
      if (props.mapData === 'Failed') {
        setSnackBarError(true);
      }
      if (props.mapData) {
        loadFarms(props.mapData[0]);
        loadWeirs(props.mapData[1]);
        loadConnections(props.mapData[2]);
        setIsLoaded(true);
      }
    }
  }, [isLoaded, map, props.mapData, zoom]);

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
  }

  function loadWeirs(items) {
    let tmpWeirs = [];

    items.map(weir =>
      weir.type === 'Weir'
        ? tmpWeirs.push({
            id: weir.name,
            weir: weir,
          })
        : null
    );

    setWeirs(tmpWeirs);
    tmpWeirs = null;
  }

  function loadConnections(items) {
    let tmpConnection = [];

    items.map(connection =>
      tmpConnection.push({
        id: connection.id,
        connection: connection,
        line: [[connection.start], [connection.end]],
      })
    );

    setConnections(tmpConnection);
  }


  /* 
    Handling of click for extending the map, if it is requested, it will call the 
    function fullmap.
  */
  function toggleExtendedMap() {
    setExtendedMap(!extendedMap);
  }

  /*
    IF the data recived are not null,
    IF the button of the extended map was not clicked,
    IF the loading of the arrays with the information are full,
    
      generate instance of the map.
      Once the basic information are loaded;
        - the polygons that rapresent the farms
        - the circles that rapresent the weirs
        - the polyling that rapresent the connections

      are drawed over the map.

    IF the loading of the arrays with the information are still empty,
      print to the screen the gif which rapresent the retrieving of the data

    IF the button of the extended map was clicked,
      call the function fullmap to extend the resource

    IF the data recived are null,
      print to the screen the snack bar of error
  */
  return !snackBarError ? (
    !extendedMap ? (
      isLoaded ? (
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
