import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const API = import.meta.env.VITE_API_URL;  // ✅ Vite-compatible

function LandDetails() {
  const { id } = useParams();
  const [land, setLand] = useState(null);

  useEffect(() => {
    const fetchLand = async () => {
      try {
        const res = await axios.get(`${API}/api/lands/${id}`);
        setLand(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLand();
  }, [id]);

  if (!land) return <p>Loading...</p>;

  return (
    <div className="land-details">
      <h1>{land.title}</h1>
      {land.image && <img src={`${API}/uploads/${land.image}`} alt={land.title} />}
      <p><strong>Location:</strong> {land.location}</p>
      <p><strong>Size:</strong> {land.size || land.sizeValue}</p>
      <p><strong>Price:</strong> ₹{land.price}</p>
      <p><strong>Description:</strong> {land.description}</p>
      {land.seller && (
        <p><strong>Seller:</strong> {land.seller.name} ({land.seller.email})</p>
      )}
    </div>
  );
}

export default LandDetails;
