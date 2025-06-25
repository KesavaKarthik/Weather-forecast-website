import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

const ForceResize = () => {
  const map = useMap();

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize();
    }, 200);
  }, [map]);

  return null;
};

const ClickHandler = ({ onMapClick }) => {
  const map = useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onMapClick(lat, lng);
      map.flyTo([lat, lng], map.getZoom());
    },
  });
  return null;
};

const MapView = ({ pos , setpos }) =>  {
  console.log("🌡️ 1WeatherDetails got coordinates:", pos);


  const handleMapClick = (lat, lng) => {
    setpos([lat , lng]);

  };

  return (
    <MapContainer
      center={pos}
      zoom={6}
      style={{ width: "100%", height: "100%" }}
      scrollWheelZoom={true}
    >
      <ForceResize />
      <ClickHandler onMapClick={handleMapClick} />
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={pos}>
        <Popup>
          Lat: {pos[0].toFixed(4)} <br />
          Lon: {pos[1].toFixed(4)}
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;
