import React, { useEffect, useState } from "react";

// leaflet imports
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; // components
import { LatLng } from 'leaflet';
import "leaflet/dist/leaflet.css";
import L from "leaflet"; // Import Leaflet to create custom icons

import { get_riders } from '../api/endpoints'; // get riders api to fetch rider data

import '../pages/Location.css';


const LocationsPage = () => {
  const [riders, setRiders] = useState([]); // stores list of riders
  const [error, setError] = useState("");

  useEffect(() => { // runs once when mounted
    const fetchData = async () => {
      try {
        const ridersData = await get_riders(); // fetches rider data
        setRiders(ridersData); // updates riders state if successful
      } catch (error) {
        setError("Error fetching riders data. Please try again.");
        console.error("Error fetching riders data:", error);
      }
    };

    fetchData();
  }, []);
    
// Custom marker icon
const customIcon = new L.Icon({
    iconUrl: "marker.svg",
    iconSize: [32, 32], // Size of the icon
    iconAnchor: [16, 32], // where the marker points to
    popupAnchor: [0, -32], // Position of the popup relative to the marker
  });

  return (
    <div className="locations-page">
      <h1 className="pageTitle">Riders' Locations</h1>
      {error && <div className="error-message">{error}</div>}
      
      <MapContainer
        center={[40.015, -105.2705]}  // Default center
        zoom={12}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {riders.map((rider) => (
          // Add a marker for each rider using the latitude and longitude
          <Marker
            key={rider.id}
            position={new LatLng(rider.latitude, rider.longitude)}
            icon={customIcon}
          >
            <Popup>
              <strong>{rider.first_name} {rider.last_name}</strong>
              <p>Location: {rider.city}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default LocationsPage;
