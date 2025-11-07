import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import MapComponent from "./MapComponent";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ fallback

function Home() {
  const [lands, setLands] = useState([]);
  const [rents, setRents] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Search states
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState({
    lands: [],
    rents: [],
  });

  // ✅ Load all on start
  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [landRes, rentRes] = await Promise.all([
          axios.get(`${API}/api/lands`),
          axios.get(`${API}/api/rents`),
        ]);

        setLands(Array.isArray(landRes.data) ? landRes.data : landRes.data.lands || []);
        setRents(Array.isArray(rentRes.data) ? rentRes.data : rentRes.data.rents || []);
      } catch (err) {
        console.error("Error fetching data:", err);
        setLands([]);
        setRents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  // ✅ Search Function
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!search.trim()) return;

    try {
      const [landRes, rentRes] = await Promise.all([
        axios.get(`${API}/api/lands/search/${search}`),
        axios.get(`${API}/api/rents/search/${search}`)
      ]);

      setSearchResults({
        lands: landRes.data,
        rents: rentRes.data,
      });

    } catch (error) {
      console.error("Search error:", error);
    }
  };

  // ✅ If search results exist → show filtered data
  const landsToShow = searchResults.lands.length ? searchResults.lands : lands;
  const rentsToShow = searchResults.rents.length ? searchResults.rents : rents;

  if (loading) return <p style={{ textAlign: "center" }}>Loading properties...</p>;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Welcome to Digital Land Exchange</h1>
        <p>Buy, Sell, or Rent Land Securely and Transparently</p>
      </section>

      {/* ✅ ✅ SEARCH BAR (Added Here) */}
      <form
        onSubmit={handleSearch}
        style={{
          textAlign: "center",
          margin: "2rem auto",
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
     <input
  type="text"
  placeholder="Search location..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    padding: "0.7rem",
    width: "300px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    background: "#ffffff",   // ✅ white background
    color: "#000000",        // ✅ black text
  }}
/>

        <button
          type="submit"
          style={{
            background: "#007bff",
            color: "white",
            border: "none",
            padding: "0.7rem 1.2rem",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* ========== Lands Section ========== */}
      <section className="land-list" style={{ padding: "2rem" }}>
        <h2>Available Lands</h2>
        {landsToShow.length === 0 ? (
          <p style={{ textAlign: "center" }}>No lands available.</p>
        ) : (
          <div
            className="cards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            {landsToShow.map((land) => (
              <div
                className="card"
                key={land._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "1rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                {land.image && (
                  <img
                    src={`${API}/uploads/${land.image}`}
                    alt={land.title}
                    width="200"
                    height="150"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                    }}
                  />
                )}
                <h3>{land.title}</h3>
                <p><strong>Location:</strong> {land.location || "N/A"}</p>
                <p><strong>Price:</strong> ₹{land.price || "N/A"}</p>
                <Link to={`/land/${land._id}`}>
                  <button
                    style={{
                      background: "#4CAF50",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginTop: "0.5rem",
                    }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========== Rents Section ========== */}
      <section className="rent-list" style={{ padding: "2rem" }}>
        <h2>Available Rentals</h2>
        {rentsToShow.length === 0 ? (
          <p style={{ textAlign: "center" }}>No rentals available.</p>
        ) : (
          <div
            className="cards"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            {rentsToShow.map((rent) => (
              <div
                className="card"
                key={rent._id}
                style={{
                  border: "1px solid #ccc",
                  borderRadius: "12px",
                  padding: "1rem",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                  textAlign: "center",
                }}
              >
                {rent.image && (
                  <img
                    src={`${API}/uploads/${rent.image}`}
                    alt={rent.title}
                    width="200"
                    height="150"
                    style={{
                      objectFit: "cover",
                      borderRadius: "8px",
                      marginBottom: "0.5rem",
                    }}
                  />
                )}
                <h3>{rent.title}</h3>
                <p><strong>Location:</strong> {rent.location || "N/A"}</p>
                <p><strong>Price:</strong> ₹{rent.price || "N/A"} / {rent.duration}</p>
                <Link to={`/rent/${rent._id}`}>
                  <button
                    style={{
                      background: "#2196F3",
                      color: "white",
                      border: "none",
                      padding: "0.5rem 1rem",
                      borderRadius: "6px",
                      cursor: "pointer",
                      marginTop: "0.5rem",
                    }}
                  >
                    View Details
                  </button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ========== Map Section ========== */}
      <section style={{ padding: "2rem" }}>
        <h2>Land Locations on Map</h2>
        <MapComponent lands={landsToShow} />
      </section>
    </div>
  );
}

export default Home;
