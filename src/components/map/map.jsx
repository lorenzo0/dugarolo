import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const zoom = 13;
let mapInstance;

export function onClick(newPosition) {
  mapInstance.flyTo(newPosition, zoom);
}

function MapView({}) {

  const [map, setMap] = useState(null);

  useEffect(() => {
    if(map!=null)
      mapInstance = map;
  })

  return (
    <>
          {(
            <MapContainer
              center={[44.7016081, 10.5682283]}
              zoom={zoom}
              whenCreated={setMap}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />

            </MapContainer>
          )}
    </>
  );
}

export default MapView;

