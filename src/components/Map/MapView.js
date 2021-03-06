import React from "react";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Markers from "./TruckMarkers";

function MapView({ truck }) {
  const position = truck.coordinates;

  return (
    <Map
      className="map"
      center={position}
      zoom={13}
      style={{ height: 500, width: 500, border: "5px solid #386dd3" }}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
      />
      
      <Markers truck={truck} />
    </Map>
  );
}

export default MapView;
