import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent({ lands = [] }) {
  const [map, setMap] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize the map
  useEffect(() => {
    const newMap = L.map("map").setView([20.5937, 78.9629], 5);
    setMap(newMap);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(newMap);

    // Add markers for land data (if any)
    lands.forEach((land) => {
      if (land.latitude && land.longitude) {
        L.marker([land.latitude, land.longitude])
          .addTo(newMap)
          .bindPopup(`<b>${land.title}</b><br>${land.location || "Unknown"}`);
      }
    });

    return () => newMap.remove();
  }, [lands]);

  // Handle city search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchQuery
        )}`
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const coords = [parseFloat(lat), parseFloat(lon)];

        // Move map to searched city
        map.setView(coords, 12);

        // Add marker
        L.marker(coords)
          .addTo(map)
          .bindPopup(`<b>${display_name}</b>`)
          .openPopup();
      } else {
        alert("City not found. Try another name.");
      }
    } catch (error) {
      console.error("Error fetching city data:", error);
      alert("Failed to fetch city location.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      {/* Search bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
 <input
  type="text"
  placeholder="Search for a city..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  style={{
    padding: "0.5rem",
    width: "250px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginRight: "0.5rem",
    background: "#ffffff",   // ✅ white background
    color: "#000000",        // ✅ black text
  }}
/>

        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            border: "none",
            borderRadius: "6px",
            background: "#4CAF50",
            color: "white",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Map container */}
      <div
        id="map"
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
}

export default MapComponent;
