import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

function SellerForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    size: "",
    sizeValue: "",
    description: "",
    email: "", // ✅ Added seller email field
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token ? `Bearer ${token}` : "",
        },
      };

      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      const res = await axios.post(`${API}/api/lands`, data, config);

      if (res.status === 201) {
        alert("✅ Land added successfully!");
        navigate("/"); // Redirect to home
      }
    } catch (error) {
      console.error("❌ Error submitting form:", error);
      alert("Failed to add land. Please check console for details.");
    }
  };

  return (
    <div className="seller-form" style={{ padding: "2rem" }}>
      <h2>List Your Land</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="size"
          placeholder="Size (e.g., acres)"
          value={formData.size}
          onChange={handleChange}
        />
        <input
          type="number"
          name="sizeValue"
          placeholder="Size Value"
          value={formData.sizeValue}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />
        
        {/* ✅ Added seller email input */}
        <input
          type="email"
          name="email"
          placeholder="Seller Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input type="file" name="image" onChange={handleImageChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SellerForm;
