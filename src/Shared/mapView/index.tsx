// src/components/MapView.tsx
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface Location {
  lat: number;
  lon: number;
  cases: number;
}

interface MapViewProps {
  data: Location[];
}

const MapView: React.FC<MapViewProps> = ({ data }) => {
  return (
    <MapContainer
      // center={[20.5937, 78.9629]}
      // zoom={5}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {data.map((location, idx) => (
        <Marker key={idx} position={[location.lat, location.lon]}>
          <Popup>{`Cases: ${location.cases}`}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
