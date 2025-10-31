import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000"; // ✅ fallback for safety

function Home() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLands = async () => {
      try {
        const res = await axios.get(`${API}/api/lands`);
        console.log("API response:", res.data);

        // ✅ Handle different possible API shapes
        if (Array.isArray(res.data)) {
          setLands(res.data);
        } else if (Array.isArray(res.data.lands)) {
          setLands(res.data.lands);
        } else {
          console.warn("Unexpected API response:", res.data);
          setLands([]);
        }
      } catch (err) {
        console.error("Error fetching lands:", err);
        setLands([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLands();
  }, []);

  // ✅ Loading and empty states for better UX
  if (loading) return <p style={{ textAlign: "center" }}>Loading lands...</p>;

  if (lands.length === 0)
    return <p style={{ textAlign: "center" }}>No lands available.</p>;

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Buy, Sell, or Rent Land Digitally</h1>
        <p>Secure and transparent land exchange system.</p>
      </section>

      {/* Land List */}
      <section className="land-list" style={{ padding: "2rem" }}>
        <h2>Available Lands</h2>

        <div
          className="cards"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
            marginTop: "1rem",
          }}
        >
          {lands.map((land) => (
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
              <p>
                <strong>Location:</strong> {land.location || "N/A"}
              </p>
              <p>
                <strong>Price:</strong> ₹{land.price || "N/A"}
              </p>
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
      </section>
    </div>
  );
}

export default Home;
